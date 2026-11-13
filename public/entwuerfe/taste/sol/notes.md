# AKG-129 · Taste · Sol

Fünf eigenständige, responsive Startseitenentwürfe für **Website AKG, Milestone 3**. Maßgeblich sind `docs/design-exploration-brief.md`, die dort benannten Projektquellen und ausschließlich der Designskill `design-taste-frontend`. Keine Launch-, Inhalts- oder Nutzungsrechtsfreigabe.

## Lieferung und Einstieg

| Datei    | Name                     | Besucher-Einstieg und Seitenrhythmus                                                                                                                                       |
| -------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `1.html` | Die offene Einladung     | Persönliche Begrüßung mit Gemeindefestfoto; versetztes Gottesdienstpanorama; Gespräch und Angebote; Café; Aktuelles/Kontakt.                                               |
| `2.html` | Dein nächster Schritt    | Großes Gesprächsfoto zuerst; aufklappbarer Wegweiser nach Besuchsabsicht; Gottesdienst; Gemeinschaft; Café; Aktuelles/Kontakt.                                             |
| `3.html` | Kapitel des Miteinanders | Dunkler Auftakt mit Gemeindefest; direkte Kapitelnavigation; Hellblau/Weiß/Blau als große Inhaltskapitel; Glaube, Gespräch, Café, Aktuelles/Kontakt.                       |
| `4.html` | Mit offenen Fragen       | Typografische Gottesdiensteinladung mit Kirchenpanorama; Gemeinschaft; native Fragen zum ersten Besuch; Café; Aktuelles/Kontakt.                                           |
| `5.html` | Vom Café zur Gemeinde    | Seitliche Desktopnavigation; zentrierte Einladung mit Cafépanorama; ausdrückliche Café-/Gemeinde-Unterscheidung; zwei Gemeinschaftsfotos; Gottesdienst; Aktuelles/Kontakt. |

`manifest.json` ist ein Array mit **genau fünf Einträgen** und den Feldern `number`, `title`, `description`, `structure`. Die Nummern sind keine Rangfolge.

Aufruf über den bestehenden Projektserver unter `/entwuerfe/taste/sol/1.html` bis `/entwuerfe/taste/sol/5.html`. Wegen der geforderten absoluten `/images/...`- und `/fonts/...`-Pfade nicht als `file://` öffnen. Keine eigene Galerie und keine neuen Abhängigkeiten.

## Parent-Integrationskorrektur

Der zentrale Tastaturlauf zeigte, dass die Skip-Links zwar zum Inhalt scrollten, den Fokus aber nicht auf `main` versetzten. Der Parent ergänzte deshalb bei allen fünf `main`-Elementen `tabindex="-1"`. Keine neue positive Tabreihenfolge und keine zusätzliche JavaScript-Abhängigkeit. Die abschließenden zentralen Ergebnisse stehen in `docs/design-exploration.md`; die folgenden Skill-Prüfungen beschreiben den vorherigen Agentenstand.

## Taste-Prozess und begründete Anpassungen

Gelesen wurden die Skillreferenzen zu Layout, Typografie, Farbe, Text, Bildsprache, Bewegung und Kritik sowie die Projektquellen zu Marke, Inhalt und Fotoherkunft. Planung und Copydeck entstanden vor dem HTML. Die unabhängigen Draws liegen unter `/tmp/akg-129-taste-sol/draw-1/` bis `draw-5/`:

1. `borrowed-category`: Einladung als typografischer Gemeindeaushang, nicht als Produktmarketing.
2. `place-carries-it`: Das reale Gesprächsfoto eröffnet die Seite, danach führt ein aufgabenbezogener Wegweiser weiter.
3. `colour-chapters`: Ganzseitige Farbkapitel mit unterschiedlichen Bildgrößen und einer eigenen Kapitelnavigation.
4. `loud-flat-poster`: Große, direkte Gottesdiensteinladung statt Werbeversprechen oder fingiertem Veranstaltungskalender.
5. `borrowed-category`: Die räumliche Ruhe einer Café-/Hauskarte mit seitlicher Navigation, ohne Café und Gemeinde als ein Produkt auszugeben.

