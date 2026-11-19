# Der neue Besuchsweg in Chromium

Aufnahmen des tatsächlichen Astro-/Worker-Builds ohne Live-Token. Die WebP-Dateien sind aus den Browser-Screenshots verkleinert, keine Mockups.

| Besuchsaufgabe                                             | Ansicht                                                                       |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Gemeinde erkennen und zum ersten Besuch gelangen           | [Startseite auf 1440 px](start-desktop.webp) · [auf 390 px](start-mobil.webp) |
| Vor dem Losgehen Gottesdienst, Ort und Gemeindebüro finden | [Erster Besuch auf 390 px](besuch-mobil.webp)                                 |
| Ohne veröffentlichte Termine weiterkommen                  | [Gottesdienste auf 1440 px](gottesdienste.webp)                               |
| Gemeindetermine vom externen Konzertprogramm unterscheiden | [Petruskirche auf 390 px](ortsprofil.webp)                                    |

Bei der Sichtprüfung standen nicht die früheren Entwürfe, sondern die Wege zwischen den Seiten im Vordergrund. So bekam der Besuchsweg einen direkten Verweis auf die Gemeindeorte; in der Vorschau führen klar beschriftete Links auch zu den Angaben auf der aktuellen Website. Ein Bildquellenlink ist bedienbar, das Foto selbst kein versteckter Button. Nach dem Sprung zum Hauptinhalt ist die erste Aktion der Besuchsweg und nicht der Fotografennachweis.

`pnpm exec vp run test:preview` prüft die Hauptwege mit und ohne JavaScript, bei Bildausfall und vergrößerter Schrift. Der getrennte Fixture-Build prüft auch gefüllte Listen, Detailseiten und den Unterschied zwischen gesperrten, leeren, nicht erreichbaren und veralteten Quellen. Diese Daten landen nicht in der Vorschau.
