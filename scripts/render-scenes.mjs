#!/usr/bin/env node
/**
 * Renders the eight service document compositions to still images (public/images/scenes/), so lists and
 * galleries can show light <img> elements instead of live 3D markup. The source of truth stays the CSS scene
 * system (src/components/scene/); re-run this after changing a composition.
 *
 * Requires a built site served locally:  npm run build && npm run preview   (then, in another shell)
 *   node scripts/render-scenes.mjs        # BASE defaults to http://localhost:4173
 *
 * Output per scene: {key}-{560,840,1120}.{avif,webp} (transparent background).
 */
import { mkdirSync } from "node:fs";
import { chromium } from "@playwright/test";
import sharp from "sharp";

const base = process.env.BASE ?? "http://localhost:4173";
const keys = ["passport", "oci", "attestation", "affidavit", "visa", "family", "student", "corporate"];
const out = "public/images/scenes";
mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2, reducedMotion: "reduce" });
await page.goto(`${base}/#services`, { waitUntil: "networkidle" });
// Transparent backdrop: only the documents and their shadows are captured.
await page.addStyleTag({
  content: `html, body, main, section, .svc-stage-inner { background: transparent !important; box-shadow: none !important; }
            header, .tabbar, .scroll-progress, [data-floating-wa] { display: none !important; }`,
});
const stage = page.locator(".svc-stage .stage");
await stage.scrollIntoViewIfNeeded();

for (const key of keys) {
  await page.evaluate((k) => {
    document.querySelectorAll(".svc-stage .scene").forEach((s) => s.setAttribute("data-active", String(s.getAttribute("data-scene") === k)));
  }, key);
  await page.waitForTimeout(150);
  const png = await stage.screenshot({ omitBackground: true, animations: "disabled" });
  for (const width of [560, 840, 1120]) {
    const img = sharp(png).resize({ width });
    await img.clone().avif({ quality: 55, effort: 6 }).toFile(`${out}/${key}-${width}.avif`);
    await img.clone().webp({ quality: 80, alphaQuality: 90, effort: 6 }).toFile(`${out}/${key}-${width}.webp`);
  }
  const meta = await sharp(png).metadata();
  console.log(`${key}: ${meta.width}×${meta.height}`);
}

await browser.close();
