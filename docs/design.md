# Gestaltung und UI-Vertrag · AKG-MVP

Stand: 2026-10-28 · AKG-127. Gestaltungsvorschau, keine Inhalts-, Rechts- oder Launchfreigabe. Aktueller Prüfstand: [Taste-Review](redesign-taste-review.md); ältere positive Prüfungen gelten nicht automatisch für diese Fassung.

## Richtung

**place-carries-it**, Seed **111414565**, mit beibehaltener Palette und Schrift. Die tatsächliche Petruskirche trägt die Gestaltung: unverändertes Original-Logo, Figtree, Blau/Weiß, Backstein und Holz statt erfundener Wortmarke oder generischer Gemeindefotos. Ziel: Gemeinde kennenlernen; Gottesdienste bleiben unmittelbar erreichbar.

Startseite: große Außenansicht und konkrete Einladung → Gottesdienst → drei ergänzende Architekturaufnahmen und Geschichte → Gemeindeorte/Dreimaster → tatsächliche Meldungen oder ehrlicher Quellenzustand → blauer Abschluss mit notwendigen Wegen. Kein Stock-Kalender, keine erfundenen Menschen oder Veranstaltungen.

Desktop: Einladung neben dem Turm über dem Foto, mit neutralem dunklem Lesbarkeitsschutz. Mobil: Einladung/CTAs vor der vollständigen Außenansicht; DOM-, Lese- und Fokusreihenfolge stimmen überein. Die Galerie kombiniert Querformate und das unbeschnittene Hochformatportal; mobil folgt ein linearer Bildfluss.

## Marke, Medien und Quellen

[brand-spec.md](brand-spec.md) enthält alle vier Fotos mit Autor, Originalquelle, Lizenz und Bearbeitung sowie das unveränderte Logo und die lokale Figtree/OFL. Sichtbare Quellen-/Lizenzlinks stehen unter jedem Bild und bleiben auch im Bildbetrachter erhalten. Keine externen Ressourcen, Hotlinks oder Embeds. Die Seitenaufnahme von 2015 belegt keine heutigen Zugangsbedingungen.

Die früher gesichteten Mobbin-Referenzen bleiben Kompositionsreferenzen:

