# AKG-129 · Hallmark · fünf Startseitenentwürfe

Projekt **Website AKG**, Milestone **3 · MVP: Kernwebsite**. Reine Gestaltungsexploration; keine fachliche, rechtliche oder produktive Abnahme.

## Umfang und Quellen

Ausschließlich `public/entwuerfe/hallmark/astra/` bearbeitet. Fünf eigenständige HTML-Dokumente, inline CSS, gemeinsame lokale Originalassets. Kein JavaScript, Build, Frameworkgerüst, Installationslauf, Commit, Push, Deployment oder Linear-Eingriff. Keine anderen Agentenergebnisse gelesen oder kopiert. Keine T3-Preview-Tabs, keine Unteragenten.

Vollständig gelesen:

- `docs/design-exploration-brief.md`
- `.pi/skills/hallmark/SKILL.md` (beide aufgrund der Ausgabelänge erforderlichen Teile)
- Projektquellen: `docs/design.md`, `docs/brand-spec.md`, `src/lib/photos.mjs`, `src/lib/site.ts`, `docs/migration/README.md`, `src/pages/index.astro`; vorhandene Stil-/Paketdefinitionen geprüft.

**Einziger verwendeter Design-Skill:** `.pi/skills/hallmark/SKILL.md`, Version 1.1.0. Keine Mischung mit globalen Design-Skills.

Verwendete Hallmark-Referenzen: `macrostructures.md`, `component-cookbook.md`, `genres/editorial.md`, `typography.md`, `color.md`, `layout-and-space.md`, `motion.md`, `copy.md`, `anti-patterns.md`, `microinteractions.md`, `responsive.md`, `custom-theme.md`, `structure.md`, `assets.md` (vorhandene Fotografie), `hero-enrichment.md` (Bildbedarf/E8), `interaction-and-states.md`, anschließend `slop-test.md` und `contract.md`. Die jeweils gewählten Einzeldateien zu Letter, Index-First, Photographic, Manifesto, Conversational FAQ sowie H5/H6, N9/N3/N6/N7, Ft6/Ft4/Ft1/Ft5/Ft2 und C3/S2 wurden gelesen. N12 wurde geprüft und verworfen: Ohne echte Ankündigung wäre ein einfahrendes Ankündigungsband künstlich; Entwurf 5 erhält stattdessen ein einfaches eigenes natives Menü.

Die lokale Hallmark-Kopie enthält keine ausführbaren Skill-Skripte. Für den Eigencheck wurde das vorhandene Playwright benutzt, nicht neu installiert.

## Vorprüfung und Festlegungen

- Figtree lokal, `src/styles/globals.css:3–13`.
- Markenfarben Weiß, Ink `#173b50`, Aktionsblau `#006c9e`, Hellblau `#eaf3f7`, `src/styles/globals.css:14–21`. Die HTML-Token enthalten farbmetrisch umgerechnete OKLCH-Werte, keine abweichende Fremdpalette.
- Vorhandene flüssige Seiten-/Abschnittsabstände, `src/styles/globals.css:23–29`; Ergänzung mit benannten 4-px-Abständen.
- Astro/Tailwind laut `package.json:19–38`; für diese Exploration ausdrücklich keine Frameworkintegration.
- Motion-cut: keine Motion-Bibliothek, keine dekorative Bewegung. Hover/Focus/Active reagieren unmittelbar; native Offen-/Geschlossen-Zustände bei `details`.
- Zielgruppe aus Brief abgeleitet: neue Besucher:innen und Menschen, die die Gemeinde bereits kennen.
- Hauptziel: Gemeinde kennenlernen; Gottesdienste bleiben direkt erreichbar.
- Archivbilder geben Atmosphäre, nicht aktuelle Personenzuordnungen oder Termine.

Planungs-/Exportartefakte liegen ausschließlich in `.hallmark/` unter diesem Verzeichnis: `preflight.json`, `log.json`, `tokens.css`, `check-results.json`. `tokens.css` ist ein Export; die fünf HTML-Dateien enthalten ihre Token selbst und benötigen keine zusätzliche CSS-Datei. Kein Root-Designsystem wurde angefasst.

## Fünf Ideen und strukturelle Unterschiede

