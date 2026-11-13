# Website AKG

Lokaler MVP der neuen Gemeindewebsite. Noch keine veröffentlichungsfähige oder
rechtlich freigegebene Website. Konzerte und Dreimaster bleiben getrennte Produkte.

Technische Basis: der finalisierte `web-konzerte`-Stand `48c64ea`;
[Stack-Entscheidung](docs/stack-decision.md), [Entwicklung und Prüfungen](docs/development.md).

Voraussetzung: [Nix, Bash und devenv](docs/development.md#basis-und-installation).
NixOS ist nicht erforderlich. Alternativ startet `./scripts/devenv.sh` devenv
profilfrei über Nix; dieser optionale Starter ist kein projektübergreifender Standard.

### Standard der Projektumgebung

Nix und Bash bilden die Grundlage; devenv darf global installiert sein.
Globale persönliche Werkzeuge wie Pi, Node oder npm-Pakete sind erlaubt, aber
keine Voraussetzung für Projektbefehle. Die devenv-Shell liefert die benötigten
Projektwerkzeuge und Laufzeitbibliotheken; darin haben die Projektversionen Vorrang.
JavaScript-Abhängigkeiten einschließlich Vite+ bleiben in `package.json` und dem
Lockfile. Die Installation bleibt ein eigener Setup-Schritt mit
`pnpm install --frozen-lockfile`, keine Nebenwirkung des Shell-Starts.

`devenv test --clean` prüft mit bereinigter Umgebung. Das ist eine eigenständig
funktionierende Toolumgebung, keine Container- oder Sicherheitsisolation.

### Projekt bedienen

devenv ist die oberste Bedienoberfläche. JavaScript-Aufgaben laufen über das
projektlokale `pnpm exec vp run <Aufgabe>`; Vite+ führt die portablen Paket-Skripte
und deren Verkettungen aus. pnpm verwaltet Abhängigkeiten und Lockfile; `pnpm exec`
startet hier nur das lokale VP-Binary. Kein `vp install` oder `vp env`.

Ohne Nix/devenv, etwa in Cloudflare Builds, bleibt derselbe JS-Einstieg nutzbar:

```sh
pnpm install --frozen-lockfile
pnpm exec vp run quality
```

Astro bleibt für Entwicklung und Build zuständig: `vp run dev` und `vp run build`
führen die Paket-Skripte aus; `vp dev` und `vp build` würden Vite+ direkt starten. Vorhandene
Node-Tests bleiben Node-Tests. Zusätzliches Task-Caching wird nicht aktiviert.

| Befehl                             | Aufgabe                                                       |
| ---------------------------------- | ------------------------------------------------------------- |
| `devenv up`                        | Abhängigkeiten vorbereiten und den Entwicklungsserver starten |
| `devenv tasks run project:setup`   | Abhängigkeiten mit eingefrorenem Lockfile installieren        |
| `devenv tasks run project:check`   | Format/Lint, Typen und vorhandene Offline-Tests prüfen        |
| `devenv tasks run project:build`   | Produktionsartefakte bauen                                    |
| `devenv tasks run project:quality` | Gemeinsames Quality-/Build-Gate ausführen                     |
| `devenv test --clean`              | Vollständige projektspezifische Abnahme ausführen             |

Check, Build, Quality und Entwicklungsserver hängen vom Setup ab. Das reine
Öffnen von `devenv shell` installiert weiterhin nichts. Für einzelne
Paketmanager-Operationen bleibt etwa `devenv shell -- pnpm add <Paket>`.

Der Entwicklungsserver bindet nur an `127.0.0.1`; devenv vergibt einen freien Port
ab 4321. Die tatsächliche URL steht im Serverlog. Im Vordergrund beendet Ctrl+C
den Stack. Nach `devenv up -d` beendet `devenv processes down` die Hintergrundprozesse.
`devenv test` startet nicht zusätzlich den Entwicklungsserver. Build-/Quality- und
Preview-Läufe im selben Worktree nacheinander ausführen; einen laufenden Dev-Stack
vorher beenden, damit Workerd nicht um denselben lokalen SQLite-State konkurriert.

```sh
devenv up
```

Checks ohne interaktive Shell:

```sh
devenv test --clean
```

Ohne ChurchTools-Token sind
gesperrte oder nicht verfügbare Daten kein Fehler der Installation; es werden keine
Beispieldaten erfunden. Gottesdienste bleiben über `SERVICES_APPROVED = "false"`
gesperrt, bis die Quelle bereinigt und ausdrücklich freigegeben wurde.

Der Worker `web-akg` hat noch keine Produktionsdomain, keine
`workers.dev`-Hauptadresse und keine Mail-Bindings. Alle Worker-Antworten bleiben
`noindex, nofollow`, auch Assets und Fehler. Das ist **keine Zugriffskontrolle**.
Cloudflare Workers Builds ordnet `main` der Production-Version zu; andere Branches
laden ausschließlich Preview-Versionen hoch. Einrichtung und Grenzen stehen in
[development.md](docs/development.md#cloudflare-workers-builds).
Automatische Builds benötigen den eingecheckten und gepushten Anwendungscode;
die Einrichtung allein veröffentlicht die lokale Website nicht.

Umgesetzte Pakete und offene Freigaben: [MVP-Stand](docs/mvp-status.md).
