# Sichtprüfung des Gemeindebriefs

Aufnahmen mit Chromium vom lokalen Astro-/Worker-Build, ohne Live-Token. Kein Mockup. Die PNG-Originale entstehen bei `pnpm exec vp run test:preview`; die hier verlinkten WebP-Kopien sind für die PR-Ansicht verkleinert.

| Geprüfter Weg                                              | Aufnahme                                                                |
| ---------------------------------------------------------- | ----------------------------------------------------------------------- |
| Einstieg und Reihenfolge der Besuchswege                   | [Startseite · 1440 px](start-desktop.webp) · [390 px](start-mobil.webp) |
| Ohne veröffentlichte Termine einen nächsten Schritt finden | [Gottesdienste · 1440 px](gottesdienste.webp)                           |
| Gemeindetermine und externes Konzertprogramm unterscheiden | [Petruskirche · 390 px](ortsprofil.webp)                                |

In der ersten Runde lief die Chronik bei 320 px und 200 % Schrift über die Seite. Die Jahreszahlen und Beschreibungen dürfen jetzt untereinander stehen. Die unabhängige Sichtkritik führte außerdem zu einem lesbaren mobilen Gemeindenamen, einem internen Ausweg bei fehlenden Gottesdienstterminen und präziseren Verweisen auf Meldungen und Termine. Die kontrollierte Vergrößerungsansicht zeigte eine Kollision zwischen Logo und Menü; bei sehr wenig Platz bekommt das Menü eine eigene Zeile. Das Browser-Gate prüft die Kollision zusätzlich zum horizontalen Überlauf.

Die hier gezeigten Freigabehinweise sind Teil des Entwurfs. Gefüllte Ansichten und leere, gesperrte, nicht erreichbare und veraltete Quellen werden separat im Wegwerf-Build getestet; die Beispiele sind keine Gemeindedaten.
