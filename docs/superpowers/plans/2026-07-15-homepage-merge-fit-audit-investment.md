# Homepage Experience Merge, Fit Audit & Investment Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transplant the experience page's two highest-converting sections onto the homepage, fix the clipped experience hero (plus a site-wide overflow audit), and ship a new `/investment` pricing page with three collections and add-ons.

**Architecture:** Static Next.js App Router pages styled with inline styles from a shared token vocabulary (`src/components/lei/tokens.ts`); scroll animation via a global motion engine keyed on `data-*` attributes (no per-page JS). All copy lives in `src/content/*.ts` modules so words never hide in layout code; vitest tests pin the approved copy/data.

**Tech Stack:** Next.js 16.2.9 (App Router), React 19, TypeScript, vitest 4. No new dependencies.

**Spec:** `docs/superpowers/specs/2026-07-15-homepage-merge-fit-audit-investment-design.md`

## Global Constraints

- **Read the docs first:** This Next.js version has breaking changes. Read the relevant guides in `node_modules/next/dist/docs/` (App Router pages, metadata) before writing page code (per `AGENTS.md`).
- **CTA hierarchy is law:** gold pill (`CtaLink`) = inquire, and it is the only gold action. Soft underlined links stay subordinate; `SecondaryCta` is hard-wired to `/free-session` — never repoint or overload it.
- **Copy is verbatim:** qualifier lines, process steps, and tier copy are approved wording. Cut-and-paste when moving them (they contain typographic quotes/dashes — do not retype). The single approved edit: homepage process step 03 says "No two **weddings** are alike" (experience page keeps "milestones").
- **Colors/typography:** use the token helpers (`GOLD`, `MUTED`, `SERIF`, `cream()`, `ink()`, `kicker()`, `pill()`) — no new hex values.
- **Motion:** reuse existing hooks only (`data-fadeup`, `data-step`, `data-reveal`); no changes to `src/lib/lei/motion.ts`.
- **Verification commands:** `npm test` (vitest) and `npm run build` must pass at every commit.
- **Branch:** do all work on a feature branch created in Task 1 (`experience-merge-investment`).

---

### Task 1: Extract shared experience content to `src/content/experience.ts`

**Files:**
- Create: `src/content/experience.ts`
- Create: `tests/experience-content.test.ts`
- Modify: `src/app/(site)/experience/page.tsx` (lines 16–28: delete the inline `QUALIFIERS`/`PROCESS` consts; add import)

**Interfaces:**
- Consumes: nothing (first task).
- Produces: `QUALIFIERS: string[]` (4 lines), `ProcessStep { n: string; title: string; body: string }`, `PROCESS: ProcessStep[]` (4 steps), `HOME_PROCESS: ProcessStep[]` (same, step 03 reworded). Tasks 3, 4 import these from `@/content/experience`.

- [ ] **Step 1: Create the feature branch**

```bash
git checkout -b experience-merge-investment
```

- [ ] **Step 2: Write the failing test**

Create `tests/experience-content.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { HOME_PROCESS, PROCESS, QUALIFIERS } from "@/content/experience";

describe("qualifiers", () => {
  it("has the four approved self-selection lines", () => {
    expect(QUALIFIERS).toHaveLength(4);
    expect(QUALIFIERS[0]).toContain("editorial");
    expect(QUALIFIERS[3]).toContain("already planned for it");
  });
});

describe("process", () => {
  it("has four numbered steps in the approved order", () => {
    expect(PROCESS.map((s) => s.n)).toEqual(["01", "02", "03", "04"]);
    expect(PROCESS.map((s) => s.title)).toEqual([
      "Inquire",
      "Connect",
      "Customize",
      "Reserve",
    ]);
  });

  it("homepage variant swaps milestones for weddings in step 03 only", () => {
    expect(PROCESS[2].body).toContain("No two milestones are alike");
    expect(HOME_PROCESS[2].body).toContain("No two weddings are alike");
    // every other step is the identical object
    expect(HOME_PROCESS.filter((s, i) => s !== PROCESS[i])).toHaveLength(1);
  });
});
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — `Cannot find module '@/content/experience'` (or equivalent resolve error). The two existing test files still pass.

- [ ] **Step 4: Create the content module**

Create `src/content/experience.ts`. **Authoritative source for the `QUALIFIERS` strings and `PROCESS` objects is `src/app/(site)/experience/page.tsx` lines 16–28 — cut-and-paste from there** so the typographic quotes (`“we're not photo people”`) survive exactly; the copies below show the intended result. Structure:

