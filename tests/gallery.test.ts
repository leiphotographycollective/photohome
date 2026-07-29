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

  // The gallery hub and the three category pages also write their <img> tags
  // out literally now (see src/components/lei/CategoryCards.tsx and
  // src/app/(site)/gallery/*/page.tsx), for the same reason: the visual
  // editor can only swap a src that is a literal string in the page source.
  it("resolve for every local literal image src on the gallery pages", () => {
    const files = [
      "src/components/lei/CategoryCards.tsx",
      "src/app/(site)/gallery/page.tsx",
      "src/app/(site)/gallery/weddings/page.tsx",
      "src/app/(site)/gallery/engagements/page.tsx",
      "src/app/(site)/gallery/events/page.tsx",
    ];
    let total = 0;
    for (const file of files) {
      const source = readFileSync(join(process.cwd(), file), "utf8");
      const srcs = [...source.matchAll(/src="(\/[^"]+)"/g)].map((m) =>
        decodeURIComponent(m[1])
      );
      total += srcs.length;
      for (const s of srcs) {
        expect(existsSync(join(PUBLIC, s)), `${file}: missing ${s}`).toBe(
          true
        );
      }
    }
    expect(total).toBeGreaterThan(0); // walker sanity check
  });
});
