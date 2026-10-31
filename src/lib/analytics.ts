/**
 * Privacy-respecting event tracking (§18). Events go to GA4 only when a
 * measurement ID is configured AND the visitor has consented — before that
 * gtag is never loaded and every call is a no-op.
 *
 * Never pass personal data (names, emails, phone numbers, message text).
 * Parameters are restricted to the non-personal keys below.
 */

export type AnalyticsEvent =
  | "view_service"
  | "cta_click"
  | "whatsapp_click"
  | "email_click"
  | "form_start"
  | "generate_lead"
  | "form_error";

type Params = Partial<{
  service_name: string;
  cta_label: string;
  page: string;
  location: string;
  placement: string;
  form_id: string;
  service: string;
  preferred_contact: string;
  field: string;
  error_type: string;
}>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: AnalyticsEvent, params: Params = {}): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", event, params);
}

export const CONSENT_KEY = "simplyes-analytics-consent";
export const CONSENT_OPEN_EVENT = "simplyes:open-consent";

export function readConsent(): "granted" | "denied" | null {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export const CONSENT_CHANGE_EVENT = "simplyes:consent-change";

let sessionChoice: "granted" | "denied" | null = null;

export function writeConsent(value: "granted" | "denied"): void {
  sessionChoice = value;
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* storage unavailable: the choice applies to this page view only */
  }
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}

/** useSyncExternalStore adapters for the stored consent choice. */
export function subscribeConsent(callback: () => void): () => void {
  window.addEventListener(CONSENT_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CONSENT_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function consentSnapshot(): "granted" | "denied" | null {
  return readConsent() ?? sessionChoice;
}
