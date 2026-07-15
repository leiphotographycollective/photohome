# Positioning Retrofit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the cover-story brand position ("Your wedding, shot like the cover story it is.") to the homepage and global chrome — brand constants in the content layer, a Track B `SecondaryCta` component pointing at `/free-session`, rewritten homepage copy, and updated site metadata/footer — per the approved spec at `docs/superpowers/specs/2026-07-15-positioning-retrofit-design.md`.

**Architecture:** The homepage (`src/app/(site)/page.tsx`) is a server component of inline-styled sections animated by a GSAP/Lenis motion engine (`src/lib/lei/motion.ts`) bound to `data-*` attributes at runtime. Positioning strings become exports of `src/content/homepage.ts` (single source of truth for later sub-projects); the secondary CTA becomes a component in `src/components/lei/Cta.tsx` beside the existing `CtaLink`. Copy changes are edits-in-place; no layout, grid, or motion-engine changes.

**Tech Stack:** Next.js 16.2.9 (App Router), React 19, TypeScript, GSAP + Lenis (existing), Vitest.

## Global Constraints

- **This is NOT the Next.js you know** (AGENTS.md): follow repo patterns exactly — plain `<img>` with the eslint-disable comment, inline style objects, tokens from `src/components/lei/tokens.ts` (`GOLD = "#B8905A"`). No `next/image`, no CSS modules.
- **Exact strings (non-negotiable, verbatim):**
  - `CITY` = `San Francisco Bay Area`
  - `POSITIONING` = `Your wedding, shot like the cover story it is.`
  - `POSITIONING_SUB` = `Bay Area wedding photographer for couples who bring the style and the party.`
  - `SECONDARY_CTA_LABEL` = `Just started planning? Claim a free engagement session`
  - `SECONDARY_CTA_HREF` = `/free-session`
  - Primary CTA stays exactly `Check my availability` → `/inquire#form`; price copy stays exactly `Collections from $2,400`.
- **Gold is reserved for conversion CTAs.** `SecondaryCta` must read as subordinate (small text link, muted color, gold only in the underline/hover), never as a second gold pill.
- **Copy voice rules** (owner's strategy doc): write like you talk; hype the couple, not the photographer; editorial confidence, never apology; at most ONE all-caps burst on the page (it's "SO" in the Who-I-photograph intro); curly apostrophes via `&rsquo;` in JSX text.
- **Motion-engine facts** (do not fight them): the hero bloom anchors to the letter `O` found in `[data-hero-line]` **index 1** — the second lockup line must contain exactly one O (COVER does). `[data-manifesto]` word-reveal does `manifesto.textContent = ""` and rebuilds from plain text — never put child elements (`<em>`, `<span>`) inside it.
- **No deletions:** all routes stay live; `/free-session` gains inbound links but its own content is untouched. Desktop hero cinematics and mobile static-hero behavior from Phase 1 unchanged.
- Run all shell steps from the repo root `C:\Users\raymo\ShipStudio\photohome`. Bash syntax shown; on Windows use the Bash tool. Note: quote `"src/app/(site)/page.tsx"` in every git/shell command — unquoted parentheses break PowerShell.

---

### Task 1: Brand constants + `SecondaryCta` component

**Files:**
- Modify: `src/content/homepage.ts` (add 5 exports after `CTA_HREF`, line 13)
- Modify: `src/components/lei/Cta.tsx` (add `SecondaryCta`)
- Modify: `src/app/globals.css` (append hover rule)
- Test: `tests/homepage-content.test.ts`

**Interfaces:**
- Consumes: existing `CTA_HREF`/`CTA_LABEL` pattern in `src/content/homepage.ts`; `Link` from `next/link`; `CSSProperties` from `react`.
- Produces (used by Tasks 2-3): `CITY: string`, `POSITIONING: string`, `POSITIONING_SUB: string`, `SECONDARY_CTA_LABEL: string`, `SECONDARY_CTA_HREF: string` from `@/content/homepage`; `SecondaryCta({ dark?: boolean, style?: CSSProperties })` from `@/components/lei/Cta` — renders a `<Link className="lx-cta2">` to `SECONDARY_CTA_HREF`.

