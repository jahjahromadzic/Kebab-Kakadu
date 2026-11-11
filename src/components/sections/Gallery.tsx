import { useCallback, useEffect, useRef, useState } from 'react'
import { heroImage } from '../../config/site'
import type { ImageKey } from '../../data/images.generated'
import { useI18n } from '../../i18n/context'
import { GALLERY_SIZES } from '../../lib/imageSizes'
import { ArrowIcon, CloseIcon } from '../ui/Icons'
import { Picture } from '../ui/Picture'

/**
 * Fotografije redom; hero fotografija (HERO_IMAGE) se ovdje preskače da se ne ponavlja.
 * Alt tekstovi su u src/content/<jezik>.ts → gallery.alts.
 * Fotografija šanka (enterijerSank) je izbačena: u kadru su radnici.
 */
const PHOTOS: ImageKey[] = ['fasadaSumrak', 'kebabTanjir', 'kebabSalate', 'kebabLepinja', 'kebabTortilja']

/**
 * Uredna mreža: 1. red široka + jedna fotografija, 2. red tri jednake.
 * Sve ćelije u redu imaju istu visinu i isti razmak.
 */
const SLOTS = [
  { shape: 'wide', grid: 'sm:col-span-2' },
  { shape: 'square', grid: '' },
  { shape: 'square', grid: '' },
  { shape: 'square', grid: '' },
  { shape: 'square', grid: '' },
] as const

const SHOTS = PHOTOS.filter((p) => p !== heroImage.image)
  .slice(0, SLOTS.length)
  .map((image, i) => ({ image, ...SLOTS[i] }))

type Shot = (typeof SHOTS)[number]

// Mobitel (slider): sve slike iste proporcije. Od 640 px visinu daje red mreže (auto-rows), pa se aspect gasi.
const ASPECT: Record<Shot['shape'], string> = {
  wide: 'aspect-[4/5] sm:aspect-auto',
  square: 'aspect-[4/5] sm:aspect-auto',
}

export function Gallery() {
  const { t, meta } = useI18n()
  const alt = (img: ImageKey) => t.gallery.alts[img] ?? ''
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [index, setIndex] = useState<number | null>(null)

  const open = (i: number) => {
    setIndex(i)
    dialogRef.current?.showModal()
  }
  const close = () => dialogRef.current?.close()
  const step = useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + SHOTS.length) % SHOTS.length)), [])

  useEffect(() => {
    const dlg = dialogRef.current
    if (!dlg) return
    // Strelice na tastaturi prate smjer čitanja (u arapskom je „sljedeća" lijevo).
    const forward = meta.dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight'
    const back = meta.dir === 'rtl' ? 'ArrowRight' : 'ArrowLeft'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === forward) step(1)
      if (e.key === back) step(-1)
    }
    const onClose = () => setIndex(null)
    dlg.addEventListener('keydown', onKey)
    dlg.addEventListener('close', onClose)
    return () => {
      dlg.removeEventListener('keydown', onKey)
      dlg.removeEventListener('close', onClose)
    }
  }, [step, meta.dir])

  const current = index !== null ? SHOTS[index] : null

  return (
    <section id="galerija" aria-labelledby="galerija-title" className="grain relative pt-20 pb-10 lg:pt-28 lg:pb-12">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
        <h2 id="galerija-title" className="display text-[clamp(3.5rem,13vw,8rem)] text-krem" data-reveal>
          {t.gallery.title}
        </h2>

        {/* Mobitel: slider (prevlačenje, slika po slika). Od 640 px: mreža s 3 kolone, redovi iste visine. */}
        <ul className="-mx-4 mt-10 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-3 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:auto-rows-[clamp(13rem,26vw,24rem)] sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:gap-5">
          {SHOTS.map((shot, i) => (
            <li key={shot.image} className={`w-[82vw] max-w-[24rem] shrink-0 snap-start sm:w-auto sm:max-w-none ${shot.grid}`}>
              <button
                type="button"
                onClick={() => open(i)}
                aria-label={`${t.gallery.open}: ${alt(shot.image)}`}
                className="group relative block size-full overflow-hidden rounded-md"
                data-reveal-clip
              >
                <Picture
                  image={shot.image}
                  alt=""
                  sizes={GALLERY_SIZES[shot.shape]}
                  className={`block size-full ${ASPECT[shot.shape]}`}
                  imgClassName="size-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-md ring-1 ring-inset ring-krem/10 transition-colors group-hover:ring-zlato/60"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialogRef}
        aria-label={current ? alt(current.image) : t.gallery.title}
        className="m-auto max-h-[94svh] max-w-[min(94vw,80rem)] overflow-hidden border-0 bg-transparent p-0 text-krem backdrop:bg-ugalj/90"
        onClick={(e) => e.target === dialogRef.current && close()}
      >
        {current && (
          <figure className="relative">
            <Picture
              key={current.image}
              image={current.image}
              alt={alt(current.image)}
              sizes="(min-width: 1024px) 70vw, 94vw"
              priority
              className="mx-auto block w-fit"
              imgClassName="block h-auto max-h-[78svh] w-auto max-w-full object-contain"
            />
            <figcaption className="mt-3 flex items-center justify-between gap-4 text-sm text-krem/85">
              <span>{alt(current.image)}</span>
              <span className="flex shrink-0 gap-2">
                <button type="button" onClick={() => step(-1)} aria-label={t.gallery.prev} className="grid size-11 place-items-center rounded-full bg-ugalj-3 hover:bg-kakadu">
                  <ArrowIcon className="rotate-180 rtl:rotate-0" />
                </button>
                <button type="button" onClick={() => step(1)} aria-label={t.gallery.next} className="grid size-11 place-items-center rounded-full bg-ugalj-3 hover:bg-kakadu">
                  <ArrowIcon className="rtl:rotate-180" />
                </button>
                <button type="button" onClick={close} aria-label={t.gallery.close} autoFocus className="grid size-11 place-items-center rounded-full bg-zlato text-ugalj">
                  <CloseIcon />
                </button>
              </span>
            </figcaption>
          </figure>
        )}
      </dialog>
    </section>
  )
}
