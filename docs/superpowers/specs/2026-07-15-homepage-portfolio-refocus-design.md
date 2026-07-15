# Homepage Portfolio Refocus & Site-Wide Voice Pass — Design

**Date:** 2026-07-15
**Status:** Approved pending user review
**Prior art:** `2026-07-15-homepage-merge-fit-audit-investment-design.md` (merged earlier today)

## Context

The homepage currently proves the work through two routing/teaser sections
(the Collection category doors and Recent Weddings). Raymond wants the page
to *be* the proof instead: a real wedding portfolio inline as the page's
main focus, with category browsing moved fully to the portfolio page and a
single link pointing there. Alongside the restructure, all site copy is
held to an I-as-setup → you-as-payoff voice rule.

Two workstreams:

1. **Homepage restructure** — inline wedding gallery as centerpiece; new
   full-bleed marina image band; Collection doors and Recent Weddings
   sections removed.
2. **Site-wide voice pass** — every page audited against the I→you rule.

## Workstream 1 — Homepage restructure

### New section order

> hero → manifesto → Who I photograph → **marina band** →
> You're here because… → **The Wedding Portfolio** → About → Investment →
> Process → Inquire

Removed: the Collection doors section and the Recent Weddings section
(JSX only — the `DOORS` and `RECENT_WEDDINGS` exports stay in
`src/content/homepage.ts`; other pages and future work may use them, and
their tests keep passing).

### Marina image band

- Source: the user-supplied Miranda & Danny boardwalk wide shot
  (`D:\Export\Project Folders\Weddings\Miranda & Danny\Lei Photography
  Collective - Miranda & Danny-4.jpg`), resized to ~1920px web JPEG in
  `public/images/` with the site's SEO filename convention, added to the
  `PHOTOS` map with descriptive alt text.
- Placement: between "Who I photograph" and "You're here because…".
- Treatment: full-bleed ~90vh band exactly like the experience page's band
  (`data-band` image at `scale(1.16)`, bottom gradient
  `linear-gradient(to top, rgba(14,13,11,.5), rgba(14,13,11,0) 55%)`),
  `loading="lazy"`.

### The Wedding Portfolio section

The centerpiece. Sits where the Collection doors were (after "That's when
I come in." + experience link), on the dark background (`#0E0D0B`) to keep
the cream/dark rhythm (cream qualifiers → dark portfolio → cream About).

- **Header:** gold kicker "The Portfolio", serif headline leaning "you"
  (working copy: "Your day, the way it actually felt." — finalized in the
  voice pass), no body paragraph — the photos speak.
- **Layout (cinematic stack):** alternating rows —
  - `full`: one landscape image, full section width (inside the 6vw
    gutter), ~16:10 crop;
  - `pair`: two 4:5 portraits side by side (grid `1fr 1fr`, ~2.4vw gap).
  Rows reveal with existing hooks only (`data-reveal` on fulls,
  `data-fadeup` on pairs). On mobile the pair grid collapses to one column
  via the existing `lx-grid-2col` responsive pattern (or an equivalent
  existing rule — no new motion code, minimal new CSS).
- **Footer of the section:** the quiet underlined soft link
  **"View the full portfolio →"** to `/work`, using the existing `SoftLink`
  component (`dark` variant), centered. No gold pill anywhere in this
  section — CTA hierarchy stays: gold = inquire only.
- **Target density:** 10–14 photos across ~7–9 rows.

### Gallery data model

New export in `src/content/homepage.ts`:

```ts
export interface PortfolioRow {
  layout: "full" | "pair";
  photos: Photo[]; // 1 photo for "full", 2 for "pair"
}
export const WEDDING_PORTFOLIO: PortfolioRow[] = [ ... ];
```

The section renders whatever the array holds; swapping a photo is a
one-line edit. **Seed content:** the strongest existing assets — curated
Sargon & Odelya CDN selects plus the five local images added 2026-07-15
(marina kiss, reception entrance, shoulder dance, rings embrace, first
dance clouds). The user is supplying additional Miranda & Danny / Sargon &
Odelya selects; they replace or extend the seed as they arrive (same
resize-and-add pipeline as the existing local images: longest side
~1500–1600px for fulls, 1200px for portraits, JPEG quality 82,
SEO filenames, descriptive alts).

### Performance

- First `full` row loads eagerly; every other gallery image
  `loading="lazy"`.
- CDN photos request `1500w` for fulls, `750w` for pair portraits; local
  files are pre-sized and served as-is.

## Workstream 2 — Site-wide voice pass

### The rule (standing guideline for all future copy)

What converts is the pairing: **"I" as setup, "you" as payoff** — e.g.
"I'll work the room all night so you two can just be in it."

- Hero and headlines lean **"you"** — that's where visitors decide if this
  is for them.
- Body copy pairs I→you: wherever "I" appears, the sentence (or its
  neighbor) pays off with "you".
- The About page may run ~60/40 "I" — it's the page where they want to
  hear about Raymond.
- Testimonials carry third-person praise so the site never praises itself.
  `TESTIMONIALS` is still empty and renders nothing until real quotes
  exist; until then the rule means simply: no self-praise in body copy.

### Scope and method

- Pages: home (including the new gallery headline), experience, weddings,
  work, about, investment, free-session, inquire.
- Line-by-line audit; rewrite only sentences that fail the rule. This is a
  tuning pass, not a rewrite — sentences that already pass stay verbatim.
- **Fixed constants (do not change):** `POSITIONING`, `POSITIONING_SUB`,
  `CTA_LABEL`, `SECONDARY_CTA_LABEL`/`SECONDARY_CTA_HREF`, the qualifier
  lines (`QUALIFIERS`), and tier names/prices/blurbs in
  `src/content/pricing.ts`. These are test-pinned approved copy from prior
  specs; changing any of them is a separate decision for the user.
  (The pricing blurbs already follow the pairing rule.)
- Metadata descriptions are in scope where a rewrite clearly improves the
  rule without hurting SEO anchors (CITY, "wedding photography" phrases
  stay).

## Error handling

Static content only — no new client state, no data fetching, no new motion
types. The gallery renders from a typed array; an empty array renders the
header and link only (acceptable degenerate state, prevented by test).

## Testing & verification

- New assertions added to the existing `tests/homepage-content.test.ts`:
  `WEDDING_PORTFOLIO` has ≥1 row; every `full` row has exactly 1 photo and
  every `pair` row exactly 2; every photo has non-empty `path` and `a`.
- Existing suite stays green — the removed sections' data exports remain,
  so `DOORS`/`RECENT_WEDDINGS` tests still pass.
- Manual check at 375/768/1440/1920: gallery fulls and pairs collapse
  cleanly, marina band fills without clipping, no horizontal scroll.
- CTA hierarchy after removals: gold pills = inquire only; soft links
  each appear once (experience link in qualifiers, portfolio link under
  gallery, collections link in Investment section, free-session links).
- Voice pass verified page by page: every headline read for "you"-lean;
  every body paragraph containing "I" checked for a "you" payoff in the
  same or adjacent sentence.
- Per `AGENTS.md`: read the relevant Next.js guides in
  `node_modules/next/dist/docs/` before writing page code.

## Out of scope

- No changes to `/work`, `/portfolio/[cat]`, or gallery project pages
  beyond the voice pass (the portfolio destination already exists).
- No changes to the pinned brand constants or pricing copy.
- No testimonial collection (waits for real quotes).
- The unresolved `weddings/page.tsx` alt-text revert from earlier today is
  a separate open question, not part of this work.
