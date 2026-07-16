# Voice Alignment, Testimonial & Payment Plans Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the approved spec at `docs/superpowers/specs/2026-07-16-voice-testimonial-payment-design.md`: new "present, not stressed" hero line, the Sargon & Odelya testimonial section on the home page, a payment-plans bullet on /investment, and site-wide voice alignment.

**Architecture:** All copy lives either in content modules (`src/content/*.ts`) guarded by exact-match vitest tests in `tests/`, or inline in server page components (`src/app/(site)/*/page.tsx`). The testimonial UI is one new client component consuming the existing `TESTIMONIALS` array. No new dependencies.

**Tech Stack:** Next.js 16 (App Router, Turbopack), React 19, TypeScript, vitest (`npm run test`), GSAP-driven animations wired via existing `data-fadeup`/`data-reveal` attributes (no new motion code).

## Global Constraints

- **Voice rule (from spec):** editorial confidence, spoken like a friend — direct address, contractions, concrete images. Never use: "artistry," "gracefully," "intention/intentional," "milestones," "documented," "curated record," "genuine/authenticity" as abstractions.
- **Copy is verbatim from the spec** — do not improvise different wording than what a task shows.
- **Typography:** JSX copy uses HTML entities for typographic characters (`&rsquo;` `&ldquo;` `&rdquo;` `&mdash;` or literal `—`); TS string content uses literal typographic apostrophes (`’`) as the existing content files do.
- **No-placeholder rule (repo convention):** empty content arrays render nothing; never render placeholder text.
- **No-photo-reuse rule:** no photo may appear twice on the homepage. The testimonial photo `SARGON_ODELYA_PHOTOS[23]` is currently unused there — keep it that way.
- Run commands from the repo root `C:\Users\raymo\ShipStudio\photohome`. Tests: `npm run test` (vitest, zero-config beyond `vitest.config.ts`).
- Each commit message ends with the project's standard co-author trailer.

---

### Task 1: Positioning constants & hero line

**Files:**
- Modify: `tests/homepage-content.test.ts:28-30`
- Modify: `src/content/homepage.ts:21-22`
- Modify: `src/app/(site)/page.tsx:13-17` (meta), `~line 219` (desktop hero sub), `~lines 320-331` (mobile hero h1 + new sub)

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: `POSITIONING_SUB` (string) with the new value — no other task imports it, but Task 6's voice-guard test scans its file.

- [ ] **Step 1: Update the positioning test to the new line (failing test)**

In `tests/homepage-content.test.ts`, replace:

```ts
    expect(POSITIONING_SUB).toBe(
      "Bay Area wedding photographer for couples who bring the style and the party."
    );
```

with:

```ts
    expect(POSITIONING_SUB).toBe(
      "Bay Area wedding photography for couples who want to be present in their wedding — not stressed about it."
    );
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- tests/homepage-content.test.ts`
Expected: FAIL — "positioning constants > match the approved spec exactly" (received the old style-and-party string).

- [ ] **Step 3: Update `POSITIONING_SUB` in `src/content/homepage.ts`**

Replace:

```ts
export const POSITIONING_SUB =
  "Bay Area wedding photographer for couples who bring the style and the party.";
```

with:

```ts
export const POSITIONING_SUB =
  "Bay Area wedding photography for couples who want to be present in their wedding — not stressed about it.";
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm run test -- tests/homepage-content.test.ts`
Expected: PASS (all tests in the file).

- [ ] **Step 5: Update the home meta description in `src/app/(site)/page.tsx`**

Replace:

```ts
  description:
    `${POSITIONING} Editorial wedding photography for fun, stylish couples in the ${CITY} & beyond — by Raymond Lei.`,
```

with:

```ts
  description:
    `${POSITIONING} Editorial wedding photography for couples who want to be present in their wedding, not stress about it — ${CITY} & beyond, by Raymond Lei.`,
```

- [ ] **Step 6: Update the desktop hero sub-line in `src/app/(site)/page.tsx`**

Find the first `data-hero-sub` div (inside the hero lockup, ~line 208-220) and replace its text:

```
              Your wedding, shot like the cover story it is — for couples who bring the style and the party.
```

with:

```
              Your wedding, shot like the cover story it is — for couples who want to be present in their wedding, not stress about it.
```

