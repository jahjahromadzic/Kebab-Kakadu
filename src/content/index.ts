import type { Locale } from '../i18n/locales.ts'
import { ar } from './ar.ts'
import { bs } from './bs.ts'
import { en } from './en.ts'
import type { Content } from './types.ts'

export type { Content } from './types.ts'

export const CONTENTS: Record<Locale, Content> = { bs, en, ar }

/** Potpis izrade, isti na svim jezicima. */
export const CREDIT = 'Designed by Studio404'
/** Stranica studija (napomena: „4o4" sa slovom o; studio404.com s nulom je druga, prodajna domena). */
export const CREDIT_URL = 'https://studio4o4.com'
