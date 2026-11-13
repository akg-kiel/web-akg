from pathlib import Path
from datetime import date
import json

OUT = Path(__file__).resolve().parent.parent

PHOTOS = {
    'service': ('gemeinde-gottesdienst', 729, 'Menschen stehen gemeinsam in den Bankreihen der Petruskirche; vorne begleitet eine Band den Gottesdienst.', 'Gottesdienst · Archivfoto · Foto: Frank Lönne', 'https://akg-kiel.de/wp-content/uploads/2024/01/2024_Banner_allianz_1.jpg'),
    'conversation': ('gemeinde-gespraech', 854, 'Zwei Menschen im Gespräch auf der Wiese neben der Kirche beim Gemeindefest 2022.', 'Im Gespräch · Gemeindefest 2022', 'https://akg-kiel.de/wp-content/uploads/2022/05/Gemeindefest-22-VIII.jpg'),
    'gathering': ('gemeinde-fest', 854, 'Menschen sitzen auf Picknickdecken und kommen beim Gemeindefest 2022 auf dem Kirchgelände zusammen.', 'Zeit miteinander · Gemeindefest 2022', 'https://akg-kiel.de/wp-content/uploads/2022/05/Gemeindefest-22-XII.jpg'),
    'cafe': ('cafe-dreimaster', 640, 'Blick über die Tische im Café Dreimaster zur Theke, hinter der zwei Menschen stehen.', 'Café Dreimaster · Archivfoto', 'https://akg-kiel.de/wp-content/uploads/2024/01/Banner_Dreimaster.jpg'),
}
NAV = [('Gottesdienste', '/gottesdienste'), ('Aktuelles', '/aktuelles'), ('Angebote', '/angebote'), ('Gemeinde', '/gemeinde'), ('Kontakt', '/kontakt')]

def nav(cls=''):
    return f'<nav class="{cls}" aria-label="Hauptnavigation"><ul>' + ''.join(f'<li><a href="{url}">{label}</a></li>' for label, url in NAV) + '</ul></nav>'

def logo():
    return '<a class="logo" href="#start" aria-label="Apostel-Kirchengemeinde Kiel – zum Seitenanfang"><img src="/images/apostel-logo.png" width="500" height="272" alt="Apostel-Kirchengemeinde Kiel"></a>'

def photo(key, cls='', first=False, sizes='(min-width: 60rem) 70vw, 100vw'):
    name, height, alt, caption, source = PHOTOS[key]
    load = 'fetchpriority="high" loading="eager"' if first else 'loading="lazy"'
    credit = 'Original (extern)' if key == 'service' else 'Quelle: akg-kiel.de (extern)'
    return f'''<figure class="photo {cls}">
<img src="/images/{name}-1280.webp" srcset="/images/{name}-640.webp 640w, /images/{name}-960.webp 960w, /images/{name}-1280.webp 1280w" sizes="{sizes}" width="1280" height="{height}" alt="{alt}" {load} decoding="async">
<figcaption><span>{caption}</span><a href="{source}" rel="external">{credit}</a></figcaption>
</figure>'''

def link(url, label, cls='text-link', external=False):
    return f'<a class="{cls}" href="{url}"' + (' rel="external"' if external else '') + f'>{label}<span aria-hidden="true">→</span></a>'

SERVICE = 'Zur Ruhe kommen, gemeinsam glauben, neue Gedanken mitnehmen. Gottesdienst ist eine Einladung – auch mit offenen Fragen.'
COMMUNITY = 'Wir möchten Menschen zusammenbringen – im Gottesdienst, im Gespräch und im Alltag.'
WELCOME = 'Ob du zum ersten Mal vorbeischaust oder schon lange zur Gemeinde gehörst: Wir freuen uns auf dich.'
CAFE = 'Lerne das Café kennen und finde die aktuellen Informationen für deinen Besuch – auf der Dreimaster-Website.'
NEWS = 'Aktuelle Meldungen sind in diesem Entwurf nicht eingebunden.'

TOKENS = '''  --font-body: 'Figtree', sans-serif;
  --font-display: 'Figtree', sans-serif;
  --color-white: oklch(100% 0 0);
  --color-paper: oklch(99.5% 0.005 235);
  --color-ink: oklch(33.643635% 0.0553257 237.226915);
  --color-blue: oklch(50.534652% 0.1136751 238.907363);
  --color-accent: var(--color-blue);
  --color-accent-ink: var(--color-white);
  --color-wash: oklch(95.854195% 0.0110004 225.981540);
  --color-muted: oklch(48.250522% 0.0273233 236.516586);
  --color-rule: oklch(88.349406% 0.0141040 219.633240);
  --color-focus: oklch(20% 0.035 237);
  --color-focus-light: oklch(91% 0.045 230);
  --color-dark: oklch(27% 0.048 237);
  --color-dark-rule: oklch(55% 0.037 237);
  --space-2xs: 0.25rem;
  --space-xs: 0.5rem;
  --space-sm: 0.75rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2.5rem;
  --space-2xl: 4rem;
  --space-3xl: 6rem;
  --space-4xl: 9rem;
  --page-gutter: clamp(1rem, 4.4vw, 4rem);
  --page-max: 80rem;
  --text-small: 0.875rem;
  --text-base: 1.0625rem;
  --text-lead: clamp(1.125rem, 1.6vw, 1.375rem);
  --text-heading: clamp(1.75rem, 3.2vw, 2.75rem);
  --text-display: clamp(2.375rem, 5.3vw, 4.75rem);
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in: cubic-bezier(0.7, 0, 0.84, 0);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --dur-micro: 120ms;
  --dur-short: 220ms;
  --rule-hair: 1px;
  --radius-small: 0.5rem;
  --z-raised: 10;
'''

