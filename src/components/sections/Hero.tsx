import type { CSSProperties } from 'react'
import { CONTENT, HERO_VARIANTS, HERO_VARIANT } from '../../content/bs'
import { heroImage } from '../../config/site'
import { HERO_SIZES } from '../../lib/imageSizes'
import { CallOrder } from '../ui/CallOrder'
import { Picture } from '../ui/Picture'

const slogan = HERO_VARIANTS[HERO_VARIANT]

/**
 * Hero: asimetričan. Fotografija (src/config/site.ts → HERO_IMAGE) zauzima desnu stranu
 * i izlazi preko ruba, a krupni naslov s lijeve strane prelazi preko njene ivice.
 */
export function Hero() {
  const frameVars = {
    '--hero-aspect': heroImage.mobileAspect,
    '--hero-pos-m': heroImage.mobilePosition,
    '--hero-pos-d': heroImage.desktopPosition,
  } as CSSProperties

  return (
    <section id="top" aria-labelledby="hero-title" className="grain relative overflow-hidden">
      {/* topli sjaj iza fotografije */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[20%] -top-24 h-[56rem] w-[80%] rounded-full bg-[radial-gradient(closest-side,rgb(217_98_43/0.28),transparent)] lg:right-[-10%] lg:w-[60%]"
      />

      <div className="relative mx-auto grid max-w-[90rem] grid-cols-1 lg:min-h-[min(calc(100svh-5rem),58rem)] lg:grid-cols-12">
        {/* Fotografija */}
        <div className="relative lg:col-span-7 lg:col-start-6 lg:row-start-1">
          <div
            style={frameVars}
            className="hero-fade relative ml-auto aspect-[var(--hero-aspect)] w-full overflow-hidden sm:aspect-[16/12] lg:absolute lg:inset-y-0 lg:left-0 lg:right-[min(-2.5rem,calc((90rem-100vw)/2))] lg:aspect-auto lg:w-auto"
          >
            <Picture
              image={heroImage.image}
              alt={heroImage.alt}
              sizes={HERO_SIZES}
              priority
              className="absolute inset-0 block"
              imgClassName="h-[112%] w-full object-cover object-[var(--hero-pos-m)] will-change-transform lg:object-[var(--hero-pos-d)]"
            />
            {/* blago zatamnjenje fotografije radi čitljivosti naslova; ivice se same utapaju (.hero-fade) */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(to_top,rgb(27_21_18/0.55),transparent_55%)] lg:bg-[linear-gradient(to_right,rgb(27_21_18/0.55)_0%,rgb(27_21_18/0.2)_45%,transparent_70%)]"
            />
          </div>
        </div>

        {/* Tekst */}
        <div className="relative z-10 -mt-24 flex flex-col justify-center px-4 pb-14 sm:-mt-40 sm:px-6 lg:col-span-8 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:px-10 lg:py-12 short:py-6">
          <h1 id="hero-title" className="display text-balance text-[clamp(3.3rem,15vw,6rem)] text-krem lg:text-[clamp(4.8rem,7.2vw,8.5rem)] short:text-[clamp(4.2rem,min(7.2vw,13svh),8.5rem)]">
            {slogan.lines.map((line, i) => (
              <span key={line} data-reveal-line className="line-mask">
                <span className={`block ${i === slogan.lines.length - 1 ? 'text-zlato' : ''}`}>{line}</span>
              </span>
            ))}
          </h1>

          <p className="mt-6 max-w-[38ch] text-lg leading-relaxed text-krem/85 lg:mt-6 lg:text-xl short:mt-4 short:text-lg" data-reveal>
            {slogan.sub}
          </p>

          <div className="mt-8 flex flex-wrap items-end gap-x-8 gap-y-5 short:mt-5" data-reveal>
            <CallOrder className="w-full max-w-[22rem] shadow-[0_18px_40px_rgb(0_0_0/0.45)] sm:w-auto" />
            <a
              href="#meni"
              className="mb-2 inline-flex items-center font-display text-lg font-extrabold uppercase tracking-[0.12em] text-krem underline decoration-zlato decoration-2 underline-offset-[6px] transition-colors hover:text-zlato"
            >
              {CONTENT.hero.menuLink}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
