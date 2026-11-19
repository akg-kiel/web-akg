# Der neue Besuchsweg in Chromium

Aufnahmen des tatsächlichen Astro-/Worker-Builds ohne Live-Token. Die WebP-Dateien sind aus den Browser-Screenshots verkleinert, keine Mockups.

| Besuchsaufgabe                                             | Ansicht                                                                       |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Gemeinde erkennen und zum ersten Besuch gelangen           | [Startseite auf 1440 px](start-desktop.webp) · [auf 390 px](start-mobil.webp) |
| Vor dem Losgehen Gottesdienst, Ort und Gemeindebüro finden | [Erster Besuch auf 390 px](besuch-mobil.webp)                                 |
| Ohne veröffentlichte Termine weiterkommen                  | [Gottesdienste auf 1440 px](gottesdienste.webp)                               |
| Gemeindetermine vom externen Konzertprogramm unterscheiden | [Petruskirche auf 390 px](ortsprofil.webp)                                    |

Bei der Sichtprüfung standen nicht die früheren Entwürfe, sondern die Wege zwischen den Seiten im Vordergrund. So bekam der Besuchsweg einen direkten Verweis auf die Gemeindeorte; in der Vorschau führen klar beschriftete Links auch zu den Angaben auf der aktuellen Website. Ein Bildquellenlink ist bedienbar, das Foto selbst kein versteckter Button. Nach dem Sprung zum Hauptinhalt ist die erste Aktion der Besuchsweg und nicht der Fotografennachweis.

Nach der Farbrückmeldung führen das gemessene Logo-Blau und seine Abstufungen durch die Seiten; Mint und Gelb bleiben als Akzente. Die Kontraste liegen bei 5,80:1 für Weiß auf Logo-Blau, 4,81:1 für Logo-Blau auf Mint und 7,75:1 für Gelb auf Dunkelblau.

Die Schlussprüfung zeigte, dass das aufgeklappte mobile Menü ohne JavaScript den nächsten Tastaturfokus verdeckte. Es schiebt den Inhalt jetzt nach unten; der Browsertest tabbt bis zum Link „Startseite“ hinter dem Menü und prüft, dass er nicht verdeckt ist. Im befüllten Test findet die Gruppensuche auch den vollständigen angezeigten Namen mit einem Zeilenumbruch in der Quelle. Ein lokaler Worker-Test rendert den Besuchsweg, Kontakt und Spenden für beide künftigen Produktionshosts, ohne die heutige Website aufzurufen: Die temporären Verweise sind dort nicht vorhanden.

`pnpm exec vp run test:preview` prüft die Hauptwege mit und ohne JavaScript, bei Bildausfall und vergrößerter Schrift. Der getrennte Fixture-Build prüft auch gefüllte Listen, Detailseiten und den Unterschied zwischen gesperrten, leeren, nicht erreichbaren und veralteten Quellen. Diese Daten landen nicht in der Vorschau.
