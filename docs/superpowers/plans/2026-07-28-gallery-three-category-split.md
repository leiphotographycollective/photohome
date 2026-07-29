# Gallery Three-Category Split Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the single `/gallery` page into a hub of three cards (Weddings, Engagements, Events) linking to `/gallery/weddings`, `/gallery/engagements` and `/gallery/events`, with the new Events portfolio scaffolded as swappable placeholder images.

**Architecture:** The grid rendering moves out of the page file into a shared `CategoryGallery` component driven by the existing `GalleryCategory` type. Events is modelled as just another category that happens to use the same optional `sets` field Weddings already uses, so it renders through the identical code path with no second implementation. Three thin `page.tsx` files under `src/app/(site)/gallery/` consume that component.

**Tech Stack:** Next.js 16.2.9 App Router (React Server Components, static routes, no dynamic params), TypeScript, vitest, `sharp` for one-off placeholder generation.

## Global Constraints

These apply to every task. `tests/voice.test.ts` and `tests/no-em-dash.test.ts` enforce the last two automatically.

- **Read the Next.js docs before writing route code.** `AGENTS.md` requires it: this is Next 16.2.9 and its conventions differ from older training data. The relevant file is `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/page.md`. Everything here is a static route, so no `params` or `searchParams` are needed anywhere.
- **No em dashes** in any string in `src/content/**`. Photo `a` (alt text) and `path` fields are exempt.
- **Copy is first person, as Raymond** (I / me / my), never third person and never the retired formal register listed in `tests/voice.test.ts`.
- **Never delete a photo from `src/content/portfolio.ts`.** Unlinking it from the gallery is the mechanism for removing it from a page.
- **All new content strings live in `src/content/`**, never inline in a page component. Pages read content; they do not hold it.
- **Run the whole suite with `npm test`.** There is no watch mode configured; `npm test` runs `vitest run` once.
- Existing style vocabulary comes from `src/components/lei/tokens.ts` (`SERIF`, `GOLD`, `MUTED`, `CREAM`, `INK`, `cream()`, `ink()`, `kicker()`, `pill()`). Do not hand-roll colors or type scales.

## File Structure

**Created**

| File | Responsibility |
| --- | --- |
| `src/content/events.ts` | The three event sets and their photos. The swap surface Raymond edits. |
| `src/components/lei/CategoryGallery.tsx` | Renders one category's photos: a single masonry, or one labelled masonry per set. Owns the column-count and max-width heuristics. |
| `src/components/lei/CategoryCards.tsx` | Renders the hub's row of three linked cards. |
| `src/components/lei/CategoryHeader.tsx` | The compact dark title band at the top of each category page. |
| `src/components/lei/GalleryCta.tsx` | The marquee, booking headline, Inquire pill and footer that close all four gallery pages. |
| `src/app/(site)/gallery/weddings/page.tsx` | The weddings spread, plus the feature photo and testimonial. |
| `src/app/(site)/gallery/engagements/page.tsx` | The engagements spread. |
| `src/app/(site)/gallery/events/page.tsx` | The events spread. |
| `scripts/make-event-placeholders.mjs` | One-off generator for the 19 placeholder JPEGs. Committed so the slots can be regenerated or extended. |
| `tests/events.test.ts` | Covers the new events content and its image paths. |

**Modified**

| File | Change |
| --- | --- |
| `src/content/gallery.ts` | Add `href`, `cover`, `cardBlurb` to `GalleryCategory`. Replace Couples with Events. |
| `src/app/(site)/gallery/page.tsx` | Becomes the hub: hero, cards, CTA, footer. |
| `src/content/nav.ts` | `/gallery#engagements` becomes `/gallery/engagements`. |
| `src/components/lei/HeaderNav.tsx` | Fix the now-wrong comment about the hash child never matching. |
| `src/content/homepage.ts` | Point each `RECENT_WEDDINGS.href` at its own set anchor. |
| `src/app/sitemap.ts` | Add the three new URLs. |
| `tests/gallery.test.ts` | Rewrite for the new category order and hub shape. |
| `tests/nav.test.ts` | Update the expected `WEDDINGS_MENU` hrefs. |
| `tests/no-em-dash.test.ts` | Register the `events` module. |

**Task order rationale:** placeholders first (Task 1) because `events.ts` references those exact paths and `tests/events.test.ts` asserts they exist on disk; content next (Tasks 2 and 3) because components consume the types; components (Tasks 4, 5, 6) before the pages that render them (Tasks 7 and 8); link fallout last (Task 9) once every destination it points at exists.

---

### Task 1: Generate the event placeholder images

**Files:**
- Create: `scripts/make-event-placeholders.mjs`
- Create (generated): `public/images/portfolio/events/events-card-cover.jpg`
- Create (generated): `public/images/portfolio/events/event-one/event-one-{1..6}.jpg`
- Create (generated): `public/images/portfolio/events/event-two/event-two-{1..6}.jpg`
- Create (generated): `public/images/portfolio/events/event-three/event-three-{1..6}.jpg`

**Interfaces:**
- Consumes: nothing.
- Produces: 19 files on disk at the exact paths above. Task 2 hard-codes these paths in `src/content/events.ts`; Task 3's test asserts each one exists.

**Context:** `sharp` is already installed (Next.js pulls it in for image optimization) so nothing needs adding to `package.json`. Each placeholder has its slot name rendered into the image so the boxes are tellable apart in a browser, which is the whole point of giving each one its own name. Existing placeholders in this repo are flat `#E8E4DE` rectangles (see `public/images/placeholders/band-gallery-1.svg`); these match that tone.

- [ ] **Step 1: Write the generator script**

Create `scripts/make-event-placeholders.mjs`:

```js
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
```

- [ ] **Step 2: Run the generator**

Run: `node scripts/make-event-placeholders.mjs`

Expected: `wrote 19 placeholders` followed by 19 indented paths, ending with `/images/portfolio/events/events-card-cover.jpg`.

- [ ] **Step 3: Verify the files exist and are real JPEGs**

Run: `node -e "const{readdirSync,statSync}=require('fs');for(const g of ['event-one','event-two','event-three']){const d='public/images/portfolio/events/'+g;const f=readdirSync(d);console.log(g,f.length,f.every(n=>statSync(d+'/'+n).size>1000)?'ok':'TOO SMALL')}"`

Expected: three lines, each `event-one 6 ok`, `event-two 6 ok`, `event-three 6 ok`.

- [ ] **Step 4: Commit**

```bash
git add scripts/make-event-placeholders.mjs public/images/portfolio/events/event-one public/images/portfolio/events/event-two public/images/portfolio/events/event-three public/images/portfolio/events/events-card-cover.jpg
git commit -m "Scaffold named placeholder frames for the events gallery"
```

---

### Task 2: Add the events content module

**Files:**
- Create: `src/content/events.ts`
- Create: `tests/events.test.ts`

