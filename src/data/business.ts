/**
 * POSLOVNI PODACI: adresa, telefoni, mreže.
 * Svaki podatak ima izvor u RESEARCH.md. Vrijednosti `null` su placeholderi
 * (podatak nije pronađen) i na stranici se ne prikazuju kao link.
 */

export interface Phone {
  display: string
  /** E.164 format za tel: link */
  tel: string
}

export const BUSINESS = {
  name: 'Kebab Kakadu',
  legalNameOnMenu: 'Kakadu Döner Kebab',
  founded: 2010,
  city: 'Bihać',
  address: {
    street: 'Mehmedalije Maka Dizdara 6a',
    postalCode: '77000',
    city: 'Bihać',
    country: 'BA',
    countryName: 'Bosna i Hercegovina',
    /** Kako ga lokalni opisuju (s jelovnika). */
    landmark: 'Preko puta Doma Armije',
    landmarkNote: 'nekadašnji 077',
  },
  geo: { lat: 44.8119625, lng: 15.8675936 },
  plusCode: 'RV69+Q2 Bihać',
  phones: [
    { display: '062 550 777', tel: '+38762550777' },
    { display: '063 515 522', tel: '+38763515522' },
  ] satisfies Phone[],
  social: {
    facebook: 'https://www.facebook.com/p/Kebab-Kakadu-100063510252565/',
    /** [INSTAGRAM]: nije pronađen */
    instagram: null as string | null,
  },
  /** [VIBER] / [WHATSAPP]: nije potvrđeno da primaju narudžbe ovim putem */
  viber: null as string | null,
  whatsapp: null as string | null,
  /** [EMAIL]: na FB se vidi samo „…hotmail.com" */
  email: null as string | null,
  maps: {
    place: 'https://www.google.com/maps/place/Kebab+Kakadu/@44.8119625,15.8675936,17z',
    directions: 'https://www.google.com/maps/dir/?api=1&destination=44.8119625,15.8675936',
    embed: 'https://www.google.com/maps?q=Kebab+Kakadu,+Mehmedalije+Maka+Dizdara+6a,+Biha%C4%87&z=17&output=embed',
  },
  delivery: {
    fee: 1,
    /** [MIN. NARUDŽBA]: FB intro kaže „Min narudzba 15km", nije potvrđeno */
    minimumOrder: null as number | null,
    onlyDuringOpeningHours: true,
  },
} as const

export const PRIMARY_PHONE = BUSINESS.phones[0]
