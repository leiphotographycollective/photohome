# Investment Page: Split "Every collection includes" and "Add-ons" into Separate Sections

**Date:** 2026-07-19
**Requested by:** Raymond ("make every collection includes and add-ons to be separate sections")
**Scope:** One file: `src/app/(site)/investment/page.tsx`. No content-file or test changes.

## Current state

One dark section (`{/* ══ Every collection includes + Add-ons ══ */}`, lines ~281-390) holds both blocks side by side in an `lx-grid-2col` 1fr/1fr grid: left column renders `INCLUDED_EVERYWHERE` as a star list, right column renders `ADD_ONS` as name/price/note rows.

## Approved design

Replace that one section with two sibling `<section>` elements, in this order:

1. **"Every collection includes"** section
   - `position: "relative"`, `background: "#0E0D0B"`, `color: "#F7F5F2"`, `padding: "14vh 6vw 7vh"`.
   - Inner container: `maxWidth: 720`, `margin: "0 auto"`.
   - Kicker "Every collection includes" centered by spreading the existing helper into the div's style: `style={{ ...kicker({ marginBottom: 24 }, 10, ".3em"), textAlign: "center" }}`.
   - The `<ul>` star-list markup and item styling are unchanged (star glyph, `cream(0.16)` hairline top borders, `cream(0.75)` text).

2. **"Add-ons"** section
   - Same wrapper styles with `padding: "7vh 6vw 14vh"`.
   - Inner container: `maxWidth: 720`, `margin: "0 auto"`.
   - Kicker "Add-ons" centered the same way: `style={{ ...kicker({ marginBottom: 24 }, 10, ".3em"), textAlign: "center" }}`.
   - The add-on row markup is unchanged (serif name, italic gold price, muted note, `cream(0.16)` hairline top borders).

Rationale locked during brainstorming:
- Both sections stay dark: the page alternates light/dark bands (light collections before, light quote section after); a dark/light split would put two light bands adjacent.
- Centered narrow column (user choice) matches the page's other centered sections.
- The 7vh + 7vh internal padding yields 14vh between the two lists, matching the band's outer margins; kickers alone mark the sections, no divider (the hairline treatment is already used by list items and would blend).
- The `lx-grid-2col` class and grid styles are removed with the old wrapper; nothing two-column remains.

## Not changing

- `INCLUDED_EVERYWHERE` and `ADD_ONS` in `src/content/pricing.ts` (data and copy untouched).
- Any other section of the page; section order on the page is unchanged (collections → includes → add-ons → quote).
- Tests: no test pins this layout; the suite must simply stay at its current state (42 passed, 1 documented pre-existing unrelated failure).

## Verification

- `npx vitest run`: unchanged results.
- `npm run build`: clean.
- Preview screenshot of /investment showing the two stacked sections, console clean.
