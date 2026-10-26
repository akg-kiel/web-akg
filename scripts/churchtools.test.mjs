import assert from 'node:assert/strict';
import test from 'node:test';
import { getServices, getNews } from '../src/lib/server/churchtools.ts';

// Entirely synthetic; never recorded API responses or production identifiers.
const NOW = Date.parse('2026-10-26T10:00:00Z');
const TOKEN = 'synthetic-test-only';
const allowlist = [
  { domainType: 'calendar', domainId: 2 },
  { domainType: 'posts-in-group', domainId: 101 }
];
const post = (extra = {}) => ({
  guid: 'synthetic-post-1',
  title: 'Synthetic notice',
  content: 'Plain text',
  group: { domainIdentifier: '101', domainType: 'group' },
  groupVisibility: 'public',
  visibility: 'group_visible',
  isBanned: false,
  publishedDate: '2026-10-25T10:00:00Z',
  expirationDate: null,
  publicationDate: null,
  lastEditedDate: null,
  ...extra
});
const appointment = (base = {}, calculated = {}) => ({
  appointment: {
    base: {
      id: 901,
      title: 'Synthetic service',
      allDay: false,
      isInternal: false,
      calendar: { id: 2, isPublic: true },
      startDate: '2001-01-01T10:00:00Z',
      description: 'NOT_PUBLIC',
      address: { street: 'NOT_PUBLIC' },
      meta: { createdPerson: { id: 'NOT_PUBLIC' } },
      ...base
    },
    calculated: {
      startDate: '2026-10-27T10:00:00Z',
      endDate: '2026-10-27T11:00:00Z',
      ...calculated
    }
  }
});
const json = (value) =>
  new Response(JSON.stringify(value), { headers: { 'Content-Type': 'application/json' } });
const rows = (data) => json({ data, meta: { count: data.length } });
function source({ grants = allowlist, posts = [], appointments = [] } = {}) {
  const calls = [];
  const fetch = async (url, init) => {
    const parsed = new URL(url);
    assert.equal(parsed.origin, 'https://akg-kiel.church.tools');
    assert.equal(init.redirect, 'error');
    assert.equal(init.credentials, 'omit');
    assert.equal(init.cache, 'no-store');
    assert.ok(init.signal instanceof AbortSignal);
    assert.equal(init.signal.aborted, false);
    calls.push({ url: parsed, init });
    if (parsed.pathname === '/api/website/data') {
      assert.equal(init.headers.Authorization, `Login ${TOKEN}`);
      assert.equal(parsed.search, '');
      return rows(grants);
    }
    if (parsed.pathname === '/api/posts') return rows(posts);
    if (parsed.pathname === '/api/calendars/2/appointments') {
      assert.equal(init.headers.Authorization, undefined); // Public-access proof, not token permissions.
      return rows(appointments);
    }
    assert.fail(`Unexpected endpoint: ${parsed.pathname}`);
  };
  return { fetch, calls };
}
function memoryCache() {
  const entries = new Map();
  return {
    entries,
    async match(request) {
      return entries.get(request.url)?.clone();
    },
    async put(request, response) {
      entries.set(request.url, response.clone());
    },
    async delete(request) {
      return entries.delete(request.url);
    }
  };
}
const options = (extra) => ({ token: TOKEN, now: () => NOW, ...extra });

test('missing token and explicit approval gate do not touch fetch or cache', async () => {
  const fail = () => assert.fail('No I/O permitted');
  const deps = { fetch: fail, cache: { match: fail, put: fail } };
  assert.deepEqual(await getNews(deps), { status: 'unavailable', items: [] });
  assert.deepEqual(await getServices({ ...deps, servicesApproved: true }), {
    status: 'unavailable',
    items: []
  });
  for (const servicesApproved of [undefined, false, 'true']) {
    assert.deepEqual(await getServices(options({ ...deps, servicesApproved })), {
      status: 'disabled',
      items: []
    });
  }
});

test('successful empty, missing whitelist, transport errors and malformed envelopes differ', async () => {
  assert.equal((await getNews(options(source()))).status, 'empty');
  const noGrants = source({ grants: [] });
  assert.equal((await getNews(options(noGrants))).status, 'empty');
  assert.equal(noGrants.calls.length, 1);
  const noServices = source({ grants: [{ domainType: 'calendar', domainId: 1 }] });
  assert.equal(
    (await getServices(options({ ...noServices, servicesApproved: true }))).status,
    'empty'
  );
  assert.equal(noServices.calls.length, 1);
  for (const fetch of [
    async () => {
      throw new Error('RAW_ERROR_MUST_NOT_ESCAPE');
    },
    async () => new Response('RAW_ERROR_MUST_NOT_ESCAPE', { status: 503 }),
    async () => json({ data: [] }),
    async () => json({ data: [], meta: { count: 1 } }),
    async () => json({ data: {}, meta: { count: 0 } }),
    async () => new Response('{', { headers: { 'Content-Type': 'application/json' } }),
    async () => rows([{ domainType: 'posts-in-group', domainId: '../persons' }])
  ])
    assert.deepEqual(await getNews(options({ fetch })), { status: 'unavailable', items: [] });
});

