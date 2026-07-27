import { describe, expect, it } from "vitest";
import { SARGON_ODELYA_CURATED } from "@/content/portfolio";

// portfolio.ts is now just a photo library. The category/project structure it
// used to carry (CATEGORIES, CAT_ORDER, the graduation and event arrays) went
// away with the weddings-only rebuild, along with the routes that read it.
// What appears on /gallery is asserted in gallery.test.ts.
describe("curated Sargon & Odelya gallery", () => {
  it("holds 10-17 photos (spec: never full-dump galleries)", () => {
    expect(SARGON_ODELYA_CURATED.length).toBeGreaterThanOrEqual(10);
    expect(SARGON_ODELYA_CURATED.length).toBeLessThanOrEqual(17);
  });
});
