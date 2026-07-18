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
  "Bay Area wedding photography for couples who want to be present in their wedding, not stressed about it.";

/** Optimized frame for the split hero, every platform (LCP-critical).
 *  Also the first frame of HERO_PHOTOS below — keep the two in sync. */
export const HERO_PHOTO: Photo = {
  path: "/images/hero-mobile.jpg",
  a: "Bride's veil catching the light at golden hour",
  r: "p",
};

/** The hero fades and rotates through these frames (~4s each).
 *  The FIRST frame is the LCP image: it loads first and is the only frame
 *  present at first paint, so keep it a local, already-sized file identical
 *  to HERO_PHOTO. The rest are progressive enhancement — they mount after the
 *  first paint and only cross-fade when the visitor allows motion. Swap or add
 *  frames freely (one line each); the slideshow renders whatever's listed.
 *  Prefer portrait frames that don't already appear elsewhere on the homepage. */
export const HERO_PHOTOS: Photo[] = [
  HERO_PHOTO, // veil at golden hour — the LCP frame (local, loads first)
  PHOTOS.danceLift, // groom lifting the bride during their first dance
  PHOTOS.coastKiss, // coastal kiss, black and white
];

export interface Testimonial {
  pull: string; // the italic serif pull-quote line
  quote: string; // the rest of the quote, rendered as body text
  names: string; // e.g. "Sargon & Odelya"
  context?: string; // e.g. "Wedding · Bay Area"
  photo: Photo; // portrait rendered beside the quote
}

/** Real client quotes only — never placeholder text. */
export const TESTIMONIALS: Testimonial[] = [
  {
    pull:
      "He took the time to understand which shots were critical to our culture, and didn’t miss a single beat.",
    quote:
      "We had a traditional Middle Eastern wedding, and we were so impressed by how quickly Raymond got up to speed on our specific traditions. His organization and talent far exceed his years, really top-tier. He met with us for an engagement shoot to understand our energy and post-production preferences, and on the big day he was a total pro, complete with a full itinerary and backup equipment. He worked seamlessly with our videographer, and his artistic touch resulted in an excellent final gallery. We absolutely loved the photos and can’t wait to book our anniversary shoot with him!",
    names: "Sargon & Odelya",
    context: "Wedding · Bay Area, CA",
    photo: SARGON_ODELYA_PHOTOS[23], // first dance in fog, black & white — unused elsewhere on the homepage
  },
];

export interface Door {
  cat: string; // key into CATEGORIES → /portfolio/<cat>
  label: string;
  tagline: string;
  photo: Photo;
}

/** The Collection — four category doors (routing, not browsing). */
export const DOORS: Door[] = [
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
    href: "/weddings", // the /portfolio/weddings/* galleries were removed; point at the weddings page
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
  // Fulls are natively landscape; pairs natively portrait. No photo here may
  // appear anywhere else on the homepage (hero, manifesto, who-I-photograph…).
  { layout: "full", photos: [SARGON_ODELYA_PHOTOS[33]] }, // bridal details flat lay — heels, perfume, jewelry
  { layout: "full", photos: [SARGON_ODELYA_PHOTOS[13]] }, // touching the groom's face at golden hour
  { layout: "pair", photos: [SARGON_ODELYA_PHOTOS[9], SARGON_ODELYA_PHOTOS[27]] }, // seated bridal portrait · dip kiss (SO[8] is the hero frame, don't reuse)
  { layout: "full", photos: [SARGON_ODELYA_PHOTOS[25]] }, // carried through the cheering crowd
  { layout: "pair", photos: [SARGON_ODELYA_PHOTOS[2], SARGON_ODELYA_PHOTOS[0]] }, // bride & mother b&w · ring box
  { layout: "full", photos: [SARGON_ODELYA_PHOTOS[34]] }, // bride & bridesmaids toast while getting ready
  { layout: "full", photos: [SARGON_ODELYA_PHOTOS[29]] }, // embracing on the dance floor
  { layout: "pair", photos: [SARGON_ODELYA_PHOTOS[28], SARGON_ODELYA_PHOTOS[22]] }, // mid-twirl · champagne spray
  { layout: "full", photos: [SARGON_ODELYA_PHOTOS[35]] }, // bride laughing with bridesmaids, champagne toast
  { layout: "pair", photos: [SARGON_ODELYA_PHOTOS[18], SARGON_ODELYA_PHOTOS[7]] }, // veil sunset · staircase aerial
  { layout: "pair", photos: [SARGON_ODELYA_PHOTOS[36], SARGON_ODELYA_PHOTOS[11]] }, // first dance lift · veil portrait b&w
  { layout: "full", photos: [PHOTOS.sargonPrep] }, // first dance in low fog
];
