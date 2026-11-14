# AKG-129 · Web Design Engineer · Astra

## Auftrag und Quellen

Fünf eigenständige responsive Startseitenentwürfe für **Website AKG**, Milestone **3 · MVP: Kernwebsite**. Kein Eingriff in die produktive Website, keine fachliche Freigabe und kein Launchabschluss. Der Parent verantwortet Linear, zentrale Galerie, Screenshots und Full Quality. Alle Dateien dieses Auftrags liegen ausschließlich in `public/entwuerfe/web-design-engineer/astra/`; temporäre Hilfen erhalten das Präfix `akg129-wde-astra-`.

Verwendeter Design-Skill: `/home/zepi/.pi/agent/skills/web-design-engineer/SKILL.md` (vollständig gelesen). Zusätzlich die erforderlichen Referenzen `references/design-calibration.md`, `references/redesign-protocol.md` und die relevanten Abschnitte von `references/failure-patterns.md`. Keine anderen Design-Skills, keine Unteragenten, keine fremden Agentenergebnisse.

Vollständig gelesene Projektgrundlagen: `docs/design-exploration-brief.md`, `docs/brand-spec.md`, `src/lib/photos.mjs`, `src/lib/site.ts`, `docs/migration/README.md`, `docs/design.md`, `src/pages/index.astro`, `src/styles/globals.css`. Original-Logo und alle vier Fotomotive wurden als lokale Bilder gesichtet. Marken-/Inhaltsprüfung erfolgt gegen diese ausdrücklich freigegebenen Projektquellen, nicht gegen unbestätigte aktuelle Angaben der alten Website. Keine neuen Bilder oder aktuellen Fakten recherchiert oder ergänzt.

**Ablaufabweichungen aufgrund des expliziten Auftrags:** Alle fünf Richtungen und ihre vollständige Ausarbeitung sind bereits bestätigt. Deshalb keine erneuten Skill-Checkpoints oder v0-Freigabeschleifen. Fünf eigenständige Dateien statt des allgemeinen Skill-Defaults eines Varianten-/Tweaks-Panels; keine zusätzliche Entwickleroberfläche innerhalb der fertigen Startseiten. Keine Bildgenerierung. Der Skill verlangt für diesen Auftrag keine zusätzlichen Generierungsskripte. Browser-Acceptance und visuelle Vergleichsbilder liegen beim Parent, nicht bei diesem Teilauftrag.

## Bestandsaudit und geschützte Verträge

- Ausgangspunkt: hellblauer Zweispalten-Hero mit Original-Logo, Figtree, quadratischen Aktionen; gefolgt von Gottesdienst, Gemeindeleben, Café und Meldungen.
- Bewahren: Logo, lokale Schrift, vier unverzerrte und unbeschnittene Menschen-/Caféfotos, Quellen-/Archivkennzeichnung, persönliche Sprache, fünf Navigationsziele, bekannte slashlose Routen, keine unfreigegebenen aktuellen Daten, semantische und tastaturbedienbare HTML-Grundstruktur.
- Variieren: Besuchereinstieg, Position/Gewicht der Fotos, Flächenanteile, Schriftgewichte und Seitentakt. Keine Änderungen an Datenintegration, Freigabeschaltern, produktiven Komponenten, Rechtstexten oder Routen.
- Entfernen/vermeiden: imaginäre Termine, Kachelteppiche, falsche Testimonials, Gebäude als Hauptmotiv, dekorative Metadaten, JS-Pflicht und externe Ressourcen.
- Höchstes Risiko: Historische Bilder könnten als heutige Veranstaltung missverstanden werden. Gegenmaßnahme: sichtbare individuelle Bildunterschriften mit Archiv-/2022-Einordnung und Originalquelle an jedem Foto.
- Rückfall: Die bestehenden Produktseiten bleiben unverändert. Entwürfe sind einzeln verlinkbare statische Dateien.

## Design Read und fünf Regler