```ts
// Experience-page narrative content, shared with the homepage (which
// transplants the qualifiers and process sections for conversion).

/** The four "You're here because…" self-selection lines. */
export const QUALIFIERS = [
  "You want wedding photos that look editorial — not like every Pinterest board you've already seen.",
  "You've said “we're not photo people” on every photographer call. You want to feel at ease, not posed.",
  "You want the day back the way it felt — not a performance of it.",
  "You care about how things look. You want a photographer who does too — and who's already planned for it.",
];

export interface ProcessStep {
  n: string;
  title: string;
  body: string;
}

/** Inquire → Connect → Customize → Reserve, as rendered by ProcessSteps. */
export const PROCESS: ProcessStep[] = [
  { n: "01", title: "Inquire", body: "Start by telling me a bit about what you're envisioning via the inquiry form. This is where your story begins." },
  { n: "02", title: "Connect", body: "We'll get on a call — your venue, your vision, what you're nervous about, and what actually matters to you in the photos." },
  { n: "03", title: "Customize", body: "No two milestones are alike. I'll design a proposal that reflects your priorities, so the experience fits you." },
  { n: "04", title: "Reserve", body: "Date locked, plan started. From here, the photography is handled." },
];

/** Homepage variant — identical except step 03 speaks weddings, not milestones. */
export const HOME_PROCESS: ProcessStep[] = PROCESS.map((s) =>
  s.n === "03"
    ? {
        ...s,
        body: "No two weddings are alike. I'll design a proposal that reflects your priorities, so the experience fits you.",
      }
    : s
);
```

(Use a typographic apostrophe in `I'll` to match the pasted originals.)

- [ ] **Step 5: Point the experience page at the module**

In `src/app/(site)/experience/page.tsx`: delete the inline `const QUALIFIERS = [...]` and `const PROCESS = [...]` blocks (old lines 16–28) and add to the imports:

```ts
import { PROCESS, QUALIFIERS } from "@/content/experience";
```

No JSX changes — the identifiers keep their names.

- [ ] **Step 6: Run tests to verify they pass**

Run: `npm test`
Expected: PASS — all three test files green.

- [ ] **Step 7: Verify the build**

Run: `npm run build`
Expected: build succeeds; `/experience` compiles.

- [ ] **Step 8: Commit**

```bash
git add src/content/experience.ts tests/experience-content.test.ts "src/app/(site)/experience/page.tsx"
git commit -m "Extract experience qualifiers and process steps to shared content"
```

---

### Task 2: Add the `SoftLink` component (and DRY `SecondaryCta` through it)

**Files:**
- Modify: `src/components/lei/Cta.tsx`

**Interfaces:**
- Consumes: tokens `cream`, `ink` (already imported in the file).
- Produces: `SoftLink({ href, label, dark?, style? })` — a quiet underlined uppercase link that renders `{label} →`. Tasks 3 and 8 import it from `@/components/lei/Cta`.

- [ ] **Step 1: Add `SoftLink` and rebase `SecondaryCta` on it**

In `src/components/lei/Cta.tsx`, replace the entire `SecondaryCta` function (lines 34–64) with:

```tsx
/** Generic quiet underlined link — the subordinate treatment for non-primary
 *  destinations (free session, experience, investment). Gold appears only in
 *  the underline, so the gold pill stays the page's one conversion action. */
export function SoftLink({
  href,
  label,
  dark = false,
  style,
}: {
  href: string;
  label: string;
  dark?: boolean;
  style?: CSSProperties;
}) {
  return (
    <Link
      data-hover=""
      href={href}
      className="lx-cta2"
      style={{
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: ".12em",
        textTransform: "uppercase",
        color: dark ? cream(0.72) : ink(0.62),
        textDecoration: "underline",
        textUnderlineOffset: 5,
        textDecorationColor: "rgba(184,144,90,.55)",
        ...style,
      }}
    >
      {label} &rarr;
    </Link>
  );
}

/** Track B soft CTA — hard-wired to the free-session funnel. */
export function SecondaryCta({
  dark = false,
  style,
}: {
  dark?: boolean;
  style?: CSSProperties;
}) {
  return (
    <SoftLink
      href={SECONDARY_CTA_HREF}
      label={SECONDARY_CTA_LABEL}
      dark={dark}
      style={style}
    />
  );
}
```

- [ ] **Step 2: Verify tests and build**

Run: `npm test` then `npm run build`
Expected: both pass; every existing `SecondaryCta` placement renders identically (same markup, same styles).

