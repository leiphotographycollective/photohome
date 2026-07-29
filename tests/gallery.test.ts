import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { GALLERY } from "@/content/gallery";
import { WEDDING_PORTFOLIO } from "@/content/homepage";
import type { Photo } from "@/content/portfolio";

const PUBLIC = join(process.cwd(), "public");

// GALLERY now carries only the copy behind the hub and the three category
// pages. The photos themselves are literal <img> tags on those pages (and on
// CategoryCards for the hub cards), so the visual editor can swap any of
// them; asserting on paths and photo counts moved with the photos.
describe("gallery categories", () => {
  it("are Weddings, Engagements, Events in that order", () => {
    expect(GALLERY.map((c) => c.id)).toEqual([
      "weddings",
      "engagements",
      "events",
    ]);
    expect(GALLERY.map((c) => c.label)).toEqual([
      "Weddings",
      "Engagements",
      "Events",
    ]);
  });

  it("each carry a heading, both blurbs", () => {
    for (const cat of GALLERY) {
      expect(cat.label.length, cat.id).toBeGreaterThan(0);
      expect(cat.blurb.length, cat.id).toBeGreaterThan(0);
      expect(cat.cardBlurb.length, cat.id).toBeGreaterThan(0);
    }
  });

  // The card is the only way into a category page, so a wrong href strands it.
  it("each link to their own page under /gallery", () => {
    expect(GALLERY.map((c) => c.href)).toEqual([
      "/gallery/weddings",
      "/gallery/engagements",
      "/gallery/events",
    ]);
  });

  // A card is the only way into a category page: there is no other link, nav
  // entry, or sitemap pointing at /gallery/weddings et al. A card whose href
  // points at a route that doesn't exist (e.g. a renamed folder) is a dead
  // end that nothing else in this suite, or the app, would catch.
  it("each link to a route that actually exists", () => {
    for (const cat of GALLERY) {
      const routePath = join(
        process.cwd(),
        "src/app/(site)",
        ...cat.href.split("/").filter(Boolean),
        "page.tsx"
      );
      expect(existsSync(routePath), `${cat.id}: no page at ${cat.href}`).toBe(
        true
      );
    }
  });
});

describe("local image paths", () => {
  const local = (photos: Photo[]) => photos.filter((p) => p.path.startsWith("/"));

  it("resolve to real files for every homepage collage frame", () => {
    for (const p of local(WEDDING_PORTFOLIO.flatMap((r) => r.photos))) {
      expect(existsSync(join(PUBLIC, p.path)), `missing ${p.path}`).toBe(true);
    }
  });

  // The homepage writes most of its <img> tags out literally so the visual
  // editor can swap a src, which means those paths answer to no array. A swap
  // that points at a file that was moved or never existed shows up here.
  it("resolve for every literal image src on the homepage", () => {
    const source = readFileSync(
      join(process.cwd(), "src/app/(site)/page.tsx"),
      "utf8"
    );
    const srcs = [...source.matchAll(/src="(\/[^"]+)"/g)].map((m) =>
      decodeURIComponent(m[1])
    );
    expect(srcs.length).toBeGreaterThan(17); // walker sanity check
    for (const s of srcs) {
      expect(existsSync(join(PUBLIC, s)), `missing ${s}`).toBe(true);
    }
  });
});

// The Ship Studio visual editor can only swap an image whose src is a literal
// string in the page source. A computed src (src={img(...)}, a template
// literal, a variable) renders correctly and looks fine in review, but the
// photo silently stops being swappable. Nothing else in this suite would
// notice, so this is the guard that keeps the gallery editable.
describe("gallery images stay swappable", () => {
  const PAGES = [
    "src/app/(site)/gallery/page.tsx",
    "src/app/(site)/gallery/weddings/page.tsx",
    "src/app/(site)/gallery/engagements/page.tsx",
    "src/app/(site)/gallery/events/page.tsx",
    "src/components/lei/CategoryCards.tsx",
  ];

  it("never computes an img src on a gallery page", () => {
    for (const page of PAGES) {
      const source = readFileSync(join(process.cwd(), page), "utf8");
      const computed = [...source.matchAll(/src=\{/g)];
      expect(computed.length, `${page} computes an img src`).toBe(0);
    }
  });

  it("resolves every literal image src to a real file", () => {
    let total = 0;
    let cdn = 0;
    for (const page of PAGES) {
      const source = readFileSync(join(process.cwd(), page), "utf8");
      // Every literal src, local or absolute. The Engagements page and the
      // Engagements card cover on the hub both point at the same CDN-hosted
      // photo (an absolute squarespace-cdn.com URL) instead of a file under
      // public/, so those two are counted toward the total but not walked
      // against the filesystem; every other src here is a local /images/...
      // path and must resolve to a real file.
      const srcs = [...source.matchAll(/src="([^"]+)"/g)].map((m) => m[1]);
      expect(srcs.length, `${page} renders no images`).toBeGreaterThan(0);
      for (const s of srcs) {
        if (s.startsWith("/")) {
          const decoded = decodeURIComponent(s);
          expect(
            existsSync(join(PUBLIC, decoded)),
            `missing ${decoded} in ${page}`
          ).toBe(true);
        } else {
          expect(
            s.startsWith("https://images.squarespace-cdn.com/"),
            `unexpected absolute src ${s} in ${page}`
          ).toBe(true);
          cdn++;
        }
      }
      total += srcs.length;
    }
    // Every gallery photo, counted once: 1 hub hero + 3 card covers + 41
    // weddings (40 grid + 1 feature) + 1 engagement + 18 events = 64. Two of
    // those (the Engagements grid frame and its card cover on the hub) share
    // the one CDN photo above; the other 62 are local and were resolved
    // against public/ in the loop. Update both numbers deliberately when
    // frames are added.
    expect(cdn).toBe(2);
    expect(total).toBe(64);
  });

  // Task 5 wrote the card labels into CategoryCards so each card's src could
  // sit beside its text. That is the one place gallery copy lives outside
  // src/content, so pin it to GALLERY here or the two can drift apart.
  it("renders a card for every category, labelled to match", () => {
    const source = readFileSync(
      join(process.cwd(), "src/components/lei/CategoryCards.tsx"),
      "utf8"
    );
    for (const cat of GALLERY) {
      expect(source, `no card for ${cat.id}`).toContain(`href="${cat.href}"`);
      expect(source, `card label for ${cat.id}`).toContain(
        `label="${cat.label}"`
      );
      expect(source, `card blurb for ${cat.id}`).toContain(
        `blurb="${cat.cardBlurb}"`
      );
    }
  });
});