test('only calendar 2 public calculated occurrences and six fields are mapped', async () => {
  const mock = source({
    appointments: [
      appointment(),
      appointment({}, { startDate: '2026-11-03T10:00:00Z', endDate: '2026-11-03T11:00:00Z' }),
      appointment({ isInternal: true }),
      appointment({ isInternal: undefined }),
      ...[1, 3, 4].map((id) => appointment({ calendar: { id, isPublic: true } })),
      appointment({ calendar: { id: 2, isPublic: false } }),
      appointment({ calendar: { id: 2 } }),
      appointment({ id: '../private' }),
      appointment({ title: '' }),
      appointment({ allDay: 'false' }),
      appointment({}, { endDate: '2026-10-25T10:00:00Z' }),
      appointment({}, { startDate: '2027-10-26T10:00:00Z', endDate: '2027-10-26T11:00:00Z' }),
      appointment({}, { startDate: '2027-02-30T10:00:00Z' }),
      appointment({}, { startDate: '2026-10-27T10:00:00' })
    ]
  });
  const result = await getServices(options({ ...mock, servicesApproved: true }));
  assert.equal(result.status, 'ready');
  assert.equal(result.items.length, 2);
  assert.notEqual(result.items[0].id, result.items[1].id);
  assert.deepEqual(Object.keys(result.items[0]).sort(), [
    'allDay',
    'end',
    'id',
    'kind',
    'start',
    'title'
  ]);
  assert.equal(result.items[0].start, '2026-10-27T10:00:00.000Z');
  assert.equal(JSON.stringify(result).includes('NOT_PUBLIC'), false);
  assert.equal(mock.calls[1].url.searchParams.get('from'), '2026-10-26');
  assert.equal(mock.calls[1].url.searchParams.get('to'), '2027-10-26');
});

test('news use dynamic group grants and exact publication markers, never private metadata', async () => {
  const mock = source({
    posts: [
      post({
        content: '<b>Literal text, never HTML</b>',
        actor: 'NOT_PUBLIC',
        images: ['NOT_PUBLIC']
      }),
      post({ guid: 'synthetic-empty-text', content: null }),
      ...[
        { guid: '../escape' },
        { guid: 'percent%2Fescape' },
        { guid: 'with/slash' },
        { groupVisibility: 'intern' },
        { groupVisibility: undefined },
        { visibility: 'group_intern' },
        { visibility: undefined },
        { isBanned: true },
        { isBanned: undefined },
        { group: { domainIdentifier: '999', domainType: 'group' } },
        { group: { domainIdentifier: '101', domainType: 'person' } },
        { publishedDate: '2026-10-27T10:00:00Z' },
        { publishedDate: null },
        { publicationDate: '2026-10-27T10:00:00Z' },
        { expirationDate: 'invalid' },
        { expirationDate: undefined },
        { expirationDate: '2026-10-26T10:00:00Z' },
        { publishedDate: '2026-02-30T10:00:00Z' },
        { content: {} }
      ].map((extra) => post(extra))
    ]
  });
  const result = await getNews(options(mock));
  assert.equal(result.items.length, 2);
  assert.equal(result.items[0].body, '<b>Literal text, never HTML</b>');
  assert.equal(result.items[1].body, undefined);
  assert.deepEqual(Object.keys(result.items[0]).sort(), ['body', 'id', 'publishedAt', 'title']);
  assert.equal(JSON.stringify(result).includes('NOT_PUBLIC'), false);
  assert.deepEqual(mock.calls[1].url.searchParams.getAll('group_ids[]'), ['101']);
  assert.equal(mock.calls[1].url.searchParams.get('group_visibility'), 'public');
  assert.equal(mock.calls[1].url.searchParams.get('post_visibility'), 'group_visible');
});

