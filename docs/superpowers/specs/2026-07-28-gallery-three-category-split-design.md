# Gallery: three-category split

**Date:** 2026-07-28
**Status:** Approved

## Problem

`/gallery` is one long page holding every category stacked vertically: Weddings
(split into three labelled wedding sets), Couples, and Engagements. Below the
grids sit six more sections of sales furniture. Two things are wrong with it.

First, there is nowhere to put the event portfolio. Raymond shoots galas,
panels and corporate mixers, and none of that work is on the site. Appending a
fourth category to an already long page makes the page worse, not better.

Second, a visitor who wants to see one kind of work has to scroll past the
other kinds to reach it. There is no way to link someone straight to the
weddings, and no way for a corporate client to land on events without walking
through a wedding first.

## Solution

Split the one page into a hub and three category pages.

```
/gallery              hub: three cards, nothing else to scroll past
/gallery/weddings     the three wedding sets, full spread
/gallery/engagements  engagement frames
/gallery/events       three named events, each its own labelled grid
```

Events goes last in the card order and in the nav. Weddings stays first: it is
the work the business runs on.

## Decisions taken

These were settled during brainstorming and are not open questions.

- **Couples is dropped.** Its three coastal frames stay in `portfolio.ts`,
  untouched and unreferenced by the gallery. They are still used elsewhere on
  the site, so they are not deleted, only unlinked from the gallery.
- **Routes nest under `/gallery`.** Top-level `/weddings` was rejected because
  it currently 308-redirects to `/gallery`, and reclaiming it would undo the
  search-ranking consolidation that redirect exists to preserve.
- **Cards sit in an even row of three**, not a staggered trio.
- **The hub keeps only hero, cards, and CTA.** A hub you have to scroll through
  six sections to use is not a hub.
- **Event photos are placeholders.** Raymond will drop real frames in and name
  the events himself.

## Content model

### `src/content/gallery.ts`

`GalleryCategory` keeps `id`, `label`, `blurb`, `photos` and the optional
`sets`, and gains three fields:

| Field | Purpose |
| --- | --- |
| `href` | Where the card links. `/gallery/weddings` and so on. |
| `cover` | The `Photo` shown on the card face. |
| `cardBlurb` | One short line on the card, distinct from the longer `blurb` that heads the category page. |

`GALLERY` becomes Weddings, Engagements, Events in that order.

### `src/content/events.ts` (new)

Holds the three events as a `GallerySet[]`, the same shape Weddings already
uses. This is the load-bearing choice in the whole design: because Events is
just another category with sets, it renders through the identical code path as
Weddings. There is no second grid implementation to keep in sync.

Working event names are `Event One`, `Event Two`, `Event Three`, with ids
`event-one`, `event-two`, `event-three`. The names are deliberately obvious
placeholders so they cannot ship to production unnoticed.

## Components

`columnsFor`, `capFor`, `PhotoGrid` and the set-heading markup move out of
`src/app/(site)/gallery/page.tsx` into a new
`src/components/lei/CategoryGallery.tsx`. The three category pages then reduce
to a title band, a `<CategoryGallery>`, and their footer sections.

`CategoryGallery` takes a `GalleryCategory` and renders either one masonry
(when the category has no `sets`) or one labelled masonry per set. Column count
and max width still derive from photo count exactly as they do today: a
category with sets sizes to its widest set, not to every frame it holds put
together.

A second new component, `src/components/lei/CategoryCards.tsx`, renders the hub
row. Each card is a single `<Link>` wrapping a 4:5 portrait image, with the
serif category name and the `cardBlurb` over a bottom gradient. Hover lifts the
card and slow-zooms the photo, using the same `data-hover` treatment the rest
of the site uses. Three across on desktop, one column on phones.

## Page shapes

### `/gallery` (hub)

1. Existing full-screen photo hero, unchanged (`GALLERY_HERO`, the
   `so-select-636` frame, with the ghost GALLERY wordmark behind it)
2. `<CategoryCards>`
3. Marquee, Inquire CTA, footer

### `/gallery/weddings`

1. Compact dark title band: kicker, serif title, `blurb`
2. `<CategoryGallery>`: three labelled wedding sets
3. Full-bleed feature photo (`miranda-danny-14`, moved here from the hub)
4. Testimonial and the "Collections from $2,400" link
5. Marquee, Inquire CTA, footer

### `/gallery/engagements` and `/gallery/events`

1. Compact dark title band
2. `<CategoryGallery>`
3. Marquee, Inquire CTA, footer

