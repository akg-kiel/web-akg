import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright-core';
import sharp from 'sharp';
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
const routes = [
  '/',
  '/besuch',
  ...primaryPaths,
  '/spenden',
  '/impressum',
  '/datenschutz',
  ...placePaths,
  ...(fixtures ? ['/gottesdienste/synthetic-service', '/aktuelles/synthetic-news-b'] : [])
];
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
const hero = (page) => page.locator('main section.welcome');
const heroActions = (page) => hero(page).getByRole('link').and(page.locator('a:not(figcaption a)'));
const homeOffers = (page) => page.locator('main a[href^="/angebote?angebot="]');
const offerDetails = (page) => page.locator('main details[id^="angebot-"]');
async function goto(page, path) {
  const response = await page.goto(new URL(path, origin).href);
  assert.equal(response?.status(), 200, `${path}: expected a rendered page`);
}

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
  // decode() can finish before Chromium paints an async image. Do not archive a
  // flat placeholder as photographic evidence. Ignore deliberate failed-image cases.
  const regions = fullPage
    ? await page.locator('main figure img').evaluateAll((images) =>
        images
          .filter((im) => im.naturalWidth > 0)
          .map((im) => {
            const r = im.getBoundingClientRect();
            return {
              left: Math.floor(scrollX + r.left + r.width / 4),
              // Credits may overlay the lower half. Sample photo, not caption text.
              top: Math.floor(scrollY + r.top + r.height / 8),
              width: Math.max(1, Math.floor(r.width / 2)),
              height: Math.max(1, Math.floor(r.height / 4))
            };
          })
      )
    : [];
  for (let attempt = 0; attempt < 5; attempt++) {
    const png = await page.screenshot({ path: `${evidence}/${name}.png`, fullPage });
    const painted = await Promise.all(
      regions.map(async (region) => {
        const pixels = await sharp(png).extract(region).resize(8, 8).greyscale().raw().toBuffer();
        return Math.max(...pixels) - Math.min(...pixels) > 3;
      })
    );
    if (painted.every(Boolean)) {
      screenshots.push(`${name}.png`);
      return;
    }
    await page.evaluate(
      () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
    );
  }
  assert.fail(`${name}: photograph missing from the painted screenshot`);
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

