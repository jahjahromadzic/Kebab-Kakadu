/**
 * JELOVNIK: cijene i artikli.
 * Izvor: plakat „Kakadu Döner Kebab – Jelovnik", Facebook objava 19.09.2026.
 * Cijene su u KM (BAM). Za promjenu cijene izmijeni samo broj u `price`.
 *
 * `[OPIS JELA]` i sl.: podatak nije javno dostupan, treba ga dobiti od vlasnika.
 */

export interface MenuItem {
  id: string
  name: string
  price: number
  /** Kratki opis. Ostavi undefined dok vlasnik ne pošalje tekst. */
  description?: string
}

export interface MenuCategory {
  id: string
  name: string
  items: MenuItem[]
  /** Fotografija uz kategoriju (ključ iz src/data/images.ts). */
  image?: 'kebabLepinja' | 'kebabTanjir' | 'kebabTortilja' | 'kebabSalate'
}

export const CURRENCY = 'KM'

export const MENU: MenuCategory[] = [
  {
    id: 'kebab',
    name: 'Kebab',
    image: 'kebabLepinja',
    items: [
      { id: 'kebab-veliki', name: 'Kebab (veliki)', price: 10 },
      { id: 'kebab-mali', name: 'Kebab (mali)', price: 8 },
      { id: 'kebab-dacki', name: 'Đački kebab', price: 4 },
      { id: 'kebab-box', name: 'Kebab box', price: 10 },
    ],
  },
  {
    id: 'pileci-file',
    name: 'Pileći file',
    image: 'kebabTanjir',
    items: [
      { id: 'file-veliki', name: 'Pileći file (veliki)', price: 10 },
      { id: 'file-mali', name: 'Pileći file (mali)', price: 8 },
      { id: 'file-dacki', name: 'Pileći file (đački)', price: 4 },
    ],
  },
  {
    id: 'tortilje',
    name: 'Tortilje',
    image: 'kebabTortilja',
    items: [
      { id: 'tortilja-kebab-velika', name: 'Tortilja kebab (velika)', price: 10 },
      { id: 'tortilja-kebab-mala', name: 'Tortilja kebab (mala)', price: 8 },
      { id: 'tortilja-file-velika', name: 'Tortilja file (velika)', price: 10 },
      { id: 'tortilja-file-mala', name: 'Tortilja file (mala)', price: 8 },
    ],
  },
  {
    id: 'ostalo',
    name: 'Ostalo',
    image: 'kebabSalate',
    items: [
      { id: 'hamburger', name: 'Hamburger', price: 5 },
      { id: 'cheeseburger', name: 'Cheeseburger', price: 5 },
      { id: 'hotdog-veliki', name: 'Hot-dog (veliki)', price: 4 },
      { id: 'hotdog-mali', name: 'Hot-dog (mali)', price: 3 },
      { id: 'sendvic-veliki', name: 'Sendvič (veliki)', price: 3 },
      { id: 'sendvic-mali', name: 'Sendvič (mali)', price: 2 },
      { id: 'pomfrit', name: 'Pomfrit', price: 2 },
      { id: 'cordon-bleu', name: 'Cordon bleu', price: 5 },
      // Na plakatu je „Kebab box" naveden i ovdje (duplikat iz kategorije Kebab), pa ga izostavljamo.
      { id: 'file-box', name: 'File box', price: 10 },
    ],
  },
  {
    id: 'pica',
    name: 'Pića',
    items: [
      { id: 'gazirani', name: 'Gazirani sokovi', price: 3 },
      { id: 'vocni', name: 'Voćni sokovi', price: 3 },
      { id: 'energetska', name: 'Energetska pića', price: 3 },
      { id: 'kisela', name: 'Kisela voda', price: 2 },
      { id: 'kisela-okus', name: 'Kisela voda sa okusom', price: 2 },
      { id: 'voda', name: 'Voda', price: 2 },
    ],
  },
  {
    id: 'dodaci',
    name: 'Dodaci',
    items: [
      { id: 'kecap', name: 'Kečap', price: 1 },
      { id: 'majoneza', name: 'Majoneza', price: 1 },
    ],
  },
]

/**
 * ĐAČKI OBROK: zasebna kartica u meniju.
 * Prikazuje isključivo artikle i cijene s jelovnika (oznaka „đački").
 */
export const DACKI_OBROK = {
  title: 'Đački obrok',
  itemIds: ['kebab-dacki', 'file-dacki'],
  /**
   * Studentska subvencija (UNBI Meal) NIJE na jelovniku, nego u FB objavi 16.10.2026.
   * Isključeno dok vlasnik ne potvrdi da je želi na webu.
   */
  studentSubsidy: {
    enabled: false,
    text: 'Studenti Univerziteta u Bihaću mogu iskoristiti subvenciju UNBI Meal.',
  },
} as const

export const DELIVERY_FEE = 1

/** 10 → "10,00 KM" (decimalni zarez; ne oslanja se na ICU podatke preglednika) */
export const formatPrice = (price: number): string => `${price.toFixed(2).replace('.', ',')} ${CURRENCY}`

/** Kratki zapis za traku i oznake: 10 → "10 KM" */
export const formatPriceShort = (price: number): string => `${price} ${CURRENCY}`

export const findItem = (id: string): MenuItem | undefined =>
  MENU.flatMap((c) => c.items).find((i) => i.id === id)
