# AKG-59 · Öffentliche ChurchTools-Daten im MVP

## Schnittstelle und Freigaben

`src/lib/server/churchtools.ts` exportiert `EventItem`, `NewsItem`, `ContentResult<T>`, `getServices({ token?, servicesApproved?, cache? })` und `getNews({ token?, cache? })`. Der Aufrufer übergibt das Server-Secret und optional eine serverseitige Cache-API-Instanz. Das Modul liest keine Umgebung oder Dateien, importiert keine Cloudflare-Laufzeit und besitzt keinen globalen veränderlichen Cache. `fetch` und `now` sind zusätzliche Test-Seams; normale Aufrufer lassen sie weg.

- Ohne Token: `unavailable`, keine Netzwerk- oder Cache-Abfrage.
- Gottesdienste ohne **ausdrücklich** `servicesApproved: true`: `disabled`, ebenfalls ohne I/O. Diese Sperre hat Vorrang vor dem Tokenstatus und bestehenden Cache-Einträgen. Sie bleibt gesetzt, bis die fachliche Korrektur des Eintrags „in Planung“ aus AKG-75 bestätigt ist. Keine Titelheuristik.
- Erfolgreich, aber keine freigegebenen Inhalte: `empty`; sonst `ready`.
- Temporärer Quellenfehler mit zulässigem Altbestand: `stale`, mit dem ursprünglichen `updatedAt`.
- Fehler ohne zulässigen Cache: `unavailable`. Keine Fixture-, WordPress- oder Repository-Ersatzdaten.

**Nur Kalender 2 und News.** Kalender 1/3/4, Gruppenangebote und Personen bleiben deaktiviert. Es gibt keine Gruppen-, Mitgliedschafts-, Personen- oder Stammdatenabfragen. Die Website-Freigaben werden bei jedem Quellenrefresh dynamisch geladen; keine zweite Liste von Beitragsgruppen im Code.

## Geprüfter API-Vertrag

