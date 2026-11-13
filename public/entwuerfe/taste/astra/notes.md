# AKG-129 · Taste · Astra

## Auftrag und Grenzen

Fünf eigenständige, statische und responsive Startseitenvorschläge; keine Inhalts-, Rechts- oder Launchabnahme. Ausschließlich `public/entwuerfe/taste/astra/` ist Arbeitsbereich. Gemeinsamer Brief vollständig gelesen: `docs/design-exploration-brief.md`. Einziger angewendeter Design-Skill: `/home/zepi/.pi/agent/skills/design-taste-frontend/SKILL.md` (vollständig gelesen). Keine Unteragenten, keine Installation, keine Produktionsänderungen.

Verbindliche Quellen gelesen: `docs/brand-spec.md`, `src/lib/photos.mjs`, `src/lib/site.ts`, `docs/migration/README.md`; Ausgangsdesign `src/pages/index.astro`, relevante Bereiche von `src/styles/globals.css`, `docs/design.md`. Taste-Referenzen: copy, layout und critique vollständig; relevante Teile von imagery und motion für Bildbehandlung, Quellen, CSS-Bewegung und reduzierte Bewegung. Keine anderen Design-Skills.

## Gegenstandsinventar / Argument

Reale Bestandteile: Apostel-Kirchengemeinde Kiel; unveränderte blaue Original-Wort-/Bildmarke; lokale Figtree; direkte du-Einladung; Menschen im Gottesdienst in der Petruskirche; Frank Lönnes Archivmotiv; das Gespräch auf der Wiese beim Gemeindefest 2022; die Picknickdecken beim selben historischen Fest; der helle Raum des Café Dreimaster; Dreimaster als eigenes Produkt; fünf vorhandene Hauptrouten; bewusst fehlende aktuelle Termindaten. Diese Kombination und die tatsächlich vorhandenen Fotos sind der Stoff, nicht generische Kirchenarchitektur.

Leser: erstmalig Interessierte und Menschen, die ihre Gemeinde bereits kennen. Hauptaktion: Gemeinde kennenlernen. Gottesdienste bleiben direkt erreichbar. Jeder Abschnitt beweist nur die Einladung bzw. bietet einen echten Weg zu einer vorhandenen Quelle. Archivfotografie belegt keine aktuellen Angebote oder Termine.

Grundargumente: Einladung → originale Gemeindefotografie; Gottesdienst ist auch mit offenen Fragen zugänglich → genehmigter Einladungstext + Gottesdienstroute; Menschen treffen → historische Festbilder + Angebotsroute; Café entdecken → Caféfoto + externe Originalwebsite; aktuelle Informationen finden → ehrlicher Entwurfshinweis + Aktuelles/Kontakt. Keine erfundenen Beweise, Zahlen, Personen oder Zitate.

## Taste-Draw und fünf Ideen

`draw.mjs` wurde je Konzept zunächst mit `--options 3`, `--sector nonprofit --have photography --keep palette,type` ausgeführt, danach mit expliziter Richtung. Draws, vollständige Sheets und Redraws liegen isoliert unter `/tmp/akg-taste-astra/draw-1` bis `draw-5`, Textfassungen in `/tmp/akg-taste-astra/direction-{1..5}.txt`.

