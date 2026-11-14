import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { cp, mkdtemp, readFile, rm, symlink, writeFile } from 'node:fs/promises';
import net from 'node:net';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { setTimeout } from 'node:timers/promises';

// Private, disposable copy: no fixture route, secret or approval override enters the real app.
const root = process.cwd();
const fixture = await mkdtemp(join(tmpdir(), 'web-akg-offer-test-'));
const origin = 'http://127.0.0.1:8788';
let server;
const run = async (args, cwd = fixture, env = process.env) => {
  const child = spawn(process.execPath, args, { cwd, env, stdio: 'inherit' });
  const [code] = await once(child, 'exit');
  assert.equal(code, 0, `Fixture command failed: ${args.join(' ')}`);
};
try {
  const port = net.createServer();
  port.listen(8788, '127.0.0.1');
  await once(port, 'listening');
  await new Promise((resolve, reject) =>
    port.close((error) => (error ? reject(error) : resolve()))
  );
  for (const path of [
    'src',
    'public',
    'astro.config.mjs',
    'postcss.config.mjs',
    'wrangler.jsonc',
    'package.json',
    'tsconfig.json'
  ])
    await cp(join(root, path), join(fixture, path), { recursive: true });
  await symlink(join(root, 'node_modules'), join(fixture, 'node_modules'), 'dir');
  const configPath = join(fixture, 'wrangler.jsonc');
  const config = JSON.parse(await readFile(configPath, 'utf8'));
  config.name = 'web-akg-local-fixtures';
  config.preview_urls = false;
  await writeFile(configPath, JSON.stringify(config));
  await writeFile(
    join(fixture, 'src/lib/content.ts'),
    `
    const items = [
      { id: 'synthetic-alpha', name: 'Synthetic Alpha', type: 'Synthetic category', description: 'quasaronly description search' },
      { id: 'synthetic-beta', name: 'Synthetic Beta', type: 'Synthetic category', description: 'nebulaonly description search' },
      { id: 'synthetic-gamma', name: 'Synthetic Gamma', type: 'Synthetic category' }
    ];
    export async function loadGroups() { return { status: 'ready' as const, items }; }
    export async function loadServices() { return { status: 'ready' as const, items: [
      { id: 'synthetic-service', title: 'Synthetic service with a long title for responsive layout testing', start: '2099-01-25T09:00:00Z', end: '2099-01-25T10:00:00Z', allDay: false }
    ] }; }
    export async function loadNews() { return { status: 'ready' as const, items: [
      { id: 'synthetic-news-a', title: 'Synthetic news with a long heading for the homepage', body: 'Synthetic text for layout testing only. '.repeat(12), publishedAt: '2026-01-01T10:00:00Z' },
      { id: 'synthetic-news-b', title: 'Synthetic second news item', body: '<script>not executable</script>', publishedAt: '2026-01-02T10:00:00Z' },
      { id: 'synthetic-news-c', title: 'Synthetic third news item', body: '', publishedAt: '2026-01-03T10:00:00Z' }
    ] }; }
  `
  );
  const homePath = join(fixture, 'src/pages/index.astro');
  const home = await readFile(homePath, 'utf8');
  const sourceRead =
    'const [services, news, groups] = await Promise.all([loadServices(), loadNews(), loadGroups()]);';
  assert.ok(home.includes(sourceRead), 'Fixture must override the actual homepage source results');
  await writeFile(
    homePath,
    home.replace(
      sourceRead,
      sourceRead +
        `
    const fixtureState = Astro.url.searchParams.get('__sourceState');
    if (fixtureState && ['empty', 'unavailable', 'disabled', 'stale'].includes(fixtureState)) {
      for (const result of [services, news, groups]) Object.assign(result, {
        status: fixtureState,
        items: fixtureState === 'stale' ? result.items : [],
        updatedAt: '2026-01-04T10:00:00Z'
      });
    }
  `
    )
  );
  await run(['node_modules/astro/bin/astro.mjs', 'build']);
  server = spawn(
    process.execPath,
    ['node_modules/astro/bin/astro.mjs', 'preview', '--host', '127.0.0.1', '--port', '8788'],
    { cwd: fixture, stdio: 'inherit' }
  );
  let ready = false;
  for (let attempt = 0; attempt < 40; attempt++) {
    assert.equal(server.exitCode, null, 'Private fixture server exited');
    try {
      const response = await fetch(origin, { signal: AbortSignal.timeout(3000) });
      ready = response.ok;
      await response.body?.cancel();
    } catch {
      /* Wait for the owned loopback server. */
    }
    if (ready) break;
    await setTimeout(1000);
  }
  assert(ready, 'Private fixture preview did not become ready');
  await run(['scripts/browser-check.mjs', origin], root, {
    ...process.env,
    EXPECT_OFFER_FIXTURES: '1',
    EXPECT_LIVE_CHURCHTOOLS: '0'
  });
} finally {
  if (server && server.exitCode === null) {
    const exited = once(server, 'exit');
    server.kill('SIGTERM');
    await exited;
  }
  await rm(fixture, { recursive: true, force: true });
}
