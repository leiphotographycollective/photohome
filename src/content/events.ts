// Copy for /gallery/events and its four event pages: the card blurbs, each
// page's intro blurb, and the index's intro line.
//
// The frames themselves live in each event's own page, under
// src/app/(site)/gallery/events/<slug>/page.tsx, as literal <img> tags, one
// per photo, so the visual editor can swap any of them directly. You can also
// drop a replacement of the same name into
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
    blurb:
      "Flora.AI booked me for a private company dinner in the wine cellar at Lazy Bear, one long table for the whole team.",
  },
  {
    id: "airaea",
    name: "Airaea",
    href: "/gallery/events/airaea",
    cardBlurb: "A room learning something, and the person teaching it.",
    blurb:
      "Airaea brought me in for a leadership workshop, a speaker at the front and a room taking notes.",
  },
  {
    id: "sjsu-pd-emmys",
    name: "SJSU PD Emmys",
    href: "/gallery/events/sjsu-pd-emmys",
    cardBlurb: "Statuettes, speeches, and the people holding them.",
    blurb:
      "The San Jose State University Police Department hired me for their Emmy awards night, and I shot the statuettes, the speeches and the room in between.",
  },
  {
    id: "other",
    name: "Other",
    href: "/gallery/events/other",
    cardBlurb: "Galas, panels, and the nights that need no label.",
    blurb:
      "Two smaller nights that did not need a section of their own: a mansion evening and an Assyrian Advisors panel.",
  },
] as const;
