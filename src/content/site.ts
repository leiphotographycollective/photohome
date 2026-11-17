// Single source of truth for the site's canonical origin and the business
// identity used in metadata + structured data (JSON-LD).
//
// The canonical host is https://www.leiphotography.co. Apex https and
// http://www already 308 to that host at the Vercel domain layer; that
// redirect is not configured in this repo. http://leiphotography.co 308s to
// https://leiphotography.co, which then 308s to www.
//
// NEXT_PUBLIC_SITE_URL overrides the origin for preview deploys. An apex
// production value is normalized back to www so canonicals, the sitemap and
// JSON-LD stay on one host. Other hosts (Vercel preview URLs) are left as-is.

import { img, PHOTOS } from "@/content/portfolio";

/** Primary browser, search, and social-sharing title for the homepage. */
export const SITE_TITLE =
  "Editorial Romantic Wedding Photographer San Jose | Raymond Lei";

/** Homepage meta description. Also the root layout fallback. */
export const HOME_DESCRIPTION =
  "Editorial, romantic wedding photography in San Jose and the South Bay, Milpitas to Los Gatos. Calm direction for camera-shy couples. From $2,600.";

/** Force the production apex onto www. Preview hosts pass through. */
export function canonicalOrigin(raw: string): string {
  const trimmed = raw.replace(/\/+$/, "");
  if (
    trimmed === "https://leiphotography.co" ||
    trimmed === "http://leiphotography.co" ||
    trimmed === "http://www.leiphotography.co"
  ) {
    return "https://www.leiphotography.co";
  }
  return trimmed;
}

/** Canonical production origin, no trailing slash. */
export const SITE_URL = canonicalOrigin(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.leiphotography.co",
);

/** Business identity, reused across metadata and JSON-LD. */
export const BUSINESS = {
  name: "Lei Photography Collective",
  alternateName: "Raymond Lei Photography",
  founder: "Raymond Lei",
  email: "raymond@leiphotography.co",
  instagram: "https://www.instagram.com/leiphotography.co/",
  pinterest: "https://www.pinterest.com/LeiPhotographyCo/",
  priceRange: "$2,600-$4,000",
  // Real headshot already used on the site. Not a placeholder.
  image: img(PHOTOS.headshot.path, 1200),
} as const;

/** schema.org LocalBusiness node, rendered site-wide in the root layout.
 *  No aggregateRating: there are no review stars on the page. */
export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": `${SITE_URL}/#business`,
  name: BUSINESS.name,
  alternateName: BUSINESS.alternateName,
  description:
    "Editorial, romantic wedding photography by Raymond Lei in San Jose and the South Bay.",
  url: SITE_URL,
  email: BUSINESS.email,
  image: BUSINESS.image,
  priceRange: BUSINESS.priceRange,
  address: {
    "@type": "PostalAddress",
    addressLocality: "San Jose",
    addressRegion: "CA",
    addressCountry: "US",
  },
  founder: {
    "@type": "Person",
    name: BUSINESS.founder,
    jobTitle: "Wedding Photographer",
  },
  areaServed: [
    { "@type": "City", name: "San Jose" },
    { "@type": "City", name: "Milpitas" },
    { "@type": "City", name: "Santa Clara" },
    { "@type": "City", name: "Sunnyvale" },
    { "@type": "City", name: "Los Gatos" },
    { "@type": "City", name: "Saratoga" },
    { "@type": "City", name: "Cupertino" },
    { "@type": "City", name: "Palo Alto" },
    { "@type": "City", name: "Campbell" },
    { "@type": "AdministrativeArea", name: "San Francisco Bay Area" },
  ],
  knowsAbout: [
    "Editorial wedding photography",
    "Romantic wedding photography",
    "Documentary wedding photography",
    "Cultural and Middle Eastern weddings",
    "Engagement photography",
  ],
  sameAs: [BUSINESS.instagram, BUSINESS.pinterest],
  makesOffer: [
    {
      "@type": "Offer",
      name: "The Intimate (6 hours)",
      price: "2600",
      priceCurrency: "USD",
    },
    {
      "@type": "Offer",
      name: "The Signature (8 hours)",
      price: "3100",
      priceCurrency: "USD",
    },
    {
      "@type": "Offer",
      name: "The Full Story (10 hours, 2 photographers)",
      price: "4000",
      priceCurrency: "USD",
    },
  ],
} as const;
