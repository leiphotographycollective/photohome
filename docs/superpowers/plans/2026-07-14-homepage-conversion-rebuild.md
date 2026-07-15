# Homepage Conversion Rebuild (Phase 1) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the photohome homepage as a wedding-inquiry funnel — conversion hero, gold CTA system, four category doors, curated real-wedding proof, published pricing, and a mobile performance pass — per the approved spec at `docs/superpowers/specs/2026-07-14-wedding-conversion-redesign-design.md`.

**Architecture:** The homepage (`src/app/(site)/page.tsx`) is a server component of inline-styled sections animated by a shared GSAP/Lenis motion engine (`src/lib/lei/motion.ts`) that binds to `data-*` attributes at runtime via the `LeiPage` client shell. We add a content layer (`src/content/homepage.ts`) so testimonials/weddings are data-driven with empty-state rendering, a reusable gold CTA component, a static mobile hero (desktop keeps the scroll cinematics), and mobile guards in the motion engine.

**Tech Stack:** Next.js 16.2.9 (App Router), React 19, TypeScript, GSAP + Lenis + three.js (existing), Tailwind v4 (only for `globals.css` plumbing — all components use inline styles), Vitest (added by this plan).

## Global Constraints

- **No deletions:** `/work`, `/experience`, `/free-session`, all portfolio categories/projects and photo data stay live and untouched except where a task explicitly modifies a listed file. `/free-session` is never touched.
- **This is NOT the Next.js you know** (AGENTS.md): follow the repo's existing patterns exactly — plain `<img>` (with the eslint-disable comment), inline style objects, tokens from `src/components/lei/tokens.ts`. Do not introduce `next/image` or CSS modules.
- **CTA system:** label is exactly `Check my availability`, href is exactly `/inquire#form`, styled as a solid gold pill (`pill(GOLD, "#0E0D0B")`). Gold is reserved for conversion CTAs — no new non-CTA gold elements.
- **Price copy is exactly:** `Collections from $2,400` (USD).
- **No fabricated content:** `TESTIMONIALS` ships empty; slots render `null` when data is absent. Never commit placeholder quotes.
- **Mobile (`max-width: 860px` — the repo's existing breakpoint): no preloader, no WebGL, no 300vh scroll hero.** Mobile gets the static hero. All new below-the-fold images get `loading="lazy"`.
- **Copy style:** curly apostrophes via `&rsquo;` in JSX text, matching the codebase.
- Run all shell steps from the repo root `C:\Users\raymo\ShipStudio\photohome`. Bash syntax shown; the Windows executor may use the Bash tool.

---

### Task 1: Vitest infra + curated Sargon & Odelya gallery + Couples category

**Files:**
- Modify: `package.json` (add vitest + test script)
- Create: `vitest.config.ts`
- Create: `tests/portfolio.test.ts`
- Modify: `src/content/portfolio.ts`

**Interfaces:**
- Consumes: existing exports `CATEGORIES`, `CAT_ORDER`, `SARGON_ODELYA_PHOTOS`, `PHOTOS`, `Photo` from `src/content/portfolio.ts`.
- Produces: `export const SARGON_ODELYA_CURATED: Photo[]` (13 photos); `CATEGORIES.couples` (label `"Couples"`, 1 project `along-the-coast`); `"couples"` inserted into `CAT_ORDER` after `"weddings"`. Later tasks import `SARGON_ODELYA_CURATED` and rely on `/portfolio/couples` existing.

- [ ] **Step 1: Install vitest and add the test script**

```bash
npm install -D vitest
```

Then in `package.json`, change the `scripts` block to:

```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "vitest run"
  },
```

- [ ] **Step 2: Create `vitest.config.ts`**

```ts
import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: { environment: "node" },
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
});
```

- [ ] **Step 3: Write the failing test**

Create `tests/portfolio.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import {
  CATEGORIES,
  CAT_ORDER,
  SARGON_ODELYA_CURATED,
} from "@/content/portfolio";

describe("curated Sargon & Odelya gallery", () => {
  it("holds 10-15 photos (spec: never full-dump galleries)", () => {
    expect(SARGON_ODELYA_CURATED.length).toBeGreaterThanOrEqual(10);
    expect(SARGON_ODELYA_CURATED.length).toBeLessThanOrEqual(15);
  });

  it("is exactly what the sargon-odelya project displays", () => {
    const proj = CATEGORIES.weddings.projects.find(
      (p) => p.id === "sargon-odelya"
    );
    expect(proj).toBeDefined();
    expect(proj!.photos).toEqual(SARGON_ODELYA_CURATED);
  });
});

describe("couples category", () => {
  it("exists with at least one project", () => {
    expect(CATEGORIES.couples).toBeDefined();
    expect(CATEGORIES.couples.label).toBe("Couples");
    expect(CATEGORIES.couples.projects.length).toBeGreaterThan(0);
  });

  it("is routable via CAT_ORDER", () => {
    expect(CAT_ORDER).toContain("couples");
  });
});
```

- [ ] **Step 4: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — `SARGON_ODELYA_CURATED` is not exported (SyntaxError/undefined), couples category missing.

- [ ] **Step 5: Implement in `src/content/portfolio.ts`**

5a. Directly below the `SARGON_ODELYA_MORE` array, add the curated selection (13 frames covering the day's arc — prep → family → ceremony → golden hour → celebration → reception):

```ts
// Curated 13-frame selection shown on the project page and homepage —
// the spec caps displayed wedding galleries at 10-15 photos. The full
// arrays above are retained (no-deletions rule) but not rendered.
export const SARGON_ODELYA_CURATED: Photo[] = [
  SARGON_ODELYA_PHOTOS[0], // ring box
  SARGON_ODELYA_PHOTOS[2], // bride & mother, black and white
  SARGON_ODELYA_PHOTOS[3], // bridesmaids toast
  SARGON_ODELYA_PHOTOS[5], // groom descending the stairs
  SARGON_ODELYA_PHOTOS[8], // veil at golden hour
  SARGON_ODELYA_PHOTOS[11], // veil portrait, black and white
  SARGON_ODELYA_PHOTOS[13], // touching the groom's face at golden hour
  SARGON_ODELYA_PHOTOS[19], // walking hand in hand
  SARGON_ODELYA_PHOTOS[21], // champagne spray under the redwood
  SARGON_ODELYA_PHOTOS[23], // first dance, black and white
  SARGON_ODELYA_PHOTOS[25], // carried through the cheering crowd
  SARGON_ODELYA_PHOTOS[27], // dip kiss by the fireplace
  SARGON_ODELYA_PHOTOS[28], // mid-twirl on the dance floor
];
```

5b. In `CATEGORIES.weddings.projects`, change the sargon-odelya line so `photos` uses the curated list (cover unchanged):

```ts
      { id: "sargon-odelya", title: "Sargon & Odelya", place: "Bay Area, CA", year: "2025", cover: SARGON_ODELYA_PHOTOS[12], photos: SARGON_ODELYA_CURATED },
```

5c. Add a `couples` entry to `CATEGORIES`, between `weddings` and `graduations` (real couples-session photos already in `PHOTOS`; the owner may rename/swap later):

```ts
  couples: {
    label: "Couples",
    tagline: "The two of you, as you really are",
    intro:
      "Unposed sessions for couples — coastal walks, golden hour, the everyday closeness worth keeping.",
    projects: [
      { id: "along-the-coast", title: "Along the Coast", place: "San Francisco, CA", year: "2025", cover: P.coastalCandid, photos: [P.coastalCandid, P.coastal, P.coastKiss] },
    ],
  },
```

5d. Update `CAT_ORDER`:

```ts
export const CAT_ORDER = [
  "weddings",
  "couples",
  "graduations",
  "portraits",
  "events",
  "engagements",
] as const;
```

- [ ] **Step 6: Run tests and build to verify they pass**

Run: `npm test`
Expected: PASS (4 tests).

Run: `npm run build`
Expected: build succeeds (this also statically generates `/portfolio/couples` and `/portfolio/couples/along-the-coast` via the existing `[cat]` routes).

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vitest.config.ts tests/portfolio.test.ts src/content/portfolio.ts
git commit -m "Add vitest, curated Sargon & Odelya selection, and Couples category"
```

---

### Task 2: Homepage content model (`src/content/homepage.ts`)

**Files:**
- Create: `src/content/homepage.ts`
- Create: `tests/homepage-content.test.ts`

**Interfaces:**
- Consumes: `CATEGORIES`, `PHOTOS`, `SARGON_ODELYA_PHOTOS`, `Photo` from `@/content/portfolio`.
- Produces (used by Tasks 3, 5-9):
  - `CTA_LABEL: string` = `"Check my availability"`; `CTA_HREF: string` = `"/inquire#form"`
  - `interface Testimonial { quote: string; names: string; context?: string }`; `TESTIMONIALS: Testimonial[]` (empty)
  - `interface Door { cat: string; label: string; tagline: string; photo: Photo }`; `DOORS: Door[]` (4 entries)
  - `interface RecentWedding { title: string; place: string; year: string; href: string; cover: Photo; frames: Photo[] }`; `RECENT_WEDDINGS: RecentWedding[]` (1 entry, room for 3)

- [ ] **Step 1: Write the failing test**

Create `tests/homepage-content.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import {
  CTA_HREF,
  CTA_LABEL,
  DOORS,
  RECENT_WEDDINGS,
  TESTIMONIALS,
} from "@/content/homepage";
import { CATEGORIES } from "@/content/portfolio";

describe("CTA constants", () => {
  it("match the spec exactly", () => {
    expect(CTA_LABEL).toBe("Check my availability");
    expect(CTA_HREF).toBe("/inquire#form");
  });
});

describe("category doors", () => {
  it("are the four approved categories, each routable", () => {
    expect(DOORS.map((d) => d.cat)).toEqual([
      "weddings",
      "couples",
      "engagements",
      "events",
    ]);
    for (const d of DOORS) {
      expect(CATEGORIES[d.cat]).toBeDefined();
      expect(d.label.length).toBeGreaterThan(0);
      expect(d.photo.path.length).toBeGreaterThan(0);
      expect(d.photo.a.length).toBeGreaterThan(0);
    }
  });
});

describe("recent weddings", () => {
  it("has at least one wedding with 1-3 teaser frames each", () => {
    expect(RECENT_WEDDINGS.length).toBeGreaterThanOrEqual(1);
    for (const w of RECENT_WEDDINGS) {
      expect(w.href.startsWith("/portfolio/weddings/")).toBe(true);
      expect(w.frames.length).toBeGreaterThanOrEqual(1);
      expect(w.frames.length).toBeLessThanOrEqual(3);
      expect(w.title.length).toBeGreaterThan(0);
    }
  });
});

describe("testimonials", () => {
  it("never contains an empty quote or unattributed entry", () => {
    for (const t of TESTIMONIALS) {
      expect(t.quote.trim().length).toBeGreaterThan(0);
      expect(t.names.trim().length).toBeGreaterThan(0);
    }
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `@/content/homepage`.

- [ ] **Step 3: Create `src/content/homepage.ts`**

```ts
// Homepage conversion content — every deferred-content slot here is
// data-driven: an empty array means the block does not render, so
// placeholder text can never leak to production (see the design spec).

import {
  PHOTOS,
  SARGON_ODELYA_PHOTOS,
  type Photo,
} from "@/content/portfolio";

/** The one conversion CTA, everywhere: gold pill → HoneyBook form. */
export const CTA_LABEL = "Check my availability";
export const CTA_HREF = "/inquire#form";

export interface Testimonial {
  quote: string;
  names: string; // e.g. "Sargon & Odelya"
  context?: string; // e.g. "Wedding · Bay Area"
}

/** Real client quotes only — Raymond supplies these; empty until then. */
export const TESTIMONIALS: Testimonial[] = [];

export interface Door {
  cat: string; // key into CATEGORIES → /portfolio/<cat>
  label: string;
  tagline: string;
  photo: Photo;
}

/** The Collection — four category doors (routing, not browsing). */
export const DOORS: Door[] = [
  { cat: "weddings", label: "Weddings", tagline: "The full arc of the day", photo: SARGON_ODELYA_PHOTOS[16] },
  { cat: "couples", label: "Couples", tagline: "The two of you, as you really are", photo: PHOTOS.coastalCandid },
  { cat: "engagements", label: "Engagements", tagline: "The moment before everything changes", photo: PHOTOS.proposal },
  { cat: "events", label: "Events", tagline: "The room, as it really felt", photo: PHOTOS.eventAssyrian },
];

export interface RecentWedding {
  title: string;
  place: string;
  year: string;
  href: string;
  cover: Photo;
  frames: Photo[]; // 1-3 supporting teaser frames
}

/** Proof of consistency — grows to 3 weddings as Raymond sends selects. */
export const RECENT_WEDDINGS: RecentWedding[] = [
  {
    title: "Sargon & Odelya",
    place: "Bay Area, CA",
    year: "2025",
    href: "/portfolio/weddings/sargon-odelya",
    cover: SARGON_ODELYA_PHOTOS[13], // touching the groom's face at golden hour
    frames: [
      SARGON_ODELYA_PHOTOS[8], // veil at golden hour
      SARGON_ODELYA_PHOTOS[23], // first dance, black and white
    ],
  },
];
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS (all files).

- [ ] **Step 5: Commit**

```bash
git add src/content/homepage.ts tests/homepage-content.test.ts
git commit -m "Add data-driven homepage content model (CTA, doors, weddings, testimonial slots)"
```

---

### Task 3: Gold CTA components + `/inquire#form` anchor

**Files:**
- Create: `src/components/lei/Cta.tsx`
- Modify: `src/app/(site)/inquire/page.tsx` (one line: the section id)

**Interfaces:**
- Consumes: `CTA_HREF`, `CTA_LABEL`, `TESTIMONIALS` from `@/content/homepage`; `GOLD`, `SERIF`, `pill` from `./tokens`.
- Produces (used by Tasks 5-9): `CtaLink({ label?, style? })` — gold pill `Link` to `CTA_HREF` with `data-mag`/`data-hover`; `TestimonialSlot({ index, dark? })` — renders `TESTIMONIALS[index]` or `null`.

- [ ] **Step 1: Create `src/components/lei/Cta.tsx`**

```tsx
import type { CSSProperties } from "react";
import Link from "next/link";
import { GOLD, SERIF, pill } from "./tokens";
import { CTA_HREF, CTA_LABEL, TESTIMONIALS } from "@/content/homepage";

/* The one conversion CTA — a solid gold pill. Gold is reserved for
   conversion actions site-wide so the eye learns "gold = inquire". */

export function CtaLink({
  label = CTA_LABEL,
  style,
}: {
  label?: string;
  style?: CSSProperties;
}) {
  return (
    <Link
      data-mag=""
      data-hover=""
      href={CTA_HREF}
      style={{ ...pill(GOLD, "#0E0D0B"), ...style }}
    >
      {label}
    </Link>
  );
}

/** A testimonial beside a CTA. Renders nothing until real quotes exist —
 *  never placeholder text (spec's empty-state rule). */
export function TestimonialSlot({
  index,
  dark = false,
}: {
  index: number;
  dark?: boolean;
}) {
  const t = TESTIMONIALS[index];
  if (!t) return null;
  return (
    <figure data-fadeup="" style={{ margin: "30px 0 0", maxWidth: 460 }}>
      <blockquote
        style={{
          margin: 0,
          fontFamily: SERIF,
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: 20,
          lineHeight: 1.5,
          color: dark ? "#F7F5F2" : "#0E0D0B",
        }}
      >
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption
        style={{
          marginTop: 12,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: ".22em",
          textTransform: "uppercase",
          color: GOLD,
        }}
      >
        {t.names}
        {t.context ? ` · ${t.context}` : ""}
      </figcaption>
    </figure>
  );
}
```

- [ ] **Step 2: Point the anchor at the form**

In `src/app/(site)/inquire/page.tsx`, the HoneyBook section currently opens with:

```tsx
      {/* ══ HoneyBook embed ══ */}
      <section
        id="inquire"
```

Change `id="inquire"` to `id="form"`. (Nothing links to `/inquire#inquire` — verified by grep — so this is safe.)

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: build succeeds. (`Cta.tsx` is not imported anywhere yet — Next tolerates unused components; the type-check still validates it.)

- [ ] **Step 4: Commit**

```bash
git add src/components/lei/Cta.tsx "src/app/(site)/inquire/page.tsx"
git commit -m "Add gold CTA + testimonial slot components; anchor the inquiry form at /inquire#form"
```

---

### Task 4: Mobile guards — no preloader / WebGL / scroll hero under 860px

**Files:**
- Modify: `src/lib/lei/motion.ts`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: nothing new.
- Produces: CSS classes `lx-hero-desktop` (hidden ≤860px) and `lx-hero-mobile` (shown ≤860px, `display:flex`) that Task 5's hero markup uses; motion engine that skips home cinematics on mobile.

- [ ] **Step 1: Guard the motion engine**

In `src/lib/lei/motion.ts`, directly after the line
`const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;`
add:

```ts
  // Desktop-only cinematics: the preloader, 300vh hero bloom and WebGL
  // ripple are skipped on small screens — mobile ships a static hero for
  // instant first paint (evaluated once per init; the breakpoint matches
  // the responsive fallbacks in globals.css).
  const mobile = window.matchMedia("(max-width: 860px)").matches;
  const home = !!opts.home && !mobile;
  const preloader = !!opts.preloader && !mobile;
  if (pre && mobile) pre.style.display = "none";
```

Then replace the three remaining reads of `opts.home` / `opts.preloader` in this function with the new locals:
- `if (opts.home) {` (the hero block, ~line 78) → `if (home) {`
- `if (opts.preloader && pre) {` (~line 112) → `if (preloader && pre) {`
- `if (opts.home) {` (the WebGL block, ~line 479) → `if (home) {`

Do not change the `LeiMotionOptions` interface or `initLeiMotion`'s signature.

- [ ] **Step 2: Add the hero/preloader CSS**

Append to `src/app/globals.css`:

```css
/* ── CONVERSION LAYER (mobile-first hero + preloader guard) ────────────── */
.lx-hero-mobile {
  display: none;
}

@media (max-width: 860px) {
  .lx-hero-desktop {
    display: none !important;
  }
  .lx-hero-mobile {
    display: flex !important;
  }
  [data-preloader] {
    display: none !important;
  }
}
```

- [ ] **Step 3: Verify build and desktop behavior is unchanged**

Run: `npm run build`
Expected: success.

Run: `npm run dev` in the background, then:

```bash
curl -s http://localhost:3000/ -o /dev/null -w "%{http_code}"
```

Expected: `200`. (The mobile behaviors are runtime-only; Task 11 verifies them in a browser. Nothing on desktop changes in this task because `lx-hero-desktop`/`lx-hero-mobile` are not applied to any markup yet.)

- [ ] **Step 4: Commit**

```bash
git add src/lib/lei/motion.ts src/app/globals.css
git commit -m "Skip preloader, WebGL and hero cinematics on mobile viewports"
```

---

### Task 5: Hero — desktop conversion layer + static mobile hero

**Files:**
- Create: `public/images/hero-mobile.jpg` (generated, ~1080px wide)
- Modify: `src/content/homepage.ts` (add `HERO_MOBILE`)
- Modify: `src/app/(site)/page.tsx`

**Interfaces:**
- Consumes: `CtaLink` from `@/components/lei/Cta`; `HERO_MOBILE` (added here) from `@/content/homepage`; CSS classes from Task 4.
- Produces: `export const HERO_MOBILE: Photo` in `homepage.ts` (path `/images/hero-mobile.jpg`).

- [ ] **Step 1: Generate the optimized mobile hero image**

The source frame (`sargon-odelya-09.jpg`, the veil at golden hour) is 388 KB — too heavy for a mobile LCP. Create a 1080px-wide, quality-74 copy with PowerShell (no new dependencies):

```powershell
Add-Type -AssemblyName System.Drawing
$src = [System.Drawing.Image]::FromFile("$PWD\public\images\portfolio\weddings\sargon-odelya\sargon-odelya-09.jpg")
$w = 1080; $h = [int]($src.Height * ($w / $src.Width))
$bmp = New-Object System.Drawing.Bitmap($w, $h)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($src, 0, 0, $w, $h)
$enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$p = New-Object System.Drawing.Imaging.EncoderParameters(1)
$p.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]74)
$bmp.Save("$PWD\public\images\hero-mobile.jpg", $enc, $p)
$g.Dispose(); $bmp.Dispose(); $src.Dispose()
[math]::Round((Get-Item "$PWD\public\images\hero-mobile.jpg").Length / 1KB)
```

Expected: prints a number **under 250** (KB). If it prints higher, re-run with quality `[long]65`.

- [ ] **Step 2: Register the photo in the content model**

In `src/content/homepage.ts`, after the `CTA_HREF` export, add:

```ts
/** Optimized full-bleed frame for the static mobile hero (LCP-critical). */
export const HERO_MOBILE: Photo = {
  path: "/images/hero-mobile.jpg",
  a: "Bride’s veil catching the light at golden hour",
  r: "p",
};
```

- [ ] **Step 3: Update the homepage hero markup**

In `src/app/(site)/page.tsx`:

3a. Add imports (top of file, alongside the existing ones):

```tsx
import { CtaLink } from "@/components/lei/Cta";
import { HERO_MOBILE } from "@/content/homepage";
```

3b. Tag the existing hero as desktop-only — change its opening tag from:

```tsx
      <section
        id="top"
        data-hero=""
        style={{ position: "relative", height: "300vh", background: "#F7F5F2" }}
      >
```

to:

```tsx
      <section
        id="top"
        data-hero=""
        className="lx-hero-desktop"
        style={{ position: "relative", height: "300vh", background: "#F7F5F2" }}
      >
```

3c. Update the hero kicker text (inside `data-hero-kicker`), from
`Bay Area · Weddings · Graduations · Portraits` to:

```
San Francisco Bay Area · Weddings &amp; Couples
```

3d. Replace the `data-hero-sub` div (the "Photographed with intention — by Raymond Lei" line) with the ideal-client line plus the CTA. The motion engine animates every `[data-hero-sub]` element, so both fade in with the load sequence; the CTA wrapper restores pointer events (the lockup sets `pointerEvents: "none"`):

```tsx
            <div
              data-hero-sub=""
              style={{
                marginTop: "4vh",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: ".2em",
                textTransform: "uppercase",
                opacity: 0.8,
              }}
            >
              For couples who&rsquo;d rather live it than pose for it
            </div>
            <div
              data-hero-sub=""
              style={{ marginTop: "3.5vh", pointerEvents: "auto" }}
            >
              <CtaLink />
            </div>
```

3e. Immediately after the desktop hero section's closing `</section>` (before the Manifesto section), add the mobile hero and its preload hint:

```tsx
      {/* ══ Mobile hero — static and instant; the scroll cinematics are
          desktop-only (see motion.ts mobile guard) ══ */}
      <link
        rel="preload"
        as="image"
        href={HERO_MOBILE.path}
        media="(max-width: 860px)"
      />
      <section
        className="lx-hero-mobile"
        style={{
          position: "relative",
          minHeight: "100svh",
          background: "#0E0D0B",
          color: "#F7F5F2",
          flexDirection: "column",
          justifyContent: "flex-end",
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_MOBILE.path}
          alt={HERO_MOBILE.a}
          fetchPriority="high"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(14,13,11,.74) 0%, rgba(14,13,11,.12) 55%)",
          }}
        />
        <div style={{ position: "relative", padding: "0 24px 56px" }}>
          <div style={kicker({ marginBottom: 16 }, 10, ".26em")}>
            San Francisco Bay Area · Weddings &amp; Couples
          </div>
          <h2
            style={{
              margin: "0 0 24px",
              fontFamily: SERIF,
              fontWeight: 500,
              fontSize: "clamp(34px,9.5vw,46px)",
              lineHeight: 1.12,
              textWrap: "pretty",
            }}
          >
            For couples who&rsquo;d rather <em>live it</em> than pose for it.
          </h2>
          <CtaLink />
        </div>
      </section>
```

(React 19 hoists the `<link rel="preload">` into `<head>` automatically; the `media` attribute keeps desktop from downloading the mobile image.)

- [ ] **Step 4: Verify**

Run: `npm run build`
Expected: success.

With `npm run dev` running:

```bash
curl -s http://localhost:3000/ | grep -c "Check my availability"
```

Expected: `2` or more (desktop hero CTA + mobile hero CTA are both in the server-rendered HTML).

```bash
curl -s http://localhost:3000/ | grep -c "hero-mobile.jpg"
```

Expected: `2` (preload link + img).

- [ ] **Step 5: Commit**

```bash
git add public/images/hero-mobile.jpg src/content/homepage.ts "src/app/(site)/page.tsx"
git commit -m "Hero: conversion layer in first viewport, static mobile hero with optimized LCP image"
```

---

### Task 6: "Who I photograph" — couples-only copy + CTA + testimonial slot #1

**Files:**
- Modify: `src/app/(site)/page.tsx` (the `{/* ══ Who I photograph ══ */}` section only)

**Interfaces:**
- Consumes: `CtaLink`, `TestimonialSlot` from `@/components/lei/Cta` (extend the Task 5 import line).

- [ ] **Step 1: Update the import**

Change the Cta import in `page.tsx` to:

```tsx
import { CtaLink, TestimonialSlot } from "@/components/lei/Cta";
```

- [ ] **Step 2: Revise the section's left column**

In the `{/* ══ Who I photograph ══ */}` section, inside the first `<div>` (the text column):

2a. Replace the `<h2>` text content (keep all attributes/styles) with:

```tsx
            Your day, remembered the way it actually <em>felt.</em>
```

2b. Replace the `<p>` text content (keep attributes/styles) with:

```tsx
            Hi — I&rsquo;m Raymond. I photograph couples at the moments their
            lives change, and I care more about how an image feels than how
            perfectly staged it looks. If that sounds like you, we&rsquo;ll get
            along.
```

2c. Replace the three bullet strings in the `.map()` array with:

```tsx
              "Weddings, from the quiet getting-ready hours to the last dance — I stay for the real moments, not just the scheduled ones.",
              "Engagements and couples sessions that feel like a good date, not a photoshoot.",
              "Anyone who's ever said “I'm awkward in front of a camera” — gentle direction and real conversation are the whole point.",
```

2d. Directly after the closing `</ul>`, still inside the text column div, add:

```tsx
          <div data-fadeup="" style={{ marginTop: 34 }}>
            <CtaLink />
          </div>
          <TestimonialSlot index={0} />
```

- [ ] **Step 3: Verify**

Run: `npm run build` — expected: success.

```bash
curl -s http://localhost:3000/ | grep -c "Check my availability"
```

Expected: `3` or more. Confirm no testimonial markup rendered (TESTIMONIALS is empty):

```bash
curl -s http://localhost:3000/ | grep -c "blockquote"
```

Expected: `0`.

- [ ] **Step 4: Commit**

```bash
git add "src/app/(site)/page.tsx"
git commit -m "Refocus Who I photograph on couples; add CTA and testimonial slot"
```

---

### Task 7: The Collection → four category doors

**Files:**
- Modify: `src/app/(site)/page.tsx` (replace `<HorizontalCollection />` usage; `src/components/lei/HorizontalCollection.tsx` itself is NOT touched — `/work` still uses it)
- Modify: `src/app/globals.css` (doors responsive rule)

**Interfaces:**
- Consumes: `DOORS` from `@/content/homepage`; `img` from `@/content/portfolio` (already imported); `CtaLink`; existing `.lx-proj`/`.lx-imgwrap`/`.lx-arrow` hover CSS.

- [ ] **Step 1: Update imports in `page.tsx`**

Remove the line `import HorizontalCollection from "@/components/lei/HorizontalCollection";` and extend the homepage-content import to:

```tsx
import { DOORS, HERO_MOBILE } from "@/content/homepage";
```

- [ ] **Step 2: Replace the section**

Replace these two lines:

```tsx
      {/* ══ Horizontal collection (identical to Work) ══ */}
      <HorizontalCollection />
```

with:

```tsx
      {/* ══ The Collection — four category doors ══ */}
      <section
        style={{
          position: "relative",
          background: "#0E0D0B",
          color: "#F7F5F2",
          padding: "16vh 6vw",
        }}
      >
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <div data-fadeup="" style={kicker({ marginBottom: 18 }, 10, ".3em")}>
            The Collection
          </div>
          <h2
            data-fadeup=""
            style={{
              margin: "0 0 7vh",
              fontFamily: SERIF,
              fontWeight: 500,
              fontSize: "clamp(34px,4.4vw,58px)",
              lineHeight: 1.08,
            }}
          >
            Where would you like to <em>begin?</em>
          </h2>
          <div
            className="lx-doors"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1.8vw",
            }}
          >
            {DOORS.map((d, i) => (
              <Link
                key={d.cat}
                href={`/portfolio/${d.cat}`}
                className="lx-proj"
                data-proj=""
                style={{ marginBottom: 0 }}
              >
                <div className="lx-imgwrap" style={{ aspectRatio: "3 / 4" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img(d.photo.path, 750)}
                    alt={d.photo.a}
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 10,
                    marginTop: 16,
                  }}
                >
                  <span
                    style={{ fontSize: 10, color: GOLD, letterSpacing: ".18em" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    style={{
                      fontFamily: SERIF,
                      fontSize: "clamp(20px,1.8vw,26px)",
                      fontWeight: 500,
                      color: "#F7F5F2",
                    }}
                  >
                    {d.label}
                  </span>
                  <span className="lx-arrow" style={{ color: GOLD }}>
                    →
                  </span>
                </div>
                <div
                  style={{
                    marginTop: 6,
                    fontSize: 12,
                    letterSpacing: ".04em",
                    color: cream(0.55),
                  }}
                >
                  {d.tagline}
                </div>
              </Link>
            ))}
          </div>
          <div
            data-fadeup=""
            style={{ marginTop: "8vh", display: "flex", justifyContent: "center" }}
          >
            <CtaLink />
          </div>
        </div>
      </section>
```

- [ ] **Step 3: Doors responsive rule**

In `src/app/globals.css`, inside the existing `@media (max-width: 860px)` block (after the `.lx-gallery` rule), add:

```css
  .lx-doors {
    grid-template-columns: 1fr 1fr !important;
    gap: 18px !important;
  }
```

- [ ] **Step 4: Verify**

Run: `npm test && npm run build` — expected: PASS + success.

```bash
curl -s http://localhost:3000/ | grep -o 'href="/portfolio/[a-z]*"' | sort -u
```

Expected: exactly four category hrefs — `couples`, `engagements`, `events`, `weddings`.

Confirm `/work` still renders its own HorizontalCollection:

```bash
curl -s http://localhost:3000/work -o /dev/null -w "%{http_code}"
```

Expected: `200`.

- [ ] **Step 5: Commit**

```bash
git add "src/app/(site)/page.tsx" src/app/globals.css
git commit -m "Replace homepage horizontal collection with four category doors"
```

---

### Task 8: Recent Weddings proof section + CTA + testimonial slot #2

**Files:**
- Modify: `src/app/(site)/page.tsx` (new section between the doors section and the `{/* ══ About ══ */}` section)

**Interfaces:**
- Consumes: `RECENT_WEDDINGS` from `@/content/homepage` (extend import: `{ DOORS, HERO_MOBILE, RECENT_WEDDINGS }`), `aspect` from `@/content/portfolio` (extend import: `{ aspect, img, PHOTOS }`), `CtaLink`, `TestimonialSlot`.

- [ ] **Step 1: Extend the imports** as listed above.

- [ ] **Step 2: Insert the section**

Directly after the doors section's closing `</section>` and before `{/* ══ About ══ */}`, add:

```tsx
      {/* ══ Recent weddings — proof of consistency ══ */}
      <section
        style={{
          position: "relative",
          background: "#F7F5F2",
          color: "#0E0D0B",
          padding: "18vh 6vw",
        }}
      >
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <div data-fadeup="" style={kicker({ marginBottom: 18 }, 10, ".3em")}>
            Recent weddings
          </div>
          <h2
            data-fadeup=""
            style={{
              margin: "0 0 7vh",
              fontFamily: SERIF,
              fontWeight: 500,
              fontSize: "clamp(34px,4.4vw,58px)",
              lineHeight: 1.08,
            }}
          >
            Whole days, told <em>honestly.</em>
          </h2>

          {RECENT_WEDDINGS.map((w) => (
            <Link
              key={w.href}
              href={w.href}
              className="lx-proj lx-grid-2col"
              style={{
                display: "grid",
                gridTemplateColumns: "1.5fr 1fr",
                gap: "3vw",
                alignItems: "end",
                marginBottom: "8vh",
              }}
            >
              <div className="lx-imgwrap" data-reveal="" style={{ overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img(w.cover.path, 1500)}
                  alt={w.cover.a}
                  loading="lazy"
                  style={{
                    width: "100%",
                    aspectRatio: aspect(w.cover),
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
              <div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 14,
                    marginBottom: 26,
                  }}
                >
                  {w.frames.map((f) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={f.path}
                      src={img(f.path, 750)}
                      alt={f.a}
                      loading="lazy"
                      data-fadeup=""
                      style={{
                        width: "100%",
                        aspectRatio: "3 / 4",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  ))}
                </div>
                <div data-fadeup="">
                  <div
                    style={{
                      fontFamily: SERIF,
                      fontWeight: 500,
                      fontSize: "clamp(26px,2.6vw,38px)",
                      lineHeight: 1.1,
                    }}
                  >
                    {w.title}
                  </div>
                  <div
                    style={{
                      marginTop: 10,
                      fontSize: 12,
                      letterSpacing: ".14em",
                      textTransform: "uppercase",
                      color: MUTED,
                    }}
                  >
                    {w.place} · {w.year}
                  </div>
                  <div
                    className="lx-explore"
                    style={{
                      marginTop: 18,
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: ".22em",
                      textTransform: "uppercase",
                      color: GOLD,
                    }}
                  >
                    View the gallery →
                  </div>
                </div>
              </div>
            </Link>
          ))}

          <div
            data-fadeup=""
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              textAlign: "center",
            }}
          >
            <CtaLink />
            <TestimonialSlot index={1} />
          </div>
        </div>
      </section>
```

- [ ] **Step 3: Verify**

Run: `npm run build` — expected: success.

```bash
curl -s http://localhost:3000/ | grep -c "sargon-odelya"
```

Expected: at least `1` (the gallery link). And the curated project page still works:

```bash
curl -s http://localhost:3000/portfolio/weddings/sargon-odelya -o /dev/null -w "%{http_code}"
```

Expected: `200`.

- [ ] **Step 4: Commit**

```bash
git add "src/app/(site)/page.tsx"
git commit -m "Add Recent Weddings proof section with curated gallery link"
```

---

### Task 9: Pricing band, final availability block, lazy-loading pass

**Files:**
- Modify: `src/app/(site)/page.tsx`

**Interfaces:**
- Consumes: `CtaLink`; existing tokens. No new exports.

- [ ] **Step 1: Insert the pricing band**

Directly after the `{/* ══ About ══ */}` section's closing `</section>` and before `{/* ══ Inquire ══ */}`, add:

```tsx
      {/* ══ Pricing ══ */}
      <section
        style={{
          position: "relative",
          background: "#F7F5F2",
          color: "#0E0D0B",
          padding: "0 6vw 18vh",
          textAlign: "center",
        }}
      >
        <div data-fadeup="" style={kicker({ marginBottom: 18 }, 10, ".3em")}>
          Investment
        </div>
        <h2
          data-fadeup=""
          style={{
            margin: 0,
            fontFamily: SERIF,
            fontWeight: 500,
            fontSize: "clamp(34px,4.6vw,60px)",
            lineHeight: 1.1,
          }}
        >
          Collections from <em>$2,400</em>
        </h2>
        <p
          data-fadeup=""
          style={{
            maxWidth: 520,
            margin: "22px auto 0",
            fontSize: 15,
            lineHeight: 1.75,
            color: MUTED,
          }}
        >
          Tailored to full days, intimate ceremonies, and everything in
          between. Tell me about your day and I&rsquo;ll share full pricing.
        </p>
        <div data-fadeup="" style={{ marginTop: 30 }}>
          <CtaLink />
        </div>
      </section>
```

(The spec's `/pricing` page is a later phase; until it exists the CTA itself is the path to pricing, so no dead link is created.)

- [ ] **Step 2: Convert the final block**

In the `{/* ══ Inquire ══ */}` section, replace the entire HoneyBook placeholder card — everything from `{/* ▼▼▼ HONEYBOOK EMBED SLOT (home) …` through `{/* ▲▲▲ END HOME HONEYBOOK SLOT ▲▲▲ */}` inclusive — with:

```tsx
          <div
            data-fadeup=""
            style={{
              minHeight: 420,
              background: "#F7F5F2",
              borderRadius: "var(--radius-lg)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 22,
              padding: "56px 32px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: SERIF,
                fontSize: "clamp(26px,2.4vw,34px)",
                fontWeight: 500,
                color: "#0E0D0B",
                lineHeight: 1.15,
              }}
            >
              Now booking 2026 &amp; 2027 weddings
            </div>
            <p
              style={{
                maxWidth: 360,
                margin: 0,
                fontSize: 15,
                lineHeight: 1.7,
                color: MUTED,
              }}
            >
              Share a few details about your day — you&rsquo;ll hear back from
              me personally within 48 hours.
            </p>
            <CtaLink />
          </div>
```

- [ ] **Step 3: Lazy-loading pass**

Add `loading="lazy"` to every below-the-fold `<img>` in `page.tsx` that doesn't have it yet — in the Manifesto section (the two `data-float` images), the Who I photograph section (both images), the About section (the headshot), and the Inquire section (the `data-float` editorial image). Do NOT touch the desktop hero image (`data-hero-img`, desktop LCP) or the mobile hero image (mobile LCP, `fetchPriority="high"`).

- [ ] **Step 4: Verify**

Run: `npm run build` — expected: success.

```bash
curl -s http://localhost:3000/ | grep -c "Collections from"
curl -s http://localhost:3000/ | grep -c "\$2,400"
curl -s http://localhost:3000/ | grep -c "Check my availability"
curl -s http://localhost:3000/ | grep -c 'loading="lazy"'
```

Expected: `1`, `1`, `6` or more (2 hero + who + doors + pricing + final), `9` or more.

- [ ] **Step 5: Commit**

```bash
git add "src/app/(site)/page.tsx"
git commit -m "Add pricing band and availability final block; lazy-load below-fold imagery"
```

---

### Task 10: Persistent mobile CTA in the site chrome

**Files:**
- Modify: `src/components/lei/Chrome.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: `GOLD` from `./tokens` (already imported); plain `Link` (already imported). Uses literal href/label rather than `@/content/homepage` to keep Chrome dependency-free of content modules — the values MUST match `CTA_HREF` (`/inquire#form`).

- [ ] **Step 1: Add the button**

In `src/components/lei/Chrome.tsx`, directly after the `</header>` closing tag (outside it — the header's `mix-blend-difference` would corrupt the gold), add:

```tsx
      {/* Mobile-only persistent CTA — a floating gold pill so the inquiry
          action is on screen at any scroll depth (hidden on desktop via
          .lx-mob-cta in globals.css; sits under the menu overlay's z-index). */}
      <Link
        href="/inquire#form"
        className="lx-mob-cta"
        style={{
          position: "fixed",
          right: 18,
          bottom: 18,
          zIndex: 90,
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: ".18em",
          textTransform: "uppercase",
          color: "#0E0D0B",
          background: GOLD,
          padding: "13px 20px",
          borderRadius: 999,
          textDecoration: "none",
          boxShadow: "0 10px 30px rgba(14,13,11,.35)",
        }}
      >
        Availability
      </Link>
```

- [ ] **Step 2: Add the CSS**

In `src/app/globals.css`: near the `.lx-burger { display: none; }` rule add:

```css
.lx-mob-cta {
  display: none;
}
```

and inside the `@media (max-width: 860px)` block add:

```css
  .lx-mob-cta {
    display: inline-block !important;
  }
```

- [ ] **Step 3: Verify**

Run: `npm run build` — expected: success.

```bash
curl -s http://localhost:3000/free-session | grep -c "lx-mob-cta"
```

Expected: `1` — Chrome is shared, so the pill markup exists on every page (including untouched pages, where it's an additive fixed element, not a content change). Desktop hides it via CSS.

- [ ] **Step 4: Commit**

```bash
git add src/components/lei/Chrome.tsx src/app/globals.css
git commit -m "Add persistent mobile gold Availability CTA to the site chrome"
```

---

### Task 11: End-to-end verification (funnel, performance, no-deletions guarantee)

**Files:** none created/modified unless a check fails (fix, then re-run).

- [ ] **Step 1: Unit tests + production build**

Run: `npm test && npm run build`
Expected: all tests PASS; build succeeds with `/portfolio/couples` in the route output.

- [ ] **Step 2: Serve the production build and sweep every route**

Run `npm run start` in the background (after `npm run build`), then:

```bash
for r in / /work /weddings /about /experience /inquire /free-session /portfolio /portfolio/weddings /portfolio/couples /portfolio/graduations /portfolio/portraits /portfolio/events /portfolio/engagements /portfolio/weddings/sargon-odelya /portfolio/couples/along-the-coast; do
  echo "$r $(curl -s -o /dev/null -w '%{http_code}' http://localhost:3000$r)"
done
```

Expected: every route prints `200`. This is the no-deletions guarantee, checked.

- [ ] **Step 3: Funnel content assertions**

```bash
curl -s http://localhost:3000/ | grep -c "Check my availability"        # expect >= 6
curl -s http://localhost:3000/ | grep -c 'href="/inquire#form"'          # expect >= 6
curl -s http://localhost:3000/inquire | grep -c 'id="form"'              # expect 1
curl -s http://localhost:3000/ | grep -c "\$2,400"                       # expect 1
curl -s http://localhost:3000/ | grep -c "blockquote"                    # expect 0 (no fake testimonials)
curl -s http://localhost:3000/ | grep -c "fetchpriority"                 # expect 1 (mobile hero)
```

- [ ] **Step 4: Browser verification (use the `verify` skill / `run` skill)**

Drive the real funnel in a browser at both viewports:
- **Mobile (390×844):** homepage paints the static hero instantly — no preloader, no 300vh scroll section; kicker + headline + gold CTA visible without scrolling; the floating gold `Availability` pill is present while scrolling; tapping any `Check my availability` lands on `/inquire` scrolled to the HoneyBook form.
- **Desktop (1440×900):** preloader plays (first visit per session), "STORY" scroll cinematics still work, and the first viewport shows the new kicker, ideal-client line, and gold CTA; the mobile pill is hidden; The Collection shows four doors; Recent Weddings links to the curated 13-photo Sargon & Odelya gallery.
- **Reduced motion:** with `prefers-reduced-motion: reduce`, content is fully visible with no animation.

- [ ] **Step 5: Performance check**

With the production server running:

```bash
npx --yes lighthouse http://localhost:3000 --only-categories=performance --form-factor=mobile --screenEmulation.mobile --chrome-flags="--headless" --output=json --output-path=./lighthouse-mobile.json
node -e "const r=require('./lighthouse-mobile.json');console.log('LCP', r.audits['largest-contentful-paint'].displayValue, 'Perf', r.categories.performance.score)"
```

Expected: LCP under 2.5 s and performance score ≥ 0.85. If Lighthouse cannot run in this environment (no Chrome), record that and verify instead that the mobile HTML contains the preload hint and `fetchpriority="high"` (Step 3) and that `public/images/hero-mobile.jpg` is < 250 KB. Delete `lighthouse-mobile.json` afterwards (do not commit it).

- [ ] **Step 6: Final commit (only if fixes were needed)**

```bash
git status
```

If clean: done. If fixes were made during verification, commit them:

```bash
git add -A
git commit -m "Verification fixes for homepage conversion rebuild"
```

---

## Deferred to later phases (do NOT build now)

- `/pricing` page; `/about` rewrite; `/inquire` reorder beyond the anchor id (including the spec's mailto fallback for a blocked/failed HoneyBook script); nav condensing (`Portfolio · Pricing · About · Inquire`); weddings #2/#3 and real testimonial content (arrive as data drops into `homepage.ts`); HoneyBook dashboard field trimming (owner task, not code).
