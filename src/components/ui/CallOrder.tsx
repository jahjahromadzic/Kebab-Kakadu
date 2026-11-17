import { BUSINESS } from '../../data/business'
import { useI18n } from '../../i18n/context'
import { PhoneIcon } from './Icons'

/**
 * Primarni CTA „Pozovi i naruči": zelena kartica (boja zidova), oba broja kao tel: linkovi
 * na bijeloj podlozi s crnim brojevima (zahtjev vlasnice, 17.11.2026.).
 */
export function CallOrder({ className = '' }: { className?: string }) {
  const { t } = useI18n()
  const [main, second] = BUSINESS.phones
  return (
    <div className={`etiketa inline-flex flex-col gap-2 p-3 ${className}`} role="group" aria-label={t.cta.callOrder}>
      <p className="flex items-center gap-2 px-1 font-display text-sm font-extrabold uppercase tracking-[0.18em] text-krem">
        <PhoneIcon size={16} className="text-zlato" />
        {t.cta.callOrder}
      </p>
      <a
        href={`tel:${main.tel}`}
        className="group flex items-center justify-between gap-4 rounded-md bg-white px-4 py-3 text-[#111] shadow-[0_4px_14px_rgb(0_0_0/0.18)] transition-transform duration-200 hover:-translate-y-0.5"
      >
        <span dir="ltr" className="display tabular text-[2.1rem] sm:text-[2.4rem]">
          {main.display}
        </span>
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-kakadu text-white transition-transform duration-300 ease-out-expo group-hover:-rotate-12">
          <PhoneIcon size={20} />
        </span>
      </a>
      <a
        href={`tel:${second.tel}`}
        className="flex items-center justify-between gap-3 rounded-md bg-white px-4 py-2 text-[#111] transition-transform duration-200 hover:-translate-y-0.5"
      >
        <span className="text-sm text-[#111]/65">{t.cta.or}</span>
        <span dir="ltr" className="display tabular text-xl tracking-wide">
          {second.display}
        </span>
      </a>
    </div>
  )
}
