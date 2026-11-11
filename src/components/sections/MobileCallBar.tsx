import { BUSINESS } from '../../data/business'
import { useI18n } from '../../i18n/context'
import { PhoneIcon } from '../ui/Icons'

/** Stalno vidljiva traka na mobitelu: „Pozovi i naruči" (oba broja) + dostava. */
export function MobileCallBar() {
  const { t } = useI18n()
  const [main, second] = BUSINESS.phones

  return (
    <div className="safe-bottom fixed inset-x-0 bottom-0 z-50 border-t-2 border-zlato/70 bg-kakadu px-3 pt-2 shadow-[0_-10px_30px_rgb(0_0_0/0.45)] md:hidden">
      <p className="mb-1.5 text-center font-display text-xs font-extrabold uppercase tracking-[0.16em] text-krem">
        <span dir="auto">{t.cta.deliveryLine}</span>
      </p>
      <div className="flex gap-2">
        <a
          href={`tel:${main.tel}`}
          className="flex flex-1 items-center justify-center gap-2.5 rounded-md bg-zlato px-3 py-3 text-ugalj active:bg-krem"
        >
          <PhoneIcon size={20} />
          <span className="flex flex-col items-start leading-none">
            <span className="font-display text-[0.8rem] font-extrabold uppercase tracking-[0.14em]">{t.cta.callOrder}</span>
            <span dir="ltr" className="display tabular mt-1 text-2xl">
              {main.display}
            </span>
          </span>
        </a>
        <a
          href={`tel:${second.tel}`}
          className="flex flex-col items-center justify-center rounded-md border border-zlato/60 px-3 py-2 text-krem active:bg-kakadu-tamna"
        >
          <span className="text-[0.7rem] uppercase tracking-widest text-krem/85">{t.cta.or}</span>
          <span dir="ltr" className="display tabular text-lg">
            {second.display}
          </span>
        </a>
      </div>
    </div>
  )
}
