"""Dependency-free source checks; not a browser, HTML5 validator, or WCAG audit.

Run from any directory: python3 public/entwuerfe/web-design-engineer/astra/check.py
"""
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
import json
import re
import struct

HERE = Path(__file__).resolve().parent
PUBLIC = HERE.parents[2]
VOID = set('area base br col embed hr img input link meta param source track wbr'.split())
ROUTES = {'/gottesdienste', '/aktuelles', '/angebote', '/gemeinde', '/kontakt'}
PHOTOS = {
    'gemeinde-gottesdienst': ('2024/01/2024_Banner_allianz_1.jpg', 'Archivfoto', 'Frank Lönne'),
    'gemeinde-gespraech': ('2022/05/Gemeindefest-22-VIII.jpg', 'Gemeindefest 2022', ''),
    'gemeinde-fest': ('2022/05/Gemeindefest-22-XII.jpg', 'Gemeindefest 2022', ''),
    'cafe-dreimaster': ('2024/01/Banner_Dreimaster.jpg', 'Archivfoto', ''),
}
SOURCES = {'https://akg-kiel.de/wp-content/uploads/' + value[0] for value in PHOTOS.values()}


class Document(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.nodes = []
        self.stack = []
        self.doctype = False
        self.feed(source)
        self.close()
        assert not self.stack, 'Unclosed elements'

    def handle_decl(self, declaration):
        self.doctype = declaration.lower() == 'doctype html'

    def handle_starttag(self, tag, attributes):
        assert len(attributes) == len(dict(attributes)), f'Duplicate attribute: {tag}'
        assert not (tag == 'a' and any(n['tag'] == 'a' for n in self.stack)), 'Nested links'
        node = {'tag': tag, 'attrs': dict(attributes), 'text': '', 'ancestors': self.stack.copy()}
        self.nodes.append(node)
        if tag not in VOID:
            self.stack.append(node)

    def handle_endtag(self, tag):
        assert self.stack and self.stack[-1]['tag'] == tag, f'Mismatched closing tag: {tag}'
        self.stack.pop()

    def handle_data(self, data):
        for node in self.stack:
            node['text'] += data

    def tags(self, tag):
        return [node for node in self.nodes if node['tag'] == tag]


def asset(path):
    assert path.startswith('/') and not path.startswith('//'), f'Non-local asset: {path}'
    file = PUBLIC / path.lstrip('/')
    assert file.is_file(), f'Missing asset: {file}'
    return file


def luminance(color):
    components = [int(color[i:i + 2], 16) / 255 for i in (1, 3, 5)]
    linear = [c / 12.92 if c <= .04045 else ((c + .055) / 1.055) ** 2.4 for c in components]
    return sum(c * weight for c, weight in zip(linear, (.2126, .7152, .0722)))


manifest = json.loads((HERE / 'manifest.json').read_text())
assert len(manifest) == 5 and [row['number'] for row in manifest] == list(range(1, 6))
assert len({row['title'] for row in manifest}) == 5
for row in manifest:
    assert set(row) == {'number', 'title', 'description', 'structure'}
    assert all(row[field].strip() for field in ('title', 'description', 'structure'))

for row in manifest:
    path = HERE / f"{row['number']}.html"
    source = path.read_text(encoding='utf-8')
    assert source.endswith('\n') and all(line == line.rstrip() for line in source.splitlines()), 'Whitespace'
    doc = Document(source)
    counts = Counter(node['tag'] for node in doc.nodes)
    assert doc.doctype and counts['html'] == 1
    assert doc.tags('html')[0]['attrs']['lang'] == 'de'
    assert counts['main'] == counts['h1'] == counts['header'] == counts['footer'] == 1
    assert counts['section'] == 5 and counts['figure'] == 4 and counts['img'] == 5
    assert not any(counts[tag] for tag in ('script', 'iframe', 'form', 'input', 'button', 'time'))
    assert row['title'] in doc.tags('title')[0]['text']
    meta = [node['attrs'] for node in doc.tags('meta')]
    assert {'charset': 'utf-8'} in meta
    assert any(m.get('name') == 'viewport' and 'width=device-width' in m['content'] for m in meta)
    assert any(m.get('name') == 'robots' and m['content'] == 'noindex, nofollow' for m in meta)
    ids = [node['attrs']['id'] for node in doc.nodes if 'id' in node['attrs']]
    assert len(ids) == len(set(ids)), 'Duplicate IDs'
    for node in doc.nodes:
        for target in node['attrs'].get('aria-labelledby', '').split():
            assert target in ids, f'Missing heading reference: {target}'
        assert int(node['attrs'].get('tabindex', '-1')) <= 0, 'Positive tabindex'
    headings = [int(node['tag'][1]) for node in doc.nodes if re.fullmatch('h[1-6]', node['tag'])]
    assert headings[0] == 1
    assert all(current <= previous + 1 for previous, current in zip(headings, headings[1:]))
    hrefs = set()
    for anchor in doc.tags('a'):
        href = anchor['attrs']['href']
        hrefs.add(href)
        if href.startswith('#'):
            assert href[1:] in ids, f'Missing fragment: {href}'
        else:
            assert href in ROUTES | SOURCES | {'https://cafe-dreimaster.de/'}, f'Unexpected link: {href}'
        assert anchor['text'].strip() or anchor['attrs'].get('aria-label'), 'Unnamed link'
    assert ROUTES <= hrefs
    assert '#inhalt' in hrefs and doc.tags('main')[0]['attrs']['tabindex'] == '-1'
    assert all('#' + name in hrefs for name in ('gottesdienste', 'aktuelles', 'angebote', 'gemeinde', 'kontakt'))
    assert 'Aktuelle Meldungen sind in diesem Entwurf nicht eingebunden.' in source
    assert 'Gestaltungsentwurf' in doc.tags('footer')[0]['text']
    for details in doc.tags('details'):
        assert any(n['tag'] == 'summary' and n['ancestors'][-1] is details for n in doc.nodes)
    for image in doc.tags('img'):
        attrs = image['attrs']
        assert attrs['alt'].strip()
        asset(attrs['src'])
        if attrs['src'] == '/images/apostel-logo.png':
            assert (attrs['width'], attrs['height']) == ('500', '272')
            continue
        name = attrs['src'].removeprefix('/images/').removesuffix('-960.webp')
        assert name in PHOTOS
        for item in attrs['srcset'].split(','):
            asset(item.strip().split()[0])
        data = asset(f'/images/{name}-1280.webp').read_bytes()
        assert data[12:16] == b'VP8 '
        width, height = (value & 0x3fff for value in struct.unpack('<HH', data[26:30]))
        assert (int(attrs['width']), int(attrs['height'])) == (width, height)
        figure = next(n for n in image['ancestors'] if n['tag'] == 'figure')
        original, archive, credit = PHOTOS[name]
        assert archive in figure['text'] and credit in figure['text']
        assert any(n['tag'] == 'a' and any(a is figure for a in n['ancestors'])
                   and n['attrs']['href'] == 'https://akg-kiel.de/wp-content/uploads/' + original
                   for n in doc.nodes), f'Missing original source for {name}'
    css = doc.tags('style')[0]['text']
    assert css.count('{') == css.count('}'), 'Unbalanced CSS blocks'
    assert '@font-face' in css and 'font-display:swap' in css
    assert 'prefers-reduced-motion:reduce' in css and ':focus-visible' in css
    assert '@media(max-width:' in css and 'min-height:44px' in css
    assert 'text-wrap:pretty' in css and 'height:auto' in css
    assert not re.search(r'@import|object-fit\s*:\s*cover|(?:^|[;{])\s*filter\s*:', css)
    for resource in re.findall(r'url\([\'\"]?([^\)\'\"]+)', css):
        asset(resource)
    for preload in doc.tags('link'):
        asset(preload['attrs']['href'])
    print(f"PASS {path.name}: structure, links, local assets, four credited photos, metadata, CSS safeguards")

for foreground, background in [('#173b50', '#ffffff'), ('#173b50', '#eaf3f7'), ('#ffffff', '#006c9e'), ('#006c9e', '#eaf3f7')]:
    high, low = sorted([luminance(foreground), luminance(background)], reverse=True)
    ratio = (high + .05) / (low + .05)
    assert ratio >= 4.5
    print(f'PASS declared text contrast {foreground}/{background}: {ratio:.2f}:1')
print('PASS manifest: exactly five distinct entries. Browser/layout/keyboard verification remains separate.')
