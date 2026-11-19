# Apostel-Kirchengemeinde Kiel

<!-- impeccable:product-schema 1 -->

## Platform

web

## Auftrag und Leser

Gemeindewebsite, nicht Veranstaltungsportal oder Gebäudeführer. Arbeitshypothese für den Neuaufbau: Wer die Gemeinde zum ersten Mal besucht, möchte wissen, wer hier zusammenkommt und wie man einen Gottesdienst findet. Wer schon dazugehört, soll ohne Umweg Aktuelles, Gruppen, Kontakt und den internen Zugang finden.

## Produktgrenzen

- Konzerte: vom Auftraggeber bestätigte [Veranstaltungswebsite](https://petruskirche.events/). Das Café Dreimaster hat ebenfalls eine eigene Website. Für die geplante Website des Gebäudes Petruskirche ist noch keine Adresse bestätigt.
- Keine Übernahme von WordPress-Terminen, Zuständigkeiten, Rechts- oder Zahlungsdaten. [Migrationsinventar](docs/migration/README.md) und [Inhaltsmodelle](docs/content-models.md) sind maßgeblich. Fehlende Daten bleiben erkennbar; die Website stellt nur freigegebene ChurchTools-Felder dar.
- Original-Logo unverändert. Lokale Fotos mit Freigabeschalter, Herkunft und Archivkennzeichnung (`src/lib/photos.mjs`); keine fremden Ressourcen beim Seitenaufruf.
- Fünf Hauptziele, stabile deutsche URLs, native Bedienung ohne JavaScript, Tastaturzugang und lesbare kleine Ansichten. Alle Seiten bleiben nicht indexierbare Entwürfe bis zur gesonderten Freigabe. Kein Zugangsschutz durch `noindex`.
- Bestehender [Astro-/Cloudflare-Stack](docs/stack-decision.md); die Lieferung endet bei einem geprüften PR mit Branch-Vorschau, nicht bei einem Produktionsdeploy.
