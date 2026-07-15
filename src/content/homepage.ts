// Homepage conversion content — every deferred-content slot here is
// data-driven: an empty array means the block does not render, so
// placeholder text can never leak to production (see the design spec).

import {
  PHOTOS,
  SARGON_ODELYA_PHOTOS,
  type Photo,
} from "@/content/portfolio";

/** The one conversion CTA, everywhere: gold pill → HoneyBook form. */
export const CTA_LABEL = "Check my availability";
export const CTA_HREF = "/inquire#form";

export interface Testimonial {
  quote: string;
  names: string; // e.g. "Sargon & Odelya"
  context?: string; // e.g. "Wedding · Bay Area"
}

/** Real client quotes only — Raymond supplies these; empty until then. */
export const TESTIMONIALS: Testimonial[] = [];

export interface Door {
  cat: string; // key into CATEGORIES → /portfolio/<cat>
  label: string;
  tagline: string;
  photo: Photo;
}

/** The Collection — four category doors (routing, not browsing). */
export const DOORS: Door[] = [
  { cat: "weddings", label: "Weddings", tagline: "The full arc of the day", photo: SARGON_ODELYA_PHOTOS[16] },
  { cat: "couples", label: "Couples", tagline: "The two of you, as you really are", photo: PHOTOS.coastalCandid },
  { cat: "engagements", label: "Engagements", tagline: "The moment before everything changes", photo: PHOTOS.proposal },
  { cat: "events", label: "Events", tagline: "The room, as it really felt", photo: PHOTOS.eventAssyrian },
];

export interface RecentWedding {
  title: string;
  place: string;
  year: string;
  href: string;
  cover: Photo;
  frames: Photo[]; // 1-3 supporting teaser frames
}

/** Proof of consistency — grows to 3 weddings as Raymond sends selects. */
export const RECENT_WEDDINGS: RecentWedding[] = [
  {
    title: "Sargon & Odelya",
    place: "Bay Area, CA",
    year: "2025",
    href: "/portfolio/weddings/sargon-odelya",
    cover: SARGON_ODELYA_PHOTOS[13], // touching the groom's face at golden hour
    frames: [
      SARGON_ODELYA_PHOTOS[8], // veil at golden hour
      SARGON_ODELYA_PHOTOS[23], // first dance, black and white
    ],
  },
];
