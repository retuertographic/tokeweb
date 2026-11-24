#!/usr/bin/env bash
# Downloads the assets used by the toketukcanarias.com homepage clone.
set -euo pipefail
cd "$(dirname "$0")/.."
OUT=public/sites/toketukcanarias
U=https://toketukcanarias.com/wp-content/uploads
mkdir -p "$OUT/images" "$OUT/fonts" "$OUT/avatars" "$OUT/icons"

dl() { curl -sfL "$1" -o "$2" && echo "ok  $2" || echo "ERR $1"; }

# Fonts (variable woff2, latin subset)
dl "$U/elementor/google-fonts/fonts/manrope-d672325a.woff2" "$OUT/fonts/manrope.woff2"
dl "$U/elementor/google-fonts/fonts/roboto-fb5169d9.woff2" "$OUT/fonts/roboto.woff2"
dl "$U/elementor/google-fonts/fonts/anton-f043da41.woff2" "$OUT/fonts/anton.woff2"

# Brand / layout images
dl "$U/2025/10/Email-Header-1-min.png" "$OUT/images/logo.png"
dl "$U/2026/02/San-Cristobal-de-La-Laguna-9.jpg" "$OUT/images/hero.jpg"
dl "$U/2026/09/Blog-Banner-2.jpg" "$OUT/images/electric-bg.jpg"
dl "$U/2026/09/Toketuk-Canarias-Logo-5.png" "$OUT/images/electric-tuktuk.png"
dl "$U/2026/02/San-Cristobal-de-La-Laguna-8-1536x1024.jpg" "$OUT/images/about.jpg"
dl "$U/2026/03/19.jpg" "$OUT/images/office.jpg"
dl "$U/2026/03/18.jpg" "$OUT/images/office-mobile.jpg"

# Tour cards
dl "$U/2026/02/5-1024x683.jpg" "$OUT/images/tour-santa-cruz-expres.jpg"
dl "$U/2026/02/San-Cristobal-de-La-Laguna-6-1024x683.jpg" "$OUT/images/tour-santa-cruz-cultural.jpg"
dl "$U/2026/02/San-Cristobal-de-La-Laguna-5-1024x683.jpg" "$OUT/images/tour-santa-cruz-teresitas.jpg"
dl "$U/2026/02/11-1024x683.jpg" "$OUT/images/tour-costa-miradores.jpg"
dl "$U/2026/02/12-1-1024x683.jpg" "$OUT/images/tour-historia-mar.jpg"
dl "$U/2026/02/13-1-1024x683.jpg" "$OUT/images/tour-esencial-sur.jpg"
dl "$U/2026/02/18-1024x683.jpg" "$OUT/images/tour-puerto-clasico.jpg"
dl "$U/2026/02/19-1024x683.jpg" "$OUT/images/tour-puerto-jardines.jpg"
dl "$U/2026/02/20-1024x683.jpg" "$OUT/images/tour-puerto-orotava.jpg"
dl "$U/2026/10/candelaria1-1024x576.png" "$OUT/images/tour-candelaria.png"
dl "$U/2026/04/WhatsApp-Image-2026-04-15-at-07.50.51-1024x830.jpeg" "$OUT/images/tour-despedida.jpg"
dl "$U/2026/05/63-1024x683.jpg" "$OUT/images/tour-gc-costa.jpg"
dl "$U/2026/05/62-1024x683.jpg" "$OUT/images/tour-gc-historia.jpg"

# Gallery carousel
for n in 1 2 3 6 7; do dl "$U/2025/12/$n-min.jpg" "$OUT/images/gallery-$n.jpg"; done

# Flags + review icon
for l in en de es; do dl "https://toketukcanarias.com/wp-content/plugins/gtranslate/flags/svg/$l.svg" "$OUT/icons/flag-$l.svg"; done
dl "https://toketukcanarias.com/wp-content/plugins/wp-social-reviews/assets/images/icon/icon-google-small.png" "$OUT/icons/google.png"
dl "https://toketukcanarias.com/wp-content/uploads/2025/10/cropped-Toketuk-Canarias-Logo-min-192x192.png" "$OUT/icons/favicon.png"
dl "https://toketukcanarias.com/wp-content/uploads/2025/10/cropped-Toketuk-Canarias-Logo-min-180x180.png" "$OUT/icons/apple-touch-icon.png"
# Reviewer avatars come from Google (lh3.googleusercontent.com); see docs/research/toketukcanarias/asset-map.md
