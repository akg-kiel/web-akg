import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { chromium } from 'playwright-core';
import sharp from 'sharp';

const require = createRequire(import.meta.url);
assert.equal(require('playwright-core/package.json').version, process.env.PLAYWRIGHT_VERSION);
const root = resolve('public');
const galleryOnly = process.argv.includes('--gallery-only');
const output = galleryOnly ? '/tmp/akg-design-gallery-controls-qa' : '/tmp/akg-design-gallery-qa';
const mime = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.woff2': 'font/woff2'
};
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const file = resolve(root, '.' + pathname);
    if (!file.startsWith(root + sep)) throw new Error('Not public');
    const content = await readFile(file);
    response.writeHead(200, {
      'Content-Type': mime[extname(file)] ?? 'application/octet-stream',
      'X-Robots-Tag': 'noindex, nofollow',
      'X-Frame-Options': 'DENY'
    });
    response.end(content);
  } catch {
    response.writeHead(404);
    response.end('Not found');
  }
});
await new Promise((done) => server.listen(0, '127.0.0.1', done));
const origin = `http://127.0.0.1:${server.address().port}`;
const catalog = JSON.parse(await readFile('public/entwuerfe/catalog.json', 'utf8'));
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const findings = [];
const errors = [];
let galleryAxe = null;
const thirdParty = new Set();
await mkdir(output, { recursive: true });
await mkdir('public/entwuerfe/thumbnails', { recursive: true });
try {
  const context = await browser.newContext();
  await context.route('**/*', (route) => {
    const url = new URL(route.request().url());
    if (url.origin !== origin) {
      thirdParty.add(url.href);
      return route.abort();
    }
    return route.continue();
  });
  const page = await context.newPage();
  page.on('pageerror', (error) => errors.push(String(error)));
  for (const design of galleryOnly ? [] : catalog) {
    const checks = [];
    for (const width of [320, 375, 390, 414, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(origin + design.path);
      await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all(
          [...document.images].map((image) => {
            image.loading = 'eager';
            return image.decode();
          })
        );
      });
      const issues = await page.evaluate(() => {
        const result = [];
        if (document.documentElement.scrollWidth > innerWidth + 1)
          result.push('horizontal overflow');
        if (
          document.querySelectorAll('main').length !== 1 ||
          document.querySelectorAll('h1').length !== 1
        )
          result.push('main/H1');
        const ids = [...document.querySelectorAll('[id]')].map((element) => element.id);
        if (new Set(ids).size !== ids.length) result.push('duplicate IDs');
        for (const link of document.querySelectorAll('a[href^="#"]')) {
          if (!document.getElementById(link.getAttribute('href').slice(1)))
            result.push('missing anchor ' + link.getAttribute('href'));
        }
        for (const image of document.images) {
          const box = image.getBoundingClientRect();
          if (!image.complete || !image.naturalWidth) result.push('broken image ' + image.src);
          const style = getComputedStyle(image);
          const contentWidth =
            box.width -
            ['borderLeftWidth', 'borderRightWidth', 'paddingLeft', 'paddingRight'].reduce(
              (sum, key) => sum + parseFloat(style[key]),
              0
            );
          const contentHeight =
            box.height -
            ['borderTopWidth', 'borderBottomWidth', 'paddingTop', 'paddingBottom'].reduce(
              (sum, key) => sum + parseFloat(style[key]),
              0
            );
          if (
            contentWidth > 20 &&
            Math.abs(contentWidth / contentHeight - image.naturalWidth / image.naturalHeight) /
              (image.naturalWidth / image.naturalHeight) >
              0.05
          )
            result.push('distorted image ' + image.getAttribute('src'));
          if (!image.hasAttribute('alt')) result.push('missing image alt');
        }
        if (!document.querySelector('meta[name="robots"]')?.content.includes('noindex'))
          result.push('missing noindex');
        return result;
      });
      checks.push({ width, issues });
      if ([390, 1440].includes(width)) {
        await page.keyboard.press('Tab');
        const skipTarget = await page.evaluate(() => document.activeElement?.getAttribute('href'));
        if (!skipTarget?.startsWith('#')) issues.push('skip link not first keyboard target');
        await page.keyboard.press('Enter');
        if (await page.locator('main').evaluate((element) => element !== document.activeElement))
          issues.push('skip link does not focus main');
        for (const summary of await page.locator('details > summary').all()) {
          if (!(await summary.isVisible())) continue;
          const wasOpen = await summary.evaluate((element) => element.parentElement.open);
          await summary.focus();
          await page.keyboard.press('Enter');
          if ((await summary.evaluate((element) => element.parentElement.open)) === wasOpen)
            issues.push('details keyboard toggle');
          await page.keyboard.press('Enter');
        }
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.evaluate(() => document.activeElement?.blur());
      }
      if ([390, 768, 1440].includes(width)) {
        await page.screenshot({
          path: `${output}/${design.id.replaceAll('/', '-')}-${width}.png`,
          fullPage: true
        });
      }
      if (width === 1440) {
        const png = await page.screenshot();
        await sharp(png).resize(640, 400).webp({ quality: 65 }).toFile(`public${design.thumbnail}`);
      }
      if ([390, 1440].includes(width)) {
        await page.addScriptTag({ path: require.resolve('axe-core/axe.min.js') });
        const violations = await page.evaluate(async () =>
          (
            await axe.run(document, {
              runOnly: {
                type: 'tag',
                values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']
              }
            })
          ).violations.map((item) => ({
            id: item.id,
            impact: item.impact,
            elements: item.nodes.map((node) => node.target.join(' '))
          }))
        );
        checks.at(-1).axe = violations;
      }
    }
    findings.push({ id: design.id, checks });
    console.log(
      `${design.id}: ${checks.reduce((sum, item) => sum + item.issues.length + (item.axe?.length ?? 0), 0)} Befunde`
    );
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(origin + '/entwuerfe/index.html');
  await page.waitForFunction(() => document.querySelectorAll('.design-card').length === 50);
  await page.selectOption('#skill', 'taste');
  await page.selectOption('#model', 'astra');
  await page.waitForFunction(() => document.querySelectorAll('.design-card').length === 5);
  assert.equal(new URL(page.url()).searchParams.get('skill'), 'taste');
  assert.equal(new URL(page.url()).searchParams.get('model'), 'astra');
  await page.locator('.design-trigger').first().focus();
  await page.keyboard.press('Enter');
  await page.waitForFunction(
    () => document.querySelector('#viewer').open && !document.querySelector('#design-frame').hidden
  );
  assert.match(await page.locator('#viewer-meta').innerText(), /Taste.*Astra/);
  assert.equal(new URL(page.url()).hash, '#taste/astra/1');
  const frame = page.frameLocator('#design-frame');
  await frame.locator('h1').waitFor();
  await frame.locator('a[href^="#"]').first().focus();
  await page.keyboard.press('Enter');
  assert.equal(
    await frame.locator('main').evaluate((element) => element === document.activeElement),
    true
  );
  await page.locator('[data-width="390"]').click();
  assert.equal(await frame.locator('html').evaluate(() => innerWidth), 390);
  await page.locator('#next').click();
  await page.waitForFunction(() =>
    document.querySelector('#viewer-meta').textContent.includes('Variante 2')
  );
  assert.equal(new URL(page.url()).hash, '#taste/astra/2');
  await page.locator('#previous').click();
  await page.waitForFunction(() =>
    document.querySelector('#viewer-meta').textContent.includes('Variante 1')
  );
  assert.equal(new URL(page.url()).hash, '#taste/astra/1');
  await page.waitForFunction(() => !document.querySelector('#design-frame').hidden);
  await frame.locator('body').evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      [...document.images].map((image) => {
        image.loading = 'eager';
        return image.decode();
      })
    );
  });
  await page.locator('[data-width="1440"]').click();
  await page.screenshot({ path: `${output}/viewer-desktop.png` });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator('[data-width="390"]').click();
  await page.screenshot({ path: `${output}/viewer-mobile.png` });
  await page.keyboard.press('Escape');
  await page.waitForURL((url) => !url.hash);
  assert.equal(new URL(page.url()).hash, '');
  assert.equal(await page.locator('#viewer').evaluate((dialog) => dialog.open), false);
  assert.equal(
    await page
      .locator('.design-trigger')
      .first()
      .evaluate((element) => element === document.activeElement),
    true
  );
  await page.goto(origin + '/entwuerfe/index.html#hallmark/sol/3');
  await page.waitForFunction(
    () => document.querySelector('#viewer').open && !document.querySelector('#design-frame').hidden
  );
  assert.match(await page.locator('#viewer-meta').innerText(), /Hallmark.*Sol.*3/);
  await page.keyboard.press('Escape');
  await page.selectOption('#skill', 'all');
  await page.selectOption('#model', 'all');
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    assert.equal(
      await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1),
      false,
      `Gallery overflow ${width}`
    );
    const thumbnailRatio = await page
      .locator('.thumbnail')
      .first()
      .evaluate((image) => {
        const box = image.getBoundingClientRect();
        return box.width / box.height;
      });
    assert.ok(Math.abs(thumbnailRatio - 1.6) < 0.02, `Thumbnail ratio ${width}`);
    if (width === 390) await page.screenshot({ path: `${output}/gallery-mobile.png` });
  }
  await page.addScriptTag({ path: require.resolve('axe-core/axe.min.js') });
  galleryAxe = await page.evaluate(async () =>
    (await axe.run()).violations.map((item) => ({
      id: item.id,
      nodes: item.nodes.map((node) => node.target)
    }))
  );
  await page.screenshot({ path: `${output}/gallery-desktop.png`, fullPage: true });
  const noJS = await browser.newContext({ javaScriptEnabled: false });
  const fallbackPage = await noJS.newPage();
  await fallbackPage.goto(origin + '/entwuerfe/index.html');
  assert.equal(await fallbackPage.locator('#fallback-links a').count(), 50, 'No-JS direct links');
  await noJS.close();
  const thumbnails = await Promise.all(
    catalog.map(async (design) => ({
      input: await sharp(`public${design.thumbnail}`).resize(256, 160).png().toBuffer()
    }))
  );
  await sharp({
    create: {
      width: 1280,
      height: Math.ceil(catalog.length / 5) * 160,
      channels: 3,
      background: '#ffffff'
    }
  })
    .composite(
      thumbnails.map((item, index) => ({
        ...item,
        left: (index % 5) * 256,
        top: Math.floor(index / 5) * 160
      }))
    )
    .png()
    .toFile(`${output}/contact-sheet.png`);
  await context.route('**/entwuerfe/catalog.json', (route) =>
    route.fulfill({ status: 404, body: 'Not found' })
  );
  await page.goto(origin + '/entwuerfe/index.html');
  await page.locator('#gallery-error').waitFor({ state: 'visible' });
  await context.unroute('**/entwuerfe/catalog.json');
  await context.route('**/entwuerfe/hallmark/astra/1.html', (route) =>
    route.fulfill({ status: 404, body: 'Not found' })
  );
  await page.goto('about:blank');
  await page.goto(origin + '/entwuerfe/index.html#hallmark/astra/1');
  await page.waitForFunction(() =>
    document.querySelector('#preview-status').textContent.includes('konnte nicht geladen')
  );
  assert.equal(await page.locator('#preview-stage').getAttribute('aria-busy'), 'false');
  await context.unroute('**/entwuerfe/hallmark/astra/1.html');

  await import('./export-design-gallery.mjs');
  const portableContext = await browser.newContext();
  const portablePage = await portableContext.newPage();
  portablePage.on('pageerror', (error) => errors.push(String(error)));
  portablePage.on('request', (request) => {
    if (request.url().startsWith('http')) thirdParty.add(request.url());
  });
  for (const file of ['akg-entwuerfe.html', 'akg-entwuerfe-inline.html']) {
    await portablePage.goto(`file:///tmp/${file}`);
    await portablePage.waitForFunction(
      () => document.querySelectorAll('.design-card').length === 50
    );
    await portablePage.selectOption('#skill', 'taste');
    await portablePage.selectOption('#model', 'sol');
    assert.equal(await portablePage.locator('.design-card').count(), 5);
    await portablePage.locator('.design-trigger').first().click();
    await portablePage.waitForFunction(() => !document.querySelector('#design-frame').hidden);
    const embedded = portablePage.frameLocator('#design-frame');
    assert.equal((await embedded.locator('img[src^="blob:"]').count()) > 0, true);
    await portablePage.locator('[data-width="390"]').click();
    assert.equal(await embedded.locator('html').evaluate(() => innerWidth), 390);
    await portablePage.locator('#next').click();
    await portablePage.waitForFunction(
      () =>
        document.querySelector('#viewer-meta').textContent.includes('Variante 2') &&
        !document.querySelector('#design-frame').hidden
    );
    assert.equal(new URL(portablePage.url()).hash, '#taste/sol/2');
    await portablePage.keyboard.press('Escape');
    await portablePage.waitForFunction(() => !document.querySelector('#viewer').open);
    assert.equal(await portablePage.locator('#viewer').evaluate((dialog) => dialog.open), false);
    await portablePage.goto('about:blank');
    await portablePage.goto(`file:///tmp/${file}#hallmark/sol/3`);
    await portablePage.waitForFunction(
      () =>
        document.querySelector('#viewer-meta').textContent.includes('Variante 3') &&
        !document.querySelector('#design-frame').hidden
    );
  }
  await portableContext.close();
  assert.deepEqual(errors, [], 'Browser errors');
  assert.deepEqual([...thirdParty], [], 'Third-party requests');
  assert.deepEqual(galleryAxe, [], 'Gallery accessibility');
  assert.equal(
    findings.some((design) =>
      design.checks.some((check) => check.issues.length || check.axe?.length)
    ),
    false,
    `Findings: ${output}/report.json`
  );
  console.log(
    `${galleryOnly ? 'Galerienavigation, Fehlerzustände und portable Exporte' : '50 Entwürfe × 6 Breiten, axe mobil/desktop, Galerienavigation, Fehlerzustände und portable Exporte'} bestanden. Nachweise: ${output}`
  );
} finally {
  await writeFile(
    `${output}/report.json`,
    JSON.stringify(
      {
        scope: galleryOnly ? 'gallery-only' : 'full',
        findings,
        galleryAxe,
        errors,
        thirdParty: [...thirdParty]
      },
      null,
      2
    )
  );
  await browser.close();
  await new Promise((done) => server.close(done));
}
