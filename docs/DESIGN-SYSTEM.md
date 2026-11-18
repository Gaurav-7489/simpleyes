# Design system — the Living Document System (3D editorial, Nov 2026)

## Redesign (18 Nov 2026, owners' "Simplyes Website Redesign" mockup)

- **Styles:** `src/styles/redesign.css`, loaded last. It adds the urgent strip (`.urgent-bar`), the lower-case
  gradient wordmark, flatter pill buttons, the lime-bar `.eyebrow`, and the homepage and service-page layouts.
- **Emergency colour:** `--color-rust-*` tokens, used only for urgent routes (lost passport, Emergency Certificate,
  "Message URGENT"). WhatsApp messages on these routes start with "URGENT".
- **Homepage:** HTML/CSS hero illustration (application check, booked appointment, photo chip) instead of a 3D
  scene; appointment and emergency cards; the six services as a list beside "Included with every service".
- **Services:** six, named the way the consulates name them. Old slugs redirect in `vercel.json`.
- **Videos:** `src/components/video/VideoTile.tsx`, click-to-play, privacy-enhanced embed; all seven on `/guides/`.


**Idea:** *European sophistication, Indian understanding.* The site's visual language is paper: sheets,
blank passport-style booklets, cards, envelopes, folders and stamps, floating above a table in soft
daylight. Together they stand for clarification, organisation, guidance and progress. The 3D scene is
the one bold element. Everything around it stays quiet: editorial type, generous space and few surfaces.

## Tokens (`src/styles/tokens.css`)

| Role | Value | Notes |
|---|---|---|
| Canvas | `#F6F9F5` | Approved background |
| Ink | `#13211D` | Approved primary text |
| Deep green | `#005C45` | Actions and links (7.6:1 on canvas). Owner-confirmed 12 Nov 2026 |
| Signal green | `#00905A` | Large display text, icons and decoration only (3.9:1) |
| Mint | `#E2F4E6` | Tinted paper, quiet highlights |
| Lime | `#A6DC5C` | Index tabs, the active mark and the primary button on dark. Used sparingly |
| Folder | `#0D2E26` | Dark band (final CTA, footer, vision). White on it is 14:1 |

- **Type:** Outfit is the display face, at weight 300–400 and large sizes with tight tracking (`--fs-display`, `--fs-page`, `--fs-h2`). DM Sans is the body face (`--fs-body`).
- **Labels:** no all-caps eyebrows. Sections are marked only where the content really is a sequence (numbered steps) or by a lime paper "index tab".
- **Radii are a hierarchy:** paper 4px, controls are pills, surfaces 16–32px.
- **Motion:** `--dur-1…4` and `--ease-out` / `--ease-settle`.

## 3D scenes (`src/components/scene/`)

- **`DocumentStage`** renders one composition, or several for switching, as server-rendered HTML. A stage is decorative (`aria-hidden`) unless given a `label`, in which case it is announced as `role="img"`.
- **`objects.tsx`** holds the primitives: sheet (lines, checklist, form, certificate, declaration, notes, blank), vellum, booklet, spread, card, envelope, folder, stamp, pen, scroll, check and tag. All are abstract: no emblems, seals, country names or personal data.
- **`scenes.ts`** holds the compositions: the hero, one per service, five How It Works stages, pricing layers, About, contact, thanks, 404 and legal. Each object has x/y (% of the stage), w (cqw), z (height above the table, cqw), rz/rx/ry, and a stagger index.
- **`src/styles/scene.css`** does the rendering: a camera with perspective over a `preserve-3d` world, sized in container-query units so scenes scale fluidly. Each object casts a shadow onto the table that grows softer the higher it floats.

**CSS 3D only.** Every scene is server-rendered CSS 3D, with no dependency. The homepage hero no longer uses a
scene (see the redesign section below), so the WebGL hero and three.js / React Three Fiber were removed.

- **Stills:** places that show a scene without interaction use pre-rendered images (`<SceneImage>`, `public/images/scenes/`). These are the gallery, related services and the mobile service list. They are AVIF with a WebP fallback, in 560, 840 and 1120 px, lazy-loaded with fixed dimensions.
  - Regenerate after changing a composition: `npm run build && npm run preview`, then `npm run render:scenes`.

## Motion rules

- **One directed sequence per page:** the documents settle onto the table on entry (`.stage[data-intro]`). Copy animates by transform only, so LCP is never delayed.
- **Visitor-driven only:**
  - the service index lifts the hovered or focused service's composition, and its lime tab glides between rows (Motion `layoutId`);
  - How It Works follows the step nearest the middle of the viewport (IntersectionObserver, native scrolling);
  - the hero drifts and scales slightly as it scrolls away (Motion `useScroll`);
  - problem-picker ticks spring in;
  - stages lean up to 5–6° toward a fine pointer (`MotionLayer`).
- **Motion library:** `motion/react` through `<MotionProvider>`, which uses `LazyMotion` with `m` components (about 5 KB up front; features lazy-loaded after first render) and `MotionConfig reducedMotion="user"`. `LazyMotion strict` throws if a full `motion` component sneaks in. Springs use `bounce: 0`: no overshoot anywhere.
- **No looping animation, no scroll-jacking, no custom cursor.** `prefers-reduced-motion` shows settled states with no transitions.
- **Overflow:** `main { overflow-x: clip }` contains 3D overdraw without creating a scroll container (sticky still works).

## Adding a service composition

Add a key to `serviceSceneKeys` and a composition in `scenes.ts`, then set `scene: { kind, label }` on the service in `src/content/services.ts`.

## Logo, favicon and link preview (18 Nov 2026)

- **Logo:** `src/components/ui/Wordmark.tsx` — lower-case "simplyes." in Outfit semibold: "si" lime `#9ed657`, then
  "mplyes." from teal `#0e9bad` to lime `#7ad552` (colours sampled from the owners' logo).
- **Icons and preview:** `npm run render:brand` (with the built site served) renders the favicon (`src/app/icon.png`),
  `apple-icon.png`, the manifest icons, `public/logo.png` and `public/og-image.png` from that same markup, so the logo
  is identical everywhere. Re-run it after any logo change.
- **Site title:** `site.title` — "Simplyes – Indian Passport, Visa & OCI Help in Germany".
- **Social profiles:** `site.social` (Instagram, Facebook, LinkedIn) render only once set.
