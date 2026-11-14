# AKG-129 · Fünf Startseitenentwürfe

Projekt **Website AKG**, Milestone **3 · MVP: Kernwebsite**. Eigenständige Gestaltungsvorschläge, keine Inhalts-, Rechts- oder Launchabnahme.

## Skill und Quellen

Ausschließlich angewandter Design-Skill: `/home/zepi/.pi/agent/skills/design-better-websites/SKILL.md`, vollständig gelesen. Keine anderen globalen Design-Skills, keine Unteragenten.

Vollständig gelesen: `docs/design-exploration-brief.md`, `src/pages/index.astro`, `src/styles/globals.css`, `docs/design.md`, `docs/brand-spec.md`, `src/lib/photos.mjs`, `src/lib/site.ts`, `docs/migration/README.md`. Zusätzlich Paket-Skripte und den vorhandenen Browsercheck als technische Orientierung gesichtet. Keine Entwürfe anderer Agenten gelesen oder übernommen.

**Fehlende Skill-Referenz:** Der Skill verweist auf `references/source-map.md`. Der Leseversuch scheiterte; die installierte Skill-Verzeichnisstruktur enthält tatsächlich nur `SKILL.md`, keine Referenzen oder Skripte. Daher keine nicht vorhandenen Skill-Skripte behauptet oder ersetzt. Schriftlizenz, Medienherkunft und Markenregeln kommen aus den verbindlichen lokalen Projektquellen. Keine neuen externen Inhalte recherchiert oder eingebunden.

## Absicht und Ausgangsaudit

Zielgruppe: Menschen beim ersten Besuch ebenso wie Menschen, die bereits zur Gemeinde gehören. Gemeinsame Hauptaktion: **Gemeinde kennenlernen**; Gottesdienste bleiben in jedem Einstieg direkt erreichbar. Die Besuchswege sind Gestaltungshypothesen, keine gemessenen Conversion-Verbesserungen.

Drei relevante Grenzen des Ausgangspunkts aus dem Code-Audit:

1. **Layout / Conversion:** Das bestehende Split-Hero und seine feste Abschnittsfolge bilden eine klare Ausgangslösung, aber noch keine vergleichbare Reihe unterschiedlicher Besuchereinstiege. Die Exploration variiert deshalb nicht bloß Farben, sondern Einstieg, Reihenfolge, Bildgewicht und Navigationsform.
2. **Typografie / Rhythmus:** Die bestehende kompakte Hierarchie ist für das MVP zurückhaltend. Die Entwürfe untersuchen bewusst stärkere Displaygrößen, redaktionelle Lesespalten, eine Seitenleiste sowie ein adressatenorientiertes Wegweisersystem, ohne die lokale Figtree zu verlassen.
3. **Code / Inhalt / Vertrauen:** Der Ausgangscode bindet aktuelle Quellenzustände dynamisch ein. Für eigenständige statische Entwürfe wäre ein nachgebildeter Kalender oder eine erfundene Meldung irreführend. Stattdessen tragen bestätigte Einladungstexte und Archivbilder die Seite; Aktuelles bleibt ein kompakter ehrlicher Hinweis mit echtem Routenziel.

Der Ausgangspunkt wurde nicht als laufende Astro-Seite gerendert: In diesem Checkout fehlten installierte Repository-Abhängigkeiten; ausdrücklich keine lange Installation durchgeführt. Die fünf neuen HTML-Seiten wurden dagegen mit vorhandenem Chromium tatsächlich gerendert und geprüft.

## Fünf kohärente Richtungen

### 1 · Ein guter Anfang — `1.html`

