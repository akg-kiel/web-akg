# AKG-129 · Gemeinsamer Entwurfsauftrag

## Zweck und Vergleich

Der Nutzer möchte fünf eigenständige responsive Startseitenentwürfe pro Skill und Modell: Hallmark, Impeccable, Taste, Design Better Websites, Web Design Engineer × GPT-6 Astra/GPT-6.1 Sol = 50. Jeder Auftrag verwendet nur seinen zugewiesenen Design-Skill (plus verbindliche Projekt-/Sicherheitsregeln), damit die Ergebnisse nicht durch vermischte Skills ununterscheidbar werden. Kein Modellwechsel. Keine Unteragenten. Nutzer hat die Exploration ausdrücklich bestätigt; keine weiteren Design-Checkpoints oder Rückfragen nötig. Es sind bewusst wählbare Gestaltungsvorschläge, keine Änderung der produktiven Website.

## Arbeitsgrenzen

Nur im zugewiesenen Verzeichnis `public/entwuerfe/<skill>/<modell>/` schreiben. Je fünf komplette eigenständige HTML-Dokumente `1.html` bis `5.html`, `manifest.json` und `notes.md`. Keine bestehenden Dateien, Pakete, Lockfiles, Konfiguration, Datenfreigaben, Root-DESIGN.md oder anderen Aufträge bearbeiten. Keine Commits, Pushes, Deployments, Linear-Änderungen oder T3-Preview-Tabs. Andere Agenten arbeiten parallel. Keine pauschalen Format-/Reparaturbefehle über das Repository.

Die fünf Entwürfe müssen unterschiedliche Komposition, Seitenrhythmik, fotografische Gewichtung und Besuchereinstiege haben, nicht derselbe DOM mit anderen Farben. Vergleichbare Ausarbeitung: je ungefähr 4–6 gehaltvolle Abschnitte plus Header/Footer; kein rudimentärer Wireframe. Innerhalb der Marke von ruhig/vertraut bis mutig/eigenständig explorieren. Eigenständige Namen und kurze Unterschiede im Manifest, keine Selbstrangliste.

## Tatsachen und Marke

Projekt Website AKG, Linear AKG-129, Milestone 3 · MVP: Kernwebsite. Aktuelles Ausgangsdesign: `src/pages/index.astro`, `src/styles/globals.css`, `docs/design.md`. Verbindliche Quellen: `docs/brand-spec.md`, `src/lib/photos.mjs`, `src/lib/site.ts`, `docs/migration/README.md`.

- Apostel-Kirchengemeinde Kiel. Menschen und Begegnung sollen den Auftritt tragen, nicht ein monumentaler Gebäudehero.
- Original-Logo `/images/apostel-logo.png`, 500 × 272; unverändert, unverzerrt, unbeschnitten und ohne Filter auf hellem Grund. Keine erfundene neue Wortmarke.
- Lokale Figtree: `/fonts/figtree-latin-variable.woff2`, `@font-face`, font-display: swap. Figtree für die Texte; keine externen Font-/CDN-/Bildrequests. Markenanker Blau/Weiß, Ink #173b50, Aktionsblau #006c9e, helle Fläche #eaf3f7. Flächenproportion, Typohierarchie, Bildanordnung und Rhythmus dürfen bewusst variieren. Keine beige SaaS-Schablone.
- Keine erfundenen Personen, Zitate, Termine/Uhrzeiten, Kontakt-/Spenden-/Rechtsdaten, Öffnungszeiten, Barrierefreiheitszusagen, Statistiken oder ChurchTools-Datensätze. Keine aktuellen Angaben aus Archivfotos ableiten.
- Hauptnavigation inhaltlich Gottesdienste, Aktuelles, Angebote, Gemeinde, Kontakt. Als funktionierende Sprunglinks auf passende Entwurfsabschnitte oder bestehende slashlose reale Routen. Kein href="#" ohne Ziel, keine scheinbar funktionierenden Formulare.
- Café Dreimaster ist separates Produkt: `https://cafe-dreimaster.de/`, als extern kennzeichnen. Konzerte bleiben separates Produkt; keine unbekannte Zieladresse erfinden.

## Gemeinsame Inhaltsbasis

Texte dürfen passend neu formuliert und umgeordnet werden, ohne neue Tatsachen einzuführen:

1. Einladung: „Schön, dass du da bist.“ / „Ob du zum ersten Mal vorbeischaust oder schon lange zur Gemeinde gehörst: Wir freuen uns auf dich.“ Hauptaktion Gemeinde kennenlernen; Gottesdienste direkt erreichbar.
2. Gottesdienst: „Zur Ruhe kommen, gemeinsam glauben, neue Gedanken mitnehmen. Gottesdienst ist eine Einladung – auch mit offenen Fragen.“ Aktuelle Termine sind hier nicht freigegeben, Link zu `/gottesdienste`. Kein gefälschter Terminkalender.
3. Gemeindeleben: „Wir möchten Menschen zusammenbringen – im Gottesdienst, im Gespräch und im Alltag.“ Angebote & Gruppen auf `/angebote`; keine erfundenen Gruppenlisten. Bilder vom Gemeindefest ausdrücklich 2022.
4. Begegnung/Café: „Lerne das Café kennen und finde die aktuellen Informationen für deinen Besuch – auf der Dreimaster-Website.“
5. Aktuelles: Hinweis „Aktuelle Meldungen sind in diesem Entwurf nicht eingebunden.“ und `/aktuelles`; keinen leeren technischen Fehlerblock dominant gestalten. Kontakt/Gemeinde als sichere bestehende Einstiege.
6. Klarer kompakter Footer, Gemeinde, Kontakt, Entwurfskennzeichnung; keine neue Rechtsabschrift.

