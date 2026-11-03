# Redesign: Logo, Bilder und belastbare Textentwürfe

Recherche: **2026-10-26** · Projekt **Website AKG** · Nur Recherche, keine Veröffentlichungsfreigabe.

## Ergebnis und Freigabegrenze

- **Das alte Logo ist gefunden:** die originale blaue „apostel“-Wort-/Bildmarke, nicht ein neues AKG-Monogramm. Den ausdrücklichen Nutzerwunsch „behalte bitte das alte Logo bei“ genau darauf beziehen.
- Die Altseite liefert brauchbaren Stoff für **Leitbild, ausgewählte Geschichte und Baugeschichte der Petruskirche**. Daraus lassen sich konkrete, nicht personenbezogene Texte entwerfen. **Keiner dieser neuen Texte ist durch die Recherche bereits redaktionell abgenommen.**
- Für WordPress-Fotos wurde keine dokumentierte Freigabe für die neue Website gefunden. Es gibt aber **tatsächlich CC-lizenzierte Fotos genau dieser Petruskirche** auf Commons. Bevorzugt: Außenansicht von Matthias Süßen, 2024; Innenraum mit Blick zum Altar als zweite Option nach ergänzender Rechteprüfung.
- Keine aktuellen Gruppen, Veranstaltungen, Personen, Kontakte, Rechts- oder Zahlungsangaben aus WordPress übernehmen. ChurchTools bleibt einzige dynamische Quelle; bestehende Gates bleiben geschlossen. Eine Bildlizenz ist weder Ortsfreigabe noch Einwilligung abgebildeter Personen.

## 1. Linear und Inventar geprüft

Alle vier Issues gehören ausdrücklich zu **Website AKG**, Projekt-ID `44beeb8e-bb04-4231-8947-ad9758de1c1c`, nicht Website Konzerte oder Website Dreimaster.

