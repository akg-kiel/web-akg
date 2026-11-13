import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFile, access } from 'node:fs/promises';
import test from 'node:test';
import { buildCatalog } from './build-design-gallery.mjs';

test('regeneration preserves the formatted, unchanged fallback links', async () => {
  const before = await readFile('public/entwuerfe/index.html', 'utf8');
  execFileSync(process.execPath, ['scripts/build-design-gallery.mjs']);
  assert.equal(await readFile('public/entwuerfe/index.html', 'utf8'), before);
});

test('50 independently attributed designs form a complete local, noindex gallery', async () => {
  const catalog = await buildCatalog();
  assert.equal(catalog.length, 50);
  assert.equal(new Set(catalog.map((design) => design.id)).size, 50);
  assert.deepEqual(JSON.parse(await readFile('public/entwuerfe/catalog.json', 'utf8')), catalog);
  for (const design of catalog) {
    const html = await readFile(`public${design.path}`, 'utf8');
    assert.match(html, /<!doctype html>/i, design.id);
    assert.match(html, /<html[^>]+lang=["']de["']/i, design.id);
    assert.match(html, /name=["']robots["'][^>]*content=["'][^"']*noindex/i, design.id);
    assert.equal((html.match(/<main(?:\s|>)/gi) ?? []).length, 1, design.id);
    assert.equal((html.match(/<h1(?:\s|>)/gi) ?? []).length, 1, design.id);
    assert.match(html, /\/images\/apostel-logo\.png/, design.id);
    assert.match(html, /\/fonts\/figtree-latin-variable\.woff2/, design.id);
    assert.match(html, /gemeinde-(?:gottesdienst|gespraech|fest)-/, design.id);
    assert.match(html, /(?:Archivfoto|Gemeindefest 2022)/i, design.id);
    assert.doesNotMatch(html, /<(?:script|iframe)[^>]+src=["']https?:\/\//i, design.id);
    assert.doesNotMatch(html, /<img[^>]+src=["']https?:\/\//i, design.id);
    await access(`public${design.thumbnail}`);
  }
  const gallery = await readFile('public/entwuerfe/index.html', 'utf8');
  assert.match(gallery, /sandbox="allow-same-origin"/);
  assert.equal((gallery.match(/<a\s+href="\/entwuerfe\//g) ?? []).length, 50);
});
