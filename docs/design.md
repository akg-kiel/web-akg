# Gestaltung und UI-Vertrag · AKG-MVP

Aktueller Stand · AKG-129: **Begegnungen** nach ausdrücklicher Richtungswahl und anschließendem „Go!“ in `src/pages/index.astro` umgesetzt. Gestaltungsvorschau, keine allgemeine Inhalts-, Rechts-, Medien- oder Launchabnahme. Grundlage und aktueller Prüfstand: [Mobbin-Rekreationen und Übertragung](design-mobbin/README.md). Der frühere [Menschen-/Hero-Review](redesign-people-review.md) bleibt historisch; dessen Designbewertung gilt nicht für diese Fassung.

## Fotos und Suchmaschinen · ausdrücklicher Nutzerfolgeauftrag 13.11.2026

Nach der zwischenzeitlichen Bildsperre hat der Nutzer alle bestehenden Fotos ausdrücklich wieder für die öffentliche Vorschau gewünscht und ergänzt: „Auch für Produktiv ist das okay. Aber mache bitte alle seiten nicht discoverable durch suchmaschinen“. Ein zusätzlicher Zugangsschutz/Zero Trust ist nicht gewünscht. `src/lib/photos.mjs` setzt deshalb auch die vier historischen Gemeindefotos auf `publicApproved: true`. Alle acht ausgewählten Motive und ihre 24 lokalen Varianten bleiben auslieferbar. Die damalige Startseitenkomposition wurde inzwischen durch Begegnungen mit drei vorläufigen Symbolfotos ersetzt; keine Bestandsdateien oder Freigabeschalter wurden geändert. Der Build-Hook entfernt weiterhin tatsächlich nicht freigegebene Motive, falls solche später ergänzt werden. Die frühere Freigabe der Bestandsfotos ist keine pauschale Produktionsfreigabe der später ausgewählten Stockfotos.

Diese dokumentierte Nutzerentscheidung ist die Auslieferungsfreigabe, keine erfundene CC-Lizenz oder eigenständige Bestätigung sämtlicher Urheber-/Personen-/Kunstwerkrechte. Quellen, belegte Credits und Archivkennzeichnungen bleiben erhalten; weitergehende rechtliche Dokumentation unter AKG-67/72 wird nicht als abgeschlossen behauptet. Die Erlaubnis zur späteren produktiven Fotoverwendung ist kein Auftrag zum Produktionsdeploy.

Alle HTML-Seiten behalten `noindex, nofollow`; der Worker setzt `X-Robots-Tag: noindex, nofollow` vor jeder Antwort, auch für Bilder, statische Assets, Weiterleitungen und Fehler. Das gilt ohne Produktions-/Host-Ausnahme. `robots.txt` erlaubt Crawling bewusst, damit Suchmaschinen die Indexierungsverbote auch an extern verlinkten URLs lesen können; `Disallow: /` würde dies verhindern. Keine Sitemap. Öffentliche URLs können trotzdem bekannt werden; `noindex` ist keine Zugriffskontrolle und keine Garantie gegen ignorierende Crawler oder sofortige Entfernung alter Suchtreffer.

## Richtung

**Begegnungen.** Gewählte Grundlage: `public/entwuerfe/mobbin/begegnung.html`, nicht ein Gemisch mit Gemeindejournal oder Gemeinde entdecken. Original-Logo, Figtree und Blau/Weiß bleiben unverändert. Kein neuer Zufallsdraw oder Markenwechsel. Ziel: Gemeinde kennenlernen; der zweite Hero-Link führt ohne JavaScript zum fokussierbaren Besuchswege-Bereich.

Gestaltungsablauf: blaue Einladung mit Drei-Foto-Mosaik → heller, abgerundeter Gemeinschaftsbereich mit Gottesdienst, Angeboten und Kontakt → tatsächliche Meldungen oder ehrlicher Quellenzustand → separater Dreimaster-Abzweig → bestehender Footer mit allen Zielen. Datenkomponenten werden wiederverwendet: ein Gottesdienst, bis zu drei Angebote und drei Meldungen; keine Beispieldaten in der Anwendung. `/angebote` behält serverseitige Suche und native aufklappbare Abschnitte, einschließlich No-JS-Teaser-Verlinkung. Die öffentlichen Freigabeschalter bleiben unverändert. Bestehende Unterseiten bleiben erreichbar; keine neue Kirchen- oder Konzertdomain wird geraten.

Desktop/Tablet: große helle Einladung neben einem breiten und zwei kleineren Bildfenstern auf Blau. Mobil: Text und Aktionen vor dem Zwei-Reihen-Mosaik; anschließend linear angeordnete Besuchswege. Fotofenster verwenden proportionales `object-fit: cover`. Auf ausdrücklichen Folgeauftrag sind Fotos reine Inhalte: keine Links, Plus-Symbole, Vergrößerung oder Lightbox. Original-Logo bleibt unbeschnitten auf Weiß. Zusätzliche Entwurfshinweise, Datenzustände und der vorhandene vollständige Footer bleiben bei der Übertragung aus dem Prototyp bewusst erhalten.