| Datei    | Konzept                      | Besuchereinstieg und Rhythmus                                                                                                                                                                                            | Navigation / Abschluss                                                             |
| -------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| `1.html` | **Ein Brief an dich**        | Persönliche Ansprache mit schmalem Lesemaß und kleinem Gesprächsfoto im Rand; danach Textfluss und größere eingeschobene Bilder statt durchgehend wechselnder Spalten. Ruhige Weißflächen, ein hellblauer Caféabschnitt. | N9-inspirierter Randheader mit nativem Menü; Ft6-Briefabschluss.                   |
| `2.html` | **Dein Weg in die Gemeinde** | Anliegen zuerst: große Textlinks als Inhaltswegweiser. Links eine auf breiten Ansichten bleibende Navigationsleiste; danach Gemeinde/Angebote vor Gottesdiensten, Café und kompakten Meldungen.                          | N3-inspirierte aufrechte Seitenleiste, mobil Menü; Ft4-Kolophon.                   |
| `3.html` | **Bilder vom Miteinander**   | Fotografie trägt die Seite: breites Gottesdienstbild, kurze Textbrücken, asymmetrisches Bildpaar zum Gemeindefest und großes Cafépanorama.                                                                               | N6-Masthead mit Original-Logo und eigener Linkzeile; Ft1-Markenabschluss.          |
| `4.html` | **Raum für deine Fragen**    | Offene Fragen als Einladung: dunkles blaues Typoplakat, danach Gottesdienst, große Miteinander-Aussage, versetzte Menschenbilder, hellblaues Café und kurzer Schluss.                                                    | N7-inspirierte kräftige Navigation ohne zusätzlichen CTA; Ft5-Schlussgedanke.      |
| `5.html` | **Erst einmal ankommen**     | Ein Willkommensdialog mit Fragen als Abschnittstiteln; Antworten bleiben zunächst offen und sind nativ einklappbar. Eigenständiger Ablauf für Gottesdienst, Gemeindeleben, Café sowie Aktuelles/Kontakt.                 | Kompaktes Menü plus dauerhaft sichtbarer Gottesdienstlink; Ft2-Einzeilenabschluss. |

Jede Seite hat fünf gehaltvolle Abschnitte, genau ein `main`/H1, einen Skip-Link, semantische Überschriften und einen kompakten Footer. Gemeinsame Grundregeln für Typografie/Assets dienen der Marke; die Makrostruktur, Reihenfolge, Gewichtung, Navigation und Abschlüsse sind nicht bloße Farbwechsel.

### Hallmark-Anpassungen an den verbindlichen Brief

- Keine erneuten Fragen, Bestätigungen oder Checkpoints: Der Nutzer hat die vollständige Exploration schon bestätigt.
- Markenbindung statt Katalogrotation: Figtree bleibt die einzige Familie; Weiß/Blau bleiben fest. Die strukturelle Rotation läuft über fünf unterschiedliche Makrostrukturen und Navigationen/Abschlüsse. Keine neue Wortmarke.
- Weiß als Markenfläche ist eine bewusste Vorgabe; damit werden Hallmarks pauschale Gates 7/22 (reines Weiß/Nullchroma) nicht als bestanden ausgegeben. Figtree-Paarung, andere Akzentfamilien oder künstliche zusätzliche Schriften wären hier falsch.
- Hero-Fotografie ohne Ausschnitt, Filter, Overlay oder Farbveränderung. Die Crop-/Desaturationsbeispiele des Skills werden ausdrücklich nicht übernommen.
- Native Links und `details` haben Default/Hover/Focus/Active sowie Offen-/Geschlossen-Zustände. Keine fiktiven Loading-/Error-/Disabled-/Success-Zustände für Aktionen, die keine Daten ändern.
- Flüssige Außenränder und prozentuale Kompositionsabstände ergänzen die benannte Abstandsskala. Kurze Einladungstexte dürfen schmaler als das Langtextmaß 45–75ch stehen.
- Normale CTA-/Navigationslabels bleiben in den geprüften Standardbreiten einzeilig. Bei 200 % Textvergrößerung dürfen Aktionslabels wachsen/umbrechen, statt abgeschnitten zu werden.
- Der fotografische Entwurf 3 lässt das große, unbeschnittene Bild bewusst über den ersten Laptop-Fold hinausreichen. Einladung und Hauptlinks stehen davor; kein Crop nur zur Erfüllung einer pauschalen Fold-Vorgabe.
- Kein unbelegtes „58/58“-Siegel. Die anwendbaren Hallmark-Gates wurden als Gestaltungs-/Codecheck durchgegangen; Markenvorgaben und obige bewusste Anpassungen sind dokumentiert.

