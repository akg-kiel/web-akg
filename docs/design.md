# Gestaltung und UI-Vertrag · AKG-MVP

Stand: 2026-10-26 · AKG-127. Lokale Gestaltungsvorschau, keine Inhalts-, Rechts- oder Launchfreigabe.

## Redesign / Overhaul

Die erste Gestaltung wurde vom Nutzer als AI-Slop abgelehnt. Sie wird nicht nur umgefärbt: Original-Logo, örtliche Fotografie und eine persönliche Besuchereinladung ersetzen erfundene Wortmarke, Georgia/Teal/Creme und dominante Statuskästen. Routen, native Navigation und Datenfreigabegrenzen bleiben erhalten.

**Design Read:** einladende Gemeindewebsite für Neugierige und Gemeindemitglieder. Humanistische Schrift, Weiß, Blau aus dem unveränderten Original-Logo, echte Ortsfotografie. Visuelle Varianz 6/10, Bewegung 1/10, Informationsdichte 4/10, Asset-Abhängigkeit 8/10, Markentreue 10/10 für das Logo. Die erste Ansicht lädt ein und führt zur Gemeinde bzw. zum Gottesdienst; technische Zustände bleiben wahrheitsgemäß, aber untergeordnet.

- Eine Schriftfamilie, klare Gewichte, linksbündige Überschriften. Keine Serif-/Kursivdramaturgie, gesperrten Kapitelnummern, Schattentiles, dekorativen Icons, Farbverläufe oder Carousel.
- Reale Fotografie belegt den Ort; keine fremden Menschen werden als Gemeindemitglieder ausgegeben. Text und Foto bleiben getrennt lesbar. Bildunterschriften nennen Quelle, Lizenz und Bearbeitung.
- Persönliche `du`-Ansprache. Besuchertexte erklären die Gemeinde, nicht die Datenpflege. Ein globaler Entwurfshinweis und konkrete lokale Lückenhinweise bewahren die Freigabegrenzen.
- Native HTML-Links und CSS. Kein neues Framework, keine neue UI-Abhängigkeit, keine Pflichtanimation.

## Gesicherte Marke und Medien

[brand-spec.md](brand-spec.md) dokumentiert die Originaldatei, Medienlizenzen, Bearbeitungen und die lokale Schrift. [redesign-content-research.md](redesign-content-research.md) dokumentiert geprüfte Quellen und ausdrücklich abgelehnte Fotos.

- Original `logo-akg-500px.png` aus dem offiziellen WordPress-Medienbestand, **byte-identisch**, unbeschnitten und ohne Filter/Umfärbung. Auf ausdrücklichen Nutzerwunsch im Header und als Favicon; im Footer steht der Gemeindename als schlichte Textzeile. Die alte erfundene `akg.`-Marke wurde entfernt. Regression prüft SHA-256.
- Fotos genau der Petruskirche: Matthias Süßen, CC BY-SA 4.0; lokal als 640/960/1440-px-WebP. Außenansicht auf Start-/Gemeindeseite, Dachdetail auf der Petruskirchen-Seite. Keine ungeklärten WordPress-Fotos oder Personenporträts.
- Figtree Latin Variable WOFF2, lokal, ca. 20 KB; SIL OFL 1.1 mitgeliefert. Keine externen Fontrequests. `font-display: swap` und lokaler Preload.
- Projektbezogene Medien- und Textabnahme bleibt offen; eine offene Fotolizenz ersetzt keine Inhalts-/Ortsfreigabe.

## Mobbin und unabhängige Kritik

Die Bilder der Mobbin-Ergebnisse wurden tatsächlich betrachtet, nicht nur die Metadaten:

