# AKG-129 · Hallmark · fünf Startseitenentwürfe

## Auftrag und Grenzen

Projekt **Website AKG**, Milestone **3 · MVP: Kernwebsite**. Ausschließlich `public/entwuerfe/hallmark/sol/` wurde beschrieben. Keine produktive Route, gemeinsamen Designartefakte, Pakete, Konfigurationen oder anderen Agentenergebnisse verändert. Keine Unteragenten, Linear-Änderungen, Commits, Pushes, Deployments oder T3-Preview-Tabs.

Vollständig gelesen: `docs/design-exploration-brief.md` und **`.pi/skills/hallmark/SKILL.md`**. Nur dieser Design-Skill wurde verwendet. Die ausdrücklich bestätigte Reihe und der gemeinsame Brief ersetzen zusätzliche Designfragen und Checkpoints.

Zielgruppe: Erstbesuchende und Menschen, die der Gemeinde bereits verbunden sind. Aufgabe: Gemeinde kennenlernen; Gottesdienste bleiben direkt erreichbar. Ton: persönlich und einladend, mit einer bewusst kräftigeren fünften Richtung.

## Vorprüfung und verbindliche Quellen

- `docs/brand-spec.md`: originales Logo, Figtree, Blau/Weiß, Mediengrenzen und Quellen.
- `src/lib/photos.mjs`: vier freigegebene Menschen-/Cafémotive mit belegten Credits und Archivbezeichnungen.
- `src/lib/site.ts`: fünf Hauptziele und Café-Adresse.
- `docs/migration/README.md`: WordPress ist Migrationseingang, keine aktuelle Datenquelle; eigenständige Produkte nicht kopieren.
- `src/pages/index.astro`, `src/styles/globals.css`, `docs/design.md`: bestehender UI-/Datenvertrag und Ausgangskomposition.
- `package.json`: Astro, kein Motion-Paket; keine Installation notwendig.

Konkrete Pre-flight-Anker: Figtree in `src/styles/globals.css:3–13`, Farben `:14–20`, Abstandsrollen `:23–29`, Astro in `package.json:21`. Der Cache liegt ausschließlich in `.hallmark/preflight.json` dieses Entwurfsverzeichnisses. Es existierte dort keine vorherige Hallmark-Ausgabe.

## Hallmark-Planung

### 1 · Zusammen im Bild — `1.html`

**Idee:** Menschen zuerst sehen, dann weiterlesen. Der große, unbeschnittene Gottesdienstblick und ein asymmetrisches Bildpaar tragen den Rhythmus. Die Überschrift bleibt im Verhältnis zur Fotografie bewusst kleiner.

- Macrostructure: **Photographic**; H6 mit Text oberhalb, natürlichem Bildformat und Bildnachweis darunter.
- Nav: **N6 Masthead**, originales Logo mittig, seitliche Metadaten, fünf Ziele darunter; mobil natives Menü.
- Footer: **Ft2**, kompakte inline angeordnete Gruppen, kein Sitemap-Raster.
- Ablauf: Einladung + großes Gottesdienstfoto → Gemeindeleben mit versetztem Bildpaar → ruhiges Gottesdienstband → Café → Aktuelles/Kontakt.
- Einstieg: Blick in das Gemeindeleben; Hauptlink „Gemeinde kennenlernen“ vor dem Bild.
- Fläche/Typo: hell, Figtree 750, fotografisch und vertraut. Kein räumliches Motion-Enrichment.

### 2 · Ein Brief an dich — `2.html`

**Idee:** Die Gemeinde spricht die Besucherin oder den Besucher wie in einem persönlichen Brief an. Leichte Schrift und eine schmale Lesespalte reduzieren die institutionelle Distanz. Fotografien sind Lesepausen statt Karten.

- Macrostructure: **Letter**; H5 Begrüßung, zwei Absätze, ausgeschriebener Gemeindename als Signoff.
- Nav: **N9 Edge-aligned**, nur Logo und Menüauslöser am anderen Rand; alle fünf Hauptziele im nativen Menü.
- Footer: **Ft6 Letter close**, romaner Abschluss und Postskript.
- Ablauf: Brief mit kleinerem Gesprächsfoto → Gottesdiensttext und große Bildpause → Gemeindeleben → Café → Postskript mit Aktuelles/Kontakt.
- Einstieg: persönliche du-Ansprache, Hauptaktion als Textlink statt Button.
- Fläche/Typo: hellblaues Lesepapier, Figtree 300 für prägende Überschriften und 750 für Gegenakzente; bewegungslos.

