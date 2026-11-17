import { useEffect, useState } from 'react'
import { BUSINESS } from '../../data/business'
import { useI18n } from '../../i18n/context'
import { PhoneIcon } from '../ui/Icons'

/**
 * Mobitel: malo zeleno plutajuće dugme u donjem uglu (zdesna; u arapskom slijeva).
 * Jedan dodir poziva glavni broj. Pojavljuje se tek kad CTA iz heroja izađe s ekrana.
 */
export function MobileCallBar() {
  const { t } = useI18n()
  const [main] = BUSINESS.phones
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
    <a
      href={`tel:${main.tel}`}
      aria-label={`${t.cta.callOrder}: ${main.display}`}
      aria-hidden={!visible}
      tabIndex={visible ? undefined : -1}
      className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom))] end-4 z-50 flex items-center gap-2.5 rounded-full bg-kakadu py-2 ps-2 pe-5 text-krem shadow-[0_14px_34px_rgb(0_0_0/0.5)] ring-1 ring-zlato/50 transition-[opacity,translate] duration-300 ease-out-expo motion-reduce:transition-none active:bg-kakadu-tamna md:hidden ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-krem text-kakadu">
        <PhoneIcon size={19} />
      </span>
      <span dir="ltr" className="display tabular text-[1.35rem] leading-none">
        {main.display}
      </span>
    </a>
  )
}
