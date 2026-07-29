// Copy for /gallery/events: the card blurb and the category page's intro line.
//
// The 18 placeholder frames that used to live here moved to
// src/app/(site)/gallery/events/page.tsx as literal <img> tags, one per
// frame, so the visual editor can swap any of them directly. To put a real
// photo in, drop a file of the same name into
// public/images/portfolio/events/<event>/ (or replace
// events-card-cover.jpg for the hub card), no code change required. Update
// that tag's alt text once the placeholder is gone, and its `frame()` ratio
// if the real photo is a different shape.

/** Heads /gallery/events. */
export const EVENTS_BLURB =
  "Galas, mixers, award nights. I work the room so you get to be in it.";

/** One line on the Events card on /gallery. */
export const EVENTS_CARD_BLURB = "Galas, panels, and the parties after.";
