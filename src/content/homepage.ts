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

/** SEO anchor — must appear in hero kickers, page titles, and footer. */
export const CITY = "San Francisco Bay Area";

/** The site-wide positioning line (cover-story angle) and support line.
 *  Later pages (pricing, about, FAQ) import these — never retype them. */
export const POSITIONING = "Your wedding, shot like the cover story it is.";
export const POSITIONING_SUB =
  "Bay Area wedding photographer for couples who bring the style and the party.";

/** Track B soft CTA for early planners — points at the live /free-session
 *  capture page until the Planning Guide funnel ships (then only the href
 *  changes; every placement updates automatically). */
export const SECONDARY_CTA_LABEL =
  "Just started planning? Claim a free engagement session";
export const SECONDARY_CTA_HREF = "/free-session";

/** Optimized full-bleed frame for the static mobile hero (LCP-critical). */
export const HERO_MOBILE: Photo = {
  path: "/images/hero-mobile.jpg",
  a: "Bride's veil catching the light at golden hour",
  r: "p",
};

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

export interface PortfolioRow {
  layout: "full" | "pair";
  photos: Photo[]; // 1 photo for "full", 2 for "pair"
}

/** The homepage wedding gallery — the page's centerpiece. Seeded with the
 *  strongest existing selects; Raymond swaps rows as new selects arrive.
 *  Swapping a photo is a one-line edit; the section renders whatever's here. */
export const WEDDING_PORTFOLIO: PortfolioRow[] = [
  { layout: "full", photos: [PHOTOS.receptionEntrance] },
  { layout: "pair", photos: [SARGON_ODELYA_PHOTOS[8], SARGON_ODELYA_PHOTOS[27]] },
  { layout: "full", photos: [PHOTOS.danceLift] },
  { layout: "pair", photos: [SARGON_ODELYA_PHOTOS[2], PHOTOS.ringsEmbrace] },
  { layout: "full", photos: [PHOTOS.firstDance04] },
  { layout: "pair", photos: [SARGON_ODELYA_PHOTOS[28], PHOTOS.shoulderDance] },
  { layout: "pair", photos: [SARGON_ODELYA_PHOTOS[18], PHOTOS.firstDanceClouds] },
  { layout: "full", photos: [PHOTOS.sargonPrep] },
];