- [ ] **Step 1: Write the failing test**

In `tests/homepage-content.test.ts`, extend the import from `@/content/homepage` to:

```ts
import {
  CITY,
  CTA_HREF,
  CTA_LABEL,
  DOORS,
  POSITIONING,
  POSITIONING_SUB,
  RECENT_WEDDINGS,
  SECONDARY_CTA_HREF,
  SECONDARY_CTA_LABEL,
  TESTIMONIALS,
} from "@/content/homepage";
```

and add after the `describe("CTA constants", ...)` block:

```ts
describe("positioning constants", () => {
  it("match the approved spec exactly", () => {
    expect(CITY).toBe("San Francisco Bay Area");
    expect(POSITIONING).toBe("Your wedding, shot like the cover story it is.");
    expect(POSITIONING_SUB).toBe(
      "Bay Area wedding photographer for couples who bring the style and the party."
    );
  });

  it("secondary CTA points at the live free-session page", () => {
    expect(SECONDARY_CTA_LABEL).toBe(
      "Just started planning? Claim a free engagement session"
    );
    expect(SECONDARY_CTA_HREF).toBe("/free-session");
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — `@/content/homepage` has no export named `CITY` (module resolution error listing the missing names).

- [ ] **Step 3: Add the constants**

In `src/content/homepage.ts`, directly after `export const CTA_HREF = "/inquire#form";` (line 13) and before the `HERO_MOBILE` export, insert:

```ts
/** SEO anchor — must appear in hero kickers, page titles, and footer. */
export const CITY = "San Francisco Bay Area";

/** The site-wide positioning line (cover-story angle) and support line.
 *  Later pages (pricing, about, FAQ) import these — never retype them. */
export const POSITIONING = "Your wedding, shot like the cover story it is.";
export const POSITIONING_SUB =
  "Bay Area wedding photographer for couples who bring the style and the party.";

/** Track B soft CTA for early planners — points at the live /free-session
 *  capture page until the Planning Guide funnel ships (then only the href
 *  changes; every placement updates automatically). */
export const SECONDARY_CTA_LABEL =
  "Just started planning? Claim a free engagement session";
export const SECONDARY_CTA_HREF = "/free-session";
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test`
Expected: PASS (all files, including the two new tests).

- [ ] **Step 5: Add the `SecondaryCta` component**

In `src/components/lei/Cta.tsx`, extend the content import (line 4) to:

```ts
import {
  CTA_HREF,
  CTA_LABEL,
  SECONDARY_CTA_HREF,
  SECONDARY_CTA_LABEL,
  TESTIMONIALS,
} from "@/content/homepage";
```

and add after the `CtaLink` function:

```tsx
/** Track B soft CTA — a quiet text link that sits directly beneath a gold
 *  pill. Deliberately subordinate: gold stays reserved for the primary
 *  conversion action, so this carries gold only in its underline. */
