# AKG-63 · Gruppen und lokale ChurchTools-Anbindung

Stand: 28.10.2026 · Website AKG · Meilenstein „3 · MVP: Kernwebsite“.
Basis: `a29a563` auf `t3/akg-127-taste-redesign`; diese Erweiterung ist uncommitted.

## Auftrag und Umfang

Nach bestätigtem Lesezugang hat der Nutzer die Einbindung von Gruppen und Kalenderterminen beauftragt. Die bestehende Gestaltung bleibt bestehen: hellblauer Hero, Original-Logo/Figtree und Gemeindefotos. Unter „Miteinander leben“ stehen drei alphabetisch erste Angebote aus derselben Quelle wie die Übersicht; keine manuelle Favoritenliste und keine Demo-Angebote.

- `src/lib/server/churchtools.ts`: paginierte Gruppen, aktive öffentliche Quellmarker, Typen 1/2/3/5, begrenzte Felder. Namen der Typen stammen aus ChurchTools.
- `src/lib/content.ts`: ausschließlich serverseitige Bindings, gemeinsame Datenquelle für Startseite und Übersicht.
- `src/components/GroupList.astro` / `src/pages/angebote.astro`: echte Teaser, Kategorien, GET-Suche und native Details. Ein Teaser öffnet seinen Abschnitt über die GUID auch ohne JavaScript.
- Vorhandene Gottesdienstliste/-details erhalten weiterhin nur Titel und Zeit aus Kalender 2. Kein Kalender 1/3/4, keine Ortsableitungen.
- Vorhandene News verwenden unverändert beide Filter `group_visibility=public` und `post_visibility=group_visible` sowie die dynamischen Website-Gruppenfreigaben.

Beschreibung bleibt escaped Plaintext; fehlende Angaben bleiben weg. Keine Personen-/Rollen-/Mitgliedsdaten, Straßen, Bilder oder Mitgliedszahlen im Modell. Kein WordPress-Fallback.

## Zugriff und Freigabe

Nur der übergebene WEB-AKG-Zugang (Konto 9854) wurde verwendet. Für den Test erhielt die Anwendung ausschließlich den Token über eine temporäre ignorierte lokale `.dev.vars`, Dateimodus 0600. Diese Datei und die generierte `dist/server/.dev.vars` wurden nach Abschluss der Prüfungen wieder entfernt; der vorhandene Zugang in `/workspace/ct-api/.env` wurde nicht verändert. Kein Admin-Token, keine Rechteausweitung, keine Remote-Secrets und kein Token im Frontend oder Git.

Die beauftragte **private lokale Sichtprüfung** nutzt `SERVICES_APPROVED=true` und `GROUPS_APPROVED=true` in dieser lokalen Datei. Die eingecheckte und generierte öffentliche Worker-Konfiguration bleibt bei beiden Schaltern **false**. AKG-74/75 sind nicht abgeschlossen, ungeprüfte Quelltexte werden dadurch nicht fachlich freigegeben. Auch die alten Foto-/Personenfreigaben bleiben offen.

Nur Loopback-Vorschau verwenden. `noindex` ist keine Zugangskontrolle. Ein öffentlicher Preview-Build oder Deployment ist nicht beauftragt. Der Adapter erzeugt beim Build `dist/server/.dev.vars` aus den lokalen Werten; diese Datei ist ein privates Geheimnisartefakt und darf nicht hochgeladen/archiviert werden. `server/` bleibt von Assets ausgeschlossen.

## Live-Vertrag und Fehlerkorrekturen

- Token-Abfrage: 93 öffentliche Gruppen über vier geprüfte Seiten.
- Anonyme Sicht ist enger: der Server erhält 89 Gruppen; nach Typ-/Status-/Sichtbarkeitsprüfung bleiben **75 technisch geeignete Angebote**. Die 93 Datensätze werden ausdrücklich nicht pauschal publiziert.
- Kalender 2: **30 Vorkommen** im Fenster 28.10.2026–28.10.2027; anonymer Zugriff verhindert eine Rechteausweitung durch den Token.
- Auch die vorhandenen News werden mit dem echten eingeschränkten Zugang in der lokalen SSR-Vorschau ausgegeben; ihr Datenvertrag bleibt unverändert.
- Die aktive Status-ID 1 wurde einmalig in den nativen `groupStatuses`-Stammdaten als `active` verifiziert; die Anwendung fragt keine Personen-Stammdaten ab.
- Der erste echte Worker-Test deckte einen vorbestehenden Fehler auf: Workers akzeptiert `redirect: 'error'` nicht. Alle ChurchTools-Abrufe verwenden jetzt `manual`, prüfen Status und folgen keinem Redirect. Kein Abschwächen des Token-/Origin-Schutzes.
- Gruppen nutzen höchstens 30 Minuten frischen Cache. Jeder fehlgeschlagene Refresh (auch Typabfrage) löscht den alten Gruppencache; kein stale-if-error für Gruppen. Dies wurde nach unabhängigem Review zusätzlich abgesichert.
- Datenabhängiges HTML ist `no-store`; Suchbegriffe fließen nicht in die API-Abfragen oder Cache-Schlüssel. Optionales Enddatum wird auch beim Lesen des frischen Caches erneut geprüft.

