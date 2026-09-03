# AKG-53 · Migrationsinventar

Stand: **2026-09-03, 11:31 UTC**  
Projekt: **Website AKG**  
Meilenstein: **1 · Umfang & Struktur**, Zieltermin **2026-10-02**

Die priorisierte Einzelmatrix liegt in [`inventory.csv`](inventory.csv). Sie ist die Vorgabe für AKG-67; Zielrouten werden in AKG-58 finalisiert und Redirects in AKG-66 umgesetzt.

## Ergebnis

| Entscheidung | Einträge | Bedeutung |
|---|---:|---|
| archivieren | 381 | Nicht in die neue öffentliche Website übernehmen; im Backup gemäß AKG-70 erhalten |
| extern verlinken | 178 | Inhalt gehört zu einem anderen Produkt oder Dienst |
| entfallen lassen | 128 | Kein eigener Inhalt in der neuen Website; Ziel oder bewusst kein Redirect ist vermerkt |
| überarbeiten | 81 | Migrationskandidat, aber nur nach der angegebenen fachlichen/redaktionellen Freigabe |
| übernehmen | 0 | Kein Altinhalt ist für eine ungeprüfte 1:1-Übernahme freigegeben |
| **Gesamt** | **768** | Eindeutige URLs einschließlich Navigationsfragmenten |

Priorität **1** umfasst Hauptnavigation, Kernseiten, Pflichtseiten und zentrale externe Übergänge; **2** umfasst zu prüfende dauerhafte Detailinhalte; **3** umfasst historische, technische und generierte Archivseiten.

`überarbeiten` ist keine Veröffentlichungsfreigabe. Fehlende oder nicht bestätigte Angaben werden nicht aus der alten Website als aktuelle Wahrheit übernommen. Für aktuelle News, Angebote/Gruppen und veröffentlichte Zuständigkeiten ist **ChurchTools die einzige Zielquelle**; WordPress dient dafür nur als Migrationsinventar.

## Erfassung

Quellen:

- `https://akg-kiel.de/wp-sitemap.xml` und alle 14 darin referenzierten Sitemaps
- öffentliche WordPress-REST-Endpunkte für Seiten, Beiträge, Predigten, Angebote/Gruppen, FAQs, Taxonomien und Autoren
- die am Stichtag gerenderte Hauptnavigation der Startseite

| Quelle | Eindeutige URLs |
|---|---:|
| Sitemap | 731 |
| zusätzlich nur über WordPress REST gefunden | 21 |
| zusätzlich nur in der Hauptnavigation vorhandene Fragment-/Fremdziele | 16 |
| **Gesamt** | **768** |

Die 21 REST-Ergänzungen bestehen aus einem kurz nach dem Sitemap-Cache geänderten Beitrag und 20 öffentlich erreichbaren, überwiegend leeren Taxonomiearchiven. Dadurch bleibt die Matrix vollständig, obwohl der Sitemap-Cache zeitversetzt war.

Nicht als eigene Inhalte inventarisiert sind mechanisch erzeugte Paginierungs-, Feed-, Such- und Medienvarianten. Ihre kanonischen Inhalte sind bereits erfasst; WordPress-Uploads werden erst für freigegebene Inhalte in AKG-67 nach Rechteprüfung ausgewählt.

`veroeffentlicht` und `geaendert` stammen aus WordPress. Ein Änderungsdatum belegt nicht die fachliche Aktualität.

## Hauptnavigation

Alle 24 am Stichtag sichtbaren internen, externen und Fragmentziele sind in der Matrix mit `hauptnavigation=ja` markiert.

| Bisheriger Bereich | Entscheidung | Vorgesehenes Ziel |
|---|---|---|
| Gottesdienste, Sonntag, Dreiklang | überarbeiten | `/gottesdienste` |
| Konzerte, aktuelle/vergangene Konzerte, SHMF, Ansprechpartner | extern verlinken | `https://konzerte-petruskirche.de/programm` bzw. `/programm/archiv` |
| Aktuelles, Gemeindeleben, Kalender | überarbeiten | `/aktuelles` |
| Predigten auf `2019.akg-kiel.de` | entfallen lassen | kein Nachfolger; begründete Ausnahme bis 2026-10-02 |
| Intern | extern verlinken | ChurchTools-Login |
| Angebote & Gruppen | überarbeiten | vorläufig `/angebote`; Detailziele durch AKG-58 |
| Gemeinde, Leitbild, Geschichte, Orte, Pastoren, KGR, Ansprechpersonen | überarbeiten | `/gemeinde` und in AKG-58 festzulegende Unterziele |
| Kontakt, Büro, FAQ, Spenden | überarbeiten | `/kontakt`, `/spenden` |

Pflicht- und sensible Seiten sind ebenfalls abgedeckt:

- `/impressum` → überarbeiten; substanzielle Freigabe in AKG-61/72
- `/datenschutzerklaerung` → überarbeiten; vorläufiges Ziel `/datenschutz`, substanzielle Freigabe in AKG-61/72
- `/spenden`, `/kontakt`, `/mitarbeiter`, `/newsletter` sowie MailPoet-Systemseiten → nur nach Bestätigung der tatsächlichen Daten, Zuständigkeiten und Verarbeitung
- der historische Anmelde-Disclaimer → entfallen lassen, sofern kein aktiver Prozess mehr darauf verweist

