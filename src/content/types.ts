import type { ScheduleKey } from '../config/hours'
import type { HeroImageKey } from '../config/site'
import type { ImageKey } from '../data/images.generated'

type MenuPhotoKey = 'kebabLepinja' | 'kebabTanjir' | 'kebabTortilja' | 'kebabSalate'

/**
 * Oblik svih tekstova stranice. Svaki jezik (bs.ts, en.ts, ar.ts) mora imati sve
 * ključeve, pa TypeScript javlja ako u nekom prijevodu nešto nedostaje.
 */
export interface Content {
  meta: { title: string; description: string; ogImageAlt: string }
  skipLink: string
  langSwitchLabel: string
  mainNavLabel: string
  nav: { href: string; label: string }[]
  cta: {
    callOrder: string
    /** podnaslov uz dugme „Pozovi i naruči" */
    deliveryLine: string
    or: string
  }
  hero: {
    /** svaki red naslova je zaseban element (raspored i animacija) */
    lines: string[]
    sub: string
    menuLink: string
    imageAlt: Record<HeroImageKey, string>
  }
  menu: {
    title: string
    note: string
    deliveryNote: string
    categoriesLabel: string
    descriptionPlaceholder: string
    /** prijevodi naziva kategorija i artikala po id-u; bez prijevoda ostaje naziv iz src/data/menu.ts */
    categories: Partial<Record<string, string>>
    items: Partial<Record<string, string>>
    dackiTitle: string
    studentSubsidy: string
    photoAlt: Record<MenuPhotoKey, string>
  }
  about: {
    title: string
    bigNumber: string
    story: string[]
    paragraphs: string[]
    storyPlaceholder: string
    facts: { k: string; v: string }[]
    imageAlt: string
    signatureLabel: string
  }
  gallery: {
    title: string
    close: string
    prev: string
    next: string
    open: string
    alts: Partial<Record<ImageKey, string>>
    creditPlaceholder: string
  }
  location: {
    title: string
    landmark: string
    hoursTitle: string
    today: string
    closed: string
    and: string
    directions: string
    mapTitle: string
    /** ponedjeljak … nedjelja */
    days: [string, string, string, string, string, string, string]
    scheduleLabels: Record<ScheduleKey, string>
  }
  footer: {
    title: string
    phoneLabel: string
    social: string
    facebook: string
    placeholders: { instagram: string; viber: string; email: string }
    logoNote: string
    madeFor: string
  }
}
