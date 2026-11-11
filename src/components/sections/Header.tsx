import logoUrl from '../../assets/svg/logo-kakadu.svg'
import { PRIMARY_PHONE } from '../../data/business'
import { useI18n } from '../../i18n/context'
import { PhoneIcon } from '../ui/Icons'
import { LanguageSwitch } from '../ui/LanguageSwitch'

/** Službeni logo (privremena SVG rekonstrukcija) + navigacija + jezik + broj telefona. */
export function Header() {
  const { t, meta } = useI18n()
  return (
    <header className="sticky top-0 z-40 border-b border-hrast/15 bg-ugalj">
      <div className="mx-auto flex h-16 max-w-[90rem] items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-10">
        <a href={meta.path} className="neon-on shrink-0" aria-label="Kebab Kakadu">
          {/* PRIVREMENO: SVG rekonstrukcija logotipa (scripts/build-logo.mjs), zamijeniti originalom. */}
          <img src={logoUrl} alt="Kakadu Döner Kebab, Bihać" width={902} height={556} className="h-11 w-auto lg:h-14" />
        </a>

        <nav aria-label={t.mainNavLabel} className="hidden lg:block">
          <ul className="flex items-center gap-7 xl:gap-9">
            {t.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="font-display text-lg font-extrabold uppercase tracking-[0.08em] text-krem/85 transition-colors hover:text-zlato"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3 lg:gap-5">
          <LanguageSwitch />
          {/* Na mobitelu je broj u donjoj traci, pa ga header prikazuje tek od 640 px */}
          <a href={`tel:${PRIMARY_PHONE.tel}`} className="hidden items-center gap-2 text-krem transition-colors hover:text-zlato sm:flex">
            <PhoneIcon size={18} className="text-zlato" />
            <span dir="ltr" className="display tabular text-xl tracking-wide lg:text-2xl">
              {PRIMARY_PHONE.display}
            </span>
          </a>
        </div>
      </div>
    </header>
  )
}
