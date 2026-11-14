import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import sharp from 'sharp';

const mobbin = process.argv.includes('--mobbin');
const layout = process.argv.includes('--layout');
const revision = mobbin || layout || process.argv.includes('--revision');
const prefix = mobbin
  ? 'akg-mobbin'
  : layout
    ? 'akg-layout'
    : revision
      ? 'akg-stock-skizzen'
      : 'akg-entwuerfe';
const catalog = JSON.parse(
  await readFile(
    mobbin
      ? 'public/entwuerfe/mobbin/concepts.json'
      : layout
        ? 'public/entwuerfe/layout/concept.json'
        : revision
          ? 'public/entwuerfe/neu/concepts.json'
          : 'public/entwuerfe/catalog.json',
    'utf8'
  )
);
const documents = {};
const aliases = {};
const assets = {};
const thumbnails = {};
for (const design of catalog) {
  const html = await readFile(`public${design.path}`, 'utf8');
  documents[design.id] = html;
  for (const path of new Set(
    html.match(/\/(?:images|fonts|entwuerfe\/neu\/stock)\/[\w.-]+\.(?:webp|png|woff2)/g)
  )) {
    const key = path.replace(/-(?:640|960|1280|1440)\.webp$/, '.webp');
    aliases[path] = key;
    if (assets[key]) continue;
    let bytes = await readFile(`public${path}`);
    const mime = path.endsWith('.woff2')
      ? 'font/woff2'
      : path.endsWith('.png')
        ? 'image/png'
        : 'image/webp';
    if (mime === 'image/webp')
      bytes = await sharp(bytes)
        .resize({ width: revision ? 1280 : 448, withoutEnlargement: true })
        .webp({ quality: revision ? 76 : 36 })
        .toBuffer();
    assets[key] = { mime, data: bytes.toString('base64') };
  }
  thumbnails[design.id] = (
    await sharp(`public${design.thumbnail}`)
      .resize(
        revision
          ? { width: layout ? 1280 : 512, withoutEnlargement: true }
          : { width: 256, height: 160 }
      )
      .webp({ quality: layout ? 78 : revision ? 64 : 32 })
      .toBuffer()
  ).toString('base64');
}
if (mobbin)
  for (const design of catalog) {
    const { width, height } = await sharp(`public${design.thumbnail}`).metadata();
    design.previewRatio = `${width} / ${height}`;
    const bytes = await sharp(design.referenceFile)
      .resize({ width: 360 })
      .webp({ quality: 58 })
      .toBuffer();
    design.referenceThumbnail = `data:image/webp;base64,${bytes.toString('base64')}`;
  }
const payload = gzipSync(
  Buffer.from(JSON.stringify({ catalog, documents, aliases, assets, thumbnails }))
).toString('base64');
const css = await readFile('public/entwuerfe/gallery.css', 'utf8');
let js = (await readFile('public/entwuerfe/gallery.js', 'utf8')).replace(
  "fetch('/entwuerfe/catalog.json')",
  'Promise.resolve(new Response(JSON.stringify(window.__designCatalog)))'
);
if (mobbin)
  js = js
    .replace(
      "image.loading = 'lazy';",
      "image.loading = 'eager'; image.style.aspectRatio = design.previewRatio;"
    )
    .replace(
      'article.append(button, description);',
      `article.append(button, description);
const source=document.createElement('a');source.className='reference-source';source.href=design.referenceUrl;source.target='_blank';source.rel='noopener noreferrer';source.textContent='Vorbild: '+design.referenceName+' ↗';
const reference=document.createElement('img');reference.src=design.referenceThumbnail;reference.alt='Originalreferenz '+design.referenceName;reference.width=360;reference.height=248;source.append(reference);article.append(source);`
    );
const escapedJS = JSON.stringify(js).replaceAll('<', '\\u003c');
const boot = `<script type="module">
const packed=Uint8Array.from(atob('${payload}'),c=>c.charCodeAt(0));
const data=await new Response(new Blob([packed]).stream().pipeThrough(new DecompressionStream('gzip'))).json();
const blob=(data,mime)=>URL.createObjectURL(new Blob([Uint8Array.from(atob(data),c=>c.charCodeAt(0))],{type:mime}));
const assets=Object.fromEntries(Object.entries(data.assets).map(([key,value])=>[key,blob(value.data,value.mime)]));
let css=document.querySelector('#gallery-style').textContent;
for(const [path,key] of Object.entries(data.aliases))css=css.replaceAll(path,assets[key]);
document.querySelector('#gallery-style').textContent=css;
window.__designCatalog=data.catalog.map(design=>{
 let html=data.documents[design.id];
 for(const [path,key] of Object.entries(data.aliases))html=html.replaceAll(path,assets[key]);
 html=html.replace(/(href=["'])(\\/(?!\\/))/g,'$1https://akg-kiel.de$2');
 return {...design,path:URL.createObjectURL(new Blob([html],{type:'text/html'})),thumbnail:blob(data.thumbnails[design.id],'image/webp')};
});
const script=document.createElement('script');script.type='module';script.textContent=${escapedJS};document.body.append(script);
</script>`;
let html = await readFile('public/entwuerfe/index.html', 'utf8');
html = html
  .replace(/<link rel="stylesheet"[^>]+>/, `<style id="gallery-style">${css}</style>`)
  .replace(/<script type="module" src=[^>]+><\/script>/, '')
  .replace(
    /<noscript\s*>[\s\S]*?<\/noscript\s*>/,
    '<noscript>Diese portable Vergleichsgalerie benötigt JavaScript.</noscript>'
  )
  .replace('</body>', `${boot}</body>`);
