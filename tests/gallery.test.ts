import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { GALLERY, GALLERY_FEATURE, GALLERY_HERO } from "@/content/gallery";
import { WEDDING_PORTFOLIO } from "@/content/homepage";
import type { Photo } from "@/content/portfolio";

const PUBLIC = join(process.cwd(), "public");

describe("gallery categories", () => {
  it("are Weddings, Couples, Engagements in that order", () => {
    expect(GALLERY.map((c) => c.id)).toEqual([
      "weddings",
      "couples",
      "engagements",
    ]);
    expect(GALLERY.map((c) => c.label)).toEqual([
      "Weddings",
      "Couples",
      "Engagements",
    ]);
  });

  it("each carry a heading, a blurb and at least one photo", () => {
    for (const cat of GALLERY) {
      expect(cat.label.length, cat.id).toBeGreaterThan(0);
      expect(cat.blurb.length, cat.id).toBeGreaterThan(0);
      // An empty category would render a heading over nothing.
      expect(cat.photos.length, cat.id).toBeGreaterThanOrEqual(1);
    }
  });

  it("every photo has a path and real alt text", () => {
    for (const cat of GALLERY) {
      for (const p of cat.photos) {
        expect(p.path.length, `${cat.id}: empty path`).toBeGreaterThan(0);
        expect(p.a.length, `${cat.id}: ${p.path} has no alt`).toBeGreaterThan(0);
      }
    }
  });

  // Two frames of the same moment ship as separate files in this library
  // (sargon-odelya-08 and -23 are one photo; -22 and -34 are one walk), so a
  // path landing in a category twice is the failure mode worth guarding.
  it("never repeats a photo inside a category", () => {
    for (const cat of GALLERY) {
      const paths = cat.photos.map((p) => p.path);
      expect(new Set(paths).size, `${cat.id} has a duplicate frame`).toBe(
        paths.length
      );
    }
  });

  it("keeps Weddings dense enough for the four-column masonry", () => {
    const weddings = GALLERY.find((c) => c.id === "weddings");
    expect(weddings?.photos.length).toBeGreaterThanOrEqual(8);
  });
});

describe("wedding sets", () => {
  const weddings = GALLERY.find((c) => c.id === "weddings")!;

  it("splits Weddings into the three shot weddings", () => {
    expect(weddings.sets?.map((s) => s.id)).toEqual([
      "sargon-odelya",
      "miranda-danny",
      "trang",
    ]);
    expect(weddings.sets?.map((s) => s.name)).toEqual([
      "Sargon & Odelya",
      "Miranda & Danny",
      "Trang",
    ]);
  });

  it("gives every set a heading and enough frames to fill a grid", () => {
    for (const set of weddings.sets ?? []) {
      expect(set.name.length, set.id).toBeGreaterThan(0);
      expect(set.photos.length, set.id).toBeGreaterThanOrEqual(4);
    }
  });

  // The category's flat list is derived from the sets, so a frame appearing in
  // two sets would render twice on the page.
  it("never repeats a frame across sets, and flattens to all of them", () => {
    const paths = (weddings.sets ?? []).flatMap((s) =>
      s.photos.map((p) => p.path)
    );
    expect(new Set(paths).size).toBe(paths.length);
    expect(weddings.photos.map((p) => p.path)).toEqual(paths);
  });

  it("keeps the page's two standalone frames out of the grids", () => {
    const paths = weddings.photos.map((p) => p.path);
    expect(paths).not.toContain(GALLERY_HERO.path);
    expect(paths).not.toContain(GALLERY_FEATURE.photo.path);
  });

  it("draws every wedding frame from the wedding image directories", () => {
    for (const p of weddings.photos) {
      expect(p.path, p.path).toMatch(/^\/images\/portfolio\/weddings\//);
    }
  });
});

// 42 hand-written paths across three new directories: a typo in one of them is
// a broken image in production that nothing else here would catch.
describe("local image paths", () => {
  const local = (photos: Photo[]) => photos.filter((p) => p.path.startsWith("/"));

  it("resolve to real files under public/ for every gallery frame", () => {
    const photos = [
      ...GALLERY.flatMap((c) => c.photos),
      GALLERY_HERO,
      GALLERY_FEATURE.photo,
    ];
    for (const p of local(photos)) {
      expect(existsSync(join(PUBLIC, p.path)), `missing ${p.path}`).toBe(true);
    }
  });

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
