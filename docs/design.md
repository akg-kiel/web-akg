# Gemeindewebsite · AKG-130

Ausgangspunkt ist [die bestehende Gemeindewebsite](https://akg-kiel.de/). Beim Rundgang fallen die Einladung zum Gottesdienst und der Eintrag „Neu hier“ unter vielen Angeboten auf. Der Neubau macht daraus einen eigenen Weg **Erster Besuch**: Was erwartet mich, wo erfahre ich etwas über die Gemeinde und wie komme ich zum Gemeindebüro? Wer schon dazugehört, kann Gottesdienste, Aktuelles und Gruppen direkt ansteuern.

**Gestaltung:** eine breite Aufnahme aus einem tatsächlichen Gottesdienst, darunter die Einladung auf tiefem Petrol. Die Texte liegen nicht über den Gesichtern. Der erste Link führt zu `/besuch`; der folgende Terminstreifen funktioniert mit oder ohne freigegebene Daten. Schrift: lokal geladene Figtree. Original-Logo und [belegte Bildquellen](brand-spec.md) bleiben. Die alte Galerie, ihre Generatoren, Seitenbausteine und Styles sind kein Bestandteil dieser Website. Fotos können später über das zentrale Bildregister ersetzt werden, ohne die Besuchswege neu zu bauen.

**Produktgrenzen:** Konzerte werden nicht beworben wie eine zweite Startseite. Der Programmverweis führt auf `petruskirche.events`, das Café zu seinem eigenen Auftritt. Für die angekündigte Gebäudeseite gibt es keinen geratenen Link. Die Vorschau kann auf die derzeitige Gemeindewebsite verweisen, statt ungeprüfte Angaben abzuschreiben. Keine Einbettung oder WordPress-Abfrage beim Seitenaufruf.

## Was Impeccable hier beigetragen hat

Die [offizielle Arbeitsanleitung](https://impeccable.style/designing/) trennt Produktkontext, Gestaltung und Kritik. [Critique](https://impeccable.style/docs/critique/) priorisiert Befunde, ersetzt aber weder einen Browserlauf noch eine Freigabe. Für diesen Auftrag diente das lokal verfügbare Impeccable 4.1.2 im Modus _Persuade_ als Entwurfswerkzeug, nicht als UI-Bibliothek. Der entscheidende Test war keine Bewertung eines Markdown-Entwurfs: Kann jemand vom ersten Bildschirm aus einen Besuch planen und findet auch dann weiter, wenn die Vorschau keine Termine freigibt?

Implementierung: `src/layouts/Site.astro`, `src/ui/`, `src/pages/`. Öffentliche Ressourcen, Datenquellen, HTTP-Status und Datenschutzgrenzen werden weiterhin im echten Worker-Build getestet. [Sichtprüfung](review-akg-130/README.md).
