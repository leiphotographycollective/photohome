// Second-wedding landing page content -- data-driven so the page JSX holds no
// raw copy and every swap is a one-line edit (mirrors homepage.ts). This page
// is a side door: it lives on the domain but is intentionally out of the nav.

import { PHOTOS, SARGON_ODELYA_PHOTOS, type Photo } from "@/content/portfolio";

export const META = {
  title: "Second Wedding Photographer | Bay Area | Lei Photography Collective",
  description:
    "Relaxed, beautiful photography for second weddings, elopements and intimate celebrations across the SF Bay Area. Short coverage, fair prices, photos in 3 weeks.",
};

export const HERO = {
  kicker: "Second Wedding Photographer · SF Bay Area",
  headline: "This time, it's about the two of you.",
  subheadline:
    "Relaxed second wedding photography across the San Francisco Bay Area. Short, simple coverage for intimate celebrations, from a photographer who keeps you comfortable and gets you back to your guests.",
  ctaLabel: "Check my date",
  // Swap for your strongest warm candid: a couple mid-laugh with guests around
  // them, not a posed formal. Landscape reads best full-bleed.
  image: PHOTOS.receptionEntrance,
};

export const OPENING = {
  kicker: "Bay Area second wedding photography",
  paragraphs: [
    "You've done the big wedding, or maybe you never wanted one. This time it's smaller, calmer, and exactly how you both want it. A vineyard afternoon, a courthouse and a long dinner, a backyard with the people who matter.",
    "You don't need a photographer who disappears with you for two hours of posing. You need someone who quietly captures the day as it actually happens, takes a handful of beautiful portraits without any fuss, and then gets out of the way.",
    "That's what I do. I'm Raymond, a Bay Area second wedding photographer with a fashion-trained eye and a calm, gentle way of directing, especially if being in front of a camera isn't your favorite place to be. My aim is simple: by the end of the day, you'll have forgotten I was working at all.",
  ],
};

export const VALUE_PROPS = {
  heading: "Why couples choose this",
  items: [
    {
      title: "Just enough coverage",
      body: "Two to four hours, not ten. You get the ceremony, the portraits, the toasts and the real moments, and your whole evening back.",
    },
    {
      title: "Comfortable, not posed",
      body: "Gentle direction and simple prompts, so you look like yourselves on your best day. No stiff poses, no performing. If you're camera-shy, you're exactly who I'm good with.",
    },
    {
      title: "Photos while it's still fresh",
      body: "A sneak peek within 48 hours. Your full gallery within three weeks. In writing, in your contract.",
    },
    {
      title: "Fair, clear pricing",
      body: "Three simple packages. No hidden fees, no pressure to upgrade.",
    },
  ],
};

export interface Package {
  name: string;
  price: string;
  hours: string;
  photographers: string;
  photos: string;
  blurb: string;
  popular?: boolean;
}

export const PACKAGES = {
  kicker: "Investment",
  heading: "Simple packages, honest prices",
  items: [
    {
      name: "Intimate",
      price: "$750",
      hours: "2 hours of coverage",
      photographers: "One photographer",
      photos: "Around 25 edited photos",
      blurb:
        "Your ceremony, portraits of the two of you, and the first celebrations. Perfect for courthouse weddings and small ceremonies.",
    },
    {
      name: "Classic",
      price: "$1,150",
      popular: true,
      hours: "3 hours of coverage",
      photographers: "One photographer",
      photos: "Around 40 edited photos",
      blurb:
        "Everything in Intimate, plus family groups and more of the celebration: dinner, toasts, the good candids.",
    },
    {
      name: "Full Afternoon",
      price: "$1,550",
      hours: "4 hours of coverage",
      photographers: "One photographer",
      photos: "Around 60 edited photos",
      blurb:
        "The whole story, start to finish, from getting ready through the evening.",
    },
  ] as Package[],
  includesHeading: "What every package includes",
  includes: [
    "One planning call before the day",
    "Short, candid-style portraits of the two of you (10 to 15 minutes)",
    "Standard batch editing, with consistent color across the gallery",
    "A private online gallery to share with everyone, plus print rights",
    "A sneak peek in 48 hours, your full gallery in 3 weeks",
    "Suited to intimate celebrations of up to about 50 guests, with simpler family groupings",
  ],
  addons:
    "Extra hour ($350) · heirloom album (from $450) · pre-wedding session ($400, a relaxed practice run, lovely if you're nervous in front of a camera). The engagement session and album are add-ons here, not included.",
  foundingRate: "2026 introductory pricing. These rates rise next season.",
};