1. **Augenblicke** · `uneven-photographs`, Seed **129011**. Auf dieser Seite werden die beiden Gemeindefestbilder von 2022 zu unterschiedlich großen, unbeschnittenen Fotoabzügen einer persönlichen Einladung. Einstieg: Menschen zuerst. Ruhige Figtree, versetzte Bildgrößen, viel Weiß, ein blauer Gottesdienstabschnitt. Live-Element: native Details „Zum ersten Mal hier?“ mit echten Weiterwegen.
2. **Glaube trifft Alltag** · `editorial-report`, Seed **129012**. Auf dieser Seite werden Frank Lönnes Gottesdienstfoto und die Begegnungen der AKG zu einer aufgeschlagenen Gemeindegeschichte mit fester innerer Satzachse. Einstieg: Glaube und Gottesdienst. Schwerere Typografie, Titel rechts, schmaler Einführungstext links, Foto- und Textstrecken im Wechsel. Live-Element: aufklappbarer Einstieg für offene Fragen.
3. **Post für dich** · `page-is-the-object`, Seed **129013**. Auf dieser Seite wird „Schön, dass du da bist“ zur offenen, blau-weißen Einladungskarte der Apostel-Kirchengemeinde, deren Innenseiten echte Fotos tragen. Kein behauptetes existierendes Druckprodukt. Einstieg: persönliche Einladung. Weißes Papier auf Blau, mittige Einladung, wechselnde Innenblätter, kompakte Rückseite. Live-Element: Einladung mit nativen Details weiter öffnen.
4. **Gemeinde sind wir** · `sentence-as-layout`, Seed **129014**. Auf dieser Seite wird das historische Gemeindefest selbst zum Bildwort im Satz „Gemeinde sind wir“. Einstieg: Zugehörigkeit und Gespräch. Großes Satzbild mit Foto im Wortzwischenraum, danach Bild-/Textbeweise und ein dunkler Gottesdienstblock. Live-Element: Auswahl des eigenen Einstiegs durch zwei native Details mit echten Zielseiten.
5. **Dein nächster Schritt** · `type-only-statement`, Seed **129015**. Auf dieser Seite werden die verlässlichen AKG-Wege statt eines erfundenen Veranstaltungskalenders zum großen typografischen Wegweiser. Einstieg: Besuchsabsicht. Zwei klare Farbflächen im Auftakt, offene Inhaltskapitel, die sich ohne JavaScript einklappen lassen, und jeweils die vollständigen Fotos. Live-Element: Gottesdienst-, Gemeinde- und Café-Kapitel als native, standardmäßig offene Details.

Der Wettbewerbertest ist nur teilweise exklusiv: Einladung/Gemeindebrief/Wegweiser sind bekannte Muster. Spezifisch sind Originalmarke, Kiel, die belegte Fotoserie, das Gemeindefest 2022 und der Übergang zum eigenständigen Dreimaster. Keine erfundene Alleinstellung.

### Redraws und notwendige Anpassungen

- Konzept 1: about → `about-photo-tile-facts` (keine freigegebenen Personenprofile); showcase → `showcase-square-plate-spare-text` (kein Zerschneiden der vier Fotos); footer → `footer-single-quiet-line` (kompakter Footer vorgeschrieben).
- Konzept 2: about → `about-photo-tile-facts` (keine Gründungs-/Team-/Auszeichnungsdaten); gallery → `gallery-staggered-pairs` (keine Portraitreihe/Anschnitte); footer → `footer-single-quiet-line` (keine freigegebene E-Mail für Displaykontakt).
- Konzept 3: Hero neu gezogen → `invitation-card-cropped` (der erste Draw benötigte einen gedimmten, beschnittenen Foto-Hintergrund); about → `about-photo-tile-facts` (kein Gründerbrief); contact → `contact-sentence-portrait-links` (kein Formbackend); gallery → `gallery-staggered-pairs` (vier statt 8–16 Motive).
- Konzept 4: about → `about-photo-tile-facts` (keine Biografie); showcase → `showcase-square-plate-spare-text` (kein Detailzoom/Beschnitt); gallery → `gallery-staggered-pairs` (Fotos dürfen keine Überschriften verdecken); footer → `footer-single-quiet-line` (keine angeschnittene Ersatzwortmarke).
- Konzept 5: Hero neu gezogen → `waterline-headline` (der erste Draw forderte eine riesige neue Wortmarke); about → `about-photo-tile-facts`; showcase → `showcase-square-plate-spare-text`; gallery → `gallery-staggered-pairs`; contact → `contact-sentence-portrait-links`; footer → `footer-single-quiet-line`. Gründe: keine Fantasiestatistiken, kein Vorher/Nachher, keine neuen Kontaktangaben, vier Originalfotos statt erfundener Wortkacheln.
- Übergreifend: Brief und House Rules stehen über einzelnen Blueprintdetails. Keine Foto-Filter, keine zusätzlichen Ausschnitte, keine Typografieüberlagerung, keine riesigen leeren Scrollstrecken, keine Scallops/Dekorationszeichen, kein erfundener Absender. Original-Logo nie als skalierte/angeschnittene Displaygrafik. Fotoformate bleiben natürlich statt quadratisch/hochkant. Quellenlinks sichtbar direkt am Foto. Zwei Farbflächen in Konzept 5 treffen zwischen Textblöcken aufeinander statt durch eine doppelte Überschrift.
- Kein Stock, keine Bildsuche, keine externen Fonts, keine Videos: vier vorhandene, ausdrücklich freigegebene Fotos sind die verbindliche Grundlage. Keine Scroll-Szenen im Draw ausgegeben. CSS-Bewegung bleibt progressiv und vollständig lesbar, ohne JS. Der Shutter wird zur Bewegung des vollständigen Fotoabzugs statt zu einem verdeckenden Beschnitt.