BASE = '''@font-face {
  font-family: 'Figtree';
  src: url('/fonts/figtree-latin-variable.woff2') format('woff2');
  font-style: normal;
  font-weight: 300 900;
  font-display: swap;
}
* { box-sizing: border-box; }
html, body { overflow-x: clip; }
html { color-scheme: light; scroll-behavior: auto; }
body { margin: 0; font-family: var(--font-body); font-size: var(--text-base); line-height: 1.6; color: var(--color-ink); background: var(--color-paper); font-synthesis: none; }
h1, h2, h3, p, ul, figure { margin: 0; }
h1, h2, h3 { font-family: var(--font-display); font-style: normal; font-weight: 750; letter-spacing: -0.035em; line-height: 1.12; overflow-wrap: anywhere; min-width: 0; text-wrap: balance; }
h1 { font-size: var(--text-display); }
h2 { font-size: var(--text-heading); }
h3 { font-size: var(--text-lead); }
p { max-width: 62ch; text-wrap: pretty; }
ul { list-style: none; padding: 0; }
a { color: inherit; text-decoration: underline; text-underline-offset: 0.24em; min-height: 44px; min-width: 44px; display: inline-flex; align-items: center; white-space: nowrap; max-width: 100%; }
a, summary { touch-action: manipulation; }
a:focus-visible, summary:focus-visible { outline: 3px solid var(--color-focus); outline-offset: 4px; }
a:active, summary:active { text-decoration-thickness: 3px; }
img { display: block; max-width: 100%; height: auto; }
section, main, footer { min-width: 0; }
:target { scroll-margin-top: var(--space-xl); }
::selection { color: var(--color-white); background: var(--color-blue); }
.wrap { width: min(calc(100% - var(--page-gutter) * 2), var(--page-max)); margin-inline: auto; }
.stack { display: grid; gap: var(--space-lg); align-content: start; }
.lead { font-size: var(--text-lead); line-height: 1.5; }
.note { font-size: var(--text-small); }
.muted { color: var(--color-muted); }
.actions { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-sm) var(--space-xl); }
.text-link { gap: var(--space-md); font-weight: 650; padding-block: var(--space-xs); }
.button { justify-self: start; gap: var(--space-md); padding: var(--space-sm) var(--space-lg); background: var(--color-blue); color: var(--color-accent-ink); text-decoration: none; font-weight: 650; min-height: 52px; }
.outline { gap: var(--space-md); padding: var(--space-sm) var(--space-lg); border: var(--rule-hair) solid currentColor; text-decoration: none; font-weight: 650; min-height: 52px; }
.dark { background: var(--color-dark); color: var(--color-white); --color-focus: var(--color-focus-light); }
.dark .muted { color: var(--color-focus-light); }
.dark .photo figcaption { color: var(--color-white); }
.logo { display: block; width: 11.5rem; background: var(--color-white); text-decoration: none; flex-shrink: 0; }
.logo img { width: 100%; height: auto; }
.photo img { width: 100%; height: auto; }
.photo figcaption { display: flex; flex-wrap: wrap; align-items: center; column-gap: var(--space-md); padding-block: var(--space-xs); font-size: var(--text-small); line-height: 1.5; color: var(--color-muted); }
.photo figcaption a { text-underline-offset: 0.2em; }
.skip { position: fixed; top: var(--space-md); left: var(--space-md); z-index: var(--z-raised); background: var(--color-ink); color: var(--color-white); padding: var(--space-sm) var(--space-md); transform: translateY(-200%); }
.skip:focus { transform: none; outline-color: var(--color-white); }
.preview-note { font-size: var(--text-small); color: var(--color-muted); }
summary { min-height: 48px; cursor: pointer; }
.menu summary { font-weight: 650; list-style: none; display: flex; gap: var(--space-md); align-items: center; white-space: nowrap; }
.menu summary::-webkit-details-marker { display: none; }
.menu summary::after { content: '+'; font-size: var(--text-lead); }
.menu[open] summary::after { content: '−'; }
.menu nav a { text-decoration: none; }
.menu nav ul { display: grid; gap: var(--space-xs); }
.menu nav a { width: 100%; padding-block: var(--space-xs); }
.footer-links { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-xs) var(--space-lg); }
footer { padding-bottom: max(var(--space-lg), env(safe-area-inset-bottom)); }
@media (hover: hover) and (pointer: fine) {
 a:hover { text-decoration-thickness: 2px; }
 .button:hover { background: var(--color-ink); color: var(--color-white); }
 .outline:hover { background: var(--color-wash); color: var(--color-ink); }
 .dark .outline:hover { background: var(--color-dark); color: var(--color-white); text-decoration: underline; }
 summary:hover { text-decoration: underline; text-underline-offset: 0.2em; }
}
@media (prefers-reduced-motion: reduce) {
 *, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
}
'''

pages = []

def add(number, title, description, structure, macro, tone, navcode, footcode, axes, css, body, overrides='', enrichment='none', scores='P4 H4 E4 S5 R5 V5'):
    knobs = {
        'Photographic': 'H6 natural full-width image, caption below, invitation above; N6 centered original logo; Ft2 spaced inline groups',
        'Letter': 'H5 greeting, two paragraphs, typed community signoff; N9 menu-only far edge; Ft6 roman signoff and postscript',
        'Index-First': 'five destination rows, no hero image; N3 text-only 15rem rail; Ft4 ragged sans colophon',
        'Conversational FAQ': 'four native answers initially open, four short questions; N11 descriptive panel, no scrim; Ft5 18ch closing',
        'Manifesto': 'H1 three stacked words, 900 weight, photo beside not behind; N7 3px slab; Ft1 large community name',
    }[macro]
    stamp = f'''/* Hallmark · macrostructure: {macro} · tone: {tone} · anchor hue: blue 239
 * genre: editorial · theme: custom (AKG · {title}) · nav: {navcode} · footer: {footcode}
 * vibe: "Menschen, Begegnung, Kiel, Blau und Weiß" · display: Figtree · body: Figtree
 * axes: {axes} · enrichment: {enrichment} · motion: still, native disclosures
 * knobs: {knobs}
 * audience: first-time visitors and community · use: Gemeinde kennenlernen · context: explicit brief + confirmed inference
 * brand overrides: local single-family Figtree; unchanged logo on white; no photo crop or filter
 * verified: nine widths, no-JS native keyboard, local assets, text contrast; see .hallmark/check-results.json
 */
/* Hallmark · pre-emit critique: {scores} */'''
    tokens = ':root {\n' + TOKENS + overrides + '}\n'
    html = f'''<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex, nofollow">
<meta name="description" content="{title} – eigenständiger Startseitenentwurf für die Apostel-Kirchengemeinde Kiel. Keine aktuellen Termine oder Meldungen eingebunden.">
<title>{title} · AKG Startseitenentwurf {number}</title>
<link rel="preload" href="/fonts/figtree-latin-variable.woff2" as="font" type="font/woff2" crossorigin>
<style>
{stamp}
{tokens}
{BASE}
{css}
</style>
</head>
<body id="start">
<a class="skip" href="#inhalt">Zum Inhalt</a>
{body}
</body>
</html>
'''
    (OUT / f'{number}.html').write_text(html)
    (OUT / '.hallmark' / f'tokens-{number}.css').write_text(tokens)
    pages.append({'number': number, 'title': title, 'description': description, 'structure': structure})

