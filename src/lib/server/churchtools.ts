export interface EventItem {
  id: string;
  kind: 'service';
  title: string;
  start: string;
  end: string;
  allDay: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  body?: string;
  publishedAt: string;
  expiresAt?: string;
  updatedAt?: string;
}

export interface GroupOffer {
  id: string;
  name: string;
  type: string;
  description?: string;
  meetingTime?: string;
  weekday?: number;
  contactUrl?: string;
  endDate?: string;
}

export interface ContentResult<T> {
  status: 'ready' | 'empty' | 'stale' | 'unavailable' | 'disabled';
  items: T[];
  updatedAt?: string;
}

type Options = {
  token?: string;
  cache?: Cache;
  /** Test seams; production callers use native fetch and the system clock. */
  fetch?: typeof fetch;
  now?: () => number;
};
type ObjectData = Record<string, unknown>;
type Project<T> = (value: unknown, now: number) => T | undefined;

const API = 'https://akg-kiel.church.tools/api';
const FRESH_MS = 30 * 60_000;
const MAX_AGE_MS = 6 * 60 * 60_000;
const MAX_BYTES = 1024 * 1024;
const MAX_ITEMS = 1000;
const PAGE_SIZE = 100;
const MAX_PAGES = 10;
const INVALID_SOURCE = new Error('Invalid public source');
const localDay = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Berlin' });

function object(value: unknown): ObjectData {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    ? (value as ObjectData)
    : {};
}

function numericId(value: unknown): string | undefined {
  if (typeof value === 'number' && Number.isSafeInteger(value) && value > 0) return String(value);
  if (typeof value === 'string' && /^[1-9]\d{0,14}$/.test(value)) return value;
  return undefined;
}

function postId(value: unknown): value is string {
  return typeof value === 'string' && /^[A-Za-z0-9][A-Za-z0-9_-]{0,127}$/.test(value);
}

function text(value: unknown, max: number): value is string {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= max;
}

