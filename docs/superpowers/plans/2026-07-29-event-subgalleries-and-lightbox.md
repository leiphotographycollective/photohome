# Event Sub-Galleries and Lightbox Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn `/gallery/events` into a four-card index, give each event its own page, and let a visitor click any photo on those pages to see it full screen.

**Architecture:** Same hub-and-spoke shape the top-level gallery already uses, one level deeper. The lightbox is the only novel piece: it wraps the grid as a client component and reads the rendered `<img>` elements out of its own subtree instead of taking a photo array, so every `src` stays a literal string the Ship Studio visual editor can swap.

**Tech Stack:** Next.js 16.2.9 App Router, TypeScript, vitest, Lenis 1.1.18 (smooth scroll), GSAP.

## Global Constraints

- **Read the Next.js docs before writing route code.** `AGENTS.md` requires it; this is Next 16.2.9. Relevant file: `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/page.md`. Every route here is static: no `params`, no `searchParams`.
- **`src` must stay a literal string on every gallery image.** `src="/images/..."` is swappable; `src={anything}` is not. `tests/gallery.test.ts` fails the build on a computed `src` anywhere under `src/app/(site)/gallery/`, and that guard is the reason the editor works at all. The lightbox must not reintroduce a photo array.
- **Never retype frame data.** The four event grids already exist as literal JSX in `src/app/(site)/gallery/events/page.tsx`. Moving them means copying those exact blocks, programmatically. 41 frames of paths, alt text and ratios retyped by hand will drift.
- **No em dashes** (U+2014) in any string under `src/content/`.
- **Copy stays in `src/content/`**, with the established exception that a card's label and blurb sit beside its image in the card component, pinned by a test.
- Style values come from `src/components/lei/tokens.ts`.
- **Run the suite with `npm test`.** Build with `npm run build`; it is slow, let it finish.

## File Structure

**Created**

| File | Responsibility |
| --- | --- |
| `src/components/lei/Lightbox.tsx` | Client component. Wraps a grid, collects its `<img>` tags from the DOM, opens the clicked one full screen. |
| `src/components/lei/EventCards.tsx` | The four cards on `/gallery/events`. |
| `src/app/(site)/gallery/events/flora-ai/page.tsx` | 13 frames |
| `src/app/(site)/gallery/events/airaea/page.tsx` | 12 frames |
| `src/app/(site)/gallery/events/sjsu-pd-emmys/page.tsx` | 9 frames |
| `src/app/(site)/gallery/events/other/page.tsx` | 7 frames |

**Modified**

| File | Change |
| --- | --- |
| `src/lib/lei/motion.ts` | Expose the live Lenis instance so the overlay can suspend smooth scroll. |
| `src/app/(site)/gallery/events/page.tsx` | Becomes the four-card index. |
| `src/content/events.ts` | Adds the four events' names, hrefs and blurbs. |
| `tests/gallery.test.ts` | Total 87 to 91; exempt the events index from the empty-alt rule; assert each event card's route exists. |

**Task order:** the lightbox and the Lenis hook land first (Task 1) because the four pages render it; content and cards next (Task 2); the split happens once both exist (Task 3); tests follow the code (Task 4); browser check last (Task 5).

## The four events

| Slug | Name | Frames | Card cover |
| --- | --- | --- | --- |
| `flora-ai` | Flora.AI | 13 | `flora-ai-01.jpg` |
| `airaea` | Airaea | 12 | `airaea-05.jpg` |
| `sjsu-pd-emmys` | SJSU PD Emmys | 9 | `sjsu-pd-emmys-01.jpg` |
| `other` | Other | 7 | `other-01.jpg` |

All four covers are portrait, which suits the 4:5 card. `sjsu-pd-emmys-01` is chosen deliberately over `-02`: `-02` is already the Events cover on `/gallery`, and the same photo on two consecutive screens reads as a mistake.

---

### Task 1: Lightbox

**Files:**
- Modify: `src/lib/lei/motion.ts`
- Create: `src/components/lei/Lightbox.tsx`

**Interfaces:**
- Produces:
  - `export function getLenis(): Lenis | null` from `@/lib/lei/motion`
  - `export default function Lightbox({ children }: { children: ReactNode })`

**Context:** `initLeiMotion` in `src/lib/lei/motion.ts` constructs a Lenis instance at line 33 and destroys it in its cleanup. Nothing outside can reach it today. The overlay needs `lenis.stop()` while open, or the page scrolls behind it under the wheel.

Note `initLeiMotion` returns early with a no-op when `prefers-reduced-motion` is set, so there is no Lenis instance at all in that case. `getLenis()` returning `null` is a normal state, not an error, and the lightbox must work without it.