## Produktgrenzen

### Website AKG

Enthält nur die Kerninformationen der Kirchengemeinde: Gottesdienste, Aktuelles, freigegebene aktive Angebote, Gemeinde/Personen/Orte, Kontakt, Spenden und Pflichtseiten. Aktuelle News, Angebote/Gruppen und veröffentlichte Person-Rollen-Zuordnungen werden dynamisch aus ChurchTools bezogen; ihre WordPress-Inhalte werden nicht als zweite Quelle fortgeführt. Historische WordPress-Strukturen werden nicht nachgebaut.

### Website Konzerte

Konzertprogramm, Konzertarchiv und SHMF bleiben im separaten Produkt. Alte Konzertbeiträge werden nicht in Website AKG kopiert, sondern auf die Programm-/Archivübersicht verwiesen. Das Ziel `https://konzerte-petruskirche.de` ist im Quellprojekt Website Konzerte deklariert, war zum Erfassungszeitpunkt aber noch nicht per DNS erreichbar; AKG-69 muss das Ziel vor Veröffentlichung bestätigen.

### Website Dreimaster

Café Dreimaster bleibt im separaten Produkt. Nur der Angebotseintrag wird auf `https://cafe-dreimaster.de/` weitergeführt; Inhalte werden nicht in Website AKG dupliziert.

### Weitere externe Dienste

ChurchTools bleibt der externe interne Zugang und wird zugleich die einzige Quelle für aktuelle News, Angebote/Gruppen und veröffentlichte Zuständigkeiten. Website AKG darf nur die in AKG-55 konzeptionell festgelegten und öffentlich freigegebenen Felder über die in AKG-59 umgesetzte serverseitige Anbindung verwenden. Der Livestream wird vorläufig auf den bereits öffentlich verlinkten YouTube-Kanal geführt; Einbettung, Datenschutz und endgültige Einordnung werden in AKG-58/69 entschieden.

## Ticketabgrenzung für ChurchTools

- **AKG-53** entscheidet nur, welche WordPress-Inhalte entfallen, archiviert oder auf neue dynamische Ziele weitergeleitet werden.
- **AKG-55** plant konzeptionell Inhaltsmodelle, benötigte ChurchTools-Datensätze und -Felder, Veröffentlichungsregeln, redaktionelle Zuständigkeit, Datenschutz sowie Verhalten bei fehlenden oder veralteten Daten.
- **AKG-59** setzt den sicheren serverseitigen Abruf, das Mapping, Caching und Fehlerverhalten technisch um.
- **AKG-63, AKG-64 und AKG-65** stellen Gruppen, Zuständigkeiten und News auf der Website dar, ohne eine zweite Datenquelle anzulegen.

## Offene Entscheidungen und Termine

Die Matrix nennt für jeden Eintrag die koordinierende Person, benötigte Freigabe, offenen Punkt und Fälligkeit. `noah.zepner@akg-kiel.de` ist aufgrund der Linear-Zuordnung Projektkoordination, nicht automatisch fachliche oder rechtliche Freigabestelle.

| Offener Punkt | Verantwortlicher Vorgang | Fällig | Standard ohne Freigabe |
|---|---|---:|---|
| endgültige Seitenstruktur, Detail- und Ankerziele | AKG-58 | 2026-10-02 | keine Zielroute erfinden |
| ChurchTools-Datensätze, öffentliche Felder, Pflegeweg und namentliche Fachverantwortung für News, Gruppen und Zuständigkeiten | AKG-55 | 2026-10-02 | Inhalt nicht veröffentlichen |
| Aktivität und öffentliche Angaben der Angebote/Gruppen | AKG-55/63 | 2026-10-02 | nicht bestätigtes Angebot nicht veröffentlichen |
| begründete Ausnahmen für historische Beiträge oder Predigten | AKG-53/67 | 2026-10-02 | archiviert lassen |
| Auswahl und fachliche Prüfung der FAQs | AKG-55/61 | 2026-10-02 | nicht bestätigte Antwort nicht veröffentlichen |
| konkrete externe Ziele und Rückwege für Konzerte/Dreimaster | AKG-69 | 2027-02-19 | keinen defekten Link veröffentlichen |
| finale redaktionelle, sachliche und rechtliche Freigabe | AKG-72 | 2027-03-12 | nicht veröffentlichen |

## Redirect-Konvention

- Relative Ziele bezeichnen vorgesehene Routen von Website AKG.
- Absolute Ziele verlassen Website AKG und müssen als externe Links erkennbar sein.
- `WordPress-Backup …; kein öffentlicher Redirect` bedeutet bewusste Archivierung ohne irreführende Weiterleitung.
- `410/404 statt inhaltlich falschem Redirect` bedeutet, dass AKG-66 keinen pauschalen Redirect auf die Startseite anlegen soll.
- Mit `vorläufig` markierte Ziele werden ausschließlich durch AKG-58 ersetzt; die Inhaltsentscheidung bleibt davon unberührt.
