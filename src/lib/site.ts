export const siteName = 'Apostel-Kirchengemeinde Kiel';
export const siteOrigin = 'https://akg-kiel.de';

export const navigation = [
  { href: '/gottesdienste', label: 'Gottesdienste' },
  { href: '/aktuelles', label: 'Aktuelles' },
  { href: '/angebote', label: 'Angebote' },
  { href: '/gemeinde', label: 'Gemeinde' },
  { href: '/kontakt', label: 'Kontakt' }
] as const;

export const places = [
  { href: '/petruskirche', label: 'Petruskirche' },
  { href: '/gemeindehaus-mitte', label: 'Gemeindehaus Mitte' },
  { href: '/gemeindehaus-wik', label: 'Gemeindehaus Wik' }
] as const;

// Inventory targets checked on 2026-10-26; no external resources are loaded by these links.
export const externalLinks = [
  { href: 'https://cafe-dreimaster.de/', label: 'Café Dreimaster' },
  {
    href: 'https://www.youtube.com/channel/UCXlzBLKlUkgAXdd-gPjKZRw',
    label: 'YouTube-Kanal'
  },
  { href: 'https://akg-kiel.church.tools/?q=login#/', label: 'Intern (ChurchTools)' }
] as const;

export function currentPage(pathname: string, href: string) {
  if (pathname === href) return 'page' as const;
  if (pathname.startsWith(href + '/')) return 'location' as const;
  return undefined;
}

export function detailPath(section: 'gottesdienste' | 'aktuelles', id: string) {
  return `/${section}/${encodeURIComponent(id)}`;
}

export function sourceIdFromPath(pathname: string) {
  try {
    return decodeURIComponent(pathname.replace(/\/+$/, '').split('/').at(-1) ?? '');
  } catch {
    return '';
  }
}

const dateFormat = new Intl.DateTimeFormat('de-DE', {
  timeZone: 'Europe/Berlin',
  dateStyle: 'full'
});
const timeFormat = new Intl.DateTimeFormat('de-DE', {
  timeZone: 'Europe/Berlin',
  timeStyle: 'short'
});

export function formatDate(value: string) {
  const date = new Date(value);
  return Number.isFinite(date.getTime()) ? dateFormat.format(date) : 'Datum nicht verfügbar';
}

export function formatUpdated(value: string) {
  const date = new Date(value);
  return Number.isFinite(date.getTime())
    ? `${dateFormat.format(date)}, ${timeFormat.format(date)} Uhr`
    : 'Zeitpunkt nicht verfügbar';
}

export function formatServiceTime(event: { start: string; end: string; allDay: boolean }) {
  const start = new Date(event.start);
  const end = new Date(event.end);
  if (
    !Number.isFinite(start.getTime()) ||
    !Number.isFinite(end.getTime()) ||
    end < start ||
    (event.allDay && end.getTime() === start.getTime())
  ) {
    return 'Zeitangabe derzeit nicht verfügbar';
  }

  if (event.allDay) {
    // All-day ends are exclusive. Date-only values are calendar dates, not UTC instants.
    const lastDay = /^\d{4}-\d{2}-\d{2}$/.test(event.end)
      ? new Date(end.getTime() - 86_400_000)
      : new Date(end.getTime() - 1);
    const first = dateFormat.format(start);
    const last = dateFormat.format(lastDay);
    return `${first}${first === last ? '' : ` bis ${last}`} · ganztägig`;
  }

  const first = dateFormat.format(start);
  const last = dateFormat.format(end);
  return first === last
    ? `${first} · ${timeFormat.format(start)}–${timeFormat.format(end)} Uhr`
    : `${first}, ${timeFormat.format(start)} Uhr bis ${last}, ${timeFormat.format(end)} Uhr`;
}
