# Marke und Medien · AKG-127

Stand 2026-10-28. Gestaltungsvorschau, keine Produktions-/Inhaltsabnahme. Quellenrecherche: [redesign-content-research.md](redesign-content-research.md).

## Original-Logo

- `public/images/apostel-logo.png`: unveränderte Originaldatei [logo-akg-500px.png](https://akg-kiel.de/wp-content/uploads/2019/09/logo-akg-500px.png), 500 × 272 px.
- Auf ausdrücklichen Nutzerwunsch beibehalten; gleiche Wort-/Bildmarke wie auf der bestehenden Website. Keine Nachzeichnung, kein Filter, keine Umfärbung und kein Beschnitt.
- Verwendung auf hellem Hintergrund im Header und als Favicon; der kompakte Footer führt nur den Gemeindenamen. Die frühere erfundene `akg.`-Wortmarke und ihr SVG-Favicon sind entfernt.
- Keine offene Lizenz behauptet. Nutzerauftrag und Herkunft sind dokumentiert; umfassende Medienabnahme bleibt AKG-67/72.

## Gebäudefotos · bestehender Bestand

Vier Fotografien: drei von **Matthias Süßen / Wikimedia Commons**, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/); die Seitenansicht von **Rüdiger Stehn / Wikimedia Commons (via Flickr)**, [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/). Nicht aus WordPress migriert. Keine identifizierbaren Personen in den ausgewählten Motiven. Keine Aussage zu aktuellen Öffnungszeiten, Veranstaltungszuordnung oder Zugang aus den Bildern ableiten.

