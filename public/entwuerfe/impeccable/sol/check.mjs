// Run: node public/entwuerfe/impeccable/sol/check.mjs
// Optional: AKG_QA_SCREENSHOTS=1 saves full-page 390/1440 captures in a unique /tmp directory.
import assert from 'node:assert/strict';
import { readFile, writeFile, mkdtemp, rm } from 'node:fs/promises';
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join, extname } from 'node:path';
import { tmpdir } from 'node:os';

const here = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(here, '../../..');
const manifest = JSON.parse(await readFile(join(here, 'manifest.json'), 'utf8'));
assert.equal(manifest.length, 5);
assert.deepEqual(
  manifest.map((x) => x.number),
  [1, 2, 3, 4, 5]
);
assert.equal(new Set(manifest.map((x) => x.title)).size, 5);
for (const entry of manifest) {
  for (const key of ['title', 'description', 'structure']) assert.ok(entry[key]);
  const html = await readFile(join(here, `${entry.number}.html`), 'utf8');
  assert.match(html, /^<!doctype html>/i);
  assert.match(html, /<html lang="de">/);
  assert.match(html, /<meta name="robots" content="noindex, nofollow">/);
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.equal((html.match(/<main\b/g) || []).length, 1);
  assert.equal((html.match(/<figure\b/g) || []).length, 4);
  assert.ok(!/<(?:script|iframe|form)\b/i.test(html));
  assert.ok(!/href="#"/.test(html));
  assert.match(html, /font-display:swap/);
  for (const source of [
    '2024_Banner_allianz_1.jpg',
    'Gemeindefest-22-VIII.jpg',
    'Gemeindefest-22-XII.jpg',
    'Banner_Dreimaster.jpg'
  ])
    assert.ok(html.includes(source));
  assert.match(html, /Frank Lönne/);
  assert.match(html, /Aktuelle Meldungen sind in diesem Entwurf nicht eingebunden\./);
  for (const path of new Set(html.match(/\/(?:images|fonts)\/[a-zA-Z0-9_.-]+/g)))
    await readFile(join(publicDir, path));
}

