import { env } from 'cloudflare:workers';
import { getGroups, getNews, getServices } from './server/churchtools';

// Called only from SSR frontmatter; credentials never become component props.
function options() {
  const bindings = env as {
    CHURCHTOOLS_TOKEN?: string;
    SERVICES_APPROVED?: string;
    GROUPS_APPROVED?: string;
  };
  return {
    token: bindings.CHURCHTOOLS_TOKEN,
    servicesApproved: bindings.SERVICES_APPROVED === 'true',
    groupsApproved: bindings.GROUPS_APPROVED === 'true',
    cache:
      typeof caches !== 'undefined' && 'default' in caches ? (caches.default as Cache) : undefined
  };
}

export function loadServices() {
  return getServices(options());
}

export function loadGroups() {
  return getGroups(options());
}

export function loadNews() {
  const { token, cache } = options();
  return getNews({ token, cache });
}
