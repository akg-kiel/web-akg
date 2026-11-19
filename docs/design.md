# Gemeindebrief · Website AKG

**AKG-130.** Eine Website für Menschen, die die Gemeinde besuchen oder bereits dazugehören. Einladend wie ein Brief aus Kiel, praktisch wie sein Terminblatt. Die [Produktgrenzen](../PRODUCT.md) gelten für jede Seite. Die [vorherige Begegnungen-Fassung](design-begegnungen.md) und die Entwurfsgalerie sind Designgeschichte.

## Die Gestaltungsentscheidung

Der Einstieg zeigt ein tatsächliches Gespräch auf dem Gemeindefest 2022 – kein allgemeines Kirchenmotiv und keine erfundene heutige Veranstaltung. Ein Foto im Papierrahmen mit gezeichnetem Kieler Poststempel trägt die Startseite. Titel und Aktionen stehen auf einer eigenen Fläche statt auf dem Foto. Erst kommen Gottesdienste und Gemeinde, danach Gruppen, Kontakt, Meldungen und Café. Zum Konzertprogramm führt ein nachgeordneter externer Verweis; es ist kein Hauptmenüpunkt. Für die angekündigte Gebäudeseite gibt es bewusst keinen vorläufigen Link.

- Original-Logo auf Weiß. Lokal geladene Figtree für Navigation, Lesetext und Daten; Source Serif 4 für Überschriften, Kursivschrift sparsam als zweite Stimme der Startseite. Ink und Aktionsblau bleiben der Marke zugeordnet, warme Papierflächen rahmen die Fotos. Quellen und Lizenzen: [Marke und Medien](brand-spec.md).
- Inhaltsseiten nutzen denselben Satzspiegel: Titel und kurze Einführung, dann eine Hauptspalte und bei Bedarf eine Randspalte. Archiveinordnung und Nachweis stehen am jeweiligen Foto; die Fotos sind keine Bedienelemente. Listen lassen ihre Einträge über Regeln und Überschriften scannen und brauchen kein Kartenraster.
- Mobil stehen Einladung und erster nutzbarer Link vor dem Foto. Menü und Gruppen funktionieren ohne JavaScript. Beim Öffnen eines externen Links wird kein Fenster erzwungen. Tastaturfokus, weniger Bewegung und Textvergrößerung sind keine getrennten Ansichten.
- `src/styles/globals.css`: Schrift, Farben, Layout und gemeinsame Bedienelemente; `edition.css`: Startseitenkomposition; `inside.css`: Inhalte, Listen und Zustände. Keine Änderung an Stack, Worker oder ChurchTools-Abfragen. Fehlende, gesperrte und veraltete Daten werden nicht durch Beispieldaten ersetzt.

## Wie Impeccable verwendet wurde

Die [offizielle Arbeitsanleitung](https://impeccable.style/designing/) unterscheidet Produktkontext (`init`), visuelles System (`document`), Gestaltung und nachgelagerte Kritik. [Critique](https://impeccable.style/docs/critique/) liefert Befunde, keine automatische Freigabe. Impeccable ist hier ein Arbeitswerkzeug, kein CSS-Framework und keine Abhängigkeit der ausgelieferten Seite.

Für diesen Auftrag: installierte Skill-Fassung 4.1.2, Modus _Persuade_ für die Einladung, codebasierte Umsetzung. Kontext und Entwurfsanleitung wurden gegen Bestand, Nutzerauftrag und Migrationsinventar gelesen. Der vom Nutzer delegierten Richtungsentscheidung folgten ein Renderdurchgang, unabhängige Kritik an den Screenshots, gebündelte Korrekturen und die Prüfung der tatsächlichen Bedienwege. Keine vom Menschen abgenommenen Mockups und kein vollständiger formaler Impeccable-Audit werden behauptet.

Prüfbefehle: `pnpm exec vp run quality` und anschließend `pnpm exec vp run test:preview` in der Projektumgebung. Die zweite Aufgabe schreibt Screenshots und Browserberichte außerhalb des Repositorys. Sie prüft den normalen Worker-Build getrennt von einer wegwerfbaren Kopie mit synthetischen Terminen, Gruppen, Meldungen und Quellenzuständen.
