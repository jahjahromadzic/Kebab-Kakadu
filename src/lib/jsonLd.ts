import { SCHEMA_DAYS, activeSchedule } from '../config/hours.ts'
import { BUSINESS } from '../data/business.ts'
import { MENU, CURRENCY } from '../data/menu.ts'

/**
 * schema.org Restaurant, generiše se iz istih podataka kao i stranica,
 * pa se nikad ne razilazi s radnim vremenom ili adresom.
 */
export function buildRestaurantJsonLd(siteUrl: string) {
  const openingHoursSpecification = activeSchedule.week.flatMap((intervals, i) =>
    intervals.map((iv) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${SCHEMA_DAYS[i]}`,
      opens: iv.open,
      closes: iv.close,
    })),
  )

  const sameAs = [BUSINESS.social.facebook, BUSINESS.social.instagram].filter(Boolean)
  const url = siteUrl || undefined

  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: BUSINESS.name,
    alternateName: BUSINESS.legalNameOnMenu,
    ...(url && { url, '@id': `${url}/#restaurant` }),
    image: `${siteUrl}/og-kakadu.jpg`,
    logo: `${siteUrl}/icon-512.png`,
    telephone: BUSINESS.phones.map((p) => p.tel),
    foundingDate: String(BUSINESS.founded),
    servesCuisine: ['Döner kebab', 'Fast food'],
    priceRange: '2–10 KM',
    currenciesAccepted: 'BAM',
    acceptsReservations: false,
    hasMenu: `${siteUrl}/#meni`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.address.street,
      postalCode: BUSINESS.address.postalCode,
      addressLocality: BUSINESS.address.city,
      addressCountry: BUSINESS.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS.geo.lat,
      longitude: BUSINESS.geo.lng,
    },
    hasMap: BUSINESS.maps.place,
    openingHoursSpecification,
    sameAs,
    description: `Döner kebab u Bihaću od ${BUSINESS.founded}. Preko puta Doma Armije. Dostava ${BUSINESS.delivery.fee} ${CURRENCY}.`,
    menu: {
      '@type': 'Menu',
      inLanguage: 'bs',
      hasMenuSection: MENU.map((cat) => ({
        '@type': 'MenuSection',
        name: cat.name,
        hasMenuItem: cat.items.map((item) => ({
          '@type': 'MenuItem',
          name: item.name,
          offers: { '@type': 'Offer', price: item.price.toFixed(2), priceCurrency: 'BAM' },
        })),
      })),
    },
  }
}
