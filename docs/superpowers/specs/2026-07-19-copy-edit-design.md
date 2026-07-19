# Copy Edit: Contradiction Removal + Voice Fixes

**Date:** 2026-07-19
**Source:** Seven Sweeps copy-edit report of the live site (leiphotography.co, pulled 19 Jul 2026), scoped and approved by Raymond in brainstorming.
**Approach:** In-place string edits only. Each string is edited where it currently lives (content files or page components). No copy centralization beyond what already exists. Tests that pin content are updated alongside, plus one new guard test.

## Goals

1. Remove the four contradictions the report identified (image-count math, package-name collision, style-flexible positioning, graduation on the wedding funnel).
2. Apply the approved per-page line edits.
3. Add two small structural pieces: proof + price anchor on /weddings, availability note on /inquire.
4. Sweep em dashes out of all rendered site copy (standing rule: no em dashes in site copy; code comments are exempt). New copy in this spec already complies, using the site's existing colon/semicolon convention.

## Out of scope

- The 48-hours motif on /investment: rejected because The Intimate has no 48-hour sneak peek (per `tests/pricing.test.ts` and the investment FAQ), so a blanket promise would create a new contradiction.
- "For couples like you" and the hero-subhead edit from the report: those strings do not exist in this branch (the deployed site differs). Nothing to change.
- The inquire page meta description keeps "graduations" deliberately: that page serves every session type.
- Alt-text em dashes in `src/content/portfolio.ts` and code comments: not rendered copy for this purpose; possible follow-up.
- The homepage section title "The Collection" (`HorizontalCollection.tsx`): stays. Once no package shares the name it is a gallery heading with no collision.

## 1. Big Catch fixes

### 1.1 Delete the per-hour image line (approved option: delete)

`src/content/pricing.ts`, `INCLUDED_EVERYWHERE`: remove the first entry
`"100–150 fully edited images per hour of coverage"`. The array drops from 4 items to 3. The per-card 350+/500+/700+ facts become the only image-count claims on the page.

### 1.2 Rename "The Collection" to "The Full Story" (approved name)

- `src/content/pricing.ts`: `TIERS[0].name` becomes `"The Full Story"`.
- `src/content/pricing.ts`, `ADD_ONS` second-photographer note becomes:
  `"For The Intimate and The Signature, already included in The Full Story"`.
- `src/app/(site)/investment/page.tsx` meta description: the parenthetical becomes `(The Full Story, The Signature and The Intimate)`.
- `src/app/(site)/investment/page.tsx` FAQ answer (currently line 39): both mentions of "The Collection" become "The Full Story".
- Nearby code comments that reference the old tier name may be updated for accuracy; comments keep whatever punctuation they have.

### 1.3 Replace the "no singular style" paragraph (both locations)

Homepage about-block, `src/app/(site)/page.tsx` (currently lines 744-752), full paragraph replacement:

> The editorial eye is constant: the feeling is yours. I shape the light, the pacing, and the direction around who you two actually are, so the photos look like you at your absolute best, never like a formula. The whole experience is tailored personally to you.

About page, `src/app/(site)/about/page.tsx` (currently lines 97-101), full paragraph replacement (keeps its extra middle sentence):

> The editorial eye is constant: the feeling is yours. Shoots with me are calm, easy, and honestly pretty fun; people at ease make the best photos. I shape the light, the pacing, and the direction around who you two actually are, so the photos look like you at your absolute best, never like a formula.

### 1.4 Elopement, not graduation

`src/app/(site)/experience/page.tsx` (currently line 216):

> Wedding, elopement, or something only you two would think up&hellip;

## 2. Line edits

| File (current line) | Before | After |
|---|---|---|
| `src/app/(site)/page.tsx:255` | "most of my favorite people have" | "most of my favorite couples have" |
| `src/app/(site)/page.tsx:965` | "(I genuinely can&rsquo;t wait to read it.)" | "(I can&rsquo;t wait to read it.)" |
| `src/app/(site)/experience/page.tsx:170` | "That&rsquo;s when I come through for you." | "That&rsquo;s the exact couple I do my best work for." |
| `src/app/(site)/investment/page.tsx:137-140` | Paragraph opens "Your day deserves coverage built around how you two actually want it to go." (duplicates the hero line) | Delete that first sentence only. Paragraph now opens "Every collection below can be tailored, and every one can be split into monthly payments." |
| `src/app/(site)/investment/page.tsx:274` | SoftLink label "Click here to inquire" | "Check my date" (renders on all three tier cards; matches the CTA_LABEL change already in the working tree) |
| `src/app/(site)/about/page.tsx:42` and `src/app/(site)/page.tsx:710` | Eyebrow/tagline "Showcasing the real you" | "You two are the story." (both locations, identical) |
| `src/app/(site)/inquire/page.tsx:214` | "A few details is all it takes to begin." | "All it takes is a few details." (rest of sentence unchanged) |

