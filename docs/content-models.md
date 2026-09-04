# AKG-55 · Inhaltsmodelle und redaktionelle Verantwortung

Stand: **2026-09-03, 12:33 UTC**

Projekt: **Website AKG**

Maßgeblicher Meilenstein: **1 · Umfang & Struktur**, Zieltermin **2026-10-02**

Dieses Dokument ist der verbindliche Quellen- und Veröffentlichungskontrakt für AKG-59, AKG-60 sowie AKG-63 bis AKG-65. Es ergänzt das [Migrationsinventar](migration/README.md), ersetzt aber keine noch ausstehende fachliche oder datenschutzrechtliche Freigabe.

## Leitentscheidungen

1. **ChurchTools ist die einzige Quelle für laufend gepflegte Daten:** Gottesdienste, sonstige Termine, News, Angebote/Gruppen und veröffentlichte Person-Rollen-Zuordnungen.
2. **Das Repository enthält keine Kopien dieser Daten.** Es enthält nur statische, freigegebene Rahmentexte und ausdrücklich statische Inhalte wie Leitbild, ausgewählte Geschichte, Ortsprofile, Kontakt/Spenden, FAQ und Rechtstexte.
3. **WordPress ist nur Migrationsinput und Archiv.** Es ist weder Fallback noch Quelle für aktuelle Aussagen.
4. **Eine API-Leseberechtigung ist keine Veröffentlichungsfreigabe.** Die Website verarbeitet nur die unten genannten Felder und Datensätze, die zusätzlich das jeweilige ChurchTools-Veröffentlichungsmerkmal erfüllen.
5. **Fehlende Angaben bleiben leer.** Sie werden weder aus WordPress noch aus Beispieldaten, Freitext-Heuristiken oder Repository-Dateien ergänzt.
6. **Konzerte und Café Dreimaster bleiben getrennte Produkte.** Konzertkalender und Dreimaster-Inhalte werden nicht als AKG-Datensätze dupliziert.

## Verifizierte ChurchTools-Quelle

