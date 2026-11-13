# AKG-129 · Design Better Websites · Astra

Gestaltungsexploration für Website AKG, Milestone 3. Kein fachlicher, rechtlicher oder produktiver Abschluss.

## Verwendeter Skill und Ausgangspunkt

Ausschließlich `/home/zepi/.pi/agent/skills/design-better-websites/SKILL.md` vollständig gelesen und angewandt. Gemeinsamen Auftrag `docs/design-exploration-brief.md` vollständig gelesen. Gelesene Projektquellen: `src/pages/index.astro`, `src/styles/globals.css`, `docs/design.md`, `docs/brand-spec.md`, `src/lib/photos.mjs`, `src/lib/site.ts`, `docs/migration/README.md`. Vier Personen-/Cafémotive und Original-Logo einzeln gesichtet. Keine anderen Agentenentwürfe gelesen.

Die im Skill genannte optionale Referenz `references/source-map.md` ist in der installierten Skill-Version nicht vorhanden (Leseversuch ENOENT, Verzeichnis geprüft). Keine weiteren Referenzen oder Skripte mitgeliefert. Daher Umsetzung anhand der fünf vollständig vorliegenden Skill-Disziplinen; keine fremden Design-Skills ergänzt, keine neuen Assets oder Abhängigkeiten beschafft.

### Ausgangsaudit – drei Explorationsfragen

1. **Layout / Orientierung:** Der aktuelle gleichgewichtige Text-/Bildhero und lineare Abschnittsverlauf zeigen die Gemeinde, unterscheiden aber kaum zwischen persönlichen Besuchsabsichten. Alternative Einstiege testen Geschichte, Orientierung, Ruhe und direktes Miteinander.
2. **Typografie / Rhythmus:** Der vorhandene Auftritt ist bewusst einheitlich. Die Exploration untersucht größere Unterschiede zwischen Einladung, Lesetext und Abschnittswechseln, ohne die lokale Figtree oder die Lesbarkeit aufzugeben.
3. **Conversion / ehrliche Inhalte:** Aktuelle Daten sind für diese Entwürfe nicht freigegeben. Gemeinde kennenlernen bleibt die Hauptaktion; Gottesdienste sind sofort erreichbar. Historische Fotos sind echte Einblicke, aber keine aktuellen Termine oder Personenprofile. Fehlende Meldungen werden knapp und transparent benannt statt durch erfundene Nachrichten ersetzt.

Dies ist ein Quellcode-/Assetaudit, keine behauptete Browserabnahme des produktiven Ausgangsdesigns.

## Fünf Designkonzepte vor Umsetzung

### 1 · Offene Einladung

- Persönlich, großzügig, klar. Hellblau als Einladung, Weiß als Leseraum, Aktionsblau für den nächsten Schritt.
- Figtree 650 für Titel, 450 für Text; ruhige fluid skalierte Überschriften.
- Asymmetrischer Willkommensbereich mit Gesprächsfoto; anschließend ein schmaler Orientierungsstreifen und weit gesetzte Bild-/Textabschnitte.
- Primärer Weg: Einladung → Gemeinde kennenlernen; sekundär Gottesdienst → Angebote → Café → Aktuelles/Kontakt.

### 2 · Gemeindejournal

- Redaktionell, menschlich, einladend. Weiße Grundfläche, kräftige blaue Typografie, hellblauer Lesekasten.
- Figtree mit großen, eng gesetzten Überschriften und kompakteren Bildunterschriften; sichtbare redaktionelle Hierarchie statt Kachelwand.
- Breiter Titelkopf, darunter Zeitungs-Doppelseite mit großem Gesprächsbild und kurzem Inhaltswegweiser; Gemeindefest als erzählerischer Einstieg, Gottesdienst und Café als unterschiedliche Rubriken.
- Primärer Weg: Menschen und Miteinander entdecken → Gemeinde kennenlernen; die fünf Hauptziele bleiben direkt erreichbar.

### 3 · Dein erster Schritt

