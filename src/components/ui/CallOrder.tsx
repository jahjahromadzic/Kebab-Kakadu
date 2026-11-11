import { BUSINESS } from '../../data/business'
import { useI18n } from '../../i18n/context'
import { PhoneIcon } from './Icons'

/**
 * Primarni CTA „Pozovi i naruči": oba broja su tel: linkovi, vidljiva odmah
 * (bez dodatnog klika). Oblik prati crvenu etiketu iz logotipa.
 */
export function CallOrder({ className = '' }: { className?: string }) {
  const { t } = useI18n()
  const [main, second] = BUSINESS.phones
  return (
    <div className={`etiketa inline-flex flex-col p-1.5 ${className}`} role="group" aria-label={t.cta.callOrder}>
      <a
        href={`tel:${main.tel}`}
        className="group flex items-center gap-3 rounded-md px-4 py-3 transition-colors duration-200 hover:bg-kakadu-tamna sm:px-5"
      >
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-zlato text-ugalj transition-transform duration-300 ease-out-expo group-hover:-rotate-12">
          <PhoneIcon size={22} />
        </span>
        <span className="flex flex-col items-start leading-none">
          <span className="font-display text-sm font-extrabold uppercase tracking-[0.18em] text-krem/85">{t.cta.callOrder}</span>
          <span dir="ltr" className="display tabular mt-1.5 text-[2.1rem] text-zlato sm:text-[2.4rem]">
            {main.display}
          </span>
        </span>
      </a>
      <a
        href={`tel:${second.tel}`}
        className="flex items-center justify-between gap-3 rounded-md border-t border-zlato/35 px-4 py-2.5 text-krem transition-colors duration-200 hover:bg-kakadu-tamna sm:px-5"
      >
        <span className="text-sm text-krem/85">{t.cta.or}</span>
        <span dir="ltr" className="display tabular text-xl tracking-wide">
          {second.display}
        </span>
      </a>
      <p className="mx-1 mt-1 rounded bg-kakadu-tamna px-3 py-2 text-center font-display text-sm font-extrabold uppercase tracking-[0.16em] text-zlato">
        <span dir="auto">{t.cta.deliveryLine}</span>
      </p>
    </div>
  )
}
