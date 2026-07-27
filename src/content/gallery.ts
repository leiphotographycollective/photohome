// Category photo lists for /gallery.
//
// This is the swap surface for the gallery grids: adding a photo is one line
// in the right `photos` array. The page decides column count from how many
// photos a list has, so a grid grows from one frame to a full four-column
// masonry with no code change.
//
// Weddings is the one category with `sets`: it holds three separate weddings,
// and each renders as its own labelled grid so the page reads as three days
// rather than one long undifferentiated dump. Couples and Engagements have no
// sets and render exactly as before.

import {
  MIRANDA_DANNY_PHOTOS,
  PHOTOS,
  pick,
  SARGON_ODELYA_SELECT,
  TRANG_PHOTOS,
  type Photo,
} from "@/content/portfolio";

/** One wedding inside a category: its own heading, its own grid. */
export interface GallerySet {
  /** Anchor and React key: /gallery#miranda-danny */
  id: string;
  /** Rendered above the set's grid, in the serif face. */
  name: string;
  photos: Photo[];
}

export interface GalleryCategory {
  /** Section anchor and React key: /gallery#engagements */
  id: string;
  /** Section heading, set in the serif face. */
  label: string;
  /** One line under the heading, in Raymond's voice. */
  blurb: string;
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
    sets: WEDDING_SETS,
    photos: fromSets(WEDDING_SETS),
  },
  {
    id: "couples",
    label: "Couples",
    blurb:
      "An hour or two with just the two of you. We walk, you talk, I stay out of the way.",
    photos: [PHOTOS.coastalCandid, PHOTOS.coastal, PHOTOS.coastKiss],
  },
  {
    id: "engagements",
    label: "Engagements",
    blurb:
      "The nerves before, the question, and the yes. I stay hidden until you have said it.",
    photos: [PHOTOS.proposal],
  },
];
