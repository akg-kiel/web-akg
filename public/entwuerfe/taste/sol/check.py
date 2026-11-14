#!/usr/bin/env python3
"""Run: python3 public/entwuerfe/taste/sol/check.py (stdlib only)."""
import json
import re
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path

HERE = Path(__file__).resolve().parent
PUBLIC = HERE.parents[2]
VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'}
ROUTES = {'/gemeinde', '/gottesdienste', '/angebote', '/aktuelles', '/kontakt'}
PHOTOS = {'gemeinde-gottesdienst', 'gemeinde-gespraech', 'gemeinde-fest', 'cafe-dreimaster'}
SOURCES = {
    'https://akg-kiel.de/wp-content/uploads/2024/01/2024_Banner_allianz_1.jpg',
    'https://akg-kiel.de/wp-content/uploads/2022/05/Gemeindefest-22-VIII.jpg',
    'https://akg-kiel.de/wp-content/uploads/2022/05/Gemeindefest-22-XII.jpg',
    'https://akg-kiel.de/wp-content/uploads/2024/01/Banner_Dreimaster.jpg',
}


class Document(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack = []
        self.elements = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.elements.append((tag, attrs))
        if tag not in VOID:
            self.stack.append(tag)

    def handle_endtag(self, tag):
        assert self.stack and self.stack.pop() == tag, f'Unbalanced HTML at </{tag}>'


manifest = json.loads((HERE / 'manifest.json').read_text())
assert len(manifest) == 5
assert [entry['number'] for entry in manifest] == list(range(1, 6))
assert len({entry['title'] for entry in manifest}) == 5
for entry in manifest:
    assert set(entry) == {'number', 'title', 'description', 'structure'}
    assert all(isinstance(entry[key], str) and entry[key] for key in ('title', 'description', 'structure'))

for n in range(1, 6):
    text = (HERE / f'{n}.html').read_text()
    assert text.lower().startswith('<!doctype html>')
    doc = Document()
    doc.feed(text)
    assert not doc.stack
    counts = Counter(tag for tag, _ in doc.elements)
    assert counts['main'] == counts['h1'] == 1
    assert counts['header'] == counts['footer'] == 1
    assert not any(counts[tag] for tag in ('iframe', 'script', 'form'))
    assert any(tag == 'html' and a.get('lang') == 'de' for tag, a in doc.elements)
    assert any(tag == 'meta' and a.get('name') == 'robots' and a.get('content') == 'noindex, nofollow' for tag, a in doc.elements)
    ids = [a['id'] for _, a in doc.elements if 'id' in a]
    assert len(ids) == len(set(ids)), f'{n}: duplicate id'
    links = [a['href'] for tag, a in doc.elements if tag == 'a']
    assert SOURCES <= set(links)
    assert 'https://cafe-dreimaster.de/' in links
    for href in links:
        assert href != '#'
        if href.startswith('#'):
            assert href[1:] in ids, (n, href)
        elif href.startswith('/'):
            assert href in ROUTES, (n, href)
        else:
            assert href in SOURCES | {'https://cafe-dreimaster.de/'}, (n, href)
    images = [a for tag, a in doc.elements if tag == 'img']
    assert len(images) == 5
    assert {a['src'].rsplit('/', 1)[1].replace('-1280.webp', '') for a in images if a['src'].endswith('.webp')} == PHOTOS
    for attrs in images:
        assert attrs.get('alt')
        assert attrs.get('width') and attrs.get('height')
        assert (PUBLIC / attrs['src'].lstrip('/')).is_file(), attrs['src']
        for asset in re.findall(r'(/images/[^ ,]+)', attrs.get('srcset', '')):
            assert (PUBLIC / asset.lstrip('/')).is_file(), asset
    for asset in re.findall(r"url\(['\"]?([^)'\"]+)", text):
        assert asset.startswith('/')
        assert (PUBLIC / asset.lstrip('/')).is_file(), asset
    assert 'Aktuelle Meldungen sind in diesem Entwurf nicht eingebunden.' in text
    assert 'Foto: Frank Lönne' in text
    assert text.count('Gemeindefest 2022') >= 2
    assert 'object-fit:cover' not in text and 'filter:' not in text
    assert 'prefers-reduced-motion:reduce' in text
    print(f'{n}.html: structure, fragments, routes, local assets, four photo sources and content boundaries OK')
print('manifest.json: exactly five complete, uniquely named entries OK')