Geprüft anhand der installationsspezifischen [OpenAPI-Spezifikation](https://akg-kiel.church.tools/system/runtime/swagger/openapi.json) am 2026-10-26, ohne Token und ohne Abruf produktiver Inhaltsdatensätze. Der verbindliche fachliche Vertrag bleibt [content-models.md](content-models.md); AKG-59 und AKG-75 einschließlich Kommentare sowie der Meilenstein „2 · Technisches Fundament“ wurden gelesen. Projekt: **Website AKG**.

| Abruf                                           | Verwendete Form und Prüfung                                                                                                                                                                                                        |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET /api/website/data`                         | `{ data: [{ domainType, domainId, … }], meta: { count } }`; nur `calendar` und `posts-in-group` werden ausgewertet. Bewusst **kein** `include[]=domainData`: keine unnötigen Staff-Namen oder anderen Objektinhalte.               |
| `GET /api/calendars/2/appointments?from=…&to=…` | `{ data: [{ appointment: { base, calculated }, … }], meta: { count } }`. Keine veralteten Top-Level-Aliase. `base.calendar.id=2`, `base.calendar.isPublic=true`, `base.isInternal=false`; Zeit aus `calculated.startDate/endDate`. |
| `GET /api/posts`                                | `{ data: [Post, …], meta: { count } }`; `group.domainIdentifier` muss zu einer aktuellen `posts-in-group`-Freigabe gehören, `group.domainType=group`, `groupVisibility=public`, `visibility=group_visible`, `isBanned=false`.      |

**Wichtige Schema-Details:** `isPublic` am Kalender ist laut aktuellem Schema ein veralteter Kategorieindikator, kein Berechtigungsnachweis. Deshalb wird der Terminabruf zusätzlich **anonym** durchgeführt; der Login-Token darf keine erweiterten Kalenderrechte vermitteln. Die dynamische Website-Freigabe wird weiterhin authentifiziert gelesen. Der Token fehlt nicht versehentlich am Kalenderabruf.

`/posts` verwendet keine Seitennummern: Nach jeweils 100 Datensätzen werden `before` (letztes `publishedDate`) und `last_post_identifier` (letzte `guid`) gesetzt. Ein nicht rückwärts fortschreitender Cursor wird abgelehnt. Es werden höchstens 10 Seiten gelesen; ein unvollständiger Feed wird weder veröffentlicht noch als erfolgreicher Cache gespeichert. Von der Quelle gelieferte Links oder URLs werden nie verfolgt.

## Öffentliche Modelle

Gottesdienste enthalten ausschließlich `id`, `kind: 'service'`, `title`, `start`, `end`, `allDay`. Der Schlüssel `2:<Basis-ID>:<normalisierter berechneter Start>` unterscheidet Wiederholungen. Das Fenster beginnt am heutigen Datum in `Europe/Berlin` und endet exklusiv am entsprechenden Datum zwölf Monate später (Schalttag auf Monatsende begrenzt). Bereits beendete Termine werden auch bei Cache-Treffern entfernt. Es werden keine Orte, Untertitel, Beschreibungen, Tags, Links oder Bilder ergänzt.

News enthalten ausschließlich `id` aus `guid`, `title`, optional `body`, `publishedAt`, optional `expiresAt` und `updatedAt`. Publikationsdaten müssen gültige ISO-Zeitstempel mit Zeitzone sein und dürfen nicht in der Zukunft liegen. Auch ein gesetztes zukünftiges `publicationDate` verhindert die Ausgabe. `expirationDate` muss explizit `null` oder ein gültiger zukünftiger Zeitstempel sein; ein fehlender oder kaputter Ablaufmarker wird nicht als „unbegrenzt“ interpretiert. Abgelaufene Beiträge werden auch aus frischen und stale Cache-Treffern entfernt.

`body` ist **reiner Text**, einschließlich eventuell wörtlich enthaltener Markdown-/HTML-Zeichen. Es findet keine Interpretation oder HTML-Sanitisierungsheuristik statt. UI-Aufrufer verwenden normale escapende Textinterpolation, niemals `set:html`, `innerHTML` oder Markdown-Rendering. Beitragsschlüssel sind auf 1–128 ASCII-Buchstaben/Ziffern/Unterstriche/Bindestriche beschränkt, beginnen alphanumerisch und enthalten keine Pfadseparatoren oder Prozentzeichen. Pfadsegmente im UI zusätzlich mit `encodeURIComponent` bilden. Autoren, Reaktionen, Kommentare, Personen- und Bearbeiterdaten sowie Bilder erreichen das Modell nicht.

## Sicherheits- und Fehlergrenzen

- Fester Ursprung `https://akg-kiel.church.tools/api`; keine konfigurierbare Basis-URL.
- Authentifizierte Requests: `Authorization: Login <token>`. Alle Requests: `redirect: 'error'`, `credentials: 'omit'`, `cache: 'no-store'`; auch unerwartete explizite `3xx`-Antworten werden abgelehnt. Kein Redirect-Following über fremde Origins oder HTTPS→HTTP.
- Ein gemeinsames 10-Sekunden-Abbruchsignal pro Refresh umfasst Freigaben, Feed und Lesen der nativen Fetch-Response-Streams.
- Höchstens 1 MiB dekodierte Response-Bytes je Request, 1.000 Datensätze je Array, 100 Beiträge je Seite und 10 Beitragsseiten. JSON-Medientyp, UTF-8, Array-Form und `meta.count` müssen stimmen. Die Grenzen dürfen nur nach Quellenprüfung erhöht werden.
- Ungültige Einzelzeilen werden verworfen, nicht repariert. Logs enthalten ausschließlich eine aggregierte Anzahl verworfener Zeilen, niemals Rohantworten, Titel, IDs, Tokens oder fremde Fehlermeldungen.
- Fehlerhafte Response-/Freigabeformen und HTTP-4xx außer 429 sind **fail closed**, auch bei vorhandenem Altbestand; der betroffene Cache-Eintrag wird nach Möglichkeit gelöscht. Transportfehler, Timeout, Redirect-Verweigerung, 429 und 5xx dürfen den begrenzten stale Bestand nutzen. Ausnahme bei News: Nach erfolgreich neu gelesenen Gruppenfreigaben wird bei einem anschließenden Feedfehler der alte Cache verworfen. Da das öffentliche Modell keine Gruppenzuordnung enthält, lässt sich sonst ein teilweiser Freigabeentzug nicht sicher auf alte Meldungen anwenden. Stale News sind nur bei Ausfall der Freigabeabfrage erlaubt.

## Cache-Vertrag

Die optionale [Cache API](https://developers.cloudflare.com/workers/runtime-apis/cache/) speichert ausschließlich gemappte öffentliche Modelle und den Zeitpunkt des erfolgreichen Abrufstarts, unter versionierten, festen Schlüsseln ohne Token. Das Cache-Leselimit beträgt 10 MiB, passend zu höchstens zehn Quellseiten mit jeweils 1 MiB; ein gültiger mehrseitiger Feed wird dadurch nicht am Einzelseiten-Limit verworfen. Der Cache ist nicht redaktionell pflegbar und darf nicht als eigener HTTP-Endpunkt exponiert werden.

- **Frisch:** Alter `< 30 Minuten`; kein erneuter Quellenabruf.
- **Stale-if-error:** höchstens **6 Stunden Gesamtalter seit dem erfolgreichen Abrufstart**, nicht sechs zusätzliche Stunden nach Ende der Frischezeit. Fehler verlängern den Zeitpunkt nicht.
- Der gespeicherte Response erhält `max-age=21600`, damit die Cloudflare Cache API den begrenzten Altbestand aufbewahren kann; die 30-Minuten-Frischeprüfung erfolgt im Modul. Es werden keine von der Cache API nicht unterstützten Stale-Header vorausgesetzt.
- Erfolgreich entzogene Freigaben bzw. echte Leermengen ersetzen alte Inhalte. Bei Treffern werden Modelle erneut auf erlaubte Felder projiziert und Zeitgrenzen erneut geprüft.
- Cache-Fehler verhindern einen Live-Abruf nicht. Ohne übergebenen Cache wird pro Aufruf frisch geladen. Kein globaler In-Memory-Fallback.
- Cloudflare Cache API ist standortlokal; Vorschau-/Access-Umgebungen können ohne wirksamen Cache laufen. Deshalb sind Treffer nie Voraussetzung für Funktionalität.

## Nachweis und offene Grenzen

```sh
node --experimental-strip-types --test scripts/churchtools.test.mjs
```

Die Tests verwenden ausschließlich synthetische anonyme Datensätze und einen synthetischen Auth-Header. Sie prüfen Sperren, echte Leerzustände gegenüber Fehlern, Privacy-Mapping, Wiederholungsschlüssel, dynamische Freigaben, Cache-Fristen/Entzug/Ablauf, ungültige Daten und IDs, Body-/Seitengrenzen sowie Cross-Origin- und Downgrade-Redirects. Keine echten Tokens oder Inhaltsantworten wurden beschafft oder gespeichert.

Ein authentifizierter End-to-End-Abgleich und die fachliche Gottesdienstfreigabe stehen aus. UI-Laufzeitbindung, zustandsabhängige Darstellung, Gesamt-Quality und Linear-Status sind Aufgaben der übergeordneten Integration; dieses Modul setzt keine Secrets und nimmt keine externen Änderungen vor.
