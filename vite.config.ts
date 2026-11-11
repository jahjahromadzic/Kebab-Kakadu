import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { CONTENT } from './src/content/bs.ts'
import { IMAGES } from './src/data/images.generated.ts'
import { buildRestaurantJsonLd } from './src/lib/jsonLd.ts'
import { HERO_SIZES } from './src/lib/imageSizes.ts'
import { heroImage } from './src/config/site.ts'

/**
 * Javni URL stranice (za og:image i JSON-LD). Domena još ne postoji: [DOMENA].
 * Postavi pri buildu: SITE_URL=https://primjer.ba npm run build
 */
const SITE_URL = (process.env.SITE_URL ?? '').replace(/\/$/, '')

const escapeAttr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/**
 * Ubacuje meta podatke, preload hero slike i schema.org JSON-LD u index.html.
 * Demo deploy (DEMO=true ili `vite build --mode demo`) dobija <meta name="robots" content="noindex">,
 * da ga pretraživači ne indeksiraju.
 */
function seoHtml(): Plugin {
  let demo = process.env.DEMO === 'true'
  return {
    name: 'kakadu-seo-html',
    configResolved(config) {
      demo ||= config.mode === 'demo'
      if (demo && config.command === 'build') config.logger.info('DEMO build: dodan <meta name="robots" content="noindex, nofollow">')
    },
    transformIndexHtml(html, ctx) {
      const hero = IMAGES[heroImage.image]
      let preload = `<link rel="preload" as="image" type="image/avif" imagesrcset="${hero.avif}" imagesizes="${HERO_SIZES}" fetchpriority="high" />`
      // Naslovni font (latin) odmah: bez njega rezervni font lomi hero naslov drugačije (layout shift).
      const displayFont = Object.keys(ctx.bundle ?? {}).find((f) => /big-shoulders-display-latin-wght-normal.*\.woff2$/.test(f))
      if (displayFont) preload += `\n    <link rel="preload" as="font" type="font/woff2" href="/${displayFont}" crossorigin />`
      const jsonLd = JSON.stringify(buildRestaurantJsonLd(SITE_URL)).replace(/</g, '\\u003c')
      return html
        .replaceAll('%SITE_TITLE%', escapeAttr(CONTENT.meta.title))
        .replaceAll('%SITE_DESCRIPTION%', escapeAttr(CONTENT.meta.description))
        .replaceAll('%SITE_URL%', SITE_URL)
        .replaceAll('%OG_IMAGE_ALT%', escapeAttr(CONTENT.meta.ogImageAlt))
        .replace('%HERO_PRELOAD%', preload)
        .replace('%ROBOTS_META%', demo ? '<meta name="robots" content="noindex, nofollow" />' : '')
        .replace('%JSON_LD%', `<script type="application/ld+json">${jsonLd}</script>`)
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoHtml()],
  build: {
    target: 'es2022',
    cssCodeSplit: true,
  },
})
