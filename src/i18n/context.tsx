import { createContext, useContext, type ReactNode } from 'react'
import { CONTENTS, type Content } from '../content'
import { LOCALE_META, type Locale, type LocaleMeta } from './locales'

interface I18n {
  locale: Locale
  meta: LocaleMeta
  /** tekstovi na trenutnom jeziku */
  t: Content
}

const I18nContext = createContext<I18n>({ locale: 'bs', meta: LOCALE_META.bs, t: CONTENTS.bs })

export function I18nProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <I18nContext.Provider value={{ locale, meta: LOCALE_META[locale], t: CONTENTS[locale] }}>{children}</I18nContext.Provider>
}

export const useI18n = () => useContext(I18nContext)
