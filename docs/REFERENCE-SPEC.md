# Reference specification — Agencee → Simplyes

Source: live-browser inspection of <https://agencee-template.framer.website/> on 2026-10-28
(Chrome, computed styles read via DevTools/JS, screenshots at desktop, 810px tablet and 390px mobile
via a same-origin viewport frame). Values marked *measured* come from `getComputedStyle`.

> Note on viewport: the inspection browser window rendered at a 1867px CSS viewport; container and
> type values are fixed px in the reference above its desktop breakpoint, so they apply to 1440px too.

## 1. Design tokens

| Token | Reference value | Simplyes implementation |
|---|---|---|
| Page background | `#f7f7f7` *(measured)* | `--color-canvas` |
| Alternate section bg | `#eff0f0` *(measured)* | `--color-canvas-alt` |
| Card surface | `#eff0f0` *(measured)* | `--color-surface` |
| Primary text | `#000` | `--color-ink` |
| Secondary text | `#505050` *(measured)* | `--color-ink-2` |
| Muted highlight words | light grey | `--color-ink-3` `#767676` (raised for AA contrast) |
| Accent | teal (orbs, numbers, charts) | **Simplyes green** `#6f9a3c / #567d2a / #3e6a00` (from simplyes.de) |
| Container | `max-width: 1200px` *(measured)* | `--container-site: 1200px` |
| Section padding | `120px 40px` desktop, `100px 40px` @810, `80px 18px` mobile *(measured)* | `--section-y` / `--gutter` |
| Hero padding | `140px 40px 100px` desktop, `120px 18px 80px` mobile *(measured)* | `clamp()` on hero |
| Card radius stack | 20px frame → 14px inset well → 8px card *(measured)* | `.frame` / `.frame-inner` / `.card` |
| Frame padding | 6px + 6px; card padding 20px; grid gap 24px *(measured)* | same |
| Inset well shadow | `inset 0 0 5px rgba(0,0,0,.2)` *(measured)* | `--shadow-frame-inset` |
| Card shadow | 3-layer soft shadow *(measured)* | `--shadow-card` |
| Badge pill | 34px high, `6px 12px`, radius 100px, 14px uppercase *(measured)* | `.badge` |
| Dark button | 52px pill: 6px rim + 40px face `9px 20px`; gradient `rgba(0,0,0,.6) → #030c0d`; inset highlight `0 -5px 2px rgba(255,255,255,.25)` + 6 drop layers *(measured)* | `.btn-dark` |
| Light button | same geometry; `rgba(0,0,0,.1) → transparent` rim, white gradient face *(measured)* | `.btn-light` |
| Header | fixed, 80px, `rgba(245,245,245,.2)` + `blur(5px)`, padding `12px 32px 16px` *(measured)* | `Header` (desktop); floating 14px-radius card + toggle on mobile (as reference) |

## 2. Typography

| Role | Desktop | 810px | 390px | Notes |
|---|---|---|---|---|
| Display (Satoshi 400) | 100/110, −4px *(measured)* | 72/79.2 | 40/44, −1.6px | `.type-hero` clamp(2.5rem → 6.25rem) |
| H2 (Satoshi 400) | 56/67.2, −1.12px | 44/52.8 | 36/43.2 | `.type-h2` |
| Intro statement (Satoshi) | 36/50.4, −0.36px | 32/44.8 | 24/33.6 | `.type-intro` |
| Quote (Satoshi) | 24/36 | — | — | `.type-quote` |
| Card title (Satoshi 500) | 20/24, −0.2px | 20 | 20 | `.type-card-title` |
| Body / nav (Inter) | 16/24 lead, 14/22.4 nav & buttons *(measured)* | | 14/21 | |
| Footer display | 183/201, −7.32px (−4%) *(measured)* | | | `.type-display` clamp |

Fonts: Satoshi (Indian Type Foundry via Fontshare, ITF Free Font License) is self-hosted from
`src/app/fonts/`; Inter is self-hosted via `next/font` at build time. No runtime third-party font requests.