- **Ton und Besuchseinstieg:** ruhig, persönlich, vertraut; eine unmittelbare Einladung neben zwei Menschen im Gespräch.
- **Typografie:** kräftige Figtree-Displayrolle bis 88 px, Einleitung 20–24 px; kurze, klar getrennte Abschnittstitel.
- **Layout / Rhythmus:** 5:7-Auftakt, anschließend umgekehrte Bild-/Textstellung im blauen Gottesdienstabschnitt; ein großes Festfoto mit schmalem Textakzent; danach kleinerer Café-Übergang.
- **Farbrollen:** heller blauer Auftakt, sattes Blau als Gottesdienstvertiefung, weiße Gemeindefläche. Keine Bildfilter oder Textüberlagerungen.
- **Blickpunkt / Weg:** Gesprächsfoto → Gemeinde kennenlernen → Gottesdienst → Gemeindeleben → Café → kompakter Kontaktabschluss.

### 2 · Dein Weg hierher — `2.html`

- **Ton und Besuchseinstieg:** offen und orientierend; „Was führt dich zu uns?“ macht drei unterschiedliche Interessen sichtbar.
- **Typografie:** Display bis 100 px; große funktionale Wegweiser statt dekorativer Etiketten.
- **Layout / Rhythmus:** Frage und Einleitung stehen versetzt nebeneinander; drei breite Linkflächen folgen vor dem Fotopaar. Danach wechseln Gottesdienst, Angebote mit nativen Details und Café. Der blaue Abschluss konzentriert den nächsten Schritt.
- **Farbrollen:** Weiß als Hauptfläche; Aktionsblau, Hellblau und Ink unterscheiden die drei tatsächlichen Sprungziele. Text und Pfeile machen die Funktion auch ohne Farbwahrnehmung klar.
- **Blickpunkt / Weg:** eigene Absicht wählen → passenden Abschnitt lesen → reale Unterseite öffnen; Gemeinde kennenlernen bleibt die frühe Hauptaktion.

### 3 · Das Gemeindeblatt — `3.html`

- **Ton und Besuchseinstieg:** redaktionell, großzügig, gemeinschaftsorientiert; Einladung vor einem großformatigen Gottesdienst-Archivfoto.
- **Typografie:** zentrierter Titel bis 116 px, ruhigere Lesespalten darunter, klar untergeordnete Bildunterschriften.
- **Layout / Rhythmus:** breites Auftaktbild bis 1120 px; nachfolgend eine textliche Gottesdiensteinladung; eine asymmetrische Doppelseite führt Gespräch und Fest zusammen. Das zweite Fotothema beginnt bewusst tiefer. Café als blauer Schwerpunkt.
- **Farbrollen:** Weiß zum Lesen, Hellblau für die Gemeindegeschichte, Blau für den eigenständigen Café-Übergang.
- **Blickpunkt / Weg:** gemeinsames Gottesdienstbild → Glaubenseinladung → persönliche Gemeindeeinblicke → Kennenlernen oder Kontakt.

### 4 · Im Gespräch — `4.html`

- **Ton und Besuchseinstieg:** direkt, eigenständig, gesprächsnah; „Gemeinde beginnt mit Begegnung“.
- **Typografie:** großer, linksbündiger Satzauftakt bis 86 px; kurze, deutlich gegliederte Textblöcke.
- **Layout / Rhythmus:** Desktop-Seitenleiste mit Original-Logo und fünf dauerhaft sichtbaren Navigationslinks; eingerücktes Gesprächsfoto; kleines Festfoto neben einem aufklappbaren Ersteinstieg; groß gesetzter Glaubensabschnitt. Unter 961 px wird die Seitenleiste zur normalen Kopfzeile mit nativem Menü.
- **Farbrollen:** großzügiges Weiß; eine blaue Glaubensfläche und ein hellblauer Café-Bereich geben dem seitlich geführten Aufbau Halt.
- **Blickpunkt / Weg:** persönliche Ansprache → Gemeinde kennenlernen → Miteinander und Fragen → Gottesdienst → Kontakt.

### 5 · Ein Platz am Tisch — `5.html`

