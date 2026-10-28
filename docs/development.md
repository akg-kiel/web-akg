# Lokale Entwicklung und technische Abnahme

## Basis und Installation

AKG-57 übernimmt `web-konzerte` main `48c64ea` nach der zusammengeführten
Stack-Migration PR #28. Die Versionen stammen aus dessen Lockfile:
Astro 7.2.10, Cloudflare-Adapter 14.2.6, React-Integration 6.0.4, React 19.2.8,
React Aria Components 1.20.0, Tailwind 4.3.2 via PostCSS und Vite+ 0.2.2.
Node 22 und pnpm 11.9.0 werden mit mise gewählt. React bleibt für notwendige
Islands verfügbar; native HTML-Interaktion hat Vorrang. Keine Konzert-/Mail-Logik
und keine zusätzliche direkte Kalenderbibliothek werden übernommen.

```sh
mise trust
mise install
mise run deps
mise run dev
```

`mise.toml` pinnt die Werkzeuge; `vp` ist wie in der Referenz die Oberfläche;
`package.json` enthält die Skripte. Installation mit bestehendem Lockfile:
`mise exec -- pnpm install --frozen-lockfile`.

Die lokale Website läuft auf `http://127.0.0.1:4321`. Keine Zugangsdaten sind
für die Installation nötig. `.dev.vars.example` enthält einen leeren Token-Platzhalter
und geschlossene Freigabeschalter. Der eingeschränkte WEB-AKG-Lesezugang wurde
am 28.10.2026 ausschließlich für den Test in der ignorierten lokalen `.dev.vars`
bereitgestellt (Dateimodus 0600). Root- und generierte Kopie wurden anschließend
entfernt; keine zusätzliche dauerhafte Tokenablage. Nur `WEB_AKG_CT_API_TOKEN` wurde als `CHURCHTOOLS_TOKEN`
übernommen, nicht der separate Administrationszugang. Für die beauftragte private
Sichtprüfung waren dort `SERVICES_APPROVED=true` und `GROUPS_APPROVED=true` gesetzt;
die eingecheckte Worker-Konfiguration bleibt geschlossen. Das ist keine
öffentliche Freigabe; den Entwicklungsserver ausschließlich an `127.0.0.1` binden. Niemals Token in Quellcode, Browservariablen (`PUBLIC_*`), Logs,
Kommandoparameter oder Git übernehmen.

`pnpm types` erzeugt `worker-configuration.d.ts` mit
`wrangler types --env-file .dev.vars.example`; echte Secrets werden dabei nicht
gelesen. Nach Änderungen an der Worker-Konfiguration erneut ausführen.

## Daten- und Veröffentlichungsgrenzen

- `SERVICES_APPROVED = "false"` bleibt geschlossen, bis „in Planung“ in der
  Gottesdienstquelle bereinigt und die Veröffentlichung ausdrücklich freigegeben ist.
- `GROUPS_APPROVED = "false"` bleibt in der öffentlichen Konfiguration geschlossen,
  bis AKG-74 fachlich bestätigt ist. Die private lokale Gruppenansicht verwendet
  nur öffentlich anonym lesbare, aktive Angebote der Typen 1/2/3/5.
- Personen, Mitgliederlisten, Gruppenbilder und zusätzliche Kalender bleiben aus.
- Leere/nicht verfügbare Daten bleiben echte Fehler-/Leerzustände, keine
  WordPress- oder Demo-Fallbacks.
- ChurchTools-Zugriff bleibt serverseitig. Ein erfolgreicher technischer Test
  ersetzt keine fachliche, Datenschutz- oder Rechtstextfreigabe.

## Prüfungen

```sh
mise exec -- pnpm test
mise exec -- pnpm build
mise run quality
```

`test` nutzt Node-Test-Runner und `assert`, ohne zusätzliches Testframework.
`quality` führt Tests, `vp check .` sowie den Build aus. `build` generiert
Bindings, prüft Astro/TypeScript, baut die Website und prüft die erzeugten
Cloudflare-Dateien. Keine globale Formatierung fremder Arbeitsdateien:
gezielt `pnpm exec vp fmt <Dateien>` verwenden.

