const textGroups = {
  legal: ["legalName", "businessType", "representative", "street", "postalCodeCity", "country", "email", "phone", "vatId", "register", "lastUpdated"],
  privacy: ["mailboxProvider", "enquiryRetention", "conversationRetention"],
  terms: ["paymentMethodsAndTiming", "cancellationAndRefunds", "liability", "complaintsProcedure"],
  policies: ["privacyPolicy", "termsAndConditions", "disclaimer", "impressum"],
  launch: ["deliveryVerifiedAt"],
};
const booleanGroups = {
  legal: ["reviewed"],
  launch: ["brandingApproved", "hostingApproved", "serviceContentApproved", "independenceStatementApproved", "quotationModelApproved", "enquiryDeliveryConfirmed"],
};
const optional = new Set(["legal.vatId", "legal.register", "launch.deliveryVerifiedAt", ...textGroups.policies.map((key) => `policies.${key}`)]);
const isObject = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
const isDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;

export function missingOwnerText(settings) {
  return Object.entries(textGroups).flatMap(([group, keys]) => keys
    .map((key) => `${group}.${key}`)
    .filter((path) => !optional.has(path) && !(group === "terms" && settings.policies?.termsAndConditions?.trim()) && !settings[group]?.[path.split(".")[1]]?.trim()));
}

/** Reject typos, placeholder values and false review/delivery declarations before publishing. */
export function validateOwnerSettings(settings) {
  if (!isObject(settings)) throw new Error("Owner settings must be an object.");
  for (const key of Object.keys(settings)) if (!Object.hasOwn(textGroups, key)) throw new Error(`Unknown owner-settings group: ${key}`);
  for (const [group, keys] of Object.entries(textGroups)) {
    if (!isObject(settings[group])) throw new Error(`Missing owner-settings group: ${group}`);
    const allowed = new Set([...keys, ...(booleanGroups[group] ?? [])]);
    for (const key of Object.keys(settings[group])) if (!allowed.has(key)) throw new Error(`Unknown owner-settings field: ${group}.${key}`);
    for (const key of keys) {
      const value = settings[group][key];
      if (value !== null && typeof value !== "string") throw new Error(`${group}.${key} must be text or null.`);
      if (typeof value === "string" && (!value.trim() || /\[confirm|\[owner|to be provided|^TODO\b/i.test(value))) {
        throw new Error(`${group}.${key} must contain approved text; leave unknown values null.`);
      }
    }
    for (const key of booleanGroups[group] ?? []) {
      if (typeof settings[group][key] !== "boolean") throw new Error(`${group}.${key} must be true or false.`);
    }
  }
  if (!isDate(settings.legal.lastUpdated)) throw new Error("legal.lastUpdated must use a real YYYY-MM-DD date.");
  if (settings.launch.deliveryVerifiedAt !== null && !isDate(settings.launch.deliveryVerifiedAt)) throw new Error("launch.deliveryVerifiedAt must use a real YYYY-MM-DD date.");
  if (settings.legal.email !== null && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.legal.email)) throw new Error("legal.email must be a valid email address.");
  const missing = missingOwnerText(settings);
  if (settings.legal.reviewed && missing.length) throw new Error(`Legal review cannot be marked complete with missing fields: ${missing.join(", ")}`);
  if (settings.launch.enquiryDeliveryConfirmed && !settings.launch.deliveryVerifiedAt) throw new Error("Record the actual inbox test date before confirming delivery.");
  return missing;
}

export function launchProblems(settings) {
  const missing = validateOwnerSettings(settings);
  return [
    ...missing,
    ...(!settings.legal.reviewed ? ["legal.reviewed (owner/adviser approval)"] : []),
    ...booleanGroups.launch.filter((key) => !settings.launch[key]).map((key) => `launch.${key}`),
  ];
}

export function contactActivationProblems(status, html) {
  if (status < 200 || status >= 300) return [`production Contact page returned HTTP ${status}`];
  if (!/<form\b[^>]*\bid=["']enquiry["']/i.test(html)) return ["production Contact page does not contain the enquiry form"];
  if (html.includes("The online form is being connected")) return ["production enquiry endpoint is not configured"];
  return [];
}
