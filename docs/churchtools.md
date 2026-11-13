# AKG-59 · Öffentliche ChurchTools-Daten im MVP

## Schnittstelle und Freigaben

`src/lib/server/churchtools.ts` exportiert `EventItem`, `NewsItem`, `ContentResult<T>`, `getServices({ token?, servicesApproved?, cache? })` und `getNews({ token?, cache? })` und `getGroups({ token?, groupsApproved?, cache? })`. Der Aufrufer übergibt das Server-Secret. Der bisherige optionale `cache`-Parameter wird ignoriert; die Laufzeit verwendet keine Cache-API-Instanz mehr. Das Modul liest keine Umgebung oder Dateien, importiert keine Cloudflare-Laufzeit und besitzt keinen globalen veränderlichen Cache. `fetch` und `now` sind zusätzliche Test-Seams; normale Aufrufer lassen sie weg.

- Ohne Token: `unavailable`, keine Netzwerk- oder Cache-Abfrage.
- Gottesdienste ohne **ausdrücklich** `servicesApproved: true`: `disabled`, ebenfalls ohne I/O. Diese Sperre hat Vorrang vor dem Tokenstatus und bestehenden Cache-Einträgen. Sie bleibt gesetzt, bis die fachliche Korrektur des Eintrags „in Planung“ aus AKG-75 bestätigt ist. Keine Titelheuristik.
- Erfolgreich, aber keine freigegebenen Inhalte: `empty`; sonst `ready`.
- Jeder Quellenfehler: `unavailable`, ohne Stale-Fallback. Keine Fixture-, WordPress- oder Repository-Ersatzdaten. Der bestehende Modellstatus `stale` bleibt für Aufrufer kompatibel, wird von diesen Ladern aber nicht mehr erzeugt.

**Kalender 2, News und öffentliche Gruppenangebote.** Gruppen benötigen zusätzlich ausdrücklich `groupsApproved: true`; ohne Freigabe gibt es weder Abruf noch Cachezugriff. Die eingecheckten Schalter `SERVICES_APPROVED` und `GROUPS_APPROVED` bleiben `false`. Der Nutzerauftrag ermöglicht eine private lokale Sichtprüfung, ist aber kein Abschluss von AKG-74/75. Kalender 1/3/4, Mitgliedschaften, Personen und Gruppenbilder bleiben ausgeschlossen. Nur `/group/grouptypes` ergänzt die Gruppen um ihre Quellkategorie. Die Website-Freigaben werden bei jedem Quellenrefresh dynamisch geladen; keine zweite Liste von Beitragsgruppen im Code.

## Geprüfter API-Vertrag

