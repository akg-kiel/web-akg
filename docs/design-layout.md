# AKG-129 · Layoutqualität bei bekannter Gestaltung

## Nutzerziel und Begrenzung

Der Nutzer findet Farben und Schriften grundsätzlich gut und möchte vernünftige Layouts. Die vorherige Interpretation, eine neue Markenwelt sei nötig, war falsch. Deshalb ein einzelner neuer Layoutentwurf mit Figtree, Blau/Weiß/Ink, Original-Logo und den vorhandenen Stock-Symbolfotos. Keine weitere Palette, Fontauswahl, 50er-Serie oder Umsetzung der drei Referenzwelten.

Datei: `public/entwuerfe/layout/1.html`. Unter den vorhandenen Projektservern erreichbar als `/entwuerfe/layout/1.html`. Die Anwendung unter `src/`, alle 50 ursprünglichen Designs, zwei Stock-v0 und die Referenztafel bleiben unverändert erhalten. Kein Commit, Push, Merge, Deploy oder Issue-Abschluss für diese Runde.

## Warum diese Komposition

Am Ausgangspunkt wurden drei Probleme priorisiert: ein immer ähnlicher Begrüßungs-Zweispalter, gleich gewichtete oder zu weit auseinandergezogene Abschnitte und fehlende Verbindung zwischen Bild, Willkommen und den konkreten Besuchswegen.

- **Ein zusammenhängender Einstieg:** Ein gemeinsames breites Fotofeld, über dessen untere linke Kante sich der weiße Willkommensbereich legt. Bild und Inhalt bilden eine Komposition statt zweier unabhängiger Hero-Spalten.
- **Gewichtung statt Gleichförmigkeit:** Der primäre Weg ist „Gemeinde kennenlernen“. Der Gottesdienst-Zugang ist rechts als kleinerer Servicebereich erreichbar, Kontakt sekundär.
- **Ein belastbares Raster:** Maximal 1280 px Inhalt, konsistente Außenränder; Auftakt auf zwölf Spalten, anschließend bewusst 7/5- und 5/7-Gewichtungen. Gemeinsame Kanten verbinden die unterschiedlichen Abschnitte.
- **Inhalte mit unterschiedlichen Rollen:** Gemeindeleben bekommt eine bildbetonte Fläche und einen klaren Gruppen-Zugang; Aktuelles/Kontakt einen kompakten Informationsbereich; Dreimaster einen eigenen externen Abzweig statt vorgetäuschter Integration.
- **Mobil neu angeordnet:** Kein überlagerter schmaler Desktop-Zweispalter. Bild, Kennzeichnung und Willkommen stehen nacheinander; der Hauptlink wird vollbreit. Gottesdienste bleiben vor dem weiteren Gemeindeleben auffindbar. Natives Menü ohne JavaScript.

Design Read: öffentlicher Homepage-Layoutentwurf, Redesign der Komposition bei beibehaltener visueller Basis. Varianz 6, Bewegung 1, Dichte 5, Assets 7, Markenbindung 9. Die Zahlen beschreiben Entscheidungen, keine Qualitätsbewertung. Die einzige Bewegung ist unmittelbares Linkfeedback mit Reduced-Motion-Fallback.

Gleiche Textgrundlage und bekannte Typo/Farben sollen helfen, tatsächlich den Aufbau zu beurteilen. Die Gestaltung ist weiterhin eine Hypothese zur Nutzerentscheidung, nicht als gestalterisch abgenommen ausgegeben.

## Inhalte und Bilder

Bestehende Routen `/gottesdienste`, `/aktuelles`, `/angebote`, `/gemeinde`, `/kontakt` und der externe Dreimaster-Link bleiben erhalten. Die ergänzenden Impressum-/Datenschutz-Links führen nur zu den vorhandenen Routen; kein neuer Rechtstext.

Keine erfundenen Termine, Newsartikel, Personen, Zitate, Gruppen oder Kontakte. Aktuelles ist hier ein Besuchsweg, kein Fake-Newsfeed. Es gibt keine neuen ChurchTools-Requests oder Freigabeänderungen.

Die zwei Fotos stammen aus der bereits dokumentierten Pexels-Auswahl, nicht aus AKG-Veranstaltungen. Quelle/Lizenz: `public/entwuerfe/neu/stock/credits.json`. Die Originaldateien bleiben unverändert; der Desktop-Bildausschnitt verwendet `object-fit: cover`, mobil wird das zweite Bild vollständig proportional gezeigt. Logo ungefiltert, unbeschnitten und auf Weiß. Kein Font-/Image-Hotlink.

## Wiederholbare Prüfung und Ausgabe

```sh
node scripts/design-revision-browser.mjs --layout
node scripts/design-revision-browser.mjs
node scripts/design-gallery-browser.mjs --gallery-only
pnpm exec vp run quality
git diff --check
```

Der bestehende Browsercheck und Exporter wurden um `--layout` ergänzt statt neue Viewer-/Test-Infrastruktur aufzubauen. Ohne Schalter bleibt das bisherige Verhalten erhalten. `node scripts/export-design-gallery.mjs --layout` erzeugt `/tmp/akg-layout.html` und `/tmp/akg-layout-inline.html`; die vollständige Seitenvorschau öffnet die vorhandene Desktop-/Mobilsteuerung. Das Motivmaterial wird für die portable Ansicht verkleinert, die Originaldateien bleiben unverändert.

Tatsächlich geprüft: 320/390/768/1440 px, Skip-Link-Fokus, natives mobiles Menü, Überschriften, Bildproportionen, Überlauf und axe bei 390/1440 px ohne gemeldete Verletzungen. Bewusste Cover-Bildausschnitte werden nicht fälschlich als Verzerrung bewertet. Beide portablen Dateien samt Öffnen, 390-px-Vorschau und Escape geprüft; keine externen Ressourcenrequests oder JavaScript-Seitenfehler. Desktop- und Mobil-Ganzseite visuell angesehen. Nachweise: `/tmp/akg-layout-qa/`.

Zusätzlich die beiden Stock-v0 und die ursprünglichen Galerie-Steuerungs-/Exportchecks erneut bestanden. Full Quality: 38 Tests, Format/Lint, Astro, Build und Cloudflare-Grenzen bestanden; `git diff --check` sauber.

Offen: tatsächliches Nutzerurteil, reale Geräte, Safari/Firefox und Screenreader, abschließende Medien-/Rechts-/Inhaltsfreigabe. Kein vollständiger WCAG- oder Launch-Nachweis.
