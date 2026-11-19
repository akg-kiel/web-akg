import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright-core';
import { photos } from '../src/lib/photos.mjs';

const require = createRequire(import.meta.url);
assert.equal(
  require('playwright-core/package.json').version,
  process.env.PLAYWRIGHT_VERSION,
  'Run browser checks inside devenv; the Playwright client and Nix browsers must match'
);
const origin = new URL(process.argv[2] ?? 'http://127.0.0.1:8787');
const fixtures = process.env.EXPECT_OFFER_FIXTURES === '1';
const evidence = fixtures ? '/tmp/akg-130-fixture-qa' : '/tmp/akg-130-qa';
await mkdir(evidence, { recursive: true });
const primaryPaths = ['/gottesdienste', '/aktuelles', '/angebote', '/gemeinde', '/kontakt'];
const placePaths = ['/petruskirche', '/gemeindehaus-mitte', '/gemeindehaus-wik'];
const routes = ['/', ...primaryPaths, '/spenden', '/impressum', '/datenschutz', ...placePaths];
const cafe = 'https://cafe-dreimaster.de/';
const concerts = 'https://petruskirche.events/';
const churchTools = 'https://akg-kiel.church.tools/?q=login#/';
const youtube = 'https://www.youtube.com/channel/UCXlzBLKlUkgAXdd-gPjKZRw';
const widths = [320, 390, 768, 1024, 1440];
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const violations = [];
const errors = [];
const assetFailures = [];
const thirdPartyRequests = new Set();
const screenshots = [];
const report = { routes: routes.length, widths, violations, errors, assetFailures, screenshots };
const hero = (page) => page.locator('main .edition-hero');
const heroActions = (page) => hero(page).getByRole('link').and(page.locator('a:not(figcaption a)'));
const homeOffers = (page) => page.locator('main a[href^="/angebote?angebot="]');
const offerDetails = (page) => page.locator('main details[id^="angebot-"]');
const goto = (page, path) => page.goto(new URL(path, origin).href);

async function observedContext(options) {
  const context = await browser.newContext(options);
  context.on('weberror', (event) => errors.push(String(event.error())));
  context.on('request', (request) => {
    const url = new URL(request.url());
    if (/^https?:$/.test(url.protocol) && url.origin !== origin.origin)
      thirdPartyRequests.add(url.href);
  });
  const isAsset = (request) =>
    ['image', 'font', 'script', 'stylesheet'].includes(request.resourceType());
  context.on('response', (response) => {
    if (isAsset(response.request()) && response.status() >= 400)
      assetFailures.push(`${response.status()} ${response.url()}`);
  });
  context.on('requestfailed', (request) => {
    // Browser-cancelled loads when navigating away (and our deliberate image abort) are not bad assets.
    const reason = request.failure()?.errorText;
    if (isAsset(request) && reason !== 'net::ERR_ABORTED')
      assetFailures.push(`${reason} ${request.url()}`);
  });
  return context;
}

async function readyForInspection(page) {
  await page.evaluate(() => document.fonts.ready);
  await page.locator('img').evaluateAll((images) =>
    Promise.all(
      images.map((image) => {
        image.loading = 'eager';
        return image.decode().catch(() => {
          throw new Error(
            `Image did not decode on ${location.pathname}: ${image.currentSrc || image.src}`
          );
        });
      })
    )
  );
}

async function capture(page, name, { fullPage = true } = {}) {
  await page.screenshot({ path: `${evidence}/${name}.png`, fullPage });
  screenshots.push(`${name}.png`);
}

async function checkReflow(page, label) {
  assert.equal(
    await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1),
    false,
    label
  );
}