Geprüft anhand der installationsspezifischen [OpenAPI-Spezifikation](https://akg-kiel.church.tools/system/runtime/swagger/openapi.json) am 2026-10-26, ohne Token und ohne Abruf produktiver Inhaltsdatensätze. Der verbindliche fachliche Vertrag bleibt [content-models.md](content-models.md); AKG-59 und AKG-75 einschließlich Kommentare sowie der Meilenstein „2 · Technisches Fundament“ wurden gelesen. Projekt: **Website AKG**.

| Abruf                                           | Verwendete Form und Prüfung                                                                                                                                                                                                        |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET /api/website/data`                         | `{ data: [{ domainType, domainId, … }], meta: { count } }`; nur `calendar` und `posts-in-group` werden ausgewertet. Bewusst **kein** `include[]=domainData`: keine unnötigen Staff-Namen oder anderen Objektinhalte.               |
| `GET /api/calendars/2/appointments?from=…&to=…` | `{ data: [{ appointment: { base, calculated }, … }], meta: { count } }`. Keine veralteten Top-Level-Aliase. `base.calendar.id=2`, `base.calendar.isPublic=true`, `base.isInternal=false`; Zeit aus `calculated.startDate/endDate`. |
| `GET /api/posts`                                | `{ data: [Post, …], meta: { count } }`; `group.domainIdentifier` muss zu einer aktuellen `posts-in-group`-Freigabe gehören, `group.domainType=group`, `groupVisibility=public`, `visibility=group_visible`, `isBanned=false`.      |

**Wichtige Schema-Details:** `isPublic` am Kalender ist laut aktuellem Schema ein veralteter Kategorieindikator, kein Berechtigungsnachweis. Deshalb wird der Terminabruf zusätzlich **anonym** durchgeführt; der Login-Token darf keine erweiterten Kalenderrechte vermitteln. Die dynamische Website-Freigabe wird weiterhin authentifiziert gelesen. Der Token fehlt nicht versehentlich am Kalenderabruf.

`/posts` verwendet keine Seitennummern: Nach jeweils 100 Datensätzen werden `before` (letztes `publishedDate`) und `last_post_identifier` (letzte `guid`) gesetzt. Ein nicht rückwärts fortschreitender Cursor wird abgelehnt. Es werden höchstens 10 Seiten gelesen; ein unvollständiger Feed wird nicht veröffentlicht. Von der Quelle gelieferte Links oder URLs werden nie verfolgt.

## Öffentliche Modelle

Gottesdienste enthalten ausschließlich `id`, `kind: 'service'`, `title`, `start`, `end`, `allDay`. Der Schlüssel `2:<Basis-ID>:<normalisierter berechneter Start>` unterscheidet Wiederholungen. Das Fenster beginnt am heutigen Datum in `Europe/Berlin` und endet exklusiv am entsprechenden Datum zwölf Monate später (Schalttag auf Monatsende begrenzt). Bereits beendete Termine werden vor jeder Rückgabe entfernt. Es werden keine Orte, Untertitel, Beschreibungen, Tags, Links oder Bilder ergänzt.

News enthalten ausschließlich `id` aus `guid`, `title`, optional `body`, `publishedAt`, optional `expiresAt` und `updatedAt`. Publikationsdaten müssen gültige ISO-Zeitstempel mit Zeitzone sein und dürfen nicht in der Zukunft liegen. Auch ein gesetztes zukünftiges `publicationDate` verhindert die Ausgabe. `expirationDate` muss explizit `null` oder ein gültiger zukünftiger Zeitstempel sein; ein fehlender oder kaputter Ablaufmarker wird nicht als „unbegrenzt“ interpretiert. Abgelaufene Beiträge werden vor jeder Rückgabe entfernt.

`body` ist **reiner Text**, einschließlich eventuell wörtlich enthaltener Markdown-/HTML-Zeichen. Es findet keine Interpretation oder HTML-Sanitisierungsheuristik statt. UI-Aufrufer verwenden normale escapende Textinterpolation, niemals `set:html`, `innerHTML` oder Markdown-Rendering. Beitragsschlüssel sind auf 1–128 ASCII-Buchstaben/Ziffern/Unterstriche/Bindestriche beschränkt, beginnen alphanumerisch und enthalten keine Pfadseparatoren oder Prozentzeichen. Pfadsegmente im UI zusätzlich mit `encodeURIComponent` bilden. Autoren, Reaktionen, Kommentare, Personen- und Bearbeiterdaten sowie Bilder erreichen das Modell nicht.

### Angebote und Gruppen

`getGroups` liest `/groups?visibility=public&limit=100&page=N` **anonym**, damit Token-Rechte keine zusätzlichen Gruppen in die Website tragen. Ausschließlich aktive Gruppen (`information.groupStatusId=1`), `settings.visibility=public`, `settings.isHidden=false` und Typen 1/2/3/5 sind zulässig. Typnamen kommen aus `/group/grouptypes`; Verwaltungsmerkmale/Bereiche werden ausgeschlossen. Status-ID 1 wurde am 28.10.2026 gegen die native Statusdefinition `active` geprüft, nicht aus Titeln abgeleitet. Ein vorhandenes Enddatum muss ein gültiges Kalenderdatum sein und darf nicht vor dem heutigen Berliner Datum liegen. Fehlende Enddaten bleiben offen; der Quellstatus ersetzt keine fachliche Aktualitätsprüfung.

Pagination: maximal zehn Seiten/1.000 Rohdatensätze; `current`, `limit`, `lastPage`, `total`, Seitenlängen und Gesamtstabilität werden geprüft. Doppelte numerische IDs/GUIDs, wechselnde Gesamtsummen oder unvollständige Seiten machen den gesamten Refresh ungültig. Keine vom Server gelieferten Folgelinks werden verfolgt.

Nur GUID, Name, Typname und vorhandene Beschreibung/Treffzeit/Wochentag/HTTPS-Gruppenhomepage erreichen `GroupOffer`; das optionale Enddatum bleibt für die Ablaufprüfung vor der Rückgabe erhalten. Beschreibungen sind escaped Plaintext, keine HTML-/Markdown-Ausführung. URLs mit Benutzername/Passwort oder anderem Protokoll werden weggelassen. Keine Rollen, Personen, Mitgliedszahlen, Bilder, Adressen oder weiteren Rohfelder gelangen in die Ausgabe.

Startseite: drei alphabetisch erste Angebote mit kurzem Text und Link zum jeweiligen Abschnitt. `/angebote`: serverseitige GET-Suche, Kategorien aus Quelldaten und native `details`; ein Teaser-Link öffnet seinen Abschnitt serverseitig per GUID. Kein JavaScript nötig, kein lokaler Angebotsbestand. HTML bleibt `Cache-Control: no-store`.

## Sicherheits- und Fehlergrenzen

- Fester Ursprung `https://akg-kiel.church.tools/api`; keine konfigurierbare Basis-URL.
- Authentifizierte Requests: `Authorization: Login <token>`. Alle Requests: `redirect: 'manual'`, `credentials: 'omit'`, `cache: 'no-store'`; jede explizite `3xx`-Antwort wird abgelehnt, ohne `Location` zu verfolgen. Workers unterstützt `redirect: 'error'` nicht: Es wirft vor dem Netzabruf einen `TypeError`. Der gemeinsame Abruf wurde beim ersten Live-Worker-Test korrigiert ([Cloudflare-Referenz](https://developers.cloudflare.com/workers/runtime-apis/request/#options)). Kein Redirect-Following über fremde Origins oder HTTPS→HTTP.
- Ein gemeinsames 10-Sekunden-Abbruchsignal pro Refresh umfasst Freigaben, Feed und Lesen der nativen Fetch-Response-Streams.
- Höchstens 1 MiB dekodierte Response-Bytes je Request, 1.000 Datensätze je Array, 100 Beiträge je Seite und 10 Beitragsseiten. JSON-Medientyp, UTF-8, Array-Form und `meta.count` müssen stimmen. Die Grenzen dürfen nur nach Quellenprüfung erhöht werden.
- Ungültige Einzelzeilen werden verworfen, nicht repariert. Logs enthalten ausschließlich eine aggregierte Anzahl verworfener Zeilen, niemals Rohantworten, Titel, IDs, Tokens oder fremde Fehlermeldungen.
- Alle Quellenfehler sind **fail closed**: ungültige Freigaben, Transportfehler, Timeout, Redirect-Verweigerung und HTTP-Fehler liefern `unavailable`, nie eine echte Leermenge oder einen alten Veröffentlichungsstand.

## Cache-Vertrag

**Review-Korrektur 13.11.2026:** Die frühere 30-Minuten-/6-Stunden-Regel ist für alle drei Inhaltstypen deaktiviert. Die Cache API besitzt keine atomare Schreibordnung, die Quelle liefert keine verwendete Publikationsrevision. Überlappende Abrufe konnten einen neueren Freigabeentzug durch einen älteren Snapshot überschreiben. Ein nicht atomarer Read-before-write-Vergleich oder ein Isolate-lokaler Lock wäre keine verlässliche Korrektur.

- News, Gruppen und Kalenderfreigaben werden bei jedem freigegebenen Aufruf neu gelesen. Derselbe gemeinsame Ladepfad verhindert auch entsprechende Kalender-Rennen.
- Keine Cache-Lese-/Schreibzugriffe, kein Stale-Fallback und kein globaler In-Memory-Ersatz. Der bisherige optionale `cache`-Parameter wird nur zur Aufruferkompatibilität akzeptiert und ignoriert. Die Laufzeit reicht keine Cache-Bindung mehr hinein.
- Alte Cache-Einträge werden nicht mehr ausgewählt; vorhandene Einträge laufen nach ihrem bisherigen begrenzten TTL aus. Neue Antworten persistieren keine Veröffentlichungssnapshots.
- Jede erfolgreiche Antwort wird vor der Rückgabe erneut auf Felder und Zeitgrenzen projiziert. Ein noch laufender Gottesdienst bleibt über Berliner Mitternacht sichtbar; sein Start muss nicht am heutigen Tag liegen.
- Bewusster Preis: mehr serverseitige Quellenabrufe und keine Ausfallüberbrückung durch alte Inhalte. Zehn Sekunden Requestbudget, Größen-/Seitenlimits, fehlende-Token-Sperre und Freigabegates bleiben erhalten. HTML bleibt `no-store`.
- Caching erst wieder einführen, wenn eine autoritative Quellrevision oder eine tatsächlich atomare, anfragenübergreifende Ordnung vorliegt.

## Nachweis und offene Grenzen

```sh
node --experimental-strip-types --test scripts/churchtools.test.mjs
```

Die Tests verwenden ausschließlich synthetische anonyme Datensätze und einen synthetischen Auth-Header. Sie prüfen Sperren, echte Leerzustände gegenüber Fehlern, Privacy-Mapping, Wiederholungsschlüssel, dynamische Freigaben, Cache-Bypass, konkurrierende Abrufe/Entzug/Ablauf, ungültige Daten und IDs, Body-/Seitengrenzen sowie Cross-Origin- und Downgrade-Redirects. Keine echten Tokens oder Inhaltsantworten wurden beschafft oder gespeichert.

Am 28.10.2026 wurde der eingeschränkte Zugang des Kontos 9854 ausschließlich lokal verwendet. Node-Abruf mit den echten Modellen: 75 technisch gefilterte Gruppen und 30 Gottesdienst-Vorkommen; auch vorhandene News sind in der lokalen SSR-Vorschau sichtbar. Der bestandene vollständige Live-Worker-/Browser-Abgleich ist in [groups-integration.md](groups-integration.md) dokumentiert. Fachliche Gruppen-/Gottesdienst- und Personenfreigaben sowie Remote-Konfiguration bleiben getrennte Aufgaben. UI-Laufzeitbindung, zustandsabhängige Darstellung, Gesamt-Quality und Linear-Status sind Aufgaben der übergeordneten Integration; dieses Modul setzt keine Secrets und nimmt keine externen Änderungen vor.
