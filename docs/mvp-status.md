# MVP-Arbeitsstand und Freigabegrenzen

Historischer Stand des MVP vom Oktober 2026, ergänzt um die Medienentscheidung vom 13.11.2026. Die folgenden Arbeitspakete und Prüfergebnisse dokumentieren die damalige Umsetzung, nicht den aktuellen Ticketstatus oder eine Launch-Freigabe. Für den Betrieb gilt die [Entwicklungsdokumentation](development.md), für Bildquellen und Nutzungsgrenzen der [Mediennachweis](brand-spec.md).

## Gruppen und Live-Anbindung · AKG-63 · 2026-10-28

Serverseitige Gruppenübersicht, Suche ohne JavaScript und drei echte Angebots-Teaser auf der Startseite sind implementiert. Der eingeschränkte WEB-AKG-Zugang versorgt ausschließlich die private lokale Sichtprüfung; öffentliche Worker-Schalter bleiben geschlossen. Kalender 2 verwendet weiterhin nur Titel/Zeit, News weiterhin beide Public-Filter plus Website-Gruppenfreigaben. Keine Personen-/Mitgliedschaftsdaten. Aktueller Prüfstand und Grenzen: [Gruppenintegration](groups-integration.md). Frühere Aussagen unten „keine Gruppenabrufe“ beschreiben den vorherigen MVP-Stand, nicht diese lokale Erweiterung.

## Arbeitspakete in Linear

| Paket        | Aufgabe                                                                  | Grenze                                                               |
| ------------ | ------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| AKG-57       | Finalisierten web-konzerte-Stack übernehmen                              | Entscheidung und Referenz in [stack-decision.md](stack-decision.md)  |
| AKG-54       | CI, Worker/Assets, lokale Vorschau, Betriebsanleitung                    | Git-Builds eingerichtet; erster Anwendungsbuild nach Push noch offen |
| AKG-59       | Serverseitige ChurchTools-Freigaben, Gottesdienste/News, Cache, Ausfälle | Kein Token im Repository; keine Gruppen/Personenabfragen             |
| AKG-56       | Gemeinsames responsives Layout und Tastatur-Navigation                   | Lokales Vorschau-Design, keine behauptete Markenabnahme              |
| AKG-62       | Startseite, zentrale Wege, nächste Termine/News                          | Keine Bilder ohne Freigabe und keine erfundenen Inhalte              |
| AKG-60       | Gottesdienstliste und stabile Detailpfade                                | Nur Titel/Zeit aus Kalender 2 nach Quellbereinigung                  |
| AKG-65       | Meldungen und stabile Detailpfade                                        | Kein Kalender 1, kein WordPress-Fallback                             |
| AKG-61/63/64 | Einstiege für Kontakt/Rechtliches, Angebote, Gemeinde/Orte               | Nur ehrliche gesperrte Vorschauzustände bis Fachfreigabe             |
| AKG-69       | Externe Angebote ohne Einbettungen                                       | Keine nicht erreichbare Konzertdomain verlinken                      |
| AKG-124      | Integrierte Quality-, HTTP- und Browser-Prüfung                          | Kein Ersatz für den Launch-Audit AKG-73                              |

Weitere Arbeitspakete: **AKG-125** behebt den Astro/Worker-HTML-Laufzeitfehler mit einer automatischen Body-Regression; **AKG-126** liefert den [Launch-Runbook-Entwurf](launch-runbook.md), ohne Backup-, DNS- oder Produktionsaktionen.

## Cloudflare-Einrichtung · AKG-54

Am 2026-10-26 separat beauftragt und per API zurückgelesen: vorhandener Worker
`web-akg`, GitHub `akg-kiel/web-akg`, nur `main` → Production-Deployment; alle anderen
Branches → `versions upload` ohne Promotion. Beide Trigger führen Frozen-Lockfile-
Installation und `pnpm quality` aus; Version-URLs sind aktiv, die Hauptadresse
`workers.dev` und eigene Domains bleiben deaktiviert/unverbunden.

