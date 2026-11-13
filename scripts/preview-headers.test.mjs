import assert from 'node:assert/strict';
import test from 'node:test';
import { assertPreviewRobots } from './preview-headers.mjs';

test('local and custom-domain responses retain the full application robots policy', () => {
  for (const origin of [
    'http://127.0.0.1:8787',
    'https://akg-kiel.de',
    'https://preview.workers.dev.example.org'
  ]) {
    assertPreviewRobots('noindex, nofollow', origin, '/');
    assert.throws(() => assertPreviewRobots('noindex', origin, '/'));
  }
});

test('workers.dev previews allow Cloudflare noindex but never missing or indexable headers', () => {
  const origin = new URL('https://branch-web-akg.example.workers.dev');
  for (const header of ['noindex', 'noindex, nofollow']) {
    assertPreviewRobots(header, origin, '/');
  }
  for (const header of [null, '', 'index', 'nofollow', 'noindex, follow', 'not-noindex']) {
    assert.throws(() => assertPreviewRobots(header, origin, '/'));
  }
});
