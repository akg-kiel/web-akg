# Taste-Redesign · AKG-127 · 2026-10-28

**Gestaltungs- und Technikreview; keine Inhalts-/Rechts-/Produktionsabnahme.** Richtung `place-carries-it`, Seed 111414565, Palette/Schrift beibehalten. Original-Logo weiterhin SHA-256 `f876966571e2cf45b5c444047eadf9fef1ecafce4ffe43471bb87dfb79e3fec9`.

Dieser Bericht dokumentiert den Architekturentwurf bis Commit `95c79dd`. Die spätere Nutzerkorrektur (kleinerer Hero, Menschen statt Gebäude) hat einen [eigenen Prüfbericht](redesign-people-review.md); die folgenden Werte gelten nicht für diese neue Fassung.

## Belegstand

Nach Wiederanlaufen der Umgebung bestanden zunächst alle 17 Tests und `pnpm quality`. Die unveränderte Baseline wurde anschließend bei 1440/768/390 px aufgenommen: `.taste-skill/before/`. Diese Ergebnisse sind keine Abnahme der danach geänderten Anwendung.

V1 wurde gebaut und an allen drei Breiten aufgenommen: `.taste-skill/v1/`. Die bestehende Browserregression (zwölf Routen, fünf Breiten, axe, Tastatur, Bilder, 200-%-Text, Menü ohne JS) bestand. Noch nicht enthalten waren die neuen Dialogtests.

| Messung                  | Vorher                    | V1                       |
| ------------------------ | ------------------------- | ------------------------ |
| Homepage-H1              | „Schön, dass du da bist.“ | „Apostel in Kiel“        |
| Desktop-H1               | 60 px, zwei Zeilen        | rund 101 px, zwei Zeilen |
| Tatsächliche Fotografien | 1                         | 4                        |
| Typgrößen Desktop        | 12 Größen                 | 5 Größen                 |
| Desktopseitenlänge       | 2,8 Screens               | 5,4 Screens              |
| Hero-Medienanteil        | 32 %                      | 82 %                     |

Die längere Seite ist eine bewusste Fotografieentscheidung, kein automatisch besseres Ergebnis. Aktuelle Gemeindebilder und praktische Besuchsinformationen fehlen weiterhin.

## ROUND 1

Seen in one second: Turm der Petruskirche und „Apostel in Kiel“.
Idea (one sentence): Die tatsächliche Kirche trägt die Einladung, statt austauschbarer Gemeindesymbole.
Live thing: Fotoansicht mit echten Bilddateien; zusätzliche Live-Meldungen nur bei verfügbarer freigegebener Quelle.
Layout words by section: hero=full-bleed / services=split / church=asymmetric-gallery / places=list-and-aside / news=compact-list / footer=colour-field.
Scores: design 6.5 · usability 7 · creativity 7 · content 7 → overall 6.0.
Caps applied: Inspector weiterhin 2 FAIL; ungleiche Außenränder; keine Bewegung in V1.
Top three problems (most visible first), each with the screenshot it shows in and the fix:

1. Portal oben/unvollständig beschnitten (`v1/desktop-page-01.jpg`, `v1/mobile-page-01.jpg`): Bildseitenverhältnis in der Galerie mit spezifischerem Selektor erhalten.
2. Tablet-Link liegt über hellem Backstein/Turm (`v1/tablet-fold.jpg`): schmalere Textspalte, gestapelte Aktionen, stärkerer neutraler Scrim.
3. Hero und Navigation beginnen auf verschiedenen linken Kanten (`v1/desktop-fold.jpg`): unbeabsichtigte Tailwind-`.container`-Maxbreite überschreiben.

V1-Inspector: zwei FAIL (Pflicht-Fotocredit als Eyebrow erkannt, still-page), vier WARN (Fototext-Hintergrundmessung, kein Video, Außenränder, zu kleine erklärende Herozeile). Lizenznachweise werden nicht entfernt oder vor dem Prüfer versteckt. Die echte Historienüberschrift wurde zu einer einleitenden Aussage innerhalb des bereits benannten Kirchenabschnitts. Keine passende lizenzierte Petruskirchen-Filmaufnahme bei Commons/Internet Archive/NASA gefunden; echte Standbilder statt beliebigem Kirchenvideo.

## Unabhängige Kritik und Korrekturen

