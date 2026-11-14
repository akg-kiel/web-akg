import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

const root = resolve('docs/design-directions');
const sources = JSON.parse(await readFile(resolve(root, 'sources.json'), 'utf8'));
let html = await readFile(resolve(root, 'index.html'), 'utf8');
for (const font of sources.fonts) {
  const bytes = await readFile(resolve(root, font.file));
  assert.equal(createHash('sha256').update(bytes).digest('hex'), font.sha256);
  const license = await readFile(resolve(root, font.license), 'utf8');
  assert.match(license, /SIL OPEN FONT LICENSE Version 1\.1/);
  html = html.replace(
    '</head>',
    `<!-- ${font.family}\n${license.replaceAll('--', '—')} -->\n</head>`
  );
}
const paths = new Set([...html.matchAll(/(?:src="|url\(')([^"')]+)/g)].map((match) => match[1]));
for (const path of paths) {
  let bytes = await readFile(resolve(root, path));
  const extension = extname(path);
  const mime =
    extension === '.woff2' ? 'font/woff2' : extension === '.png' ? 'image/png' : 'image/webp';
  if (extension === '.webp')
    bytes = await sharp(bytes)
      .resize({ width: 800, withoutEnlargement: true })
      .webp({ quality: 74 })
      .toBuffer();
  html = html.replaceAll(path, `data:${mime};base64,${bytes.toString('base64')}`);
}
html = html.replace(
  'href="sources.json"',
  `download="akg-design-quellen.json" href="data:application/json;base64,${Buffer.from(JSON.stringify(sources, null, 2)).toString('base64')}"`
);
assert.ok(!/(?:src="|url\(')(?!data:)/.test(html), 'Unbundled resource');
assert.ok(html.length < 512000, `Renderer limit exceeded: ${html.length}`);
await writeFile('/tmp/akg-visuelle-richtungen.html', html);
console.log(
  `/tmp/akg-visuelle-richtungen.html: ${html.length} Zeichen; Bilder, Original-Logo, Fonts, Quellen und Schriftlizenzen eingebettet.`
);
