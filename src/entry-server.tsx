import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import type { Locale } from './i18n/locales'

export { LOCALES, LOCALE_META } from './i18n/locales'
export { localizeHead } from './i18n/head'

/** Prerender u buildu (scripts/prerender.mjs): HTML svake jezičke stranice je gotov odmah, React ga samo hidrira. */
export function render(locale: Locale): string {
  return renderToString(
    <StrictMode>
      <App locale={locale} />
    </StrictMode>,
  )
}
