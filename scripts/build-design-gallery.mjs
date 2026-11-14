import assert from 'node:assert/strict';
import { access, readFile, writeFile } from 'node:fs/promises';

export const designSkills = [
  ['hallmark', 'Hallmark'],
  ['impeccable', 'Impeccable'],
  ['taste', 'Taste'],
  ['better-websites', 'Design Better Websites'],
  ['web-design-engineer', 'Web Design Engineer']
];
export const designModels = [
  ['astra', 'GPT-6 Astra'],
  ['sol', 'GPT-6.1 Sol']
];

export async function buildCatalog() {
  const catalog = [];
  for (const [skill, skillName] of designSkills) {
    for (const [model, modelName] of designModels) {
      const directory = `public/entwuerfe/${skill}/${model}`;
      const manifest = JSON.parse(await readFile(`${directory}/manifest.json`, 'utf8'));
      assert.deepEqual(
        manifest.map((entry) => entry.number),
        [1, 2, 3, 4, 5],
        directory
      );
      for (const entry of manifest) {
        for (const key of ['title', 'description', 'structure']) {
          assert.equal(typeof entry[key], 'string', `${directory}: ${key}`);
          assert.ok(entry[key].trim(), `${directory}: empty ${key}`);
        }
        await access(`${directory}/${entry.number}.html`);
        catalog.push({
          id: `${skill}/${model}/${entry.number}`,
          skill,
          skillName,
          model,
          modelName,
          number: entry.number,
          title: entry.title,
          description: entry.description,
          structure: entry.structure,
          path: `/entwuerfe/${skill}/${model}/${entry.number}.html`,
          thumbnail: `/entwuerfe/thumbnails/${skill}-${model}-${entry.number}.webp`
        });
      }
    }
  }
  return catalog;
}

if (import.meta.main) {
  const catalog = await buildCatalog();
  await writeFile('public/entwuerfe/catalog.json', JSON.stringify(catalog, null, 2) + '\n');
  const indexPath = 'public/entwuerfe/index.html';
  const html = await readFile(indexPath, 'utf8');
  const escape = (text) =>
    text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
  const links = catalog
    .map(
      (design) =>
        `<li><a href="${design.path}">${escape(design.skillName)} · ${escape(design.modelName)} · ${design.number}: ${escape(design.title)}</a></li>`
    )
    .join('');
  const fallback = /<ul id="fallback-links">[\s\S]*?<\/ul>/;
  const updated = `<ul id="fallback-links">${links}</ul>`;
  const normalize = (text) =>
    text.replace(/\s+/g, ' ').replace(/>\s+/g, '>').replace(/\s+</g, '<').replace(/\s+>/g, '>');
  if (normalize(html.match(fallback)?.[0] ?? '') !== normalize(updated))
    await writeFile(indexPath, html.replace(fallback, updated));
  console.log(`Galerieverzeichnis: ${catalog.length} Entwürfe`);
}
