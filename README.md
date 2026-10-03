# Muhammad Tayyab Shahab Sialvi — Official Website

One-page, high-end personal-brand landing page. **Next.js (App Router) + TypeScript + Tailwind CSS v4 + shadcn-style primitives + Motion**, deployed free on Vercel. No backend, no database.

Built to the brief in [`development.md`](./development.md).

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script              | Purpose                          |
| ------------------- | -------------------------------- |
| `npm run dev`       | Dev server                       |
| `npm run build`     | Production build (static export) |
| `npm run start`     | Serve the production build       |
| `npm run lint`      | ESLint (flat config)             |
| `npm run typecheck` | `tsc --noEmit`                   |

## Environment variables

`.env.local` (add the same two in **Vercel → Project Settings → Environment Variables**):

```bash
NEXT_PUBLIC_WHATSAPP_NUMBER=923074891612   # international format for 0307-4891612
NEXT_PUBLIC_SITE_URL=https://<your-project>.vercel.app
```

`NEXT_PUBLIC_SITE_URL` drives canonical/OG tags, `sitemap.xml` and `robots.txt` — update it after the first deploy.

---

## Where to edit content

**Everything lives in one file: [`src/content/site.ts`](./src/content/site.ts).** Add an object; no component changes, no redesign.

| To update…                       | Edit                                                        |
| -------------------------------- | ----------------------------------------------------------- |
| Add a project / mark Coming Soon | push an object into `projects`                               |
| Change an achievement figure     | `value` / `suffix` in `achievements`                         |
| Add gallery photos               | drop file in `public/images/gallery/`, set `src` on an item  |
| Add an official link             | replace `url: null` with the verified URL                     |
| Add MOU photos                   | fill `mou.photos`                                            |
| Add email / social URLs          | `contact.email`, `contact.socials[].url`                      |
| Publish the location             | set `site.location` (currently `null` → omitted)              |
| Swap the hero portrait           | `site.heroImage`                                             |
| Add or replace an org logo       | drop the file in `public/images/logos/`, set `logo`          |

### Images

The hero portrait and every logo are produced by `scripts/prepare-images.mjs`, which uses the
`sharp` build that already ships with Next.js — no extra dependency to install.

```bash
# hero cut-out → public/images/tayyab-hero.webp
node scripts/prepare-images.mjs portrait "C:\path\to\portrait.png"

# any logo (transparent cut-out or white background) → public/images/logos/<name>.webp
node scripts/prepare-images.mjs logo "C:\path\to\logo.png" shahab-foods
```

`portrait` trims the cut-out to the subject, upscales it to 1400 px wide and adds transparent
headroom so the hair never touches the frame. `logo` trims the margins and never upscales.
The script prints the pixel size — paste it into the `logo` object so the plate keeps the mark's
real ratio:

```ts
logo: { src: "/images/logos/shahab-foods.webp", width: 900, height: 500 },
```

Logos already wired up: **Shahab Foods** and **THE CCIU** in Businesses & Ventures, plus
**Shahab Foods**, **Sol Tekkers** and **THE CCIU** in the official-links list. Every other
organization falls back to a monogram until a logo is supplied.

### The one-line hero swap

The live portrait is `/images/tayyab-hero.webp` (a transparent studio cut-out — it composites
straight onto the `ink` hero). To replace it, run the `portrait` command above and change one
line:

```ts
heroImage: "/images/tayyab-hero.webp",
```

`/images/hero-placeholder.svg` is kept in `public/images/` as a neutral fallback.
`/images/og.jpg` is the 1200×630 share card and already uses the portrait.

### The link rule (important)

`getActions()` in `src/lib/actions.ts` decides what a card renders:

- if the organization/project has **verified** official URLs → those platform buttons;
- otherwise → a single **Enquire on WhatsApp** button.

**Never invent a URL.** Every unverified link stays `url: null` and the WhatsApp fallback renders automatically.

---

## Project structure

```
public/
  images/
    tayyab-hero.webp       ← live hero portrait (transparent cut-out)
    hero-placeholder.svg   ← neutral fallback if a portrait is ever removed
    og.jpg                 ← 1200×630 share card (uses the portrait)
    logos/                 ← shahab-foods · sol-tekkers · the-cciu (.webp)
    gallery/               ← event photos
scripts/
  prepare-images.mjs       ← portrait / logo optimiser (uses Next's sharp)
src/
  app/                     layout · page · globals.css · sitemap · robots · icon
  components/
    layout/                navbar · menu-overlay · footer · whatsapp-float
    sections/              hero · snapshot · about · social-work · career ·
                           ventures · projects · achievements · partnerships ·
                           gallery · platforms · coming-soon · connect · contact-form
    shared/                reveal · section · section-heading · action-link ·
                           kind-icon · logo-mark · counter
    ui/                    button · input · textarea · label · badge · separator
  content/site.ts          ← ALL DATA
  lib/                     types · utils · whatsapp · actions · smooth-scroll
```

## Design system

| Token       | Hex                   | Use                                  |
| ----------- | --------------------- | ------------------------------------ |
| `ink`       | `#0B0B0C`             | hero, footer, dark sections          |
| `ink-soft`  | `#151517`             | cards on dark                        |
| `ivory`     | `#F5F2EC`             | main background                      |
| `sand`      | `#ECE7DD`             | alternate section background          |
| `stone`     | `#6B675F`             | secondary text                       |
| `line`      | `rgb(11 11 12 / .12)` | hairline borders                     |
| `gold`      | `#B79B6B`             | **the only accent**                  |

Cormorant Garamond (display) + Inter (body), self-hosted via `next/font`.
Hairlines instead of shadows; scroll-reveals respect `prefers-reduced-motion`.

## Privacy

- Email is hidden until an official address is supplied (`contact.email: null`).
- Phone and email are deliberately **excluded** from the JSON-LD structured data.
- The contact form builds a `wa.me` link in the visitor's browser — nothing is stored or sent to a server.
- No analytics or cookies by default.

## Deploying to Vercel

1. Push to a GitHub repository.
2. Vercel → **Add New → Project → Import** (framework auto-detected as Next.js).
3. Add the two environment variables above.
4. **Deploy.** Every push to `main` redeploys.

> Vercel's free **Hobby** plan targets personal, non-commercial use. This site promotes
> businesses, so check current terms. It deploys unchanged to Cloudflare Pages / Netlify
> if needed.
