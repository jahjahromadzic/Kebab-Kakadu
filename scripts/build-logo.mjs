/**
 * PRIVREMENA SVG REKONSTRUKCIJA SLUŽBENOG LOGOTIPA „KAKADU Döner Kebab · BIHAĆ".
 *
 * Nacrtano prema snimku ekrana koji je poslao klijent
 * (research/sources/logo-sluzbeni-screenshot.png, 317×190 px).
 * Ovo NIJE originalni fajl: kad vlasnik pošalje vektorski logo, zamijeni
 * src/assets/svg/logo-kakadu.svg i public/favicon.svg originalom.
 *
 * Koordinate su u prostoru 4× uvećanog snimka (1268×760).
 * Tekst je pretvoren u putanje (opentype.js), pa logo ne zavisi od fontova:
 *   KAKADU, BIHAĆ → Outfit 600 (geometrijski sans, najsličniji originalu)
 *   Döner Kebab   → Kaushan Script (kist-rukopis, sličan originalu)
 *
 * Pokretanje: npm run logo
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import opentype from 'opentype.js'

const RED = '#AB0526'
const GOLD = '#F5A945'

const nm = (p) => new URL(`../node_modules/${p}`, import.meta.url)
const load = (p) => {
  const buf = readFileSync(nm(p))
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength))
}

const outfit = [load('@fontsource/outfit/files/outfit-latin-600-normal.woff'), load('@fontsource/outfit/files/outfit-latin-ext-600-normal.woff')]
const kaushan = [load('@fontsource/kaushan-script/files/kaushan-script-latin-400-normal.woff'), load('@fontsource/kaushan-script/files/kaushan-script-latin-ext-400-normal.woff')]

/** Tekst → SVG path, svako slovo iz prvog fonta koji ga ima; razvučeno na zadatu širinu. */
function textPath(fonts, text, { x, baseline, width, tracking = 0 }) {
  const pick = (ch) => fonts.find((f) => f.charToGlyphIndex(ch) > 0) ?? fonts[0]
  const unitAdv = (size) =>
    [...text].reduce((s, ch) => s + pick(ch).getAdvanceWidth(ch, size), 0) + tracking * (text.length - 1)
  const size = (100 * (width - tracking * (text.length - 1))) / (unitAdv(100) - tracking * (text.length - 1))
  let cx = x
  let d = ''
  for (const ch of text) {
    const f = pick(ch)
    d += f.getPath(ch, cx, baseline, size).toPathData(1)
    cx += f.getAdvanceWidth(ch, size) + tracking
  }
  return d
}

const kakadu = textPath(outfit, 'KAKADU', { x: 512, baseline: 498, width: 520, tracking: 6 })
const doner = textPath(kaushan, 'Döner Kebab', { x: 566, baseline: 610, width: 458 })
const bihac = textPath(outfit, 'BIHAĆ', { x: 752, baseline: 648, width: 100, tracking: 4 })

// Desna ivica konusa (za raspored traka mesa)
const rightEdge = (y) => (y < 318 ? 462 : 474 - (y - 318) * 0.4157)

const stripes = [
  [280, 240, 0.62, 'L'],
  [318, 0, 0.58, 'R'],
  [354, 224, 0.6, 'L'],
  [394, 0, 0.6, 'R'],
  [434, 218, 0.58, 'L'],
  [474, 0, 0.62, 'R'],
  [514, 214, 0.58, 'L'],
  [554, 0, 0.6, 'R'],
  [594, 216, 0.55, 'L'],
  [630, 0, 0.55, 'R'],
]
  .map(([y, xl, frac, side]) => {
    const left = side === 'L' ? xl : 214
    const right = rightEdge(y) - 12
    const len = (right - left) * frac
    const x0 = side === 'L' ? left + 6 : right - len
    const x1 = side === 'L' ? left + 6 + len : right
    return `M${x0.toFixed(0)},${y} Q${((x0 + x1) / 2).toFixed(0)},${y - 9} ${x1.toFixed(0)},${y + 3}`
  })
  .join(' ')

const cone =
  'M232,236 C262,222 332,222 374,228 C424,236 462,268 474,318 L338,648 C322,668 270,672 248,656 C222,636 206,560 206,470 C206,380 210,282 232,236 Z'

const doenerIcon = `
    <path d="M372,232 L368,170" stroke="${GOLD}" stroke-width="26" stroke-linecap="round"/>
    <path d="M262,662 L266,692" stroke="${GOLD}" stroke-width="22" stroke-linecap="round"/>
    <path d="${cone}" fill="${RED}" stroke="${GOLD}" stroke-width="14" stroke-linejoin="round"/>
    <path d="${stripes}" stroke="${GOLD}" stroke-width="9" stroke-linecap="round" fill="none"/>`

const parrot = `
    <g>
      <path d="M478,468 C494,466 504,478 500,492 C496,486 489,486 485,492 C479,520 464,556 444,588 L420,652 L414,602 C404,560 416,512 444,486 C454,476 466,468 478,468 Z" fill="${GOLD}"/>
      <path d="M494,472 C510,476 510,494 498,500" stroke="${GOLD}" stroke-width="7" stroke-linecap="round" fill="none"/>
      <circle cx="481" cy="481" r="4.5" fill="${RED}"/>
      <path d="M456,508 C448,536 440,562 430,590" stroke="${RED}" stroke-width="6" stroke-linecap="round" fill="none"/>
      <path d="M446,500 C440,528 432,552 424,572" stroke="${RED}" stroke-width="4" stroke-linecap="round" fill="none" opacity=".7"/>
    </g>`

const label = `
    <rect x="440" y="326" width="640" height="330" rx="22" fill="${RED}"/>
    <path d="M500,352 H1044 M372,632 H738 M866,632 H1044" stroke="${GOLD}" stroke-width="4" stroke-linecap="round"/>
    <path d="${kakadu}" fill="${GOLD}"/>
    <path d="${doner}" fill="${GOLD}"/>
    <path d="${bihac}" fill="${GOLD}"/>`

const header = `<!-- PRIVREMENO: SVG rekonstrukcija službenog logotipa Kebab Kakadu (scripts/build-logo.mjs). Zamijeniti originalom vlasnika. -->`

const logo = `${header}
<svg xmlns="http://www.w3.org/2000/svg" viewBox="190 150 902 556" role="img" aria-labelledby="kakadu-logo-title">
  <title id="kakadu-logo-title">Kakadu Döner Kebab, Bihać</title>
  <g>${label}${doenerIcon}${parrot}
  </g>
</svg>
`

// Favicon: puna zlatna döner ikona s crvenim trakama (čitljiv i na 16 px) na crvenom kvadratu
const favIcon = `
    <path d="M372,232 L368,160" stroke="${GOLD}" stroke-width="34" stroke-linecap="round"/>
    <path d="M262,662 L266,700" stroke="${GOLD}" stroke-width="30" stroke-linecap="round"/>
    <path d="${cone}" fill="${GOLD}"/>
    <path d="${stripes}" stroke="${RED}" stroke-width="16" stroke-linecap="round" fill="none"/>`
const favicon = `${header}
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="104" fill="${RED}"/>
  <g transform="translate(256 258) scale(0.78) translate(-340 -430)">${favIcon}
  </g>
</svg>
`

mkdirSync(new URL('../src/assets/svg/', import.meta.url), { recursive: true })
writeFileSync(new URL('../src/assets/svg/logo-kakadu.svg', import.meta.url), logo)
writeFileSync(new URL('../public/favicon.svg', import.meta.url), favicon)
console.log('logo-kakadu.svg', logo.length, 'B · favicon.svg', favicon.length, 'B')
