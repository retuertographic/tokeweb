# toketukcanarias.com — clone brief

Source: https://toketukcanarias.com/ (WordPress + Elementor, Spanish `lang="es"`; GTranslate auto-translates for non-Spanish browsers, so inspection was done with `locale: es-ES`).

## Route map

| Source | Local | Files |
| --- | --- | --- |
| `https://toketukcanarias.com/` | `/` | `src/app/page.tsx` → `HomePage.tsx` |
| every other page and the blog post (30 routes) | `/<same-slug>/` | `src/app/[slug]/page.tsx` → `Pages.tsx` (one template per kind) |

`next.config.ts` sets `trailingSlash: true` so paths match WordPress exactly. Only Google reviews/Maps, AMATE, AEPD and the EU ODR site stay external.

### Inner pages

| Kind | Pages |
| --- | --- |
| tour (TuriTop booking + text + slideshow + map + FAQ) | 16 tour pages incl. Lanzarote and the VIP routes |
| listing | tours, tours-tenerife, tours-gran-canaria, tours-lanzarote |
| legal | aviso-legal, politica-de-privacidad, politica-de-cookies, condiciones-generales-de-contratacion-cgc |
| one-offs | quienes-somos, colaboraciones-especiales, gracias-por-su-compra, construction, blog, puerto-de-la-cruz-5-razones-para-descubrir |

Content pipeline (re-run to refresh from the live site):

1. Save page HTML to `pages/<slug>.html` (curl) and live-DOM captures to `live/<slug>.json`.
2. `python3 -I scripts/extract-toketukcanarias.py docs/research/toketukcanarias/pages docs/research/toketukcanarias/pages.json` — turns Elementor widgets into blocks with whitelisted HTML.
3. `python3 -I scripts/build-toketukcanarias-pages.py docs/research/toketukcanarias/pages.json docs/research/toketukcanarias/live` — downloads images to `public/sites/toketukcanarias/pages/` and writes `src/components/sites/toketukcanarias/pages.json`.

(Large photos were afterwards resized to ≤1600px and photographic PNGs re-encoded as JPEG.)

## Section order (desktop 1440, measured)

| Section | Top / height | Notes |
| --- | --- | --- |
| Header (sticky) | 0 / 80 | `#F2E7DF`, logo 130px, nav Roboto 300 16px with black sweep hover, dropdowns, BOOK ONLINE black button, round flags |
| Hero | 80 / 721 | bg layer ~140% tall anchored bottom, glass box `rgba(242,231,223,.79)` r30, Manrope 37px headline with double-underline marker `#22C59D` |
| Tours Tenerife | title 801, rows 976–3101 | 11 Elementor CTA cards: 200px image, `#F9FAFA` body, Roboto 23/600 title |
| Tours Gran Canaria | 3101–3766 | 2 cards |
| 100% Eléctrico | 3846 / 751 | 80px white gap above, glass box + tuk-tuk PNG |
| ¿Cómo funciona? | 4597 / 362 | 3 steps, `#59E893` line, icon discs |
| Gallery carousel | 4958 / 290 | 5 photos, 3 per view |
| Google reviews | 5248 / 1247 | WP Social Ninja grid, 3 cols |
| ¿Por qué elegirnos? | 6495 / 394 | 3 white cards |
| Quiénes somos | 6889 / 618 | 672×448 image r30 + teal `#14A59F` box |
| Oficina Santa Cruz | 7587 / 680 | glass box, "Cómo llegar" → Google Maps |
| FAQ | 8267 / 595 | toggle accordion in teal-bordered box |
| ¡Reserva tu tuk tuk hoy! | 8862 / 475 | Elementor reviews carousel |
| Footer split + footer | 9337–10274 | Anton column headings, Manrope 300 text |

Fonts (self-hosted from the source): Manrope (variable), Roboto (variable), Anton.

## Assets

`scripts/download-toketukcanarias.sh` downloads every image/font into `public/sites/toketukcanarias/`. Reviewer avatars were fetched from the `googleusercontent.com` URLs recorded in `../../design-references/toketukcanarias/source-es-desktop-1440.json`.

## Known gaps

- Cookie-consent banner (CookieYes), GTranslate language switching and Google Ads/Site Kit tags are not reproduced; the flag buttons are visual only.
- The TuriTop booking box is the real widget (company T1657, one product per tour), re-initialised on client-side navigation.
- The source legal pages have a 250px left offset that overflows on phones; the clone keeps the desktop offset but uses normal margins on mobile.
- Static snapshots: Google reviews, testimonials and the single blog post.
- Elementor motion-effects parallax on the three banner backgrounds is rendered static (initial position matches).
- A Google Maps iframe exists in the office section's DOM but is not visible on the source page, so it was omitted.
- Tablet (768–1024px) layout was not measured on the source; it uses reasonable intermediate stacking.
- Review/testimonial content is a static snapshot (the source pulls Google reviews dynamically).
