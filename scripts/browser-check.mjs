import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { chromium } from 'playwright-core';

const require = createRequire(import.meta.url);
const origin = new URL(process.argv[2] ?? 'http://127.0.0.1:8787');
const routes = [
  '/',
  '/gottesdienste',
  '/aktuelles',
  '/angebote',
  '/gemeinde',
  '/kontakt',
  '/spenden',
  '/impressum',
  '/datenschutz',
  '/petruskirche',
  '/gemeindehaus-mitte',
  '/gemeindehaus-wik'
];
const widths = [320, 390, 768, 1024, 1440];
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const violations = [];
const errors = [];
const thirdPartyRequests = new Set();
try {
  const context = await browser.newContext();
  const page = await context.newPage();
  page.on('pageerror', (error) => errors.push(String(error)));
  page.on('request', (request) => {
    if (new URL(request.url()).origin !== origin.origin) thirdPartyRequests.add(request.url());
  });
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(new URL(route, origin).href);
      await page.evaluate(() => document.fonts.ready);
      await page.locator('img').evaluateAll((images) =>
        Promise.all(
          images.map((image) => {
            image.loading = 'eager';
            return image.decode();
          })
        )
      );
      assert.equal(
        await page.locator('.wordmark img').getAttribute('src'),
        '/images/apostel-logo.png',
        `${route}: preserve the original logo`
      );
      assert.equal(
        await page.locator('img').evaluateAll((images) =>
          images.some((image) => {
            const box = image.getBoundingClientRect();
            const ratio = image.naturalWidth / image.naturalHeight;
            return (
              !image.naturalWidth ||
              (box.width > 20 &&
                getComputedStyle(image).objectFit === 'fill' &&
                Math.abs(box.width / box.height - ratio) / ratio > 0.05)
            );
          })
        ),
        false,
        `${route}: broken or distorted image at ${width}px`
      );
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1),
        false,
        `${route}: overflow at ${width}px`
      );
      if (width === 390 || width === 1440) {
        await page.addScriptTag({ path: require.resolve('axe-core/axe.min.js') });
        const findings = await page.evaluate(
          async () =>
            (
              await window.axe.run(document, {
                runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] }
              })
            ).violations
        );
        violations.push(
          ...findings.map(({ id, impact, nodes }) => ({
            route,
            width,
            id,
            impact,
            targets: nodes.map((node) => node.target)
          }))
        );
      }
    }
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(origin.href);
  await page.evaluate(() => document.fonts.ready);
  const primaryAction = await page.locator('.welcome-copy .button').boundingBox();
  assert.ok(
    primaryAction && primaryAction.y + primaryAction.height <= 844,
    'Primary invitation must fit the first mobile viewport'
  );
  await page.keyboard.press('Tab');
  assert.equal(await page.locator(':focus').innerText(), 'Zum Inhalt springen');
  await page.keyboard.press('Enter');
  assert.equal(await page.locator(':focus').getAttribute('id'), 'inhalt');
  await page.goto(new URL('/gottesdienste', origin).href);
  for (let i = 0; i < 3; i++) await page.keyboard.press('Tab');
  assert.equal(await page.locator(':focus').evaluate((node) => node.tagName), 'SUMMARY');
  await page.keyboard.press('Enter');
  assert.equal(await page.locator('details').getAttribute('open'), '');
  await page.keyboard.press('Tab');
  assert.equal(await page.locator(':focus').getAttribute('href'), '/gottesdienste');
  assert.equal(await page.locator(':focus').getAttribute('aria-current'), 'page');
  assert.notEqual(
    await page.locator(':focus').evaluate((node) => getComputedStyle(node).outlineWidth),
    '0px'
  );
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('details').getAttribute('open'), null);
  assert.equal(await page.locator(':focus').evaluate((node) => node.tagName), 'SUMMARY');
  await page.keyboard.press('Enter');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForFunction(() => document.activeElement?.classList.contains('wordmark'));
  await page.setViewportSize({ width: 320, height: 900 });
  for (const route of routes) {
    await page.goto(new URL(route, origin).href);
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => {
      document.documentElement.style.fontSize = '200%';
    });
    assert.equal(
      await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1),
      false,
      `${route}: 200% text resize overflow`
    );
  }

  const noJavaScript = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 320, height: 844 }
  });
  const basic = await noJavaScript.newPage();
  await basic.goto(origin.href);
  await basic.locator('summary').click();
  assert.equal(await basic.locator('nav[aria-label="Hauptnavigation mobil"] a').count(), 5);
  assert.equal(await basic.locator('nav[aria-label="Hauptnavigation mobil"]').isVisible(), true);

  console.log(
    JSON.stringify(
      {
        routes: routes.length,
        widths,
        violations,
        errors,
        thirdPartyRequests: [...thirdPartyRequests],
        keyboard: 'passed',
        noJavaScriptMenu: 'passed',
        textResize200: 'passed'
      },
      null,
      2
    )
  );
  assert.equal(violations.length, 0, 'axe accessibility violations');
  assert.equal(errors.length, 0, 'Client exceptions');
  assert.equal(thirdPartyRequests.size, 0, 'Unexpected third-party resources');
} finally {
  await browser.close();
}
