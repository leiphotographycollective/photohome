# Second Wedding Photography Landing Page — Design Spec

**Date:** 2026-07-17
**Route:** `/second-weddings`
**Status:** Approved, ready for implementation plan

## Purpose

A side-door conversion landing page for Raymond's short-coverage photography
packages, positioned for second weddings, elopements, and intimate
celebrations across the SF Bay Area. Reached by search and referral, not the
main nav. Copy is adapted from `Second_Wedding_Landing_Page_Copy.docx`.

## Constraints and standing preferences

- **No em dashes** anywhere in the copy. The source docx uses them heavily;
  every line is rewritten to remove them (commas, periods, or restructured
  phrasing) while preserving the warm, plain, first-person voice.
- **First-person voice** as Raymond (I/me/my). The docx copy already is; keep it.
- **American spelling** throughout (buyers are US couples).
- **Side-door structure:** page lives on the domain but stays out of the main
  nav. The FAQ points full-wedding buyers back to the main brand.
- **Pricing is intentionally below the main site.** This page shows
  $750–$1,550; the main site advertises "Collections from $2,400." The two do
  not collide because this page is out of nav and framed as short coverage.
- Reuse the existing design system: cream `#F7F5F2`, ink `#0E0D0B`, gold
  `#B8905A`, Bodoni `SERIF`, DM Sans body; `kicker`/`pill` helpers; the
  `data-fadeup` / `data-reveal` / `data-step` / `data-title-line` animation
  hooks; `LeiPage` + `Chrome` + `LeiFooter` shell.

## Files

| File | Purpose |
|------|---------|
| `src/content/second-weddings.ts` | All copy + image picks, data-driven (mirrors `homepage.ts`). Empty arrays render nothing, so no placeholder can leak. |
| `src/components/lei/HoneyBookEmbed.tsx` | Client component: the inquiry-form embed slot. |
| `src/app/(site)/second-weddings/page.tsx` | The page, composed from content + existing blocks. |

No changes to nav (`Chrome`) — the route stays undiscoverable except by URL.

## SEO (set in page `metadata`)

- **Title:** `Second Wedding Photographer | Bay Area | Lei Photography Collective`
- **Description:** `Relaxed, beautiful photography for second weddings, elopements and intimate celebrations across the SF Bay Area. Short coverage, fair prices, photos in 3 weeks.`
- **Primary keyword** `second wedding photographer Bay Area` appears in the H1
  kicker, the first paragraph, and one subheading.
- Related terms worked in naturally: micro wedding, intimate wedding,
  elopement photographer Napa / Carmel / Half Moon Bay.

## Section-by-section

Sections top to bottom. Alternating cream / ink backgrounds per the site rhythm.

1. **Hero** (full-bleed candid + dark gradient, free-session pattern)
   - Kicker: `Second Wedding Photographer · SF Bay Area`
   - H1: `This time, it's about the two of you.` (headline option A)
   - Subheadline (em dashes removed): `Relaxed second wedding photography
     across the San Francisco Bay Area. Short, simple coverage for intimate
     celebrations, from a photographer who keeps you comfortable and gets you
     back to your guests.`
   - Primary CTA: `Check my date →` — anchors to `#inquire` (the form section).
   - Hero image: a warm candid from the existing portfolio, with a swap-in
     comment. Not a posed formal.

2. **Opening "you" block** (cream)
   - The three first-person paragraphs: the "you've done the big wedding"
     opener, the "you don't need a photographer who disappears" paragraph, and
     Raymond's introduction ("I'm Raymond, a Bay Area second wedding
     photographer..."). First paragraph carries the primary keyword.

3. **Why couples choose this** (value props)
   - Four blocks in a responsive grid: `Just enough coverage`,
     `Comfortable, not posed`, `Photos while it's still fresh`,
     `Fair, clear pricing`. Same bordered-column treatment as the free-session
     BENEFITS grid.

