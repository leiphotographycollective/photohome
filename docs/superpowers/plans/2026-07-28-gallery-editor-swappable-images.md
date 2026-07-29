# Editor-Swappable Gallery Images Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every image on the four gallery pages swappable in the Ship Studio visual editor, by writing each `<img>` tag's `src` out as a literal string in the page instead of computing it from a content array.

**Architecture:** The visual editor can only swap an image whose `src` is a literal string it can find in the page source. `src={img(photo.path)}` is invisible to it. So the 64 gallery images move from data-driven `.map()` calls into hand-written `<img>` tags, exactly as `src/app/(site)/page.tsx` already does. `CategoryGallery` stops rendering photos and becomes a layout shell; the pages own the tags. Copy stays in `src/content/` so the em-dash and voice guards keep covering it.

**Tech Stack:** Next.js 16.2.9 App Router, TypeScript, vitest.

## Global Constraints

These apply to every task.

- **Read the Next.js docs before writing route code.** `AGENTS.md` requires it; this is Next 16.2.9. Relevant file: `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/page.md`. Every gallery route is static: no `params`, no `searchParams`.
- **`src` must be a literal string on every gallery image.** `src="/images/portfolio/events/event-one/event-one-1.jpg"` is swappable. `src={img(p.path, 1200)}`, `src={`${DIR}/x.jpg`}` and `src={someVar}` are not. This is the entire point of the change; a computed `src` anywhere on a gallery page is a task failure.
- **Never transcribe frame data by hand.** Paths, alt text and ratios are generated from the current content arrays by the script built in Task 1. 59 hand-copied frames will drift, and a wrong `alt` or a wrong path is invisible until production.
- **No em dashes** (U+2014) in any string under `src/content/`. Photo `a` and `path` fields are exempt.
- **Copy stays in `src/content/`.** Labels, blurbs, card blurbs and event names do not move into page files: `tests/no-em-dash.test.ts` scans content modules by name, so copy that moves into a page silently leaves that guard's coverage. Alt text is the exception and moves inline, matching `page.tsx`; it is already exempt from the em-dash rule.
- **Never delete a photo or an array from `src/content/portfolio.ts`,** even if this change leaves it referenced nowhere. Report orphans; do not remove them.
- **Style values come from `src/components/lei/tokens.ts`.**
- **Run the suite with `npm test`** (vitest, single run). Build with `npm run build`; it is slow, let it finish.

## The 64 images

| File | Images |
| --- | --- |
| `src/app/(site)/gallery/page.tsx` | 1 hero |
| `src/components/lei/CategoryCards.tsx` | 3 card covers |
| `src/app/(site)/gallery/weddings/page.tsx` | 40 grid frames (sargon-odelya 26, miranda-danny 7, trang 7) + 1 full-bleed feature |
| `src/app/(site)/gallery/engagements/page.tsx` | 1 grid frame |
| `src/app/(site)/gallery/events/page.tsx` | 18 grid frames (3 events x 6) |

## File Structure

**Created**

| File | Responsibility |
| --- | --- |
| `tests/_emit-gallery-jsx.test.ts` | One-off generator: reads the current content arrays and writes the exact JSX block for each page. The transcription-safety device for this whole plan. It is a test file only because vitest is the one runner in this project that resolves the `@/` alias. Deleted in Task 5. |

**Modified**

| File | Change |
| --- | --- |
| `src/components/lei/CategoryGallery.tsx` | Stops mapping over photos. Becomes a layout shell plus a `GallerySet` export. |
| `src/app/(site)/gallery/events/page.tsx` | 18 literal frames. |
| `src/app/(site)/gallery/weddings/page.tsx` | 40 literal frames + literal feature photo. |
| `src/app/(site)/gallery/engagements/page.tsx` | 1 literal frame. |
| `src/app/(site)/gallery/page.tsx` | Literal hero. |
| `src/components/lei/CategoryCards.tsx` | Three cards written out one by one, literal covers. |
| `src/content/gallery.ts` | Drops `cover`, `sets`, `photos`. Keeps copy and `href`. |
| `src/content/events.ts` | Drops the photo arrays. Keeps event names and blurbs. |
| `tests/gallery.test.ts` | Path walker points at the gallery pages; adds the computed-`src` guard. |
| `tests/events.test.ts` | Drops photo-array assertions; keeps the copy assertions. |