test('30-minute fresh cache, <=6-hour stale on error, no expiration leaks or TTL renewal', async () => {
  const cache = memoryCache();
  let now = NOW;
  const mock = source({
    posts: [post({ expirationDate: '2026-10-26T10:10:00Z' }), post({ guid: 'lasting' })]
  });
  const deps = options({ ...mock, cache, now: () => now });
  const initial = await getNews(deps);
  assert.equal(initial.items.length, 2);
  const stored = await [...cache.entries.values()][0].clone().text();
  assert.equal(stored.includes(TOKEN), false);
  assert.equal(stored.includes('groupVisibility'), false);
  assert.equal([...cache.entries.keys()][0].includes(TOKEN), false);
  now += 10 * 60_000;
  assert.deepEqual(
    (await getNews(deps)).items.map((item) => item.id),
    ['lasting']
  );
  assert.equal(mock.calls.length, 2);
  now = NOW + 30 * 60_000;
  const outage = {
    ...deps,
    fetch: async () => {
      throw new Error('Synthetic outage');
    }
  };
  assert.equal((await getNews(outage)).status, 'stale');
  assert.equal((await getNews(outage)).updatedAt, initial.updatedAt);
  now = NOW + 6 * 60 * 60_000;
  assert.equal((await getNews(outage)).status, 'stale');
  now++;
  assert.deepEqual(await getNews(outage), { status: 'unavailable', items: [] });
});

test('successful revocation replaces cache; malformed or unauthorized refresh fails closed', async () => {
  const cache = memoryCache();
  await getNews(options({ ...source({ posts: [post()] }), cache }));
  const later = () => NOW + 30 * 60_000;
  for (const fetch of [
    async () => json({ unexpected: [] }),
    async () => new Response(null, { status: 403 })
  ]) {
    assert.equal((await getNews(options({ cache, now: later, fetch }))).status, 'unavailable');
    assert.equal(cache.entries.size, 0);
  }
  await getNews(options({ ...source({ posts: [post()] }), cache }));
  assert.equal(
    (await getNews(options({ ...source({ grants: [] }), cache, now: later }))).status,
    'empty'
  );
  const result = await getNews(
    options({ cache, now: () => NOW + 31 * 60_000, fetch: () => assert.fail('fresh cache') })
  );
  assert.equal(result.status, 'empty');
});

test('refreshed grants cannot revive revoked posts when the subsequent feed request fails', async () => {
  const cache = memoryCache();
  const initial = source({
    grants: [
      { domainType: 'posts-in-group', domainId: 101 },
      { domainType: 'posts-in-group', domainId: 102 }
    ],
    posts: [
      post(),
      post({ guid: 'other-group', group: { domainIdentifier: '102', domainType: 'group' } })
    ]
  });
  assert.equal((await getNews(options({ ...initial, cache }))).items.length, 2);
  const reduced = source({ grants: [{ domainType: 'posts-in-group', domainId: 102 }] });
  const fetch = async (url, init) =>
    new URL(url).pathname === '/api/posts'
      ? new Response(null, { status: 503 })
      : reduced.fetch(url, init);
  const later = () => NOW + 30 * 60_000;
  assert.deepEqual(await getNews(options({ fetch, cache, now: later })), {
    status: 'unavailable',
    items: []
  });
  assert.equal(cache.entries.size, 0);
  assert.equal(
    (
      await getNews(
        options({
          cache,
          now: later,
          fetch: async () => {
            throw new Error();
          }
        })
      )
    ).status,
    'unavailable'
  );
});

test('a bounded multi-page feed larger than one response can be read from cache', async () => {
  const cache = memoryCache();
  const mock = source();
  let pages = 0;
  const fetch = async (url, init) => {
    if (new URL(url).pathname !== '/api/posts') return mock.fetch(url, init);
    const offset = pages++ * 100;
    return rows(
      Array.from({ length: offset ? 50 : 100 }, (_, i) =>
        post({
          guid: `post-${9999 - offset - i}`,
          content: 'x'.repeat(8000)
        })
      )
    );
  };
  assert.equal((await getNews(options({ fetch, cache }))).items.length, 150);
  assert.ok((await [...cache.entries.values()][0].clone().text()).length > 1024 * 1024);
  const outage = async () => {
    throw new Error('Synthetic outage');
  };
  const fresh = await getNews(options({ cache, fetch: outage, now: () => NOW + 60_000 }));
  assert.equal(fresh.status, 'ready');
  assert.equal(fresh.items.length, 150);
  assert.equal(
    (await getNews(options({ cache, fetch: outage, now: () => NOW + 31 * 60_000 }))).status,
    'stale'
  );
});

