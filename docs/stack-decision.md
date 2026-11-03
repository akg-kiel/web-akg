# AKG-57 · Technische Basis

Entscheidung: 2026-10-26. Referenz: `web-konzerte` main `48c64ea1bf0731cb5bbc2f6df9e4871a08cdd175`.

Die vormals offene Stack-Migration ist mit [PR #28](https://github.com/akg-kiel/web-konzerte/pull/28) zusammengeführt (2026-09-03, Merge `945430073f92d3ea5d1ecf41456d63157100cea7`, Quality erfolgreich). Damit ist die Stack-Entscheidung vor dem Scaffolding geklärt; AKG-57 bleibt bis zur technischen Abnahme offen.

Übernommen werden Astro 7, Cloudflare Workers mit Assets und selektivem SSR, TypeScript strict, React/React Aria für notwendige Islands, Tailwind 4 via PostCSS, Node 22, pnpm 11 und Vite+. Native HTML-Interaktion hat Vorrang. Keine Konzert-Daten, Mail-Bindings, Produkttexte oder vollständige Komponentenbibliothek werden kopiert.

Am 2026-10-29 wird die Werkzeugverwaltung auf Nutzerauftrag von mise auf devenv umgestellt, entsprechend der Entscheidung im Referenz-Thread „Techstack mit Web-Konzerte vergleichen“. `devenv.lock` pinnt Nixpkgs 26.05 und die devenv-Module; Node 22.23.4, pnpm 11.27.0 und Git kommen aus Nix. Vite+ bleibt eine lokale pnpm-Abhängigkeit. Framework, Anwendung und Cloudflare-Runtime bleiben unverändert. NixOS ist nicht erforderlich.

Am 2026-10-30 werden auch Chromium/Headless Shell, deren Bibliotheken, Fonts und alle verwendeten Shell-Werkzeuge über devenv bereitgestellt. Der Playwright-Client wird auf die zur unveränderten Nix-Revision passende Version 1.59.1 angeglichen. `scripts/devenv.sh` startet selbst devenv ohne globale Profilinstallation; das gemeinsame Test-Gate umfasst nun auch die Browser-Prüfungen. Anwendung, bestehende Browser-Assertions und Freigabeschalter bleiben unverändert.

Projektweite Bedienung und Prozesse gehören devenv; JavaScript-Aufgaben und deren
Verkettungen laufen über projektlokales `vp run`. pnpm verwaltet Abhängigkeiten
und Lockfile. Die portablen Paket-Skripte bleiben auch für Cloudflare Builds ohne
Nix verwendbar; Astro und die vorhandenen Node-Tests bleiben maßgeblich.

Die AKG-58-Struktur im Review (`t3code/akg-58`, `docs/information-architecture.md`) dient als Arbeitsvertrag: fünf Hauptziele, flache deutsche Pfade, stabile Quellschlüssel. Deren ausdrückliche slashlose URLs haben Vorrang vor der trailing-slash-Konvention der Referenz. Der andere Branch wird nicht gemergt oder verändert.

Keine Produktionsbereitstellung, Domains oder DNS. Vorschauen bleiben noindex. Fehlende fachliche, rechtliche und datenschutzrechtliche Freigaben blockieren Veröffentlichung unabhängig von erfolgreichen technischen Checks.
