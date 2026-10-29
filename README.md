# ivanbalasi.com

Plain HTML, CSS and JavaScript. No framework, no build step, no database.
Last updated: October 28, 2026.

## Upload
- Upload everything in this folder to the web root (`public_html` on HostGator), so
  `index.html` sits directly in `public_html`.
- `.htaccess` is a hidden file. Turn on "Show Hidden Files" in cPanel File Manager to see it.
- `README.md` is for you. Delete it from the server if you don't want it public.
- Turn on SSL so the site loads at https://ivanbalasi.com.

## Run it locally
From this folder: `python3 -m http.server 8000`, then open http://localhost:8000.
Opening the files with file:// works, but browsers block the web fonts that way.

## Two looks: Classic and Creative
- A **Classic / Creative** switch sits in the header of every page. `js/main.js` adds it.
- **Classic** (default): dark or light (follows the theme button), soft glow, frosted header,
  Geist type, cards with soft Apple-style shadows.
- **Creative**: sun yellow, blue, tomato and pink colour bands, Syne + Hanken Grotesk type,
  thick black offset shadows. One light look only, so the theme button hides.
- The choice is saved in the browser (`localStorage` key `look`). `js/theme-init.js` applies it
  before the page paints. Adding `#bold` or `#classic` to a URL forces one look.
- Styles: `css/styles.css`. The original base styles come first, then the
  "Classic theme layer", then the "Bold look" section (selectors start with `:root[data-look="bold"]`).

## Fonts (self-hosted in `fonts/`)
- `geist-var.woff2`: Classic headings and body
- `syne-var.woff2`, `hanken-grotesk-var.woff2`: Creative look
- `archivo-var.woff2`, `instrument-serif-italic.woff2`, `jetbrains-mono-var.woff2`: older
  faces still declared in the CSS. Safe to keep.

## Pages
- `index.html`: Home. Selected web work order: Vilcek, Rutgers, EaseSignature,
  OSR ConciergeBot, Cores Chatbot.
- `work.html`: Web work, 21 projects with filters and search.
- `case-rutgers.html`, `design.html`, `photography.html`, `media.html`, `about.html`.
- The header, footer and contact band are copied into every page. Change them in all 7 files.

## Common edits
- **Title:** "Senior Manager, Web Development · Photography & Media". It appears on the home
  page, the About page (bio, timeline, quick answers, meta tags, JSON-LD) and `llms.txt`.
- **Project count:** "21 projects" and "All 21 web projects" on `index.html`, plus `llms.txt`.
  The filter chip counts on `work.html` update on their own.
- **New web project:** copy a `<li class="work-card">` in `work.html`. Set `data-category` to one
  or more of: website intranet webapp chatbot accessibility freelance archive.
- **Images:** `<div class="media"><img src="img/..." alt="..."></div>`. If a screenshot has a
  different shape, set the frame ratio on the div, e.g. `style="--ratio: 2000 / 1144"`.
- **Email:** set `SITE.email` at the top of `js/main.js` to show an email row and copy button.

## Changes since October 25
- New Classic look and Creative (bold) look with a switch in the header.
- Tighter corners on Web work, Design, Video & podcast and About images.
- Photography keeps the square-cornered contact sheet.
- EaseSignature added (home page and Web work). Project count 20 to 21.
- New Cores Chatbot screenshot.
- Keith Micoli's title: associate dean.
- New job title across the site.

## Changes on October 28
- Photography: new photos 01 (Travel, Venice), 02 (Event, wedding photo booth) and
  05 (Lifestyle, East River). No headshot or lab photos in the grid now.
- Video & podcast: both podcast covers are now a blue "Podcast" tile with a mic icon
  (`.podcast-tile` in css/styles.css). New wording on recording, publishing and distribution.
  `img/media/grad-insider-cover.jpg` deleted.
- Home: Video card says "I shoot and edit."

## Still open
- 9 Behance design images and 5 Vimeo posters still load from the live URLs.
- Clinical Research podcast label still reads "Podcast · Libsyn · Ongoing".
- Photos 01, 02 and 05 are about 900px wide. Swap in bigger exports if you have them.
- After launch: submit https://ivanbalasi.com/sitemap.xml in Google Search Console and Bing.