- [ ] **Step 7: Add the qualifier sub-line to the mobile hero**

In the `.lx-hero-mobile` section of `src/app/(site)/page.tsx`, the h1 currently reads:

```tsx
          <h1
            style={{
              margin: "0 0 24px",
              fontFamily: SERIF,
              fontWeight: 500,
              fontSize: "clamp(34px,9.5vw,46px)",
              lineHeight: 1.12,
              textWrap: "pretty",
            }}
          >
            Your wedding, shot like the <em>cover story</em> it is.
          </h1>
```

Change its margin to `"0 0 14px"` and insert directly after the `</h1>`:

```tsx
          <p
            style={{
              margin: "0 0 24px",
              maxWidth: 340,
              fontSize: 14,
              lineHeight: 1.6,
              color: cream(0.85),
            }}
          >
            For couples who want to be present in their wedding — not stress
            about it.
          </p>
```

(`cream` is already imported in `page.tsx` from `@/components/lei/tokens`.)

- [ ] **Step 8: Run the full test suite**

Run: `npm run test`
Expected: PASS (4 test files).

- [ ] **Step 9: Commit**

```bash
git add tests/homepage-content.test.ts src/content/homepage.ts "src/app/(site)/page.tsx"
git commit -m "Lead positioning with the present-not-stressed promise"
```

---

### Task 2: Testimonial data model + Sargon & Odelya entry

**Files:**
- Modify: `tests/homepage-content.test.ts:70-77` (testimonials describe block)
- Modify: `src/content/homepage.ts:38-45` (interface + array)

**Interfaces:**
- Consumes: `SARGON_ODELYA_PHOTOS` and `Photo` (already imported in `homepage.ts`).
- Produces: `Testimonial` = `{ pull: string; quote: string; names: string; context?: string; photo: Photo }`; `TESTIMONIALS[0]` populated. Task 3's component reads exactly these fields.

- [ ] **Step 1: Extend the testimonials test (failing test)**

In `tests/homepage-content.test.ts`, replace the `describe("testimonials", ...)` block with:

```ts
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- tests/homepage-content.test.ts`
Expected: FAIL — `TESTIMONIALS.length` is 0 (and TypeScript may already flag `t.pull`).

- [ ] **Step 3: Extend the interface and add the entry in `src/content/homepage.ts`**

Replace:

```ts
export interface Testimonial {
  quote: string;
  names: string; // e.g. "Sargon & Odelya"
  context?: string; // e.g. "Wedding · Bay Area"
}

/** Real client quotes only — Raymond supplies these; empty until then. */
export const TESTIMONIALS: Testimonial[] = [];
```

with:

```ts
export interface Testimonial {
  pull: string; // the italic serif pull-quote line
  quote: string; // the rest of the quote, rendered as body text
  names: string; // e.g. "Sargon & Odelya"
  context?: string; // e.g. "Wedding · Bay Area"
  photo: Photo; // portrait rendered beside the quote
}

/** Real client quotes only — never placeholder text. */
export const TESTIMONIALS: Testimonial[] = [
  {
    pull:
      "He took the time to understand which shots were critical to our culture — and didn’t miss a single beat.",
    quote:
      "We had a traditional Middle Eastern wedding, and we were so impressed by how quickly Raymond got up to speed on our specific traditions. His organization and talent far exceed his years — really top-tier. He met with us for an engagement shoot to understand our energy and post-production preferences, and on the big day he was a total pro — complete with a full itinerary and backup equipment. He worked seamlessly with our videographer, and his artistic touch resulted in an excellent final gallery. We absolutely loved the photos and can’t wait to book our anniversary shoot with him!",
    names: "Sargon & Odelya",
    context: "Wedding · Bay Area, CA",
    photo: SARGON_ODELYA_PHOTOS[23], // first dance in fog, black & white — unused elsewhere on the homepage
  },
];
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm run test`
Expected: PASS. (The old `TestimonialSlot` in `Cta.tsx` still compiles — it reads only `quote`/`names`/`context`. It now would render on the homepage, which Task 3 removes; do not run the dev server between Tasks 2 and 3 expecting final visuals.)

- [ ] **Step 5: Commit**

```bash
git add tests/homepage-content.test.ts src/content/homepage.ts
git commit -m "Add Sargon & Odelya testimonial with pull-quote and photo"
```