**Interfaces:**
- Consumes: `GallerySet` and `GalleryCategory` from `@/content/gallery` (both already exported there today), `Photo` from `@/content/portfolio`, and the 19 image paths from Task 1.
- Produces:
  - `export const EVENT_SETS: GallerySet[]`, three sets with ids `event-one`, `event-two`, `event-three`.
  - `export const EVENTS_CARD_COVER: Photo`, the hub card image.
  - `export const EVENTS_BLURB: string`, the category page blurb.
  - `export const EVENTS_CARD_BLURB: string`, the card face line.

  Task 3 imports all four to build the Events entry in `GALLERY`.

**Context:** `events.ts` imports the `GallerySet` type from `gallery.ts`, and in Task 3 `gallery.ts` imports values back from `events.ts`. That is deliberate and safe: the type direction uses `import type`, which TypeScript erases entirely, so no cycle exists at runtime. Do not "fix" it by duplicating the type or converting it to a value import.

`GallerySet` is `{ id: string; name: string; photos: Photo[] }`, already exported from `src/content/gallery.ts`. `Photo` is `{ path: string; a: string; r: Ratio; ratio?: number }` where `r` is one of `"p" | "t" | "l" | "s"`. When `ratio` is present the grid uses it verbatim; the grid sets `aspectRatio: auto <ratio>`, so a wrong value only costs a small reflow once the file decodes, never a squashed photo.

Event names are deliberately obvious placeholders so they cannot ship unnoticed.

- [ ] **Step 1: Write the failing test**

Create `tests/events.test.ts`:

```ts
import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  EVENTS_BLURB,
  EVENTS_CARD_BLURB,
  EVENTS_CARD_COVER,
  EVENT_SETS,
} from "@/content/events";

const PUBLIC = join(process.cwd(), "public");

describe("event sets", () => {
  it("holds three events in order", () => {
    expect(EVENT_SETS.map((s) => s.id)).toEqual([
      "event-one",
      "event-two",
      "event-three",
    ]);
  });

  it("gives every event a name and six frames", () => {
    for (const set of EVENT_SETS) {
      expect(set.name.length, set.id).toBeGreaterThan(0);
      expect(set.photos.length, set.id).toBe(6);
    }
  });

  it("gives every frame a path and real alt text", () => {
    for (const set of EVENT_SETS) {
      for (const p of set.photos) {
        expect(p.path.length, `${set.id}: empty path`).toBeGreaterThan(0);
        expect(p.a.length, `${set.id}: ${p.path} has no alt`).toBeGreaterThan(0);
      }
    }
  });

  it("never repeats a frame across events", () => {
    const paths = EVENT_SETS.flatMap((s) => s.photos.map((p) => p.path));
    expect(new Set(paths).size).toBe(paths.length);
  });

  // 19 hand-written paths: a typo in one of them is a broken image in
  // production that nothing else here would catch.
  it("resolves every frame and the card cover to a real file", () => {
    const paths = [
      ...EVENT_SETS.flatMap((s) => s.photos.map((p) => p.path)),
      EVENTS_CARD_COVER.path,
    ];
    expect(paths.length).toBe(19); // walker sanity check
    for (const path of paths) {
      expect(existsSync(join(PUBLIC, path)), `missing ${path}`).toBe(true);
    }
  });

  it("has copy for the card and the category page", () => {
    expect(EVENTS_BLURB.length).toBeGreaterThan(0);
    expect(EVENTS_CARD_BLURB.length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run tests/events.test.ts`

Expected: FAIL. The error is a resolution failure on `@/content/events`, something like `Failed to resolve import "@/content/events"`.

- [ ] **Step 3: Write the content module**

Create `src/content/events.ts`:

```ts
// The event portfolio behind /gallery/events.
//
// Every frame here is a placeholder. Each one is a uniquely named .jpg at the
// path this file already points at, so swapping in a real photo is a drag and
// drop over the same filename with no code change. Regenerate or extend the
// set with: node scripts/make-event-placeholders.mjs
//
// Two things to update when the real frames land:
//   1. `name` on each set, and the ids to match. "Event One" is a deliberate
//      placeholder so it cannot ship unnoticed.
//   2. `a` (alt text) on every frame, which is what screen readers announce
//      and what the gallery test checks for emptiness, not accuracy.
// `ratio` only reserves height before the file decodes, so a stale value
// after a swap costs a small reflow, never a squashed photo.

import type { GallerySet } from "@/content/gallery";
import type { Photo } from "@/content/portfolio";

/** Portrait 2:3 and landscape 3:2, alternating, so the scaffolded masonry has
 *  the rhythm a real one would. Mirrors ORIENTATIONS in the generator script. */
const SHAPES: Array<Pick<Photo, "r" | "ratio">> = [
  { r: "l", ratio: 1.5 },
  { r: "p", ratio: 0.6667 },
  { r: "p", ratio: 0.6667 },
  { r: "l", ratio: 1.5 },
  { r: "p", ratio: 0.6667 },
  { r: "l", ratio: 1.5 },
];

/** Six numbered slots for one event, all pointing at generated placeholders. */
function slots(group: string, eventName: string): Photo[] {
  return SHAPES.map((shape, i) => ({
    path: `/images/portfolio/events/${group}/${group}-${i + 1}.jpg`,
    a: `Placeholder frame ${i + 1} for ${eventName}`,
    ...shape,
  }));
}

export const EVENT_SETS: GallerySet[] = [
  { id: "event-one", name: "Event One", photos: slots("event-one", "Event One") },
  { id: "event-two", name: "Event Two", photos: slots("event-two", "Event Two") },
  {
    id: "event-three",
    name: "Event Three",
    photos: slots("event-three", "Event Three"),
  },
];

/** The frame on the Events card on /gallery. */
export const EVENTS_CARD_COVER: Photo = {
  path: "/images/portfolio/events/events-card-cover.jpg",
  a: "Placeholder cover frame for the events gallery",
  r: "p",
  ratio: 0.6667,
};

/** Heads /gallery/events. */
export const EVENTS_BLURB =
  "Galas, mixers, award nights. I work the room so you get to be in it.";

/** One line on the Events card on /gallery. */
export const EVENTS_CARD_BLURB = "Galas, panels, and the parties after.";
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run tests/events.test.ts`

Expected: PASS, 6 tests.

- [ ] **Step 5: Register the module with the em-dash guard**

In `tests/no-em-dash.test.ts`, add the import alongside the others at the top:

```ts
import * as events from "@/content/events";
```

and add it to the `modules` map (after the `gallery` entry):

```ts
    gallery,
    events,
```

- [ ] **Step 6: Run the full suite**

Run: `npm test`

Expected: PASS. The new `no-em-dash > events strings are em-dash free` test appears and passes. Every previously passing test still passes; nothing in this task touched existing content.

- [ ] **Step 7: Commit**

```bash
git add src/content/events.ts tests/events.test.ts tests/no-em-dash.test.ts
git commit -m "Add the events content module"
```

---

### Task 3: Restructure the gallery categories

**Files:**
- Modify: `src/content/gallery.ts`
- Modify: `tests/gallery.test.ts`

