#!/usr/bin/env node
/**
 * Placeholder guard (runs in `prebuild`). When NEXT_PUBLIC_SITE_ENV=production,
 * fails the build if any file in src/content contains an unpublished owner
 * placeholder. Legal pages render their own `Missing` markers and stay noindex
 * until reviewed, so they are not part of src/content.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const contentDir = join(root, "src/content");
const patterns = ["[confirm", "[owner", "TODO", "to be provided"];

if (process.env.NEXT_PUBLIC_SITE_ENV !== "production") {
  console.log("[content] Placeholder check skipped (NEXT_PUBLIC_SITE_ENV is not production).");
  process.exit(0);
}

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

const problems = [];
for (const file of walk(contentDir)) {
  readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, i) => {
      // Comments are developer notes, not published copy.
      if (/^\s*(\/\/|\/\*|\*)/.test(line)) return;
      for (const pattern of patterns) {
        if (line.includes(pattern)) {
          problems.push(`${relative(root, file)}:${i + 1}  contains "${pattern}"`);
        }
      }
    });
}

if (problems.length) {
  console.error("[content] Unpublished placeholders found in a production build:\n  " + problems.join("\n  "));
  process.exit(1);
}
console.log("[content] No placeholders in src/content.");