- [ ] **Step 3: Commit**

```bash
git add src/components/lei/Cta.tsx
git commit -m "Add generic SoftLink; rebase SecondaryCta on it"
```

---

### Task 3: Homepage "You're here because…" section

**Files:**
- Modify: `src/app/(site)/page.tsx` — insert one section between the "Who I photograph" section's closing `</section>` (line ~533) and the `{/* ══ The Collection — four category doors ══ */}` comment; extend imports.

**Interfaces:**
- Consumes: `QUALIFIERS` from `@/content/experience` (Task 1); `SoftLink` from `@/components/lei/Cta` (Task 2); existing `ink` token, `img`, `PHOTOS`.
- Produces: nothing downstream.

- [ ] **Step 1: Extend imports in `src/app/(site)/page.tsx`**

```ts
import { GOLD, MUTED, SERIF, cream, ink, kicker, pill } from "@/components/lei/tokens";
import { CtaLink, SecondaryCta, SoftLink, TestimonialSlot } from "@/components/lei/Cta";
import { QUALIFIERS } from "@/content/experience";
```

(The first two lines replace the existing imports from those modules; the third is new.)

- [ ] **Step 2: Insert the section**

Directly after the "Who I photograph" section closes and before the Collection doors section, add. Layout is copied from the experience page's version (experience/page.tsx lines 121–201) with colors inverted to cream — dark-on-dark against the doors section below would break the light/dark rhythm:

```tsx
{/* ══ You're here because… — transplanted from /experience, cream-inverted ══ */}
<section
  style={{
    position: "relative",
    background: "#F7F5F2",
    color: "#0E0D0B",
    padding: "0 6vw 20vh",
    overflow: "hidden",
  }}
>
  <div
    className="lx-grid-2col"
    style={{
      maxWidth: 1200,
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "1.1fr .9fr",
      gap: "6vw",
      alignItems: "center",
    }}
  >
    <div>
      <div data-fadeup="" style={kicker({ marginBottom: 30 }, 10, ".3em")}>
        You&rsquo;re here because&hellip;
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
        {QUALIFIERS.map((text) => (
          <div
            key={text}
            data-step=""
            style={{
              display: "flex",
              gap: 20,
              alignItems: "baseline",
              borderTop: `1px solid ${ink(0.14)}`,
              paddingTop: 26,
            }}
          >
            <span style={{ color: GOLD, fontSize: 20, lineHeight: 1 }}>•</span>
            <span
              style={{
                fontFamily: SERIF,
                fontSize: "clamp(20px,2.1vw,30px)",
                fontWeight: 500,
                lineHeight: 1.3,
              }}
            >
              {text}
            </span>
          </div>
        ))}
      </div>
      <div
        data-fadeup=""
        style={{
          marginTop: 44,
          fontFamily: SERIF,
          fontStyle: "italic",
          fontSize: "clamp(26px,3vw,44px)",
          color: GOLD,
        }}
      >
        That&rsquo;s when I come in.
      </div>
      <div data-fadeup="" style={{ marginTop: 28 }}>
        <SoftLink href="/experience" label="Read about the full experience" />
      </div>
    </div>
    <div data-reveal="" style={{ overflow: "hidden" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img(PHOTOS.gownEditorial.path, 1000)}
        alt={PHOTOS.gownEditorial.a}
        loading="lazy"
        style={{
          width: "100%",
          aspectRatio: "4 / 5",
          objectFit: "cover",
          display: "block",
          transform: "scale(1.14)",
        }}
      />
    </div>
  </div>
</section>
```

- [ ] **Step 3: Verify tests, build, and render**

Run: `npm test` then `npm run build`
Expected: both pass.
Then `npm run dev`, open `http://localhost:3000`, scroll past "Who I photograph": the four qualifier rows animate in (`data-step` stagger), the gold payoff line and the underlined "Read about the full experience →" link appear, and the link navigates to `/experience`. No gold pill inside this section.

- [ ] **Step 4: Commit**

```bash
git add "src/app/(site)/page.tsx"
git commit -m "Transplant You're-here-because qualifiers onto homepage with experience link"
```

---

### Task 4: Homepage Process section

**Files:**
- Modify: `src/app/(site)/page.tsx` — insert one section between the Pricing/Investment section's closing `</section>` (line ~911) and the `{/* ══ Inquire ══ */}` comment; extend imports.