**Interfaces:**
- Consumes: `EVENT_SETS`, `EVENTS_CARD_COVER`, `EVENTS_BLURB`, `EVENTS_CARD_BLURB` from Task 2.
- Produces: `GalleryCategory` gains three required fields, and `GALLERY` becomes three categories:

```ts
export interface GalleryCategory {
  id: string;
  label: string;
  blurb: string;
  /** Where the hub card links: "/gallery/weddings". */
  href: string;
  /** The frame on the hub card. */
  cover: Photo;
  /** One short line on the card face, shorter than `blurb`. */
  cardBlurb: string;
  sets?: GallerySet[];
  photos: Photo[];
}
```

  `GALLERY[0]` is weddings, `[1]` engagements, `[2]` events. Tasks 5, 6, 7 and 8 all read these.

**Context:** Couples is dropped. Its three frames (`PHOTOS.coastalCandid`, `PHOTOS.coastal`, `PHOTOS.coastKiss`) stay in `portfolio.ts` untouched and are still used elsewhere on the site; they are simply no longer referenced here.

Card covers, and why each is safe:
- Weddings: `pick(SARGON_ODELYA_SELECT, "so-select-300.jpg")`, the bride lifting her cathedral veil. Portrait, and it is not `GALLERY_HERO` (`so-select-636.jpg`) or `GALLERY_FEATURE.photo` (`miranda-danny-14.jpg`), so the hub does not show the same frame twice.
- Engagements: `PHOTOS.proposal`. This is also the category's only photo, so it appears on the card and again in the grid. That repeat is accepted; see the "Known gap" section of the spec.
- Events: `EVENTS_CARD_COVER`.

- [ ] **Step 1: Write the failing test**

Replace the `describe("gallery categories", ...)` block in `tests/gallery.test.ts` (lines 10 to 58) with:

```ts
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

  it("each carry a heading, both blurbs, a cover and at least one photo", () => {
    for (const cat of GALLERY) {
      expect(cat.label.length, cat.id).toBeGreaterThan(0);
      expect(cat.blurb.length, cat.id).toBeGreaterThan(0);
      expect(cat.cardBlurb.length, cat.id).toBeGreaterThan(0);
      expect(cat.cover.path.length, cat.id).toBeGreaterThan(0);
      expect(cat.cover.a.length, `${cat.id} cover has no alt`).toBeGreaterThan(0);
      // An empty category would render a heading over nothing.
      expect(cat.photos.length, cat.id).toBeGreaterThanOrEqual(1);
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

  // The hub hero and the weddings feature are rendered standalone. A card
  // reusing one of them would show the same frame twice on the same journey.
  it("no card cover reuses the hero or the feature frame", () => {
    for (const cat of GALLERY) {
      expect(cat.cover.path, cat.id).not.toBe(GALLERY_HERO.path);
      expect(cat.cover.path, cat.id).not.toBe(GALLERY_FEATURE.photo.path);
    }
  });
});
```

Then, in the `describe("wedding sets", ...)` block further down, the existing `weddings` lookup by id still works unchanged. Leave that whole block alone.

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run tests/gallery.test.ts`

Expected: FAIL. The first failure is the order assertion, reporting `["weddings","couples","engagements"]` where `["weddings","engagements","events"]` was expected. TypeScript errors on `cat.cardBlurb`, `cat.cover` and `cat.href` are also expected at this point since the fields do not exist yet.

- [ ] **Step 3: Update the type and the categories**

In `src/content/gallery.ts`, replace the `GalleryCategory` interface with:

```ts
export interface GalleryCategory {
  /** Section anchor, React key, and the last segment of `href`: "events". */
  id: string;
  /** Section heading, set in the serif face. */
  label: string;
  /** One line under the heading on the category page, in Raymond's voice. */
  blurb: string;
  /** Where the hub card links. Its own page, not an anchor on the hub. */
  href: string;
  /** The frame on the hub card. Kept distinct from the hero and the feature
   *  so no frame appears twice on one journey. */
  cover: Photo;
  /** One short line on the card face. Shorter than `blurb`: it sits over a
   *  photo at small type, so a sentence is already too long. */
  cardBlurb: string;
  /** When present, the page renders one labelled grid per set instead of a
   *  single grid. `photos` still holds every frame, flattened. */
  sets?: GallerySet[];
  /** Rendered in order, top to bottom of the masonry. */
  photos: Photo[];
}
```

Add the events import at the top of the file, below the existing `@/content/portfolio` import:

```ts
import {
  EVENTS_BLURB,
  EVENTS_CARD_BLURB,
  EVENTS_CARD_COVER,
  EVENT_SETS,
} from "@/content/events";
```

Replace the whole `export const GALLERY` array with:

```ts
export const GALLERY: GalleryCategory[] = [
  {
    id: "weddings",
    label: "Weddings",
    blurb:
      "The whole day, start to finish. Getting ready, the vows you meant, the last song, and everything in between.",
    href: "/gallery/weddings",
    // The cathedral veil frame. Not the hero (so-select-636) and not the
    // feature (miranda-danny-14), so nothing repeats on one journey.
    cover: pick(SARGON_ODELYA_SELECT, "so-select-300.jpg"),
    cardBlurb: "The whole day, start to finish.",
    sets: WEDDING_SETS,
    photos: fromSets(WEDDING_SETS),
  },
  {
    id: "engagements",
    label: "Engagements",
    blurb:
      "The nerves before, the question, and the yes. I stay hidden until you have said it.",
    href: "/gallery/engagements",
    // The one engagement frame there is, so it is both the cover and the
    // grid. Accepted until there are more; see the 2026-07-28 spec.
    cover: PHOTOS.proposal,
    cardBlurb: "The nerves, the question, the yes.",
    photos: [PHOTOS.proposal],
  },
  {
    id: "events",
    label: "Events",
    blurb: EVENTS_BLURB,
    href: "/gallery/events",
    cover: EVENTS_CARD_COVER,
    cardBlurb: EVENTS_CARD_BLURB,
    sets: EVENT_SETS,
    photos: fromSets(EVENT_SETS),
  },
];
```

Update the file's header comment: the old one says Weddings is "the one category with `sets`" and describes Couples and Engagements. Replace that paragraph with:

```ts
// Weddings and Events both use `sets`: each holds several separate shoots, and
// each set renders as its own labelled grid so the page reads as several days
// rather than one long undifferentiated dump. Engagements has no sets and
// renders as a single grid.
//
// Couples was retired here on 2026-07-28 when the gallery split into three
// category pages. Its frames are still in portfolio.ts and still used
// elsewhere on the site; they are just no longer part of the gallery.
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run tests/gallery.test.ts`

Expected: PASS. Note that `local image paths > resolve to real files under public/ for every gallery frame` now also walks all 18 event frames, so this run proves the Task 1 paths line up with the Task 2 strings.

- [ ] **Step 5: Run the full suite**

Run: `npm test`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/content/gallery.ts tests/gallery.test.ts
git commit -m "Split the gallery into Weddings, Engagements and Events"
```