**Task order rationale:** the shell lands first (Task 1) so pages have something to render into; the generator runs while the content arrays still exist (Task 1); pages unroll one at a time smallest-first so the pattern is proven on 18 frames before it is applied to 40 (Tasks 2, 3, 4); content slims only once nothing reads it (Task 5); tests follow the code they describe (Task 6); browser verification last (Task 7).

---

### Task 1: Build the layout shell and generate the JSX

**Files:**
- Modify: `src/components/lei/CategoryGallery.tsx`
- Create: `tests/_emit-gallery-jsx.test.ts`
- Create (generated scratch): `.superpowers/sdd/gallery-jsx/*.txt`

**Interfaces:**
- Produces:
  - `export default function CategoryGallery({ blurb, cap, children }: { blurb: string; cap?: number; children: ReactNode })`, the gold rule, the blurb, the width cap, wrapping whatever the page puts inside.
  - `export function GallerySet({ id, name, first, columns, children }: { id: string; name: string; first?: boolean; columns?: 1 | 2 | 3 | 4; children: ReactNode })`, the italic set heading and the `Collage` wrapper.
  - `export function GalleryGrid({ columns, children }: { columns?: 1 | 2 | 3 | 4; children: ReactNode })`, a `Collage` with no heading, for a category with no sets.
  - `tests/_emit-gallery-jsx.test.ts` writing one text file per page under `.superpowers/sdd/gallery-jsx/`.

  Tasks 2, 3 and 4 paste from those text files.

**Context:** The current `CategoryGallery` computes its column count and width cap from photo counts via `columnsFor(n)` and `capFor(n)`. Once the pages own the tags, the component cannot count them, so the caller passes the numbers. Read the current file first; the existing values must be preserved exactly.

Today's derived values, which the callers must now pass explicitly:

| Page | Set | Photos | `columns` | Section `cap` |
| --- | --- | --- | --- | --- |
| weddings | sargon-odelya | 26 | 4 | none (widest set is 26, so `capFor` returns undefined) |
| weddings | miranda-danny | 7 | 4 | none |
| weddings | trang | 7 | 4 | none |
| engagements | (no set) | 1 | 1 | 560 |
| events | event-one / two / three | 6 each | 3 | 1180 |

Derivation, for checking: `columnsFor` is 4 at 7+, 3 at 4-6, 2 at 2-3, 1 at 1. `capFor` is undefined at 7+, 1180 at 2-6, 560 at 1, computed from the category's **widest set**, not its total.

- [ ] **Step 1: Rewrite the component as a shell**

Replace the whole of `src/components/lei/CategoryGallery.tsx` with:

```tsx
import type { ReactNode } from "react";
import { Collage } from "@/components/lei/Collage";
import { GOLD, MUTED, SERIF } from "@/components/lei/tokens";

/**
 * Layout shell for a category page's photos.
 *
 * This component deliberately does NOT render the <img> tags. The Ship Studio
 * visual editor can only swap an image whose src is a literal string it can
 * find in the page source, so every gallery photo is written out by hand in
 * the page file. What lives here is only the chrome around them, so the four
 * pages cannot drift apart visually.
 *
 * `cap` is the max width of the whole section, passed in because the component
 * can no longer count the frames: undefined for a dense grid (7+ frames in the
 * widest set), 1180 for 2 to 6, 560 for a single plate.
 */
export default function CategoryGallery({
  blurb,
  cap,
  children,
}: {
  blurb: string;
  cap?: number;
  children: ReactNode;
}) {
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
          maxWidth: cap,
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
            {blurb}
          </p>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

/** One labelled set inside a category: its heading, then its masonry.
 *  `first` drops the top margin on the opening set. */
export function GallerySet({
  id,
  name,
  first,
  columns,
  children,
}: {
  id: string;
  name: string;
  first?: boolean;
  columns?: 1 | 2 | 3 | 4;
  children: ReactNode;
}) {
  return (
    <div
      id={id}
      style={{
        scrollMarginTop: "calc(var(--lx-header-h) + 24px)",
        marginTop: first ? 0 : "9vh",
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
          {name}
        </h2>
        <span
          aria-hidden="true"
          style={{ flex: 1, height: 1, background: "rgba(14,13,11,.15)" }}
        />
      </div>
      <GalleryGrid columns={columns}>{children}</GalleryGrid>
    </div>
  );
}

/** A masonry with no set heading, for a category that has only one grid. */
export function GalleryGrid({
  columns,
  children,
}: {
  columns?: 1 | 2 | 3 | 4;
  children: ReactNode;
}) {
  return <Collage columns={columns}>{children}</Collage>;
}
```

