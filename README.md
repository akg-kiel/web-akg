# Website AKG

Lokaler MVP der neuen Gemeindewebsite. Noch keine veröffentlichungsfähige oder
rechtlich freigegebene Website. Konzerte und Dreimaster bleiben getrennte Produkte.

Technische Basis: der finalisierte `web-konzerte`-Stand `48c64ea`;
[Stack-Entscheidung](docs/stack-decision.md), [Entwicklung und Prüfungen](docs/development.md).

```sh
mise trust
mise install
mise run deps
mise run dev
mise run quality
pnpm exec playwright-core install chromium
pnpm test:preview
```

Die Entwicklung startet auf `http://127.0.0.1:4321`. Ohne ChurchTools-Token sind
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
