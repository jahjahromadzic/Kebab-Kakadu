import { useI18n } from '../../i18n/context'
import { LOCALES, LOCALE_META } from '../../i18n/locales'

/** Izbor jezika: obični linkovi na /, /en/, /ar/ (svaka je zasebna prerenderovana stranica). */
export function LanguageSwitch({ className = '' }: { className?: string }) {
  const { locale, t } = useI18n()
  return (
    <nav aria-label={t.langSwitchLabel} className={className}>
      <ul className="flex items-center gap-1">
        {LOCALES.map((l) => {
          const m = LOCALE_META[l]
          const current = l === locale
          return (
            <li key={l}>
              <a
                href={m.path}
                hrefLang={m.htmlLang}
                lang={m.htmlLang}
                aria-current={current ? 'page' : undefined}
                aria-label={m.name}
                title={m.name}
                className={`grid h-9 min-w-9 place-items-center rounded-full px-2 font-display text-[0.95rem] font-extrabold tracking-[0.06em] transition-colors ${
                  current ? 'bg-zlato text-ugalj' : 'text-krem/80 hover:text-zlato'
                }`}
              >
                {/* sistemski font za „ع": inače bi bs/en stranice preuzimale arapski web font samo zbog ove oznake */}
                <span className={l === 'ar' ? '[font-family:system-ui,sans-serif] text-lg leading-none' : undefined}>{m.label}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