- [IKEA Museum](https://mobbin.com/sites/sections/9106b15a-0086-4cfc-a085-66d514b20408): erkennbare Marke und echte Fotografie.
- [IKEA Museum Story](https://mobbin.com/sites/sections/0d9af2f7-a982-4e71-a6e4-be2dd6b6ac96): großzügige Bild-/Text-Komposition.
- Weitere Quellen und verworfene SaaS-Richtungen: [Art Direction](redesign-art-direction.md). Keine fremden Logos, Screenshots oder Personenbilder übernommen.

Planung, Draw, Baseline und Screenshots liegen lokal unter `.taste-skill/` (ignorierte Arbeitsartefakte). Der versionierbare Prüfbericht steht unter `docs/redesign-taste-review.md`.

## Typografie und Flächen

Quelle: `src/styles/globals.css`.

- Figtree; Weiß `#ffffff`, Ink `#173b50`, Aktionsblau `#006c9e`, helle Fläche `#eaf3f7`.
- Fünf sichtbare Größenrollen: kleine Hinweise 14 px, Fließtext/Navigation 17 px, Einleitung 18–22 px, Abschnittstitel 28–40 px, Homepage-H1 44–104 px. Unterseiten-H1 bleibt 36–44 px.
- Seitenränder 20–32 px, Inhaltsbreite maximal 88 rem; schmale Leseabsätze behalten ihr eigenes Maß.
- Keine dekorativen Eyebrows, Hairlines, Kartenumrandungen, Schatten oder Verlaufsflächen. Ausnahme: neutraler Fotografie-Scrim für lesbare Schrift.
- Vollflächiges Blau im Footer; quadratische, gefüllte Buttons. Fokus: 3 px mit 5 px Abstand, auf dunklem Grund helles Gold statt Orange.

## Interaktion und Zugänglichkeit

- Genau fünf slashlose Hauptziele: Gottesdienste, Aktuelles, Angebote, Gemeinde, Kontakt.
- Native Links und `details/summary` im Dokumentfluss. Escape und Breakpoint-Fokus bleiben erhalten; keine clientseitige Routerpflicht.
- Skip-Link, ein `main`, `aria-current`, keine positiven Tabindices. Ziele grundsätzlich mindestens 44 px; Bildnachweise bleiben normale Textlinks.
- Galerie: normale Bildlinks mit progressiver Erweiterung zu `dialog.showModal()`. Beschriftung „Foto ansehen“ statt eines auf kleinen Geräten falschen Vergrößerungsversprechens.
- Dialog: proportional eingepasstes Bild, Quellenangaben, Schließen und „Bilddatei öffnen“ für browsernative Detailvergrößerung. Native Fokusbegrenzung/Escape; Fokusrückgabe zum Auslöser. Nur bei offenem Dialog wird Hintergrundscrollen gesperrt.
- Ohne JS bzw. ohne Dialogunterstützung öffnet der Link direkt das lokale 1440-px-Bild. Modifizierte Klicks werden nicht abgefangen.
- Einmalige Bildöffnung und kurze Bewegungen beim Eintreten in den Viewport. Inhalte sind standardmäßig sichtbar; kein Scroll-Hijacking oder Dauerloop. `prefers-reduced-motion` unterbindet Bewegung auch nach Umschaltung. Keine neue Bibliothek.
- Textvergrößerung, lange Titel und fehlende Daten dürfen wachsen; kein Text-Clipping als Ersatz für Layoutkorrektur.

## Unveränderte Daten- und Freigabegrenzen

Persönliche du-Ansprache und historische Absätze sind **redaktionelle Entwürfe**. Historische Quellen: [Recherche](redesign-content-research.md). Keine aktuellen Kontakte, Gruppen, Personen, Termine, Zugänglichkeitszusagen, Öffnungszeiten, Zahlungsdaten oder Rechtstexte erfunden.

`src/lib/content.ts` bleibt die SSR-Bridge: serverseitiges `env`, optionaler `CHURCHTOOLS_TOKEN`, `SERVICES_APPROVED === 'true'`, Request-Cache. Backend-Mapping/Cache unverändert; keine Token/Rohdaten in Props oder HTML.

`SourceState` unterscheidet disabled, empty, unavailable und stale. Warnung und Zeitstempel veralteter Daten bleiben sichtbar. Details bleiben 503 mit `Retry-After: 1800` bei unzugänglicher Quelle bzw. unbestätigter Abwesenheit; 404 nur bei bestätigter Abwesenheit. SSR-HTML bleibt `no-store`.

Gottesdienste: nur Titel/Zeit aus Kalender 2, Berlin-Zeitzone; keine erfundene Ortszuordnung. News bleiben escaped Plaintext, kein `set:html`. Keine Gruppen-/Personenabfragen, keine WordPress-Laufzeitquelle.

Alle Routen behalten Entwurfshinweis, `noindex, nofollow`, robots-Sperre und keine Sitemap. **noindex ist keine Zugriffskontrolle.** Vorschauversionen sind keine Secret-/Ressourcenisolation.

Externe Ziele bleiben zentral in `src/lib/site.ts`: Dreimaster, YouTube-Kanal, Intern/ChurchTools. Keine Programme oder Öffnungszeiten der separaten Produkte kopieren; keine unbestätigte Konzertdomain verlinken.

## Prüfung

`pnpm quality` und `pnpm test:preview` bleiben die technischen Gates. Browserregression: zwölf Routen, fünf Breiten, axe bei 390/1440 px, Tastatur, Menü ohne JS, Bilder, 200-%-Text. Ergänzt: mobile Hero-Fokusfolge, Dialog-Fokus/Escape/Schließen, axe im offenen Dialog, proportionaler Bildraum, alle drei No-JS-Bildlinks und reduzierte Bewegung einschließlich Umschaltung.

Visuelle Abnahme zusätzlich am Produktionsbuild bei 1440/768/390 px; unabhängige Kritik und tatsächliche Screenshot-Korrekturrunden. Ergebnisse und offene Punkte im [Taste-Review](redesign-taste-review.md).

Nicht behauptet: authentifizierte ChurchTools-E2E-Prüfung, Safari/Firefox, physische Geräte/echte Screenreader, vollständige WCAG-Zertifizierung, Medien-/Rechtsfreigabe oder Produktionsabnahme. Kein automatischer Commit, Push oder Deploy.