---

### Task 3: TestimonialFeature component + homepage integration

**Files:**
- Create: `src/components/lei/TestimonialFeature.tsx`
- Modify: `src/app/(site)/page.tsx` (line 9 import; remove `<TestimonialSlot index={0} />` ~line 495; insert section after the portfolio section ~line 715)
- Modify: `src/components/lei/Cta.tsx` (delete `TestimonialSlot`, prune imports)

**Interfaces:**
- Consumes: `TESTIMONIALS` from Task 2 (`pull`, `quote`, `names`, `context`, `photo`); `img(path, width)` from `@/content/portfolio`; `GOLD, MUTED, SERIF, ink, kicker` from `./tokens`.
- Produces: default export `TestimonialFeature()` — a self-contained `<section>`; renders `null` when `TESTIMONIALS` is empty.

- [ ] **Step 1: Create `src/components/lei/TestimonialFeature.tsx`**

```tsx
"use client";

import { useState } from "react";
import { GOLD, MUTED, SERIF, ink, kicker } from "./tokens";
import { img } from "@/content/portfolio";
import { TESTIMONIALS } from "@/content/homepage";

/** Featured client testimonial — portrait beside an italic pull-quote with
 *  the full quote as body text (reference layout). Renders nothing while
 *  TESTIMONIALS is empty; prev/next arrows appear only once a second
 *  testimonial exists (no-placeholder rule). */
export default function TestimonialFeature() {
  const [index, setIndex] = useState(0);
  const t = TESTIMONIALS[index];
  if (!t) return null;
  const many = TESTIMONIALS.length > 1;
  const step = (d: number) =>
    setIndex((v) => (v + d + TESTIMONIALS.length) % TESTIMONIALS.length);

  const arrow = {
    background: "none",
    border: `1px solid ${ink(0.25)}`,
    borderRadius: 999,
    width: 44,
    height: 44,
    fontSize: 16,
    color: "#0E0D0B",
    cursor: "pointer",
  } as const;

  return (
    <section
      style={{
        position: "relative",
        background: "#F7F5F2",
        color: "#0E0D0B",
        padding: "16vh 6vw",
      }}
    >
      <div
        className="lx-grid-2col"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(280px,440px) 1fr",
          gap: "6vw",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div data-reveal="" style={{ overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img(t.photo.path, 1000)}
            alt={t.photo.a}
            loading="lazy"
            style={{
              width: "100%",
              aspectRatio: "3 / 4",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
        <div style={{ maxWidth: 560 }}>
          <div data-fadeup="" style={kicker({ marginBottom: 26 }, 10, ".3em")}>
            From the couple above
          </div>
          <blockquote
            data-fadeup=""
            style={{
              margin: 0,
              borderTop: `1px solid ${ink(0.14)}`,
              paddingTop: 30,
              fontFamily: SERIF,
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(22px,2.6vw,32px)",
              lineHeight: 1.4,
              textWrap: "pretty",
            }}
          >
            &ldquo;{t.pull}&rdquo;
          </blockquote>
          <p
            data-fadeup=""
            style={{ margin: "26px 0 0", fontSize: 15, lineHeight: 1.8, color: MUTED }}
          >
            {t.quote}
          </p>
          <div
            data-fadeup=""
            style={{
              marginTop: 30,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: ".22em",
              textTransform: "uppercase",
              color: GOLD,
            }}
          >
            — {t.names}
            {t.context ? ` · ${t.context}` : ""}
          </div>
          {many && (
            <div style={{ marginTop: 28, display: "flex", gap: 14 }}>
              <button
                aria-label="Previous testimonial"
                data-hover=""
                onClick={() => step(-1)}
                style={arrow}
              >
                &larr;
              </button>
              <button
                aria-label="Next testimonial"
                data-hover=""
                onClick={() => step(1)}
                style={arrow}
              >
                &rarr;
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Integrate on the homepage**

In `src/app/(site)/page.tsx`:

a. Line 9 — remove `TestimonialSlot` from the import:

```ts
import { CtaLink, SecondaryCta, SoftLink } from "@/components/lei/Cta";
```

b. Below the other component imports, add:

```ts
import TestimonialFeature from "@/components/lei/TestimonialFeature";
```

c. Delete the line `<TestimonialSlot index={0} />` (in the "Who I photograph" section, after the CTA stack).

d. Directly after the closing `</section>` of the Wedding Portfolio section (the dark section containing `WEDDING_PORTFOLIO.map`; its `</section>` sits just before the `{/* ══ About ══ */}` comment), insert:

```tsx
      {/* ══ From the couple above — Sargon & Odelya, on working with me ══ */}
      <TestimonialFeature />