if (revision)
  html = html
    .replaceAll(
      '50 Entwürfe',
      mobbin
        ? 'Drei Referenz-Rekreationen'
        : layout
          ? 'Ein neuer Layoutentwurf'
          : 'Zwei neue Richtungen'
    )
    .replace(
      'Fünf Skills. Zwei Modelle. Viele Möglichkeiten.',
      mobbin
        ? 'Drei Vorbilder. Drei eigene Seitenaufbauten.'
        : layout
          ? 'Bekannte Farben. Neuer Seitenaufbau.'
          : 'Zwei Gegenentwürfe. Neue Bildsprache.'
    )
    .replace(
      '</head>',
      '<style>.filter-fields,.card-meta{display:none}.filters{justify-content:flex-end}.design-grid{grid-template-columns:repeat(2,minmax(0,1fr));align-items:start}.design-trigger{display:flex;flex-direction:column}.design-card h2{order:0;margin-block:0 14px}.thumbnail{order:1;aspect-ratio:auto;height:auto;object-fit:contain}@media(max-width:500px){.design-grid{grid-template-columns:1fr}}</style></head>'
    );
const mobbinStyle =
  '<style>.filters{display:none}.design-grid{grid-template-columns:repeat(3,minmax(0,1fr));align-items:start}.design-card h2{font-size:18px}.reference-source{display:grid;gap:8px;margin-top:16px;font-size:13px;font-weight:600;text-underline-offset:4px}.reference-source img{display:block;width:100%;height:auto}.card-description{font-size:13px;line-height:1.5}@media(max-width:620px){.design-grid{grid-template-columns:1fr}}</style>';
if (mobbin) html = html.replace('</head>', mobbinStyle + '</head>');
await writeFile(`/tmp/${prefix}.html`, html);
const theme = `<style>
:root{--paper:var(--background);--ink:var(--foreground);--accent:var(--primary);--wash:var(--secondary);--muted:var(--muted-foreground);--line:var(--border);--focus:var(--ring);background:transparent;color:var(--foreground);font-family:var(--font-sans)}
html,body,main{background:transparent;margin:0;padding:0}.masthead,.intro,.disclaimer{display:none}.filters{border:0;padding:0 0 16px}.filter-fields{flex-wrap:wrap}.design-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:24px 16px;padding-block:0 24px;height:720px;overflow-y:auto;scrollbar-gutter:stable}.design-card h2{font-size:18px}.card-description{font-size:12px}.card-meta{font-size:11px}.thumbnail{border-color:var(--border)}#viewer{height:760px;max-height:100%;background:var(--background);color:var(--foreground)}#design-frame{background:#fff}.preview-stage{background:var(--secondary)}.viewer-head{padding:10px 12px}.viewer-tools{padding:8px 12px}.viewer-heading h2{font-size:17px}.viewer-heading p{font-size:11px}.design-description{padding-inline:12px}#viewport-info{display:none}.intro-copy{color:var(--muted-foreground)}
@media(max-width:500px){.design-grid{grid-template-columns:1fr}.filter-fields{width:100%}.filters{gap:8px}.design-card h2{font-size:21px}}
</style>`;
const inline = html
  .replace(
    '</head>',
    `${theme}${mobbin ? mobbinStyle : ''}${layout ? '<style>.design-grid{grid-template-columns:1fr}.filters{display:none}</style>' : ''}</head>`
  )
  .replace('height: 100dvh;', 'height: 760px;');
assert.ok(inline.length <= 512000, `Inline gallery exceeds renderer limit: ${inline.length}`);
await writeFile(`/tmp/${prefix}-inline.html`, inline);
console.log(
  `Portable Galerie: /tmp/${prefix}.html; Inline: ${inline.length} Zeichen. Bilder für die portable Vergleichsansicht verkleinert; Originaldateien unverändert.`
);