---

### Task 4: Extract the grid into a CategoryGallery component

**Files:**
- Create: `src/components/lei/CategoryGallery.tsx`
- Modify: `src/app/(site)/gallery/page.tsx` (remove the extracted code, import the component)

**Interfaces:**
- Consumes: `GalleryCategory` from `@/content/gallery`.
- Produces: `export default function CategoryGallery({ category }: { category: GalleryCategory })`. Tasks 7 and 8 render `<CategoryGallery category={...} />`.

**Context:** This is a pure move. The functions `columnsFor`, `capFor` and `PhotoGrid` and the per-set markup currently live in `src/app/(site)/gallery/page.tsx` (lines 21 to 63 for the helpers, and the body of the `GALLERY.map` at lines 200 to 308). They move verbatim, with two deliberate changes: the component renders one category rather than mapping over all of them, and the outer `marginTop: i === 0 ? 0 : "12vh"` spacing drops away because each category now owns a page.

Verify against `npm test` at the end that this task changed no test outcomes: it is a refactor, and the existing gallery page must still render the same three grids until Task 7 replaces it.

- [ ] **Step 1: Create the component**

Create `src/components/lei/CategoryGallery.tsx`:

```tsx
import { Collage, CollageTile } from "@/components/lei/Collage";
import { GOLD, MUTED, SERIF } from "@/components/lei/tokens";
import { aspect, img, type Photo } from "@/content/portfolio";
import type { GalleryCategory } from "@/content/gallery";

/** The masonry drops columns as a category thins out, so a one-photo section
 *  reads as a single deliberate plate instead of an orphan quarter-column. */
function columnsFor(n: number): 1 | 2 | 3 | 4 {
  if (n >= 7) return 4;
  if (n >= 4) return 3;
  if (n >= 2) return 2;
  return 1;
}

/** Paired with columnsFor: a narrow grid is centred rather than stretched. */
function capFor(n: number): number | undefined {
  if (n >= 7) return undefined;
  if (n >= 2) return 1180;
  return 560;
}

/** One masonry of frames. Shared by a plain category and by each set inside a
 *  category that has them, so both render identically. */
function PhotoGrid({ photos }: { photos: Photo[] }) {
  return (
    <Collage columns={columnsFor(photos.length)}>
      {photos.map((p) => (
        <CollageTile key={p.path}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img(p.path, 1200)}
            alt={p.a}
            loading="lazy"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              // `auto` keeps the file's real ratio once it decodes; the value
              // only reserves height before that, so a stale preset can never
              // squash a photo.
              aspectRatio: `auto ${aspect(p)}`,
            }}
          />
        </CollageTile>
      ))}
    </Collage>
  );
}

/**
 * One category's photos: a single masonry, or one labelled masonry per set
 * when the category has them (Weddings, Events). Owns the heading, the blurb,
 * and the width the whole section is capped to.
 */
export default function CategoryGallery({
  category,
}: {
  category: GalleryCategory;
}) {
  // A category with sets is as wide as its widest set, not as wide as every
  // frame it holds put together.
  const n = category.sets
    ? Math.max(...category.sets.map((s) => s.photos.length))
    : category.photos.length;

  return (
    <section
      style={{
        position: "relative",
        background: "#F7F5F2",
        color: "#0E0D0B",
        padding: "12vh 4vw",
      }}
    >
      <div
        style={{
          // Cap the whole section, not just the grid, so a sparse category's
          // blurb stays aligned to its own left edge instead of drifting out
          // to the page margin.
          maxWidth: capFor(n),
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div data-fadeup="" style={{ maxWidth: 720, marginBottom: "5vh" }}>
          <hr
            style={{
              border: 0,
              borderTop: `1px solid ${GOLD}`,
              width: 64,
              margin: "0 0 26px",
            }}
          />
          <p
            style={{
              margin: 0,
              maxWidth: 560,
              fontSize: 15,
              lineHeight: 1.75,
              color: MUTED,
            }}
          >
            {category.blurb}
          </p>
        </div>
        <div>
          {category.sets ? (
            category.sets.map((set, j) => (
              <div
                key={set.id}
                id={set.id}
                style={{
                  scrollMarginTop: "calc(var(--lx-header-h) + 24px)",
                  marginTop: j === 0 ? 0 : "9vh",
                }}
              >
                <div
                  data-fadeup=""
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 22,
                    marginBottom: "3.5vh",
                  }}
                >
                  <h2
                    style={{
                      margin: 0,
                      fontFamily: SERIF,
                      fontStyle: "italic",
                      fontWeight: 400,
                      fontSize: "clamp(21px,2.5vw,32px)",
                      lineHeight: 1.1,
                      letterSpacing: ".01em",
                    }}
                  >
                    {set.name}
                  </h2>
                  <span
                    aria-hidden="true"
                    style={{ flex: 1, height: 1, background: "rgba(14,13,11,.15)" }}
                  />
                </div>
                <PhotoGrid photos={set.photos} />
              </div>
            ))
          ) : (
            <PhotoGrid photos={category.photos} />
          )}
        </div>
      </div>
    </section>
  );
}
```

Note the set heading is an `<h2>`, not the `<h3>` it was on the old page. On a category page the page title is the only `<h1>` and set names are the next level down, so `<h3>` would skip a level.

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`

Expected: no output, exit 0.

- [ ] **Step 3: Verify the existing suite still passes**

Run: `npm test`

Expected: PASS, unchanged from before this task. Nothing imports the new component yet, so this is only confirming the new file does not break the build.

- [ ] **Step 4: Commit**

```bash
git add src/components/lei/CategoryGallery.tsx
git commit -m "Extract the gallery grid into a CategoryGallery component"
```

---

### Task 5: Build the category title band and the shared closing block

**Files:**
- Create: `src/components/lei/CategoryHeader.tsx`
- Create: `src/components/lei/GalleryCta.tsx`

**Interfaces:**
- Consumes: `@/components/lei/tokens`, `Marquee` from `@/components/lei/blocks`, `LeiFooter`.
- Produces:
  - `export default function CategoryHeader({ label }: { label: string })`. Tasks 7 and 8 render `<CategoryHeader label={category.label} />`.
  - `export default function GalleryCta()` from `GalleryCta.tsx`, no props. Tasks 7 and 8 render `<GalleryCta />` as the last thing inside `<LeiPage>`.

**Context:** A compact dark band, not a second full-screen photo hero. It exists so a visitor who has already clicked a card reaches the photos in one scroll rather than two, and so no good frame gets spent on a hero that would then repeat in the grid below.

The blurb is deliberately not here: `CategoryGallery` already renders it above the grid. Rendering it in both places would print it twice.

`data-title-line` drives the GSAP line reveal in `src/lib/lei/motion.ts`; `data-fadeup` drives the standard reveal. Both are already wired by `LeiPage`, so using the attributes is all that is required.

- [ ] **Step 1: Create the component**

Create `src/components/lei/CategoryHeader.tsx`:

```tsx
import Link from "next/link";
import { SERIF, cream, kicker } from "@/components/lei/tokens";