- **Ton und Besuchseinstieg:** niedrigschwellig über Begegnung und das Café; keine Öffnungszeit, kein aktuelles Personal und kein Café-Betrieb behauptet.
- **Typografie:** zentrierte Einladung bis 100 px; anschließend größere funktionale Sprunglinks im blauen Wegweiser.
- **Layout / Rhythmus:** textlicher Auftakt über einer 9:3-Foto-/Infoteilung zum Café; breiter Wegweiser; versetztes Gemeindefotoalbum; Gottesdienst folgt bewusst erst danach. Sechs vollwertige Abschnitte.
- **Farbrollen:** ein zusammenhängender hellblauer Auftakt, ein kompakter blauer Übergang, dann weiße und hellblaue Leseflächen.
- **Blickpunkt / Weg:** erste Begegnung → Café als separates Angebot → Wege ins Gemeindeleben → Gottesdienst → Gemeinde kennenlernen oder Kontakt.

## Gemeinsame technische und inhaltliche Entscheidungen

- Jeweils vollständiges HTML-Dokument mit Inline-CSS, UTF-8, deutscher Sprache, Viewport, eindeutigem Titel und `noindex, nofollow`.
- Keine Frameworks, externen Abhängigkeiten, Skripte, Formulare, Embeds oder externen Ressourcenrequests. Native Links sowie `details/summary` genügen.
- Original-Logo unverändert, proportional auf hellem Hintergrund; keine zusätzliche Wortmarke. Lokale Figtree mit `font-display: swap` und Font-Preload.
- Ein `main`, ein H1, semantische Abschnitte, Skip-Link, sichtbarer Tastaturfokus; Links und Summaries mindestens 44 px hoch. Keine versteckten Scrollanimationen; Reduced-Motion-Regel vorhanden.
- Inhaltsbreite maximal 1280 px; Raster überwiegend aus 12 teilbaren Einheiten, mit inhaltsabhängigen Spaltenverhältnissen. Mobile Leserichtung folgt dem DOM. Abstände überwiegend aus 8-px-Schritten, mit 20-/24-px-Mobilrändern.
- Jedes Dokument enthält alle vier freigegebenen Menschen-/Cafémotive proportional ohne zusätzlichen Ausschnitt. Gemeindefest stets 2022; Gottesdienst und Café ausdrücklich Archivfotos. Die vollständigen Originalbild-URLs stehen jeweils am Foto; Frank Lönne ist nur beim belegten Gottesdienstmotiv genannt. Keine CC-Lizenz für Gemeindefotos erfunden.
- Café Dreimaster bleibt mit sichtbar als extern gekennzeichnetem Link auf der eigenen Website. Keine Konzertdomain geraten oder Konzertinhalte übernommen.
- Keine aktuellen Termine, Gruppenlisten, Personenrollen, Kontakte, Rechtsabschriften oder sonstigen Live-Daten erfunden. Vorhandene slashlose Unterseiten sind die weiterführenden Ziele.

## Tatsächlich ausgeführte Prüfungen

### Wiederholbarer Eigencheck

```sh
python3 public/entwuerfe/better-websites/sol/verify.py
```

**Bestanden:** genau fünf vollständige Manifest-Einträge mit eindeutigen Namen; fünf HTML-Dokumente mit balancierten Tags; genau ein Header/Main/H1/Footer; Sprache, Metadaten und Indexierungssperre; vorhandene lokale Bild-/Fontdateien einschließlich aller Srcset-Kandidaten; vier Fotos und Originalquellen pro Seite; korrekte Sprungziel-IDs; bekannte weiterführende Routen; keine Skripte/Frames/Formulare und keine zusätzlichen Bildfilter/-beschnitte. Das ist ein fokussierter Standardbibliothek-Check, kein vollständiger HTML-Validator.

### Browserchecks mit vorhandenen Werkzeugen

Ausgeführt mit dem bereits vorhandenen `playwright-core` unter `/tmp/akg-parking-tools/node_modules/` und Chromium unter `/tmp/pr51-tools/chromium`; keine Installation. Temporärer isolierter Prüfserver nur auf Loopback, nach Ende geschlossen. Prüfskript: `/tmp/akg-bw-sol-browser.mjs`; Ergebnis: `/tmp/akg-bw-sol-browser-results.json`.

