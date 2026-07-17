# Second Wedding Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `/second-weddings` side-door landing page for Raymond's short-coverage photography packages, data-driven and consistent with the existing Lei design system.

**Architecture:** One content module (`src/content/second-weddings.ts`) holds every string and image pick; the page (`src/app/(site)/second-weddings/page.tsx`) composes existing shared blocks and tokens around that content; a small HoneyBook config module + client component provide an inquiry-form embed slot that renders a graceful placeholder until a real placement id is pasted in. No changes to the nav — the route stays reachable only by URL.

**Tech Stack:** Next.js (this repo's vendored build — **read `node_modules/next/dist/docs/` before using `Metadata`, `Script`, or `Link`**, per AGENTS.md), React, TypeScript, Vitest. Inline styles + the `data-*` animation hooks already used across the site.

## Global Constraints

- **No em dashes** (`—`, U+2014) in any new copy. Use commas, periods, or restructured phrasing. Verified by test on the new content file and a grep on the new page file.
- **First-person voice as Raymond** (I/me/my). American spelling.
- **Primary keyword** `second wedding photographer Bay Area` (and the phrase `second wedding photography`) appears in: the hero kicker, the hero subheadline (first paragraph of page copy), the opening-section kicker (a subheading), and Raymond's intro paragraph.
- **No premium comparison anywhere on the page.** No dollar figure other than the second-wedding prices may appear. Specifically: the strings `$3,000`, `$2,400`, `discount`, and `smaller budget` must never appear in the content module. The difference between products is conveyed only by the specificity of what each package delivers; the FAQ's link to the main brand is the only "bigger day?" signal.
- **Side door:** do not add the route to `Chrome` (the nav) or link it from any other page.
- **Design tokens** come from `src/components/lei/tokens.ts`: `SERIF`, `GOLD` `#B8905A`, `MUTED`, `cream()`, `ink()`, `kicker()`, `pill()`. Backgrounds alternate cream `#F7F5F2` / ink `#0E0D0B`.
- **Gold is reserved for the one conversion action** (the "Check my date" pill). Subordinate links use `SoftLink`.
- **Never fabricate a review.** The social-proof section is a candid strip; the testimonial slot stays empty (`null`) until a real one exists.

---

## Task 1: Content module + content tests

**Files:**
- Create: `src/content/second-weddings.ts`
- Test: `tests/second-weddings-content.test.ts`

**Interfaces:**
- Consumes: `Photo`, `PHOTOS`, `SARGON_ODELYA_PHOTOS` from `@/content/portfolio`.
- Produces (all imported by Task 3):
  - `META: { title: string; description: string }`
  - `HERO: { kicker: string; headline: string; subheadline: string; ctaLabel: string; image: Photo }`
  - `OPENING: { kicker: string; paragraphs: string[] }`
  - `VALUE_PROPS: { heading: string; items: { title: string; body: string }[] }`
  - `PACKAGES: { kicker: string; heading: string; items: Package[]; includesHeading: string; includes: string[]; addons: string; foundingRate: string }` where `Package = { name: string; price: string; hours: string; photographers: string; photos: string; blurb: string; popular?: boolean }`
  - `SOCIAL_PROOF: { images: Photo[]; caption: string; href: string }`
  - `TESTIMONIAL: SecondWeddingTestimonial | null` where `SecondWeddingTestimonial = { pull: string; quote: string; names: string; photo: Photo }`
  - `STEPS: { heading: string; items: { n: string; title: string; body: string }[] }`
  - `FAQ: { heading: string; items: { q: string; a: string }[] }`
  - `FINAL_CTA: { heading: string; body: string; secondaryLabel: string; secondaryHref: string }`

- [ ] **Step 1: Write the failing test**

Create `tests/second-weddings-content.test.ts`:

```ts
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  META,
  HERO,
  OPENING,
  VALUE_PROPS,
  PACKAGES,
  SOCIAL_PROOF,
  TESTIMONIAL,
  STEPS,
  FAQ,
  FINAL_CTA,
} from "@/content/second-weddings";

const SOURCE = readFileSync("src/content/second-weddings.ts", "utf8");

describe("second-weddings SEO + hero", () => {
  it("has the approved meta and headline", () => {
    expect(META.title).toBe(
      "Second Wedding Photographer | Bay Area | Lei Photography Collective"
    );
    expect(META.description).toBe(
      "Relaxed, beautiful photography for second weddings, elopements and intimate celebrations across the SF Bay Area. Short coverage, fair prices, photos in 3 weeks."
    );
    expect(HERO.headline).toBe("This time, it's about the two of you.");
    expect(HERO.ctaLabel).toBe("Check my date");
    expect(HERO.image.path.length).toBeGreaterThan(0);
    expect(HERO.image.a.length).toBeGreaterThan(0);
  });

  it("carries the primary keyword in the hero and opening subheadings", () => {
    expect(HERO.kicker.toLowerCase()).toContain("second wedding photographer");
    expect(HERO.subheadline.toLowerCase()).toContain("second wedding photography");
    expect(OPENING.kicker.toLowerCase()).toContain("second wedding photography");
  });
});

describe("second-weddings packages", () => {
  it("has exactly the three approved packages with Classic most popular", () => {
    expect(PACKAGES.items.map((p) => [p.name, p.price])).toEqual([
      ["Intimate", "$750"],
      ["Classic", "$1,150"],
      ["Full Afternoon", "$1,550"],
    ]);
    const popular = PACKAGES.items.filter((p) => p.popular);
    expect(popular).toHaveLength(1);
    expect(popular[0].name).toBe("Classic");
    for (const p of PACKAGES.items) {
      expect(p.hours.length).toBeGreaterThan(0);
      expect(p.photographers.length).toBeGreaterThan(0);
      expect(p.photos.length).toBeGreaterThan(0);
      expect(p.blurb.length).toBeGreaterThan(0);
    }
  });

  it("spells out what each package includes and the founding rate", () => {
    expect(PACKAGES.includes.length).toBeGreaterThanOrEqual(5);
    expect(PACKAGES.addons.toLowerCase()).toContain("pre-wedding session");
    expect(PACKAGES.foundingRate).toBe(
      "2026 introductory pricing. These rates rise next season."
    );
  });
});

describe("second-weddings proof, steps, faq, cta", () => {
  it("shows a candid strip and no fabricated testimonial", () => {
    expect(SOCIAL_PROOF.images.length).toBeGreaterThanOrEqual(6);
    expect(SOCIAL_PROOF.images.length).toBeLessThanOrEqual(8);
    for (const p of SOCIAL_PROOF.images) {
      expect(p.path.length).toBeGreaterThan(0);
      expect(p.a.length).toBeGreaterThan(0);
    }
    expect(SOCIAL_PROOF.href).toBe("/work");
    expect(TESTIMONIAL).toBeNull();
  });

  it("has three steps and six FAQ items, one routing to the main brand", () => {
    expect(STEPS.items).toHaveLength(3);
    expect(STEPS.items.map((s) => s.n)).toEqual(["01", "02", "03"]);
    expect(FAQ.items).toHaveLength(6);
    const routes = FAQ.items.filter((f) =>
      f.a.includes("Lei Photography Collective")
    );
    expect(routes.length).toBeGreaterThanOrEqual(1);
    expect(FINAL_CTA.secondaryHref).toBe("/work");
    expect(FINAL_CTA.heading).toBe("Ready when you are");
  });
});

describe("second-weddings guardrails", () => {
  it("contains no em dashes", () => {
    expect(SOURCE).not.toMatch(/—/);
  });

  it("never compares to the premium product or reads as a discount", () => {
    for (const banned of ["$3,000", "$2,400", "discount", "smaller budget"]) {
      expect(SOURCE.toLowerCase()).not.toContain(banned.toLowerCase());
    }
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- second-weddings-content`
Expected: FAIL — cannot resolve `@/content/second-weddings` (module does not exist yet).

- [ ] **Step 3: Create the content module**

Create `src/content/second-weddings.ts` with the complete copy below (em dashes already removed, American spelling, first person):

```ts
// Second-wedding landing page content — data-driven so the page JSX holds no
// raw copy and every swap is a one-line edit (mirrors homepage.ts). This page
// is a side door: it lives on the domain but is intentionally out of the nav.

import { PHOTOS, SARGON_ODELYA_PHOTOS, type Photo } from "@/content/portfolio";

export const META = {
  title: "Second Wedding Photographer | Bay Area | Lei Photography Collective",
  description:
    "Relaxed, beautiful photography for second weddings, elopements and intimate celebrations across the SF Bay Area. Short coverage, fair prices, photos in 3 weeks.",
};

export const HERO = {
  kicker: "Second Wedding Photographer · SF Bay Area",
  headline: "This time, it's about the two of you.",
  subheadline:
    "Relaxed second wedding photography across the San Francisco Bay Area. Short, simple coverage for intimate celebrations, from a photographer who keeps you comfortable and gets you back to your guests.",
  ctaLabel: "Check my date",
  // Swap for your strongest warm candid: a couple mid-laugh with guests around
  // them, not a posed formal. Landscape reads best full-bleed.
  image: PHOTOS.receptionEntrance,
};

export const OPENING = {
  kicker: "Bay Area second wedding photography",
  paragraphs: [
    "You've done the big wedding, or maybe you never wanted one. This time it's smaller, calmer, and exactly how you both want it. A vineyard afternoon, a courthouse and a long dinner, a backyard with the people who matter.",
    "You don't need a photographer who disappears with you for two hours of posing. You need someone who quietly captures the day as it actually happens, takes a handful of beautiful portraits without any fuss, and then gets out of the way.",
    "That's what I do. I'm Raymond, a Bay Area second wedding photographer with a fashion-trained eye and a calm, gentle way of directing, especially if being in front of a camera isn't your favorite place to be. My aim is simple: by the end of the day, you'll have forgotten I was working at all.",
  ],
};

export const VALUE_PROPS = {
  heading: "Why couples choose this",
  items: [
    {
      title: "Just enough coverage",
      body: "Two to four hours, not ten. You get the ceremony, the portraits, the toasts and the real moments, and your whole evening back.",
    },
    {
      title: "Comfortable, not posed",
      body: "Gentle direction and simple prompts, so you look like yourselves on your best day. No stiff poses, no performing. If you're camera-shy, you're exactly who I'm good with.",
    },
    {
      title: "Photos while it's still fresh",
      body: "A sneak peek within 48 hours. Your full gallery within three weeks. In writing, in your contract.",
    },
    {
      title: "Fair, clear pricing",
      body: "Three simple packages. No hidden fees, no pressure to upgrade.",
    },
  ],
};

export interface Package {
  name: string;
  price: string;
  hours: string;
  photographers: string;
  photos: string;
  blurb: string;
  popular?: boolean;
}

export const PACKAGES = {
  kicker: "Investment",
  heading: "Simple packages, honest prices",
  items: [
    {
      name: "Intimate",
      price: "$750",
      hours: "2 hours of coverage",
      photographers: "One photographer",
      photos: "Around 25 edited photos",
      blurb:
        "Your ceremony, portraits of the two of you, and the first celebrations. Perfect for courthouse weddings and small ceremonies.",
    },
    {
      name: "Classic",
      price: "$1,150",
      popular: true,
      hours: "3 hours of coverage",
      photographers: "One photographer",
      photos: "Around 40 edited photos",
      blurb:
        "Everything in Intimate, plus family groups and more of the celebration: dinner, toasts, the good candids.",
    },
    {
      name: "Full Afternoon",
      price: "$1,550",
      hours: "4 hours of coverage",
      photographers: "One photographer",
      photos: "Around 60 edited photos",
      blurb:
        "The whole story, start to finish, from getting ready through the evening.",
    },
  ] as Package[],
  includesHeading: "What every package includes",
  includes: [
    "One planning call before the day",
    "Short, candid-style portraits of the two of you (10 to 15 minutes)",
    "Standard batch editing, with consistent color across the gallery",
    "A private online gallery to share with everyone, plus print rights",
    "A sneak peek in 48 hours, your full gallery in 3 weeks",
    "Suited to intimate celebrations of up to about 50 guests, with simpler family groupings",
  ],
  addons:
    "Extra hour ($350) · heirloom album (from $450) · pre-wedding session ($400, a relaxed practice run, lovely if you're nervous in front of a camera). The engagement session and album are add-ons here, not included.",
  foundingRate: "2026 introductory pricing. These rates rise next season.",
};

export interface SecondWeddingTestimonial {
  pull: string;
  quote: string;
  names: string;
  photo: Photo;
}

// Real quotes only. Stays null until a founding-client review lands, then a
// single object replaces null and the page renders it in place of the strip.
export const TESTIMONIAL: SecondWeddingTestimonial | null = null;

export const SOCIAL_PROOF = {
  // Your strongest real candids. Swap freely; keep 6 to 8.
  images: [
    PHOTOS.marinaKiss,
    PHOTOS.receptionEntrance,
    PHOTOS.shoulderDance,
    PHOTOS.firstDanceClouds,
    PHOTOS.brideMother,
    PHOTOS.coastalCandid,
    SARGON_ODELYA_PHOTOS[22],
    SARGON_ODELYA_PHOTOS[8],
  ] as Photo[],
  caption: "Real moments, real couples. See the full portfolio",
  href: "/work",
};

export const STEPS = {
  heading: "How it works",
  items: [
    {
      n: "01",
      title: "Check your date",
      body: "Send the form below with your date, location, and a line about what you're planning. I'll reply within a day.",
    },
    {
      n: "02",
      title: "We have a short call",
      body: "Fifteen relaxed minutes. You tell me about your day, I build a simple photo timeline around it, so on the day nothing is rushed and nothing is missed.",
    },
    {
      n: "03",
      title: "Enjoy your wedding",
      body: "I arrive early, work quietly, and keep any posed photos short and painless. Sneak peek in 48 hours, full gallery within three weeks.",
    },
  ],
};

export const FAQ = {
  heading: "Questions couples ask",
  items: [
    {
      q: "Do you only photograph second weddings?",
      a: "This page is for my short-coverage packages, which suit second weddings, elopements and intimate celebrations beautifully. I also photograph full wedding days, and you'll find that work at Lei Photography Collective.",
    },
    {
      q: "We're a bit older and hate having our photo taken. Honestly, how will this go?",
      a: "You're my favorite kind of couple. My whole approach is built on gentle direction, small prompts and natural movement instead of stiff posing. Most photos happen while you're just enjoying your day. And if you'd like a practice run, the pre-wedding session exists exactly for this.",
    },
    {
      q: "Our wedding is tiny. Is it too small for a photographer?",
      a: "Not at all. Small weddings are what these packages are for. I've photographed courthouse ceremonies with six guests. The size of the wedding has nothing to do with how much the photos will mean.",
    },
    {
      q: "Do our kids and blended family fit into the photos?",
      a: "Absolutely. For many of my couples that's the most important part. On our planning call we'll list the family groupings that matter, and I make sure every one of them happens, calmly and quickly.",
    },
    {
      q: "When do we get our photos?",
      a: "A sneak peek within 48 hours, your full edited gallery within three weeks. That's a written promise, not an estimate.",
    },
    {
      q: "Where do you travel?",
      a: "Anywhere within about 50 miles of San Francisco and San Jose at no extra charge, including Napa, Half Moon Bay, Carmel and the Peninsula. Further afield, just ask.",
    },
  ],
};

export const FINAL_CTA = {
  heading: "Ready when you are",
  body: "Tell me your date and what you're planning. If I'm free, I'll hold the date while we talk. No deposit, no pressure.",
  secondaryLabel: "Prefer to browse first? See the portfolio",
  secondaryHref: "/work",
};
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- second-weddings-content`
Expected: PASS (all describe blocks green).

- [ ] **Step 5: Commit**

```bash
git add src/content/second-weddings.ts tests/second-weddings-content.test.ts
git commit -m "Add /second-weddings content module and content tests"
```

---

## Task 2: HoneyBook config + embed component

**Files:**
- Create: `src/components/lei/honeybook.ts`
- Create: `src/components/lei/HoneyBookEmbed.tsx`
- Test: `tests/honeybook.test.ts`

**Interfaces:**
- Consumes: `SERIF`, `MUTED`, `GOLD` from `./tokens`; `Script` from `next/script`.
- Produces:
  - `honeybook.ts`: `HONEYBOOK_PLACEMENT_ID: string` (default `"REPLACE_ME"`) and `isConfigured(id: string): boolean`.
  - `HoneyBookEmbed.tsx`: `default` React client component (no props). Renders the HoneyBook placement + loader when configured, otherwise a styled placeholder card with a mailto fallback.

- [ ] **Step 1: Write the failing test**

Create `tests/honeybook.test.ts` (imports only the pure config module, never the `.tsx`, so no React/Next runtime is needed):

```ts
import { describe, expect, it } from "vitest";
import { HONEYBOOK_PLACEMENT_ID, isConfigured } from "@/components/lei/honeybook";

describe("honeybook config", () => {
  it("ships unconfigured by default", () => {
    expect(HONEYBOOK_PLACEMENT_ID).toBe("REPLACE_ME");
    expect(isConfigured(HONEYBOOK_PLACEMENT_ID)).toBe(false);
  });

  it("treats a real, non-empty id as configured", () => {
    expect(isConfigured("abc123")).toBe(true);
    expect(isConfigured("")).toBe(false);
    expect(isConfigured("   ")).toBe(false);
    expect(isConfigured("REPLACE_ME")).toBe(false);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- honeybook`
Expected: FAIL — cannot resolve `@/components/lei/honeybook`.

- [ ] **Step 3: Create the config module**

Create `src/components/lei/honeybook.ts`:

```ts
/* HoneyBook inquiry-form embed configuration.
 *
 * TO ACTIVATE THE FORM:
 *   1. In HoneyBook go to Tools → Contact Form (or Booking widget) → "Embed on
 *      your website". HoneyBook gives you a snippet containing a div like
 *      <div class="hb-p-XXXXXXXXXXXX-2"></div>.
 *   2. Copy the id between "hb-p-" and "-2" (the XXXX… part).
 *   3. Paste it as HONEYBOOK_PLACEMENT_ID below, replacing "REPLACE_ME".
 * Until you do, the page shows a tasteful placeholder card with your email so
 * the section is never broken or empty. */
export const HONEYBOOK_PLACEMENT_ID = "REPLACE_ME";

/** True once a real placement id has been set (not blank, not the default). */
export function isConfigured(id: string): boolean {
  return id.trim().length > 0 && id !== "REPLACE_ME";
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- honeybook`
Expected: PASS.

- [ ] **Step 5: Create the embed component**

First, **read `node_modules/next/dist/docs/`** for the current `next/script` guidance in this Next build. Then create `src/components/lei/HoneyBookEmbed.tsx`:

```tsx
"use client";

import Script from "next/script";
import { SERIF, MUTED, GOLD } from "./tokens";
import { HONEYBOOK_PLACEMENT_ID, isConfigured } from "./honeybook";

/* Renders the HoneyBook inquiry form once a placement id is configured in
   honeybook.ts. Until then it renders a neutral placeholder card so the
   "Ready when you are" section always looks intentional. If HoneyBook gives
   you a snippet whose markup differs from the div + controller script below,
   paste its exact <div class="hb-p-…"> and <script src="…"> here instead. */
export default function HoneyBookEmbed() {
  if (!isConfigured(HONEYBOOK_PLACEMENT_ID)) {
    return (
      <div
        style={{
          maxWidth: 560,
          margin: "0 auto",
          textAlign: "center",
          padding: "56px 28px",
          background: "#FFFFFF",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
        }}
      >
        <div style={{ color: GOLD, letterSpacing: ".4em", fontSize: 12, marginBottom: 18 }}>
          ★ ★ ★
        </div>
        <h3
          style={{
            margin: 0,
            fontFamily: SERIF,
            fontWeight: 500,
            fontSize: "clamp(24px,4vw,32px)",
          }}
        >
          Let&rsquo;s check your date
        </h3>
        <p style={{ maxWidth: 400, margin: "12px auto 20px", color: MUTED, lineHeight: 1.7 }}>
          Email me your date, location, and a line about what you&rsquo;re
          planning, and I&rsquo;ll reply within a day.
        </p>
        <a
          href="mailto:leiphotography57@gmail.com?subject=Second%20wedding%20date%20check"
          data-hover=""
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: ".16em",
            textTransform: "uppercase",
            color: "#0E0D0B",
            textDecoration: "underline",
            textUnderlineOffset: 5,
            textDecorationColor: "rgba(184,144,90,.55)",
          }}
        >
          leiphotography57@gmail.com
        </a>
      </div>
    );
  }

  return (
    <>
      <Script id="hb-config" strategy="afterInteractive">
        {`window._HB_ = window._HB_ || {}; window._HB_.pid = "${HONEYBOOK_PLACEMENT_ID}";`}
      </Script>
      <Script
        id="hb-controller"
        strategy="afterInteractive"
        src="https://widget.honeybook.com/assets_users_production/websiteplacements/placement-controller.min.js"
      />
      <div className={`hb-p-${HONEYBOOK_PLACEMENT_ID}-2`} />
    </>
  );
}
```

- [ ] **Step 6: Verify it compiles**

Run: `npx tsc --noEmit -p tsconfig.json`
Expected: no errors referencing `HoneyBookEmbed.tsx` or `honeybook.ts`.
(If the repo has no standalone tsconfig typecheck, defer this to the Task 3 build step.)

- [ ] **Step 7: Commit**

```bash
git add src/components/lei/honeybook.ts src/components/lei/HoneyBookEmbed.tsx tests/honeybook.test.ts
git commit -m "Add HoneyBook embed slot with graceful placeholder for /second-weddings"
```

---

## Task 3: The `/second-weddings` page

**Files:**
- Create: `src/app/(site)/second-weddings/page.tsx`

**Interfaces:**
- Consumes: everything from `@/content/second-weddings` (Task 1); `HoneyBookEmbed` default export (Task 2); `LeiPage`, `Chrome`, `LeiFooter`, `ProcessSteps`, `SoftLink`; tokens `GOLD`, `MUTED`, `SERIF`, `cream`, `ink`, `kicker`, `pill`; `img` from `@/content/portfolio`.
- Produces: the route `/second-weddings`. Not linked anywhere (side door).

- [ ] **Step 1: Read the vendored Next docs**

**Read `node_modules/next/dist/docs/`** for the current `Metadata` export and `Link`/`Script` usage in this build before writing the page (AGENTS.md: this Next has breaking changes).

- [ ] **Step 2: Create the page**

Create `src/app/(site)/second-weddings/page.tsx`:

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import LeiPage from "@/components/lei/LeiPage";
import Chrome from "@/components/lei/Chrome";
import LeiFooter from "@/components/lei/LeiFooter";
import HoneyBookEmbed from "@/components/lei/HoneyBookEmbed";
import { ProcessSteps } from "@/components/lei/blocks";
import { SoftLink } from "@/components/lei/Cta";
import { GOLD, MUTED, SERIF, cream, ink, kicker, pill } from "@/components/lei/tokens";
import { img } from "@/content/portfolio";
import {
  META,
  HERO,
  OPENING,
  VALUE_PROPS,
  PACKAGES,
  SOCIAL_PROOF,
  STEPS,
  FAQ,
  FINAL_CTA,
} from "@/content/second-weddings";

export const metadata: Metadata = {
  title: META.title,
  description: META.description,
};

export default function SecondWeddingsPage() {
  return (
    <LeiPage>
      <Chrome />

      {/* ══ Hero — full-bleed warm candid + dark gradient ══ */}
      <section
        style={{
          position: "relative",
          minHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 6vw 9vh",
          overflow: "hidden",
          background: "#171411",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img(HERO.image.path, 2000)}
          alt={HERO.image.a}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(14,13,11,.86) 0%, rgba(14,13,11,.35) 55%, rgba(14,13,11,.5) 100%)",
          }}
        />
        <div style={{ position: "relative", zIndex: 2, color: "#F7F5F2", maxWidth: 780 }}>
          <div data-fadeup="" style={kicker({ marginBottom: "3vh" }, 11, ".34em")}>
            {HERO.kicker}
          </div>
          <h1
            data-title-line=""
            style={{
              margin: 0,
              fontFamily: SERIF,
              fontWeight: 500,
              fontSize: "clamp(38px,7vw,92px)",
              lineHeight: 1.02,
              letterSpacing: ".01em",
              textWrap: "pretty",
            }}
          >
            {HERO.headline}
          </h1>
          <p
            data-fadeup=""
            style={{
              maxWidth: 620,
              margin: "4vh 0 0",
              fontSize: 16,
              lineHeight: 1.8,
              color: cream(0.85),
            }}
          >
            {HERO.subheadline}
          </p>
          <div data-fadeup="" style={{ marginTop: "4vh" }}>
            <a href="#inquire" data-mag="" data-hover="" style={pill(GOLD, "#0E0D0B")}>
              {HERO.ctaLabel}
            </a>
          </div>
        </div>
      </section>

      {/* ══ Opening "you" block ══ */}
      <section style={{ position: "relative", background: "#F7F5F2", color: "#0E0D0B", padding: "18vh 6vw" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div data-fadeup="" style={{ ...kicker({}, 10, ".3em"), display: "block", marginBottom: 26 }}>
            {OPENING.kicker}
          </div>
          {OPENING.paragraphs.map((p, i) => (
            <p
              key={i}
              data-fadeup=""
              style={{
                margin: i === 0 ? "0 0 22px" : "0 0 22px",
                fontFamily: i === 0 ? SERIF : undefined,
                fontSize: i === 0 ? "clamp(22px,2.6vw,32px)" : 17,
                fontWeight: i === 0 ? 500 : undefined,
                lineHeight: i === 0 ? 1.35 : 1.85,
                color: i === 0 ? "#0E0D0B" : MUTED,
                textWrap: "pretty",
              }}
            >
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* ══ Why couples choose this — value props ══ */}
      <section style={{ position: "relative", background: "#0E0D0B", color: "#F7F5F2", padding: "16vh 6vw" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2
            data-fadeup=""
            style={{
              margin: "0 0 8vh",
              textAlign: "center",
              fontFamily: SERIF,
              fontWeight: 500,
              fontSize: "clamp(30px,4.4vw,52px)",
            }}
          >
            {VALUE_PROPS.heading}
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "3vw",
            }}
          >
            {VALUE_PROPS.items.map((v) => (
              <div
                key={v.title}
                data-step=""
                style={{ borderTop: `1px solid ${cream(0.14)}`, paddingTop: 26 }}
              >
                <h3 style={{ margin: "0 0 12px", fontFamily: SERIF, fontWeight: 600, fontSize: 22, lineHeight: 1.25 }}>
                  {v.title}
                </h3>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.75, color: cream(0.65) }}>
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Packages ══ */}
      <section style={{ position: "relative", background: "#F7F5F2", color: "#0E0D0B", padding: "16vh 6vw" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "7vh" }}>
            <div data-fadeup="" style={{ ...kicker({}, 10, ".3em"), display: "block", marginBottom: 16 }}>
              {PACKAGES.kicker}
            </div>
            <h2
              data-fadeup=""
              style={{ margin: 0, fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(30px,4.6vw,56px)" }}
            >
              {PACKAGES.heading}
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "2vw",
              alignItems: "start",
            }}
          >
            {PACKAGES.items.map((p) => (
              <div
                key={p.name}
                data-fadeup=""
                style={{
                  position: "relative",
                  background: "#FFFFFF",
                  border: p.popular ? `1px solid ${GOLD}` : "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "40px 30px",
                }}
              >
                {p.popular && (
                  <div
                    style={{
                      position: "absolute",
                      top: -12,
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: GOLD,
                      color: "#0E0D0B",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: ".2em",
                      textTransform: "uppercase",
                      padding: "6px 14px",
                      borderRadius: 999,
                      whiteSpace: "nowrap",
                    }}
                  >
                    Most popular
                  </div>
                )}
                <h3 style={{ margin: "0 0 6px", fontFamily: SERIF, fontWeight: 600, fontSize: 26 }}>
                  {p.name}
                </h3>
                <div style={{ fontFamily: SERIF, fontSize: 34, color: GOLD, marginBottom: 20 }}>
                  {p.price}
                </div>
                <ul style={{ listStyle: "none", margin: "0 0 20px", padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {[p.hours, p.photographers, p.photos].map((line) => (
                    <li key={line} style={{ fontSize: 14, fontWeight: 600, letterSpacing: ".04em", color: "#0E0D0B" }}>
                      {line}
                    </li>
                  ))}
                </ul>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: MUTED }}>{p.blurb}</p>
              </div>
            ))}
          </div>

          {/* what every package includes */}
          <div style={{ maxWidth: 760, margin: "7vh auto 0" }}>
            <h3
              data-fadeup=""
              style={{ margin: "0 0 20px", fontFamily: SERIF, fontWeight: 600, fontSize: 22, textAlign: "center" }}
            >
              {PACKAGES.includesHeading}
            </h3>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {PACKAGES.includes.map((line) => (
                <li key={line} data-fadeup="" style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
                  <span style={{ color: GOLD, fontSize: 12, flexShrink: 0 }}>★</span>
                  <span style={{ fontSize: 15, lineHeight: 1.7, color: MUTED }}>{line}</span>
                </li>
              ))}
            </ul>
            <p data-fadeup="" style={{ margin: "26px 0 0", fontSize: 14, lineHeight: 1.7, color: MUTED, textAlign: "center" }}>
              {PACKAGES.addons}
            </p>
            <p
              data-fadeup=""
              style={{
                margin: "18px 0 0",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                textAlign: "center",
                color: GOLD,
              }}
            >
              {PACKAGES.foundingRate}
            </p>
          </div>
        </div>
      </section>

      {/* ══ Social proof — candid strip ══ */}
      <section style={{ position: "relative", background: "#F7F5F2", padding: "0 6vw 16vh" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "1.4vw",
            }}
          >
            {SOCIAL_PROOF.images.map((p) => (
              <div key={p.path} data-fadeup="" style={{ overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img(p.path, 600)}
                  alt={p.a}
                  loading="lazy"
                  style={{ width: "100%", aspectRatio: "4 / 5", objectFit: "cover", display: "block" }}
                />
              </div>
            ))}
          </div>
          <div data-fadeup="" style={{ marginTop: "5vh", textAlign: "center" }}>
            <SoftLink href={SOCIAL_PROOF.href} label={SOCIAL_PROOF.caption} />
          </div>
        </div>
      </section>

      {/* ══ How it works ══ */}
      <section style={{ position: "relative", background: "#0E0D0B", color: "#F7F5F2" }}>
        <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto", paddingTop: "16vh" }}>
          <h2 data-fadeup="" style={{ margin: 0, fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(30px,5vw,48px)" }}>
            {STEPS.heading}
          </h2>
        </div>
        <ProcessSteps steps={STEPS.items} />
      </section>

      {/* ══ FAQ ══ */}
      <section style={{ position: "relative", background: "#F7F5F2", color: "#0E0D0B", padding: "16vh 6vw" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <h2
            data-fadeup=""
            style={{ margin: "0 0 6vh", fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(30px,4.4vw,52px)", textAlign: "center" }}
          >
            {FAQ.heading}
          </h2>
          <div>
            {FAQ.items.map((f) => (
              <details
                key={f.q}
                data-fadeup=""
                style={{ borderTop: `1px solid ${ink(0.14)}`, padding: "24px 0" }}
              >
                <summary
                  style={{
                    cursor: "pointer",
                    listStyle: "none",
                    fontFamily: SERIF,
                    fontWeight: 500,
                    fontSize: "clamp(19px,2.2vw,26px)",
                    lineHeight: 1.3,
                  }}
                >
                  {f.q}
                </summary>
                <p style={{ margin: "16px 0 0", fontSize: 16, lineHeight: 1.8, color: MUTED }}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Ready when you are — final CTA + HoneyBook slot ══ */}
      <section
        id="inquire"
        style={{ position: "relative", background: "#0E0D0B", color: "#F7F5F2", padding: "16vh 6vw 12vh" }}
      >
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <h2 data-fadeup="" style={{ margin: 0, fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(34px,5vw,62px)" }}>
            {FINAL_CTA.heading}
          </h2>
          <p data-fadeup="" style={{ maxWidth: 480, margin: "22px auto 6vh", fontSize: 16, lineHeight: 1.8, color: cream(0.72) }}>
            {FINAL_CTA.body}
          </p>
          <div data-fadeup="">
            <HoneyBookEmbed />
          </div>
          <div data-fadeup="" style={{ marginTop: "5vh" }}>
            <SoftLink href={FINAL_CTA.secondaryHref} label={FINAL_CTA.secondaryLabel} dark />
          </div>
        </div>
      </section>

      {/* ══ Footer ══ */}
      <section style={{ position: "relative", background: "#0E0D0B", color: "#F7F5F2", padding: "0 38px" }}>
        <LeiFooter border={false} />
      </section>
    </LeiPage>
  );
}
```

- [ ] **Step 3: Verify the page has no em dashes and is not in the nav**

Run:
```bash
grep -c $'—' "src/app/(site)/second-weddings/page.tsx"   # expected: 0
grep -rn "second-weddings" "src/components/lei/Chrome.tsx"     # expected: no output (not in nav)
```
Expected: em-dash count `0`; no match in `Chrome.tsx`.

- [ ] **Step 4: Build to verify the page compiles and renders**

Run: `npm run build`
Expected: build succeeds and the route `/second-weddings` appears in Next's route list with no type or lint errors.

- [ ] **Step 5: Drive the page in the live preview (verification skill)**

Use the `shipstudio-preview` MCP tools:
- `preview_navigate` to `/second-weddings`.
- `preview_console` — expect no runtime errors.
- `preview_screenshot` — confirm: hero headline + gold "Check my date" pill; opening paragraphs; four value props; three package cards with "Most popular" on Classic; the includes list + founding-rate line; the candid strip + portfolio link; three process steps; FAQ items expand on click (`preview_click` a `<summary>`); the "Ready when you are" section shows the HoneyBook placeholder card (email fallback) since the id is `REPLACE_ME`; footer renders.
- Clicking "Check my date" scrolls to the `#inquire` section.

- [ ] **Step 6: Run the full test suite**

Run: `npm test`
Expected: all suites pass (existing + the two new ones).

- [ ] **Step 7: Commit**

```bash
git add "src/app/(site)/second-weddings/page.tsx"
git commit -m "Add /second-weddings landing page"
```

---

## Self-Review (completed during authoring)

**Spec coverage:** SEO/meta → Task 1 `META` + Task 3 `metadata`. Hero → Task 3 hero section + Task 1 `HERO`. Opening block, value props, packages (+ includes, add-ons, founding rate), social-proof strip (no fabricated review), how-it-works, FAQ (with brand routing), final CTA → Task 1 content + Task 3 sections. HoneyBook embed slot with placeholder → Task 2. No-em-dash + no-premium-comparison guardrails → Task 1 tests. Side-door / not-in-nav → Task 3 Step 3. All spec sections map to a task.

**Placeholder scan:** No TBD/TODO; every code step contains complete content.

**Type consistency:** `Package`, `SecondWeddingTestimonial`, and all exported constant shapes used in Task 3 match their Task 1 definitions; `STEPS.items` matches `ProcessSteps`'s `{ n, title, body }[]` prop; `isConfigured`/`HONEYBOOK_PLACEMENT_ID` names are identical across Tasks 2 and 3.

## Out of scope

- Wiring a real HoneyBook form (Raymond pastes his placement id into `honeybook.ts`).
- Adding the route to the main nav.
- Real client reviews (the `TESTIMONIAL` slot stays `null`).
- New photography assets (existing portfolio candids used, with swap comments).
- Removing em dashes from the pre-existing rest of the site (separate cleanup if ever wanted).