4. **Packages** (`Simple packages, honest prices`)
   - Three price cards, data-driven from an array:
     - Intimate — $750 — 2 hours, ~25 photos
     - Classic — $1,150 — `Most popular` flag — 3 hours, ~40 photos
     - Full Afternoon — $1,550 — 4 hours, ~60 photos
   - "All packages include" line: planning call, private gallery, print rights,
     sneak peek in 48 hours, full gallery in 3 weeks.
   - Add-ons line: extra hour ($350), heirloom album (from $450), pre-wedding
     session ($400).
   - **Founding-rate line** (approved): `2026 introductory pricing. These rates
     rise next season.` Kept as a small, easily removable line.

5. **Social proof** (Option A — no reviews yet)
   - A strip of 6–8 of the strongest real candids, curated from the existing
     `SARGON_ODELYA_PHOTOS` / `PHOTOS` sets, each with a swap-in comment.
   - Caption: `Real moments, real couples. See the full portfolio →` linking to
     `/work`.
   - Built data-driven so a real full-width testimonial (name + photo) can
     replace the strip later by editing one array — never fabricate a review.

6. **How it works** (3 steps, via existing `ProcessSteps` block)
   - `01 Check your date`, `02 We have a short call`, `03 Enjoy your wedding`.
     Bodies rewritten without em dashes.

7. **FAQ** (6 questions)
   - Accessible expandable items (native `<details>`/`<summary>`, styled).
     Questions: only-second-weddings, older/camera-shy, tiny wedding, blended
     family, when-do-we-get-photos, where-do-you-travel. The first answer
     points full-wedding buyers back to Lei Photography Collective (brand-safety
     side-door link).

8. **Ready when you are** (final CTA + inquiry, id `#inquire`)
   - Heading `Ready when you are`, body (no deposit, no pressure).
   - The **HoneyBook embed slot** (see below).
   - Secondary link: `See the portfolio →` to `/work`.

9. **Footer** — `LeiFooter`.

## HoneyBook embed component

`HoneyBookEmbed.tsx`, a client component following the site's
"placeholder until configured" convention (mirrors the `FORMSPREE_ENDPOINT`
and `PIXEL_ID` placeholders elsewhere).

- A single constant `HONEYBOOK_PLACEMENT_ID = "REPLACE_ME"`.
- **While unset** (`REPLACE_ME`): render a neutral placeholder card in the
  site's style, with the CTA copy and a `mailto:leiphotography57@gmail.com`
  fallback so the section is never broken or empty.
- **When set:** render the HoneyBook placement `<div>` and load HoneyBook's
  placement-controller script via `next/script` (`afterInteractive`). Raymond
  activates the form by pasting his placement ID into the one constant. No
  other code change required.
- A short comment block documents exactly where the placement ID comes from
  (HoneyBook → embed code → the `hb-p-...` id).

## Data model (`second-weddings.ts`)

Typed exports, all consumed by the page so JSX holds no raw copy:

- `META` — title + description strings.
- `HERO` — kicker, headline, subheadline, cta label, hero image `Photo`.
- `OPENING` — array of paragraph strings.
- `VALUE_PROPS` — `{ title, body }[]`.
- `PACKAGES` — `{ name, price, hours, photos, blurb, popular? }[]`.
- `PACKAGE_INCLUDES` — string; `ADDONS` — string; `FOUNDING_RATE` — string.
- `SOCIAL_PROOF` — `{ images: Photo[], caption, href }`, plus an optional
  `TESTIMONIAL` slot (empty until a real one lands).
- `STEPS` — `{ n, title, body }[]` for `ProcessSteps`.
- `FAQ` — `{ q, a }[]`.
- `FINAL_CTA` — heading, body, secondary link label/href.

## Testing / verification

- `next build` / typecheck passes.
- Drive the page in the live preview: hero CTA scrolls to `#inquire`; the
  HoneyBook slot shows the placeholder card (since `REPLACE_ME`); FAQ items
  expand; the portfolio and brand links resolve; images load.
- Grep the rendered copy for em dashes (`—`) — must be zero.
- Confirm the route is not linked from `Chrome` (stays out of nav).

## Out of scope

- Wiring a real HoneyBook form (Raymond pastes the placement ID).
- Adding the page to the main nav.
- Real client reviews (slot exists; content added when a review arrives).
- New photography assets (existing portfolio candids used, with swap comments).
