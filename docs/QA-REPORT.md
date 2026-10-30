# QA report

Branch `feat/eight-services`, code verified at commit `a10d792` (the docs commit that adds this file follows it).
Run locally in a cloud container (Node 22, Chromium 1243 via Playwright) on 2026-10-30 with the CI environment:
`NEXT_PUBLIC_SITE_ENV=production NEXT_PUBLIC_SITE_URL=https://simplyes.de`. Lab numbers only; real-user Core
Web Vitals need field data after launch.

**Caveat — fonts:** the container could not reach Fontshare, so the build used a stand-in woff2 at
`src/app/fonts/Satoshi-Variable.woff2` (gitignored, not committed). Layout and wrapping with real Satoshi must
be confirmed on the Vercel preview / in CI, which fetch the real font.

## Baseline (unchanged `main` @ `58e9a1c`)

| Check | Result |
|---|---|
| typecheck / lint / build | pass |
| Playwright (no `NEXT_PUBLIC_SITE_ENV` set) | 101 passed, 2 failed, 35 skipped |

Baseline failures: (1) `SEO › sitemap and robots` — environment-only: without `NEXT_PUBLIC_SITE_ENV` the
local build is production (`Allow: /`) while the test expects `Disallow`; CI sets the variable. (2)
`tap targets ≥ 24px` on `/faqs/` — failed once, passed on immediate rerun (flaky).

## After this change

| Check | Result |
|---|---|
| `npm run typecheck` (incl. tests) | pass, 0 errors |
| `npm run lint` | pass, 0 errors/warnings |
| `npm run build` incl. `check-content` in production mode | pass; 6 published service pages |
| Playwright, desktop + Pixel 7 | **124 passed, 0 failed**, 50 skipped (device-specific duplicates) |

New `tests/e2e/content.spec.ts`: sitemap/llms.txt list only published services (no retired/unpublished/PCC);
primary nav = Services, How It Works, About, FAQs, Contact with `aria-current`; every service page has the
seven section headings + "Official sources — checked …" and a WhatsApp link (incl. floating button) naming
the service; every WhatsApp link on every route is `wa.me/<number>`, text starts "Hello SimplYes", has no
digits/whitespace, `target=_blank`, `rel=noopener`; no `<form>`, file/password inputs, PCC, guarantee
promises, partner claims, customer counts, ratings/testimonials, login/upload/track/pay/coming-soon text,
"OCI renewal" or € amounts; no placeholders on indexable routes (production); zero console errors and
warnings; floating button hidden before the hero threshold and near the final CTA/footer, never overlapping
the footer WhatsApp link or back-to-top at 390px, hidden while the mobile menu is open, after `<main>` and
before the footer in DOM/tab order; under `reducedMotion: reduce` no running animations/transitions > 10 ms
(via `document.getAnimations()`) and Lenis not initialised (verified the check fails without reduced motion:
11 running animations + Lenis).

Not covered locally: `vercel.json` redirects (need a Vercel preview smoke test); real-device iOS Safari /
Android Chrome and 200 % zoom (manual).

## Lighthouse (lab, local)

| Preset | Page | Perf | A11y | BP | SEO | LCP | CLS | TBT | FCP | SI | Weight |
|---|---|---|---|---|---|---|---|---|---|---|---|
| mobile | / | 97 | 100 | 100 | 100 | 0.9 s | 0 | 200 ms | 0.9 s | 1.2 s | Total size was 319 KiB |
| mobile | /services/ | 98 | 100 | 100 | 100 | 0.9 s | 0 | 170 ms | 0.9 s | 0.9 s | Total size was 312 KiB |
| mobile | /services/passport-services/ | 93 | 100 | 100 | 100 | 0.9 s | 0 | 320 ms | 0.9 s | 1.3 s | Total size was 306 KiB |
| mobile | /faqs/ | 98 | 100 | 100 | 100 | 0.9 s | 0 | 160 ms | 0.9 s | 0.9 s | Total size was 304 KiB |
| mobile | /contact/ | 97 | 100 | 100 | 100 | 0.8 s | 0 | 190 ms | 0.8 s | 0.8 s | Total size was 299 KiB |
| desktop | / | 100 | 100 | 100 | 100 | 0.2 s | 0 | 10 ms | 0.2 s | 0.4 s | Total size was 322 KiB |
| desktop | /services/ | 100 | 100 | 100 | 100 | 0.2 s | 0 | 70 ms | 0.2 s | 0.5 s | Total size was 336 KiB |
| desktop | /services/passport-services/ | 100 | 100 | 100 | 100 | 0.2 s | 0 | 60 ms | 0.2 s | 0.5 s | Total size was 306 KiB |
| desktop | /faqs/ | 100 | 100 | 100 | 100 | 0.2 s | 0 | 50 ms | 0.2 s | 0.3 s | Total size was 304 KiB |
| desktop | /contact/ | 100 | 100 | 100 | 100 | 0.2 s | 0 | 30 ms | 0.2 s | 0.4 s | Total size was 299 KiB |

Target is ≥ 95 on all four categories for mobile: **not met for `/services/passport-services/` mobile
performance (93, TBT 320 ms)**. Container CPU throttling varies; re-check in CI. If it persists, the longer
service page (more DOM + reveal targets) is the likely cause.

## Outstanding requirements (launch blockers, not resolved by guessing)

Legal entity / representative / address / register / VAT (B1); hosting and processors, retention,
document-handling practice (B2); legal review incl. RDG for affidavits and UWG for the disclosure (B3, B10);
WhatsApp number confirmation — +49 176 62510556 is from the old site (B4); contact email (B5); exact
sub-services incl. visa scope, corporate offering, minors, submission support (B6); coverage (B7); fee
policy (B8); enquiry owner and response times (B9); DPA for corporate (B11); languages (B12);
simplyes.de hosting/DNS decision (B14).