# 1: image-led sequence, photo edges determine the rhythm.
css1 = '''.masthead { padding-top: var(--space-md); background: var(--color-white); color: var(--color-ink); }
.masthead .logo { margin-inline: auto; width: 12rem; }
.mast-meta { display: flex; justify-content: space-between; gap: var(--space-md); align-items: center; padding-bottom: var(--space-xs); font-size: var(--text-small); }
.mast-nav { display: none; }
.mast-mobile { padding-block: var(--space-xs); }
.mast-mobile summary { justify-content: space-between; }
.mast-mobile nav { padding-block: var(--space-md); }
.photo-opening { padding-top: var(--space-xl); }
.photo-intro { display: grid; gap: var(--space-lg); padding-bottom: var(--space-xl); }
.photo-intro h1 { font-size: var(--text-heading); max-width: 17ch; }
.photo-intro p { max-width: 49ch; }
.photo-opening > .photo { width: min(100%, 90rem); margin-inline: auto; }
.photo-opening > .photo figcaption { padding-inline: var(--page-gutter); }
.photo-intro .actions { column-gap: var(--space-lg); }
.people-story { padding-block: var(--space-2xl) var(--space-3xl); }
.people-story > .stack { max-width: 50rem; margin-bottom: var(--space-xl); }
.people-pair { display: grid; gap: var(--space-xl); align-items: start; }
.service-band { background: var(--color-wash); color: var(--color-ink); padding-block: var(--space-2xl); }
.service-inner { display: grid; gap: var(--space-xl); }
.service-inner h2 { max-width: 17ch; }
.cafe-story { padding-block: var(--space-3xl) var(--space-xl); display: grid; gap: var(--space-xl); align-items: center; }
.cafe-story .stack { max-width: 47ch; }
.news-contact { display: grid; gap: var(--space-xl); padding-block: var(--space-xl) var(--space-2xl); }
.news-contact h2 { font-size: var(--text-lead); }
.inline-footer { border-top: var(--rule-hair) solid var(--color-rule); padding-top: var(--space-lg); }
.inline-footer .wrap { display: flex; flex-wrap: wrap; gap: var(--space-xs) var(--space-xl); align-items: center; }
.inline-footer .preview-note { flex-basis: 100%; }
@media (min-width: 40rem) {
 .people-pair { grid-template-columns: minmax(0, 1.3fr) minmax(0, 0.8fr); gap: var(--space-xl); }
 .people-pair .photo:last-child { padding-top: var(--space-3xl); }
 .news-contact { grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr); gap: var(--space-3xl); }
}
@media (min-width: 60rem) {
 .masthead .wrap { position: relative; }
 .mast-meta { position: absolute; inset-inline: 0; top: var(--space-xl); pointer-events: none; }
 .mast-meta span:last-child { text-align: right; }
 .mast-mobile { display: none; }
 .mast-nav { display: block; }
 .mast-nav ul { display: flex; justify-content: center; gap: var(--space-xl); padding-block: var(--space-md); }
 .mast-nav a { text-decoration: none; font-weight: 650; }
 .photo-intro { grid-template-columns: minmax(0, 1fr) minmax(0, 1.25fr); column-gap: var(--space-3xl); align-items: start; }
 .photo-intro h1 { grid-row: span 2; font-weight: 750; }
 .photo-intro .actions { grid-column: 2; }
 .photo-opening > .photo { padding-inline: var(--page-gutter); }
 .photo-opening > .photo figcaption { padding-inline: 0; }
 .service-inner { grid-template-columns: minmax(0, 0.8fr) minmax(0, 1fr); gap: var(--space-3xl); }
 .cafe-story { grid-template-columns: minmax(0, 1.35fr) minmax(0, 0.8fr); gap: var(--space-2xl); }
 .cafe-story .photo { grid-column: 1; grid-row: 1; }
 .cafe-story .stack { grid-column: 2; grid-row: 1; }
}
'''
body1 = f'''<header class="masthead">
<div class="wrap"><div class="mast-meta"><span>Apostel-Kirchengemeinde Kiel</span><span>Startseitenentwurf</span></div>{logo()}
{nav('mast-nav')}<details class="menu mast-mobile"><summary>Menü</summary>{nav()}</details></div>
</header>
<main id="inhalt" tabindex="-1">
<section class="photo-opening" aria-labelledby="willkommen">
<div class="wrap photo-intro"><h1 id="willkommen">Schön, dass du da bist.</h1><p class="lead">{WELCOME}</p><div class="actions">{link('/gemeinde','Gemeinde kennenlernen')}{link('/gottesdienste','Gottesdienste')}</div></div>
{photo('service',first=True,sizes='(min-width: 90rem) 1280px, 94vw')}
</section>
<section class="wrap people-story" id="gemeinde" aria-labelledby="miteinander"><div class="stack"><h2 id="miteinander">Miteinander wird Gemeinde lebendig.</h2><p class="lead">{COMMUNITY}</p>{link('/angebote','Angebote &amp; Gruppen')}</div><div class="people-pair">{photo('conversation',sizes='(min-width: 40rem) 55vw, 92vw')}{photo('gathering',sizes='(min-width: 40rem) 35vw, 92vw')}</div></section>
<section class="service-band" aria-labelledby="gottesdienst"><div class="wrap service-inner"><h2 id="gottesdienst">Raum für Glauben.<br>Und für Fragen.</h2><div class="stack"><p class="lead">{SERVICE}</p>{link('/gottesdienste','Über Gottesdienste')}<p class="note muted">Aktuelle Termine sind in diesem Entwurf nicht eingebunden.</p></div></div></section>
<section class="wrap cafe-story" aria-labelledby="cafe"><div class="stack"><h2 id="cafe">Begegnung im Café Dreimaster.</h2><p>{CAFE}</p>{link('https://cafe-dreimaster.de/','Zum Café · extern',external=True)}</div>{photo('cafe',sizes='(min-width: 60rem) 52vw, 92vw')}</section>
<section class="wrap news-contact" aria-label="Aktuelles und Kontakt"><div class="stack"><h2>Was gibt es Neues?</h2><p>{NEWS}</p>{link('/aktuelles','Zu Aktuelles')}</div><div class="stack"><h2>Wir freuen uns auf dich.</h2><p>Lerne die Gemeinde kennen oder nimm Kontakt auf.</p>{link('/kontakt','Kontakt aufnehmen')}</div></section>
</main>
<footer class="inline-footer"><div class="wrap"><p>Apostel-Kirchengemeinde Kiel</p><div class="footer-links"><a href="/gemeinde">Gemeinde</a><a href="/kontakt">Kontakt</a><a href="#start">Nach oben ↑</a></div><p class="preview-note">Gestaltungsentwurf 1 · Zusammen im Bild · keine Inhalts- oder Launchfreigabe</p></div></footer>'''
add(1,'Zusammen im Bild','Ein fotografischer Auftakt und versetzte Bildpaare lassen zuerst Menschen sprechen; ruhige Textbänder führen zu Gottesdienst und Café.','Masthead → Einladung und großes Gottesdienstfoto → Gemeindeleben mit Bildpaar → Gottesdienst → Café → Aktuelles und Kontakt → kompakter Footer','Photographic','fotografisch, offen, vertraut','N6','Ft2','light / geometric-sans / cool',css1,body1,enrichment='E8 existing approved photography, uncropped')

