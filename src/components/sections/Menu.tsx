import { useEffect, useState } from 'react'
import { CONTENT } from '../../content/bs'
import {
  DACKI_OBROK,
  MENU,
  findItem,
  formatPrice,
  formatPriceShort,
  type MenuCategory,
  type MenuItem,
} from '../../data/menu'
import { MENU_PHOTO_SIZES } from '../../lib/imageSizes'
import { SHOW_PLACEHOLDERS } from '../../config/site'
import { Picture } from '../ui/Picture'
import { DonerIcon } from '../ui/Icons'

const PHOTO_ALT: Record<NonNullable<MenuCategory['image']>, string> = {
  kebabLepinja: 'Kebab u pečenoj lepinji sa zelenom salatom i bijelim sosom, umotan u papir',
  kebabTanjir: 'Isječeno döner meso s bijelim sosom i ljutom paprikom na tanjiru, u papiru s natpisom Kakadu',
  kebabTortilja: 'Kebab u tortilji s paradajzom i salatom, umotan u foliju',
  kebabSalate: 'Kebab s puno mesa pored posuda sa svježim kupusom, zelenom salatom i sosom',
}

function ItemRow({ item }: { item: MenuItem }) {
  return (
    <li data-menu-item className="group relative -mx-3 rounded-md px-3 py-2.5 transition-colors duration-200 hover:bg-ugalj-3">
      <div className="flex items-baseline">
        <span className="text-[1.05rem] font-semibold text-krem sm:text-lg">{item.name}</span>
        <span aria-hidden="true" className="leader transition-colors duration-200 group-hover:border-zlato/70" />
        <span className="tabular relative shrink-0 font-display text-xl font-extrabold text-zlato transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 sm:text-2xl">
          {formatPrice(item.price)}
        </span>
      </div>
      {item.description && <p className="mt-1 text-sm text-krem/70">{item.description}</p>}
    </li>
  )
}

function Category({ category }: { category: MenuCategory }) {
  return (
    <section id={`meni-${category.id}`} aria-labelledby={`h-${category.id}`} className="scroll-mt-36">
      <h3
        id={`h-${category.id}`}
        className="display mb-3 flex items-center gap-3 text-[2.6rem] text-krem sm:text-5xl"
      >
        <DonerIcon size={30} className="text-zlato" />
        {category.name}
      </h3>
      <ul>
        {category.items.map((item) => (
          <ItemRow key={item.id} item={item} />
        ))}
      </ul>
    </section>
  )
}

function DackiCard() {
  const items = DACKI_OBROK.itemIds.map(findItem).filter((i): i is MenuItem => Boolean(i))
  const price = Math.min(...items.map((i) => i.price))
  return (
    <aside aria-labelledby="dacki-title" className="etiketa relative p-5 shadow-[0_20px_40px_rgb(0_0_0/0.5)] sm:p-6">
      <div className="flex items-end justify-between gap-4">
        <h3 id="dacki-title" className="display whitespace-nowrap text-3xl text-krem sm:text-4xl">
          {DACKI_OBROK.title}
        </h3>
        <p className="display tabular whitespace-nowrap text-5xl text-zlato">{formatPriceShort(price)}</p>
      </div>
      <ul className="mt-4 space-y-1.5 border-t border-zlato/40 pt-3">
        {items.map((i) => (
          <li key={i.id} className="flex items-baseline justify-between gap-3 text-krem">
            <span className="font-semibold">{i.name}</span>
            <span className="tabular font-display text-xl font-extrabold">{formatPrice(i.price)}</span>
          </li>
        ))}
      </ul>
      {DACKI_OBROK.studentSubsidy.enabled && <p className="mt-2 text-sm text-krem">{DACKI_OBROK.studentSubsidy.text}</p>}
    </aside>
  )
}

/** Prati koja je kategorija trenutno na ekranu (za istaknutu kategoriju i fotografiju). */
function useActiveCategory(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id.replace('meni-', ''))
      },
      { rootMargin: '-35% 0px -55% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(`meni-${id}`)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [ids])
  return active
}

