export const photos = {
  outside: {
    publicApproved: true,
    name: 'petruskirche',
    height: 768,
    alt: 'Die Petruskirche in Kiel-Wik: Backsteinturm und Vorplatz unter blauem Himmel.',
    source: 'https://commons.wikimedia.org/wiki/File:Petruskirche-Wik-2024-msu-2530.jpg',
    author: 'Matthias Süßen',
    license: '4.0'
  },
  ceiling: {
    publicApproved: true,
    name: 'petruskirche-dach',
    height: 640,
    alt: 'Blick hinauf in den offenen hölzernen Dachstuhl der Petruskirche.',
    source: 'https://commons.wikimedia.org/wiki/File:Petruskirche-Kiel-2026-09-msu--3400.jpg',
    author: 'Matthias Süßen',
    license: '4.0'
  },
  portal: {
    publicApproved: true,
    name: 'petruskirche-portal',
    height: 1440,
    alt: 'Ein Backsteinportal der Petruskirche mit Holztür, Metallbeschlägen und Laterne.',
    source: 'https://commons.wikimedia.org/wiki/File:Petruskirche_(Kiel-Wik)-msu-2532-2532.jpg',
    author: 'Matthias Süßen',
    license: '4.0'
  },
  side: {
    publicApproved: true,
    name: 'petruskirche-seite',
    height: 640,
    alt: 'Die Petruskirche von der Seite mit Kirchenschiff, Turm und kahlen Bäumen, aufgenommen 2015.',
    source: 'https://commons.wikimedia.org/wiki/File:Petruskirche_Kiel_15_(16739510725).jpg',
    author: 'Rüdiger Stehn',
    license: '2.0'
  },
  service: {
    publicApproved: false,
    name: 'gemeinde-gottesdienst',
    height: 546,
    large: 1280,
    alt: 'Menschen stehen gemeinsam in den Bankreihen der Petruskirche; vorne begleitet eine Band den Gottesdienst.',
    source: 'https://akg-kiel.de/wp-content/uploads/2024/01/2024_Banner_allianz_1.jpg',
    author: 'Frank Lönne',
    caption: 'Gottesdienst · Archivfoto'
  },
  conversation: {
    publicApproved: false,
    name: 'gemeinde-gespraech',
    height: 640,
    large: 1280,
    alt: 'Zwei Menschen im Gespräch auf der Wiese neben der Kirche beim Gemeindefest 2022.',
    source: 'https://akg-kiel.de/wp-content/uploads/2022/05/Gemeindefest-22-VIII.jpg',
    caption: 'Im Gespräch · Gemeindefest 2022'
  },
  gathering: {
    publicApproved: false,
    name: 'gemeinde-fest',
    height: 640,
    large: 1280,
    alt: 'Menschen sitzen auf Picknickdecken und kommen auf dem Kirchgelände beim Gemeindefest 2022 zusammen.',
    source: 'https://akg-kiel.de/wp-content/uploads/2022/05/Gemeindefest-22-XII.jpg',
    caption: 'Zeit miteinander · Gemeindefest 2022'
  },
  cafe: {
    publicApproved: false,
    name: 'cafe-dreimaster',
    height: 480,
    large: 1280,
    alt: 'Blick über die Tische im Café Dreimaster zur Theke, hinter der zwei Menschen stehen.',
    source: 'https://akg-kiel.de/wp-content/uploads/2024/01/Banner_Dreimaster.jpg',
    caption: 'Café Dreimaster · Archivfoto'
  }
};

export const withheldPhotoNames = Object.values(photos)
  .filter((photo) => photo.publicApproved !== true)
  .map((photo) => photo.name);
