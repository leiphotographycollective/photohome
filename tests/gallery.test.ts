import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, sep } from "node:path";
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
  // Discovered rather than hand-listed, so a gallery page added later (e.g.
  // /gallery/portraits) is automatically pulled into every check below
  // instead of silently sitting outside them. CategoryCards.tsx can't be
  // found this way, since it's a component, not a route, so it's added back
  // in explicitly.
  //
  // fs.globSync exists at the Node version this repo runs on, but this
  // project's @types/node (^20) doesn't declare it, so tsc rejects it. A
  // recursive readdirSync walk needs no new typings and does the same job.
  const GALLERY_DIR = "src/app/(site)/gallery";
  const discoveredPages = (
    readdirSync(join(process.cwd(), GALLERY_DIR), {
      recursive: true,
    }) as string[]
  )
    .filter((p) => p.endsWith("page.tsx"))
    .map((p) => `${GALLERY_DIR}/${p.split(sep).join("/")}`);

  // The four pages this suite is known to depend on today. Not used to build
  // PAGES (that comes from the glob above) — only to prove the glob still
  // finds all of them, so a change to the pattern or the folder layout that
  // silently stopped matching a page would fail loudly here instead of
  // quietly shrinking every check below.
  const KNOWN_GALLERY_PAGES = [
    "src/app/(site)/gallery/page.tsx",
    "src/app/(site)/gallery/weddings/page.tsx",
    "src/app/(site)/gallery/engagements/page.tsx",
    "src/app/(site)/gallery/events/page.tsx",
  ];

  it("discovers every known gallery page on disk", () => {
    for (const known of KNOWN_GALLERY_PAGES) {
      expect(discoveredPages, `walk of ${GALLERY_DIR} missed ${known}`).toContain(
        known
      );
    }
  });

  const PAGES = [...discoveredPages, "src/components/lei/CategoryCards.tsx"];

  // The three category grids, i.e. PAGES minus the hub page (its one hero
  // image isn't a grid) and CategoryCards (its three card covers aren't
  // either). Filtered by shape rather than sliced by index so reordering
  // PAGES can't silently widen or narrow this list.
  const CATEGORY_PAGES = PAGES.filter(
    (p) => p.includes("/gallery/") && p !== "src/app/(site)/gallery/page.tsx"
  );

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
    // weddings (40 grid + 1 feature) + 1 engagement + 41 events = 87. Two of
    // those (the Engagements grid frame and its card cover on the hub) share
    // the one CDN photo above; the other 85 are local and were resolved
    // against public/ in the loop. Update both numbers deliberately when
    // frames are added.
    //
    // This fixed count is a deliberate second net, not a duplicate of the
    // "never computes an img src" check above. That check regexes for
    // `src={`, which a computed src written with a stray space (`src =
    // {img(...)}`) would slip past; this count would still catch it, since a
    // reformatted tag like that no longer matches `src="..."` and total would
    // drop below 87. It also catches a photo simply being deleted from a
    // page without the src becoming computed at all.
    expect(cdn).toBe(2);
    expect(total).toBe(87);
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

  // Every grid photo on the three category pages is content and needs real
  // alt text. CategoryCards.tsx is deliberately excluded: its three card
  // covers carry alt="" on purpose, because each card's visible label and
  // blurb already say where the link goes, and a described photo would make
  // a screen reader announce the scene, the label and the blurb as one
  // run-on link name.
  it("gives every category-page photo real alt text", () => {
    for (const page of CATEGORY_PAGES) {
      const source = readFileSync(join(process.cwd(), page), "utf8");
      expect(source, `${page} has an img with empty alt`).not.toMatch(
        /alt=""/
      );
      // Not empty alt isn't the same as having alt at all: a tag missing the
      // attribute entirely passes the check above too. Counting img tags
      // against alt= attributes catches a swap that drops the attribute,
      // since with no lint step in this project, nothing else would.
      const imgCount = [...source.matchAll(/<img\b/g)].length;
      const altCount = [...source.matchAll(/\balt=/g)].length;
      expect(altCount, `${page} has an <img> with no alt attribute`).toBe(
        imgCount
      );
    }
  });

  // This library ships two edits of the same moment as separate files
  // (sargon-odelya-08.jpg and -23.jpg are one photo; -22 and -34 are one
  // walk), so a frame landing in a grid twice is a real failure mode, not a
  // hypothetical one.
  it("never repeats a photo within one category grid", () => {
    for (const page of CATEGORY_PAGES) {
      const source = readFileSync(join(process.cwd(), page), "utf8");
      const srcs = [...source.matchAll(/src="([^"]+)"/g)].map((m) => m[1]);
      expect(new Set(srcs).size, `${page} repeats a photo`).toBe(srcs.length);
    }
  });

  // The hub hero and the weddings feature photo are each shown large and
  // alone. A card cover reusing either would show the same photo twice on
  // one journey through the site.
  it("never reuses the hub hero or weddings feature as a card cover", () => {
    const hubSource = readFileSync(
      join(process.cwd(), "src/app/(site)/gallery/page.tsx"),
      "utf8"
    );
    const heroSrcs = [...hubSource.matchAll(/src="([^"]+)"/g)].map(
      (m) => m[1]
    );
    expect(heroSrcs.length, "hub page should render exactly one hero image").toBe(
      1
    );
    const [heroSrc] = heroSrcs;

    const weddingsSource = readFileSync(
      join(process.cwd(), "src/app/(site)/gallery/weddings/page.tsx"),
      "utf8"
    );
    // Match whole <img ...> tags rather than searching near "data-feature",
    // so the src pulled out is the one from the same tag as the attribute
    // regardless of attribute order.
    // [^>] already matches newlines regardless of the dotAll flag, since it's
    // a negated character class rather than `.`, so no `s` flag is needed
    // (and the project's TS target doesn't support one on regex literals).
    const imgTags = [...weddingsSource.matchAll(/<img\b[^>]*>/g)].map(
      (m) => m[0]
    );
    const featureTags = imgTags.filter((tag) => /\bdata-feature\b/.test(tag));
    expect(
      featureTags.length,
      "expected exactly one <img data-feature> on the weddings page"
    ).toBe(1);
    const featureSrcMatch = featureTags[0].match(/src="([^"]+)"/);
    expect(featureSrcMatch, "feature img has no src").toBeTruthy();
    const featureSrc = featureSrcMatch![1];

    const cardsSource = readFileSync(
      join(process.cwd(), "src/components/lei/CategoryCards.tsx"),
      "utf8"
    );
    const cardSrcs = [...cardsSource.matchAll(/src="([^"]+)"/g)].map(
      (m) => m[1]
    );
    expect(cardSrcs.length, "expected three card covers").toBe(3);
    for (const s of cardSrcs) {
      expect(s, `CategoryCards.tsx reuses the hub hero (${heroSrc})`).not.toBe(
        heroSrc
      );
      expect(
        s,
        `CategoryCards.tsx reuses the weddings feature (${featureSrc})`
      ).not.toBe(featureSrc);
    }
  });
});
