import assert from 'node:assert/strict';

const origin = new URL(process.argv[2] ?? 'http://127.0.0.1:8787');
const routes = [
  '/',
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

const checkedLinks = new Set();
const missingStatuses = new Map();
const request = (path, init = {}) =>
  fetch(new URL(path, origin), { ...init, signal: AbortSignal.timeout(10_000) });

for (const route of routes) {
  const response = await request(route, { redirect: 'manual' });
  assert.equal(response.status, 200, `${route}: expected a usable page`);
  assert.match(
    response.headers.get('x-robots-tag') ?? '',
    /noindex/,
    `${route}: missing preview protection`
  );
  const html = await response.text();
  if (route === '/gottesdienste' || route === '/aktuelles') {
    missingStatuses.set(
      route,
      /data-source-state="(?:disabled|unavailable|stale)"/.test(html) ? 503 : 404
    );
  }
  if (['/', '/gottesdienste', '/aktuelles', '/angebote'].includes(route)) {
    assert.equal(response.headers.get('cache-control'), 'no-store', route);
  }
  assert.match(html, /<html[^>]+lang="de"/, `${route}: missing German document language`);
  assert.equal((html.match(/<main\b/g) ?? []).length, 1, `${route}: expected one main landmark`);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${route}: expected one page heading`);
  assert.match(html, /name="robots"[^>]+noindex/, `${route}: missing HTML noindex`);
  assert.ok(
    !/<(?:iframe|img)[^>]+(?:src|srcset)="https?:\/\//.test(html),
    `${route}: unexpected third-party embed`
  );
  assert.ok(
    !html.includes('Authorization:') && !html.includes('CHURCHTOOLS_TOKEN'),
    `${route}: server configuration exposed`
  );
  assert.ok(
    !html.includes('konzerte-petruskirche.de'),
    `${route}: unresolvable concert domain must remain unlinked`
  );
  for (const match of html.matchAll(/href="(\/[^"#?]*)(?:[?#][^"]*)?"/g)) {
    const target = match[1];
    if (target.startsWith('//') || target.startsWith('/_') || checkedLinks.has(target)) continue;
    checkedLinks.add(target);
    const linked = await request(target, { method: 'HEAD', redirect: 'follow' });
    assert.ok(linked.ok, `${route}: broken internal link ${target} (${linked.status})`);
  }
}

const missing = await request('/nicht-vorhanden');
assert.equal(missing.status, 404, 'Unknown routes must not turn into successful pages');
assert.match(missing.headers.get('x-robots-tag') ?? '', /noindex/);
for (const route of ['/gottesdienste/nicht-vorhanden', '/aktuelles/nicht-vorhanden']) {
  const response = await request(route);
  assert.equal(
    response.status,
    missingStatuses.get(route.slice(0, route.lastIndexOf('/'))),
    `${route}: distinguish confirmed absence from unavailable sources`
  );
  if (response.status === 503)
    assert.ok(
      response.headers.get('retry-after'),
      `${route}: unavailable detail needs a retry hint`
    );
}
const robots = await request('/robots.txt');
assert.equal(robots.status, 200);
assert.match(await robots.text(), /^Disallow: \/\s*$/m);
const serverFile = await request('/server/entry.mjs');
assert.equal(serverFile.status, 404, 'Worker bundle must never be served as a public asset');
console.log(
  `MVP smoke checks passed: ${routes.length} pages, links, errors, privacy and preview guards.`
);
