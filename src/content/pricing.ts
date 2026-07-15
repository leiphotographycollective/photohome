// Investment page content — collections, add-ons, shared inclusions.
// Price and copy edits happen here; the page renders whatever this exports.

export interface Tier {
  name: string;
  price: string; // display string, e.g. "$3,800"
  blurb: string;
  facts: string[]; // tier-specific only — shared items live in INCLUDED_EVERYWHERE
}

/** Flagship-first (price anchoring): Collection → Signature → Intimate. */
export const TIERS: Tier[] = [
  {
    name: "The Collection",
    price: "$3,800",
    blurb:
      "Ten hours, two photographers. My eye on the big moments, a second lens catching everything else — your partner's face when you walk in, the details you'll forget by Monday. For the couples who want the full story told.",
    facts: [
      "Up to 10 hours of coverage",
      "Including: getting ready (both sides), portraits, wedding party, family formals, ceremony, cocktail hour, full reception",
      "2 photographers (included)",
      "700+ fully edited images",
      "Sneak peek gallery within 48 hours",
    ],
  },
  {
    name: "The Signature",
    price: "$2,900",
    blurb:
      "Eight hours and a full day of coverage. Enough time to breathe, enough time to document everything from getting ready to the first dances. Clean edits, real moments, no posing you into something you're not.",
    facts: [
      "Up to 8 hours of coverage",
      "Including: getting ready, portraits, wedding party, family formals, ceremony, cocktail hour, reception",
      "1 photographer",
      "500+ fully edited images",
      "Sneak peek gallery within 48 hours",
    ],
  },
  {
    name: "The Intimate",
    price: "$2,400",
    blurb:
      "Six hours. No big production — just quiet, focused coverage for the couples who want it kept close. Ceremony, portraits, the in-between moments that actually matter. Full gallery delivered, every image edited.",
    facts: [
      "Up to 6 hours of coverage",
      "Including: getting ready, portraits, wedding party, family formals, ceremony, cocktail hour",
      "1 photographer",
      "350+ fully edited images",
    ],
  },
];

/** Identical across all tiers — rendered once in the "Every collection includes" strip. */
export const INCLUDED_EVERYWHERE = [
  "100–150 fully edited images per hour of coverage",
  "Online gallery to view, download and order prints (Pic-Time, 12-month access)",
  "Full-resolution downloads + printing rights",
];

export interface AddOn {
  name: string;
  price: string;
  note: string;
}

export const ADD_ONS: AddOn[] = [
  {
    name: "Engagement session",
    price: "+$250",
    note: "Available with every collection",
  },
  {
    name: "Second photographer",
    price: "+$600",
    note: "For The Intimate and The Signature — already included in The Collection",
  },
];
