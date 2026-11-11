import logoUrl from '../../assets/svg/logo-kakadu.svg'
import { SHOW_PLACEHOLDERS } from '../../config/site'
import { CREDIT } from '../../content'
import { BUSINESS } from '../../data/business'
import { useI18n } from '../../i18n/context'
import { Handwriting } from '../brand/Handwriting'
import { FacebookIcon } from '../ui/Icons'

/** Podnožje: ogroman broj telefona kao tipografski element, rukopis s fasade, mreže, potpis izrade. */
export function Footer() {
  const { t } = useI18n()
  const { footer } = t
  const [main, second] = BUSINESS.phones
  return (
    <footer id="kontakt" aria-labelledby="kontakt-title" className="grain relative overflow-hidden bg-kakadu-tamna pb-40 pt-20 md:pb-12 lg:pt-28">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
        <h2 id="kontakt-title" className="display text-[clamp(3.5rem,13vw,8rem)] text-krem" data-reveal>
          {footer.title}
        </h2>
        <p className="eyebrow mt-8 text-krem">{footer.phoneLabel}</p>
        <a
          href={`tel:${main.tel}`}
          dir="ltr"
          className="display tabular mt-4 block text-[clamp(4.2rem,19vw,15rem)] text-zlato transition-colors hover:text-krem rtl:text-right"
        >
          {main.display}
        </a>
        <p className="mt-3 flex flex-wrap items-baseline gap-x-3 text-xl text-krem">
          {t.cta.or}
          <a
            href={`tel:${second.tel}`}
            dir="ltr"
            className="display tabular text-4xl text-krem underline decoration-zlato/60 decoration-2 underline-offset-8 hover:text-zlato"
          >
            {second.display}
          </a>
        </p>

        <div className="mt-16 grid gap-10 border-t border-zlato/30 pt-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-5">
            <Handwriting className="w-full max-w-[26rem] text-krem" weight={0.9} label="Kebab Kakadu" />
          </div>

          <div className="md:col-span-4">
            <p className="eyebrow text-krem/85">{footer.social}</p>
            <ul className="mt-3 space-y-2 text-krem">
              <li>
                <a href={BUSINESS.social.facebook} target="_blank" rel="noopener" className="inline-flex items-center gap-2 font-semibold hover:text-zlato">
                  <FacebookIcon /> {footer.facebook}
                </a>
              </li>
              {/* Stvarni linkovi se prikazuju čim se upišu u src/data/business.ts */}
              {BUSINESS.social.instagram && (
                <li>
                  <a href={BUSINESS.social.instagram} target="_blank" rel="noopener" className="font-semibold hover:text-zlato">
                    Instagram
                  </a>
                </li>
              )}
              {BUSINESS.email && (
                <li>
                  <a href={`mailto:${BUSINESS.email}`} className="font-semibold hover:text-zlato">
                    {BUSINESS.email}
                  </a>
                </li>
              )}
              {/* Placeholderi: podatak nije pronađen (RESEARCH.md §8), vidljivi samo uz SHOW_PLACEHOLDERS */}
              {SHOW_PLACEHOLDERS && !BUSINESS.social.instagram && <li className="text-sm text-krem/65">{footer.placeholders.instagram}</li>}
              {SHOW_PLACEHOLDERS && !BUSINESS.viber && <li className="text-sm text-krem/65">{footer.placeholders.viber}</li>}
              {SHOW_PLACEHOLDERS && !BUSINESS.email && <li className="text-sm text-krem/65">{footer.placeholders.email}</li>}
            </ul>
          </div>

          <div className="md:col-span-3 md:flex md:justify-end">
            <img src={logoUrl} alt="Kakadu Döner Kebab, Bihać" width={902} height={556} loading="lazy" className="h-16 w-auto" />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 text-xs text-krem/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {BUSINESS.name} · <bdi>{BUSINESS.address.street}, {BUSINESS.address.postalCode} {BUSINESS.address.city}</bdi>
            {SHOW_PLACEHOLDERS && ` · ${footer.madeFor} · ${footer.logoNote}`}
          </p>
          <p dir="ltr" className="font-display text-sm font-extrabold uppercase tracking-[0.16em] text-krem/80">
            {CREDIT}
          </p>
        </div>
      </div>
    </footer>
  )
}
