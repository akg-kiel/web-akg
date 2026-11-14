"""Run with python3 public/entwuerfe/better-websites/sol/verify.py."""
from html.parser import HTMLParser
from pathlib import Path
import json
import re

HERE = Path(__file__).resolve().parent
PUBLIC = HERE.parents[2]
SOURCES = {
    "https://akg-kiel.de/wp-content/uploads/2024/01/2024_Banner_allianz_1.jpg",
    "https://akg-kiel.de/wp-content/uploads/2022/05/Gemeindefest-22-VIII.jpg",
    "https://akg-kiel.de/wp-content/uploads/2022/05/Gemeindefest-22-XII.jpg",
    "https://akg-kiel.de/wp-content/uploads/2024/01/Banner_Dreimaster.jpg",
}
ROUTES = {"/gemeinde", "/gottesdienste", "/angebote", "/aktuelles", "/kontakt"}
VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}


class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.nodes = []
        self.stack = []

    def handle_starttag(self, tag, attrs):
        self.nodes.append((tag, dict(attrs)))
        if tag not in VOID:
            self.stack.append(tag)

    def handle_endtag(self, tag):
        assert self.stack and self.stack[-1] == tag, f"Unbalanced HTML: {tag}"
        self.stack.pop()


manifest = json.loads((HERE / "manifest.json").read_text())
assert isinstance(manifest, list) and len(manifest) == 5
assert [item["number"] for item in manifest] == [1, 2, 3, 4, 5]
assert len({item["title"] for item in manifest}) == 5
for item in manifest:
    assert set(item) == {"number", "title", "description", "structure"}
    assert all(isinstance(item[k], str) and item[k].strip() for k in ("title", "description", "structure"))
    path = HERE / f'{item["number"]}.html'
    html = path.read_text()
    page = Page()
    page.feed(html)
    assert not page.stack, f"{path.name}: unclosed tags"
    nodes = page.nodes
    for tag in ("html", "head", "title", "body", "header", "main", "h1", "footer"):
        assert sum(t == tag for t, _ in nodes) == 1, f"{path.name}: exactly one {tag}"
    assert html.lower().startswith("<!doctype html>")
    assert next(a for t, a in nodes if t == "html")["lang"] == "de"
    assert any(a.get("charset") == "utf-8" for t, a in nodes if t == "meta")
    assert any(a.get("name") == "robots" and a.get("content") == "noindex, nofollow" for t, a in nodes if t == "meta")
    assert any(a.get("name") == "viewport" for t, a in nodes if t == "meta")
    assert not any(t in {"script", "iframe", "form"} for t, _ in nodes)
    ids = [a["id"] for _, a in nodes if "id" in a]
    assert len(ids) == len(set(ids)), f"{path.name}: duplicate ID"
    links = [a["href"] for t, a in nodes if t == "a"]
    assert SOURCES.issubset(links), f"{path.name}: missing original source"
    assert "https://cafe-dreimaster.de/" in links
    assert '/gemeinde' in links and '/gottesdienste' in links
    for href in links:
        assert href and href != "#"
        if href.startswith("#"):
            assert href[1:] in ids, f"{path.name}: dangling {href}"
        elif href.startswith("/"):
            assert href in ROUTES or (PUBLIC / href.lstrip("/")).is_file(), f"Unknown local target: {href}"
        else:
            assert href in SOURCES or href == "https://cafe-dreimaster.de/", f"Unexpected external target: {href}"
    images = [a for t, a in nodes if t == "img"]
    assert len(images) == 5, f"{path.name}: logo plus four photos"
    for image in images:
        assert image.get("alt") and image.get("width") and image.get("height")
        assert image["src"].startswith("/images/")
        assert (PUBLIC / image["src"].lstrip("/")).is_file()
        for candidate in image.get("srcset", "").split(","):
            if candidate.strip():
                assert (PUBLIC / candidate.strip().split()[0].lstrip("/")).is_file()
    assert any(a["src"] == "/images/apostel-logo.png" for a in images)
    assert len([t for t, _ in nodes if t == "figure"]) == 4
    assert "font-display:swap" in html and "prefers-reduced-motion:reduce" in html
    assert "Aktuelle Meldungen sind in diesem Entwurf nicht eingebunden." in html
    for url in re.findall(r"url\(['\"]?([^)'\"]+)", html):
        assert url.startswith("/") and (PUBLIC / url.lstrip("/")).is_file()
    assert not re.search(r"object-fit\s*:\s*cover|filter\s*:|<[^>]+\son\w+=", html)
    print(f"PASS {path.name}: structure, sources, assets, links, noindex, native-only")
print("PASS manifest.json: five complete, uniquely named concepts")
