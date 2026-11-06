#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { validateOwnerSettings } from "./owner-settings.mjs";

try {
  const settings = JSON.parse(readFileSync(new URL("../src/content/owner-settings.json", import.meta.url), "utf8"));
  const missing = validateOwnerSettings(settings);
  console.log(`[owner] Settings valid. ${missing.length ? `${missing.length} business/policy inputs await the owner; legal review stays pending.` : "Business/policy text is populated; approval flags remain owner-controlled."}`);
} catch (error) {
  console.error(`[owner] ${error.message}`);
  process.exitCode = 1;
}