async function checkAxe(page, route, width) {
  await page.addScriptTag({ path: require.resolve('axe-core/axe.min.js') });
  const findings = await page.evaluate(
    async () =>
      (
        await window.axe.run(document, {
          runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] }
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

async function checkLinks(scope, paths, label) {
  const available = await scope
    .getByRole('link', { name: /\S/ })
    .evaluateAll((links) => links.map((link) => link.getAttribute('href')));
  for (const path of paths)
    assert.ok(available.includes(path), `${label}: missing accessible link to ${path}`);
}

async function checkImages(page, label) {
  assert.equal(
    await page.locator('header a[href="/"] img').getAttribute('src'),
    '/images/apostel-logo.png',
    `${label}: original logo`
  );
  const distorted = await page.locator('img').evaluateAll((images) =>
    images
      .filter((image) => {
        const box = image.getBoundingClientRect();
        const ratio = image.naturalWidth / image.naturalHeight;
        return (
          !image.naturalWidth ||
          (box.width > 20 &&
            getComputedStyle(image).objectFit === 'fill' &&
            Math.abs(box.width / box.height - ratio) / ratio > 0.05)
        );
      })
      .map((image) => image.currentSrc)
  );
  assert.deepEqual(distorted, [], `${label}: broken or distorted images`);
  for (const figure of await page.locator('main figure:has(img)').all()) {
    const img = figure.locator('img');
    const filename = await img.evaluate((image) => new URL(image.currentSrc).pathname);
    const basename = filename.match(/^\/images\/(.+)-\d+\.webp$/)?.[1];
    const photo = Object.values(photos).find((candidate) => candidate.name === basename);
    assert.ok(photo?.publicApproved, `${label}: unapproved photograph ${filename}`);
    assert.equal(await img.getAttribute('alt'), photo.alt, `${label}: missing archive description`);
    const caption = figure.locator('figcaption');
    assert.ok(await caption.isVisible(), `${label}: visible photo attribution`);
    if (photo.author)
      assert.ok(
        (await caption.innerText()).includes(photo.author),
        `${label}: missing photographer`
      );
    const links = [photo.source];
    if (photo.license) links.push(`https://creativecommons.org/licenses/by-sa/${photo.license}/`);
    await checkLinks(caption, links, `${label}: photo attribution`);
  }
  // Source/license links belong in captions. The photographs themselves are not controls.
  assert.equal(
    await page
      .locator('main figure:has(img)')
      .locator('a,button,summary,[role="link"],[role="button"],[tabindex]:not([tabindex^="-"])')
      .evaluateAll(
        (controls) => controls.filter((control) => !control.matches('figcaption a[href]')).length
      ),
    0,
    `${label}: interactive photo`
  );
  assert.equal(
    await page
      .locator('main figure img')
      .evaluateAll((images) =>
        images.some(
          (image) => image.closest('a,button,summary,[role="button"],[role="link"]') !== null
        )
      ),
    false,
    `${label}: photo inside a control`
  );
}

async function checkHome(page) {
  assert.ok(
    await hero(page)
      .getByRole('heading', { level: 1, name: 'Glaube trifft Alltag.', exact: true })
      .isVisible(),
    'Accessible homepage title'
  );
  const actions = await heroActions(page).evaluateAll((links) =>
    links.map((link) => link.getAttribute('href'))
  );
  assert.deepEqual(actions.slice(0, 2), ['/gottesdienste', '/gemeinde'], 'First two hero actions');
  await checkLinks(
    page.getByRole('main'),
    [...primaryPaths, concerts, cafe],
    'Homepage visitor paths'
  );
  const figure = hero(page).locator('figure:has(img)');
  assert.equal(await figure.count(), 1, 'An archival hero figure');
  const caption = figure.locator('figcaption');
  assert.match(
    await caption.innerText(),
    /archiv|\b20\d{2}\b/i,
    'Distinguish the archive from a current event'
  );
  await checkLinks(
    page.getByRole('contentinfo'),
    [
      ...primaryPaths,
      ...placePaths,
      '/spenden',
      '/impressum',
      '/datenschutz',
      cafe,
      concerts,
      churchTools,
      youtube
    ],
    'Footer'
  );
}

async function checkHomePreviews(page, populated) {
  for (const [prefix, limit] of [
    ['/gottesdienste/', 1],
    ['/angebote?angebot=', 3],
    ['/aktuelles/', 3]
  ]) {
    const links = page.locator(`main a[href^="${prefix}"]`);
    assert.equal(await links.count(), populated ? limit : 0, `${prefix}: home preview count`);
    // Visitors using heading navigation must hear a section title, then the linked item titles one level below.
    const outline = await links.evaluateAll((nodes) =>
      nodes.map((link) => {
        const headings = 'h1,h2,h3,h4,h5,h6';
        const title = link.closest(headings);
        const list = link.closest('ul,ol,[role="list"]');
        const section = list?.closest('section, article, aside, [role="region"]');
        const parent = [...(section?.querySelectorAll(headings) ?? [])]
          .filter(
            (heading) => heading.compareDocumentPosition(list) & Node.DOCUMENT_POSITION_FOLLOWING
          )
          .at(-1);
        return {
          name: link.innerText.trim(),
          level: Number(title?.tagName.slice(1)),
          parent: Number(parent?.tagName.slice(1)),
          section: parent?.innerText.trim()
        };
      })
    );
    for (const item of outline)
      assert.ok(
        item.name && item.section && item.parent >= 2 && item.level === item.parent + 1,
        `${prefix}: invalid section/item outline ${JSON.stringify(item)}`
      );
  }
  if (populated)
    assert.ok(
      await page.getByText('<script>not executable</script>', { exact: true }).isVisible(),
      'Render source markup as text'
    );
  else
    assert.doesNotMatch(
      await page.getByRole('main').innerText(),
      /synthetic/i,
      'Do not display fixture items when the source has no publishable data'
    );
}

async function checkStaticPhotos(page) {
  const before = page.url();
  const openPages = page.context().pages().length;
  for (const photo of await page.locator('main figure img').all()) {
    await photo.click();
    assert.equal(page.url(), before, 'A photo click must not navigate');
    assert.equal(page.context().pages().length, openPages, 'A photo click must not open a tab');
    assert.equal(await page.getByRole('dialog').count(), 0, 'A photo click must not open a viewer');
  }
}

async function checkFocus(link) {
  assert.ok(
    await link.evaluate((element) => element === document.activeElement),
    'Keyboard focus follows visible links'
  );
  assert.ok(
    await link.evaluate((element) => {
      const style = getComputedStyle(element);
      return parseFloat(style.outlineWidth) > 0 || style.boxShadow !== 'none';
    }),
    'Keyboard focus needs a visible indicator'
  );
}

async function checkKeyboard(page) {
  await page.setViewportSize({ width: 390, height: 844 });
  await goto(page, '/');
  await page.evaluate(() => document.fonts.ready);
  await capture(page, 'home-first-viewport-390', { fullPage: false });
  const action = await heroActions(page).first().boundingBox();
  assert.ok(
    action && action.y >= 0 && action.y + action.height <= 844,
    'Primary action fits the first mobile viewport'
  );
  await page.keyboard.press('Tab');
  assert.equal(await page.locator(':focus').getAttribute('href'), '#inhalt');
  await page.keyboard.press('Enter');
  assert.equal(await page.locator(':focus').getAttribute('id'), 'inhalt');
  for (const link of await hero(page).getByRole('link').all()) {
    await page.keyboard.press('Tab');
    await checkFocus(link);
  }
  await checkStaticPhotos(page);
  await goto(page, '/gottesdienste');
  const menu = page.locator('header details');
  const summary = menu.locator('summary');
  for (let i = 0; i < 3; i++) await page.keyboard.press('Tab');
  assert.ok(await summary.evaluate((el) => el === document.activeElement));
  await page.keyboard.press('Enter');
  await page.keyboard.press('Tab');
  await checkFocus(menu.locator('a[href="/gottesdienste"][aria-current="page"]'));
  await capture(page, 'menu-open-390', { fullPage: false });
  await page.keyboard.press('Escape');
  assert.equal(await menu.getAttribute('open'), null);
  assert.ok(await summary.evaluate((el) => el === document.activeElement));
  await page.setViewportSize({ width: 1023, height: 900 });
  assert.ok(await summary.isVisible(), 'Mobile menu below 64rem');
  await page.keyboard.press('Enter');
  await page.keyboard.press('Tab');
  await page.setViewportSize({ width: 1024, height: 900 });
  await page.waitForFunction(() => document.activeElement?.matches('header a[href="/"]'));
  assert.equal(await menu.getAttribute('open'), null);
  assert.equal(await summary.isVisible(), false, 'Desktop navigation at 64rem');
  await checkLinks(page.getByRole('banner'), [...primaryPaths, churchTools], 'Desktop header');
}

async function checkNoScriptOffers(offerCount) {
  const context = await observedContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 }
  });
  const page = await context.newPage();
  const details = offerDetails(page);
  const selected = details.and(page.locator('[open]'));
  for (let index = 0; index < Math.min(3, offerCount); index++) {
    await goto(page, '/');
    assert.equal(await homeOffers(page).count(), Math.min(3, offerCount));
    const teaser = homeOffers(page).nth(index);
    const id = new URL(await teaser.getAttribute('href'), origin).searchParams.get('angebot');
    await teaser.focus();
    await Promise.all([
      page.waitForURL((url) => url.searchParams.get('angebot') === id),
      page.keyboard.press('Enter')
    ]);
    assert.equal(await selected.count(), 1);
    assert.equal(
      await selected.getAttribute('id'),
      `angebot-${id}`,
      'Each teaser opens its own disclosure without JavaScript'
    );
    const body = selected.locator(':scope > :not(summary)');
    assert.ok(
      (await body.allInnerTexts()).join('').trim(),
      'Show useful disclosure text even when the optional fields are absent'
    );
  }
  await goto(page, '/');
  await homeOffers(page).first().click();
  const selectedId = await selected.getAttribute('id');
  const summary = selected.locator('summary');
  const name = await summary.evaluate((element) => {
    const copy = element.cloneNode(true);
    for (const decoration of copy.querySelectorAll('[aria-hidden="true"]')) decoration.remove();
    return copy.textContent.trim();
  });
  const nameQuery = name.slice(0, 100);
  assert.ok(nameQuery, 'A searchable offer title');
  const description = (await selected.locator('.offer-description').allTextContents()).join(' ');
  const descriptionWord = description
    .match(/[\p{L}\p{N}]{5,}/gu)
    ?.find((word) => !name.toLocaleLowerCase('de').includes(word.toLocaleLowerCase('de')));
  await capture(page, 'offer-selected-no-js-390');
  await summary.focus();
  await page.keyboard.press('Enter');
  assert.equal(await selected.count(), 0);
  await page.keyboard.press('Enter');
  assert.equal(await selected.count(), 1);
  const input = page.getByRole('searchbox', { name: /\S/ });
  async function search(term) {
    await input.fill(term);
    await Promise.all([
      page.waitForURL((url) => url.searchParams.get('q') === term),
      input.press('Enter')
    ]);
  }
  await search(nameQuery);
  const containsSelected = () =>
    details.evaluateAll((offers, id) => offers.some((offer) => offer.id === id), selectedId);
  assert.ok(await containsSelected(), 'A name search finds the selected offer');
  if (fixtures) {
    assert.equal(await details.count(), 1, 'The fixture name identifies one offer');
    assert.ok(descriptionWord, 'Fixture needs a description-only search term');
  }
  if (descriptionWord) {
    await search(descriptionWord);
    assert.ok(await containsSelected(), 'Description-only matches survive the SSR search');
    if (fixtures) assert.equal(await details.count(), 1, 'Unrelated offers must be filtered out');
  }
  await search('zzzz-no-matching-offer-0000');
  assert.equal(await details.count(), 0);
  assert.match(
    await page.getByRole('main').innerText(),
    /kein\w*\s+[^.\n]*(angebot|treffer)|\b0\s+(angebote|treffer)/i,
    'Announce no matches'
  );
  await capture(page, 'offer-search-empty-no-js-390');
  await page.getByRole('main').locator('a[href="/angebote"]').first().click();
  assert.equal(new URL(page.url()).search, '');
  assert.equal(await details.count(), offerCount);
  await context.close();
}