- Ein orientierender, niedrigschwelliger Start für Menschen, die sich erst einmal umsehen möchten.
- Figtree mit kräftigen, gut lesbaren Handlungszeilen; ruhige Absätze. Blau für die persönliche Begrüßung, Weiß für Auswahl und Inhalt.
- Geteilte Einstiegsfläche mit Willkommensbotschaft und großen beschrifteten Wegen. Danach ein flacher Fotobogen, Gottesdienst mit nativen Details, Gemeindebericht und Café.
- Primärer Weg: Gemeinde kennenlernen; alternative Sprungziele ordnen vorhandene Inhalte, ohne Gruppen oder Besuchszusagen zu erfinden.

### 4 · Zeit füreinander

- Ruhig, luftig, auf Glauben und Begegnung konzentriert; keine monumentale Architektur und kein Bildtext-Scrim.
- Figtree in leichteren, aber kontraststarken Titelgewichten; kurze mittige Textmaße, großzügiger Zeilenrhythmus.
- Zentrierte Einladung, unterschiedliche proportionale Fotos als Doppelbild, schmaler Gottesdienst-Leseraum, dann gemeinschaftlicher Bild-/Textwechsel und Café.
- Primärer Weg: in Ruhe ankommen → Gemeinde kennenlernen; Gottesdienste stehen gleich daneben.

### 5 · Mitten im Miteinander

- Mutiger blau-weißer Gemeindeauftritt mit plakativem Typorhythmus, aber unverändertem Original-Logo.
- Figtree 750 für große Einladungen, 450 für Inhalte. Breite blaue Flächen kontrastieren mit weißen Fotoseiten.
- Desktop: eigenständige linke Navigationsspalte neben einer Abfolge verschieden großer Inhaltsflächen. Mobil: normaler Header und lineare, vollständig sichtbare Inhalte. Kein Scroll-Hijacking.
- Primärer Weg: unmittelbare Einladung → Gemeinde kennenlernen; Gemeindeleben vor Gottesdienst und Café.

## Gemeinsame technische und inhaltliche Leitplanken

Eigenständige HTML-Dateien mit Inline-CSS, lokaler Figtree, Original-Logo, genau einem H1/main, Skip-Link, sichtbaren Fokusmarkierungen, nativer Navigation und ohne JavaScript. Alle Fotos proportional, ohne zusätzliche Ausschnitte oder Filter; Quellenlinks und Archiv-/2022-Kennzeichnungen bei jedem Foto. Keine externen Laufzeitressourcen. Dreimaster als externer Produktwechsel gekennzeichnet. Keine erfundenen aktuellen Datensätze, Kontaktdaten, Konzertadresse oder Rechtstexte. `noindex, nofollow` in jeder Datei.

## Tatsächlich ausgeführte Prüfungen

Parent-Nachtrag: Der Astra-Subagent-Prozess ist nach dem Speichern aller fünf HTML-Dateien, des Manifests, dieses Planungsdokuments und eigener Screenshots unerwartet beendet worden. Eine abgeschlossene Browser-/Finish-Prüfung des Subagenten wird deshalb nicht behauptet.

Der Parent hat `node public/entwuerfe/better-websites/astra/check.mjs` ausgeführt: alle fünf statischen Struktur-/Asset-/Quellen-/Routen-/Manifestprüfungen bestanden, berechnete Textkontraste mindestens 5,13:1. Die bereits vorhandenen Screenshot-Dateien allein belegen keinen erfolgreich abgeschlossenen Browserlauf. Sie wurden aus dem öffentlichen Verzeichnis nach `/tmp/akg-design-gallery-qa/recovered-better-astra/` verschoben. Der zentrale Browserlauf wird separat dokumentiert.

## Bekannte Lücken / Übergabe

- Galerie, zentrale Screenshots und vollständiges Repository-Quality-Gate liegen beim Parent.
- Keine Medien-/Rechts-, Inhalts-, WCAG- oder Launchfreigabe.
- Die nicht mitgelieferte Skill-Referenz konnte nicht gelesen werden; keine Inhalte daraus erfunden.