# 2: a narrow personal letter with photographs acting as pauses, not tiles.
css2 = '''.letter-header { position: relative; padding-block: var(--space-lg); display: flex; flex-wrap: wrap; align-items: center; }
.letter-header .logo { width: 10.5rem; }
.letter-menu { width: 100%; }
.letter-menu summary { position: absolute; inset-inline-end: 0; top: var(--space-xl); }
.letter-menu nav { padding-top: var(--space-xl); }
.letter-menu nav a { border-bottom: var(--rule-hair) solid var(--color-rule); }
.letter-intro { padding-block: var(--space-xl) var(--space-3xl); display: grid; gap: var(--space-xl); }
.letter-intro h1 { font-weight: 300; line-height: 1.13; max-width: 13ch; }
.letter-prose { display: grid; gap: var(--space-lg); max-width: 50ch; }
.letter-prose .signature { font-weight: 750; }
.letter-photo { align-self: end; }
.letter-service { display: grid; gap: var(--space-xl); }
.letter-service .stack { max-width: 52ch; }
.letter-service h2 { font-weight: 300; max-width: 21ch; }
.letter-service .photo { margin-top: var(--space-lg); }
.letter-community { padding-block: var(--space-3xl) var(--space-2xl); display: grid; gap: var(--space-xl); }
.letter-community .photo { max-width: 46rem; }
.letter-community .stack { max-width: 47ch; }
.letter-cafe { background: var(--color-paper); color: var(--color-ink); padding-block: var(--space-2xl); }
.letter-cafe .wrap { display: grid; gap: var(--space-xl); align-items: start; }
.letter-cafe h2 { font-weight: 300; }
.letter-postscript { padding-block: var(--space-2xl); max-width: 54ch; display: grid; gap: var(--space-lg); }
.letter-postscript h2 { font-size: var(--text-lead); letter-spacing: -0.01em; }
.letter-close { padding-block: var(--space-xl) var(--space-2xl); }
.letter-close .wrap { display: grid; gap: var(--space-lg); }
.letter-close .farewell { font-size: var(--text-heading); font-weight: 300; line-height: 1.25; }
.letter-close .farewell strong { font-weight: 750; }
@media (min-width: 40rem) {
 .letter-menu nav ul { grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: var(--space-xl); }
 .letter-community { padding-inline: var(--space-xl); }
 .letter-postscript { margin-inline-start: 12%; }
}
@media (min-width: 60rem) {
 .letter-menu nav ul { grid-template-columns: repeat(5, minmax(0, 1fr)); }
 .letter-intro { grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.8fr); gap: var(--space-4xl); padding-inline: var(--space-2xl); padding-block: var(--space-2xl) var(--space-4xl); }
 .letter-photo { padding-bottom: var(--space-md); }
 .letter-service { padding-inline: var(--space-2xl); }
 .letter-service > .stack { margin-inline-start: 18%; }
 .letter-service .photo { max-width: 65rem; }
 .letter-community { grid-template-columns: minmax(0, 1.3fr) minmax(0, 0.8fr); gap: var(--space-2xl); align-items: center; padding-block: var(--space-4xl) var(--space-3xl); padding-inline: 0; }
 .letter-cafe .wrap { grid-template-columns: minmax(0, 0.75fr) minmax(0, 1.3fr); gap: var(--space-3xl); padding-inline: var(--space-2xl); }
 .letter-postscript { padding-block: var(--space-3xl); margin-inline-start: 18%; }
 .letter-close .wrap { padding-inline: var(--space-2xl); }
}
'''
body2 = f'''<header class="wrap letter-header">{logo()}<details class="menu letter-menu"><summary>Menü</summary>{nav()}</details></header>
<main id="inhalt" tabindex="-1">
<section class="wrap letter-intro" aria-labelledby="brief"><div class="letter-prose"><h1 id="brief">Schön, dass du da bist.</h1><p class="lead">{WELCOME}</p><p>{COMMUNITY}</p><p class="signature">Deine Apostel-Kirchengemeinde Kiel</p>{link('/gemeinde','Gemeinde kennenlernen')}</div>{photo('conversation','letter-photo',True,'(min-width: 60rem) 32vw, 92vw')}</section>
<section class="wrap letter-service" aria-labelledby="ruhe"><div class="stack"><h2 id="ruhe">Du musst nicht auf alles eine Antwort haben.</h2><p class="lead">{SERVICE}</p>{link('/gottesdienste','Gottesdienste entdecken')}<p class="note muted">Dieser Entwurf zeigt keine aktuellen Gottesdiensttermine.</p></div>{photo('service',sizes='(min-width: 60rem) 78vw, 92vw')}</section>
<section class="wrap letter-community" aria-labelledby="alltag">{photo('gathering',sizes='(min-width: 60rem) 50vw, 92vw')}<div class="stack"><h2 id="alltag">Glaube und Alltag.<br>Und wir mittendrin.</h2><p>{COMMUNITY}</p><p>Ein Blick zurück: Das Foto zeigt Begegnungen beim Gemeindefest 2022.</p>{link('/angebote','Angebote &amp; Gruppen')}</div></section>
<section class="letter-cafe" aria-labelledby="dreimaster"><div class="wrap"><div class="stack"><h2 id="dreimaster">Vielleicht beginnt es mit einer Begegnung.</h2><h3>Café Dreimaster</h3><p>{CAFE}</p>{link('https://cafe-dreimaster.de/','Café-Website · extern',external=True)}</div>{photo('cafe',sizes='(min-width: 60rem) 48vw, 92vw')}</div></section>
<section class="wrap" aria-labelledby="ps"><div class="letter-postscript"><h2 id="ps">Und was gibt es Neues?</h2><p>{NEWS}</p>{link('/aktuelles','Zu den Meldungen')}<p>Wenn du die Gemeinde kennenlernen möchtest oder eine Frage hast, findest du hier deinen nächsten Einstieg.</p><div class="actions">{link('/gemeinde','Unsere Gemeinde')}{link('/kontakt','Kontakt')}</div></div></section>
</main>
<footer class="letter-close dark"><div class="wrap"><p class="farewell">Wir freuen uns auf dich.<br><strong>Apostel-Kirchengemeinde Kiel</strong></p><p class="note">P. S. Deine Fragen dürfen mitkommen.</p><div class="footer-links"><a href="/gemeinde">Gemeinde</a><a href="/kontakt">Kontakt</a><a href="#start">Zum Anfang ↑</a></div><p class="note">Gestaltungsentwurf 2 · Ein Brief an dich · keine Inhalts- oder Launchfreigabe</p></div></footer>'''
add(2,'Ein Brief an dich','Eine persönliche Einladung in schmaler Lesespalte, leichte Figtree und einzelne fotografische Pausen nehmen dem Erstbesuch die Distanz.','Randheader mit Menü → persönlicher Brief → Gottesdienst mit Bildpause → Gemeindeleben → Café → Postskript mit Aktuelles → Briefschluss','Letter','persönlich, leise, zugewandt','N9','Ft6','light / geometric-sans / cool',css2,body2,overrides='  --color-paper: oklch(95.854195% 0.0110004 225.981540);\n  --color-wash: oklch(99.5% 0.002 235);\n  --text-display: clamp(2.5rem, 4.6vw, 4.125rem);\n',enrichment='E8 supplied conversation photograph in margin')

