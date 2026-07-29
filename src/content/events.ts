// The event portfolio behind /gallery/events.
//
// Every frame here is a placeholder. Each one is a uniquely named .jpg at the
// path this file already points at, so swapping in a real photo is a drag and
// drop over the same filename with no code change. Regenerate or extend the
// set with: node scripts/make-event-placeholders.mjs
//
// One line per frame below, each with its own `a`, `r` and `ratio` — every
// value here is independently editable, not shared or derived. Three things
// to update when the real frames land:
//   1. `name` on each set, and the ids to match. "Event One" is a deliberate
//      placeholder so it cannot ship unnoticed.
//   2. `a` (alt text) on every frame, which is what screen readers announce
//      and what the gallery test checks for emptiness, not accuracy.
//   3. `r` and `ratio` on any frame whose real photo has a different shape.
// `ratio` only reserves height before the file decodes, so a stale value
// after a swap costs a small reflow, never a squashed photo.

import type { GallerySet } from "@/content/gallery";
import type { Photo } from "@/content/portfolio";

export const EVENT_SETS: GallerySet[] = [
  {
    id: "event-one",
    name: "Event One",
    photos: [
      { path: "/images/portfolio/events/event-one/event-one-1.jpg", a: "Placeholder frame 1 for Event One", r: "l", ratio: 1.5 },
      { path: "/images/portfolio/events/event-one/event-one-2.jpg", a: "Placeholder frame 2 for Event One", r: "p", ratio: 0.6667 },
      { path: "/images/portfolio/events/event-one/event-one-3.jpg", a: "Placeholder frame 3 for Event One", r: "p", ratio: 0.6667 },
      { path: "/images/portfolio/events/event-one/event-one-4.jpg", a: "Placeholder frame 4 for Event One", r: "l", ratio: 1.5 },
      { path: "/images/portfolio/events/event-one/event-one-5.jpg", a: "Placeholder frame 5 for Event One", r: "p", ratio: 0.6667 },
      { path: "/images/portfolio/events/event-one/event-one-6.jpg", a: "Placeholder frame 6 for Event One", r: "l", ratio: 1.5 },
    ],
  },
  {
    id: "event-two",
    name: "Event Two",
    photos: [
      { path: "/images/portfolio/events/event-two/event-two-1.jpg", a: "Placeholder frame 1 for Event Two", r: "l", ratio: 1.5 },
      { path: "/images/portfolio/events/event-two/event-two-2.jpg", a: "Placeholder frame 2 for Event Two", r: "p", ratio: 0.6667 },
      { path: "/images/portfolio/events/event-two/event-two-3.jpg", a: "Placeholder frame 3 for Event Two", r: "p", ratio: 0.6667 },
      { path: "/images/portfolio/events/event-two/event-two-4.jpg", a: "Placeholder frame 4 for Event Two", r: "l", ratio: 1.5 },
      { path: "/images/portfolio/events/event-two/event-two-5.jpg", a: "Placeholder frame 5 for Event Two", r: "p", ratio: 0.6667 },
      { path: "/images/portfolio/events/event-two/event-two-6.jpg", a: "Placeholder frame 6 for Event Two", r: "l", ratio: 1.5 },
    ],
  },
  {
    id: "event-three",
    name: "Event Three",
    photos: [
      { path: "/images/portfolio/events/event-three/event-three-1.jpg", a: "Placeholder frame 1 for Event Three", r: "l", ratio: 1.5 },
      { path: "/images/portfolio/events/event-three/event-three-2.jpg", a: "Placeholder frame 2 for Event Three", r: "p", ratio: 0.6667 },
      { path: "/images/portfolio/events/event-three/event-three-3.jpg", a: "Placeholder frame 3 for Event Three", r: "p", ratio: 0.6667 },
      { path: "/images/portfolio/events/event-three/event-three-4.jpg", a: "Placeholder frame 4 for Event Three", r: "l", ratio: 1.5 },
      { path: "/images/portfolio/events/event-three/event-three-5.jpg", a: "Placeholder frame 5 for Event Three", r: "p", ratio: 0.6667 },
      { path: "/images/portfolio/events/event-three/event-three-6.jpg", a: "Placeholder frame 6 for Event Three", r: "l", ratio: 1.5 },
    ],
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
