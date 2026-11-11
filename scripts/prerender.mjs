/**
 * Ubacuje statički HTML (renderToString) u dist/index.html nakon builda.
 * Hero fotografija i sav tekst su tako u HTML-u od prvog bajta (brži LCP, bolji SEO).
 */
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const dist = resolve('dist/index.html')
const { render } = await import(pathToFileURL(resolve('dist-ssr/entry-server.js')).href)
const html = readFileSync(dist, 'utf8')
if (!html.includes('<div id="root"></div>')) throw new Error('root div nije pronađen u dist/index.html')
writeFileSync(dist, html.replace('<div id="root"></div>', `<div id="root">${render()}</div>`))
rmSync(resolve('dist-ssr'), { recursive: true, force: true })
console.log('prerender: dist/index.html', Math.round(readFileSync(dist).length / 1024), 'KB')
