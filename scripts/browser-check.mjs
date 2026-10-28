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
      if (route === '/') {
        const heroImage = await page.locator('.welcome-photo img').boundingBox();
        const hero = await page.locator('.welcome-hero').boundingBox();
        assert.ok(heroImage && hero, 'Homepage hero must be visible');
        assert.ok(
          heroImage.height <= 400 && (width < 768 || hero.height <= 600),
          'Keep the hero photograph compact, not a full-screen building'
        );
        if (width >= 768) {
          const copy = await page.locator('.welcome-copy').boundingBox();
          assert.ok(copy && copy.x + copy.width <= heroImage.x, 'Text must sit beside the photo');
          assert.ok(heroImage.width <= width / 2, 'Hero photo uses at most half the desktop width');
        }
        assert.equal(await page.locator('main img[src*="/images/petruskirche"]').count(), 0);
      }
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
  let lastHeroLinkY = -1;
  for (const link of await page.locator('.welcome-hero a').all()) {
    await page.keyboard.press('Tab');
    assert.equal(await link.evaluate((element) => element === document.activeElement), true);
    const box = await link.boundingBox();
    assert.ok(
      box && box.y >= lastHeroLinkY - 1,
      'Mobile hero tab order must follow the visual order'
    );
    lastHeroLinkY = box.y;
  }
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
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(origin.href);
  await page.addScriptTag({ path: require.resolve('axe-core/axe.min.js') });
  const photoLinks = page.locator('[data-enlarge]');
  assert.equal(await photoLinks.count(), 3);
  for (let index = 0; index < 3; index++) {
    const opener = photoLinks.nth(index);
    const imageUrl = await opener.getAttribute('href');
    await opener.focus();
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('.photo-dialog').evaluate((dialog) => dialog.open), true);
    assert.equal(
      await page
        .locator('.photo-dialog button')
        .evaluate((button) => button === document.activeElement),
      true
    );
    await page.locator('.photo-dialog img').evaluate((image) => image.decode());
    assert.ok(
      await page.locator('.photo-dialog img').evaluate((image) => {
        const box = image.getBoundingClientRect();
        return Math.abs(box.width / box.height - image.naturalWidth / image.naturalHeight) < 0.01;
      }),
      'Dialog image must preserve its natural ratio without blank letterboxing'
    );
    assert.equal(
      await page.locator('.photo-dialog img').getAttribute('src'),
      new URL(imageUrl, origin).href
    );
    assert.equal(
      await page.locator('.photo-dialog .photo-credit').textContent(),
      await opener.locator('..').locator('.photo-credit').textContent(),
      'Photo viewer must preserve the complete source credit'
    );
    assert.equal(
      await page.locator('[data-photo-file]').getAttribute('href'),
      new URL(imageUrl, origin).href
    );
    const dialogFindings = await page.evaluate(
      async () =>
        (
          await window.axe.run(document, {
            runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] }
          })
        ).violations
    );
    violations.push(
      ...dialogFindings.map(({ id, impact }) => ({ route: '/', dialog: index, id, impact }))
    );
    for (let step = 0; step < 6; step++) {
      await page.keyboard.press('Tab');
      // Native dialogs may pass through browser chrome, never background page controls.
      assert.equal(
        await page.evaluate(
          () =>
            document.querySelector('.photo-dialog').contains(document.activeElement) ||
            (document.activeElement === document.body && !document.hasFocus())
        ),
        true
      );
      if (
        await page
          .locator('.photo-dialog button')
          .evaluate((button) => button === document.activeElement)
      )
        break;
    }
    assert.equal(
      await page
        .locator('.photo-dialog button')
        .evaluate((button) => button === document.activeElement),
      true
    );
    await page.keyboard.press('Shift+Tab');
    assert.equal(
      await page
        .locator('.photo-dialog')
        .evaluate((dialog) => dialog.contains(document.activeElement)),
      true
    );
    await page.keyboard.press('Tab');
    assert.equal(
      await page
        .locator('.photo-dialog button')
        .evaluate((button) => button === document.activeElement),
      true
    );
    if (index === 1) await page.keyboard.press('Enter');
    else await page.keyboard.press('Escape');
    assert.equal(await page.locator('.photo-dialog').evaluate((dialog) => dialog.open), false);
    assert.equal(await opener.evaluate((link) => link === document.activeElement), true);
  }

  for (const viewport of [
    { width: 390, height: 844 },
    { width: 844, height: 390 }
  ]) {
    await page.setViewportSize(viewport);
    await page.evaluate(() => {
      document.documentElement.style.fontSize = '200%';
    });
    await photoLinks.nth(1).focus();
    await page.keyboard.press('Enter');
    assert.equal(
      await page
        .locator('.photo-dialog')
        .evaluate((dialog) => dialog.scrollWidth > dialog.clientWidth + 1),
      false,
      'Dialog must reflow at 200% text size'
    );
    await page.keyboard.press('Escape');
    await page.evaluate(() => {
      document.documentElement.style.fontSize = '';
    });
  }

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
  await basic.route('**/images/gemeinde-gespraech-*.webp', (route) => route.abort());
  await basic.goto(origin.href);
  assert.ok(
    await basic.locator('.photo-conversation img').evaluate((image) => {
      const box = image.getBoundingClientRect();
      return box.height > 0 && Math.abs(box.width / box.height - 1.5) < 0.01;
    }),
    'Reserve the community photo ratio before the lazy image loads'
  );
  await basic.unroute('**/images/gemeinde-gespraech-*.webp');
  await basic.locator('summary').click();
  assert.equal(await basic.locator('nav[aria-label="Hauptnavigation mobil"] a').count(), 5);
  assert.equal(await basic.locator('nav[aria-label="Hauptnavigation mobil"]').isVisible(), true);
  await basic.locator('summary').click();
  for (let index = 0; index < 3; index++) {
    await basic.goto(origin.href);
    const link = basic.locator('[data-enlarge]').nth(index);
    const imageUrl = new URL(await link.getAttribute('href'), origin).href;
    await link.click();
    await basic.waitForURL(imageUrl);
    await basic.locator('img').evaluate((image) => image.decode());
    assert.equal(await basic.locator('img').evaluate((image) => image.naturalWidth > 0), true);
  }
  await noJavaScript.close();

  const reduced = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: 'reduce'
  });
  const reducedPage = await reduced.newPage();
  await reducedPage.goto(origin.href);
  await reducedPage.locator('footer').scrollIntoViewIfNeeded();
  assert.equal(
    await reducedPage.evaluate(
      () => document.getAnimations().filter((animation) => animation.playState === 'running').length
    ),
    0
  );
  assert.equal(
    await reducedPage.locator('h1').evaluate((heading) => getComputedStyle(heading).opacity),
    '1'
  );
  await reduced.close();

  await page.goto(origin.href);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.locator('footer').scrollIntoViewIfNeeded();
  assert.equal(
    await page.evaluate(
      () => document.getAnimations().filter((animation) => animation.playState === 'running').length
    ),
    0
  );

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
        photoViewerAndFallback: 'passed',
        reducedMotion: 'passed',
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
