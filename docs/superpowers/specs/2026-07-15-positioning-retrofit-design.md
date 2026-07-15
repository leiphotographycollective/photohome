# Positioning Retrofit — Cover-Story Voice, Homepage + Global Chrome

**Date:** 2026-07-15
**Status:** Approved (brainstormed with owner; all sections approved)
**Parent strategy:** "Lei Photography — Wedding Website Client Journey" (owner-supplied, July 2026) — positioning, voice guide, and two-track funnel modelled on the Albert Palmer framework.
**Predecessor:** `2026-07-14-wedding-conversion-redesign-design.md` (Phase 1, shipped through Task 9 of its plan).

## Context

Phase 1 rebuilt the homepage as a wedding-inquiry funnel in a documentary/unposed voice ("For couples who'd rather live it than pose for it"). The owner has since adopted a site-wide strategy with a different brand position: **editorial, fashion-influenced wedding photography for fun, stylish couples — main-character energy**, plus a two-track visitor model (Track A ready-to-book; Track B early planners who need a lower-commitment step). The strategy is too large for one spec; it decomposes into sub-projects (A: this retrofit; B: wedding stories; C: pricing page; D: about rewrite; E: planning-guide funnel; F: FAQ; G: contact rewrite). **This spec is sub-project A only** — it makes the new voice and SEO position real on the surfaces every visitor sees, so B–G inherit it instead of contradicting it.

## Decisions (owner-confirmed)

1. **Positioning line (cover-story angle):** "Your wedding, shot like the cover story it is." with support line "Bay Area wedding photographer for couples who bring the style and the party."
2. **SEO place name:** `San Francisco Bay Area` — in the hero kicker, page titles, meta descriptions, and footer.
3. **Scope:** homepage + global chrome (layout metadata, footer, preloader tagline). About, Pricing, Portfolio, /weddings, /work, /inquire copy are later sub-projects. Nav labels/structure unchanged.
4. **Track B secondary CTA:** points at the existing `/free-session` page ("Just started planning? Claim a free engagement session") until the Planning Guide funnel (sub-project E) ships, then the href swaps. Never a dead link.
5. **Voice vs design:** copy carries the new energy inside the existing quiet-luxury visual system, with three small design nudges (below). No layout/grid/motion changes.

## Design

### 1. Brand constants — `src/content/homepage.ts`

New exports (single source of truth; sub-projects B–G import these):

```ts
export const CITY = "San Francisco Bay Area";
export const POSITIONING = "Your wedding, shot like the cover story it is.";
export const POSITIONING_SUB =
  "Bay Area wedding photographer for couples who bring the style and the party.";
export const SECONDARY_CTA_LABEL =
  "Just started planning? Claim a free engagement session";
export const SECONDARY_CTA_HREF = "/free-session";
```

### 2. `SecondaryCta` component — `src/components/lei/Cta.tsx`

Beside the existing `CtaLink`: a quiet, letter-spaced text link (cream on dark / muted on light, gold underline on hover) rendered directly beneath gold pills. Props: `{ dark?: boolean; style?: CSSProperties }`. Gold stays reserved for the primary conversion CTA — the secondary link must read as clearly subordinate (Track A / Track B hierarchy visible at a glance).

Placement (beneath the gold pill): desktop hero, mobile hero, Who I photograph, Pricing band, final availability block. Not in the doors section (its centered CTA stands alone).

### 3. Homepage copy rewrite — `src/app/(site)/page.tsx`