### 2.1 TestimonialFeature kicker (`src/components/lei/TestimonialFeature.tsx`)

- Kicker (currently line 69) becomes dynamic: renders `From {t.names}` (today: "From Sargon &amp; Odelya"). No longer breaks if gallery order changes.
- Signature line under the quote (currently line 104) drops the leading em dash and the now-redundant names: renders `t.context` only (today: "Wedding · Bay Area, CA"); renders nothing when `context` is absent.
- Remove the stale comment "Assumes the featured couple is the gallery couple above" (line 67).

## 3. Structural additions

### 3.1 /weddings proof + price anchor

`src/app/(site)/weddings/page.tsx`: insert a short centered section between the full-bleed first-dance feature (ends ~line 187) and the parallax gallery. Content:

- Pull quote: `TESTIMONIALS[0].pull` imported from `@/content/homepage` (never retyped, per the content-file convention), rendered in the italic serif treatment.
- Attribution: `TESTIMONIALS[0].names` ("Sargon &amp; Odelya").
- Quiet link below: label "Collections from $2,400", href `/investment`, rendered with `SoftLink` (the quiet underlined link the investment page already uses).

Styling reuses the existing `kicker`/`SERIF` tokens and the page's dark background. No new components.

### 3.2 /weddings kicker

Hero kicker (currently line 95): "Chapter 01 — Weddings" becomes "Weddings". (There is no Chapter 02 anywhere; /work's "five chapters" line remains coherent standalone.)

### 3.3 /inquire availability note

`src/app/(site)/inquire/page.tsx`: under the "Share your story below" intro paragraph (after current line 216), add a small muted line:

> Asking about a date? I&rsquo;ll confirm availability in my reply.

The form itself is a HoneyBook embed; date/venue fields live in HoneyBook and are not this repo's concern.

## 4. Em-dash sweep (rendered copy only)

Replace em dashes in user-visible rendered strings; code comments are untouched. Site convention: colon, semicolon, comma, or the "·" separator, whichever reads best in place.

| File (current line) | After |
|---|---|
| `src/app/(site)/weddings/page.tsx:123` | "You two stay in the day; I&rsquo;ll make sure you get it back." |
| `src/app/(site)/experience/page.tsx:98` | Dash becomes a comma: "…feel easy, and the photos feel…" |
| `src/app/(site)/investment/page.tsx:571` | "Every collection can be tailored: <em>tell me about your day.</em>" |
| `src/app/(site)/investment/page.tsx:432` | Signature drops the leading dash: names rendered plain (match the TestimonialFeature treatment) |
| `src/app/(site)/inquire/page.tsx:88` | "Tell me what you&rsquo;re planning: the venue, the vibe, the parts…" |
| `src/app/(site)/free-session/page.tsx:152, 341, 356` | Same treatment, comma or colon as reads best |
| `src/app/(site)/work/page.tsx:61, 104` | Same treatment |
| `src/app/(site)/portfolio/[cat]/page.tsx:209` | "{p.place} · {p.year}" |

Section 1-3 replacement copy above already contains no em dashes.

## 5. Tests and verification

- `tests/pricing.test.ts`:
  - Tier-name array becomes `["The Full Story", "The Signature", "The Intimate"]`.
  - `INCLUDED_EVERYWHERE` length expectation 4 becomes 3; the monthly-payments line assertion moves from index 3 to index 2.
  - Existing per-tier fact regex (`per hour of coverage` exclusion) still passes untouched.
- New test file (e.g. `tests/no-em-dash.test.ts`): imports every exported value from `@/content/pricing`, `@/content/homepage`, `@/content/experience`, `@/content/second-weddings`, `@/content/site`, walks all string values recursively, and asserts none contains an em dash. Enforces the standing rule going forward.
- `tests/homepage-content.test.ts`: no further change beyond the CTA update already in the working tree.
- Verification: `npx vitest run` green, production build passes, preview screenshots of the five touched pages (home, weddings, investment, about, inquire) plus experience.

## Decisions log

- Image-count fix: delete the per-hour line (user choice).
- Package rename: The Full Story (user choice).
- In scope: weddings proof + anchor, Chapter 01 cut, inquire availability note (user choice). 48-hours motif rejected (user choice, on the contradiction grounds above).
- Approach: in-place edits only (user choice).
- Tagline replacement "You two are the story." and all Section 1-4 copy approved as written.
