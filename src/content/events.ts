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

/** The four events behind /gallery/events, in page order. "Other" is last:
 *  it is the catch-all for shoots too small to carry a section of their own. */
export const EVENTS = [
  {
    id: "flora-ai",
    name: "Flora.AI",
    href: "/gallery/events/flora-ai",
    cardBlurb: "A long table, a wine cellar, one evening.",
  },
  {
    id: "airaea",
    name: "Airaea",
    href: "/gallery/events/airaea",
    cardBlurb: "A room learning something, and the person teaching it.",
  },
  {
    id: "sjsu-pd-emmys",
    name: "SJSU PD Emmys",
    href: "/gallery/events/sjsu-pd-emmys",
    cardBlurb: "Statuettes, speeches, and the people holding them.",
  },
  {
    id: "other",
    name: "Other",
    href: "/gallery/events/other",
    cardBlurb: "Galas, panels, and the nights that need no label.",
  },
] as const;