function timestamp(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const match =
    /^(\d{4}-\d{2}-\d{2})T([01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d{1,3})?(?:Z|[+-](?:[01]\d|2[0-3]):[0-5]\d)$/.exec(
      value
    );
  if (!match || !Number.isFinite(Date.parse(value))) return undefined;
  const day = new Date(`${match[1]}T00:00:00Z`);
  if (!Number.isFinite(day.getTime()) || day.toISOString().slice(0, 10) !== match[1])
    return undefined;
  return new Date(value).toISOString();
}

function serviceWindow(now: number) {
  const from = localDay.format(now);
  const until = new Date(`${from}T00:00:00Z`);
  const month = until.getUTCMonth();
  until.setUTCFullYear(until.getUTCFullYear() + 1);
  if (until.getUTCMonth() !== month) until.setUTCDate(0);
  return { from, to: until.toISOString().slice(0, 10) };
}

function publicEvent(value: unknown, now: number): EventItem | undefined {
  const item = object(value);
  const start = timestamp(item.start);
  const end = timestamp(item.end);
  const { from, to } = serviceWindow(now);
  if (
    typeof item.id !== 'string' ||
    !/^2:[1-9]\d{0,14}:/.test(item.id) ||
    item.kind !== 'service' ||
    !text(item.title, 255) ||
    !start ||
    !end ||
    item.id.split(':').slice(2).join(':') !== start ||
    typeof item.allDay !== 'boolean' ||
    end < start ||
    Date.parse(end) < now ||
    localDay.format(Date.parse(start)) < from ||
    localDay.format(Date.parse(start)) >= to
  )
    return undefined;
  return { id: item.id, kind: 'service', title: item.title, start, end, allDay: item.allDay };
}

function publicNews(value: unknown, now: number): NewsItem | undefined {
  const item = object(value);
  const publishedAt = timestamp(item.publishedAt);
  const expiresAt = item.expiresAt === undefined ? undefined : timestamp(item.expiresAt);
  const updatedAt = item.updatedAt === undefined ? undefined : timestamp(item.updatedAt);
  if (
    !postId(item.id) ||
    !text(item.title, 1000) ||
    !publishedAt ||
    Date.parse(publishedAt) > now ||
    (item.expiresAt !== undefined && (!expiresAt || Date.parse(expiresAt) <= now)) ||
    (item.updatedAt !== undefined && !updatedAt) ||
    (item.body !== undefined && (typeof item.body !== 'string' || item.body.length > 100_000))
  )
    return undefined;
  return {
    id: item.id,
    title: item.title,
    publishedAt,
    ...(typeof item.body === 'string' && item.body.trim() ? { body: item.body } : {}),
    ...(expiresAt ? { expiresAt } : {}),
    ...(updatedAt ? { updatedAt } : {})
  };
}

function mapService(value: unknown, now: number): EventItem | undefined {
  const appointment = object(object(value).appointment);
  const base = object(appointment.base);
  const calendar = object(base.calendar);
  const calculated = object(appointment.calculated);
  const id = numericId(base.id);
  const start = timestamp(calculated.startDate);
  if (
    numericId(calendar.id) !== '2' ||
    calendar.isPublic !== true ||
    base.isInternal !== false ||
    !id ||
    !start
  )
    return undefined;
  return publicEvent(
    {
      id: `2:${id}:${start}`,
      kind: 'service',
      title: base.title,
      start,
      end: calculated.endDate,
      allDay: base.allDay
    },
    now
  );
}

function mapNews(value: unknown, groups: Set<string>, now: number): NewsItem | undefined {
  const post = object(value);
  const group = object(post.group);
  const groupId = numericId(group.domainIdentifier);
  const scheduled = post.publicationDate == null ? undefined : timestamp(post.publicationDate);
  if (
    !groupId ||
    !groups.has(groupId) ||
    group.domainType !== 'group' ||
    post.groupVisibility !== 'public' ||
    post.visibility !== 'group_visible' ||
    post.isBanned !== false ||
    !('expirationDate' in post) ||
    (post.expirationDate !== null && !timestamp(post.expirationDate)) ||
    (post.publicationDate != null && (!scheduled || Date.parse(scheduled) > now)) ||
    (post.content != null && typeof post.content !== 'string')
  )
    return undefined;
  return publicNews(
    {
      id: post.guid,
      title: post.title,
      body: post.content ?? undefined,
      publishedAt: post.publishedDate,
      expiresAt: post.expirationDate ?? undefined,
      updatedAt: post.lastEditedDate ?? undefined
    },
    now
  );
}

async function readJson(response: Response, maxBytes = MAX_BYTES): Promise<unknown> {
  const length = response.headers.get('content-length');
  if ((length !== null && (!/^\d+$/.test(length) || Number(length) > maxBytes)) || !response.body) {
    await response.body?.cancel();
    throw INVALID_SOURCE;
  }
  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8', { fatal: true });
  let size = 0;
  let body = '';
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) throw INVALID_SOURCE;
      try {
        body += decoder.decode(value, { stream: true });
      } catch {
        throw INVALID_SOURCE;
      }
    }
    try {
      return JSON.parse(body + decoder.decode());
    } catch {
      throw INVALID_SOURCE;
    }
  } finally {
    await reader.cancel().catch(() => {});
    reader.releaseLock();
  }
}

