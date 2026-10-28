# AKG-126 · Launch-Runbook (Entwurf)

**Nicht zur Ausführung freigegeben.** Stand 2026-10-26, Projekt Website AKG, Meilenstein „5 · Abnahme & Launch-Vorbereitung“. Dieses Dokument bereitet AKG-70 vor; es belegt **kein** vorhandenes Backup und **keinen** getesteten Restore/Rollback. Produktionsumschaltung und DNS benötigen einen gesonderten Auftrag.

## 1. Nachweise vor Terminplanung

| Voraussetzung                 | Erforderlicher Nachweis                                                                                                                                      | Derzeit                                                         |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------- |
| Verantwortliche / Vertretung  | Namentliche Freigabe-, Technik-, DNS-, Redaktions- und Kommunikationsrollen; Eskalationsweg                                                                  | Offen, AKG-80                                                   |
| Inhalte / Recht / Datenschutz | Fachliche Abnahme der tatsächlich veröffentlichten Inhalte und Verarbeitung                                                                                  | Offen, AKG-72; einzelne Gates in [mvp-status.md](mvp-status.md) |
| Datenquelle                   | Eingeschränkter Token, erfolgreiche sichere Live-Prüfung, bestätigte Gottesdienstfreigabe                                                                    | Offen, AKG-59/75                                                |
| WordPress-Backup              | Datenbank, Uploads, Konfiguration und serverabhängige Wiederherstellungsvoraussetzungen; Zeitpunkt, Integritätsnachweis, geschützter Speicherort und Zugriff | Offen, AKG-70                                                   |
| Restore-Probe                 | Wiederherstellung in isolierter Umgebung; geprüfte Hauptseiten, Medien und benötigte Funktionen; protokollierte Dauer                                        | Nicht durchgeführt                                              |
| Infrastruktur                 | Autorisierte Cloudflare-/DNS-Zugänge, bisherige DNS-Zone, origin/Zertifikate, Rückfallziel und neue Produktionskonfiguration                                 | Worker/Git-Builds eingerichtet; Domain/Launch offen             |
| Qualität                      | Geprüfter Commit/Lockfile, Quality, Preview-Tests, Browser-/Accessibility-Abnahme, freigegebene Redirect-Matrix                                              | Lokale technische Checks vorhanden; Launch-Abnahme offen        |

Backup-Ort und Zugangsdaten gehören in die zugriffsbeschränkte Betriebsdokumentation, nicht in dieses Repository. DNS-Zone inklusive Mail-/Verifikationsrecords sichern; eine Website-Umschaltung darf Mail, ChurchTools, Konzerte oder Dreimaster nicht verändern.

## 2. Technischen Kandidaten erstellen

1. Fachlichen Scope fixieren: nur tatsächlich freigegebene Inhalte aktivieren. Offene Freigaben nicht durch lokale Ersatzlisten übergehen.
2. Aus einem dokumentierten Commit mit Frozen-Lockfile installieren; keine parallelen Build-/Preview-Prozesse im selben Worktree.
3. `mise run ci` ausführen (Installation, Tests, Lint/Format, Typen, Build).
4. `pnpm exec playwright-core install chromium`, dann `pnpm test:preview` ausführen. Die aktuelle Prüfung erwartet **lokale Vorschau ohne Token**, geschlossene Gates und noindex. Vor einem Live-Kandidaten die Erwartungen bewusst ergänzen; Tests nicht einfach abschalten.
5. `pnpm exec wrangler deploy --dry-run --config dist/server/wrangler.json --outdir .wrangler/dry-run` prüft das Paket ohne Upload.
6. Artefakt, Commit, Testergebnisse und offene Abweichungen in Linear referenzieren.

Der aktuelle Worker heißt `web-akg`; `main` ist als Production-Branch und andere Branches als Version-Previews konfiguriert. Es gibt keine Produktionsdomain. Der Anwendungscode erzwingt weiterhin noindex. **Er ist keine fertige Produktionskonfiguration.** Eine gesonderte Produktionsänderung muss Host-/Indexierungsregeln, Sitemap, freigegebene Redirects, Secrets und ggf. Zugriffsschutz ausdrücklich prüfen. Server-Bundle niemals als öffentliches Asset ausliefern.

## 3. Separat genehmigte externe Vorschau