Geprüft wurde die Installation `https://akg-kiel.church.tools` mit ChurchTools **3.136.2**, Build **32882**. Grundlage waren die installationsspezifische [OpenAPI-Spezifikation](https://akg-kiel.church.tools/system/runtime/swagger/openapi.json), die [ChurchTools-API-Dokumentation](https://churchtools.academy/de/help/system-einstellungen/api/api-dokumentation/), die [API-Authentifizierung](https://churchtools.academy/de/help/system-einstellungen/api/api-authentifizierung/) und die [Dokumentation der Website-Freigaben](https://churchtools.academy/de/help/website-und-finder/oeffentlichkeitsarbeit/wie-verwalte-ich-die-freigaben-fur-die-churchtools-website/).

Die folgenden Zahlen sind eine Diagnose des Prüfzeitpunkts, keine im Code festzuschreibenden Sollmengen:

| API | Zugriff | Befund |
|---|---|---|
| `GET /api/info` | anonym | Installation und Version verfügbar; genau eine Hauptadresse, kein vollständiger Ortsbestand |
| `GET /api/website/data?include[]=domainData` | Login-Token | 101 Freigaben: 4 Kalender, 3 Beitragsgruppen, 89 Gruppenrollen, 5 `staff`-Personen |
| `GET /api/calendars/{id}/appointments` | für öffentliche Kalender anonym | Termine und berechnete Wiederholungen verfügbar |
| `GET /api/posts` | öffentlich sichtbare Beiträge anonym | 20 öffentliche Beiträge; 15 davon gehören zu den 3 unter Öffentlichkeitsarbeit freigegebenen Gruppen |
| `GET /api/groups?visibility=public` | anonym | 88 öffentliche, nicht beendete Gruppen |
| `GET /api/group/{agegroups,targetgroups,grouptypes,roles}` | Login-Token | Benennungen für Zielgruppen, Altersgruppen, Gruppentypen und Rollen verfügbar |
| `GET /api/groups/{id}/members` | Login-Token | Aktive Rollen- und Einwilligungsmitgliedschaften sind mit dem eingeschränkten API-Benutzer verfügbar |
| `GET /api/persons` | Login-Token erforderlich | Nicht für die Website vorgesehen; die Antwort richtet sich nach weitreichenden Personenfeld-Berechtigungen |

`/api/website/data` liefert Freigaberegeln und Referenzen, nicht die vollständigen Beiträge oder Termine:

- `calendar`: für ChurchTools Website freigegebener Kalender
- `posts-in-group`: Gruppe, deren öffentliche Beiträge freigegeben sind
- `person`: freigegebene Kombination aus Gruppe und Rolle
- `staff`: einzeln an ChurchTools Website übermittelte Person

Für Website AKG bildet diese Freigabe die ChurchTools-seitige Whitelist. Produktgrenzen und die fachlichen Veröffentlichungsbedingungen unten gelten zusätzlich; eine Freigabe allein erzwingt keine Darstellung auf Website AKG.

## Kleines internes Inhaltsmodell

Alle Datumswerte werden als ISO-8601-Werte mit eindeutigem Zeitzonenbezug übernommen. Freitext wird standardmäßig als Text ausgegeben; ChurchTools-Inhalt darf nie ungeprüft als HTML injiziert werden. `externalUrl` und `contactUrl` werden nur als absolute `https:`-URLs ohne Zugangsdaten übernommen; andere Schemata werden verworfen.

### Gottesdienste und Termine: `EventItem`

| Feld | Pflicht | ChurchTools-Feld |
|---|---:|---|
| `id` | ja | stabiler Schlüssel aus `appointment.base.calendar.id`, `appointment.base.id` und `appointment.calculated.startDate` |
| `kind` | ja | `service` für Kalender-ID 2, sonst `event` |
| `title` | ja | `appointment.base.title` |
| `start` | ja | `appointment.calculated.startDate` |
| `end` | ja | `appointment.calculated.endDate` |
| `allDay` | ja | `appointment.base.allDay` |
| `subtitle` | nein | `appointment.base.subtitle` |
| `description` | nein | `appointment.base.description` |
| `location` | nein | freigegebene Felder aus `appointment.base.address` |
| `tags` | nein | `tags[].name` über `include[]=tags` |
| `externalUrl` | nein | `appointment.base.link`, nur nach URL-Prüfung |

Veröffentlichung:

- Gottesdienste kommen ausschließlich aus **Kalender 2 „Gottesdienste“**.
- **Kalender 1 „Sonstige Veranstaltungen“ bleibt im MVP vollständig deaktiviert**, bis AKG-75 alle anonym sichtbaren Privat-/Betriebstermine bereinigt und die öffentlichen Termine fachlich freigegeben hat. Es gibt keine lokale ID-Liste und keine Titelheuristik als Ersatz.
- Kalender 3 „Konzerte“ bleibt Website Konzerte vorbehalten. Kalender 4 „Regelmäßige Veranstaltungen, Gruppen und Kreise“ wird nicht zusätzlich als Terminquelle geladen, weil diese Inhalte bereits über Gruppen gepflegt werden. Feiertage sind kein AKG-Inhaltstyp.
- Der Kalender muss öffentlich sein; der Termin muss `isInternal=false` haben und sein berechnetes Ende darf nicht in der Vergangenheit liegen.
- Bei Wiederholungen werden die Werte unter `calculated` verwendet, nicht die Basiszeit der Serie. Kalender-ID, Basis-Termin-ID und berechneter Start bilden gemeinsam den eindeutigen Schlüssel jeder Wiederholung; `iCalUid` ist nur Interoperabilitätsmetadatum.
- Fehlen `id`, `title`, `start` oder `end`, wird nur der betroffene Datensatz verworfen und protokolliert.

Live-Audit für 2026-09-03 bis 2027-09-04: Kalender 1 liefert anonym 84 Wiederholungen aus 46 Basis-Terminen, darunter ungeprüfte Privat-/Betriebstermine; nur 2 Basis-Termine haben eine Adresse. Kalender 2 liefert 37 Gottesdienste aus 28 Basis-Terminen, **keinen mit Adresse**. Beide Kalender verwenden keine Termin-Tags. Im MVP werden aus Kalender 2 deshalb nur Titel und Zeit ausgegeben; Format, Zielgruppe, Ort und Barrierefreiheitsangaben bleiben ohne bestätigte strukturierte Felder weg (B2).

### Aktuelles: `NewsItem`

| Feld | Pflicht | ChurchTools-Feld |
|---|---:|---|
| `id` | ja | `guid` |
| `title` | ja | `title` |
| `body` | nein | `content` |
| `publishedAt` | ja | `publishedDate` |
| `expiresAt` | nein | `expirationDate` |
| `updatedAt` | nein | `lastEditedDate` |

Veröffentlichung:

- Zulässig sind nur Beiträge aus Gruppen, die in `/api/website/data` als `posts-in-group` freigegeben sind. Aktuell sind dies die Gruppen-IDs **18, 21 und 183**; die Integration liest die Freigaben dynamisch und führt keine zweite ID-Liste.
- Zusätzlich müssen `groupVisibility=public`, `visibility=group_visible` und `isBanned=false` gelten.
- `publishedAt` (Quelle: `publishedDate`) darf nicht in der Zukunft liegen; `expiresAt` (Quelle: `expirationDate`) muss, sofern gesetzt, in der Zukunft liegen.
- Autor, Kommentare, Reaktionen, Personen-IDs und Bearbeiter-Metadaten werden nicht in das interne Modell übernommen.
- Eine Meldung ohne Text darf als kurzer Hinweis mit Titel und Datum erscheinen. Eine fehlende Meldung wird nicht aus WordPress ersetzt.

Aktuell erfüllen 15 Beiträge die Gruppenfreigabe; 2 davon haben keinen Text. Elf enthalten Bilder, aber die API liefert dafür keinen Alternativtext. Diese Bilder bleiben deshalb zunächst ungenutzt (B4).

### Angebote und Gruppen: `GroupOffer`

| Feld | Pflicht | ChurchTools-Feld |
|---|---:|---|
| `id` | ja | `guid` |
| `name` | ja | `name` |
| `description` | nein | `information.note` |
| `type` | ja | Name zu `information.groupTypeId` aus `/api/group/grouptypes` |
| `targetGroup` | nein | Name zu `information.targetGroupId` aus `/api/group/targetgroups` |
| `ageGroups` | nein | Namen zu `information.ageGroupIds` aus `/api/group/agegroups` |
| `meetingTime` | nein | `information.meetingTime` und `information.weekday` |
| `places` | nein | `places[]` über `include[]=places` |
| `contactUrl` | nein | `information.groupHomepageUrl` |
| `imageUrl` | nein | `information.imageUrl` |
| `imageAlt` | nein | `information.imageAnnotation` |

Veröffentlichung:

- `settings.visibility=public`, `settings.isHidden=false` und kein vergangenes `information.endDate` sind zwingend.
- Als Angebote gelten nur die ChurchTools-Gruppentypen **1 Hauskreis/Kleingruppe**, **2 Dienst**, **3 Veranstaltung/Aktion** und **5 Regelmäßige Gruppe**.
- Typ 4 „Merkmal“ ist ein Verwaltungsmarker; Typ 9 „Bereich“ dient nur der Struktur. Beide werden nicht als Angebot veröffentlicht.
- Straßenangaben eines Treffpunkts werden nur verwendet, wenn `settings.showStreet=true` ist.
- Persönliche Kontaktdaten werden nicht aus Gruppenmitgliedschaften abgeleitet. Nur eine vorhandene öffentliche Gruppenhomepage darf als Kontaktweg erscheinen.
- Gruppenbilder ohne `imageAnnotation` werden dekorativ mit leerem Alternativtext verwendet oder weggelassen; es wird kein Alternativtext erfunden.

Die aktuelle Instanz enthält 88 öffentliche Gruppen, davon 75 in den vier zulässigen Inhaltstypen. Das Migrationsinventar enthält 39 zu prüfende Altangebote; nur 24 Namen stimmen exakt mit einem öffentlichen ChurchTools-Datensatz überein. Titelähnlichkeit ist keine zulässige Zuordnung. Vor Veröffentlichung muss die Gruppenredaktion die 75 aktuellen Datensätze fachlich prüfen (B3).

Die vorhandenen Felder sind lückenhaft: 81/88 Gruppen haben eine Beschreibung, 25 eine Treffzeit, 9 eine Zielgruppe, 6 Altersgruppen, 20 Treffpunkte und 14 eine öffentliche Gruppenhomepage. Keine Gruppe hat derzeit eine Bildannotation. Optionale fehlende Angaben werden nicht ersetzt.

### Mitarbeitende und Zuständigkeiten: `Responsibility`

| Feld | Pflicht | ChurchTools-Feld |
|---|---:|---|
| `id` | ja | Kombination aus Personen-GUID, Gruppen-ID und Rollen-ID |
| `firstName` | ja | freigegebenes `domainAttributes.firstName` |
| `lastName` | ja | freigegebenes `domainAttributes.lastName` |
| `section` | ja | Titel der freigegebenen Gruppe |
| `role` | ja | Name der freigegebenen Gruppenrolle |
| `imageUrl` | nein | freigegebenes `imageUrl` |

Eine Zuordnung wird nur veröffentlicht, wenn **alle** Bedingungen erfüllt sind:

1. `/api/website/data` enthält eine `person`-Freigabe für genau diese Gruppe und Rolle.
2. Die Person besitzt dort eine aktive Mitgliedschaft in genau dieser Rolle.
3. Die Person wird als `staff`-Datensatz über `/api/website/data` geliefert.
4. Die Person ist aktives Mitglied der bestehenden ChurchTools-Gruppe **564 „Einverständnis Kontaktdatenveröffentlichung auf Homepage“**.
5. Die fachlich verantwortliche Gruppenleitung hat die Rolle bestätigt.

Die Einwilligungsgruppe ist ein Veröffentlichungsmarker, kein Angebot, und wird wegen Gruppentyp 4 nie in der Angebotsübersicht gezeigt. Ein Eintrag in ChurchTools ersetzt nicht die datenschutzrechtliche Prüfung, ob die Einwilligung die neue Website und die konkreten Felder abdeckt.

Persönliche E-Mail-Adressen, Telefonnummern, Anschriften, Geburtsdaten, Personenstatus, Kommentare und sonstige Personenfelder sind nicht Teil des Modells. Die OpenAPI-Berechtigung, ein Feld zu lesen, wäre keine öffentliche Freigabe. Ohne bestätigten persönlichen Kontaktweg verweist die Website neutral auf `/kontakt`.

Derzeit sind 89 Gruppe-Rolle-Freigaben und 5 `staff`-Personen vorhanden. Nach der Berechtigungskorrektur sind 132 aktive Rollenbeziehungen mit 77 eindeutigen Personen sowie 68 aktive Mitgliedschaften in der Einwilligungsgruppe sichtbar; 4 Personen erfüllen technisch den Schnitt aus Rolle, `staff` und Einwilligung. Namen oder weitere Personendaten wurden nicht in das Repository übernommen. Die technische Abfrage ist damit geklärt, die Veröffentlichung bleibt bis zur Datenschutzfreigabe in [AKG-78](https://linear.app/akg-kiel/issue/AKG-78/einwilligungsprozess-fur-veroffentlichte-personendaten-freigeben) gesperrt.

### Orte: `Location`

| Feld | Pflicht | Quelle |
|---|---:|---|
| `slug` | ja | freigegebener Repository-Inhalt |
| `name` | ja | freigegebener Repository-Inhalt |
| `address` | ja | freigegebener Repository-Inhalt |
| `directions` | nein | freigegebener Repository-Inhalt |
| `accessibilityNotes` | nein | ausdrücklich sachlich bestätigter Repository-Inhalt |
| `image` | nein | freigegebenes Asset mit Herkunft, Rechten und Alternativtext |
| `approvedAt` | ja | dokumentierte fachliche Abnahme |

ChurchTools bietet in der geprüften Konfiguration keinen vollständigen öffentlichen Ortsbestand und keine belastbaren Barrierefreiheitsfelder. Die Hauptadresse aus `/api/info` und vereinzelte Termin-/Gruppentreffpunkte reichen nicht für Petruskirche, Gemeindehaus Mitte und Gemeindehaus Wik. Deshalb sind dauerhafte Ortsprofile ausdrücklich **statische Repository-Inhalte** und werden in AKG-64/72 freigegeben (B5).

Eine ChurchTools-Terminadresse beschreibt nur den jeweiligen Termin und aktualisiert kein Ortsprofil. Bei Widersprüchen wird nichts automatisch zusammengeführt; der Konflikt geht an die Ortsredaktion.

## Redaktion, Freigabe und Aktualisierung

Namentliche Fachverantwortliche sind in den freigegebenen Projektunterlagen nicht benannt und werden nicht erfunden. Bis zur Besetzung gelten die Funktionsrollen; die Projektkoordination verfolgt die offenen Zuordnungen, erteilt aber nicht automatisch die fachliche oder rechtliche Freigabe.

| Inhalt | Pflege in ChurchTools/Repository | Fachliche Freigabe | Rhythmus |
|---|---|---|---|
| Gottesdienste | Besitzer:innen des ChurchTools-Kalenders „Gottesdienste“ | Pastorat bzw. benannte Gottesdienstverantwortung | bei jeder Änderung; Website-Abruf alle 30 Minuten |
| sonstige Termine | Besitzer:innen des Kalenders „Sonstige Veranstaltungen“ | veranstaltende Gruppe oder benannte Terminverantwortung | bei jeder Änderung; Website-Abruf alle 30 Minuten |
| News | berechtigte Autor:innen der freigegebenen Beitragsgruppen | jeweilige Gruppenleitung; Öffentlichkeitsarbeit verwaltet die Gruppenfreigabe | Veröffentlichung/Ablauf im Beitrag; Abruf alle 30 Minuten |
| Angebote/Gruppen | jeweilige Gruppenleitung | jeweilige Gruppenleitung; ChurchTools-Gruppenredaktion prüft öffentliche Sichtbarkeit | bei Änderungen; zusätzlich vierteljährliche Bestandsprüfung |
| Zuständigkeiten | jeweilige Gruppenleitung pflegt Rolle; Öffentlichkeitsarbeit pflegt Website-Freigabe | betroffene Person (Einwilligung) und jeweilige Gruppenleitung | sofort bei Rollen-/Einwilligungsänderung; Abruf alle 30 Minuten |
| Orte | AKG-Website-Redaktion im Repository | für den Ort benannte sachkundige Stelle; Barrierefreiheit separat bestätigen | bei Änderungen und mindestens halbjährlich |
| übrige statische Texte | AKG-Website-Redaktion im Repository | jeweils zuständige fachliche/rechtliche Stelle | bei Änderungen und vor Inhaltsfreeze |

Die namentliche Besetzung dieser Funktionsrollen ist B6 und bis **2026-10-02** zu dokumentieren.

## Verhalten bei leeren, fehlerhaften und veralteten Daten

- AKG-59 lädt ausschließlich serverseitig und hält das gemappte öffentliche Modell **30 Minuten** im Cache.
- Bei einem ChurchTools-Ausfall darf der letzte erfolgreiche, unveränderte Cache höchstens **6 Stunden** weiterverwendet werden. Er ist ein technischer Cache, keine zweite redaktionelle Quelle. `Responsibility`-Daten werden wegen möglicher Einwilligungswiderrufe nie stale ausgeliefert.
- Danach bleibt nur der betroffene Abschnitt leer bzw. zeigt „Daten derzeit nicht verfügbar“. Die statische Website und andere Inhaltstypen bleiben nutzbar.
- Eine erfolgreiche leere Antwort zeigt „Derzeit sind keine Inhalte veröffentlicht“. Ein Fehler darf nicht als echte Leermenge dargestellt werden.
- Einzelne ungültige Datensätze werden verworfen und serverseitig protokolliert; sie blockieren nicht die übrigen Datensätze.
- Vergangene Termine und abgelaufene Beiträge werden beim Mapping entfernt. Entzogene Gruppen-, Rollen- oder Einwilligungsfreigaben verschwinden spätestens mit der nächsten erfolgreichen Aktualisierung.
- Lokale Beispieldaten aus AKG-59 sind ausschließlich Test-Fixtures und werden nie als Produktionsfallback ausgeliefert.

## Datenschutz- und Berechtigungsgrenze für AKG-59

- REST-API mit nativem serverseitigem `fetch`; keine alte AJAX-API und kein zusätzlicher ChurchTools-Client.
- Authentifizierte Requests verwenden `redirect: "error"`. Jede `3xx`-Antwort ist ein isolierter Quellenfehler; es wird kein Redirect-Request erzeugt und der `Authorization`-Header gelangt weder an eine andere Origin noch über einen HTTPS-zu-HTTP-Downgrade.
- Ein dedizierter technischer Benutzer erhält nur Leserechte auf Website-Freigaben, öffentliche Kalender/Beiträge/Gruppen, benötigte Gruppenstammdaten sowie die freigegebenen Rollenmitgliedschaften und den Einwilligungsmarker.
- Kein allgemeiner Zugriff auf `/api/persons`, Finanzen, Check-in, interne Gruppen, Kommentare oder sonstige Personendaten.
- Der Login-Token liegt ausschließlich als Server-Secret vor, nie im Repository, Browser-Bundle, HTML, Cache-Key oder Log.
- Rohantworten werden nicht an den Browser durchgereicht. Das Mapping verwirft insbesondere `actor`, Bearbeiter-IDs, `meta.createdPerson`, `meta.modifiedPerson`, interne Berechtigungen und nicht benötigte Anmelde-/Mitgliedschaftsdaten.
- ChurchTools-Bild-URLs werden erst verwendet, wenn Alternativtext, Rechte/Einwilligung und datenschutzgerechte Auslieferung geklärt sind.

## Entschiedene technische Vorgaben für AKG-59

1. Basis-URL: `https://akg-kiel.church.tools/api`; Authentifizierung per `Authorization: Login <token>` ausschließlich serverseitig und ohne Redirect-Following.
2. REST-Endpunkte: `/website/data`, `/posts`, `/calendars/{id}/appointments`, `/groups` und die benötigten `/group/*`-Stammdaten.
3. Stabile öffentliche Schlüssel: Post-/Gruppen-GUID sowie bei Terminen die Kombination aus Kalender-ID, Basis-Termin-ID und berechnetem Start; keine aus Titeln oder einem nicht garantiert eindeutigen `iCalUid` erzeugten Identitäten.
4. Termine: im MVP nur Kalender 2, berechnete Wiederholungen und ein rollierendes Fenster von heute bis zwölf Monate in die Zukunft; Kalender 1 erst nach Abschluss von AKG-75.
5. News: nur freigegebene Beitragsgruppen plus Sichtbarkeits-, Publikations- und Ablaufprüfung.
6. Gruppen: öffentliche, laufende Datensätze der Typen 1, 2, 3 und 5; keine manuelle Gruppenliste im Repository.
7. Personen: nur der Schnitt aus freigegebener Gruppe/Rolle, `staff` und Einwilligungsgruppe 564; keine allgemeine Personenabfrage.
8. Cache: 30 Minuten frisch, maximal 6 Stunden stale-if-error; Fehler pro Inhaltstyp isolieren.
9. Tests: anonymisierte Fixtures prüfen Mapping, unterschiedliche Schlüssel zweier Wiederholungen, URL-Schemata und den Fehler-/Stale-Fall ohne stale `Responsibility`-Daten. Separate Sicherheitschecks müssen Cross-Origin-Redirects und HTTPS-zu-HTTP-Downgrade-Redirects ablehnen; echte Personendaten bleiben aus Fixtures ausgeschlossen.

## Erledigter Zugangspunkt und Folgeissues

B1 ist am 2026-09-03 technisch behoben und mit dem eingeschränkten API-Benutzer verifiziert: Rollenbeziehungen und aktive Mitgliedschaften der Einwilligungsgruppe sind lesbar. Allgemeine Personen-, Finanz- oder Administrationsrechte sind dafür nicht erforderlich.

| ID | Folgeissue | Typ | Befund und Standardverhalten |
|---|---|---|---|
| B2 | [AKG-75](https://linear.app/akg-kiel/issue/AKG-75/churchtools-termine-um-orte-formate-und-tags-vervollstandigen) | **Bewusste MVP-Einschränkung** | Kalender 1 bleibt wegen anonym sichtbarer ungeprüfter Privat-/Betriebstermine deaktiviert. Kalender 2 liefert Gottesdienste vorläufig nur mit Titel und Zeit; Ort, Format und Zielgruppe bleiben ohne bestätigte ChurchTools-Felder weg. |
| B3 | [AKG-74](https://linear.app/akg-kiel/issue/AKG-74/offentliche-churchtools-gruppen-als-website-angebote-fachlich-prufen) | **Blocker Angebote** | 75 öffentliche, technisch geeignete Gruppen stehen 39 Alt-Migrationskandidaten gegenüber; nur 24 Namen stimmen exakt überein. Alle geeigneten ChurchTools-Gruppen müssen fachlich als aktuelles Website-Angebot geprüft werden. Keine automatische Titelzuordnung. |
| B4 | [AKG-77](https://linear.app/akg-kiel/issue/AKG-77/bildfreigaben-und-alternativtexte-fur-churchtools-inhalte-klaren) | **Bewusste Inhaltslücke** | Postbilder haben kein API-Feld für Alternativtext; Gruppenbilder haben aktuell keine `imageAnnotation`. Bilder bleiben dekorativ oder entfallen. |
| B5 | [AKG-79](https://linear.app/akg-kiel/issue/AKG-79/autoritative-orts-und-barrierefreiheitsangaben-freigeben) | **Blocker Orte** | Vollständige, bestätigte Orts-, Anfahrts- und Barrierefreiheitsdaten fehlen als autoritative Quelle. Keine Angaben aus WordPress übernehmen. |
| B6 | [AKG-76](https://linear.app/akg-kiel/issue/AKG-76/redaktionelle-und-fachliche-verantwortliche-namentlich-benennen) | **Organisatorischer Blocker** | Namentliche Besetzung der oben definierten Redaktions- und Freigaberollen fehlt. Projektkoordination ist nicht automatisch Freigabestelle. |
| B7 | [AKG-78](https://linear.app/akg-kiel/issue/AKG-78/einwilligungsprozess-fur-veroffentlichte-personendaten-freigeben) | **Datenschutz-Blocker** | Bestätigen, dass die Mitgliedschaft in Gruppe 564 die Veröffentlichung auf der neuen Website und die Felder Name/Rolle/Foto abdeckt; anderenfalls Veröffentlichung auf Name/Rolle reduzieren oder unterlassen. |

Keiner dieser offenen Punkte darf durch eine zweite manuelle Datenquelle umgangen werden.