Note `CollageTile` is no longer imported here: the pages import it directly, because they own the tiles now.

- [ ] **Step 2: Confirm the tree is temporarily broken, and why**

Run: `npx tsc --noEmit`

Expected: FAIL. The three category pages still pass `category={CATEGORY}` to `CategoryGallery`, which no longer accepts it. That is correct at this point; Tasks 2, 3 and 4 fix each page in turn. Do not "fix" the pages here.

- [ ] **Step 3: Write the JSX generator**

This exists so no frame is ever retyped. It reads the live content arrays and prints the exact tags.

The content modules are TypeScript importing through the `@/` alias, so plain `node` cannot load them, and `tsx` is not installed in this project. Vitest already resolves that alias (`vitest.config.ts` maps `@` to `src`), so the generator runs as a throwaway test file.

Create `tests/_emit-gallery-jsx.test.ts`:

```ts
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
import { RATIO_CSS, type Photo } from "@/content/portfolio";

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
  return [
    `${pad}<CollageTile>`,
    `${pad}  {/* eslint-disable-next-line @next/next/no-img-element */}`,
    `${pad}  <img`,
    `${pad}    src="${p.path}"`,
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
```

If `tsx/esm` is unavailable, the fallback is to run the same logic from a scratch vitest test (the project already runs vitest with the `@/` alias resolved) and write the files from there. Either route is fine; what matters is that the JSX is generated, never typed.

- [ ] **Step 4: Run the generator**

Run: `npx vitest run tests/_emit-gallery-jsx.test.ts`

Expected: PASS, and three files written under `.superpowers/sdd/gallery-jsx/`.

If it FAILS on the counts assertion, stop and report the real counts. The content arrays are not what this plan assumes, which means every later task's expected numbers are wrong too.

- [ ] **Step 5: Spot-check the generated output**

Read `.superpowers/sdd/gallery-jsx/events.txt` and confirm the first tile reads exactly:

```tsx
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/events/event-one/event-one-1.jpg"
              alt="Placeholder frame 1 for Event One"
              loading="lazy"
              style={frame("1.5")}
            />
          </CollageTile>
```

- [ ] **Step 6: Commit**

The tree does not typecheck yet, which is expected and stated in the commit message so the intermediate state is not mistaken for a mistake.

```bash
git add src/components/lei/CategoryGallery.tsx tests/_emit-gallery-jsx.test.ts
git commit -m "Turn CategoryGallery into a layout shell

Pages own their <img> tags from here, so the visual editor can swap them.
The three category pages do not typecheck until they are unrolled in the
next three commits."
```

---

### Task 2: Unroll the events page

**Files:**
- Modify: `src/app/(site)/gallery/events/page.tsx`
- Create: `src/components/lei/frame.ts`

**Interfaces:**
- Consumes: `CategoryGallery`, `GallerySet` from Task 1; `.superpowers/sdd/gallery-jsx/events.txt`.
- Produces: `export function frame(aspect: string): CSSProperties`, imported by Tasks 3 and 4; and a page holding 18 literal `<img src="...">` tags. Tasks 3 and 4 follow the identical pattern.

**Context:** Smallest of the three, so it proves the pattern before the 40-frame page. The `frame()` helper referenced by the generated JSX does not exist yet; this task creates it here, and Tasks 3 and 4 import it from here rather than redefining it.

`aspectRatio: auto <value>` is what the old grid used: the value only reserves height before the file decodes, and `auto` lets the browser correct to the file's true ratio once it loads. Keeping that means a swapped-in photo of a different shape reflows slightly rather than rendering squashed, which is exactly the behaviour a drag-and-drop workflow needs.

- [ ] **Step 1: Add the shared frame style helper**

Create `src/components/lei/frame.ts`:

```ts
import type { CSSProperties } from "react";

/**
 * The inline style every gallery frame uses.
 *
 * `auto` keeps the file's real ratio once it decodes; the value only reserves
 * height before that. That matters here more than it used to: photos are
 * swapped by dropping a new file over an old one, so the ratio written in the
 * page will often be stale. Stale costs a small reflow, never a squashed photo.
 */
export function frame(aspect: string): CSSProperties {
  return {
    width: "100%",
    height: "auto",
    display: "block",
    aspectRatio: `auto ${aspect}`,
  };
}
```

- [ ] **Step 2: Rewrite the events page**

Replace `src/app/(site)/gallery/events/page.tsx` with the following, pasting the three `<GallerySet>` blocks from `.superpowers/sdd/gallery-jsx/events.txt` where marked. Paste them; do not retype them.

