# DEVELOPMENT.md — Muhammad Tayyab Shahab Sialvi · Official Website

> **One-page, high-end personal-brand landing page** built with **Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui + Motion**, hosted free on **Vercel**.
> Every call-to-action opens **WhatsApp** (`0307-4891612` → `https://wa.me/923074891612`) until verified official links are supplied.

This file is the complete build brief: master content (every detail from the original document), design system, page architecture, all code, SEO, deployment and the owner's asset checklist.

**Using this with an AI coding agent (Claude Code, etc.):** put this file in an empty folder and say *"Read DEVELOPMENT.md and build the whole project exactly as specified."*

---

## Table of Contents

1. [Project Summary & Goals](#1-project-summary--goals)
2. [Tech Stack & Libraries](#2-tech-stack--libraries)
3. [Design Direction (High-End, Restrained)](#3-design-direction-high-end-restrained)
4. [Page Architecture](#4-page-architecture)
5. [MASTER CONTENT — Source of Truth (verbatim)](#5-master-content--source-of-truth-verbatim)
6. [Landing Page — Section-by-Section Spec](#6-landing-page--section-by-section-spec)
7. [WhatsApp & CTA System](#7-whatsapp--cta-system)
8. [Project Setup](#8-project-setup)
9. [Code — Config, Styles, Layout, Library](#9-code--config-styles-layout-library)
10. [Code — Content Data (all data)](#10-code--content-data-all-data)
11. [Code — Shared Components](#11-code--shared-components)
12. [Code — Layout Components](#12-code--layout-components)
13. [Code — Page Sections](#13-code--page-sections)
14. [Hero Placeholder Image](#14-hero-placeholder-image)
15. [SEO & Metadata](#15-seo--metadata)
16. [Performance, Accessibility & Privacy](#16-performance-accessibility--privacy)
17. [Deployment on Free Vercel](#17-deployment-on-free-vercel)
18. [Updating Content Later (CMS / Admin)](#18-updating-content-later-cms--admin)
19. [Owner Asset Checklist](#19-owner-asset-checklist)
20. [Build Phases & Definition of Done](#20-build-phases--definition-of-done)

---

## 1. Project Summary & Goals

**Website name:** Muhammad Tayyab Shahab Sialvi

**Purpose:** A central personal digital profile connecting Tayyab Shahab Sialvi's social work, professional career, businesses, projects, achievements, media/gallery and official external platforms.

**Goals**

- A single, scroll-driven landing page that feels like an editorial personal brand, not a template.
- The page acts as a **portal**: every organization/project has buttons to its verified official platforms.
- Every action routes to **WhatsApp** (pre-filled messages) when no verified official URL exists.
- Fully mobile-first; runs on the **free Vercel (Hobby) plan** with no backend and no database.
- All content lives in typed data files so new projects, achievements, gallery items, partnerships and official links can be added later **without redesigning the site**.

**Non-goals (for v1):** blog, login, database, server-side form storage, payment.

---

## 2. Tech Stack & Libraries

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js** (latest stable, App Router, React Server Components) | Static generation, SEO, free Vercel hosting |
| Language | **TypeScript** | Typed content = safe future edits |
| Styling | **Tailwind CSS v4** | Fast, tokenised design system |
| Components | **shadcn/ui** (Button, Input, Textarea, Label, Badge, Separator) | Accessible, unstyled-by-default primitives we restyle |
| Animation | **motion** (`motion/react`, formerly Framer Motion) | Scroll reveals, menu transitions, counters |
| Smooth scroll | **lenis** | Premium scroll feel + smooth anchor jumps |
| Icons (UI) | **lucide-react** | Thin-stroke, refined UI icons |
| Icons (brands) | **react-icons** (`fa6`) | WhatsApp, Facebook, Instagram, YouTube, LinkedIn |
| Carousel | **embla-carousel-react** | Drag-able Projects slider |
| Lightbox | **yet-another-react-lightbox** | Gallery viewer |
| Forms | **react-hook-form + zod + @hookform/resolvers** | Contact form validation (submits to WhatsApp) |
| Utilities | **clsx + tailwind-merge** | `cn()` helper |
| Fonts | **next/font/google** — *Cormorant Garamond* (display) + *Inter* (body) | Editorial serif + clean sans, zero layout shift |
| Hosting | **Vercel Hobby (free)** | Zero-config Next.js |

**No backend, no database, no paid services.** The contact form composes a WhatsApp message and opens `wa.me`; nothing is stored.

---

## 3. Design Direction (High-End, Restrained)

**Mood:** quiet luxury · editorial · confident · spacious. Think private-office / architectural-studio website — *not* colourful, *not* gradient-heavy, *not* template-looking.

### 3.1 Colour — monochrome + one accent

| Token | Hex | Use |
|---|---|---|
| `ink` | `#0B0B0C` | Hero, footer, dark sections, primary text |
| `ink-soft` | `#151517` | Cards on dark |
| `ivory` | `#F5F2EC` | Main background |
| `sand` | `#ECE7DD` | Alternate section background |
| `stone` | `#6B675F` | Secondary text |
| `line` | `rgb(11 11 12 / 0.12)` | Hairline borders |
| `gold` | `#B79B6B` | **The only accent** — eyebrows, hairlines, hover states |

Rules: no more than one accent; no saturated colours; no multi-colour gradients (only ink-to-transparent overlays on photos); no emoji in the UI.

### 3.2 Typography

- **Display (headings, name, numbers):** Fraunces, variable weight + optical sizing (`opsz`), weights `400–600`, leading `0.95–1.2`.
- **Body / UI:** Inter Tight, variable, `400–500`. Body `16px`, leading `1.6`.
- **Eyebrows / labels:** Inter Tight, `11–12px`, uppercase, `tracking-[0.18em]`, gold.

  Every display size comes from the fluid ramp in `globals.css` (`--text-display-*`), **not** `text-6xl`-style steps — `xl` hero name (`30→52px`), `lg` section titles (`24→32px`), `md` card titles (`19→22px`), `sm` small display (`16→18px`), `number` counters (`32→40px`). Add new headings to the ramp rather than inventing sizes. The ceilings are intentionally restrained: display type sits about two steps above the `16px` body copy, so a section title never dominates its own content. Section rhythm comes from one place — `Section` (`py-24 md:py-32`) plus `SectionHeading`'s `mb-12 md:mb-16`; do not override padding per section.

### 3.3 Layout

- Max width `1280px` (`max-w-7xl`), generous padding `px-6 md:px-10`, section spacing `py-24 md:py-32` (single-sourced in `Section`; no per-section overrides).
- Numbered section eyebrows (`01 — About`) with a gold hairline.
- Alternate section tones: `ivory → sand → ivory → ink → ivory …` for rhythm.
- Hairline (`1px`) borders instead of shadows; cards are flat with subtle hover lift of the border colour.

### 3.4 Motion (restrained)

- Scroll-reveal: fade + 24px rise, `0.8s`, ease `[0.22, 1, 0.36, 1]`, `once: true`.
- Full-screen menu: clip-path wipe `0.7s`.
- Counters animate once when in view.
- Smooth scrolling with Lenis; **everything respects `prefers-reduced-motion`** (`MotionConfig reducedMotion="user"` + Lenis disabled).
- No parallax overload, no cursor effects, no auto-playing carousels.

### 3.5 Imagery

- **Hero portrait:** large, tall (4:5), subject on the right 55–60% of the viewport on desktop; dark gradient overlay blends into `ink`. Use a studio portrait or cut-out PNG/WebP on neutral dark background. *Placeholder SVG supplied (§14).*
- Logos: consistent size/treatment per organization; monogram fallback when no logo.
- Gallery: neutral tiles with captions; optional subtle desaturation on hover-out for cohesion.

---

## 4. Page Architecture

**Recommended main navigation:** Home | About | Social Work | Professional Career | Businesses & Ventures | Projects | Achievements | MOU & Partnerships | Media & Gallery | Connect

**Navigation UX:** a minimal fixed top bar (monogram · WhatsApp pill · *Menu*). *Menu* opens a **full-screen numbered overlay** listing all 10 items, so the complete recommended navigation is always one click away without cluttering the header.

### 4.1 Scroll order (single page)

| # | Anchor id | Section | Background |
|---|---|---|---|
| — | `#home` | Hero (large portrait) | ink |
| — | `#snapshot` | Profile Snapshot + Current Roles | ivory |
| 01 | `#about` | About / Profile + Education | sand |
| 02 | `#social-work` | Social Work (ATI) | ivory |
| 03 | `#career` | Professional Career / Journey | ink |
| 04 | `#ventures` | Businesses & Ventures | ivory |
| 05 | `#projects` | Current & Featured Projects | sand |
| 06 | `#achievements` | Achievements & Milestones | ink |
| 07 | `#partnerships` | MOU & Partnerships | ivory |
| 08 | `#gallery` | Media & Gallery | sand |
| 09 | `#platforms` | Official Links / External Platforms | ivory |
| — | `#coming-soon` | Coming Soon | ink |
| 10 | `#connect` | Contact / Connect | ivory |
| — | — | Footer | ink |

### 4.2 Suggested sitemap → anchor mapping

| Sitemap page (from brief) | One-page anchor |
|---|---|
| Home | `#home` |
| About Tayyab Shahab | `#about` |
| Social Work | `#social-work` |
| Professional Career | `#career` |
| Businesses & Ventures | `#ventures` |
| Projects | `#projects` |
| Achievements | `#achievements` |
| MOU & Partnerships | `#partnerships` |
| Media & Gallery | `#gallery` |
| Coming Soon | `#coming-soon` |
| Contact / Connect | `#connect` |

---

## 5. MASTER CONTENT — Source of Truth (verbatim)

> Everything below is carried over **word for word** from *"Muhammad Tayyab Shahab Sialvi — Website Master Content"*. Lines marked **Developer note** are internal and **must never be rendered** on the live page.

**MUHAMMAD TAYYAB SHAHAB SIALVI**

*Official Personal • Professional • Social Website — Master Content*

### 5.1 Website Identity

Website Name: Muhammad Tayyab Shahab Sialvi

Purpose: A central personal digital profile connecting Tayyab Shahab Sialvi's social work, professional career, businesses, projects, achievements, media/gallery and official external platforms.

Recommended main navigation: Home | About | Social Work | Professional Career | Businesses & Ventures | Projects | Achievements | MOU & Partnerships | Media & Gallery | Connect

### 5.2 Homepage

Hero Name: Muhammad Tayyab Shahab Sialvi

Primary identity: District Nazim, ATI Faisalabad | Entrepreneur | Education & Social Development Professional | Law Student

Short introduction: Muhammad Tayyab Shahab Sialvi is an education, media, business and social-development professional with experience in organizational work, public relations, youth engagement, business development and welfare initiatives.

Homepage sections: Profile Snapshot, Current Roles, Social Work, Professional Journey, Businesses & Ventures, Current Projects, Achievements, MOU/Partnerships, Media Gallery, Connect.

### 5.3 About / Profile

Muhammad Tayyab Shahab Sialvi is associated with education, youth development, social work, media/PR and entrepreneurship. His work includes organizational leadership, student-focused initiatives, welfare activities, business development and digital/educational projects.

Education:

- IUB Law Student — The Islamia University of Bahawalpur
- BS Islamic Studies — Government Graduate Islamia College Faisalabad (Affiliated with GCUF), 2021–2025
- Digital Marketing & Shopify Store Management — Peak Solutions / Sol Tekkers

### 5.4 Current Social & Organizational Role

District Nazim — Anjuman Talba Islam (ATI), District Faisalabad

ATI work focus: student affairs, youth development, educational/organizational activities and welfare initiatives.

- Student-focused initiatives and digital/skills development programs.
- Blood-support / blood-donation welfare initiatives.

CTA: Visit ATI Faisalabad → [OFFICIAL ATI WEBSITE/SOCIAL LINKS TO BE INSERTED]

### 5.5 Professional Career

- Former Administrator & PR Officer — AIMS International School & College
- Former Branch Incharge — Saylani International (DHQ Hospital)
- Former Branch Incharge — Al-Mustafa Welfare Society (FIC Hospital)
- Manager / Cashier — Food Business

Note for developer: AIMS should be presented as a former professional role after September 2026, unless the owner supplies a newer employment status.

### 5.6 Businesses & Ventures

- Shahab Group — Founder & CEO
- Shahab Foods — Natural/organic products venture
- Evergreen Talks — Media / content / interview-oriented project
- THE CCIU / Code Converse International University — education/digital initiative
- Consulting / business development services

Each venture should have a dedicated card with logo, short description, website button and official social-media buttons where available.

### 5.7 Current & Featured Projects

- ATI Digital Skills Program — ATI Faisalabad + Sol Tekkers
  - Digital skills, communication skills and personality-development/student support initiatives.
- Student Affairs / educational support initiatives.
- Blood-support / donation initiative.
- Upcoming projects — Coming Soon section to be updated by administrator.

Project cards should show: Project Name | Short Description | Role | Partner(s) | Status | Gallery | Official Link.

### 5.8 Partnerships & MOUs

ATI Faisalabad × Sol Tekkers — Digital Skills Program MOU

MOU participants/representation: Muhammad Tayyab Shahab Sialvi (District Nazim, ATI Faisalabad) and Farrukh Sheikh (Director Academics, Sol Tekkers).

Related presentation/coverage may include Dr. Mudassar Shakoor (CEO, Sol Tekkers), Muhammad Owais Ali Awan (District General Secretary, ATI Faisalabad), and Abbas Ali Haider (City Convenor, ATI Faisalabad).

Developer: Create a visual MOU gallery/timeline and link each partner to its official website/social platforms.

### 5.9 Achievements & Milestones

- Best Management Award
- 100+ Interviews
- 100+ Free Medical Camps
- Blood donation campaigns and welfare activities

Developer: Use counters/cards only where figures are documented and keep an editable admin field for future updates.

### 5.10 Media & Gallery

- MOU signing photographs
- ATI events and student activities
- Media interviews / press appearances
- Social-work and welfare activities
- Training / digital-skills program activities
- Business/project events
- Achievements and recognition

Gallery filters recommended: Social Work | ATI | Education | Business | Media | MOUs | Events | Achievements.

### 5.11 Official Links / External Platform System

The website should function as a central portal. Every organization/project card should contain buttons for its verified official platforms.

- ATI → Website | Facebook | Instagram | WhatsApp Channel | YouTube/other verified platforms
- Shahab Foods → Website | Facebook | Instagram | WhatsApp/other verified platforms
- Sol Tekkers → Official website/social platforms
- AIMS → Official website/social platforms
- THE CCIU → Official website/social platforms
- Evergreen Talks → Official website/social platforms

Developer note: Do not invent URLs. Insert only links supplied/verified by the owner.

### 5.12 Contact / Connect

Phone: 0307-4891612

Email: Use the current official email supplied by the owner before launch.

Social media: Facebook | Instagram | LinkedIn | YouTube | WhatsApp

Developer: Add clickable social icons and a Contact form. Protect personal information from unnecessary public exposure.

### 5.13 Design & User Experience

- Clean, modern personal-brand website with strong mobile responsiveness.
- Professional personal profile at the top, followed by Social, Professional, Business and Project pathways.
- Use project/organization logos consistently.
- Each external organization/project opens its official website or verified social account in a clear CTA.
- Add search-engine-friendly page titles, meta descriptions and structured profile information.
- Create an easy-to-update CMS/admin area for projects, achievements, gallery, links and Coming Soon items.

### 5.14 Suggested Website Sitemap

Home · About Tayyab Shahab · Social Work · Professional Career · Businesses & Ventures · Projects · Achievements · MOU & Partnerships · Media & Gallery · Coming Soon · Contact / Connect

### 5.15 Content That Still Needs Owner-Supplied Assets

- Final professional headshot/profile photo
- Personal logo (if any)
- Verified official URLs for every organization/project
- Social-media URLs/handles
- MOU documents/photos
- Achievement certificates/photos
- Selected event/gallery photographs
- Final short biography approved for publication
- Any additional current projects or roles not listed above

**Developer instruction:** This document is the content/structure master brief. The website should be built so that new projects, achievements, gallery items, partnerships and official links can be added later without redesigning the entire site.

---

## 6. Landing Page — Section-by-Section Spec

### 6.1 Hero — `#home`

- **Full viewport height** (`min-h-svh`), `ink` background.
- **Large portrait** occupying the right ~58% of the viewport on desktop (full-bleed behind text on mobile at reduced opacity). Placeholder SVG for now (`/images/hero-placeholder.svg`); swap to `/images/tayyab-hero.webp` later by changing **one line** in `content/site.ts`.
- Left-aligned, stacked, oversized name in three lines: **Muhammad / Tayyab Shahab / Sialvi** (Cormorant Garamond).
- Eyebrow: *Official Personal • Professional • Social*.
- Identity line (4 items, hairline-separated): **District Nazim, ATI Faisalabad · Entrepreneur · Education & Social Development Professional · Law Student**.
- Short introduction paragraph (§5.2).
- CTAs: **Message on WhatsApp** (solid, gold→ivory hover) and **Explore Profile** (outline, scrolls to `#about`).
- Bottom-left scroll indicator; bottom strip shows `Faisalabad, Pakistan`-style location **only if the owner approves** (omit by default).

### 6.2 Profile Snapshot & Current Roles — `#snapshot`

- Row of **Profile Snapshot** facts: Name · Primary identity · Purpose.
- **Current Roles** cards (3): District Nazim (ATI Faisalabad) · Founder & CEO (Shahab Group) · Law Student (IUB).
- CTA per card → WhatsApp or official link.

### 6.3 About — `#about`

- Two columns: large pull-quote style paragraph (§5.3) left; **Education** list right (degree, institution, years).
- Education entries exactly as §5.3.

### 6.4 Social Work — `#social-work`

- Large feature card: **District Nazim — Anjuman Talba Islam (ATI), District Faisalabad**.
- Focus statement + two bullets (§5.4).
- CTA **Visit ATI Faisalabad →** → official ATI link if supplied, else WhatsApp.

### 6.5 Professional Career — `#career`

- Vertical timeline on `ink`: four roles (§5.5). AIMS, Saylani and Al-Mustafa labelled **Former**.
- Hidden developer note about AIMS is **not** rendered.

### 6.6 Businesses & Ventures — `#ventures`

- Bento grid of 5 cards (Shahab Group is the large card). Each: logo/monogram, name, role/description, buttons for verified website + socials; if none verified → single **Enquire on WhatsApp** button.

### 6.7 Projects — `#projects`

- Draggable Embla carousel. Each card shows **Project Name · Short Description · Role · Partner(s) · Status · Gallery · Official Link** (empty fields are hidden automatically).
- Final card: **Upcoming projects — Coming Soon**.

### 6.8 Achievements — `#achievements`

- Four large cards on `ink`: **Best Management Award**, **100+ Interviews** (counter), **100+ Free Medical Camps** (counter), **Blood donation campaigns and welfare activities**.
- Counters are used **only for documented figures**; each item has an editable `value` in `content/site.ts`.

### 6.9 MOU & Partnerships — `#partnerships`

- Timeline-style MOU card: **ATI Faisalabad × Sol Tekkers — Digital Skills Program MOU**.
- Two signing representatives with monogram avatars; "Related presentation/coverage" list of 3 people.
- Visual MOU photo gallery strip (placeholder tiles until photos arrive).
- Partner buttons → official links or WhatsApp.

### 6.10 Media & Gallery — `#gallery`

- Filter bar: **All | Social Work | ATI | Education | Business | Media | MOUs | Events | Achievements**.
- Masonry-style grid with neutral placeholder tiles; clicking a real photo opens the lightbox.

### 6.11 Official Links Portal — `#platforms`

- One row per organization (ATI, Shahab Foods, Sol Tekkers, AIMS, THE CCIU, Evergreen Talks) with icon buttons for each verified platform; fallback **Enquire on WhatsApp**.

### 6.12 Coming Soon — `#coming-soon`

- Slim band: "New projects, partnerships and initiatives are on the way." + **Get notified on WhatsApp**.

### 6.13 Connect — `#connect`

- Left: heading, phone (tap-to-call), WhatsApp button, email (hidden until supplied), social icons (verified only + WhatsApp).
- Right: **Contact form** (Name · Subject · Message) → opens WhatsApp with composed message. Nothing stored.

### 6.14 Footer

- Monogram, name, purpose line, anchor links, © year.

### 6.15 Persistent UI

- Fixed top bar (monogram · WhatsApp · Menu).
- Floating WhatsApp button (appears after scrolling past the hero).
- Skip-to-content link.

---

## 7. WhatsApp & CTA System

- Number stored in `NEXT_PUBLIC_WHATSAPP_NUMBER` (default `923074891612` = `0307-4891612` in international format).
- Every CTA calls `waLink(message)` → `https://wa.me/923074891612?text=<encoded message>`.
- Each CTA has its **own pre-filled message** (e.g., *"Assalam o Alaikum, I would like to know more about Shahab Foods."*).
- **Link resolution rule** (`getActions`): if an organization/project has verified official URLs → render those buttons; otherwise render a single **Enquire on WhatsApp** button. **Never invent URLs.**
- External links open in a new tab with `rel="noopener noreferrer"`.
- Phone is also available as `tel:+923074891612`.

---

## 8. Project Setup

```bash
# 1. Create the app
npx create-next-app@latest tayyab-site --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd tayyab-site

# 2. shadcn/ui (choose: Neutral base colour, CSS variables = yes)
npx shadcn@latest init
npx shadcn@latest add button input textarea label badge separator

# 3. Libraries
npm i motion lenis lucide-react react-icons embla-carousel-react yet-another-react-lightbox \
      react-hook-form zod @hookform/resolvers clsx tailwind-merge

# 4. Run
npm run dev
```

### 8.1 Folder structure

```
tayyab-site/
├─ public/
│  ├─ images/
│  │  ├─ hero-placeholder.svg        ← replace later with tayyab-hero.webp
│  │  ├─ og.jpg                      ← 1200×630 share image (owner to supply)
│  │  ├─ logos/                      ← org logos (ati.svg, shahab-foods.svg …)
│  │  └─ gallery/                    ← event photos
│  └─ favicon.ico
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx
│  │  ├─ page.tsx
│  │  ├─ globals.css
│  │  ├─ sitemap.ts
│  │  └─ robots.ts
│  ├─ components/
│  │  ├─ providers.tsx
│  │  ├─ ui/                         ← shadcn components
│  │  ├─ shared/
│  │  │  ├─ reveal.tsx
│  │  │  ├─ section.tsx
│  │  │  ├─ section-heading.tsx
│  │  │  ├─ action-link.tsx
│  │  │  ├─ kind-icon.tsx
│  │  │  ├─ logo-mark.tsx
│  │  │  └─ counter.tsx
│  │  ├─ layout/
│  │  │  ├─ navbar.tsx
│  │  │  ├─ footer.tsx
│  │  │  └─ whatsapp-float.tsx
│  │  └─ sections/
│  │     ├─ hero.tsx
│  │     ├─ snapshot.tsx
│  │     ├─ about.tsx
│  │     ├─ social-work.tsx
│  │     ├─ career.tsx
│  │     ├─ ventures.tsx
│  │     ├─ projects.tsx
│  │     ├─ achievements.tsx
│  │     ├─ partnerships.tsx
│  │     ├─ gallery.tsx
│  │     ├─ platforms.tsx
│  │     ├─ coming-soon.tsx
│  │     ├─ connect.tsx
│  │     └─ contact-form.tsx
│  ├─ content/
│  │  └─ site.ts                     ← ALL DATA lives here
│  └─ lib/
│     ├─ types.ts
│     ├─ utils.ts                    ← cn() (created by shadcn)
│     ├─ whatsapp.ts
│     └─ actions.ts
├─ .env.local
└─ next.config.ts
```

### 8.2 Environment variables

`.env.local` (and the same two in Vercel → Project Settings → Environment Variables):

```bash
NEXT_PUBLIC_WHATSAPP_NUMBER=923074891612
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
```

---

## 9. Code — Config, Styles, Layout, Library

### 9.1 `src/app/globals.css`

> If shadcn generated its own variables, **keep them** and append/merge the tokens below.

```css
@import "tailwindcss";

@theme inline {
  /* palette */
  --color-ink: #0b0b0c;
  --color-ink-soft: #151517;
  --color-ivory: #f5f2ec;
  --color-sand: #ece7dd;
  --color-stone: #6b675f;
  --color-line: rgb(11 11 12 / 0.12);
  --color-gold: #b79b6b;

  /* fonts (CSS variables injected by next/font in layout.tsx) */
  --font-display: var(--font-fraunces), Georgia, "Times New Roman", serif;
  --font-sans: var(--font-inter-tight), system-ui, -apple-system, "Segoe UI", sans-serif;
}

html {
  background: var(--color-ivory);
  color: var(--color-ink);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

body {
  font-family: var(--font-sans);
  font-size: 1.0625rem;
  line-height: 1.65;
}

::selection {
  background: var(--color-gold);
  color: var(--color-ink);
}

/* Lenis */
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }
.lenis.lenis-stopped { overflow: hidden; }

/* subtle film grain for depth on dark sections */
.grain::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.06;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
}

:focus-visible {
  outline: 2px solid var(--color-gold);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

### 9.2 `src/app/layout.tsx`

```tsx
import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { site } from "@/content/site";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${site.name} — District Nazim ATI Faisalabad | Entrepreneur | Law Student`,
  description:
    "Official website of Muhammad Tayyab Shahab Sialvi — District Nazim, ATI Faisalabad; entrepreneur, education & social development professional and law student. Social work, career, businesses, projects, MOUs and media.",
  keywords: [
    "Muhammad Tayyab Shahab Sialvi",
    "Tayyab Shahab Sialvi",
    "District Nazim ATI Faisalabad",
    "Anjuman Talba Islam Faisalabad",
    "Shahab Group",
    "Shahab Foods",
    "Evergreen Talks",
  ],
  openGraph: {
    title: site.name,
    description: site.identity.join(" | "),
    url: "/",
    siteName: site.name,
    images: [{ url: "/images/og.jpg", width: 1200, height: 630 }],
    type: "profile",
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.identity.join(" | ") },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#0b0b0c" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "District Nazim, ATI Faisalabad",
  description: site.intro,
  url: siteUrl,
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "The Islamia University of Bahawalpur" },
    { "@type": "CollegeOrUniversity", name: "Government Graduate Islamia College Faisalabad" },
  ],
  affiliation: [
    { "@type": "Organization", name: "Anjuman Talba Islam (ATI), District Faisalabad" },
    { "@type": "Organization", name: "Shahab Group" },
  ],
  // NOTE: phone / email intentionally omitted from structured data (privacy).
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-gold focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppFloat />
        </Providers>
      </body>
    </html>
  );
}
```

### 9.3 `src/app/page.tsx`

```tsx
import { Hero } from "@/components/sections/hero";
import { Snapshot } from "@/components/sections/snapshot";
import { About } from "@/components/sections/about";
import { SocialWork } from "@/components/sections/social-work";
import { Career } from "@/components/sections/career";
import { Ventures } from "@/components/sections/ventures";
import { Projects } from "@/components/sections/projects";
import { Achievements } from "@/components/sections/achievements";
import { Partnerships } from "@/components/sections/partnerships";
import { Gallery } from "@/components/sections/gallery";
import { Platforms } from "@/components/sections/platforms";
import { ComingSoon } from "@/components/sections/coming-soon";
import { Connect } from "@/components/sections/connect";

export default function Page() {
  return (
    <>
      <Hero />
      <Snapshot />
      <About />
      <SocialWork />
      <Career />
      <Ventures />
      <Projects />
      <Achievements />
      <Partnerships />
      <Gallery />
      <Platforms />
      <ComingSoon />
      <Connect />
    </>
  );
}
```

### 9.4 `src/app/sitemap.ts` and `src/app/robots.ts`

```ts
// sitemap.ts
import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return [{ url, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
```

```ts
// robots.ts
import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${url}/sitemap.xml` };
}
```

### 9.5 `src/components/providers.tsx`

```tsx
"use client";

import Lenis from "lenis";
import { MotionConfig } from "motion/react";
import { useEffect } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true, anchors: true });
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
```

### 9.6 `src/lib/types.ts`

```ts
export type LinkKind =
  | "website"
  | "facebook"
  | "instagram"
  | "whatsapp-channel"
  | "whatsapp"
  | "youtube"
  | "linkedin"
  | "other";

/** url === null means "not yet supplied/verified by the owner". NEVER invent a URL. */
export interface OfficialLink {
  kind: LinkKind;
  label: string;
  url: string | null;
}

export interface Action {
  label: string;
  href: string;
  kind: LinkKind;
  external: boolean;
}

export type ProjectStatus = "Current" | "Featured" | "Coming Soon";

export type GalleryCategory =
  | "Social Work"
  | "ATI"
  | "Education"
  | "Business"
  | "Media"
  | "MOUs"
  | "Events"
  | "Achievements";
```

### 9.7 `src/lib/whatsapp.ts`

```ts
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "923074891612";
export const PHONE_DISPLAY = "0307-4891612";
export const TEL_LINK = `tel:+${WHATSAPP_NUMBER}`;

/** Build a wa.me link with an optional pre-filled message. */
export function waLink(message?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Standard greeting used across the site. */
export const greet = (about: string) => `Assalam o Alaikum, ${about}`;
```

### 9.8 `src/lib/actions.ts`

```ts
import type { Action, OfficialLink } from "./types";
import { waLink } from "./whatsapp";

/**
 * If any verified official URL exists → return those buttons.
 * Otherwise → a single WhatsApp enquiry button (never an invented URL).
 */
export function getActions(
  links: OfficialLink[] | undefined,
  waMessage: string,
  fallbackLabel = "Enquire on WhatsApp",
): Action[] {
  const verified: Action[] = (links ?? [])
    .filter((l): l is OfficialLink & { url: string } => Boolean(l.url))
    .map((l) => ({ label: l.label, href: l.url, kind: l.kind, external: true }));

  if (verified.length) return verified;

  return [{ label: fallbackLabel, href: waLink(waMessage), kind: "whatsapp", external: true }];
}
```

---

## 10. Code — Content Data (all data)

### `src/content/site.ts`

> This is the **single place to edit content**. To add a project, achievement, gallery photo, partnership or official link later, add one object here — no component changes needed.

```ts
import type { GalleryCategory, OfficialLink, ProjectStatus } from "@/lib/types";
import { greet } from "@/lib/whatsapp";

/* ───────────────────────── IDENTITY ───────────────────────── */

export const site = {
  name: "Muhammad Tayyab Shahab Sialvi",
  nameLines: ["Muhammad", "Tayyab Shahab", "Sialvi"],
  tagline: "Official Personal • Professional • Social Website",
  purpose:
    "A central personal digital profile connecting Tayyab Shahab Sialvi’s social work, professional career, businesses, projects, achievements, media/gallery and official external platforms.",
  identity: [
    "District Nazim, ATI Faisalabad",
    "Entrepreneur",
    "Education & Social Development Professional",
    "Law Student",
  ],
  intro:
    "Muhammad Tayyab Shahab Sialvi is an education, media, business and social-development professional with experience in organizational work, public relations, youth engagement, business development and welfare initiatives.",
  /** 👇 SWAP THIS ONE LINE when the real portrait arrives, e.g. "/images/tayyab-hero.webp" */
  heroImage: "/images/hero-placeholder.svg",
  heroAlt: "Portrait of Muhammad Tayyab Shahab Sialvi",
  homepageSections: [
    "Profile Snapshot",
    "Current Roles",
    "Social Work",
    "Professional Journey",
    "Businesses & Ventures",
    "Current Projects",
    "Achievements",
    "MOU/Partnerships",
    "Media Gallery",
    "Connect",
  ],
};

/* ───────────────────────── NAVIGATION ───────────────────────── */

export const nav = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "social-work", label: "Social Work" },
  { id: "career", label: "Professional Career" },
  { id: "ventures", label: "Businesses & Ventures" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "partnerships", label: "MOU & Partnerships" },
  { id: "gallery", label: "Media & Gallery" },
  { id: "connect", label: "Connect" },
] as const;

/* ───────────────────────── ABOUT / EDUCATION ───────────────────────── */

export const about = {
  body:
    "Muhammad Tayyab Shahab Sialvi is associated with education, youth development, social work, media/PR and entrepreneurship. His work includes organizational leadership, student-focused initiatives, welfare activities, business development and digital/educational projects.",
  education: [
    {
      title: "IUB Law Student",
      institution: "The Islamia University of Bahawalpur",
      period: null as string | null,
    },
    {
      title: "BS Islamic Studies",
      institution: "Government Graduate Islamia College Faisalabad (Affiliated with GCUF)",
      period: "2021–2025",
    },
    {
      title: "Digital Marketing & Shopify Store Management",
      institution: "Peak Solutions / Sol Tekkers",
      period: null,
    },
  ],
};

/* ───────────────────────── CURRENT ROLES (snapshot) ───────────────────────── */

export const currentRoles = [
  {
    title: "District Nazim",
    org: "Anjuman Talba Islam (ATI), District Faisalabad",
    waMessage: greet("I would like to know more about ATI Faisalabad."),
  },
  {
    title: "Founder & CEO",
    org: "Shahab Group",
    waMessage: greet("I would like to know more about Shahab Group."),
  },
  {
    title: "Law Student",
    org: "The Islamia University of Bahawalpur",
    waMessage: greet("I would like to connect with you."),
  },
];

/* ───────────────────────── SOCIAL WORK (ATI) ───────────────────────── */

export const socialWork = {
  role: "District Nazim",
  org: "Anjuman Talba Islam (ATI), District Faisalabad",
  focus:
    "student affairs, youth development, educational/organizational activities and welfare initiatives.",
  bullets: [
    "Student-focused initiatives and digital/skills development programs.",
    "Blood-support / blood-donation welfare initiatives.",
  ],
  cta: "Visit ATI Faisalabad",
  waMessage: greet("I would like to know more about ATI Faisalabad."),
  // OWNER TO SUPPLY: official ATI website / social links
  links: [] as OfficialLink[],
};

/* ───────────────────────── PROFESSIONAL CAREER ───────────────────────── */

/**
 * AIMS is a FORMER role after September 2026 unless the owner supplies a newer employment status.
 */
export const career = [
  {
    role: "Administrator & PR Officer",
    org: "AIMS International School & College",
    former: true,
  },
  {
    role: "Branch Incharge",
    org: "Saylani International (DHQ Hospital)",
    former: true,
  },
  {
    role: "Branch Incharge",
    org: "Al-Mustafa Welfare Society (FIC Hospital)",
    former: true,
  },
  {
    role: "Manager / Cashier",
    org: "Food Business",
    former: false,
  },
];

/* ───────────────────────── BUSINESSES & VENTURES ───────────────────────── */

export interface Venture {
  id: string;
  name: string;
  role?: string;
  description: string;
  logo: string | null; // OWNER TO SUPPLY → "/images/logos/xyz.svg"
  large?: boolean;
  links: OfficialLink[];
  waMessage: string;
}

export const ventures: Venture[] = [
  {
    id: "shahab-group",
    name: "Shahab Group",
    role: "Founder & CEO",
    description: "Founder & CEO", // short description pending from owner
    logo: null,
    large: true,
    links: [
      { kind: "website", label: "Website", url: null },
      { kind: "other", label: "Social", url: null },
    ],
    waMessage: greet("I would like to know more about Shahab Group."),
  },
  {
    id: "shahab-foods",
    name: "Shahab Foods",
    description: "Natural/organic products venture",
    logo: null,
    links: [
      { kind: "website", label: "Website", url: null },
      { kind: "facebook", label: "Facebook", url: null },
      { kind: "instagram", label: "Instagram", url: null },
      { kind: "whatsapp", label: "WhatsApp", url: null },
    ],
    waMessage: greet("I would like to inquire about Shahab Foods products."),
  },
  {
    id: "evergreen-talks",
    name: "Evergreen Talks",
    description: "Media / content / interview-oriented project",
    logo: null,
    links: [
      { kind: "website", label: "Website", url: null },
      { kind: "other", label: "Social", url: null },
    ],
    waMessage: greet("I would like to know more about Evergreen Talks."),
  },
  {
    id: "the-cciu",
    name: "THE CCIU / Code Converse International University",
    description: "Education/digital initiative",
    logo: null,
    links: [
      { kind: "website", label: "Website", url: null },
      { kind: "other", label: "Social", url: null },
    ],
    waMessage: greet("I would like to know more about THE CCIU (Code Converse International University)."),
  },
  {
    id: "consulting",
    name: "Consulting / Business Development Services",
    description: "Consulting / business development services",
    logo: null,
    links: [],
    waMessage: greet("I am interested in your consulting and business development services."),
  },
];

/* ───────────────────────── PROJECTS ───────────────────────── */

export interface Project {
  id: string;
  name: string;
  description: string | null;
  role: string | null; // hide when null (owner to confirm)
  partners: string[];
  status: ProjectStatus;
  hasGallery: boolean;
  links: OfficialLink[];
  waMessage: string;
}

export const projects: Project[] = [
  {
    id: "ati-digital-skills",
    name: "ATI Digital Skills Program",
    description:
      "Digital skills, communication skills and personality-development/student support initiatives.",
    role: "District Nazim, ATI Faisalabad",
    partners: ["ATI Faisalabad", "Sol Tekkers"],
    status: "Featured",
    hasGallery: true,
    links: [],
    waMessage: greet("I would like to know about the ATI Digital Skills Program."),
  },
  {
    id: "student-affairs",
    name: "Student Affairs / Educational Support Initiatives",
    description: "Student affairs, youth development and educational/organizational activities.",
    role: null,
    partners: [],
    status: "Current",
    hasGallery: true,
    links: [],
    waMessage: greet("I would like to know about the Student Affairs and educational support initiatives."),
  },
  {
    id: "blood-support",
    name: "Blood-Support / Donation Initiative",
    description: "Blood-support / blood-donation welfare initiatives.",
    role: null,
    partners: [],
    status: "Current",
    hasGallery: true,
    links: [],
    waMessage: greet("I need blood support / I would like to donate blood."),
  },
  {
    id: "upcoming",
    name: "Upcoming Projects",
    description: "Coming Soon section to be updated by administrator.",
    role: null,
    partners: [],
    status: "Coming Soon",
    hasGallery: false,
    links: [],
    waMessage: greet("please keep me updated about upcoming projects."),
  },
];

/* ───────────────────────── ACHIEVEMENTS ───────────────────────── */

export interface Achievement {
  id: string;
  label: string;
  /** Provide only when the figure is documented. */
  value?: number;
  suffix?: string;
  note?: string;
}

export const achievements: Achievement[] = [
  { id: "best-management", label: "Best Management Award" },
  { id: "interviews", label: "Interviews", value: 100, suffix: "+" },
  { id: "medical-camps", label: "Free Medical Camps", value: 100, suffix: "+" },
  { id: "blood", label: "Blood donation campaigns and welfare activities" },
];

/* ───────────────────────── PARTNERSHIPS & MOUs ───────────────────────── */

export const mou = {
  title: "ATI Faisalabad × Sol Tekkers — Digital Skills Program MOU",
  participantsLabel: "MOU participants/representation",
  participants: [
    { name: "Muhammad Tayyab Shahab Sialvi", role: "District Nazim, ATI Faisalabad" },
    { name: "Farrukh Sheikh", role: "Director Academics, Sol Tekkers" },
  ],
  relatedLabel: "Related presentation/coverage may include",
  related: [
    { name: "Dr. Mudassar Shakoor", role: "CEO, Sol Tekkers" },
    { name: "Muhammad Owais Ali Awan", role: "District General Secretary, ATI Faisalabad" },
    { name: "Abbas Ali Haider", role: "City Convenor, ATI Faisalabad" },
  ],
  /** OWNER TO SUPPLY: MOU signing photos → /images/gallery/mou-1.webp … */
  photos: [] as { src: string; alt: string }[],
  partnerLinks: [] as OfficialLink[],
  waMessage: greet("I would like to discuss a partnership or MOU."),
};

/* ───────────────────────── MEDIA & GALLERY ───────────────────────── */

export const galleryCategories: GalleryCategory[] = [
  "Social Work",
  "ATI",
  "Education",
  "Business",
  "Media",
  "MOUs",
  "Events",
  "Achievements",
];

export interface GalleryItem {
  id: string;
  caption: string;
  category: GalleryCategory;
  src: string | null; // null → neutral placeholder tile
  alt?: string;
}

export const gallery: GalleryItem[] = [
  { id: "g1", caption: "MOU signing photographs", category: "MOUs", src: null },
  { id: "g2", caption: "ATI events and student activities", category: "ATI", src: null },
  { id: "g3", caption: "Media interviews / press appearances", category: "Media", src: null },
  { id: "g4", caption: "Social-work and welfare activities", category: "Social Work", src: null },
  { id: "g5", caption: "Training / digital-skills program activities", category: "Education", src: null },
  { id: "g6", caption: "Business/project events", category: "Business", src: null },
  { id: "g7", caption: "Achievements and recognition", category: "Achievements", src: null },
  { id: "g8", caption: "Events", category: "Events", src: null },
];

/* ───────────────────────── OFFICIAL LINKS PORTAL ───────────────────────── */

export interface Platform {
  id: string;
  name: string;
  links: OfficialLink[];
  waMessage: string;
}

const generic: OfficialLink[] = [
  { kind: "website", label: "Official website", url: null },
  { kind: "other", label: "Official social platforms", url: null },
];

export const platforms: Platform[] = [
  {
    id: "ati",
    name: "ATI",
    links: [
      { kind: "website", label: "Website", url: null },
      { kind: "facebook", label: "Facebook", url: null },
      { kind: "instagram", label: "Instagram", url: null },
      { kind: "whatsapp-channel", label: "WhatsApp Channel", url: null },
      { kind: "youtube", label: "YouTube", url: null },
    ],
    waMessage: greet("I would like the official links for ATI Faisalabad."),
  },
  {
    id: "shahab-foods",
    name: "Shahab Foods",
    links: [
      { kind: "website", label: "Website", url: null },
      { kind: "facebook", label: "Facebook", url: null },
      { kind: "instagram", label: "Instagram", url: null },
      { kind: "whatsapp", label: "WhatsApp", url: null },
    ],
    waMessage: greet("I would like the official links for Shahab Foods."),
  },
  { id: "sol-tekkers", name: "Sol Tekkers", links: generic, waMessage: greet("I would like the official links for Sol Tekkers.") },
  { id: "aims", name: "AIMS", links: generic, waMessage: greet("I would like the official links for AIMS.") },
  { id: "cciu", name: "THE CCIU", links: generic, waMessage: greet("I would like the official links for THE CCIU.") },
  { id: "evergreen", name: "Evergreen Talks", links: generic, waMessage: greet("I would like the official links for Evergreen Talks.") },
];

/* ───────────────────────── CONNECT ───────────────────────── */

export const contact = {
  /** OWNER TO SUPPLY: current official email before launch. null → hidden. */
  email: null as string | null,
  /** Verified URLs only; WhatsApp is always shown. */
  socials: [
    { kind: "facebook", label: "Facebook", url: null as string | null },
    { kind: "instagram", label: "Instagram", url: null as string | null },
    { kind: "linkedin", label: "LinkedIn", url: null as string | null },
    { kind: "youtube", label: "YouTube", url: null as string | null },
  ],
  subjects: [
    "Social work / ATI",
    "Business / Ventures",
    "Consulting",
    "Partnership / MOU",
    "Media / Interview",
    "Other",
  ],
};

/* ───────────────────────── COMING SOON ───────────────────────── */

export const comingSoon = {
  title: "New projects, partnerships and initiatives are on the way.",
  waMessage: greet("please keep me updated about upcoming projects."),
};
```

---

## 11. Code — Shared Components

### 11.1 `src/components/shared/reveal.tsx`

```tsx
"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

### 11.2 `src/components/shared/section.tsx`

```tsx
import { cn } from "@/lib/utils";

const tones = {
  ivory: "bg-ivory text-ink",
  sand: "bg-sand text-ink",
  ink: "bg-ink text-ivory",
} as const;

export function Section({
  id,
  tone = "ivory",
  className,
  children,
}: {
  id: string;
  tone?: keyof typeof tones;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("relative py-24 md:py-32", tones[tone], className)}>
      <div className="mx-auto max-w-7xl px-6 md:px-10">{children}</div>
    </section>
  );
}
```

### 11.3 `src/components/shared/section-heading.tsx`

```tsx
import { Reveal } from "./reveal";

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
}: {
  index?: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal className="mb-16 max-w-3xl md:mb-24">
      <p className="mb-6 flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-gold">
        {index && <span>{index}</span>}
        <span className="h-px w-12 bg-gold/60" />
        <span>{eyebrow}</span>
      </p>
      <h2 className="font-display text-4xl leading-[1.05] md:text-6xl">{title}</h2>
      {description && <p className="mt-6 text-lg text-current/70">{description}</p>}
    </Reveal>
  );
}
```

### 11.4 `src/components/shared/kind-icon.tsx`

```tsx
import { ArrowUpRight, Globe } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp, FaYoutube } from "react-icons/fa6";
import type { LinkKind } from "@/lib/types";

export function KindIcon({ kind, className }: { kind: LinkKind; className?: string }) {
  const c = className ?? "size-4";
  switch (kind) {
    case "facebook": return <FaFacebookF className={c} />;
    case "instagram": return <FaInstagram className={c} />;
    case "linkedin": return <FaLinkedinIn className={c} />;
    case "youtube": return <FaYoutube className={c} />;
    case "whatsapp":
    case "whatsapp-channel": return <FaWhatsapp className={c} />;
    case "website": return <Globe className={c} strokeWidth={1.5} />;
    default: return <ArrowUpRight className={c} strokeWidth={1.5} />;
  }
}
```

### 11.5 `src/components/shared/action-link.tsx`

```tsx
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Action } from "@/lib/types";
import { KindIcon } from "./kind-icon";

type Variant = "solid" | "outline" | "ghost";

const variants: Record<Variant, string> = {
  solid: "bg-gold text-ink hover:bg-ivory",
  outline: "border border-current/30 hover:border-gold hover:text-gold",
  ghost: "text-gold hover:text-current",
};

export function ActionLink({
  action,
  variant = "outline",
  className,
  icon = true,
}: {
  action: Pick<Action, "href" | "label" | "kind" | "external">;
  variant?: Variant;
  className?: string;
  icon?: boolean;
}) {
  const ext = action.external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <a
      href={action.href}
      {...ext}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.2em] transition-colors duration-300",
        variants[variant],
        className,
      )}
    >
      {icon && <KindIcon kind={action.kind} />}
      {action.label}
      <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}
```

### 11.6 `src/components/shared/logo-mark.tsx`

```tsx
import Image from "next/image";
import { cn } from "@/lib/utils";

/** Logo if supplied, otherwise an elegant monogram placeholder. */
export function LogoMark({
  name,
  src,
  className,
}: {
  name: string;
  src: string | null;
  className?: string;
}) {
  const initials = name
    .split(/\s+/)
    .filter((w) => /[A-Za-z]/.test(w[0]))
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={cn(
        "flex size-14 items-center justify-center rounded-full border border-current/20 font-display text-xl",
        className,
      )}
    >
      {src ? <Image src={src} alt={`${name} logo`} width={40} height={40} className="object-contain" /> : initials}
    </div>
  );
}
```

### 11.7 `src/components/shared/counter.tsx`

```tsx
"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => {
        el.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix]);

  return (
    <>
      <span ref={ref} aria-hidden>{`0${suffix}`}</span>
      <span className="sr-only">{`${to}${suffix}`}</span>
    </>
  );
}
```

---

## 12. Code — Layout Components

### 12.1 `src/components/layout/navbar.tsx`

```tsx
"use client";

import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { nav } from "@/content/site";
import { cn } from "@/lib/utils";
import { greet, waLink } from "@/lib/whatsapp";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "bg-ink/80 py-3 backdrop-blur-xl" : "py-6",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 text-ivory md:px-10">
          <a href="#home" className="flex items-baseline gap-4" aria-label="Back to top">
            <span className="font-display text-2xl">
              TS<span className="text-gold">.</span>
            </span>
            <span className="hidden text-[11px] uppercase tracking-[0.3em] text-ivory/70 sm:inline">
              Tayyab Shahab Sialvi
            </span>
          </a>

          <div className="flex items-center gap-4">
            <a
              href={waLink(greet("I visited your website and would like to connect."))}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full border border-ivory/30 px-5 py-2 text-[11px] uppercase tracking-[0.25em] transition hover:border-gold hover:text-gold sm:inline-block"
            >
              WhatsApp
            </a>
            <button
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="text-[11px] uppercase tracking-[0.3em] hover:text-gold"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] overflow-y-auto bg-ink text-ivory"
          >
            <div className="mx-auto flex min-h-full max-w-7xl flex-col px-6 py-8 md:px-10">
              <div className="flex justify-end">
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] hover:text-gold"
                >
                  Close <X className="size-4" strokeWidth={1.25} />
                </button>
              </div>

              <ol className="my-auto py-12">
                {nav.map((item, i) => (
                  <li key={item.id} className="border-b border-ivory/10">
                    <a
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline gap-6 py-4 md:py-5"
                    >
                      <span className="w-8 text-xs tracking-[0.2em] text-gold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-4xl transition-transform duration-500 group-hover:translate-x-3 group-hover:text-gold md:text-6xl">
                        {item.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

### 12.2 `src/components/layout/whatsapp-float.tsx`

```tsx
"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { greet, waLink } from "@/lib/whatsapp";

export function WhatsAppFloat() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={waLink(greet("I visited your website and would like to connect."))}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 16 }}
          className="fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-ink text-gold shadow-lg ring-1 ring-gold/40 transition hover:bg-gold hover:text-ink"
        >
          <FaWhatsapp className="size-6" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
```

### 12.3 `src/components/layout/footer.tsx`

```tsx
import { nav, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="relative bg-ink pb-10 pt-20 text-ivory">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <p className="font-display text-4xl">
              TS<span className="text-gold">.</span>
            </p>
            <p className="mt-2 font-display text-2xl">{site.name}</p>
            <p className="mt-6 max-w-md text-sm text-ivory/60">{site.purpose}</p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
            {nav.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="text-ivory/70 transition hover:text-gold">
                {n.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="mt-16 flex flex-col justify-between gap-2 border-t border-ivory/10 pt-6 text-xs text-ivory/50 md:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
```

---

## 13. Code — Page Sections

### 13.1 `hero.tsx` — large portrait hero

```tsx
"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { site } from "@/content/site";
import { ActionLink } from "@/components/shared/action-link";
import { greet, waLink } from "@/lib/whatsapp";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section id="home" className="grain relative min-h-svh overflow-hidden bg-ink text-ivory">
      {/* ── Large portrait ── */}
      <div className="absolute inset-y-0 right-0 w-full opacity-60 md:w-[60%] md:opacity-100">
        <Image
          src={site.heroImage}
          alt={site.heroAlt}
          fill
          priority
          sizes="(min-width: 768px) 60vw, 100vw"
          unoptimized={site.heroImage.endsWith(".svg")}
          className="object-cover object-top"
        />
        {/* blend portrait into the ink background */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/50 to-transparent md:via-ink/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/50" />
      </div>

      {/* ── Copy ── */}
      <div className="relative z-10 mx-auto flex min-h-svh max-w-7xl flex-col justify-end px-6 pb-20 pt-36 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          className="mb-8 flex items-center gap-4 text-[11px] uppercase tracking-[0.35em] text-gold"
        >
          <span className="h-px w-12 bg-gold/70" />
          Official Personal • Professional • Social
        </motion.p>

        <h1 className="font-display text-[clamp(3.5rem,11vw,10rem)] font-medium leading-[0.88] tracking-tight">
          {site.nameLines.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.15 + i * 0.12, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-10 flex max-w-3xl flex-wrap gap-x-5 gap-y-2 text-[13px] uppercase tracking-[0.18em] text-ivory/80"
        >
          {site.identity.map((item, i) => (
            <li key={item} className="flex items-center gap-5">
              {item}
              {i < site.identity.length - 1 && <span className="hidden h-3 w-px bg-ivory/30 sm:block" />}
            </li>
          ))}
        </motion.ul>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85, ease }}
          className="mt-8 max-w-xl text-lg text-ivory/70"
        >
          {site.intro}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1, ease }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <ActionLink
            variant="solid"
            action={{
              label: "Message on WhatsApp",
              href: waLink(greet("I visited your website and would like to connect.")),
              kind: "whatsapp",
              external: true,
            }}
          />
          <ActionLink
            variant="outline"
            icon={false}
            action={{ label: "Explore Profile", href: "#about", kind: "other", external: false }}
          />
        </motion.div>

        <a
          href="#snapshot"
          aria-label="Scroll down"
          className="absolute bottom-8 right-6 hidden items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-ivory/50 hover:text-gold md:flex md:right-10"
        >
          Scroll <ArrowDown className="size-4 animate-bounce" strokeWidth={1.25} />
        </a>
      </div>
    </section>
  );
}
```

### 13.2 `snapshot.tsx` — Profile Snapshot + Current Roles

```tsx
import { currentRoles, site } from "@/content/site";
import { Section } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { ActionLink } from "@/components/shared/action-link";
import { waLink } from "@/lib/whatsapp";

export function Snapshot() {
  return (
    <Section id="snapshot" tone="ivory" className="py-20 md:py-28">
      <Reveal>
        <p className="mb-10 text-xs uppercase tracking-[0.3em] text-gold">Profile Snapshot</p>
        <dl className="grid gap-10 border-y border-line py-10 md:grid-cols-3">
          <div>
            <dt className="text-xs uppercase tracking-[0.25em] text-stone">Name</dt>
            <dd className="mt-3 font-display text-2xl">{site.name}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.25em] text-stone">Primary identity</dt>
            <dd className="mt-3 font-display text-2xl">{site.identity.join(" · ")}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.25em] text-stone">Purpose</dt>
            <dd className="mt-3 text-sm text-stone">{site.purpose}</dd>
          </div>
        </dl>
      </Reveal>

      <Reveal className="mt-20">
        <p className="mb-10 text-xs uppercase tracking-[0.3em] text-gold">Current Roles</p>
        <div className="grid gap-px overflow-hidden rounded-sm bg-line md:grid-cols-3">
          {currentRoles.map((r) => (
            <article key={r.title + r.org} className="flex flex-col justify-between gap-10 bg-ivory p-8 md:p-10">
              <div>
                <h3 className="font-display text-3xl">{r.title}</h3>
                <p className="mt-2 text-stone">{r.org}</p>
              </div>
              <ActionLink
                variant="ghost"
                icon={false}
                className="-ml-5 self-start"
                action={{ label: "Learn more", href: waLink(r.waMessage), kind: "whatsapp", external: true }}
              />
            </article>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
```

### 13.3 `about.tsx`

```tsx
import { about } from "@/content/site";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";

export function About() {
  return (
    <Section id="about" tone="sand">
      <SectionHeading index="01" eyebrow="About" title="Profile" />
      <div className="grid gap-16 lg:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <p className="font-display text-3xl leading-snug md:text-4xl">{about.body}</p>
        </Reveal>

        <Reveal delay={0.15}>
          <h3 className="mb-6 text-xs uppercase tracking-[0.3em] text-gold">Education</h3>
          <ul className="divide-y divide-line border-y border-line">
            {about.education.map((e) => (
              <li key={e.title} className="py-6">
                <p className="font-display text-2xl">{e.title}</p>
                <p className="mt-1 text-stone">{e.institution}</p>
                {e.period && <p className="mt-2 text-xs uppercase tracking-[0.25em] text-gold">{e.period}</p>}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
```

### 13.4 `social-work.tsx`

```tsx
import { socialWork } from "@/content/site";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { ActionLink } from "@/components/shared/action-link";
import { getActions } from "@/lib/actions";

export function SocialWork() {
  const actions = getActions(socialWork.links, socialWork.waMessage, socialWork.cta);

  return (
    <Section id="social-work" tone="ivory">
      <SectionHeading index="02" eyebrow="Social Work" title="Current Social & Organizational Role" />
      <Reveal>
        <article className="grid gap-12 border border-line p-8 md:p-14 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">{socialWork.role}</p>
            <h3 className="mt-4 font-display text-4xl leading-tight md:text-5xl">{socialWork.org}</h3>
            <p className="mt-8 text-lg text-stone">
              <span className="text-ink">ATI work focus:</span> {socialWork.focus}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              {actions.map((a) => (
                <ActionLink key={a.href} action={{ ...a, label: `${a.label} →`.replace("→ →", "→") }} variant="solid" />
              ))}
            </div>
          </div>
          <ul className="space-y-6 self-end border-t border-line pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            {socialWork.bullets.map((b) => (
              <li key={b} className="flex gap-4">
                <span className="mt-3 h-px w-6 shrink-0 bg-gold" />
                <span className="font-display text-2xl leading-snug">{b}</span>
              </li>
            ))}
          </ul>
        </article>
      </Reveal>
    </Section>
  );
}
```

### 13.5 `career.tsx`

```tsx
import { career } from "@/content/site";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";

export function Career() {
  return (
    <Section id="career" tone="ink">
      <SectionHeading index="03" eyebrow="Professional Journey" title="Professional Career" />
      <ol className="relative ml-2 border-l border-ivory/15 pl-8 md:ml-6 md:pl-14">
        {career.map((c, i) => (
          <Reveal key={c.org} delay={i * 0.08} className="relative pb-14 last:pb-0">
            <span className="absolute -left-[37px] top-3 size-2.5 rounded-full bg-gold md:-left-[65px]" />
            <p className="text-xs uppercase tracking-[0.3em] text-gold">{c.former ? "Former" : "Experience"}</p>
            <h3 className="mt-3 font-display text-3xl md:text-5xl">{c.role}</h3>
            <p className="mt-2 text-lg text-ivory/60">{c.org}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
```

### 13.6 `ventures.tsx`

```tsx
import { ventures } from "@/content/site";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { ActionLink } from "@/components/shared/action-link";
import { LogoMark } from "@/components/shared/logo-mark";
import { getActions } from "@/lib/actions";
import { cn } from "@/lib/utils";

export function Ventures() {
  return (
    <Section id="ventures" tone="ivory">
      <SectionHeading index="04" eyebrow="Businesses & Ventures" title="Building across industries" />
      <div className="grid gap-px overflow-hidden bg-line md:grid-cols-2 lg:grid-cols-3">
        {ventures.map((v, i) => {
          const actions = getActions(v.links, v.waMessage);
          return (
            <Reveal key={v.id} delay={i * 0.06} className={cn("bg-ivory", v.large && "lg:col-span-2")}>
              <article className="flex h-full flex-col justify-between gap-12 p-8 transition-colors duration-500 hover:bg-sand md:p-12">
                <div>
                  <LogoMark name={v.name} src={v.logo} />
                  <h3 className="mt-8 font-display text-3xl md:text-4xl">{v.name}</h3>
                  {v.role && <p className="mt-2 text-xs uppercase tracking-[0.3em] text-gold">{v.role}</p>}
                  {v.description !== v.role && <p className="mt-4 max-w-md text-stone">{v.description}</p>}
                </div>
                <div className="flex flex-wrap gap-2">
                  {actions.map((a) => (
                    <ActionLink key={a.href + a.label} action={a} />
                  ))}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
```

### 13.7 `projects.tsx` — Embla carousel

```tsx
"use client";

import useEmblaCarousel from "embla-carousel-react";
import { projects } from "@/content/site";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { ActionLink } from "@/components/shared/action-link";
import { getActions } from "@/lib/actions";
import { Badge } from "@/components/ui/badge";

export function Projects() {
  const [emblaRef] = useEmblaCarousel({ align: "start", dragFree: true });

  return (
    <Section id="projects" tone="sand">
      <SectionHeading index="05" eyebrow="Projects" title="Current & Featured Projects" description="Drag to explore." />

      <div ref={emblaRef} className="-mx-6 overflow-hidden px-6 md:-mx-10 md:px-10">
        <div className="flex gap-6">
          {projects.map((p) => {
            const actions = getActions(p.links, p.waMessage, p.status === "Coming Soon" ? "Get notified" : "Enquire on WhatsApp");
            return (
              <article
                key={p.id}
                className="flex min-h-[26rem] min-w-0 flex-[0_0_85%] flex-col justify-between border border-line bg-ivory p-8 md:flex-[0_0_42%] md:p-10 lg:flex-[0_0_32%]"
              >
                <div>
                  <Badge variant="outline" className="rounded-full border-gold/60 px-3 text-[10px] uppercase tracking-[0.25em] text-gold">
                    {p.status}
                  </Badge>
                  <h3 className="mt-6 font-display text-3xl leading-tight">{p.name}</h3>
                  {p.description && <p className="mt-4 text-stone">{p.description}</p>}

                  <dl className="mt-8 space-y-3 text-sm">
                    {p.role && (
                      <div className="flex gap-3"><dt className="w-16 shrink-0 text-xs uppercase tracking-[0.2em] text-stone">Role</dt><dd>{p.role}</dd></div>
                    )}
                    {p.partners.length > 0 && (
                      <div className="flex gap-3"><dt className="w-16 shrink-0 text-xs uppercase tracking-[0.2em] text-stone">Partners</dt><dd>{p.partners.join(" + ")}</dd></div>
                    )}
                  </dl>
                </div>

                <div className="mt-10 flex flex-wrap gap-2">
                  {actions.map((a) => <ActionLink key={a.href + a.label} action={a} variant="solid" />)}
                  {p.hasGallery && (
                    <ActionLink icon={false} action={{ label: "Gallery", href: "#gallery", kind: "other", external: false }} />
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
```

### 13.8 `achievements.tsx`

```tsx
import { achievements } from "@/content/site";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Counter } from "@/components/shared/counter";

export function Achievements() {
  return (
    <Section id="achievements" tone="ink">
      <SectionHeading index="06" eyebrow="Milestones" title="Achievements & Milestones" />
      <div className="grid gap-px overflow-hidden bg-ivory/10 sm:grid-cols-2">
        {achievements.map((a, i) => (
          <Reveal key={a.id} delay={i * 0.08} className="bg-ink">
            <div className="flex h-full min-h-[18rem] flex-col justify-between p-8 md:p-12">
              <p className="font-display text-7xl leading-none text-gold md:text-8xl">
                {a.value !== undefined ? <Counter to={a.value} suffix={a.suffix} /> : <span aria-hidden>—</span>}
              </p>
              <p className="mt-10 font-display text-3xl leading-tight md:text-4xl">{a.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
```

### 13.9 `partnerships.tsx`

```tsx
import { mou } from "@/content/site";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { ActionLink } from "@/components/shared/action-link";
import { LogoMark } from "@/components/shared/logo-mark";
import { getActions } from "@/lib/actions";

export function Partnerships() {
  const actions = getActions(mou.partnerLinks, mou.waMessage, "Partner with us");
  const slots = Math.max(3, mou.photos.length);

  return (
    <Section id="partnerships" tone="ivory">
      <SectionHeading index="07" eyebrow="MOU & Partnerships" title="Partnerships & MOUs" />

      <Reveal>
        <article className="border border-line p-8 md:p-14">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Digital Skills Program</p>
          <h3 className="mt-4 max-w-3xl font-display text-4xl leading-tight md:text-5xl">{mou.title}</h3>

          <div className="mt-14 grid gap-12 lg:grid-cols-2">
            <div>
              <h4 className="mb-6 text-xs uppercase tracking-[0.3em] text-stone">{mou.participantsLabel}</h4>
              <ul className="space-y-6">
                {mou.participants.map((p) => (
                  <li key={p.name} className="flex items-center gap-5">
                    <LogoMark name={p.name} src={null} />
                    <div>
                      <p className="font-display text-2xl">{p.name}</p>
                      <p className="text-stone">{p.role}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-6 text-xs uppercase tracking-[0.3em] text-stone">{mou.relatedLabel}</h4>
              <ul className="divide-y divide-line border-y border-line">
                {mou.related.map((p) => (
                  <li key={p.name} className="py-4">
                    <p className="font-display text-xl">{p.name}</p>
                    <p className="text-sm text-stone">{p.role}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Visual MOU gallery — placeholder tiles until photos arrive */}
          <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-3">
            {Array.from({ length: slots }).map((_, i) => {
              const photo = mou.photos[i];
              return (
                <div
                  key={i}
                  className="flex aspect-[4/3] items-center justify-center border border-dashed border-line bg-sand text-xs uppercase tracking-[0.25em] text-stone"
                >
                  {photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={photo.src} alt={photo.alt} className="size-full object-cover" />
                  ) : (
                    "MOU photo"
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {actions.map((a) => <ActionLink key={a.href + a.label} action={a} variant="solid" />)}
          </div>
        </article>
      </Reveal>
    </Section>
  );
}
```

### 13.10 `gallery.tsx` — filters + lightbox

```tsx
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { ImageIcon } from "lucide-react";
import { gallery, galleryCategories } from "@/content/site";
import type { GalleryCategory } from "@/lib/types";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { cn } from "@/lib/utils";

const ratios = ["aspect-[4/5]", "aspect-square", "aspect-[4/3]", "aspect-[3/4]"];

export function Gallery() {
  const [filter, setFilter] = useState<GalleryCategory | "All">("All");
  const [index, setIndex] = useState(-1);

  const items = useMemo(
    () => (filter === "All" ? gallery : gallery.filter((g) => g.category === filter)),
    [filter],
  );
  const slides = items.filter((i) => i.src).map((i) => ({ src: i.src as string, alt: i.alt ?? i.caption }));

  return (
    <Section id="gallery" tone="sand">
      <SectionHeading index="08" eyebrow="Media & Gallery" title="Moments, press & milestones" />

      <div className="mb-12 flex flex-wrap gap-2" role="tablist" aria-label="Gallery filters">
        {(["All", ...galleryCategories] as const).map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={filter === c}
            onClick={() => setFilter(c)}
            className={cn(
              "rounded-full border px-5 py-2 text-[11px] uppercase tracking-[0.2em] transition",
              filter === c ? "border-ink bg-ink text-ivory" : "border-line hover:border-gold hover:text-gold",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {items.map((g, i) => {
          const slideIndex = slides.findIndex((s) => s.src === g.src);
          return (
            <figure key={g.id} className="mb-4 break-inside-avoid">
              <button
                disabled={!g.src}
                onClick={() => g.src && setIndex(slideIndex)}
                className={cn(
                  "relative block w-full overflow-hidden border border-line bg-ivory",
                  ratios[i % ratios.length],
                  g.src ? "cursor-zoom-in" : "cursor-default",
                )}
                aria-label={g.src ? `Open ${g.caption}` : `${g.caption} (photo coming soon)`}
              >
                {g.src ? (
                  <Image src={g.src} alt={g.alt ?? g.caption} fill sizes="(min-width:1024px) 33vw, 50vw" className="object-cover" />
                ) : (
                  <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-stone">
                    <ImageIcon className="size-6" strokeWidth={1} />
                    <span className="text-[10px] uppercase tracking-[0.3em]">Photo coming soon</span>
                  </span>
                )}
              </button>
              <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-sm">
                <span>{g.caption}</span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold">{g.category}</span>
              </figcaption>
            </figure>
          );
        })}
      </div>

      <Lightbox open={index >= 0} index={index} close={() => setIndex(-1)} slides={slides} />
    </Section>
  );
}
```

### 13.11 `platforms.tsx` — Official Links portal

```tsx
import { platforms } from "@/content/site";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { ActionLink } from "@/components/shared/action-link";
import { getActions } from "@/lib/actions";

export function Platforms() {
  return (
    <Section id="platforms" tone="ivory">
      <SectionHeading
        index="09"
        eyebrow="Official Links"
        title="Official platforms, in one place"
        description="Verified official websites and social accounts for every organization and project."
      />
      <ul className="divide-y divide-line border-y border-line">
        {platforms.map((p, i) => {
          const actions = getActions(p.links, p.waMessage);
          return (
            <Reveal key={p.id} delay={i * 0.05}>
              <li className="flex flex-col justify-between gap-6 py-8 md:flex-row md:items-center">
                <h3 className="font-display text-3xl md:text-4xl">{p.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {actions.map((a) => <ActionLink key={a.href + a.label} action={a} />)}
                </div>
              </li>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
```

### 13.12 `coming-soon.tsx`

```tsx
import { comingSoon } from "@/content/site";
import { Section } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { ActionLink } from "@/components/shared/action-link";
import { waLink } from "@/lib/whatsapp";

export function ComingSoon() {
  return (
    <Section id="coming-soon" tone="ink" className="py-20 md:py-28">
      <Reveal className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold">Coming Soon</p>
          <p className="max-w-2xl font-display text-4xl leading-tight md:text-5xl">{comingSoon.title}</p>
        </div>
        <ActionLink
          variant="solid"
          action={{ label: "Get notified on WhatsApp", href: waLink(comingSoon.waMessage), kind: "whatsapp", external: true }}
        />
      </Reveal>
    </Section>
  );
}
```

### 13.13 `connect.tsx`

```tsx
import { contact } from "@/content/site";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { ActionLink } from "@/components/shared/action-link";
import { KindIcon } from "@/components/shared/kind-icon";
import { ContactForm } from "./contact-form";
import { PHONE_DISPLAY, TEL_LINK, greet, waLink } from "@/lib/whatsapp";
import type { LinkKind } from "@/lib/types";

export function Connect() {
  const socials = contact.socials.filter((s) => s.url);

  return (
    <Section id="connect" tone="ivory">
      <SectionHeading index="10" eyebrow="Connect" title="Let’s talk." />
      <div className="grid gap-20 lg:grid-cols-2">
        <Reveal>
          <dl className="space-y-10">
            <div>
              <dt className="text-xs uppercase tracking-[0.3em] text-stone">Phone / WhatsApp</dt>
              <dd className="mt-3">
                <a href={TEL_LINK} className="font-display text-4xl transition hover:text-gold md:text-5xl">
                  {PHONE_DISPLAY}
                </a>
              </dd>
            </div>

            {contact.email && (
              <div>
                <dt className="text-xs uppercase tracking-[0.3em] text-stone">Email</dt>
                <dd className="mt-3">
                  <a href={`mailto:${contact.email}`} className="font-display text-3xl transition hover:text-gold">
                    {contact.email}
                  </a>
                </dd>
              </div>
            )}

            <div>
              <dt className="mb-4 text-xs uppercase tracking-[0.3em] text-stone">Social media</dt>
              <dd className="flex flex-wrap gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.url as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex size-12 items-center justify-center rounded-full border border-line transition hover:border-gold hover:text-gold"
                  >
                    <KindIcon kind={s.kind as LinkKind} />
                  </a>
                ))}
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="flex size-12 items-center justify-center rounded-full border border-line transition hover:border-gold hover:text-gold"
                >
                  <KindIcon kind="whatsapp" />
                </a>
              </dd>
            </div>
          </dl>

          <ActionLink
            className="mt-12"
            variant="solid"
            action={{
              label: "Message Tayyab Shahab on WhatsApp",
              href: waLink(greet("I would like to connect with you.")),
              kind: "whatsapp",
              external: true,
            }}
          />
        </Reveal>

        <Reveal delay={0.15}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
```

### 13.14 `contact-form.tsx` — form → WhatsApp (nothing stored)

```tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { contact } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { greet, waLink } from "@/lib/whatsapp";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  subject: z.string().min(1, "Choose a subject"),
  message: z.string().min(5, "Please write a short message"),
});
type Values = z.infer<typeof schema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { subject: contact.subjects[0] } });

  const onSubmit = (v: Values) => {
    const text = greet(`I am ${v.name}.\nSubject: ${v.subject}\n\n${v.message}`);
    window.open(waLink(text), "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 border border-line p-8 md:p-12" noValidate>
      <div>
        <p className="font-display text-3xl">Send a message</p>
        <p className="mt-2 text-sm text-stone">
          Your message opens directly in WhatsApp. Nothing is stored on this website.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name" className="text-xs uppercase tracking-[0.25em] text-stone">Your name</Label>
        <Input id="name" {...register("name")} className="rounded-none border-0 border-b border-line bg-transparent px-0 shadow-none focus-visible:ring-0" />
        {errors.name && <p className="text-xs text-red-700">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject" className="text-xs uppercase tracking-[0.25em] text-stone">Subject</Label>
        <select
          id="subject"
          {...register("subject")}
          className="w-full border-0 border-b border-line bg-transparent py-2 outline-none focus:border-gold"
        >
          {contact.subjects.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-xs uppercase tracking-[0.25em] text-stone">Message</Label>
        <Textarea id="message" rows={4} {...register("message")} className="rounded-none border-0 border-b border-line bg-transparent px-0 shadow-none focus-visible:ring-0" />
        {errors.message && <p className="text-xs text-red-700">{errors.message.message}</p>}
      </div>

      <Button type="submit" className="h-12 rounded-full bg-ink px-8 text-xs uppercase tracking-[0.25em] text-ivory hover:bg-gold hover:text-ink">
        Send via WhatsApp
      </Button>
    </form>
  );
}
```

---

## 14. Hero Placeholder Image

Create `public/images/hero-placeholder.svg` (4:5 portrait, tasteful dark silhouette, clearly labelled):

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 2000" fill="none">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#2a2a2d"/>
      <stop offset="1" stop-color="#0b0b0c"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="28%" r="55%">
      <stop offset="0" stop-color="#b79b6b" stop-opacity=".28"/>
      <stop offset="1" stop-color="#b79b6b" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1600" height="2000" fill="url(#bg)"/>
  <rect width="1600" height="2000" fill="url(#glow)"/>
  <circle cx="800" cy="720" r="230" fill="#3a3a3e"/>
  <path d="M240 2000c0-430 240-720 560-720s560 290 560 720z" fill="#3a3a3e"/>
  <text x="800" y="1650" text-anchor="middle" font-family="Georgia, serif" font-size="58" letter-spacing="10" fill="#b79b6b">YOUR PORTRAIT HERE</text>
  <text x="800" y="1720" text-anchor="middle" font-family="Arial, sans-serif" font-size="30" letter-spacing="4" fill="#8a8a8f">1600 × 2000 · WEBP / PNG</text>
</svg>
```

### 14.1 Replacing it with the real photo

1. Export the portrait at **1600 × 2000 px (4:5)**, `.webp` (quality ~85), ideally under 300 KB.
2. Best result: a **studio portrait on a dark neutral backdrop**, or a **transparent cut-out** placed over the dark hero. Subject should sit right-of-centre with space above the head (the name overlaps the left side on desktop).
3. Save as `public/images/tayyab-hero.webp`.
4. In `src/content/site.ts` change **one line**:

```ts
heroImage: "/images/tayyab-hero.webp",
```

`next/image` automatically optimises it (the `unoptimized` flag only applies to `.svg`).

---

## 15. SEO & Metadata

- **Title / description / keywords / canonical** → `layout.tsx` metadata (§9.2).
- **Open Graph + Twitter card** with `/images/og.jpg` (1200 × 630; owner to supply — use the portrait + name).
- **Structured data:** JSON-LD `Person` (name, jobTitle, alumniOf, affiliation). Phone/email are deliberately excluded for privacy.
- **`sitemap.xml` and `robots.txt`** generated by `sitemap.ts` / `robots.ts`.
- **Semantic HTML:** one `<h1>` (hero), `<h2>` per section, `<main>`, `<nav>`, `<footer>`, `<figure>/<figcaption>` in gallery.
- **After launch:** add the Vercel URL in Google Search Console and submit `/sitemap.xml`.

---

## 16. Performance, Accessibility & Privacy

**Performance**

- Hero image uses `priority` + `sizes`; all other images lazy by default.
- Fonts via `next/font` (self-hosted, no layout shift).
- Page is statically generated (no server runtime needed).
- Lightbox/carousel only load on the client sections that use them.
- Target Lighthouse: **Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95**.

**Accessibility**

- Skip-to-content link; visible gold focus ring on all interactive elements.
- Menu overlay is a labelled `role="dialog"`, closes with **Esc**.
- All icon-only buttons have `aria-label`.
- Reduced-motion respected (`MotionConfig reducedMotion="user"`, Lenis disabled, CSS fallback).
- Contrast: body text `ink` on `ivory`/`sand` and `ivory` on `ink` pass WCAG AA; gold is used for accents/large text only.

**Privacy** (from the brief: *protect personal information from unnecessary public exposure*)

- Phone is the only personal detail shown, as supplied by the owner; **it is not placed in structured data**.
- Email is **hidden until the owner supplies an official address**.
- Contact form does **not** store or transmit data to any server — it only builds a `wa.me` link in the visitor's browser.
- No analytics/cookies by default (so no cookie banner needed). Optional later: Vercel Web Analytics (privacy-friendly).

---

## 17. Deployment on Free Vercel

1. Push the project to a **GitHub** repository.
2. Go to **vercel.com → Add New → Project → Import** the repo (framework auto-detected as Next.js).
3. Add environment variables: `NEXT_PUBLIC_WHATSAPP_NUMBER=923074891612` and `NEXT_PUBLIC_SITE_URL=https://<your-project>.vercel.app`.
4. **Deploy.** Every `git push` to `main` redeploys automatically.
5. Optional custom domain: Project → Settings → Domains.
6. After the first deploy, update `NEXT_PUBLIC_SITE_URL` to the final URL and redeploy (affects OG tags, canonical, sitemap).

> **Heads-up:** Vercel's free **Hobby** plan is intended for personal, non-commercial use. This site promotes businesses (Shahab Group, Shahab Foods, consulting), so check Vercel's current terms before launch. If it's a problem, the same project deploys unchanged to **Cloudflare Pages** or **Netlify** free tiers, or Vercel Pro.

---

## 18. Updating Content Later (CMS / Admin)

The brief asks for an *easy-to-update CMS/admin area for projects, achievements, gallery, links and Coming Soon items*, plus an *editable admin field* for achievement figures.

**v1 (free, zero backend):** all of this is already editable in **one file** — `src/content/site.ts`:

| To update… | Edit… |
|---|---|
| Add a project / mark "Coming Soon" | push an object into `projects` |
| Change an achievement figure | change `value` in `achievements` |
| Add gallery photos | drop image in `public/images/gallery/`, set `src` on a `gallery` item |
| Add an official link | replace `url: null` with the verified URL — the WhatsApp fallback disappears automatically |
| Add MOU photos | fill `mou.photos` |
| Add email / social URLs | `contact.email`, `contact.socials[].url` |
| Swap hero portrait | `site.heroImage` |

Commit → push → Vercel redeploys in ~1 minute.

**v2 (optional visual admin, still free):** add **Keystatic** or **Decap CMS** (git-based) so the owner can edit these same fields from a web form without touching code. Move the data from `site.ts` to JSON/MDX files and read them in the components.

---

## 19. Owner Asset Checklist

*(From the brief — content that still needs owner-supplied assets.)*

- [ ] Final professional headshot/profile photo → `public/images/tayyab-hero.webp` (1600 × 2000)
- [ ] Personal logo (if any)
- [ ] Verified official URLs for every organization/project (ATI, Shahab Group, Shahab Foods, Sol Tekkers, AIMS, THE CCIU, Evergreen Talks)
- [ ] Social-media URLs/handles (Facebook, Instagram, LinkedIn, YouTube, WhatsApp Channel)
- [ ] MOU documents/photos
- [ ] Achievement certificates/photos
- [ ] Selected event/gallery photographs
- [ ] Final short biography approved for publication
- [ ] Any additional current projects or roles not listed above

**Also needed for launch**

- [ ] Current official email address
- [ ] Organization logos (SVG/PNG, transparent) → `public/images/logos/`
- [ ] Short description for **Shahab Group** (currently only "Founder & CEO")
- [ ] 1200 × 630 share image → `public/images/og.jpg`
- [ ] Confirm AIMS employment status (shown as **former** after September 2026)
- [ ] Confirm the owner's role/status wording for each project card (hidden until supplied)

---

## 20. Build Phases & Definition of Done

### Phases

1. **Setup** — create app, install libraries, shadcn init, env vars (§8).
2. **Design system** — `globals.css` tokens, fonts, `Section`, `SectionHeading`, `ActionLink`, `Reveal` (§9, §11).
3. **Data** — create `content/site.ts` exactly as §10; verify against §5 word for word.
4. **Layout** — Navbar + full-screen menu, Footer, WhatsApp float (§12).
5. **Sections** — Hero → Snapshot → About → Social Work → Career → Ventures → Projects → Achievements → Partnerships → Gallery → Platforms → Coming Soon → Connect (§13).
6. **Placeholders** — add `hero-placeholder.svg` (§14).
7. **SEO** — metadata, JSON-LD, sitemap, robots (§15).
8. **QA** — mobile (360 / 390 / 768 / 1280 / 1920), keyboard-only, reduced-motion, Lighthouse.
9. **Deploy** — Vercel (§17).
10. **Handover** — owner fills asset checklist (§19); swap hero image; insert verified links.

### Definition of done

- [ ] **Every piece of content in §5 appears on the page** (except developer notes, which stay hidden).
- [ ] Large hero portrait displays (placeholder now; one-line swap later).
- [ ] Every button opens WhatsApp (`wa.me/923074891612`) with a relevant pre-filled message, or a verified official URL when one exists.
- [ ] **No invented URLs anywhere.**
- [ ] Phone tap-to-call works; floating WhatsApp button appears after the hero.
- [ ] Full-screen menu lists all 10 navigation items and scrolls smoothly to each section.
- [ ] Achievement counters only show documented figures (100+ Interviews, 100+ Free Medical Camps).
- [ ] Project cards show Name · Description · Role · Partner(s) · Status · Gallery · Official Link (empty fields hidden).
- [ ] Gallery filters work; lightbox opens for real photos; placeholders are tidy.
- [ ] AIMS, Saylani and Al-Mustafa shown as **Former**.
- [ ] Email hidden until supplied; no personal data stored; no phone/email in JSON-LD.
- [ ] Mobile-first and fully responsive; keyboard accessible; reduced-motion respected.
- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95.
- [ ] Deployed on Vercel with env vars set and `sitemap.xml` reachable.
- [ ] New projects, achievements, gallery items, partnerships and official links can be added by editing `content/site.ts` only — **no redesign required.**

---

*End of DEVELOPMENT.md*
