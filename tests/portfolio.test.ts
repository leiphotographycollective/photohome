import { describe, expect, it } from "vitest";
import {
  CATEGORIES,
  CAT_ORDER,
  SARGON_ODELYA_CURATED,
} from "@/content/portfolio";

describe("curated Sargon & Odelya gallery", () => {
  it("holds 10-17 photos (spec: never full-dump galleries)", () => {
    expect(SARGON_ODELYA_CURATED.length).toBeGreaterThanOrEqual(10);
    expect(SARGON_ODELYA_CURATED.length).toBeLessThanOrEqual(17);
  });

  // The routed sargon-odelya project page was removed; the curated array is
  // retained for reuse but no project routes to it. The weddings category
  // returned 2026-07-21 as coming-soon placeholders (see the collage spec),
  // still outside CAT_ORDER.
  it("is not routed as a project in any category", () => {
    for (const cat of Object.keys(CATEGORIES)) {
      const projectIds = CATEGORIES[cat].projects.map((p) => p.id);
      expect(projectIds).not.toContain("sargon-odelya");
    }
  });
});

describe("weddings category (coming-soon placeholders)", () => {
  it("holds five blank project shells", () => {
    expect(CATEGORIES.weddings).toBeDefined();
    expect(CATEGORIES.weddings.projects.map((p) => p.id)).toEqual([
      "wedding-01",
      "wedding-02",
      "wedding-03",
      "wedding-04",
      "wedding-05",
    ]);
    for (const p of CATEGORIES.weddings.projects) {
      expect(p.cover).toBeNull();
      expect(p.photos).toHaveLength(0);
    }
  });

  it("is hidden from the /portfolio hub and sitemap (not in CAT_ORDER)", () => {
    expect(CAT_ORDER).not.toContain("weddings");
  });
});

describe("couples category", () => {
  it("exists with at least one project", () => {
    expect(CATEGORIES.couples).toBeDefined();
    expect(CATEGORIES.couples.label).toBe("Couples");
    expect(CATEGORIES.couples.projects.length).toBeGreaterThan(0);
  });

  it("is routable via CAT_ORDER", () => {
    expect(CAT_ORDER).toContain("couples");
  });
});