```

- [ ] **Step 3: Delete `TestimonialSlot` from `src/components/lei/Cta.tsx`**

Remove the entire `TestimonialSlot` function (lines 88-129) and prune its now-unused imports: remove `SERIF` from the tokens import and `TESTIMONIALS` from the homepage import, leaving:

```ts
import { GOLD, pill, cream, ink } from "./tokens";
import {
  CTA_HREF,
  CTA_LABEL,
  SECONDARY_CTA_HREF,
  SECONDARY_CTA_LABEL,
} from "@/content/homepage";
```

- [ ] **Step 4: Type-check and test**

Run: `npx tsc --noEmit`
Expected: no errors (in particular, no remaining reference to `TestimonialSlot`).

Run: `npm run test`
Expected: PASS.

- [ ] **Step 5: Visual smoke check**

Run the dev server (`npm run dev`, or use the one already running) and load `http://localhost:3000/`. Scroll past the wedding gallery.
Expected: cream section — photo left (first-dance b&w), "FROM THE COUPLE ABOVE" kicker, italic pull-quote, body quote, gold "— SARGON & ODELYA · WEDDING · BAY AREA, CA". No arrows (single testimonial). The "For couples like you" section no longer renders a quote.

- [ ] **Step 6: Commit**

```bash
git add src/components/lei/TestimonialFeature.tsx src/components/lei/Cta.tsx "src/app/(site)/page.tsx"
git commit -m "Add featured testimonial section after the wedding gallery"
```

---

### Task 4: Payment plans bullet on /investment

**Files:**
- Modify: `tests/pricing.test.ts:25`
- Modify: `src/content/pricing.ts:54-58`

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: `INCLUDED_EVERYWHERE` grows to 4 entries; the /investment page renders it automatically.

- [ ] **Step 1: Update the pricing test (failing test)**

In `tests/pricing.test.ts`, replace:

```ts
    expect(INCLUDED_EVERYWHERE).toHaveLength(3);
```

with:

```ts
    expect(INCLUDED_EVERYWHERE).toHaveLength(4);
    expect(INCLUDED_EVERYWHERE[3]).toBe(
      "Monthly payment plans — every collection can be split into monthly payments"
    );
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- tests/pricing.test.ts`
Expected: FAIL — expected length 4, received 3.

- [ ] **Step 3: Add the bullet in `src/content/pricing.ts`**

Replace:

```ts
export const INCLUDED_EVERYWHERE = [
  "100–150 fully edited images per hour of coverage",
  "Online gallery to view, download and order prints (Pic-Time, 12-month access)",
  "Full-resolution downloads + printing rights",
];
```

with:

```ts
export const INCLUDED_EVERYWHERE = [
  "100–150 fully edited images per hour of coverage",
  "Online gallery to view, download and order prints (Pic-Time, 12-month access)",
  "Full-resolution downloads + printing rights",
  "Monthly payment plans — every collection can be split into monthly payments",
];
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm run test -- tests/pricing.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add tests/pricing.test.ts src/content/pricing.ts
git commit -m "Offer monthly payment plans on every collection"
```

---

### Task 5: Voice pass — /work, /weddings, home marquee, portfolio.ts

**Files:**
- Modify: `src/app/(site)/work/page.tsx` (meta ~line 14, kicker ~line 61, headline ~lines 72-77, sub ~lines 100-102, closing ~lines 181-182)
- Modify: `src/app/(site)/weddings/page.tsx` (meta lines 10-14, local `PROCESS` lines 16-21, headline lines 112-117, sub lines 129-132, pull quote lines 261-262, process usage line 279, booking line 307)
- Modify: `src/app/(site)/page.tsx:880` (marquee phrase)
- Modify: `src/content/portfolio.ts:220` (weddings category description)

**Interfaces:**
- Consumes: `HOME_PROCESS` from `@/content/experience` (existing export; Task 6 edits its wording without changing the name).
- Produces: nothing other tasks consume. Task 6's voice-guard test scans these files.

