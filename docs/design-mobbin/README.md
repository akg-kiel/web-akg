# AKG-129 · Drei konkrete Mobbin-Rekreationen

## Auftrag und Stand

Die letzte Layoutstudie wurde als „schon sehr viel besser“, aber noch nicht zufriedenstellend bewertet. Neuer Auftrag: wirklich unterschiedliche Richtungen mit Mobbin Deep Search recherchieren und als AKG-Layouts nachbauen, statt erneut eine reine Stiltafel vorzulegen.

Konstant: Original-Logo, lokale Figtree, Weiß, Blau #006c9e, Ink #173b50 und Wash #eaf3f7. Variabel: Raster, Bildmaßstab, Informationsdichte, Reihenfolge und Besucher-Einstieg. Drei eigenständige HTML-Entwürfe, keine neue Markenwelt und kein neues Modell-/Skillbenchmark. Parent verantwortet Recherche, Mosaik-Entwurf, Integration und Prüfung; zwei native, getrennt beauftragte Implementierungsagenten bearbeiteten ausschließlich Journal bzw. Entdeckerseite.

## Nutzerentscheidung · Begegnungen

Der Nutzer hat **Begegnungen** als bevorzugten Seitenaufbau ausgewählt. Verbindliche gestalterische Grundlage für die weitere Ausarbeitung ist `public/entwuerfe/mobbin/begegnung.html`: blaue Einladungsfläche, große helle Typografie, Fotomosaik und anschließender heller Gemeinschaftsbereich. Figtree, vorhandene Blau/Weiß/Ink-Palette und das unveränderte Original-Logo bleiben gesetzt. Nicht mit Gemeindejournal oder Gemeinde entdecken vermischen; die Alternativen bleiben als Vergleich erhalten.

Die Auswahl ist eine Richtungsentscheidung, keine pauschale Abnahme sämtlicher Details, Inhalte, Bildrechte oder der Produktionsreife. In diesem Schritt nur die Entscheidung dokumentiert; keine Änderung der Startseite, kein Commit/Push/Deploy und kein Issue-Abschluss.

## Folgeauftrag „Go!“ · Übertragung in die Anwendung

`src/pages/index.astro` übernimmt jetzt die gewählte Begegnungen-Komposition: blaue Einladung, Drei-Foto-Mosaik, heller gerundeter Gemeinschaftsbereich, Aktuelles und separater Dreimaster-Abzweig. Die drei Vergleichsentwürfe bleiben unverändert erhalten. Figtree, Original-Logo und die bestehende Palette bleiben gesetzt; keine neue Abhängigkeit.

Die Anwendung behält ihre vorhandenen Komponenten für Gottesdienste, Gruppen und News samt SSR-Bridge, Freigabeschaltern, `no-store` und sämtlichen Quellenzuständen. Gefüllte Bereiche zeigen einen Gottesdienst, bis zu drei Angebote und drei Meldungen; ohne Freigabe/Quelle erscheinen keine erfundenen Inhalte. Angebotslinks öffnen weiterhin ohne JavaScript den passenden Abschnitt auf `/angebote`. Der Kontaktweg bleibt dauerhaft verfügbar. Bewusste Abweichungen vom reinen Prototyp: Entwurfshinweis, reale Datenzustände, vorhandener vollständiger Footer und progressive Bildbetrachtung bleiben erhalten.

Die vorläufigen Symbolfotos werden aus dem bestehenden lokalen Bestand verwendet. Credits und Alternativtexte stammen aus `public/entwuerfe/neu/stock/credits.json`; jede Verwendung ist als Symbolfoto gekennzeichnet und die fehlende AKG-Zuordnung ausdrücklich erklärt. Native Bildlinks öffnen ohne JS die lokale Datei, mit JS den vorhandenen Dialog einschließlich Quellen, Escape und Fokusrückgabe. Keine neuen Bestandsfoto-, Inhalts- oder rechtlichen Medienfreigaben. Bestehende Unterseiten, frühere Designrunden und Produktionskonfiguration bleiben unverändert.