| Surface | New copy |
|---|---|
| Desktop hero lockup | **YOUR / COVER / STORY.** (three `data-hero-line` divs; the motion engine anchors the WebGL bloom to the letter O in the *second* line — COVER has exactly one O, so the cinematic keeps working) |
| Hero kicker (both heroes) | `San Francisco Bay Area · Editorial Wedding Photography` |
| Desktop hero sub-line | "Your wedding, shot like the cover story it is — for couples who bring the style and the party." |
| Mobile hero h1 | "Your wedding, shot like the cover story it is." |
| Manifesto | "You two, at your absolute best — the style, the party, and every real moment in between." (plain text — the manifesto word-reveal animation flattens child elements at runtime, so no inline `em` here) |
| Who I photograph h2 | "You two are the story. I just know where to point the camera." |
| Who I photograph intro | "Hi — I'm Raymond. I shoot weddings the way magazines shoot cover stories — except the story is real, it's yours, and nobody has to hold a pose through it. If you're bringing the style and the party, I am SO in." |
| Who I photograph bullets | Couple-first rewrites, e.g. "I'll work the room all night so you two can just be in it"; "Engagements and couples sessions that feel like a good date, not a photoshoot"; "Ever said 'I'm awkward in front of a camera'? Perfect — most of my favorite people have." |
| Recent weddings h2 | "Real weddings, shot like cover stories." |
| Pricing band | Heading `Collections from $2,400` unchanged (Phase 1 constraint). Body reframed as a confident starting point (generous, no apology) + `SecondaryCta`. |
| Final block | "Now booking 2026 & 2027 weddings" unchanged; body adds warmth/gratitude: "Tell me everything — you'll hear back from me personally within 48 hours. (I genuinely can't wait to read it.)" + `SecondaryCta`. |
| Page metadata | title: `Editorial Wedding Photography in the San Francisco Bay Area`; description built from `POSITIONING` + city. |

Exact final wording may be polished during implementation **in the same register**; the positioning line, city string, price copy, and CTA label are exact and non-negotiable.

**Voice rules for any polish** (from the owner's strategy doc): write like you talk; hype the couple, not the photographer — every "I" sets up a "you" payoff; editorial confidence, never apology; at most one all-caps burst on the page; never stiff formality or luxury-brand aloofness.

### 4. Global chrome + site metadata

- `src/app/layout.tsx`: default title → `Lei Photography Collective | San Francisco Bay Area Editorial Wedding Photography`; description rewritten around the positioning line. Title template unchanged.
- `src/components/lei/LeiFooter.tsx`: both blurb variants rewritten — editorial/fashion-influenced, fun stylish couples, city named.
- Homepage preloader sub-tagline: `Presence · Story · Feeling` → `San Francisco Bay Area · Editorial Weddings`.
- `Chrome.tsx` nav: untouched (nav condensing is deferred).

### 5. Design nudges (complete list — nothing else moves)

1. Hero lockup word change (the visual event; no layout change).
2. `SecondaryCta` treatment as described in §2.
3. Gold italic `em` on "cover stories" in the Recent weddings h2 ("Real weddings, shot like *cover stories*.") — h2s are not text-flattened by the motion engine, unlike the manifesto.

## Constraints carried forward from Phase 1

- Primary CTA label exactly `Check my availability`, href exactly `/inquire#form`, solid gold pill. Gold reserved for conversion CTAs.
- Price copy exactly `Collections from $2,400`.
- No fabricated testimonials; empty slots render nothing.
- Plain `<img>` + inline styles + tokens from `src/components/lei/tokens.ts` (repo convention; this is NOT stock Next.js — check `node_modules/next/dist/docs/` before writing code).
- No deletions: all routes stay live; `/free-session` gains inbound links but its content is not modified.
- Mobile (≤860px) behavior from Phase 1 (static hero, no preloader/WebGL) unchanged.

## Testing & verification

- **Unit (vitest, `tests/homepage-content.test.ts`):** new constants match this spec exactly; `SECONDARY_CTA_HREF === "/free-session"`; existing CTA/doors/testimonial assertions still pass.
- **Build:** `npm run build` clean.
- **Rendered HTML (curl against dev/prod server):** homepage contains `POSITIONING` text; `San Francisco Bay Area` appears ≥ 3 times; `href="/free-session"` appears ≥ 4 times; `Check my availability` count unchanged (≥ 6); `$2,400` exactly once; `blockquote` count 0.
- **Browser:** 1440×900 — preloader plays with new tagline, YOUR/COVER/STORY lockup animates, image still blooms from the O in STORY, secondary links visible and subordinate; 390×844 — static mobile hero shows new h1/kicker/CTA/secondary link; reduced-motion still shows all content.

## Out of scope (later sub-projects)

Wedding story pages and the 10–15 photo-cap question (sub-project B resolves that contradiction); `/pricing`, About rewrite, Planning Guide funnel + email capture, FAQ, Contact rewrite; nav condensing; Phase 1 Tasks 10–11 (mobile CTA pill, end-to-end verification) — still to be executed from the Phase 1 plan, independent of this spec.
