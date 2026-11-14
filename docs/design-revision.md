# AKG-129 · Stockfoto-v0 nach Nutzerfeedback

## Anlass und Umfang

Projekt Website AKG, Milestone 3 · MVP: Kernwebsite. Der Nutzer beurteilt den ursprünglichen 50er-Vergleich als zu ähnlich und generisch und lehnt die vorhandenen Projektfotos für die Gestaltung ab. Ausdrücklicher Folgeauftrag: zunächst Stockbilder verwenden, um die Botschaft zu vermitteln.

Zwei additive, bewusst gegensätzliche klickbare Skizzen, keine Neuauflage des Skill-/Modellbenchmarks und keine fertige Website. Die 50 Originalentwürfe, `src/`, das Original-Logo, vorhandene Fotos, Datenfreigaben und Deployment-Konfiguration bleiben unverändert. Für diese Korrekturrunde entfällt die alte Vergleichsvorgabe von 4–6 identischen Inhaltsblöcken. Keine neuen Sachangaben zu Personen, Angeboten, Terminen, Kontakten oder rechtlichen Inhalten.

Vor der Umsetzung wurde der Kontaktbogen unabhängig auf wiederkehrende Seitengrammatik geprüft: typischer Begrüßungshero, Fotos als bloßer Textbeleg und dieselbe Besuchsdramaturgie. Die Revision untersucht deshalb unterschiedliche Besuchsabläufe statt nur andere Oberflächen.

## Zwei Hypothesen

|                 | A · Empfangstafel                                              | B · Ein Platz für dich                                                              |
| --------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Datei           | `public/entwuerfe/neu/empfangstafel.html`                      | `public/entwuerfe/neu/einladung.html`                                               |
| Vorrang         | Bekanntes Anliegen direkt erreichen                            | Erst ein Gefühl für die Einladung gewinnen                                          |
| Nutzung         | Große Besuchswege unmittelbar anklicken                        | Fotografischen Einladungsweg lesen und dann weitergehen                             |
| Silhouette      | Kompaktes dunkles Anliegenfeld und kleineres begleitendes Foto | Großes durchgehendes Foto, ruhige Textpassage, weitere Begegnung, Glaubensabschluss |
| Dichte          | Hoch; die Hauptnavigation ist der Inhalt                       | Niedrig; Bilder tragen die Botschaft                                                |
| Nicht enthalten | Keine lange Folge nachgeschobener Marketingabschnitte          | Kein begrüssender Bild/Text-Zweispalter im Einstieg, kein Kachelraster              |

Design Read: additive Overhaul-Skizzen für Erstbesuchende und bekannte Gemeindeinteressierte. Gemeinsame Invarianten sind Original-Logo auf hellem Grund, lokale Figtree, Blau/Weiß/Ink, reale bestehende Zielrouten, Semantik, Tastaturbedienung und noindex. A setzt Informationsdichte 8 und Assetabhängigkeit 4; B Dichte 3 und Assetabhängigkeit 9. Beide bleiben in Bewegung 1: nur unmittelbares Interaktionsfeedback, kein dekoratives Scrolltheater. Die unterschiedlichen Seitenlängen sind Teil der Hypothese, keine unterschiedliche Ausarbeitungsstufe.

Die v0 ersetzt keine erneute Nutzerentscheidung: unterschiedliche Silhouetten und fehlerfreie Technik garantieren weder gestalterische Zustimmung noch eine fertige Art Direction.

## Nutzerurteil nach Übergabe

Auch diese beiden v0 wirken dem Nutzer noch zu nah am allerersten Entwurf. **Keine gestalterische Abnahme.** Die technischen Prüfergebnisse unten bleiben als Nachweis dieses verworfenen Zwischenstands erhalten, sind aber kein Qualitätsargument für die visuelle Richtung.

Anschließend ausdrücklich freigegeben: Schrift, Farbwelt, Bildbehandlung und Gesamtstil können vollständig neu gedacht werden; nur das Original-Logo bleibt gestalterisch gesetzt. Zunächst werden echte Referenzwelten abgestimmt, bevor wieder Homepages entstehen. Fortsetzung: [`design-directions/README.md`](design-directions/README.md).

