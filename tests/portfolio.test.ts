import { describe, expect, it } from "vitest";
import {
  CATEGORIES,
  CAT_ORDER,
  SARGON_ODELYA_CURATED,
} from "@/content/portfolio";

describe("curated Sargon & Odelya gallery", () => {
  it("holds 10-15 photos (spec: never full-dump galleries)", () => {
    expect(SARGON_ODELYA_CURATED.length).toBeGreaterThanOrEqual(10);
    expect(SARGON_ODELYA_CURATED.length).toBeLessThanOrEqual(15);
  });

  it("is exactly what the sargon-odelya project displays", () => {
    const proj = CATEGORIES.weddings.projects.find(
      (p) => p.id === "sargon-odelya"
    );
    expect(proj).toBeDefined();
    expect(proj!.photos).toEqual(SARGON_ODELYA_CURATED);
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
