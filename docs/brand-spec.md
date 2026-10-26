# Marke und Medien · AKG-127

Stand 2026-10-26. Gestaltungsvorschau, keine Produktions-/Inhaltsabnahme. Quellenrecherche: [redesign-content-research.md](redesign-content-research.md).

## Original-Logo

- `public/images/apostel-logo.png`: unveränderte Originaldatei [logo-akg-500px.png](https://akg-kiel.de/wp-content/uploads/2019/09/logo-akg-500px.png), 500 × 272 px.
- Auf ausdrücklichen Nutzerwunsch beibehalten; gleiche Wort-/Bildmarke wie auf der bestehenden Website. Keine Nachzeichnung, kein Filter, keine Umfärbung und kein Beschnitt.
- Verwendung auf hellem Hintergrund im Header und als Favicon; der kompakte Footer führt nur den Gemeindenamen. Die frühere erfundene `akg.`-Wortmarke und ihr SVG-Favicon sind entfernt.
- Keine offene Lizenz behauptet. Nutzerauftrag und Herkunft sind dokumentiert; umfassende Medienabnahme bleibt AKG-67/72.

## Lokale Fotografie

Beide Fotos: **Matthias Süßen / Wikimedia Commons**, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Nicht aus WordPress migriert. Keine identifizierbaren Personen in den ausgewählten Motiven. Keine Aussage zu aktuellen Öffnungszeiten, Veranstaltungszuordnung oder Zugang aus den Bildern ableiten.

| Lokale Varianten                                      | Original / Herkunft                                                                                                                                          | Motiv                                                      |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------- |
| `public/images/petruskirche-{640,960,1440}.webp`      | [Petruskirche-Wik-2024-msu-2530.jpg](https://commons.wikimedia.org/wiki/File:Petruskirche-Wik-2024-msu-2530.jpg), 5000 × 4000, Aufnahme 2024-08-01           | Außenansicht mit Turm und Vorplatz                         |
| `public/images/petruskirche-dach-{640,960,1440}.webp` | [Petruskirche-Kiel-2026-09-msu--3400.jpg](https://commons.wikimedia.org/wiki/File:Petruskirche-Kiel-2026-09-msu--3400.jpg), 6960 × 4640, Aufnahme 2026-04-19 | Offener Holzdachstuhl, kein Altar/Kunstwerk als Hauptmotiv |

Bearbeitung: mit vorhandenem `sharp` proportional auf 640/960/1440 px verkleinert und als WebP (Qualität 82) komprimiert; Metadaten entfernt, motivabhängiger Ausschnitt durch `object-fit: cover`. Keine inhaltlichen Bildmanipulationen. Bearbeitete Bilddateien bleiben **CC BY-SA 4.0**. Sichtbare Bildunterschriften in `ChurchPhoto.astro` verlinken jeweils Autor/Original und Lizenz und nennen die Bearbeitung. Lizenz gilt für diese Fotografien, nicht pauschal für Logo, Schrift oder Anwendungscode.

Kein Hotlink, kein externes Image-CDN, keine ungeprüften WordPress-Fotos, keine Stockkirche, keine KI-Gemeindefotos. Für die Produktionsfreigabe sind die projektbezogene Medienabnahme und gegebenenfalls weitere Rechte zu bestätigen. Die Innenraumaufnahme mit Altar und die Aufnahme mit sichtbaren Menschen wurden bewusst nicht verwendet.

## Schrift

- **Figtree**, lokal, Latin Variable WOFF2, ca. 20 KB, inklusive deutscher Zeichen.
- Datei: `public/fonts/figtree-latin-variable.woff2`.
- Quelle: [Fontsource/Figtree](https://fontsource.org/fonts/figtree); Download-Snapshot von `https://cdn.jsdelivr.net/fontsource/fonts/figtree:vf@latest/latin-wght-normal.woff2` am 2026-10-26, SHA-256 `4ba7d3d096695818fe0686be4f1e82c6b05134e18a22260336130335027462dd`.
- Lizenz **SIL Open Font License 1.1**, unverändert unter `public/fonts/OFL-Figtree.txt`; [autoritative Lizenzquelle](https://github.com/google/fonts/blob/main/ofl/figtree/OFL.txt).
- Eine Familie mit klaren Gewichten; `font-display: swap`, lokaler Preload, keine Google-/Fontsource-Requests im Browser.

## Gestalterische Ableitung

Originales Logo-Blau bleibt unverändert im Bild. UI-Aktionsblau `#006c9e`, Ink `#173b50`, Weiß und ein heller Blauton `#eaf3f7`. Wärme kommt aus Holz/Backstein und der persönlichen Sprache, nicht aus einer beigefarbenen Serifenschrift-Vorlage. Die Oxidrot-/Source-Sans-Empfehlung des unabhängigen Art-Direction-Reviews wurde abgewogen; gewählt wurden die engere Ableitung vom tatsächlichen blauen Logo und die bereits lizenzgeprüfte Figtree. Die strukturellen Kritikpunkte des Reviews werden umgesetzt.

Mobbin-Referenzen sind ausschließlich Kompositionsreferenzen. Keine Mobbin-Screenshots, fremden Logos oder fremden Personenbilder werden in die Website eingebunden.
