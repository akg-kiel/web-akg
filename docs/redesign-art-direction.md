# Design Critique: AKG-MVP und verbindliche Redesign-Richtung

Design-Handoff · 2026-10-26 · **Konzept, keine Inhalts- oder Launchfreigabe.**

## Verdict

Die bisherige Seite wirkt wie ein generisches Editorial-Template über einem Freigabeprotokoll. Ihr stärkster Blickfang ist kein Gemeindeleben, sondern ein gesperrter Datenblock; die erfundene Wortmarke beseitigt zugleich die vorhandene Identität. Entscheidend ist nicht mehr Dekoration, sondern diese Reihenfolge: **originale AKG erkennen → willkommen sein → einen konkreten nächsten Schritt finden.**

- **Smoke Test:** Nicht ausgeführt; ausschließlich vorhandene Screenshots und Quellcode, wie beauftragt. Keine Builds, Server oder Previews.
- **AI-Slop Risk:** Moderate im engeren Fingerprint-Raster; deutliches generisches Editorial-Muster und gravierendes Identitäts-/Inhaltsproblem. Nicht der übliche Gradient-/Glasmorphism-/SaaS-Karten-Fall.
- **Execution:** Präzise Laufzeitmessung nicht durchgeführt. Die Bilder zeigen kein offensichtliches Layout-Chaos; das ist kein Nachweis für fehlerfreie Geometrie oder Bedienung.
- **Spec Conformance:** Stark gegenüber dem bisherigen `docs/design.md`; schlecht gegenüber dem ausdrücklich geänderten Nutzerauftrag. Das alte Dokument beschreibt gerade die nun verworfene Georgia/Papier/Teal-Richtung.
- **Findings:** 7 — P0: 1 · P1: 4 · P2: 2 · P3: 0. Stärken separat.
- **Verified:** `/tmp/akg-home-1440.png` und `/tmp/akg-home-390.png` visuell gelesen; Quellcode von Startseite, CSS, Header, Footer, Layout, Quellzuständen, Routendaten und statischen/Listen-Unterseiten gelesen. Die Bilder zeigen das **vorherige MVP**, nicht die historische WordPress-Seite. Keine Aussage zur Echtheit des historischen Logos aus diesen Bildern.

### Auftrag und Quellenrahmen

- AKG-56 und AKG-62 einschließlich Akzeptanzkriterien und Kommentaren gelesen; beide gehören zu **Website AKG**. AKG-56: Meilenstein „2 · Technisches Fundament“; AKG-62: „3 · MVP: Kernwebsite“. Beide Meilensteinbeschreibungen gelesen. Der neue AKG-56-Kommentar hält Ablehnung des ersten Designs und Erhalt des Original-Logos ausdrücklich fest.
- Gelesen: `design-better-websites/SKILL.md`, `ui-design-critique/SKILL.md` sowie `ai-slop-detection.md`, `critique-dimensions.md`, `precision-audit.md`, `design-md-spec.md`. Die im ersten Skill referenzierte Datei `references/source-map.md` fehlt in der Installation.
- Berücksichtigt: `docs/design.md`, `docs/mvp-status.md`, `docs/migration/README.md`, relevante Freigabe-/Feldregeln aus `docs/content-models.md`.
- Logo-/Asset-Recherche gehört dem separaten Content-Researcher. Hier wurden keine Originalassets gesucht, heruntergeladen, nachgebaut oder freigegeben. Linear-Änderungen und Umsetzung bleiben beim Hauptagenten; der Arbeitsstart wurde dort bereits dokumentiert.

## Findings

### P0 — Critical

#### [F-01] Identität durch erfundene Wortmarke ersetzt · Inconsistency

- **Dimension:** Emotional Resonance / Brand.
- **Location:** `Header.astro` `.wordmark-initials`; `Footer.astro` `.footer-wordmark`; vorgeschaltete Favicon-Prüfung nötig.
- **Issue:** Das gesetzte `akg.` ist nicht das verlangte Original-Logo.
- **Impact:** Wiedererkennung und authentische Verbindung zur bestehenden Gemeinde fehlen unabhängig von typografischer Qualität.
- **Evidence:** Beide Komponenten schreiben `akg<span>.</span>` direkt in HTML. Nutzer fordert ausdrücklich das Original.
- **Recommendation:** Vom Asset-Verantwortlichen identifiziertes Original unverändert verwenden. Keine Nachzeichnung, kein Recoloring, kein CSS-Filter, keine neue Initialenmarke. Originalproportionen und gegebenenfalls vorhandene Wortbestandteile erhalten. Das bisherige Favicon darf nicht als Nebenweg der erfundenen Marke bleiben.

### P1 — High

#### [F-02] Der größte Kontrast gehört einer fehlenden Information · Gap

- **Dimension:** Visual Hierarchy / States.
- **Location:** Startseite `.next-service` und nachfolgende `.news-section`.
- **Issue:** Der dunkle Hero-Block verspricht „Der nächste Gottesdienst“, enthält aber keinen Termin. Danach folgt eine weitere große Ausfallfläche.
- **Impact:** Der erste Eindruck lautet „hier geht gerade nichts“; auf Mobil folgen mehrere Bildschirmabschnitte ohne neue positive Information.
- **Evidence:** Beide vorhandenen Screenshots zeigen „Termine noch nicht freigegeben“ im dominanten Block und darunter „Meldungen gerade nicht erreichbar“. `index.astro` rendert die volle Hero-Hülle unabhängig vom Zustand.
- **Recommendation:** Vollwertigen nächsten Termin nur bei vorhandenen freigegebenen Daten hervorheben. Im gesperrten Zustand kompakte, gut lesbare lokale Statuszeile statt leerem Monument. Unabhängigen Gemeinde-Einstieg davor behalten; keine Fehlermeldung verstecken oder als „keine Termine“ umdeuten.