- Vor Bereitstellung Zugangsschutz klären: noindex ist keine Zugriffskontrolle.
- Die eingerichteten Version-Previews gehören zum selben Worker und isolieren Ressourcen/Secrets nicht automatisch. Derzeit sind keine Laufzeit-Secrets eingerichtet. Vor Hinzufügen sensibler Produktions-Bindings eine getrennte Preview-Umgebung vorsehen; keine personenbezogenen Test-Fixtures und keine administrativen API-Rechte.
- Nur das geprüfte Artefakt bereitstellen. Version, Ziel und Rücknahmeweg protokollieren.
- Von außen Status, tatsächlichen HTML-Body, Navigation, Assets, Datenzustände und fehlende Token-/Rohdaten prüfen. Ein HTTP-200 allein reicht nicht (AKG-125).
- Rücknahme einer Preview-Version ist nicht gleichbedeutend mit dem Löschen ihres Preview-Links. Zugriff bzw. Entfernung separat behandeln.

## 4. Umschaltfolge — erst nach eigenständiger Launch-Freigabe

1. Verantwortliche bestätigen Go/No-Go, konkretes Zeitfenster, Kommunikationskanal und Abbruchentscheidung. Werte/Namen sind **noch festzulegen**.
2. Aktuellen Backup-/Restore-Nachweis kontrollieren; Quelländerungen und ein gegebenenfalls notwendiges redaktionelles Freeze-Fenster abstimmen.
3. Bestehende DNS-Werte, Proxy-Einstellungen, TTLs und Rückfallziel erfassen. Notwendige TTL-Änderungen mit ausreichendem Vorlauf anhand der tatsächlichen alten TTL planen, nicht pauschal annehmen.
4. Genehmigten Produktionskandidaten und Zertifikats-/Hostrouting prüfen, bevor irgendein produktiver Einstieg geändert wird.
5. Nur die ausdrücklich freigegebenen Website-Routing-/DNS-Einträge ändern. Keine benachbarten Dienste anfassen.
6. Direkt anschließend externe Smoke-Prüfung und fachliche Stichproben; Ergebnisse und Zeitpunkt protokollieren.
7. WordPress und wiederherstellbare Backups bis zum Ende der vereinbarten Stabilisierung erhalten. Keine Löschung im Rahmen dieses Runbooks.

## 5. Smoke- und Abbruchkriterien

Prüfen: Startseite, Gottesdienste, Meldungen, Angebote, Gemeinde/Orte, Kontakt/Rechtliches; echte erlaubte Detail-URLs; 404 und 503; mobile Navigation; freigegebene externe Ziele; Ein-Schritt-Redirects alter Hauptziele; TLS und kanonische Hosts; erwartete robots-/Sitemap-Regeln; serverseitige Datenfreigaben und Ablaufverhalten.

**Sofort stoppen bzw. Rücknahme entscheiden bei:** Geheimnissen oder ungeprüften Personendaten im Browser, falschen Zahlungs-/Kontaktdaten, unlesbarem HTML, großflächigen 5xx, nicht nutzbaren Hauptwegen, kaputtem TLS/Hostrouting oder unbeabsichtigten Änderungen an anderen Diensten. Für Latenz und einzelne Datenquellenausfälle vorab messbare Schwellen und Beobachtungsdauer vereinbaren; diese Werte sind noch offen.

Keine Rohdaten oder Tokens zur Fehlersuche in öffentliche Logs/Tickets kopieren. Logs datensparsam verwenden, Fehler pro Inhaltstyp isoliert bewerten.

## 6. Rücknahmeplan und Probe

- Vor dem Launch sowohl den Rückweg auf die vorherige Worker-Version als auch den Rückweg zur bisherigen WordPress-Route getrennt prüfen. Ein Worker-Rollback macht DNS- oder Datenänderungen nicht rückgängig.
- Für Worker-Rücknahme nach Autorisierung die dokumentierte alte Version verwenden; Wrangler-Version und aktuelle Konfigurationsidentität vorher prüfen. Siehe [development.md](development.md).
- Für DNS-/Routing-Rücknahme exakt die gesicherten Werte verwenden; mögliche Resolver-Caches und alte TTL berücksichtigen. Kein neues Rückfallziel im Störungsfall improvisieren.
- Nach Rücknahme erneut externe Smoke-Prüfung, Zustand der anderen Dienste, Zeitpunkt und Kommunikation protokollieren.
- Eine Probe zunächst isoliert planen. Prüfprotokoll muss Ausgangszustand, Aktion, Nachweis, gemessene Dauer, Ergebnis und verbleibende Risiken enthalten. **Noch keine Probe erfolgt.**

Erst nach erfolgreicher praktischer Probe und vollständigen Nachweisen kann AKG-70 abgenommen werden. AKG-68 (produktiver Launch) und AKG-71 (Stabilisierung) bleiben gesonderte Aufgaben.