```tsx
import type { Metadata } from "next";
import LeiPage from "@/components/lei/LeiPage";
import Chrome from "@/components/lei/Chrome";
import CategoryHeader from "@/components/lei/CategoryHeader";
import CategoryGallery, { GallerySet } from "@/components/lei/CategoryGallery";
import GalleryCta from "@/components/lei/GalleryCta";
import { CollageTile } from "@/components/lei/Collage";
import { frame } from "@/components/lei/frame";
import { EVENTS_BLURB } from "@/content/events";

export const metadata: Metadata = {
  title: "Event Galleries",
  description:
    "Bay Area event photography: galas, mixers, panels and award nights, shot so the room still looks like itself.",
};

/* Every frame below is a placeholder, and every src is a literal string so the
   visual editor can swap it. Drop a real photo over the file of the same name
   in public/images/portfolio/events/ and it appears here with no code change;
   then update that tag's alt text, and its ratio if the new photo is a
   different shape. */
export default function EventsGalleryPage() {
  return (
    <LeiPage style={{ background: "#0E0D0B", color: "#F7F5F2" }}>
      <Chrome />

      <CategoryHeader label="Events" />
      <CategoryGallery blurb={EVENTS_BLURB} cap={1180}>
        {/* PASTE the three GallerySet blocks from events.txt here */}
      </CategoryGallery>
      <GalleryCta />
    </LeiPage>
  );
}
```

Note the label is now the literal `"Events"` rather than a lookup: with `sets` and `photos` gone from the content type in Task 5, the category lookup buys nothing on this page.

- [ ] **Step 3: Verify it compiles and the srcs are literal**

Run: `npx tsc --noEmit 2>&1 | grep -v "gallery/weddings\|gallery/engagements"`

Expected: no errors mentioning `gallery/events`. Errors for the weddings and engagements pages are still expected; they are unrolled in the next two tasks.

Then run: `grep -c 'src="/images' "src/app/(site)/gallery/events/page.tsx"`

Expected: `18`

Then run: `grep -n 'src={' "src/app/(site)/gallery/events/page.tsx"`

Expected: no output. A computed `src` here is the whole bug this plan exists to fix.

- [ ] **Step 4: Commit**

```bash
git add "src/app/(site)/gallery/events/page.tsx" src/components/lei/frame.ts
git commit -m "Write the event frames out as literal img tags"
```

---

### Task 3: Unroll the engagements page and the hub hero

**Files:**
- Modify: `src/app/(site)/gallery/engagements/page.tsx`
- Modify: `src/app/(site)/gallery/page.tsx`

**Interfaces:**
- Consumes: `CategoryGallery`, `GalleryGrid` from Task 1; `frame` from Task 2; `.superpowers/sdd/gallery-jsx/engagements.txt`.

**Context:** Engagements has one frame and no sets, so it uses `GalleryGrid` rather than `GallerySet`, with `columns={1}` and `cap={560}`. The hub's hero is a single `<img>` currently using `src={img(GALLERY_HERO.path, 2400)}`; it becomes a literal.

The hero is not inside a `Collage` and keeps its own absolute-positioned style. Do not apply `frame()` to it.

- [ ] **Step 1: Rewrite the engagements page**

Replace `src/app/(site)/gallery/engagements/page.tsx` with the following, pasting the `<GalleryGrid>` block from `.superpowers/sdd/gallery-jsx/engagements.txt` where marked:

```tsx
import type { Metadata } from "next";
import LeiPage from "@/components/lei/LeiPage";
import Chrome from "@/components/lei/Chrome";
import CategoryHeader from "@/components/lei/CategoryHeader";
import CategoryGallery, { GalleryGrid } from "@/components/lei/CategoryGallery";
import GalleryCta from "@/components/lei/GalleryCta";
import { CollageTile } from "@/components/lei/Collage";
import { frame } from "@/components/lei/frame";
import { ENGAGEMENTS_BLURB } from "@/content/gallery";

export const metadata: Metadata = {
  title: "Engagement Galleries",
  description:
    "Bay Area engagement and proposal photography. The nerves before, the question, and the yes.",
};

/* Every src below is a literal string so the visual editor can swap it. */
export default function EngagementsGalleryPage() {
  return (
    <LeiPage style={{ background: "#0E0D0B", color: "#F7F5F2" }}>
      <Chrome />

      <CategoryHeader label="Engagements" />
      <CategoryGallery blurb={ENGAGEMENTS_BLURB} cap={560}>
        {/* PASTE the GalleryGrid block from engagements.txt here */}
      </CategoryGallery>
      <GalleryCta />
    </LeiPage>
  );
}
```

