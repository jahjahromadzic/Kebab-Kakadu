import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { LOCALE_META, localeFromPath } from './i18n/locales'

// Jezik određuje adresa: / (bs), /en/, /ar/.
const locale = localeFromPath(window.location.pathname)
const html = document.documentElement
html.lang = LOCALE_META[locale].htmlLang
html.dir = LOCALE_META[locale].dir

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <App locale={locale} />
  </StrictMode>
)

// U produkciji je HTML prerenderovan (scripts/prerender.mjs), pa se samo hidrira.
if (container.hasChildNodes()) hydrateRoot(container, app)
else createRoot(container).render(app)
