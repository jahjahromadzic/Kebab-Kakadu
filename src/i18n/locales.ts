/**
 * JEZICI STRANICE. Svaki jezik ima svoju adresu i prerenderovanu stranicu:
 *   /     bosanski (podrazumijevani)
 *   /en/  engleski
 *   /ar/  arapski (zdesna nalijevo)
 */
export const LOCALES = ['bs', 'en', 'ar'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'bs'

export interface LocaleMeta {
  /** putanja stranice */
  path: string
  htmlLang: string
  dir: 'ltr' | 'rtl'
  ogLocale: string
  /** kratka oznaka u izborniku jezika */
  label: string
  /** puni naziv jezika na tom jeziku (za čitače ekrana) */
  name: string
  /** decimalni separator za cijene */
  decimal: ',' | '.'
}

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  bs: { path: '/', htmlLang: 'bs', dir: 'ltr', ogLocale: 'bs_BA', label: 'BS', name: 'Bosanski', decimal: ',' },
  en: { path: '/en/', htmlLang: 'en', dir: 'ltr', ogLocale: 'en_GB', label: 'EN', name: 'English', decimal: '.' },
  ar: { path: '/ar/', htmlLang: 'ar', dir: 'rtl', ogLocale: 'ar_AR', label: 'ع', name: 'العربية', decimal: '.' },
}

/** /en/... → 'en', /ar/... → 'ar', sve ostalo → 'bs' */
export function localeFromPath(pathname: string): Locale {
  const first = pathname.split('/').filter(Boolean)[0]
  return (LOCALES as readonly string[]).includes(first) ? (first as Locale) : DEFAULT_LOCALE
}