`ENGAGEMENTS_BLURB` does not exist yet. Task 5 creates it when it restructures `src/content/gallery.ts`. Until then this import fails; that is expected and Step 3 accounts for it.

- [ ] **Step 2: Make the hub hero literal**

In `src/app/(site)/gallery/page.tsx`, find the hero `<img>` (the first one, with `position: "absolute"` and `objectFit: "cover"`). Read `src/content/gallery.ts` to get `GALLERY_HERO`'s exact `path` and `a` values, then replace:

```tsx
          src={img(GALLERY_HERO.path, 2400)}
          alt={GALLERY_HERO.a}
```

with the literal equivalents. As of this plan those values are:

```tsx
          src="/images/portfolio/weddings/sargon-odelya-select/so-select-636.jpg"
          alt="Bride and groom on the fog-covered dance floor beneath a canopy of string lights, seen from behind"
```

Verify both against the file rather than trusting this plan; if they differ, the file wins and you should say so in your report.

Then remove the now-unused `img` and `GALLERY_HERO` imports from that page.

- [ ] **Step 3: Verify**

Run: `grep -n 'src={' "src/app/(site)/gallery/page.tsx" "src/app/(site)/gallery/engagements/page.tsx"`

Expected: no output.

Run: `npx tsc --noEmit`

Expected: errors only for `src/app/(site)/gallery/weddings/page.tsx` (not yet unrolled) and for the missing `ENGAGEMENTS_BLURB` export (Task 5 adds it). No other errors. Report exactly which errors you see.

- [ ] **Step 4: Commit**

```bash
git add "src/app/(site)/gallery/engagements/page.tsx" "src/app/(site)/gallery/page.tsx"
git commit -m "Write the engagement frame and the hub hero out as literal img tags"
```

---

### Task 4: Unroll the weddings page

**Files:**
- Modify: `src/app/(site)/gallery/weddings/page.tsx`

**Interfaces:**
- Consumes: `CategoryGallery`, `GallerySet` from Task 1; `frame` from Task 2; `.superpowers/sdd/gallery-jsx/weddings.txt`.

**Context:** The largest page: 40 grid frames across three sets, plus the full-bleed feature photo. The three sets each have 7 or more frames, so every set is `columns={4}` and the section takes no `cap` prop.

The feature photo is not in a `Collage`, keeps its `data-feature=""` attribute (the motion engine reads it for the parallax) and its own `transform: scale(1.18)` style. Only its `src` and `alt` become literal.

The testimonial section below it has no images and does not change.

- [ ] **Step 1: Paste the three set blocks**

In `src/app/(site)/gallery/weddings/page.tsx`, replace:

```tsx
      <CategoryGallery category={CATEGORY} />
```

with:

```tsx
      <CategoryGallery blurb={WEDDINGS_BLURB}>
        {/* PASTE the three GallerySet blocks from weddings.txt here */}
      </CategoryGallery>
```

Paste the blocks from `.superpowers/sdd/gallery-jsx/weddings.txt`. Do not retype them. No `cap` prop: the widest set has 26 frames, so the section is uncapped, matching today.

`WEDDINGS_BLURB` does not exist yet; Task 5 adds it.

- [ ] **Step 2: Make the feature photo literal**

Read `src/content/gallery.ts` for `GALLERY_FEATURE.photo`'s exact `path` and `a`, then replace in the full-bleed section:

```tsx
            src={img(GALLERY_FEATURE.photo.path, 2500)}
            alt={GALLERY_FEATURE.photo.a}
```

with the literals. As of this plan:

```tsx
            src="/images/portfolio/weddings/miranda-danny/miranda-danny-14.jpg"
            alt="Groom cupping the bride's face at sunset, her bouquet held between them at the marina railing"
```

Verify against the file; if it differs, the file wins and you should say so.

`GALLERY_FEATURE.kicker` and `GALLERY_FEATURE.line` are copy and stay as data references. Keep that import; drop the `img` import and the `CATEGORY` lookup.

- [ ] **Step 3: Verify the counts and the literal-src rule**

Run: `grep -c 'src="/images' "src/app/(site)/gallery/weddings/page.tsx"`

Expected: `41` (40 grid frames plus the feature).