Unpassende Draws wurden vor der Umsetzung neu gezogen. Deren History liegt isoliert unter `/tmp/akg-129-taste-sol/history.json`. Bei den ausgewählten Draws haben Projektvorgaben Vorrang vor Rezeptdetails: keine frei gewählte Zweitschrift, warmen Fremdfarben, Logo-Effekte, Fotofilter, Beschnitte, erfundenen Termine, Referenzen, Statistikbeweise oder zusätzlichen Videos. Fotoüberlagerungen wurden durch getrennte Text-/Bildflächen ersetzt; Menschen bleiben vollständig in den vorhandenen Bildausschnitten sichtbar. Dekorative Ordner-/Plakatmechanik wurde auf echte Fragmentlinks, native Details und klare Farbflächen reduziert. Es wurden keine anderen Designskills, Agentenergebnisse, Bildgeneratoren oder externen Fotoquellen verwendet.

## Gemeinsame technische und inhaltliche Grenzen

- Unverändertes Original `/images/apostel-logo.png`, lokale `/fonts/figtree-latin-variable.woff2`, Blau/Weiß mit dunklem Blau und hellem Blauton.
- Semantisches HTML, ein `main` und `h1`, Sprunglink, sichtbarer Tastaturfokus, native `<details>` und echte Links. Keine Skripte, Formulare, Tracker, Iframes oder automatisch geladenen Fremdressourcen.
- Alle fünf Entwürfe haben den vollständigen Inhaltsbogen, nicht nur einen Hero. Die festgelegte Navigation bleibt verfügbar; keine Such-, Konto-, Spenden- oder anderen funktionslosen Attrappen.
- Nachrichten und Termine sind ausdrücklich **nicht eingebunden**. Keine aktuellen Namen, Zeiten, Kontaktdaten, Öffnungszeiten, ChurchTools-Daten oder erfundenen Angebote.
- Café-Informationen führen zu `https://cafe-dreimaster.de/`. Dreimaster bleibt ein separates Produkt. Keine erfundene Konzert-URL und keine gemeinsame Konzerte-/Dreimaster-Anwendung.
- Fotos mit `srcset`, intrinsischen Proportionen und ohne `object-fit: cover`, Filter oder dekorative Maskierung. Alle vier Motive kommen in jedem Entwurf vor, mit wechselnder Gewichtung.
- Nur kleine CSS-Translationsbewegungen; Inhalte sind auch ohne Animation sichtbar. `prefers-reduced-motion: reduce` schaltet die Animationen und weiches Scrollen aus. Keine Lade- oder Navigationsabhängigkeit von JavaScript.
- `noindex, nofollow, noarchive` als Meta-Robots sowie sichtbare Entwurfskennzeichnung. Das ist kein Zugriffsschutz und keine Prüfung der späteren HTTP-Header.

### Fotoherkunft

Die Dateien sind für diese Entwürfe vorgegeben; daraus wird **keine offene Lizenz oder Veröffentlichungsfreigabe** abgeleitet. Originalquellen sind direkt am jeweiligen Foto vollständig verlinkt.

| Lokales Motiv, jeweils 640/960/1280 WebP | Kennzeichnung                                | Originalquelle                                                           |
| ---------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------ |
| `/images/gemeinde-gottesdienst-*.webp`   | Gottesdienst · Archivfoto; Foto: Frank Lönne | https://akg-kiel.de/wp-content/uploads/2024/01/2024_Banner_allianz_1.jpg |
| `/images/gemeinde-gespraech-*.webp`      | Im Gespräch · Gemeindefest 2022              | https://akg-kiel.de/wp-content/uploads/2022/05/Gemeindefest-22-VIII.jpg  |
| `/images/gemeinde-fest-*.webp`           | Zeit miteinander · Gemeindefest 2022         | https://akg-kiel.de/wp-content/uploads/2022/05/Gemeindefest-22-XII.jpg   |
| `/images/cafe-dreimaster-*.webp`         | Café Dreimaster · Archivfoto                 | https://akg-kiel.de/wp-content/uploads/2024/01/Banner_Dreimaster.jpg     |

