// The copy behind the gallery hub and its three category pages: labels,
// blurbs and hrefs. The photos themselves do not live here any more. Each
// category page (src/app/(site)/gallery/{weddings,engagements,events}/page.tsx)
// and the hub's CategoryCards component now write every <img src="..."> as a
// literal string, so the visual editor can swap any gallery photo in place.
// This file only carries the words around those photos.
//
// Couples was retired here on 2026-07-28 when the gallery split into three
// category pages. Its frames are still in portfolio.ts and still used
// elsewhere on the site; they are just no longer part of the gallery.

import { EVENTS_BLURB, EVENTS_CARD_BLURB } from "@/content/events";

export interface GalleryCategory {
  /** Section anchor, React key, and the last segment of `href`: "events". */
  id: string;
  /** Section heading, set in the serif face. */
  label: string;
  /** One line under the heading on the category page, in Raymond's voice. */
  blurb: string;
  /** Where the hub card links. Its own page, not an anchor on the hub. */
  href: string;
  /** One short line on the card face. Shorter than `blurb`: it sits over a
   *  photo at small type, so a sentence is already too long. */
  cardBlurb: string;
}

/** Heads /gallery/weddings. Also read directly by CategoryCards so the hub
 *  card can quote it without a category lookup. */
export const WEDDINGS_BLURB =
  "The whole day, start to finish. Getting ready, the vows you meant, the last song, and everything in between.";

/** Heads /gallery/engagements. Also read directly by CategoryCards so the hub
 *  card can quote it without a category lookup. */
export const ENGAGEMENTS_BLURB =
  "The nerves before, the question, and the yes. I stay hidden until you have said it.";

export const GALLERY_FEATURE = {
  kicker: "Miranda & Danny",
  line: "Golden hour at the marina.",
};

export const GALLERY: GalleryCategory[] = [
  {
    id: "weddings",
    label: "Weddings",
    blurb: WEDDINGS_BLURB,
    href: "/gallery/weddings",
    cardBlurb: "The whole day, start to finish.",
  },
  {
    id: "engagements",
    label: "Engagements",
    blurb: ENGAGEMENTS_BLURB,
    href: "/gallery/engagements",
    cardBlurb: "The nerves, the question, the yes.",
  },
  {
    id: "events",
    label: "Events",
    blurb: EVENTS_BLURB,
    href: "/gallery/events",
    cardBlurb: EVENTS_CARD_BLURB,
  },
];