/**
 * The compact title band at the top of a category page. Deliberately not a
 * second full-screen photo hero: a visitor arriving here has already clicked
 * a card and wants the photos, not another cover.
 *
 * The category blurb is not rendered here. CategoryGallery prints it above the
 * grid, and printing it in both places would show it twice.
 */
export default function CategoryHeader({ label }: { label: string }) {
  return (
    <section
      style={{
        position: "relative",
        background: "#0E0D0B",
        color: "#F7F5F2",
        padding: "calc(var(--lx-header-h) + 12vh) 6vw 10vh",
      }}
    >
      <Link
        data-fadeup=""
        data-hover=""
        href="/gallery"
        style={{
          ...kicker({ display: "inline-block", marginBottom: 24 }, 10, ".3em"),
          textDecoration: "none",
        }}
      >
        Gallery
      </Link>
      <h1
        style={{
          margin: 0,
          fontFamily: SERIF,
          fontWeight: 600,
          fontSize: "clamp(40px,8vw,110px)",
          lineHeight: 0.96,
          letterSpacing: ".01em",
        }}
      >
        <span data-title-line="">{label}</span>
      </h1>
      <hr
        data-fadeup=""
        style={{
          border: 0,
          borderTop: `1px solid ${cream(0.18)}`,
          margin: "8vh 0 0",
        }}
      />
    </section>
  );
}
```

The kicker doubles as the way back to the hub, which is the only navigation these pages need beyond the header.

- [ ] **Step 2: Create the shared closing block**

All four gallery pages end with the same marquee, booking headline, Inquire pill and footer. Copying that block four times would be roughly 150 duplicated lines and four copies of the same imports, so it becomes one component.

Create `src/components/lei/GalleryCta.tsx`:

```tsx
import Link from "next/link";
import LeiFooter from "@/components/lei/LeiFooter";
import { Marquee } from "@/components/lei/blocks";
import { SERIF, pill } from "@/components/lei/tokens";

/**
 * The closing block on every gallery page: marquee, booking headline, Inquire
 * pill, footer. One component because all four pages close identically, and
 * four copies of it would be four places to forget when the booking years
 * change.
 */
export default function GalleryCta() {
  return (
    <section
      style={{
        position: "relative",
        background: "#0E0D0B",
        color: "#F7F5F2",
        padding: "0 6vw",
      }}
    >
      <div style={{ margin: "0 -6vw" }}>
        <Marquee phrase="Your day, felt forever" margin="0" />
      </div>
      <div style={{ textAlign: "center", padding: "12vh 0 14vh" }}>
        <h2
          data-fadeup=""
          style={{
            margin: "0 auto",
            fontFamily: SERIF,
            fontWeight: 500,
            fontSize: "clamp(36px,5vw,64px)",
            lineHeight: 1.12,
            maxWidth: 800,
            textWrap: "pretty",
          }}
        >
          Now booking 2026 &amp; 2027 <em>weddings</em>.
        </h2>
        <Link
          data-fadeup=""
          data-mag=""
          data-hover=""
          href="/inquire"
          style={{ ...pill("#F7F5F2", "#0E0D0B"), marginTop: 44 }}
        >
          Inquire
        </Link>
      </div>

      <LeiFooter />
    </section>
  );
}
```

This is lifted verbatim from the closing section of the current `src/app/(site)/gallery/page.tsx` (its last `<section>`), so the rendered output is unchanged.

- [ ] **Step 3: Verify both compile**

Run: `npx tsc --noEmit`

Expected: no output, exit 0.

- [ ] **Step 4: Commit**

```bash
git add src/components/lei/CategoryHeader.tsx src/components/lei/GalleryCta.tsx
git commit -m "Add the category title band and the shared gallery CTA block"
```

---

### Task 6: Build the hub cards

**Files:**
- Create: `src/components/lei/CategoryCards.tsx`

**Interfaces:**
- Consumes: `GALLERY` from `@/content/gallery`, `img` from `@/content/portfolio`.
- Produces: `export default function CategoryCards()`. Task 7 renders `<CategoryCards />` with no props: it reads `GALLERY` itself, because there is exactly one hub and inventing a prop for it would be ceremony.

**Context:** Three equal cards on one baseline, evenly spaced. Each card is a single `<Link>` wrapping a 4:5 portrait image with the serif label and `cardBlurb` over a bottom gradient.

The hover treatment reuses what already exists rather than adding new CSS. `.lx-gitem` in `src/app/globals.css` already gives its `img` a 1s eased `transform` transition and scales it to 1.04 on hover, so wrapping each card image in `className="lx-gitem"` gets the slow zoom for free. `data-hover` grows the custom cursor (see `src/lib/lei/motion.ts` line 487); an `<a>` triggers that anyway, so it is belt and braces but consistent with the rest of the site.

Responsive behaviour uses `grid-template-columns: repeat(auto-fit, minmax(260px, 1fr))`, which collapses to one column on phones with no media query. This matters because the styling here is inline, and inline styles cannot hold a media query.

- [ ] **Step 1: Create the component**

Create `src/components/lei/CategoryCards.tsx`:

```tsx
import Link from "next/link";
import { GALLERY } from "@/content/gallery";
import { img } from "@/content/portfolio";
import { SERIF, cream } from "@/components/lei/tokens";

/**
 * The three cards on /gallery: Weddings, Engagements, Events. Each is one link
 * onto that category's own page.
 *
 * Reads GALLERY directly rather than taking a prop. There is exactly one hub,
 * and the card order is the category order by definition.
 *
 * The slow photo zoom on hover comes from .lx-gitem in globals.css, which
 * already transitions and scales its img. No new CSS.
 */
