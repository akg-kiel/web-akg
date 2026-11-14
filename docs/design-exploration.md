# AKG-129 · Entwurfsgalerie

## Auftrag und Grenzen

50 responsive AKG-Startseitenentwürfe: fünf Skills × zwei Modelle × fünf Varianten. Gemeinsamer Brief: [design-exploration-brief.md](design-exploration-brief.md). Tatsächliche delegierte Modell-/Skillherkunft: [design-exploration-runs.json](design-exploration-runs.json). Keine Veränderung der bestehenden Website, Datenfreigaben oder Deployment-Konfiguration. Keine zusätzlichen Pakete.

## Galeriegestaltung und Bedienung

Neue additive Vergleichsoberfläche, keine Neugestaltung des bestehenden Auftritts. Modus **Operate**: Die Entwürfe tragen die Bilder, die Galerie bleibt ruhig und orientierend. Design Read: vergleichende Bildübersicht für die AKG-Entscheidung, markennahe Figtree-/Blau-/Weiß-Gestaltung; Varianz 3, Bewegung 1, Informationsdichte 6, Assetabhängigkeit 9, Markentreue 9. Daraus folgen ein stabiles Raster mit echten Screenshots, klare Skill-/Modellbeschriftung, native Auswahlfelder und keine dekorative Bewegung.

- `public/entwuerfe/index.html`: Galerie mit Skill-/Modellfilter, eindeutigen Entwurfsnamen und 50 Direktlinks als No-JS-Fallback.
- `gallery.js` / `gallery.css`: native Dialogansicht, vorheriger/nächster gefilterter Entwurf, 1440-/390-px-Viewport, einpassende Skalierung ohne Layoutverzerrung, Escape und Fokusrückgabe. Direkte Auswahl per Hash `#taste/astra/3`; Filter werden in URL-Parametern erhalten.
- Vorschau mit `iframe.srcdoc` und Sandbox ohne Skripterlaubnis. Der vorhandene Worker-Header `X-Frame-Options: DENY` bleibt unverändert; keine Aufweichung für die Galerie. Native Entwurfsdetails funktionieren ohne JavaScript. Entwurfslinks zu anderen Seiten öffnen außerhalb der Vorschau.
- Ehrlicher Lade-/Fehlerzustand mit Direktöffnungsalternative; keine fremden Laufzeitressourcen.
- `catalog.json`: aus den zehn Manifesten erzeugte eindeutige Herkunfts-/Konzeptzuordnung.
- `thumbnails/`: echte Desktop-Vorschaubilder aus dem zentralen Browserlauf.

Alle Dokumente enthalten noindex. Die bestehende globale HTTP-Indexierungssperre gilt bei Auslieferung über den Worker weiter. noindex ist kein Zugriffsschutz.

## Reproduzierbare Befehle

In der bestehenden devenv-Shell, nach Frozen-Lockfile-Installation:

```sh
node scripts/build-design-gallery.mjs
node scripts/design-gallery-browser.mjs
node --test scripts/design-gallery.test.mjs
pnpm exec vp run quality
node scripts/export-design-gallery.mjs
```

Der Browsercheck startet ausschließlich einen temporären lokalen Static-Testserver auf einem automatisch zugewiesenen Loopback-Port und beendet ihn wieder. Kein Server wird zur Darstellung der finalen Chat-Galerie gestartet. Ausführliche Nachweise/Screenshots landen in `/tmp/akg-design-gallery-qa/`. Der portable Export erzeugt `/tmp/akg-entwuerfe.html` und eine themenverträgliche Chat-Version `/tmp/akg-entwuerfe-inline.html`; alle 50 Dokumente, Bilder und Schrift sind darin gebündelt. Nur im portablen Export werden Fotos/Vorschaubilder für die Dateigröße verkleinert; Originalmedien und Repository-Entwürfe bleiben unverändert. Root-relative Inhaltslinks führen im portablen Export zur bestehenden `akg-kiel.de`-Website, nicht zu neu implementierten Unterseiten.

Die lokale Agentenumgebung benötigt für devenv `env -u XDG_RUNTIME_DIR`. Bei hoher Prozesslast begrenzen `TOKIO_WORKER_THREADS=2 RAYON_NUM_THREADS=2` nur den eigenen Prüfprozess; keine fremden Prozesse werden beendet oder Systemeinstellungen geändert.

