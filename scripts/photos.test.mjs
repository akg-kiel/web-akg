import assert from 'node:assert/strict';
import test from 'node:test';
import { photos, withheldPhotoNames } from '../src/lib/photos.mjs';

test('community photographs remain withheld until their explicit publication approval', () => {
  assert.deepEqual([...withheldPhotoNames].sort(), [
    'cafe-dreimaster',
    'gemeinde-fest',
    'gemeinde-gespraech',
    'gemeinde-gottesdienst'
  ]);
  for (const view of ['service', 'conversation', 'gathering', 'cafe'])
    assert.equal(photos[view].publicApproved, false);
  for (const view of ['outside', 'ceiling', 'portal', 'side']) {
    assert.equal(photos[view].publicApproved, true);
    assert.ok(photos[view].author && photos[view].license && photos[view].source);
  }
});
