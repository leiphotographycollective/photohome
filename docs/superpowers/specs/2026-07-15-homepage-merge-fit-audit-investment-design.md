# Homepage Experience Merge, Site-Wide Fit Audit & Investment Page — Design

**Date:** 2026-07-15
**Status:** Approved pending user review
**Prior art:** `2026-07-14-wedding-conversion-redesign-design.md`, `2026-07-15-positioning-retrofit-design.md`

## Overview

Three workstreams, all in service of conversion:

1. **Homepage merge** — transplant the experience page's two highest-converting
   sections ("You're here because…" qualifiers and The Process) onto the
   homepage, plus one quiet link to `/experience`.
2. **Site-wide fit audit** — fix the clipped "THE EXPERIENCE" hero title and
   sweep every page at four viewport widths for the same class of overflow bug.
3. **Investment page** — a new `/investment` page with three priced collections
   and add-ons, linked from nav, footer, and the homepage Investment section.

The experience page stays live and in the nav; nothing is removed from it.
Approach chosen over full absorption (would double homepage scroll length and
bury the proof sections) and over a bare CTA link (leaves the best persuasion
copy one click away).

## Workstream 1 — Homepage merge

### New section order

> hero → manifesto → Who I photograph → **You're here because…** →
> Collection doors → Recent weddings → About → Pricing/Investment →
> **The Process** → Inquire

### "You're here because…" section

- Placed after "Who I photograph": the visitor self-identifies immediately
  after Raymond's intro, then sees the proof (doors, recent weddings).
- Layout copied from the experience page: bordered qualifier rows with gold
  bullets, serif qualifier text, italic gold "That's when I come in." payoff,
  4:5 portrait image alongside (`data-reveal`).
- **Colors inverted to cream** (`#F7F5F2` background, ink text, hairlines at
  `ink`-alpha instead of `cream(0.14)`): the section sits directly above the
  dark Collection doors section, and a dark-on-dark pair would break the
  site's alternating light/dark rhythm.
- All four qualifier lines and the payoff line come over **verbatim** — they
  are already in the wedding voice.
- Directly under the payoff: a quiet underlined link **"Read about the full
  experience →"** to `/experience`, styled like the existing `lx-cta2`
  soft link (uppercase, gold underline, ink text on cream). This is the only
  experience link added to the homepage, and it never sits beside a gold
  inquire pill — CTA hierarchy stays: gold pill = inquire, soft links stay
  subordinate and single-purpose.
- Implementation note: this link is a new tiny component or inline `Link`
  (e.g. `SoftLink` with `href`/`label` props) — **do not repoint or overload
  `SecondaryCta`**, which is hard-wired to the free-session funnel.

### The Process section

- Placed between the Investment section and the Inquire section: price →
  exactly what happens next → ask. Dark background (`#0E0D0B`), exactly as on
  the experience page, reusing the shared `ProcessSteps` component unchanged.
- Steps come over word-for-word **except** step 03 ("Customize"): "No two
  milestones are alike" becomes **"No two weddings are alike"** on the
  homepage. The experience page keeps its existing wording.

### Content extraction (single source of truth)

- `QUALIFIERS` and `PROCESS` currently live inline in
  `src/app/(site)/experience/page.tsx`. Extract both to a new
  `src/content/experience.ts`; the experience page imports them unchanged.
- The homepage derives its process list from the shared `PROCESS`, overriding
  only step 03's body (e.g. map with a replacement), so future copy edits
  happen in one place.

### Motion

- New homepage sections reuse existing data-attribute hooks only
  (`data-fadeup`, `data-step`, `data-reveal`). No new animation types. If any
  hook turns out to be page-scoped in `src/lib/lei/motion.ts`, extend the
  scan — do not fork the animation code.

## Workstream 2 — Site-wide fit audit

### Known fix

- `src/app/(site)/experience/page.tsx` hero title: `clamp(58px,12vw,180px)`
  makes the 10-character line "EXPERIENCE" wider than the viewport on desktop;
  the section's `overflow: hidden` clips it instead of wrapping. Reduce the
  type scale so the longest line always fits with the 38px side padding —
  starting point `clamp(40px, 8vw, 120px)`, tuned visually.

### Sweep

- Audit every page — home, experience, weddings, work, about, free-session,
  inquire, portfolio index, portfolio category, portfolio detail — at
  **~375px, ~768px, ~1440px, ~1920px** widths.
- Look for: clipped or overflowing display type, horizontal scroll on the
  page body, grids that fail to collapse, images or floats escaping their
  containers, text overlapping images.
- Every finding is fixed in the same pass. Anything genuinely ambiguous
  (e.g. an intentional bleed vs. a bug) is flagged to the user, not guessed.

## Workstream 3 — Investment page

### Route & naming

