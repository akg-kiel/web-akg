# Impeccable · Sol · AKG-129

## Auftrag und Skill-Verwendung

- Ausschließlich Design-Skill `.pi/skills/impeccable/SKILL.md` (vollständig gelesen), dazu verbindlicher Projekt-/Sicherheitsvertrag.
- Gemeinsamen Brief `docs/design-exploration-brief.md` vollständig gelesen; Brand-Spec, Fotos, Site-Ziele, Migrationsinventar und bestehende Startseite/CSS als Bestandswahrheit geprüft.
- `context.mjs --target public/entwuerfe/impeccable/sol/1.html` einmal im Projektverzeichnis ausgeführt. Ergebnis: vorhandene visuelle Identität, kein globales PRODUCT.md, manueller Detector erforderlich.
- Referenzen: `reference/init.md`, `reference/new-work.md`; vor UI-Implementierung `reference/craft-floor.md`.
- Produktkontext liegt ausschließlich in `PRODUCT.md` dieses Verzeichnisses. Keine globale Produkt-/Design-Datei, Konfiguration oder Skill-Datei verändert.
- Nutzer hat ausdrücklich alle fünf vollständigen Entwürfe und Arbeiten ohne weitere Rückfragen/Checkpoints beauftragt. Deshalb keine Auswahlseite, Comp-Generierung oder Rückfrage; Code-first für diese statischen Entwürfe. Keine Bilder beschafft/generiert. Keine Unteragenten; zentrale Screenshots, unabhängige visuelle Prüfung und Full Quality bleiben beim Parent. Diese ausdrücklichen Grenzen ersetzen widersprechende Skill-Standardabläufe.

## Surface-Brief und Ableitung vor Code

Modus: **Persuade**. Besuchserfolg: Eine persönliche Einladung verstehen, Gemeinde kennenlernen wählen können und Gottesdienste unmittelbar erreichen. Alltagsszene: Menschen lesen die Seite unterwegs auf dem Telefon oder zu Hause am größeren Bildschirm; helle Flächen und klare kontrastreiche Typografie passen zu beiden. Beweis sind reale Archivfotos, keine erfundenen aktuellen Meldungen.

Die Marke bleibt fest; die Exploration ersetzt nicht das produktive Erscheinungsbild. Sieben strukturelle Kandidaten aus vertrauten Begegnungs-/Orientierungsformen:

1. **Offene Runde** – das persönliche Gespräch: asymmetrischer Fotoauftakt, Einladung und anschließende thematische Begegnungen.
2. **Dein Weg zur AKG** – ein klarer Wegweiser: Besuchsabsicht und große Sprungziele vor dem inhaltlichen Rundgang.
3. **Gemeinde in Bildern** – ein aufgeschlagenes Fotoheft: bildbreiter Gottesdienstauftakt, zweispaltige Gemeindegeschichte und Café-Übergang.
4. **Raum für Fragen** – der ruhige Gesprächsbeginn: zentrierte Einladung, lesbare Fragen als native Details und großzügige Bildpausen.
5. **Mittendrin** – eine offene Raumfolge: seitliche Orientierung, kräftige blaue Inhaltsbühne und wechselnde Kapitel ohne Kartenraster.
6. **Gemeinsamer Faden** – ein durchlaufender linearer Lesepfad zwischen schmalem Text und abwechselnden Fotos.
7. **Erst einmal umsehen** – ein bildgeführter Rundgang mit abschnittsweiser kontextueller Navigation.

Die ersten fünf bilden die ausdrücklich bestellte vollständige Serie; keine Selbstrangliste im Manifest. `concept-seed.mjs --scope surface --mode persuade --candidate-count 7` wurde aus dem eigenen Verzeichnis mit dortigem Produktkontext ausgeführt. Ergebnis: Seed `d81ff026`, API-Katalog, gezogene Strukturen 6/1/4. Der ausdrückliche Auftrag für fünf fertige Vorschläge hat Vorrang vor der vorgeschlagenen Drei-Karten-Auswahl. Vollständige Ausgabe: `concept-seed.txt`. Die fremden Welten (Tintenbecken, Oszilloskop, Saul-Bass-Titel, Character Sheet, Wolkenbruch, Schnittmuster) wurden nicht als Ersatz für die gebundene Markenwelt übernommen; sie ändern weder Palette, Schrift noch native Navigation. Jeder Entwurf enthält einen eigenen THESIS/OWN-WORLD/STORY/FIRST VIEWPORT/FORM-Vertrag im Body-Kommentar.

## Ausgeführte Checks

### Reproduzierbarer Eigencheck

```sh
node public/entwuerfe/impeccable/sol/check.mjs
# Optional mit lokalen Fullpage-Captures:
AKG_QA_SCREENSHOTS=1 node public/entwuerfe/impeccable/sol/check.mjs
```

Der Check nutzt ausschließlich vorhandenes Node, Node-Standardbibliotheken und das vorhandene Chromium unter `/ms-playwright/chromium-1248/chrome-linux-arm64/chrome`; alternativ `CHROME_BIN`. Keine Installation, keine Abhängigkeiten. Er startet einen kurzlebigen lokalen Assetserver und einen eigenen Headless-Browser, schließt beides anschließend und schreibt nur in dieses Verzeichnis sowie einen eindeutig benannten `/tmp`-Ordner.