**Interfaces:**
- Consumes: `HOME_PROCESS` from `@/content/experience` (Task 1); `ProcessSteps` from `@/components/lei/blocks` (existing, signature `ProcessSteps({ steps }: { steps: Array<{ n: string; title: string; body: string }> })`).
- Produces: nothing downstream.

- [ ] **Step 1: Extend imports in `src/app/(site)/page.tsx`**

```ts
import { Marquee, ProcessSteps } from "@/components/lei/blocks";
import { HOME_PROCESS, QUALIFIERS } from "@/content/experience";
```

(Each line replaces the existing import from that module.)

- [ ] **Step 2: Insert the section**

Between the Pricing section and the Inquire section:

```tsx
{/* ══ The Process — transplanted from /experience: price above, ask below ══ */}
<section style={{ position: "relative", background: "#0E0D0B", color: "#F7F5F2" }}>
  <ProcessSteps steps={HOME_PROCESS} />
</section>
```

(This puts two dark sections adjacent — Process then Inquire — mirroring the existing adjacent cream pair About/Pricing; approved in the spec.)

- [ ] **Step 3: Verify tests, build, and render**

Run: `npm test` then `npm run build`
Expected: both pass.
In the dev server: between "Collections from $2,400" and "Let's make something felt." the four numbered steps render on dark, and step 03 reads "No two weddings are alike." On `/experience` step 03 still reads "No two milestones are alike."

- [ ] **Step 4: Commit**

```bash
git add "src/app/(site)/page.tsx"
git commit -m "Add Process section to homepage between pricing and inquire"
```

---

### Task 5: Fix the clipped experience hero title

**Files:**
- Modify: `src/app/(site)/experience/page.tsx` (the two `data-title-line` divs, old lines 83–88)

**Interfaces:** none.

- [ ] **Step 1: Shrink the type scale**

In the experience hero `<h1>`, change **both** occurrences of

```ts
style={{ fontSize: "clamp(58px,12vw,180px)" }}
```

to

```ts
style={{ fontSize: "clamp(40px,8vw,120px)" }}
```

Rationale: "EXPERIENCE" is 10 characters; at 12vw the line renders wider than the viewport and the section's `overflow: hidden` clips it. At 8vw the longest line fits inside the 38px side padding at every width. If it looks under-scaled in the browser, tune upward (max 9vw / 132px) only while the full word stays visible at 1280–1920px.

- [ ] **Step 2: Verify visually**

Run: `npm run dev`, open `http://localhost:3000/experience`.
At window widths 375, 768, 1440, 1920: both "THE" and "EXPERIENCE" fully visible, no horizontal scroll, no clipped glyphs.

- [ ] **Step 3: Run tests and commit**

Run: `npm test` — Expected: PASS.

```bash
git add "src/app/(site)/experience/page.tsx"
git commit -m "Fix clipped experience hero: size title to fit the viewport"
```

---

### Task 6: Investment content module

**Files:**
- Create: `src/content/pricing.ts`
- Create: `tests/pricing.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces (imported by Task 7 from `@/content/pricing`):
  - `Tier { name: string; price: string; blurb: string; facts: string[] }`, `TIERS: Tier[]`
  - `INCLUDED_EVERYWHERE: string[]`
  - `AddOn { name: string; price: string; note: string }`, `ADD_ONS: AddOn[]`

- [ ] **Step 1: Write the failing test**

Create `tests/pricing.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { ADD_ONS, INCLUDED_EVERYWHERE, TIERS } from "@/content/pricing";