## Ausfälle und Integrationsverantwortung

Die Aufträge Impeccable/Astra und Design Better Websites/Astra wurden vom Harness nach dem Speichern ihrer jeweils fünf HTML-Dateien und Manifeste unerwartet beendet. Die Ergebnisse blieben erhalten und wurden vom Parent strukturell geprüft; keine umetikettierten oder mit einem anderen Modell neu erzeugten Ersatzentwürfe. Die Unterordner-Notizen unterscheiden Agentenergebnisse von nachträglichen Parent-Prüfungen. Eine vollständige Skill-/Finish-Abnahme der abgestürzten Agenten wird nicht behauptet.

## Prüfstand

Zentrale Integration geprüft am 13. November 2026:

- **50 vollständige, eindeutig zugeordnete Entwürfe**, zehn Manifeste und 50 echte Vorschaubilder; Original-Logo und bestehende Anwendungsdateien unverändert.
- **Chromium: 50 × sechs Breiten** (320, 375, 390, 414, 768, 1440 px), keine gefundenen Seitenüberläufe, kaputten/verzerrten Bilder, doppelten IDs oder fehlenden Fragmentziele. Lokale Ressourcen geladen, keine externen Ressourcenrequests und keine JavaScript-Seitenfehler.
- **axe: 100 Entwurfsprüfungen** bei 390/1440 px gegen WCAG-A/AA-Tags sowie Galerieprüfung ohne gemeldete Verletzungen. Das ist eine automatisierte Teilprüfung, keine vollständige WCAG-Konformitätsbescheinigung.
- **Tastatur:** Skip-Link-Fokus und native Details bei 390/1440 px; Galerieauswahl, Vor/Zurück, Escape, Fokusrückgabe und Fragmentnavigation im Vorschau-Iframe. Desktop-/Handy-Viewport, gefilterte Entwurfszahlen, URL-Parameter und Direktaufruf geprüft. 50 No-JS-Direktlinks vorhanden; die Vergleichssteuerung selbst benötigt JavaScript.
- **Galerie:** Mobil-/Desktopansicht und Kontaktbogen visuell angesehen. Während der Integration gefundene Probleme behoben: kontrastmindernde Opazitätsanimation bei Taste/Astra, fehlender Main-Fokus bei Taste/Sol, abweichender Buttonname und feste Thumbnail-Höhe in der Galerie. Native Fehlerzustände für fehlenden Katalog und fehlenden Entwurf geprüft.
- **Portable Exporte:** beide Dateien in Chromium ohne HTTP-Ressourcenrequests geöffnet; 50 Karten, Skill-/Modellfilter, gebündelte Bildressourcen, 390-px-Vorschau, Navigation, Escape und Direktaufruf bestanden. Die Chat-Version hat eine feste, intern scrollbar gestaltete Übersicht; keine viewportabhängige äußere Höhe. HTML-Vorschau für die Chat-Ausgabe geprüft.
- **Full Quality:** `pnpm exec vp run quality` bestanden — 38 Tests, Format/Lint, Wrangler-Typen, Astro-Prüfung, Build und Cloudflare-Buildgrenzen. Keine Deploy-Aktion. Die Wiedererzeugung des Katalogs verändert bereits formatierte, inhaltlich identische Fallback-Links nicht.

Nachweise: `/tmp/akg-design-gallery-qa/report.json`, Kontaktbogen und Mobil-/Desktop-Screenshots. `node scripts/design-gallery-browser.mjs --gallery-only` prüft bei Änderungen an der Galerie nur Steuerung, Fehlerzustände und Exporte und schreibt getrennt nach `/tmp/akg-design-gallery-controls-qa/`; es ersetzt ausdrücklich nicht den vollständigen 50-Seiten-Lauf. Skill-spezifische Prüfungen und deren Grenzen stehen zusätzlich in den zehn `notes.md`.

Nicht Ziel dieser Exploration: aktuelle ChurchTools-Daten, neue Unterseiteninhalte, rechtliche Abnahme, Safari/Firefox, reale Screenreader/Mobilgeräte, Merge, Deployment oder Launch.
