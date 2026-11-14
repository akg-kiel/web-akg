// Run: PLAYWRIGHT_MODULE=/path/to/playwright-core/index.mjs node public/entwuerfe/hallmark/astra/check.mjs
// Uses the existing browser installation; serves only local files through request interception.
import assert from 'node:assert/strict';
import { readFile, stat, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const own = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(own, '../../../..');
const publicRoot = path.join(root, 'public');
const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE
    ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href
    : 'playwright-core'
);
const manifest = JSON.parse(await readFile(path.join(own, 'manifest.json'), 'utf8'));
assert.deepEqual(
  manifest.map((entry) => entry.number),
  [1, 2, 3, 4, 5]
);
for (const entry of manifest) {
  assert.deepEqual(Object.keys(entry).sort(), ['description', 'number', 'structure', 'title']);
  for (const key of ['title', 'description', 'structure']) assert.ok(entry[key].trim());
}
assert.equal(new Set(manifest.map((entry) => entry.title)).size, 5);
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: 'reduce' });
const page = await context.newPage();
const requests = new Set();
const failures = [];
const report = [];
await context.route('**/*', async (route) => {
  const url = new URL(route.request().url());
  requests.add(url.origin);
  if (url.origin !== 'http://hallmark-astra.test') {
    failures.push(`Unexpected external request: ${url.href}`);
    return route.abort();
  }
  const file = path.resolve(publicRoot, '.' + url.pathname);
  if (!file.startsWith(publicRoot + path.sep)) return route.abort();
  const type = {
    '.html': 'text/html',
    '.webp': 'image/webp',
    '.png': 'image/png',
    '.woff2': 'font/woff2'
  }[path.extname(file)];
  try {
    await route.fulfill({ body: await readFile(file), contentType: type });
  } catch {
    failures.push(`Missing resource: ${url.pathname}`);
    await route.abort();
  }
});
try {
  for (const entry of manifest) {
    const n = entry.number;
    const html = await readFile(path.join(own, `${n}.html`), 'utf8');
    assert.match(html, /^<!doctype html>/i);
    assert.ok(!/<(?:script|iframe|form)\b/i.test(html));
    assert.ok(!/object-fit:\s*cover|filter\s*:|@import\b|overflow-x:\s*hidden/i.test(html));
    for (const width of [320, 375, 390, 414, 768, 1280, 1440, 1920]) {
      await page.setViewportSize({
        width,
        height: width === 1280 ? 800 : width < 768 ? 900 : 1000
      });
      await page.goto(`http://hallmark-astra.test/entwuerfe/hallmark/astra/${n}.html`, {
        waitUntil: 'networkidle'
      });
      // Trigger native lazy loading, then inspect the full document, not just the first fold.
      await page.evaluate(async () => {
        await document.fonts.ready;
        for (const img of document.images) {
          img.loading = 'eager';
          await img.decode();
        }
      });
      const result = await page.evaluate(() => {
        const errors = [];
        const visible = (el) =>
          el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true });
        const rect = (el) => el.getBoundingClientRect();
        if (document.documentElement.scrollWidth > innerWidth) errors.push('Root overflow');
        if (
          document.querySelectorAll('main').length !== 1 ||
          document.querySelectorAll('h1').length !== 1
        )
          errors.push('Main/H1 count');
        if (document.documentElement.lang !== 'de') errors.push('Language');
        if (document.querySelector('meta[name="robots"]')?.content !== 'noindex, nofollow')
          errors.push('Robots');
        const sections = document.querySelectorAll('main > section').length;
        if (sections < 4 || sections > 6) errors.push(`Section count: ${sections}`);
        const ids = [...document.querySelectorAll('[id]')].map((el) => el.id);
        if (new Set(ids).size !== ids.length) errors.push('Duplicate id');
        const photos = [...document.querySelectorAll('figure img')];
        if (photos.length !== 4) errors.push('Expected four photos');
        for (const img of document.images) {
          const r = rect(img);
          if (!img.complete || !img.naturalWidth || !img.alt)
            errors.push(`Image unavailable or unnamed: ${img.src}`);
          if (Math.abs(r.width / r.height - img.naturalWidth / img.naturalHeight) > 0.02)
            errors.push(`Distorted image: ${img.src}`);
        }
        for (const figure of document.querySelectorAll('figure')) {
          const caption = figure.querySelector('figcaption');
          if (!caption?.querySelector('a[href^="https://akg-kiel.de/wp-content/uploads/"]'))
            errors.push('Photo source missing');
          if (!/Archivfoto|Gemeindefest 2022/.test(caption?.textContent))
            errors.push('Archive caption missing');
        }
        const logo = document.querySelector('.logo img');
        if (logo?.getAttribute('src') !== '/images/apostel-logo.png') errors.push('Wrong logo');
        if (
          !document
            .querySelector('a[href="https://cafe-dreimaster.de/"]')
            ?.textContent.includes('extern')
        )
          errors.push('External café marking');
        for (const a of document.querySelectorAll('a')) {
          const href = a.getAttribute('href');
          if (!href || href === '#') errors.push('Empty link');
          if (href?.startsWith('#') && !document.getElementById(href.slice(1)))
            errors.push(`Dead fragment: ${href}`);
          if (!visible(a) || a.classList.contains('skip')) continue;
          const r = rect(a);
          if (r.height < 43.9 || r.width < 43.9)
            errors.push(`Small link target: ${a.textContent.trim()}`);
          if (r.left < -0.5 || r.right > innerWidth + 0.5)
            errors.push(`Offscreen link: ${a.textContent.trim()}`);
          if (!a.querySelector('img')) {
            const range = document.createRange();
            range.selectNodeContents(a);
            const lines = [...range.getClientRects()].filter((r) => r.width > 0 && r.height > 0);
            if (
              lines.length &&
              Math.max(...lines.map((r) => r.top)) - Math.min(...lines.map((r) => r.top)) > 10
            )
              errors.push(`Wrapped link: ${a.textContent.trim()}`);
          }
        }
        for (const el of document.querySelectorAll('h1,h2,h3,p,img,summary')) {
          if (!visible(el)) continue;
          const r = rect(el);
          if (r.left < -0.5 || r.right > innerWidth + 0.5 || el.scrollWidth > el.clientWidth + 1)
            errors.push(`Content overflow: ${el.tagName} ${el.textContent.trim().slice(0, 70)}`);
        }
        for (const summary of document.querySelectorAll('summary')) {
          if (visible(summary) && rect(summary).height < 44) errors.push('Small summary target');
        }
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = 1;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        const luminances = new Map();
        const luminance = (color) => {
          if (!luminances.has(color)) {
            ctx.clearRect(0, 0, 1, 1);
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, 1, 1);
            const rgb = [...ctx.getImageData(0, 0, 1, 1).data].slice(0, 3).map((v) => {
              v /= 255;
              return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
            });
            luminances.set(color, rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722);
          }
          return luminances.get(color);
        };
        let minContrast = Infinity;
        for (const el of document.querySelectorAll('body *')) {
          if (
            !visible(el) ||
            ![...el.childNodes].some((node) => node.nodeType === 3 && node.textContent.trim())
          )
            continue;
          if (['STYLE', 'SCRIPT'].includes(el.tagName)) continue;
          const style = getComputedStyle(el);
          let parent = el;
          while (
            parent &&
            ['transparent', 'rgba(0, 0, 0, 0)'].includes(getComputedStyle(parent).backgroundColor)
          )
            parent = parent.parentElement;
          const background = getComputedStyle(parent || document.documentElement).backgroundColor;
          const a = luminance(style.color),
            b = luminance(background);
          const contrast = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
          minContrast = Math.min(minContrast, contrast);
          const size = parseFloat(style.fontSize);
          const threshold =
            size >= 24 || (size >= 18.66 && parseInt(style.fontWeight) >= 700) ? 3 : 4.5;
          if (contrast < threshold)
            errors.push(
              'Text contrast ' + contrast.toFixed(2) + ': ' + el.textContent.trim().slice(0, 50)
            );
        }
        return {
          errors,
          title: document.title,
          sections,
          height: document.documentElement.scrollHeight,
          minContrast: +minContrast.toFixed(2)
        };
      });
      assert.deepEqual(result.errors, [], `${n}.html @ ${width}: ${result.errors.join('; ')}`);
      report.push({ page: n, width, ...result });

      const summary = page.locator('.menu > summary:visible').first();
      if (await summary.count()) {
        await summary.focus();
        await page.keyboard.press('Enter');
        assert.equal(await summary.evaluate((el) => el.parentElement.open), true);
        assert.equal(await page.locator('.menu[open] nav a').count(), 5);
        assert.equal(
          await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
          true
        );
        await page.keyboard.press('Enter');
        assert.equal(await summary.evaluate((el) => el.parentElement.open), false);
      }
      for (const summary of await page.locator('.answer > summary').all()) {
        await summary.focus();
        await page.keyboard.press('Enter');
        assert.equal(await summary.evaluate((el) => el.parentElement.open), false);
        await page.keyboard.press('Space');
        assert.equal(await summary.evaluate((el) => el.parentElement.open), true);
      }
      await page.locator('.skip').focus();
      assert.equal(
        await page.locator('.skip').evaluate((el) => getComputedStyle(el).outlineStyle),
        'solid'
      );
      await page.keyboard.press('Enter');
      assert.equal(await page.evaluate(() => document.activeElement.id), 'inhalt');
      if ([390, 1440].includes(width)) {
        await page.evaluate(() => (document.documentElement.style.fontSize = '200%'));
        const overflow = await page.evaluate(() =>
          [...document.querySelectorAll('main *, header *, footer *')]
            .filter((el) => {
              if (!el.checkVisibility({ checkVisibilityCSS: true })) return false;
              const r = el.getBoundingClientRect();
              return (
                r.left < -0.5 || r.right > innerWidth + 0.5 || el.scrollWidth > el.clientWidth + 1
              );
            })
            .map((el) => el.tagName + '.' + el.className)
        );
        assert.deepEqual(overflow, [], n + '.html 200% text @ ' + width);
        await page.evaluate(() => document.documentElement.style.removeProperty('font-size'));
      }
      await page.evaluate(() => {
        document.activeElement.blur();
        window.scrollTo(0, 0);
      });
      if (process.env.SHOT_DIR && [390, 1440].includes(width)) {
        await mkdir(process.env.SHOT_DIR, { recursive: true });
        await page.screenshot({
          path: path.join(process.env.SHOT_DIR, `${n}-${width}.png`),
          fullPage: true
        });
      }
    }
    for (const route of ['/gottesdienste', '/aktuelles', '/angebote', '/gemeinde', '/kontakt']) {
      assert.ok(
        (await stat(path.join(root, 'src/pages', route, 'index.astro')).catch(() => null)) ||
          (await stat(path.join(root, 'src/pages', route + '.astro')).catch(() => null)) ||
          (await readFile(path.join(root, 'src/pages/[page].astro'), 'utf8')).includes(
            `slug: '${route.slice(1)}'`
          ),
        `Existing destination: ${route}`
      );
    }
  }
  assert.deepEqual(failures, []);
  assert.deepEqual([...requests], ['http://hallmark-astra.test']);
  await writeFile(
    path.join(own, '.hallmark/check-results.json'),
    JSON.stringify(
      {
        engine: await browser.version(),
        javaScript: false,
        reducedMotion: true,
        checks:
          '40 viewport passes; computed text contrast; 200% root text at 390/1440; images, fragments, routes, semantics, no external loads, keyboard disclosures and skip link',
        results: report
      },
      null,
      2
    ) + '\n'
  );
  console.log(
    `PASS: ${report.length} page/viewport combinations; text contrast >= 4.5:1; 200% root text; JavaScript off; keyboard menus/details/skip link; local assets and destination routes.`
  );
} finally {
  await browser.close();
}