Run: `grep -n 'src={' "src/app/(site)/gallery/weddings/page.tsx"`

Expected: no output.

Run: `npx tsc --noEmit`

Expected: only the missing-export errors for `WEDDINGS_BLURB` and `ENGAGEMENTS_BLURB`, which Task 5 resolves. Report exactly what you see.

- [ ] **Step 4: Commit**

```bash
git add "src/app/(site)/gallery/weddings/page.tsx"
git commit -m "Write the wedding frames and the feature photo out as literal img tags"
```

---

### Task 5: Unroll the cards and slim the content files

**Files:**
- Modify: `src/components/lei/CategoryCards.tsx`
- Modify: `src/content/gallery.ts`
- Modify: `src/content/events.ts`
- Delete: `tests/_emit-gallery-jsx.test.ts`

**Interfaces:**
- Produces: `src/content/gallery.ts` exporting `WEDDINGS_BLURB`, `ENGAGEMENTS_BLURB`, `GALLERY_FEATURE` and a slimmed `GALLERY`; `src/content/events.ts` exporting `EVENTS_BLURB`, `EVENTS_CARD_BLURB` and `EVENT_NAMES`.

**Context:** This is the task that removes what nothing reads any more. Do it only after Tasks 2, 3 and 4 have landed, so the deletions are provably safe.

`GalleryCategory` loses `cover`, `sets` and `photos`. It keeps `id`, `label`, `blurb`, `href` and `cardBlurb`, which is what the cards and the pages' copy still need. `GALLERY_HERO` also goes: its only reader was the hub hero, now literal.

**Do not touch `src/content/portfolio.ts`.** Several of its arrays (`SARGON_ODELYA_SELECT`, `MIRANDA_DANNY_PHOTOS`, `TRANG_PHOTOS`) may end up referenced nowhere once `gallery.ts` stops importing them. That is expected and they stay. Part of this task's report is naming exactly which exports are now unreferenced anywhere in `src/`, found with `grep -rn`, so the owner can decide later. Do not delete them and do not delete the generator's output directory.

- [ ] **Step 1: Unroll the three cards**

In `src/components/lei/CategoryCards.tsx`, replace the `GALLERY.map(...)` with three cards written out one by one. Extract the repeated card body into a local `Card` component in the same file that takes the text as props and the `<img>` as `children`, so the styling stays in one place while each `src` is a literal at the call site:

```tsx
function Card({
  href,
  label,
  blurb,
  children,
}: {
  href: string;
  label: string;
  blurb: string;
  children: ReactNode;
}) {
```

The `Card` body is the existing `<Link>` markup with `{children}` where the `<img>` was, and `label` / `blurb` where `cat.label` / `cat.cardBlurb` were. Keep every existing style property, the `aria-hidden` gradient overlay, the `pointerEvents: "none"`, the `alt=""` on the image and the `<h2 style={{ margin: 0, ... }}>` for the label. All three were review findings on the previous branch and must survive.

Each call site then reads:

```tsx
      <Card
        href="/gallery/weddings"
        label="Weddings"
        blurb="The whole day, start to finish."
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/portfolio/weddings/sargon-odelya-select/so-select-300.jpg"
          alt=""
          loading="lazy"
          style={CARD_IMG}
        />
      </Card>
```

with `CARD_IMG` a module-level constant holding the existing image style (`width: "100%"`, `height: "auto"`, `aspectRatio: "4 / 5"`, `objectFit: "cover"`, `display: "block"`).

Read `src/content/gallery.ts` for the exact `cover` paths and `cardBlurb` strings of all three categories before writing the call sites. The Events cover is `/images/portfolio/events/events-card-cover.jpg`.

The card labels and blurbs are the one place copy moves into a component. That is a deliberate exception, noted in a comment: the cards are the swap surface, and splitting three short strings across two files to satisfy a lint rule would make them harder to edit, not easier. `tests/gallery.test.ts` gains an assertion in Task 6 that the rendered labels still match `GALLERY`, so they cannot drift.

- [ ] **Step 2: Slim `src/content/gallery.ts`**

