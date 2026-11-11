/**
 * Ikone: tanke linijske, u stilu zlatnih crteža iz logotipa (döner ikona, papagaj).
 * Sve su dekorativne (aria-hidden), tekst uz njih nosi značenje.
 */
import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

const base = (size: number, props: SVGProps<SVGSVGElement>) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
  ...props,
})

export const PhoneIcon = ({ size = 20, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M5 3.5h3.2l1.6 4.2-2.1 1.4a11.5 11.5 0 0 0 7.2 7.2l1.4-2.1 4.2 1.6V19a1.8 1.8 0 0 1-1.9 1.8C10.4 20.3 3.7 13.6 3.2 5.4A1.8 1.8 0 0 1 5 3.5Z" />
  </svg>
)

export const PinIcon = ({ size = 20, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M12 21s-6.5-6.1-6.5-11.2a6.5 6.5 0 0 1 13 0C18.5 14.9 12 21 12 21Z" />
    <circle cx="12" cy="9.8" r="2.3" />
  </svg>
)

export const ClockIcon = ({ size = 20, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
)

export const ArrowIcon = ({ size = 20, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export const CloseIcon = ({ size = 22, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)

export const FacebookIcon = ({ size = 20, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M14.5 8.5H16V5.6a17 17 0 0 0-2.3-.1c-2.3 0-3.8 1.4-3.8 4v2.2H7.4v3.2h2.5V21h3.1v-6.1h2.5l.4-3.2H13v-1.9c0-.9.3-1.3 1.5-1.3Z" />
  </svg>
)

/** Döner ikona, linijski crtež kao u logotipu */
export const DonerIcon = ({ size = 20, ...p }: IconProps) => (
  <svg {...base(size, p)} viewBox="0 0 24 24">
    <path d="M13 1.8v2.4" />
    <path d="M8.2 4.6c2.2-.6 5.4-.6 7.6.2 1.4.5 2.4 1.6 2.6 3L13.4 20c-.6.6-2.6.8-3.4.1-1.3-1.1-2-4.7-2-8.3 0-3.2.1-6 .2-7.2Z" />
    <path d="M9.4 8.1h4.6M11 11h5.5M9.2 14h4.2M10.4 17h3.4" />
    <path d="M10.7 20.6v1.6" />
  </svg>
)

/** Papagaj (kakadu), linijski crtež inspirisan papagajem iz logotipa */
export const ParrotIcon = ({ size = 20, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M13.5 4.2c1.9-.4 3.6.7 3.7 2.6l1.6 1.4-1.9.4c-.7 3.3-2.8 6.2-5.6 8.1L9.4 21l-.3-4.3c-1.4-3.9.3-10.4 4.4-12.5Z" />
    <path d="M14.8 7.1h.01" strokeWidth="2.6" />
    <path d="M12 9.5c-.6 2.2-1.6 4.3-3 5.9" />
    <path d="M12.8 4.3c-.6-1.2-.2-2.3.6-2.8M14.3 4c.1-1.2.9-2 1.8-2.1" />
  </svg>
)
