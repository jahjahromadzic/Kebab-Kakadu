import logoUrl from '../../assets/svg/logo-kakadu.svg'
import { CONTENT } from '../../content/bs'
import { PRIMARY_PHONE } from '../../data/business'
import { PhoneIcon } from '../ui/Icons'

/** Službeni logo (privremena SVG rekonstrukcija) + navigacija + broj telefona kao tekst. */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-hrast/15 bg-ugalj">
      <div className="mx-auto flex h-16 max-w-[90rem] items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-10">
        <a href="#top" className="neon-on shrink-0" aria-label="Kebab Kakadu, na početak">
          {/* PRIVREMENO: SVG rekonstrukcija logotipa (scripts/build-logo.mjs), zamijeniti originalom. */}
          <img src={logoUrl} alt="Kakadu Döner Kebab, Bihać" width={902} height={556} className="h-11 w-auto lg:h-14" />
        </a>

        <nav aria-label="Glavna navigacija" className="hidden md:block">
          <ul className="flex items-center gap-7 lg:gap-9">
            {CONTENT.nav.map((item) => (
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

        <a
          href={`tel:${PRIMARY_PHONE.tel}`}
          className="group flex items-center gap-2 text-krem transition-colors hover:text-zlato"
        >
          <PhoneIcon size={18} className="text-zlato" />
          <span className="display tabular text-xl tracking-wide lg:text-2xl">{PRIMARY_PHONE.display}</span>
        </a>
      </div>
    </header>
  )
}