## Bilder und Daten

Alle vier freigegebenen Motive erscheinen in **jeder** Seite, proportional mit intrinsischen Abmessungen und responsiven lokalen Varianten:

- Gottesdienst · Archivfoto, Foto **Frank Lönne**; Original: https://akg-kiel.de/wp-content/uploads/2024/01/2024_Banner_allianz_1.jpg
- Im Gespräch · **Gemeindefest 2022**; Quelle akg-kiel.de: https://akg-kiel.de/wp-content/uploads/2022/05/Gemeindefest-22-VIII.jpg
- Zeit miteinander · **Gemeindefest 2022**; Quelle akg-kiel.de: https://akg-kiel.de/wp-content/uploads/2022/05/Gemeindefest-22-XII.jpg
- Café Dreimaster · Archivfoto; Quelle akg-kiel.de: https://akg-kiel.de/wp-content/uploads/2024/01/Banner_Dreimaster.jpg

Vollständige Originalquellen sind unmittelbar unter jedem Bild verlinkt. Keine CC-Lizenz für Gemeindefotos behauptet. Original-Logo unverändert auf Weiß, 500 × 272; lokale Figtree mit `font-display: swap`. Kein externes Bild-/Font-/CDN-Laden.

Keine erfundenen Termine, Kontakte, Öffnungszeiten, Gruppenlisten, Statistiken, Zitate oder ChurchTools-Daten. Die fehlende Meldungseinbindung ist unaufgeregt benannt. Café Dreimaster führt ausdrücklich **extern** zu `https://cafe-dreimaster.de/`. Keine unbestätigte Konzertadresse ergänzt. `noindex, nofollow` in allen fünf Dokumenten; keine Aussage, dass dies eine Zugangssperre wäre.

## Tatsächlich ausgeführte Prüfungen

Wiederholbarer Eigencheck:

```sh
PLAYWRIGHT_MODULE=/tmp/akg-parking-tools/node_modules/playwright-core/index.mjs \
  node public/entwuerfe/hallmark/astra/check.mjs
```

Bei lokal installiertem Repository-Playwright reicht `node public/entwuerfe/hallmark/astra/check.mjs`. Der Umgebungsparameter zeigt lediglich auf ein bereits vorhandenes Modul. Ein vorhandener Chromium muss verfügbar sein.

**Ergebnis:** bestanden, Chromium **156.0.8078.80**, JavaScript abgeschaltet, reduzierte Bewegung aktiviert.

