// Copy for /gallery/events: the card blurb and the category page's intro line.
//
// The frames themselves live in src/app/(site)/gallery/events/page.tsx as
// literal <img> tags, one per photo, so the visual editor can swap any of them
// directly. You can also drop a replacement of the same name into
// public/images/portfolio/events/<event>/ with no code change. Update that
// tag's alt text to match the new photo, and its `frame()` ratio if the shape
// changed.

/** Heads /gallery/events. */
export const EVENTS_BLURB =
  "Award nights, private dinners, panels and galas. I work the room so you get to be in it.";

/** One line on the Events card on /gallery. */
export const EVENTS_CARD_BLURB = "Award nights, dinners, and the rooms between.";