async function checkNoScriptFallback() {
  const context = await observedContext({
    javaScriptEnabled: false,
    viewport: { width: 320, height: 844 }
  });
  const page = await context.newPage();
  await goto(page, '/');
  const img = hero(page).locator('figure img');
  const asset = await img.evaluate((image) => image.currentSrc);
  let blocked = false;
  await page.route(asset, (route) => {
    blocked = true;
    return route.abort('aborted');
  });
  await page.reload();
  assert.ok(
    blocked && (await img.evaluate((image) => image.complete && image.naturalWidth === 0)),
    'Exercise an actual failed hero image request'
  );
  assert.ok(
    await img.evaluate((image) => {
      const box = image.getBoundingClientRect();
      return (
        box.width > 0 &&
        box.height >= 100 &&
        image.hasAttribute('width') &&
        image.hasAttribute('height') &&
        image.alt.trim()
      );
    }),
    'Preserve the archival photo slot and alternative when the asset cannot load'
  );
  await checkReflow(page, 'Failed photo should not cause overflow');
  await capture(page, 'home-failed-photo-no-js-320');
  await checkStaticPhotos(page);
  const menu = page.locator('header details');
  await menu.locator('summary').click();
  const primaryNav = menu.getByRole('navigation', { name: /hauptnavigation/i });
  await checkLinks(primaryNav, primaryPaths, 'No-JS primary navigation');
  assert.equal(await primaryNav.getByRole('link').count(), primaryPaths.length);
  await checkLinks(
    menu,
    [cafe, concerts, youtube, churchTools, '/spenden'],
    'No-JS mobile utilities'
  );
  await menu.locator('summary').click();
  const toTop = page.getByRole('contentinfo').getByRole('link', { name: /seitenanfang/i });
  await toTop.focus();
  await page.keyboard.press('Enter');
  await page.waitForFunction(() => window.scrollY <= 1);
  await heroActions(page).first().click();
  assert.equal(
    new URL(page.url()).pathname,
    '/gottesdienste',
    'Primary journey works without JavaScript'
  );
  await context.close();
}