**Finaler Lauf erfolgreich, Exit 0.** Ergebnisdaten in `checks-report.json`:

- Fünf eigenständige HTML-Dokumente und Manifest mit genau fünf unterschiedlichen vollständigen Einträgen.
- Doctype, Deutsch, noindex/nofollow, je ein Main/H1, jeweils vier Fotos, Quellen-/Archivtexte, Frank-Lönne-Credit, lokale Font-/Bilddateien und deren Existenz.
- Keine Scripts, Frames, Formulare oder leeren `href="#"`-Links.
- 30 echte Chromium-Viewportprüfungen: alle fünf Seiten bei **320/375/390/414/768/1440 px**.
- Keine horizontale Überbreite oder aus dem Viewport ragenden sichtbaren Elemente, keine fehlenden oder verzerrten Bilder, keine gebrochenen Sprungziele oder doppelten IDs.
- Alle sichtbaren Links und Summaries mindestens 44 × 44 px. Figtree geladen; keine fremden Ressourcen in den gemessenen Seitenrequests.
- Tatsächliche Tastatureingabe bei 390 px: Skip-Link und Ziel-Fokus sowie natives Menü öffnen → erster Navigationslink per Tab → schließen auf allen fünf Seiten. Native Fragen in 2 und 4 per Enter umgeschaltet.
- Kontrastberechnung für wiederverwendete Textpaare: Ink/Weiß **11,81:1**, Ink/Hellblau **10,50:1**, Muted/Hellblau **5,67:1**, Blau/Weiß **5,77:1**.
- `node --check .../check.mjs` erfolgreich.

### Begrenzte Sichtprüfung

Zwei vollständige eigene Screenshotrunden bei 390 und 1440 px; alle zehn Captures je Runde geöffnet. Korrekturbatch: unglückliche Worttrennung in Entwurf 5 entfernt, mobile Foto-/Dokumentreihenfolge in 3 und 5 angeglichen. Finale zehn Fullpage-PNGs: `/tmp/akg129-impeccable-sol-qa-1Xuauu/{1..5}-{390,1440}.png`; genaue Liste ebenfalls im Report. Keine weiteren UI-Polierrunden danach.

Die ersten Testinfrastrukturversuche enthielten eine fehlende Enter-Zeicheninjektion, einen Profil-Cleanup-Race und vorübergehende Chromium-Startprobleme. Diese wurden nicht als Seitenmängel oder erfolgreiche Abschlussläufe gewertet; der finale vollständige Lauf ist separat erfolgreich. Die Browserprüfung ist eine eigene begrenzte Implementierungsprüfung, keine unabhängige Designabnahme.

### Impeccable-Detector

`node .pi/skills/impeccable/scripts/detect.mjs --json public/entwuerfe/impeccable/sol/{1,2,3,4,5}.html` genau einmal ausgeführt. `detector-report.json` enthält `[]`. **Wichtig:** Der Detector meldete DEGRADED, weil htmlparser2/css-select/css-tree/domutils fehlen. Er lief nur regexbasiert; CSS-Selektoren, Custom Properties und berechnete Kontraste wurden von ihm nicht ausgewertet. Kein vollwertiger grüner Detector-Befund behauptet. Keine Pakete nachinstalliert.

## Dokumentation, Provenienz und Grenzen

- `PRODUCT.md` und `DESIGN.md` dokumentieren nur diesen Vergleichsordner. Manuell im eigenen Kontext statt Skill-Unteragenten, weil der Auftrag Unteragenten ausdrücklich untersagt. Kein Root-/gemeinsames Produkt-, Design-, Konfigurations- oder Skill-Artefakt verändert.
- Alle Bilddateien bleiben bestehende freigegebene Assets. Keine Rasterdatei erzeugt oder ersetzt; Originalquellen/Archivkennzeichnungen stehen unter jedem Foto. Keine neue offene Lizenz behauptet.
- Keine aktuellen ChurchTools-Daten, Uhrzeiten, Gruppenlisten, Kontaktdaten oder Rechtstexte erfunden. Café extern gekennzeichnet, keine Konzertadresse geraten.
- Keine externen Quellenlink-Ziele live abgerufen und keine HTTP-Erreichbarkeit der produktiven Unterseiten behauptet; Zielrouten stammen aus dem bestätigten `src/lib/site.ts`/Brief.
- Keine axe-Prüfung, Safari-/Firefoxprüfung, physischen Geräte, Screenreaderprüfung oder 200-%-Textprüfung ausgeführt. Keine vollständige HTML-/WCAG-Zertifizierung behauptet.
- **Parent übernimmt** zentrale Galerie, zentrale Vorschau-Screenshots, unabhängige visuelle Abnahme und vollständiges Repository-Quality-Gate. `pnpm quality` wurde hier bewusst nicht ausgeführt.
- Kein Commit, Push, Merge, Deploy, Linear-Eingriff, T3-Preview-Tab oder fachlicher Freigabe-/Launchabschluss.

**Übergabestand:** Alle fünf Vorschläge vollständig implementiert und im genannten Eigencheck geprüft; bereit für den zentralen Vergleich, nicht fachlich oder für einen Launch abgenommen.