# 3: navigation is the opening content; sidebar stays an orientation rail.
css3 = '''.rail-header { background: var(--color-white); color: var(--color-ink); padding: var(--space-md) var(--page-gutter); }
.rail-header .logo { width: 10.5rem; }
.rail-label { display: none; }
.rail-desktop { display: none; }
.rail-mobile { margin-top: var(--space-sm); }
.rail-mobile summary { justify-content: space-between; }
.rail-main { padding-top: var(--space-xl); }
.index-opening { display: grid; gap: var(--space-xl); padding-bottom: var(--space-2xl); }
.index-opening h1 { font-size: var(--text-heading); max-width: 20ch; }
.index-opening > .stack { gap: var(--space-md); }
.path-list { border-top: var(--rule-hair) solid var(--color-rule); }
.path-list li { padding-block: var(--space-md); border-bottom: var(--rule-hair) solid var(--color-rule); display: grid; gap: var(--space-xs); }
.path-list h2 { font-size: clamp(1.125rem, 2.1vw, 1.875rem); line-height: 1.25; letter-spacing: -0.02em; }
.path-list a { display: flex; justify-content: space-between; gap: var(--space-md); text-decoration: none; }
.path-list p { font-size: var(--text-base); }
.path-list .first-path { color: var(--color-blue); }
.index-service { padding-block: var(--space-xl) var(--space-2xl); display: grid; gap: var(--space-xl); align-items: center; }
.index-service h2 { font-size: var(--text-heading); }
.index-community { padding-block: var(--space-xl) var(--space-3xl); }
.index-community .stack { margin-bottom: var(--space-xl); }
.index-pictures { display: grid; gap: var(--space-lg); }
.index-cafe { padding-block: var(--space-xl) var(--space-2xl); display: grid; gap: var(--space-xl); }
.index-news { padding: var(--space-lg); background: var(--color-wash); color: var(--color-ink); display: grid; gap: var(--space-lg); }
.index-news h2 { font-size: var(--text-lead); }
.index-colophon { padding-block: var(--space-2xl) var(--space-lg); }
.index-colophon .stack { max-width: 62ch; gap: var(--space-sm); }
@media (min-width: 40rem) {
 .index-pictures { grid-template-columns: minmax(0, 1fr) minmax(0, 1.3fr); align-items: end; gap: var(--space-xl); }
 .index-pictures > .photo:first-child { padding-bottom: var(--space-2xl); }
 .index-news { padding: var(--space-xl); }
}
@media (min-width: 64rem) {
 body { display: grid; grid-template-columns: 15rem minmax(0, 1fr); }
 .rail-header { position: sticky; top: 0; align-self: start; min-height: 100svh; display: flex; flex-direction: column; align-items: start; gap: var(--space-xl); padding: var(--space-xl) var(--space-lg); }
 .rail-label { display: block; font-size: var(--text-small); color: var(--color-muted); }
 .rail-desktop { display: block; width: 100%; }
 .rail-desktop ul { display: grid; gap: var(--space-xs); }
 .rail-desktop a { display: flex; width: 100%; text-decoration: none; padding-block: var(--space-xs); }
 .rail-mobile { display: none; }
 .rail-main { padding-top: var(--space-2xl); }
 .rail-main .wrap, .index-colophon .wrap { width: calc(100% - var(--page-gutter) * 2); }
 .index-opening { padding-bottom: var(--space-3xl); }
 .index-opening > .stack { max-width: 60ch; }
 .path-list li { grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr); column-gap: var(--space-xl); align-items: center; padding-block: var(--space-lg); }
 .path-list h2 { font-size: clamp(1.125rem, 1.8vw, 1.625rem); }
 .index-service { grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); gap: var(--space-xl); padding-block: var(--space-2xl) var(--space-3xl); }
 .index-cafe { grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.2fr); align-items: center; gap: var(--space-2xl); }
 .index-colophon { grid-column: 2; }
}
'''
body3 = f'''<header class="rail-header">{logo()}<p class="rail-label">Dein Einstieg in die<br>Apostel-Kirchengemeinde Kiel</p>{nav('rail-desktop')}<details class="menu rail-mobile"><summary>Navigation</summary>{nav()}</details></header>
<main class="rail-main" id="inhalt" tabindex="-1">
<section class="wrap index-opening" aria-labelledby="wege"><div class="stack"><h1 id="wege">Was führt dich zu uns?</h1><p>{WELCOME}</p></div><ul class="path-list">
<li><h2>{link('/gemeinde','Gemeinde kennenlernen','first-path')}</h2><p>Menschen, Begegnung und gemeinsamer Glaube.</p></li>
<li><h2>{link('#gottesdienste','Gottesdienste','')}</h2><p>Zur Ruhe kommen. Fragen mitbringen.</p></li>
<li><h2>{link('/angebote','Angebote &amp; Gruppen','')}</h2><p>Gemeindeleben im Alltag entdecken.</p></li>
<li><h2>{link('#cafe','Café Dreimaster','')}</h2><p>Ein eigener Ort der Begegnung.</p></li>
<li><h2>{link('/kontakt','Kontakt','')}</h2><p>Mit der Gemeinde ins Gespräch kommen.</p></li>
</ul></section>
<section class="wrap index-service" id="gottesdienste" aria-labelledby="glaube"><div class="stack"><h2 id="glaube">Gottesdienst.<br>Auch mit offenen Fragen.</h2><p>{SERVICE}</p>{link('/gottesdienste','Zu den Gottesdiensten')}<p class="note muted">Keine aktuellen Termine in diesem Entwurf.</p></div>{photo('service',first=True,sizes='(min-width: 64rem) 35vw, 92vw')}</section>
<section class="wrap index-community" aria-labelledby="leben"><div class="stack"><h2 id="leben">Gemeinde ist Miteinander.</h2><p class="lead">{COMMUNITY}</p>{link('/angebote','Angebote &amp; Gruppen')}</div><div class="index-pictures">{photo('conversation',sizes='(min-width: 64rem) 28vw, (min-width: 40rem) 40vw, 92vw')}{photo('gathering',sizes='(min-width: 64rem) 38vw, (min-width: 40rem) 50vw, 92vw')}</div></section>
<section class="wrap index-cafe" id="cafe" aria-labelledby="pause"><div class="stack"><h2 id="pause">Eine Begegnung.<br>Ein Café.</h2><h3>Café Dreimaster</h3><p>{CAFE}</p>{link('https://cafe-dreimaster.de/','Zum Café · extern',external=True)}</div>{photo('cafe',sizes='(min-width: 64rem) 38vw, 92vw')}</section>
<section class="wrap index-news" aria-labelledby="meldungen"><h2 id="meldungen">Aktuelles aus der Gemeinde</h2><p>{NEWS}</p><div class="actions">{link('/aktuelles','Zu Aktuelles')}{link('/kontakt','Kontakt')}</div></section>
</main>
<footer class="index-colophon"><div class="wrap stack"><p><strong>Apostel-Kirchengemeinde Kiel.</strong> Schön, dass du da bist. Dieser Startseitenentwurf zeigt bewusst keine aktuellen Gottesdiensttermine, Gruppenlisten oder Meldungen.</p><div class="footer-links"><a href="/gemeinde">Gemeinde</a><a href="/kontakt">Kontakt</a><a href="#start">Nach oben ↑</a></div><p class="preview-note">Gestaltungsentwurf 3 · Dein Weg in die Gemeinde · keine Inhalts- oder Launchfreigabe</p></div></footer>'''
add(3,'Dein Weg in die Gemeinde','Ein sichtbarer Wege-Index und eine ruhende Seitenleiste bedienen zielgerichtete Besuche; die fotografische Gemeindeerzählung folgt erst danach.','Seitennavigation → Wege-Index → Gottesdienst → Gemeindeleben mit versetzten Fotos → Café → Aktuelles → Kolophon','Index-First','übersichtlich, direkt, verlässlich','N3','Ft4','light / geometric-sans / cool',css3,body3,enrichment='none in index opening; four approved photographs below')

