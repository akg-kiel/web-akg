# AKG-129 · Web Design Engineer · Sol

## Auftrag, Quellen und Grenzen

Verwendeter Design-Skill: `/home/zepi/.pi/agent/skills/web-design-engineer/SKILL.md`, vollständig gelesen. Keine weiteren Design-Skills, keine Unteragenten. Gemeinsamer Brief `docs/design-exploration-brief.md` vollständig gelesen. Die vollständige Reihe ist ausdrücklich bestätigt; deshalb keine zusätzlichen System-, v0- oder Richtungs-Checkpoints. Fünf unabhängige HTML-Dateien statt Tweaks-Panel: Die Vergleichsform und JavaScript-freie Funktion sind explizite Vorgaben des Auftrags.

Gelesene Skill-Referenzen: `references/design-calibration.md`, `references/redesign-protocol.md`, `references/failure-patterns.md` (relevante Website-, Layout-, Typografie-, Bild- und Interaktionsabschnitte), `references/block-library.md`. Keine Bibliothek daraus erforderlich; keine Diagramme, Präsentationsengine, Theme-Umschaltung oder Tweaks. Der Skill fordert hier kein obligatorisches Generator-Skript. Browser-Acceptance ist dem Parent zugewiesen und wird hier nicht vorweggenommen.

Faktenprüfung anhand der bereitgestellten Projektquellen: `docs/brand-spec.md`, `src/lib/photos.mjs`, `src/lib/site.ts`, `docs/migration/README.md`; Ausgangskomposition `src/pages/index.astro`, `src/styles/globals.css` (relevante Marken-/Startseiten-/Responsive-Regeln), `docs/design.md`. Keine aktuellen Angaben aus dem WordPress-Archiv übernommen, keine externe Recherche oder neuen Bilder nötig. Alle vier freigegebenen Bildmotive wurden vor der Gestaltung geöffnet und betrachtet.

## Bestehendes Werk / Redesign-Vertrag

Modus: **Redesign · Overhaul als getrennte Exploration**, keine Änderung am Produktivlayout. Der Ausgangsentwurf nutzt eine hellblaue Text-/Gottesdienstfoto-Teilung, anschließend Gottesdienst, versetzte Gemeindegalerie, Café und Meldungen. Erhalten: Original-Logo, Figtree, Farbrollen, fünf Navigationsbegriffe, Gemeinde kennenlernen als Hauptaktion, direkt erreichbare Gottesdienste, Quellen-/Archivkennzeichnung, öffentliche Datenfreigaben, semantische Tastaturbedienung. Exploriert: andere Besuchereinstiege, Seitenproportionen, Bildgewichtung und Lesegeschwindigkeit. Entfernt/vermieden: falsche Termine, News-Attrappen, erfundene Kontaktpersonen, wiederholte Kartenserien und externe Ressourcen.

Höchstes Risiko: Aus historischen Motiven heutige Angebote abzuleiten. Gegenmaßnahme: sichtbare vollständige Bildnachweise, Jahresangaben am Gemeindefest, keine Personenidentifizierung oder Betriebsaussagen. Fallback: normale Routenlinks; alle Inhalte und die Navigation ohne JavaScript. Rollback: Seiten sind ausschließlich neue getrennte Entwurfsdateien.

## Brand-Spec / Asset-Inventar

Eigenständige Skill-Arbeitsdatei: `/tmp/akg-129-wde-sol/brand-spec.md`; die dauerhafte Quelle für diese Lieferung steht zusätzlich hier.