#### [F-03] Kein belastbarer Fortschritt zum ersten Besuch · Gap

- **Dimension:** Information Architecture / Emotional Resonance.
- **Location:** Hero, `/gemeinde`, `/kontakt`, Ortsseiten in `[page].astro`.
- **Issue:** Praktische Ziele führen überwiegend zu Bearbeitungsständen. Es gibt weder ein Bild eines realen Ortes noch bestätigte Ankunfts-/Kontaktinformationen.
- **Impact:** Besuchsunsicherheit wird nicht kleiner. Mehr freundliche Überschriften allein lösen diese Inhaltslücke nicht.
- **Evidence:** Die Kontaktseite hat keine Kontaktmöglichkeit; Ortsseiten haben keine bestätigte Adresse. Kalender 2 darf derzeit nur Titel und Zeit liefern. Der Hero enthält kein Bild.
- **Recommendation:** Vorläufig ehrlich „Gemeinde kennenlernen“ statt eine vollständige Besuchsplanung versprechen. Für die tatsächliche Besuchsreise zuerst ein bestätigtes Ortsprofil und einen öffentlichen Kontaktweg beschaffen. Keine Adresse anhand des Termintitels zuordnen. Die Freigaben sind eine echte Lieferabhängigkeit, kein Anlass für erfundene Details.

#### [F-04] Interne Produktionssprache wird zur Gemeindebotschaft · Inconsistency

- **Dimension:** Microcopy / User Intent.
- **Location:** `.hero-intro`, `.route-link p`, `.other-products-content`, `.editorial-note` auf Unterseiten.
- **Issue:** „Zum Bearbeitungsstand der Kontaktinformationen“, „Ihre Inhalte werden hier nicht doppelt gepflegt“ und „Was noch fehlt“ erklären das Projekt statt dem Gast zu helfen.
- **Impact:** Die Gemeinde erscheint als unvollständiges Softwaresystem statt als reale Gemeinschaft. Die Trennung der Produkte ist richtig, ihre Datenpflege ist kein Besuchervorteil.
- **Evidence:** Wortlaut in `index.astro`, `[page].astro`, `angebote.astro`; deutlicher Gegensatz zum neuen Einladungsauftrag.
- **Recommendation:** Globalen Vorschauhinweis behalten; technische Begründungen ins vorhandene Statusdokument verlagern. Im Seiteninhalt jeweils nur die konkrete fehlende Besucherinformation benennen. Externe Links mit Ziel und Nutzen beschriften, nicht mit Architekturbegründungen.

#### [F-05] Editorial-Gesten ohne redaktionelle Substanz · Suggestion

- **Dimension:** AI Slop / Typography / Composition.
- **Location:** `globals.css` Display-/Farbrollen; `index.astro` `<em>`, `.panel-top`, `.route-grid`, `.other-products`.
- **Issue:** Große Georgia, Teal auf cremefarbenem Grund, kursiv eingefärbte Schlusswörter, gesperrte Versalien, `01 /` und nummerierte Dreierspalten simulieren eine gestaltete Magazinseite. Tatsächlich enthalten sie fast nur Links und Zustandsmeldungen.
- **Impact:** Die Gestaltung ist austauschbar und größer als ihr Inhalt. Keine dieser Techniken ist isoliert falsch; ihre Kombination passt hier nicht zur vorhandenen Identität und Aufgabe.
- **Evidence:** `.hero h1` verwendet `clamp(3.3rem, 6.3vw, 6.4rem)` und `-0.045em`; `.eyebrow` 0.7rem mit 0.12em Tracking; `.route-grid` drei gleiche Spalten. `Eigenständig. Und verbunden.` erhält einen großen zweiteiligen Display-Titel für einen externen Link.
- **Recommendation:** Eine humanistische Sans mit kräftiger, aber maßvoller Hierarchie; reale Bild-/Inhaltsbelege statt Kursivdramaturgie. Dekorative Nummern entfernen. Unterschiedliche Inhaltsaufgaben unterschiedlich komponieren. Dies ist ein begründeter Richtungswechsel, kein behaupteter CSS-Konformitätsfehler.

### P2 — Medium

#### [F-06] Interne Links sehen wie externe Übergänge aus · Inconsistency

- **Dimension:** Discoverability / Affordance.
- **Location:** Hero „Zum Kontakt“, `.route-arrow`, Ortslinks.
- **Issue:** `↗` markiert interne und externe Ziele zugleich.
- **Impact:** Die gewünschte Erkennbarkeit externer Angebote wird abgeschwächt.
- **Evidence:** `/kontakt` und interne Bereichskacheln verwenden denselben Richtungshinweis wie externe Ziele.
- **Recommendation:** Interne Textlinks regulär unterstreichen; gegebenenfalls `→`. `extern ↗` ausschließlich für echte externe Ziele, weiterhin im selben Tab.

#### [F-07] Mobiler Footer ist unverhältnismäßig groß · Suggestion

