import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import sharp from 'sharp';

const catalog = JSON.parse(await readFile('public/entwuerfe/catalog.json', 'utf8'));
const documents = {};
const aliases = {};
const assets = {};
const thumbnails = {};
for (const design of catalog) {
  const html = await readFile(`public${design.path}`, 'utf8');
  documents[design.id] = html;
  for (const path of new Set(html.match(/\/(?:images|fonts)\/[\w.-]+\.(?:webp|png|woff2)/g))) {
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
        .resize({ width: 448, withoutEnlargement: true })
        .webp({ quality: 36 })
        .toBuffer();
    assets[key] = { mime, data: bytes.toString('base64') };
  }
  thumbnails[design.id] = (
    await sharp(`public${design.thumbnail}`).resize(256, 160).webp({ quality: 32 }).toBuffer()
  ).toString('base64');
}
const payload = gzipSync(
  Buffer.from(JSON.stringify({ catalog, documents, aliases, assets, thumbnails }))
).toString('base64');
const css = await readFile('public/entwuerfe/gallery.css', 'utf8');
const js = (await readFile('public/entwuerfe/gallery.js', 'utf8')).replace(
  "fetch('/entwuerfe/catalog.json')",
  'Promise.resolve(new Response(JSON.stringify(window.__designCatalog)))'
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
await writeFile('/tmp/akg-entwuerfe.html', html);
const theme = `<style>
:root{--paper:var(--background);--ink:var(--foreground);--accent:var(--primary);--wash:var(--secondary);--muted:var(--muted-foreground);--line:var(--border);--focus:var(--ring);background:transparent;color:var(--foreground);font-family:var(--font-sans)}
html,body,main{background:transparent;margin:0;padding:0}.masthead,.intro,.disclaimer{display:none}.filters{border:0;padding:0 0 16px}.filter-fields{flex-wrap:wrap}.design-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:24px 16px;padding-block:0 24px;height:720px;overflow-y:auto;scrollbar-gutter:stable}.design-card h2{font-size:18px}.card-description{font-size:12px}.card-meta{font-size:11px}.thumbnail{border-color:var(--border)}#viewer{height:760px;max-height:100%;background:var(--background);color:var(--foreground)}#design-frame{background:#fff}.preview-stage{background:var(--secondary)}.viewer-head{padding:10px 12px}.viewer-tools{padding:8px 12px}.viewer-heading h2{font-size:17px}.viewer-heading p{font-size:11px}.design-description{padding-inline:12px}#viewport-info{display:none}.intro-copy{color:var(--muted-foreground)}
@media(max-width:500px){.design-grid{grid-template-columns:1fr}.filter-fields{width:100%}.filters{gap:8px}.design-card h2{font-size:21px}}
</style>`;
const inline = html
  .replace('</head>', `${theme}</head>`)
  .replace('height: 100dvh;', 'height: 760px;');
assert.ok(inline.length <= 512000, `Inline gallery exceeds renderer limit: ${inline.length}`);
await writeFile('/tmp/akg-entwuerfe-inline.html', inline);
console.log(
  `Portable Galerie: /tmp/akg-entwuerfe.html; Inline: ${inline.length} Zeichen. Bilder für die portable Vergleichsansicht verkleinert; Originaldateien unverändert.`
);