## 3. Component inventory

Badge pill · Dark/light pill buttons (+ small variant) · Three-layer card frame · Service card (illustration
panel, title, copy, "Learn more" pill) · Numbered step card (orb number, dot trio, dashed divider) · Benefit
bento card (neumorphic orbs/pills illustration) · Comparison pair with central orb · FAQ accordion card
(+/× toggle) · CTA strip (grey pill with copy + dark button) · Glass word pill in display headings · Logo
marquee · Oversized footer display line · Dashed column rules.

## 4. Section mapping

| # | Agencee section | Simplyes section | Notes |
|---|---|---|---|
| 1 | Fixed nav (logo, 5 links, dark CTA) | Same pattern: wordmark, Services · How It Works · Why Simplyes · FAQs · Contact, "Get Help on WhatsApp" | Floating card + accessible menu below 1024px |
| 2 | Hero: badge, 2-line 100px headline with glass word, lead, light + dark CTA, logo marquee, glass orb backdrop | Badge "Redefining Consular Services", "Consular assistance, / made simpler." (glass pill), lead, "Explore Our Services" + "Get Help on WhatsApp", independence note, marquee of the six service categories (no fake client logos) | Orb rebuilt as pure CSS gradients |
| 3 | What we do: editorial statement with grey words + 3 stat pills | "Less confusion. More clarity. Better prepared." + description + 3 fact pills (Germany / Independent / WhatsApp) + disclosure | **No numeric stats** (unverifiable) |
| 4 | Services: 2-up rows alternating wide/narrow, CTA strip | Six approved services in 3 alternating rows, CTA strip | Original SVG document illustrations instead of stock photos |
| 5 | Process: left intro + quote, 2×2 numbered cards | Same layout, steps 01–04 from the brief | Left column sticky on desktop |
| 6 | Benefits: bento with neumorphic illustrations | "Why Simplyes", six benefits | |
| 7 | Comparison "Agencya vs Others" | **Transparency**: "Simplyes helps you" vs "Authorities" | Repurposed to communicate legal boundaries |
| 8 | About stats, Testimonials, Pricing, Projects, Team | **Omitted** | Would require fabricated stats, reviews, prices, cases or people |
| 9 | FAQ: 2 columns of accordion cards + contact pill | 9 approved questions (native `<details>`), WhatsApp pill | |
| 10 | "GET IN TOUCH" footer display + columns | Final CTA card + "SIMPLY YES" footer display, columns (Navigation · Contact · Legal), disclosure, copyright | |

## 5. Responsive rules (observed → implemented)

- ≥1200px: fixed type sizes above, 1200px container, 40px gutters.
- 810–1199px: type steps down (72/44/32), desktop nav still shown in the reference; Simplyes switches to the
  floating menu below 1024px because its nav labels are longer.
- <810px: 18px gutters, 80px section padding, all grids collapse to one column, header becomes a floating
  rounded card with a menu toggle, hero CTAs stay side-by-side and wrap when needed.
- Card rows: alternating wide/narrow only at ≥1024px; benefits use 2 columns from 768px.

## 6. Motion

- Reference: elements fade/blur/slide in on scroll (blur → sharp, ~0.6–0.9s, ease-out), hover lift on buttons,
  continuous logo marquee, accordion expand.
- Implementation: one IntersectionObserver toggling CSS transitions (opacity, transform, small blur) with
  stagger via `--reveal-delay`; hero animates transform/blur only so LCP is never delayed; marquee is a CSS
  transform loop; accordions use `::details-content` height transitions where supported.
- `prefers-reduced-motion` disables all of it; content is fully visible without JavaScript.

## 7. Assets

- No reference assets, code, logos, photos or illustrations were copied.
- All illustrations are original SVG/CSS; the wordmark orb is original.
- No government crests, seals or emblems are used anywhere.