- **Dimension:** Composition / Density.
- **Location:** `.footer-columns`, Breakpoint unter 25rem.
- **Issue:** Vier vollständig aufeinanderfolgende Navigationsgruppen plus eigene große Wortmarke erzeugen einen sehr langen Abschluss einer inhaltsarmen Seite.
- **Impact:** Die ohnehin lange Mobilseite endet wie eine Sitemap, nicht mit einem hilfreichen nächsten Schritt.
- **Evidence:** Screenshot 390 px; CSS schaltet unter 400 px von zwei Spalten auf eine und verwendet weiterhin 44px-Linkziele und große Gruppenabstände. Keine exakte Laufzeithöhe gemessen.
- **Recommendation:** Ab ausreichender Inhaltsbreite zwei schlichte Linkgruppen nebeneinander; Rechtliches als eigene kurze Abschlusszeile. Bei 320 px und Vergrößerung nach Inhalt umbrechen. Bedienflächen nicht verkleinern, keine Akkordeons als platzsparenden Ersatz einführen.

### P3 — Low

Keine weiteren belastbaren Befunde.

## What Looks Good (Strengths)

- **Safety / States:** Unterschied zwischen disabled, empty, unavailable und stale existiert; keine erfundenen Termine, Menschen oder Ortsangaben. Beibehalten.
- **Semantics:** Fünf nachvollziehbare Hauptziele, echte Links, `details/summary`, Skip-Link und `aria-current` sind im Code vorhanden. Kein Anlass für ein neues Navigationsframework.
- **Accessibility intent:** Quellcode enthält sichtbare Fokuszustände und großzügige Bedienflächen; keine erzwungene Animation. Die früheren erfolgreichen Tests sind dokumentiert, wurden hier aber nicht wiederholt.
- **Privacy:** Kein eingebetteter Livestream, keine Karten-/Tracking-Bibliothek, keine externen Fonts. Produktgrenzen sind klar.
- **Responsive structure:** Einspaltige mobile Reihenfolge ist grundsätzlich verständlich. Neu komponieren, nicht die technischen Grundlagen wegwerfen.

## Spec Conformance

| Regel          | Bisheriges `docs/design.md`                     | Beobachtung                        | Bewertung                                                |
| -------------- | ----------------------------------------------- | ---------------------------------- | -------------------------------------------------------- |
| Farbe          | Papier `#f6f3ec`, Ink `#173e4b`, Teal `#235650` | Entspricht CSS/Bildwirkung         | Konform, aber Richtung abgelehnt                         |
| Schrift        | Georgia + System-Sans                           | Entspricht CSS                     | Konform, aber Richtung abgelehnt                         |
| Identität      | Typografischer Vorschauentwurf                  | Erfundenes `akg.` im Header/Footer | Alter Vertrag erfüllt; neuer expliziter Auftrag verletzt |
| Navigation     | Genau fünf Ziele                                | In `site.ts` und Header vorhanden  | Beibehalten                                              |
| Vorschau       | Kennzeichnung, noindex/nofollow                 | In `Layout.astro` vorhanden        | Unverändert bewahren                                     |
| Inhaltsgrenzen | Keine ungeprüften Fakten                        | Leere/gesperrte Zustände           | Richtig; Präsentation muss sich ändern                   |

### Vollständiger AI-Fingerprint-Abgleich

| Fingerprint                          | Befund                                                                                                                                       |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| AI-Farbpalette                       | Teiltreffer: generisches Creme/Teal-Editorial; kein unverändertes Indigo-Tailwind                                                            |
| Gradient text                        | Nicht vorhanden                                                                                                                              |
| Dark mode + glow                     | Nicht vorhanden; dunkle Fläche allein ist kein Glow                                                                                          |
| Glassmorphism                        | Nicht vorhanden                                                                                                                              |
| Hero metric row                      | Nicht vorhanden; `01 /` ist Dekoration, keine erfundene Kennzahl                                                                             |
| Identical card grid                  | Teiltreffer: drei gleichgewichtete Bereichszellen, allerdings ohne typische Kartencontainer                                                  |
| Generic type                         | Treffer: verbreitete System-Sans/Georgia-Kombination ohne AKG-spezifischen Bezug                                                             |
| Emoji as icons                       | Nicht vorhanden                                                                                                                              |
| Rounded + shadow + border everywhere | Nicht vorhanden                                                                                                                              |
| Everything centered                  | Nicht vorhanden; überwiegend sinnvoll linksbündig                                                                                            |
| Gradient blobs / mesh                | Nicht vorhanden                                                                                                                              |
| Gradient CTA + generic copy          | Kein Gradient; Labels benennen zumindest konkrete Ziele                                                                                      |
| Decorative bento grid                | Nicht vorhanden                                                                                                                              |
| Uniform spacing, no rhythm           | Kein durchgehender Treffer: Gruppierungsabstände existieren. Problem ist zu viel Raum für zu wenig Inhalt, nicht identische Abstände überall |
| Fake social proof                    | Nicht vorhanden                                                                                                                              |
| Icon-in-circle rows                  | Nicht vorhanden                                                                                                                              |

Zusätzlicher lokaler Befund außerhalb der Liste: die Kombination aus kursiven Schlusswörtern, Kapitelnummern und bedeutungsarmen Großüberschriften. Den tatsächlichen Fehler benennen, nicht passende SaaS-Sünden dazuerfinden.

## Top 3 Actions

1. Original-Logo zurückbringen und die Bild-/Inhaltsbelege der wirklichen Gemeinde priorisieren.
2. Hero vom Quellenstatus entkoppeln; Hinweise verkleinern, aber sichtbar und semantisch ehrlich halten.
3. Eine klare Sans-/Weiß-/Oxidrot-Richtung mit konkreten Besuchswegen umsetzen und unabhängig in gesperrtem **und** freigegebenem Zustand prüfen.

---

## Eine Richtung: „Gemeinde vor Ort“

