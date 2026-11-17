import { BUSINESS } from '../../data/business'
import { useI18n } from '../../i18n/context'
import { PhoneIcon } from './Icons'

/**
 * Primarni CTA „Pozovi i naruči": zaobljeno dugme (pill) s glavnim brojem i
 * diskretan tekstualni link za drugi broj.
 * Svijetla podloga i tamni brojevi (zahtjev vlasnice), u toploj krem boji umjesto čiste bijele.
 */
export function CallOrder({ className = '' }: { className?: string }) {
  const { t } = useI18n()
  const [main, second] = BUSINESS.phones
  return (
    <div className={`flex flex-col gap-3 ${className}`} role="group" aria-label={t.cta.callOrder}>
      <p className="eyebrow flex items-center gap-2">
        <PhoneIcon size={15} />
        {t.cta.callOrder}
      </p>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <a
          href={`tel:${main.tel}`}
          className="group inline-flex items-center gap-3 rounded-full bg-krem py-2 ps-2 pe-6 text-ugalj shadow-[0_14px_34px_rgb(0_0_0/0.4)] ring-1 ring-zlato/40 transition-transform duration-300 ease-out-expo hover:-translate-y-0.5"
        >
          <span className="grid size-12 shrink-0 place-items-center rounded-full bg-kakadu text-krem transition-transform duration-300 ease-out-expo group-hover:-rotate-12">
            <PhoneIcon size={22} />
          </span>
          <span dir="ltr" className="display tabular text-[2.1rem] leading-none sm:text-[2.4rem]">
            {main.display}
          </span>
        </a>
        <a href={`tel:${second.tel}`} className="group flex flex-col leading-tight text-krem/85 transition-colors hover:text-zlato">
          <span className="text-xs uppercase tracking-[0.16em] text-krem/60">{t.cta.or}</span>
          <span
            dir="ltr"
            className="display tabular text-2xl underline decoration-zlato/60 decoration-2 underline-offset-4 group-hover:decoration-zlato"
          >
            {second.display}
          </span>
        </a>
      </div>
    </div>
  )
}
