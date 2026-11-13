import assert from 'node:assert/strict';
import { register } from 'node:module';
import test from 'node:test';

// Stub only Astro's runtime entrypoint; exercise the real Worker without a server or bindings.
const handlerUrl =
  'data:text/javascript,' +
  encodeURIComponent(`
  export let handle = () => new Response('ok');
  export function setHandle(value) { handle = value; }
`);
const { setHandle } = await import(handlerUrl);
register(
  'data:text/javascript,' +
    encodeURIComponent(`
    export function resolve(specifier, context, nextResolve) {
      return specifier === '@astrojs/cloudflare/handler'
        ? { url: ${JSON.stringify(handlerUrl)}, shortCircuit: true }
        : nextResolve(specifier, context);
    }
  `),
  import.meta.url
);
const { default: worker } = await import('../src/worker.ts');

const privateText = 'PRIVATE_TOKEN_AND_SOURCE_PAYLOAD';

test('handler failures log only bounded built-in classifications, never thrown or request data', async (t) => {
  const log = t.mock.method(console, 'error', () => {});
  const opaqueError = new Error(privateText);
  for (const key of ['stack', 'name', 'message', 'cause']) {
    Object.defineProperty(opaqueError, key, {
      get() {
        throw new Error(`must not inspect ${key}`);
      }
    });
  }
  const cases = [
    [new TypeError(privateText), 'TypeError'],
    [new RangeError(privateText), 'RangeError'],
    [new SyntaxError(privateText), 'SyntaxError'],
    [new ReferenceError(privateText), 'ReferenceError'],
    [new URIError(privateText), 'URIError'],
    [new EvalError(privateText), 'EvalError'],
    [new AggregateError([new Error(privateText)], privateText), 'AggregateError'],
    [opaqueError, 'Error'],
    [
      new Proxy(
        {},
        {
          getPrototypeOf() {
            throw new Error(privateText);
          }
        }
      ),
      'unknown'
    ],
    [{ name: privateText, message: privateText, payload: privateText }, 'unknown'],
    [privateText, 'unknown'],
    [null, 'unknown']
  ];
  for (const [failure, errorType] of cases) {
    setHandle(() => {
      throw failure;
    });
    const request = new Request(`https://example.invalid/${privateText}?token=${privateText}`, {
      headers: { Authorization: `Bearer ${privateText}` }
    });
    const response = await worker.fetch(request, {}, {});
    assert.equal(response.status, 500);
    assert.equal(await response.text(), 'Die Seite ist vorübergehend nicht erreichbar.');
    assert.equal(response.headers.get('X-Robots-Tag'), 'noindex, nofollow');
    assert.equal(response.headers.get('X-Content-Type-Options'), 'nosniff');
    assert.match(response.headers.get('Content-Security-Policy'), /frame-ancestors 'none'/);
    assert.deepEqual(log.mock.calls.at(-1).arguments, [
      'request_failed',
      { stage: 'handler', errorType }
    ]);
  }
  assert.equal(log.mock.callCount(), cases.length);
});

test('routing failures are distinguishable without logging a malformed URL', async (t) => {
  const log = t.mock.method(console, 'error', () => {});
  const response = await worker.fetch({ url: privateText }, {}, {});
  assert.equal(response.status, 500);
  assert.equal(response.headers.get('X-Robots-Tag'), 'noindex, nofollow');
  assert.deepEqual(log.mock.calls[0].arguments, [
    'request_failed',
    { stage: 'routing', errorType: 'TypeError' }
  ]);
});

test('normal and trailing-slash requests retain headers and do not emit failure diagnostics', async (t) => {
  const log = t.mock.method(console, 'error', () => {});
  const handle = t.mock.fn(() => new Response('ok'));
  setHandle(handle);
  const response = await worker.fetch(new Request('https://example.invalid/'), {}, {});
  assert.equal(response.status, 200);
  assert.equal(await response.text(), 'ok');
  assert.equal(response.headers.get('X-Robots-Tag'), 'noindex, nofollow');
  const redirect = await worker.fetch(new Request('https://example.invalid/kontakt/'), {}, {});
  assert.equal(redirect.status, 308);
  assert.equal(redirect.headers.get('Location'), 'https://example.invalid/kontakt');
  assert.equal(redirect.headers.get('X-Robots-Tag'), 'noindex, nofollow');
  assert.equal(handle.mock.callCount(), 1);
  assert.equal(log.mock.callCount(), 0);
});