**Ein persönlicher, klarer Gemeindeeingang – kein Lifestyle-Magazin, kein Event-Shop.** Helles Weiß, lesbare humanistische Schrift, das echte Logo und nach Freigabe eine dokumentarische Aufnahme des wirklichen Ortes. Wärme kommt aus Ton, Nähe und Fotografie, nicht aus einem beigefarbenen Filter. Die Gestaltung ist sachlich genug für jemanden, der nur einen Gottesdienst sucht, und freundlich genug für jemanden, der noch nie hier war.

Nicht mischen mit einer zweiten Richtung. Keine große Serif, keine kursiven Pointe-Wörter, kein Teal, keine Kapitelnummern, keine dekorativen Siegel, Blobflächen, Schattenkarten oder rotierenden Bilder.

### Drei tatsächlich visuell geprüfte Mobbin-Präzedenzfälle

Die folgenden verlinkten Abbildungen wurden in den Tool-Ergebnissen betrachtet. Es sind **Kompositions-/Besuchsmuster**, keine Assets zur Übernahme; keine Mobbin-Bilder in die AKG-App kopieren.

1. **[IKEA Museum: Personenbezogener Kultur-Einstieg](https://mobbin.com/sites/sections/0d9af2f7-a982-4e71-a6e4-be2dd6b6ac96).** Sichtbar: kurzer kräftiger Sans-Titel links, große Aufnahme zweier Personen rechts, deutlich mehr Fläche für das Bild als für Erklärungen. Übernehmen: eine konkrete Geschichte/ein wirklicher Ort trägt den Einstieg; Text und Bild bleiben getrennt lesbar. Nicht übernehmen: das große grüne Markenrechteck, Schwarzweiß als Pflichtstil oder fremde Personen. Für AKG nur nach Bild-/Einwilligungsfreigabe; sonst Ortsaufnahme statt Menschen.
2. **[KOBU: Innit Lombok, Hotelvorstellung](https://mobbin.com/sites/sections/79b3c5a4-83c8-46f4-a63a-fcd4697964cd).** Sichtbar: großzügige reale Architekturaufnahme rechts, Ortszeile, klarer Name und kurzer Text links, ein unaufgeregter Text-CTA. Übernehmen: Bild als Beleg eines wirklichen Ortes und klare räumliche Trennung statt Text auf Fotografie. Nicht übernehmen: Luxus-Rhetorik, den sehr großen Leerraum oberhalb des Titels oder Buchungslogik. AKG-Einstieg kürzer und weniger distanziert.
3. **[Airbnb: „Where we’ll meet“ auf einer Erlebnis-Seite](https://mobbin.com/screens/8d69679c-8e01-484e-b531-e9ed77a81615).** Sichtbar: Treffpunktinformation direkt über der Karte, darunter Vorstellung der verantwortlichen Person; Termine daneben als eigener Bereich. Übernehmen: die Reihenfolge der Besucherfragen – wo, wann, wer hilft. Nicht übernehmen: Kartenembed, Buchungskarte, Verfügbarkeitspreise, Personenboxen ohne Freigabe. AKG kann dieselbe praktische Klarheit mit Adresse als Text und bestätigtem Kontakt erreichen.

Die Suche lieferte auch unpassende Software-/Marktplatz-Beispiele; diese sind ausdrücklich keine Designvorlage. Insbesondere kein Hospitality-SaaS-Stil nur deshalb, weil die Suchanfrage „Hotel“ enthielt.

### Logo und Bildsprache

- Das **Original-Logo** ist unverhandelbar. Auf weißem Grund, vollständig, mit proportionaler Skalierung und freier Umgebung. Keine Anpassung seiner Farben an die neue Palette. Konkrete Mindestgröße erst am gelieferten Original anhand der Wortbestandteile festlegen; vorläufiger Header-Slot maximal 240 × 64 px Desktop und 200 × 56 px Mobil, ohne Verzerrung oder Abschneiden. Wenn die Lesbarkeit mehr Höhe braucht, wächst der Header.
- Hat das Original schon einen lesbaren Gemeindenamen, keinen zweiten Namen dicht daneben stapeln. Sonst außerhalb des Bildes eine schlichte Textzeile ergänzen. Verlinktes Logo erhält einen eindeutigen zugänglichen Startseiten-Namen.
- Ein Bild im ersten Bereich, nicht fünf kleine Fotos. Motivpriorität: wiedererkennbarer tatsächlicher Eingang/Innenraum; alternativ ungezwungenes Gemeindegeschehen nur mit passender Einwilligung. Natürliche Farbe, keine künstliche Sepia-Stimmung, keine erfundene „offene Tür“ als Sachbehauptung.
- Personen und relevante Architektur nicht an Köpfen/Türen wegschneiden. Desktop ca. 5:4, Mobil ca. 3:2 nur, wenn das konkrete Motiv diese Ausschnitte erlaubt; andernfalls Originalverhältnis. Immer dimensionsstabil.
- **Keine freigegebene Fotografie:** Bildslot komplett weglassen und den Einstieg kompakter setzen. Keine graue Platzhalterbox, kein Stock-Kirchenbild, keine KI-Gemeindeszene, keine ausgedachte Illustration als Beweis. Dieser ehrliche Minimalzustand ist prüfbar, aber nicht die abschließende Bildabnahme der Homepage.

### Typografie: eine Familie, klare Rollen

Vorschlag: **Source Sans 3**, lokal gehostet, Regular und Semibold. Humanistischer, alltagstauglicher Ton statt eleganter Display-Schrift. Der Asset-/Implementierungsverantwortliche prüft vor Aufnahme konkrete Fontdatei, Lizenz, Umlaute/ß und Ladebudget; diese Recherche wurde hier nicht dupliziert. Bis dahin System-Sans-Fallback, keine externen Fontrequests. Keine zweite Familie nur für dekorative Abwechslung.

| Rolle                        | Desktop          | Mobil            | Regeln                                                    |
| ---------------------------- | ---------------- | ---------------- | --------------------------------------------------------- |
| H1 Startseite                | 56px / 1.08, 600 | 36px / 1.12, 600 | Max. 60px; kein erzwungenes `<br>` zur Desktopkomposition |
| H1 Unterseiten               | 44px / 1.12, 600 | 32px / 1.15, 600 | Seitenthema statt Werbeslogan                             |
| H2                           | 30px / 1.2, 600  | 26px / 1.2, 600  | Keine Kursivvarianten                                     |
| H3                           | 22px / 1.3, 600  | 22px / 1.3, 600  | Konkret benennen                                          |
| Fließtext                    | 18px / 1.55, 400 | 18px / 1.55, 400 | 50–65ch, normale Laufweite                                |
| Navigation / CTA             | 16px / 1.35, 600 | 16px / 1.35, 600 | Mind. 44px, primär 48px Bedienhöhe                        |
| Datum / Bildlegende / Status | 15px / 1.45, 400 | 15px / 1.45, 400 | Nicht als schwer lesbare Kleinstschrift tarnen            |

In rem umsetzen, Vergrößerung zulassen. Keine Versalien über jedem Abschnitt. Gemeindenamen nicht mit `overflow-wrap:anywhere` unnötig zerstückeln; Zeilenumbruch und deutsche Spracheinstellungen am echten Font testen.

### Palette: weißer Grund, dunkler Text, ein warmer Aktionsakzent

Dies ist ein **UI-Palettenvorschlag**, keine Behauptung über historische AKG-Markenfarben. Das Original-Logo bleibt farblich unabhängig und unverändert.

| Rolle                 | Wert      | Verwendung                                                     |
| --------------------- | --------- | -------------------------------------------------------------- |
| Grund                 | `#FFFFFF` | Hauptfläche, Logo-Hintergrund                                  |
| Ruhige Fläche         | `#F1F2F0` | Eine praktische Informationszone, nicht abwechselnd jedes Band |
| Text                  | `#222A2A` | Überschriften, Fließtext                                       |
| Sekundärtext          | `#515B58` | Datum, Bildlegende, ergänzende Hinweise                        |
| Aktion                | `#8B3431` | Primärer Link/Button; warmes Oxidrot                           |
| Hover                 | `#702A28` | Gleiche Aktion bei Hover; kein neuer Akzent                    |
| Dekorative Trennlinie | `#D7DCD7` | Nur unterstützende Linien, keine notwendige Bediengrenze       |
| Fokus                 | `#174B7A` | 3px-Ring mit Abstand auf hellen Flächen                        |

Kontrast rechnerisch mit sRGB-Luminanz geprüft: Text/Weiß **14,66:1**, Sekundärtext/Weiß **7,03:1**, Aktion/Weiß **7,97:1**; auf ruhiger Fläche **13,05 / 6,26 / 7,10:1**. Fokus/Weiß **9,04:1**. Das ersetzt keine Prüfung der tatsächlich gerenderten Zustände. Die helle Trennlinie nicht für erforderliche 3:1-Control-Grenzen verwenden.

Weißer Buttontext auf Oxidrot; 3px Eckenradius, keine Pillen, kein Schatten. Links unterstrichen. Kein roter Hintergrund für jeden Abschnitt, keine Rot-/Grün-Zustandskodierung ohne Text. Footer ebenfalls hell statt einer zweiten riesigen dunklen Bühne.

### Komposition und Rhythmus

- Maximal 1184px Inhaltsbreite; Desktop 32px innere Spaltengassen, Mobil 20px Seitenrand, bei 320px 16px. Inhalt bestimmt Breakpoints, nicht Gerätekategorien.
- Raster als Gestaltungsregel: 12 Desktopspalten, 4 mobil; Umsetzung darf normales Grid/Flex sein. Kein neues Grid-System nötig.
- Abstände: 8 / 16 / 24 / 32 / 48 / 72px. Abschnittstrennung 72px Desktop / 48px Mobil, zusammengehörige Textgruppen 8–16px. Nicht jedem Absatz eine eigene Sektion geben.
- Homepage-Einstieg Desktop: ca. 5 Spalten Text + 7 Spalten Bild, gemeinsame obere Kante. Nicht die alte 1:1-Aufteilung mit einem nun anders eingefärbten Statuspanel wiederholen.
- Mobil: Identität → H1 → kurze Einladung → Hauptlink → Bild, falls freigegeben → nächste nützliche Information. Keine visuelle CSS-Umsortierung gegen die DOM-/Lesereihenfolge.
- Keine feste Hero-Höhe, keine Textüberlagerung auf Bild, kein Carousel, keine automatische Bewegung. Fotos tragen Realität, nicht Animation.
- Footer: Original-Logo bzw. einfache Namenszeile, zwei kompakte Linkgruppen, sichtbare Rechtslinks und Vorschaukennzeichnung. Keine neue erfundene Signatur.

## Seitenhierarchie und erster Besuch

Fünf Hauptziele bleiben: **Gottesdienste · Aktuelles · Angebote · Gemeinde · Kontakt**. Keine neue Route `/neu-hier` und keine neue Navigationsebene für diesen Entwurf. „Zum ersten Mal hier?“ ist bei freigegebenem Inhalt ein Abschnitt innerhalb der bestehenden Gemeinde-/Gottesdienstseite, kein leeres Sprungziel.

### Startseite – festgelegte Reihenfolge

1. **Schmaler Vorschauhinweis, dann echter Header.** Die Vorschau bleibt eindeutig; Rechtsfreigabe wird nicht durch freundlichere Gestaltung suggeriert.
2. **Persönlicher Einstieg.** Vollständiger Name „Apostel-Kirchengemeinde Kiel“ in normal lesbarer Schrift. Vorgeschlagene Entwurfs-H1: **„Schön, dass Sie da sind.“** Ein kurzer Satz führt zu den vorhandenen Bereichen; keine unbelegte Aussage über Öffnungszeiten, Offenheit eines Gebäudes oder Teilnahmebedingungen.
3. **Ein dominanter nächster Schritt.** Bei vorhandenem freigegebenem kommenden Termin: „Gottesdienste ansehen“ → `/gottesdienste`. Ohne Termin: „Gemeinde kennenlernen“ → `/gemeinde`; dort müssen die vorhandenen Ortsnamen unmittelbar sichtbar sein. Ein sekundärer Textlink zur jeweils anderen Route reicht. Kontakt bleibt erreichbar, wird ohne Kontaktweg aber nicht als Hilfeversprechen beworben.
4. **Gottesdienste kompakt.** Bei Daten: Datum/Zeit, Titel, Link; keine selbst erfundene Ortszuordnung. Bei geschlossenem Gate/Ausfall: kurze sichtbare Zustandsinformation mit `/gottesdienste`-Link, keine dunkle Hero-Fläche und kein leerer Platz für einen Termin.
5. **Gemeinde und Orte.** Ein inhaltlicher Abschnitt statt drei gleicher Bereichskacheln. Aktuell belastbar: Petruskirche, Gemeindehaus Mitte, Gemeindehaus Wik als schlichte Linkliste zu den vorhandenen Ortsseiten. Freigegebener Rahmenabsatz und eine Ortsaufnahme können diesen Abschnitt später inhaltlich tragen. Kein „Anfahrt planen“, solange Adressen fehlen.
6. **Aktuelles, nur so groß wie der Inhalt.** Bei freigegebenen Meldungen ein führender Textbeitrag plus höchstens zwei weitere Titel/Datum-Zeilen. Keine Bildpflicht, keine erfundenen Auszüge. Ohne Daten nur eine knappe lokale Statuszeile und der echte Archiv-/Listenweg, keine leere große Nachrichtensektion.
7. **Verbunden, aber eigenständig.** Kleine Textzone für Café Dreimaster und später das bestätigte Konzertziel. Nutzenorientiert: „Zum Café Dreimaster“ und nach Zielbestätigung „Zum Konzertprogramm“. Ohne erreichbare Konzertdomain keine Schaltfläche. Keine kopierten Programme oder Öffnungszeiten. YouTube als Kanal-Link, nicht als angeblich laufender Stream.
8. **Kompakter Footer.** Kein weiterer Marketingabschluss und keine vierte Erläuterung des Bearbeitungsstands.

### Besuchsreise: zwei klar getrennte Lieferstände

**Mit den aktuell geschlossenen Gates:**

`Startseite → Gemeinde kennenlernen → benannte Ortsseiten / Gottesdienste → sichtbare Information, was noch nicht angegeben werden kann`.

Das ist eine ehrliche Orientierungsreise, **noch keine abgeschlossene Besuchsplanung**. Der Entwurf darf sie nicht als solche verkaufen. Wiedererkennung, lesbare Einladung, konkrete bekannte Ortsnamen und echte externe Übergänge schaffen trotzdem Nähe. Menschen werden nicht erst mit dem internen Freigabeprozess begrüßt.

**Nach den erforderlichen Freigaben:**

`Startseite → Gottesdienst mit bestätigter Zeit → bestätigter Veranstaltungsort → Ankunftsinformation → bei Bedarf freigegebener Kontaktweg`.

Jede Station muss die Frage beantworten, die als Nächstes entsteht. Freigegebene Dauerinformationen eines Orts sind kein Beleg, dass ein bestimmter Gottesdienst dort stattfindet: Diese Verbindung benötigt eine eigene bestätigte Quelle. Teilnahmebedingungen, Kinderangebote, liturgischer Ablauf und Zugänglichkeit werden nur genannt, wenn sie tatsächlich bestätigt sind.

## Konkrete Unterseiten statt aufgeblähter Platzhalter

„Mehr Inhalt“ heißt mehr beantwortete Besucherfragen, nicht mehr Wörter über fehlende Freigaben. Keine Inhalte aus WordPress nach Gefühl aktualisieren. Statische freigegebene Rahmentexte ins Repository; laufende News, Angebote und Person-Rollen-Daten bleiben bei ihrer vereinbarten ChurchTools-Quelle.

| Route                                                       | Jetzt sinnvoll und erlaubt                                                                                                                        | Konkreter Inhalt nach Freigabe                                                                                                                                   | Primärer nächster Schritt                                                            |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `/gemeinde`                                                 | Gemeinde beim Namen nennen, drei benannte Ortslinks, wirkliche verfügbare externe Verbindungen; kurzer vorgeschlagener Einladungstext als Entwurf | 80–140 Wörter eigene Vorstellung/Leitbild in freigegebener Sprache; ausgewählte Geschichte nur bei relevantem Besuchernutzen                                     | Einen Ort ansehen; nicht durch interne Checklisten navigieren                        |
| `/petruskirche`, `/gemeindehaus-mitte`, `/gemeindehaus-wik` | Name als H1; deutlich sagen, dass praktische Angaben noch fehlen; Rückweg zur Gemeinde                                                            | Je Ort: echte Außen-/Eingangsaufnahme, kurze Beschreibung, bestätigte Adresse, konkret beschriebener Zugang, Anfahrt und öffentlicher Kontakt, falls freigegeben | Adresse/Ankunft lesen, dann gegebenenfalls Kontakt nutzen                            |
| `/gottesdienste`                                            | Titel/Zeit aus freigegebener Quelle oder präziser Zustand; geprüfter YouTube-Kanal als Alternative zum Weiterlesen                                | Bestätigter kurzer „Zum ersten Mal“-Abschnitt; Format, Ort und Teilnahmefragen erst nach Freigabe                                                                | Einen Termin öffnen; keine erfundene „jeden Sonntag“-Regel                           |
| `/gottesdienste/[id]`                                       | Titel, Datum/Zeit, Quellenzustand, Rücklink                                                                                                       | Bestätigte konkrete Orts-/Ankunftszuordnung, sobald erlaubt                                                                                                      | Praktische Besuchsfrage klären; bis dahin fehlenden Ort ausdrücklich nicht erraten   |
| `/aktuelles` und `/aktuelles/[id]`                          | Freigegebene Titel/Datum/Plaintext; respektierte Leer-/Ausfallzustände                                                                            | Weiterhin dieselbe einzige Quelle; Bilder erst nach Rechte-/Alttextprüfung                                                                                       | Meldung lesen, zurück zur Liste; keine lokale WordPress-News-Kopie                   |
| `/angebote`                                                 | Knappes ehrliches Sperrstatement; vorhandene Orientierung zu Gemeinde/Gottesdiensten; keine Fantasie-Kategorien                                   | Freigegebene Gruppen mit wirklichem Namen, Beschreibung und vorhandenen Treffinformationen; optionale Felder wirklich optional                                   | Vorhandenen öffentlichen Gruppenweg nutzen, keine abgeleiteten persönlichen Kontakte |
| `/kontakt`                                                  | „Kontaktangaben sind in dieser Vorschau noch nicht verfügbar.“; keine versprochene Anfragefunktion                                                | Ein bestätigter allgemeiner Kontakt zuerst, dann Büroanschrift/-zeiten und tatsächlich bestätigte Zuständigkeiten                                                | Direkt anrufen/schreiben, sofern freigegeben; kein unnötiges Kontaktformular         |
| `/spenden`                                                  | Kurze klare Information: keine Zahlung möglich; kein Spenden-CTA auf Homepage                                                                     | Bestätigte Zwecke, Empfänger, Zahlungsweg und notwendige Hinweise                                                                                                | Erst dann tatsächlich unterstützen                                                   |
| `/impressum`, `/datenschutz`                                | Unmissverständlich ungeprüfter Vorschauzustand                                                                                                    | Autoritative geprüfte Texte                                                                                                                                      | Lesbarkeit und Rechtsklarheit; keine Marketingbehandlung                             |

**Priorität der fehlenden Inhalte:** ein belastbares Ortsprofil plus echter öffentlicher Kontakt, dann kurze Gemeinde-Vorstellung und Bildfreigabe, anschließend Teilnahme-/Formatfragen und Angebote. Keine Theologie, Personen oder sozialen Versprechen aus einem allgemeinen Kirchenklischee ergänzen. Der separate Researcher liefert Quellen und Freigabestatus, dieses Dokument liefert die Präsentationsordnung.

## Datenzustände: ehrlich, aber nicht die Hauptgeschichte

Technische Zustände und Zugriffsgates bleiben erhalten. Änderungen betreffen Gewicht, Textlänge und Platzierung, nicht Berechtigungen. Kein Cache-/SSR-/Statuscode-Umbau für die Optik.

| Zustand       | Homepage                                                                                                         | Zuständige Listen-/Detailseite                                                               |
| ------------- | ---------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `ready`       | Tatsächliche freigegebene Daten; kein Erfolgsbadge                                                               | Inhalt ohne unnötige Quellenerklärung                                                        |
| `disabled`    | „Gottesdiensttermine sind in dieser Vorschau noch nicht freigeschaltet.“; kompakter Abschnitt unter dem Einstieg | Gleiche klare Aussage; keine Wartesimulation oder Aktivierung von `SERVICES_APPROVED`        |
| `empty`       | „Zurzeit sind keine kommenden Gottesdienste veröffentlicht.“                                                     | Nicht „Es finden keine Gottesdienste statt“ behaupten                                        |
| `unavailable` | „Termine können gerade nicht geladen werden.“; unabhängige Orientierung bleibt nutzbar                           | Verständliche Fehlererklärung und echter Rückweg; keine Kontakt-Schaltfläche ohne Kontaktweg |
| `stale`       | „Zuletzt bestätigter Stand“ direkt bei den betroffenen Daten; Zeitstempel                                        | Keine Aussage „aktuell“; Warnung nicht in Footer oder Tooltip verstecken                     |

Für Meldungen gleichwertige, passende Formulierungen. Auf der Homepage im gesperrten Zustand pro Quellbereich eine kompakte Meldung; auf der zugehörigen Seite die nötige Erklärung. Keine künstlich gefüllten Listen, keine Skeletons für endgültig deaktivierte Quellen. Verwaltungsdetails wie Token, Kalenderbereinigung und Prüftickets bleiben in `docs/mvp-status.md`.

Unverändert: `noindex, nofollow`, robots-Sperre, Vorschaukennzeichnung, Rechtshinweise, sichere 404/503-Unterscheidung, `Retry-After`, serverseitige Credentials, Zulassungsregeln und Produktgrenzen. Attraktivere Vorschau bedeutet ausdrücklich **keine Veröffentlichungsfreigabe**.

## Messbare Abnahme für unabhängiges Review

Die folgende Liste ist der Auftrag für die spätere Prüfung, **kein hier behauptetes Testergebnis**.

### 1. Identität und visuelle Richtung

- Header und gegebenenfalls Footer verwenden nachweislich dasselbe Original-Logo wie der freigegebene Asset-Nachweis; keine erfundene `akg.`-Marke einschließlich Favicon.
- Keine Georgia-/Display-Serif, keine dekorativen Kursivwörter, keine nummerierten Bereichskacheln, keine Karten-Schatten, kein Carousel, keine generierten Gemeindebilder.
- Ein einziges klares Hauptziel im Einstieg. In einer fünfsekündigen unmoderierten Betrachtung sollen mindestens 4 von 5 projektfremden Personen „Kirchengemeinde“, „Kiel“ und einen sinnvollen nächsten Klick erkennen. Das ist ein Testziel, keine Forschungsbehauptung.
- Bei vorhandenem freigegebenem Foto ist dieses erkennbar lokaler Beleg und korrekt beschriftet, nicht beliebige Stimmung. Ohne Foto gibt es keinen leeren Bildplatzhalter; finale Bildfreigabe bleibt offen.

### 2. Hierarchie und Dichte

- Bei 390 × 844 px, 100 % Textgröße, geschlossenem Menü: Hauptlink vollständig im ersten Viewport sichtbar; vor ihm keine Quellenfehlermeldung. Kein künstlich fixierter Hero, um dieses Ziel zu erzwingen.
- Keine Statusfläche erhält den höchsten Kontrast und die größte zusammenhängende Fläche im Einstieg. Status bleibt mindestens 15px, kontrastreich und vor einem Datenklick verständlich.
- Gated-Homepage bei 390px ohne offene Navigation als Ziel maximal ungefähr 2400px Gesamthöhe statt der vorliegenden 4047px; dieses Budget gilt **nicht** als Text-Clipping-Vorgabe und nicht bei Zoom oder reichhaltig freigegebenem Inhalt. Prüfer darf begründete Inhaltslänge akzeptieren, nicht leere Strecken.
- Kein „Anfahrt“, „Kontakt aufnehmen“ oder „Besuch planen“-CTA führt zu einer Seite, die genau diese Leistung nicht bieten kann. Linklabel darf nicht mehr versprechen als der vorhandene Inhalt.

### 3. Responsivität und Bedienung

- 320, 390, 768, 1024 und 1440px prüfen; zusätzlich 200 % Textvergrößerung und 400 % Zoom/Reflow entsprechend WCAG. Kein horizontaler Seitenoverflow, Textclipping, unbeabsichtigte Überlappung oder verzerrtes Bild.
- Deterministische DOM-Smoke-Detektoren und Präzisionsmessung tatsächlich ausführen, Treffer am betroffenen Element bestätigen. Gemeinsame Kanten innerhalb 1px; gleichartige Kontrollen gleiche Mindesthöhe; keine leeren Selektoren als bestandene Prüfung ausgeben.
- Mindestens 44 × 44px primäre Navigations-/Bedienziele, Hauptbutton mindestens 48px hoch; nicht zulasten von Textvergrößerung oder Footerlinks sparen.
- Tastaturfolge: Skip-Link → Logo/Navigation → Hauptinhalt; Menü öffnen/schließen, Escape/Fokusrückgabe und Breakpointwechsel prüfen. Navigation ohne JavaScript verwendbar. Fokus auf jeder verwendeten Fläche sichtbar.
- Kontrast am gerenderten UI prüfen: Text 4,5:1, großer Text 3:1, notwendige UI-Grenzen/Fokus 3:1. Verwendete Fonts, echte deutsche Langtexte und fehlende optionale Felder mitprüfen.

### 4. Quellen, Fehlerzustände und Privacy

- Alle fünf Quellzustände unabhängig für Dienste und Meldungen prüfen; Testdaten nur in Tests, nie als sichtbarer Produktionsfallback.
- Kein Gottesdienstort, kein Name, keine Teilnahmebedingung, kein Angebot und keine Geschichte ohne dokumentierte Freigabe. Keine Gruppen-/Personenabfrage nur für ein hübscheres Layout.
- Keine neuen Fremdrequests für Fonts, Karte, Video oder Bilder. Externe Ziele klar bezeichnet; Konzertziel erst nach Bestätigung aktiv.
- Vorschauhinweis und noindex/robots bleiben auf allen Routen; keine unbeabsichtigte Sitemap oder Launch-Freischaltung.

### 5. Iterationsfolge und Stop-Kriterien

1. Zuerst Startseite im tatsächlich verfügbaren gesperrten Zustand plus `/gemeinde` gestalten. Bei Original-Logo, Richtung und erster Wegführung unabhängig prüfen, bevor Unterseiten vervielfältigt werden.
2. Dasselbe Layout mit freigegebenen Daten bzw. ausschließlich isolierten Testfixtures auf ready/stale/empty prüfen. Status darf die Identität nicht wieder verdrängen.
3. Eine Ortsseite und Kontaktseite anhand tatsächlich gelieferter Quellen ausarbeiten; erst dann restliche Seitentypen übertragen.
4. Implementierender Agent führt kleinsten relevanten Check und vollständiges `pnpm quality` sowie die passende Browser-/HTTP-Prüfung aus. Reviewer bewertet Screenshots und echten Tastaturweg, nicht nur grüne Tests.
5. Offene Inhalts-, Logo-/Medien- oder rechtliche Freigaben explizit auflisten. Nicht „fertig“ melden, solange nur die Platzhalter schöner geworden sind. Kein Merge, Deployment oder Issue-Abschluss durch diesen Design-Handoff.