- Drop `cover`, `sets` and `photos` from the `GalleryCategory` interface and from all three `GALLERY` entries.
- Drop `GALLERY_HERO`, the `WEDDING_SETS` array, the `GallerySet` interface, and the `fromSets` and `without` helpers if nothing else reads them.
- Keep `GALLERY_FEATURE`'s `kicker` and `line` (still rendered on the weddings page) but drop its `photo` field, now literal in the page.
- Add `export const WEDDINGS_BLURB` and `export const ENGAGEMENTS_BLURB` holding the two blurb strings verbatim, so the pages can import a blurb without a category lookup. Have the `GALLERY` entries reference those same constants for their `blurb`, so there is one copy of each string, not two.
- Remove imports from `@/content/portfolio` that are now unused.
- Rewrite the file's header comment to describe what it is now: the copy behind the gallery pages, with the photos living in the pages so the editor can swap them. Say where the photos went.

- [ ] **Step 3: Slim `src/content/events.ts`**

- Drop `EVENT_SETS` and `EVENTS_CARD_COVER`.
- Keep `EVENTS_BLURB` and `EVENTS_CARD_BLURB` unchanged.
- Add `export const EVENT_NAMES: Array<{ id: string; name: string }>` holding the three ids and names, since the page's `GallerySet` calls need them and they are copy.

  Actually simpler and preferred: the page already writes `<GallerySet id="event-one" name="Event One">` as literals from the generator. If `EVENT_NAMES` would have exactly one reader and that reader already spells the values out, do not add it. Decide by checking the page you produced in Task 2, and say which you chose and why in your report.
- Rewrite the header comment: it currently describes 18 frames that no longer live here. It should tell the owner the frames are now in `src/app/(site)/gallery/events/page.tsx`, one literal `<img>` each, swappable in the editor or by dropping a file of the same name into `public/images/portfolio/events/`.

- [ ] **Step 4: Delete the generator**

```bash
git rm tests/_emit-gallery-jsx.test.ts
```

It reads `cat.photos` and `cat.sets`, which this task removes, so leaving it would leave a permanently failing test in the suite.

- [ ] **Step 5: Verify the whole tree**

Run: `npx tsc --noEmit`

Expected: clean. This is the first point since Task 1 where it should be.

Run: `npm run build`

Expected: success, four gallery routes static.

- [ ] **Step 6: Report the orphans**

Run: `grep -rn "SARGON_ODELYA_SELECT\|MIRANDA_DANNY_PHOTOS\|TRANG_PHOTOS\|SARGON_ODELYA_PHOTOS\|SARGON_ODELYA_CURATED\|SARGON_ODELYA_MORE" src/ | grep -v "^src/content/portfolio.ts"`

List every export from `portfolio.ts` that now has no reader outside its own file. Do not delete any of them. This list goes in your report and nowhere else.

- [ ] **Step 7: Commit**

```bash
git add -A src/ tests/
git commit -m "Unroll the gallery cards and slim the content files to copy"
```

---

### Task 6: Rework the tests

**Files:**
- Modify: `tests/gallery.test.ts`
- Modify: `tests/events.test.ts`
- Modify: `tests/no-em-dash.test.ts` (only if an import broke)

**Interfaces:**
- Consumes: everything from Tasks 1 to 5.

**Context:** The old tests walked content arrays that no longer exist. The coverage has to move to where the data moved: the page sources. `tests/gallery.test.ts` already contains the pattern, in its test that greps `src="(\/[^"]+)"` out of the homepage and checks each file exists. Extend that idea rather than inventing a new one.

The most valuable new test is the computed-`src` guard. Nothing else in the suite can catch a photo silently becoming un-swappable, which is the exact regression this whole plan exists to prevent, and it is a one-line mistake for a future editor to make.

- [ ] **Step 1: Write the failing guard test**

Add to `tests/gallery.test.ts`:

```ts
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
    for (const page of PAGES) {
      const source = readFileSync(join(process.cwd(), page), "utf8");
      const srcs = [...source.matchAll(/src="(\/[^"]+)"/g)].map((m) =>
        decodeURIComponent(m[1])
      );
      expect(srcs.length, `${page} renders no images`).toBeGreaterThan(0);
      for (const s of srcs) {
        expect(existsSync(join(PUBLIC, s)), `missing ${s} in ${page}`).toBe(true);
      }
      total += srcs.length;
    }
    // Every gallery photo, counted once: 1 hero + 3 covers + 41 weddings
    // + 1 engagement + 18 events. Update deliberately when frames are added.
    expect(total).toBe(64);
  });
});
```

- [ ] **Step 2: Run it**

Run: `npx vitest run tests/gallery.test.ts`

Expected: the two new tests PASS (the pages are already unrolled), while the older tests that read `cat.photos`, `cat.cover` and `cat.sets` FAIL to compile or fail outright. That is the signal for Step 3.

- [ ] **Step 3: Remove the assertions whose data is gone**

