/**
 * PODEŠAVANJA PRIKAZA STRANICE.
 */
import type { ImageKey } from '../data/images.generated.ts'

/**
 * Prikaz elemenata za koje još nema podataka: Instagram, Viber, e-mail,
 * napomena o opisima jela, „[FOTO]" napomena u galeriji i interne napomene u podnožju.
 *
 * false: demo za vlasnika, ovi elementi su sakriveni.
 * true:  radna verzija, placeholderi su vidljivi (popis je u RESEARCH.md §8).
 */
export const SHOW_PLACEHOLDERS = false

/**
 * HERO FOTOGRAFIJA: kandidati s kadriranjem.
 * mobilePosition / desktopPosition: CSS object-position (šta ostaje u kadru).
 * mobileAspect: proporcija okvira fotografije na mobitelu (ispod 640 px).
 */
export interface HeroImageOption {
  image: ImageKey
  /** alt tekst je u src/content/<jezik>.ts → hero.imageAlt */
  mobilePosition: string
  desktopPosition: string
  mobileAspect: string
  /** Kadriranje Open Graph slike (sharp position: 'top', 'centre', 'attention'…) */
  ogPosition: string
}

export const HERO_IMAGE_OPTIONS = {
  kebabTanjir: {
    image: 'kebabTanjir',
    mobilePosition: '50% 30%',
    desktopPosition: '50% 45%',
    mobileAspect: '4 / 4.4',
    ogPosition: 'attention',
  },
  fasadaNoc: {
    image: 'fasadaKvadrat',
    mobilePosition: '50% 30%',
    desktopPosition: '45% 35%',
    mobileAspect: '4 / 4.2',
    ogPosition: 'top',
  },
  enterijerSala: {
    image: 'enterijerSala',
    mobilePosition: '50% 62%',
    desktopPosition: '50% 58%',
    mobileAspect: '4 / 4.6',
    ogPosition: 'centre',
  },
} satisfies Record<string, HeroImageOption>

export type HeroImageKey = keyof typeof HERO_IMAGE_OPTIONS

/** ← Odabrana hero fotografija: 'kebabTanjir' | 'fasadaNoc' | 'enterijerSala' */
export const HERO_IMAGE: HeroImageKey = 'enterijerSala'

export const heroImage: HeroImageOption = HERO_IMAGE_OPTIONS[HERO_IMAGE]