test('service end times are filtered on fresh cache hits; disabled gate ignores populated cache', async () => {
  const cache = memoryCache();
  const mock = source({
    appointments: [
      appointment({}, { startDate: '2026-10-26T09:00:00Z', endDate: '2026-10-26T10:05:00Z' })
    ]
  });
  const deps = options({ ...mock, cache, servicesApproved: true });
  assert.equal((await getServices(deps)).items.length, 1);
  assert.equal((await getServices({ ...deps, now: () => NOW + 6 * 60_000 })).status, 'empty');
  assert.equal(mock.calls.length, 2);
  assert.equal((await getServices({ ...deps, servicesApproved: false })).status, 'disabled');
});

test('Cache API failures are isolated and malformed cached data is not returned', async () => {
  const broken = {
    match: async () => {
      throw new Error();
    },
    put: async () => {
      throw new Error();
    }
  };
  assert.equal(
    (await getNews(options({ ...source({ posts: [post()] }), cache: broken }))).status,
    'ready'
  );
  const cache = memoryCache();
  await getNews(options({ ...source({ posts: [post()] }), cache }));
  const key = [...cache.entries.keys()][0];
  cache.entries.set(key, json({ updatedAt: '2099-01-01T00:00:00Z', items: [{ id: '../escape' }] }));
  assert.equal((await getNews(options({ ...source(), cache }))).status, 'empty');
});

test('cursor pagination is bounded and uses only fixed-origin endpoints, never supplied URLs', async () => {
  const mock = source();
  let pages = 0;
  const fetch = async (url, init) => {
    if (new URL(url).pathname !== '/api/posts') return mock.fetch(url, init);
    pages++;
    const query = new URL(url).searchParams;
    assert.equal(query.get('page'), null);
    if (pages === 1)
      return rows(Array.from({ length: 100 }, (_, i) => post({ guid: `post-${String(999 - i)}` })));
    assert.equal(query.get('before'), '2026-10-25T10:00:00.000Z');
    assert.equal(query.get('last_post_identifier'), 'post-900');
    return rows([post({ guid: 'post-899' })]);
  };
  assert.equal((await getNews(options({ fetch }))).items.length, 101);
  assert.equal(pages, 2);
  const repeated = source({
    posts: Array.from({ length: 100 }, (_, i) => post({ guid: `post-${999 - i}` }))
  });
  assert.equal((await getNews(options(repeated))).status, 'unavailable');
  assert.equal(repeated.calls.length, 3);
  pages = 0;
  const endless = async (url, init) => {
    if (new URL(url).pathname !== '/api/posts') return mock.fetch(url, init);
    const offset = pages++ * 100;
    return rows(
      Array.from({ length: 100 }, (_, i) => post({ guid: `post-${String(9999 - offset - i)}` }))
    );
  };
  assert.equal((await getNews(options({ fetch: endless }))).status, 'unavailable');
  assert.equal(pages, 10);
});

test('3xx cross-origin and HTTPS downgrade destinations are never followed', async () => {
  for (const location of ['https://other.invalid/api', 'http://akg-kiel.church.tools/api']) {
    for (const status of [301, 302, 303, 307, 308]) {
      let calls = 0;
      const fetch = async (url, init) => {
        calls++;
        assert.equal(url, 'https://akg-kiel.church.tools/api/website/data');
        assert.equal(init.redirect, 'error');
        assert.equal(init.headers.Authorization, `Login ${TOKEN}`);
        return new Response(null, { status, headers: { Location: location } });
      };
      assert.deepEqual(await getNews(options({ fetch })), { status: 'unavailable', items: [] });
      assert.equal(calls, 1);
    }
  }
});

test('the native abort signal bounds a hanging source request', { timeout: 12_000 }, async () => {
  const keepAlive = setTimeout(() => {}, 11_000);
  try {
    const fetch = async (_url, { signal }) =>
      new Promise((_resolve, reject) => {
        signal.addEventListener('abort', () => reject(signal.reason), { once: true });
      });
    assert.deepEqual(await getNews(options({ fetch })), { status: 'unavailable', items: [] });
  } finally {
    clearTimeout(keepAlive);
  }
});

test('response size, count and media type are bounded before any publication', async () => {
  for (const fetch of [
    async () =>
      new Response('x', {
        headers: { 'Content-Type': 'application/json', 'Content-Length': String(1024 * 1024 + 1) }
      }),
    async () =>
      new Response('x'.repeat(1024 * 1024 + 1), {
        headers: { 'Content-Type': 'application/json' }
      }),
    async () =>
      new Response('<html>not a feed</html>', { headers: { 'Content-Type': 'text/html' } }),
    async () =>
      new Response(new Uint8Array([0xff]), { headers: { 'Content-Type': 'application/json' } }),
    async () => rows(Array.from({ length: 1001 }, () => allowlist[0]))
  ])
    assert.equal((await getNews(options({ fetch }))).status, 'unavailable');
});
