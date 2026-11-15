/** Browser-tab storage keys shared by the service-page problem picker and the enquiry form (sessionStorage only). */

/** Draft of the enquiry form, so Back/forward navigation never loses typed text. Cleared after a successful submit. */
export const DRAFT_KEY = "simplyes-enquiry-draft";

/** Optional "Something else" note typed on a service page, handed to the form without putting it in the URL. */
export const OTHER_NOTE_KEY = "simplyes-other-note";

/** Id of the free-text "Something else" choice, valid for every service. */
export const OTHER_ISSUE = "other";
