import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  BASED_LINE,
  CITY,
  CTA_HREF,
  CTA_LABEL,
  HOME_FAQ,
  HOME_H1,
  OPENING_LINE,
  POSITIONING,
  POSITIONING_SUB,
  RECENT_WEDDINGS,
  SOUTH_BAY_CITIES,
  TAGLINE,
  TESTIMONIALS,
  WEDDING_PORTFOLIO,
  faqPageJsonLd,
} from "@/content/homepage";
import {
  BUSINESS,
  HOME_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
  canonicalOrigin,
  localBusinessJsonLd,
} from "@/content/site";

describe("CTA constants", () => {
  it("match the spec exactly", () => {
    expect(CTA_LABEL).toBe("Check my date");
    expect(CTA_HREF).toBe("/inquire#form");
  });
});

describe("positioning constants", () => {
  it("lead with San Jose, and keep the cover-story line", () => {
    expect(CITY).toBe("San Jose");
    expect(POSITIONING).toBe("Your wedding, shot like the cover story it is.");
    expect(POSITIONING_SUB).toBe(
      "San Jose and South Bay wedding photography for couples who want to be present in their wedding, not stressed about it."
    );
    expect(HOME_H1).toBe("Editorial, romantic wedding photographer in San Jose");
    expect(TAGLINE).toBe("Iconic, intentional and unmistakably you");
    expect(OPENING_LINE).toContain("I’m Raymond Lei, a San Jose wedding photographer");
    expect(BASED_LINE).toBe(
      "Based in San Jose, serving the South Bay and the Bay Area."
    );
    expect(SOUTH_BAY_CITIES).toEqual([
      "San Jose",
      "Milpitas",
      "Santa Clara",
      "Sunnyvale",
      "Los Gatos",
      "Saratoga",
      "Cupertino",
      "Palo Alto",
      "Campbell",
    ]);
  });
});

describe("homepage SEO", () => {
  it("uses the brief title and description, on the www host", () => {
    expect(SITE_TITLE).toBe(
      "Editorial Romantic Wedding Photographer San Jose | Raymond Lei"
    );
    expect(HOME_DESCRIPTION).toBe(
      "Editorial, romantic wedding photography in San Jose and the South Bay, Milpitas to Los Gatos. Calm direction for camera-shy couples. From $2,600."
    );
    expect(SITE_TITLE).not.toMatch(/events & more/i);
    expect(canonicalOrigin("https://leiphotography.co")).toBe(
      "https://www.leiphotography.co"
    );
    expect(canonicalOrigin("http://www.leiphotography.co/")).toBe(
      "https://www.leiphotography.co"
    );
    expect(canonicalOrigin("https://preview.example")).toBe("https://preview.example");
    expect(SITE_URL).not.toBe("https://leiphotography.co");
  });
});

describe("homepage FAQ and schema", () => {
  it("answers the brief questions without an aggregate rating", () => {
    expect(HOME_FAQ.length).toBeGreaterThanOrEqual(5);
    expect(HOME_FAQ.map((item) => item.q).join(" ")).toMatch(/based/i);
    expect(HOME_FAQ.map((item) => item.q).join(" ")).toMatch(/style/i);
    expect(HOME_FAQ.map((item) => item.a).join(" ")).toContain("$2,600");
    expect(HOME_FAQ.map((item) => item.a).join(" ")).toContain("$3,100");
    expect(HOME_FAQ.map((item) => item.a).join(" ")).toContain("$4,000");
    expect(faqPageJsonLd["@type"]).toBe("FAQPage");
    expect(faqPageJsonLd.mainEntity).toHaveLength(HOME_FAQ.length);
    expect(JSON.stringify(localBusinessJsonLd)).not.toContain("aggregateRating");
    expect(localBusinessJsonLd.address.addressLocality).toBe("San Jose");
    expect(localBusinessJsonLd.email).toBe("raymond@leiphotography.co");
    expect(localBusinessJsonLd.sameAs).toContain(BUSINESS.pinterest);
    expect(localBusinessJsonLd.makesOffer.map((offer) => offer.price)).toEqual([
      "2600",
      "3100",
      "4000",
    ]);
    expect(localBusinessJsonLd.areaServed.map((area) => area.name)).toContain(
      "Milpitas"
    );
    expect(localBusinessJsonLd.areaServed.map((area) => area.name)).not.toContain(
      "Berkeley"
    );
  });
});

