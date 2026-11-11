/**
 * Animacije (GSAP + ScrollTrigger). Učitavaju se dinamički nakon prvog prikaza i
 * samo ako korisnik nema prefers-reduced-motion (vidi index.html i App.tsx).
 * Animira se isključivo transform, opacity, clip-path i stroke-dashoffset,
 * pa nema layout shifta.
 */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const EASE = 'expo.out'

export function initAnimations(): () => void {
  const root = document.documentElement
  const mm = gsap.matchMedia()

  const ctx = gsap.context(() => {
    // 1) Naslovi: redovi izlaze odozdo iz „maske"
    gsap.utils.toArray<HTMLElement>('[data-reveal-line]').forEach((line) => {
      const inner = line.firstElementChild
      if (!inner) return
      const inHero = line.closest('#top')
      const order = Array.from(line.parentElement?.children ?? []).indexOf(line)
      gsap.fromTo(
        inner,
        // y: 0 poništava početni pomak iz CSS-a (GSAP bi ga inače pročitao kao piksele)
        { yPercent: 105, y: 0 },
        {
          yPercent: 0,
          y: 0,
          duration: 1.1,
          ease: EASE,
          delay: inHero ? 0.15 + order * 0.11 : 0,
          scrollTrigger: inHero ? undefined : { trigger: line, start: 'top 88%', once: true },
        },
      )
    })

    // 2) Blokovi teksta: blagi fade + pomak
    ScrollTrigger.batch('[data-reveal]', {
      start: 'top 90%',
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: EASE, stagger: 0.08, overwrite: true }),
    })

    // 3) Fotografije: otkrivanje odozgo (clip-path)
    gsap.utils.toArray<HTMLElement>('[data-reveal-clip]').forEach((el) => {
      gsap.fromTo(
        el,
        { clipPath: 'inset(0% 0% 100% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.3,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        },
      )
    })

    // 4) Stavke menija: kratki niz
    ScrollTrigger.batch('[data-menu-item]', {
      start: 'top 94%',
      once: true,
      onEnter: (batch) =>
        gsap.from(batch, { opacity: 0, x: -14, duration: 0.6, ease: 'power2.out', stagger: 0.045 }),
    })

    // 5) Rukopisni natpis: ispisivanje potez po potez (stroke-dashoffset)
    gsap.utils.toArray<SVGSVGElement>('[data-handwriting]').forEach((svg) => {
      const strokes = Array.from(svg.querySelectorAll<SVGPathElement>('path'))
      const lengths = strokes.map((p) => p.getTotalLength())
      const total = lengths.reduce((a, b) => a + b, 0)
      gsap.set(strokes, { strokeDasharray: 1, strokeDashoffset: 1 })
      const tl = gsap.timeline({ scrollTrigger: { trigger: svg, start: 'top 85%', once: true } })
      strokes.forEach((p, i) => {
        tl.to(p, { strokeDashoffset: 0, duration: (lengths[i] / total) * 2.6, ease: 'none' }, i === 0 ? 0 : '>-0.02')
      })
    })

    // 6) Parallax (samo veći ekrani i miš, da mobitel ostane lagan)
    mm.add('(min-width: 768px) and (pointer: fine)', () => {
      const heroImg = document.querySelector('#top picture img')
      if (heroImg) {
        gsap.fromTo(
          heroImg,
          { yPercent: -6 },
          { yPercent: 4, ease: 'none', scrollTrigger: { trigger: '#top', start: 'top top', end: 'bottom top', scrub: true } },
        )
      }
      const aboutImg = document.querySelector('#o-nama picture img')
      if (aboutImg) {
        gsap.fromTo(
          aboutImg,
          { yPercent: -8 },
          { yPercent: 0, ease: 'none', scrollTrigger: { trigger: '#o-nama', start: 'top bottom', end: 'bottom top', scrub: true } },
        )
      }
      const year = document.querySelector('[data-parallax-text]')
      if (year) {
        gsap.fromTo(
          year,
          { y: 60 },
          { y: -40, ease: 'none', scrollTrigger: { trigger: '#o-nama', start: 'top bottom', end: 'bottom top', scrub: true } },
        )
      }
    })
  })

  root.classList.add('anim-ready')

  return () => {
    mm.revert()
    ctx.revert()
  }
}