- **40 Seiten-/Breitenkombinationen:** fünf Seiten × 320, 375, 390, 414, 768, 1280, 1440, 1920 px. 1280 px ausdrücklich bei 800 px Höhe.
- Kein horizontales Dokument-Overflow, keine überbreiten Überschriften/Absätze/Bilder/Links. Normale interaktive Labels ohne zweizeiligen Umbruch.
- Zielgrößen: sichtbare Links mindestens 44 × 44 CSS-px, Summaries mindestens 44 px hoch.
- Menüs auf allen sichtbaren Menübreakpoints per Tastatur geöffnet/geschlossen; fünf Hauptziele im offenen Menü. Alle drei Antwort-Details in Entwurf 5 per Enter/Leertaste umgeschaltet.
- Skip-Link fokussiert, Fokusmarkierung geprüft, Sprung/Fokus auf `main` bestätigt.
- **200 % Root-Textgröße bei 390 und 1440 px**, alle fünf Seiten: keine horizontalen Überläufe. Kein Ersatz für alle Browser-Zoom-/Text-only-Zoom-Modi.
- Berechnete Text-/Hintergrund-Kontraste mittels Browser-CSS und sRGB-Luminanz geprüft. Kleinster beobachteter Wert **5,71:1**, damit auch über 4,5:1 für kleinen Text.
- Vier vollständige, beschriftete Fotos pro Seite; alle Bilder erfolgreich dekodiert, natürliche Proportionen und Logoquelle geprüft.
- HTML-Grundstruktur, Sprache, Robots-Meta, eindeutige IDs, genau ein Main/H1, fünf Abschnitte, interne Fragmentziele geprüft.
- Keine Skripte, Frames, Formulare, externen Ressourcenrequests, CSS-Imports, Cover-Crops oder Filter.
- Fünf echte Inhaltsrouten im Repository überprüft; `/kontakt` ist in `src/pages/[page].astro` über `getStaticPaths` definiert. Kein HTTP-End-to-End-Test des Astro-Workers.
- Manifest: genau fünf Einträge, Nummern 1–5, eindeutige Titel und exakt die vier verlangten Felder.
- Eigene Ganzseitenaufnahmen bei 390/1440 px visuell durchgesehen. Diese privaten Prüfaufnahmen liegen nur unter `/tmp/akg129-hallmark-astra-review/`; keine zentrale Galerie/Screenshotreihe erzeugt oder geändert.
- `git diff --check -- public/entwuerfe/hallmark/astra` ausgeführt; keine Meldung. Die neuen Dateien sind untracked, deshalb ist dieser Git-Check allein kein Inhaltsvalidator.

### Korrekturen im Eigenlauf

1. Der erste Routencheck suchte `/kontakt` nur als eigene Datei; er wurde auf die bestehende dynamische Static-Paths-Definition korrigiert. Kein kaputter Kontaktlink in den Entwürfen.
2. Nach dem ersten Sichtdurchgang wurde Entwurf 1 konsequenter zum Brief-/Lesefluss umgebaut; kein durchgängiges Zickzack von gleichartigen Bild/Text-Blöcken.
3. Gestreckte Grid-Buttons wurden auf Inhaltsbreite begrenzt. Der nicht-interaktive Main-Sprunganker bekommt keinen seitenumlaufenden Browser-Fokusrahmen; interaktive Fokusmarkierungen bleiben erhalten.
4. Aktionslabels können bei Textvergrößerung umbrechen. Alle Prüfungen wurden danach wiederholt.

### Pre-emit-Selbstkritik

Für jeden der fünf Entwürfe: **P4 · H4 · E4 · S5 · R5 · V5**. Keine Kategorie unter 3. Klarer Besuchereinstieg, nachvollziehbare Hierarchie, echte AKG-Assets, bewusste Zurückhaltung und unterschiedliche Makrostrukturen. Die Ausführung wird nicht als browserübergreifend abschließend bewertet. Dieselben Werte sind als Hallmark-Kommentar im jeweiligen CSS hinterlegt; keine Rangliste der Konzepte.

## Bekannte Lücken / Übergabe an Parent

- **Zentrale Galerie, finale Vergleichsscreenshots und Full Quality bleiben beim Parent.** Kein `pnpm quality`, Astro-Build oder Worker-Integrationstest durch diesen Subauftrag.
- Kein axe-Lauf, Safari/Firefox, physisches Mobilgerät, echter Screenreader oder vollständige WCAG-Zertifizierung. Fokuskontrast wurde visuell beurteilt; die automatische Kontrastmessung deckt Text ab, nicht jedes Outline-Pixel.
- Navigation zu bestehenden Inhaltsrouten verlässt den statischen Entwurf und führt zur vorhandenen Website. Die Kontaktseite enthält weiterhin projektweit fehlende Kontaktfreigaben; es wird kein Formular oder freigegebener Kontakt erfunden.
- Aktuelle Meldungen, Termine und Gruppen werden absichtlich nicht geladen. Kein ChurchTools-E2E-Test, keine neuen Datenfreigaben.
- Die Gestaltungsunterschiede bleiben innerhalb der vorgegebenen Figtree-/Blau-/Weiß-Marke; farbliche Themenrotation wurde nicht vorgetäuscht.
- Keine fachliche Freigabe, kein Launchabschluss, kein Merge und kein Deployment.