## Prüfung

Bereits bestanden: Modelltests mit synthetischen Daten, Format/Lint, Astro/TypeScript und Build, vollständige Browserprüfung ohne Zugangsdaten. Die Live-Prüfung deckte zusätzlich den Worker-Redirectfehler, eine fehlende Navigationswartezeit im No-JS-Suchtest und die intrinsische Mindestbreite langer Gruppennamen bei 200%-Text auf; diese sind korrigiert.

Final bestanden:

- `pnpm quality`: 22 Tests, Format/Lint, Astro/TypeScript (0 Fehler/0 Warnungen), Build/Worker-Grenzen. Log: `/tmp/akg-groups-final-quality.log`.
- `EXPECT_LIVE_CHURCHTOOLS=1 pnpm test:preview`: echter Worker mit realen Daten, HTTP-Status/Header/Asset-Grenzen und zwölf Routen × 320/390/768/1024/1440 px. Keine automatisierten axe-Befunde, Clientfehler oder Drittanbieter-Browserrequests. Tastatur, No-JS-Teaser/Suche/Nulltreffer, native Details, ehrliche Zustände bei fehlenden Zusatzangaben, Foto-Viewer, Reduced Motion und 200%-Text bestanden. Log: `/tmp/akg-groups-final-live-preview.log`.
- Exakter Tokenvergleich über 357 nicht ignorierte Repositorydateien und 71 generierte Nicht-Geheimnisdateien: kein Treffer. Token auch nicht im gerenderten Angebot-HTML. Dies ist kein allgemeiner Secret-Scanner. Root-/generierte `.dev.vars` waren ignoriert und Modus 0600; ihre HTTP-Pfade lieferten 404. Nach dem Test wurden beide temporären Geheimnisdateien entfernt.
- Sichtprüfung aller finalen Startseiten- und Angebotsaufnahmen bei 390/768/1440 px, einschließlich geöffneter Details. Keine sichtbaren Überlagerungen oder horizontalen Überläufe. Redundante zweite Angebotsüberschrift entfernt, sodass die erste Gruppe früher sichtbar wird.
- Source-Taste-Lint: 0 FAIL/0 WARN. Homepage-Inspector zunächst 1 FAIL (`emoji` in echten News). Mit ausdrücklich dokumentierten Ausnahmen `eyebrow,focal-point,emoji`: **0 FAIL/2 WARN**. Keine Quellinhalte entfernt, nur um den Zähler zu senken.
- `git diff --check` bestanden.

Bildnachweis: `.taste-skill/groups-home-reviewed/` (sieben Bilder), `.taste-skill/groups-final/` (sechs Angebotsbilder). Logs: `/tmp/akg-groups-final-inspect-reviewed.log`, `/tmp/akg-groups-final-lint.log`. Der unabhängige Code-Review führte zur zusätzlichen Absicherung gegen veraltete Gruppen nach Typabfragefehlern; Regression enthalten.

## Visuelle Grenzen

Die vom Nutzer bevorzugte kleine H1 und halbe Fotobreite bleiben unverändert (`focal-point`-Ausnahme); echte Bildunterschriften/Datumsmetadaten bleiben erhalten (`eyebrow`). Die neue `emoji`-Ausnahme betrifft vorhandene News-Titel aus ChurchTools, keine hinzugefügte Dekoration. Im Linux-Testbrowser fehlen einzelne Emoji-Glyphen; die ursprünglichen Zeichen werden nicht redaktionell verändert. Markdown-Markierungen in Quellbeschreibungen bleiben derzeit sichtbar, da das vorhandene Modell absichtlich nur Plaintext ausgibt, kein Rich-Text-Rendering.

Die zwei Warnungen `no-footage`/`still-page` bleiben bewusst: kein sachfremdes Video und keine zusätzliche Bewegung für Listen/Accordion. Bestehende Entrances/Fotointeraktion sowie reduzierter Bewegungsmodus funktionieren. Keine neue Art Direction, neue Bildquelle oder neue numerische Designbewertung; die historische 7,4/10-Bewertung wird nicht als neue Abnahme ausgegeben.

AKG-74 muss weiterhin Aktualität, Kontaktwege, Termine und die fachlich freigegebene Auswahl klären; ein öffentlich lesbarer Gruppenname allein ist keine Eignungsentscheidung.

Kein Commit, Push, Merge, Deployment, DNS-/Rechtewechsel oder Ticket-Abschluss. Safari/Firefox, echte Screenreader/Geräte und die öffentliche Betriebsumgebung sind nicht geprüft.