async function checkPrimaryNavigation(header, path) {
  const nav = header.getByRole('navigation', { name: /hauptnavigation/i });
  await checkLinks(nav, primaryPaths, 'Primary navigation');
  assert.equal(await nav.getByRole('link').count(), primaryPaths.length);
  const active = primaryPaths.find((href) => path === href || path.startsWith(href + '/'));
  const marked = nav.locator('[aria-current]:not([aria-current="false"])');
  assert.equal(await marked.count(), active ? 1 : 0, `${path}: active primary destination`);
  if (active) {
    assert.equal(await marked.getAttribute('href'), active);
    assert.equal(await marked.getAttribute('aria-current'), active === path ? 'page' : 'location');
  }
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
  assert.equal(
    await page.locator('main img:not(figure img)').count(),
    0,
    `${label}: photo without a credit figure`
  );
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
  assert.equal(await hero(page).count(), 1, 'One welcome hero');
  const title = hero(page).getByRole('heading', { level: 1 });
  assert.ok(await title.isVisible(), 'Visible homepage title');
  assert.equal((await title.innerText()).replace(/\s+/g, ' ').trim(), 'Moin, wir sind Apostel.');
  const actions = heroActions(page);
  // These are the agreed UI colors, not samples from the original logo artwork.
  const color = (locator, property) =>
    locator.evaluate((el, prop) => getComputedStyle(el).getPropertyValue(prop), property);
  const people = page.getByRole('region', { name: /Menschen/ });
  for (const [locator, property, expected] of [
    [hero(page), 'background-color', 'rgb(234, 243, 247)'],
    [title, 'color', 'rgb(23, 59, 80)'],
    [actions.first(), 'background-color', 'rgb(0, 108, 158)'],
    [actions.first(), 'color', 'rgb(255, 255, 255)'],
    [people, 'background-color', 'rgb(232, 241, 239)'],
    [people.getByRole('heading', { level: 2 }), 'color', 'rgb(26, 118, 99)']
  ]) {
    assert.equal(await color(locator, property), expected, `${locator}: brand role ${property}`);
  }
  for (const [index, path] of ['/besuch', '/gemeinde'].entries()) {
    const action = actions.nth(index);
    assert.ok(await action.isVisible(), `Visible hero action to ${path}`);
    assert.equal(await action.getAttribute('href'), path, `Hero action ${index + 1}`);
  }
  await checkLinks(
    page.getByRole('main'),
    ['/gottesdienste', '/angebote', '/aktuelles'],
    'Full listings'
  );
  const figure = hero(page).locator('figure:has(img)');
  assert.equal(
    await hero(page).locator('img').count(),
    1,
    'One service archive photograph, not a gallery'
  );
  assert.equal(await figure.count(), 1, 'An archival hero figure');
  await checkLinks(figure.locator('figcaption'), [photos.service.source], 'Service archive hero');
  assert.equal(await figure.locator('img').getAttribute('alt'), photos.service.alt);
  const caption = figure.locator('figcaption');
  assert.match(
    await caption.innerText(),
    /archiv|\b20\d{2}\b/i,
    'Distinguish the archive from a current event'
  );
  await checkLinks(
    page.locator('main, footer'),
    [
      '/besuch',
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
    'Homepage visitor destinations in the content or footer'
  );
}

async function checkVisit(page) {
  const main = page.getByRole('main');
  const preview =
    origin.hostname.endsWith('.workers.dev') ||
    ['localhost', '127.0.0.1', '[::1]'].includes(origin.hostname);
  const currentSite = preview
    ? ['https://akg-kiel.de/gottesdienste', 'https://akg-kiel.de/angebote-und-gruppen/neu-hier']
    : [];
  await checkLinks(
    main,
    ['/gottesdienste', '/kontakt', '/angebote', '/gemeinde', youtube, ...currentSite],
    'Practical first-visit handoffs'
  );
  // No approved building website, contact details, map, office hours or address yet (AKG-79).
  const destinations = await main
    .locator('a[href]:not(figcaption a)')
    .evaluateAll((links) => links.map((link) => link.href));
  for (const href of destinations)
    assert.ok(
      new URL(href).origin === origin.origin ||
        [concerts, cafe, youtube, churchTools, ...currentSite].includes(href),
      `Unapproved first-visit destination: ${href}`
    );
  assert.equal(await main.locator('form, iframe').count(), 0, 'No contact, booking or map embed');
  const copy = await main.innerText();
  assert.doesNotMatch(
    copy,
    /\b24\d{3}\s+Kiel\b|\b\d{1,2}(?:[:.]\d{2})?\s*Uhr\b/iu,
    'Unconfirmed address or scheduled time'
  );
  assert.doesNotMatch(
    copy,
    /[\w.+-]+@[\w.-]+\.[a-z]{2,}|(?:\+49|\b0431)[\d ()/-]{4,}\d/iu,
    'Unconfirmed contact details'
  );
  assert.doesNotMatch(
    copy,
    /\b(?:ist|sind)\s+(?:vollständig\s+)?(?:barrierefrei|stufenlos)\b/iu,
    'Unconfirmed accessibility claim'
  );
}

async function checkHomePreviews(page, populated) {
  for (const [prefix, fixtureIds] of [
    ['/gottesdienste/', ['synthetic-service']],
    ['/angebote?angebot=', ['synthetic-alpha', 'synthetic-beta', 'synthetic-gamma']],
    ['/aktuelles/', ['synthetic-news-a', 'synthetic-news-b', 'synthetic-news-c']]
  ]) {
    const links = page.locator(`main a[href^="${prefix}"]`);
    const count = await links.count();
    assert.ok(count <= fixtureIds.length, `${prefix}: too many homepage previews`);
    const named = links.and(page.getByRole('link', { name: /\S/ }));
    assert.equal(await named.count(), count, `${prefix}: every preview needs a named link`);
    // Keep a navigable section/item heading outline without prescribing cards, lists or wrappers.
    const invalidHeadings = await named.evaluateAll((nodes) =>
      nodes
        .filter((link) => {
          const headings = 'h1,h2,h3,h4,h5,h6';
          const title = link.closest(headings) ?? link.querySelector(headings);
          const sectionTitle = link.closest('section')?.querySelector(headings);
          return (
            !sectionTitle?.textContent.trim() ||
            Number(title?.tagName.slice(1)) !== Number(sectionTitle.tagName.slice(1)) + 1
          );
        })
        .map((link) => link.href)
    );
    assert.deepEqual(invalidHeadings, [], `${prefix}: invalid section/item outline`);
    if (!fixtures) continue;
    const destinations = await named.evaluateAll((nodes) =>
      nodes.map((link) => {
        const url = new URL(link.href);
        return url.searchParams.get('angebot') ?? url.pathname.split('/').at(-1);
      })
    );
    assert.deepEqual(destinations, populated ? fixtureIds : [], `${prefix}: homepage destinations`);
  }
  if (!fixtures) return;
  if (populated) {
    assert.ok(
      await page.locator('main time[datetime="2099-01-25T09:00:00Z"]').isVisible(),
      'Date of the next service'
    );
    assert.ok(
      await page.getByText('<script>not executable</script>', { exact: true }).isVisible(),
      'Render the news excerpt as text'
    );
  } else
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

async function indicator(control) {
  return control.evaluate((el) => {
    const css = getComputedStyle(el);
    return { outline: css.outline, width: parseFloat(css.outlineWidth), shadow: css.boxShadow };
  });
}

async function tabTo(page, control, maxTabs = 12) {
  const resting = await indicator(control);
  for (let i = 0; i < maxTabs; i++) {
    await page.keyboard.press('Tab');
    if (await control.evaluate((el) => el === document.activeElement)) {
      const focused = await indicator(control);
      assert.ok(
        (focused.width > 0 && focused.outline !== resting.outline) ||
          (focused.shadow !== 'none' && focused.shadow !== resting.shadow),
        'Focus must add a visible indicator'
      );
      return;
    }
  }
  assert.fail(`Control not reached by Tab: ${control}`);
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
    await tabTo(page, link, 1);
  }
  await checkStaticPhotos(page);
  await goto(page, '/gottesdienste');
  const menu = page.locator('header details');
  const summary = menu.locator('summary');
  await tabTo(page, summary);
  await page.keyboard.press('Enter');
  await tabTo(page, menu.locator('a[href="/gottesdienste"][aria-current="page"]'), 1);
  await checkPrimaryNavigation(menu, '/gottesdienste');
  await capture(page, 'menu-open-390', { fullPage: false });
  await checkAxe(page, '/gottesdienste (open menu)', 390);
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
  await checkPrimaryNavigation(page.getByRole('banner'), '/gottesdienste');
  await checkLinks(page.getByRole('banner'), [churchTools], 'Desktop header utility');
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
  const nameQuery = name.replace(/\s+/gu, ' ').trim().slice(0, 100);
  assert.ok(nameQuery, 'A searchable offer title');
  const description = (await selected.locator('.offer-description').allTextContents()).join(' ');
  const descriptionWord = fixtures
    ? 'quasaronly'
    : description
        .match(/[\p{L}\p{N}]{5,}/gu)
        ?.find((word) => !name.toLocaleLowerCase('de').includes(word.toLocaleLowerCase('de')));
  if (fixtures)
    assert.ok(
      (await selected.innerText()).includes(descriptionWord),
      'Render the source description'
    );
  await capture(page, 'offer-selected-no-js-390');
  await summary.focus();
  await page.keyboard.press('Enter');
  assert.equal(await selected.count(), 0);
  await page.keyboard.press('Enter');
  assert.equal(await selected.count(), 1);
  const input = page.getByRole('searchbox', { name: /\S/ });
  async function search(term) {
    await input.fill(term);
    const submitted = await input.inputValue();
    await Promise.all([
      page.waitForURL((url) => url.searchParams.get('q') === submitted),
      input.press('Enter')
    ]);
  }
  await search(nameQuery);
  const containsSelected = () =>
    details.evaluateAll((offers, id) => offers.some((offer) => offer.id === id), selectedId);
  assert.ok(await containsSelected(), 'A name search finds the selected offer');
  if (fixtures) assert.equal(await details.count(), 1, 'The fixture name identifies one offer');
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
  await checkPrimaryNavigation(menu, '/');
  await checkLinks(
    menu,
    [cafe, concerts, youtube, churchTools, '/spenden'],
    'No-JS mobile utilities'
  );
  await menu
    .getByRole('navigation', { name: 'Hauptnavigation mobil' })
    .getByRole('link', { name: 'Gottesdienste', exact: true })
    .click();
  assert.equal(
    new URL(page.url()).pathname,
    '/gottesdienste',
    'A mobile menu link navigates without JavaScript'
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await tabTo(page, menu.locator('summary'));
  await page.keyboard.press('Enter');
  await tabTo(page, menu.getByRole('link').last());
  const breadcrumb = page
    .getByRole('navigation', { name: 'Brotkrumennavigation' })
    .getByRole('link', { name: 'Startseite' });
  await tabTo(page, breadcrumb, 1);
  assert.ok(
    await breadcrumb.evaluate((link) => {
      const r = link.getBoundingClientRect();
      return link.contains(document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2));
    }),
    'Tabbing past the open menu must leave the breadcrumb visibly focused without JS'
  );
  await goto(page, '/');
  const toTop = page.getByRole('contentinfo').locator('a[href^="#"]');
  await toTop.focus();
  await page.keyboard.press('Enter');
  await page.waitForFunction(() => window.scrollY <= 1);
  await heroActions(page).first().click();
  assert.equal(new URL(page.url()).pathname, '/besuch', 'Primary journey works without JavaScript');
  await checkVisit(page);
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
      if (width === 1440) await checkPrimaryNavigation(page.getByRole('banner'), route);
      if (route === '/') {
        await checkHome(page);
        await checkHomePreviews(page, true);
      }
      if (route === '/besuch') await checkVisit(page);
      if (fixtures && route === '/gottesdienste')
        await checkLinks(
          page.getByRole('main'),
          ['/gottesdienste/synthetic-second-service'],
          'Full service listing'
        );
      if (fixtures && route === '/aktuelles')
        await checkLinks(
          page.getByRole('main'),
          ['/aktuelles/synthetic-news-d'],
          'Full news listing'
        );
      if (route === '/aktuelles/synthetic-news-b')
        assert.ok(
          await page.getByText('<script>not executable</script>', { exact: true }).isVisible(),
          'Render source markup as text at the actual news destination'
        );
      if (route === '/gemeinde')
        await checkLinks(page.getByRole('main'), placePaths, 'Local place directory');
      if (route === '/petruskirche')
        await checkLinks(
          page.getByRole('main'),
          ['/gottesdienste', concerts],
          'Separate worship and concert listings'
        );
      if (route === '/' || width === 390 || width === 1440)
        await capture(page, `${route.slice(1).replaceAll('/', '-') || 'home'}-${width}`);
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
          const timestamp = message.locator('time[datetime]');
          assert.equal(await timestamp.count(), state === 'stale' ? 1 : 0);
          if (state === 'stale') {
            assert.equal(await timestamp.getAttribute('datetime'), '2026-01-04T10:00:00Z');
            assert.ok((await timestamp.isVisible()) && (await timestamp.innerText()).trim());
          }
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
      // Hit-test the controls themselves: enlarged text must not cover either click target.
      await capture(page, 'home-text-200-320');
      for (const control of [page.locator('header a[href="/"]'), page.locator('header summary')]) {
        await tabTo(page, control);
        await control.click({ trial: true, timeout: 3000 });
      }
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