async function fetchEnvelope(
  path: string,
  options: Options,
  signal: AbortSignal,
  anonymous = false
): Promise<ObjectData> {
  const response = await (options.fetch ?? fetch)(`${API}${path}`, {
    headers: {
      Accept: 'application/json',
      ...(!anonymous ? { Authorization: `Login ${options.token}` } : {})
    },
    // Workers has no redirect:error mode. Inspect responses without following them.
    redirect: 'manual',
    signal,
    cache: 'no-store',
    credentials: 'omit'
  });
  if (response.status !== 200 || response.redirected) {
    await response.body?.cancel();
    if (response.status >= 400 && response.status < 500 && response.status !== 429)
      throw INVALID_SOURCE;
    throw new Error('Public source unavailable');
  }
  if (!/^application\/json(?:\s*;|$)/i.test(response.headers.get('content-type') ?? '')) {
    await response.body?.cancel();
    throw INVALID_SOURCE;
  }
  const envelope = object(await readJson(response));
  if (
    !Array.isArray(envelope.data) ||
    envelope.data.length > MAX_ITEMS ||
    object(envelope.meta).count !== envelope.data.length
  )
    throw INVALID_SOURCE;
  return envelope;
}

async function fetchRows(path: string, options: Options, signal: AbortSignal, anonymous = false) {
  return (await fetchEnvelope(path, options, signal, anonymous)).data as unknown[];
}

async function whitelist(
  options: Options,
  signal: AbortSignal,
  domainType: string
): Promise<Set<string>> {
  // No domainData include: avoid retrieving staff names or other unused resource fields.
  const rows = await fetchRows('/website/data', options, signal);
  const ids = new Set<string>();
  for (const row of rows) {
    const item = object(row);
    if (typeof item.domainType !== 'string' || !numericId(item.domainId)) throw INVALID_SOURCE;
    if (item.domainType === domainType) ids.add(numericId(item.domainId)!);
  }
  return ids;
}

function projectItems<T extends { id: string }>(
  rows: unknown[],
  project: Project<T>,
  now: number
): T[] {
  const items = new Map<string, T>();
  let discarded = 0;
  for (const row of rows) {
    const item = project(row, now);
    if (item) items.set(item.id, item);
    else discarded++;
  }
  // Counts only: never log source rows, IDs, tokens, titles, or exception messages.
  if (discarded) console.warn(`ChurchTools: ${discarded} records excluded by public mapping.`);
  return [...items.values()];
}

async function content<T extends { id: string }>(
  kind: 'services' | 'news' | 'groups',
  options: Options,
  project: Project<T>,
  load: (signal: AbortSignal, now: number) => Promise<T[]>
): Promise<ContentResult<T>> {
  if (!options.token?.trim()) return { status: 'unavailable', items: [] };
  const now = options.now ?? Date.now;
  const key = new Request(`https://akg-kiel.church.tools/__web-akg-cache/v1/${kind}`);
  let cached: { items: unknown[]; updatedAt: string } | undefined;
  try {
    const response = await options.cache?.match(key);
    if (response) {
      const value = object(await readJson(response, MAX_BYTES * MAX_PAGES));
      const updatedAt = timestamp(value.updatedAt);
      if (Array.isArray(value.items) && value.items.length <= MAX_ITEMS && updatedAt) {
        const age = now() - Date.parse(updatedAt);
        if (age >= 0 && age <= MAX_AGE_MS) cached = { items: value.items, updatedAt };
      }
    }
  } catch {
    /* Cache failure must not prevent a live source read. */
  }

  function result(items: unknown[], updatedAt: string, stale = false): ContentResult<T> {
    const current = now();
    const visible = items.flatMap((item) => {
      const mapped = project(item, current);
      return mapped ? [mapped] : [];
    });
    return {
      status: stale ? 'stale' : visible.length ? 'ready' : 'empty',
      items: visible,
      updatedAt
    };
  }
  if (cached && now() - Date.parse(cached.updatedAt) < FRESH_MS)
    return result(cached.items, cached.updatedAt);
  try {
    const started = now();
    const items = await load(AbortSignal.timeout(10_000), started);
    // Age starts before fetch: slow reads must never extend the stale lifetime.
    const updatedAt = new Date(started).toISOString();
    try {
      await options.cache?.put(
        key,
        new Response(JSON.stringify({ items, updatedAt }), {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': `public, max-age=${MAX_AGE_MS / 1000}`
          }
        })
      );
    } catch {
      /* The public response remains usable without cache persistence. */
    }
    return result(items, updatedAt);
  } catch (error) {
    if (error === INVALID_SOURCE || kind === 'groups') {
      try {
        await options.cache?.delete(key);
      } catch {
        /* Cache may be unavailable. */
      }
    }
    // Group visibility has no independent grant snapshot; an expired cache fails closed.
    if (
      kind !== 'groups' &&
      error !== INVALID_SOURCE &&
      cached &&
      now() - Date.parse(cached.updatedAt) <= MAX_AGE_MS
    )
      return result(cached.items, cached.updatedAt, true);
    return { status: 'unavailable', items: [] };
  }
}