## Marke, Medien und Quellen

[brand-spec.md](brand-spec.md) dokumentiert Bestandsfotos und die vorläufige Stockfoto-Ausnahme getrennt: Herkunft, bekannte Credits, Bearbeitung und offene Rechte-/Personenfreigaben. Die drei Symbolfotos der gewählten Richtung werden lokal wiederverwendet; Autor, Quelle und Alternativtext bleiben in `public/entwuerfe/neu/stock/credits.json` dokumentiert. Auf ausdrücklichen Folgeauftrag sind Autoren-/Quellenzeilen von der Startseite und ihrem Bilddialog entfernt; die Pexels-Lizenz verlangt keine Namensnennung. Ein kompaktes „Symbolfoto“-Label bleibt auf jedem Foto, zusätzlich wird ausdrücklich keine AKG-Zugehörigkeit oder Unterstützung behauptet. Erforderliche Commons-Nachweise auf Unterseiten sind unverändert. Stockfotos bleiben vorläufige Gestaltungsmittel, nicht rechtlich für Produktion abgenommen. Die konkrete Auslieferungsfreigabe des Nutzers für Vorschau und Produktivbetrieb ist oben dokumentiert; daraus wird keine neue offene Lizenz abgeleitet. Historische Fotos sind entsprechend beschriftet. Erforderliche Quellen-/Lizenzlinks bleiben unter den Bestandsfotos erhalten; einen Bildbetrachter gibt es nicht mehr. Keine externen Ressourcen, Hotlinks oder Embeds.

Die früher gesichteten Mobbin-Referenzen bleiben Kompositionsreferenzen:

