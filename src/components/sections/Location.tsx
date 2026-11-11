import { ACTIVE_SCHEDULE, activeSchedule } from '../../config/hours'
import { BUSINESS } from '../../data/business'
import { useI18n } from '../../i18n/context'
import { formatInterval, useToday } from '../../lib/zonedTime'
import { ArrowIcon } from '../ui/Icons'

/** Google mapa je uvijek prikazana; učitava se tek kad se korisnik približi sekciji (loading="lazy"). */
function MapEmbed() {
  const { t, meta } = useI18n()
  const src = `${BUSINESS.maps.embed}&hl=${meta.htmlLang}`
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-hrast/20 bg-ugalj-3 lg:mt-4 lg:aspect-auto lg:h-[calc(100%-1rem)] lg:min-h-[26rem]">
      <iframe
        title={t.location.mapTitle}
        src={src}
        className="absolute inset-0 size-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  )
}

export function Location() {
  const { t } = useI18n()
  const { location } = t
  const today = useToday()

  return (
    <section id="lokacija" aria-labelledby="lokacija-title" className="grain relative bg-ugalj-2 pt-10 pb-20 lg:pt-14 lg:pb-28">
      <div className="mx-auto grid max-w-[90rem] gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">
        <div className="lg:col-span-6">
          <h2 id="lokacija-title" className="display text-balance text-[clamp(3rem,11vw,6.5rem)] text-krem" data-reveal>
            {location.title}
          </h2>

          <address className="mt-8 not-italic" data-reveal>
            <p dir="ltr" className="text-xl text-krem rtl:text-right">
              {BUSINESS.address.street}
              <br />
              {BUSINESS.address.postalCode} {BUSINESS.address.city}
            </p>
            <p className="mt-2 text-krem/75">{location.landmark}</p>
            <a
              href={BUSINESS.maps.directions}
              target="_blank"
              rel="noopener"
              className="group mt-4 inline-flex items-center gap-2 font-semibold text-zlato underline decoration-2 underline-offset-4 hover:text-krem"
            >
              {location.directions}
              <ArrowIcon size={18} className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </a>
          </address>

          <div className="mt-12" data-reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h3 className="display text-4xl text-krem">{location.hoursTitle}</h3>
              <p className="text-sm text-krem/65">{location.scheduleLabels[ACTIVE_SCHEDULE]}</p>
            </div>
            <table className="mt-5 w-full max-w-lg border-collapse text-start">
              <caption className="sr-only">
                {location.hoursTitle}, {location.scheduleLabels[ACTIVE_SCHEDULE]}
              </caption>
              <tbody>
                {location.days.map((day, i) => {
                  const isToday = i === today
                  const intervals = activeSchedule.week[i]
                  return (
                    <tr
                      key={day}
                      aria-current={isToday ? 'date' : undefined}
                      className={`border-b border-hrast/15 ${isToday ? 'bg-ugalj-3/70' : ''}`}
                    >
                      <th scope="row" className={`py-3 ps-3 pe-4 text-start font-semibold ${isToday ? 'text-krem' : 'text-krem/85'}`}>
                        {day}
                        {isToday && <span className="ms-2 text-sm font-normal text-krem/60">({location.today})</span>}
                      </th>
                      <td className={`tabular py-3 pe-3 text-end ${isToday ? 'text-krem' : 'text-krem/85'}`}>
                        {intervals.length === 0
                          ? location.closed
                          : intervals.map((iv, k) => (
                              <span key={iv.open} className="block whitespace-nowrap sm:inline">
                                {k > 0 && <span className="text-krem/65 sm:mx-1.5">{location.and} </span>}
                                <span dir="ltr">{formatInterval(iv)}</span>
                              </span>
                            ))}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-6" data-reveal>
          <MapEmbed />
        </div>
      </div>
    </section>
  )
}
