import { describe, expect, it } from "vitest";
import {
  CTA_HREF,
  CTA_LABEL,
  DOORS,
  RECENT_WEDDINGS,
  TESTIMONIALS,
} from "@/content/homepage";
import { CATEGORIES } from "@/content/portfolio";

describe("CTA constants", () => {
  it("match the spec exactly", () => {
    expect(CTA_LABEL).toBe("Check my availability");
    expect(CTA_HREF).toBe("/inquire#form");
  });
});

describe("category doors", () => {
  it("are the four approved categories, each routable", () => {
    expect(DOORS.map((d) => d.cat)).toEqual([
      "weddings",
      "couples",
      "engagements",
      "events",
    ]);
    for (const d of DOORS) {
      expect(CATEGORIES[d.cat]).toBeDefined();
      expect(d.label.length).toBeGreaterThan(0);
      expect(d.photo.path.length).toBeGreaterThan(0);
      expect(d.photo.a.length).toBeGreaterThan(0);
    }
  });
});

describe("recent weddings", () => {
  it("has at least one wedding with 1-3 teaser frames each", () => {
    expect(RECENT_WEDDINGS.length).toBeGreaterThanOrEqual(1);
    for (const w of RECENT_WEDDINGS) {
      expect(w.href.startsWith("/portfolio/weddings/")).toBe(true);
      expect(w.frames.length).toBeGreaterThanOrEqual(1);
      expect(w.frames.length).toBeLessThanOrEqual(3);
      expect(w.title.length).toBeGreaterThan(0);
    }
  });
});

describe("testimonials", () => {
  it("never contains an empty quote or unattributed entry", () => {
    for (const t of TESTIMONIALS) {
      expect(t.quote.trim().length).toBeGreaterThan(0);
      expect(t.names.trim().length).toBeGreaterThan(0);
    }
  });
});