- New page at **`/investment`**, file `src/app/(site)/investment/page.tsx`.
- Label everywhere: **"Investment"**.

### Entry points

- `Chrome.tsx` Weddings dropdown: add "Investment" item (order: The
  Portfolio, Experience, Investment, Free Session).
- `MobileMenu.tsx` `WEDDINGS_SUB`: same addition, same order.
- `LeiFooter.tsx` `NAV` map: add `investment` key; include it in the footer
  `links` of the homepage and the investment page.
- Homepage Investment section ("Collections from $2,400"): add a quiet
  underlined **"See the collections →"** soft link to `/investment` (same
  `SoftLink` treatment as the experience link; keeps gold reserved for
  inquire).

### Content module

- New `src/content/pricing.ts` exporting the tier and add-on data below, so
  copy/price edits never touch layout code.

### Page flow (alternating cream/dark, LeiPage + Chrome + LeiFooter)

1. **Compact hero (cream)** — kicker "Investment", display headline sized to
   always fit (apply the Workstream 2 lesson), one line anchoring the range:
   collections from $2,400, tailored to how the day actually runs.
2. **The three collections (heart of the page)** — editorial rows, not
   SaaS-style cards. Order (flagship-first price anchoring):
   **The Collection → The Signature → The Intimate**. Each row: name, price,
   the description paragraph below verbatim, then tier-specific facts.
3. **"Every collection includes" strip** — the items identical across all
   tiers, stated once: 100–150 fully edited images per hour of coverage;
   online gallery to view, download and order prints (Pic-Time, 12-month
   access); full-resolution downloads + printing rights.
4. **Add-ons** — Engagement session **+$250** (available on all three
   collections); Second photographer **+$600** (The Intimate and The
   Signature only; The Collection already includes two photographers).
5. **Closing CTA (dark)** — "Every collection can be tailored — tell me about
   your day," gold `CtaLink` with `SecondaryCta` (free session) beneath, same
   pattern as the homepage.

### Tier data (verbatim from the user)

**The Collection — $3,800**
Ten hours, two photographers. My eye on the big moments, a second lens
catching everything else — your partner's face when you walk in, the details
you'll forget by Monday. For the couples who want the full story told.

- Up to 10 hours of coverage
- Including: getting ready (both sides), portraits, wedding party, family
  formals, ceremony, cocktail hour, full reception
- 2 photographers (included)
- 700+ fully edited images
- Sneak peek gallery within 48 hours

**The Signature — $2,900**
Eight hours and a full day of coverage. Enough time to breathe, enough time
to document everything from getting ready to the first dances. Clean edits,
real moments, no posing you into something you're not.

- Up to 8 hours of coverage
- Including: getting ready, portraits, wedding party, family formals,
  ceremony, cocktail hour, reception
- 1 photographer
- 500+ fully edited images
- Sneak peek gallery within 48 hours

**The Intimate — $2,400**
Six hours. No big production — just quiet, focused coverage for the couples
who want it kept close. Ceremony, portraits, the in-between moments that
actually matter. Full gallery delivered, every image edited.

- Up to 6 hours of coverage
- Including: getting ready, portraits, wedding party, family formals,
  ceremony, cocktail hour
- 1 photographer
- 350+ fully edited images

(The gallery/downloads/edit-rate lines from the raw notes are shared across
all tiers and render in the "Every collection includes" strip instead of
being repeated per tier. Sneak peek is listed only on The Collection and
The Signature, per the raw notes.)

### Metadata

- Title: "Wedding Photography Investment — Collections from $2,400" (exact
  wording tuned at implementation, cover-story voice, mentions Bay Area).
- Description references the three collections and interpolates `POSITIONING`
  / `CITY` from `src/content/homepage.ts` like the other pages.

## Error handling

All three workstreams are static content — no forms, no data fetching, no new
client state. The only dynamic behavior is the existing motion engine, which
already degrades gracefully (noscript rules, mobile guard). New sections must
not introduce new failure modes: reuse existing data-attributes and existing
components only.

## Testing & verification

- Existing `vitest` suite stays green (`npx vitest run`).
- The Workstream 2 audit doubles as manual verification for Workstreams 1
  and 3: every page — including the changed homepage and the new investment
  page — checked at 375/768/1440/1920 widths before the work is called done.
- Verify the CTA hierarchy on the changed pages: exactly one gold action
  (inquire), soft links each appear once and go where they say.
- Per `AGENTS.md`: read the relevant guides in `node_modules/next/dist/docs/`
  before writing any code — this Next.js version has breaking changes.

## Out of scope

- No changes to the experience page other than the hero type-scale fix (and
  the mechanical import of extracted content).
- No changes to the free-session funnel, testimonials, or portfolio pages
  beyond audit fixes.
- No "most popular" badges or urgency claims that aren't user-provided facts.
