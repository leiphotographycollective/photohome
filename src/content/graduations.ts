// Graduations page content -- data-driven so the page JSX holds no raw copy
// and every price or line-item swap is a one-line edit (mirrors pricing.ts
// and second-weddings.ts). Photos here are blank placeholders on purpose:
// /images/placeholders/graduations-*.svg, swapped for real session photos
// once I have a gallery to draw from.

export const META = {
  title: "San Jose State Graduation Photographer",
  description:
    "San Jose State graduation photographer shooting SJSU senior portraits at Tower Lawn, 7th Street, and other campus landmarks. Solo and group sessions available.",
};

export const HERO = {
  kicker: "SJSU, UCB, SU, SCU, SFSU",
  headline: "GRADS 2026",
  subheadline:
    "Your final documentation of one of the most important times in your life. Make it personal and meaningful, because your kids and grandkids WILL see these pictures.",
  image: "/images/portfolio/graduation/ezirel/ezirel-hero.jpg",
  alt: "San Jose State University graduate in cap and gown pointing at the camera on campus",
};

/** Teresa & Uyen gets its own full-width spread right under the hero. */
export const TERESA_SPREAD = {
  image: "/images/portfolio/graduation/hero-strip/teresa-uyen.jpg",
  aspect: "6224 / 4672",
  alt: "SJSU graduate lying in the grass with her cap, gown, and honor cords laid out beside her",
};

/** The AKS trio gets its own full-width spread further down the page. */
export const AKS_TRIO_SPREAD = {
  image: "/images/portfolio/graduation/hero-strip/aks-trio.jpg",
  aspect: "4096 / 3072",
  alt: "Three San Jose State graduates in blue and gold stoles under a Congratulations Graduates banner",
};

/** Four photos, uniform portrait tiles for a symmetrical 2x2 grid on every device. */
export const HERO_STRIP = [
  {
    src: "/images/portfolio/graduation/hero-strip/rogan-22.jpg",
    alt: "SJSU graduate portrait session near a campus building",
  },
  {
    src: "/images/portfolio/graduation/hero-strip/aks-129.jpg",
    alt: "San Jose State graduate portrait in cap and gown among palm trees",
  },
  {
    src: "/images/portfolio/graduation/hero-strip/naveed-216.jpg",
    alt: "SJSU graduate portrait with the San Francisco Bay skyline in the background",
  },
  {
    src: "/images/portfolio/graduation/hero-strip/jake-o-161.jpg",
    alt: "Close-up graduation portrait of an SJSU senior in cap and gown",
  },
];

export const BAND_1 = "/images/portfolio/graduation/band-graduations-1.jpg";
export const BAND_1_ALT =
  "Overhead view of SJSU graduates holding their caps together in a row";

export const BAND_2 = "/images/portfolio/graduation/band-graduations-2.jpg";
export const BAND_2_ALT =
  "Graduation cap, heels, and honor cords laid out on the grass at San Jose State";

export const INTRO =
  "As a San Jose State graduation photographer, I tailor every session below to your cap and gown, your favorite spot on campus, and the people you want in frame. Tell me about your grad date and I’ll send the full breakdown.";

export interface GradTier {
  name: string;
  subtitle?: string;
  price: string;
  kicker: string;
  blurb: string;
  facts: string[];
  popular?: boolean;
  image: string;
  /** CSS aspect-ratio for the photo's native dimensions; defaults to 4 / 5 (placeholders). */
  aspect?: string;
  alt: string;
}