Read-only-Review: sieben V1-Screenshots und V2-Quellstand geprüft, keine V2-Renderfreigabe.

- **P2 Fokusreihenfolge:** mobil Foto/Credits vorgezogen, im DOM aber nach den CTAs. Korrigiert durch Wegfall der CSS-Umordnung: Einladung, Aktionen, Foto/Credits bleiben in derselben visuellen und DOM-Reihenfolge.
- **P2 Bildbetrachter:** feste 70svh-Bildhöhe erzeugte Letterboxing; auf Mobilgeräten war „Vergrößern“ irreführend. Jetzt natürliches Seitenverhältnis mit maximaler Höhe, „Foto ansehen“ und direkter Bilddateilink für native Detailvergrößerung.
- **P3 Hover:** `.photo-enlarge` existierte nicht im Markup. CSS auf den vorhandenen `[data-enlarge]`-Selektor korrigiert.

Zusätzlich: tatsächliche verteilte Eingangsbewegungen, einmalige Bildöffnung, Pointer-Feedback, Reduced-Motion-Abbruch. Keine versteckten Ausgangszustände oder neuen Abhängigkeiten. Gemeinsam genutzte Eyebrows/Hairlines entfernt, ohne Daten-/Metadaten oder Fokusindikatoren zu löschen.

## ROUND 2

Seen in one second: dieselbe Kirche, jetzt mit klar lesbarer Tablet-Einladung.
Idea (one sentence): Turm, Dachstuhl und vollständiges Portal bilden eine zusammenhängende Ortsgeschichte.
Live thing: proportionaler nativer Bildbetrachter und direkter Dateilink.
Layout words by section: hero=full-bleed / services=split / church=asymmetric-gallery / places=list-and-aside / news=compact-list / footer=colour-field.
Scores: design 7 · usability 7.5 · creativity 7 · content 6 → overall 6.0.
Caps applied: zwei Inspector-FAILs dieser Zwischenfassung; keine Freigabe aus dem Code abgeleitet.
Top three problems (most visible first), each with the screenshot it shows in and the fix:

1. Schließen-Aktion läuft bei 200 % Text aus dem Dialog (gezielter Dialoglauf): Flex-Mindestbreiten begrenzen, Textumbruch erlauben; überflüssiges Schließsymbol entfernen.
2. Pflichtcredit steht zu nah am nächsten Abschnitt (`review-round/tablet-fold.jpg`): klarerer Abstand zwischen Bildnachweis und Gottesdienst, Credit selbst unverändert.
3. Bewegung wurde bei den punktuellen Inspector-Abfragen nicht zuverlässig erfasst: einmalige CSS-Animationen mit nativen Start-/Endereignissen statt kurzlebiger Web Animations; reduzierte Bewegung bleibt vollständig respektiert.

Alle sieben Screenshots unter `.taste-skill/review-round/` geöffnet. Der native Dialog führt Tab auch in die Browseroberfläche: `activeElement=BODY`, `document.hasFocus()=false`; keine Hintergrundbedienung. Der Regressionstest berücksichtigt diesen belegten Browserzustand, ohne einen eigenen Fokus-Trap einzubauen.

## ROUND 3

Seen in one second: Apostel und Petruskirche; mobil steht der nächste Schritt vor dem Foto.
Idea (one sentence): Die konkrete Architektur trägt die Gemeinde-Einladung, nicht generische Kirchenornamentik.
Live thing: drei erreichbare Fotoansichten mit Quellen und direkter Bilddatei.
Layout words by section: hero=full-bleed / services=split / church=asymmetric-gallery / places=list-and-aside / news=compact-list / footer=colour-field.
Scores: design 7.5 · usability 8 · creativity 7 · content 6 → overall 7.4.
Caps applied: Creativity höchstens 7, da das Kompositionsprinzip auch andere Ortswebsites tragen könnte; Content 6 wegen weiterhin fehlender freigegebener Besuchsinformationen. Keine offene Inspector-FAIL-Kappung.
Top three problems (most visible first), each with the screenshot it shows in and the fix:

1. Winterliche Seitenansicht ist dunkler als die übrigen Fotos (`final/desktop-page-01.jpg`): bewusst ergänzendes historisches Motiv, nicht Hero; später durch bestätigte aktuelle Gemeindefotografie ersetzen.
2. Gesperrte Termine und vorbereitete Ortsprofile begrenzen den praktischen Nutzen (`final/mobile-page-01.jpg`): nur durch fachlich bestätigte Daten zu beheben, nicht durch Designfüllung.
3. Die Architektur erzählt mehr als die Menschen der Gemeinde (`final/desktop-page-01.jpg`): keine erfundenen oder ungeklärten Personenfotos; gegebenenfalls später einwilligungsbasierte Gemeindebilder.

Damit bewusst **7,4 statt eines behaupteten Award-Niveaus**. Nach drei Gestaltungsrunden keine zusätzliche Ornament-/Polierschleife. Native Interaktion, erkennbare Marke und ehrlicher Inhalt tragen den aktuellen Entwurf.

## Prüfstand des Architekturentwurfs

- Quellformat/Lint für Anwendung und Browserskript erfolgreich.
- Taste-Quell-Lint: **0 FAIL, 0 WARN**, mit dokumentierter zulässiger Ausnahme für den neutralen Fotoscrim.
- Abschließender kombinierter Lauf auf dem vollständigen Stand: **`pnpm quality` und `pnpm test:preview` erfolgreich (Exit 0)**. 17 Tests, Format/Lint, Astro-/Worker-Build und HTTP-/Browser-Gates bestanden. Logs: `/tmp/akg-taste-handoff-quality.log`, `/tmp/akg-taste-handoff-preview.log`. Danach finaler Inspector und Dialogaufnahme erneut erfolgreich.
- Erweiterte Browserregression erfolgreich: zwölf Routen, fünf Breiten, keine axe-Befunde einschließlich geöffneter Dialoge, keine Client-Ausnahmen/Drittanbieterrequests; Fokus, Escape/Schließen, alle drei No-JS-Bildlinks, 200-%-Text einschließlich Dialog und Reduced Motion bei Start/Umschaltung bestanden.
- Inspector am Produktionsbuild bei 1440/768/390 px: **0 FAIL, 1 WARN**, 22 tatsächlich bewegte Elemente je Breite. Die einzige Warnung betrifft fehlendes Video: kein geeigneter lizenzierter Ortsclip gefunden, deshalb reale Fotos statt beliebiger Ersatzaufnahmen. Kein `--allow` verwendet.
- Alle sieben finalen Screenshots geöffnet. Rund 5,3 Desktop-Screens, vier echte Fotos plus Logo, fünf Typgrößen, keine Überschrift über zwei Zeilen. Zusätzliche Dialogaufnahmen mobil, im kurzen Querformat und mit 200 % Text geöffnet.
- Fototext-Kontrast über tatsächlichen Screenshot-Pixeln gemessen (Text während Hintergrundaufnahme ausgeblendet; gesamter Textzeilenraum konservativ geprüft), bei 390/768/1024/1440/1920 px: mindestens **5,14:1** für Fließ-/Linktext, Fokus gegen die Bildumgebung mindestens **3,72:1**. Beide Minima bei 1024 px. Kein geschätzter Kontrast gegen eine pauschale Hintergrundfarbe.
- Strukturelle Seitenränder anhand DOM-Geometrie gleich: 20 px bei 390/768, rund 23 px bei 1024, 32 px bei 1440, 256 px bei 1920.
- Natürliche Galerieproportionen werden ausdrücklich vor dem Laden reserviert; Regression blockiert die Portaldatei und prüft trotzdem dessen 2:3-Fläche. Kein Wegfall der intrinsischen Fläche durch pauschales `aspect-ratio: auto`.

Belege lokal: `.taste-skill/final/`, `/tmp/akg-taste-final-contrast.log`, `/tmp/akg-taste-final-dialog.log`, `/tmp/akg-taste-last-browser.log`. Inspector zuletzt mit vorhandenem Chromium Headless Shell 156 statt dem langsamer startenden vollständigen Chrome-Binary; kein Toolpatch und keine zusätzliche Installation.

## Offene Abnahme

Gestalterische Nutzerabnahme bleibt erforderlich. Offene fachliche Informationen sind kein technischer Platzhalter, den die Gestaltung erfinden darf.

Projektbezogene Medien-/Text-/Rechtsfreigabe, echte ChurchTools-E2E-Daten, Safari/Firefox und reale Assistenztechnik bleiben separat offen. Keine Veröffentlichung, kein Commit/Push/Deployment, keine Änderung an Cloudflare-Triggern.