export function SecondaryCta({
  dark = false,
  style,
}: {
  dark?: boolean;
  style?: CSSProperties;
}) {
  return (
    <Link
      data-hover=""
      href={SECONDARY_CTA_HREF}
      className="lx-cta2"
      style={{
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: ".12em",
        textTransform: "uppercase",
        color: dark ? "rgba(247,245,242,.72)" : "rgba(14,13,11,.62)",
        textDecoration: "underline",
        textUnderlineOffset: 5,
        textDecorationColor: "rgba(184,144,90,.55)",
        ...style,
      }}
    >
      {SECONDARY_CTA_LABEL} &rarr;
    </Link>
  );
}
```

- [ ] **Step 6: Add the hover rule**

Append to `src/app/globals.css` (inline styles can't express `:hover`; `!important` beats the inline base color, matching how this stylesheet already overrides inline styles):

```css
/* ── Track B secondary CTA — gold brightens on hover ───────────────────── */
.lx-cta2 {
  transition: color 0.3s ease, text-decoration-color 0.3s ease;
}
.lx-cta2:hover {
  color: #b8905a !important;
  text-decoration-color: #b8905a;
}
```

- [ ] **Step 7: Verify build**

Run: `npm run build`
Expected: success. (`SecondaryCta` is not imported anywhere yet; the type-check still validates it.)

- [ ] **Step 8: Commit**

```bash
git add src/content/homepage.ts src/components/lei/Cta.tsx src/app/globals.css tests/homepage-content.test.ts
git commit -m "Add positioning brand constants and SecondaryCta component"
```

---

### Task 2: Heroes, preloader tagline, homepage metadata

**Files:**
- Modify: `src/app/(site)/page.tsx` (metadata block ~lines 12-16; preloader sub ~line 65; desktop hero ~lines 186-225; mobile hero ~lines 308-323)

**Interfaces:**
- Consumes: `SecondaryCta` from `@/components/lei/Cta` (Task 1); `POSITIONING` from `@/content/homepage` (Task 1).
- Produces: nothing new — page-level copy only.

- [ ] **Step 1: Update imports**

In `src/app/(site)/page.tsx`, change line 9 and line 10 to:

```tsx
import { CtaLink, SecondaryCta, TestimonialSlot } from "@/components/lei/Cta";
```

(Line 10, the `@/content/homepage` import, stays unchanged — the positioning line appears below as JSX text with an `<em>` split, so importing the `POSITIONING` constant would leave it unused and fail lint.)

- [ ] **Step 2: Replace the homepage metadata**

Replace the `export const metadata` block (lines 12-16) with:

```tsx
export const metadata: Metadata = {
  title: "Editorial Wedding Photography in the San Francisco Bay Area",
  description:
    "Your wedding, shot like the cover story it is. Editorial wedding photography for fun, stylish couples in the San Francisco Bay Area & beyond — by Raymond Lei.",
};
```

- [ ] **Step 3: Swap the preloader tagline**

In the preloader (`data-pl-sub` div, ~line 65), replace the text
`Presence · Story · Feeling` with:

```
San Francisco Bay Area · Editorial Weddings
```

- [ ] **Step 4: Rewrite the desktop hero**

4a. In the `data-hero-kicker` div (~line 186), replace
`San Francisco Bay Area · Weddings &amp; Couples` with:

```
San Francisco Bay Area · Editorial Wedding Photography
```

4b. Replace the three `data-hero-line` divs inside the `<h1>` (currently PRESENCE, / STORY &, / FEELING.) with:

```tsx
              <div data-hero-line="" style={{ fontSize: "clamp(64px,13vw,190px)" }}>
                YOUR
              </div>
              <div data-hero-line="" style={{ fontSize: "clamp(64px,13vw,190px)" }}>
                COVER
              </div>
              <div data-hero-line="" style={{ fontSize: "clamp(64px,13vw,190px)" }}>
                <em style={{ fontWeight: 500 }}>STORY.</em>
              </div>
```

(Motion-engine constraint: the WebGL bloom anchors to the letter O in line index 1 — COVER has exactly one O. Do not add an O-bearing `<em>` split to line 2 or reorder lines.)

4c. In the first `data-hero-sub` div (~line 218), replace the text
`For couples who&rsquo;d rather live it than pose for it` with:

```
Your wedding, shot like the cover story it is — for couples who bring the style and the party.
```

4d. Replace the second `data-hero-sub` div (the CTA wrapper, ~lines 220-225) with:

```tsx
            <div
              data-hero-sub=""
              style={{
                marginTop: "3.5vh",
                pointerEvents: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 18,
              }}
            >
              <CtaLink />
              <SecondaryCta />
            </div>
```

- [ ] **Step 5: Rewrite the mobile hero**

5a. In the mobile hero kicker (~line 309), replace
`San Francisco Bay Area · Weddings &amp; Couples` with:

```
San Francisco Bay Area · Editorial Wedding Photography
```

5b. Replace the mobile `<h1>` content (currently `For couples who&rsquo;d rather <em>live it</em> than pose for it.`) with:

```tsx
            Your wedding, shot like the <em>cover story</em> it is.
