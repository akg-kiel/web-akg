import assert from 'node:assert/strict';
import { readFile, access, mkdir } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../../..');
const manifest = JSON.parse(await readFile(path.join(here, 'manifest.json'), 'utf8'));
assert.deepEqual(
  manifest.map((entry) => entry.number),
  [1, 2, 3, 4, 5]
);
assert.equal(new Set(manifest.map((entry) => entry.title)).size, 5);
const originals = [
  'https://akg-kiel.de/wp-content/uploads/2024/01/2024_Banner_allianz_1.jpg',
  'https://akg-kiel.de/wp-content/uploads/2022/05/Gemeindefest-22-VIII.jpg',
  'https://akg-kiel.de/wp-content/uploads/2022/05/Gemeindefest-22-XII.jpg',
  'https://akg-kiel.de/wp-content/uploads/2024/01/Banner_Dreimaster.jpg'
];
for (const item of manifest) {
  assert.deepEqual(Object.keys(item).sort(), ['description', 'number', 'structure', 'title']);
  const html = await readFile(path.join(here, `${item.number}.html`), 'utf8');
  assert.match(html, /^<!doctype html>/i);
  assert.match(html, /<html lang="de">/);
  assert.match(html, /name="robots" content="noindex, nofollow"/);
  assert.equal((html.match(/<main\b/g) || []).length, 1);
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.equal((html.match(/<figure\b/g) || []).length, 4);
  assert.equal((html.match(/<img\b/g) || []).length, 5);
  assert.doesNotMatch(
    html,
    /<(script|iframe|form)\b|(?:src|srcset)="https?:|href="#"|object-fit\s*:\s*cover/i
  );
  for (const source of originals) assert.ok(html.includes(`href="${source}"`));
  assert.match(html, /Frank Lönne/);
  assert.equal((html.match(/Gemeindefest 2022<\/span>/g) || []).length, 2);
  assert.match(html, /Aktuelle Meldungen sind in diesem Entwurf nicht eingebunden\./);
  assert.match(
    html,
    /href="https:\/\/cafe-dreimaster\.de\/"[^>]*>[^<]*<span class="external">extern ↗/
  );
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(ids.length, new Set(ids).size, 'duplicate ids');
  for (const [, anchor] of html.matchAll(/href="#([^"]+)"/g))
    assert.ok(ids.includes(anchor), anchor);
  for (const [, asset] of html.matchAll(/(?:src|href)="(\/(?:images|fonts)\/[^" ]+)"/g)) {
    await access(path.join(root, asset));
  }
  for (const [, asset] of html.matchAll(/(\/images\/[^\s,"]+\.webp)/g))
    await access(path.join(root, asset));
  for (const file of [
    'gottesdienste/index.astro',
    'aktuelles/index.astro',
    'angebote.astro',
    'gemeinde.astro'
  ]) {
    await access(path.join(root, '../src/pages', file));
  }
  assert.match(
    await readFile(path.join(root, '../src/pages/[page].astro'), 'utf8'),
    /slug: 'kontakt'/
  );
  console.log(`Static checks: ${item.number}.html — ${item.title} OK`);
}

const luminance = (hex) =>
  hex
    .match(/[a-f\d]{2}/gi)
    .map((v) => parseInt(v, 16) / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
    .reduce((total, v, i) => total + v * [0.2126, 0.7152, 0.0722][i], 0);
for (const [fg, bg] of [
  ['173b50', 'ffffff'],
  ['173b50', 'eaf3f7'],
  ['486170', 'ffffff'],
  ['486170', 'eaf3f7'],
  ['006c9e', 'ffffff'],
  ['006c9e', 'eaf3f7']
]) {
  const values = [luminance(fg), luminance(bg)].sort((a, b) => b - a);
  const ratio = (values[0] + 0.05) / (values[1] + 0.05);
  assert.ok(ratio >= 4.5, `${fg}/${bg}: ${ratio}`);
  console.log(`Text contrast #${fg}/#${bg}: ${ratio.toFixed(2)}:1`);
}

if (process.argv.includes('--browser')) {
  assert.ok(
    process.env.AKG_PLAYWRIGHT_MODULE && process.env.AKG_CHROMIUM,
    'Set AKG_PLAYWRIGHT_MODULE and AKG_CHROMIUM to existing local tools. No installation needed.'
  );
  const { chromium } = await import(pathToFileURL(process.env.AKG_PLAYWRIGHT_MODULE).href);
  const browser = await chromium.launch({
    executablePath: process.env.AKG_CHROMIUM,
    headless: true,
    args: ['--no-sandbox']
  });
  const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: 'reduce' });
  const requests = [];
  await context.route('**/*', async (route) => {
    const url = new URL(route.request().url());
    assert.equal(url.origin, 'http://akg-draft.test', 'Unexpected external runtime request');
    const file = path.resolve(root, `.${url.pathname}`);
    assert.ok(file.startsWith(root + path.sep));
    const body = await readFile(file);
    requests.push(url.pathname);
    const type = file.endsWith('.html')
      ? 'text/html; charset=utf-8'
      : file.endsWith('.woff2')
        ? 'font/woff2'
        : file.endsWith('.webp')
          ? 'image/webp'
          : 'image/png';
    await route.fulfill({ body, contentType: type });
  });
  try {
    const page = await context.newPage();
    for (const { number } of manifest) {
      for (const width of [320, 375, 390, 414, 768, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(`http://akg-draft.test/entwuerfe/better-websites/astra/${number}.html`);
        await page.evaluate(async () => {
          await document.fonts.ready;
        });
        for (const image of await page.locator('img').all()) await image.scrollIntoViewIfNeeded();
        await page.waitForFunction(() =>
          [...document.images].every((image) => image.complete && image.naturalWidth > 0)
        );
        await page.evaluate(() => window.scrollTo(0, 0));
        const checkLayout = async () => {
          const findings = await page.evaluate(() => {
            const issues = [];
            if (document.documentElement.scrollWidth > innerWidth + 1)
              issues.push('horizontal document overflow');
            for (const el of document.querySelectorAll('body *')) {
              const rect = el.getBoundingClientRect();
              if (rect.width && (rect.right > innerWidth + 1 || rect.left < -1))
                issues.push(`outside viewport: ${el.tagName}.${el.className}`);
            }
            for (const el of document.querySelectorAll('a, summary')) {
              const r = el.getBoundingClientRect();
              if (r.width && (r.width < 43.5 || r.height < 43.5))
                issues.push(`target below 44px: ${el.textContent.trim()}`);
            }
            for (const image of document.images) {
              const r = image.getBoundingClientRect();
              if (Math.abs(r.width / r.height - image.naturalWidth / image.naturalHeight) > 0.01)
                issues.push(`distorted image: ${image.src}`);
              if (getComputedStyle(image).filter !== 'none') issues.push('image filter');
            }
            return issues;
          });
          assert.deepEqual(findings, [], `${number}.html @ ${width}px`);
        };
        await checkLayout();
        await page.keyboard.press('Tab');
        assert.equal(await page.evaluate(() => document.activeElement.className), 'skip');
        await page.keyboard.press('Enter');
        assert.equal(await page.evaluate(() => document.activeElement.id), 'inhalt');
        const menu = page.locator('.mobile-nav > summary');
        if (await menu.isVisible()) {
          await menu.focus();
          await page.keyboard.press('Enter');
          assert.equal(await page.locator('.mobile-nav').getAttribute('open'), '');
          await checkLayout();
          await page.keyboard.press('Tab');
          assert.equal(
            await page.evaluate(() => document.activeElement.getAttribute('href')),
            '#gottesdienste'
          );
          await menu.focus();
          await page.keyboard.press('Space');
          assert.equal(await page.locator('.mobile-nav').getAttribute('open'), null);
        }
        for (const summary of await page.locator('.disclosure > summary').all()) {
          await summary.focus();
          const before = await summary.evaluate((el) => el.parentElement.open);
          await page.keyboard.press('Enter');
          assert.equal(await summary.evaluate((el) => el.parentElement.open), !before);
          await checkLayout();
        }
        await page.evaluate(() => window.scrollTo(0, 0));
        if (process.argv.includes('--screenshots') && [390, 1440].includes(width)) {
          await mkdir(path.join(here, '.checks'), { recursive: true });
          await page.screenshot({
            path: path.join(here, '.checks', `${number}-${width}.png`),
            fullPage: true
          });
        }
        console.log(
          `Browser: ${number}.html @ ${width}px — no-JS, reduced motion, images, overflow, 44px targets, keyboard OK`
        );
      }
    }
    assert.ok(
      requests.includes('/fonts/figtree-latin-variable.woff2'),
      'Local Figtree was requested'
    );
    console.log(`Only local runtime requests: ${new Set(requests).size} unique paths`);
  } finally {
    await browser.close();
  }
}