| Lokale Varianten                                      | Original / Herkunft                                                                                                                                          | Motiv                                                      |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------- |
| `public/images/petruskirche-{640,960,1440}.webp`      | [Petruskirche-Wik-2024-msu-2530.jpg](https://commons.wikimedia.org/wiki/File:Petruskirche-Wik-2024-msu-2530.jpg), 5000 × 4000, Aufnahme 2024-08-01           | Außenansicht mit Turm und Vorplatz                         |
| `public/images/petruskirche-dach-{640,960,1440}.webp` | [Petruskirche-Kiel-2026-09-msu--3400.jpg](https://commons.wikimedia.org/wiki/File:Petruskirche-Kiel-2026-09-msu--3400.jpg), 6960 × 4640, Aufnahme 2026-04-19 | Offener Holzdachstuhl, kein Altar/Kunstwerk als Hauptmotiv |

Ergänzungen der Taste-Runde, nach Sichtung der Originale:

- `public/images/petruskirche-portal-{640,960,1440}.webp`: [Petruskirche (Kiel-Wik)-msu-2532-2532.jpg](<https://commons.wikimedia.org/wiki/File:Petruskirche_(Kiel-Wik)-msu-2532-2532.jpg>), Matthias Süßen, CC BY-SA 4.0, 2837 × 4255, Aufnahme 2024-08-01. Backsteinportal mit Tür und Laterne; Hochformat erhalten.
- `public/images/petruskirche-seite-{640,960,1440}.webp`: [Petruskirche Kiel 15 (16739510725).jpg](<https://commons.wikimedia.org/wiki/File:Petruskirche_Kiel_15_(16739510725).jpg>), Rüdiger Stehn, CC BY-SA 2.0, 5184 × 3456, Aufnahme 2015-03-05. Historische Seitenansicht; nicht als aktueller Gebäudezustand darstellen. Die im Original knapp angeschnittene Turmspitze wird nicht weiter beschnitten. [Flickr-Ursprung](https://www.flickr.com/photos/rstehn/16739510725/).

Commons-Seitenrevisionen der Ergänzungen: 976708999 und 965124391. Flickr-Lizenzreview für die Seitenansicht vom 2023-07-17; Flickr-Lizenz heute nicht separat geprüft. Die CC-Lizenzen sind keine Garantie für sämtliche Architektur-, Haus- oder Aufnahmerechte. Entsprechende Projektfreigabe bleibt erforderlich.

Bearbeitung: mit vorhandenem `sharp` proportional auf 640/960/1440 px verkleinert und als WebP (Qualität 82) komprimiert; Metadaten entfernt, motivabhängiger Ausschnitt durch `object-fit: cover`. Keine inhaltlichen Bildmanipulationen. Bearbeitete Bilddateien behalten die jeweilige Lizenz: **CC BY-SA 4.0**, bei der Seitenansicht **CC BY-SA 2.0**. Sichtbare Bildunterschriften in `Photo.astro` verlinken jeweils Autor/Original und Lizenz und nennen die Bearbeitung. Lizenz gilt für diese Fotografien, nicht pauschal für Logo, Schrift oder Anwendungscode.

Diese Gebäudefotos bleiben als Bestand erhalten; Außenansicht und Dachstuhl werden auf Unterseiten verwendet. Auf der Startseite ersetzen die folgenden Gemeindefotos die Architekturserie. Kein Hotlink, kein externes Image-CDN, keine Stockkirche und keine KI-Gemeindefotos. Für die Produktionsfreigabe sind die projektbezogene Medienabnahme und gegebenenfalls weitere Rechte zu bestätigen.

## Gemeindeleben · ausgewählte Bestandsfotos nach Nutzerwunsch

Der Nutzer hat am 2026-10-28 ausdrücklich Bilder von **akg-kiel.de** und einen stärkeren Menschenbezug gewünscht. Ausgewählt wurden vier vorhandene Fotos, nicht neue Gruppen-/Personendatensätze oder alte Veranstaltungsartikel. Originale und Motive wurden einzeln geöffnet; die folgenden Quellen/öffentlichen WordPress-Metadaten wurden geprüft.

**Nutzerfolgeauftrag am 2026-11-13:** Alle Fotos sollen ausdrücklich auch in die öffentlich erreichbare Vorschau, ohne zusätzlichen Zugangsschutz; anschließend ausdrücklich auch für Produktiv erlaubt. Das ist die dokumentierte Auslieferungsentscheidung für `publicApproved: true` in `src/lib/photos.mjs`. Es wird weiterhin weder eine offene Lizenz noch eine eigenständig geprüfte abschließende Urheber-/Personenfreigabe behauptet. Die weitergehende Dokumentation von AKG-67/72 bleibt offen. `noindex` ist keine Zugriffskontrolle und kein Rechtebeleg; alle Seiten und lokalen Bilddateien erhalten trotzdem die gewünschte Indexierungssperre.

| Lokaler Name unter `public/images/`         | Quelle / öffentliche Medienmetadaten                                                                                                                                                                                                                | Belegter Credit und Einordnung                                                                                                                                                              |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `gemeinde-gottesdienst-{640,960,1280}.webp` | [2024_Banner_allianz_1.jpg](https://akg-kiel.de/wp-content/uploads/2024/01/2024_Banner_allianz_1.jpg), 1300 × 740; [Medium 28268](https://akg-kiel.de/wp-json/wp/v2/media/28268), Upload 2024-01-26; als Gottesdienstmotiv auf der alten Startseite | `image_meta.credit`: **Frank Lönne**. Aufnahmedatum nicht belegt; sichtbar als Archivfoto. Keine Aussage zu aktuellen Teilnehmenden oder Veranstaltungszeiten.                              |
| `gemeinde-gespraech-{640,960,1280}.webp`    | [Gemeindefest-22-VIII.jpg](https://akg-kiel.de/wp-content/uploads/2022/05/Gemeindefest-22-VIII.jpg), 1619 × 1080; [Medium 17194](https://akg-kiel.de/wp-json/wp/v2/media/17194), Upload 2022-05-04                                                  | Fotograf/in und Copyright-Feld leer; nur **Quelle: akg-kiel.de**, keine erfundene Autorenschaft. Historisches Gemeindefest **2022** sichtbar benannt.                                       |
| `gemeinde-fest-{640,960,1280}.webp`         | [Gemeindefest-22-XII.jpg](https://akg-kiel.de/wp-content/uploads/2022/05/Gemeindefest-22-XII.jpg), 1619 × 1080; [Medium 17197](https://akg-kiel.de/wp-json/wp/v2/media/17197), Upload 2022-05-04                                                    | Fotograf/in und Copyright-Feld leer; nur **Quelle: akg-kiel.de**. Historisches Gemeindefest **2022**, keine aktuelle Veranstaltung. Personen-/gegebenenfalls Minderjährigenfreigaben offen. |
| `cafe-dreimaster-{640,960,1280}.webp`       | [Banner_Dreimaster.jpg](https://akg-kiel.de/wp-content/uploads/2024/01/Banner_Dreimaster.jpg), 1480 × 740; [Medium 28269](https://akg-kiel.de/wp-json/wp/v2/media/28269), Upload 2024-01-26; ebenfalls auf der alten Startseite                     | Fotograf/in und Copyright-Feld leer; nur **Quelle: akg-kiel.de**. Als Archivfoto neben dem externen Café-Link, nicht als heutiges Personal-/Betriebsprofil.                                 |

Alle Metadaten-`copyright`-Felder sind leer; daraus folgt **keine** freie Lizenz. Der benannte Mediencredit ist kein Rechtevertrag. Keine Identifizierung der Menschen, Rollen-/Mitgliedschaftszuordnung oder Übernahme von Kontaktangaben. Das Gemeindefest wird nicht als alter Newsartikel oder Termin neu veröffentlicht. Historische Archiventscheidungen und ChurchTools als einzige aktuelle Datenquelle bleiben bestehen.

Bearbeitung: mit vorhandenem Sharp proportional auf 640/960/1280 px verkleinert, ohne Hochskalierung oder zusätzlichen Beschnitt; WebP Qualität 82, Metadaten entfernt. Keine inhaltliche Manipulation oder Farbfilter. Laufzeit ausschließlich lokale Dateien, kein WordPress-Fallback. Quellenlinks stehen unter jedem Foto und werden vollständig in den Bilddialog übernommen. Für diese vier Bilder wird ausdrücklich **keine CC-Lizenz** ausgegeben.

Nicht ausgewählt: Einzelporträts ohne belastbare Personenfreigabe, der niedrig aufgelöste Frauentreff-Ausschnitt, leere Festbänke, Konzert-/SHMF-Motive und ein Pilgerbanner, das nur ein Gebäude zeigt. Architekturaufnahmen bleiben für passende Unterseiten erhalten, nicht als Ersatz für Menschenbilder.

## Vorläufige Stockfotos · Korrekturskizzen AKG-129

Nutzerfolgeauftrag vom 2026-11-13: Die vorhandenen Projektfotos gefallen für die gestalterische Richtung nicht; zunächst Stockfotos verwenden, um die Botschaft zu vermitteln. Diese ausdrückliche Ausnahme zur bisherigen Bildvorgabe gilt zunächst nur für die beiden neuen v0-Skizzen unter `public/entwuerfe/neu/`. Die bestehenden Website-Fotos und der ursprüngliche 50er-Vergleich bleiben unverändert.

Drei Pexels-Motive wurden einzeln gesichtet, lokal und proportional als WebP gespeichert. Quelle, Fotograf/in, Fototitel, Downloadadresse, Lizenz und Bearbeitung sind zentral in [`public/entwuerfe/neu/stock/credits.json`](../public/entwuerfe/neu/stock/credits.json) dokumentiert. Bildunterschriften benennen sie unmittelbar als Symbolfotos und verlinken die Urheberquelle. Keine AKG-Zugehörigkeit, religiöse Überzeugung, Unterstützung oder reale Veranstaltung wird den abgebildeten Personen zugeschrieben; das Cafébild wird nicht als Aufnahme des Dreimasters ausgegeben. Keine Laufzeit-Requests zu Pexels.

Das ist eine vorläufige Auswahl für die Gestaltung, keine pauschale rechtliche Produktionsfreigabe. Pexels-Lizenz und Acceptable Use Policy wurden gelesen; die eigenständige Prüfung sämtlicher Model-, Marken- und sonstiger Drittrechte wird nicht behauptet. Der Nutzerauftrag zur Symbolfotografie ersetzt keine abschließende Medienabnahme.

## Schrift

- **Figtree**, lokal, Latin Variable WOFF2, ca. 20 KB, inklusive deutscher Zeichen.
- Datei: `public/fonts/figtree-latin-variable.woff2`.
- Quelle: [Fontsource/Figtree](https://fontsource.org/fonts/figtree); Download-Snapshot von `https://cdn.jsdelivr.net/fontsource/fonts/figtree:vf@latest/latin-wght-normal.woff2` am 2026-10-26, SHA-256 `4ba7d3d096695818fe0686be4f1e82c6b05134e18a22260336130335027462dd`.
- Lizenz **SIL Open Font License 1.1**, unverändert unter `public/fonts/OFL-Figtree.txt`; [autoritative Lizenzquelle](https://github.com/google/fonts/blob/main/ofl/figtree/OFL.txt).
- Eine Familie mit klaren Gewichten; `font-display: swap`, lokaler Preload, keine Google-/Fontsource-Requests im Browser.

## Explorationsfreigabe · historischer Zwischenschritt AKG-129

Nach erneuter Ablehnung auch der beiden Stockfoto-v0 hat der Nutzer ausdrücklich erlaubt, **Schrift, Farbwelt, Bildbehandlung und den gesamten visuellen Stil neu zu denken**. Nur das Original-Logo bleibt gestalterisch unverändert gesetzt. Figtree und die unten dokumentierte Blau/Weiß/Ink-Palette beschreiben damit den bisherigen Bestand, nicht mehr die bindende Vorgabe für die nächste Exploration. Keine Freigabe zum Austausch von Produktionsinhalten, Änderung von Datenrechten oder Deployment daraus ableiten.

Zunächst werden drei reale Referenzwelten zur Auswahl vorgelegt, **keine weiteren Homepages**: Kulturplakat, Gemeindejournal und offener Treffpunkt. Lokale Referenztafel: [`design-directions/index.html`](design-directions/index.html); Entscheidungen und Quellen: [`design-directions/README.md`](design-directions/README.md). Die dortigen OFL-Schriften und Farben sind Stilproben, noch keine beschlossene neue Website-Marke. Fremde Website-Screenshots dienen nur der gestalterischen Abstimmung und werden nicht in die AKG-Website übernommen.

## Aktuelle Klarstellung · Layout statt Markenwechsel

Der Nutzer stellt anschließend klar: Farben und Schriften gefallen grundsätzlich; gewünscht sind vernünftige Layouts. Die Diagnose „neue Markenwelt nötig“ war damit nicht zielführend. Keine der drei Referenzwelten wurde ausgewählt.

Die aktuelle Layoutstudie behält bewusst **lokale Figtree, Blau/Weiß/Ink und Original-Logo** bei. Sie untersucht Raster, Größenverhältnisse, Platznutzung, klare Besuchswege und responsive Komposition statt neuer Farb-/Fontkombinationen. Die zwei bereits ausgewählten Pexels-Symbolfotos werden unverändert als Quelle wiederverwendet; neue visuelle Bildausschnitte im Layout sind proportional, nicht verzerrt. Die Symbolfoto-Ausnahme umfasst nun auch `public/entwuerfe/layout/1.html`; Quelle und Lizenz bleiben zentral in `public/entwuerfe/neu/stock/credits.json`. Keine neue Produktions-, Inhalts- oder Medienfreigabe daraus ableiten.

Umsetzung und Nachweise: [`design-layout.md`](design-layout.md). Der Nutzer bewertet diesen Aufbau als deutlich besser, aber noch nicht zufriedenstellend. Auf seinen neuen Auftrag folgen drei konkrete Referenz-Rekreationen nach Mobbin Deep Search bzw. ergänzender Section Search: [`design-mobbin/README.md`](design-mobbin/README.md). Figtree und die vorhandene Palette bleiben auch dafür konstant; die Symbolfoto-Ausnahme umfasst die drei Dateien unter `public/entwuerfe/mobbin/`. Der Nutzer hat anschließend **Begegnungen** (`public/entwuerfe/mobbin/begegnung.html`) als Grundlage gewählt: blaue Einladungsfläche, große helle Typografie, Fotomosaik und heller Gemeinschaftsbereich. Diese Richtung separat weiterentwickeln, nicht mit den beiden Alternativen vermischen. Die Wahl ersetzt keine Detail-, Inhalts-, Medien- oder Produktionsabnahme. Die Stiltafel bleibt als nicht ausgewählte Recherche erhalten und ist kein bindendes neues Designsystem.

## Übertragung in die Startseite · Begegnungen

Auf das anschließende **„Go!“** wurde die gewählte Richtung in `src/pages/index.astro` integriert. Die vorläufige Symbolfoto-Ausnahme umfasst auch diese lokale Ausarbeitung: dieselben drei Dateien, sichtbar als Symbolfotos, mit Quellenlinks und ausdrücklichem Hinweis auf fehlende AKG-Zugehörigkeits-/Unterstützungsbehauptungen. Autor, Quelle und Alternativtext werden aus der bestehenden zentralen `credits.json` gelesen; keine Kopie eines zweiten Quellenregisters. Kein Stockfoto wird als Dreimasteraufnahme verwendet.

Original-Logo, Figtree und Farbvariablen bleiben unverändert. Die historischen AKG- und Commons-Fotos bleiben als Bestand erhalten; ihre bisherigen Freigaben werden nicht geändert. Die drei Symbolfotos ersetzen nur die Fotoauswahl der Startseite. Das ist Umsetzung zur Sichtung, keine neue Produktions-/Rechtefreigabe; kein Commit, Push oder Deploy. Details, Checks und Grenzen: [`design-mobbin/README.md`](design-mobbin/README.md).

## Nutzerfolgeauftrag · Bildnachweise reduzieren, Preview pushen

Auf ausdrücklichen Wunsch entfallen die sichtbaren Autoren-/Quellenzeilen an den drei Pexels-Fotos der Startseite, auch im Bilddialog. Statt der weißen Nachweisstreifen bleibt nur die kompakte Kennzeichnung „Symbolfoto“ auf jedem Bild; der gemeinsame Hinweis ohne AKG-Zuordnungsbehauptung bleibt erhalten. Quellen, Autoren, Lizenz und Bearbeitung bleiben vollständig in `public/entwuerfe/neu/stock/credits.json` dokumentiert.

Die [Pexels-Lizenz](https://www.pexels.com/license/) verlangt keine Namensnennung; [Pexels-Hilfe zur Attribution](https://help.pexels.com/hc/en-us/articles/360042790533-What-s-the-appropriate-way-to-give-credit-to-the-photographer) bestätigt das. Diese Ausnahme gilt nicht für erforderliche Commons-/CC-BY-SA-Nachweise auf Unterseiten. Keine Bilddatei, Rechtezuordnung oder Bestandsfreigabe geändert. Der Nutzer autorisiert jetzt ausdrücklich Commit/Push auf den bestehenden Feature-Branch für die automatische Vorschau, nicht Produktion oder Merge.

## Gestalterische Ableitung · bisheriger Entwurf

Originales Logo-Blau bleibt unverändert im Bild. UI-Aktionsblau `#006c9e`, Ink `#173b50`, Weiß und ein heller Blauton `#eaf3f7`. Wärme kommt aus echten Begegnungen, Gemeindefotografie und der persönlichen Sprache, nicht aus einer beigefarbenen Serifenschrift-Vorlage. Die Oxidrot-/Source-Sans-Empfehlung des unabhängigen Art-Direction-Reviews wurde abgewogen; gewählt wurden die engere Ableitung vom tatsächlichen blauen Logo und die bereits lizenzgeprüfte Figtree. Die strukturellen Kritikpunkte des Reviews werden umgesetzt.

Mobbin-Referenzen sind ausschließlich Kompositionsreferenzen. Keine Mobbin-Screenshots, fremden Logos oder fremden Personenbilder werden in die Website eingebunden.
