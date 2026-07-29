// The event portfolio behind /gallery/events.
//
// Every frame here is a placeholder. Each one is a uniquely named .jpg at the
// path this file already points at, so swapping in a real photo is a drag and
// drop over the same filename with no code change. Regenerate or extend the
// set with: node scripts/make-event-placeholders.mjs
//
// Two things to update when the real frames land:
//   1. `name` on each set, and the ids to match. "Event One" is a deliberate
//      placeholder so it cannot ship unnoticed.
//   2. `a` (alt text) on every frame, which is what screen readers announce
//      and what the gallery test checks for emptiness, not accuracy.
// `ratio` only reserves height before the file decodes, so a stale value
// after a swap costs a small reflow, never a squashed photo.

import type { GallerySet } from "@/content/gallery";
import type { Photo } from "@/content/portfolio";

/** Portrait 2:3 and landscape 3:2, alternating, so the scaffolded masonry has
 *  the rhythm a real one would. Mirrors ORIENTATIONS in the generator script. */
const SHAPES: Array<Pick<Photo, "r" | "ratio">> = [
  { r: "l", ratio: 1.5 },
  { r: "p", ratio: 0.6667 },
  { r: "p", ratio: 0.6667 },
  { r: "l", ratio: 1.5 },
  { r: "p", ratio: 0.6667 },
  { r: "l", ratio: 1.5 },
];

/** Six numbered slots for one event, all pointing at generated placeholders. */
function slots(group: string, eventName: string): Photo[] {
  return SHAPES.map((shape, i) => ({
    path: `/images/portfolio/events/${group}/${group}-${i + 1}.jpg`,
    a: `Placeholder frame ${i + 1} for ${eventName}`,
    ...shape,
  }));
}

export const EVENT_SETS: GallerySet[] = [
  { id: "event-one", name: "Event One", photos: slots("event-one", "Event One") },
  { id: "event-two", name: "Event Two", photos: slots("event-two", "Event Two") },
  {
    id: "event-three",
    name: "Event Three",
    photos: slots("event-three", "Event Three"),
  },
];

/** The frame on the Events card on /gallery. */
export const EVENTS_CARD_COVER: Photo = {
  path: "/images/portfolio/events/events-card-cover.jpg",
  a: "Placeholder cover frame for the events gallery",
  r: "p",
  ratio: 0.6667,
};

/** Heads /gallery/events. */
export const EVENTS_BLURB =
  "Galas, mixers, award nights. I work the room so you get to be in it.";

/** One line on the Events card on /gallery. */
export const EVENTS_CARD_BLURB = "Galas, panels, and the parties after.";