function httpsUrl(value: unknown): string | undefined {
  if (typeof value !== 'string' || value.length > 2048) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password ? url.href : undefined;
  } catch {
    return undefined;
  }
}

function publicGroup(value: unknown, now: number): GroupOffer | undefined {
  const item = object(value);
  if (!postId(item.id) || !text(item.name, 255) || !text(item.type, 255)) return undefined;
  if (
    item.endDate !== undefined &&
    (typeof item.endDate !== 'string' ||
      !/^\d{4}-\d{2}-\d{2}$/.test(item.endDate) ||
      !timestamp(`${item.endDate}T00:00:00Z`) ||
      item.endDate < localDay.format(now))
  )
    return undefined;
  const contactUrl = httpsUrl(item.contactUrl);
  return {
    id: item.id,
    name: item.name,
    type: item.type,
    ...(text(item.description, 10000) ? { description: item.description } : {}),
    ...(text(item.meetingTime, 100) ? { meetingTime: item.meetingTime } : {}),
    ...(typeof item.weekday === 'number' &&
    Number.isInteger(item.weekday) &&
    item.weekday >= 0 &&
    item.weekday <= 6
      ? { weekday: item.weekday }
      : {}),
    ...(contactUrl ? { contactUrl } : {}),
    ...(typeof item.endDate === 'string' ? { endDate: item.endDate } : {})
  };
}

export async function getGroups(
  options: Options & { groupsApproved?: boolean }
): Promise<ContentResult<GroupOffer>> {
  if (options.groupsApproved !== true) return { status: 'disabled', items: [] };
  return content('groups', options, publicGroup, async (signal, now) => {
    const types = new Map<string, string>();
    for (const row of await fetchRows('/group/grouptypes', options, signal)) {
      const type = object(row);
      const id = numericId(type.id);
      if (id && ['1', '2', '3', '5'].includes(id) && text(type.name, 255)) types.set(id, type.name);
    }
    if (!types.size) throw INVALID_SOURCE;
    const items: GroupOffer[] = [];
    const seen = new Set<string>();
    const guids = new Set<string>();
    let total: number | undefined;
    for (let page = 1; page <= MAX_PAGES; page++) {
      const query = new URLSearchParams({
        visibility: 'public',
        limit: String(PAGE_SIZE),
        page: String(page)
      });
      // Anonymous reads prove public visibility independently of the token's permissions.
      let envelope: ObjectData;
      try {
        envelope = await fetchEnvelope(`/groups?${query}`, options, signal, true);
      } catch {
        // A partially refreshed public list must not revive removed/private groups from cache.
        throw INVALID_SOURCE;
      }
      const rows = envelope.data as unknown[];
      const pagination = object(object(envelope.meta).pagination);
      if (
        typeof pagination.total !== 'number' ||
        !Number.isSafeInteger(pagination.total) ||
        pagination.total < 0 ||
        pagination.total > MAX_ITEMS ||
        pagination.current !== page ||
        pagination.limit !== PAGE_SIZE ||
        pagination.lastPage !== Math.max(1, Math.ceil(pagination.total / PAGE_SIZE)) ||
        (total !== undefined && total !== pagination.total) ||
        rows.length !== Math.min(PAGE_SIZE, Math.max(0, pagination.total - (page - 1) * PAGE_SIZE))
      )
        throw INVALID_SOURCE;
      total = pagination.total;
      for (const row of rows) {
        const id = numericId(object(row).id);
        if (!id || seen.has(id)) throw INVALID_SOURCE;
        seen.add(id);
        const guid = object(row).guid;
        if (postId(guid)) {
          if (guids.has(guid)) throw INVALID_SOURCE;
          guids.add(guid);
        }
      }
      items.push(
        ...projectItems(
          rows,
          (row, current) => {
            const group = object(row);
            const info = object(group.information);
            const settings = object(group.settings);
            const type = types.get(numericId(info.groupTypeId) ?? '');
            if (
              !type ||
              settings.visibility !== 'public' ||
              settings.isHidden !== false ||
              numericId(info.groupStatusId) !== '1'
            )
              return undefined;
            return publicGroup(
              {
                id: group.guid,
                name: group.name,
                type,
                description: info.note,
                meetingTime: info.meetingTime,
                weekday: info.weekday,
                contactUrl: info.groupHomepageUrl,
                endDate: info.endDate ?? undefined
              },
              current
            );
          },
          now
        )
      );
      if (page === pagination.lastPage) {
        return items.sort((a, b) => a.name.localeCompare(b.name, 'de'));
      }
    }
    throw INVALID_SOURCE;
  });
}

