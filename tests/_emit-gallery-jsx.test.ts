// One-off generator: writes the literal <img> JSX for each gallery page,
// read straight from the content arrays that used to render them.
//
// Why: the visual editor can only swap an image whose src is a literal string
// in the page source, so 59 frames had to move from .map() calls into
// hand-written tags. Retyping 59 paths, alt strings and ratios by hand would
// drift, and a wrong alt or path is invisible until production. This writes
// them instead.
//
// It is a test file only because vitest is the one runner here that resolves
// the "@/" alias. Task 5 deletes it: it reads content fields that this change
// removes, so it stops working the moment its job is done.
//
// Run with: npx vitest run tests/_emit-gallery-jsx.test.ts
// Output:   .superpowers/sdd/gallery-jsx/<page>.txt

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { expect, it } from "vitest";
import { GALLERY } from "@/content/gallery";
import { RATIO_CSS, img, type Photo } from "@/content/portfolio";

const OUT = ".superpowers/sdd/gallery-jsx";

/** Escape a string for a JSX attribute in double quotes. */
function attr(s: string): string {
  return s.replace(/"/g, "&quot;");
}

/** Column count for a grid of n frames, matching the retired columnsFor(). */
function cols(n: number): number {
  return n >= 7 ? 4 : n >= 4 ? 3 : n >= 2 ? 2 : 1;
}

/** The tile for one frame, indented to sit inside a set block. */
function tile(p: Photo, indent: number): string {
  const pad = " ".repeat(indent);
  const aspect = p.ratio !== undefined ? String(p.ratio) : RATIO_CSS[p.r];
  // Run the path through img() exactly as the retired grid did, at the same
  // 1200 width. Local paths (leading "/") come back unchanged, but a Squarespace
  // CDN path has no leading slash and img() prefixes it with the CDN base.
  // Emitting p.path raw would turn those into broken relative URLs.
  const src = img(p.path, 1200);
  return [
    `${pad}<CollageTile>`,
    `${pad}  {/* eslint-disable-next-line @next/next/no-img-element */}`,
    `${pad}  <img`,
    `${pad}    src="${src}"`,
    `${pad}    alt="${attr(p.a)}"`,
    `${pad}    loading="lazy"`,
    `${pad}    style={frame("${aspect}")}`,
    `${pad}  />`,
    `${pad}</CollageTile>`,
  ].join("\n");
}

it("writes the gallery JSX", () => {
  mkdirSync(OUT, { recursive: true });
  const counts: string[] = [];

  for (const cat of GALLERY) {
    const blocks: string[] = [];
    if (cat.sets) {
      cat.sets.forEach((set, i) => {
        blocks.push(
          `        <GallerySet id="${set.id}" name="${attr(set.name)}"${
            i === 0 ? " first" : ""
          } columns={${cols(set.photos.length)}}>`,
          set.photos.map((p) => tile(p, 10)).join("\n"),
          `        </GallerySet>`
        );
      });
    } else {
      blocks.push(
        `        <GalleryGrid columns={${cols(cat.photos.length)}}>`,
        cat.photos.map((p) => tile(p, 10)).join("\n"),
        `        </GalleryGrid>`
      );
    }

    // The section cap follows the widest set, not the total frame count.
    const widest = cat.sets
      ? Math.max(...cat.sets.map((s) => s.photos.length))
      : cat.photos.length;
    const cap =
      widest >= 7 ? "omit the cap prop" : widest >= 2 ? "cap={1180}" : "cap={560}";

    const header = `// ${cat.id}: ${cat.photos.length} frames\n// CategoryGallery: ${cap}\n\n`;
    writeFileSync(join(OUT, `${cat.id}.txt`), header + blocks.join("\n") + "\n");
    counts.push(`${cat.id}=${cat.photos.length}`);
  }

  // Fails loudly with the real counts if the content is not what this plan
  // assumes, instead of quietly emitting the wrong number of frames.
  expect(counts.join(" ")).toBe("weddings=40 engagements=1 events=18");
});
