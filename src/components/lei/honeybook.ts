/* HoneyBook inquiry-form embed configuration.
 *
 * TO ACTIVATE THE FORM:
 *   1. In HoneyBook go to Tools → Contact Form (or Booking widget) → "Embed on
 *      your website". HoneyBook gives you a snippet containing a div like
 *      <div class="hb-p-XXXXXXXXXXXX-2"></div>.
 *   2. Copy the id between "hb-p-" and "-2" (the XXXX… part).
 *   3. Paste it as HONEYBOOK_PLACEMENT_ID below, replacing "REPLACE_ME".
 * Until you do, the page shows a tasteful placeholder card with your email so
 * the section is never broken or empty. */
export const HONEYBOOK_PLACEMENT_ID = "REPLACE_ME";

/** True once a real placement id has been set (not blank, not the default). */
export function isConfigured(id: string): boolean {
  return id.trim().length > 0 && id !== "REPLACE_ME";
}
