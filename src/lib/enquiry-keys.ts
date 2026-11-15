/** Browser-tab storage keys shared by the service-page problem picker and the enquiry form (sessionStorage only). */

/** Draft of the enquiry form, so Back/forward navigation never loses typed text. Cleared after a successful submit. */
export const DRAFT_KEY = "simplyes-enquiry-draft";

/** Optional "Something else" note typed on a service page, handed to the form without putting it in the URL. */
export const OTHER_NOTE_KEY = "simplyes-other-note";

/** Id of the free-text "Something else" choice, valid for every service. */
export const OTHER_ISSUE = "other";

/** Prefix of the per-service problem choice saved by the service-page picker. */
export const SELECTION_PREFIX = "simplyes-selection-";

/**
 * How long an unsent draft is kept in this tab. Each save restarts the clock, so normal Back/forward use is
 * unaffected, but a forgotten tab on a shared computer does not keep a visitor's name, email or description.
 */
export const DRAFT_TTL_MS = 30 * 60 * 1000;

/** Read a sessionStorage entry written by `writeStored`; expired or malformed entries are deleted. */
export function readStored<T>(key: string, now = Date.now()): T | null {
  try {
    const raw = window.sessionStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { savedAt?: unknown; data?: unknown } | null;
    if (!parsed || typeof parsed.savedAt !== "number" || now - parsed.savedAt > DRAFT_TTL_MS || parsed.savedAt > now + 60_000) {
      window.sessionStorage.removeItem(key);
      return null;
    }
    return (parsed.data ?? null) as T | null;
  } catch {
    return null;
  }
}

/** Save a value in this tab's sessionStorage with a timestamp (never localStorage, never a cookie). */
export function writeStored(key: string, data: unknown): void {
  try {
    window.sessionStorage.setItem(key, JSON.stringify({ savedAt: Date.now(), data }));
  } catch {
    /* storage unavailable: nothing to restore later */
  }
}

/** Remove every enquiry-related entry from this tab once an enquiry has been accepted. */
export function clearEnquiryStorage(): void {
  try {
    const store = window.sessionStorage;
    store.removeItem(DRAFT_KEY);
    store.removeItem(OTHER_NOTE_KEY);
    for (const key of Object.keys(store)) if (key.startsWith(SELECTION_PREFIX)) store.removeItem(key);
  } catch {
    /* storage unavailable */
  }
}
