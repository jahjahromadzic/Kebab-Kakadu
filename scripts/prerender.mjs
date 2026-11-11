/**
 * Prerender svih jezičkih stranica nakon builda:
 *   dist/index.html (bs), dist/en/index.html, dist/ar/index.html
 * Svaka dobija svoj <html lang/dir>, naslov, opis, og:locale (i hreflang ako je postavljen SITE_URL)
 * te gotov HTML sadržaja (renderToString), pa su tekst i hero slika tu od prvog bajta.
 */
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const SITE_URL = (process.env.SITE_URL ?? '').replace(/\/$/, '')
const template = readFileSync(resolve('dist/index.html'), 'utf8')
if (!template.includes('<div id="root"></div>')) throw new Error('root div nije pronađen u dist/index.html')

const { render, localizeHead, LOCALES, LOCALE_META } = await import(pathToFileURL(resolve('dist-ssr/entry-server.js')).href)

for (const locale of LOCALES) {
  const out = resolve('dist', `.${LOCALE_META[locale].path}`, 'index.html')
  const html = localizeHead(template, locale, SITE_URL).replace('<div id="root"></div>', `<div id="root">${render(locale)}</div>`)
  if (/%[A-Z_]+%/.test(html)) throw new Error(`Nepopunjen placeholder u ${out}: ${html.match(/%[A-Z_]+%/)[0]}`)
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, html)
  console.log(`prerender: ${LOCALE_META[locale].path.padEnd(5)} → ${out.replace(resolve('dist'), 'dist')} (${Math.round(html.length / 1024)} KB)`)
}
rmSync(resolve('dist-ssr'), { recursive: true, force: true })