const MAIN = MENU.slice(0, 3)
const REST = MENU.slice(3)
const CATEGORY_IDS = MENU.map((c) => c.id)

export function Menu() {
  const active = useActiveCategory(CATEGORY_IDS)
  const photoKey = MENU.find((c) => c.id === active)?.image ?? 'kebabLepinja'
  // Fotografija se dodaje tek kad njena kategorija prvi put postane aktivna (manje preuzimanja na startu).
  const [shown, setShown] = useState<string[]>(['kebabLepinja'])
  useEffect(() => {
    setShown((s) => (s.includes(photoKey) ? s : [...s, photoKey]))
  }, [photoKey])

  return (
    <section id="meni" aria-labelledby="meni-title" className="grain relative pt-24 pb-24 lg:pt-36 lg:pb-32">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
        {/* Naslov */}
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <h2 id="meni-title" className="display text-[clamp(3.5rem,13vw,8rem)] text-krem" data-reveal>
            {CONTENT.menu.title}
          </h2>
          <p className="max-w-[32ch] pb-2 text-krem/75 lg:text-right" data-reveal>
            {CONTENT.menu.note}
            <br />
            {CONTENT.menu.deliveryNote}
          </p>
        </div>

        {/* Navigacija kategorija */}
        <nav aria-label={CONTENT.menu.categoriesLabel} className="sticky top-16 z-30 -mx-4 mt-10 border-y border-hrast/15 bg-ugalj/95 px-4 sm:-mx-6 sm:px-6 lg:top-20 lg:mx-0 lg:px-0">
          <ul className="flex gap-1 overflow-x-auto py-2 [scrollbar-width:none] lg:gap-2">
            {MENU.map((c) => (
              <li key={c.id} className="shrink-0">
                <a
                  href={`#meni-${c.id}`}
                  aria-current={active === c.id ? 'true' : undefined}
                  className={`block rounded-full px-4 py-2 font-display text-base font-extrabold uppercase tracking-[0.1em] transition-colors duration-200 ${
                    active === c.id ? 'bg-zlato text-ugalj' : 'text-krem/80 hover:text-zlato'
                  }`}
                >
                  {c.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {SHOW_PLACEHOLDERS && (
          <p className="mt-6 inline-block rounded border border-dashed border-krem/30 px-3 py-1.5 text-sm text-krem/65">
            {CONTENT.menu.descriptionPlaceholder}: sastav, sosovi i gramaža (veliki / mali / đački) još nisu dostupni.
          </p>
        )}

        {/* Glavne kategorije + fotografija */}
        <div className="mt-10 grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="space-y-14 lg:col-span-7">
            {MAIN.map((c) => (
              <Category key={c.id} category={c} />
            ))}
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <div className="lg:sticky lg:top-40">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-[0_30px_60px_rgb(0_0_0/0.55)]" data-reveal-clip>
                  {(['kebabLepinja', 'kebabTanjir', 'kebabTortilja', 'kebabSalate'] as const).filter((key) => shown.includes(key)).map((key) => (
                    <Picture
                      key={key}
                      image={key}
                      alt={PHOTO_ALT[key]}
                      sizes={MENU_PHOTO_SIZES}
                      className={`absolute inset-0 transition-opacity duration-700 ${photoKey === key ? 'opacity-100' : 'opacity-0'}`}
                      imgClassName="size-full object-cover"
                    />
                  ))}
                </div>
                <div className="relative -mt-14 ml-6 mr-2 sm:ml-16 lg:ml-4 lg:mr-4 xl:-ml-12 xl:mr-8">
                  <DackiCard />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ostalo, pića, dodaci */}
        <div className="mt-20 grid gap-14 border-t border-hrast/20 pt-14 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-16">
          {REST.map((c) => (
            <Category key={c.id} category={c} />
          ))}
        </div>
      </div>
    </section>
  )
}
