import { useState } from 'react'
import { CONTENT } from '../../content/bs'
import { activeSchedule, DAY_NAMES } from '../../config/hours'
import { BUSINESS } from '../../data/business'
import { formatInterval, useToday } from '../../lib/zonedTime'
import { ArrowIcon, PinIcon } from '../ui/Icons'

/** Google mapa se učitava tek na klik (performanse + privatnost). */
function MapEmbed() {
  const [loaded, setLoaded] = useState(false)
  const { location } = CONTENT
  return (
    <div className="grain relative aspect-[4/3] overflow-hidden rounded-sm border border-hrast/20 bg-ugalj-3 lg:mt-4">
      {loaded ? (
        <iframe
          title={location.mapTitle}
          src={BUSINESS.maps.embed}
          className="absolute inset-0 size-full border-0 grayscale-[0.3]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        // Pregled bez fotografije: noćna fasada je već u heroju, pa se ne ponavlja.
        <div className="absolute inset-0 flex flex-col items-start justify-between gap-6 p-5 sm:p-8">
          <div>
            <PinIcon size={40} className="text-zlato" />
            <p className="display mt-4 text-[clamp(1.9rem,6vw,2.8rem)] text-krem">{BUSINESS.address.street}</p>
            <p className="mt-1 text-krem/75">
              {BUSINESS.address.postalCode} {BUSINESS.address.city} · {location.landmark}
            </p>
          </div>
          <div className="flex flex-col items-start gap-3">
            <button
              type="button"
              onClick={() => setLoaded(true)}
              className="inline-flex items-center gap-2.5 rounded-full bg-zlato px-5 py-3 font-display text-lg font-extrabold uppercase tracking-[0.1em] text-ugalj transition-transform hover:-translate-y-0.5"
            >
              <PinIcon size={20} />
              {location.mapLoad}
            </button>
            <p className="text-sm text-krem/75">{location.mapNote}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export function Location() {
  const { location } = CONTENT
  const today = useToday()

  return (
    <section id="lokacija" aria-labelledby="lokacija-title" className="grain relative bg-ugalj-2 py-24 lg:py-36">
      <div className="mx-auto grid max-w-[90rem] gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">
        <div className="lg:col-span-6">
          <h2 id="lokacija-title" className="display text-balance text-[clamp(3rem,11vw,6.5rem)] text-krem" data-reveal>
            {location.title}
          </h2>

          <address className="mt-8 not-italic" data-reveal>
            <p className="text-xl text-krem">
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
              <ArrowIcon size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
          </address>

          <div className="mt-12" data-reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h3 className="display text-4xl text-krem">{location.hoursTitle}</h3>
              <p className="text-sm text-krem/65">{activeSchedule.label}</p>
            </div>
            <table className="mt-5 w-full max-w-lg border-collapse text-left">
              <caption className="sr-only">
                {location.hoursTitle}, {activeSchedule.label.toLowerCase()}
              </caption>
              <tbody>
                {DAY_NAMES.map((day, i) => {
                  const isToday = i === today
                  const intervals = activeSchedule.week[i]
                  return (
                    <tr
                      key={day}
                      aria-current={isToday ? 'date' : undefined}
                      className={`border-b border-hrast/15 ${isToday ? 'bg-ugalj-3/70' : ''}`}
                    >
                      <th scope="row" className={`py-3 pl-3 pr-4 font-semibold ${isToday ? 'text-krem' : 'text-krem/85'}`}>
                        {day}
                        {isToday && <span className="ml-2 text-sm font-normal text-krem/60">({location.today})</span>}
                      </th>
                      <td className={`tabular py-3 pr-3 text-right ${isToday ? 'text-krem' : 'text-krem/85'}`}>
                        {intervals.length === 0
                          ? location.closed
                          : intervals.map((iv, k) => (
                              <span key={iv.open} className="block whitespace-nowrap sm:inline">
                                {k > 0 && <span className="text-krem/65 sm:mx-1.5">i </span>}
                                {formatInterval(iv)}
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
