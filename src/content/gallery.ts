// Category photo lists for /gallery.
//
// This is the swap surface for the gallery grids: adding a photo is one line
// in the right `photos` array. The page decides column count from how many
// photos a list has, so a grid grows from one frame to a full four-column
// masonry with no code change.
//
// Weddings and Events both use `sets`: each holds several separate shoots, and
// each set renders as its own labelled grid so the page reads as several days
// rather than one long undifferentiated dump. Engagements has no sets and
// renders as a single grid.
//
// Couples was retired here on 2026-07-28 when the gallery split into three
// category pages. Its frames are still in portfolio.ts and still used
// elsewhere on the site; they are just no longer part of the gallery.

import {
  MIRANDA_DANNY_PHOTOS,
  PHOTOS,
  pick,
  SARGON_ODELYA_SELECT,
  TRANG_PHOTOS,
  type Photo,
} from "@/content/portfolio";
import {
  EVENTS_BLURB,
  EVENTS_CARD_BLURB,
  EVENTS_CARD_COVER,
  EVENT_SETS,
} from "@/content/events";

/** One wedding inside a category: its own heading, its own grid. */
export interface GallerySet {
  /** Anchor and React key: /gallery#miranda-danny */
  id: string;
  /** Rendered above the set's grid, in the serif face. */
  name: string;
  photos: Photo[];
}

export interface GalleryCategory {
  /** Section anchor, React key, and the last segment of `href`: "events". */
  id: string;
  /** Section heading, set in the serif face. */
  label: string;
  /** One line under the heading on the category page, in Raymond's voice. */
  blurb: string;
  /** Where the hub card links. Its own page, not an anchor on the hub. */
  href: string;
  /** The frame on the hub card. Kept distinct from the hero and the feature
   *  so no frame appears twice on one journey. */
  cover: Photo;
  /** One short line on the card face. Shorter than `blurb`: it sits over a
   *  photo at small type, so a sentence is already too long. */
  cardBlurb: string;
  /** When present, the page renders one labelled grid per set instead of a
   *  single grid. `photos` still holds every frame, flattened. */
  sets?: GallerySet[];
  /** Rendered in order, top to bottom of the masonry. */
  photos: Photo[];
}

/** Sets carry the frames; the category's flat `photos` is derived from them so
 *  the two can never drift apart. */
function fromSets(sets: GallerySet[]): GalleryCategory["photos"] {
  return sets.flatMap((s) => s.photos);
}

/** Drop the frames a page renders on their own, so nothing appears twice. */
function without(photos: Photo[], ...omit: Photo[]): Photo[] {
  return photos.filter((p) => !omit.some((o) => o.path === p.path));
}

/** The two standalone images on /gallery, kept out of the grids below so no
 *  frame appears twice on the page. */
export const GALLERY_HERO: Photo = pick(
  SARGON_ODELYA_SELECT,
  "so-select-636.jpg"
);
export const GALLERY_FEATURE = {
  // Subject sits right of centre, which keeps it clear of the caption in the
  // bottom-left corner of the full-bleed frame.
  photo: pick(MIRANDA_DANNY_PHOTOS, "miranda-danny-14.jpg"),
  kicker: "Miranda & Danny",
  line: "Golden hour at the marina.",
};

const WEDDING_SETS: GallerySet[] = [
  {
    id: "sargon-odelya",
    name: "Sargon & Odelya",
    photos: without(SARGON_ODELYA_SELECT, GALLERY_HERO),
  },
  {
    id: "miranda-danny",
    name: "Miranda & Danny",
    photos: without(MIRANDA_DANNY_PHOTOS, GALLERY_FEATURE.photo),
  },
  {
    id: "trang",
    name: "Trang",
    // trang-02 is the colour edit of trang-03 and lives on the homepage. Two
    // edits of one frame in the same grid would read as a mistake.
    photos: without(TRANG_PHOTOS, pick(TRANG_PHOTOS, "trang-02.jpg")),
  },
];

export const GALLERY: GalleryCategory[] = [
  {
    id: "weddings",
    label: "Weddings",
    blurb:
      "The whole day, start to finish. Getting ready, the vows you meant, the last song, and everything in between.",
    href: "/gallery/weddings",
    // The cathedral veil frame. Not the hero (so-select-636) and not the
    // feature (miranda-danny-14), so nothing repeats on one journey.
    cover: pick(SARGON_ODELYA_SELECT, "so-select-300.jpg"),
    cardBlurb: "The whole day, start to finish.",
    sets: WEDDING_SETS,
    photos: fromSets(WEDDING_SETS),
  },
  {
    id: "engagements",
    label: "Engagements",
    blurb:
      "The nerves before, the question, and the yes. I stay hidden until you have said it.",
    href: "/gallery/engagements",
    // The one engagement frame there is, so it is both the cover and the
    // grid. Accepted until there are more; see the 2026-07-28 spec.
    cover: PHOTOS.proposal,
    cardBlurb: "The nerves, the question, the yes.",
    photos: [PHOTOS.proposal],
  },
  {
    id: "events",
    label: "Events",
    blurb: EVENTS_BLURB,
    href: "/gallery/events",
    cover: EVENTS_CARD_COVER,
    cardBlurb: EVENTS_CARD_BLURB,
    sets: EVENT_SETS,
    photos: fromSets(EVENT_SETS),
  },
];
