from html.parser import HTMLParser
from pathlib import Path
from collections import Counter
from urllib.parse import urlsplit
import json
import re

root = Path.cwd()
base = root / 'public/entwuerfe/web-design-engineer/sol'
void = set('area base br col embed hr img input link meta param source track wbr'.split())
expected_nav = ['Gottesdienste', 'Aktuelles', 'Angebote', 'Gemeinde', 'Kontakt']
sources = {
 'gemeinde-gottesdienst': ('Gottesdienst · Archivfoto', 'https://akg-kiel.de/wp-content/uploads/2024/01/2024_Banner_allianz_1.jpg'),
 'gemeinde-gespraech': ('Im Gespräch · Gemeindefest 2022', 'https://akg-kiel.de/wp-content/uploads/2022/05/Gemeindefest-22-VIII.jpg'),
 'gemeinde-fest': ('Zeit miteinander · Gemeindefest 2022', 'https://akg-kiel.de/wp-content/uploads/2022/05/Gemeindefest-22-XII.jpg'),
 'cafe-dreimaster': ('Café Dreimaster · Archivfoto', 'https://akg-kiel.de/wp-content/uploads/2024/01/Banner_Dreimaster.jpg')
}

class Page(HTMLParser):
 def __init__(self):
  super().__init__(convert_charrefs=True)
  self.stack, self.nodes, self.texts = [], [], []
 def handle_starttag(self, tag, attrs):
  attrs = dict(attrs)
  self.nodes.append((tag, attrs))
  if tag not in void:
   self.stack.append(tag)
 def handle_endtag(self, tag):
  assert self.stack and self.stack[-1] == tag, (tag, self.stack)
  self.stack.pop()
 def handle_data(self, data):
  self.texts.append(data)

manifest = json.loads((base / 'manifest.json').read_text())
assert len(manifest) == 5
assert [x['number'] for x in manifest] == list(range(1, 6))
assert len({x['title'] for x in manifest}) == 5
assert all(set(x) == {'number', 'title', 'description', 'structure'} for x in manifest)
assert all(isinstance(x[k], str) and x[k].strip() for x in manifest for k in ['title', 'description', 'structure'])

for item in manifest:
 path = base / f"{item['number']}.html"
 content = path.read_text()
 parser = Page()
 parser.feed(content)
 parser.close()
 assert not parser.stack
 nodes = parser.nodes
 tags = Counter(tag for tag, attrs in nodes)
 ids = [attrs['id'] for tag, attrs in nodes if 'id' in attrs]
 assert len(ids) == len(set(ids))
 assert content.lower().startswith('<!doctype html>')
 assert any(tag == 'html' and attrs.get('lang') == 'de' for tag, attrs in nodes)
 assert tags['main'] == tags['h1'] == tags['header'] == tags['footer'] == tags['title'] == 1
 assert 4 <= tags['section'] <= 6
 assert any(tag == 'meta' and attrs.get('charset') == 'utf-8' for tag, attrs in nodes)
 assert any(tag == 'meta' and attrs.get('name') == 'viewport' for tag, attrs in nodes)
 assert any(tag == 'meta' and attrs.get('name') == 'robots' and attrs.get('content') == 'noindex, nofollow' for tag, attrs in nodes)
 assert not any(tags[t] for t in ['script', 'iframe', 'form', 'input', 'button'])
 for tag, attrs in nodes:
  if 'tabindex' in attrs:
   assert int(attrs['tabindex']) <= 0
  for attribute in ['src', 'href']:
   if attribute not in attrs:
    continue
   value = attrs[attribute]
   assert value and value != '#'
   if value.startswith('#'):
    assert value[1:] in ids, value
   elif value.startswith('/'):
    assert not value.startswith('//')
    if '.' in value.rsplit('/', 1)[-1]:
     assert (root / 'public' / value.lstrip('/')).is_file(), value
    else:
     assert value in ['/gemeinde', '/gottesdienste', '/angebote', '/aktuelles', '/kontakt', '/impressum', '/datenschutz'], value
   else:
    assert tag == 'a' and urlsplit(value).scheme == 'https', (tag, value)
  if tag == 'img':
   assert attrs.get('alt') and int(attrs['width']) > 0 and int(attrs['height']) > 0
   assert attrs['src'].startswith('/images/')
   for part in attrs.get('srcset', '').split(','):
    if part.strip():
     assert (root / 'public' / part.split()[0].lstrip('/')).is_file()
 for name, (caption, source) in sources.items():
  assert sum(tag == 'img' and attrs.get('src') == f'/images/{name}-960.webp' for tag, attrs in nodes) == 1
  assert caption in content and source in content
 assert tags['figure'] == tags['figcaption'] == 4
 assert 'Frank Lönne' in content
 assert sum(tag == 'img' and attrs.get('src') == '/images/apostel-logo.png' and attrs.get('width') == '500' and attrs.get('height') == '272' for tag, attrs in nodes) == 1
 assert 'Aktuelle Meldungen sind in diesem Entwurf nicht eingebunden.' in content
 assert 'https://cafe-dreimaster.de/' in content and '>extern</span>' in content
 assert all(f'href="#{label.lower()}"' in content for label in expected_nav)
 assert '<a class="skip" href="#inhalt">' in content
 css = re.search(r'<style>(.*?)</style>', content, re.S).group(1)
 assert css.count('{') == css.count('}')
 assert css.count('(') == css.count(')')
 assert 'font-display:swap' in css and '/fonts/figtree-latin-variable.woff2' in css
 assert 'prefers-reduced-motion' in css and 'focus-visible' in css
 assert 'outline:3px solid var(--ink)' in css and 'outline-color:var(--white)' in css
 assert 'min-height:44px' in css and 'height:auto' in css
 assert not any(line.rstrip() != line for line in content.splitlines())
 assert not re.search(r'object-fit\s*:\s*cover|filter\s*:|scrollIntoView|@import|https?://', css)
 assert set(re.findall(r'#[0-9a-fA-F]{6}', css)) == {'#173b50', '#006c9e', '#eaf3f7', '#ffffff'}
 assert re.search(r'@media\(max-width:47\.99rem\)', css)
 assert re.search(r'@media\(max-width:63\.99rem\)', css)
 print(f"PASS {path.relative_to(root)}: structure, anchors, assets, four photo credits, noindex, CSS invariants")
print('PASS manifest.json: exactly five unique, complete entries')

def luminance(color):
 rgb = [int(color[i:i+2], 16) / 255 for i in (1, 3, 5)]
 rgb = [v / 12.92 if v <= .04045 else ((v + .055) / 1.055) ** 2.4 for v in rgb]
 return sum(v * k for v, k in zip(rgb, [.2126, .7152, .0722]))

for foreground, background in [('#173b50', '#ffffff'), ('#173b50', '#eaf3f7'), ('#006c9e', '#ffffff'), ('#ffffff', '#006c9e'), ('#ffffff', '#173b50')]:
 a, b = sorted([luminance(foreground), luminance(background)])
 ratio = (b + .05) / (a + .05)
 assert ratio >= 4.5, (foreground, background, ratio)
 print(f'PASS contrast {foreground} on {background}: {ratio:.2f}:1')
