# Plan dizajna: Kebab Kakadu

Sve se oslanja na `RESEARCH.md`. Ovo je prijedlog za odobrenje **prije kodiranja**.

## Koncept: „Etiketa i žar"

Stranica treba izgledati kao radnja **noću**: tamna tabla fasade, crvena etiketa logotipa, zlatna slova i narandžasti sjaj grijača za döner. Svaki vizuelni element ima uzor u nečemu stvarnom:

| Element na webu | Stvarni izvor |
|---|---|
| Tamna pozadina `ugalj` | crna tabla natpisa i crni plafon |
| **Crvene etikete sa zlatnim okvirom** (cijene, oznake sekcija, „Dostava 1 KM") | etiketa službenog logotipa |
| Zlatni linijski crteži: **döner ikona i papagaj** (ikone, separatori, „na vrh") | ikona i papagaj iz logotipa |
| Narandžasti sjaj iza hero fotografije | grijač döner roštilja (`hero-doner-rostilj.jpg`) |
| Zeleno-siva sekcija s teksturom maltera | zidovi enterijera |
| Cjenovnik s tačkicama do cijene | njihovi jelovnik-plakati |
| Rukopisni dodaci („Mogli bi ogladniti.") | „Döner Kebab" u logu i rukopis na plakatima |

**Izbjegavam:** gradijente ljubičasta-plava, glassmorphism, „blob" oblike, „Dobrodošli u…", tri iste kartice, emoji, stock fotografije i AI-hranu s plakata.

## Tipografija

| Uloga | Font | Zašto |
|---|---|---|
| **Naslovi** | **Big Shoulders Display** (800–900, verzal) | Kondenzovan, „signage" karakter, kao verzali na njihovim plakatima, ali bez izlizanosti Bebas/Anton fontova. Varijabilan, pa je jedan fajl dovoljan |
| **Rukopisni akcenti** | **Kaushan Script** (rijetko, 1–2 riječi) | Kist-rukopis blizak „Döner Kebab" u logotipu i natpisu na fasadi |
| **Tekst i cijene** | **Instrument Sans** (400/600, tabularne cifre) | Čitljiv, malo uži grotesk koji se dobro slaže s kondenzovanim naslovima. Nije na zabranjenoj listi |

- Sva tri fonta imaju **latin-ext**. Test „Ćevapi, šiš, đuveč, žar" prolazi (`research/font-test.html`).
- Učitavanje: self-hosted preko **@fontsource** (samo latin + latin-ext subset), `font-display: swap`, preload naslovnog fonta.

## Boje (CSS varijable / Tailwind v4 `@theme`)

`kakadu-crvena #AB0526`, `kakadu-crvena-tamna #7E0A1E`, `zlato #F5A945`, `ugalj #1B1512`, `ugalj-2 #2A221D`, `krem #F4EEDC`, `plamen #D9622B`, `plamen-tamni #B4461A`, `kadulja #7E8573`, `kadulja-tamna #3F463A`, `kadulja-svijetla #C9CCB8`, `hrast #C98A5A`.
Pravila kontrasta su u RESEARCH.md §6.

## Logo

- **SVG rekonstrukcija službenog logotipa** prema snimku: zlatna döner ikona, crvena etiketa sa zlatnim okvirom, „KAKADU", rukopisno „Döner Kebab", „BIHAĆ" i papagaj. Jasno ću je označiti kao privremenu, dok ne stigne original.
- **Favicon:** zlatna döner ikona na crvenom kvadratu sa zaobljenim uglovima (SVG + PNG 180/192/512).

## Sekcije (mobile-first)

1. **Zaglavlje.** Logo lijevo. Desno je broj **062 550 777** kao tekst, ne kao dugme, jer ga lokalni „pamte". Na desktopu kratka navigacija: Meni · O nama · Galerija · Gdje smo.

2. **Hero (asimetričan).** Döner fotografija zauzima desnih ~60 % i izlazi preko ruba ekrana, s narandžastim sjajem. Lijevo, preko ivice fotografije, je ogroman naslov u 2–3 reda, npr. **„SVJEŽE. SOČNO. UKUSNO."** (njihov slogan), a ispod sitno, rukopisom, „od 2010. u Bihaću".
   - **Živi status:** „● Otvoreno sada · do 22:00" ili „Zatvoreno · otvaramo u 08:00", računa se iz radnog vremena.
   - **Jedno** glavno dugme: „Pozovi i naruči" (`tel:`). Pored njega crvena etiketa „Kebab veliki 10 KM".

3. **Traka s cijenama.** Horizontalna traka koja se kreće kao pano s cijenama („KEBAB VELIKI 10 KM ✦ ĐAČKI KEBAB 4 KM ✦ …"). Između stavki je zlatni papagaj ili döner ikona. *(Kasnije uklonjeno iz demo verzije.)*

4. **Meni.**
   - Na mobitelu: sticky kategorije (Kebab · Pileći file · Tortilje · Ostalo · Pića · Dodaci).
   - Na desktopu: dvije kolone različite širine. Lijevo cjenovnik s tačkicama, desno „lebdeće" fotografije hrane (lepinja, tanjir) koje se mijenjaju s kategorijom.
   - Hover na stavku: red se obasja zlatno i cijena „iskoči" u crvenu etiketu.
   - Etiketa **„Dostava 1 KM"**, malo zarotirana, kao naljepnica.
   - Podaci su u `src/data/menu.ts`. Opisi koji nedostaju stoje kao `[OPIS JELA]`.

5. **O nama / atmosfera.** Zeleno-siva sekcija s teksturom maltera.
   - Velika fotografija sale je odsječena u asimetričnom okviru, a preko nje se preklapa krupni tipografski blok **„2010"**.
   - Kratak tekst samo od provjerenih činjenica: od 2010, preko puta Doma Armije, vlastita dostava, studentski obrok (ako vlasnik želi).
   - Priča radnje stoji kao `[PRIČA]`.

6. **Galerija.** Razbijena mreža: jedna visoka, dvije široke i jedna kvadratna fotografija, s preklapanjem i različitim visinama. Na mobitelu je horizontalni scroll sa snap efektom, a klikom se otvara lightbox. Fasade su izrezane tako da se ne vide lica gostiju.

7. **Gdje smo.**
   - Lijevo: adresa, „preko puta Doma Armije (nekadašnji 077)" i tabela radnog vremena s **istaknutim današnjim danom**, uz napomenu „zimsko radno vrijeme".
   - Desno: Google Maps embed koji se učitava **tek na klik**, uz statični pregled lokacije (zbog performansi i privatnosti).

8. **Kontakt / podnožje.** Ogroman broj **062 550 777** kao tipografski element, a ispod rukopisom njihova rečenica *„Zapamtite broj!!! Mogli bi ogladniti."* Drugi broj 063 515 522, Facebook, te `[VIBER]`, `[INSTAGRAM]` i `[EMAIL]` kao vidljivi placeholderi.

9. **Mobitel: stalna donja traka** s dugmadima „Pozovi" (`tel:`) i „Meni" (ili „Mapa"). Ne prekriva sadržaj (safe-area), a kad je radnja zatvorena prikazuje „Zatvoreno · otvaramo u …".

Wolt i Glovo **ne postoje**, pa „Naruči" vodi na poziv, a ne na aplikaciju.

## Animacije (GSAP + ScrollTrigger)

| Animacija | Svrha |
|---|---|
| Natpis/logo „pali se" kao neonska tabla (jednom, ~600 ms) | podsjeća na fasadu noću |
| Hero naslov: redovi izlaze odozdo, u nizu | hijerarhija i energija |
| Parallax hero fotografije i fotografija u „O nama" (samo `transform`) | dubina |
| Traka s cijenama: brzina prati scroll | „ulični" ritam |
| Reveal stavki menija u nizu; hover efekat na redovima | čitljivost i interakcija |
| Galerija: reveal preko `clip-path` | fokus na fotografije |

- `prefers-reduced-motion`: sve se isključuje (sadržaj je odmah vidljiv), a traka miruje.
- Animira se samo `transform` i `opacity`. Elementi imaju rezervisan prostor, pa nema layout shifta (CLS ≈ 0).
- GSAP se učitava nakon prvog prikaza.

## Tehnika

- **Vite + React + TypeScript + Tailwind CSS v4**, GSAP.
- Struktura:
  - `src/components/…` (komponenta po sekciji)
  - `src/data/menu.ts`, `hours.ts`, `business.ts` (podaci)
  - `src/content/bs.ts` (tekstovi)
- Slike: skripta sa `sharp` pravi **AVIF i WebP u 3–4 širine**. Sve slike imaju `width`/`height` i `<picture>`, hero je `fetchpriority="high"`, ostale su `loading="lazy"`.
- SEO: `lang="bs"`, title i description na bosanskom, Open Graph slika (1200×630 iz fasade/hrane), JSON-LD `Restaurant` (adresa, geo, telefon, `openingHoursSpecification`, `servesCuisine`, `priceRange`, `menu`). Generiše se iz istih data fajlova.
- Pristupačnost: semantički landmark elementi, skip link, vidljivi zlatni fokus, alt tekstovi na bosanskom, mapa koja radi s tastature.
- Testiranje: 360 / 768 / 1024 / 1440+ px, Lighthouse mobile ≥ 90.

## Otvorena pitanja (ne blokiraju početak)

1. Naslov u hero sekciji: **„Svježe. Sočno. Ukusno."** (njihov slogan) ili **„Najbolji kebab u gradu"**?
2. Treba li istaknuti **studentski obrok (UNBI Meal)**?
3. Rukopisni znak „Kebab Kakadu" s fasade: koristiti ga kao sekundarni element ili samo službenu etiketu?
