// Pravi overlay.html: ispravljena fotografija table + nacrtani potezi preko nje.
import { readFileSync, writeFileSync } from 'node:fs'
const dir = new URL('.', import.meta.url)
const paths = JSON.parse(readFileSync(new URL('paths.json', dir), 'utf8'))
const img = readFileSync(new URL('ref.png', dir)).toString('base64')
const svg = (opacity, color) =>
  paths.map((p) => `<path d="${p.d}" stroke="${color}" stroke-width="${p.w}" stroke-opacity="${opacity}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`).join('')
writeFileSync(
  new URL('overlay.html', dir),
  `<!doctype html><meta charset="utf-8"><body style="margin:0;background:#111">
<svg width="1480" height="394" viewBox="0 0 740 197"><image href="data:image/png;base64,${img}" width="740" height="197"/>${svg(0.55, '#ff2a6d')}</svg>
<svg width="1480" height="394" viewBox="0 0 740 197" style="background:#1B1512">${svg(1, '#F4EEDC')}</svg>
</body>`,
)
console.log('ok')