### Reproduktion und Prüfumfang der Integration

```sh
pnpm exec vp run quality
pnpm exec vp run test:preview
git diff --check
```

Die Browserregression ist an die gewählte Komposition angepasst: zwölf Routen × fünf Breiten (320/390/768/1024/1440 px), axe bei 390/1440 px, Bildproportionen, Original-Logo, Besuchsziele, Mosaik und Fokusfolge. Native Menüs, Ankersprung mit Fokusübergabe, Bilddialog und alle drei Bildlinks ohne JavaScript, 200-%-Text und reduzierte Bewegung bleiben geprüft. Der bestehende private Fixture-Build prüft zusätzlich gefüllte Gottesdienst-/Angebots-/Newsbereiche, escaped News-Text und die Zustände empty, unavailable, disabled und stale einschließlich Warnung und Zeitstempel. Diese synthetischen Daten und der Test-Queryparameter existieren ausschließlich in der wegwerfbaren lokalen Kopie, nicht in der App oder ihren Buildartefakten.

Ergebnis: Full Quality bestanden (38 Tests, Format/Lint, Astro, Build und Cloudflare-Grenzen); vollständiges `test:preview` einschließlich privater Fixture-Kopie bestanden. Keine gemeldeten axe-Verletzungen, JavaScript-Seitenfehler oder externen Ressourcenrequests; kein Seitenüberlauf. Ein kombinierter Prüflauf wurde durch das 120-Sekunden-Werkzeuglimit abgebrochen, der vollständige Preview-Lauf anschließend mit ausreichendem Zeitlimit erfolgreich wiederholt. Logs: `/tmp/akg-begegnungen-quality.log` und `/tmp/akg-begegnungen-preview.log`. `git diff --check` sauber.

Sichtnachweise der realen Startseite: `/tmp/akg-begegnungen-qa/`; synthetische Datenzustände separat: `/tmp/akg-begegnungen-fixture-qa/`. Desktop- und Mobilaufbau gegen die ausgewählte Grundlage gelesen; Bildnachweise sind für die Anwendung größer als im Prototyp. Keine behauptete neue Live-ChurchTools-/Berechtigungsprüfung. Frühere Designgalerien sind nicht die neue Homepage.

Kein Commit, Push, Merge, Deploy, DNS-Wechsel oder Issue-Abschluss. Die öffentlich erreichbare Branch-Vorschau zeigt weiterhin den früher gepushten Stand. Offen bleiben Nutzer-Detailabnahme, reale Geräte, Safari/Firefox, Screenreader, vollständige WCAG-Prüfung und finale Inhalts-/Medien-/Rechtsfreigaben.

## Folgeauftrag · reduzierte Bildnachweise und Branch-Preview

Der Nutzer möchte die sichtbaren Copyright-/Autorenzeilen entfernen und ausdrücklich eine Preview pushen. In der tatsächlichen Startseite und ihrem Bilddialog entfallen deshalb die Pexels-Autorenlinks. Die weißen Nachweisstreifen entfallen ebenfalls; nur ein kleines, kontrastreiches „Symbolfoto“-Label bleibt auf jedem Bild. Der gemeinsame Symbolfoto-Hinweis und die zentrale Quellen-/Lizenzdokumentation bleiben erhalten. Pexels verlangt keine Attribution; erforderliche Commons-Nachweise auf Unterseiten werden nicht entfernt. Die historischen Vergleichsentwürfe bleiben unverändert.

Dieser Folgeauftrag erweitert die vorherige lokale Finish Line um Commit/Push auf `t3/skill-design-drafts-overview` und die automatische Cloudflare-Branch-Vorschau, ausdrücklich ohne Merge, Produktionsdeploy, DNS-Wechsel oder Issue-Abschluss. Die bisher uncommitteten AKG-129-Explorationsstände werden mit ihrer Herkunftsdokumentation erhalten. Ziel der Vorschau ist jetzt die Anwendungsstartseite `/`, nicht nur die alte 50er-Galerie.