### 3 · Dein Weg in die Gemeinde — `3.html`

**Idee:** Zielgerichtete Besuche beginnen nicht mit einem Hero, sondern mit einer Auswahl. Die Gemeindeerzählung folgt erst nach dem Wege-Index.

- Macrostructure: **Index-First**; fünf beschriebene Zielzeilen, kein Foto im Auftakt.
- Nav: **N3 Side-rail**, 15-rem-Textleiste, Logo nicht gedreht oder verändert; unter 64 rem natives Menü im Dokumentfluss.
- Footer: **Ft4**, kompakter Sans-Kolophon.
- Ablauf: Wege-Index → Gottesdienst → Gemeindeleben/Bildpaar → Café → Aktuelles.
- Einstieg: „Was führt dich zu uns?“; Gemeinde kennenlernen ist das erste und farblich betonte Ziel.
- Fläche/Typo: helle Arbeitsfläche, kurze Linküberschriften, deutliche Zeilenrhythmik und spätere, kleinere Fotografien; keine Bewegung.

### 4 · Mit offenen Fragen — `4.html`

**Idee:** Die inhaltliche Seite liest sich wie ein Gespräch. Vier kurze Fragen führen durch vollständig vorhandene Antworten. Alles ist anfangs geöffnet; es muss nichts erraten oder freigeklickt werden.

- Macrostructure: **Conversational FAQ**, ergänzt um eine eigenständige Einladung mit Gesprächsfoto.
- Nav: **N11**, ein natives aufklappbares Übersichtspanel mit beschreibenden Hauptzielen; kein Scrim und kein Hover-Zwang.
- Footer: **Ft5 Statement** — „Wir freuen uns auf dich.“
- Ablauf: Einladung → „Auch mit Fragen?“ → „Was verbindet uns?“ → „Lust auf Begegnung?“ → „Was gibt’s Neues?“ und Kontakt.
- Einstieg: einladender Umgang mit Fragen statt institutioneller Vorstellung; gefüllte Hauptaktion, direkter Gottesdienstlink.
- Fläche/Typo: weiße und hellblaue Antwortfelder. Nur kurze Opacity-Rückmeldung beim Öffnen und minimale Press-Rückmeldung der Hauptaktion, unter `prefers-reduced-motion` vollständig abgeschaltet.

### 5 · Menschen machen Gemeinde — `5.html`

**Idee:** Ein typografisches, dunkelblaues Statement setzt die Menschen vor die Institution. Die Folge wechselt zwischen kompakten Aussagen und offenen, großen Bildfeldern.

- Macrostructure: **Manifesto**; drei gestapelte Wörter, Figtree 900, Foto neben statt hinter dem Text.
- Nav: **N7 Slab**, kräftiger Abschluss und kompakte Großbuchstaben; originales Logo weiterhin unverändert auf Weiß.
- Footer: **Ft1**, Gemeindename als klare Abschlussachse.
- Ablauf: Menschen-Statement mit Gottesdienstfoto → Glaube/Fragen → Gemeindeleben → Café → Aktuelles/Kontakt.
- Einstieg: gemeinsame Haltung; Gemeinde kennenlernen und Gottesdienste liegen unmittelbar am Statement.
- Fläche/Typo: dunkles Ink-Blau im Auftakt, danach Weiß/Hellblau; keine Filter, Überlagerung, Dauerschleife oder räumliche Animation.

### Gemeinsame Markenbindung und bewusste Skill-Anpassungen

