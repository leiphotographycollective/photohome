// Single source of truth for the site's canonical origin and the business
// identity used in metadata + structured data (JSON-LD).
//
// NOTE: leiphotography.co currently serves the Squarespace site. The URLs
// below (canonical tags, sitemap, JSON-LD) are only correct once THIS Next.js
// site replaces Squarespace at that domain. Until then, override per deploy
// with NEXT_PUBLIC_SITE_URL (e.g. the Vercel preview URL) so crawlers aren't
// pointed at a page this build doesn't serve yet.

import { CITY, POSITIONING } from "@/content/homepage";
import { img, PHOTOS } from "@/content/portfolio";

/** Canonical production origin, no trailing slash. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://leiphotography.co"
).replace(/\/+$/, "");

/** Business identity, reused across metadata and JSON-LD. */
export const BUSINESS = {
  name: "Lei Photography Collective",
  founder: "Raymond Lei",
  email: "leiphotography57@gmail.com",
  instagram: "https://instagram.com/lei.photography.co",
  priceRange: "$$$",
  image: img(PHOTOS.headshot.path, 1200),
} as const;

/** schema.org LocalBusiness node, rendered site-wide in the root layout. */
export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": `${SITE_URL}/#business`,
  name: BUSINESS.name,
  description: `${POSITIONING} Editorial wedding photography by ${BUSINESS.founder} in the ${CITY} and beyond.`,
  url: SITE_URL,
  image: BUSINESS.image,
  email: BUSINESS.email,
  priceRange: BUSINESS.priceRange,
  founder: { "@type": "Person", name: BUSINESS.founder },
  areaServed: [
    { "@type": "AdministrativeArea", name: CITY },
    { "@type": "City", name: "San Francisco" },
    { "@type": "City", name: "San Jose" },
    { "@type": "City", name: "Berkeley" },
  ],
  knowsAbout: [
    "Wedding photography",
    "Engagement photography",
    "Editorial portraiture",
  ],
  sameAs: [BUSINESS.instagram],
} as const;