- Logo: `/images/apostel-logo.png`, 500 × 272, unverändert, unbeschnitten, ohne Filter, auf Weiß. Original: https://akg-kiel.de/wp-content/uploads/2019/09/logo-akg-500px.png
- Schrift: `/fonts/figtree-latin-variable.woff2`; `@font-face`, `font-display: swap`, Gewicht 300–900. Lizenz: `/fonts/OFL-Figtree.txt`. Keine externen Fonts.
- Farbrollen: Ink `#173b50`, Aktionsblau `#006c9e`, helle Fläche `#eaf3f7`, Weiß `#ffffff`. Keine weiteren UI-Farben; Fotofarben unverändert.
- Gottesdienst: `/images/gemeinde-gottesdienst-{640,960,1280}.webp`; „Gottesdienst · Archivfoto“, Foto Frank Lönne; Original: https://akg-kiel.de/wp-content/uploads/2024/01/2024_Banner_allianz_1.jpg
- Gespräch: `/images/gemeinde-gespraech-{640,960,1280}.webp`; „Im Gespräch · Gemeindefest 2022“, Quelle akg-kiel.de, keine erfundene Urheberschaft; Original: https://akg-kiel.de/wp-content/uploads/2022/05/Gemeindefest-22-VIII.jpg
- Fest: `/images/gemeinde-fest-{640,960,1280}.webp`; „Zeit miteinander · Gemeindefest 2022“, Quelle akg-kiel.de; Original: https://akg-kiel.de/wp-content/uploads/2022/05/Gemeindefest-22-XII.jpg
- Café: `/images/cafe-dreimaster-{640,960,1280}.webp`; „Café Dreimaster · Archivfoto“, Quelle akg-kiel.de; Original: https://akg-kiel.de/wp-content/uploads/2024/01/Banner_Dreimaster.jpg

Alle vier Motive pro Seite, proportional und ohne zusätzlichen Ausschnitt oder Filter. Keine offene Fotolizenz behauptet. Quellenlinks laden keine Bilder von extern. Café als eigenständiges Produkt mit sichtbarem „extern“ verlinkt; keine unbestätigte Konzertadresse.

## Design Read und deklarierte Systeme vor Implementierung

Gemeinsam: responsive Startseite für erstmals Besuchende und Gemeindeverbundene; freundliche direkte Du-Ansprache. Betrachtungsdistanz Handy ca. 30 cm / Laptop ca. 60 cm, keine Präsentationsfläche. Native HTML/CSS, unabhängige Dateien, keine CDN-/API-Requests. H1 und Fließtext deutlich abgestuft, Absätze ca. 45–60 Zeichen. Raster auf 4 px mit 8/16/24/32/48/64/96 px; fluides Außenmaß. Eckige Flächen, keine Schatten. Bewegungsintensität 1: nur Farb-/Unterstreichungsfeedback und native Details, keine Reveal- oder Bildanimation. Reduzierte Bewegung berücksichtigt. Farben und Familie wie oben für alle fünf Varianten.

### 1 · Offene Mitte

- Design Read: vertraute, menschennahe Einladung; Overhaul, Dials **Varianz 4 / Bewegung 1 / Dichte 4 / Assets 8 / Markentreue 9**.
- Narrativ: erst persönliche Begegnung, dann Gottesdienst und Gemeindeleben; Besuchereinstieg über das Gesprächsfoto.
- Betrachtungsdistanz: mobile Lesefolge Text → Aktion → Bild; Desktop 2-Spalten-Hero, keine Vollbildhöhe.
- Temperatur: ruhig und zugewandt; Kapazität: kompakter Hero, breite Textpause, großes Festbild, flacher Caféstreifen, kleine Meldungs-/Kontaktzone.
- System: H1 fluid bis 80 px, Abschnittstitel bis 48 px; weite Weißräume, helle Hero-Fläche, ein blauer Gottesdienstblock. Keine Rundungen, keine Elevation. Vier unbeschnittene Fotos in bewusst unterschiedlichen Größen. Eigener Einstieg, nicht nur Umfärbung des Ausgangsentwurfs.

### 2 · Gemeinde lesen

- Design Read: redaktionelles Gemeindemagazin; Overhaul, Dials **7 / 1 / 5 / 9 / 8**.
- Narrativ: Titelaufmacher und Inhaltsverzeichnis; Gemeindefestfoto als großflächiger gemeinsamer Moment.
- Betrachtungsdistanz: große Zeitungstitel auf Desktop, natürlich umbrechende mobile Überschriften; Kapazität: asymmetrischer Aufmacher mit Index, danach redaktionelle Spalten statt Karten.
- Temperatur: lebendig, kultiviert, offen.
- System: H1 bis 112 px und kräftig, Untertitel bis 48 px, kleine sinnvolle Rubriklabels nur am Aufmacher; Weiß als Hauptfläche, Blau als redaktioneller Schwerpunkt. Trennlinien gliedern Inhaltsblöcke statt dekorativer Karten. Eckig, schattenlos, kein Motion-Inszenieren.

