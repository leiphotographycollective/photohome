# Mobile Hero Cinematic — Design

**Date:** 2026-07-16
**Status:** Approved

## Goal

Run the full desktop hero cinematic — preloader, letter-split title entrance,
and the scroll-driven photo bloom out of the "O" in COVER — on mobile
(≤860px), replacing the static mobile hero as the default experience. The
static hero survives only as the reduced-motion fallback. The WebGL mouse
ripple stays desktop-only.

## Background

The homepage currently ships two heroes:

- **Desktop** (`.lx-hero-desktop`): a 300vh section with a sticky viewport.
  `motion.ts` drives a once-per-session preloader, a letter-by-letter title
  entrance, and a scrubbed clip-path bloom that reveals the hero photo from
  the "O" glyph, plus a lazily loaded Three.js mouse-ripple shader.
- **Mobile** (`.lx-hero-mobile`): a static full-bleed photo with kicker,
  headline, and CTAs. `motion.ts:37` disables all home cinematics at ≤860px,
  and `globals.css` swaps the sections by width. This was a deliberate
  first-paint perf decision, now being reversed by explicit request.

## Decisions

1. **Scope:** full desktop cinematic on mobile (user-selected over an
   entrance-only or mobile-tuned scroll variant).
2. **WebGL ripple:** skipped on mobile. It is mouse-driven with no natural
   touch equivalent, and the plain `<img>` is already the built-in fallback,
   so phones bloom the static photo. Saves GPU/battery.
3. **Reduced motion:** phone users with `prefers-reduced-motion: reduce` keep
   today's static mobile hero (instant paint, no preloader) instead of a
   broken 300vh scroll shell.

## Changes

### `src/lib/lei/motion.ts`

- Remove the `!mobile` overrides on `home` and `preloader` (lines 33–40):
  the preloader, hero entrance timeline, and scroll bloom run at all widths.
- Keep the `mobile` media check for exactly one purpose: do not call
  `initHeroGL` on ≤860px.
- The `prefers-reduced-motion` early return (hide preloader, no animation)
  is unchanged.

### `src/app/globals.css`

Rework the conversion-layer rules (lines 232–247) to be motion-aware:

- Default at all widths: `.lx-hero-desktop` visible, `.lx-hero-mobile` hidden.
- `@media (max-width: 860px) and (prefers-reduced-motion: reduce)`: hide the
  desktop hero, show the mobile hero, and hide `[data-preloader]`.
- The old width-only swap and preloader guard are removed.

### `src/app/(site)/page.tsx`

- Narrow the `HERO_MOBILE` preload `<link>` media query to
  `(max-width: 860px) and (prefers-reduced-motion: reduce)` so ordinary
  mobile visitors don't download an image they never see.
- Update the comments that describe the mobile hero as the static default.
- No typography changes: `clamp(64px,13vw,190px)` bottoms out at 64px and
  YOUR / COVER / STORY. fit a 390px viewport; `computeO()` measures the O's
  live position so the bloom origin is correct at any width.

## Accepted trade-offs

- Mobile first paint now includes the once-per-session preloader and eagerly
  loads the 1500px-wide desktop hero image.
- The scroll bloom relies on native touch scrolling driving ScrollTrigger
  (Lenis does not hijack touch), which is supported behavior.
- Mobile URL-bar show/hide can cause a small ScrollTrigger re-measure jump
  mid-bloom; `invalidateOnRefresh` is already set and this is standard for
  scrubbed animations on mobile.

## Testing

In a mobile-width viewport (~390px):

1. Preloader plays once per session, then the title letters animate in.
2. Scrolling blooms the photo out of the "O" and fades the lockup.
3. No WebGL `<canvas>` is mounted inside `[data-gl-mount]`.
4. With reduced-motion emulated: the static mobile hero renders instantly,
   no preloader, and the desktop hero section is hidden.
5. Desktop (>860px) behavior is unchanged, including the WebGL ripple.