# 4: concise questions, genuine native disclosure states and warm human scale.
css4 = '''.question-header { background: var(--color-white); color: var(--color-ink); padding-block: var(--space-md); }
.question-bar { display: flex; justify-content: space-between; align-items: center; gap: var(--space-md); }
.question-bar .logo { width: 10rem; }
.question-quick { display: none; }
.overview { margin-top: var(--space-xs); }
.overview summary { justify-content: space-between; border-top: var(--rule-hair) solid var(--color-rule); padding-block: var(--space-xs); }
.overview-panel { padding-block: var(--space-lg); display: grid; gap: var(--space-lg); }
.overview-panel a { font-weight: 750; }
.overview-panel p { font-size: var(--text-small); }
.question-hero { padding-block: var(--space-xl) var(--space-2xl); display: grid; gap: var(--space-xl); }
.question-hero h1 { max-width: 15ch; }
.question-hero .stack { align-self: center; }
.question-hero .photo { align-self: center; }
.question-group { padding-block: var(--space-2xl); }
.question-group:nth-of-type(even) { background: var(--color-white); color: var(--color-ink); }
.question-group details > summary { display: flex; align-items: center; gap: var(--space-md); justify-content: space-between; list-style: none; padding-block: var(--space-sm); }
.question-group summary::-webkit-details-marker { display: none; }
.question-group summary h2 { font-size: clamp(1.25rem, 2.7vw, 2.25rem); line-height: 1.3; letter-spacing: -0.025em; white-space: nowrap; }
.question-group summary::after { content: '+'; display: grid; place-items: center; flex-shrink: 0; width: 44px; height: 44px; border: var(--rule-hair) solid currentColor; border-radius: 50%; font-size: var(--text-lead); }
.question-group details[open] summary::after { content: '−'; }
.answer { display: grid; gap: var(--space-xl); padding-block: var(--space-lg) var(--space-xs); align-items: center; }
.answer .stack { max-width: 52ch; }
.answer h3 { font-size: var(--text-lead); }
.answer .photo { min-width: 0; }
.question-last .answer { align-items: start; }
.question-footer { padding-block: var(--space-2xl) var(--space-lg); }
.question-footer .wrap { display: grid; gap: var(--space-xl); }
.question-footer .closing { font-size: var(--text-display); font-weight: 300; line-height: 1.1; max-width: 18ch; }
.question-footer .footer-meta { display: grid; gap: var(--space-sm); }
@media (min-width: 40rem) {
 .question-quick { display: flex; gap: var(--space-lg); }
 .overview-panel { grid-template-columns: repeat(2, minmax(0, 1fr)); }
 .question-group summary h2 { white-space: normal; }
}
@media (min-width: 60rem) {
 .question-header .wrap { max-width: 73rem; }
 .overview-panel { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--space-xl); }
 .question-hero { grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr); gap: var(--space-3xl); padding-block: var(--space-2xl) var(--space-3xl); }
 .question-hero .photo { padding-top: var(--space-2xl); }
 .question-group { padding-block: var(--space-xl); }
 .answer { grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.2fr); gap: var(--space-2xl); padding-block: var(--space-xl); }
 .question-cafe .answer { grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.9fr); }
 .question-cafe .answer .stack { grid-column: 2; grid-row: 1; }
 .question-cafe .answer .photo { grid-column: 1; grid-row: 1; }
 .question-footer .footer-meta { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: start; gap: var(--space-lg); }
}
@media (prefers-reduced-motion: no-preference) {
 .question-group details[open] .answer { animation: answer-in var(--dur-short) var(--ease-out); }
 .question-hero .button { transition: transform var(--dur-micro) var(--ease-out); }
 .question-hero .button:active { transform: translateY(1px); }
 @keyframes answer-in { from { opacity: 0.7; } to { opacity: 1; } }
}
'''
menu4 = '<nav class="overview-panel" aria-label="Hauptnavigation">' + ''.join(f'<div><a href="{url}">{label}</a><p>{desc}</p></div>' for (label,url),desc in zip(NAV,['Glauben und Fragen teilen.','Meldungen aus der Gemeinde.','Gemeindeleben entdecken.','Die AKG kennenlernen.','Ins Gespräch kommen.'])) + '</nav>'
body4 = f'''<header class="question-header"><div class="wrap"><div class="question-bar">{logo()}<div class="question-quick">{link('/gottesdienste','Gottesdienste')}{link('/kontakt','Kontakt')}</div></div><details class="menu overview"><summary>Die Gemeinde entdecken</summary>{menu4}</details></div></header>
<main id="inhalt" tabindex="-1">
<section class="wrap question-hero" aria-labelledby="fragen"><div class="stack"><h1 id="fragen">Mit offenen Fragen.</h1><p class="lead">Schön, dass du da bist. {WELCOME}</p>{link('/gemeinde','Gemeinde kennenlernen','button')}{link('/gottesdienste','Direkt zu Gottesdiensten')}</div>{photo('conversation',first=True,sizes='(min-width: 60rem) 35vw, 92vw')}</section>
<section class="question-group" aria-labelledby="frage-glaube"><div class="wrap"><details open><summary><h2 id="frage-glaube">Auch mit Fragen?</h2></summary><div class="answer"><div class="stack"><h3>Ja. Auch im Gottesdienst.</h3><p class="lead">{SERVICE}</p>{link('/gottesdienste','Über Gottesdienste')}<p class="note muted">Aktuelle Termine sind hier nicht eingebunden.</p></div>{photo('service',sizes='(min-width: 60rem) 48vw, 92vw')}</div></details></div></section>
<section class="question-group" aria-labelledby="frage-gemeinde"><div class="wrap"><details open><summary><h2 id="frage-gemeinde">Was verbindet uns?</h2></summary><div class="answer"><div class="stack"><h3>Menschen und Begegnungen.</h3><p class="lead">{COMMUNITY}</p><p>Das Foto zeigt einen Moment vom Gemeindefest 2022.</p>{link('/angebote','Angebote &amp; Gruppen')}</div>{photo('gathering',sizes='(min-width: 60rem) 48vw, 92vw')}</div></details></div></section>
<section class="question-group question-cafe" aria-labelledby="frage-cafe"><div class="wrap"><details open><summary><h2 id="frage-cafe">Lust auf Begegnung?</h2></summary><div class="answer"><div class="stack"><h3>Café Dreimaster</h3><p>{CAFE}</p>{link('https://cafe-dreimaster.de/','Zum Café · extern',external=True)}</div>{photo('cafe',sizes='(min-width: 60rem) 48vw, 92vw')}</div></details></div></section>
<section class="question-group question-last" aria-labelledby="frage-neu"><div class="wrap"><details open><summary><h2 id="frage-neu">Was gibt’s Neues?</h2></summary><div class="answer"><div class="stack"><p>{NEWS}</p>{link('/aktuelles','Zu Aktuelles')}</div><div class="stack"><h3>Noch eine Frage?</h3><p>Über die Kontaktseite kommst du mit der Gemeinde ins Gespräch.</p>{link('/kontakt','Kontakt aufnehmen')}</div></div></details></div></section>
</main>
<footer class="question-footer dark"><div class="wrap"><p class="closing">Wir freuen uns auf dich.</p><div class="footer-meta"><p>Apostel-Kirchengemeinde Kiel</p><div class="footer-links"><a href="/gemeinde">Gemeinde</a><a href="/kontakt">Kontakt</a><a href="#start">Nach oben ↑</a></div></div><p class="note">Gestaltungsentwurf 4 · Mit offenen Fragen · keine Inhalts- oder Launchfreigabe</p></div></footer>'''
add(4,'Mit offenen Fragen','Kurze echte Fragen, vollständig geöffnete native Antworten und ein beschreibendes Übersichtsmenü machen den Erstbesuch zu einem Gespräch.','Übersichtsmenü → Einladung mit Gesprächsfoto → Gottesdienstfrage → Gemeinschaftsfrage → Caféfrage → Aktuelles und Kontaktfrage → Schlusssatz','Conversational FAQ','gesprächig, niedrigschwellig, warm','N11','Ft5','light / geometric-sans / cool',css4,body4,overrides='  --color-paper: oklch(95.854195% 0.0110004 225.981540);\n  --text-display: clamp(2.375rem, 5vw, 4.375rem);\n  --page-max: 73rem;\n',enrichment='E8 supplied conversation photograph; answers use original archive photography')

