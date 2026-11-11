import { useEffect } from 'react'
import { About } from './components/sections/About'
import { Footer } from './components/sections/Footer'
import { Gallery } from './components/sections/Gallery'
import { Header } from './components/sections/Header'
import { Hero } from './components/sections/Hero'
import { Location } from './components/sections/Location'
import { Menu } from './components/sections/Menu'
import { MobileCallBar } from './components/sections/MobileCallBar'
import { I18nProvider, useI18n } from './i18n/context'
import type { Locale } from './i18n/locales'

function Page() {
  const { t } = useI18n()

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
        className="sr-only z-[60] rounded bg-zlato px-4 py-2 font-semibold text-ugalj focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
      >
        {t.skipLink}
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

export default function App({ locale }: { locale: Locale }) {
  return (
    <I18nProvider locale={locale}>
      <Page />
    </I18nProvider>
  )
}
