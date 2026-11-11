import { SHOW_PLACEHOLDERS } from '../../config/site'
import { useI18n } from '../../i18n/context'
import { ABOUT_SIZES } from '../../lib/imageSizes'
import { Handwriting } from '../brand/Handwriting'
import { Picture } from '../ui/Picture'

/**
 * O nama: zeleni „malter" kao zidovi sale. Fotografija sale u asimetričnom okviru,
 * preko nje krupna „2010" i rukopisni natpis s fasade koji se ispisuje.
 */
export function About() {
  const { t } = useI18n()
  const { about } = t
  return (
    <section id="o-nama" aria-labelledby="o-nama-title" className="plaster grain relative overflow-hidden py-20 lg:py-28">
      <div className="mx-auto grid max-w-[90rem] gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">
        {/* Fotografija + 2010 */}
        <div className="relative lg:col-span-6 lg:col-start-7 lg:row-start-1">
          <div className="relative ms-auto w-[88%] overflow-hidden rounded-sm shadow-[0_40px_80px_rgb(0_0_0/0.45)] lg:w-full" data-reveal-clip>
            <div className="aspect-[3/4] overflow-hidden">
              <Picture
                image="enterijerSala"
                alt={about.imageAlt}
                sizes={ABOUT_SIZES}
                className="block size-full"
                imgClassName="h-[112%] w-full object-cover will-change-transform"
              />
            </div>
          </div>
          <p
            aria-hidden="true"
            data-parallax-text
            className="display pointer-events-none absolute -bottom-6 -start-2 text-[clamp(7rem,32vw,12rem)] text-transparent [-webkit-text-stroke:2px_var(--color-kadulja-svijetla)] lg:-bottom-10 lg:-start-[38%] lg:text-[clamp(10rem,17vw,17rem)]"
          >
            {about.bigNumber}
          </p>
        </div>

        {/* Tekst */}
        <div className="relative z-10 lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:pt-10">
          <h2 id="o-nama-title" className="display text-[clamp(3.5rem,13vw,8rem)] text-krem" data-reveal>
            {about.title}
          </h2>

          <Handwriting
            className="mt-8 w-full max-w-[34rem] text-zlato drop-shadow-[0_0_14px_rgb(245_169_69/0.45)]"
            label={about.signatureLabel}
          />

          <div className="mt-8 max-w-[56ch] space-y-5 text-lg leading-relaxed text-krem/90">
            {/* ⚠ Tekst „story" čeka odobrenje vlasnika (src/content/*.ts) */}
            <p data-reveal className="text-xl text-krem">
              {about.story.join(' ')}
            </p>
            {about.paragraphs.map((p) => (
              <p key={p} data-reveal>
                {p}
              </p>
            ))}
            {SHOW_PLACEHOLDERS && (
              <p className="rounded border border-dashed border-krem/35 px-3 py-2 text-base text-krem/75">{about.storyPlaceholder}</p>
            )}
          </div>

          <dl className="mt-10 grid max-w-xl grid-cols-[auto_1fr] gap-x-6 gap-y-3 border-t border-kadulja-svijetla/30 pt-6" data-reveal>
            {about.facts.map((f) => (
              <div key={f.k} className="contents">
                <dt className="eyebrow self-center text-kadulja-svijetla">{f.k}</dt>
                <dd className="display text-3xl text-krem">
                  <bdi>{f.v}</bdi>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
