import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  META,
  HERO,
  OPENING,
  VALUE_PROPS,
  PACKAGES,
  SOCIAL_PROOF,
  TESTIMONIAL,
  STEPS,
  FAQ,
  FINAL_CTA,
} from "@/content/second-weddings";

const SOURCE = readFileSync("src/content/second-weddings.ts", "utf8");

describe("second-weddings SEO + hero", () => {
  it("has the approved meta and headline", () => {
    expect(META.title).toBe(
      "Second Wedding Photographer | Bay Area | Lei Photography Collective"
    );
    expect(META.description).toBe(
      "Relaxed, beautiful photography for second weddings, elopements and intimate celebrations across the SF Bay Area. Short coverage, fair prices, photos in 3 weeks."
    );
    expect(HERO.headline).toBe("This time, it's about the two of you.");
    expect(HERO.ctaLabel).toBe("Check my date");
    expect(HERO.image.path.length).toBeGreaterThan(0);
    expect(HERO.image.a.length).toBeGreaterThan(0);
  });

  it("carries the primary keyword in the hero and opening subheadings", () => {
    expect(HERO.kicker.toLowerCase()).toContain("second wedding photographer");
    expect(HERO.subheadline.toLowerCase()).toContain("second wedding photography");
    expect(OPENING.kicker.toLowerCase()).toContain("second wedding photography");
  });
});

describe("second-weddings packages", () => {
  it("has exactly the three approved packages with Classic most popular", () => {
    expect(PACKAGES.items.map((p) => [p.name, p.price])).toEqual([
      ["Intimate", "$750"],
      ["Classic", "$1,150"],
      ["Full Afternoon", "$1,550"],
    ]);
    const popular = PACKAGES.items.filter((p) => p.popular);
    expect(popular).toHaveLength(1);
    expect(popular[0].name).toBe("Classic");
    for (const p of PACKAGES.items) {
      expect(p.hours.length).toBeGreaterThan(0);
      expect(p.photographers.length).toBeGreaterThan(0);
      expect(p.photos.length).toBeGreaterThan(0);
      expect(p.blurb.length).toBeGreaterThan(0);
    }
  });

  it("spells out what each package includes and the founding rate", () => {
    expect(PACKAGES.includes.length).toBeGreaterThanOrEqual(5);
    expect(PACKAGES.addons.toLowerCase()).toContain("pre-wedding session");
    expect(PACKAGES.foundingRate).toBe(
      "2026 introductory pricing. These rates rise next season."
    );
  });
});

describe("second-weddings proof, steps, faq, cta", () => {
  it("shows a candid strip and no fabricated testimonial", () => {
    expect(SOCIAL_PROOF.images.length).toBeGreaterThanOrEqual(6);
    expect(SOCIAL_PROOF.images.length).toBeLessThanOrEqual(8);
    for (const p of SOCIAL_PROOF.images) {
      expect(p.path.length).toBeGreaterThan(0);
      expect(p.a.length).toBeGreaterThan(0);
    }
    expect(SOCIAL_PROOF.href).toBe("/portfolio");
    expect(TESTIMONIAL).toBeNull();
  });

  it("has three steps and six FAQ items, one routing to the main brand", () => {
    expect(STEPS.items).toHaveLength(3);
    expect(STEPS.items.map((s) => s.n)).toEqual(["01", "02", "03"]);
    expect(FAQ.items).toHaveLength(6);
    const routes = FAQ.items.filter((f) =>
      f.a.includes("Lei Photography Collective")
    );
    expect(routes.length).toBeGreaterThanOrEqual(1);
    expect(FINAL_CTA.secondaryHref).toBe("/portfolio");
    expect(FINAL_CTA.heading).toBe("Ready when you are");
  });
});

describe("second-weddings guardrails", () => {
  it("contains no em dashes", () => {
    expect(SOURCE).not.toMatch(/—/);
  });

  it("never compares to the premium product or reads as a discount", () => {
    for (const banned of ["$3,000", "$2,400", "discount", "smaller budget"]) {
      expect(SOURCE.toLowerCase()).not.toContain(banned.toLowerCase());
    }
  });
});
