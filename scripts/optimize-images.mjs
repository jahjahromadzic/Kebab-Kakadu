/**
 * Optimizacija fotografija: assets-src/images/*.jpg → public/images/opt/*.{avif,webp}
 * u više širina + src/data/images.generated.ts (dimenzije, srcset, prosječna boja).
 * Pravi i Open Graph sliku (1200×630) s logotipom, od hero fotografije (src/config/site.ts → HERO_IMAGE).
 *
 * Pokretanje: npm run images
 */
import { mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { HERO_IMAGE_OPTIONS, HERO_IMAGE } from '../src/config/site.ts'

const SRC = new URL('../assets-src/images/', import.meta.url)
const OUT = new URL('../public/images/opt/', import.meta.url)
const WIDTHS = [480, 800, 1200, 1600]

/**
 * crop: udio slike [x, y, w, h] (0–1). Izrezi uklanjaju račune, lica gostiju i crne trake.
 */
const IMAGES = {
  kebabLepinja: { file: 'kebab-lepinja.jpg', crop: [0, 0.36, 1, 0.48] },
  kebabTanjir: { file: 'kebab-tanjir.jpg', crop: [0, 0.12, 1, 0.76], widths: [480, 640, 800, 1000, 1200, 1600] },
  kebabSalate: { file: 'kebab-salate.jpg', crop: [0, 0, 1, 0.78] },
  kebabTortilja: { file: 'kebab-tortilja.jpg', crop: [0.18, 0.4, 0.82, 0.6] },
  enterijerSala: { file: 'enterijer-sala.jpg', widths: [480, 640, 800, 1000, 1200, 1600] },
  // Original je već izrezan na natpis (bez gostiju u kadru), pa ovdje nema dodatnog izreza.
  fasadaSumrak: { file: 'fasada-sumrak.jpg' },
  fasadaKvadrat: { file: 'fasada-noc-kvadrat.jpg', widths: [480, 640, 800, 960] },
}

rmSync(OUT, { recursive: true, force: true })
mkdirSync(OUT, { recursive: true })

const result = {}

for (const [key, { file, crop, widths: customWidths, avifQuality = 52 }] of Object.entries(IMAGES)) {
  const input = readFileSync(new URL(file, SRC))
  const meta = await sharp(input).rotate().metadata()
  let pipeline = sharp(input).rotate()
  let w = meta.width
  let h = meta.height
  if (crop) {
    const [cx, cy, cw, ch] = crop
    const region = {
      left: Math.round(cx * w),
      top: Math.round(cy * h),
      width: Math.round(cw * w),
      height: Math.round(ch * h),
    }
    pipeline = pipeline.extract(region)
    w = region.width
    h = region.height
  }
  const base = await pipeline.toBuffer()
  const { dominant } = await sharp(base).stats()
  const widths = [...new Set((customWidths ?? WIDTHS).filter((x) => x < w).concat(Math.min(w, 1600)))].sort((a, b) => a - b)
  const slug = file.replace(/\.jpg$/, '')

  const entry = { width: w, height: h, avif: [], webp: [], color: '' }
  for (const width of widths) {
    const resized = sharp(base).resize({ width })
    await resized.clone().avif({ quality: avifQuality, effort: 6 }).toFile(fileURLToPath(new URL(`${slug}-${width}.avif`, OUT)))
    await resized.clone().webp({ quality: 74, effort: 6 }).toFile(fileURLToPath(new URL(`${slug}-${width}.webp`, OUT)))
    entry.avif.push(`/images/opt/${slug}-${width}.avif ${width}w`)
    entry.webp.push(`/images/opt/${slug}-${width}.webp ${width}w`)
  }
  entry.fallback = `/images/opt/${slug}-${widths[Math.min(1, widths.length - 1)]}.webp`
  entry.color = `rgb(${dominant.r} ${dominant.g} ${dominant.b})`
  result[key] = entry
  console.log(key.padEnd(14), `${w}×${h}`, widths.join(','))
}

// Open Graph: hero fotografija + logo, 1200×630
const heroKey = HERO_IMAGE_OPTIONS[HERO_IMAGE].image
const heroCfg = IMAGES[heroKey]
let ogPipeline = sharp(readFileSync(new URL(heroCfg.file, SRC))).rotate()
if (heroCfg.crop) {
  const m = await sharp(readFileSync(new URL(heroCfg.file, SRC))).rotate().metadata()
  const [cx, cy, cw, ch] = heroCfg.crop
  ogPipeline = ogPipeline.extract({ left: Math.round(cx * m.width), top: Math.round(cy * m.height), width: Math.round(cw * m.width), height: Math.round(ch * m.height) })
}
const ogBase = await sharp(await ogPipeline.toBuffer())
  .resize(1200, 630, { fit: 'cover', position: HERO_IMAGE_OPTIONS[HERO_IMAGE].ogPosition })
  .modulate({ brightness: 0.78 })
  .toBuffer()
const logoSvg = readFileSync(new URL('../src/assets/svg/logo-kakadu.svg', import.meta.url), 'utf8').replace(/<!--[\s\S]*?-->/, '')
const logoPng = await sharp(Buffer.from(logoSvg)).resize({ width: 420 }).png().toBuffer()
await sharp(ogBase)
  .composite([{ input: logoPng, left: 1200 - 420 - 44, top: 630 - 259 - 40 }])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(fileURLToPath(new URL('../public/og-kakadu.jpg', import.meta.url)))
console.log('og-kakadu.jpg 1200×630')

const ts = `// GENERISANO skriptom scripts/optimize-images.mjs (ne mijenjati ručno).
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
${Object.entries(result)
  .map(
    ([k, v]) =>
      `  ${k}: {\n    width: ${v.width},\n    height: ${v.height},\n    avif: '${v.avif.join(', ')}',\n    webp: '${v.webp.join(', ')}',\n    fallback: '${v.fallback}',\n    color: '${v.color}',\n  },`,
  )
  .join('\n')}
} satisfies Record<string, OptimizedImage>

export type ImageKey = keyof typeof IMAGES
`
writeFileSync(new URL('../src/data/images.generated.ts', import.meta.url), ts)
console.log('src/data/images.generated.ts')
