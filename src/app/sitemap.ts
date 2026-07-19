import type { MetadataRoute } from "next";
import { CATEGORIES, CAT_ORDER } from "@/content/portfolio";
import { SITE_URL } from "@/content/site";

// All indexable routes. The (site) route group does not affect URLs, so paths
// map 1:1 to the folders under src/app/(site)/. Dynamic portfolio routes are
// enumerated from the same data that generates the pages, so this stays in
// sync automatically as categories and projects are added.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/weddings`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/second-weddings`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/portfolio`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/investment`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/experience`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/inquire`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/free-session`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = CAT_ORDER.map((cat) => ({
    url: `${SITE_URL}/portfolio/${cat}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const projectRoutes: MetadataRoute.Sitemap = CAT_ORDER.flatMap((cat) =>
    CATEGORIES[cat].projects.map((p) => ({
      url: `${SITE_URL}/portfolio/${cat}/${p.id}`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    }))
  );

  return [...staticRoutes, ...categoryRoutes, ...projectRoutes];
}