| Issue                                              | Aktueller Stand / entscheidender Befund                                                                                                                                                                                                                               | Meilenstein                                                                                                 |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| [AKG-67](https://linear.app/akg-kiel/issue/AKG-67) | Todo; Herkunft, Nutzungsrechte und redaktionelle Medienfreigabe müssen dokumentiert sein. Keine Kommentare oder Freigabeanhänge.                                                                                                                                      | 4 · Inhalte & Integrationen, **2027-02-19**: ausgewählte Altinhalte/Medien migrieren oder sauber verknüpfen |
| [AKG-72](https://linear.app/akg-kiel/issue/AKG-72) | Todo; jede öffentliche Route benötigt dokumentierte Abnahme, Fakten autoritative Prüfung, Rechtstexte technische Passung. Kommentar vom 2026-09-04: Personen im MVP vollständig deaktiviert; schriftliche Freigabe und Einwilligungs-/Widerrufsprozess bleiben nötig. | 5 · Abnahme & Launch-Vorbereitung, **2027-03-12**                                                           |
| [AKG-79](https://linear.app/akg-kiel/issue/AKG-79) | Backlog; bestätigte Anschriften, Anfahrt, konkrete Barrierefreiheit, Medienrechte, Ortsredaktion und Prüfdatum fehlen. Keine Kommentare oder Freigabeanhänge.                                                                                                         | 5 · Abnahme & Launch-Vorbereitung, **2027-03-12**                                                           |
| [AKG-64](https://linear.app/akg-kiel/issue/AKG-64) | In Progress. Letzter Kommentar 2026-10-26: Ortsrouten technisch vorhanden, **statische Textfreigaben und AKG-78/79 weiterhin offen**; keine Anschriften, Barrierefreiheitsbehauptungen, Personen oder Rollen veröffentlicht.                                          | 3 · MVP: Kernwebsite, **2027-01-15**: responsive Vorschau mit freigegebenen Kerninhalten                    |

Issue-Beschreibungen, Akzeptanzkriterien, sämtliche vorhandenen Kommentare und Meilensteinbeschreibungen gelesen. An diesen drei Meilensteinen gibt es keine zusätzlichen Kommentare. Kein Linear-Eintrag wurde verändert.

Gelesen: `AGENTS.md`, `docs/content-models.md`, `docs/migration/README.md`, `docs/mvp-status.md` und die relevanten Zeilen von `docs/migration/inventory.csv`:

- Z. 7–9, 23: Geschichte/Leitbild/Orte und `/gemeinde` = **überarbeiten**, statische Gemeindeinhalte fachlich bestätigen.
- Z. 19, 24, 31: Startseite, Gottesdienste und Petruskirche = **überarbeiten**, keine pauschale Text-/Bildübernahme.
- Z. 75: alter Beitrag `/leitbild` bleibt **archiviert**; Z. 101: `/geschichte` **entfällt** als eigene Altseite. Nur kuratierte Abschnitte auf `/gemeinde`, keine Wiederherstellung dieser WordPress-Struktur.
- Z. 81–96, besonders Z. 86 „Was ist die Taufe?“: FAQ-Kandidaten, alle mit Pastorats-/Fachfreigabe.
- Z. 99–100: Gemeindehaus Mitte/Wik = **überarbeiten**, praktische Angaben bestätigen.
- Z. 22, 25, 27, 30, 33: Datenschutz, Impressum, Kontakt, Mitarbeitende, Spenden bleiben freigabeabhängig.

Das Inventar enthält **0 Einträge „übernehmen“**. „Überarbeiten“ ist ausdrücklich keine Publikationsfreigabe.

## 2. Original-Logo

Die [Startseite](https://akg-kiel.de/) verwendet im Header `logo-akg-250px.png` mit `logo-akg-500px.png` als 2×-Quelle. Die öffentliche [WordPress-Mediensuche](https://akg-kiel.de/wp-json/wp/v2/media?search=logo-akg&per_page=100) bestätigt die Originaldateien und Maße:

| Datei                                                             | Maße                  | Verwendung                                                     |
| ----------------------------------------------------------------- | --------------------- | -------------------------------------------------------------- |
| https://akg-kiel.de/wp-content/uploads/2019/09/logo-akg-500px.png | **500 × 272 px**, PNG | **Empfohlene unveränderte Quelldatei**; transparent, ca. 13 KB |
| https://akg-kiel.de/wp-content/uploads/2019/09/logo-akg-250px.png | **250 × 136 px**, PNG | bisherige Headerdatei                                          |
| https://akg-kiel.de/wp-content/uploads/2019/07/logo-akg.png       | **265 × 144 px**, PNG | ältere Variante im Medienbestand                               |
| https://akg-kiel.de/wp-content/uploads/2019/09/logo-akg-200px.png | **200 × 109 px**, PNG | kleinere Originalvariante                                      |
| https://akg-kiel.de/wp-content/uploads/2019/09/logo-akg-100px.png | **100 × 55 px**, PNG  | kleinere Originalvariante                                      |

500-px-Datei heruntergeladen und visuell geprüft: blaues „apostel“, stilisierte Figur/Kreuz und gebogener Schriftzug „Ev.-Luth. Kirchengemeinde Kiel“. **Nicht nachzeichnen, neu setzen, umfärben oder beschneiden.** Seitenverhältnis erhalten; auf hellem Grund einsetzen. Sinnvoller zugänglicher Name des Startseitenlinks: „Apostel-Kirchengemeinde Kiel – Startseite“.

**Rechte:** Die ausdrückliche Nutzeranweisung ist eine konkrete gestalterische Vorgabe zur Beibehaltung dieser Marke, keine allgemeine Medien-/Datenschutzfreigabe. Öffentliche Mediendaten nennen weder Urheber noch offene Lizenz; Credit/Copyright sind leer. Für AKG-67 diese Herkunft und den Nutzerauftrag dokumentieren, aber keine CC-Lizenz oder umfassende Rechteklärung behaupten. Kein verifiziertes SVG gefunden.

Temporäre Datei: `/tmp/akg-research/logo-akg-500px.png`.

## 3. Bilder der alten Website: passend, aber nicht freigegeben

Diese drei Dateien stammen aus der [Petruskirchen-Seite](https://akg-kiel.de/petruskirche) bzw. ihrem Medienbestand. Alle wurden tatsächlich angesehen; in den geprüften Bildern sind keine Menschen erkennbar.

| Exakte Datei                                                            | Maße / Motiv                                                                                   | Rechtebefund                                                                                                                                               |
| ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| https://akg-kiel.de/wp-content/uploads/2019/07/P1020137.jpg             | **1628 × 1088**; roter Turm, grünes Laub, rosa Stockrosen. Sehr passende, warme Außenaufnahme. | [Medium 1958](https://akg-kiel.de/wp-json/wp/v2/media/1958): Credit/Copyright, Caption und Alt leer. **Nicht zur Migration freigegeben.**                  |
| https://akg-kiel.de/wp-content/uploads/2019/07/FB_IMG_1530649728918.jpg | **1436 × 960**; scharfe Stockrosen vor unscharfem Kirchturm.                                   | [Medium 1952](https://akg-kiel.de/wp-json/wp/v2/media/1952): Credit/Copyright und Caption leer. Dateiname belegt weder Fotograf noch Lizenz. **Gesperrt.** |
| https://akg-kiel.de/wp-content/uploads/2019/07/20180324_165910.jpg      | **1920 × 1080**; Blumen im Vordergrund, Altar und Flügel dahinter.                             | [Medium 1956](https://akg-kiel.de/wp-json/wp/v2/media/1956): Credit/Copyright leer. Zusätzlich dargestellte Kunstwerke berücksichtigen. **Gesperrt.**      |

Das alte [Impressum](https://akg-kiel.de/impressum) liefert keine konkrete Lizenz dieser Fotos. Ein Seitenautor oder WordPress-Uploader ist kein Nachweis der Fotografenrechte. Personfreie Motive lösen nur einen Teil der Prüfung, nicht das Urheberrecht. Die Bilder bleiben unter `/tmp/akg-research/wp-*.jpg`; keine öffentlichen Assets erstellt.

## 4. Echte Commons-Alternativen

Recherche in [Petruskirche (Kiel-Wik)](<https://commons.wikimedia.org/wiki/Category:Petruskirche_(Kiel-Wik)>) und der Innenraum-Unterkategorie. Autor, Maße und konkrete Lizenz wurden zusätzlich über `imageinfo`/`extmetadata` der Commons-API geprüft, nicht allein aus Suchtreffern abgeleitet.

### A — Empfehlung: Außenansicht, Matthias Süßen, 2024

- Dateiseite: https://commons.wikimedia.org/wiki/File:Petruskirche-Wik-2024-msu-2530.jpg
- Original: https://upload.wikimedia.org/wikipedia/commons/d/d3/Petruskirche-Wik-2024-msu-2530.jpg
- **5000 × 4000 px**, 4,32 MB; Aufnahme **2024-08-01**.
- **Matthias Süßen, CC BY-SA 4.0**: https://creativecommons.org/licenses/by-sa/4.0/
- Sichtprüfung der 960-px-Vorschau: vollständiger Backsteinturm mit Vorplatz, blauer Himmel, Laub am oberen Rand; **keine Personen oder parkenden Fahrzeuge erkennbar**. Besser als die ältere Straßenansicht mit Autos.
- Alt-Vorschlag: „Petruskirche in Kiel-Wik mit Backsteinturm und Vorplatz.“ Nicht als Nachweis heutiger Zugangsbedingungen verwenden.
- Lokal: `/tmp/akg-research/commons-suessen-exterior-2024.jpg` (**nur 960-px-Vorschau**, nicht Original).

### B — Innenraum, Blick zum Altar, Matthias Süßen, 2026

- Dateiseite: https://commons.wikimedia.org/wiki/File:Petruskirche-Kiel-2026-09-msu--3404.jpg
- Original: https://upload.wikimedia.org/wikipedia/commons/1/15/Petruskirche-Kiel-2026-09-msu--3404.jpg
- **6960 × 4640 px**, 33,62 MB; Aufnahme laut Metadaten **2026-04-19** (nicht September aus dem Dateinamen ableiten).
- **Matthias Süßen, CC BY-SA 4.0**.
- Sichtprüfung der 960-px-Vorschau: warmer Holz-/Backsteinraum, Mittelgang, Bänke und Fenster; **keine Personen erkennbar**.
- Alt-Vorschlag: „Blick durch die Petruskirche auf den Altar, mit Holzbänken und offenem Dachstuhl.“
- Lokal: `/tmp/akg-research/commons-suessen-interior-3404.jpg`.
- **Zusatzprüfung vor Veröffentlichung:** Fotolizenz belegt; sie bestätigt nicht automatisch Rechte an abgebildeten Altar-/Kunstwerken oder gegebenenfalls Aufnahmebedingungen. Nicht als umfassend rechtlich freigegeben bezeichnen.

### C — Personfreies Innendetail: Dachkonstruktion

- Dateiseite: https://commons.wikimedia.org/wiki/File:Petruskirche-Kiel-2026-09-msu--3400.jpg
- Original: https://upload.wikimedia.org/wikipedia/commons/3/34/Petruskirche-Kiel-2026-09-msu--3400.jpg
- **6960 × 4640 px**, Aufnahme **2026-04-19**; **Matthias Süßen, CC BY-SA 4.0**.
- Sichtprüfung: senkrechter Blick in den Holzdachstuhl, Lichttechnik und Kranz; keine Menschen, kein Altar. Eher unterstützendes Detail als Hauptmotiv.
- Alt-Vorschlag: „Offene Holzkonstruktion des Dachs der Petruskirche.“
- Lokal: `/tmp/akg-research/commons-suessen-ceiling-3400.jpg` (960-px-Vorschau).

### Weitere geprüfte Kandidaten / Ausschlüsse

- **Christian Alexander Tietgen**, [Petruskirche Kiel-Wik.jpg](https://commons.wikimedia.org/wiki/File:Petruskirche_Kiel-Wik.jpg), **3648 × 2736**, **CC BY-SA 3.0**, 2012-06-23. Original: https://upload.wikimedia.org/wikipedia/commons/5/50/Petruskirche_Kiel-Wik.jpg — tatsächlich angesehen, Autos/Lieferwagen stören den Vordergrund; A ist geeigneter. Lizenz: https://creativecommons.org/licenses/by-sa/3.0/.
- **Irmgard Engel**, [Petrus kirche kiel.jpg](https://commons.wikimedia.org/wiki/File:Petrus_kirche_kiel.jpg), **800 × 600**, **CC BY 3.0**. Original: https://upload.wikimedia.org/wikipedia/commons/0/03/Petrus_kirche_kiel.jpg — Lizenz verifiziert, aber wegen geringer Auflösung nicht priorisiert und nicht visuell freigeprüft. Lizenz: https://creativecommons.org/licenses/by/3.0/.
- **Nicht als personfrei verwenden:** https://upload.wikimedia.org/wikipedia/commons/4/4b/Petruskirche-Kiel-2026-09-msu--3390.jpg — beim tatsächlichen Ansehen sind hinten rechts Menschen sichtbar, obwohl der Raum auf den ersten Blick leer wirkt. Die CC BY-SA 4.0-Fotolizenz ersetzt deren Einwilligung nicht.

**Attribution bei A–C:** sichtbarer Nachweis mit Autor, verlinkter Dateiseite und Lizenz, z. B. „Foto: Matthias Süßen / Wikimedia Commons · CC BY-SA 4.0 · zugeschnitten und komprimiert“ (Änderungshinweis nur passend zu tatsächlich erfolgten Änderungen). Bearbeitete Bildversionen unter derselben Lizenz; nicht mit einem pauschalen „Alle Rechte vorbehalten“ überziehen. Die [Lizenz](https://creativecommons.org/licenses/by-sa/4.0/) weist ausdrücklich auf mögliche weitere Rechte hin. Vor Produktiveinsatz Original in voller Auflösung prüfen und die projektspezifische Medienabnahme dokumentieren. Lokal optimieren und ausliefern statt Commons/WordPress heißzuverlinken.

## 5. Konkrete Textentwürfe, ohne aktuelle Betriebsdaten

**Status aller folgenden Absätze: redaktioneller Entwurf, keine Live-Freigabe.** Sie können innerhalb des Redesign-Auftrags zur Text-/Gestaltungsabstimmung verwendet werden. Öffentliche Veröffentlichung erst nach den jeweiligen Freigaben. Quellenbeleg ersetzt AKG-72 nicht.

### Startseite — „Schön, dass du da bist.“

> Willkommen bei der Apostel-Kirchengemeinde Kiel. Wir möchten Glauben und Leben miteinander teilen. Ob du unsere Gemeinde schon kennst oder zum ersten Mal vorbeischaust: Schön, dass du da bist.

Basis: [Leitbild auf `/gemeinde`](https://akg-kiel.de/gemeinde), insbesondere „Wir sind eine einladende Gemeinde“ und „Wir heißen alle Menschen, die zu uns kommen, willkommen“. Neue Einladung statt Behauptung konkreter Öffnungszeiten, Veranstaltungen oder garantierter Angebote. Abnahme: AKG-62/72.

### Gemeinde — „Was uns verbindet“

> Jesus Christus steht im Mittelpunkt unseres Glaubens. Wir möchten ihm folgen und seine Liebe in Worten und im Handeln weitergeben. Dabei ist uns das Miteinander wichtig: Menschen mit unterschiedlichen Erfahrungen und Begabungen sollen in unserer Gemeinde Platz finden.
>
> Unser Leitbild spricht von einer einladenden Gemeinde und einem Ort der Gnade. Dazu gehören für uns gegenseitige Achtung, gemeinsames Gebet und ein barmherziger Umgang mit Fehlern. Gemeinde ist für uns nicht nur ein Gebäude, sondern gelebte Gemeinschaft.

Basis: die ausdrücklichen Leitbildsätze auf [der Gemeindeseite](https://akg-kiel.de/gemeinde); **keine neue theologische Position oder konkrete Leistung versprechen**. Abnahme: AKG-64/72.

### Gemeinde — „Unsere Geschichte in Kürze“

> Die Apostel-Kirchengemeinde entstand 2008 aus dem Zusammenschluss von Petrus-Süd und Jakobi-West. Im März 2016 zog sie in die Petruskirche ein. Damit begann für die Gemeinde und das Kirchengebäude ein neues gemeinsames Kapitel.

Belegt durch Altseite und unabhängig durch die [Nordkirche, 14. März 2016](https://www.nordkirche.de/nachrichten/nachrichten-detail/nachricht/feierliche-einweihung-kieler-petruskirche-hat-wieder-eine-gemeinde). Nur dieser kurze historische Ausschnitt, keine alten Personalbiografien, Mitgliederzahlen, Finanzierungsmodelle oder als aktuell formulierten Dienstverhältnisse. Abnahme: AKG-64/72.

### Petruskirche — „Backstein, Licht und Geschichte“

> Die Petruskirche gehört zum Stadtbild von Kiel-Wik. Sie wurde von 1905 bis 1907 als evangelische Garnisonkirche für die Marine gebaut. Den Entwurf lieferten die Architekten Curjel und Moser.
>
> Außen prägt der hohe Backsteinturm das Gebäude. Im Inneren fallen die großen seitlichen Fenster und der offene hölzerne Dachstuhl auf. Backstein und Holz geben dem Raum seinen besonderen Charakter.
>
> 1944 wurde die Kirche im Krieg beschädigt, 1949 wiederhergestellt. Im März 2016 zog die Apostel-Kirchengemeinde in die Petruskirche ein.

Belege: [AKG-Petruskirchenseite](https://akg-kiel.de/petruskirche), [Kieler Stadtarchiv: Einweihung der Petruskirche](https://kiel.de/de/kultur_freizeit/stadtarchiv/erinnerungstage.php?id=82), Nordkirche-Bericht oben. Eigenständig formulierte historische Zusammenfassung, keine Übernahme fremder langer Texte. Abnahme: AKG-64/72; **praktisches Ortsprofil weiterhin AKG-79**. Aus einem historischen Absatz keinen Veranstaltungsort für ChurchTools-Termine ableiten.

### Gottesdienste — statischer Einstieg, ohne Formatversprechen

> Gottesdienst ist für uns eine Einladung, Gott zu begegnen und im Glauben zu wachsen. So beschreibt es unser Leitbild. Auch wenn du noch Fragen hast oder erst neu auf der Suche bist: Du bist willkommen.

Basis: Leitbildabschnitt über Gottesdienste. Keine Aussage zu Uhrzeit, Rhythmus, Musikstil, Kindergottesdienst, Anmeldung, Ort, Kirchkaffee oder Übertragung. Abnahme: AKG-60/72. Darunter ausschließlich freigegebene ChurchTools-Termine; nicht behaupten, es gebe keine Gottesdienste, wenn nur das Gate geschlossen ist.

### Kontakt/FAQ — möglicher dauerhafter Baustein „Was ist die Taufe?“

> Mit der Taufe wird ein Mensch in die christliche Gemeinde aufgenommen. Sie ist ein Sakrament und knüpft an die Taufe Jesu durch Johannes den Täufer an.

Basis: [inventarisierte FAQ](https://akg-kiel.de/faq-items/was-ist-die-taufe). Nur als Kandidat zur **Pastorats-/Fachabnahme in AKG-61/72**; keine ungeprüften Regeln zu Kosten, Unterlagen, Altersgrenzen, zuständigen Personen oder konkreten Taufangeboten anschließen.

### Nicht aus dem Altbestand befüllen

- **Angebote/Aktuelles:** keine redaktionell erfundene aktuelle Gruppenliste, keine WordPress-News. AKG-74/75 und bestehende ChurchTools-Regeln bleiben maßgeblich.
- **Gemeindehaus Mitte/Wik:** die vorgesehenen Ortsnamen sind bekannt, praktische Beschreibungen, Nutzung, Anschriften, Anfahrt und Zugang aber nicht abgenommen. Keine vermeintlich hilfreichen Details ergänzen.
- **Kontakt, Spenden, Impressum, Datenschutz:** keine konkreten Daten oder Rechtstexte aus WordPress übernehmen; eine freundliche Überschrift macht fehlende Fachfreigaben nicht entbehrlich.
- **Personen/Porträts:** weiterhin vollständig aus; auch historische Mitarbeiterangaben nicht als aktuelles Gemeindebild wiederverwenden.
- **Konzerte/Dreimaster:** externe Produkte bleiben extern. Keine Öffnungszeiten, Kalender oder Kontaktkopien; Ziele gemäß AKG-69 prüfen.

## 6. Kleinste brauchbare Empfehlung

**Jetzt:** Original-Logo im Entwurf beibehalten; Einladung, Gemeinde-/Leitbildtext, zwei historische Daten und einen kurzen Architekturtext zur redaktionellen Abstimmung verwenden. Mit der Commons-Außenaufnahme A lässt sich ein konkretes lokales Bildkonzept entwickeln, ohne generische Stockkirche oder erfundene Gemeindefotos. Lizenzbedingungen auch in einer geteilten Vorschau beachten; öffentliche Medienabnahme nicht vorwegnehmen.

**Vor Veröffentlichung:** diese Textbausteine einzeln in AKG-64/72 abnehmen lassen; Bild A samt Attribution in AKG-67/79 dokumentieren; bei B Zusatzrechte klären. Bis dahin keine Gates öffnen und keine nicht bestätigten Orts-/Kontakt-/Termin-/Personendaten ergänzen. Es wurde weder die Anwendung noch das Inventar geändert; Downloads liegen ausschließlich unter `/tmp/akg-research`.
