// GENERISANO skriptom scripts/optimize-images.mjs (ne mijenjati ručno).
export interface OptimizedImage {
  width: number
  height: number
  avif: string
  webp: string
  fallback: string
  /** prosječna boja: pozadina dok se slika učitava */
  color: string
}

export const IMAGES = {
  kebabLepinja: {
    width: 921,
    height: 983,
    avif: '/images/opt/kebab-lepinja-480.avif 480w, /images/opt/kebab-lepinja-800.avif 800w, /images/opt/kebab-lepinja-921.avif 921w',
    webp: '/images/opt/kebab-lepinja-480.webp 480w, /images/opt/kebab-lepinja-800.webp 800w, /images/opt/kebab-lepinja-921.webp 921w',
    fallback: '/images/opt/kebab-lepinja-800.webp',
    color: 'rgb(232 216 200)',
  },
  kebabTanjir: {
    width: 1800,
    height: 1824,
    avif: '/images/opt/kebab-tanjir-480.avif 480w, /images/opt/kebab-tanjir-640.avif 640w, /images/opt/kebab-tanjir-800.avif 800w, /images/opt/kebab-tanjir-1000.avif 1000w, /images/opt/kebab-tanjir-1200.avif 1200w, /images/opt/kebab-tanjir-1600.avif 1600w',
    webp: '/images/opt/kebab-tanjir-480.webp 480w, /images/opt/kebab-tanjir-640.webp 640w, /images/opt/kebab-tanjir-800.webp 800w, /images/opt/kebab-tanjir-1000.webp 1000w, /images/opt/kebab-tanjir-1200.webp 1200w, /images/opt/kebab-tanjir-1600.webp 1600w',
    fallback: '/images/opt/kebab-tanjir-640.webp',
    color: 'rgb(24 24 40)',
  },
  kebabSalate: {
    width: 1800,
    height: 1872,
    avif: '/images/opt/kebab-salate-480.avif 480w, /images/opt/kebab-salate-800.avif 800w, /images/opt/kebab-salate-1200.avif 1200w, /images/opt/kebab-salate-1600.avif 1600w',
    webp: '/images/opt/kebab-salate-480.webp 480w, /images/opt/kebab-salate-800.webp 800w, /images/opt/kebab-salate-1200.webp 1200w, /images/opt/kebab-salate-1600.webp 1600w',
    fallback: '/images/opt/kebab-salate-800.webp',
    color: 'rgb(72 72 72)',
  },
  kebabTortilja: {
    width: 1476,
    height: 1440,
    avif: '/images/opt/kebab-tortilja-480.avif 480w, /images/opt/kebab-tortilja-800.avif 800w, /images/opt/kebab-tortilja-1200.avif 1200w, /images/opt/kebab-tortilja-1476.avif 1476w',
    webp: '/images/opt/kebab-tortilja-480.webp 480w, /images/opt/kebab-tortilja-800.webp 800w, /images/opt/kebab-tortilja-1200.webp 1200w, /images/opt/kebab-tortilja-1476.webp 1476w',
    fallback: '/images/opt/kebab-tortilja-800.webp',
    color: 'rgb(24 40 56)',
  },
  enterijerSala: {
    width: 1536,
    height: 2048,
    avif: '/images/opt/enterijer-sala-480.avif 480w, /images/opt/enterijer-sala-640.avif 640w, /images/opt/enterijer-sala-800.avif 800w, /images/opt/enterijer-sala-1000.avif 1000w, /images/opt/enterijer-sala-1200.avif 1200w, /images/opt/enterijer-sala-1536.avif 1536w',
    webp: '/images/opt/enterijer-sala-480.webp 480w, /images/opt/enterijer-sala-640.webp 640w, /images/opt/enterijer-sala-800.webp 800w, /images/opt/enterijer-sala-1000.webp 1000w, /images/opt/enterijer-sala-1200.webp 1200w, /images/opt/enterijer-sala-1536.webp 1536w',
    fallback: '/images/opt/enterijer-sala-640.webp',
    color: 'rgb(8 8 8)',
  },
  fasadaSumrak: {
    width: 1800,
    height: 840,
    avif: '/images/opt/fasada-sumrak-480.avif 480w, /images/opt/fasada-sumrak-800.avif 800w, /images/opt/fasada-sumrak-1200.avif 1200w, /images/opt/fasada-sumrak-1600.avif 1600w',
    webp: '/images/opt/fasada-sumrak-480.webp 480w, /images/opt/fasada-sumrak-800.webp 800w, /images/opt/fasada-sumrak-1200.webp 1200w, /images/opt/fasada-sumrak-1600.webp 1600w',
    fallback: '/images/opt/fasada-sumrak-800.webp',
    color: 'rgb(24 8 8)',
  },
  fasadaKvadrat: {
    width: 960,
    height: 960,
    avif: '/images/opt/fasada-noc-kvadrat-480.avif 480w, /images/opt/fasada-noc-kvadrat-640.avif 640w, /images/opt/fasada-noc-kvadrat-800.avif 800w, /images/opt/fasada-noc-kvadrat-960.avif 960w',
    webp: '/images/opt/fasada-noc-kvadrat-480.webp 480w, /images/opt/fasada-noc-kvadrat-640.webp 640w, /images/opt/fasada-noc-kvadrat-800.webp 800w, /images/opt/fasada-noc-kvadrat-960.webp 960w',
    fallback: '/images/opt/fasada-noc-kvadrat-640.webp',
    color: 'rgb(8 8 8)',
  },
} satisfies Record<string, OptimizedImage>

export type ImageKey = keyof typeof IMAGES