- [ ] **Step 1: Rewrite the /work hero and meta**

In `src/app/(site)/work/page.tsx`:

a. Meta description — replace:

```ts
  description:
    "Weddings, graduations, portraits & editorials, headshots & events, engagements & proposals — photographed with intention across the Bay Area.",
```

with:

```ts
  description:
    "Weddings, graduations, portraits & editorials, headshots & events, engagements & proposals — all over the Bay Area.",
```

b. Hero kicker — replace `Step into a collection of` with `The full portfolio — five chapters`.

c. Hero headline — replace:

```tsx
            <div data-title-line="" style={{ fontSize: "clamp(52px,10vw,148px)" }}>
              ARTISTRY BORN
            </div>
            <div data-title-line="" style={{ fontSize: "clamp(52px,10vw,148px)" }}>
              FROM <em style={{ fontWeight: 400 }}>PRESENCE</em>
            </div>
```

with:

```tsx
            <div data-title-line="" style={{ fontSize: "clamp(52px,10vw,148px)" }}>
              REAL DAYS,
            </div>
            <div data-title-line="" style={{ fontSize: "clamp(52px,10vw,148px)" }}>
              SHOT LIKE
            </div>
            <div data-title-line="" style={{ fontSize: "clamp(52px,10vw,148px)" }}>
              <em style={{ fontWeight: 400 }}>COVER STORIES.</em>
            </div>
```

d. Hero sub — replace:

```
              Weddings, graduations, portraits &amp; editorials, headshots &amp;
              events, engagements &amp; proposals — photographed with intention
              across the Bay Area.
```

with:

```
              Weddings, graduations, portraits &amp; editorials, headshots &amp;
              events, engagements &amp; proposals — all over the Bay Area.
```

e. Closing line — replace:

```tsx
          A curated record of the genuine — something deep, meaningful &amp;{" "}
          <em>real</em>.
```

with:

```tsx
          If it mattered to you, it&rsquo;ll be in the <em>photos</em>.
```

- [ ] **Step 2: Rewrite /weddings — meta, headline, sub, pull quote, process, booking line**

In `src/app/(site)/weddings/page.tsx`:

a. Meta — replace:

```ts
export const metadata: Metadata = {
  title: "Weddings — Documented Gracefully",
  description:
    "Bay Area wedding photography with artistry, intention and presence. The full arc of your day — the quiet preparation, the vows, the first dance.",
};
```

with:

```ts
export const metadata: Metadata = {
  title: "Weddings — Present for All of It",
  description:
    "Bay Area wedding photography for couples who want to be present in their wedding — not stressed about it. The full arc of your day, from getting ready to the last song.",
};
```

b. Delete the local `PROCESS` constant (lines 16-21) and instead import the shared copy — add to the existing imports:

```ts
import { HOME_PROCESS } from "@/content/experience";
```

then change `<ProcessSteps steps={PROCESS} />` to `<ProcessSteps steps={HOME_PROCESS} />`.

c. Headline — replace:

```tsx
            <div data-title-line="" style={{ fontSize: "clamp(40px,9vw,140px)" }}>
              DOCUMENTED
            </div>
            <div data-title-line="" style={{ fontSize: "clamp(40px,9vw,140px)" }}>
              <em style={{ fontWeight: 400 }}>GRACEFULLY.</em>
            </div>
```

with:

```tsx
            <div data-title-line="" style={{ fontSize: "clamp(40px,9vw,140px)" }}>
              PRESENT FOR
            </div>
            <div data-title-line="" style={{ fontSize: "clamp(40px,9vw,140px)" }}>
              <em style={{ fontWeight: 400 }}>ALL OF IT.</em>
            </div>
```

d. Hero sub — replace:

```
            I create space for you to slow down and experience your day as it
            unfolds — thoughtful guidance and intentional planning, before the
            camera ever comes out.
```

with:

```
            You two stay in the day — I&rsquo;ll make sure you get it back. The
            planning happens before the camera ever comes out.
```

e. Pull quote — replace:

```
          Your milestones deserve to be documented gracefully — with artistry,
          intention, and presence.
```

with:

```
          The moments you&rsquo;ll want back, kept the way they felt.
```

f. Booking line — replace:

```tsx
            Currently booking 2026 <em>weddings</em>.
```

with:

```tsx
            Now booking 2026 &amp; 2027 <em>weddings</em>.
```

- [ ] **Step 3: Home marquee + weddings category description**

a. `src/app/(site)/page.tsx` line 880 — replace:

```tsx
        <Marquee phrase="A curated record of the genuine" />
```

with:

```tsx
        <Marquee phrase="You live it. I'll keep it." />
```

b. `src/content/portfolio.ts` line 220 — in the weddings category, replace the description:

```
"The full arc of a day — the quiet preparation, the vows, the first dance. A curated record of the genuine.",
```

with:

```
"The full arc of a day — the quiet getting-ready hours, the vows, the dance floor.",
```

c. `src/components/lei/blocks.tsx` line 40 — the Marquee doc comment quotes the old phrase (Task 6's voice-guard test scans this file). Replace:

```ts
/** Bordered marquee band ("A curated record of the genuine · Inquire ·"). */
```

with:

```ts
/** Bordered marquee band ("You live it. I'll keep it. · Inquire ·"). */
```

- [ ] **Step 4: Type-check, test, and eyeball**

Run: `npx tsc --noEmit` — expected: no errors (catches a missed `PROCESS` reference in weddings).
Run: `npm run test` — expected: PASS.
Load `http://localhost:3000/work` and `/weddings` — new headlines render, letter-split entrance still animates (the `data-title-line` attributes are unchanged).

- [ ] **Step 5: Commit**

```bash
git add "src/app/(site)/work/page.tsx" "src/app/(site)/weddings/page.tsx" "src/app/(site)/page.tsx" src/content/portfolio.ts src/components/lei/blocks.tsx
git commit -m "Align /work and /weddings copy with the homepage voice"
```

---

### Task 6: Voice pass — /experience, /about, /inquire, shared process + voice-guard test

**Files:**
- Create: `tests/voice.test.ts`
- Modify: `tests/experience-content.test.ts:26-31`
- Modify: `src/content/experience.ts:19-34`
- Modify: `src/app/(site)/experience/page.tsx` (meta line 14, kicker line 59, sub lines 98-99, mid lines 216-230, closing lines 499 & 513)
- Modify: `src/app/(site)/about/page.tsx` (paragraphs lines 70-106, gallery kicker line 147, pull quote line 205)
- Modify: `src/app/(site)/inquire/page.tsx` (hero sub ~lines 84-88)

**Interfaces:**
- Consumes: nothing new.
- Produces: `PROCESS`/`HOME_PROCESS` keep their names and `ProcessStep[]` type (weddings page from Task 5 imports `HOME_PROCESS`); `tests/voice.test.ts` becomes the permanent guard for the voice rule.

- [ ] **Step 1: Write the voice-guard test (failing)**

Create `tests/voice.test.ts`:

```ts
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/** Formal-register phrases the voice spec retired (2026-07-16 design).
 *  Scoped to exact retired phrases so legitimate words don't false-positive. */
const BANNED: RegExp[] = [
  /curated record/i,
  /gracefully/i,
  /artistry/i,
  /photographed with intention/i,
  /uniquely yours/i,
  /life.s milestones/i,
  /milestones are alike/i,
  /celebrating a milestone/i,
];

const ROOTS = ["src/app", "src/content", "src/components"];

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return walk(p);
    return /\.(ts|tsx)$/.test(name) ? [p] : [];
  });
}

describe("voice rule", () => {
  it("no source file uses the retired formal register", () => {
    const offenders: string[] = [];
    for (const root of ROOTS) {
      for (const file of walk(root)) {
        const text = readFileSync(file, "utf8");
        for (const re of BANNED) {
          if (re.test(text)) offenders.push(`${file} → ${re}`);
        }
      }
    }
    expect(offenders).toEqual([]);
  });
});
```

- [ ] **Step 2: Run it to verify it fails on the pages this task rewrites**

Run: `npm run test -- tests/voice.test.ts`
Expected: FAIL — offenders list includes `src/app/(site)/experience/page.tsx` and `src/app/(site)/about/page.tsx` (and nothing from /work or /weddings, already cleaned in Task 5; if those appear, fix Task 5 first).

- [ ] **Step 3: Update the process copy test (failing)**

In `tests/experience-content.test.ts`, replace the second `it` in `describe("process", ...)`:

```ts
  it("homepage variant swaps milestones for weddings in step 03 only", () => {
    expect(PROCESS[2].body).toContain("No two milestones are alike");
    expect(HOME_PROCESS[2].body).toContain("No two weddings are alike");
    // every other step is the identical object
    expect(HOME_PROCESS.filter((s, i) => s !== PROCESS[i])).toHaveLength(1);
  });
```

with:

```ts
  it("speaks weddings everywhere — home and experience share one copy", () => {
    expect(PROCESS[2].body).toContain("No two weddings are alike");
    expect(HOME_PROCESS).toBe(PROCESS);
  });
```

Run: `npm run test -- tests/experience-content.test.ts` — expected: FAIL.

- [ ] **Step 4: Unify the process copy in `src/content/experience.ts`**

Replace lines 19-34 (the `PROCESS` array and `HOME_PROCESS` derivation) with:

```ts
/** Inquire → Connect → Customize → Reserve, as rendered by ProcessSteps.
 *  One copy for home, /experience and /weddings. */
export const PROCESS: ProcessStep[] = [
  { n: "01", title: "Inquire", body: "Start by telling me a bit about what you're envisioning via the inquiry form. This is where your story begins." },
  { n: "02", title: "Connect", body: "We'll get on a call — your venue, your vision, what you're nervous about, and what actually matters to you in the photos." },
  { n: "03", title: "Customize", body: "No two weddings are alike. I'll design a proposal that reflects your priorities, so the experience fits you." },
  { n: "04", title: "Reserve", body: "Date locked, plan started. From here, the photography is handled." },
];

/** Alias kept so existing imports stay valid — the copy is now identical. */
export const HOME_PROCESS = PROCESS;
```

Run: `npm run test -- tests/experience-content.test.ts` — expected: PASS.

- [ ] **Step 5: Rewrite /experience copy**

In `src/app/(site)/experience/page.tsx`:

a. Meta — replace:

```ts
  description:
    "Personalized, supportive photography for life's milestones. What working with Lei Photography Collective feels like — before, during and after the shutter clicks.",
```

with:

```ts
  description:
    "What it's like to work with me — how I make the day feel easy and the photos feel like you, before, during and after the shutter clicks.",
```

b. Hero kicker — replace `Personalized, supportive photography for life&rsquo;s milestones` with `What it&rsquo;s like to work with me`.

c. Hero sub — replace:

```
              More than a set of photographs — a record of how your moment truly
              felt, made with artistry and care.
```

with:

```
              Here&rsquo;s how I make the day feel easy — and the photos feel
              like you.
```

d. Mid statement h2 (lines 216-217) — replace:

```
          Whether you&rsquo;re celebrating a milestone, marking a new chapter, or
          creating something uniquely your own…
```

with:

```
          Wedding, graduation, or something only you two would think up&hellip;
```

e. Mid statement p (lines 229-230) — replace:

```
          I&rsquo;ll bring my calm, supportive demeanor and thoughtful approach.
          Together, we&rsquo;ll create an experience that&rsquo;s uniquely yours.
```

with:

```
          I show up calm, prepared, and genuinely excited. You bring the day;
          I&rsquo;ll take care of how it&rsquo;s remembered.
```

f. Closing kicker (line 499) — replace `Begin the experience` with `Ready when you are`.

g. Closing h2 (line 513) — replace:

```tsx
          Let&rsquo;s create something <em>uniquely yours</em>.
```

with:

```tsx
          Let&rsquo;s talk about <em>your day</em>.
```

- [ ] **Step 6: Rewrite /about copy**

In `src/app/(site)/about/page.tsx`:

a. Intro line (lines 70-71) — replace:

```
            Welcome — I&rsquo;m genuinely glad you&rsquo;re here, and that
            you&rsquo;re considering trusting me with your moments.
```

with:

```
            Welcome — I&rsquo;m really glad you&rsquo;re here.
```

b. Paragraph 2 (lines 83-87) — replace:

```
            I&rsquo;m a photographer based in San Jose, California. My work began
            with a simple realization — watching friends&rsquo; faces light up at
            the images I&rsquo;d made for them, I understood how much a single
            frame can hold: how it translates emotion, and preserves not just how
            a moment looked, but how it truly felt.
```

with:

```
            I&rsquo;m a photographer based in San Jose, California. This all
            started with watching my friends&rsquo; faces light up at photos
            I&rsquo;d made of them — that&rsquo;s the feeling I&rsquo;m chasing
            for you, every time you open your gallery.
```

c. Paragraph 3 (lines 99-105) — replace:

```
            I&rsquo;ve never confined myself to a single style. I move fluidly
            between light, airy frames and more editorial, atmospheric work —
            always in service of the authenticity of the moment rather than a
            formula. On set, I build a space that&rsquo;s calm, easy, and
            genuinely fun, because the finest images come from people who feel at
            ease. Above all, my intention is that you look and feel your absolute
            best, with the entire experience shaped around you.
```

with:

```
            I don&rsquo;t have one singular style — I adapt from light and airy
            to editorial, so the photos look like you, not like my formula.
            Shoots with me are calm, easy, and honestly pretty fun — people at
            ease make the best photos. Most of all, I want you to look and feel
            your absolute best, with the whole experience tailored to you.
```

d. Gallery kicker (line 147) — replace `A range, kept authentic` with `Different styles, same feeling.`

e. Pull quote (line 205) — replace:

```
          A curated record of the genuine — something deep, meaningful &amp; real.
```

with:

```
          Photos that feel like the day — every time you open them.
```

- [ ] **Step 7: Rewrite the /inquire hero sub**

In `src/app/(site)/inquire/page.tsx` (lines 84-88), replace:

```
            Thank you for being here. Tell me a little about what you&rsquo;re
            envisioning — the moments, the milestone, the feeling you want to
            keep. Every story begins with a simple hello, and I read each inquiry
            personally.
```

with:

```
            Tell me what you&rsquo;re planning — the venue, the vibe, the parts
            you&rsquo;re most excited about. I read every inquiry personally,
            and you&rsquo;ll hear back within 48 hours.
```

- [ ] **Step 8: Run the full suite — voice guard now passes**

Run: `npm run test`
Expected: PASS, all 5 test files including `tests/voice.test.ts`.

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 9: Commit**

```bash
git add tests/voice.test.ts tests/experience-content.test.ts src/content/experience.ts "src/app/(site)/experience/page.tsx" "src/app/(site)/about/page.tsx" "src/app/(site)/inquire/page.tsx"
git commit -m "Align /experience, /about and /inquire with the homepage voice; add voice-guard test"
```

---

### Task 7: End-to-end verification

**Files:**
- No production files. Throwaway check script in the session scratchpad.

**Interfaces:**
- Consumes: everything above, running in the real app.

- [ ] **Step 1: Production build**

Run: `npm run build`
Expected: build succeeds, all routes compile.

- [ ] **Step 2: Rendered-copy check against the dev server**

With the dev server running on port 3000 (restart it if it predates these edits — Turbopack has served stale CSS/content before in this repo), verify server-rendered copy per page:

```bash
for p in "" work weddings experience investment about inquire; do
  echo "== /$p"; curl -s "http://localhost:3000/$p" -o page.html
  grep -c -i -E "curated record|gracefully|artistry|photographed with intention|uniquely yours" page.html || true
done
```

Expected: `0` (grep finds nothing) for every page.

```bash
curl -s http://localhost:3000/ | grep -o "want to be present in their wedding" | head -1
curl -s http://localhost:3000/ | grep -o "critical to our culture" | head -1
curl -s http://localhost:3000/ | grep -o "You live it." | head -1
curl -s http://localhost:3000/investment | grep -o "Monthly payment plans" | head -1
curl -s http://localhost:3000/weddings | grep -o "PRESENT FOR" | head -1
```

Expected: each grep prints its phrase.

- [ ] **Step 3: Visual check of the testimonial section**

Open `http://localhost:3000/` at desktop and at a ~390px mobile viewport (Playwright is installed in the session scratchpad from earlier verification work). Screenshot the section after the wedding gallery.
Expected: matches the reference layout — photo left (stacked above on mobile), rule, italic pull-quote, body quote, gold attribution; no arrows.

- [ ] **Step 4: Final commit if verification produced fixes; otherwise done**

If any step above forced a code fix, re-run `npm run test` and commit the fix with a message describing what verification caught.
