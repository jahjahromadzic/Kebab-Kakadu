import { useEffect, useState } from 'react'
import { TIME_ZONE, type DayIndex, type Interval } from '../config/hours'

const WEEKDAY_TO_INDEX: Record<string, DayIndex> = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 }

const weekdayFormatter = new Intl.DateTimeFormat('en-US', { timeZone: TIME_ZONE, weekday: 'short' })

/** Današnji dan u Bihaću (Europe/Sarajevo), bez obzira na zonu posjetioca. 0 = ponedjeljak. */
export function todayInBihac(date: Date = new Date()): DayIndex {
  return WEEKDAY_TO_INDEX[weekdayFormatter.format(date)] ?? 0
}

/**
 * Današnji dan za diskretno isticanje u tabeli radnog vremena.
 * Null pri prvom renderu: stranica je prerenderovana u buildu, a stvarni datum se zna
 * tek u pregledniku (izbjegava razliku server/klijent pri hidrataciji).
 */
export function useToday(): DayIndex | null {
  const [day, setDay] = useState<DayIndex | null>(null)
  useEffect(() => {
    setDay(todayInBihac())
    const id = window.setInterval(() => setDay(todayInBihac()), 60_000)
    return () => window.clearInterval(id)
  }, [])
  return day
}

export const formatInterval = (iv: Interval): string => `${iv.open}–${iv.close}`