### 3 · Dein erster Schritt

- Design Read: orientierungsstarker Wegweiser; Overhaul, Dials **5 / 1 / 6 / 7 / 9**.
- Narrativ: Einladung plus drei sofort erkennbare Bedürfnisse; Besuchereinstieg über Gottesdienst, Gemeinschaft oder Gespräch.
- Betrachtungsdistanz: kurze beschriftete Linkzeilen mit großen Zielen statt Bedienungsanleitung; Kapazität: kompakte Textzone, drei breite Einstiege, lebendige Bildergalerie, Gottesdienst und Café als klare Folgeziele.
- Temperatur: pragmatisch und herzlich.
- System: H1 bis 72 px; größerer Text in den drei Wege-Links; hellblaue Orientierungsfläche und blaues Titelband, anschließend weißer Galerieraum. Kein Datums- oder Kalenderersatz, keine falschen heutigen Angebote. Vier Fotos, breite Linkziele, keine frei schwebenden Controls.

### 4 · Miteinander, groß gedacht

- Design Read: typografische, selbstbewusste Gemeindeeinladung; Overhaul, Dials **8 / 1 / 3 / 9 / 8**.
- Narrativ: ein großes Miteinander, zwei historische Begegnungsmotive im gemeinsamen blauen Bildraum; dann eine ruhige Glaubenseinladung.
- Betrachtungsdistanz: prägnante große Worte für Desktop, kleinteilig umbrechbar auf 320 px; Kapazität: Typografie trägt den oberen Einstieg, zwei volle Bildformate folgen ohne Überlagerungen.
- Temperatur: energisch, jedoch nicht laut in der Interaktion.
- System: H1 bis 144 px; sehr große Weiß-/Blau-Proportionen, asymmetrisches Foto-Diptychon, große Textpause, konzentrierter Caféblock. Keine Schrägschnitte, kein Beschnitt, kein Text auf Menschenfotos. Details erläutern Gottesdienste, ohne die primäre Route zu verstecken.

### 5 · Zeit zum Ankommen

- Design Read: ruhige, fast buchartige Begegnungsseite; Overhaul, Dials **7 / 1 / 3 / 8 / 9**.
- Narrativ: langsames Ankommen, ein Gesprächsfoto, danach Gottesdienst, Gemeindeleben und Café; Besuchereinstieg über lesbare Nähe und eine beständige Orientierung.
- Betrachtungsdistanz: Desktop mit seitlicher Navigationsspalte, mobil normaler Header ohne fixe Überlagerung; Kapazität: schmaleres Lesemaß, freier Bildraum, natürlich wachsende native Details.
- Temperatur: still, persönlich, unaufgeregt.
- System: H1 bis 80 px mit leichterem Gewicht, Weißraum statt Karten; helle Seitenleiste, zwei schmale Text-/Bildsequenzen, ein breiter Caféabschluss. Kein Sticky-Zwang, kein horizontales Scrollen. Vier Bilder in ihrer vollständigen Proportion.

## Tatsächlich ausgeführte Prüfungen

Reproduzierbarer, ausschließlich Python-Standardbibliothek nutzender Eigencheck im Lieferverzeichnis:

```sh
python3 public/entwuerfe/web-design-engineer/sol/check.py
```

Aus dem Repository-Root ausgeführt und erfolgreich:

