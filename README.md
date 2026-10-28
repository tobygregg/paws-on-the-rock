# Paws on the Rock dog grooming — website

Single-page site in plain HTML, Tailwind CSS v3 (compiled and committed) and a small vanilla JS file. No frameworks, no runtime CDNs.

Draft live at: https://tobygregg.github.io/paws-on-the-rock/

## Folder layout

```
index.html              ← the whole site; sections are separated by big comment banners
thanks.html             ← shown after the booking form is sent (FormSubmit _next)
404.html                ← not-found page (uses <base href="/paws-on-the-rock/"> so it works at any path)
assets/css/styles.css   ← compiled Tailwind – don't edit, run `npm run build`
assets/js/main.js       ← menu, header, reveals, services explorer, before/after, lightbox, form
assets/fonts/           ← self-hosted Fraunces, Nunito, Caveat (woff2) + OFL licences
images/brand/           ← wordmark.svg / wordmark-light.svg (traced from the logo), mark.svg, logo + dogs artwork
images/work/            ← dog photos, each as name.webp (full) + name-sm.webp (small)
images/                 ← favicons, og-image.jpg (1200×630 share card), site.webmanifest
src/input.css           ← Tailwind source, @font-face, components and keyframes
tailwind.config.js      ← brand colours, fonts, shadows, animations
sitemap.xml, robots.txt
_fb-pack/               ← the Facebook research pack (not published – the underscore keeps it off Pages)
```

## Brand

| Name | Hex | Used for |
|---|---|---|
| Cream | `#fcf9f2` | Page background (logo background) |
| Oat 100 | `#f3eadb` | Soft panels, scalloped sections |
| Caramel 400 | `#e9b786` | Accent buttons, highlights (golden retriever in the logo) |
| Toffee 400 / 600 | `#c49a6c` / `#8a6440` | Ring, paw prints, handwritten labels (logo ring and paw) |
| Cocoa 900 | `#2a221c` | Text, dark buttons, contact + footer (logo lettering) |
| Blush 300 | `#f4c4bb` | Hearts and small accents (from the pink hearts on their posts) |

- **Fonts:** Fraunces (headings, soft/wonky axes on), Nunito (body), Caveat (small handwritten labels). All from @fontsource, OFL.
- **Logo:** the original logo is 1240px, so it wasn't redrawn. The "paws on the rock / DOG GROOMING" lettering was traced to a clean SVG (`images/brand/wordmark.svg`); the golden retriever and dachshund artwork is used as a WebP crop of the original. The line-art dachshund used around the site is new and based on the logo's dachshund.

## Editing

- **Text:** everything is in `index.html`. Search for the section banner (e.g. `SERVICES`, `ABOUT MEGAN`, `FAQ`).
- **Colours / fonts:** change `tailwind.config.js`, then `npm install` (first time) and `npm run build`.
- **Services explorer:** each groom is a `<button role="tab">` (name + "from" price) and a matching `<article role="tabpanel">` (photo, text, "What's included", prices). Keep `id` / `aria-controls` / `aria-labelledby` paired. The "Book this groom" button's `data-pick` must match an `<option>` in the form's Groom select.
- **Adding a gallery photo:** export two WebPs into `images/work/` (`name.webp` ~1200px wide max, `name-sm.webp` ~800px), then copy one `<li>` in the `data-gallery` list. The link `href` is the big image (opened in the lightbox), `data-caption` is the lightbox caption, `<figcaption>` is the handwritten label, `--r` is the tilt.
- **Before & after:** the slider in `#work` uses `barney-before` / `barney-after`. Swap the two `<img>` sources (a same-size pair works best) and update the alt text and the range input's `aria-label`.

## Before going live — checklist

- [ ] Swap `https://tobygregg.github.io/paws-on-the-rock/` for the real domain everywhere: canonical, `og:url`, `og:image`, `twitter:image`, JSON-LD, `sitemap.xml`, `robots.txt`, the form's `_next`, and the `<base href>` in `404.html` (becomes `/` on a root domain).
- [ ] **When the client goes ahead, switch the form from Toby's email to the client's** (`action="https://formsubmit.co/…"` in `index.html`) and activate FormSubmit by submitting once and clicking the confirmation email.
- [ ] Confirm phone/WhatsApp **07781 404112**. No email address was in the pack, so there's no email link – add one if Megan wants it.
- [ ] Get Megan to sign off the services wording and **prices** (taken from her price list: puppy £30, dry cut £35/£40, wash dry & cut £60/£70, wash dry & brush £35/£40, nail trim £12). A summer post mentions a small price adjustment and a puppy flyer shows a £25 intro price – check the list is current.
- [ ] Confirm the gallery captions (breeds were judged from the photos).
- [ ] Assumptions: "across Guernsey" as the area (posts say in-home grooming in Guernsey, no parishes listed); small & medium dogs only; 6–8 week regular slots and the 24-hour cancellation policy are from her own flyers.
- [ ] Branding: some later flyers say "M&G Paws on the Rock" – the site uses the current profile logo (no M&G). Check which name she wants.
- [ ] Left out on purpose: the Halloween costume post, the Christmas booking reminder, "few spaces left" and intro-price promos, the cancelled Cobo salon update, follower/review counts. Photos that are designed flyers (or look AI-generated) weren't used; dog photos were cropped out of her flyers.

## Source

Built from the Facebook pack in `_fb-pack/` (BRIEF.md, data.json, images). It isn't published on the live site.
