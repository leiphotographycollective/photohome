// Homepage conversion content — every deferred-content slot here is
// data-driven: an empty array means the block does not render, so
// placeholder text can never leak to production (see the design spec).

import {
  MIRANDA_DANNY_PHOTOS,
  PHOTOS,
  pick,
  SARGON_ODELYA_PHOTOS,
  SARGON_ODELYA_SELECT,
  TRANG_PHOTOS,
  type Photo,
} from "@/content/portfolio";

/** Shorthands for the three wedding sets the homepage draws from. */
const so = (file: string) => pick(SARGON_ODELYA_SELECT, file);
const md = (file: string) => pick(MIRANDA_DANNY_PHOTOS, file);
const tr = (file: string) => pick(TRANG_PHOTOS, file);

/** The one conversion CTA, everywhere: gold pill → HoneyBook form. */
export const CTA_LABEL = "Check my date";
export const CTA_HREF = "/inquire#form";

/** SEO place name. San Jose is home; San Francisco is a travel area, not the lead. */
export const CITY = "San Jose";

/** The site-wide positioning line (cover-story angle) and support line.
 *  Later pages (pricing, about, FAQ) import these — never retype them. */
export const POSITIONING = "Your wedding, shot like the cover story it is.";
export const POSITIONING_SUB =
  "San Jose and South Bay wedding photography for couples who want to be present in their wedding, not stressed about it.";

/** Homepage H1. The old lockup stays on the page as TAGLINE, under this. */
export const HOME_H1 = "Editorial, romantic wedding photographer in San Jose";

/** Brand lockup, kept as the tagline under the H1. */
export const TAGLINE = "Iconic, intentional and unmistakably you";

/** The sentence an answer engine should be able to quote. Keep it in the hero. */
export const OPENING_LINE =
  "I’m Raymond Lei, a San Jose wedding photographer for couples who want editorial, romantic portraits and real documentary moments, across Milpitas, Santa Clara, Los Gatos and the rest of the South Bay.";

/** Cities named on the homepage and in areaServed. No city pages yet, so render as text. */
export const SOUTH_BAY_CITIES = [
  "San Jose",
  "Milpitas",
  "Santa Clara",
  "Sunnyvale",
  "Los Gatos",
  "Saratoga",
  "Cupertino",
  "Palo Alto",
  "Campbell",
] as const;

export const BASED_LINE =
  "Based in San Jose, serving the South Bay and the Bay Area.";

/** Visible FAQ. Answers use only facts already on the investment page or in a real testimonial. */
export const HOME_FAQ: { q: string; a: string }[] = [
  {
    q: "Where are you based, and which cities do you cover?",
    a: "I’m based in San Jose, serving the South Bay and the Bay Area. I photograph weddings in San Jose, Milpitas, Santa Clara, Sunnyvale, Los Gatos, Saratoga, Cupertino, Palo Alto and Campbell. I also travel to San Francisco and the Peninsula.",
  },
  {
    q: "What is your style?",
    a: "Editorial when a portrait needs direction, documentary when the moment should stay candid. Romantic and a little dramatic, with quiet luxury in the light rather than a stiff setup. Receptions are fun and energetic, because that part of the night should look like a party.",
  },
  {
    q: "How much does wedding photography cost?",
    a: "Wedding collections start at $2,600. The Intimate is up to 6 hours at $2,600, The Signature is up to 8 hours at $3,100, and The Full Story is up to 10 hours with a second photographer at $4,000. Every collection can be split into monthly payments.",
  },
  {
    q: "We’re awkward on camera. Will that work?",
    a: "Ever said “I’m awkward in front of a camera”? Perfect, you’re in good company; most of my favorite couples have. I’ll give you a few clear prompts, then step back so you can actually be at your wedding.",
  },
  {
    q: "Can you handle our cultural traditions?",
    a: "Yes. Before the day we go through the ceremony, so the moments your families need are planned, not guessed. Sargon & Odelya had a traditional Middle Eastern wedding, and they wrote that I learned which shots were critical to their culture and didn’t miss a beat.",
  },
  {
    q: "How many photos do we get, and how fast?",
    a: "Every image is fully edited: 350+ with The Intimate, 500+ with The Signature and 700+ with The Full Story. The Signature and The Full Story include a sneak peek gallery within 48 hours.",
  },
  {
    q: "Is a second photographer included?",
    a: "A second photographer is included with The Full Story. On The Intimate and The Signature, you can add one for $75 to $100 an hour.",
  },
];

