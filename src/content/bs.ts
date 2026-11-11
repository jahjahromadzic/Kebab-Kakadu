/**
 * TEKSTOVI NA STRANICI (bosanski).
 * Samo provjerene činjenice (RESEARCH.md). Placeholderi su u uglastim zagradama.
 */

const HERO_SUB =
  'Kebab, pileći file, tortilje i burgeri. Mehmedalije Maka Dizdara 6a, preko puta Doma Armije. Narudžbe telefonom, dostava na adresu 1 KM.'

/**
 * Varijante hero naslova, isključivo od provjerenih činjenica
 * (naziv, 2010., döner kebab s logotipa, lokacija preko puta Doma Armije).
 * Odabrana (klijent, 11.11.2026.): „Kebab Kakadu, od 2010."
 * Klijent bira konačnu, pa se mijenja samo HERO_VARIANT.
 * Svaki red naslova je zaseban element niza (raspored i animacija).
 */
export const HERO_VARIANTS = [
  {
    id: 'kakadu-2010',
    lines: ['Kebab Kakadu,', 'od 2010.'],
    sub: HERO_SUB,
  },
  {
    id: 'doner-kebab-bihac',
    lines: ['Döner kebab', 'u Bihaću', 'od 2010.'],
    sub: HERO_SUB,
  },
  {
    id: 'preko-puta-doma-armije',
    lines: ['Kebab', 'preko puta', 'Doma Armije.'],
    sub: 'Kebab, pileći file, tortilje i burgeri. Mehmedalije Maka Dizdara 6a. Narudžbe telefonom, dostava na adresu 1 KM.',
  },
] as const

/** ← Odabrana varijanta (0, 1 ili 2). */
export const HERO_VARIANT = 0

export const CONTENT = {
  meta: {
    title: 'Kebab Kakadu Bihać | Döner kebab od 2010. · Dostava 1 KM',
    description:
      'Kebab Kakadu u Bihaću, preko puta Doma Armije (Mehmedalije Maka Dizdara 6a). Kebab, pileći file, tortilje i burgeri. Dostava na adresu 1 KM. Telefon: 062 550 777.',
    ogImageAlt: 'Logo Kakadu Döner Kebab na fotografiji iz radnje',
  },
  skipLink: 'Preskoči na sadržaj',
  nav: [
    { href: '#meni', label: 'Meni' },
    { href: '#o-nama', label: 'O nama' },
    { href: '#galerija', label: 'Galerija' },
    { href: '#lokacija', label: 'Lokacija' },
    { href: '#kontakt', label: 'Kontakt' },
  ],
  cta: {
    callOrder: 'Pozovi i naruči',
    /** Podnaslov uz dugme „Pozovi i naruči" */
    deliveryLine: 'Dostava na adresu — 1 KM',
  },
  hero: {
    menuLink: 'Meni i cijene',
  },
  menu: {
    title: 'Meni',
    note: 'Sve cijene su u KM.',
    deliveryNote: 'Dostava samo u toku radnog vremena.',
    descriptionPlaceholder: '[OPIS JELA]',
    categoriesLabel: 'Kategorije menija',
  },
  about: {
    title: 'O nama',
    bigNumber: '2010',
    /**
     * ⚠ ČEKA ODOBRENJE VLASNIKA.
     * Napisano isključivo od provjerenih činjenica (RESEARCH.md): od 2010., adresa i
     * „preko puta Doma Armije (nekadašnji 077)" s jelovnika, narudžbe telefonom, dostava 1 KM.
     * Kad vlasnik pošalje svoju priču, zamijeniti ovaj tekst (placeholder: [PRIČA]).
     */
    story: [
      'Kebab Kakadu radi u Bihaću od 2010. godine.',
      'Nalazimo se u Ulici Mehmedalije Maka Dizdara 6a, preko puta Doma Armije, nekadašnjeg 077.',
      'Dostavu radimo sami: narudžbe primamo telefonom, a dostava na adresu košta 1 KM.',
    ],
    paragraphs: ['Hrana se može jesti u radnji ili ponijeti.'],
    storyPlaceholder: '[PRIČA: kratka priča vlasnika, npr. ko je otvorio radnju, šta je posebno u mesu i sosu]',
    facts: [
      { k: 'Otvoreno', v: '2010.' },
      { k: 'Dostava', v: '1 KM' },
      { k: 'Adresa', v: 'Mehmedalije Maka Dizdara 6a' },
    ],
    imageAlt:
      'Sala Kebab Kakadua: hrastovi stolovi, stolice s ukrštenim naslonom, zeleni zidovi i pogled kroz staklena vrata na ulicu',
    signatureLabel: 'Rukopisni natpis Kebab Kakadu, kao na fasadi radnje',
  },
  gallery: {
    title: 'Galerija',
    close: 'Zatvori',
    prev: 'Prethodna fotografija',
    next: 'Sljedeća fotografija',
    open: 'Otvori fotografiju',
  },
  location: {
    title: 'Lokacija i radno vrijeme',
    landmark: 'Preko puta Doma Armije (nekadašnji 077)',
    hoursTitle: 'Radno vrijeme',
    today: 'danas',
    closed: 'zatvoreno',
    directions: 'Otvori u Google Maps',
    mapLoad: 'Prikaži mapu',
    mapNote: 'Mapa se učitava s Google Maps servisa nakon klika.',
    mapTitle: 'Google mapa: Kebab Kakadu, Mehmedalije Maka Dizdara 6a, Bihać',
  },
  footer: {
    title: 'Kontakt',
    phoneLabel: 'Narudžbe i dostava',
    otherNumber: 'ili',
    social: 'Društvene mreže',
    facebook: 'Facebook',
    placeholders: {
      instagram: '[INSTAGRAM]',
      viber: '[VIBER]',
      email: '[EMAIL]',
    },
    logoNote: 'Logo: privremena SVG rekonstrukcija.',
    madeFor: 'Demo stranica',
  },
} as const