Bei der Einrichtung blieb die aktive Template-Version unverändert. Anschließend
hat der Nutzer Commit und Push des MVP auf `t3/build-web-akg-mvp` zur Auslösung des
Preview-Autobuilds autorisiert. Ergebnis und URL-/HTTP-Abnahme werden in AKG-54
festgehalten; die Konfiguration allein belegt noch keinen erfolgreichen Git-Build.
Kein Merge nach `main`, keine DNS-Änderung. Laufzeit-Secrets wurden nicht eingerichtet;
Version-Previews sind keine Secret-/Ressourcenisolation.

Nach Worker-Umbenennung: `pnpm quality` mit 17 Tests und Deployment-Dry-run erfolgreich.
Befehle, Toolversionen und Grenzen: [development.md](development.md#cloudflare-workers-builds).

## Redaktioneller Stand · AKG-127

Die [Inhaltsrecherche](redesign-content-research.md) belegt Quellen für Leitbild, Gemeindegeschichte und Baugeschichte der Petruskirche. Die daraus erarbeiteten Texte waren keine fachliche Freigabe. WordPress-News und Gruppenlisten wurden nicht übernommen.

## Vor Veröffentlichung erforderlich

- **AKG-58:** IA im anderen Branch befindet sich im Review; dieses MVP nutzt dessen Routenentwurf, ohne den Branch oder das Migrationsinventar stillschweigend zu mergen.
- **AKG-59/54:** Eingeschränkter ChurchTools-Token inzwischen lokal vorhanden; keine Remote-Secrets eingerichtet. Lokalen Live-Nachweis siehe Gruppenintegration. Ohne Token werden keine vermeintlich leeren Live-Listen behauptet.
- **AKG-75:** Termin „in Planung“ in ChurchTools korrigieren oder intern setzen. Erst nach Bestätigung `SERVICES_APPROVED` aktivieren. Kalender 1 bleibt unabhängig davon deaktiviert.
- **AKG-74:** Fachliche Angebotsfreigabe vor öffentlicher Aktivierung. Die ausdrücklich beauftragte private lokale Sichtprüfung ist möglich; `GROUPS_APPROVED=false` bleibt in der eingecheckten Konfiguration.
- **AKG-78:** Personen-/Einwilligungsfreigabe. Bis dahin keine ChurchTools-Personenprofile, Rollen oder Personenfotos laden/veröffentlichen. Die gesonderte Entscheidung über vier Archivfotos (siehe AKG-77/67) ist keine Freigabe für Personenprofile.
- **AKG-79/64:** Bestätigte Ortsprofile, Anfahrt und gegebenenfalls Barrierefreiheitsangaben. Keine Ableitung aus historischen Texten.
- **AKG-61/72:** Kontakt, Zahlungsdaten, Impressum und Datenschutz durch die zuständigen Stellen bestätigen. Die Vorschauseiten sind ausdrücklich keine gültigen Rechtstexte.
- **AKG-77/67:** Medienrechte und Alternativtexte. Original-Logo unverändert; Commons-Fotos lizenzdokumentiert. Der Nutzer hat die vier ausgewählten Gemeindefotos am 13.11.2026 ausdrücklich auch für öffentliche Vorschau und Produktiv erlaubt, ohne zusätzlichen Zugangsschutz. Diese Auslieferungsentscheidung, Credits, offene weitergehende Rechtsdokumentation und Quellen stehen in [brand-spec.md](brand-spec.md). Alle Seiten und Bilddateien bleiben per noindex von unterstützenden Suchmaschinen ausgeschlossen; kein Produktionsdeploy beauftragt.
- **AKG-69:** Konzertdomain, Livestream-Ziel und Rückwege bestätigen. Konzertdomain am 2026-10-26 nicht per DNS auflösbar. Newsletter bleibt unimplementiert bis System-/Datenschutzfreigabe.
- **AKG-66:** Erst veröffentlichte Ziele in Sitemap und permanente Redirects aufnehmen. Keine erfundenen Zuordnungen der 768 alten URLs und keine Weiterleitung auf leere Anker.
- **AKG-70/72/73/80:** Backup/Rollback, Abnahmen, vollständiger Browser-/Accessibility-Audit und Betriebsverantwortung bleiben eigene Launch-Aufgaben.

## Lokale Prüfung

`pnpm quality` prüft automatisierte Tests, Format/Lint, Typen und Worker/Assets-Build. `node scripts/smoke.mjs http://127.0.0.1:8787` prüft eine lokal gestartete gebaute Vorschau **ohne Token und mit geschlossenem Gottesdienst-Gate**. Live-Tests benötigen eine getrennte, sichere Testkonfiguration; synthetische Fixtures sind kein Produktionsfallback.

### Geprüft am 2026-10-26

- `pnpm quality`: erfolgreich; 17 Node-Tests, Format/Lint, Astro/TypeScript ohne Fehler/Warnungen und Worker/Assets-Build mit echten HTML-Body-Assertions.
- `pnpm test:preview`: erfolgreich; selbst gestartete lokale Vorschau, Header-/Slash-/Assetgrenzen, zwölf Routen, interne Links, 404, 503/Retry-After, robots und keine freigegebenen Server-Dateien.
- Chromium: zwölf Seiten bei 320/390/768/1024/1440 px ohne horizontalen Overflow. axe 4.14.0 auf 390/1440 px: keine automatisierten A/AA-Fundstellen. Skip-Link, Menü, Escape, Fokusrückgabe und Breakpointwechsel, 200-%-Textgröße sowie Menü ohne JavaScript bestanden.
- Keine Browser-Ausnahmen und keine Drittanbieterrequests. Bilder auf allen geprüften Routen dekodiert, unverzerrte Darstellung und Original-Logo geprüft; Hauptaktion im ersten mobilen Viewport sichtbar. 200-%-Textprüfung auf allen zwölf Routen erfolgreich.
- Zusätzlicher DOM-Detektorlauf auf Startseite/Gottesdienste/Gemeinde/Kontakt bei 390/768/1440 px: keine unbeabsichtigte Überlappung, kein Clipping, keine unsichtbaren Inhalte, defekten/verzerrten Bilder oder rechnerischen Kontrastbefunde. Die Bewertung bezog sich auf den damaligen Seitenstand.
- `wrangler deploy --dry-run` mit erzeugter Konfiguration: erfolgreich, **kein Upload/Deployment**.
- Zusätzliches unabhängiges Code-/Sicherheitsreview: keine weiteren umsetzbaren Korrektheits-/Sicherheitsbefunde nach den Korrekturen. Die zwei zuvor gefundenen Cache-Fehler (teilweiser Freigabeentzug und mehrseitige Cache-Größe) sind durch Regressionstests abgedeckt.
- GitHub-Workflow ergänzt Quality und Browser-/HTTP-Gates; noch kein entfernter GitHub-CI-Lauf ausgelöst. Agent-eigene Prüfserver sind beendet; der bereits vorhandene Nutzer-Devserver wurde nicht beendet.

**Nicht verifiziert:** authentifizierte ChurchTools-Ende-zu-Ende-Daten, Safari/Firefox, echte Screenreader und Mobilgeräte, externe Cloudflare-Vorschau, produktiver Betrieb oder Wiederherstellung eines WordPress-Backups. Vorschau-/Fehlerzustände sind nutzbar, operative und sensible Angaben bleiben bewusst unbefüllt; redaktionelle Gemeinde-/Geschichtstexte sind ausdrücklich Entwürfe. Der MVP ist technisch zur lokalen Prüfung geeignet, nicht launch-fertig.

Die nächsten fachlich blockierten Pakete sind Token-/Live-Datenprüfung, AKG-74/75/78/79 und AKG-61/72. Technisch unbelegte Inhalte oder Produktivänderungen werden nicht zur Vergrößerung des MVP vorgezogen. Alle Tickets bleiben offen bzw. im Review; nichts wurde geschlossen.