- [ ] **Step 1: Expose the Lenis instance**

In `src/lib/lei/motion.ts`, add a module-level ref above `initLeiMotion`:

```ts
/** The live Lenis instance, or null when no page has mounted the engine and
 *  when prefers-reduced-motion short-circuits it. Exposed so an overlay can
 *  suspend smooth scroll while it is open; nothing else should touch it. */
let lenisInstance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenisInstance;
}
```

Inside `initLeiMotion`, right after the Lenis instance is constructed, add `lenisInstance = lenis;`. In the cleanup that calls `lenis.destroy()`, add `lenisInstance = null;` immediately after, so a torn-down page never leaves a dead instance behind.

- [ ] **Step 2: Write the Lightbox**

Create `src/components/lei/Lightbox.tsx`:

```tsx
"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { getLenis } from "@/lib/lei/motion";
import { cream } from "@/components/lei/tokens";

interface Frame {
  src: string;
  alt: string;
}

/**
 * Click any photo in the wrapped grid to see it full screen.
 *
 * This deliberately takes no photo list. Every gallery src is a literal string
 * in the page source so the visual editor can swap it, and accepting an array
 * here would put those paths back into data and undo that. Instead it reads the
 * <img> tags it just rendered out of its own subtree, so the markup stays the
 * one source of truth.
 */
export default function Lightbox({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [frames, setFrames] = useState<Frame[]>([]);
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const imgs = Array.from(root.querySelectorAll("img"));
    setFrames(imgs.map((img) => ({ src: img.src, alt: img.alt })));

    const ac = new AbortController();
    imgs.forEach((img, i) => {
      img.style.cursor = "zoom-in";
      img.addEventListener("click", () => setIndex(i), { signal: ac.signal });
    });
    return () => ac.abort();
  }, []);

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (delta: number) =>
      setIndex((i) =>
        i === null ? i : (i + delta + frames.length) % frames.length
      ),
    [frames.length]
  );

  // Lenis keeps driving the page under the overlay unless it is stopped, and
  // the document needs its own overflow lock for the native scrollbar.
  useEffect(() => {
    if (index === null) return;
    const lenis = getLenis();
    lenis?.stop();
    const { overflow } = document.documentElement.style;
    document.documentElement.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = overflow;
      lenis?.start();
    };
  }, [index, close, step]);

  const frame = index === null ? null : frames[index];

  return (
    <>
      <div ref={ref}>{children}</div>

      {frame && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={close}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 300,
            background: "rgba(14,13,11,.94)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "6vh 6vw",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={frame.src}
            alt={frame.alt}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              display: "block",
            }}
          />

          <button
            type="button"
            onClick={close}
            aria-label="Close photo viewer"
            style={btn({ top: 18, right: 22 })}
          >
            Close
          </button>
          {frames.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                aria-label="Previous photo"
                style={btn({ top: "50%", left: 22 })}
              >
                Prev
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                aria-label="Next photo"
                style={btn({ top: "50%", right: 22 })}
              >
                Next
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}

/** The overlay's three controls share one look. */
function btn(position: Record<string, string | number>) {
  return {
    position: "absolute" as const,
    ...position,
    background: "none",
    border: 0,
    color: cream(0.72),
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: ".22em",
    textTransform: "uppercase" as const,
    cursor: "pointer",
    padding: 12,
  };
}
```

Note the overlay `<img>` uses `src={frame.src}`, which is a computed `src`. That is correct and must not be "fixed": this file is a component, not a gallery page, and the swappability guard only walks pages under `src/app/(site)/gallery/` plus `CategoryCards.tsx`. Task 4 confirms the guard's file list still excludes it.

- [ ] **Step 3: Verify it compiles**

Run: `npx tsc --noEmit`

Expected: clean. Nothing imports `Lightbox` yet.

- [ ] **Step 4: Commit**

```bash
git add src/lib/lei/motion.ts src/components/lei/Lightbox.tsx
git commit -m "Add a lightbox that reads its photos from the rendered grid"
```

---

### Task 2: Event content and cards

**Files:**
- Modify: `src/content/events.ts`
- Create: `src/components/lei/EventCards.tsx`

**Interfaces:**
- Produces: `export const EVENTS: Array<{ id: string; name: string; href: string; cardBlurb: string }>` from `@/content/events`, and `export default function EventCards()`.

**Context:** Model `EventCards` on the existing `src/components/lei/CategoryCards.tsx`. **Read that file first** and mirror it, including three details that came from earlier review findings and must not be lost:
- each card image carries `alt=""`, because it is decorative inside a link that already shows a label and blurb
- the card name is an `<h2>` with `margin: 0`
- the gradient overlay keeps `aria-hidden="true"` and the overlays keep `pointerEvents: "none"`

