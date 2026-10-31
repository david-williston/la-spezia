# La Spezia website: owner's guide

The site is in three languages (Spanish at `/`, Italian at `/it/`, English at `/en/`).
You never edit the web pages themselves; you edit a few simple text files.

## Change the opening hours
Open `data/hours.yaml`. Each line is one day (times in 24-hour format, e.g. `"14:30"` and `"22:30"`).
A closed day looks like `{ weekday: 3, closed: true }`. When the hours are checked and correct, change
`confirmed: false` to `confirmed: true`. Until then the site shows "Hours to be confirmed, call us".
(Right now they are NOT confirmed: our sources disagreed.)

## Change menu items and prices
Open `data/menu.yaml`. Each dish is one line. Write `price: 240` to show a price; delete `price` to show none.
Only five prices are currently shown. To add a dish, copy a line and change the name.
Italian dishes have `lang: it`. Add `name_it` / `name_en` if a name is translated.

## Change phone, address, Instagram, Facebook, map link
Open `data/info.yaml`. The "Call" buttons use `phone_tel` (with +52); the text shown uses `phone_display`.
Texts like "Call us:" are in `i18n/es.yaml`, `i18n/it.yaml`, `i18n/en.yaml`.
Headline and story text are in `content/_index.md` (Spanish), `_index.it.md`, `_index.en.md`.

## Change photos
Replace a file in the `images/` folder keeping the same name (`hero.jpg`, `food-1.jpg` ... `food-6.jpg`,
`ambiente-1.jpg`, `ambiente-2.jpg`). Then open `data/photos.yaml` to adjust the description (alt text),
caption, and which part of the photo stays in view (`focus_x`, `focus_y`). The site resizes photos automatically.

## Preview on your computer
Install Hugo (extended version), open a terminal in this folder and run `hugo server`.
Open http://localhost:1313/ in your browser. Press Ctrl+C to stop.

## Build the final site
`baseURL` in `config/_default/hugo.toml` is the site's public address and feeds canonical links, language
(hreflang) links, the link-preview image, the sitemap and robots.txt. It is currently
`https://david-williston.github.io/la-spezia/` (the GitHub Pages project address, subfolder included).
If you move to your own domain, change it to that address (keep the trailing `/`).
Then run `hugo --minify`; the finished site appears in `public/`.

## Hosting on GitHub Pages (current setup)
The code lives in a PRIVATE GitHub repository `david-williston/la-spezia`. Every push to `main` is built and
published by `.github/workflows/hugo.yml`. To go live:
1. Make the repository public (Settings > General > Danger zone > Change visibility), unless your GitHub plan allows Pages on private repos.
2. Settings > Pages > Source: **GitHub Actions**.
3. Push to `main` (or run the workflow from the Actions tab). The site appears at https://david-williston.github.io/la-spezia/
You can still host anywhere else by uploading the `public/` folder (Netlify, Cloudflare Pages).

## Search engines: prototype switch (ON now)
In `config/_default/params.toml`, `noindex = true` tells Google and others NOT to list the site
(every page gets a noindex tag and `robots.txt` blocks everything). It is ON because hours, prices and photo
permissions are not confirmed yet. **At launch, change it to `noindex = false`** and publish again.

## Animations
All motion (hero entrance, button glints, twinkling string lights, photo/map hover lifts, menu fade-in) is in
`assets/css/custom.css`, in the section headed "ANIMATIONS". It is all inside a
"prefers-reduced-motion: no-preference" block, so visitors who ask their phone/computer for less motion see a
static page. To tone it down: raise the glint's transparency number (`.28`), lengthen `--dur-*`, or delete the
block you don't want (for example the `glint-idle` line removes the occasional glint on the call button).

## Check before launch
Photo permission, hours, prices, menu categories, Italian text read by the owner, the Instagram quote,
and that the phone number is public. (Full list in `DESIGN.md`, section 9.)