async function checkReducedMotion(page) {
  await page.locator('footer').scrollIntoViewIfNeeded();
  assert.equal(
    await page.evaluate(
      () => document.getAnimations().filter((animation) => animation.playState === 'running').length
    ),
    0
  );
  assert.equal(
    await page
      .getByRole('heading', { level: 1 })
      .evaluate((heading) => getComputedStyle(heading).opacity),
    '1'
  );
}

try {
  const context = await observedContext();
  const page = await context.newPage();
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await goto(page, route);
      await readyForInspection(page);
      await checkImages(page, `${route} at ${width}px`);
      await checkReflow(page, `${route}: overflow at ${width}px`);
      if (route === '/') {
        await checkHome(page);
        if (fixtures) await checkHomePreviews(page, true);
      }
      if (route === '/gemeinde')
        await checkLinks(page.getByRole('main'), placePaths, 'Local place directory');
      if (route === '/petruskirche')
        await checkLinks(
          page.getByRole('main'),
          ['/gottesdienste', concerts],
          'Separate worship and concert listings'
        );
      if (route === '/' || width === 390 || width === 1440)
        await capture(page, `${route.slice(1) || 'home'}-${width}`);
      if (width === 390 || width === 1440) await checkAxe(page, route, width);
    }
  }

  if (fixtures) {
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const state of ['empty', 'unavailable', 'disabled', 'stale']) {
        const route = `/?__sourceState=${state}`;
        await goto(page, route);
        await readyForInspection(page);
        const messages = page.locator(`main [data-source-state="${state}"]`);
        assert.equal(await messages.count(), 3);
        for (const message of await messages.all()) {
          assert.ok(
            (await message.isVisible()) && (await message.innerText()).trim(),
            `Explain the ${state} source state`
          );
          assert.equal(await message.locator('time[datetime]').count(), state === 'stale' ? 1 : 0);
        }
        await checkHomePreviews(page, state === 'stale');
        await checkReflow(page, `${state}: overflow at ${width}px`);
        await capture(page, `${state}-${width}`);
        await checkAxe(page, route, width);
      }
    }
  }
  await goto(page, '/angebote');
  const details = offerDetails(page);
  const offerCount = await details.count();
  assert.ok(
    await details.evaluateAll((entries) =>
      entries.every((entry) =>
        [...entry.children].some((child) => child.tagName !== 'SUMMARY' && child.textContent.trim())
      )
    ),
    'Offers without optional source fields still need useful disclosure text'
  );
  if (fixtures) assert.ok(offerCount > 3, 'Exercise the three-offer homepage cap');
  if (process.env.EXPECT_LIVE_CHURCHTOOLS === '1') {
    assert.ok(offerCount > 0, 'Live offers must reach SSR');
    await goto(page, '/gottesdienste');
    assert.ok(
      await page.locator('main a[href^="/gottesdienste/"]').count(),
      'Live services must reach SSR'
    );
  }
  if (offerCount) await checkNoScriptOffers(offerCount);
  report.offerInteractions = offerCount ? 'passed' : 'no published offers';
  await checkKeyboard(page);
  await page.setViewportSize({ width: 320, height: 900 });
  for (const route of routes) {
    await goto(page, route);
    await page.evaluate(() => {
      document.documentElement.style.fontSize = '200%';
    });
    await readyForInspection(page);
    await checkReflow(page, `${route}: 200% text resize overflow`);
    if (route === '/') {
      const logo = await page.locator('header a[href="/"] img').boundingBox();
      const menu = await page.locator('header summary').boundingBox();
      assert.ok(
        logo && menu && (logo.x + logo.width <= menu.x || logo.y + logo.height <= menu.y),
        'Enlarged menu must not cover the original logo'
      );
      await capture(page, 'home-text-200-320');
    }
  }
  await checkNoScriptFallback();
  const reduced = await observedContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: 'reduce'
  });
  const reducedPage = await reduced.newPage();
  await goto(reducedPage, '/');
  await checkReducedMotion(reducedPage);
  await reduced.close();
  await goto(page, '/');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await checkReducedMotion(page);
  assert.deepEqual(violations, [], 'axe accessibility violations');
  assert.deepEqual(errors, [], 'Client exceptions');
  assert.deepEqual(assetFailures, [], 'Failed static assets');
  assert.equal(thirdPartyRequests.size, 0, 'Unexpected third-party resources');
  report.passed = true;
} catch (error) {
  report.passed = false;
  report.failure = String(error);
  throw error;
} finally {
  report.thirdPartyRequests = [...thirdPartyRequests];
  await writeFile(`${evidence}/report.json`, JSON.stringify(report, null, 2));
  await browser.close();
}
console.log(
  `Browser checks passed for ${routes.length} routes at ${widths.join(', ')}px. Evidence: ${evidence}`
);