**Artefakt:** öffentliche Website-Startseiten als Gestaltungsvergleich. **Zielgruppe:** erstmals Interessierte und bereits verbundene Gemeindemenschen. **Modus:** isolierte Redesign-Exploration (1/4 vertrauter, 2/3/5 stärkere Neukomposition). Markenidentität und Inhalte bleiben geschützt.

| Entwurf                   | Sprache und Besuchereinstieg                                         | Varianz | Bewegung | Dichte | Assets | Marke |
| ------------------------- | -------------------------------------------------------------------- | ------: | -------: | -----: | -----: | ----: |
| 1 · Die offene Tür        | Menschlich-vertraute Einladung, Gesprächsfoto auf hellem Blau        |       4 |        1 |      4 |      8 |     9 |
| 2 · Dein erster Schritt   | Besuchsorientierter Wegweiser, direkte Auswahl des Anliegens         |       5 |        1 |      6 |      7 |     9 |
| 3 · Nah dran              | Redaktionelles Gemeindemagazin, große Typografie und Fotodoppelseite |       7 |        1 |      4 |      9 |     8 |
| 4 · Zeit zum Ankommen     | Ruhige, offene Lesefolge, Gottesdienst als erster Vertiefungspunkt   |       5 |        1 |      3 |      8 |     9 |
| 5 · Mitten im Miteinander | Plakative blaue Fläche, Seitenleiste und unmittelbare Du-Ansprache   |       8 |        2 |      4 |      8 |     8 |

Die Varianz verändert tatsächlich das Raster (klassische Einladung, Wegweiser, Magazin, zentrierter Leseraum, Seitenleiste). Die niedrige Bewegung bedeutet vollständig sichtbare Inhalte ohne Eintrittsanimationen; nur Zustandsfeedback. Dichte verändert Schriftmaß, Spalten und Textpausen. Asset-Abhängigkeit bedeutet vier echte Fotos je Entwurf, keine Ersatzgrafiken. Markenbindung hält Palette, Logo und Figtree konstant.

## Vier Positionierungsfragen je Entwurf

1. **Die offene Tür** — Narrativ: Willkommen → gemeinsamer Glaube → Gemeindeleben → Café → Aktuelles. Betrachtung: Smartphone aus der Hand und Laptop, keine Präsentation. Temperatur: nahbar und vertraut. Kapazität: kompakte Einladung neben proportionalem Foto; nachfolgend bewusster Wechsel zwischen breitem Farbraum und offenen Bild-/Textabschnitten.
2. **Dein erster Schritt** — Narrativ: Anliegen wählen → Gottesdienst verstehen → Gemeinde entdecken → Café besuchen → Kontakt/Meldungen. Betrachtung: schnelle Orientierung auf Telefon und Desktop. Temperatur: zugewandt und klar. Kapazität: drei große Links statt vieler Angebote; Details reduzieren Sekundärtext, ohne Hauptinformationen zu verstecken.
3. **Nah dran** — Narrativ: Einladung als redaktioneller Auftakt → zwei historische Begegnungen → Gottesdienst → Angebote → Café → Meldungen. Betrachtung: lesendes Erkunden. Temperatur: lebendig und journalistisch, ohne erfundene News. Kapazität: asymmetrische Bilddoppelseite, kurze Absätze und deutlich abgestufte Textgrößen.
4. **Zeit zum Ankommen** — Narrativ: Ankommen → Gottesdienst → Gespräch und Alltag → Café → weiterführende Einstiege. Betrachtung: ruhiges Lesen, mobile Reihenfolge identisch zur DOM-Reihenfolge. Temperatur: gelassen und offen. Kapazität: schmalere Textmaße, viel Weißraum und kleinere Bildbreiten statt bildschirmfüllender Fotos.
5. **Mitten im Miteinander** — Narrativ: Du und Gemeinde → Miteinander → Glauben → Café → Aktuelles. Betrachtung: visuelles Erkunden mit stabiler Desktop-Seitennavigation; mobile Navigation im Fluss. Temperatur: kraftvoll und freundlich. Kapazität: große Wörter in flexiblen Spalten, keine abgeschnittene Displaytypografie; Seitenleiste entfällt unter 1100 px.