- [IKEA Museum](https://mobbin.com/sites/sections/9106b15a-0086-4cfc-a085-66d514b20408): erkennbare Marke und echte Fotografie. Nicht übernommen: bildfüllende Riesenschrift.
- [IKEA Museum Story](https://mobbin.com/sites/sections/0d9af2f7-a982-4e71-a6e4-be2dd6b6ac96): großzügige Bild-/Text-Komposition. Keine fremden Menschenbilder übernommen.
- Das unabhängige Review sichtete zusätzlich KOBU/Hotel und Airbnb-Treffpunkt als Kompositions-/Besuchsreferenzen; Quellen und Befunde in [redesign-art-direction.md](redesign-art-direction.md).
- Dropbox-, Airtable- und HoneyBook-Community-Referenzen wurden als zu SaaS-artig verworfen.

Vom Review übernommen: Originalmarke, konkrete Orientierung statt Fehler-Monument, helle humanistische Richtung, kompakter Footer, interne `→` vs. externe `↗`, kürzere gesperrte News-Zone. Nicht übernommen: Oxidrot als UI-Akzent und Source Sans 3; der tatsächliche blaue Markenbezug und die lizenzgeprüfte Figtree bestimmen die Umsetzung.

## Tokens und Rhythmus

Quelle: `src/styles/globals.css`.

| Rolle              | Token / Wert                                              |
| ------------------ | --------------------------------------------------------- |
| Grund              | `--color-paper: #ffffff`                                  |
| Text               | `--color-ink: #173b50`                                    |
| Aktion             | `--color-blue: #006c9e`                                   |
| Sekundärtext       | `--color-muted: #50616c`                                  |
| Leichte Fläche     | `--color-wash: #eaf3f7`                                   |
| Warmes Café-Feld   | `#fbf1d9`                                                 |
| Dekorative Linie   | `--color-line: #cfdbdf`                                   |
| Fokus              | `#aa420d`, 3 px / 5 px Abstand                            |
| Fließtext          | Figtree, 17 px / 1.65                                     |
| Buttons/Navigation | 16 px, Gewicht 600, primäre Buttons mindestens 50 px hoch |
| Inhaltsbreite      | maximal 76 rem, flüssige Seitenränder                     |
| Mobile Abschnitte  | 3 rem vertikal; Text wächst bei Vergrößerung              |

Startseite: persönliche Einladung + tatsächliche Kirche → Gottesdienste mit kompaktem Quellenzustand → Gemeindewege/Café → News nur so groß wie der vorhandene Inhalt. Die erste visuelle Runde war mobil zu lang; redundanter Neu-hier-Abschnitt, zweites Homepage-Foto und große leere News-Bühne wurden entfernt. Architekturaufnahmen und ausführlichere Texte stehen auf den passenden Unterseiten.

## Navigation und Zugänglichkeit

- Genau fünf Hauptziele, slashlos: Gottesdienste, Aktuelles, Angebote, Gemeinde, Kontakt.
- Native Links und `details/summary`-Navigation im Dokumentfluss, ohne JavaScript verwendbar. Keine clientseitige Router-/Overlaypflicht.
- Escape schließt das Menü mit Fokus auf dem Auslöser; beim Wechsel in die Desktopansicht wird ein sonst versteckter Menüfokus zum Logo geführt.
- `aria-current="page"`, bei Detailseiten `location`. Skip-Link und ein `main`, keine positiven Tabindices und kein Scroll-Lock.
- Bedienziele mindestens 44 px; Inline-Text-/Bildnachweise bleiben normale Textlinks. Sichtbarer Fokus und respektierte reduzierte Bewegung.
- Vergrößerung, lange Titel und fehlende Felder dürfen wachsen. Kein Clipping zur Einhaltung eines Längenbudgets.
- Footer mobil zweispaltig, bei sehr wenig Platz oder Textvergrößerung einspaltig, externe Links und Rechtliches kompakt und direkt sichtbar, kein Akkordeon.

## Inhalte und Freigabegrenzen

Neue Einladungstexte sowie quellenbelegte Leitbild-/Geschichts-/Architekturabsätze sind **redaktionelle Entwürfe**. Historische Abschnitte sind lokal entsprechend bezeichnet; Quellen in der Recherchedatei. Sie ersetzen AKG-64/72 nicht. Keine aktuelle Gruppenliste, persönlichen Kontakte, Uhrzeiten, Teilnahmebedingungen, Ortszuordnungen, Zugänglichkeitsbehauptungen, Zahlungsdaten oder Rechtstexte erfunden.

`src/lib/content.ts` bleibt die SSR-Bridge: `env` aus `cloudflare:workers`, optionaler `CHURCHTOOLS_TOKEN`, `SERVICES_APPROVED === 'true'`, optionaler Workers-Cache ausschließlich im Request. Token/Rohdaten gelangen nicht in Props oder HTML. Backend-Mapping/Cache wurden beim Redesign nicht verändert.

`SourceState.astro` unterscheidet weiterhin disabled, empty, unavailable und stale. Kompakte Homepage-Zustände lassen eine doppelte Erklärung weg; veraltete Daten behalten Warnung und Zeitstempel. Details bleiben 503 mit `Retry-After: 1800` bei unzugänglicher Quelle bzw. Abwesenheit nur im veralteten Cache; 404 nur bei bestätigter Abwesenheit. SSR-HTML bleibt `no-store`.

Gottesdienste: nur Titel/Zeit aus Kalender 2, deutsche Berlin-Zeitzone und exklusive ganztägige Enden. Keine erfundene Ortszuordnung oder Event-JSON-LD. News: escaped Plaintext, kein `set:html`, keine ungeprüften Bilder/Links. Angebote/Gruppen und Personen werden nicht abgerufen. Rechtstexte, Kontakt-, Orts- und Spendenangaben bleiben ehrlich offen.

Alle Routen behalten Vorschauhinweis, `noindex, nofollow`, robots-Sperre und keine Sitemap. **noindex ist keine Zugriffskontrolle.** Title, Description, Canonical und OpenGraph-Text vorhanden; keine behauptete Social-Bildfreigabe.

## Externe Übergänge

Zentral in `src/lib/site.ts`: Café Dreimaster, YouTube-Kanal, Intern/ChurchTools. Sichtbare externe Kennzeichnung, gleicher Tab, keine Embeds/Preconnects/externen Ressourcen. Konzertdomain blieb bei der ersten Integrationsprüfung nicht auflösbar; weiterhin kein defekter oder erfundener Ersatzlink. Programme/Öffnungszeiten bleiben auf den separaten Produktwebsites. Bildnachweise verlassen die Website ebenfalls nur nach aktivem Linkaufruf.

## Prüfung

- Permanente Tests: `pnpm test`, `pnpm quality`, `pnpm test:preview`.
- Browserregression: zwölf Routen bei 320/390/768/1024/1440 px, axe auf 390/1440, Tastatur/Skip-Link/Escape/Breakpoint-Fokus, 200-%-Text und Menü ohne JavaScript. Erweiterung um echte Bilddekodierung, unverzerrtes Logo/Bilder und Hauptaktion im ersten mobilen Viewport.
- Zusätzliche visuelle Iteration: Screenshots in Originalauflösung; deterministische Detektoren für Overflow, Überlappung, Clipping, Randkontakt, Bilder, unsichtbaren Inhalt und Kontrast, inklusive Präzisionsmessung. Absichtliche bildfüllende Randkontakte werden dokumentiert, nicht als unbeabsichtigter Fehler ausgegeben.
- Abschließende Ergebnisse und verbleibende Grenzen werden in [mvp-status.md](mvp-status.md) festgehalten. Unabhängige Kritik ersetzt keine Nutzerabnahme.

Nicht behauptet: authentifizierte Live-Datenprüfung, echte Screenreader/physische Geräte, Safari/Firefox, vollständige WCAG-Zertifizierung, Produktionsbetrieb, inhaltliche/rechtliche Freigabe oder abgeschlossene Besuchsplanung ohne bestätigte Adressen und Kontaktwege.
