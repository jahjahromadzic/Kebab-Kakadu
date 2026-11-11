import type { Locale } from '../i18n/locales.ts'
import { ar } from './ar.ts'
import { bs } from './bs.ts'
import { en } from './en.ts'
import type { Content } from './types.ts'

export type { Content } from './types.ts'

export const CONTENTS: Record<Locale, Content> = { bs, en, ar }

/** Potpis izrade, isti na svim jezicima. */
export const CREDIT = 'Designed by Studio404'