export interface SecondWeddingTestimonial {
  pull: string;
  quote: string;
  names: string;
  photo: Photo;
}

// Real quotes only. Stays null until a founding-client review lands, then a
// single object replaces null and the page renders it in place of the strip.
export const TESTIMONIAL: SecondWeddingTestimonial | null = null;

export const SOCIAL_PROOF = {
  // Your strongest real candids. Swap freely; keep 6 to 8.
  images: [
    PHOTOS.marinaKiss,
    PHOTOS.receptionEntrance,
    PHOTOS.shoulderDance,
    PHOTOS.firstDanceClouds,
    PHOTOS.brideMother,
    PHOTOS.coastalCandid,
    SARGON_ODELYA_PHOTOS[22],
    SARGON_ODELYA_PHOTOS[8],
  ] as Photo[],
  caption: "Real moments, real couples. See the full portfolio",
  href: "/work",
};

export const STEPS = {
  heading: "How it works",
  items: [
    {
      n: "01",
      title: "Check your date",
      body: "Send the form below with your date, location, and a line about what you're planning. I'll reply within a day.",
    },
    {
      n: "02",
      title: "We have a short call",
      body: "Fifteen relaxed minutes. You tell me about your day, I build a simple photo timeline around it, so on the day nothing is rushed and nothing is missed.",
    },
    {
      n: "03",
      title: "Enjoy your wedding",
      body: "I arrive early, work quietly, and keep any posed photos short and painless. Sneak peek in 48 hours, full gallery within three weeks.",
    },
  ],
};

export const FAQ = {
  heading: "Questions couples ask",
  items: [
    {
      q: "Do you only photograph second weddings?",
      a: "This page is for my short-coverage packages, which suit second weddings, elopements and intimate celebrations beautifully. I also photograph full wedding days, and you'll find that work at Lei Photography Collective.",
    },
    {
      q: "We're a bit older and hate having our photo taken. Honestly, how will this go?",
      a: "You're my favorite kind of couple. My whole approach is built on gentle direction, small prompts and natural movement instead of stiff posing. Most photos happen while you're just enjoying your day. And if you'd like a practice run, the pre-wedding session exists exactly for this.",
    },
    {
      q: "Our wedding is tiny. Is it too small for a photographer?",
      a: "Not at all. Small weddings are what these packages are for. I've photographed courthouse ceremonies with six guests. The size of the wedding has nothing to do with how much the photos will mean.",
    },
    {
      q: "Do our kids and blended family fit into the photos?",
      a: "Absolutely. For many of my couples that's the most important part. On our planning call we'll list the family groupings that matter, and I make sure every one of them happens, calmly and quickly.",
    },
    {
      q: "When do we get our photos?",
      a: "A sneak peek within 48 hours, your full edited gallery within three weeks. That's a written promise, not an estimate.",
    },
    {
      q: "Where do you travel?",
      a: "Anywhere within about 50 miles of San Francisco and San Jose at no extra charge, including Napa, Half Moon Bay, Carmel and the Peninsula. Further afield, just ask.",
    },
  ],
};

export const FINAL_CTA = {
  heading: "Ready when you are",
  body: "Tell me your date and what you're planning. If I'm free, I'll hold the date while we talk. No deposit, no pressure.",
  secondaryLabel: "Prefer to browse first? See the portfolio",
  secondaryHref: "/work",
};
