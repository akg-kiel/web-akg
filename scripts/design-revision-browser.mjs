import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { resolve, extname, sep } from 'node:path';
import { chromium } from 'playwright-core';
import sharp from 'sharp';

const require = createRequire(import.meta.url);
assert.equal(require('playwright-core/package.json').version, process.env.PLAYWRIGHT_VERSION);
const root = resolve('public');
const mobbin = process.argv.includes('--mobbin');
const layout = process.argv.includes('--layout');
const prefix = mobbin ? 'akg-mobbin' : layout ? 'akg-layout' : 'akg-stock-skizzen';
const flag = mobbin ? '--mobbin' : layout ? '--layout' : '--revision';
const output = `/tmp/${prefix}-qa`;
const catalog = JSON.parse(
  await readFile(
    mobbin
      ? 'public/entwuerfe/mobbin/concepts.json'
      : layout
        ? 'public/entwuerfe/layout/concept.json'
        : 'public/entwuerfe/neu/concepts.json',
    'utf8'
  )
);
assert.equal(catalog.length, mobbin ? 3 : layout ? 1 : 2);
const credits = JSON.parse(await readFile('public/entwuerfe/neu/stock/credits.json', 'utf8'));
assert.equal(credits.photos.length, 3);
const mime = {
  '.html': 'text/html',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.woff2': 'font/woff2'
};
const server = createServer(async (request, response) => {
  try {
    const file = resolve(root, '.' + new URL(request.url, 'http://localhost').pathname);
    if (!file.startsWith(root + sep)) throw new Error('Not public');
    const bytes = await readFile(file);
    response.writeHead(200, {
      'Content-Type': mime[extname(file)] ?? 'application/octet-stream',
      'X-Frame-Options': 'DENY',
      'X-Robots-Tag': 'noindex, nofollow'
    });
    response.end(bytes);
  } catch {
    response.writeHead(404);
    response.end('Not found');
  }
});
await mkdir(output, { recursive: true });
await new Promise((done) => server.listen(0, '127.0.0.1', done));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const findings = [];
const errors = [];
const external = [];
try {
  const context = await browser.newContext();
  await context.route('**/*', (route) => {
    if (new URL(route.request().url()).origin !== origin) {
      external.push(route.request().url());
      return route.abort();
    }
    return route.continue();
  });
  const page = await context.newPage();
  page.on('pageerror', (error) => errors.push(String(error)));
  for (const design of catalog) {
    const html = await readFile(`public${design.path}`, 'utf8');
    assert.match(html, /name="robots"[^>]+noindex/);
    assert.doesNotMatch(html, /gemeinde-(gottesdienst|gespraech|fest)-|cafe-dreimaster-\d+/);
    assert.match(html, /Symbolfoto/);
    for (const width of [320, 390, 768, 1440]) {
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
        const issues = [];
        if (document.documentElement.scrollWidth > innerWidth + 1)
          issues.push('horizontal overflow');
        if (
          document.querySelectorAll('h1').length !== 1 ||
          document.querySelectorAll('main').length !== 1
        )
          issues.push('main/H1');
        for (const image of document.images) {
          const rect = image.getBoundingClientRect();
          if (!image.complete || !image.naturalWidth) issues.push('broken image');
          if (
            getComputedStyle(image).objectFit !== 'cover' &&
            Math.abs(rect.width / rect.height - image.naturalWidth / image.naturalHeight) > 0.03
          )
            issues.push('distorted image');
        }
        for (const heading of document.querySelectorAll('h1,h2')) {
          if (
            heading.getBoundingClientRect().height /
              parseFloat(getComputedStyle(heading).lineHeight) >
            2.1
          )
            issues.push('heading over two lines: ' + heading.textContent);
        }
        return issues;
      });
      await page.keyboard.press('Tab');
      assert.equal(
        await page.locator('.skip').evaluate((element) => element === document.activeElement),
        true
      );
      await page.keyboard.press('Enter');
      assert.equal(
        await page.locator('main').evaluate((element) => element === document.activeElement),
        true
      );
      for (const summary of await page.locator('details > summary').all()) {
        if (!(await summary.isVisible())) continue;
        await summary.focus();
        await page.keyboard.press('Enter');
        assert.equal(await summary.evaluate((element) => element.parentElement.open), true);
        await page.keyboard.press('Enter');
      }
      await page.evaluate(() => {
        document.activeElement?.blur();
        scrollTo(0, 0);
      });
      await page.screenshot({
        path: `${output}/${design.id.split('/').at(-1)}-${width}.png`,
        fullPage: true
      });
      if (width === 1440)
        await sharp(await readFile(`${output}/${design.id.split('/').at(-1)}-${width}.png`))
          .resize({ width: layout ? 1280 : 640 })
          .webp({ quality: layout ? 80 : 70 })
          .toFile(`public${design.thumbnail}`);
      let axe = [];
      if ([390, 1440].includes(width)) {
        await page.addScriptTag({ path: require.resolve('axe-core/axe.min.js') });
        axe = await page.evaluate(async () =>
          (await globalThis.axe.run()).violations.map((item) => ({
            id: item.id,
            targets: item.nodes.map((node) => node.target)
          }))
        );
      }
      findings.push({ id: design.id, width, issues, axe });
      for (const rail of await page.locator('[data-scroll-rail]').all()) {
        assert.equal(
          await rail.evaluate((element) => element.scrollLeft),
          0,
          'Rail starts at its first destination'
        );
        if (await rail.evaluate((element) => element.scrollWidth > element.clientWidth + 1)) {
          await rail.focus();
          await page.keyboard.press('ArrowRight');
          await page.waitForFunction(
            () => document.querySelector('[data-scroll-rail]').scrollLeft > 0
          );
        }
      }
    }
  }
  await context.close();
  execFileSync(process.execPath, ['scripts/export-design-gallery.mjs', flag], {
    stdio: 'inherit'
  });
  const portable = await browser.newContext();
  const p = await portable.newPage();
  p.on('pageerror', (error) => errors.push(String(error)));
  p.on('request', (request) => {
    if (request.url().startsWith('http')) external.push(request.url());
  });
  for (const file of [`${prefix}.html`, `${prefix}-inline.html`]) {
    await p.goto(`file:///tmp/${file}`);
    if (mobbin) await p.locator('.thumbnail').first().waitFor();
    if (mobbin)
      for (const thumbnail of await p.locator('.thumbnail').all()) {
        await thumbnail.evaluate((image) => image.decode());
        assert.equal(
          await thumbnail.evaluate(
            (image) => image.naturalWidth > 0 && image.getBoundingClientRect().height > 100
          ),
          true,
          'Visible recreation thumbnail'
        );
      }
    await p.locator('.design-trigger').first().click();
    await p.waitForFunction(
      () =>
        document.querySelector('#viewer').open && !document.querySelector('#design-frame').hidden
    );
    assert.equal(await p.locator('.design-card').count(), catalog.length);
    const frame = p.frameLocator('#design-frame');
    if (mobbin) {
      for (let index = 0; index < catalog.length; index++) {
        if (index) await p.locator('#next').click();
        await p.waitForFunction(
          (title) =>
            !document.querySelector('#design-frame').hidden &&
            document.querySelector('#viewer-title').textContent === title,
          catalog[index].title
        );
        assert.equal(
          (await frame.locator('h1').innerText()).replace(/\s+/g, ' ').trim(),
          catalog[index].heading
        );
        await p.locator('[data-width="390"]').click();
        assert.equal(await frame.locator('html').evaluate(() => innerWidth), 390);
        if (catalog[index].id === 'mobbin/entdecken') {
          const rail = frame.locator('[data-scroll-rail]');
          await rail.focus();
          await p.keyboard.press('ArrowRight');
          await p.waitForFunction(
            () =>
              document
                .querySelector('#design-frame')
                .contentDocument.querySelector('[data-scroll-rail]').scrollLeft > 0
          );
          assert.equal(await p.locator('#viewer-title').innerText(), catalog[index].title);
        }
      }
      assert.equal(await p.locator('.reference-source').count(), 3);
    } else if (layout) {
      assert.match(await frame.locator('h1').innerText(), /Schön, dass du/);
      assert.equal(await p.locator('#next').isDisabled(), true);
    } else {
      assert.equal(await frame.locator('h1').innerText(), 'Wohin möchtest du?');
      await p.locator('#next').click();
      await p.waitForFunction(
        () =>
          document.querySelector('#viewer-meta').textContent.includes('Variante 2') &&
          !document.querySelector('#design-frame').hidden
      );
      assert.match(await frame.locator('h1').innerText(), /Ein Platz für dich/);
    }
    await p.locator('[data-width="390"]').click();
    assert.equal(await frame.locator('html').evaluate(() => innerWidth), 390);
    await frame.locator('body').evaluate(async () => {
      await document.fonts.ready;
      await Promise.all(
        [...document.images].map((image) => {
          image.loading = 'eager';
          return image.decode();
        })
      );
    });
    assert.equal(
      await frame
        .locator('html')
        .evaluate(() => document.documentElement.scrollWidth > innerWidth + 1),
      false
    );
    await p.keyboard.press('Escape');
    await p.waitForFunction(() => !document.querySelector('#viewer').open);
    assert.equal(await p.locator('.design-trigger').count(), catalog.length);
  }
  await portable.close();
  assert.deepEqual(errors, [], 'Browser errors');
  assert.deepEqual(external, [], 'External resource requests');
  assert.equal(
    findings.some((item) => item.issues.length || item.axe.length),
    false,
    JSON.stringify(findings)
  );
  console.log(
    `${catalog.length} Entwurf/Entwürfe × vier Breiten, Tastatur, axe und portable Vergleichsansicht bestanden.`
  );
} finally {
  await writeFile(`${output}/report.json`, JSON.stringify({ findings, errors, external }, null, 2));
  await browser.close();
  await new Promise((done) => server.close(done));
}