export async function getServices(
  options: Options & { servicesApproved?: boolean }
): Promise<ContentResult<EventItem>> {
  if (options.servicesApproved !== true) return { status: 'disabled', items: [] };
  return content('services', options, publicEvent, async (signal, now) => {
    const calendars = await whitelist(options, signal, 'calendar');
    if (!calendars.has('2')) return [];
    const query = new URLSearchParams(serviceWindow(now));
    // isPublic is a legacy category flag, not a permission check. An anonymous
    // request also proves public access; a token must not grant extra calendar data.
    const rows = await fetchRows(`/calendars/2/appointments?${query}`, options, signal, true);
    return projectItems(rows, mapService, now).sort((a, b) => a.start.localeCompare(b.start));
  });
}

export async function getNews(options: Options): Promise<ContentResult<NewsItem>> {
  return content('news', options, publicNews, async (signal, now) => {
    const groups = await whitelist(options, signal, 'posts-in-group');
    if (!groups.size) return [];
    const query = new URLSearchParams({
      group_visibility: 'public',
      post_visibility: 'group_visible',
      limit: String(PAGE_SIZE)
    });
    for (const group of groups) query.append('group_ids[]', group);
    const items: NewsItem[] = [];
    let previousCursor = '';
    for (let page = 0; page < MAX_PAGES; page++) {
      let rows: unknown[];
      try {
        rows = await fetchRows(`/posts?${query}`, options, signal);
      } catch {
        // ponytail: cache holds no per-post group provenance. After refreshed grants,
        // fail closed; retain stale feeds only when the grant lookup itself fails.
        throw INVALID_SOURCE;
      }
      if (rows.length > PAGE_SIZE) throw INVALID_SOURCE;
      items.push(...projectItems(rows, (row, current) => mapNews(row, groups, current), now));
      if (rows.length < PAGE_SIZE)
        return [...new Map(items.map((item) => [item.id, item])).values()].sort((a, b) =>
          b.publishedAt.localeCompare(a.publishedAt)
        );
      const last = object(rows.at(-1));
      const before = timestamp(last.publishedDate);
      if (!before || !postId(last.guid)) throw INVALID_SOURCE;
      const cursor = `${before}/${last.guid}`;
      if (previousCursor && cursor >= previousCursor) throw INVALID_SOURCE;
      previousCursor = cursor;
      query.set('before', before);
      query.set('last_post_identifier', last.guid);
    }
    // Never publish a silently truncated feed or cache a partial refresh.
    throw INVALID_SOURCE;
  });
}