## Copy Deck vor Markup

Gemeinsame Quellenformulierungen: „Ob du zum ersten Mal vorbeischaust oder schon lange zur Gemeinde gehörst: Wir freuen uns auf dich.“ / „Zur Ruhe kommen, gemeinsam glauben, neue Gedanken mitnehmen. Gottesdienst ist eine Einladung – auch mit offenen Fragen.“ / „Wir möchten Menschen zusammenbringen – im Gottesdienst, im Gespräch und im Alltag.“ / „Lerne das Café kennen und finde die aktuellen Informationen für deinen Besuch – auf der Dreimaster-Website.“ / „Aktuelle Meldungen sind in diesem Entwurf nicht eingebunden.“

- 1: „Schön, dass du da bist.“ → persönliche Einladung mit Gemeindeaktion; „Zeit für Glauben“ → Gottesdiensttext; „Miteinander leben“ → Gruppenweg und erster Besuch; „Café Dreimaster“ → externer Besuchsweg; „In Verbindung bleiben“ → Aktuelles und Kontakt.
- 2: „Glaube trifft Alltag“ → Apostel-Kirchengemeinde Kiel und Gemeindeaktion; „Gottesdienste“ → Einladung auch mit offenen Fragen; „Gemeinde erleben“ → Gemeinsamkeit mit Festbild; „Café Dreimaster“ → anderer Ort/eigene Website; „Was gibt es Neues?“ → ehrlicher Meldungshinweis und Kontakt.
- 3: „Du bist eingeladen.“ → persönliche Einladung; „Gemeinsam glauben“ → Gottesdienst; „Zeit miteinander“ → Gemeindeleben/Angebote; „Auf ins Dreimaster“ → externes Café; „Wir bleiben in Kontakt“ → Aktuelles und Kontakt.
- 4: „Gemeinde sind wir.“ → AKG Kiel und Einladung; „Im Gespräch“ → Gemeindeleben und Angebote; „Gottesdienste“ → Ruhe/Glaube/offene Fragen; „Café Dreimaster“ → Besuchsinformationen extern; „Dein Weg zu uns“ → zwei Einstiege, Aktuelles, Kontakt.
- 5: „Wo fängst du an?“ → Einladung und Gemeindeaktion; „Gottesdienste“ → Zeiten nicht erfunden, echte Route; „Gemeinde & Angebote“ → beide Festbilder, Gemeinde-/Gruppenroute; „Café Dreimaster“ → eigene Website; „Aktuelles & Kontakt“ → sicherer nächster Weg.

Überschriften höchstens rund 26 Zeichen. Mobile Kalkulation: 288 px verfügbare Breite / (44 px × 0,5) ≈ 13 Zeichen je Zeile, etwa 26 in zwei Zeilen. Lange Einzelwörter wie „Gottesdienste“ erhalten auf schmalen Geräten eine passend dimensionierte Überschrift. Keine Probeartikel, Termine oder rechtlichen Beispieltexte.

## Mediennachweise

Alle vier Motive in allen fünf Dokumenten; Figtree und Original-Logo lokal. Credits direkt am zugehörigen Bild, Originalquelle als klickbarer Link. Keine offene Lizenz für Gemeindefotos behauptet.

