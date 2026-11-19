import type { ContentResult } from '../../lib/server/churchtools';
import { sourceIdFromPath } from '../../lib/site';

export function resolveEntry<T extends { id: string }>(
  source: ContentResult<T>,
  pathname: string,
  response: { status?: number; headers: Headers }
) {
  const id = sourceIdFromPath(pathname);
  const item = source.items.find((entry) => entry.id === id);

  // A closed or unavailable source (or an incomplete stale snapshot) cannot
  // establish that an entry has gone away.
  const unavailable =
    source.status === 'disabled' ||
    source.status === 'unavailable' ||
    (source.status === 'stale' && !item);
  response.headers.set('Cache-Control', 'no-store');
  response.status = unavailable ? 503 : item ? 200 : 404;
  if (unavailable) response.headers.set('Retry-After', '1800');
  return { item: unavailable ? undefined : item, unavailable };
}
