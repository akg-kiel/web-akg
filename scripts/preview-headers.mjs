import assert from 'node:assert/strict';

export function assertPreviewRobots(header, origin, path) {
  // Cloudflare supplies its own noindex header on workers.dev previews.
  const allowed = new URL(origin).hostname.endsWith('.workers.dev')
    ? ['noindex', 'noindex, nofollow']
    : ['noindex, nofollow'];
  assert.ok(allowed.includes(header), `${path}: unexpected preview robots header: ${header}`);
}
