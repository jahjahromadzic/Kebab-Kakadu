import { useEffect, useState } from 'react'
import { BUSINESS } from '../../data/business'
import { useI18n } from '../../i18n/context'
import { PhoneIcon } from '../ui/Icons'

/**
 * Mobitel: plutajuća zelena kapsula s brojevima na bijeloj podlozi (crni brojevi).
 * Pojavljuje se tek kad CTA kartica iz heroja izađe s ekrana, da se poziv ne prikazuje dvaput.
 */
export function MobileCallBar() {
  const { t } = useI18n()
  const [main, second] = BUSINESS.phones
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const heroCta = document.querySelector('#top [role="group"]')
    if (!heroCta) {
      setVisible(true)
      return
    }
    const obs = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), { threshold: 0 })
    obs.observe(heroCta)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      aria-hidden={!visible}
      className={`safe-bottom pointer-events-none fixed inset-x-0 bottom-0 z-50 px-3 transition-transform duration-300 ease-out-expo motion-reduce:transition-none md:hidden ${
        visible ? 'translate-y-0' : 'translate-y-[140%]'
      }`}
    >
      <div className="pointer-events-auto flex items-center gap-1.5 rounded-full bg-kakadu p-1.5 shadow-[0_12px_32px_rgb(0_0_0/0.45)] ring-1 ring-zlato/40">
        <a
          href={`tel:${main.tel}`}
          tabIndex={visible ? undefined : -1}
          className="flex min-w-0 flex-1 items-center gap-2.5 rounded-full bg-white py-1.5 ps-1.5 pe-4 text-[#111] active:bg-krem"
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-kakadu text-white">
            <PhoneIcon size={20} />
          </span>
          <span className="flex min-w-0 flex-col leading-none">
            <span className="truncate font-display text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-[#111]/65">
              {t.cta.callOrder}
            </span>
            <span dir="ltr" className="display tabular mt-1 text-[1.45rem]">
              {main.display}
            </span>
          </span>
        </a>
        <a
          href={`tel:${second.tel}`}
          tabIndex={visible ? undefined : -1}
          className="flex shrink-0 flex-col items-center rounded-full bg-white px-3.5 py-2 leading-none text-[#111] active:bg-krem"
        >
          <span className="text-[0.65rem] uppercase tracking-widest text-[#111]/60">{t.cta.or}</span>
          <span dir="ltr" className="display tabular mt-1 text-base">
            {second.display}
          </span>
        </a>
      </div>
    </div>
  )
}
