# Wedding Conversion Redesign — Design Spec

**Date:** 2026-07-14
**Status:** Approved section-by-section in brainstorming; pending final user review
**Scope model:** Full wedding-funnel rebuild (Approach 2), executed in phases. Phase 1 = homepage.

## Goal

The site has one job: generating wedding inquiries. Raymond is a Bay Area wedding
photographer; the site is repositioned to weddings & couples only (categories:
Weddings, Couples, Engagements, Events). Creative/fashion work will move to a
separate future site. Every design decision serves the inquiry funnel.

Reference for structure and voice (not visual style): albertpalmerphotography.com —
textbook funnel (hero → value prop → portfolio → bio → named testimonials → form)
with a warm first-person voice. We take his funnel and warmth; we keep LEI's
editorial Bodoni/cream/ink/gold aesthetic.

## Hard constraints (user-set)

1. **No page contents are deleted.** `/work`, `/experience`, grad and editorial
   portfolio projects all stay live and untouched; the funnel simply stops
   pointing at them. Unrendered photo data stays in the codebase.
2. **`/free-session` is untouchable** (active Facebook ad landing page).
3. **Homepage is built first.** Other phases follow.
4. **No fabricated social proof.** Testimonial/gallery slots render nothing until
   real content arrives.

## Conversion principles (user-supplied, all must hold)

1. Above the fold: best emotive image + one-line who/where statement + primary CTA
   ("Check my availability").
2. CTA repeated after every major section on every page, in a contrasting color;
   never more than one viewport away.
3. Inquiry form: max 5 fields (names, email, tentative wedding date — labeled
   "tentative date" — venue/location, message), one click away, with a
   what-happens-next + response-time line beneath.
4. Starting price shown on homepage and pricing page: **"Collections from $2,400"** (USD).
5. Testimonials/review badges placed beside CTAs, not on a separate page.
6. Mobile-first performance: compressed images, lazy loading, fast load on phones.
7. Real-wedding galleries linked from the homepage as proof of consistency —
   **curated: ~3 weddings, 10-15 photos each, never full dumps.**

## Site architecture (target end state)

| Route | Job | Change |
|---|---|---|
| `/` | Sell — long-form page doing the whole sales job | Rebuilt (Phase 1) |
| `/portfolio` (+ project pages) | Prove — four categories: Weddings · Couples · Engagements · Events | Restructured later; grad/editorial projects stay live but unlinked from funnel |
| `/pricing` | Qualify — "Collections from $2,400," inclusions, testimonial beside CTA | New page (later phase) |
| `/about` | Connect — story aimed at couples; absorbs best of `/experience` | Rewritten later |
| `/inquire` | Convert — HoneyBook form at top; 5 fields; next-steps + 48hr line | Reordered (later phase) |
| `/free-session` | Capture ads | Untouched |
| `/work`, `/experience` | Legacy | Stay live, unlinked from primary nav; no deletions |

Target nav: **Portfolio · Pricing · About · Inquire** + persistent gold
`Check my availability` button (pinned in mobile bar). Nav changes land when
their target pages exist.

## Homepage design (Phase 1)

Top-to-bottom; every block ends within reach of a gold CTA linking to `/inquire#form`:

1. **Hero — hybrid.** Desktop keeps the "STORY" scroll animation with a conversion
   layer in the first viewport: kicker "San Francisco Bay Area · Weddings &
   Couples," the line *"For couples who'd rather live it than pose for it,"* gold
   `Check my availability` pill. Mobile: no preloader, no WebGL — one full-bleed
   compressed wedding image (strong Sargon & Odelya frame), same line, same CTA,
   visible instantly.
2. **Ideal-client statement.** The in-progress "Who I photograph" section,
   tightened to couples: bullets = weddings / engagements & couples / "awkward in
   front of a camera" (grad bullet removed). Includes the "Hi, I'm Raymond"
   first-person moment (photo optional). CTA + **testimonial slot #1**.
3. **Four category doors.** Weddings · Couples · Engagements · Events — one strong
   image each, serif editorial labels, linking into the portfolio. Replaces the
   horizontal Collection strip on the homepage (component survives on `/work`).
