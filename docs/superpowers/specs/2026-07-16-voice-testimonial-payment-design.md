# Voice Alignment, Testimonial & Payment Plans — Design

**Date:** 2026-07-16
**Status:** Approved (pending copy-deck review)

## Goal

Four changes that came out of the Gen Z bride audit, in one coordinated pass:

1. New hero one-liner leading with the "present, not stressed" promise.
2. The Sargon & Odelya testimonial on the home page, photo beside quote.
3. A monthly-payment-plans line on /investment.
4. Site-wide voice alignment: every page speaks in the homepage's voice.

## Decisions (user-confirmed)

- **Positioning blend:** "present, not stressed" becomes the lead promise
  (hero, `POSITIONING_SUB`, meta descriptions). "Style and the party" stays
  as personality flavor in body copy and footer taglines. Neither replaces
  the other.
- **Voice depth:** display headlines change too, not just body copy.
- **Testimonial layout:** the user's reference screenshot — photo left;
  on the right a thin rule, an italic serif pull-quote, the full quote in
  smaller body text, then the attribution. Carousel arrows appear only when
  a second testimonial exists.
- **Testimonial placement:** a dedicated section immediately after the
  homepage wedding portfolio (which is their wedding), kickered
  "From the couple above".
- **Marquee phrase:** NOT "Shot like a cover story" (user: repetitive with
  the hero). Use **"You live it. I'll keep it."**

## The voice rule

Written here so future copy follows it: *editorial confidence, spoken like
a friend.* Direct address ("you two"), contractions, concrete images over
abstractions. Avoid the formal wedding-poetry register: "artistry,"
"gracefully," "intention/intentional," "milestones," "documented,"
"curated record," "genuine/authenticity" as abstract nouns. Wit is welcome;
the calm-competence promise ("I've already planned for it") carries trust.

## 1. Hero line & positioning

| Where | Current | New |
|---|---|---|
| `page.tsx` desktop hero `[data-hero-sub]` | "Your wedding, shot like the cover story it is — for couples who bring the style and the party." | "Your wedding, shot like the cover story it is — for couples who want to be present in their wedding, not stress about it." |
| `page.tsx` mobile hero (reduced-motion fallback) | h1 only | Add a small sub-line under the h1: "For couples who want to be present in their wedding — not stress about it." (≈14px, cream(0.85), above the CTAs) |
| `homepage.ts` `POSITIONING_SUB` | "Bay Area wedding photographer for couples who bring the style and the party." | "Bay Area wedding photography for couples who want to be present in their wedding — not stressed about it." |
| `page.tsx` home meta description | "…for fun, stylish couples in the {CITY} & beyond…" | `${POSITIONING} Editorial wedding photography for couples who want to be present in their wedding, not stress about it — {CITY} & beyond, by Raymond Lei.` |

`POSITIONING` itself ("Your wedding, shot like the cover story it is.") is
unchanged. /investment's meta description (uses `POSITIONING`) is unchanged.

## 2. Testimonial section

### Data (`homepage.ts`)

`Testimonial` gains two fields:

```ts
export interface Testimonial {
  pull: string;      // the italic serif pull-quote line
  quote: string;     // the rest of the quote (body text)
  names: string;
  context?: string;
  photo: Photo;      // portrait beside the quote
}
```

`TESTIMONIALS[0]` — Sargon & Odelya:

- **pull:** "He took the time to understand which shots were critical to
  our culture — and didn't miss a single beat."
- **quote:** "We had a traditional Middle Eastern wedding, and we were so
  impressed by how quickly Raymond got up to speed on our specific
  traditions. His organization and talent far exceed his years — really
  top-tier. He met with us for an engagement shoot to understand our energy
  and post-production preferences, and on the big day he was a total pro —
  complete with a full itinerary and backup equipment. He worked seamlessly
  with our videographer, and his artistic touch resulted in an excellent
  final gallery. We absolutely loved the photos and can't wait to book our
  anniversary shoot with him!"
  (The pull sentence is lifted out; the rest is verbatim from the couple.)
- **names:** "Sargon & Odelya" · **context:** "Wedding · Bay Area, CA"
- **photo:** `SARGON_ODELYA_PHOTOS[23]` — first dance beneath string
  lights, fog, black & white, portrait (2:3). Unused elsewhere on the
  homepage, so the no-photo-reuse rule holds. Swappable in one line.

### Component (`components/lei/TestimonialFeature.tsx`, client)

Renders `TESTIMONIALS`; returns `null` when empty (no-placeholder rule).
Layout per the reference: cream section; two-column grid (photo
`minmax(280px,460px)`, text column max ~560px), stacking to photo-above on
mobile via `.lx-grid-2col`. Text column: thin top rule (`ink(0.14)`),
pull-quote in `SERIF` italic `clamp(22px,2.6vw,32px)`, body 15px `MUTED`
lh 1.8, attribution "— Sargon & Odelya" + context line in the site's
kicker style. Entrance animations reuse existing hooks (`data-reveal` on
the photo, `data-fadeup` on the text) — no new motion code.

Carousel: `useState` index with prev/next arrows, rendered **only when
`TESTIMONIALS.length > 1`**. With one testimonial the section is static.

### Placement & cleanup

- New section in `page.tsx` directly after the Wedding Portfolio section
  (dark), on cream, kicker "From the couple above".
- The empty `TestimonialSlot` usage in "For couples like you" is removed,
  and the now-unreferenced `TestimonialSlot` component is deleted from
  `Cta.tsx`.

## 3. Payment plans (/investment)

Add one bullet to the "Every collection includes" list:

> Monthly payment plans — every collection can be split into monthly
> payments.

No new section; it sits with the other universal inclusions.

## 4. Voice copy deck