- [IKEA Museum](https://mobbin.com/sites/sections/9106b15a-0086-4cfc-a085-66d514b20408): erkennbare Marke und echte Fotografie.
- [IKEA Museum Story](https://mobbin.com/sites/sections/0d9af2f7-a982-4e71-a6e4-be2dd6b6ac96): großzügige Bild-/Text-Komposition.
- Weitere Quellen und verworfene SaaS-Richtungen: [Art Direction](redesign-art-direction.md). Keine fremden Logos, Screenshots oder Personenbilder übernommen.

Frühere Planung, Draw und Baseline liegen lokal unter `.taste-skill/` (ignorierte Arbeitsartefakte). Aktuelle Vorlage: [OpenTable-Section auf Mobbin](https://mobbin.com/sites/sections/3a10c864-0f39-4ba7-8d32-f460f825bb8b). Nur die Komposition wurde übertragen, nicht fremde Markenassets. Nachweise und Abweichungen: `docs/design-mobbin/README.md`; keine neue vollständige Taste-Gate-Prüfung behauptet.

## Typografie und Flächen

Basis: `src/styles/globals.css`; ausgewählte Homepage-Komposition als isolierte Styles in `src/pages/index.astro`, ohne Unterseiten umzugestalten.

- Figtree; Weiß `#ffffff`, Ink `#173b50`, Aktionsblau `#006c9e`, helle Fläche `#eaf3f7`. Die erweiterte Palette aus dem vom Nutzer referenzierten Brand-Thread ergänzt Grün `#1a7663`, Hellgrün `#e8f1ef` und die dokumentierten warmen Farben Creme `#fbf1d9`, Sonnengelb `#f2d38b`, Rostorange `#aa420d` als benannte Tokens. Auf der Startseite erhält nur der Gemeinschaftsbereich Hellgrün mit grüner Überschrift; die Einladung bleibt blau, Aktionen bleiben blau/weiß. Nicht alle Ausdrucksfarben gleichzeitig einsetzen.
- Größenrollen der Homepage: Credits 12 px, Statushinweise 14–15 px, Fließtext 17 px, Einleitung 18–20 px, Abschnittstitel 28–44 px, H1 38–68 px. Relative Einheiten erlauben Textvergrößerung; Unterseiten behalten ihre bestehende Skala.
- Homepage: Seitenränder 20–80 px, Inhaltsbreite maximal 80 rem; schmale Leseabsätze behalten ihr eigenes Maß.
- Referenztypische gerundete Bildfenster und ein weißer Gemeinschaftsbereich auf Hellgrün; feine Linien gliedern Besuchswege. Keine Verläufe, Schatten oder Scrims.
- Blaues Einladungsfeld, Ink-Footer, weißer Hauptbutton mit kleiner Rundung. Sichtbarer 3-px-Fokus, auf Blau weiß; die Fotos selbst sind nicht fokussierbar. Rostorange bleibt über `--color-focus` die bestehende Fokusfarbe.

## Interaktion und Zugänglichkeit

- Genau fünf slashlose Hauptziele: Gottesdienste, Aktuelles, Angebote, Gemeinde, Kontakt.
- Native Links und `details/summary` im Dokumentfluss. Escape und Breakpoint-Fokus bleiben erhalten; keine clientseitige Routerpflicht.
- Skip-Link, ein `main`, `aria-current`, keine positiven Tabindices. Ziele grundsätzlich mindestens 44 px; Bildnachweise bleiben normale Textlinks.
- Fotos: native `img`/`figure` mit Alternativtext und unveränderter Symbolfoto-Kennzeichnung; keine Foto-Links, zusätzlichen Tabstopps, Plus-Indikatoren, Zoom-Hover oder Dialoge. Das gilt mit und ohne JavaScript. Lightbox-Script, Dialog-Stile und ungenutzte Vergrößerungsoption des gemeinsamen Fotobausteins sind entfernt.
- Keine neue Eintrittsanimation, kein Scroll-Hijacking oder Dauerloop. Inhalte sind standardmäßig sichtbar; native Anker und Menüs. `prefers-reduced-motion` bleibt einschließlich Umschaltung getestet. Keine neue Bibliothek.
- Textvergrößerung, lange Titel und fehlende Daten dürfen wachsen; kein Text-Clipping als Ersatz für Layoutkorrektur.

## Unveränderte Daten- und Freigabegrenzen

Persönliche du-Ansprache und historische Absätze sind **redaktionelle Entwürfe**. Historische Quellen: [Recherche](redesign-content-research.md). Keine aktuellen Kontakte, Gruppen, Personen, Termine, Zugänglichkeitszusagen, Öffnungszeiten, Zahlungsdaten oder Rechtstexte erfunden.

`src/lib/content.ts` bleibt die SSR-Bridge: serverseitiges `env`, optionaler `CHURCHTOOLS_TOKEN`, `SERVICES_APPROVED === 'true'` und `GROUPS_APPROVED === 'true'`. Die Lader prüfen die Quellen bei jedem Abruf ohne Snapshot-Cache/Stale-Fallback; keine Token/Rohdaten in Props oder HTML.

`SourceState` unterscheidet disabled, empty, unavailable und stale. Warnung und Zeitstempel veralteter Daten bleiben sichtbar. Details bleiben 503 mit `Retry-After: 1800` bei unzugänglicher Quelle bzw. unbestätigter Abwesenheit; 404 nur bei bestätigter Abwesenheit. SSR-HTML bleibt `no-store`.

Gottesdienste: nur Titel/Zeit aus Kalender 2, Berlin-Zeitzone; keine erfundene Ortszuordnung. News bleiben escaped Plaintext, kein `set:html`. Gruppen werden ausschließlich serverseitig, paginiert, anonym-öffentlich und mit strengem Feldfilter geladen; keine Personen-/Mitgliedschaftsabfragen und keine WordPress-Laufzeitquelle. Näheres: [Gruppenintegration](groups-integration.md).

Alle Routen behalten Entwurfshinweis und `noindex, nofollow`; `robots.txt` lässt das Lesen dieser Vorgaben zu. Keine Sitemap. **noindex ist keine Zugriffskontrolle.** Vorschauversionen sind keine Secret-/Ressourcenisolation.

Externe Ziele bleiben zentral in `src/lib/site.ts`: Dreimaster, YouTube-Kanal, Intern/ChurchTools. Keine Programme oder Öffnungszeiten der separaten Produkte kopieren; keine unbestätigte Konzertdomain verlinken.

## Prüfung

`pnpm quality` und `pnpm test:preview` bleiben die technischen Gates. Browserregression: zwölf Routen, fünf Breiten, axe bei 390/1440 px, Tastatur, Menü ohne JS, Bilder, 200-%-Text. Ergänzt: mobile Hero-Fokusfolge ohne Foto-Tabstopps, unveränderter Seitenaufruf beim Klick auf Fotos mit/ohne JS, fehlende Dialoge/Foto-Links/Plus-Indikatoren, reservierter Bildraum und reduzierte Bewegung einschließlich Umschaltung. Der kleine Farbtest sichert die zehn Brand-HEX-Werte und mindestens 4,5:1 für die dokumentierten Text-/Flächenpaare; axe prüft die tatsächlich gerenderte Seite.

Sichtprüfung des lokalen Builds bei 1440/768/390 px gegen den ausgewählten Prototyp, zusätzlich fünf Breiten im Browsergate. Die bestehende wegwerfbare Fixture-Kopie prüft gefüllte Gottesdienst-/Angebots-/Newsbereiche, escaped News-Text sowie empty/unavailable/disabled/stale einschließlich Warnung und Zeitstempel. Keine Fixtures oder Testschalter gelangen in die reale App. Mosaik, Geometrie, alle Besucherziele, sichtbare Symbolfoto-Kennzeichnung und das Fehlen der per-Foto-Autorenlinks sind abgesichert. Ergebnisse und offene Punkte im [aktuellen Prüfstand](design-mobbin/README.md). Technische Sichtprüfung ist keine Nutzerabnahme.

Nicht behauptet: authentifizierte ChurchTools-E2E-Prüfung, Safari/Firefox, physische Geräte/echte Screenreader, vollständige WCAG-Zertifizierung, Medien-/Rechtsfreigabe oder Produktionsabnahme. Kein automatischer Merge oder Produktionsdeploy.
