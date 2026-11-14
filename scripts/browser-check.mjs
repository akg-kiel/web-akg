import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright-core';

const require = createRequire(import.meta.url);
assert.equal(
  require('playwright-core/package.json').version,
  process.env.PLAYWRIGHT_VERSION,
  'Run browser checks inside devenv; the Playwright client and Nix browsers must match'
);
const origin = new URL(process.argv[2] ?? 'http://127.0.0.1:8787');
const fixtures = process.env.EXPECT_OFFER_FIXTURES === '1';
const stockCredits = JSON.parse(await readFile('public/entwuerfe/neu/stock/credits.json', 'utf8'));
const expectedPhotoCount = stockCredits.photos.length;
const evidence = fixtures ? '/tmp/akg-begegnungen-fixture-qa' : '/tmp/akg-begegnungen-qa';
await mkdir(evidence, { recursive: true });
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
        const mosaic = await page.locator('.encounters-mosaic').boundingBox();
        const hero = await page.locator('.encounters-hero').boundingBox();
        assert.ok(hero && mosaic, 'Selected invitation and mosaic must be visible');
        assert.ok(width < 768 || hero.height <= 680, 'Keep the invitation compact');
        if (width >= 768) {
          const copy = await page.locator('.encounters-copy').boundingBox();
          assert.ok(copy && copy.x + copy.width <= mosaic.x, 'Invitation sits beside the mosaic');
          assert.ok(mosaic.width <= width / 2, 'Mosaic uses at most half the desktop width');
        }
        assert.equal(await page.locator('.encounters-photo').count(), expectedPhotoCount);
        for (const [index, photo] of stockCredits.photos.entries()) {
          const figure = page.locator('.encounters-photo').nth(index);
          assert.equal(await figure.locator('img').getAttribute('alt'), photo.alt);
          assert.equal(await figure.locator('figcaption').innerText(), 'Symbolfoto');
          assert.equal(await figure.locator('figcaption').isVisible(), true);
          assert.equal(
            await figure.locator('figcaption a').count(),
            0,
            'No per-photo credit links'
          );
        }
        for (const route of [
          '/gemeinde',
          '/gottesdienste',
          '/angebote',
          '/kontakt',
          '/aktuelles',
          'https://cafe-dreimaster.de/'
        ]) {
          assert.ok(
            await page.locator(`main a[href="${route}"]`).count(),
            `Homepage visitor path: ${route}`
          );
        }
        await page.screenshot({ path: `${evidence}/home-${width}.png`, fullPage: true });
        assert.equal(
          (await page.locator('h1').innerText()).replace(/\s+/g, ' '),
          'Schön, dass du da bist.'
        );
        assert.equal(
          await page
            .locator('.encounters-hero')
            .evaluate((element) => getComputedStyle(element).backgroundColor),
          'rgb(0, 108, 158)',
          'Preserve the selected Begegnungen blue invitation'
        );
        assert.equal(
          await page
            .locator('.encounters-community')
            .evaluate((element) => getComputedStyle(element).backgroundColor),
          'rgb(232, 241, 239)'
        );
        assert.equal(
          await page.locator('#miteinander').evaluate((element) => getComputedStyle(element).color),
          'rgb(26, 118, 99)'
        );
        assert.equal(await page.locator('main img[src*="/images/petruskirche"]').count(), 0);
        assert.equal(
          await page
            .locator(
              '.encounters-cafe a[href="/petruskirche"], .encounters-cafe a[href^="/gemeindehaus-"]'
            )
            .count(),
          0,
          'The meeting section must not become a building directory'
        );
      }
      if (route === '/' && fixtures) {
        assert.equal(await page.locator('.service-item').count(), 1);
        assert.equal(await page.locator('.offer-preview a').count(), 3);
        assert.equal(await page.locator('.news-item').count(), 3);
        assert.match(
          await page.locator('.news-item').nth(1).innerText(),
          /<script>not executable<\/script>/
        );
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

  if (fixtures)
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const state of ['empty', 'unavailable', 'disabled', 'stale']) {
        await page.goto(new URL(`/?__sourceState=${state}`, origin).href);
        await page.evaluate(() => document.fonts.ready);
        await page.locator('img').evaluateAll((images) =>
          Promise.all(
            images.map((image) => {
              image.loading = 'eager';
              return image.decode();
            })
          )
        );
        assert.equal(await page.locator(`[data-source-state="${state}"]`).count(), 3);
        assert.equal(
          await page.locator('.service-item,.offer-teaser,.news-item').count(),
          state === 'stale' ? 7 : 0
        );
        assert.equal(await page.locator('.data-stamp time').count(), state === 'stale' ? 3 : 0);
        assert.equal(
          await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1),
          false
        );
        await page.screenshot({ path: `${evidence}/${state}-${width}.png`, fullPage: true });
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
            route: `/?__sourceState=${state}`,
            width,
            id,
            impact,
            targets: nodes.map((node) => node.target)
          }))
        );
      }
    }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(origin.href);
  await page.evaluate(() => document.fonts.ready);
  const offerPage = await context.newPage();
  await offerPage.goto(new URL('/angebote', origin).href);
  const offerCount = await offerPage.locator('.offer-detail').count();
  assert.ok(
    (await offerPage.locator('.offer-detail > .prose').allTextContents()).every((text) =>
      text.trim()
    ),
    'Offers without optional source fields need an honest empty state'
  );
  if (fixtures)
    assert.equal(offerCount, 3, 'The default fixture gate must exercise populated offers');
  if (process.env.EXPECT_LIVE_CHURCHTOOLS === '1') {
    assert.ok(offerCount > 0, 'Live offer data must reach the SSR page');
    await offerPage.goto(new URL('/gottesdienste', origin).href);
    assert.ok(
      (await offerPage.locator('.service-item').count()) > 0,
      'Live services must reach the SSR page'
    );
  }
  await offerPage.close();
  if (offerCount > 0) {
    const noScriptOffers = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 390, height: 844 }
    });
    const offersPage = await noScriptOffers.newPage();
    for (let index = 0; index < Math.min(3, offerCount); index++) {
      await offersPage.goto(origin.href);
      assert.equal(await offersPage.locator('.offer-preview a').count(), Math.min(3, offerCount));
      const teaser = offersPage.locator('.offer-preview a').nth(index);
      const id = new URL(await teaser.getAttribute('href'), origin).searchParams.get('angebot');
      await teaser.click();
      assert.equal(await offersPage.locator('.offer-detail[open]').count(), 1);
      assert.equal(
        await offersPage.locator('.offer-detail[open]').getAttribute('id'),
        `angebot-${id}`,
        'Every teaser must open its own disclosure without JavaScript'
      );
    }
    await offersPage.goto(origin.href);
    await offersPage.locator('.offer-preview a').first().click();
    const selected = offersPage.locator('.offer-detail[open]');
    const name = await selected.locator('h3').innerText();
    const description = (await selected.locator('.offer-description').allTextContents()).join(' ');
    const descriptionWord = description
      ?.match(/[\p{L}\p{N}]{5,}/gu)
      ?.find((word) => !name.toLocaleLowerCase('de').includes(word.toLocaleLowerCase('de')));
    await selected.locator('summary').focus();
    await offersPage.keyboard.press('Enter');
    assert.equal(await offersPage.locator('.offer-detail[open]').count(), 0);
    await offersPage.keyboard.press('Enter');
    assert.equal(await offersPage.locator('.offer-detail[open]').count(), 1);
    const searchInput = offersPage.locator('input[name=q]');
    await searchInput.fill(name.slice(0, 100));
    const searchValue = await searchInput.inputValue();
    await Promise.all([
      offersPage.waitForURL((url) => url.searchParams.get('q') === searchValue),
      searchInput.press('Enter')
    ]);
    assert.ok((await offersPage.locator('.offer-detail').count()) > 0);
    assert.ok((await offersPage.locator('.offer-detail').count()) <= offerCount);
    if (fixtures)
      assert.ok(descriptionWord, 'Fixture search term must occur only in the description');
    if (descriptionWord) {
      await searchInput.fill(descriptionWord);
      await Promise.all([
        offersPage.waitForURL((url) => url.searchParams.get('q') === descriptionWord),
        searchInput.press('Enter')
      ]);
      assert.ok(
        (await offersPage.locator('.offer-detail h3').allTextContents()).includes(name),
        'Description-only matches must survive the SSR search'
      );
    }
    await offersPage.locator('input[name=q]').fill('zzzz-no-matching-offer-0000');
    await Promise.all([
      offersPage.waitForURL((url) => url.searchParams.get('q') === 'zzzz-no-matching-offer-0000'),
      searchInput.press('Enter')
    ]);
    assert.equal(await offersPage.locator('.offer-detail').count(), 0);
    assert.ok(
      await offersPage.getByText('Kein passendes Angebot gefunden.', { exact: false }).isVisible()
    );
    await offersPage.getByRole('link', { name: 'Alle anzeigen', exact: true }).click();
    assert.equal(await offersPage.locator('.offer-detail').count(), offerCount);
    await noScriptOffers.close();
  }
  await page.bringToFront();
  const primaryAction = await page.locator('.encounters-copy .button').boundingBox();
  assert.ok(
    primaryAction && primaryAction.y + primaryAction.height <= 844,
    'Primary invitation must fit the first mobile viewport'
  );
  await page.keyboard.press('Tab');
  assert.equal(await page.locator(':focus').innerText(), 'Zum Inhalt springen');
  await page.keyboard.press('Enter');
  assert.equal(await page.locator(':focus').getAttribute('id'), 'inhalt');
  for (const link of await page.locator('.encounters-hero a').all()) {
    await page.keyboard.press('Tab');
    assert.equal(await link.evaluate((element) => element === document.activeElement), true);
    assert.notEqual(
      await link.evaluate((element) => getComputedStyle(element).outlineWidth),
      '0px'
    );
  }
  await page.keyboard.press('Tab');
  assert.equal(
    await page.locator(':focus').getAttribute('href'),
    '/gottesdienste',
    'Tab skips decorative photos'
  );
  await page.locator('a[href="#dein-weg"]').focus();
  await page.keyboard.press('Enter');
  assert.equal(await page.locator(':focus').getAttribute('id'), 'dein-weg');
  await page.keyboard.press('Tab');
  assert.equal(await page.locator(':focus').getAttribute('href'), '/gottesdienste');
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
  assert.equal(
    await page
      .locator(
        'dialog, [data-enlarge], .photo-action, .encounters-photo a, .encounters-photo button, .encounters-photo [tabindex]'
      )
      .count(),
    0,
    'Photos are content, not controls'
  );
  for (const photo of await page.locator('.encounters-photo img').all()) {
    await photo.click();
    assert.equal(page.url(), origin.href);
    assert.equal(await page.locator('dialog').count(), 0);
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
  await basic.route('**/entwuerfe/neu/stock/11284053-*.webp', (route) => route.abort());
  await basic.goto(origin.href);
  assert.ok(
    await basic
      .locator('.encounters-photo')
      .nth(2)
      .locator('img')
      .evaluate((image) => {
        const box = image.getBoundingClientRect();
        return (
          box.width > 0 &&
          box.height >= 100 &&
          image.hasAttribute('width') &&
          image.hasAttribute('height')
        );
      }),
    'Reserve the mosaic slot even when its photo cannot load'
  );
  await basic.unroute('**/entwuerfe/neu/stock/11284053-*.webp');
  await basic.locator('a[href="#dein-weg"]').click();
  assert.equal(await basic.locator(':focus').getAttribute('id'), 'dein-weg');
  await basic.locator('summary').click();
  assert.equal(await basic.locator('nav[aria-label="Hauptnavigation mobil"] a').count(), 5);
  assert.equal(await basic.locator('nav[aria-label="Hauptnavigation mobil"]').isVisible(), true);
  await basic.locator('summary').click();
  await basic.getByRole('link', { name: 'Zum Seitenanfang' }).focus();
  await basic.keyboard.press('Enter');
  await basic.waitForFunction(() => window.scrollY <= 1);
  await basic.goto(origin.href);
  assert.equal(
    await basic.locator('.encounters-photo a, .encounters-photo button, dialog').count(),
    0
  );
  await basic.locator('.encounters-photo img').first().click();
  assert.equal(basic.url(), origin.href);
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
        nonInteractivePhotos: 'passed',
        offerInteractions: offerCount > 0 ? 'passed' : 'disabled in public build',
        reducedMotion: 'passed',
        textResize200: 'passed',
        homepageSourceStates: fixtures
          ? ['ready', 'empty', 'unavailable', 'disabled', 'stale']
          : 'real approval/configuration state'
      },
      null,
      2
    )
  );
  assert.equal(violations.length, 0, 'axe accessibility violations');
  assert.equal(errors.length, 0, 'Client exceptions');
  assert.equal(thirdPartyRequests.size, 0, 'Unexpected third-party resources');
} finally {
  await writeFile(
    `${evidence}/report.json`,
    JSON.stringify(
      {
        routes: routes.length,
        widths,
        violations,
        errors,
        thirdPartyRequests: [...thirdPartyRequests]
      },
      null,
      2
    )
  );
  await browser.close();
}
