import assert from 'node:assert/strict';
import test from 'node:test';
import { photos, withheldPhotoNames } from '../src/lib/photos.mjs';

const commons = ['outside', 'ceiling', 'portal', 'side'];
const archive = ['service', 'conversation', 'gathering', 'cafe', 'concert'];

test('selected photographs have a publication decision, alternative text and an attributed source', () => {
  for (const view of [...commons, 'service', 'conversation', 'gathering', 'cafe'])
    assert.equal(photos[view].publicApproved, true, `Preserve the existing decision for ${view}`);
  // A new archive entry is not automatically cleared just because earlier photos were.
  for (const [view, photo] of Object.entries(photos)) {
    assert.equal(typeof photo.publicApproved, 'boolean', view);
    assert.ok(photo.alt.trim(), view);
    assert.equal(new URL(photo.source).protocol, 'https:', view);
    assert.equal(withheldPhotoNames.includes(photo.name), photo.publicApproved !== true, view);
  }
});

test('AKG and concert archive credits do not inherit a Commons license', () => {
  for (const view of commons) assert.ok(photos[view].author && photos[view].license, view);
  for (const view of archive) {
    assert.match(photos[view].caption, /archiv|\b20\d{2}\b/i, view);
    assert.equal('license' in photos[view], false, view);
  }
  assert.equal(photos.service.author, 'Frank Lönne');
  assert.equal(photos.concert.author, 'Yosua Pandelaki');
  assert.equal(new URL(photos.concert.source).hostname, 'petruskirche.events');
});