## Neue Bildsprache

Drei einzeln gesichtete Pexels-Motive: ein Gespräch vor einem Café, junge Menschen beim informellen Zusammensein und ein generationenübergreifendes Essen. Keine dieser Aufnahmen wird als AKG-Veranstaltung, als Bild des Café Dreimaster oder als Darstellung tatsächlicher Gemeindemitglieder ausgegeben. Die ursprüngliche Idee zweier zusammengehöriger Archivaufnahmen desselben Gemeindefests wird ausdrücklich nicht mit Stockbildern als vermeintliche Ereignisgeschichte fortgeführt.

Einzige Quellenliste für diese Stockauswahl: [`public/entwuerfe/neu/stock/credits.json`](../public/entwuerfe/neu/stock/credits.json). Dort stehen Fotograf/in, Fototitel, Originalseite, Downloadadresse, Lizenz, Bearbeitung und Nutzungsgrenzen. Keine Bilder per Hotlink, keine Pexels-/Google-Font-Requests zur Laufzeit. Die Symbolfoto-Kennzeichnung und der Quellenlink stehen direkt am jeweiligen Bild. Logo unverändert, Fotos ohne zusätzlichen Beschnitt oder Filter, proportional als WebP 640/1280 px gespeichert.

Die Pexels-Lizenz ist keine CC-Lizenz und keine Garantie über sämtliche Model-/Marken-/sonstigen Drittrechte. Diese Bildwahl ist vorläufig für die Gestaltung, keine pauschale Produktions- oder Rechtsfreigabe.

## Aufruf und Prüfung

Über den lokalen Projektserver:

- `/entwuerfe/neu/empfangstafel.html`
- `/entwuerfe/neu/einladung.html`

In der vorhandenen devenv-Umgebung:

```sh
node scripts/design-revision-browser.mjs
pnpm exec vp run quality
```

Der neue Browsercheck startet und beendet einen privaten Loopback-Testserver, prüft beide Seiten bei 320/390/768/1440 px, Skip-Link-Fokus, natives mobiles Menü, Überschriften, Bildproportionen und Überlauf; axe läuft bei Mobil/Desktop. Er erzeugt zusätzlich zwei echte Vorschaubilder und prüft beide portablen Exporte samt iframe, Navigation, 390-px-Vorschau und Escape. Nachweise: `/tmp/akg-stock-skizzen-qa/`.

Der bestehende Exporter wird mit `node scripts/export-design-gallery.mjs --revision` wiederverwendet. Ausgaben: `/tmp/akg-stock-skizzen.html` und `/tmp/akg-stock-skizzen-inline.html`. Ohne Schalter bleibt er der 50er-Exporter. Die neue portable Auswahl verwendet höher aufgelöste Stockfotos und zeigt zuerst beide Ganzseitensilhouetten im Überblick; Vor/Zurück bzw. die Übersicht wechseln zwischen den beiden Richtungen. Die Skizzen selbst bleiben ohne JavaScript nutzbar, die portable Vergleichssteuerung benötigt JavaScript.

Tatsächlich geprüft: acht responsive Seitenansichten, vier axe-Läufe ohne gemeldete Verletzungen, Tastatur, lokale Bilder/Schrift, keine externen Ressourcenrequests oder Seitenfehler, beide portablen Exporte. Alle vier finalen Mobil-/Desktop-Ganzseitenansichten visuell angesehen. Der ursprüngliche Galerie-Steuerungs-/Exportcheck wurde zusätzlich erneut ausgeführt. Full Quality mit 38 erfolgreichen Tests, Format/Lint, Astro-Prüfung, Build und Cloudflare-Buildgrenzen bestanden.

Offen: Nutzerurteil, Safari/Firefox, reale Mobilgeräte und Screenreader, abschließende Inhalts-/Rechts-/Medienfreigabe. Keine pauschale WCAG-Abnahme. Diese Feedback-Runde wurde noch nicht committed, gepusht, gemergt oder deployt; die bereits gepushte 50er-Galerie bleibt bis zu einem weiteren Push unverändert.