const luminance = (hex) => {
  const rgb = hex
    .match(/[0-9a-f]{2}/gi)
    .map((x) => parseInt(x, 16) / 255)
    .map((x) => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
};
const contrast = (a, b) => {
  const values = [luminance(a), luminance(b)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
};
const contrasts = [
  ['ink/white', '#173b50', '#ffffff'],
  ['ink/wash', '#173b50', '#eaf3f7'],
  ['muted/wash', '#476371', '#eaf3f7'],
  ['blue/white', '#006c9e', '#ffffff']
].map(([pair, a, b]) => ({ pair, ratio: contrast(a, b) }));
for (const result of contrasts) assert.ok(result.ratio >= 4.5, JSON.stringify(result));

const server = createServer(async (req, res) => {
  try {
    const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    assert.ok(/^\/(?:entwuerfe\/impeccable\/sol\/|images\/|fonts\/)/.test(path));
    const file = resolve(publicDir, '.' + path);
    assert.ok(file.startsWith(publicDir + '/'));
    const types = {
      '.html': 'text/html; charset=utf-8',
      '.webp': 'image/webp',
      '.png': 'image/png',
      '.woff2': 'font/woff2'
    };
    res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' });
    res.end(await readFile(file));
  } catch {
    res.writeHead(404);
    res.end();
  }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const origin = `http://127.0.0.1:${server.address().port}`;
const temp = await mkdtemp(join(tmpdir(), 'akg129-impeccable-sol-qa-'));
const chrome = process.env.CHROME_BIN || '/ms-playwright/chromium-1248/chrome-linux-arm64/chrome';
const proc = spawn(
  chrome,
  [
    '--headless=new',
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu',
    '--remote-debugging-port=0',
    `--user-data-dir=${temp}/profile`,
    'about:blank'
  ],
  { stdio: ['ignore', 'ignore', 'pipe'] }
);
let socket;
try {
  const browserWs = await new Promise((done, fail) => {
    let log = '';
    const timer = setTimeout(() => fail(new Error(`Chrome startup timed out: ${log}`)), 20000);
    proc.on('error', (error) => {
      clearTimeout(timer);
      fail(error);
    });
    proc.stderr.on('data', (data) => {
      log += data;
      const match = log.match(/DevTools listening on (ws:\/\/[^\s]+)/);
      if (match) {
        clearTimeout(timer);
        done(match[1]);
      }
    });
    proc.on('exit', (code) => {
      clearTimeout(timer);
      fail(new Error(`Chrome exited ${code}: ${log}`));
    });
  });
  console.log('Chrome ready; starting isolated page checks.');
  const browserOrigin = browserWs.replace('ws:', 'http:').split('/devtools/')[0];
  const target = await (
    await fetch(`${browserOrigin}/json/new?about:blank`, {
      method: 'PUT',
      signal: AbortSignal.timeout(15000)
    })
  ).json();
  socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((done, fail) => {
    socket.addEventListener('open', done, { once: true });
    socket.addEventListener('error', fail, { once: true });
  });
  let serial = 0;
  const pending = new Map();
  const events = new Map();
  socket.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    if (data.id) {
      const waiter = pending.get(data.id);
      pending.delete(data.id);
      if (data.error) waiter.reject(data.error);
      else waiter.resolve(data.result);
    }
    if (events.has(data.method)) {
      for (const done of events.get(data.method)) done(data.params);
      events.delete(data.method);
    }
  });
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const id = ++serial;
      pending.set(id, { resolve, reject });
      socket.send(JSON.stringify({ id, method, params }));
    });
  const event = (method) =>
    new Promise((done) => {
      events.set(method, [...(events.get(method) || []), done]);
    });
  const evaluate = async (expression) => {
    const result = await send('Runtime.evaluate', {
      expression,
      awaitPromise: true,
      returnByValue: true
    });
    assert.ok(!result.exceptionDetails, JSON.stringify(result.exceptionDetails));
    return result.result.value;
  };
  const key = async (value) => {
    const data = {
      key: value,
      code: value === ' ' ? 'Space' : value,
      windowsVirtualKeyCode: value === 'Tab' ? 9 : value === ' ' ? 32 : 13
    };
    await send('Input.dispatchKeyEvent', {
      type: 'keyDown',
      ...data,
      text: value === 'Enter' ? '\r' : value === ' ' ? ' ' : ''
    });
    await send('Input.dispatchKeyEvent', { type: 'keyUp', ...data });
  };
  await send('Page.enable');
  const checks = [];
  const screenshots = [];
  for (let number = 1; number <= 5; number++) {
    console.log(`Checking document ${number}/5 at six widths.`);
    for (const width of [320, 375, 390, 414, 768, 1440]) {
      await send('Emulation.setDeviceMetricsOverride', {
        width,
        height: 1000,
        deviceScaleFactor: 1,
        mobile: false
      });
      const loaded = event('Page.loadEventFired');
      await send('Page.navigate', { url: `${origin}/entwuerfe/impeccable/sol/${number}.html` });
      await loaded;
      await evaluate(
        `(async()=>{await document.fonts.ready;for(const img of document.images)img.loading='eager';await Promise.all([...document.images].map(img=>img.decode().catch(()=>{})));return true})()`
      );
      const result = await evaluate(`(()=>{
        const all=[...document.querySelectorAll('*')];
        const ids=all.map(el=>el.id).filter(Boolean);
        const visible=el=>el.getClientRects().length && getComputedStyle(el).visibility!=='hidden';
        const badLinks=[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.getElementById(a.hash.slice(1))).map(a=>a.outerHTML);
        const badImages=[...document.images].filter(img=>!img.complete||!img.naturalWidth||Math.abs(img.getBoundingClientRect().height/img.getBoundingClientRect().width-img.naturalHeight/img.naturalWidth)>.005).map(img=>img.src);
        const shortTargets=[...document.querySelectorAll('a,summary')].filter(visible).filter(el=>el.getBoundingClientRect().height<43.9||el.getBoundingClientRect().width<43.9).map(el=>el.textContent.trim());
        const overflow=all.filter(visible).filter(el=>!el.classList.contains('skip-link')).filter(el=>{const r=el.getBoundingClientRect();return r.left<-.5||r.right>innerWidth+.5}).map(el=>el.tagName+'.'+el.className);
        const externalResources=performance.getEntriesByType('resource').filter(item=>!item.name.startsWith(location.origin+'/')).map(item=>item.name);
        return {width:innerWidth,scrollWidth:document.documentElement.scrollWidth,main:document.querySelectorAll('main').length,h1:document.querySelectorAll('h1').length,uniqueIds:new Set(ids).size===ids.length,badLinks,badImages,shortTargets,overflow,externalResources,fonts:document.fonts.check('17px Figtree'),height:document.documentElement.scrollHeight};
      })()`);
      assert.equal(result.width, width);
      assert.ok(result.scrollWidth <= width + 1, JSON.stringify({ number, ...result }));
      for (const property of [
        'badLinks',
        'badImages',
        'shortTargets',
        'overflow',
        'externalResources'
      ])
        assert.deepEqual(result[property], [], JSON.stringify({ number, ...result }));
      assert.equal(result.main, 1);
      assert.equal(result.h1, 1);
      assert.ok(result.uniqueIds);
      assert.ok(result.fonts);
      checks.push({ number, ...result });
      if (process.env.AKG_QA_SCREENSHOTS && [390, 1440].includes(width)) {
        const name = `${number}-${width}.png`;
        const capture = await send('Page.captureScreenshot', {
          format: 'png',
          captureBeyondViewport: true,
          clip: { x: 0, y: 0, width, height: result.height, scale: 1 }
        });
        await writeFile(join(temp, name), Buffer.from(capture.data, 'base64'));
        screenshots.push(join(temp, name));
      }
      if (width === 390) {
        await key('Tab');
        assert.equal(await evaluate('document.activeElement.className'), 'skip-link');
        await key('Enter');
        assert.equal(await evaluate('document.activeElement.id'), 'inhalt');
        await evaluate("document.querySelector('.mobile-menu>summary').focus()");
        await key('Enter');
        assert.equal(await evaluate("document.querySelector('.mobile-menu').open"), true);
        await key('Tab');
        assert.equal(
          await evaluate('document.activeElement.getAttribute("href")'),
          '#gottesdienste'
        );
        await evaluate("document.querySelector('.mobile-menu>summary').focus()");
        await key('Enter');
        assert.equal(await evaluate("document.querySelector('.mobile-menu').open"), false);
        if ([2, 4].includes(number)) {
          const before = await evaluate("document.querySelector('.question-list details').open");
          await evaluate("document.querySelector('.question-list summary').focus()");
          await key('Enter');
          assert.equal(
            await evaluate("document.querySelector('.question-list details').open"),
            !before
          );
        }
      }
    }
  }
  const report = {
    browser: 'Chromium 156, headless; no packages installed',
    staticDocuments: 5,
    contrasts,
    viewportChecks: checks.length,
    keyboardChecks:
      'Skip link, native menu open/tab/close for all five at 390px; native question toggle in 2 and 4.',
    checks,
    screenshots
  };
  await writeFile(join(here, 'checks-report.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(
    `PASS: five documents, all local assets, 30 viewport checks, five keyboard/menu checks and two native disclosure checks.\nScreenshots: ${screenshots.length ? temp : 'not requested'}`
  );
} finally {
  socket?.close();
  proc.kill();
  await new Promise((done) => {
    if (proc.exitCode !== null) done();
    else proc.once('exit', done);
  });
  await new Promise((done) => server.close(done));
  await rm(join(temp, 'profile'), { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
}
