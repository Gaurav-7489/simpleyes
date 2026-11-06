#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { contactActivationProblems, launchProblems } from "./owner-settings.mjs";

try {
  const settings = JSON.parse(readFileSync(new URL("../src/content/owner-settings.json", import.meta.url), "utf8"));
  const pending = launchProblems(settings);
  if (process.argv.includes("--live")) {
    const response = await fetch("https://simplyes.de/contact/", { signal: AbortSignal.timeout(20_000), redirect: "error" });
    pending.push(...contactActivationProblems(response.status, await response.text()));
  }
  if (pending.length) {
    console.log(`Owner activation is pending (${pending.length} items):\n${pending.map((item) => `- ${item}`).join("\n")}`);
    process.exitCode = 1;
  } else {
    console.log(process.argv.includes("--live")
      ? "Recorded owner inputs and approvals are complete; the production Contact page is reachable."
      : "Recorded owner inputs and approvals are complete; the production Contact page was not checked.");
    console.log("Delivery and legal approval are owner attestations. This check does not read the inbox or certify legal compliance.");
  }
} catch (error) {
  console.error(`Launch readiness could not be checked: ${error.message}`);
  process.exitCode = 1;
}
