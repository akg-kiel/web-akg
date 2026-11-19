import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { assertPreviewRobots } from './preview-headers.mjs';

const origin = new URL(process.argv[2] ?? 'http://127.0.0.1:8787');
const routes = [
  '/',
  '/besuch',
  '/gottesdienste',
  '/aktuelles',
  '/angebote',
  '/gemeinde',
  '/kontakt',
  '/spenden',
  '/impressum',
  '/datenschutz',
  '/petruskirche',
  '/gemeindehaus-mitte',
  '/gemeindehaus-wik'
];

// Check runtime output, not just a clean public/ tree: stale assets could still be served.
const removedGalleryPaths = [
  '/entwuerfe',
  '/entwuerfe/index.html',
  '/entwuerfe/catalog.json',
  '/entwuerfe/hallmark/astra/1.html',
  '/entwuerfe/layout/1.html',
  '/entwuerfe/mobbin/begegnung.html',
  '/entwuerfe/neu/einladung.html',
  '/entwuerfe/neu/stock/11284053-640.webp'
];
const checkedLinks = new Set();
const missingStatuses = new Map();
const request = (path, init = {}) =>
  fetch(new URL(path, origin), { ...init, signal: AbortSignal.timeout(10_000) });

for (const route of routes) {
  const response = await request(route, { redirect: 'manual' });
  assert.equal(response.status, 200, `${route}: expected a usable page`);
  assertPreviewRobots(response.headers.get('x-robots-tag'), origin, route);
  const html = await response.text();
  if (route === '/gottesdienste' || route === '/aktuelles') {
    missingStatuses.set(
      route,
      /data-source-state="(?:disabled|unavailable|stale)"/.test(html) ? 503 : 404
    );
  }
  if (
    ['/', '/besuch', '/kontakt', '/spenden', '/gottesdienste', '/aktuelles', '/angebote'].includes(
      route
    )
  ) {
    assert.equal(response.headers.get('cache-control'), 'no-store', route);
  }
  assert.match(html, /<html[^>]+lang="de"/, `${route}: missing German document language`);
  assert.equal((html.match(/<main\b/g) ?? []).length, 1, `${route}: expected one main landmark`);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${route}: expected one page heading`);
  assert.match(html, /name="robots" content="noindex, nofollow"/, `${route}: missing HTML noindex`);
  assert.ok(
    !/<(?:iframe|img)[^>]+(?:src|srcset)="https?:\/\//.test(html),
    `${route}: unexpected third-party embed`
  );
  assert.ok(
    !html.includes('Authorization:') && !html.includes('CHURCHTOOLS_TOKEN'),
    `${route}: server configuration exposed`
  );
  for (const [, href] of html.matchAll(/\bhref="([^"]+)"/gi)) {
    assert.doesNotMatch(
      new URL(href, origin).hostname,
      /^(?:www\.)?konzerte-petruskirche\.de$/i,
      `${route}: superseded concert address`
    );
  }
  for (const match of html.matchAll(/href="(\/[^"#?]*)(?:[?#][^"]*)?"/g)) {
    const target = match[1];
    if (target.startsWith('//') || target.startsWith('/_') || checkedLinks.has(target)) continue;
    checkedLinks.add(target);
    const linked = await request(target, { method: 'HEAD', redirect: 'follow' });
    assert.ok(linked.ok, `${route}: broken internal link ${target} (${linked.status})`);
  }
}

const logo = await request('/images/apostel-logo.png');
assert.equal(logo.status, 200);
assertPreviewRobots(logo.headers.get('x-robots-tag'), origin, '/images/apostel-logo.png');
assert.match(logo.headers.get('content-type') ?? '', /^image\/png\b/);
assert.deepEqual(
  Buffer.from(await logo.arrayBuffer()),
  await readFile(new URL('../public/images/apostel-logo.png', import.meta.url)),
  'The deployed wordmark must be the original logo'
);
for (const route of ['/nicht-vorhanden', ...removedGalleryPaths]) {
  const missing = await request(route, { redirect: 'manual' });
  assert.equal(missing.status, 404, `${route}: must not serve an obsolete or successful page`);
  assertPreviewRobots(missing.headers.get('x-robots-tag'), origin, route);
  // Non-HTML asset misses only have the HTTP indexing instruction.
  if (missing.headers.get('content-type')?.includes('text/html'))
    assert.match(await missing.text(), /name="robots" content="noindex, nofollow"/, route);
  else await missing.body?.cancel();
}
for (const route of ['/gottesdienste/nicht-vorhanden', '/aktuelles/nicht-vorhanden']) {
  const response = await request(route);
  assert.equal(
    response.status,
    missingStatuses.get(route.slice(0, route.lastIndexOf('/'))),
    `${route}: distinguish confirmed absence from unavailable sources`
  );
  assertPreviewRobots(response.headers.get('x-robots-tag'), origin, route);
  assert.match(await response.text(), /name="robots" content="noindex, nofollow"/, route);
  assert.equal(response.headers.get('cache-control'), 'no-store', route);
  if (response.status === 503)
    assert.equal(response.headers.get('retry-after'), '1800', `${route}: retry after 30 minutes`);
}
const robots = await request('/robots.txt');
assert.equal(robots.status, 200);
assertPreviewRobots(robots.headers.get('x-robots-tag'), origin, '/robots.txt');
assert.equal(await robots.text(), 'User-agent: *\nDisallow:\n');
const sitemap = await request('/sitemap.xml');
assert.equal(sitemap.status, 404, 'Do not publish a sitemap for the non-indexable site');
assertPreviewRobots(sitemap.headers.get('x-robots-tag'), origin, '/sitemap.xml');
await sitemap.body?.cancel();
const serverFile = await request('/server/entry.mjs');
assert.equal(serverFile.status, 404, 'Worker bundle must never be served as a public asset');
console.log(
  `MVP smoke checks passed: ${routes.length} pages, links, errors, privacy and preview guards.`
);