- Alle fünf Strukturen, Navigationstypen und Footertypen sind verschieden. Es sind nicht fünf Umfärbungen desselben DOM.
- Die markenbedingt festgeschriebene **Figtree** wird nicht durch Katalog-Fontpaare ersetzt. Unterschiede entstehen durch Gewicht, Maß, Bildanteil und Komposition. Die vier hellen Entwürfe teilen dadurch ehrlich die Achsen `light / geometric-sans / cool`; die fünfte Variante wechselt zu `dark / display-heavy / cool`. Eine frei erfundene vollständige Theme-Rotation wird nicht behauptet.
- Das originale Logo braucht einen weißen Hintergrund. Das Weißverbot des generischen Skill-Katalogs wird deshalb gegenüber der verbindlichen Marke nicht durchgesetzt; auch weiße Inhaltsflächen sind Teil des ausdrücklich gewünschten Blau/Weiß-Systems.
- Das Projektverbot zusätzlicher Fotobeschnitte/Filter übersteuert anderslautende Foto-Rezepte des Skills. Alle Bilder behalten ihr natürliches Format. Die vier Pflichtmotive erweitern auch die sonst bildärmeren Letter-/Index-/FAQ-Archetypen.
- Verbindlicher Ausgabeumfang: eigenständiges HTML mit Inline-CSS. Tokens stehen deshalb pro Seite am CSS-Anfang; zusätzliche portable Exporte liegen in `.hallmark/tokens-1.css` bis `.hallmark/tokens-5.css`. Keine globale `tokens.css` oder Root-DESIGN-Datei angelegt und keine externe CSS-Abhängigkeit eingebaut.
- Native Links und `details` haben Default-, Hover-, Fokus-, Press- und Öffnungszustände. Es gibt keine künstlichen Disabled-, Lade-, Fehler- oder Erfolgsabläufe, weil keine Formulare, asynchronen Aktionen oder Datenanbindungen vorgetäuscht werden.
- Die sechs Hallmark-Selbstkritikachsen stehen im CSS-Stempel. Es gibt keine Rangliste der Konzepte im Manifest.

## Benutzte Hallmark-Referenzen

Genre `editorial` (nach Prüfung des Community-Signals; keine verspielte Consumer-App), Custom-Theme-Protokoll, Macrostructure-Index und die fünf gewählten Einzelreferenzen, Component-Cookbook und die ausgewählten N6/N9/N3/N11/N7-, Ft2/Ft6/Ft4/Ft5/Ft1-, H6/H5/H1-, C3/C1- und S4/S5-Referenzen. Außerdem Typography, Color, Layout and Space, Motion, Copy, Anti-patterns, Microinteractions, Interaction and States, Responsive, Structure, Foto-/Image-need-Abschnitte aus Hero Enrichment/Assets sowie abschließend Slop Test und Contract.

Unter `.pi/skills/hallmark/` sind keine ausführbaren Skill-Skripte enthalten. Deshalb wurden keine erfundenen Hallmark-Prüfbefehle oder externen Bilderdienste verwendet. Sämtliche Planung, Exporte und Projekt-Memory liegen nur in diesem Verzeichnis.

## Tatsächlich ausgeführte Prüfungen

### Reproduzierbarer Eigencheck

```sh
python3 public/entwuerfe/hallmark/sol/.hallmark/build.py
node public/entwuerfe/hallmark/sol/.hallmark/check.mjs
```

Vorhandene Werkzeuge statt Installation: Python-Standardbibliothek, Node, `playwright-core` aus `/opt/t3/current/node_modules/`, vorhandenes ARM64-Chromium. Die beiden Browserpfade lassen sich über `AKG_PLAYWRIGHT_MODULE` und `AKG_HALLMARK_BROWSER` überschreiben.

**Letzter Lauf: 45/45 Seiten-/Breitenkombinationen bestanden.** Breiten: **320, 375, 390, 414, 768, 1024, 1280, 1440, 1920 px**. Bei 1280 px wurde 800 px Viewport-Höhe verwendet. JavaScript war für sämtliche Seiten deaktiviert. Dateien wurden über Playwright-Routing lokal ausgeliefert; kein Server, keine T3-Preview-Tabs und keine externen Subressourcenrequests.

Geprüft wurden:

- gültiger Doctype, `lang="de"`, eindeutiger Seitentitel, UTF-8/Viewport und `noindex, nofollow`;
- genau ein `main` und ein H1, fünf Hauptabschnitte pro Seite, eindeutige IDs;
- Manifest mit genau fünf nummerierten, unterschiedlich benannten Einträgen;
- keine Scripts, Frames, Formulare oder Remote-Resource-Einbindungen;
- Links gegen die freigegebenen Routen, vier Originalquellen und die Café-Adresse; sämtliche Fragmentziele vorhanden;
- keine über den Viewport hinausragenden Elemente oder horizontalen Textüberläufe an Links/Überschriften;
- Interaktionsziele mindestens 44 × 44 CSS-Pixel;
- alle Bilder und lokale Figtree geladen, Bildproportionen anhand ungerundeter Rendermaße, vier korrekte sichtbare Quellenzuordnungen pro Seite;
- WCAG-Kontrastberechnung für sichtbare Textknoten gegen die tatsächliche Hintergrundfläche: **kleinster gemessener Textkontrast 5,71:1**;
- sichtbare 3-px-Fokusringe und mindestens 3:1 Ringkontrast an den sichtbaren Links/Summaries;
- Skip-Link per Tab/Enter bis zum fokussierten Hauptinhalt;
- sämtliche sichtbaren nativen Menü-/Antwortauslöser per Enter geöffnet und wieder geschlossen; offene Menüs auf Überbreite geprüft;
- bei 1280 × 800 px H1 und erste Hauptaktion vollständig im ersten Viewport.

Zusätzlich ausgeführt: Python-AST-Syntaxprüfung des Generators, UTF-8-Parsing aller fünf HTML-Dateien mit `html.parser.HTMLParser` und JSON-Parsing von Manifest, Preflight, Log und Browserbericht. Alles bestanden. Das HTML-Parsing ist keine externe W3C-Validierung.

Ergebnisdaten: **`.hallmark/check-results.json`**. Ein erster Bildproportionstest nutzte gerundete `img.width`/`img.height` und löste bei einem kleinen Bild knapp falsch positiv aus; der finale Test nutzt `getBoundingClientRect()`. Ein Extern-Pfeilglyph war im vorhandenen Browserfont nicht zuverlässig darstellbar und wurde durch sichtbaren „extern“-Text ersetzt. Der abschließende Lauf hat keine offenen Fehler.

### Visuelle Sichtung und Hallmark-Slop-Review

Alle fünf Seiten vollständig bei 390 und 1280 px gesichtet; zusätzliche Vergleichsbögen aller fünf bei 320, 375, 414 und 768 px geöffnet und visuell geprüft. Hilfsscreenshots liegen nur temporär unter `/tmp/akg-hallmark-sol-qa/`; sie sind **nicht** die zentrale Galerie oder die vom Parent zu erstellenden Vergleichsscreenshots.

Die anwendbaren Slop-Gruppen wurden durchgegangen: Strukturvielfalt, keine Standard-Featurekarten, keine dekorativen Eyebrows, keine Fake-Chrome, keine erfundenen Belege/Termine/Personen, römische Überschriften, Tokenbindung, zurückhaltende Bewegung, echte Zustandswechsel und mobile Sicherheit. Markenbedingte Abweichungen sind oben ausdrücklich benannt; deshalb wird kein unqualifiziertes „58/58“ behauptet.

## Bekannte Lücken und Übergabe

- Keine fachliche Inhalts-, Medien-/Rechte-, Rechts- oder Launchabnahme. Archivfotos sind keine aktuellen Veranstaltungs-, Personal- oder Betriebsangaben; keine freie Lizenz für Gemeindefotos behauptet.
- Keine ChurchTools-Daten, aktuellen Termine, Gruppenlisten oder Meldungen eingebunden. Die entsprechenden Hinweise sind bewusst ehrlich, keine simulierten Fehlerzustände.
- Linkziele sind auf erlaubte Adressen und existierende Fragmente geprüft, **nicht** per externem Netzabruf oder als produktive Routen-E2E. Konzertziele werden nicht geraten oder dupliziert.
- Keine Prüfung in Firefox/Safari, mit physischen Geräten oder echten Screenreadern; keine WCAG-Zertifizierung. Kein separat ausgeführter axe-Audit, keine 200-%-Textprüfung.
- `noindex` ist keine Zugriffskontrolle. Cloudflare-/Astro-Header und produktiver Build wurden von diesem Entwurfsauftrag nicht geändert oder separat getestet.
- **Zentrale Galerie, finale Vergleichsscreenshots, vollständiges Repository-Quality-Gate und Gesamtintegration verbleiben beim Parent.** Kein fachlicher Freigabe-/Launchabschluss.
