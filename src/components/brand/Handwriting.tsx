import { HANDWRITING_STROKES, HANDWRITING_VIEWBOX } from './handwritingPaths'

interface Props {
  className?: string
  /** Boja poteza (CSS boja). */
  color?: string
  /** Debljina: množilac debljine poteza. */
  weight?: number
  label?: string
}

/**
 * Rukopisni natpis „Kebab Kakadu" s fasade radnje (SVG potezi).
 * Animacija „ispisivanja" (stroke-dashoffset) pokreće se iz src/lib/animations.ts
 * preko atributa data-handwriting; bez animacije natpis je odmah vidljiv.
 */
export function Handwriting({ className = '', color = 'currentColor', weight = 1, label }: Props) {
  return (
    <svg
      className={className}
      viewBox={HANDWRITING_VIEWBOX}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      data-handwriting=""
    >
      <g
        transform="rotate(-3 370 110)"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {HANDWRITING_STROKES.map((s) => (
          <path key={s.id} d={s.d} strokeWidth={s.w * weight} pathLength={1} />
        ))}
      </g>
    </svg>
  )
}
