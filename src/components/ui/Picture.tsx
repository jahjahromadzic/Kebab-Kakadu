import type { CSSProperties } from 'react'
import { IMAGES, type ImageKey } from '../../data/images.generated'

interface Props {
  image: ImageKey
  alt: string
  sizes: string
  className?: string
  imgClassName?: string
  priority?: boolean
  style?: CSSProperties
}

/**
 * Responsive fotografija: AVIF → WebP, definisane dimenzije (bez layout shifta),
 * lazy loading osim za hero, pozadinska boja dok se učitava.
 */
export function Picture({ image, alt, sizes, className, imgClassName, priority = false, style }: Props) {
  const img = IMAGES[image]
  return (
    <picture className={className} style={{ backgroundColor: img.color, ...style }}>
      <source type="image/avif" srcSet={img.avif} sizes={sizes} />
      <source type="image/webp" srcSet={img.webp} sizes={sizes} />
      <img
        src={img.fallback}
        alt={alt}
        width={img.width}
        height={img.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={imgClassName}
      />
    </picture>
  )
}
