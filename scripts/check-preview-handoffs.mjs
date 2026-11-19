import assert from 'node:assert/strict';
import { createTestHarness } from 'wrangler';

// Dispatch to the built Worker locally. No DNS or requests to the current parish site.
const server = createTestHarness({ workers: [{ configPath: './dist/server/wrangler.json' }] });
const routes = [
  ['/besuch', ['/gottesdienste', '/angebote-und-gruppen/neu-hier']],
  ['/kontakt', ['/kontakt#gemeindebuero']],
  ['/spenden', ['/spenden']]
];
try {
  await server.listen();
  for (const host of ['preview.workers.dev', 'akg-kiel.de', 'www.akg-kiel.de']) {
    const preview = host === 'preview.workers.dev';
    for (const [page, targets] of routes) {
      const response = await server.fetch(`https://${host}${page}`);
      assert.equal(response.status, 200, `${host}${page}: render the visitor page`);
      const html = await response.text();
      assert.match(html, /<h1\b/, page);
      assert.equal(html.includes(' auf akg-kiel.de'), preview, `${host}${page}: handoff label`);
      const anchors = [...html.matchAll(/<a\b[^>]*?\shref="([^"]+)"/g)].map(([, href]) => href);
      for (const target of targets) {
        assert.equal(
          anchors.includes(`https://akg-kiel.de${target}`),
          preview,
          `${host}${page}: handoff to ${target}`
        );
      }
    }
  }
} finally {
  await server.close();
}
console.log('Current-site links render on the preview, not on either future production host.');