/** Flagship-first order, matching the three experiences as priced. */
export const TIERS: GradTier[] = [
  {
    name: "The Classic Experience",
    price: "$225",
    kicker: "45 min · 1 location",
    blurb:
      "An introductory and refined graduation session, perfect for graduates who want beautiful portraits without a long shoot.",
    facts: [
      "45 minutes of shooting time",
      "1 location & outfit",
      "25+ edited images",
      "Online gallery for viewing",
    ],
    image: "/images/portfolio/graduation/tier-1-laureni.jpg",
    aspect: "1600 / 2400",
    alt: "SJSU graduate holding her cap in front of blooming roses on campus",
  },
  {
    name: "The Signature Experience",
    price: "$350",
    kicker: "90 min · 2 locations",
    popular: true,
    blurb:
      "My most popular package, designed for graduates who want variety, intentional portraits, and a polished final gallery.",
    facts: [
      "90 minutes of shooting time",
      "2 locations & outfits",
      "50+ edited images",
      "Online gallery for viewing and printing",
    ],
    image: "/images/portfolio/graduation/tier-2-emily.jpg",
    aspect: "4032 / 5372",
    alt: "San Jose State graduate in her cap and gown on a bluff overlooking the coast",
  },
  {
    name: "The Premium Experience",
    subtitle: "Photo + Film Experience · Only 3 spots available!",
    price: "$500",
    kicker: "2 to 2.5 hours · 3 locations",
    blurb:
      "A cinematic graduation story, combining portraits with a short graduation film you’ll be able to relive for years.",
    facts: [
      "2 to 2.5 hours of shooting time",
      "3 locations & outfits",
      "50+ edited images",
      "30 to 45 second cinematic graduation film capturing your day",
      "One 8x10 print of your choice",
      "Private online gallery for viewing and printing",
    ],
    image: "/images/portfolio/graduation/tier-3-dylan.jpg",
    aspect: "1600 / 2400",
    alt: "SJSU graduate popping champagne in front of the San Jose State University sign",
  },
];

export const GROUPS = {
  kicker: "Group Sessions",
  heading: "Celebrate with the friends who made the journey unforgettable",
  intro:
    "Group sessions start at $175 per person, and you save more the bigger your group gets.",
  note: "Best value when booking with 4 to 5 friends.",
  shared:
    "Session time is shared among everyone in the group and includes both individual portraits and group photos.",
  addon: "Additional shooting time is available as an add-on for $50 per 30 minutes.",
};

export interface GroupTier {
  name: string;
  price: string;
  facts: string[];
  image: string;
  /** CSS aspect-ratio for the photo's native dimensions; defaults to 4 / 5 (placeholders). */
  aspect?: string;
  alt: string;
  closing?: boolean;
}

export const GROUP_TIERS: GroupTier[] = [
  {
    name: "Two People",
    price: "$175 / person",
    facts: [
      "60 minutes of shooting time",
      "1 location & outfit",
      "50+ edited images",
      "Online gallery for viewing",
    ],
    image: "/images/portfolio/graduation/group-1-lauren.jpg",
    aspect: "1600 / 2400",
    alt: "SJSU graduate posing on the grass with her cap, gown, and cords laid out around her",
  },
  {
    name: "Three People",
    price: "$160 / person",
    facts: [
      "90 minutes of shooting time",
      "1 to 2 locations & outfits",
      "75+ edited images",
      "Online gallery for viewing",
    ],
    image: "/images/portfolio/graduation/group-2-aks-21.jpg",
    aspect: "3072 / 4096",
    alt: "Three San Jose State fraternity brothers in graduation stoles posing together on campus",
  },
  {
    name: "Four People+",
    price: "$140 / person",
    facts: [
      "120 minutes of shooting time",
      "3 locations & outfits",
      "100+ edited images",
      "Online gallery for viewing",
    ],
    image: "/images/portfolio/graduation/group-3-akp.jpg",
    aspect: "1600 / 2400",
    alt: "Five San Jose State graduates tossing their caps in the air on campus",
    closing: true,
  },
];

export const GROUP_FOOTNOTE =
  "Bring your crew. Organize a group of 5 or more graduates and you’ll get $50 off your group session for coordinating everyone.";

export const FINAL_CTA = {
  heading: "Every session can be tailored: tell me about your graduation.",
  ctaLabel: "Reserve your session",
};