describe("investment tiers", () => {
  it("lists the three collections flagship-first with approved prices", () => {
    expect(TIERS.map((t) => t.name)).toEqual([
      "The Collection",
      "The Signature",
      "The Intimate",
    ]);
    expect(TIERS.map((t) => t.price)).toEqual(["$3,800", "$2,900", "$2,400"]);
  });

  it("keeps shared inclusions out of per-tier facts (rendered once in the strip)", () => {
    for (const t of TIERS) {
      for (const fact of t.facts) {
        expect(fact).not.toMatch(/Pic-Time|printing rights|per hour of coverage/);
      }
    }
    expect(INCLUDED_EVERYWHERE).toHaveLength(3);
  });

  it("sneak peek is a fact on Collection and Signature only", () => {
    const sneak = (t: { facts: string[] }) =>
      t.facts.some((f) => f.includes("Sneak peek"));
    expect(TIERS.map(sneak)).toEqual([true, true, false]);
  });

  it("has the two approved add-ons", () => {
    expect(ADD_ONS.map((a) => a.name)).toEqual([
      "Engagement session",
      "Second photographer",
    ]);
    expect(ADD_ONS.map((a) => a.price)).toEqual(["+$250", "+$600"]);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `@/content/pricing`.

- [ ] **Step 3: Create the module**

Create `src/content/pricing.ts` (blurbs verbatim from the spec's "Tier data" section):

```ts
// Investment page content — collections, add-ons, shared inclusions.
// Price and copy edits happen here; the page renders whatever this exports.

export interface Tier {
  name: string;
  price: string; // display string, e.g. "$3,800"
  blurb: string;
  facts: string[]; // tier-specific only — shared items live in INCLUDED_EVERYWHERE
}

/** Flagship-first (price anchoring): Collection → Signature → Intimate. */
export const TIERS: Tier[] = [
  {
    name: "The Collection",
    price: "$3,800",
    blurb:
      "Ten hours, two photographers. My eye on the big moments, a second lens catching everything else — your partner's face when you walk in, the details you'll forget by Monday. For the couples who want the full story told.",
    facts: [
      "Up to 10 hours of coverage",
      "Including: getting ready (both sides), portraits, wedding party, family formals, ceremony, cocktail hour, full reception",
      "2 photographers (included)",
      "700+ fully edited images",
      "Sneak peek gallery within 48 hours",
    ],
  },
  {
    name: "The Signature",
    price: "$2,900",
    blurb:
      "Eight hours and a full day of coverage. Enough time to breathe, enough time to document everything from getting ready to the first dances. Clean edits, real moments, no posing you into something you're not.",
    facts: [
      "Up to 8 hours of coverage",
      "Including: getting ready, portraits, wedding party, family formals, ceremony, cocktail hour, reception",
      "1 photographer",
      "500+ fully edited images",
      "Sneak peek gallery within 48 hours",
    ],
  },
  {
    name: "The Intimate",
    price: "$2,400",
    blurb:
      "Six hours. No big production — just quiet, focused coverage for the couples who want it kept close. Ceremony, portraits, the in-between moments that actually matter. Full gallery delivered, every image edited.",
    facts: [
      "Up to 6 hours of coverage",
      "Including: getting ready, portraits, wedding party, family formals, ceremony, cocktail hour",
      "1 photographer",
      "350+ fully edited images",
    ],
  },
];

/** Identical across all tiers — rendered once in the "Every collection includes" strip. */
export const INCLUDED_EVERYWHERE = [
  "100–150 fully edited images per hour of coverage",
  "Online gallery to view, download and order prints (Pic-Time, 12-month access)",
  "Full-resolution downloads + printing rights",
];

export interface AddOn {
  name: string;
  price: string;
  note: string;
}

export const ADD_ONS: AddOn[] = [
  {
    name: "Engagement session",
    price: "+$250",
    note: "Available with every collection",
  },
  {
    name: "Second photographer",
    price: "+$600",
    note: "For The Intimate and The Signature — already included in The Collection",
  },
];
```

(Use typographic apostrophes in the blurbs — `partner's`, `you'll`, `you're` — matching the site's copy style.)

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS — all four test files green.

- [ ] **Step 5: Commit**

```bash
git add src/content/pricing.ts tests/pricing.test.ts
git commit -m "Add investment page content module with tiers and add-ons"
```

---

### Task 7: Build the `/investment` page

**Files:**
- Create: `src/app/(site)/investment/page.tsx`

**Interfaces:**
- Consumes: `TIERS`, `INCLUDED_EVERYWHERE`, `ADD_ONS` from `@/content/pricing` (Task 6); `CITY`, `POSITIONING` from `@/content/homepage`; `CtaLink`, `SecondaryCta` from `@/components/lei/Cta`; tokens; `LeiPage`, `Chrome`, `LeiFooter`.
- Produces: the routable `/investment` page that Task 8's links point at.

- [ ] **Step 1: Read the App Router page/metadata docs**

Read `node_modules/next/dist/docs/` guides covering App Router pages and the Metadata API before writing the file (breaking-changes rule from `AGENTS.md`). Follow whatever conventions the existing pages under `src/app/(site)/` already use — they are known-good for this Next.js version.

- [ ] **Step 2: Create the page**

Create `src/app/(site)/investment/page.tsx`:

```tsx
import type { Metadata } from "next";
import LeiPage from "@/components/lei/LeiPage";
import Chrome from "@/components/lei/Chrome";
import LeiFooter from "@/components/lei/LeiFooter";
import { GOLD, MUTED, SERIF, cream, ink, kicker } from "@/components/lei/tokens";
import { CtaLink, SecondaryCta } from "@/components/lei/Cta";
import { CITY, POSITIONING } from "@/content/homepage";
import { ADD_ONS, INCLUDED_EVERYWHERE, TIERS } from "@/content/pricing";

export const metadata: Metadata = {
  title: "Wedding Photography Investment — Collections from $2,400",
  description: `${POSITIONING} Three wedding collections from $2,400 — The Collection, The Signature and The Intimate — for couples in the ${CITY} & beyond.`,
};

export default function InvestmentPage() {
  return (
    <LeiPage>
      <Chrome />

      {/* ══ Compact hero ══ */}
      <section
        style={{
          position: "relative",
          background: "#F7F5F2",
          color: "#0E0D0B",
          padding: "26vh 6vw 12vh",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div data-fadeup="" style={kicker({ marginBottom: "3vh" }, 11, ".34em")}>
            Investment · {CITY}
          </div>
          <h1
            style={{
              margin: 0,
              fontFamily: SERIF,
              fontWeight: 600,
              lineHeight: 0.9,
              letterSpacing: ".01em",
            }}
          >
            <div data-fadeup="" style={{ fontSize: "clamp(40px,8vw,120px)" }}>
              THE
            </div>
            <div data-fadeup="" style={{ fontSize: "clamp(40px,8vw,120px)" }}>
              <em style={{ fontWeight: 400 }}>INVESTMENT</em>
            </div>
          </h1>
          <p
            data-fadeup=""
            style={{
              maxWidth: 560,
              margin: "5vh 0 0",
              fontSize: 16,
              lineHeight: 1.8,
              color: MUTED,
            }}
          >
            Collections from $2,400 — each one built around how you two
            actually want the day to go.
          </p>
        </div>
      </section>

      {/* ══ The three collections ══ */}
      <section
        style={{
          position: "relative",
          background: "#0E0D0B",
          color: "#F7F5F2",
          padding: "14vh 6vw",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div data-fadeup="" style={kicker({ marginBottom: 10 }, 10, ".3em")}>
            The Collections
          </div>
          {TIERS.map((t) => (
            <div
              key={t.name}
              data-step=""
              className="lx-grid-2col"
              style={{
                display: "grid",
                gridTemplateColumns: "90px 1fr 1.4fr",
                gap: 24,
                alignItems: "baseline",
                padding: "44px 0",
                borderTop: `1px solid ${cream(0.14)}`,
              }}
            >
              <div
                style={{
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontSize: 22,
                  color: GOLD,
                }}
              >
                {t.price}
              </div>
              <div
                style={{
                  fontFamily: SERIF,
                  fontWeight: 500,
                  fontSize: "clamp(26px,2.6vw,38px)",
                  lineHeight: 1.1,
                }}
              >
                {t.name}
              </div>
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 16,
                    lineHeight: 1.85,
                    color: cream(0.72),
                  }}
                >
                  {t.blurb}
                </p>
                <ul
                  style={{
                    listStyle: "none",
                    margin: "22px 0 0",
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  {t.facts.map((f) => (
                    <li
                      key={f}
                      style={{ display: "flex", gap: 12, alignItems: "baseline" }}
                    >
                      <span style={{ color: GOLD, fontSize: 10, flexShrink: 0 }}>
                        ★
                      </span>
                      <span
                        style={{ fontSize: 14, lineHeight: 1.65, color: cream(0.6) }}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ Every collection includes + Add-ons ══ */}
      <section
        style={{
          position: "relative",
          background: "#F7F5F2",
          color: "#0E0D0B",
          padding: "14vh 6vw",
        }}
      >
        <div
          className="lx-grid-2col"
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "6vw",
            alignItems: "start",
          }}
        >
          <div>
            <div data-fadeup="" style={kicker({ marginBottom: 24 }, 10, ".3em")}>
              Every collection includes
            </div>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: 18,
              }}
            >
              {INCLUDED_EVERYWHERE.map((line) => (
                <li
                  key={line}
                  data-fadeup=""
                  style={{
                    display: "flex",
                    gap: 14,
                    alignItems: "baseline",
                    borderTop: `1px solid ${ink(0.12)}`,
                    paddingTop: 18,
                  }}
                >
                  <span style={{ color: GOLD, fontSize: 11, flexShrink: 0 }}>★</span>
                  <span style={{ fontSize: 15, lineHeight: 1.7, color: MUTED }}>
                    {line}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div data-fadeup="" style={kicker({ marginBottom: 24 }, 10, ".3em")}>
              Add-ons
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {ADD_ONS.map((a) => (
                <div
                  key={a.name}
                  data-fadeup=""
                  style={{ borderTop: `1px solid ${ink(0.12)}`, paddingTop: 18 }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      gap: 16,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: SERIF,
                        fontWeight: 500,
                        fontSize: "clamp(20px,1.8vw,26px)",
                      }}
                    >
                      {a.name}
                    </span>
                    <span
                      style={{
                        fontFamily: SERIF,
                        fontStyle: "italic",
                        fontSize: 20,
                        color: GOLD,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {a.price}
                    </span>
                  </div>
                  <div
                    style={{
                      marginTop: 8,
                      fontSize: 13,
                      lineHeight: 1.6,
                      color: MUTED,
                    }}
                  >
                    {a.note}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ Closing CTA + footer ══ */}
      <section
        style={{
          position: "relative",
          background: "#0E0D0B",
          color: "#F7F5F2",
          padding: "18vh 6vw 0",
          textAlign: "center",
        }}
      >
        <div data-fadeup="" style={kicker({ marginBottom: 22 }, 10, ".3em")}>
          Tailored to you
        </div>
        <h2
          data-fadeup=""
          style={{
            margin: "0 auto",
            fontFamily: SERIF,
            fontWeight: 500,
            fontSize: "clamp(34px,5vw,64px)",
            lineHeight: 1.12,
            maxWidth: 820,
            textWrap: "pretty",
          }}
        >
          Every collection can be tailored — <em>tell me about your day.</em>
        </h2>
        <div
          data-fadeup=""
          style={{
            marginTop: 40,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <CtaLink />
          <SecondaryCta dark />
        </div>
        <div style={{ padding: "14vh 38px 0", textAlign: "left" }}>
          <LeiFooter links={["home", "work", "about", "inquire"]} />
        </div>
      </section>
    </LeiPage>
  );
}
```

- [ ] **Step 3: Verify tests, build, and render**

Run: `npm test` then `npm run build`
Expected: both pass; the build output lists the `/investment` route.
In the dev server, open `http://localhost:3000/investment`: hero fits at 375/768/1440/1920 (the Task 5 lesson — "INVESTMENT" is also 10 characters, hence the same 8vw scale); the three tiers render Collection → Signature → Intimate with prices $3,800 / $2,900 / $2,400; the strip and add-ons render; exactly one gold pill on the page (the closing `CtaLink`).

- [ ] **Step 4: Commit**

```bash
git add "src/app/(site)/investment/page.tsx"
git commit -m "Add /investment page with three collections, inclusions strip, add-ons"
```

---

### Task 8: Wire the Investment entry points (nav, mobile menu, footer, homepage section)

**Files:**
- Modify: `src/components/lei/Chrome.tsx` (Weddings dropdown, after the Experience link, line ~213)
- Modify: `src/components/lei/MobileMenu.tsx` (`WEDDINGS_SUB`, line 18–22)
- Modify: `src/components/lei/LeiFooter.tsx` (`NAV` map, line 9–15)
- Modify: `src/app/(site)/page.tsx` (Investment section, before the CTA block at line ~898; footer `links` at line ~1061)

**Interfaces:**
- Consumes: the `/investment` route (Task 7); `SoftLink` (Task 2).
- Produces: nothing downstream.

- [ ] **Step 1: Add the dropdown item in `Chrome.tsx`**

Between the Experience `<Link>` and the Free Session `<Link>` in the Weddings dropdown panel, add:

```tsx
<Link
  href="/investment"
  data-hover=""
  className="lx-dd-item"
  style={{
    fontFamily: SERIF,
    fontSize: 18,
    fontWeight: 500,
    color: "#F7F5F2",
    textDecoration: "none",
    padding: "12px 14px",
  }}
>
  Investment
</Link>
```

- [ ] **Step 2: Add the mobile menu item in `MobileMenu.tsx`**

Change `WEDDINGS_SUB` to:

```ts
const WEDDINGS_SUB = [
  { href: "/portfolio/weddings", label: "The Portfolio" },
  { href: "/experience", label: "Experience" },
  { href: "/investment", label: "Investment" },
  { href: "/free-session", label: "Free Session" },
];
```

- [ ] **Step 3: Add the footer key in `LeiFooter.tsx` and use it**

Extend the `NAV` map:

```ts
const NAV: Record<string, { href: string; label: string }> = {
  home: { href: "/", label: "Home" },
  work: { href: "/work", label: "Work" },
  weddings: { href: "/weddings", label: "Weddings" },
  about: { href: "/about", label: "About" },
  investment: { href: "/investment", label: "Investment" },
  inquire: { href: "/inquire", label: "Inquire" },
};
```

Then in `src/app/(site)/page.tsx`, change the homepage footer call to:

```tsx
<LeiFooter links={["work", "weddings", "investment", "about", "inquire"]} />
```

- [ ] **Step 4: Add the soft link in the homepage Investment section**

In `src/app/(site)/page.tsx`, inside the Investment section, directly after the closing `</p>` of the "Full days, intimate ceremonies…" paragraph and before the existing CTA `<div>`, add:

```tsx
<div data-fadeup="" style={{ marginTop: 26 }}>
  <SoftLink href="/investment" label="See the collections" />
</div>
```

- [ ] **Step 5: Verify tests, build, and render**

Run: `npm test` then `npm run build`
Expected: both pass.
In the dev server: the Weddings hover dropdown lists The Portfolio / Experience / Investment / Free Session; the mobile burger menu (narrow window) shows the same under Weddings; the homepage footer includes Investment; the homepage Investment section shows "See the collections →" above the gold pill, and it navigates to `/investment`.

- [ ] **Step 6: Commit**

```bash
git add src/components/lei/Chrome.tsx src/components/lei/MobileMenu.tsx src/components/lei/LeiFooter.tsx "src/app/(site)/page.tsx"
git commit -m "Link /investment from nav dropdown, mobile menu, footer, homepage section"
```

---

### Task 9: Site-wide fit audit

**Files:**
- Modify: whatever the audit finds (expected candidates: page files under `src/app/(site)/`, possibly `src/app/globals.css` for missing responsive collapses)

**Interfaces:** none.

- [ ] **Step 1: Run the sweep**

With `npm run dev` running, check **every** page at window widths **375, 768, 1440, 1920** (browser devtools responsive mode, or the Claude-in-Chrome `resize_window` tool):

| Page | URL |
|---|---|
| Home | `/` |
| Experience | `/experience` |
| Weddings | `/weddings` |
| Work | `/work` |
| About | `/about` |
| Investment | `/investment` |
| Free session | `/free-session` |
| Inquire | `/inquire` |
| Portfolio index | `/portfolio` |
| Portfolio category | `/portfolio/weddings` |
| Portfolio project | `/portfolio/weddings/sargon-odelya` |

At each width look for:
- Clipped or overflowing display type (the Task 5 bug class — any `clamp(...vw...)` heading whose longest word overflows)
- Horizontal page scroll — in the console: `document.documentElement.scrollWidth > document.documentElement.clientWidth` must be `false`
- Grids that fail to collapse at 375/768 (the `lx-grid-2col` / `lx-doors` breakpoint rules in `globals.css` should handle these — verify they apply to the new sections)
- Images or floated elements escaping their containers; text overlapping images

- [ ] **Step 2: Fix findings**

Fix each finding in the smallest way consistent with existing patterns (adjust the `clamp()` scale, add the section to an existing responsive rule in `globals.css`, constrain a width). **If a finding is ambiguous — e.g., an intentional full-bleed vs. a bug — stop and ask the user instead of guessing.** Record each page/width checked and each fix made in the task notes.

- [ ] **Step 3: Verify and commit**

Run: `npm test` then `npm run build` — Expected: both pass.
Re-check every fixed page at the width that exposed the bug.

```bash
git add -A
git commit -m "Fix overflow/fit issues found in site-wide viewport audit"
```

(If the audit finds nothing beyond Task 5's fix, skip the commit and note "audit clean" — do not manufacture changes.)

---

### Task 10: Final verification

**Files:** none (verification only).

- [ ] **Step 1: Full test suite and production build**

Run: `npm test`
Expected: 4 test files, all green.
Run: `npm run build`
Expected: success, `/investment` in the route list.

- [ ] **Step 2: CTA hierarchy check**

On `/` and `/investment` in the dev server, confirm: every gold pill on the page goes to `/inquire#form`; each soft link appears once per placement and goes where its label says (`/free-session`, `/experience`, `/investment`).

- [ ] **Step 3: Spec walkthrough**

Re-read `docs/superpowers/specs/2026-07-15-homepage-merge-fit-audit-investment-design.md` top to bottom; confirm each requirement is implemented or explicitly deferred with user agreement.

- [ ] **Step 4: Hand off**

Use the superpowers:finishing-a-development-branch skill to merge/PR the `experience-merge-investment` branch.
