// One-off generator for the /gallery/events placeholder frames.
//
// Each slot is its own uniquely named .jpg at the path events.ts already
// points at, so replacing one is a drag and drop over the same filename with
// no code change. The slot name is drawn into the image so the boxes are
// tellable apart in a browser.
//
// Re-run with: node scripts/make-event-placeholders.mjs
// Safe to re-run: it overwrites in place.

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import sharp from "sharp";

const PUBLIC = join(process.cwd(), "public");

// Matches the flat tone used by the existing band placeholders.
const FILL = "#E8E4DE";
const TEXT = "#8C857B";

/** Portrait 2:3 and landscape 3:2, the two shapes the real frames come in. */
const PORTRAIT = { w: 1200, h: 1800 };
const LANDSCAPE = { w: 1800, h: 1200 };

/** Slots alternate orientation so the scaffolded masonry has the rhythm a
 *  real one would, instead of six identical boxes down a column. */
const ORIENTATIONS = [LANDSCAPE, PORTRAIT, PORTRAIT, LANDSCAPE, PORTRAIT, LANDSCAPE];

const GROUPS = ["event-one", "event-two", "event-three"];

/** Flat rectangle with the slot name centred in it. */
async function placeholder(path, { w, h }, label) {
  const fontSize = Math.round(Math.min(w, h) / 14);
  const svg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
       <rect width="${w}" height="${h}" fill="${FILL}"/>
       <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
             font-family="Helvetica, Arial, sans-serif" font-size="${fontSize}"
             letter-spacing="${Math.round(fontSize / 8)}" fill="${TEXT}">${label}</text>
     </svg>`
  );
  const out = join(PUBLIC, path);
  await mkdir(dirname(out), { recursive: true });
  const buffer = await sharp(svg).jpeg({ quality: 82 }).toBuffer();
  await writeFile(out, buffer);
  return path;
}

const written = [];

for (const group of GROUPS) {
  for (let i = 0; i < 6; i++) {
    const name = `${group}-${i + 1}`;
    written.push(
      await placeholder(
        `/images/portfolio/events/${group}/${name}.jpg`,
        ORIENTATIONS[i],
        name
      )
    );
  }
}

written.push(
  await placeholder(
    "/images/portfolio/events/events-card-cover.jpg",
    PORTRAIT,
    "events-card-cover"
  )
);

console.log(`wrote ${written.length} placeholders`);
for (const p of written) console.log(`  ${p}`);
