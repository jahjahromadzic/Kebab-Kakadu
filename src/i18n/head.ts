import { CONTENTS } from '../content/index.ts'
import { LOCALES, LOCALE_META, type Locale } from './locales.ts'

const escapeAttr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/**
 * Popunjava jezičke dijelove <head>-a (lang, dir, naslov, opis, og:locale, hreflang).
 * Koristi se u dev serveru (vite.config.ts) i pri prerenderu svake jezičke stranice.
 */
export function localizeHead(html: string, locale: Locale, siteUrl: string): string {
  const meta = LOCALE_META[locale]
  const t = CONTENTS[locale]
  // hreflang zahtijeva apsolutne URL-ove, pa se dodaje tek kad je poznata domena (SITE_URL).
  const hreflang = siteUrl
    ? [
        ...LOCALES.map((l) => `<link rel="alternate" hreflang="${LOCALE_META[l].htmlLang}" href="${siteUrl}${LOCALE_META[l].path}" />`),
        `<link rel="alternate" hreflang="x-default" href="${siteUrl}/" />`,
        `<link rel="canonical" href="${siteUrl}${meta.path}" />`,
      ].join('\n    ')
    : ''
  // Preload samo naslovnog fonta koji ta stranica stvarno koristi (vidi vite.config.ts).
  const unusedScript = locale === 'ar' ? 'latin' : 'arabic'
  return html
    .replace(new RegExp(`\\s*<link rel="preload" as="font"[^>]*data-script="${unusedScript}"[^>]*>`, 'g'), '')
    .replace(/ data-script="(latin|arabic)"/g, '')
    .replaceAll('%HTML_LANG%', meta.htmlLang)
    .replaceAll('%HTML_DIR%', meta.dir)
    .replaceAll('%SITE_TITLE%', escapeAttr(t.meta.title))
    .replaceAll('%SITE_DESCRIPTION%', escapeAttr(t.meta.description))
    .replaceAll('%OG_LOCALE%', meta.ogLocale)
    .replaceAll('%OG_IMAGE_ALT%', escapeAttr(t.meta.ogImageAlt))
    .replace('%HREFLANG%', hreflang)
}
