import { useEffect } from 'react'
import { CONTENT } from './content/bs'
import { Header } from './components/sections/Header'
import { Hero } from './components/sections/Hero'
import { Menu } from './components/sections/Menu'
import { About } from './components/sections/About'
import { Gallery } from './components/sections/Gallery'
import { Location } from './components/sections/Location'
import { Footer } from './components/sections/Footer'
import { MobileCallBar } from './components/sections/MobileCallBar'

export default function App() {
  useEffect(() => {
    // Animacije se učitavaju naknadno (ne blokiraju prvi prikaz) i samo bez prefers-reduced-motion.
    if (!document.documentElement.classList.contains('anim')) return
    let cleanup: (() => void) | undefined
    let cancelled = false
    import('./lib/animations').then((m) => {
      if (!cancelled) cleanup = m.initAnimations()
    })
    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [])

  return (
    <>
      <a
        href="#sadrzaj"
        className="sr-only z-[60] rounded bg-zlato px-4 py-2 font-semibold text-ugalj focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {CONTENT.skipLink}
      </a>
      <Header />
      <main id="sadrzaj">
        <Hero />
        <Menu />
        <About />
        <Gallery />
        <Location />
      </main>
      <Footer />
      <MobileCallBar />
    </>
  )
}
