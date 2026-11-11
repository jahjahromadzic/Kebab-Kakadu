/**
 * RADNO VRIJEME, jedini fajl koji treba mijenjati.
 *
 * Kad krene ljetno radno vrijeme, promijeni samo ACTIVE_SCHEDULE u 'ljetno'
 * (ili ispravi sate u šemi). Sve ostalo (tabela na stranici, status
 * „Otvoreno sada", schema.org JSON-LD) računa se iz ovih podataka.
 *
 * Vrijeme je u formatu "HH:MM", vremenska zona Europe/Sarajevo.
 * Dan može imati više intervala (npr. subota s pauzom).
 */

export const TIME_ZONE = 'Europe/Sarajevo'

/** 0 = ponedjeljak … 6 = nedjelja */
export type DayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6

export interface Interval {
  open: string
  close: string
}

export interface Schedule {
  /** interni naziv; prikazani naziv je u src/content/<jezik>.ts → location.scheduleLabels */
  label: string
  /** Izvor podatka, radi lakše provjere. */
  source: string
  /** Niz od 7 dana, ponedjeljak prvi. Prazan niz = zatvoreno. */
  week: [Interval[], Interval[], Interval[], Interval[], Interval[], Interval[], Interval[]]
}

const weekday = (open: string, close: string): Interval[] => [{ open, close }]

export const SCHEDULES = {
  zimsko: {
    label: 'Zimsko radno vrijeme',
    source: 'Facebook objava 25.10.2026. – važi od ponedjeljka 26.10.2026.',
    week: [
      weekday('08:00', '22:00'),
      weekday('08:00', '22:00'),
      weekday('08:00', '22:00'),
      weekday('08:00', '22:00'),
      weekday('08:00', '22:00'),
      [
        { open: '09:00', close: '14:00' },
        { open: '16:00', close: '22:00' },
      ],
      weekday('16:00', '22:00'),
    ],
  },
  ljetno: {
    label: 'Ljetno radno vrijeme',
    source: 'Facebook objava 04.09.2026.',
    week: [
      weekday('08:00', '23:00'),
      weekday('08:00', '23:00'),
      weekday('08:00', '23:00'),
      weekday('08:00', '23:00'),
      weekday('08:00', '23:00'),
      [
        { open: '09:00', close: '14:00' },
        { open: '18:00', close: '23:00' },
      ],
      weekday('18:00', '23:00'),
    ],
  },
} satisfies Record<string, Schedule>

export type ScheduleKey = keyof typeof SCHEDULES

/** ← OVO PROMIJENI kad se mijenja sezona. */
export const ACTIVE_SCHEDULE: ScheduleKey = 'zimsko'

export const activeSchedule: Schedule = SCHEDULES[ACTIVE_SCHEDULE]

/** Kratki nazivi za schema.org (openingHoursSpecification). */
export const SCHEMA_DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const