```

(This is the `POSITIONING` constant's text with the site's em treatment; the plain-text constant drives metadata and tests, the JSX version carries the italics. The words must match `POSITIONING` exactly — do not import the constant here, the `<em>` split makes direct interpolation impossible.)

5c. Replace the lone `<CtaLink />` after the mobile `</h1>` (~line 323) with:

```tsx
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 16,
            }}
          >
            <CtaLink />
            <SecondaryCta dark />
          </div>
```

(`dark` because the mobile hero sits on the dark gradient.)

- [ ] **Step 6: Verify**

Run: `npm run build` — expected: success.

With `npm run dev` running:

(Use `grep -o … | wc -l` throughout — it counts occurrences; `grep -c` counts lines and lies on single-line minified HTML.)

```bash
curl -s http://localhost:3000/ | grep -o "COVER" | wc -l                      # expect >= 1
curl -s http://localhost:3000/ | grep -o "cover story it is" | wc -l          # expect >= 2 (meta description + desktop hero sub; the mobile h1's <em> splits the phrase)
curl -s http://localhost:3000/ | grep -o 'href="/free-session"' | wc -l       # expect 3 (both heroes + pre-existing chrome nav link (desktop Weddings dropdown))
curl -s http://localhost:3000/ | grep -o "San Francisco Bay Area" | wc -l     # expect >= 3
curl -s http://localhost:3000/ | grep -o "Presence · Story · Feeling" | wc -l # expect 0
```

- [ ] **Step 7: Commit**

```bash
git add "src/app/(site)/page.tsx"
git commit -m "Hero + preloader + metadata in cover-story voice with secondary CTA"
```

---

### Task 3: Homepage body copy — manifesto, who-I-photograph, recent weddings, pricing, final block

**Files:**
- Modify: `src/app/(site)/page.tsx` (Manifesto ~line 393; Who I photograph ~lines 429-470; Recent weddings h2 ~line 630; Pricing ~lines 867-872; final block ~lines 1014-1017)

**Interfaces:**
- Consumes: `SecondaryCta` (Task 1), `GOLD` from `@/components/lei/tokens` (already imported in page.tsx).
- Produces: nothing new.

- [ ] **Step 1: Manifesto**

Replace the `data-manifesto` paragraph text (~line 393),
`Photographed with intention — so your moments aren&rsquo;t just seen, they&rsquo;re felt.`, with:

```
You two, at your absolute best — the style, the party, and every real moment in between.
```

PLAIN TEXT ONLY — the word-reveal animation does `textContent = ""` and rebuilds from plain text, destroying any child elements. No `<em>`, no `<span>` inside `data-manifesto`.

- [ ] **Step 2: Who I photograph**

2a. Replace the `<h2>` content (~line 429), currently `Your day, remembered the way it actually <em>felt.</em>`, with:

```tsx
            You two are <em>the story.</em> I just know where to point the camera.
```

2b. Replace the intro `<p>` content (~lines 435-438) with:

```tsx
            Hi — I&rsquo;m Raymond. I shoot weddings the way magazines shoot
            cover stories — except the story is real, it&rsquo;s yours, and
            nobody has to hold a pose through it. If you&rsquo;re bringing the
            style and the party, I am SO in.
```

(The "SO" here is the page's single permitted all-caps burst.)

2c. Replace the three bullet strings in the `.map()` array (~lines 451-453) with:

```tsx
              "Weddings, from the quiet getting-ready hours to the last song — I'll work the room all night so you two can just be in it.",
              "Engagements and couples sessions that feel like a good date, not a photoshoot.",
              "Ever said “I'm awkward in front of a camera”? Perfect — most of my favorite people have.",
```

(Keep the curly typographic quotes exactly as shown — they match the codebase's existing bullet style.)

2d. Replace the CTA wrapper (~lines 467-469),

```tsx
          <div data-fadeup="" style={{ marginTop: 34 }}>
            <CtaLink />
          </div>
