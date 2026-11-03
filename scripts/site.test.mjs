import assert from 'node:assert/strict';
import test from 'node:test';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import {
  currentPage,
  detailPath,
  sourceIdFromPath,
  formatDate,
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

test('German service times follow Berlin DST and all-day exclusive end semantics', () => {
  assert.match(formatDate('2026-10-26T23:30:00Z'), /Dienstag, 27\. Oktober 2026/);
  assert.match(
    formatServiceTime({
      start: '2026-01-25T09:00:00Z',
      end: '2026-01-25T10:00:00Z',
      allDay: false
    }),
    /10:00–11:00 Uhr/
  );
  assert.match(
    formatServiceTime({
      start: '2026-07-26T08:00:00Z',
      end: '2026-07-26T09:00:00Z',
      allDay: false
    }),
    /10:00–11:00 Uhr/
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
