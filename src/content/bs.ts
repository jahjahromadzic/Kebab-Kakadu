/**
 * TEKSTOVI NA STRANICI: bosanski (izvorni jezik).
 * Samo provjerene činjenice (RESEARCH.md). Placeholderi su u uglastim zagradama.
 * Prijevodi: en.ts, ar.ts (isti ključevi, vidi types.ts).
 */
import type { Content } from './types.ts'

export const bs: Content = {
  meta: {
    title: 'Kebab Kakadu Bihać | Döner kebab od 2010. · Dostava 1 KM',
    description:
      'Kebab Kakadu u Bihaću, preko puta Doma Armije (Mehmedalije Maka Dizdara 6a). Kebab, pileći file, tortilje i burgeri. Dostava na adresu 1 KM. Telefon: 062 550 777.',
    ogImageAlt: 'Logo Kakadu Döner Kebab na fotografiji iz radnje',
  },
  skipLink: 'Preskoči na sadržaj',
  langSwitchLabel: 'Jezik',
  mainNavLabel: 'Glavna navigacija',
  nav: [
    { href: '#meni', label: 'Meni' },
    { href: '#o-nama', label: 'O nama' },
    { href: '#galerija', label: 'Galerija' },
    { href: '#lokacija', label: 'Lokacija' },
    { href: '#kontakt', label: 'Kontakt' },
  ],
  cta: {
    callOrder: 'Pozovi i naruči',
    deliveryLine: 'Dostava na adresu — 1 KM',
    or: 'ili',
  },
  hero: {
    // Odabrao klijent 11.11.2026.
    lines: ['Kebab Kakadu,', 'od 2010.'],
    sub: 'Kebab, pileći file, tortilje i burgeri. Mehmedalije Maka Dizdara 6a, preko puta Doma Armije. Narudžbe telefonom, dostava na adresu 1 KM.',
    menuLink: 'Meni i cijene',
    imageAlt: {
      kebabTanjir: 'Isječeno döner meso s bijelim sosom i ljutom paprikom u lepinji, na tanjiru, u papiru s natpisom Kakadu',
      fasadaNoc: 'Fasada Kebab Kakadua noću: svijetleći natpis s dva plamena, okrugla viseća tabla i osvijetljena sala iza izloga',
      enterijerSala: 'Sala Kebab Kakadua: hrastovi stolovi, stolice s ukrštenim naslonom, zeleni zidovi i staklena vrata prema ulici',
    },
  },
  menu: {
    title: 'Meni',
    note: 'Sve cijene su u KM.',
    deliveryNote: 'Dostava samo u toku radnog vremena.',
    categoriesLabel: 'Kategorije menija',
    descriptionPlaceholder: '[OPIS JELA]',
    // Bosanski nazivi dolaze iz src/data/menu.ts (izvor: jelovnik radnje).
    categories: {},
    items: {},
    dackiTitle: 'Đački obrok',
    studentSubsidy: 'Studenti Univerziteta u Bihaću mogu iskoristiti subvenciju UNBI Meal.',
    photoAlt: {
      kebabLepinja: 'Kebab u pečenoj lepinji sa zelenom salatom i bijelim sosom, umotan u papir',
      kebabTanjir: 'Isječeno döner meso s bijelim sosom i ljutom paprikom na tanjiru, u papiru s natpisom Kakadu',
      kebabTortilja: 'Kebab u tortilji s paradajzom i salatom, umotan u foliju',
      kebabSalate: 'Kebab s puno mesa pored posuda sa svježim kupusom, zelenom salatom i sosom',
    },
  },
  about: {
    title: 'O nama',
    bigNumber: '2010',
    /**
     * ⚠ ČEKA ODOBRENJE VLASNIKA.
     * Napisano isključivo od provjerenih činjenica (RESEARCH.md): od 2010., adresa i
     * „preko puta Doma Armije (nekadašnji 077)" s jelovnika, narudžbe telefonom, dostava 1 KM.
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
    alts: {
      fasadaSumrak: 'Svijetleći natpis Kebab Kakadu s dva plamena iznad ulaza u sumrak',
      kebabTanjir: 'Döner meso s bijelim sosom i ljutom paprikom na tanjiru, u papiru s natpisom Kakadu',
      kebabSalate: 'Kebab s puno mesa pored posuda sa svježim kupusom, zelenom salatom i sosom',
      kebabLepinja: 'Kebab u pečenoj lepinji sa zelenom salatom i bijelim sosom, umotan u papir',
      kebabTortilja: 'Kebab u tortilji s paradajzom i salatom, umotan u foliju',
    },
    creditPlaceholder: '[FOTO: zamijeniti vlastitim fotografijama]',
  },
  location: {
    title: 'Lokacija i radno vrijeme',
    landmark: 'Preko puta Doma Armije (nekadašnji 077)',
    hoursTitle: 'Radno vrijeme',
    today: 'danas',
    closed: 'zatvoreno',
    and: 'i',
    directions: 'Otvori u Google Maps',
    mapTitle: 'Google mapa: Kebab Kakadu, Mehmedalije Maka Dizdara 6a, Bihać',
    days: ['Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak', 'Subota', 'Nedjelja'],
    scheduleLabels: { zimsko: 'Zimsko radno vrijeme', ljetno: 'Ljetno radno vrijeme' },
  },
  footer: {
    title: 'Kontakt',
    phoneLabel: 'Narudžbe i dostava',
    social: 'Društvene mreže',
    facebook: 'Facebook',
    placeholders: { instagram: '[INSTAGRAM]', viber: '[VIBER]', email: '[EMAIL]' },
    logoNote: 'Logo: privremena SVG rekonstrukcija.',
    madeFor: 'Demo stranica',
  },
}