Four cards rather than three, but the same `auto-fit, minmax(260px, 1fr)` grid so they collapse on a phone without a media query.

- [ ] **Step 1: Add the content**

In `src/content/events.ts`, add below the existing blurbs:

```ts
/** The four events behind /gallery/events, in page order. "Other" is last:
 *  it is the catch-all for shoots too small to carry a section of their own. */
export const EVENTS = [
  {
    id: "flora-ai",
    name: "Flora.AI",
    href: "/gallery/events/flora-ai",
    cardBlurb: "A long table, a wine cellar, one evening.",
  },
  {
    id: "airaea",
    name: "Airaea",
    href: "/gallery/events/airaea",
    cardBlurb: "A room learning something, and the person teaching it.",
  },
  {
    id: "sjsu-pd-emmys",
    name: "SJSU PD Emmys",
    href: "/gallery/events/sjsu-pd-emmys",
    cardBlurb: "Statuettes, speeches, and the people holding them.",
  },
  {
    id: "other",
    name: "Other",
    href: "/gallery/events/other",
    cardBlurb: "Galas, panels, and the nights that need no label.",
  },
] as const;
```

- [ ] **Step 2: Write EventCards**

Create `src/components/lei/EventCards.tsx` following `CategoryCards.tsx`. Write the four cards out one by one, each with a literal cover `src`, using the covers from the table at the top of this plan. Extract the shared card body into a local `Card` component exactly as `CategoryCards` does, so the label and blurb sit beside their image at each call site.

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit`, expect clean.
Run: `grep -c 'src="/images' src/components/lei/EventCards.tsx`, expect `4`.
Run: `grep -n 'src={' src/components/lei/EventCards.tsx`, expect no output.

- [ ] **Step 4: Commit**

```bash
git add src/content/events.ts src/components/lei/EventCards.tsx
git commit -m "Add the four event cards and their copy"
```

---

### Task 3: Split the events page into four

**Files:**
- Create: the four `src/app/(site)/gallery/events/<slug>/page.tsx`
- Modify: `src/app/(site)/gallery/events/page.tsx`

**Context:** `src/app/(site)/gallery/events/page.tsx` currently holds four `<GallerySet>` blocks with all 41 literal `<img>` tags. Each block moves to its own page; the index keeps only the header, the blurb and the cards.

**Copy the blocks programmatically.** Find each block's line range with `grep -n 'GallerySet id='` and extract with `sed`, then splice. Do not retype. After each page is written, diff its frame lines against the same lines in the previous version of the events page (`git show HEAD:"src/app/(site)/gallery/events/page.tsx"`) and prove they are identical.

On the new pages the set heading is redundant: the page title already names the event. So each page renders `<GalleryGrid columns={4}>` with the tiles directly, not `<GallerySet>`. `GalleryGrid` is exported from `@/components/lei/CategoryGallery`.

Each event page has this shape, with `Lightbox` wrapping the grid:

```tsx
import type { Metadata } from "next";
import LeiPage from "@/components/lei/LeiPage";
import Chrome from "@/components/lei/Chrome";
import CategoryHeader from "@/components/lei/CategoryHeader";
import CategoryGallery, { GalleryGrid } from "@/components/lei/CategoryGallery";
import GalleryCta from "@/components/lei/GalleryCta";
import Lightbox from "@/components/lei/Lightbox";
import { CollageTile } from "@/components/lei/Collage";
import { frame } from "@/components/lei/frame";

export const metadata: Metadata = { title: "...", description: "..." };