Der Build-Check prüft unter anderem den Worker-Namen `web-akg`, geschlossene
Freigaben, fehlende Produktionsrouten/Mail-Bindings, Ausschluss von `server/`
aus Assets und fehlende Token-Bindings im öffentlichen Build. Das ist kein
Nachweis einer vollständigen Geheimnisprüfung oder fachlichen Freigabe.

Die GitHub-Action läuft nur für Pull Requests nach `main`, wie in der Referenz:
Checkout, mise, `mise run ci` (Frozen-Lockfile-Installation und Quality).
Zusätzlich installiert CI Chromium und startet mit `pnpm test:preview` kurzzeitig eine
lokale gebaute Vorschau für HTTP-, axe- und Tastaturprüfungen. Keine Deployment-Jobs
oder Cloudflare-Zugangsdaten in GitHub Actions. Automatische Deployments übernimmt
separat Cloudflare Workers Builds; dessen Build-Befehl führt ebenfalls `pnpm quality`
aus. Die Browser-Prüfung bleibt im GitHub-PR-Gate.

## Cloudflare-Build und lokale Laufzeit

Astro rendert statische Seiten vor; datenabhängige Routen wählen gezielt SSR mit
`export const prerender = false`. `build.client = '.'` legt Assets in `dist/`
und den Worker in `dist/server/` ab. `public/.assetsignore` schließt `server`
von der Asset-Auslieferung aus. Sessions sind deaktiviert. Slashlose URLs aus
AKG-58 haben Vorrang vor der Referenz.

Der Worker läuft vor **allen** Assets (`run_worker_first = true`) und ergänzt
`X-Robots-Tag: noindex, nofollow`, MIME-Sniffing-, Frame-, Referrer- und
Permissions-Schutz. Die CSP beschränkt Basis-URLs, Frames und Objekte; sie ist
bewusst keine vollständige Script-Allowlist. Auch abgefangene Laufzeitfehler
erhalten diese Header. Es gibt keinen Host- oder Produktionsschalter.
`noindex` schützt nicht vor unbefugtem Lesen.

