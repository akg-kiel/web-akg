# Gestaltung und UI-Vertrag · AKG-MVP

Stand: 2026-11-13 · AKG-127. Gestaltungsvorschau, keine allgemeine Inhalts-, Rechts- oder Launchabnahme. Historischer Gestaltungsprüfstand: [Menschen und kompakter Hero](redesign-people-review.md); ältere positive Prüfungen gelten nicht automatisch für diese Fassung.

## Fotos und Suchmaschinen · ausdrücklicher Nutzerfolgeauftrag 13.11.2026

Nach der zwischenzeitlichen Bildsperre hat der Nutzer alle bestehenden Fotos ausdrücklich wieder für die öffentliche Vorschau gewünscht und ergänzt: „Auch für Produktiv ist das okay. Aber mache bitte alle seiten nicht discoverable durch suchmaschinen“. Ein zusätzlicher Zugangsschutz/Zero Trust ist nicht gewünscht. `src/lib/photos.mjs` setzt deshalb auch die vier historischen Gemeindefotos auf `publicApproved: true`. Alle acht ausgewählten Motive und ihre 24 lokalen Varianten bleiben auslieferbar; die vier Gemeindefotos erscheinen wieder in der bestehenden Komposition. Der Build-Hook entfernt weiterhin tatsächlich nicht freigegebene Motive, falls solche später ergänzt werden. Original-Logo/Figtree, hellblauer Hero und die Abschnittsfolge bleiben unverändert.

Diese dokumentierte Nutzerentscheidung ist die Auslieferungsfreigabe, keine erfundene CC-Lizenz oder eigenständige Bestätigung sämtlicher Urheber-/Personen-/Kunstwerkrechte. Quellen, belegte Credits und Archivkennzeichnungen bleiben erhalten; weitergehende rechtliche Dokumentation unter AKG-67/72 wird nicht als abgeschlossen behauptet. Die Erlaubnis zur späteren produktiven Fotoverwendung ist kein Auftrag zum Produktionsdeploy.

Alle HTML-Seiten behalten `noindex, nofollow`; der Worker setzt `X-Robots-Tag: noindex, nofollow` vor jeder Antwort, auch für Bilder, statische Assets, Weiterleitungen und Fehler. Das gilt ohne Produktions-/Host-Ausnahme. `robots.txt` erlaubt Crawling bewusst, damit Suchmaschinen die Indexierungsverbote auch an extern verlinkten URLs lesen können; `Disallow: /` würde dies verhindern. Keine Sitemap. Öffentliche URLs können trotzdem bekannt werden; `noindex` ist keine Zugriffskontrolle und keine Garantie gegen ignorierende Crawler oder sofortige Entfernung alter Suchtreffer.

## Richtung

