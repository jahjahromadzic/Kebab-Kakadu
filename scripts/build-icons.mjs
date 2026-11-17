// PNG ikonice (192, 512, apple-touch 180) iz public/favicon.svg, da budu iste boje kao SVG.
// Pokretanje: npm run logo (poslije build-logo.mjs).
import sharp from 'sharp'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
const pub = (f) => fileURLToPath(new URL(`../public/${f}`, import.meta.url))
const svg = readFileSync(pub('favicon.svg'))
for (const [file, size] of [['icon-192.png', 192], ['icon-512.png', 512], ['apple-touch-icon.png', 180]]) {
  let img = sharp(svg, { density: 300 }).resize(size, size)
  // iOS sam zaobljava ikonicu; providni uglovi bi postali crni, pa ide puna zelena podloga
  if (file.startsWith('apple')) img = img.flatten({ background: '#555B4E' })
  await img.png().toFile(pub(file))
  console.log(file, size)
}
