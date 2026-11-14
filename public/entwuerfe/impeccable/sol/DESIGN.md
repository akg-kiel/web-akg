---
name: AKG · Impeccable · Sol · Entwurfsserie
description: Dokumentation der gemeinsamen tatsächlich implementierten Gestaltung, keine neue globale Markenfestlegung.
colors:
  ink: '#173b50'
  blue: '#006c9e'
  wash: '#eaf3f7'
  paper: '#ffffff'
  muted: '#476371'
  focus: '#aa420d'
  focus-on-blue: '#f2d38b'
typography:
  headline:
    fontFamily: "Figtree, 'Segoe UI', sans-serif"
    fontSize: 'clamp(2rem, 3.6vw, 3.5rem)'
    fontWeight: 650
    lineHeight: 1.08
    letterSpacing: '-0.035em'
  body:
    fontFamily: "Figtree, 'Segoe UI', sans-serif"
    fontSize: '1.0625rem'
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Figtree, 'Segoe UI', sans-serif"
    fontSize: '1rem'
    fontWeight: 650
rounded:
  square: '0px'
spacing:
  section: 'clamp(3.5rem, 7vw, 7rem)'
  page: 'clamp(1.25rem, 4vw, 4.5rem)'
components:
  button-primary:
    backgroundColor: '{colors.blue}'
    textColor: '{colors.paper}'
    rounded: '{rounded.square}'
    padding: '0.9rem 1.25rem'
  button-on-blue:
    backgroundColor: '{colors.paper}'
    textColor: '{colors.blue}'
    rounded: '{rounded.square}'
    padding: '0.9rem 1.25rem'
---

# Design System: AKG · Entwurfsserie Impeccable / Sol

## Overview

**Creative North Star: "Menschen vor Kulisse"**

Diese Dokumentation beschreibt nur `1.html` bis `5.html` in diesem Verzeichnis. Sie ändert weder `docs/design.md` noch den produktiven Auftritt. Blau/Weiß, lokales Figtree, Original-Logo und vier unveränderte Bestandsmotive sind gemeinsame Konstanten; die fünf Seitenkompositionen bleiben bewusst verschieden und stehen in `notes.md` sowie den HTML-Verträgen.

**Key Characteristics:**

- Persönliche Einladung statt erfundener Termine oder Testimonials.
- Flächige, schattenlose Gestaltung mit sichtbaren echten Menschen.
- Direkte Textlinks, rechteckige Handlungslinks und native Details.

## Colors

### Primary

Kräftiges Aktionsblau trägt Handlungslinks oder ganze Kapitel. Auf Blau stehen weiße Texte; helle Handlungsflächen tragen blaue Schrift.

### Neutral

Dunkles Ink für Überschriften und Grundtext, Weiß für offene Leseflächen, helles Blau für inhaltliche Pausen. Muted ist ausschließlich für Hinweise und Credits auf hellen Flächen vorgesehen; auf Blau bleiben diese weiß.

**The Clear Ground Rule.** Original-Logo immer unverändert auf hellem Grund. Keine Textüberlagerung und kein Filter auf den Fotos.

## Typography

Display und Fließtext verwenden dieselbe lokale variable Figtree mit `font-display: swap`. Überschriften haben balancierte Umbrüche und eine Laufweite von −0,035 em. Gemeinsame H2-Rolle siehe Frontmatter; einzelne Entwürfe verändern Displaygewicht, Breite und Größe, maximal 5,8 rem. Grundtext bleibt gut lesbar, Absätze höchstens 65 ch; viele flankierende Bildtexte sind bewusst schmaler.

Fotozeilen haben 0,8125 rem, im kleinen Fotopaar von Entwurf 4 mobil 0,75 rem. Credits bleiben eigenständige sichtbare Links, nicht Mouseover-Inhalte.

## Layout

Gemeinsame Inhaltsbreite maximal 1240 px, Seitenabstand als responsiver Clamp. Zweispaltige Inhaltsabschnitte werden unter 760 px einspaltig. Die normale Kopfzeile wechselt unter 960 px auf ein natives Menü im Dokumentfluss. Entwurf 5 nutzt auf großen Bildschirmen eine helle 240-px-Seitennavigation, unter 1100 px 200 px und unter 960 px wieder eine normale Kopfzeile. Keine horizontale Scrollpflicht, kein Scroll-Hijacking.

Die Bildproportionen folgen dem Original mit `width: 100%; height: auto`. Keine Beschnitte, Masken, Viewporthöhen für Inhaltsflächen oder festen Höhen für Text.

## Elevation & Depth

Keine Schatten oder Glasflächen. Unterschiedliche Flächengewichte und großzügige Abstände organisieren die Seite, nicht künstliche Tiefe.

## Shapes

Rechteckige Bilder und Handlungsflächen. Dünne horizontale Trennungen nur dort, wo sie auswählbare Wege oder Fragen unterscheiden. Icons als konsistente konturierte Inline-SVGs, keine Symbolfont-Abhängigkeit.

## Components

### Handlungslinks

Primärer Link mit blauer Füllung und weißer Schrift, mindestens 52 px hoch; auf Blau weiße Füllung. Hover invertiert zur dunklen beziehungsweise hellblauen Fläche. Kein Layoutsprung und keine Animation nötig. Sekundäre Links bleiben unterstrichene echte Anker mit mindestens 44 px Zielgröße.

### Navigation und Fragen

Desktopnavigation mit fünf bekannten Abschnitten. Mobiles `details/summary` öffnet im Fluss, ohne JavaScript und ohne Fokusfalle. In Entwürfen 2 und 4 erschließen native Fragen zusätzliche kurze Einsteigertexte und reale Zielseiten. Alle Seiten haben Skip-Link, ein Main und ein H1. Fokus ist ein 3-px-Ring mit 5 px Abstand; auf Blau und im dunklen Footer hellgolden, sonst dunkel warm.

### Fotos

Vier `figure`-Elemente je Seite, `srcset` 640/960/1280, deklarierte Bildproportion und sichtbare `figcaption`. Gottesdienst: Archivfoto und Frank Lönne. Beide Festfotos: Gemeindefest 2022. Café: Archivfoto, externer eigener Webauftritt. Die vollständigen Originalquellen stehen in jedem Dokument; keine offene Lizenz wird behauptet.

## Do's and Don'ts

### Do:

- **Do** eigene Besuchseinstiege und Seitenrhythmen innerhalb derselben Marke vergleichen.
- **Do** aktuelle Termine und Meldungen ehrlich als nicht eingebunden benennen.
- **Do** natürliche Dokument- und Tastaturreihenfolge erhalten.

### Don't:

- **Don't** diese Entwurfsdokumentation als neue globale Gestaltungsentscheidung auslegen.
- **Don't** aus historischen Fotos aktuelle Personenrollen oder Veranstaltungen ableiten.
- **Don't** Gebäude, erfundene Daten oder dekorative UI-Elemente als Ersatz für reale Begegnung verwenden.

Nicht kanonisiert: die konkrete Abschnittsreihenfolge eines einzelnen Entwurfs. Sie ist Gegenstand des Vergleichs, keine globale Regel. Zentrale unabhängige visuelle Abnahme bleibt beim Parent.