**Menschen machen Gemeinde.** Nutzerkorrektur der bisherigen Richtung `place-carries-it` (Seed 111414565): Der Gebäudehero war zu groß, Menschen sollen den Auftritt tragen. Kein neuer Zufallsdraw; Hero-Komposition und Motive folgen ausdrücklich dieser Korrektur. Original-Logo, Figtree und Blau/Weiß bleiben erhalten. Auf den folgenden Nutzerhinweis übernimmt der Hero wieder die hellblaue, direkt an das Foto anschließende Fläche und „Schön, dass du da bist“ aus der [bevorzugten MVP-Vorschau](https://t3-build-web-akg-mvp-web-akg.noah-zepner.workers.dev/), aber mit dem Gemeindefoto statt der Kirche. Ziel: Gemeinde kennenlernen; Gottesdienste bleiben unmittelbar erreichbar.

Gestaltungsablauf: kompakte Einladung mit Gemeindefoto → Gottesdienst → Gespräche und Gemeindeleben → Begegnung/Dreimaster → tatsächliche Meldungen oder ehrlicher Quellenzustand → blauer Abschluss. Die Gebäudeliste entfällt auf der Startseite; „Orte der Begegnung“ zeigt zunächst das Café Dreimaster als eigenständiges Angebot. Für das Kirchengebäude plant der Nutzer eine eigene Website. Bis deren Ziel und Migration bestätigt sind, bleiben bestehende Unterseiten erreichbar; keine neue externe Adresse wird geraten. „Miteinander leben“ zeigt bei aktivierter Quelle drei echte Angebots-Teaser vor den historischen Gemeindefotos. `/angebote` hat Kategorien aus ChurchTools, serverseitige Suche und native aufklappbare Abschnitte. Die private lokale Sichtprüfung mit echten Daten ist bestanden; die öffentlichen Freigabeschalter bleiben geschlossen. Keine neuen aktuellen Gruppen, Personenrollen oder Termine aus den Fotos ableiten.

Desktop/Tablet: Text und Foto nebeneinander in zwei gleich breiten, direkt anschließenden Spalten auf hellblauem Grund, ohne Fotoüberlagerung oder Scrim. Der Hero reicht bis zu den Außenkanten; sein Text bleibt auf der gemeinsamen Inhaltskante. Mobil: Einladung/CTAs vor dem verkleinerten Querformat; DOM-, Lese- und Fokusreihenfolge stimmen überein. Zwei historische Gemeindefotos bilden eine versetzte Galerie, das Caféfoto begleitet den externen Übergang. Alle vier Fotos werden proportional und ohne zusätzlichen Ausschnitt gezeigt.

## Marke, Medien und Quellen

[brand-spec.md](brand-spec.md) dokumentiert die vier neuen Bestandsfotos aus akg-kiel.de und die vorhandenen Commons-Gebäudefotos getrennt: Herkunft, bekannte Credits, Bearbeitung und offene Rechte-/Personenfreigaben. Die konkrete Auslieferungsfreigabe des Nutzers für Vorschau und Produktivbetrieb ist oben dokumentiert; daraus wird keine neue offene Lizenz abgeleitet. Historische Fotos sind entsprechend beschriftet. Quellen-/gegebenenfalls Lizenzlinks bleiben auch im Bildbetrachter erhalten. Keine externen Ressourcen, Hotlinks oder Embeds.

Die früher gesichteten Mobbin-Referenzen bleiben Kompositionsreferenzen:

- [IKEA Museum](https://mobbin.com/sites/sections/9106b15a-0086-4cfc-a085-66d514b20408): erkennbare Marke und echte Fotografie.
- [IKEA Museum Story](https://mobbin.com/sites/sections/0d9af2f7-a982-4e71-a6e4-be2dd6b6ac96): großzügige Bild-/Text-Komposition.
- Weitere Quellen und verworfene SaaS-Richtungen: [Art Direction](redesign-art-direction.md). Keine fremden Logos, Screenshots oder Personenbilder übernommen.

Planung, Draw, Baseline und Screenshots liegen lokal unter `.taste-skill/` (ignorierte Arbeitsartefakte). Der aktuelle Prüfbericht steht unter `docs/redesign-people-review.md`; `docs/redesign-taste-review.md` dokumentiert den vorherigen Architekturentwurf.

## Typografie und Flächen

Quelle: `src/styles/globals.css`.

- Figtree; Weiß `#ffffff`, Ink `#173b50`, Aktionsblau `#006c9e`, helle Fläche `#eaf3f7`.
- Fünf sichtbare Größenrollen: kleine Hinweise 14 px, Fließtext/Navigation 17 px, Einleitung 18–22 px, Abschnittstitel 28–40 px, Homepage-H1 40–60 px. Unterseiten-H1 bleibt 36–44 px.
- Seitenränder 20–32 px, Inhaltsbreite maximal 88 rem; schmale Leseabsätze behalten ihr eigenes Maß.
- Keine dekorativen Eyebrows, Hairlines, Kartenumrandungen, Schatten oder Verlaufsflächen. Der bisherige Fotografie-Scrim entfällt vollständig.
- Vollflächiges Blau im Footer; quadratische, gefüllte Buttons. Fokus: 3 px mit 5 px Abstand, auf dunklem Grund helles Gold statt Orange.

## Interaktion und Zugänglichkeit

- Genau fünf slashlose Hauptziele: Gottesdienste, Aktuelles, Angebote, Gemeinde, Kontakt.
- Native Links und `details/summary` im Dokumentfluss. Escape und Breakpoint-Fokus bleiben erhalten; keine clientseitige Routerpflicht.
- Skip-Link, ein `main`, `aria-current`, keine positiven Tabindices. Ziele grundsätzlich mindestens 44 px; Bildnachweise bleiben normale Textlinks.
- Galerie: normale Bildlinks mit progressiver Erweiterung zu `dialog.showModal()`. Beschriftung „Foto ansehen“ statt eines auf kleinen Geräten falschen Vergrößerungsversprechens.
- Dialog: proportional eingepasstes Bild, Quellenangaben, Schließen und „Bilddatei öffnen“ für browsernative Detailvergrößerung. Native Fokusbegrenzung/Escape; Fokusrückgabe zum Auslöser. Nur bei offenem Dialog wird Hintergrundscrollen gesperrt.
- Ohne JS bzw. ohne Dialogunterstützung öffnet der Link direkt die lokale große Bildvariante (1280 px bei den Bestandsfotos). Modifizierte Klicks werden nicht abgefangen.
- Einmalige Bildöffnung und kurze Bewegungen beim Eintreten in den Viewport. Inhalte sind standardmäßig sichtbar; kein Scroll-Hijacking oder Dauerloop. `prefers-reduced-motion` unterbindet Bewegung auch nach Umschaltung. Keine neue Bibliothek.
- Textvergrößerung, lange Titel und fehlende Daten dürfen wachsen; kein Text-Clipping als Ersatz für Layoutkorrektur.

## Unveränderte Daten- und Freigabegrenzen

Persönliche du-Ansprache und historische Absätze sind **redaktionelle Entwürfe**. Historische Quellen: [Recherche](redesign-content-research.md). Keine aktuellen Kontakte, Gruppen, Personen, Termine, Zugänglichkeitszusagen, Öffnungszeiten, Zahlungsdaten oder Rechtstexte erfunden.

`src/lib/content.ts` bleibt die SSR-Bridge: serverseitiges `env`, optionaler `CHURCHTOOLS_TOKEN`, `SERVICES_APPROVED === 'true'` und `GROUPS_APPROVED === 'true'`. Die Lader prüfen die Quellen bei jedem Abruf ohne Snapshot-Cache/Stale-Fallback; keine Token/Rohdaten in Props oder HTML.

`SourceState` unterscheidet disabled, empty, unavailable und stale. Warnung und Zeitstempel veralteter Daten bleiben sichtbar. Details bleiben 503 mit `Retry-After: 1800` bei unzugänglicher Quelle bzw. unbestätigter Abwesenheit; 404 nur bei bestätigter Abwesenheit. SSR-HTML bleibt `no-store`.

Gottesdienste: nur Titel/Zeit aus Kalender 2, Berlin-Zeitzone; keine erfundene Ortszuordnung. News bleiben escaped Plaintext, kein `set:html`. Gruppen werden ausschließlich serverseitig, paginiert, anonym-öffentlich und mit strengem Feldfilter geladen; keine Personen-/Mitgliedschaftsabfragen und keine WordPress-Laufzeitquelle. Näheres: [Gruppenintegration](groups-integration.md).

Alle Routen behalten Entwurfshinweis und `noindex, nofollow`; `robots.txt` lässt das Lesen dieser Vorgaben zu. Keine Sitemap. **noindex ist keine Zugriffskontrolle.** Vorschauversionen sind keine Secret-/Ressourcenisolation.

Externe Ziele bleiben zentral in `src/lib/site.ts`: Dreimaster, YouTube-Kanal, Intern/ChurchTools. Keine Programme oder Öffnungszeiten der separaten Produkte kopieren; keine unbestätigte Konzertdomain verlinken.

## Prüfung

`pnpm quality` und `pnpm test:preview` bleiben die technischen Gates. Browserregression: zwölf Routen, fünf Breiten, axe bei 390/1440 px, Tastatur, Menü ohne JS, Bilder, 200-%-Text. Ergänzt: mobile Hero-Fokusfolge, Dialog-Fokus/Escape/Schließen, axe im offenen Dialog, proportionaler Bildraum, alle drei No-JS-Bildlinks und reduzierte Bewegung einschließlich Umschaltung.

Visuelle Abnahme zusätzlich am Produktionsbuild bei 1440/768/390 px; unabhängige Kritik und tatsächliche Screenshot-Korrekturrunden. Zusätzlich wird die kompakte Hero-Geometrie überprüft; Quellencredits müssen im Dialog vollständig erhalten bleiben. Ergebnisse und offene Punkte im [aktuellen Review](redesign-people-review.md).

Nicht behauptet: authentifizierte ChurchTools-E2E-Prüfung, Safari/Firefox, physische Geräte/echte Screenreader, vollständige WCAG-Zertifizierung, Medien-/Rechtsfreigabe oder Produktionsabnahme. Kein automatischer Merge oder Produktionsdeploy.