describe("homepage copy does not mirror the competitor phrases", () => {
  it("rewrites the clouds-inside lines in the page source", () => {
    const source = readFileSync(join(process.cwd(), "src/app/(site)/page.tsx"), "utf8");
    expect(source).not.toContain("emotional moments and a quiet luxury feel");
    expect(source).not.toContain("Perfect Fit");
    expect(source).not.toContain("Detail Oriented Approach");
    expect(source).not.toContain(">Inspiration<");
    expect(source).toContain("Questions couples ask");
    expect(source).toContain("Where I photograph in the South Bay");
    expect(source).toContain("Wedding collections from");
    expect(source).toContain("OPENING_LINE");
    expect(source).toContain("HOME_H1");
  });
});

// The category doors were removed with the weddings-only rebuild: they routed
// into /portfolio/<cat>, and nothing rendered them by then anyway.

describe("recent weddings", () => {
  it("has at least one wedding with 1-3 teaser frames each", () => {
    expect(RECENT_WEDDINGS.length).toBeGreaterThanOrEqual(1);

    // Extract valid set ids from the weddings page's own GallerySet tags, to
    // catch anchors that no set renders: an anchor that doesn't exist is a
    // link that lands on the page and scrolls nowhere, which nothing else
    // would catch. The sets are literal JSX now (see gallery.ts's header),
    // not a content array, so this reads the page source directly.
    const weddingsSource = readFileSync(
      join(process.cwd(), "src/app/(site)/gallery/weddings/page.tsx"),
      "utf8"
    );
    const validSetIds = new Set(
      [...weddingsSource.matchAll(/<GallerySet id="([^"]+)"/g)].map(
        (m) => m[1]
      )
    );
    expect(validSetIds.size).toBeGreaterThan(0); // walker sanity check

    for (const w of RECENT_WEDDINGS) {
      expect(w.href.startsWith("/gallery/weddings#")).toBe(true);

      // Verify the fragment is a real set id
      const fragment = w.href.split("#")[1];
      expect(validSetIds.has(fragment)).toBe(true);

      expect(w.frames.length).toBeGreaterThanOrEqual(1);
      expect(w.frames.length).toBeLessThanOrEqual(3);
      expect(w.title.length).toBeGreaterThan(0);
    }
  });
});

describe("testimonials", () => {
  it("never contains an empty quote or unattributed entry", () => {
    for (const t of TESTIMONIALS) {
      expect(t.pull.trim().length).toBeGreaterThan(0);
      expect(t.quote.trim().length).toBeGreaterThan(0);
      expect(t.names.trim().length).toBeGreaterThan(0);
      expect(t.photo.path.length).toBeGreaterThan(0);
      expect(t.photo.a.length).toBeGreaterThan(0);
    }
  });

  it("features Sargon & Odelya with the culture pull-quote", () => {
    expect(TESTIMONIALS.length).toBeGreaterThanOrEqual(1);
    expect(TESTIMONIALS[0].names).toBe("Sargon & Odelya");
    expect(TESTIMONIALS[0].pull).toContain("critical to our culture");
    expect(TESTIMONIALS[0].quote).toContain("Middle Eastern wedding");
  });
});

describe("wedding portfolio", () => {
  it("has valid row shapes: 1 photo per full, 2 per pair, all with path+alt", () => {
    expect(WEDDING_PORTFOLIO.length).toBeGreaterThanOrEqual(1);
    for (const row of WEDDING_PORTFOLIO) {
      expect(["full", "pair"]).toContain(row.layout);
      expect(row.photos).toHaveLength(row.layout === "full" ? 1 : 2);
      for (const p of row.photos) {
        expect(p.path.length).toBeGreaterThan(0);
        expect(p.a.length).toBeGreaterThan(0);
      }
    }
  });

  it("mirrors the 17 collage tiles (2026-07-21 collage portfolio spec)", () => {
    // The 10-14 density bound belonged to the old stacked-rows section. The
    // homepage now renders these photos as a 17-tile editorial collage with
    // literal <img> tags; this array is the curated mirror of that section.
    const count = WEDDING_PORTFOLIO.reduce((n, r) => n + r.photos.length, 0);
    expect(count).toBe(17);
  });

  // The mirror is maintained by hand: page.tsx writes its <img> tags out
  // literally so the visual editor can swap a src, and this array is the copy
  // the rest of the codebase reads. Counting them is not enough to catch a
  // photo swapped in one place and not the other.
  it("names the same frames the collage actually renders", () => {
    const source = readFileSync(
      join(process.cwd(), "src/app/(site)/page.tsx"),
      "utf8"
    );
    const block = source.slice(
      source.indexOf("<Collage>"),
      source.indexOf("</Collage>")
    );
    const rendered = [...block.matchAll(/src="([^"]+)"/g)].map((m) => m[1]);
    const mirrored = WEDDING_PORTFOLIO.flatMap((r) => r.photos.map((p) => p.path));
    expect(rendered.length).toBe(17);
    expect([...rendered].sort()).toEqual([...mirrored].sort());
  });
});