Prüfstand vor dem Preview-Push: Full Quality mit 38 Tests bestanden; vollständiger Preview-/Browsercheck mit zwölf Routen bei fünf Breiten und privater Datenfixture bestanden. Neue Assertions prüfen sichtbare Symbolfoto-Labels und fehlende per-Foto-Autorenlinks, auch im Dialog. Ein beim 200-%-Texttest gefundener Überlauf der kompakten Kennzeichnung wurde mit umbrechbarem Text behoben; erneuter vollständiger Lauf ohne gemeldete axe-Verletzungen, Seitenfehler oder externe Ressourcenrequests. Desktop und Mobil visuell geprüft. Logs: `/tmp/akg-preview-push-quality.log`, `/tmp/akg-preview-push-browser.log`.

## Tatsächliche Recherche

**Sechs Aufrufe von `search_screens` mit `mode: deep`, Plattform web**, anschließend zwei ergänzende `search_sections`-Aufrufe. Die Section-Suche besitzt keinen Deep-Modus; OpenTable wird nicht fälschlich als Deep-Search-Treffer ausgegeben.

| Suche                                        | Ergebnis und Entscheidung                                                                                                                                                |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Community organization homepage · Deep       | Vier Treffer; eingeloggte Community-/Profiloberflächen von Meetup, Glassdoor, X und Circle statt einer passenden öffentlichen Startseite. Nicht als Referenz übernommen. |
| Museum homepage · Deep                       | Keine Treffer; keine vermeintliche Museumsreferenz erfunden.                                                                                                             |
| Editorial magazine homepage · Deep           | Vier Treffer, darunter Quartz/NYT; Rastervarianten gesichtet. Anschließend gezielt echte Frontpage gesucht.                                                              |
| Airbnb homepage · Deep                       | Drei Ansichten mit kompakter Navigation, Bildkollektionen und horizontalen Entdeckerreihen; als Katalogprinzip ausgewählt.                                               |
| Calm homepage · Deep                         | Drei eingeloggte Ansichten mit Seitennavigation/Medienbibliothek; keine unnötige App-/Loginoberfläche für die AKG übernommen.                                            |
| The New York Times homepage · Deep           | Drei Frontpage-/Fortsetzungsansichten; Textspalten, Bildaufmacher und parallel zugängliche Inhalte ausgewählt.                                                           |
| cultural institution hero section · Sections | Vier Treffer gesichtet; überwiegend kein geeigneter öffentlicher Gemeinde-Einstieg.                                                                                      |
| hospitality hero section · Sections          | Vier Treffer; OpenTable-Fotomosaik als dritter, bildbetonter Gegenpol ausgewählt.                                                                                        |

Insgesamt 25 zurückgegebene Screens/Sections visuell gesichtet; drei ausgewählte hochauflösende Referenzen heruntergeladen. Quellen und Suchmodus: [sources.json](sources.json). Keine behauptete Vollständigkeit der Mobbin-Bibliothek oder Bewertung durch echte Besucher.

## Referenz → tatsächlicher AKG-Aufbau

### Gemeindejournal

