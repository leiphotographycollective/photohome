import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

// All indexable routes. The (site) route group does not affect URLs, so paths
// map 1:1 to the folders under src/app/(site)/.
//
// /weddings and /portfolio are deliberately absent: they redirect to /gallery,
// and a redirected URL must never appear in the sitemap. /links is noindex and
// /wedding-timeline-guide is an unlisted funnel page, so neither is here.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: `${SITE_URL}`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/gallery`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/second-weddings`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/investment`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/experience`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/inquire`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/free-session`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];
}
