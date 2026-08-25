import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";
import { EVENTS } from "@/content/events";

// All indexable routes. The (site) route group does not affect URLs, so paths
// map 1:1 to the folders under src/app/(site)/.
//
// /weddings and /portfolio are deliberately absent: they redirect to /gallery,
// and a redirected URL must never appear in the sitemap. /links is noindex and
// /wedding-timeline-guide is an unlisted funnel page, so neither is here.
// /second-weddings is archived (noindex, unlinked from nav) so it's absent too.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: `${SITE_URL}`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/gallery`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/gallery/weddings`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/gallery/engagements`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/gallery/events`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    // Derived from EVENTS rather than hardcoded, so a fifth event doesn't
    // need a sitemap edit. One step below /gallery/events, matching how the
    // rest of this file grades depth.
    ...EVENTS.map((event) => ({
      url: `${SITE_URL}${event.href}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { url: `${SITE_URL}/graduations`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/investment`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/experience`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/inquire`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/free-session`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];
}