## Ausgeführte Prüfungen

1. `python3 public/entwuerfe/taste/sol/check.py`: fünf Seiten und Manifest bestanden. Prüft unter anderem verschachteltes HTML mittels Standardbibliothek, eindeutige IDs, lokale Assets/Srcsets, Fragmente und zugelassene Routen, vier Fotoquellen, Inhaltsgrenzen und reduzierte Bewegung. Kein Ersatz für einen vollständigen HTML-Validator.
2. Taste `lint.mjs`: alle fünf Seiten **0 FAIL, 0 WARN**.
3. Taste `inspect.mjs` mit vorhandenem Chromium: alle fünf bei **1440, 768 und 390 px**, jeweils **0 FAIL, 1 WARN**. Desktop-/Tablet-/Mobil-Folds und Seitensheets wurden visuell angesehen. Einzige verbleibende Warnung: `no-footage`. Bewusste Abweichung: Es gibt kein zugelassenes Video; der Brief beschränkt die Entwürfe auf vier vorhandene Fotografien.
4. Ergänzender Browsercheck über das vorhandene Taste-CDP-Modul: alle fünf bei **320, 375, 390, 414, 768, 801, 980, 1024 und 1440 px** bestanden. Kein horizontaler Überlauf, Überschriften höchstens zweizeilig, proportionale geladene Bilder, lokale Figtree, mindestens 44 px hohe sichtbare Links/Summaries, jeweils genau eine sichtbare Hauptnavigation, kein Überlauf bei offenem Mobilmenü und keine fremden Ressourcenabrufe.
5. Echte CDP-Tastaturereignisse: Desktopnavigation bei 1440 px per Tab erreicht und Fragment per Enter geöffnet; Mobilmenü bei 390 px per Tab erreicht, per Enter geöffnet und geschlossen; vorhandene Inhaltsdetails per Enter umgeschaltet. Konsole ohne erfasste Fehler.
6. Reduzierte Bewegung emuliert: Media Query aktiv, Animationen deaktiviert. Chromium führt bei einzelnen inzwischen geschlossenen Details alte Animationsobjekte weiter; deren berechneter `animation-name` ist dennoch `none`. Es wird deshalb nicht behauptet, dass `document.getAnimations()` immer leer ist.

Reproduzierbar ohne Installation:

```sh
python3 public/entwuerfe/taste/sol/check.py
for n in 1 2 3 4 5; do
  node /home/zepi/.pi/agent/skills/design-taste-frontend/scripts/lint.mjs public/entwuerfe/taste/sol/$n.html
done
# Vom public/-Verzeichnis aus, für jedes n separat:
cd public
CHROME_PATH=/ms-playwright/chromium-1248/chrome-linux-arm64/chrome UV_THREADPOOL_SIZE=1 \
  node /home/zepi/.pi/agent/skills/design-taste-frontend/scripts/inspect.mjs \
  entwuerfe/taste/sol/1.html --out /tmp/akg-129-taste-sol/inspect-1
```

Prüfartefakte im aktuellen Arbeitsumfeld:

- `/tmp/akg-129-taste-sol/inspect-{1..5}/report.json`, Folds und Seitensheets.
- `/tmp/akg-129-taste-sol/browser-check.mjs` und `browser-results.json`.
- `/tmp/akg-129-taste-sol/planning.md`, `copy-deck.md`, Draws und History.
- Der temporäre Generator `build.py` ist **kein aktueller Build-Einstieg**: spätere CSS-Korrekturen liegen direkt in den gelieferten HTML-Dateien.

### Korrekturrunde

