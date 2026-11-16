# November 2026 redesign

Implements the owners' "Simplyes Website Redesign" (home page and the Passport Services page template),
applied to every page.

## What changed

- **Brand:** "Simplyes", lower-case "simplyes." wordmark, tagline "Built to simplify what matters most."
- **Urgent bar** above the header on every page (WhatsApp, start with URGENT).
- **Navigation:** Services ▾ · Appointments · Emergency help · How It Works · Guides · FAQs · Contact ·
  Get Assistance. The full navigation shows from 1280px; below that, the menu and bottom tab bar.
- **Six services** (`src/content/services.ts`), page copy in `src/content/service-pages.ts`:
  Passport Services · e-OCI Services · Attestation & Affidavits · Visa Services · Family Documentation ·
  Student Services. URLs are unchanged, so existing rankings carry over. Retired pages redirect (vercel.json):
  `/services/affidavits-declarations/` → Attestation & Affidavits, `/services/corporate-services/` → the
  corporate enquiry form. PCC is now part of the published scope, as in the redesign.
- **New pages:** `/appointments/`, `/emergency-help/`, `/guides/` + six guide pages (`src/content/guides.ts`),
  `/missions/` + one page per Indian mission (`src/content/missions.ts`).
- The WebGL hero and 3D document scenes are gone from the home and service pages (the redesign is flat).

## Videos: paste the YouTube ids

`src/content/videos.ts` lists the five channel videos. Each has `youtubeId: null` because YouTube could not be
reached from the build environment. Paste the 11-character id from each video's link
(`youtube.com/watch?v=<id>`). Until then the players open the channel. Once an id is set:

- the player embeds the video from youtube-nocookie.com, only after the visitor presses play;
- `VideoObject` structured data is published for it (Google video results).

The CSP in `vercel.json` already allows `www.youtube-nocookie.com` frames and `i.ytimg.com` images.

## SEO / GEO for the Embassy and Consulate searches

Searches such as "consulate general of india frankfurt" and "embassy of india berlin" are targeted by
dedicated pages: `/missions/consulate-general-of-india-frankfurt/` and `/missions/embassy-of-india-berlin/`
(plus Munich and Hamburg). Each has the mission name in the title, H1, URL and description, the states it
serves, FAQs (FAQPage data), `geo.*` meta tags, WebPage + Service structured data `about` the mission, and is
linked from every page through the mission chips. `llms.txt` lists the missions for AI answer engines.

Each page states clearly that Simplyes is independent and links the mission's official website. The official
sites will normally rank first for the mission's own name; these pages aim for the next positions and for
the longer searches ("… passport renewal", "… appointment", "… OCI").

Next steps outside the code: verify the site in Google Search Console and submit `sitemap.xml`; create a
Google Business Profile for Simplyes (not for the missions); link the site from the YouTube channel and
video descriptions.