Das Kompatibilitätsdatum `2026-01-19` bleibt aus der Referenz erhalten, passend
zum fixierten Wrangler/Workerd-Stand. Zusätzlich aktiviert `fetch_iterable_type_support`
gezielt die Unterstützung für AsyncIterable-Response-Bodies (AKG-125). Ohne diesen
Schalter erkennt Astro den Worker durch `nodejs_compat` als Node, und sowohl
SSR als auch Prerendering liefern `[object Object]` statt HTML. Der Build-Check
prüft deshalb auch echte HTML-Bodies, nicht nur Status und Header. Siehe
[Astro #14511](https://github.com/withastro/astro/issues/14511) und die
[Cloudflare-Kompatibilitätsflags](https://developers.cloudflare.com/workers/configuration/compatibility-flags/).
Eine allgemeine Datumsaktualisierung muss zusammen mit dem Runtime-Upgrade geprüft werden.

Nach dem Build kann der tatsächliche Worker lokal geprüft werden:

```sh
mise exec -- pnpm preview --host 127.0.0.1 --port 4321
# In einem zweiten Terminal:
node scripts/check-cloudflare-build.mjs --origin=http://127.0.0.1:4321
node scripts/smoke.mjs http://127.0.0.1:4321
```

Für den vollständigen, selbst startenden Vorschautest nach einem erfolgreichen Build:

```sh
pnpm exec playwright-core install chromium
pnpm test:preview
```

Linux-Systembibliotheken bei Bedarf mit `pnpm exec playwright-core install --with-deps chromium`
installieren (CI übernimmt dies). Port 8787 muss frei sein. Der Test beendet seinen
Server auch bei Fehlern. `playwright-core` und `axe-core` sind ausschließlich
Entwicklungsabhängigkeiten; weder Browser noch Auditbibliothek gelangen in die Website.

`pnpm test:browser <URL>` prüft zwölf Seiten bei 320/390/768/1024/1440 px, axe WCAG
2.2 A/AA auf Mobil/Desktop, Skip-Link, Menütastatur, Escape, Fokus bei Breakpointwechsel,
200-%-Textgröße, JavaScript-freie Navigation und das Ausbleiben externer Requests.
Mit lokalen Live-Daten zusätzlich `EXPECT_LIVE_CHURCHTOOLS=1 pnpm test:preview`:
Dies verlangt tatsächlich gerenderte Angebote und Gottesdienste und prüft
Teaser-Ziele, aufgeklappte Angebote, Suche/Nulltreffer und Zurücksetzen ohne JS.
Ohne Token bleiben die Standardtests reproduzierbar mit geschlossenen Gates.
Das ersetzt keine echte Screenreader- oder Geräteprüfung.

Build und lokale Server im selben Worktree nacheinander ausführen: parallele
Workerd-Prozesse können dieselbe lokale SQLite-State-Datei sperren
(`SQLITE_BUSY_RECOVERY`). Vor einem erneuten Build die eigenen lokalen Server
beenden; fremde Prozesse oder deren State nicht löschen.

Der optionale Laufzeitcheck prüft Header an Startseite, Datenrouten, statischen
Seiten, CSS, 404 und einem verbotenen Server-Asset sowie slashlose Weiterleitungen. Dazu kommen manuelle Tastatur-/Mobil-/Desktop-
Prüfungen der UI. Ein laufender Entwicklungsserver allein bestätigt die
Produktions-Asset-Routing-Regeln nicht.

Lokales Deployment-Paket prüfen, **ohne Upload oder Bereitstellung**:

```sh
mise exec -- pnpm exec wrangler deploy --dry-run --config dist/server/wrangler.json --outdir .wrangler/dry-run
```

`dist/` und `.wrangler/` sind generiert und werden nicht eingecheckt. Kein
Server-Bundle als öffentliches Asset veröffentlichen. Der Cloudflare-Vite-Adapter
kopiert lokale `.dev.vars` beim Build nach `dist/server/.dev.vars` für `astro preview`.
Nach Änderungen der lokalen Zugangsdaten deshalb neu bauen. Diese Datei ist nur
ein lokales Geheimnisartefakt: nicht veröffentlichen, archivieren oder als CI-Artefakt
hochladen; Dateimodus 0600 setzen. `server/` bleibt von öffentlichen Assets ausgeschlossen.
Die HTTP-Checks verlangen 404 auch für `/server/.dev.vars`, `/.dev.vars` und `/.env`.

## Cloudflare Workers Builds

Am 2026-10-26 ausdrücklich beauftragt: Worker `web-akg`, Production-Branch `main`
und automatische Previews für alle anderen Branches. Der Nutzer hat den Worker
samt GitHub-Verbindung angelegt; die folgenden Einstellungen ergänzen diese Verbindung.
Es gibt kein zweites Produkt `web-akg-preview` und kein Cloudflare-Pages-Projekt.

| Einstellung                     | Wert                                                                                                |
| ------------------------------- | --------------------------------------------------------------------------------------------------- |
| Repository                      | `akg-kiel/web-akg`                                                                                  |
| Root directory                  | `/`                                                                                                 |
| Build-Befehl (beide Trigger)    | `pnpm install --frozen-lockfile && pnpm quality`                                                    |
| Production                      | Nur `main`; `pnpm exec wrangler deploy --config dist/server/wrangler.json`                          |
| Preview                         | Alle Branches außer `main`; `pnpm exec wrangler versions upload --config dist/server/wrangler.json` |
| Build-Variablen (beide Trigger) | `NODE_VERSION=22.23.2`, `PNPM_VERSION=11.9.0`, `SKIP_DEPENDENCY_INSTALL=1`                          |
| Build-Cache                     | aktiviert                                                                                           |
| Worker-Hauptadresse             | `workers_dev=false`, keine Domain/Route angebunden                                                  |
| Version-URLs                    | `preview_urls=true`                                                                                 |

Es wird immer die **von Astro generierte** Konfiguration verwendet, nicht das
ungebündelte `src/worker.ts`. Der Build-Befehl installiert mit Lockfile und prüft
Tests, Format/Lint, Typen und Worker/Assets-Grenzen, bevor ein Upload erfolgen kann.
Der vorhandene, vom Nutzer gewählte Cloudflare-Build-Token bleibt in Cloudflare;
keine Kopie in GitHub, Quelltext oder öffentlichen Build-Artefakten.

Die gepinnte Wrangler-Version und die `web-konzerte`-Referenz verwenden
**Version-Previews**: `versions upload` aktiviert die neue Version nicht als
Production-Deployment. Dies sind keine isolierten Worker-Previews; Bindings und
Ressourcen können mit Production geteilt sein. Derzeit sind keine Laufzeit-Secrets
oder sensiblen Bindings eingerichtet. Vor deren Ergänzung separate Preview-Bindings
bzw. eine getrennte Umgebung festlegen. Der API-Token für die Einrichtung gehört
nicht in Build-Variablen oder Laufzeit-Secrets.

**Erster Preview-Build:** Der Nutzer hat Commit und Push des MVP auf
`t3/build-web-akg-mvp` autorisiert. Der Push soll den Preview-Trigger auslösen;
Build-Ergebnis, Version und HTTP-Abnahme werden in AKG-54 dokumentiert. Eine
Trigger-Einrichtung allein ist kein erfolgreicher Remote-E2E-Build.
Remote-`main` enthält bei diesem Stand weiterhin nur Dokumentation. Ein Merge nach
`main` löst Production aus und ist nicht Teil des Preview-Auftrags.

`akg-kiel.de`, DNS, `SERVICES_APPROVED=false` und die Anwendungsschutzregeln bleiben
unverändert. Auch Production-Builds bleiben bis zur gesonderten Launch-Freigabe
`noindex`. Version-URLs sind öffentlich, sobald eine Version existiert;
**noindex ist keine Zugriffskontrolle**. Für private Inhalte vorab Cloudflare Access
oder eine getrennte geschützte Umgebung einrichten.

### Rücknahme

Für eine genehmigte Rücknahme zuerst vorherige Version und gegebenenfalls
Binding-/Datenänderungen prüfen. `wrangler rollback <VERSION_ID> --config
dist/server/wrangler.json` betrifft die aktive Bereitstellung; ein reiner
Version-Preview-Link wird dadurch nicht gelöscht. Dessen Zugriff oder Löschung
gesondert planen. Kein automatischer Rollback und keine DNS-Änderung. Ein
Launch auf `akg-kiel.de` benötigt einen eigenen Auftrag samt Freigaben und Konfiguration.

## Quellen

- [Workers Best Practices](https://developers.cloudflare.com/workers/best-practices/workers-best-practices/)
- [Worker-first Asset-Routing](https://developers.cloudflare.com/workers/static-assets/routing/worker-script/)
- [Wrangler-Konfiguration](https://developers.cloudflare.com/workers/wrangler/configuration/)
- [Wrangler-Typgenerierung](https://developers.cloudflare.com/workers/wrangler/commands/general/#types)
- [Workers Builds: Konfiguration](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/)
- [Workers Builds: Branches](https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/)
- [Build-Image und Toolversionen](https://developers.cloudflare.com/workers/ci-cd/builds/build-image/)
- [Version-URLs](https://developers.cloudflare.com/workers/versions-and-deployments/version-urls/)

Zusätzlich wurden das installierte `wrangler/config-schema.json` und die
mit Wrangler generierten Runtime-Typen geprüft.