From `tests/gallery.test.ts`, delete the assertions that read `cat.cover`, `cat.photos` or `cat.sets`, the whole `describe("wedding sets", ...)` block, and the `local image paths > resolve to real files under public/ for every gallery frame` test. Their coverage is now the two tests from Step 1, applied to where the paths actually live.

Keep: the category order and label test, the `href` test, the route-existence test added on the previous branch, the `cardBlurb` and `blurb` non-empty assertions, and the homepage collage and homepage literal-src tests, which are about other files.

Add one assertion tying the cards' hardcoded labels back to content, since Task 5 moved those three strings into the component:

```ts
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
      expect(source, `card label for ${cat.id}`).toContain(`label="${cat.label}"`);
      expect(source, `card blurb for ${cat.id}`).toContain(
        `blurb="${cat.cardBlurb}"`
      );
    }
  });
```

- [ ] **Step 4: Fix `tests/events.test.ts`**

Its photo-array assertions have no data left. Reduce it to what still exists: `EVENTS_BLURB` and `EVENTS_CARD_BLURB` are non-empty, and whatever else `src/content/events.ts` still exports. Add a comment saying the frames are covered by the two gallery-page tests now, and pointing at them by name so the next reader can find that coverage.

If the file would be left with a single trivial assertion, say so in your report and propose folding it into `tests/gallery.test.ts` rather than keeping a near-empty file.

- [ ] **Step 5: Prove the guard actually works**

Temporarily change one `src="/images/..."` on the events page to `src={"/images/portfolio/events/event-one/event-one-1.jpg"}`.

Run: `npx vitest run tests/gallery.test.ts`

Expected: FAIL, with the message naming the events page.

Restore the literal. Run again, expect PASS. Confirm with `git diff` that the page is back to its committed state. Include both runs in your report.

- [ ] **Step 6: Full verification**

Run: `npm test`

Expected: all passing.

Run: `npm run build`

Expected: success, four gallery routes static.

- [ ] **Step 7: Commit**

```bash
git add tests/
git commit -m "Guard that gallery image srcs stay literal and resolve"
```

---

### Task 7: Verify in the browser

**Files:** none. This task changes nothing; it confirms the previous six.

**Context:** The suite proves the paths resolve and the srcs are literal. It cannot prove the pages still look the same. This change moved 64 images between files, so a dropped style or a set rendered in the wrong order is the risk.

Use the `mcp__shipstudio-preview__*` tools.

- [ ] **Step 1: Check each page against its previous state**

Run `mcp__shipstudio-preview__preview_status`, then visit `/gallery`, `/gallery/weddings`, `/gallery/engagements` and `/gallery/events`. For each, confirm:
- The same photos in the same order as before this change
- The set headings still read Sargon & Odelya, Miranda & Danny, Trang on weddings, and Event One / Two / Three on events
- Column counts unchanged: 4 across on weddings, 3 on events, a single centred plate on engagements
- No photo squashed or stretched

- [ ] **Step 2: Check the anchors still work**

Navigate to `/gallery/weddings#trang`. Confirm it scrolls to the Trang set with the heading clear of the fixed header.

- [ ] **Step 3: Check the phone layout**

Set the viewport to 375px. Confirm the hub's three cards stack to one column and no page scrolls horizontally.

- [ ] **Step 4: Check the console**

Run `mcp__shipstudio-preview__preview_console`. Expected: no errors. A 404 on an image path means a `src` typo the tests should have caught, so report it as a test gap as well as a bug.

- [ ] **Step 5: Report**

Report what was verified and anything that looked wrong. Do not silently fix layout problems: describe them, since taste calls belong to the owner.

---

## Handoff note for Raymond

Every photo on the four gallery pages is now a plain `<img src="/images/...">` written into the page file, so the visual editor can swap any of them by clicking.

Two ways to change a photo, both fine:

1. **In the editor.** Click the image, pick a new one. It rewrites the `src` in the page file.
2. **On disk.** Drop a new file over an existing one, keeping the filename. Nothing in the code changes at all.

After a swap, update that tag's `alt` text to describe the new photo, and its `frame("...")` ratio if the new photo is a different shape. The ratio is only a hint that reserves height while the file loads, so a stale one costs a small reflow and never a squashed photo.

The event frames still carry placeholder alt text (`Placeholder frame 3 for Event One`) and the sets are still named Event One, Two and Three. Those are in `src/app/(site)/gallery/events/page.tsx` now, not in a content file.