export default function CategoryCards() {
  return (
    <section
      style={{
        position: "relative",
        background: "#0E0D0B",
        color: "#F7F5F2",
        padding: "14vh 6vw",
      }}
    >
      <div
        style={{
          display: "grid",
          // auto-fit collapses this to one column on a phone without a media
          // query, which inline styles cannot express.
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "clamp(16px,2.4vw,34px)",
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        {GALLERY.map((cat) => (
          <Link
            key={cat.id}
            data-fadeup=""
            data-hover=""
            href={cat.href}
            style={{
              position: "relative",
              display: "block",
              textDecoration: "none",
              color: "#F7F5F2",
              overflow: "hidden",
            }}
          >
            <div className="lx-gitem" style={{ margin: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img(cat.cover.path, 1000)}
                alt={cat.cover.a}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "auto",
                  aspectRatio: "4 / 5",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(14,13,11,.82) 0%, rgba(14,13,11,.24) 42%, rgba(14,13,11,0) 68%)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 26,
                right: 26,
                bottom: 26,
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  fontFamily: SERIF,
                  fontWeight: 600,
                  fontSize: "clamp(24px,2.4vw,36px)",
                  lineHeight: 1.06,
                  letterSpacing: ".01em",
                }}
              >
                {cat.label}
              </div>
              <div
                style={{
                  marginTop: 10,
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: cream(0.74),
                }}
              >
                {cat.cardBlurb}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`

Expected: no output, exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/lei/CategoryCards.tsx
git commit -m "Add the three category cards for the gallery hub"
```

---

### Task 7: Turn /gallery into the hub

**Files:**
- Modify: `src/app/(site)/gallery/page.tsx` (full rewrite)

**Interfaces:**
- Consumes: `CategoryCards` (Task 6), `GalleryCta` (Task 5), `GALLERY_HERO` from `@/content/gallery`.
- Produces: the `/gallery` route rendering hero, cards, then the shared closing block.

**Context:** The hero section (the `<section>` at lines 71 to 188 of the current file, with the background image, the ghost `GALLERY` wordmark, the title lines and the `ScrollHint`) is kept verbatim. Everything between it and the marquee is removed: the category grids, the full-bleed feature, the testimonial and price link, the `PhotoBand`, the pull quote, and `ProcessSteps`.

The feature photo and testimonial move to `/gallery/weddings` in Task 8. The pull quote, `PhotoBand` and `ProcessSteps` retire; `ProcessSteps` still runs on `/experience` and the homepage, so no content is lost.

- [ ] **Step 1: Rewrite the page**

Replace the entire contents of `src/app/(site)/gallery/page.tsx` with:

```tsx
import type { Metadata } from "next";
import LeiPage from "@/components/lei/LeiPage";
import Chrome from "@/components/lei/Chrome";
import CategoryCards from "@/components/lei/CategoryCards";
import GalleryCta from "@/components/lei/GalleryCta";
import { ScrollHint } from "@/components/lei/blocks";
import { SERIF, cream, kicker } from "@/components/lei/tokens";
import { img } from "@/content/portfolio";
import { GALLERY_HERO } from "@/content/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Bay Area wedding, engagement and event photography. Full wedding days, proposals, and the galas and mixers in between.",
};

/* The gallery hub. Three cards, one per category, each onto its own page:
   /gallery/weddings, /gallery/engagements, /gallery/events. The grids that
   used to live here moved onto those pages on 2026-07-28, along with the
   full-bleed feature and the testimonial (now on /gallery/weddings). */
export default function GalleryPage() {
  return (
    <LeiPage style={{ background: "#0E0D0B", color: "#F7F5F2" }}>
      <Chrome />

      {/* ══ Title ══ */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          overflow: "hidden",
          padding: "0 6vw",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img(GALLERY_HERO.path, 2400)}
          alt={GALLERY_HERO.a}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(14,13,11,.86) 0%, rgba(14,13,11,.58) 55%, rgba(14,13,11,.74) 100%)",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            transform: "translateY(-50%)",
            display: "flex",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <span
            data-ghost="hero"
            style={{
              fontFamily: SERIF,
              fontWeight: 700,
              fontSize: "22vw",
              lineHeight: 1,
              color: cream(0.05),
              letterSpacing: "-.02em",
              whiteSpace: "nowrap",
            }}
          >
            GALLERY
          </span>
        </div>
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div data-fadeup="" style={kicker({ marginBottom: 24 }, 10, ".3em")}>
            The Gallery
          </div>
          <h1
            style={{
              margin: 0,
              fontFamily: SERIF,
              fontWeight: 600,
              lineHeight: 0.92,
              letterSpacing: ".01em",
            }}
          >
            <div data-title-line="" style={{ fontSize: "clamp(40px,9vw,140px)" }}>
              PRESENT FOR
            </div>
            <div data-title-line="" style={{ fontSize: "clamp(40px,9vw,140px)" }}>
              <em style={{ fontWeight: 400 }}>ALL OF IT.</em>
            </div>
          </h1>
          <p
            data-fadeup=""
            style={{
              maxWidth: 620,
              margin: "36px 0 0",
              fontSize: 16,
              lineHeight: 1.75,
              color: cream(0.72),
            }}
          >
            You two stay in the day; I&rsquo;ll make sure you get it back. The
            planning happens before the camera ever comes out.
          </p>
        </div>
        <div
          data-fadeup=""
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 42,
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          <ScrollHint color={cream(0.5)} />
        </div>
      </section>

      {/* ══ The three cards. Order and copy come from src/content/gallery.ts ══ */}
      <CategoryCards />

      <GalleryCta />
    </LeiPage>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`

Expected: no output, exit 0. (There is no ESLint in this project: `package.json` has no `lint` script and no eslint dependency, so `npx tsc --noEmit` plus the build in Step 3 is the whole check. The `eslint-disable-next-line` comments in the source are inherited from the original files and are harmless.)

- [ ] **Step 3: Build to confirm the route renders**

Run: `npm run build`

Expected: build succeeds and the route list includes `/gallery` as a static route (marked `○`).

- [ ] **Step 4: Commit**

```bash
git add "src/app/(site)/gallery/page.tsx"
git commit -m "Turn /gallery into a three-card hub"
```

---

### Task 8: Build the three category pages

**Files:**
- Create: `src/app/(site)/gallery/weddings/page.tsx`
- Create: `src/app/(site)/gallery/engagements/page.tsx`
- Create: `src/app/(site)/gallery/events/page.tsx`

**Interfaces:**
- Consumes: `CategoryHeader` and `GalleryCta` (Task 5), `CategoryGallery` (Task 4), `GALLERY` and `GALLERY_FEATURE` from `@/content/gallery`, `TESTIMONIALS` from `@/content/homepage`.
- Produces: the three routes.

**Context:** Next 16 static routes: a default-exported component and an exported `metadata` object, no `params`. Nesting under the existing `gallery/` folder needs no `layout.tsx`; the `(site)` group layout already wraps everything.

The pages do not share a `layout.tsx`, because one would also wrap `/gallery` itself and the hub has a different shape. The parts they genuinely share are components instead: `CategoryHeader`, `CategoryGallery` and `GalleryCta`. What remains per page is its metadata, its category lookup, and (for weddings only) the feature and testimonial.

Categories are looked up by id with a non-null assertion. That is safe because `tests/gallery.test.ts` asserts the exact ids, so a rename breaks the test suite before it can break a page.

- [ ] **Step 1: Create the weddings page**

Create `src/app/(site)/gallery/weddings/page.tsx`:

```tsx
import type { Metadata } from "next";
import LeiPage from "@/components/lei/LeiPage";
import Chrome from "@/components/lei/Chrome";
import CategoryHeader from "@/components/lei/CategoryHeader";
import CategoryGallery from "@/components/lei/CategoryGallery";
import GalleryCta from "@/components/lei/GalleryCta";
import { SoftLink } from "@/components/lei/Cta";
import { SERIF, kicker } from "@/components/lei/tokens";
import { img } from "@/content/portfolio";
import { GALLERY, GALLERY_FEATURE } from "@/content/gallery";
import { TESTIMONIALS } from "@/content/homepage";

export const metadata: Metadata = {
  title: "Wedding Galleries",
  description:
    "Full Bay Area wedding days, start to finish. Getting ready, the vows, the last song, and everything in between.",
};

// Safe: tests/gallery.test.ts asserts this id, so a rename fails the suite
// before it can strand this page.
const CATEGORY = GALLERY.find((c) => c.id === "weddings")!;

export default function WeddingsGalleryPage() {
  return (
    <LeiPage style={{ background: "#0E0D0B", color: "#F7F5F2" }}>
      <Chrome />

      <CategoryHeader label={CATEGORY.label} />
      <CategoryGallery category={CATEGORY} />

      {/* ══ Full-bleed feature ══ */}
      <section style={{ position: "relative", height: "120vh" }}>
        <div
          style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            data-feature=""
            src={img(GALLERY_FEATURE.photo.path, 2500)}
            alt={GALLERY_FEATURE.photo.a}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: "scale(1.18)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(14,13,11,.55), rgba(14,13,11,0) 45%)",
            }}
          />
          <div style={{ position: "absolute", left: 38, bottom: 38 }}>
            <div style={kicker({ marginBottom: 12 })}>{GALLERY_FEATURE.kicker}</div>
            <div
              style={{
                fontFamily: SERIF,
                fontStyle: "italic",
                fontSize: "clamp(22px,2.6vw,36px)",
              }}
            >
              {GALLERY_FEATURE.line}
            </div>
          </div>
        </div>
      </section>

      {/* ══ Proof + price anchor ══ */}
      <section
        style={{
          position: "relative",
          background: "#0E0D0B",
          padding: "16vh 6vw",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <blockquote
            data-fadeup=""
            style={{
              margin: 0,
              fontFamily: SERIF,
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(22px,2.6vw,34px)",
              lineHeight: 1.4,
              textWrap: "pretty",
            }}
          >
            &ldquo;{TESTIMONIALS[0].pull}&rdquo;
          </blockquote>
          <div data-fadeup="" style={kicker({ marginTop: 26 }, 10, ".3em")}>
            {TESTIMONIALS[0].names}
          </div>
          <div data-fadeup="" style={{ marginTop: 34 }}>
            <SoftLink dark href="/investment" label="Collections from $2,400" />
          </div>
        </div>
      </section>

      <GalleryCta />
    </LeiPage>
  );
}
```

- [ ] **Step 2: Create the engagements page**

Create `src/app/(site)/gallery/engagements/page.tsx`:

```tsx
import type { Metadata } from "next";
import LeiPage from "@/components/lei/LeiPage";
import Chrome from "@/components/lei/Chrome";
import CategoryHeader from "@/components/lei/CategoryHeader";
import CategoryGallery from "@/components/lei/CategoryGallery";
import GalleryCta from "@/components/lei/GalleryCta";
import { GALLERY } from "@/content/gallery";

export const metadata: Metadata = {
  title: "Engagement Galleries",
  description:
    "Bay Area engagement and proposal photography. The nerves before, the question, and the yes.",
};

// Safe: tests/gallery.test.ts asserts this id, so a rename fails the suite
// before it can strand this page.
const CATEGORY = GALLERY.find((c) => c.id === "engagements")!;

export default function EngagementsGalleryPage() {
  return (
    <LeiPage style={{ background: "#0E0D0B", color: "#F7F5F2" }}>
      <Chrome />

      <CategoryHeader label={CATEGORY.label} />
      <CategoryGallery category={CATEGORY} />
      <GalleryCta />
    </LeiPage>
  );
}
```

- [ ] **Step 3: Create the events page**

Create `src/app/(site)/gallery/events/page.tsx`:

```tsx
import type { Metadata } from "next";
import LeiPage from "@/components/lei/LeiPage";
import Chrome from "@/components/lei/Chrome";
import CategoryHeader from "@/components/lei/CategoryHeader";
import CategoryGallery from "@/components/lei/CategoryGallery";
import GalleryCta from "@/components/lei/GalleryCta";
import { GALLERY } from "@/content/gallery";

export const metadata: Metadata = {
  title: "Event Galleries",
  description:
    "Bay Area event photography: galas, mixers, panels and award nights, shot so the room still looks like itself.",
};

// Safe: tests/gallery.test.ts asserts this id, so a rename fails the suite
// before it can strand this page.
const CATEGORY = GALLERY.find((c) => c.id === "events")!;

export default function EventsGalleryPage() {
  return (
    <LeiPage style={{ background: "#0E0D0B", color: "#F7F5F2" }}>
      <Chrome />

      <CategoryHeader label={CATEGORY.label} />
      <CategoryGallery category={CATEGORY} />
      <GalleryCta />
    </LeiPage>
  );
}
```

The engagements and events pages differ only in metadata, the looked-up id and the component name. That is as small as two static routes can get without a dynamic segment, and a dynamic `[category]` route was rejected because the weddings page carries a feature and testimonial the other two do not.

- [ ] **Step 4: Build to confirm all three routes render**

Run: `npm run build`

Expected: build succeeds and the route list includes `/gallery`, `/gallery/engagements`, `/gallery/events` and `/gallery/weddings`, all static (`○`).

- [ ] **Step 5: Run the full suite**

Run: `npm test`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add "src/app/(site)/gallery/weddings" "src/app/(site)/gallery/engagements" "src/app/(site)/gallery/events"
git commit -m "Add the weddings, engagements and events gallery pages"
```

---

### Task 9: Repoint every link at the new routes

**Files:**
- Modify: `src/content/nav.ts:30`
- Modify: `src/components/lei/HeaderNav.tsx:19-20`
- Modify: `src/content/homepage.ts` (the three `RECENT_WEDDINGS` entries)
- Modify: `src/app/sitemap.ts`
- Modify: `tests/nav.test.ts:36-41`

**Interfaces:**
- Consumes: the three routes from Task 8.
- Produces: no new exports. This task only changes href strings.

**Context:** No Events entry is added to the nav. The only place it could go is the `WEDDINGS_MENU` dropdown, and filing event work under a Weddings parent would be plainly wrong. The hub is the index for all three.

`RECENT_WEDDINGS` is the array with per-wedding hrefs. `WEDDING_PORTFOLIO` in the same file is a different array of photo rows with no hrefs and is not touched.

Set anchors keep working: `#sargon-odelya` and friends move from `/gallery` to `/gallery/weddings`, but the ids themselves are unchanged, and `CategoryGallery` carries the same `scrollMarginTop: "calc(var(--lx-header-h) + 24px)"` the old page had.

- [ ] **Step 1: Update the failing nav test first**

In `tests/nav.test.ts`, change the expected hrefs in the `"Weddings group holds Engagements, Experience, Second Weddings, Free Session"` test (line 36):

```ts
    expect(hrefs(WEDDINGS_MENU)).toEqual([
      "/gallery/engagements",
      "/experience",
      "/second-weddings",
      "/free-session",
    ]);
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run tests/nav.test.ts`

Expected: FAIL on that one test, reporting `"/gallery#engagements"` received where `"/gallery/engagements"` was expected.

- [ ] **Step 3: Update the nav**

In `src/content/nav.ts`, change line 30 inside `WEDDINGS_MENU`:

```ts
  { href: "/gallery/engagements", label: "Engagements" },
```

Update the comment above `WEDDINGS_MENU` so it stops describing a hash link. Replace the existing two-line comment with:

```ts
/** Items under the "Weddings" nav group. The "Weddings" parent itself is NOT a
 *  link: on desktop it is a hover dropdown, on mobile a tap-to-expand section.
 *
 *  Events is deliberately absent. The only slot for it here is under a
 *  "Weddings" parent, which would be plainly wrong for event work. /gallery is
 *  the index for all three categories. */
```

Also update the file's top comment, which still describes /gallery as "the one photo page":

```ts
// Single source of truth for site navigation. Header, mobile menu, and footer
// all read from here, so links stay consistent on every page and a destination
// changes in exactly one place.
//
// "Gallery" points to /gallery, the hub for the three category pages
// (/gallery/weddings, /gallery/engagements, /gallery/events). The old
// /portfolio hub and /weddings page both redirect to /gallery.
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run tests/nav.test.ts`

Expected: PASS, all 9 tests.

- [ ] **Step 5: Fix the HeaderNav active state**

`src/components/lei/HeaderNav.tsx` lines 18 to 21 currently read:

```tsx
  // Every destination is now a single page with no subpaths, so an exact match
  // is enough. The group's "/gallery#engagements" child never matches, because
  // usePathname() drops the hash, so Gallery alone lights on /gallery.
  const isActive = (href: string) => pathname === href;
```

Both the comment and the logic are now wrong. `/gallery` has subpaths, so with an exact match the Gallery link goes dark the moment you click into a category, which is the one place it should be lit. Replace all four lines with:

```tsx
  // Exact match everywhere except /gallery, which now has three category
  // subpages. Without the prefix case, clicking a card would un-light Gallery
  // on the very pages it owns.
  //
  // On /gallery/engagements this lights Gallery and the Weddings group at
  // once, because Engagements sits in that dropdown. That is accurate: you
  // are in the gallery, under weddings. Not a bug to chase.
  const isActive = (href: string) =>
    href === "/gallery"
      ? pathname === href || pathname.startsWith("/gallery/")
      : pathname === href;
```

Leave `groupActive` alone. It compares children with `pathname === c.href`, so `/gallery/engagements` lights the Weddings group exactly as intended.

- [ ] **Step 6: Point each recent wedding at its own set**

In `src/content/homepage.ts`, update the three `href` values in `RECENT_WEDDINGS`:

```ts
    href: "/gallery/weddings#sargon-odelya",
```

```ts
    href: "/gallery/weddings#miranda-danny",
```

```ts
    href: "/gallery/weddings#trang",
```

The first one currently carries a trailing comment (`// the one photo page; /weddings and /portfolio redirect here`) that is now wrong. Replace it with `// straight to this wedding's set`.

- [ ] **Step 7: Add the new routes to the sitemap**

In `src/app/sitemap.ts`, add three entries directly after the `/gallery` line:

```ts
    { url: `${SITE_URL}/gallery/weddings`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/gallery/engagements`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/gallery/events`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
```

Weddings keeps 0.9, matching the hub: it is the work the business runs on. The other two sit at 0.7 alongside the other secondary pages.

- [ ] **Step 8: Run the full suite and build**

Run: `npm test && npm run build`

Expected: both PASS. The build's route list shows all four gallery routes as static.

- [ ] **Step 9: Commit**

```bash
git add src/content/nav.ts src/components/lei/HeaderNav.tsx src/content/homepage.ts src/app/sitemap.ts tests/nav.test.ts
git commit -m "Point every gallery link at the new category routes"
```

---

### Task 10: Verify in the browser

**Files:** none. This task changes nothing; it confirms the previous nine.

**Context:** The test suite covers content shape and path resolution but renders nothing. Layout, hover behaviour and anchor scrolling need eyes.

Use the `mcp__shipstudio-preview__*` tools, which drive the preview the user is already watching. Do not reach for a separate browser.

- [ ] **Step 1: Start the dev server if it is not already running**

Run `mcp__shipstudio-preview__preview_status` first. If nothing is serving, run `npm run dev` in the background, then re-check.

- [ ] **Step 2: Check the hub**

Navigate to `/gallery`. Confirm:
- Three cards in one row, evenly spaced, all the same height
- Labels read Weddings, Engagements, Events, left to right
- Hovering a card slow-zooms its photo
- Nothing below the cards except the marquee, the Inquire CTA and the footer

- [ ] **Step 3: Check each card's destination**

Click each card in turn. Confirm each lands on `/gallery/weddings`, `/gallery/engagements`, `/gallery/events` respectively, each showing its title band, its blurb and its grid. The events page must show three labelled groups (Event One, Event Two, Event Three) of six placeholder boxes each, with the slot name legible inside every box.

- [ ] **Step 4: Check the anchors**

Navigate directly to `/gallery/weddings#trang`. Confirm the page scrolls to the Trang set and that the heading clears the fixed header rather than hiding behind it.

- [ ] **Step 5: Check the phone layout**

Set the viewport to 390 x 844 with `preview_set_viewport`. Confirm the three cards stack into one column, each still legible, and that the page does not scroll horizontally.

- [ ] **Step 6: Check the console**

Run `mcp__shipstudio-preview__preview_console`. Expected: no errors. A 404 on any `/images/portfolio/events/...` path means a filename in `events.ts` disagrees with what Task 1 generated.

- [ ] **Step 7: Report**

Report what was verified and anything that looked wrong. Do not fix layout problems silently: describe them first, since taste calls belong to the user.

---

## Handoff note for Raymond

When the real event photos are ready:

1. Drop each photo over the placeholder it replaces, keeping the filename. Paths are `public/images/portfolio/events/event-one/event-one-1.jpg` and so on. No code change needed.
2. In `src/content/events.ts`, change each set's `name` from "Event One" to the real name. Change its `id` too if you want the page anchor to match; nothing depends on the current ids.
3. Rewrite each frame's `a` alt text to describe the actual photo. Every frame is its own line with its own `a`, `r` and `ratio`, so editing one never touches another.
4. If a replacement is a different shape than the placeholder it replaced, update that frame's `r` and `ratio`. Nothing breaks without it: the grid corrects itself once the file loads, so a stale value only costs a small reflow.
5. Add or remove frames freely. The tests check structure, not counts, so a set of four or of nine is fine.
6. Run `npm test` to confirm every path still resolves and no copy rule broke.

The unsorted originals are still in `public/images/portfolio/events/assyrian/` and `events/corporate/`, plus three loose `event-*.jpg` files. Those two folders each hold frames from more than one event, so they need sorting by hand before they can be used.
