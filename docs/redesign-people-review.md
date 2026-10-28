# AKG-127 · Menschen und kompakter Hero

Stand: 2026-10-28. Lokale Nutzerkorrektur nach Commit `95c79dd` auf `t3/akg-127-taste-redesign`. **Keine öffentliche Medien-, Inhalts- oder Launchfreigabe.**

Die folgenden zwei Runden dokumentieren die Menschenfassung bis Commit `e02f40b`. Die anschließende Anpassung an den vom Nutzer bevorzugten MVP-Hero steht im [Nachtrag](#nachtrag-bevorzugter-mvp-hero).

## Auftrag und Umsetzung

Der Nutzer fand das Hero-Bild zu groß und wünschte mehr Menschen statt Gebäude, ausdrücklich auch mit Bildern von akg-kiel.de. Die bisherige Richtung `place-carries-it` (Seed 111414565) wird deshalb korrigiert, nicht durch einen neuen Zufallsdraw ersetzt. Original-Logo, Figtree, Blau/Weiß, Routen und Datenverträge bleiben bestehen.

- Hero: Text neben einem kleineren Gottesdienstfoto, mobil Text/Aktionen vor dem Foto. Keine überlagerte Schrift, kein Scrim, keine starre Höhe und kein Bildbeschnitt.
- Gemeindeleben: zwei historische Begegnungs-/Festaufnahmen statt drei Architekturdetails. Ein direkter Weg zu Angeboten, keine erfundenen aktiven Gruppen oder Veranstaltungsdaten.
- Caféfoto als Übergang zum separaten Dreimaster-Produkt; keine Kopie dessen Öffnungszeiten oder Programms.
- Der vorhandene Bildbaustein heißt jetzt `Photo.astro` und wird weiterverwendet. Native Bilddialoge, Quellenübernahme, No-JS-Dateilinks und Reduced Motion bleiben erhalten.
- Neue responsive WebPs: 640/960/1280 px ohne Hochskalierung, lokale Auslieferung. Kein WordPress-Laufzeitabruf.
- Vollständige Quellen, belegte Credits und fehlende Rechte: [brand-spec.md](brand-spec.md#gemeindeleben--lokaler-entwurf-nach-nutzerwunsch).

Die Aufnahmen zeigen keine behaupteten heutigen Personenrollen. Gemeindefestbilder tragen ausdrücklich **2022**, weitere Bestandsaufnahmen **Archivfoto**. Unbekannte Fotografen werden nicht durch Website-Autoren ersetzt; keine CC-Lizenz behauptet. Vor öffentlicher Vorschau oder Push mit Preview-Autobuild sind Urheber-/Personenfreigaben erforderlich. `noindex` ist kein Zugriffsschutz.

## ROUND 1

Seen in one second: Apostel und eine gemeinsam feiernde Gemeinde, nicht der Kirchturm.
Idea (one sentence): Echte Begegnungen aus der AKG tragen die Einladung, während Gebäude nur noch Ziele auf passenden Unterseiten sind.
Live thing: drei native Fotoansichten mit Quelldatei/No-JS-Fallback; Meldungen bleiben an die freigegebene Live-Quelle gebunden.
Layout words by section: hero=compact-split / services=text-pair / community=uneven-photos / places=list-and-photo-aside / news=compact-list / footer=colour-field.
Scores: design 7 · usability 8 · creativity 6.5 · content 7 → overall 6.0.
Caps applied: zwei rohe Inspector-FAILs; dieser Zwischenstand ist keine Endabnahme.
Top three problems (most visible first), each with the screenshot it shows in and the fix:

1. Der Café-Titel steht erst unter Foto und Quellenzeile (`people-v1/tablet-page-01.jpg`): Titel vor das Foto gesetzt; so ist dessen Zusammenhang früher erkennbar.
2. „Angebote & Gruppen“ bricht auf Tablet unnötig um (`people-v1/tablet-fold.jpg`): dem Link seine natürliche Breite gelassen; Einleitung darf davor umbrechen.
3. Viele Bild-Metadaten konkurrieren mit wenig Fließtext; Quellenzustände wirken klein (`people-v1/mobile-page-01.jpg`): technische Verkleinerungshinweise für die nicht-CC-Fotos in die Mediendokumentation verschoben, Quellen/Archivangaben erhalten; tatsächliche Quellenzustände auf 17 px Körpertext gesetzt. CC-Bearbeitungshinweise bleiben unverändert.

Alle sechs V1-Screenshots geöffnet. `pnpm build` und erweiterte Browserregression bestanden. V1-Inspector: zwei FAIL (Textgrößenverteilung, Cafécredit als Eyebrow), zwei WARN (gewählte Textprobe in Hinweisgrau, fehlendes Video).

## ROUND 2

Seen in one second: eine übersichtliche Einladung neben realem Gemeindeleben.
Idea (one sentence): Die Menschen der AKG, nicht eine Architekturführung, erklären den Charakter der Gemeinde.
Live thing: dieselben drei proportionalen Fotoansichten mit sichtbaren Quellen und direktem Dateilink.
Layout words by section: hero=compact-split / services=text-pair / community=uneven-photos / places=list-and-photo-aside / news=compact-list / footer=colour-field.
Scores: design 7.5 · usability 8 · creativity 6.5 · content 7 → overall 7.4.
Caps applied: Kreativität bleibt unter 7, weil Split und Fotopaar bekannte Kompositionen sind. Kein behauptetes Award-Niveau.
Top three problems (most visible first), each with the screenshot it shows in and the fix:

1. Quellenzustände ersetzen weiterhin freigegebene Termine (`people-final/tablet-fold.jpg`): nicht durch erfundene Zeiten lösen; ChurchTools-/Redaktionsfreigabe bleibt erforderlich.
2. Fotos zeigen frühere Situationen (`people-final/desktop-page-01.jpg`): Jahres-/Archivkennzeichnung erhalten; aktuelle, einwilligungsbasierte Aufnahmen bleiben eine spätere redaktionelle Verbesserung.
3. Der rohe Inspector klassifiziert bei 390 px den Hero-Fotocredit als Eyebrow (`people-final/mobile-fold.jpg`): unabhängige Sichtprüfung bestätigt einen Fehlalarm. Die Zeile steht direkt unter ihrem Foto und rund 80 px vor dem nächsten Titel. Semantisches `figcaption` und Quellenlink bleiben erhalten; kein Weglassen von Attribution zur Erfüllung einer Heuristik.

Unabhängige, rein lesende Nachprüfung aller sechs aktuellen Screenshots und des relevanten Quellcodes: **keine blockierenden Gestaltungsbefunde**. Hero kompakt und ausgewogen, Menschenbezug klar, keine sichtbaren Beschnitt-/Überlauf-/Lesbarkeitsfehler; die Prüfung erteilt keine Medienfreigabe.

## Messungen und Prüfnachweise

Die folgenden DOM-Werte wurden mit reduzierter Bewegung am gebauten Stand erhoben:

| Breite  | Hero-Höhe inkl. Text/Credit | Foto-Höhe | Seitenhöhe |
| ------- | --------------------------: | --------: | ---------: |
| 390 px  |                      551 px |    199 px |    4084 px |
| 768 px  |                      392 px |    198 px |    2905 px |
| 1024 px |                      383 px |    266 px |    2798 px |
| 1440 px |                      492 px |    375 px |    3260 px |
| 1920 px |                      499 px |    382 px |    3300 px |

Der vorherige Desktop-Hero zeigte das 5:4-Foto mit 1440 px Breite und 1152 px Höhe. Jetzt ist das Bild im selben Viewport 659 × 375 px groß. Keine neue Bildhöhenbegrenzung schneidet Inhalte ab; die Verringerung entsteht aus der Spaltenbreite und dem passenden Querformat. Der Desktopseitenumfang sinkt von 5,3 auf 3,6 Screens. Bei 200 % Text darf der Hero selbstverständlich wachsen.

- Finaler vollständiger Lauf: **`pnpm quality` und `pnpm test:preview` erfolgreich (Exit 0)**. 17 Tests, Format/Lint, Astro ohne Fehler/Warnungen/Hints, Worker-/HTTP-Gates und erweiterte Browserregression bestanden. Keine axe-Funde, Client-Ausnahmen oder Drittanbieterrequests. Logs: `/tmp/akg-people-quality.log`, `/tmp/akg-people-preview-check.log`.
- Taste-Quell-Lint: 0 FAIL, 0 WARN.
- Roher finaler Inspector: **1 FAIL**, Fotocredit-Fehlalarm wie oben, **1 WARN**, kein Video. Vier echte Fotos, fünf Typgrößen, Körpertext 17 px, keine Überschrift über zwei Zeilen.
- Gesonderter Inspectorlauf mit `--allow eyebrow`: **0 FAIL, 1 WARN** (kein Video). Die Ausnahme ist ausdrücklich nur durch den unabhängig sichtgeprüften Fotocredit-Fehlalarm begründet; keine dekorativen Labels eingeführt und kein dauerhafter Lint-/CI-Check deaktiviert. Rohbefund bleibt dokumentiert. Alle sechs zuletzt erzeugten Screenshots bei 1440/768/390 px erneut geöffnet.
- Keine passende freigegebene Bewegtbildquelle belegt; kein generischer Ersatzclip. Die bereits vorhandene reduzierte Bild-/Eintrittsbewegung bleibt.
- Browserregression erweitert: Hero-Foto maximal 400 px hoch an den fünf normalen Testbreiten, Desktop-Hero maximal 600 px, Text daneben, keine Gebäudeaufnahme auf der Startseite; vollständiger Credit im Dialog und reservierter Bildraum bei blockiertem Download.
- Alle übrigen Gates bleiben: zwölf Routen, fünf Breiten, axe inklusive Dialog, Tastatur/Escape/Fokus, 200-%-Text, drei No-JS-Bildlinks, Reduced Motion, keine Drittanbieterrequests/Clientfehler.

Lokale Artefakte: `.taste-skill/people-v1/`, `.taste-skill/people-final/`, `/tmp/akg-people-{build,build-v2,browser-v1,inspect-v1,inspect-final}.log`, `/tmp/akg-people-measurements.json`, `/tmp/akg-people-inspect-reviewed.log`. Historischer Ausgangsstand: `.taste-skill/final/`.

## Offene Abnahme

Nutzerabnahme, Medien-/Personen-/Kunstwerkrechte, Text-/Rechtsabnahme, authentifizierte ChurchTools-E2E-Prüfung, Safari/Firefox und reale Assistenztechnik bleiben offen. Keine neue Freigabe aus einem bestandenen technischen Test ableiten. Die Menschenfassung wurde anschließend als `e02f40b` committet; der folgende Nachtrag ist noch uncommittet. Kein automatischer Push, Deployment oder Issue-Abschluss.

## Nachtrag: bevorzugter MVP-Hero

Der Nutzer bevorzugt den Hero von [dieser bestehenden Vorschau](https://t3-build-web-akg-mvp-web-akg.noah-zepner.workers.dev/). Deren tatsächlich ausgeliefertes HTML und CSS wurden geprüft, nicht nur aus früheren Notizen rekonstruiert. Übernommen werden hellblaue Fläche, direkt anschließende gleich breite Bild-/Textspalten, eine kleinere Überschrift und die persönliche Einladung „Schön, dass du da bist“. Die Gemeindefotos und übrigen Abschnitte der Menschenfassung bleiben unverändert. Kein neues Asset, keine neue Abhängigkeit.

Ein 60-px-H1 und das Foto auf halber Desktopbreite sind hier die ausdrückliche Gestaltungsreferenz. Die allgemeine Inspector-Forderung nach noch größerer Schrift oder bildschirmfüllenderem Foto wird deshalb nicht gegen den Nutzerwunsch durchgesetzt. Der `focal-point`-Rohbefund ist dokumentiert; ebenso bleibt die bereits unabhängig bestätigte `eyebrow`-Fehlklassifikation des echten Fotocredits transparent.

Erster Render bei 1440/768/390 px: alle sechs Screenshots geöffnet. Einmalig waren drei Lazy-Fotos beim frühen Desktop-Capture noch nicht geladen (Tablet/Mobil vollständig), daher keine Abnahme dieses Captures. Zwei echte Korrekturen: Bildcredit mit den normalen 20–32-px-Rändern statt 12 px; Geometrietest misst den sichtbaren, begrenzenden Bildrahmen statt das während der Eingangsanimation übergroße, darin abgeschnittene `img`. Die Bilder bleiben unbeschnitten im ruhenden Zustand.

Finale Prüfung dieses Hero-Nachtrags: `pnpm quality` und `pnpm test:preview` erfolgreich (17 Tests, zwölf Routen bei fünf Breiten, Tastatur, Dialog, 200%-Text, No-JS und Reduced Motion). Alle sechs finalen Aufnahmen unter `.taste-skill/reference-hero-final/` geöffnet; alle vier Fotos geladen, keine sichtbaren Überläufe. Inspector mit ausdrücklich dokumentiertem `--allow eyebrow,focal-point`: 0 FAIL, 1 WARN (weiterhin kein geeignetes freigegebenes Video). Keine dauerhaften Regeln abgeschaltet. Logs: `/tmp/akg-hero-reference-{quality,preview-check,final-inspect}.log`. Der Hero-Nachtrag bleibt uncommittet.

Weitere Nutzerrückmeldung: „Miteinander leben“ soll eine Angebotsvorschau statt reiner Fotogalerie werden. „Orte der Begegnung“ soll Gemeinschaft statt Gebäude zeigen; für das Kirchengebäude ist eine eigene Website geplant. Die Gebäudeliste ist inzwischen entfernt; der Abschnitt zeigt das bereits belegte Café Dreimaster mit eigener Website. Bestehende Unterseiten bleiben erreichbar, bis die künftige Kirchen-Website und Migration geklärt sind. Konkrete freigegebene Gruppen fehlen weiterhin: AKG-74 samt Kommentaren erneut gelesen, Status Backlog, Alt-/Beispieldaten ausdrücklich ausgeschlossen. Der Angebots-Sneak-Peek wartet deshalb auf eine konkrete fachliche Auswahl/Freigabe statt erfundener Teaser. Auch die Folgeänderung ist geprüft: frisches `pnpm quality` und `pnpm test:preview` erfolgreich, alle sechs Screenshots unter `.taste-skill/encounters-final/` geöffnet. Inspector mit denselben zwei expliziten Ausnahmen: 0 FAIL, 2 WARN (`no-footage`, `still-page`). Kein beliebiges Video oder zusätzliche Bewegung nur für einen Zähler: vorhandene Einblendungen und Bild-/Linkinteraktionen bleiben erhalten, reduzierte Bewegung bleibt respektiert. Logs: `/tmp/akg-encounters-{quality,preview-check,inspect}.log`. Die Gestaltung ist technisch geprüft, aber wegen der fehlenden Angebotsvorschau noch kein vollständiger Abschluss des neuen Nutzerwunsches.