## Vorhandene freigegebene Fotos

Nutzer hat die bestehenden Fotos für öffentliche Vorschau und spätere Produktion erlaubt. Keine offene Lizenz für Gemeindefotos behaupten. Alle Pfade wurzeln bei `/images/`. Fotografie proportional und Menschenbilder ohne zusätzlichen Ausschnitt/Filter zeigen. Bildnachweis/Archivbezeichnung sichtbar am Foto oder eindeutig zugeordnet; vollständige Original-/Lizenzlinks erhalten. Keine neuen Bilder beschaffen/generieren. Vier Menschen-/Cafémotive pro Entwurf sind eine gute gemeinsame Bildbasis. Architektur nur ergänzend, nicht als Ersatz für Menschen.

- `gemeinde-gottesdienst-{640,960,1280}.webp`: Gottesdienst · Archivfoto. Foto Frank Lönne. Quelle https://akg-kiel.de/wp-content/uploads/2024/01/2024_Banner_allianz_1.jpg
- `gemeinde-gespraech-{640,960,1280}.webp`: Im Gespräch · Gemeindefest 2022. Quelle akg-kiel.de: https://akg-kiel.de/wp-content/uploads/2022/05/Gemeindefest-22-VIII.jpg (Fotograf/in unbekannt, keine Urheberschaft erfinden).
- `gemeinde-fest-{640,960,1280}.webp`: Zeit miteinander · Gemeindefest 2022. Quelle akg-kiel.de: https://akg-kiel.de/wp-content/uploads/2022/05/Gemeindefest-22-XII.jpg
- `cafe-dreimaster-{640,960,1280}.webp`: Café Dreimaster · Archivfoto. Quelle akg-kiel.de: https://akg-kiel.de/wp-content/uploads/2024/01/Banner_Dreimaster.jpg
- Optional Gebäude: `petruskirche-{640,960,1440}.webp`, `petruskirche-dach-{640,960,1440}.webp`, `petruskirche-portal-{640,960,1440}.webp`: Matthias Süßen, CC BY-SA 4.0, verkleinert/WebP, Original- und Lizenzlinks gemäß `src/lib/photos.mjs`/`docs/brand-spec.md`.
- Optional `petruskirche-seite-{640,960,1440}.webp`: Aufnahme 2015, Rüdiger Stehn, CC BY-SA 2.0, verkleinert/WebP. Quelle/License exakt aus Brand-Spec.

## Ausgabeformat und Technik

Eigenständiges `<!doctype html><html lang="de">`, UTF-8, viewport, eindeutiger title, `<meta name="robots" content="noindex, nofollow">`, inline CSS, lokale absolute Assetpfade. Kein Framework/Build nötig. HTML/CSS und native `details/summary` statt JavaScript; falls unvermeidbar Script nur lokal und keine externen Abhängigkeiten. Keine eingebetteten Frames oder fremden Inhalte. Jede Seite auch direkt erreichbar und vollständig scrollbar.

Semantischer Header, genau ein main/H1, abgestufte Überschriften, Skip-Link, sinnvolle Bild-alt-Texte, Fokusmarkierungen, ausreichend Kontrast, mindestens 44-px-Interaktionsziele, keine bewegungsabhängig unsichtbaren Inhalte; reduced-motion. Native Links/Details müssen per Tastatur funktionieren. Responsive bei 320/375/390/414/768/1440, keine horizontale Überbreite, keine abgeschnittenen Überschriften oder skalierten/verzerrten Logos. Ohne JavaScript sinnvolle Seite. Keine Browser-/Geräte-Attrappen in den Entwurfsseiten.

`manifest.json` ist ein Array mit genau fünf Einträgen:

```json
[
  {
    "number": 1,
    "title": "Eigenständiger Konzeptname",
    "description": "Ein kurzer konkreter Satz zu Komposition und Besuchereinstieg.",
    "structure": "Kurze Reihenfolge der Seitenabschnitte"
  }
]
```

Der Parent ergänzt Modell-/Skillherkunft automatisch; nicht selbst Attribution erfinden. In `notes.md` verwendeten Skillpfad, fünf Designideen/erforderliche Skill-Planung, tatsächlich ausgeführte Checks und bekannte Lücken festhalten. Skill-Skripte mit --out nur in eigenes Arbeitsverzeichnis führen, niemals gemeinsame .taste-skill-Dateien überschreiben. Für Browserprüfungen vorhandene lokale Tools verwenden, keine zusätzlichen Pakete installieren. Zentrale Browserprüfung/Vorschaubilder und gesamtes Quality-Gate übernimmt der Parent. Keine technische Prüfung behaupten, die nicht ausgeführt wurde.