- **40 Seiten-/Breitenkombinationen bestanden:** alle fünf Seiten bei **320, 375, 390, 414, 768, 1024, 1100 und 1440 px**, jeweils 900 px Viewporthöhe.
- Kein horizontaler Dokumentüberlauf oder Inhalt außerhalb der Seitenbreite; keine horizontal überlaufenden oder abgeschnittenen Überschriften.
- Alle fünf Bilder je Seite erfolgreich dekodiert; Logo und Fotos im natürlichen Seitenverhältnis, einschließlich Berücksichtigung der rein gestalterischen Bildrandstreifen.
- Lokale Figtree geladen; keine fremden Ressourcenrequests, Seitenfehler oder fehlgeschlagenen Assetantworten.
- Sichtbare Links und Summary-Ziele mindestens 44 px hoch.
- Bei 390 px auf allen fünf Seiten: Skip-Link mit Tab erreichbar, Enter fokussiert `main`; Menü mit Enter öffnen/schließen; alle fünf Menülinks in Reihenfolge per Tab erreichbar. Sämtliche Inhalts-Details mit Space umschaltbar.
- Browserkontext ohne Seiten-JavaScript: native Navigation und Details bleiben funktionsfähig.
- Zusätzlicher Textvergrößerungstest bei 390 px auf allen fünf Seiten: berechnete Textgrößen verdoppelt, kein horizontaler Dokumentüberlauf. Reduced-Motion-Medienzustand aktiviert und geprüft; Seiten enthalten ohnehin keine Animationen.
- Interne lokale QA-Aufnahmen bei 390 und 1440 px für alle fünf Seiten erstellt und visuell gelesen (`/tmp/akg-bw-sol-{1..5}-{390,1440}.png`). Keine T3-Preview-Tabs; keine zentrale Galerie erstellt. Die finalen Galerie-Screenshots bleiben Aufgabe des Parents.

### Kontrastberechnung

Ausgeführt mit einer kleinen Python-Berechnung nach WCAG-sRGB-Luminanz:

| Text/Fokus auf Fläche                 |      Verhältnis |
| ------------------------------------- | --------------: |
| Ink `#173b50` auf Weiß                |         11,81:1 |
| Ink auf Hellblau `#eaf3f7`            |         10,50:1 |
| Weiß auf Aktionsblau `#006c9e`        |          5,77:1 |
| Muted `#50616c` auf Weiß              |          6,43:1 |
| Muted auf Hellblau                    |          5,71:1 |
| Fokus `#aa420d` auf Weiß / Hellblau   | 6,01:1 / 5,34:1 |
| Heller Fokus `#ffe090` auf Blau / Ink | 4,48:1 / 9,18:1 |

Die verwendeten Textpaare liegen über 4,5:1, Fokuspaare über 3:1. Keine Kontrastbehauptung für Text auf Fotos: dort wird kein Text platziert.

## Bekannte Lücken und Übergabegrenzen

- Zentrale Galerie, finale Vergleichsscreenshots und Repository-Full-Quality liegen ausdrücklich beim Parent; hier nicht als bestanden ausgegeben.
- Keine automatisierte axe-Prüfung, Safari-/Firefox-Prüfung, physischen Geräte, realen Screenreader-Tests oder vollständige WCAG-Zertifizierung durchgeführt.
- Bestehende Astro-Unterseiten und externe Linkziele wurden nicht per HTTP auf Erreichbarkeit geprüft. Ihre Ziele stammen aus den freigegebenen Projektquellen; geprüft wurden interne Entwurfsanker und lokale Assets.
- Keine aktuellen ChurchTools-Daten eingebunden; entsprechende redaktionelle und fachliche Freigaben bleiben unberührt.
- Die fehlende `source-map.md` bleibt eine Lücke der installierten Skill-Unterlagen, nicht eine erfundene verwendete Referenz.
- `noindex` ist keine Zugriffskontrolle. Keine Medien-/Rechtsfreigabe, Freigabe zum Launch, Veröffentlichung, Commit, Push oder Deployment vorgenommen.
