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

  // The /portfolio/weddings category (and its sargon-odelya project page) were
  // removed. The curated array is retained for reuse but is no longer routed.
  it("is not routed by any portfolio category", () => {
    for (const cat of CAT_ORDER) {
      const projectIds = CATEGORIES[cat].projects.map((p) => p.id);
      expect(projectIds).not.toContain("sargon-odelya");
    }
    expect(CATEGORIES.weddings).toBeUndefined();
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