4. **Recent Weddings (proof).** One editorial row per wedding (target: 3): couple
   names, venue/area, year, cover + 2-3 supporting frames, linking to that
   wedding's curated 10-15 photo gallery page. Sargon & Odelya display gets
   curated to 10-15 (underlying data retained). Weddings #2 and #3 are
   data-driven slots until photos arrive. CTA + **testimonial slot #2**.
5. **Pricing band.** "Collections from $2,400," one line on inclusions, link to
   `/pricing` (until that page ships, link goes to `/inquire`).
6. **Final block.** "Dates for 2026–27 are open" framing + "You'll hear from me
   personally within 48 hours" + last CTA above the footer.

Mobile nav additionally carries a compact persistent gold `Availability` button.

## Design system & voice

- **Typography/color:** Bodoni Moda display; cream `#F7F5F2` / ink `#0E0D0B`
  canvas. **Gold `#B8905A` becomes the reserved action color** — solid gold pills
  with ink text for all conversion CTAs; nothing else new gets gold. Ink-on-cream
  pills retired from conversion paths.
- **Voice:** first person, warm, plain-spoken sentences under elegant serif
  headlines. Testimonials always attributed to named couples.
- **Motion:** desktop scroll hero + one orchestrated staggered hero load
  (existing `data-fadeup` system); sparse below the fold. Mobile and
  `prefers-reduced-motion`: no preloader, no WebGL, no scroll-jacking.
- **Performance budget:** mobile LCP < 2.5s on 4G; hero image compressed, sized,
  preloaded; all below-fold imagery `loading="lazy"`; HoneyBook script loads only
  on `/inquire`; `img()` helper audited for oversized requests during
  implementation.

## Content dependencies & empty states

| Content (from Raymond) | Used in | Until it arrives |
|---|---|---|
| 3-5 testimonials (couple names + quotes) | Slots beside CTAs | Slot renders nothing |
| Weddings #2 & #3 (10-15 selects, names, venue) | Recent Weddings + gallery pages | Section renders with Sargon & Odelya only |
| Sargon & Odelya 10-15 keepers | Curated gallery + teaser | Claude proposes a cut; Raymond vetoes/swaps |
| Optional photo of Raymond | "Hi, I'm Raymond" moment | Text-only renders fine |
| HoneyBook form trimmed to 5 fields, "tentative date" label | `/inquire` | **HoneyBook dashboard task — not code.** Embed shows whatever HoneyBook is configured to show |

**Empty-state rule:** every deferred-content slot is data-driven — an empty array
means the block doesn't render. Placeholder text can never leak to production.

**Error handling:** if the HoneyBook script fails or is blocked, `/inquire` shows
a fallback beneath the embed area: mailto link to leiphotography57@gmail.com with
the same 48-hour response promise.

## Verification (per phase, before "done")

- Run the site; drive the funnel on a phone-sized viewport: land → tap CTA →
  reach the form. Click every CTA on every touched page.
- Lighthouse mobile pass on the homepage: LCP < 2.5s; images compressed + lazy.
- Desktop scroll hero still animates; mobile confirmed to skip preloader/WebGL.
- Untouched pages (`/free-session`, `/work`, `/experience`, grad galleries) still
  render — the no-deletions guarantee is checked, not assumed.

## Decisions log

- Hero: hybrid (desktop animation + conversion layer; static fast mobile) — user choice.
- Form: keep HoneyBook, one click from every CTA; no homepage embed (script too heavy) — user choice.
- Pricing: publish "Collections from $2,400" — user-supplied figure, USD.
- Collection section → four category doors (routing, not browsing) — user choice.
- Galleries: ~3 curated weddings, 10-15 photos each; no full galleries — user directive.
- Approach 2 (funnel rebuild) chosen over retrofit, then phased: homepage first, no deletions — user directives.
- Testimonials: design slots now, real quotes later — user choice.

## Out of scope

- The future creative/fashion website.
- Any change to `/free-session`.
- Deleting any existing page, route, or photo data.
- HoneyBook dashboard configuration (user task).