Geschlossene Mobilmenüs wurden explizit aus dem Layout genommen. Beim Kapitelentwurf wurden die Hero-Titelspalte verbreitert, die Archivnotiz in ein robustes Grid gesetzt und die mobile Textausrichtung korrigiert. Bei der Cafévariante wurde der Zwischenbereich 801–980 px so korrigiert, dass dort nicht zusätzlich zum Desktoprail ein Mobilmenü erscheint. Inspector und ergänzende Breiten-/Tastaturprüfungen wurden anschließend erneut ausgeführt.

### Ehrliche Taste-Selbstkritik nach Sichtprüfung

Keine Jurynoten oder Rangfolge. Skala 0–10; Gesamt gemäß Skill: Design 30 %, Usability 30 %, Kreativität 20 %, Inhalt 20 %. Die begrenzte Inhaltstiefe und das vorgegebene Bildmaterial verhindern höhere Bewertungen.

| Entwurf | Design | Usability | Kreativität | Inhalt | Gesamt |
| ------- | -----: | --------: | ----------: | -----: | -----: |
| 1       |    7,8 |       8,3 |         6,7 |    7,3 |    7,6 |
| 2       |    7,8 |       8,7 |         7,0 |    7,5 |    7,9 |
| 3       |    8,1 |       8,2 |         7,0 |    7,5 |    7,8 |
| 4       |    8,0 |       8,1 |         7,0 |    7,3 |    7,7 |
| 5       |    7,9 |       8,0 |         7,0 |    7,5 |    7,7 |

Die jeweils drei wesentlichen verbleibenden Schwächen/Prüffragen:

- **1:** Begrüßungsaufbau ist bewusst vertraut, nicht radikal; Festfoto vermittelt Distanz statt Porträtnähe; Aktuelles bleibt ohne echte Redaktion knapp. Stärke: niedrigste Einstiegshürde und klare Gemeindepriorität.
- **2:** Zusätzlicher Klick für Wegweisertexte; Gesprächsbild ist historisch und kein Beleg einer aktuellen Gruppe; tatsächliche Erstbesuchsinformationen fehlen. Stärke: unterschiedliche Besuchsabsichten haben einen ausdrücklichen Weg.
- **3:** Große Kapitel erhöhen die Scrollstrecke; dunkler Auftakt wirkt gewichtiger als Variante 1; Kapitelinhalte sind ohne freigegebene Details noch kurz. Stärke: deutlich anderer Rhythmus und klare, echte Kapitelnavigation.
- **4:** Gottesdienst dominiert gegenüber anderen Einstiegen; Besuchsfragen können ohne bestätigte Zeiten/Adresse nicht vollständig beantwortet werden; plakativer Ton braucht Rückmeldung der Gemeinde. Stärke: direkter, offener Glaubenseinstieg ohne Teilnahmevoraussetzung zu behaupten.
- **5:** Café führt bewusst zuerst und könnte die Gemeindewahrnehmung schwächen; Desktoprail reserviert Breite; aktuelle Caféinformationen bleiben extern. Stärke: andersartige räumliche Orientierung und klare Trennung beider Websites.

## Nicht geprüft / Übergabegrenzen

Keine Safari-/Firefox-, Screenreader-, echten Mobilgeräte-, Zoom-/Forced-Colors- oder vollständigen WCAG-Tests; kein formal durchgeführter Test mit deaktivierter JavaScript-Ausführung. Die Seiten sind scriptfrei, dieser Quellbefund wird nicht als separater JS-disabled-Browsertest ausgegeben. Keine Live-Prüfung der externen Quellseiten oder ihrer Rechte. Interne Inhaltsrouten wurden strukturell, nicht als vollständiger HTTP-/E2E-Durchlauf im statischen Inspector geprüft.

Zentrale Galerie, endgültige Screenshots, repositoryweite **Full Quality**, Integration, Linear und Abnahme verbleiben ausdrücklich beim Parent. Keine Änderungen außerhalb `public/entwuerfe/taste/sol/` und des eigenen `/tmp`-Bereichs, keine Subagenten, Commits, Pushes, Deployments, Linear-Änderungen oder T3-Preview-Tabs durch diesen Auftrag.
