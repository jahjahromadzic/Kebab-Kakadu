# Kebab Kakadu Bihać: demo web stranica

React + Vite + TypeScript + Tailwind CSS v4, GSAP (ScrollTrigger). Stranica se prerenderuje u statički HTML pri buildu.

```bash
npm install
npm run dev        # razvoj: http://localhost:5173
npm run build      # produkcija u dist/ (s prerenderom)
npm run build:demo # demo deploy: isto + <meta name="robots" content="noindex, nofollow">
npm run preview    # pregled builda: http://localhost:4173
```

## Gdje se šta mijenja

| Šta | Fajl |
|---|---|
| **Radno vrijeme** (zimsko/ljetno, pauza) | `src/config/hours.ts`: za ljetno vrijeme promijeni `ACTIVE_SCHEDULE` u `'ljetno'` |
| **Hero fotografija** + kadriranje | `src/config/site.ts` → `HERO_IMAGE` (`'kebabTanjir'` / `'fasadaNoc'` / `'enterijerSala'`), pa `npm run images` (OG slika) |
| **Cijene i jelovnik** | `src/data/menu.ts` |
| Adresa, telefoni, mreže, Viber/Instagram/e-mail | `src/data/business.ts` (`null` = placeholder) |
| Svi tekstovi, **hero slogan** (3 varijante) | `src/content/bs.ts`: `HERO_VARIANT = 0 / 1 / 2` |
| Đački obrok / studentska subvencija | `src/data/menu.ts` → `DACKI_OBROK` (`studentSubsidy.enabled`) |
| Boje (tokeni) | `src/index.css` → `@theme` |
| **Placeholderi** (Instagram, Viber, e-mail, opisi jela, [PRIČA], [FOTO]) | `src/config/site.ts` → `SHOW_PLACEHOLDERS` (`false` = demo za vlasnika) |
| Tekst „O nama" (⚠ čeka odobrenje vlasnika) | `src/content/bs.ts` → `about.story` |

Tabela radnog vremena (s diskretno istaknutim današnjim danom, Europe/Sarajevo) i JSON-LD (`Restaurant`) računaju se iz istih podataka.

## Slike

Originali su u `assets-src/images/`. Nakon zamjene pokreni `npm run images`: skripta pravi AVIF i WebP u više širina, `src/data/images.generated.ts` i OG sliku `public/og-kakadu.jpg`.

## Privremeno (zamijeniti prije objave)

- **Logo** `src/assets/svg/logo-kakadu.svg` i `public/favicon.svg` su SVG rekonstrukcija prema snimku ekrana (`npm run logo`). Treba ih zamijeniti originalom vlasnika.
- **Rukopisni natpis** (`src/components/brand/handwritingPaths.ts`) je ručno precrtan s fotografije fasade.
- **Fotografije** su s Google Maps (korisnici) i Facebook stranice radnje. Za produkciju treba dozvola vlasnika ili vlastite fotografije.
- **Domena**: build sa `SITE_URL=https://… npm run build`, da og:image i JSON-LD imaju apsolutne URL-ove.
- **noindex**: uključuje se sa `DEMO=true npm run build` ili `npm run build:demo`. Za pravu objavu koristi običan `npm run build`.
- Placeholderi `[OPIS JELA]`, `[PRIČA]`, `[INSTAGRAM]`, `[VIBER]`, `[EMAIL]` su sakriveni dok je `SHOW_PLACEHOLDERS = false`. Popis je u `RESEARCH.md` §8. Kad se u `src/data/business.ts` upiše Instagram ili e-mail, link se prikazuje bez obzira na flag.