- Gottesdienst · Archivfoto. Foto **Frank Lönne**. `/images/gemeinde-gottesdienst-{640,960,1280}.webp`; Original: https://akg-kiel.de/wp-content/uploads/2024/01/2024_Banner_allianz_1.jpg
- Im Gespräch · Gemeindefest **2022**. Quelle akg-kiel.de, Fotograf/in unbekannt. `/images/gemeinde-gespraech-{640,960,1280}.webp`; Original: https://akg-kiel.de/wp-content/uploads/2022/05/Gemeindefest-22-VIII.jpg
- Zeit miteinander · Gemeindefest **2022**. Quelle akg-kiel.de, Fotograf/in unbekannt. `/images/gemeinde-fest-{640,960,1280}.webp`; Original: https://akg-kiel.de/wp-content/uploads/2022/05/Gemeindefest-22-XII.jpg
- Café Dreimaster · Archivfoto. Quelle akg-kiel.de, Fotograf/in unbekannt. `/images/cafe-dreimaster-{640,960,1280}.webp`; Original: https://akg-kiel.de/wp-content/uploads/2024/01/Banner_Dreimaster.jpg

## Ausgeführte Prüfungen / offene Lücken

### Tatsächlich ausgeführt

- Statische Prüfung mit Python-Standardbibliothek: `python3 /tmp/akg-taste-astra/check.py` vom Repository-Root. Alle fünf HTML-Dateien und das Manifest bestanden: ausgeglichene Tags, genau ein Main/H1, je fünf Sections, echte Linkziele/Anker, eindeutige IDs, vier freigegebene Fotomotive mit Originalquellen und Archiv-/Jahresangaben, lokale Dateien einschließlich srcset, Logo/Figtree, native Details, noindex, keine externen Ressourcen oder verbotenen Bildbehandlungen. Dies ist eine gezielte Strukturprüfung, kein vollständiger HTML-Konformitätsvalidator.
- Taste `lint.mjs public/entwuerfe/taste/astra/{1,2,3,4,5}.html`: **0 FAIL, 0 WARN**. Protokoll: `/tmp/akg-taste-astra/lint.txt`.
- Taste `inspect.mjs` in lokalem Chromium: alle fünf Seiten bei **1440, 768 und 390 px**, jeweils **0 FAIL**. Warnungen je Konzept: 1 → 2; 2 → 1; 3 → 2; 4 → 2; 5 → 2. Reports und lokale Prüfscreenshots: `/tmp/akg-taste-astra/inspection-{1..5}/`. Diese Bilder sind keine offiziellen Galerie-Vorschaubilder.
- Alle Fold- und Ganzseitenansichten bei Desktop, Tablet und Mobil visuell geöffnet. Nach dieser Sichtprüfung: Konzept 3 erhielt getrennte Bildnachweiszeilen und einen direkten Gottesdienst-Link im Einstieg; Konzept 4 eine kürzere Bildunterschrift und eine angepasste mobile Bildwortbreite; Konzept 5 eine auf Desktop zentrierte Auftaktüberschrift, mobil weiterhin linksbündig. Die drei geänderten Konzepte erneut inspiziert und die neuen Screenshots erneut geöffnet.
- Eigene Chromium/CDP-Prüfung `/tmp/akg-taste-astra/verify.mjs`: alle fünf Seiten bei **320, 375, 390, 414, 768 und 1440 px** bestanden. Kein horizontaler Seitenüberlauf, keine defekten/verzerrten Bilder, kein seitliches Abschneiden der geprüften Überschriften, Absätze, Bilder und Links; sichtbare Links/Summaries mindestens 44 px hoch; Überschriften höchstens zweizeilig; lokale Figtree geladen; keine externen Ressourcenrequests.
- Mit deaktiviertem JavaScript bei 390 px: erster Tab erreicht den Skip-Link, Enter fokussiert Main; mobiles Menü und alle Inhalts-Details öffnen/schließen per Enter. Im emulierten Reduced-Motion-Modus keine laufenden Animationen. Bericht: `/tmp/akg-taste-astra/browser-check.{txt,json}`. Native Interaktion statt zusätzlicher JavaScript-Abhängigkeit.
- Auf das eigene Verzeichnis begrenzte Whitespace-Prüfung mit `git diff --check`; neue Dateien zusätzlich einzeln mit `git diff --no-index --check /dev/null <Datei>` geprüft.

