import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const own = resolve(fileURLToPath(new URL('../', import.meta.url)));
const publicRoot = resolve(own, '../../..');
const artifacts = resolve(own, '.hallmark');
const shotDir = '/tmp/akg-hallmark-sol-qa';
const { chromium } = await import(
  process.env.AKG_PLAYWRIGHT_MODULE || '/opt/t3/current/node_modules/playwright-core/index.mjs'
);
const executablePath =
  process.env.AKG_HALLMARK_BROWSER ||
  '/tmp/web-akg-playwright-arm64.F9Y3mL/chromium-1223/chrome-linux/chrome';
assert(existsSync(executablePath), 'Set AKG_HALLMARK_BROWSER to an existing Chromium executable.');
const manifest = JSON.parse(await readFile(resolve(own, 'manifest.json'), 'utf8'));
assert.equal(manifest.length, 5);
assert.deepEqual(
  manifest.map((p) => p.number),
  [1, 2, 3, 4, 5]
);
assert.equal(new Set(manifest.map((p) => p.title)).size, 5);
const sources = [
  'https://akg-kiel.de/wp-content/uploads/2024/01/2024_Banner_allianz_1.jpg',
  'https://akg-kiel.de/wp-content/uploads/2022/05/Gemeindefest-22-VIII.jpg',
  'https://akg-kiel.de/wp-content/uploads/2022/05/Gemeindefest-22-XII.jpg',
  'https://akg-kiel.de/wp-content/uploads/2024/01/Banner_Dreimaster.jpg'
];
const realRoutes = ['/gottesdienste', '/aktuelles', '/angebote', '/gemeinde', '/kontakt'];
const externalRequests = [];
const results = [];
await mkdir(shotDir, { recursive: true });
const browser = await chromium.launch({ executablePath, headless: true, args: ['--no-sandbox'] });
try {
  const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: 'reduce' });
  await context.route('**/*', async (route) => {
    const url = new URL(route.request().url());
    if (url.hostname !== 'hallmark-sol.local') {
      externalRequests.push(url.href);
      return route.abort();
    }
    const pathname = decodeURIComponent(url.pathname);
    const file = resolve(publicRoot, '.' + pathname);
    const allowed =
      file.startsWith(own + '/') || /^\/(images|fonts)\/[a-zA-Z0-9._-]+$/.test(pathname);
    if (!allowed || !file.startsWith(publicRoot + '/'))
      return route.fulfill({ status: 404, body: 'Not part of this design check' });
    try {
      const contentType =
        {
          '.html': 'text/html; charset=utf-8',
          '.png': 'image/png',
          '.webp': 'image/webp',
          '.woff2': 'font/woff2'
        }[extname(file)] || 'application/octet-stream';
      await route.fulfill({ status: 200, contentType, body: await readFile(file) });
    } catch {
      await route.fulfill({ status: 404, body: 'Missing local file' });
    }
  });
  const page = await context.newPage();
  for (const item of manifest) {
    const html = await readFile(resolve(own, `${item.number}.html`), 'utf8');
    assert(/^<!doctype html>/i.test(html));
    assert(
      !/<script|<iframe|<form|https?:\/\/[^\s"']+\.(?:css|js|woff|webp)/i.test(html),
      'No script, embed, fake form, or remote resource'
    );
    assert(/Hallmark · macrostructure:/.test(html));
    assert(/overflow-x: clip/.test(html));
    const url = `http://hallmark-sol.local/entwuerfe/hallmark/sol/${item.number}.html`;
    for (const width of [320, 375, 390, 414, 768, 1024, 1280, 1440, 1920]) {
      await page.setViewportSize({ width, height: width === 1280 ? 800 : 900 });
      await page.goto(url, { waitUntil: 'load' });
      await page.evaluate(async () => {
        document.querySelectorAll('img').forEach((img) => (img.loading = 'eager'));
        await Promise.all([...document.images].map((img) => img.decode()));
        await document.fonts.ready;
      });
      await page.keyboard.press('Tab');
      const report = await page.evaluate(
        ({ sources, realRoutes }) => {
          const visible = (el) =>
            el.getBoundingClientRect().width > 0 && el.getBoundingClientRect().height > 0;
          const all = [...document.querySelectorAll('body *')].filter(visible);
          const bounds = document.documentElement.clientWidth;
          const name = (el) =>
            `${el.tagName}.${el.className} ${el.textContent.trim().slice(0, 65)}`;
          const overflow = all
            .filter((el) => {
              const r = el.getBoundingClientRect();
              return (
                r.left < -1 ||
                r.right > bounds + 1 ||
                (['A', 'H1', 'H2', 'H3', 'SUMMARY'].includes(el.tagName) &&
                  el.scrollWidth > el.clientWidth + 1)
              );
            })
            .map(name);
          const images = [...document.images].map((img) => {
            const rect = img.getBoundingClientRect();
            return {
              src: img.getAttribute('src'),
              loaded: img.complete && img.naturalWidth > 0,
              ratioError: Math.abs(rect.width / rect.height - img.naturalWidth / img.naturalHeight)
            };
          });
          const duplicateIds = [...document.querySelectorAll('[id]')]
            .map((el) => el.id)
            .filter((id, i, arr) => arr.indexOf(id) !== i);
          const badLinks = [...document.querySelectorAll('a')]
            .filter((a) => {
              const href = a.getAttribute('href');
              if (!href || href === '#') return true;
              if (href.startsWith('#')) return !document.getElementById(href.slice(1));
              if (href.startsWith('/')) return !realRoutes.includes(href);
              return ![...sources, 'https://cafe-dreimaster.de/'].includes(href);
            })
            .map(name);
          const smallTargets = all
            .filter(
              (el) =>
                ['A', 'SUMMARY'].includes(el.tagName) &&
                (el.getBoundingClientRect().height < 43.9 ||
                  el.getBoundingClientRect().width < 43.9)
            )
            .map(name);
          const canvas = document.createElement('canvas');
          canvas.width = canvas.height = 1;
          const c = canvas.getContext('2d', { willReadFrequently: true });
          function rgba(value) {
            c.clearRect(0, 0, 1, 1);
            c.fillStyle = value;
            c.fillRect(0, 0, 1, 1);
            return [...c.getImageData(0, 0, 1, 1).data];
          }
          function luminance(rgb) {
            return rgb
              .slice(0, 3)
              .map((v) => v / 255)
              .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
              .reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);
          }
          const contrastFailures = [];
          let minContrast = Infinity;
          for (const el of all) {
            if (
              !Array.from(el.childNodes).some(
                (n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim()
              )
            )
              continue;
            const style = getComputedStyle(el);
            let ancestor = el,
              bg;
            while (ancestor && (!bg || bg[3] === 0)) {
              bg = rgba(getComputedStyle(ancestor).backgroundColor);
              ancestor = ancestor.parentElement;
            }
            if (!bg || bg[3] === 0) bg = [255, 255, 255, 255];
            const foreground = rgba(style.color);
            const a = luminance(foreground),
              b = luminance(bg);
            const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
            minContrast = Math.min(minContrast, ratio);
            const large =
              parseFloat(style.fontSize) >= 24 ||
              (parseFloat(style.fontSize) >= 18.66 && parseInt(style.fontWeight) >= 700);
            if (ratio < (large ? 3 : 4.5)) contrastFailures.push({ element: name(el), ratio });
          }
          const focusFailures = [];
          for (const el of all.filter((el) => ['A', 'SUMMARY'].includes(el.tagName))) {
            el.focus({ preventScroll: true });
            const style = getComputedStyle(el);
            let ancestor = el,
              bg;
            while (ancestor && (!bg || bg[3] === 0)) {
              bg = rgba(getComputedStyle(ancestor).backgroundColor);
              ancestor = ancestor.parentElement;
            }
            if (!bg || bg[3] === 0) bg = [255, 255, 255, 255];
            const ring = rgba(style.outlineColor);
            const a = luminance(ring),
              b = luminance(bg);
            const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
            if (parseFloat(style.outlineWidth) < 3 || ratio < 3)
              focusFailures.push({ element: name(el), ratio, width: style.outlineWidth });
          }
          document.activeElement?.blur();
          return {
            lang: document.documentElement.lang,
            title: document.title,
            charset: document.querySelector('meta[charset]')?.getAttribute('charset'),
            viewport: document.querySelector('meta[name="viewport"]')?.content,
            heroEssentialFits:
              document.querySelector('h1').getBoundingClientRect().bottom <= innerHeight &&
              document.querySelector('main a').getBoundingClientRect().bottom <= innerHeight,
            robots: document.querySelector('meta[name="robots"]')?.content,
            h1: document.querySelectorAll('h1').length,
            main: document.querySelectorAll('main').length,
            sections: document.querySelectorAll('main > section').length,
            duplicateIds,
            badLinks,
            smallTargets,
            overflow,
            images,
            font: document.fonts.check('17px Figtree'),
            sourceCount: sources.filter((source) =>
              document.querySelector(`figcaption a[href="${source}"]`)
            ).length,
            minContrast: Math.round(minContrast * 100) / 100,
            contrastFailures,
            focusFailures,
            h1Lines:
              document.querySelector('h1').getBoundingClientRect().height /
              parseFloat(getComputedStyle(document.querySelector('h1')).lineHeight)
          };
        },
        { sources, realRoutes }
      );
      const failures = [];
      if (
        report.lang !== 'de' ||
        report.robots !== 'noindex, nofollow' ||
        report.charset !== 'utf-8' ||
        !report.viewport?.includes('width=device-width') ||
        report.title !== `${item.title} · AKG Startseitenentwurf ${item.number}`
      )
        failures.push('metadata');
      if (width === 1280 && !report.heroEssentialFits) failures.push('hero-fit');
      if (report.h1 !== 1 || report.main !== 1 || report.sections < 4 || report.sections > 6)
        failures.push('landmarks/headings/sections');
      for (const key of [
        'duplicateIds',
        'badLinks',
        'smallTargets',
        'overflow',
        'contrastFailures',
        'focusFailures'
      ])
        if (report[key].length) failures.push(key);
      if (
        !report.font ||
        report.sourceCount !== 4 ||
        report.images.length !== 5 ||
        report.images.some((i) => !i.loaded || i.ratioError > 0.01)
      )
        failures.push('assets');
      results.push({ page: item.number, width, failures, ...report });
      if ([320, 375, 390, 414, 768, 1280, 1440].includes(width))
        await page.screenshot({ path: `${shotDir}/${item.number}-${width}.png`, fullPage: true });
      // Native menu and FAQ disclosures work by keyboard even with JavaScript disabled.
      for (const summary of await page.locator('details > summary:visible').all()) {
        await summary.focus();
        const before = await summary.evaluate((el) => el.parentElement.open);
        await page.keyboard.press('Enter');
        assert.equal(
          await summary.evaluate((el) => el.parentElement.open),
          !before,
          `Page ${item.number} disclosure toggles at ${width}`
        );
        const openOverflow = await page.evaluate(() =>
          [...document.querySelectorAll('details[open] a, details[open] summary')]
            .filter((el) => {
              const r = el.getBoundingClientRect();
              return (
                r.width > 0 &&
                (r.right > document.documentElement.clientWidth + 1 ||
                  r.left < -1 ||
                  el.scrollWidth > el.clientWidth + 1)
              );
            })
            .map((el) => el.textContent.trim())
        );
        assert.deepEqual(openOverflow, [], `Page ${item.number} open menu fits at ${width}`);
        await page.keyboard.press('Enter');
      }
      await page.goto(url);
      await page.keyboard.press('Tab');
      assert.equal(await page.locator(':focus').textContent(), 'Zum Inhalt');
      await page.keyboard.press('Enter');
      assert.equal(await page.locator(':focus').getAttribute('id'), 'inhalt');
    }
  }
  assert.deepEqual(externalRequests, [], 'No external subresource requests');
  await writeFile(
    resolve(artifacts, 'check-results.json'),
    JSON.stringify(
      { checks: results.length, javaScript: false, externalRequests, results },
      null,
      2
    ) + '\n'
  );
  const failed = results.filter((r) => r.failures.length);
  console.log(
    JSON.stringify(
      {
        checks: results.length,
        failed: failed.map(
          ({ page, width, failures, overflow, contrastFailures, focusFailures, smallTargets }) => ({
            page,
            width,
            failures,
            overflow,
            contrastFailures,
            focusFailures,
            smallTargets
          })
        ),
        screenshotDirectory: shotDir
      },
      null,
      2
    )
  );
  assert.equal(
    failed.length,
    0,
    'Every tested page/viewport must pass. See .hallmark/check-results.json.'
  );
} finally {
  await browser.close();
}
