import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';

const source = JSON.parse(await readFile('wrangler.jsonc', 'utf8'));
const built = JSON.parse(await readFile('dist/server/wrangler.json', 'utf8'));
for (const config of [source, built]) {
  assert.equal(config.name, 'web-akg');
  assert.equal(config.workers_dev, false);
  assert.equal(config.preview_urls, true);
  assert.equal(config.assets.run_worker_first, true);
  assert.ok(config.compatibility_flags.includes('fetch_iterable_type_support'));
  assert.equal(config.vars.SERVICES_APPROVED, 'false');
  assert.equal(config.vars.CHURCHTOOLS_TOKEN, undefined, 'Token must be a server-side secret');
  assert.equal(config.route, undefined);
  assert.deepEqual(config.routes ?? [], [], 'No production routes');
  assert.deepEqual(config.send_email ?? [], [], 'No mail bindings');
}
assert.equal(source.main, './src/worker.ts');
assert.equal(built.assets.directory, '..');
assert.equal(built.assets.html_handling, 'drop-trailing-slash');
assert.match(await readFile('dist/.assetsignore', 'utf8'), /^server$/m);
assert.match(await readFile('.dev.vars.example', 'utf8'), /^CHURCHTOOLS_TOKEN=$/m);
await access(join('dist/server', built.main));

const publicFiles = (await readdir('dist', { recursive: true, withFileTypes: true }))
  .filter((entry) => entry.isFile())
  .map((entry) => relative('dist', join(entry.parentPath, entry.name)))
  .filter((path) => !path.startsWith('server/'));
assert(
  publicFiles.some((path) => path.endsWith('.html')),
  'Expected prerendered public pages'
);
for (const path of publicFiles) {
  assert(!/(^|\/)(?:wrangler\.[^/]+|\.dev\.vars[^/]*|\.env[^/]*)$/.test(path), path);
  if (/\.(?:html|js|css|json|map|txt|xml)$/.test(path)) {
    const content = await readFile(join('dist', path), 'utf8');
    assert.doesNotMatch(content, /CHURCHTOOLS_TOKEN/, path);
    if (path.endsWith('.html')) {
      assert.match(content, /<html[^>]+lang="de"/, `${path}: expected actual German HTML`);
      assert.match(content, /<main\b/, `${path}: missing rendered main landmark`);
      assert.match(content, /<h1\b/, `${path}: missing rendered page heading`);
    }
  }
}

const origin = process.argv.find((arg) => arg.startsWith('--origin='))?.slice(9);
if (origin) {
  const asset = publicFiles.find((path) => path.startsWith('_astro/') && path.endsWith('.css'));
  assert(asset, 'Expected a built stylesheet for asset-header coverage');
  for (const path of [
    '/',
    '/gottesdienste',
    '/aktuelles',
    '/angebote',
    '/angebote/?q=preview',
    '/' + asset,
    '/__missing__',
    '/server/wrangler.json'
  ]) {
    const response = await fetch(new URL(path, origin), {
      redirect: 'manual',
      signal: AbortSignal.timeout(10_000)
    });
    assert.equal(response.headers.get('x-robots-tag'), 'noindex, nofollow', path);
    assert.equal(response.headers.get('x-content-type-options'), 'nosniff', path);
    assert.equal(response.headers.get('x-frame-options'), 'DENY', path);
    assert.equal(response.headers.get('referrer-policy'), 'strict-origin-when-cross-origin', path);
    assert.match(
      response.headers.get('content-security-policy') ?? '',
      /frame-ancestors 'none'/,
      path
    );
    if (path === '/angebote/?q=preview') {
      assert.equal(response.status, 308, 'Static URLs must drop trailing slashes');
      const location = new URL(response.headers.get('location'), origin);
      assert.equal(location.pathname, '/angebote');
      assert.equal(location.search, '?q=preview');
    }
    if (path === '/__missing__' || path.startsWith('/server/'))
      assert.equal(response.status, 404, path);
    if (response.headers.get('content-type')?.includes('text/html')) {
      assert.match(
        await response.text(),
        /<main\b/,
        `${path}: runtime must render HTML, not stringify an iterable`
      );
    } else {
      await response.body?.cancel();
    }
  }
}
console.log(
  'Cloudflare build boundaries passed' + (origin ? ' (including local response headers)' : '')
);