### Parent-Integrationskorrektur

Der zentrale axe-Lauf fand bei Konzept 1, 2 und 5 unzureichenden Textkontrast während der Scrollanimation: `opacity: .75` hellte den Text vor blauem Grund auf. Der Parent entfernte die Opazitätsänderung aus dem gemeinsam kopierten `arrive`-Keyframe aller fünf Dokumente; die Transformbewegung und Reduced-Motion-Regeln bleiben erhalten. Das korrigiert die gemeinsame Ursache, nicht einzelne Textstellen. Die oben genannten Skill-Ergebnisse beschreiben den vorherigen Agentenstand; der abschließende zentrale Lauf ist in `docs/design-exploration.md` dokumentiert.

### Verteidigte Taste-Warnungen

- `no-footage` in allen Konzepten: kein freigegebenes Video vorhanden; neue Medien sind ausdrücklich nicht beauftragt. Die vier Originalfotos bleiben die gemeinsame Grundlage, kein Ersatzclip von Dritten.
- `grey-body` in Konzept 1 und 5: der gemessene Kontrast **5,8:1** stammt aus Weiß auf dem vorgeschriebenen Aktionsblau, nicht aus grauem Fließtext. Der helle Grund verwendet die volle Marken-Ink. 5,8:1 übertrifft WCAG AA für normalen Text, unterschreitet aber Tastes strengere 7:1-Empfehlung; daraus folgt keine pauschale WCAG-Abnahme.
- `still-page` in Konzept 3 und 4: bewusst zurückhaltende CSS-Bewegung, funktionierende native Details und vollständig sichtbare Inhalte. Kein Video, kein erzwungener Scroll-Effekt, kein JS nur zur Erhöhung einer Bewegungszählung. Dies bleibt eine Abweichung vom bewegungsreichen Taste-Ideal.

### Grenzen und Übergabe

- Genau die sieben vereinbarten Lieferdateien im Entwurfsordner: `1.html` bis `5.html`, `manifest.json` (genau fünf Einträge) und `notes.md`. Testskripte, Draws und Prüfbilder ausschließlich unter `/tmp/akg-taste-astra/`; temporäre Artefakte sind nicht Teil der Git-Lieferung.
- Die internen Pfade entsprechen dem Brief und vorhandenen Routen; kein vollständiger Navigationstest durch die übrige Anwendung und keine Live-Verfügbarkeitsprüfung der externen Websites. Standalone bedeutet unabhängiges HTML/CSS, nicht ein einzelnes portables HTML ohne Assets: die Seiten brauchen den öffentlichen Site-Root für `/images/` und `/fonts/`.
- Getestet in Chromium, nicht Safari/Firefox, nicht auf echter Mobilhardware und nicht mit einem Screenreader. Keine vollständige WCAG-, Performance-, Inhalts- oder Rechtsabnahme. Die CSS-Scrollbewegung ist progressive Verbesserung und darf in anderen Browsern entfallen; Inhalte/Links bleiben ohne JavaScript nutzbar.
- Aktuelle Termine, Nachrichten, Kontaktdaten und ChurchTools sind absichtlich nicht erfunden oder eingebunden. Redaktionelle Metaphern und Einladungstexte sind Entwürfe, keine zusätzliche Inhaltsfreigabe. Die vorhandenen Fotomotive bleiben sichtbar als Archiv/2022 gekennzeichnet.
- Zentrale Galerie, offizielle Vorschaubilder, vollständiges Repository-Quality-Gate und die fachliche Auswahl verbleiben beim Parent. Keine Commit-, Push-, Deploy-, Linear- oder Produktionsaktion. Keine Freigabe oder Veröffentlichung aus diesen Entwürfen ableiten.