/** FAQPage node for the homepage Q&As. Must match the visible questions. */
export const faqPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: HOME_FAQ.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

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
    // TODO [NEEDS RAYMOND / couple OK]: city and venue. Left generic on purpose.
    context: "Wedding · Bay Area, CA",
    photo: SARGON_ODELYA_PHOTOS[23], // first dance in fog, black & white — unused elsewhere on the homepage
  },
];

export interface RecentWedding {
  title: string;
  /** Optional: only set where the venue and date are actually known. Nothing
   *  here is guessed, so a wedding can ship with just its name. */
  place?: string;
  year?: string;
  href: string;
  cover: Photo;
  frames: Photo[]; // 1-3 supporting teaser frames
}

/** Proof of consistency: the three weddings behind /gallery, one entry each.
 *  Nothing renders this array today; it is the content side of the recent-work
 *  block, ready for the section that reads it. */
export const RECENT_WEDDINGS: RecentWedding[] = [
  {
    title: "Sargon & Odelya",
    place: "Bay Area, CA",
    year: "2025",
    href: "/gallery/weddings#sargon-odelya", // straight to this wedding's set
    cover: so("so-select-presargon-07.jpg"), // walking the lawn under the olive trees
    frames: [
      so("so-select-062.jpg"), // bride and her mother, black and white
      so("so-select-641.jpg"), // first dance, black and white
    ],
  },
  {
    title: "Miranda & Danny",
    href: "/gallery/weddings#miranda-danny",
    cover: md("miranda-danny-03.jpg"), // the marina wide, low sun on the masts
    frames: [
      md("miranda-danny-01.jpg"), // veil sweeping across the frame
      md("miranda-danny-02.jpg"), // leaning together, sun flaring off the water
    ],
  },
  {
    title: "Trang",
    href: "/gallery/weddings#trang",
    cover: tr("trang-07.jpg"), // outside the church after the ceremony
    frames: [
      tr("trang-03.jpg"), // the altar from the back of the church
      tr("trang-01.jpg"), // the bands on the red invitation
    ],
  },
];

export interface PortfolioRow {
  layout: "full" | "pair";
  photos: Photo[]; // 1 photo for "full", 2 for "pair"
}

/** The homepage wedding gallery, the page's centerpiece. Since the 2026-07-21
 *  collage rebuild the section writes its 17 <img> tags out literally in
 *  page.tsx; this array is the curated mirror of those tiles. Swap a photo
 *  here AND in the matching collage tile so the two stay in sync. */
export const WEDDING_PORTFOLIO: PortfolioRow[] = [
  // Fulls are natively landscape; pairs natively portrait. No photo here may
  // appear anywhere else on the homepage (hero, manifesto, who-I-photograph…).
  { layout: "full", photos: [so("so-select-686.jpg")] }, // the money dance, black and white
  { layout: "pair", photos: [so("so-select-204.jpg"), md("miranda-danny-05.jpg")] }, // bride with the ceremonial fan · couple on the dock
  { layout: "full", photos: [tr("trang-11.jpg")] }, // paddle fans on the red reception table
  { layout: "full", photos: [so("so-select-177.jpg")] }, // guests cheering, seen from above
  { layout: "pair", photos: [tr("trang-04.jpg"), so("so-select-167.jpg")] }, // kneeling at the ceremony · groom on the staircase
  { layout: "full", photos: [so("so-select-112.jpg")] }, // bridesmaids champagne toast
  { layout: "pair", photos: [md("miranda-danny-07.jpg"), so("so-select-reedit2-14.jpg")] }, // marina kiss · champagne spray
  { layout: "full", photos: [so("so-select-presargon-12.jpg")] }, // first dance in low fog
  { layout: "full", photos: [md("miranda-danny-12.jpg")] }, // boardwalk embrace at sunset
  { layout: "pair", photos: [tr("trang-10.jpg"), so("so-select-580.jpg")] }, // petal recessional · groom on shoulders
  { layout: "full", photos: [so("so-select-046.jpg")] }, // her mother fastening the shoe
  {
    layout: "pair",
    photos: [
      so("so-select-300.jpg"),
      {
        path: "https://images.squarespace-cdn.com/content/v1/697c1d6344a3b1154bcbc39e/a4dc9303-abdb-418f-b9df-d2f910a25833/bay-area-fashion-editorial-portrait-evening-gown-lei-photography-collective?format=1000w",
        a: PHOTOS.gownEditorial.a,
        r: PHOTOS.gownEditorial.r,
      },
    ],
  }, // veil lifted · editorial gown portrait
];