```

with:

```tsx
          <div
            data-fadeup=""
            style={{
              marginTop: 34,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 16,
            }}
          >
            <CtaLink />
            <SecondaryCta />
          </div>
```

- [ ] **Step 3: Recent weddings heading**

Replace the h2 content (~line 630), currently `Whole days, told <em>honestly.</em>`, with:

```tsx
            Real weddings, shot like <em style={{ color: GOLD }}>cover stories.</em>
```

(This is design nudge 3 — the h2 is safe for inline elements; only `data-manifesto` is not.)

- [ ] **Step 4: Pricing band**

Replace the body `<p>` text (~lines 867-868), currently `Tailored to full days, intimate ceremonies, and everything in between. Tell me about your day and I&rsquo;ll share full pricing.`, with:

```tsx
          Full days, intimate ceremonies, and everything in between — every
          collection is built around how you two actually want the day to go.
          Tell me about yours and I&rsquo;ll send the full breakdown.
```

Then replace the CTA wrapper below it,

```tsx
        <div data-fadeup="" style={{ marginTop: 30 }}>
          <CtaLink />
        </div>
```

with:

```tsx
        <div
          data-fadeup=""
          style={{
            marginTop: 30,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <CtaLink />
          <SecondaryCta />
        </div>
```

- [ ] **Step 5: Final availability block**

In the Inquire section's cream card, replace the `<p>` text (~lines 1014-1015), currently `Share a few details about your day — you&rsquo;ll hear back from me personally within 48 hours.`, with:

```tsx
              Tell me everything — you&rsquo;ll hear back from me personally
              within 48 hours. (I genuinely can&rsquo;t wait to read it.)
```

and replace the lone `<CtaLink />` that follows it (~line 1017) with:

```tsx
            <CtaLink />
            <SecondaryCta />
```

(The card is cream `#F7F5F2`, so `SecondaryCta` stays in its default light-background colorway; the card's `flexDirection: "column"` + `gap: 22` already stacks them.)

- [ ] **Step 6: Verify**

Run: `npm test && npm run build` — expected: PASS + success.

With `npm run dev` running:

```bash
curl -s http://localhost:3000/ | grep -o 'href="/free-session"' | wc -l   # expect 6 (2 heroes + who + pricing + final + pre-existing chrome nav link (desktop Weddings dropdown))
curl -s http://localhost:3000/ | grep -o "Check my availability" | wc -l  # expect 6 (unchanged)
curl -s http://localhost:3000/ | grep -o "\$2,400" | wc -l                # expect 1
curl -s http://localhost:3000/ | grep -o "cover stor" | wc -l             # expect >= 5
curl -s http://localhost:3000/ | grep -o "blockquote" | wc -l             # expect 0
```

- [ ] **Step 7: Commit**

```bash
git add "src/app/(site)/page.tsx"
git commit -m "Rewrite homepage body copy in cover-story voice; place secondary CTAs"
```

---

### Task 4: Global chrome — layout metadata + footer blurbs

**Files:**
- Modify: `src/app/layout.tsx` (metadata, lines 20-35)
- Modify: `src/components/lei/LeiFooter.tsx` (blurb ternary, lines 32-35)

**Interfaces:**
- Consumes: nothing from earlier tasks (strings are duplicated here deliberately — `layout.tsx`/`LeiFooter.tsx` render on every page and stay dependency-light; the values MUST match `CITY` and the positioning voice).
- Produces: nothing new.

- [ ] **Step 1: Rewrite the root metadata**

In `src/app/layout.tsx`, replace the `title.default` and `description` values (keep `metadataBase`, `template`, `applicationName`, `openGraph` unchanged):

```ts
  title: {
    default:
      "Lei Photography Collective | San Francisco Bay Area Editorial Wedding Photography",
    template: "%s | Lei Photography Collective",
  },
  description:
    "Your wedding, shot like the cover story it is. Raymond Lei photographs editorial, fashion-influenced weddings for fun, stylish couples in the San Francisco Bay Area & beyond.",
```

- [ ] **Step 2: Rewrite the footer blurbs**

In `src/components/lei/LeiFooter.tsx`, replace the `blurb` ternary (lines 32-35) with:

```ts
  const blurb =
    brand === "raymond"
      ? "Raymond Lei photographs editorial, fashion-influenced weddings, engagements, and portraits for fun, stylish couples in the San Francisco Bay Area."
      : "Editorial wedding photography for fun, stylish couples in the San Francisco Bay Area & beyond — weddings, couples, engagements, and events.";
```

- [ ] **Step 3: Verify**

Run: `npm run build` — expected: success.

With `npm run dev` running:

```bash
curl -s http://localhost:3000/work | grep -o "Editorial wedding photography for fun, stylish couples" | wc -l   # expect 1 (collective footer)
curl -s http://localhost:3000/about | grep -o "fashion-influenced weddings" | wc -l                             # expect 1 (raymond footer)
curl -s http://localhost:3000/work | grep -o "San Francisco Bay Area" | wc -l                                   # expect >= 2 (title + footer)
```

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx src/components/lei/LeiFooter.tsx
git commit -m "Retrofit site metadata and footer blurbs to cover-story positioning"
```

---

### Task 5: End-to-end verification

**Files:** none created/modified unless a check fails (fix, then re-run).

- [ ] **Step 1: Unit tests + production build**

Run: `npm test && npm run build`
Expected: all tests PASS; build succeeds with all 32 static pages.

- [ ] **Step 2: Serve production build and run the funnel assertions**

Run `npm run start` in the background (after `npm run build`), then:

```bash
curl -s http://localhost:3000/ | grep -o "Your wedding, shot like the" | wc -l   # expect >= 3 (meta + desktop sub + mobile h1 prefix)
curl -s http://localhost:3000/ | grep -o "San Francisco Bay Area" | wc -l        # expect >= 3
curl -s http://localhost:3000/ | grep -o 'href="/free-session"' | wc -l          # expect 6
curl -s http://localhost:3000/ | grep -o "Check my availability" | wc -l         # expect 6
curl -s http://localhost:3000/ | grep -o "\$2,400" | wc -l                       # expect 1
curl -s http://localhost:3000/ | grep -o "blockquote" | wc -l                    # expect 0
curl -s http://localhost:3000/free-session -o /dev/null -w "%{http_code}"        # expect 200
```

Also sweep every route for 200s (no-deletions guarantee):

```bash
for r in / /work /weddings /about /experience /inquire /free-session /portfolio /portfolio/weddings /portfolio/couples /portfolio/weddings/sargon-odelya; do
  echo "$r $(curl -s -o /dev/null -w '%{http_code}' http://localhost:3000$r)"
done
```

- [ ] **Step 3: Browser verification (use the `verify` skill)**

- **Desktop (1440×900):** preloader plays with the `San Francisco Bay Area · Editorial Weddings` tagline; YOUR / COVER / STORY. lockup letters animate in; scrolling blooms the image out of the O in COVER (line 2); the hero sub-line and gold CTA + secondary link fade in together; secondary links look clearly subordinate to gold pills at all five placements; secondary link turns gold on hover.
- **Mobile (390×844):** static hero paints instantly with new kicker + "Your wedding, shot like the cover story it is." + gold CTA + secondary link; no preloader; tapping the secondary link lands on `/free-session`.
- **Reduced motion:** all content visible without animation.

- [ ] **Step 4: Final commit (only if fixes were needed)**

```bash
git status
```

If clean: done. If fixes were made during verification:

```bash
git add -A
git commit -m "Verification fixes for positioning retrofit"
```

---

## Deferred to later sub-projects (do NOT build now)

Wedding story pages (and the 10-15 photo-cap decision), `/pricing`, About rewrite, Planning Guide funnel + email capture, FAQ, Contact rewrite, nav condensing. Phase 1 Tasks 10-11 (mobile Availability pill, Phase 1 end-to-end verification) remain in `docs/superpowers/plans/2026-07-14-homepage-conversion-rebuild.md`.