[New York Times auf Mobbin](https://mobbin.com/screens/cb3938b3-d8af-4c12-a997-a7ecb83662f2?utm_source=other&utm_medium=ai-assistant&utm_source_platform=mcp)

Datei: `public/entwuerfe/mobbin/journal.html` · Referenz: `assets/journal.webp`.

Übertragen: zentrierter Masthead, kompakte volle Navigation, feine redaktionelle Trennlinien, ungefähr 25/45/30 gewichtete Text-/Bild-/Servicespalten, anschließend ungleiche redaktionelle Inhaltsgrößen. Gottesdienste, Aktuelles und Kontakt sind gleichzeitig mit dem Aufmacher erreichbar. Mobil wird daraus eine lesbare lineare Titelseite.

Abweichungen: Figtree statt fremder Serifenschrift und Original-Logo statt NYT-Wortmarke; dauerhafte Besuchswege statt erfundener Nachrichten. Weniger Module, weil keine freigegebenen aktuellen Artikel vorliegen. Die rechte Spalte endet früher als das bildbetonte Gemeindefeature – bewusst nicht mit Fake-News oder Werbeflächen aufgefüllt.

### Gemeinde entdecken

[Airbnb auf Mobbin](https://mobbin.com/screens/99e4c984-570e-4675-b8ec-e035c6298b2f?utm_source=other&utm_medium=ai-assistant&utm_source_platform=mcp)

Datei: `public/entwuerfe/mobbin/entdecken.html` · Referenz: `assets/entdecken.webp`.

Übertragen: kompakter Kopf, zurückhaltender Titel statt großer Begrüßungshero, bildgeführte Zielkarten, gerundete Bildfenster und kurze Beschriftungen. Mobil eine native horizontal scrollbare Sammlung mit sichtbarem Folgeelement; reale Ziel- und Autorenlinks bleiben per Tastatur erreichbar. Anschließend kompakte weitere Besuchswege.

Abweichungen: vier reale AKG-Ziele statt zahlreicher erfundener Einträge. Gottesdienste erhalten eine typografische Kachel statt eines unpassenden Stock-Gottesdienstbildes. Keine nachgemachten Such-/Buchungsfelder, Favoriten, Bewertungen, Logins oder wirkungslosen Filter. Die Bildkennzeichnung braucht mehr Raum als Airbnbs Metadaten.

### Begegnungen

[OpenTable auf Mobbin](https://mobbin.com/sites/sections/3a10c864-0f39-4ba7-8d32-f460f825bb8b?utm_source=other&utm_medium=ai-assistant&utm_source_platform=mcp)

Datei: `public/entwuerfe/mobbin/begegnung.html` · Referenz: `assets/begegnung.webp`.

Übertragen: breites farbiges Einladungsfeld, große helle Typografie, rechts ein Mosaik unterschiedlicher Bildgrößen, anschließend ein heller, abgerundeter Gemeinschaftsbereich mit konkreten Besuchswegen. Mobil stehen Einladung/Aktion vor dem Fotomosaik; kein zusammengedrückter Desktop-Zweispalter.

Abweichungen: flaches vorhandenes AKG-Blau statt fremdem Rotverlauf; drei unabhängige Symbolbilder statt sieben fremder Gastronomieaufnahmen. Keine kopierten Porträts, Texte, Markenassets oder Geschäftsversprechen. Bildquellen stehen unmittelbar an den einzelnen Motiven, nicht nur gesammelt im Footer.

## Was genau rekreiert ist

Es sind **sichtbar nachvollziehbare Layout-Rekreationen mit AKG-Material**, keine pixelgenauen Kopien und keine vollständigen Rekonstruktionen fremder Websites. Maße/Verhältnisse wurden aus den Screenshots geschätzt, nicht aus Figma-Werten gelesen. Vorbilder werden in der portablen Auswahl unter dem jeweiligen klickbaren Entwurf mit Screenshot und Mobbin-Link gezeigt, damit die Übertragung direkt vergleichbar ist.

Die drei Erstaktionen unterscheiden sich: redaktionell mehrere Wege überblicken; nach passenden Bereichen stöbern; zunächst eine bildliche Einladung erleben und anschließend einen Weg wählen. Die spätere Umsetzung wird kein Gemisch daraus: Der Nutzer hat Begegnungen als Grundlage gewählt. Damit ist die Richtung entschieden, nicht jeder Detailstand abschließend abgenommen.

Die Mobbin-Screenshots sind ausschließlich Dokumentations-/Vergleichsmaterial, keine offen lizenzierten AKG-Homepage-Assets. Originale in `docs/design-mobbin/assets/`; portable Vergleichsbilder werden proportional auf 360 px verkleinert. Tatsächliche Homepages enthalten keine fremden Screenshots oder Runtime-Hotlinks. Keine Lizenzfreiheit der Referenzscreenshots behauptet.

## Inhalt, Bilder und Grenzen

Alle eigentlichen Fotos sind die drei bereits dokumentierten lokalen Pexels-Symbolbilder; Quelle, Autoren und Lizenz zentral unter `public/entwuerfe/neu/stock/credits.json`. Keine neuen Fotos beschafft. Originaldateien unverändert; nur proportionale CSS-Cover-Ausschnitte. Jede Verwendung unmittelbar als Symbolfoto markiert und mit Autorenlink; Footer erklärt die fehlende AKG-Zugehörigkeitsbehauptung. Kein Bild wird als Café Dreimaster oder als tatsächliches Gemeindemitglied ausgegeben.

Bestehende Routen und externer Dreimaster-Abzweig bleiben erhalten. Keine neuen Termine, Nachrichten, Personen, Angebote, Kontaktdetails, Zitate, rechtlichen Angaben oder ChurchTools-Daten. Die Designs enthalten Besuchswege zu Aktuelles, nicht einen vorgetäuschten aktuellen Feed. Keine neuen Datenfreigaben.

Bestehende App, 50er-Galerie, Stock-v0, ungewählte Stiltafel und erste Layoutstudie bleiben erhalten. Keine neue Abhängigkeit, kein Stack-/Produktionswechsel und kein Commit, Push, Merge, Deploy, DNS-Wechsel oder Issue-Abschluss.

## Reproduktion und QA

```sh
node scripts/design-revision-browser.mjs --mobbin
node scripts/export-design-gallery.mjs --mobbin
node scripts/design-revision-browser.mjs --layout
node scripts/design-revision-browser.mjs
node scripts/design-gallery-browser.mjs --gallery-only
pnpm exec vp run quality
git diff --check
```

Der vorhandene Check/Exporter wurde um `--mobbin` ergänzt. Ausgabe: `/tmp/akg-mobbin.html` und `/tmp/akg-mobbin-inline.html`. Beide enthalten die drei tatsächlichen HTML-Seiten samt lokaler Assets und Desktop-/390-px-Steuerung; für den Transport komprimiert, Repository-Originale unverändert.

Prüfung: drei Seiten × 320/390/768/1440 px; sechs axe-Prüfungen bei 390/1440 px ohne gemeldete Verletzungen, native Menüs, Skip-Link-Fokus, geladene Bilder, Proportionen, Überschriften und fehlender Seitenüberlauf. Entdeckerleiste separat mit Pfeiltaste geprüft; Standardscreenshots werden vor der bewusst seitlichen Tastaturbewegung aufgenommen. Desktop-/Mobil-Ganzseiten visuell gelesen und gegen die Referenzen geprüft.

Portable Dateien: alle drei Seiten geöffnet, Wechsel, 390-px-Ansicht, tastaturbedienbare Leiste ohne versehentlichen Variantenwechsel, Quellenlinks und Escape geprüft. Keine externen Ressourcenrequests oder JavaScript-Seitenfehler. Berichte/Screenshots: `/tmp/akg-mobbin-qa/`.

Regressionen: frühere Layoutstudie, beide Stock-v0 und 50er-Galeriesteuerung/Exporte erneut bestanden. Full Quality: 38 Tests, Format/Lint, Astro, Build und Cloudflare-Grenzen bestanden; `git diff --check` sauber. Im ersten vollen Lauf wurde die bereits vorhandene noindex-Direktive der neuen Mosaikdatei wegen ihrer Kommaschreibweise vom strikten Buildcheck abgelehnt; auf die bestehende Repository-Schreibweise `noindex, nofollow` korrigiert und erneut geprüft. Kein Check abgeschwächt.

Offen: Detailausarbeitung und deren Abnahme, echte Mobilgeräte, Safari/Firefox, Screenreader und abschließende Medien-/Inhalts-/Rechtsfreigabe. Automatisierte Checks sind weder Designabnahme noch vollständiger WCAG- oder Launch-Nachweis. Die Referenz-Rekreationen sind kein behaupteter voller Taste-Skill-Gatelauf: referenztypische Linien/Karten, weniger echte Fotos und fehlende künstliche Bewegungs-/Videoquoten sind hier bewusste Abweichungen zugunsten des Nutzerauftrags und wahrer Inhalte.
