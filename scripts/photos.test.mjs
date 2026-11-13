import assert from 'node:assert/strict';
import test from 'node:test';
import { photos, withheldPhotoNames } from '../src/lib/photos.mjs';

test('all eight selected photographs are approved for preview and production by user request', () => {
  assert.equal(Object.keys(photos).length, 8);
  assert.deepEqual(withheldPhotoNames, []);
  for (const photo of Object.values(photos)) {
    assert.equal(photo.publicApproved, true);
    assert.ok(photo.source && photo.alt);
  }
  for (const view of ['outside', 'ceiling', 'portal', 'side'])
    assert.ok(photos[view].author && photos[view].license);
  for (const view of ['service', 'conversation', 'gathering', 'cafe'])
    assert.equal('license' in photos[view], false, 'Do not invent an open license');
});
