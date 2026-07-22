# Collage portfolio layout + wedding project strip

Date: 2026-07-21
Status: Approved design, pending implementation plan

## Goal

Rebuild the homepage "The Portfolio" section as an editorial collage grid (mixed tile sizes, tightly packed, like the Squarespace reference screenshot), add the same collage near the top of /weddings, and give both pages a horizontally scrollable strip of wedding project cards that click through to blank project pages the owner will fill in later.

## Non-goals

- No lightbox. Clicking never opens an overlay; the "closer look" path is the project strip.
- No new photos are chosen in this work beyond arranging what the pages already use.
- The /portfolio hub page does not list the new weddings category yet (its projects are all placeholders).
- No changes to the /weddings hero, sticky feature, parallax gallery, or anything below the new sections.

## Components

### 1. `Collage` + `CollageTile` (`src/components/lei/Collage.tsx`)

Server component, pure CSS grid. No client JS, no measurement, no layout shift.

- `Collage` renders a `display: grid` container: 4 equal columns on desktop, 2 columns at <= 768px (via a `lx-collage` class + rule in `globals.css`, following the existing `lx-grid-2col` pattern). Gap matches the existing gallery rhythm (`2.4vw`, ~14px floor).
- `CollageTile` takes `size: "tall" | "small" | "wide"` and wraps children (an `<img>` the page supplies). Every tile declares its own `aspect-ratio`, so rows auto-size consistently at any column count:
  - `tall`: 1 column x 2 rows, `aspect-ratio: 2 / 3`. For portrait natives only.
  - `small`: 1 column x 1 row, `aspect-ratio: 3 / 2`. For landscape natives.
  - `wide`: 2 columns x 1 row, `aspect-ratio: 3 / 1`-ish panoramic crop of a landscape native. Used sparingly, optional.
  - Where a row mixes tall and small tiles, auto row heights settle on the larger contribution (half a tall is slightly taller than one small); the few-percent difference is absorbed by `object-fit: cover` and never flips an image's orientation.
- Tiles use plain source-order flow (`grid-auto-flow: row`). The screenshot's pattern is produced by tile order alone, e.g. block A: `tall, tall, small, small, small, small` (two big portraits left, 2x2 cluster right); block B mirrors it: `small, small, tall, tall, small, small`. No `dense`, no explicit placement, so the layout is predictable when the owner swaps photos.
- Images inside tiles: `width/height: 100%`, `object-fit: cover`, `display: block`, wrapped in the existing `data-reveal`/`data-fadeup` treatment where the section already uses it.

**Orientation rule (hard requirement):** a photo whose native file is portrait (`ratio < 1`) may only be placed in a `tall` tile; a landscape native (`ratio > 1`) may only be placed in `small` or `wide` tiles. Never crop a portrait into a landscape frame or vice versa. Tile aspect ratios (2:3 tall, 3:2 small) match the actual S&O exports, so cropping is minimal.

The pages write each `<img>` out one by one with literal `src` strings inside `CollageTile`s, preserving the visual-editor swap convention already documented in `page.tsx`.

### 2. `ProjectStrip` (`src/components/lei/ProjectStrip.tsx`)

Server component: a native horizontally scrollable row (`overflow-x: auto`, `scroll-snap-type: x mandatory`, hidden scrollbar via the `lx-` CSS pattern), NOT the pinned scroll-scrub `HorizontalCollection`.

- Kicker heading: "A closer look".
- Cards ~`min(70vw, 320px)` wide, `scroll-snap-align: start`, edge padding matching the section gutter.
- Each card links to `/portfolio/weddings/<id>`.
- Card body for a placeholder project (`cover: null`): a flat tone block (dark `#171411` on the homepage's dark section, `#ECE7E1` on cream) at 4:5, with serif "Coming soon" centered, and the project title + place row below in the same typography as `HorizontalCollection` cards.
- When a project later gets a real `cover` Photo, the same card renders the photo instead of the tone block; no code change needed.
- Takes a `dark?: boolean` prop so it sits correctly on both the homepage (dark) and /weddings (dark) now, and cream sections later.

## Data changes (`src/content/portfolio.ts`)

- `Project.cover` becomes `Photo | null`. `null` means "coming soon": render tone-block placeholders wherever a cover is shown.
- New category:

```ts
weddings: {
  label: "Weddings",
  tagline: "Full days, kept the way they felt",
  intro: "Complete wedding stories, from getting ready to the last song.",
  projects: [
    { id: "wedding-01", title: "Coming Soon", place: "Bay Area, CA", year: "2026", cover: null, photos: [] },
    ... // wedding-02 through wedding-05, identical shells
  ],
},
```

- `CAT_ORDER` is unchanged (weddings intentionally excluded from the /portfolio hub and from the cross-category "keep exploring" fallback, both of which iterate `CAT_ORDER`).

## Route plumbing

Because weddings is not in `CAT_ORDER`, static params must come from the full category map:

- `portfolio/[cat]/page.tsx`: `generateStaticParams` returns `Object.keys(CATEGORIES)`.
- `portfolio/[cat]/[id]/page.tsx`: `generateStaticParams` flat-maps over `Object.keys(CATEGORIES)`.
- `sitemap.ts`: keep iterating `CAT_ORDER` only, so placeholder pages are reachable but not advertised to crawlers. Revisit when real weddings land.
- Guard every `cover` render site (`[cat]` listing grid, `[id]` related cards, `ProjectStrip`) for `null`: render the "Coming soon" tone block instead of an `<img>`.
- `[id]` page with `photos: []` renders the title/meta shell and an empty gallery; no special casing needed beyond it not crashing (verify).

## Page changes

### Homepage (`src/app/(site)/page.tsx`)

Inside the existing dark "The Portfolio" section (kicker, heading, and closing "View the full portfolio" link all stay):

- Replace the stacked full-width/pair rows with one `Collage` using the same Sargon & Odelya images currently in the section, reassigned to tiles by native orientation (2:3 portraits in `tall`, 3:2 and 16:9 landscapes in `small`/`wide`).
- Below the collage, above the "View the full portfolio" link: `ProjectStrip` with the 5 placeholder wedding projects.

### /weddings (`src/app/(site)/weddings/page.tsx`)

- New section inserted between the hero and the sticky full-bleed feature: a `Collage` on the dark background using wedding photos not already rendered elsewhere on that page (draw from `SARGON_ODELYA_PHOTOS` frames not used by the homepage collage, plus the new local `/images/bay-area-wedding-*` files, respecting the orientation rule).
- `ProjectStrip` directly under that collage.
- Everything else on the page is untouched.

## Error handling / edge cases

- A `CollageTile` with a missing image src degrades to an empty framed block (background `#171411`); the grid does not collapse.
- Placeholder project pages 200 and render; they are excluded from sitemap and hub navigation, so the only way in is the strip (intended).
- Mobile: 4-column grid drops to 2 columns; pattern blocks still resolve left-to-right with no gaps because every block's tile counts are even per row at 2 columns (tall spans 2 rows x 1 col, smalls pair up).

## Testing

- `npm run build` passes; `/portfolio/weddings/wedding-01` through `-05` are generated.
- Visual check in the Ship Studio preview at desktop and ~390px mobile width: collage matches the reference structure, no portrait image is ever shown landscape-cropped, strip scrolls and snaps, cards click through to blank project shells.
- /portfolio hub still shows only the existing five categories.
- Existing pages that render project covers (`/portfolio/[cat]`, related cards) still build and render with the `Photo | null` change.