Every replacement, page by page. Lines not listed are unchanged.

### Home (`page.tsx`, `portfolio.ts`)

| Where | Current | New |
|---|---|---|
| Marquee (inquire section) | "A curated record of the genuine" | "You live it. I'll keep it." |
| `portfolio.ts` weddings category description | "The full arc of a day — the quiet preparation, the vows, the first dance. A curated record of the genuine." | "The full arc of a day — the quiet getting-ready hours, the vows, the dance floor." |

### /work

| Where | Current | New |
|---|---|---|
| Hero kicker | "Step into a collection of" | "The full portfolio — five chapters" |
| Hero headline | "ARTISTRY BORN FROM PRESENCE" | "REAL DAYS, SHOT LIKE COVER STORIES." (line breaks: REAL DAYS, / SHOT LIKE / COVER STORIES.) — the one deliberate echo of the brand line |
| Hero sub | "…photographed with intention across the Bay Area." | "…all over the Bay Area." (genre list unchanged) |
| Closing line | "A curated record of the genuine — something deep, meaningful & real." | "If it mattered to you, it'll be in the photos." |

### /weddings

| Where | Current | New |
|---|---|---|
| Hero headline | "DOCUMENTED / GRACEFULLY." | "PRESENT FOR / ALL OF IT." |
| Hero sub | "I create space for you to slow down and experience your day as it unfolds — thoughtful guidance and intentional planning, before the camera ever comes out." | "You two stay in the day — I'll make sure you get it back. The planning happens before the camera ever comes out." |
| Feature caption | "Your milestones deserve to be documented gracefully — with artistry, intention, and presence." | "The moments you'll want back, kept the way they felt." |
| Process steps 02/04 | "A personal conversation about your story, your vision, and the feelings you want to keep." / "With your date held, move forward knowing the day will be documented with artistry and intention." | Use the homepage process copy (single source): 02 "We'll get on a call — your venue, your vision, what you're nervous about, and what actually matters to you in the photos." · 04 "Date locked, plan started. From here, the photography is handled." |
| Booking line | "Currently booking 2026 weddings." | "Now booking 2026 & 2027 weddings." (matches home) |
| Marquee | "Your day, felt forever" | unchanged (already short and in-voice) |

### /experience

| Where | Current | New |
|---|---|---|
| Hero kicker | "Personalized, supportive photography for life's milestones" | "What it's like to work with me" |
| Hero sub | "More than a set of photographs — a record of how your moment truly felt, made with artistry and care." | "Here's how I make the day feel easy — and the photos feel like you." |
| Mid statement | "Whether you're celebrating a milestone, marking a new chapter, or creating something uniquely your own… I'll bring my calm, supportive demeanor and thoughtful approach. Together, we'll create an experience that's uniquely yours." | "Wedding, graduation, or something only you two would think up — I show up calm, prepared, and genuinely excited. You bring the day; I'll take care of how it's remembered." |
| Process step 03 | "No two milestones are alike…" | "No two weddings are alike…" (match home) |
| Closing kicker + headline | "Begin the experience" / "Let's create something uniquely yours." | "Ready when you are" / "Let's talk about your day." |
| Approach / What to Expect sections | — | unchanged (already in-voice) |

### /about

| Where | Current | New |
|---|---|---|
| Intro line | "Welcome — I'm genuinely glad you're here, and that you're considering trusting me with your moments." | "Welcome — I'm really glad you're here." |
| Paragraph 2 | "My work began with a simple realization — watching friends' faces light up at the images I'd made for them, I understood how much a single frame can hold: how it translates emotion, and preserves not just how a moment looked, but how it truly felt." | "This all started with watching my friends' faces light up at photos I'd made of them — that's the feeling I'm chasing for you, every time you open your gallery." (keeps the "based in San Jose" opener) |
| Paragraph 3 | "I've never confined myself to a single style. I move fluidly between light, airy frames and more editorial, atmospheric work — always in service of the authenticity of the moment rather than a formula. On set, I build a space that's calm, easy, and genuinely fun, because the finest images come from people who feel at ease. Above all, my intention is that you look and feel your absolute best, with the entire experience shaped around you." | "I don't have one singular style — I adapt from light and airy to editorial, so the photos look like you, not like my formula. Shoots with me are calm, easy, and honestly pretty fun — people at ease make the best photos. Most of all, I want you to look and feel your absolute best, with the whole experience tailored to you." |
| Gallery heading | "A range, kept authentic" | "Different styles, same feeling." |
| Gallery sub-line | "A curated record of the genuine — something deep, meaningful & real." | "Photos that feel like the day — every time you open them." |

### /inquire

| Where | Current | New |
|---|---|---|
| Hero sub | "Thank you for being here. Tell me a little about what you're envisioning — the moments, the milestone, the feeling you want to keep. Every story begins with a simple hello, and I read each inquiry personally." | "Tell me what you're planning — the venue, the vibe, the parts you're most excited about. I read every inquiry personally, and you'll hear back within 48 hours." |

### Untouched

/free-session (already in-voice), /investment collection-card copy (already
in-voice), homepage process steps and qualifiers (already in-voice), footer
taglines ("fun, stylish couples" — kept as the style-and-party flavor per
the blend decision).

## Testing

1. Home (mobile + desktop): hero sub shows the new line; testimonial
   section renders after the portfolio with photo, rule, pull-quote, body,
   attribution; no arrows (single testimonial); "For couples like you" no
   longer has an empty slot gap.
2. /investment lists the payment-plans bullet.
3. Each rewritten page renders its new copy; no page still contains
   "curated record", "gracefully", or "artistry born" (grep check).
4. Metadata: home description carries the new positioning line.
5. `npm run test` (vitest) passes; no unused-export lint errors after the
   `TestimonialSlot` deletion.
