# Nav + Footer Unification — Design

*19 July 2026 · Sub-project A of the site architecture plan*

## Context

The site architecture plan (19 Jul 2026) identified navigation as the biggest
architecture bug: `/investment` (the pricing page) is reachable from almost no
other page because the footer renders a different link subset per page, and the
header is a burger menu at every width, so nothing important is ever visible on
desktop without a tap.

This sub-project unifies the header and footer so every page shares the same
navigation, and makes the primary conversion pages (Investment especially)
reachable from everywhere.

Sibling sub-projects (separate specs): B `/work`→`/portfolio` rename, C weddings
gallery, D internal linking + gallery CTAs, E `/wedding-timeline-guide`.

## Current state (ground truth, not the stale crawl)

- Header = `Chrome` (centered wordmark + burger at every width), shared on all 11
  pages. Nav links live only in `MobileMenu`. Header nav is therefore already
  *consistent*, just not visible on desktop.
- `MobileMenu` has a quirk: its "The Portfolio" item points to `/weddings` (the
  sales page), not `/work` (the portfolio hub).
- `LeiFooter` is parameterized (`brand`, `links`) and each page passes a
  different `links` subset (default `home/work/weddings/inquire`). This is the
  real source of the inconsistency and the `/investment` orphaning.
- Portfolio hub is still at `/work` (the rename is Sub-project B).

## Goals

1. One shared nav config as the single source of truth for header, mobile menu,
   and footer links.
2. Visible desktop header nav; burger retained on mobile.
3. Footer identical on every page, with Investment and the other key pages always
   present.
4. No page orphans: every important page reachable from the header or footer on
   every page.

## Non-goals (handled elsewhere or later)

- Renaming `/work` → `/portfolio` (Sub-project B). Here, "Portfolio" links point
  to `/work`; after B it's a one-line change in the nav config.
- Building the weddings gallery, timeline guide, or new internal contextual links.

## Design

### 1. Shared nav config — `src/content/nav.ts`

A single module exporting the canonical destinations (href + label), plus the
curated lists that each surface consumes:

- `HEADER_NAV`: Portfolio (`/work`), Weddings (`/weddings`), Investment
  (`/investment`), About (`/about`). (Inquire is the CTA, rendered separately.)
- `MENU_NAV` (mobile burger, fuller): Portfolio (`/work`), Weddings
  (`/weddings`), Experience (`/experience`), Investment (`/investment`), About
  (`/about`), Free Session (`/free-session`). Plus Inquire CTA.
- `FOOTER_EXPLORE`: Portfolio (`/work`), Weddings (`/weddings`), Second Weddings
  (`/second-weddings`), Free Session (`/free-session`), Experience
  (`/experience`), Investment (`/investment`).
- `FOOTER_CONNECT`: About (`/about`), Inquire (`/inquire`), plus the external
  Instagram / Pinterest / Email (kept as-is from the current footer).

Changing a destination (e.g. `/work` → `/portfolio` in Sub-project B) is a single
edit here.

### 2. Header — `Chrome` + a small client `HeaderNav`

- Desktop (≥861px): wordmark left-aligned; `HEADER_NAV` links + a gold
  **[Inquire]** pill on the right; single bar at the existing `--lx-header-h`
  (64px). Active page highlighted in GOLD via `usePathname()` (so `HeaderNav` is
  a client component; `Chrome` stays otherwise as-is).
- Mobile (≤860px): unchanged — centered wordmark + burger. Desktop nav hidden via
  the existing 860px media-query convention; burger hidden on desktop.

### 3. Mobile menu — `MobileMenu`

Rebuild its item list from `MENU_NAV`. Fixes the "The Portfolio" → `/weddings`
quirk (Portfolio now → `/work`). Keep the current open/close animation and
styling; only the data changes.

### 4. Footer — `LeiFooter`

- Remove the per-page `links` prop dependency; render `FOOTER_EXPLORE` and
  `FOOTER_CONNECT` the same on every page. (Callers that pass `links` no longer
  vary output; the prop is removed and call sites updated.)
- Two labeled columns ("Explore", "Connect") plus the existing brand blurb.
- Add a line: **"Now booking 2026 & 2027 weddings"**.
- Keep the `brand` prop (`collective` | `raymond`) — About/Experience use the
  Raymond lockup; that stays.
- Keep the existing © line and Instagram/Pinterest/Email (fold the socials into
  the Connect column).

## Verification

- `npm test` passes (update any footer/nav test that asserted the old
  per-page link sets or CTA text).
- Production build (`next build`) succeeds.
- In the live preview, spot-check ≥3 different page types (home, a gallery,
  About): header and footer are byte-identical, Investment link present in both
  header and footer on each, active-page highlight correct, 860px breakpoint
  swaps desktop nav ↔ burger cleanly, mobile burger opens and its links resolve.

## Risks / notes

- Left-aligning the wordmark on desktop is a visible brand change (approved).
- `HeaderNav` becomes a client component for the active state; keep it tiny so the
  header stays cheap.
- Call sites of `LeiFooter` that pass `brand="raymond"` must keep doing so; only
  the `links` prop goes away.