- Fünf vollständig balancierte HTML-Tagstrukturen, deutsches `lang`, Doctype, UTF-8, Viewport und exakt ein Header/Main/H1/Footer/Title pro Seite; jeweils fünf oder sechs Inhaltsabschnitte.
- `noindex, nofollow` auf jeder Seite; keine Scripts, Frames, Formulare, API-/CDN-Ressourcen oder extern geladenen Bilder/Fonts.
- Alle Fragmentlinks haben ein eindeutiges Ziel; Routenlinks gehören zu den vorgegebenen realen Einstiegen. Lokale Bild-, Srcset- und Fontdateien vorhanden.
- Pro Seite exakt die vier freigegebenen Fotomotive, vier Figures/Captions, vollständige Originalquellen, Archiv-/2022-Kennzeichnungen und Frank-Lönne-Credit. Original-Logo mit unverändertem 500:272-Seitenverhältnis.
- Manifest als Array mit genau fünf nummerierten Einträgen und vollständigen, eindeutigen Konzeptnamen/Beschreibungen/Strukturangaben.
- CSS-Sanity: balancierte Klammern, lokale Figtree mit swap, Fokus-/Reduced-Motion-Regeln, 44-px-Mindestziele, proportionale Bilder, keine Filter/Bildbeschnitte, keine externen CSS-URLs und ausschließlich die vier deklarierten UI-Farben. Keine nachgestellten Leerzeichen in den HTML-Dateien.
- Kontrastrechnung nach WCAG-sRGB: Ink/Weiß **11,81:1**, Ink/Hellblau **10,50:1**, Aktionsblau/Weiß **5,77:1**. Dieselben Paarungen gelten invers für blaue/dunkle Flächen.

Zusätzlich `git diff --check -- public/entwuerfe/web-design-engineer/sol` ohne Fehler ausgeführt. Da die Dateien neu/untracked sind, ist der explizite Whitespace-Check im Python-Skript der relevante Inhaltscheck.

### Pre-delivery-Selbstcheck

Marke, Herkunft, Archivstatus und Inhalt gegen den Brief geprüft. Fünf unterschiedliche Kompositionen/DOM-Folgen statt CSS-Umfärbungen. Grundstil und Breakpoints für 320/375/390/414, 768 sowie 1440 px vorgesehen: einspaltige mobile Inhalte, mehrspaltige Tablet-/Desktopflächen; die Seitennavigation in Entwurf 5 erst ab 1280 px, darunter normaler Header. Keine fest begrenzten Texthöhen, kein Clipping oder horizontales Karussell. Aufdeckungsanimationen und JavaScript wurden vollständig vermieden. Native Details und Links bleiben ohne JavaScript bedienbar.

Beim Code-Selbstcheck korrigiert: Fokusumrisse benutzen Ink auf hellen Flächen und Weiß auf blauen/dunklen Flächen, statt einen weißen Button-Fokus auf Weiß zu verlieren; Bildnachweise auf mindestens 14 px angehoben. Diese Korrekturen sind im finalen Stand enthalten.

## Bekannte Lücken / Übergabe

- **Keine Browserausführung, Screenshots, tatsächlichen Cross-Viewport-/Overflow-Messungen, Axe-, Tastatur- oder Screenreader-Tests hier.** Der Parent übernimmt zentrale Galerie, Bildaufnahmen, Browserprüfung bei den geforderten Breiten sowie Full Quality. CSS-/Markup-Checks sind kein Ersatz dafür.
- Kein vollständiger W3C-HTML-/CSS-Validator ausgeführt; der Eigencheck prüft die genannten strukturellen Invarianten, nicht jede Browserkonformitätsregel.
- Routen wurden anhand der freigegebenen Quell-/Briefangaben geprüft, nicht per HTTP gegen eine laufende Anwendung. Dateien sind für Auslieferung ab Website-Root mit `/images/` und `/fonts/` gedacht, nicht für isoliertes `file://`-Öffnen.
- Keine echten aktuellen Termine, Meldungen, Gruppenlisten oder ChurchTools-Daten eingebunden. Die vorgesehenen normalen Routen sind bewusst der weitere Einstieg.
- Keine Rechts-/Medien-/Fachfreigabe oder Produktionsabnahme behauptet. `noindex` ist keine Zugriffskontrolle. Keine Commits, Pushes, Deployments oder Linear-Änderungen.

## Dateien

`1.html` Offene Mitte · `2.html` Gemeinde lesen · `3.html` Dein erster Schritt · `4.html` Miteinander, groß gedacht · `5.html` Zeit zum Ankommen. Dazu `manifest.json`, diese `notes.md` und `check.py`. Alle Lieferdateien ausschließlich in `public/entwuerfe/web-design-engineer/sol/`. Temporäre eigene Skill-Arbeitsdateien ausschließlich in `/tmp/akg-129-wde-sol/`.
