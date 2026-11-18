#!/usr/bin/env node
/**
 * Renders the Simplyes logo images from the website's own logo markup (<Wordmark>, .wordmark styles), so the logo is
 * identical on the website, the favicon, the app icons and the link preview:
 *
 *   src/app/icon.png          favicon (512 px; browsers scale it)        — "si" on the folder green
 *   src/app/apple-icon.png    iOS home screen (180 px)                    — same
 *   public/icon-192.png, public/icon-512.png   web-app manifest           — same
 *   public/logo.png           full "simplyes." wordmark (Organization logo in structured data)
 *   public/og-image.png       link preview, 1200 × 630
 *
 * Requires a built site served locally:  npm run build && npm run preview   (then, in another shell)
 *   node scripts/render-brand.mjs        # BASE defaults to http://localhost:4173
 */
import { chromium } from "@playwright/test";

const base = process.env.BASE ?? "http://localhost:4173";
// CHROME_PATH: use an already-installed Chromium instead of the one Playwright downloads.
const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.goto(`${base}/`, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);

/** Replaces the page body with one composition (the page's fonts and logo styles stay loaded) and captures it. */
async function render(html, width, height, path, scale = 1) {
  await page.setViewportSize({ width, height });
  await page.evaluate(
    ({ html, width, height }) => {
      document.body.innerHTML = `<div id="brand" style="width:${width}px;height:${height}px;overflow:hidden">${html}</div>`;
      document.body.style.margin = "0";
      document.body.style.background = "transparent";
      document.documentElement.style.background = "transparent";
    },
    { html, width, height },
  );
  await page.evaluate(() => document.fonts.ready);
  await page.locator("#brand").screenshot({ path, omitBackground: true, scale: scale === 1 ? "css" : "device" });
  console.log(`[brand] ${path}`);
}

const logo = (size) =>
  `<span class="wordmark" style="font-size:${size}px;padding:0"><span class="wordmark-si">si</span><span class="wordmark-rest">mplyes.</span></span>`;

/** Square app icon: the logo's "si" on the folder green, as on the site footer. */
const icon = (size) => `
  <div style="width:${size}px;height:${size}px;display:grid;place-items:center;background:#0d2e26;border-radius:${Math.round(size * 0.22)}px">
    <span class="wordmark" style="font-size:${Math.round(size * 0.62)}px;padding:0;margin-top:-${Math.round(size * 0.06)}px">
      <span class="wordmark-si">si</span>
    </span>
  </div>`;

await render(icon(512), 512, 512, "src/app/icon.png");
await render(icon(180), 180, 180, "src/app/apple-icon.png");
await render(icon(192), 192, 192, "public/icon-192.png");
await render(icon(512), 512, 512, "public/icon-512.png");

await render(
  `<div style="width:1200px;height:400px;display:grid;place-items:center;background:#fff">${logo(200)}</div>`,
  1200,
  400,
  "public/logo.png",
);

await render(
  `<div style="width:1200px;height:630px;display:flex;flex-direction:column;justify-content:center;gap:40px;padding:0 96px;box-sizing:border-box;
       background:radial-gradient(55% 70% at 85% 20%, rgb(226 244 230) 0%, rgb(246 249 245) 70%), #f6f9f5">
     ${logo(132)}
     <p style="margin:0;font-family:var(--font-display);font-size:56px;line-height:1.12;letter-spacing:-0.03em;color:#13211d;max-width:960px">
       Indian Passport, Visa &amp; OCI Help in Germany
     </p>
     <p style="margin:0;font-family:var(--font-sans);font-size:26px;color:#3d4c47">
       Document checks · Form filling · Appointment booking · Emergency help
     </p>
   </div>`,
  1200,
  630,
  "public/og-image.png",
);

await browser.close();
