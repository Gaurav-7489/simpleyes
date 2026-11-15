# Design system — the Living Document System (3D editorial, Nov 2026)

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

**Why CSS 3D, not WebGL?** The objects are flat planes. CSS 3D renders them crisply with real perspective, at no dependency cost (Three.js/R3F would add about 150–250 KB gzipped), with no canvas and no hydration cost. It works in the static export and has no third-party requests.

## Motion rules

- **One directed sequence per page:** the documents settle onto the table on entry (`.stage[data-intro]`). Copy animates by transform only, so LCP is never delayed.
- **Visitor-driven only:** the service index lifts the hovered or focused service's composition; How It Works follows the step nearest the middle of the viewport (IntersectionObserver, native scrolling); stages lean up to 5–6° toward a fine pointer (`MotionLayer`).
- **No looping animation, no scroll-jacking, no custom cursor.** `prefers-reduced-motion` shows settled states with no transitions.
- **Overflow:** `main { overflow-x: clip }` contains 3D overdraw without creating a scroll container (sticky still works).

## Adding a service composition

Add a key to `serviceSceneKeys` and a composition in `scenes.ts`, then set `scene: { kind, label }` on the service in `src/content/services.ts`.