The category pages take a compact title band rather than a second full-screen
photo hero. Two reasons: it gets a visitor who has already clicked a card to
the photos in one scroll instead of two, and a photo hero would have to spend a
frame that then appears again in the grid below it.

### Retired

The gallery pull quote, the `band-gallery-1` photo band, and `ProcessSteps`
come off the gallery entirely. `ProcessSteps` still runs on `/experience` and
the homepage, so no content is lost.

## Placeholders

19 flat-tone JPEGs, generated with `sharp` (already a dependency via Next), each
with its own slot name rendered into the image so the boxes are tellable apart
in a browser.

```
public/images/portfolio/events/events-card-cover.jpg
public/images/portfolio/events/event-one/event-one-1.jpg    ... -6.jpg
public/images/portfolio/events/event-two/event-two-1.jpg    ... -6.jpg
public/images/portfolio/events/event-three/event-three-1.jpg ... -6.jpg
```

They are `.jpg` at the final intended paths rather than `.svg` in a placeholder
directory, so replacing one is a drag and drop over the same filename with no
code change at all.

Slots alternate portrait (2:3, `ratio: 0.6667`) and landscape (3:2,
`ratio: 1.5`) so the scaffolded masonry has the rhythm a real one would. If a
replacement arrives in the other orientation, updating `ratio` in `events.ts`
restores an exact height reservation, but nothing breaks without it: the grid
sets `aspectRatio: auto <ratio>`, so the browser corrects to the file's true
ratio once it decodes. A stale value costs a small reflow, never a squashed
photo.

The existing `public/images/portfolio/events/assyrian/`,
`events/corporate/` and the three loose `event-*.jpg` files stay on disk,
unreferenced. Those folders are crossed (the `assyrian` folder holds frames
from two different events, and `corporate/corporate-06.jpg` is from the same
event as several `assyrian/` frames), so sorting them needs Raymond, not a
guess.

## Link and test fallout

| File | Change |
| --- | --- |
| `src/content/nav.ts` | `/gallery#engagements` becomes `/gallery/engagements`. No Events entry is added: the only place it could go is the `WEDDINGS_MENU` dropdown, and filing event work under a Weddings parent would be plainly wrong. The hub is the index for all three. |
| `src/components/lei/HeaderNav.tsx` | The comment explaining that the `#engagements` child never matches an active path is now wrong: the child is a real path and will light up. Rewrite it. |
| `src/content/homepage.ts` | The three `WEDDING_PORTFOLIO` entries all point at `/gallery`. Point each at its own set: `/gallery/weddings#sargon-odelya`, `#miranda-danny`, `#trang`. |
| `src/app/sitemap.ts` | Add the three new URLs. |
| `tests/gallery.test.ts` | Asserts the Weddings/Couples/Engagements order and the single-page shape. Rewrite for the new order and add coverage that every event placeholder path resolves to a real file under `public/`. |
| `tests/no-em-dash.test.ts` | Add the new `events` content module to the modules under test. |
| `tests/nav.test.ts` | Line 37 asserts the literal `/gallery#engagements` href in the expected `WEDDINGS_MENU` list. Update it to `/gallery/engagements`. |

Set anchors (`#sargon-odelya` and so on) keep working: they move from
`/gallery` to `/gallery/weddings` but the ids themselves do not change.

## Copy

All copy is first person, as Raymond, and contains no em dashes.

**Card blurbs**

- Weddings: The whole day, start to finish.
- Engagements: The nerves, the question, the yes.
- Events: Galas, panels, and the parties after.

**Events category blurb** (heads `/gallery/events`)

> Galas, mixers, award nights. I work the room so you get to be in it.

Weddings and Engagements keep the `blurb` copy they have today.

## Known gap

`/gallery/engagements` will hold exactly one photo, the proposal frame, because
Couples was dropped and Engagements never had more than the one. A card
promising a gallery that opens onto a single image reads as broken rather than
sparse.

This ships as specced. The fix, when Raymond wants it, is scaffolding five
placeholders on that page exactly as Events gets, using the same drag-and-drop
naming, and filling them as engagement work comes in.

## Testing

- `tests/gallery.test.ts`: category order and ids, every category has a label,
  blurb, cardBlurb, cover and at least one photo, no photo repeats inside a
  category, wedding set ids and names, every local path resolves to a real file
  under `public/` (which covers all 19 placeholders).
- `tests/no-em-dash.test.ts` and `tests/voice.test.ts` cover the new copy once
  `events` is registered in the former.
- Manual: the three cards link correctly, an anchor like
  `/gallery/weddings#trang` scrolls to the right set with the header offset
  respected, and the row collapses to one column on a phone.
