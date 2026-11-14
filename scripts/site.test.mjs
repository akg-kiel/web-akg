import assert from 'node:assert/strict';
import test from 'node:test';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import {
  currentPage,
  detailPath,
  sourceIdFromPath,
  formatDate,
  formatNewsExcerpt,
  formatServiceTime,
  externalLinks
} from '../src/lib/site.ts';

test('the original Apostel logo is preserved byte-for-byte', async () => {
  const logo = await readFile(new URL('../public/images/apostel-logo.png', import.meta.url));
  assert.equal(
    createHash('sha256').update(logo).digest('hex'),
    'f876966571e2cf45b5c444047eadf9fef1ecafce4ffe43471bb87dfb79e3fec9'
  );
});

test('the extended brand palette retains its source values and readable color pairs', async () => {
  const css = await readFile(new URL('../src/styles/globals.css', import.meta.url), 'utf8');
  const palette = {
    ink: '#173b50',
    blue: '#006c9e',
    paper: '#ffffff',
    wash: '#eaf3f7',
    muted: '#50616c',
    green: '#1a7663',
    'green-wash': '#e8f1ef',
    cream: '#fbf1d9',
    sun: '#f2d38b',
    rust: '#aa420d'
  };
  for (const [name, hex] of Object.entries(palette))
    assert.ok(css.includes(`--color-${name}: ${hex};`), name);
  const luminance = (hex) =>
    hex
      .slice(1)
      .match(/../g)
      .reduce((sum, channel, index) => {
        const value = parseInt(channel, 16) / 255;
        return (
          sum +
          [0.2126, 0.7152, 0.0722][index] *
            (value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4)
        );
      }, 0);
  for (const [foreground, background] of [
    ['green', 'paper'],
    ['green', 'green-wash'],
    ['ink', 'green-wash'],
    ['muted', 'green-wash'],
    ['blue', 'green-wash'],
    ['paper', 'green'],
    ['rust', 'cream'],
    ['ink', 'sun'],
    ['paper', 'blue']
  ]) {
    const [light, dark] = [luminance(palette[foreground]), luminance(palette[background])].sort(
      (a, b) => b - a
    );
    assert.ok((light + 0.05) / (dark + 0.05) >= 4.5, `${foreground} on ${background}`);
  }
});

test('navigation and stable source identifiers do not depend on titles', () => {
  assert.equal(currentPage('/aktuelles', '/aktuelles'), 'page');
  assert.equal(currentPage('/aktuelles/example', '/aktuelles'), 'location');
  assert.equal(currentPage('/aktuelles-alt', '/aktuelles'), undefined);
  for (const id of ['2:901:2026-10-27T10:00:00.000Z', 'synthetic-post-1']) {
    const path = detailPath('gottesdienste', id);
    assert.equal(sourceIdFromPath(path), id);
    assert.equal(sourceIdFromPath(path + '/'), id);
  }
  assert.equal(sourceIdFromPath('/aktuelles/%broken'), '');
  assert.equal(detailPath('aktuelles', 'a/b').split('/').length, 3);
  for (const link of externalLinks) {
    const url = new URL(link.href);
    assert.equal(url.protocol, 'https:');
    assert.equal(url.username + url.password, '');
  }
});

test('the footer uses native document-top navigation and preserves the content skip link', async () => {
  const footer = await readFile(new URL('../src/components/Footer.astro', import.meta.url), 'utf8');
  const layout = await readFile(new URL('../src/layouts/Layout.astro', import.meta.url), 'utf8');
  assert.match(footer, /<a href="#">Zum Seitenanfang <span aria-hidden="true">↑<\/span><\/a>/);
  assert.match(layout, /class="skip-link" href="#inhalt"/);
  assert.match(layout, /<main id="inhalt" tabindex="-1">/);
});

test('search engines can crawl every route to read the global noindex instruction', async () => {
  const { GET } = await import('../src/pages/robots.txt.ts');
  const robots = await GET({});
  assert.equal(await robots.text(), 'User-agent: *\nDisallow:\n');
  const layout = await readFile(new URL('../src/layouts/Layout.astro', import.meta.url), 'utf8');
  assert.match(layout, /<meta name="robots" content="noindex, nofollow"\s*\/>/);
});

test('news excerpts count Unicode code points without splitting supplementary characters', () => {
  for (const body of ['', 'Kurz', 'a'.repeat(220), '😀'.repeat(220), 'a'.repeat(219) + '😀']) {
    assert.equal(formatNewsExcerpt(body), body);
  }
  assert.equal(formatNewsExcerpt('a'.repeat(219) + '😀 Ende'), 'a'.repeat(219) + '😀…');
  assert.equal(formatNewsExcerpt('😀'.repeat(221)), '😀'.repeat(220) + '…');
});

test('German service times follow Berlin DST and all-day exclusive end semantics', () => {
  assert.match(formatDate('2026-10-26T23:30:00Z'), /Dienstag, 27\. Oktober 2026/);
  assert.equal(
    formatServiceTime({
      start: '2026-01-25T09:00:00Z',
      end: '2026-01-25T10:00:00Z',
      allDay: false
    }),
    'Sonntag, 25. Januar 2026 · 10:00–11:00 Uhr'
  );
  assert.equal(
    formatServiceTime({
      start: '2026-07-26T08:00:00Z',
      end: '2026-07-26T09:00:00Z',
      allDay: false
    }),
    'Sonntag, 26. Juli 2026 · 10:00–11:00 Uhr'
  );
  assert.equal(
    formatServiceTime({
      start: '2026-10-25T00:50:00Z',
      end: '2026-10-25T01:10:00Z',
      allDay: false
    }),
    'Sonntag, 25. Oktober 2026 · 02:50 GMT+2–02:10 GMT+1 Uhr'
  );
  assert.equal(
    formatServiceTime({
      start: '2026-03-29T00:50:00Z',
      end: '2026-03-29T01:10:00Z',
      allDay: false
    }),
    'Sonntag, 29. März 2026 · 01:50 GMT+1–03:10 GMT+2 Uhr'
  );
  assert.equal(
    formatServiceTime({ start: '2026-03-28T23:00:00Z', end: '2026-03-29T22:00:00Z', allDay: true }),
    'Sonntag, 29. März 2026 · ganztägig'
  );
  assert.equal(
    formatServiceTime({ start: '2026-10-24T22:00:00Z', end: '2026-10-25T23:00:00Z', allDay: true }),
    'Sonntag, 25. Oktober 2026 · ganztägig'
  );
  assert.match(
    formatServiceTime({
      start: '2026-10-26T22:30:00Z',
      end: '2026-10-27T00:30:00Z',
      allDay: false
    }),
    /Montag.*23:30 Uhr bis Dienstag.*01:30 Uhr/
  );
  assert.equal(
    formatServiceTime({ start: 'invalid', end: 'invalid', allDay: false }),
    'Zeitangabe derzeit nicht verfügbar'
  );
  assert.equal(
    formatServiceTime({
      start: '2026-10-26T11:00:00Z',
      end: '2026-10-26T10:00:00Z',
      allDay: false
    }),
    'Zeitangabe derzeit nicht verfügbar'
  );
});