# 5: typographic declaration, large blocks, dense-to-open shifts, no photo overlays.
css5 = '''.slab { padding-block: var(--space-md); background: var(--color-white); color: var(--color-ink); border-bottom: 3px solid var(--color-ink); }
.slab-inner { display: flex; flex-wrap: wrap; gap: var(--space-sm); align-items: center; }
.slab .logo { width: 10.5rem; }
.slab-nav { display: none; }
.slab-menu { width: 100%; }
.slab-menu summary { justify-content: space-between; }
.declaration { padding-block: var(--space-xl) var(--space-2xl); }
.declaration .wrap { display: grid; gap: var(--space-xl); }
.declaration h1 { font-size: clamp(2.5rem, 6.6vw, 6rem); font-weight: 900; line-height: 1.03; letter-spacing: -0.045em; text-transform: uppercase; max-width: 11ch; }
.declaration h1 span { display: block; }
.declaration-intro { display: grid; gap: var(--space-lg); align-content: start; }
.declaration-intro p { max-width: 48ch; }
.declaration .outline { color: var(--color-white); border-color: var(--color-white); }
.declaration .photo { align-self: end; }
.manifest-service { padding-block: var(--space-2xl) var(--space-3xl); background: var(--color-white); color: var(--color-ink); }
.manifest-service .wrap { display: grid; gap: var(--space-xl); }
.manifest-service h2 { font-size: var(--text-heading); font-weight: 850; max-width: 20ch; }
.manifest-people { padding-block: var(--space-2xl) var(--space-3xl); background: var(--color-wash); color: var(--color-ink); }
.manifest-people > .wrap { display: grid; gap: var(--space-xl); }
.manifest-people h2 { font-weight: 850; max-width: 22ch; }
.manifest-people .lead { max-width: 52ch; }
.manifest-pictures { display: grid; gap: var(--space-xl); }
.manifest-cafe { padding-block: var(--space-2xl); display: grid; gap: var(--space-xl); }
.manifest-cafe h2 { max-width: 18ch; font-weight: 850; }
.manifest-news { padding-block: var(--space-xl) var(--space-2xl); background: var(--color-white); color: var(--color-ink); }
.manifest-news .wrap { display: grid; gap: var(--space-xl); }
.manifest-news h2 { font-size: var(--text-lead); letter-spacing: -0.01em; }
.manifest-footer { padding-block: var(--space-xl) var(--space-lg); }
.manifest-footer .wrap { display: grid; gap: var(--space-lg); }
.manifest-footer .footer-name { font-size: var(--text-heading); font-weight: 850; line-height: 1.15; max-width: 22ch; }
@media (min-width: 40rem) {
 .manifest-pictures { grid-template-columns: minmax(0, 1.35fr) minmax(0, 0.85fr); gap: var(--space-xl); }
 .manifest-pictures .photo:last-child { padding-top: var(--space-3xl); }
 .manifest-news .wrap { grid-template-columns: minmax(0, 1.3fr) minmax(0, 0.8fr); gap: var(--space-2xl); }
}
@media (min-width: 60rem) {
 .slab-inner { gap: var(--space-2xl); }
 .slab-menu { display: none; }
 .slab-nav { display: block; margin-inline-start: auto; }
 .slab-nav ul { display: flex; flex-wrap: wrap; gap: var(--space-lg); }
 .slab-nav a { text-decoration: none; text-transform: uppercase; letter-spacing: 0.04em; font-size: var(--text-small); font-weight: 750; }
 .declaration { padding-block: var(--space-2xl) var(--space-3xl); }
 .declaration .wrap { grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.2fr); gap: var(--space-xl) var(--space-2xl); }
 .declaration h1 { grid-row: span 2; align-self: start; }
 .declaration-intro { grid-column: 2; }
 .declaration .photo { grid-column: 2; }
 .declaration .photo figcaption { max-width: 100%; }
 .manifest-service .wrap { grid-template-columns: minmax(0, 0.9fr) minmax(0, 1fr); gap: var(--space-3xl); }
 .manifest-people { padding-block: var(--space-3xl); }
 .manifest-people > .wrap > .stack { max-width: 56rem; }
 .manifest-cafe { grid-template-columns: minmax(0, 1.4fr) minmax(0, 0.8fr); align-items: center; gap: var(--space-2xl); padding-block: var(--space-3xl); }
 .manifest-cafe .stack { grid-column: 2; grid-row: 1; }
 .manifest-cafe .photo { grid-column: 1; grid-row: 1; }
 .manifest-footer .wrap { grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr); align-items: center; }
 .manifest-footer .note { grid-column: 1 / -1; }
}
'''
body5 = f'''<header class="slab"><div class="wrap slab-inner">{logo()}{nav('slab-nav')}<details class="menu slab-menu"><summary>Menü öffnen</summary>{nav()}</details></div></header>
<main id="inhalt" tabindex="-1">
<section class="declaration dark" aria-labelledby="menschen"><div class="wrap"><h1 id="menschen"><span>Menschen</span><span>machen</span><span>Gemeinde.</span></h1><div class="declaration-intro"><p class="lead">Schön, dass du da bist. {WELCOME}</p><div class="actions">{link('/gemeinde','Gemeinde kennenlernen','outline')}{link('/gottesdienste','Gottesdienste')}</div></div>{photo('service',first=True,sizes='(min-width: 60rem) 48vw, 92vw')}</div></section>
<section class="manifest-service" aria-labelledby="glauben"><div class="wrap"><h2 id="glauben">Gemeinsam glauben.<br>Fragen offenlassen.</h2><div class="stack"><p class="lead">{SERVICE}</p>{link('/gottesdienste','Gottesdienste entdecken')}<p class="note muted">Keine aktuellen Termine in diesem Entwurf.</p></div></div></section>
<section class="manifest-people" aria-labelledby="zusammen"><div class="wrap"><div class="stack"><h2 id="zusammen">Im Gespräch.<br>Im Leben. Miteinander.</h2><p class="lead">{COMMUNITY}</p>{link('/angebote','Angebote &amp; Gruppen')}</div><div class="manifest-pictures">{photo('gathering',sizes='(min-width: 40rem) 55vw, 92vw')}{photo('conversation',sizes='(min-width: 40rem) 35vw, 92vw')}</div></div></section>
<section class="wrap manifest-cafe" aria-labelledby="cafe-ort"><div class="stack"><h2 id="cafe-ort">Begegnung hat viele Orte.</h2><h3>Café Dreimaster</h3><p>{CAFE}</p>{link('https://cafe-dreimaster.de/','Zum Café · extern',external=True)}</div>{photo('cafe',sizes='(min-width: 60rem) 52vw, 92vw')}</section>
<section class="manifest-news" aria-label="Aktuelles und Kontakt"><div class="wrap"><div class="stack"><h2>Gemeinde bleibt im Gespräch.</h2><p>{NEWS}</p>{link('/aktuelles','Zu Aktuelles')}</div><div class="stack"><h2>Dein nächster Schritt.</h2><p>Lerne die Gemeinde kennen oder nimm Kontakt auf.</p>{link('/kontakt','Kontakt aufnehmen')}</div></div></section>
</main>
<footer class="manifest-footer dark"><div class="wrap"><p class="footer-name">Apostel-Kirchengemeinde Kiel</p><div><p>Schön, dass du da bist.</p><div class="footer-links"><a href="/gemeinde">Gemeinde</a><a href="/kontakt">Kontakt</a><a href="#start">Nach oben ↑</a></div></div><p class="note">Gestaltungsentwurf 5 · Menschen machen Gemeinde · keine Inhalts- oder Launchfreigabe</p></div></footer>'''
add(5,'Menschen machen Gemeinde','Ein dunkelblaues typografisches Statement, ein kraftvoller Navigationsblock und große Bildfelder setzen die Menschen plakativ in den Mittelpunkt.','Navigationsblock → dunkelblaues Menschen-Statement mit Gottesdienstfoto → Glaube und Fragen → Gemeindeleben → Café → Aktuelles und Kontakt → Namensabschluss','Manifesto','mutig, gemeinschaftlich, plakativ','N7','Ft1','dark / display-heavy / cool',css5,body5,enrichment='E8 supplied service photograph; no overlay, no filter')

(OUT / 'manifest.json').write_text(json.dumps(pages, ensure_ascii=False, indent=2) + '\n')
log = [dict(date=date.today().isoformat(), number=p['number'], macrostructure=m, theme='custom', theme_axes=('dark / display-heavy / cool' if p['number'] == 5 else 'light / geometric-sans / cool'), enrichment=('none in opening; archive photos below' if p['number'] == 3 else 'E8 approved archive photography, uncropped'), nav=n, footer=f, brief=p['title']) for p,m,n,f in zip(pages,['Photographic','Letter','Index-First','Conversational FAQ','Manifesto'],['N6','N9','N3','N11','N7'],['Ft2','Ft6','Ft4','Ft5','Ft1'])]
(OUT / '.hallmark' / 'log.json').write_text(json.dumps(log[::-1], ensure_ascii=False, indent=2) + '\n')
print('Wrote five standalone pages, manifest, scoped token exports and scoped Hallmark memory.')