export default function FloraAiEventPage() {
  return (
    <LeiPage style={{ background: "#0E0D0B", color: "#F7F5F2" }}>
      <Chrome />
      <CategoryHeader label="Flora.AI" />
      <CategoryGallery blurb="...">
        <Lightbox>
          <GalleryGrid columns={4}>
            {/* the event's CollageTile blocks, moved verbatim */}
          </GalleryGrid>
        </Lightbox>
      </CategoryGallery>
      <GalleryCta />
    </LeiPage>
  );
}
```

Each page needs a one-line blurb describing that event, written in Raymond's first-person voice, no em dashes. These go in `src/content/events.ts` alongside `EVENTS` (add a `blurb` field to each entry) rather than inline, so the em-dash and voice guards cover them. Use what the photographs actually show:

- Flora.AI: a private company dinner in the wine cellar at Lazy Bear, one long table
- Airaea: a leadership workshop, a speaker and a room taking notes
- SJSU PD Emmys: an Emmy awards night for the San Jose State University Police Department
- Other: two smaller nights, a mansion evening and an Assyrian Advisors panel

`CategoryHeader` links back to `/gallery`. On these pages the more useful destination is `/gallery/events`. Add an optional `backHref` and `backLabel` prop to `CategoryHeader`, defaulting to `/gallery` and `Gallery` so the existing three callers are unchanged, and pass `/gallery/events` and `Events` here.

- [ ] **Step 1: Create the four event pages**

Extract each block and write each page as above.

- [ ] **Step 2: Prove the frames moved intact**

For each of the four, diff its `<img>` lines against the old events page. Every `src`, `alt` and `frame(...)` value must match. Include the diff commands and their output in your report.

Run: `grep -c 'src="/images' src/app/\(site\)/gallery/events/*/page.tsx`

Expected: 13, 12, 9, 7 in some order, summing to 41.

- [ ] **Step 3: Rewrite the index**

Replace `src/app/(site)/gallery/events/page.tsx` with the header, the existing `EVENTS_BLURB`, `<EventCards />`, and `GalleryCta`. It keeps its current `metadata`. No `<img>` tags remain in this file: its four images now live in `EventCards.tsx`.

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit`, expect clean.
Run: `npm run build`, expect success with `/gallery/events` and the four new routes all static.

- [ ] **Step 5: Commit**

```bash
git add "src/app/(site)/gallery/events" src/content/events.ts src/components/lei/CategoryHeader.tsx
git commit -m "Give each event its own page behind a card"
```

---

### Task 4: Tests

**Files:**
- Modify: `tests/gallery.test.ts`

**Context:** Read the current file first. The page-discovery walk in `describe("gallery images stay swappable")` finds `page.tsx` recursively under `src/app/(site)/gallery`, so the four new routes are picked up automatically. Three things need updating.

- [ ] **Step 1: Update the total**

The count goes from 87 to 91: the four event card covers are new, and the 41 event frames moved rather than multiplied. Update the assertion and the arithmetic comment above it, which should read: 1 hub hero + 3 category card covers + 4 event card covers + 41 weddings + 1 engagement + 41 events = 91.

- [ ] **Step 2: Exempt the events index from the empty-alt rule**

`CATEGORY_PAGES` currently means "everything under /gallery/ except the hub", and the empty-alt check runs over it. `/gallery/events` is now a card index whose four covers carry `alt=""` deliberately, for the same reason `CategoryCards.tsx` is already excluded. Exclude it too, and rewrite the comment to say the rule is about grid photos, which are content, and that card covers are decorative because their link already carries a visible label and blurb.

- [ ] **Step 3: Assert the event cards lead somewhere real**

Add a test walking `EVENTS` from `@/content/events`, asserting a `page.tsx` exists at the matching path under `src/app/(site)` for each `href`, and that `EventCards.tsx` contains each event's `href`, `name` and `cardBlurb`. This is the same pair of guards the category cards already have: one for dead links, one so the copy in the component cannot drift from content.

- [ ] **Step 4: Prove the new guards work**

Temporarily point one `EVENTS` href at a route that does not exist, run the test, confirm it fails naming that event, then revert. Do the same for one card blurb. Include both red runs in your report.

- [ ] **Step 5: Verify**

Run: `npm test`, expect all passing. Run `npx tsc --noEmit`, expect clean. Confirm with `git status` that no probe edit survived.

- [ ] **Step 6: Commit**

```bash
git add tests/gallery.test.ts
git commit -m "Cover the event sub-galleries and their cards"
```

---

### Task 5: Verify in the browser

**Files:** none.

Use the `mcp__shipstudio-preview__*` tools.

- [ ] **Step 1: The index**

Visit `/gallery/events`. Four cards, evenly spaced, correct names and covers, hover zoom working.

- [ ] **Step 2: Each event page**

Click into each. Confirm the right frame count, that the grid matches what that section looked like before the split, and that the back link reads Events and returns to `/gallery/events`.

- [ ] **Step 3: The lightbox**

On one event page, click a photo. Confirm it opens full screen, the page does not scroll behind it, Prev and Next move through that event's photos, Escape closes it, and clicking the backdrop closes it. Then scroll the page and confirm smooth scrolling still works, which proves Lenis was restarted rather than left stopped.

- [ ] **Step 4: Phone**

At 375px: cards stack to one column, and the lightbox is usable with the controls reachable.

- [ ] **Step 5: Console**

Expect no errors. A 404 on an image means a `src` typo the tests should have caught, so report it as a test gap too.

- [ ] **Step 6: Report**

Report what was verified and anything that looked wrong. Do not silently fix layout problems; describe them, since taste calls belong to the owner.