## Design Decisions vor der Implementierung

- **Anchor:** eigens aus dem AKG-Bestand abgeleitet, kein Fremdmarkenrezept.
- **Palette:** Ink `#173b50`, Aktionsblau `#006c9e`, Weiß `#ffffff`, helle Fläche `#eaf3f7`. Linien werden aus diesen Farben abgeleitet. Fotos behalten Originalfarben. Keine beige Fläche, keine Verläufe, keine Bildfilter.
- **Typografie:** ausschließlich lokale Figtree Variable (`300–900`, `font-display: swap`). Fließtext 17–18 px, Hinweise 14 px, Lead 19–23 px. Fluid skalierende Überschriften; 1 mittelkräftig, 2 klare Wegweisergewichte, 3 dichter Editorial-Display, 4 leichtere große Schrift, 5 kräftige Plakatschrift.
- **Abstände:** 8-px-Basis, Stufen 8/16/24/32/48/64/96/128. Fluid skalierende Seitenränder (18–48 px) und vertikale Abschnittsabstände. Textmaß ungefähr 42–62 Zeichen.
- **Formen:** 1 kantig und offen; 2 kleine Rundung nur am Wegweiser; 3 kantige Redaktion mit funktionalen Trennlinien; 4 runde Hauptaktion bei ungefassten Bildern; 5 scharfkantige plakative Flächen. Bilder bleiben vollständig rechteckig sichtbar.
- **Schatten:** keine.
- **Bewegung:** keine automatischen Animationen. Höchstens 140-ms-Farbfeedback an Aktionen unter `prefers-reduced-motion: no-preference`. Kein Scroll-Hijacking, keine überlagerten Bildtexte.
- **Interaktion:** native Links und `details/summary`, Mindesthöhe 44 px, sichtbarer Fokus, Skip-Link, genau ein H1/main. Kein JavaScript, keine Formulare, keine Embeds und keine Laufzeitabhängigkeiten.
- **Bildquelle:** `/images/apostel-logo.png` (unverändert 500 × 272) und je die lokalen 640/960/1280-WebP-Varianten von `gemeinde-gottesdienst`, `gemeinde-gespraech`, `gemeinde-fest`, `cafe-dreimaster`. Quellen/Urheber/Archivstatus gemäß `docs/brand-spec.md`; keine offene Lizenz behauptet.

## Ausarbeitung und lokale Korrekturen

Alle fünf Dokumente sind vollständig und direkt erreichbar, jeweils mit fünf Hauptabschnitten plus Header/Footer. Jedes enthält genau die vier freigegebenen Menschen-/Caféfotos und das unveränderte Logo. Keine Architektur-Ersatzbilder. Alle Styles liegen inline; keinerlei JavaScript, externe Laufzeitressourcen, Frameworks oder neue Pakete.

Im Eigenreview korrigiert: Eine Formulierung, die verfügbare aktuelle Termine hätte versprechen können, wurde durch den ehrlichen Entwurfsstatus ersetzt. Die internen Wegweiser in Entwurf 2 tragen Abwärtspfeile statt externer Linkpfeile. Mobile Bild-/Textbereiche in 2 und 5 behalten ihre DOM-Reihenfolge. Entwurf 4 hat einen frei umbrechenden, auf breiten Ansichten einzeiligen Willkommenstitel ohne wiederholtes Marken-Eyebrow; so rückt das echte Gottesdienstfoto früher in die Lesefolge.

## Tatsächlich ausgeführte Checks

**Erfolgreich:** `python3 public/entwuerfe/web-design-engineer/astra/check.py` — zuletzt nach allen HTML-Korrekturen ausgeführt, Exit 0. Der wiederholbare, abhängigkeitenfreie Check bleibt in diesem Verzeichnis.

Geprüft für alle fünf Seiten:

- Doctype, UTF-8, `lang="de"`, viewport, eindeutiger Titel und `noindex, nofollow`.
- Ausgewogene explizite HTML-Tags, keine doppelten Attribute oder IDs, keine verschachtelten Links; genau ein Header/main/H1/Footer und jeweils fünf Sections.
- Überschriftenfolge, `aria-labelledby`-Ziele, Skip-Link, keine positiven Tabindices und native Summary-Struktur.
- Alle Sprungziele vorhanden; interne Links ausschließlich die fünf freigegebenen Routen; Café und Originalquellen exakt auf der Allowlist.
- Fünf Bilder pro Seite (Logo plus vier Fotos), vorhandene lokale Dateien einschließlich sämtlicher `srcset`-Varianten und Schriftdatei; Bilddimensionen gegen WebP-Dateiheader geprüft.
- Pro Foto individuell zugeordneter Originalquellenlink, sichtbarer Archiv-/2022-Status und Frank-Lönne-Credit beim Gottesdienstbild.
- Ehrlicher Meldungsstatus; keine Scripts, Formulare, eingebetteten Frames, erfundenen Zeitdatensätze oder externen Ressourcen.
- Statische CSS-Schutzregeln: lokale Schrift mit swap, Fokus, Mindestzielhöhe 44 px, responsive Media Queries, automatische Bildhöhe, reduced-motion, keine Cover-Beschnitte/Filter und ausgeglichene CSS-Klammern. Das ist keine gerenderte Layoutmessung.
- Manifest: exakt fünf Einträge mit den vereinbarten Feldern, Nummern und unterschiedlichen Namen.
- Keine nachgestellten Leerzeichen in den fünf HTML-Dateien.

Berechneter Textkontrast der deklarierten Farbkombinationen: Ink/Weiß **11,81:1**, Ink/Hellblau **10,50:1**, Weiß/Aktionsblau **5,77:1**, Aktionsblau/Hellblau **5,13:1**. Alle mindestens 4,5:1; keine Behauptung eines vollständigen gerenderten Kontrast-Audits.

Zusätzlich durchgeführt: Quellcode-Selbstcheck nach der Pre-delivery Checklist des Skills gegen Markenasset, Inhaltsgrenzen, klare Hierarchie, variierende Abschnittsstruktur, native Aktionen und relevante Failure Patterns. Keine kosmetischen Umfärbungen desselben Haupt-DOMs, keine Testimonials/Statistiken, keine Beigepalette, keine Showeffekt-Animationen.

## Bekannte Lücken / Übergabe an Parent

- **Nicht ausgeführt:** Browser-Rendering, Screenshots, tatsächliche Tastatur-/Fokusprüfung, gemessene Überbreite bei 320/375/390/414/768/1440, Zoom-/Screenreader-Tests oder automatisierter HTML5-/WCAG-Validator. Der Eigencheck ist ein statischer Quellencheck, keine Browserabnahme.
- Responsive Regeln sind implementiert; die zentrale Browserprüfung einschließlich der genannten Breiten und `details`-Menüs liegt ausdrücklich beim Parent. Besonders prüfen: große Typografie in 3/5, schmale Bildnachweise und der Wechsel zur Desktop-Seitenleiste ab 1100 px in 5.
- Das Repository-Quality-Gate wurde in diesem Teilauftrag nicht ausgeführt; keine Installation vorgenommen. Der Parent prüft den Gesamtstand.
- Reale Unterseiten und externe Ziele sind nicht per Netzwerk auf Erreichbarkeit geprüft. Links nutzen ausschließlich die freigegebenen Ziele; Fotoquellenlinks sind Herkunftsnachweise, keine Laufzeit-Requests.
- Meldungen, Gruppenlisten und Termine sind absichtlich nicht als aktuelle Daten eingebunden. Medienfreigabe folgt dem gemeinsamen Brief; keine zusätzliche Rechte-/Personenfreigabe oder offene Lizenz behauptet.
- Keine fachliche, rechtliche oder Produktionsfreigabe, keine Commits/Pushes/Deployments/Linear-Änderungen. `noindex` ist kein Zugangsschutz.
