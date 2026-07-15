# Homepage Portfolio Refocus & Voice Pass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make an inline wedding portfolio the homepage centerpiece (replacing the Collection doors and Recent Weddings sections), add a full-bleed marina image band, and hold all site copy to the I-as-setup → you-as-payoff voice rule.

**Architecture:** Static Next.js App Router pages, inline styles from shared tokens, scroll animation via global `data-*` motion hooks. Gallery content is a typed `WEDDING_PORTFOLIO` array in `src/content/homepage.ts` rendered by a new homepage section; photos are Squarespace-CDN paths or pre-sized local JPEGs in `public/images/`. The voice pass edits JSX copy in place, page by page.

**Tech Stack:** Next.js 16.2.9, React 19, TypeScript, vitest 4. No new dependencies.

**Spec:** `docs/superpowers/specs/2026-07-15-homepage-portfolio-refocus-design.md`

## Global Constraints

- **Read the docs first:** read the relevant guides in `node_modules/next/dist/docs/` before writing page code (per `AGENTS.md`); existing pages under `src/app/(site)/` are the known-good conventions.
- **CTA hierarchy is law:** gold pill (`CtaLink`) = inquire, the only gold action. The new gallery section contains NO gold pill; its only action is `SoftLink` ("View the full portfolio" → `/work`).
- **Fixed copy (never change in this plan):** `POSITIONING`, `POSITIONING_SUB`, `CTA_LABEL`, `SECONDARY_CTA_LABEL`, `SECONDARY_CTA_HREF`, `QUALIFIERS`, `PROCESS`/`HOME_PROCESS`, and every tier name/price/blurb in `src/content/pricing.ts`. These are test-pinned approved copy.
- **Voice rule (all copy this plan touches or writes):** "I" as setup, "you" as payoff; heroes/headlines lean "you"; body copy pairs I→you; About may run ~60/40 "I"; no self-praise anywhere.
- **Typographic characters are load-bearing:** verify by codepoint, never by eyeball or grep-count, whenever copy moves or is written (em-dash U+2014, curly quotes U+201C/U+201D, apostrophe U+2019 where the neighboring copy in the same file uses it).
- **Motion:** existing hooks only (`data-fadeup`, `data-reveal`, `data-band`); no changes to `src/lib/lei/motion.ts`.
- **Verification commands:** `npm test` and `npm run build` must pass at every commit.
- **Branch:** all work on `portfolio-refocus`, created in Task 1.

---

### Task 1: Marina band — image asset + full-bleed section

**Files:**
- Create: `public/images/bay-area-wedding-marina-boardwalk-golden-hour-lei-photography-collective.jpg`
- Modify: `src/content/portfolio.ts` (PHOTOS map, after the `firstDanceClouds` entry)
- Modify: `src/app/(site)/page.tsx` (insert one section between `{/* ══ Who I photograph ══ */}`'s closing `</section>` and `{/* ══ You're here because… ══ */}`)

**Interfaces:**
- Consumes: existing `img()` helper (local paths pass through), `PHOTOS` map, `data-band` motion hook (used identically on the experience page's full-bleed band).
- Produces: `PHOTOS.marinaBoardwalk` (`Photo` with local path). No later task depends on it.

- [ ] **Step 1: Create the branch**

```bash
git checkout -b portfolio-refocus
```

- [ ] **Step 2: Resize the source image**

Run in PowerShell (source is ~7000px; target 1920px wide, JPEG q82):

```powershell
Add-Type -AssemblyName System.Drawing; $src = [System.Drawing.Image]::FromFile("D:\Export\Project Folders\Weddings\Miranda & Danny\Lei Photography Collective - Miranda & Danny-4.jpg"); $w = 1920; $h = [int]($src.Height * $w / $src.Width); $bmp = New-Object System.Drawing.Bitmap($w, $h); $g = [System.Drawing.Graphics]::FromImage($bmp); $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic; $g.SmoothingMode = "HighQuality"; $g.PixelOffsetMode = "HighQuality"; $g.DrawImage($src, 0, 0, $w, $h); $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }; $ep = New-Object System.Drawing.Imaging.EncoderParameters(1); $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]82); $out = "C:\Users\raymo\ShipStudio\photohome\public\images\bay-area-wedding-marina-boardwalk-golden-hour-lei-photography-collective.jpg"; $bmp.Save($out, $codec, $ep); $g.Dispose(); $bmp.Dispose(); $src.Dispose(); "{0:N0} bytes" -f (Get-Item $out).Length
```

Expected: file created, roughly 200–450 KB.

- [ ] **Step 3: Add the PHOTOS entry**

In `src/content/portfolio.ts`, directly after the `firstDanceClouds` entry, add:

```ts
  marinaBoardwalk: { path: "/images/bay-area-wedding-marina-boardwalk-golden-hour-lei-photography-collective.jpg", a: "Bride and groom on the marina boardwalk at golden hour, sailboat masts behind them", r: "l" },
```

- [ ] **Step 4: Insert the band section**

In `src/app/(site)/page.tsx`, directly after the "Who I photograph" section's closing `</section>` and before `{/* ══ You're here because… ══ */}`, insert (treatment copied from the experience page's full-bleed band):

```tsx
      {/* ══ Marina band — full-bleed breather ══ */}
      <section style={{ position: "relative", height: "90vh", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          data-band=""
          src={img(PHOTOS.marinaBoardwalk.path, 2000)}
          alt={PHOTOS.marinaBoardwalk.a}
          loading="lazy"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: "scale(1.16)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top,rgba(14,13,11,.5),rgba(14,13,11,0) 55%)",
          }}
        />
      </section>
```

No import changes needed (`img`, `PHOTOS` already imported).

- [ ] **Step 5: Verify tests and build**

Run: `npm test` — Expected: all pass (no content tests touch this).
Run: `npm run build` — Expected: success.

- [ ] **Step 6: Commit**

```bash
git add public/images/bay-area-wedding-marina-boardwalk-golden-hour-lei-photography-collective.jpg src/content/portfolio.ts "src/app/(site)/page.tsx"
git commit -m "Add full-bleed marina band between Who-I-photograph and qualifiers"
```

---

### Task 2: `WEDDING_PORTFOLIO` data model (TDD)

**Files:**
- Modify: `src/content/homepage.ts` (add interface + export at the end of the file)
- Test: `tests/homepage-content.test.ts` (new describe block appended)

**Interfaces:**
- Consumes: `Photo`, `PHOTOS`, `SARGON_ODELYA_PHOTOS` (all already imported in `homepage.ts`).
- Produces: `PortfolioRow { layout: "full" | "pair"; photos: Photo[] }` and `WEDDING_PORTFOLIO: PortfolioRow[]`. Task 3 imports both names from `@/content/homepage`.

- [ ] **Step 1: Write the failing test**

Append to `tests/homepage-content.test.ts` (add `WEDDING_PORTFOLIO` to the existing `@/content/homepage` import):

```ts
describe("wedding portfolio", () => {
  it("has valid row shapes: 1 photo per full, 2 per pair, all with path+alt", () => {
    expect(WEDDING_PORTFOLIO.length).toBeGreaterThanOrEqual(1);
    for (const row of WEDDING_PORTFOLIO) {
      expect(["full", "pair"]).toContain(row.layout);
      expect(row.photos).toHaveLength(row.layout === "full" ? 1 : 2);
      for (const p of row.photos) {
        expect(p.path.length).toBeGreaterThan(0);
        expect(p.a.length).toBeGreaterThan(0);
      }
    }
  });

  it("holds 10-14 photos (spec: homepage centerpiece density)", () => {
    const count = WEDDING_PORTFOLIO.reduce((n, r) => n + r.photos.length, 0);
    expect(count).toBeGreaterThanOrEqual(10);
    expect(count).toBeLessThanOrEqual(14);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — `WEDDING_PORTFOLIO` is not exported. All other tests still pass.

- [ ] **Step 3: Add the model and seed**

Append to `src/content/homepage.ts`:

```ts
export interface PortfolioRow {
  layout: "full" | "pair";
  photos: Photo[]; // 1 photo for "full", 2 for "pair"
}

/** The homepage wedding gallery — the page's centerpiece. Seeded with the
 *  strongest existing selects; Raymond swaps rows as new selects arrive.
 *  Swapping a photo is a one-line edit; the section renders whatever's here. */
export const WEDDING_PORTFOLIO: PortfolioRow[] = [
  { layout: "full", photos: [PHOTOS.receptionEntrance] },
  { layout: "pair", photos: [SARGON_ODELYA_PHOTOS[8], PHOTOS.marinaKiss] },
  { layout: "full", photos: [PHOTOS.danceLift] },
  { layout: "pair", photos: [SARGON_ODELYA_PHOTOS[2], PHOTOS.ringsEmbrace] },
  { layout: "full", photos: [PHOTOS.firstDance04] },
  { layout: "pair", photos: [SARGON_ODELYA_PHOTOS[21], PHOTOS.shoulderDance] },
  { layout: "pair", photos: [SARGON_ODELYA_PHOTOS[19], PHOTOS.firstDanceClouds] },
  { layout: "full", photos: [PHOTOS.sargonPrep] },
];
```

(13 photos across 8 rows. `SARGON_ODELYA_PHOTOS` indices per the curated-set comments in `src/content/portfolio.ts:125-139`: 8 = veil at golden hour, 2 = bride & mother black-and-white, 21 = champagne spray, 19 = walking hand in hand.)

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS — all files green.

- [ ] **Step 5: Commit**

```bash
git add src/content/homepage.ts tests/homepage-content.test.ts
git commit -m "Add WEDDING_PORTFOLIO content model with seed rows"
```

---

### Task 3: Wedding Portfolio section replaces Collection doors + Recent Weddings

**Files:**
- Modify: `src/app/(site)/page.tsx` — delete two sections, insert one, adjust imports

**Interfaces:**
- Consumes: `WEDDING_PORTFOLIO` (Task 2), `SoftLink` (existing, `{ href, label, dark?, style? }`), `img`, `kicker`, `SERIF`.
- Produces: nothing downstream.

- [ ] **Step 1: Delete the two sections**

In `src/app/(site)/page.tsx`, delete entirely:
1. The section starting at `{/* ══ The Collection — four category doors ══ */}` through its closing `</section>` (the block rendering `DOORS.map(...)`).
2. The section starting at `{/* ══ Recent weddings — proof of consistency ══ */}` through its closing `</section>` (the block rendering `RECENT_WEDDINGS.map(...)` and `<TestimonialSlot index={1} />`).

- [ ] **Step 2: Insert the gallery section**

Where the Collection doors section was (directly after the "You're here because…" section's closing `</section>`, before `{/* ══ About ══ */}`), insert:

```tsx
      {/* ══ The Wedding Portfolio — the proof, inline ══ */}
      <section
        style={{
          position: "relative",
          background: "#0E0D0B",
          color: "#F7F5F2",
          padding: "16vh 6vw",
        }}
      >
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <div data-fadeup="" style={kicker({ marginBottom: 18 }, 10, ".3em")}>
            The Portfolio
          </div>
          <h2
            data-fadeup=""
            style={{
              margin: "0 0 7vh",
              fontFamily: SERIF,
              fontWeight: 500,
              fontSize: "clamp(34px,4.4vw,58px)",
              lineHeight: 1.08,
              textWrap: "pretty",
            }}
          >
            Your day, the way it actually <em>felt.</em>
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "2.4vw" }}>
            {WEDDING_PORTFOLIO.map((row, i) =>
              row.layout === "full" ? (
                <div
                  key={row.photos[0].path}
                  data-reveal=""
                  style={{ overflow: "hidden" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img(row.photos[0].path, 1500)}
                    alt={row.photos[0].a}
                    loading={i === 0 ? undefined : "lazy"}
                    style={{
                      width: "100%",
                      aspectRatio: "16 / 10",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              ) : (
                <div
                  key={row.photos[0].path}
                  className="lx-grid-2col"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "2.4vw",
                  }}
                >
                  {row.photos.map((p) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={p.path}
                      data-fadeup=""
                      src={img(p.path, 750)}
                      alt={p.a}
                      loading="lazy"
                      style={{
                        width: "100%",
                        aspectRatio: "4 / 5",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  ))}
                </div>
              )
            )}
          </div>
          <div
            data-fadeup=""
            style={{ marginTop: "7vh", display: "flex", justifyContent: "center" }}
          >
            <SoftLink href="/work" label="View the full portfolio" dark />
          </div>
        </div>
      </section>
```

- [ ] **Step 3: Adjust imports**

In `src/app/(site)/page.tsx`:
- Portfolio import: remove `aspect` (only Recent Weddings used it) → `import { img, PHOTOS } from "@/content/portfolio";`
- Homepage import: remove `DOORS` and `RECENT_WEDDINGS`, add `WEDDING_PORTFOLIO` → `import { CITY, HERO_MOBILE, POSITIONING, WEDDING_PORTFOLIO } from "@/content/homepage";`
- Cta import unchanged (`TestimonialSlot` is still used at index 0 in "Who I photograph"; `SoftLink` already imported).
- `Link` from `next/link` is still used (hero CTA, About, footer areas) — leave it.

- [ ] **Step 4: Verify tests, build, and render**

Run: `npm test` — Expected: PASS (DOORS/RECENT_WEDDINGS tests still pass — the exports remain in the content module).
Run: `npm run build` — Expected: success; no unused-import or missing-name type errors.
In `npm run dev`: homepage order is hero → manifesto → Who I photograph → marina band → You're here because → The Portfolio (8 rows, ending "View the full portfolio →" linking to `/work`) → About. No doors grid, no Recent Weddings anywhere on the page. Gold pills on the page: hero lockup, mobile hero, Who I photograph, Investment section, Inquire card — and none inside the gallery.

- [ ] **Step 5: Commit**

```bash
git add "src/app/(site)/page.tsx"
git commit -m "Replace Collection doors and Recent Weddings with inline Wedding Portfolio"
```

---

### Task 4: Voice pass — homepage

**Files:**
- Modify: `src/app/(site)/page.tsx` (JSX copy only)

**Interfaces:** none produced. The voice rule and fixed-copy list are in Global Constraints.

- [ ] **Step 1: Audit and rewrite**

Read every user-visible string in `src/app/(site)/page.tsx` top to bottom and apply the rule:

- **Headlines** (h1/h2 and kickers): must lean "you". Already passing (leave verbatim): "Your wedding, shot like the cover story it is." (mobile hero), "You two are the story…", "Your day, the way it actually felt.", "Where would you like to begin?" is gone with the doors. Check the rest.
- **Body copy**: every sentence containing "I"/"my"/"me" needs a "you" payoff in the same or an adjacent sentence. Rewrite minimally — keep length, tone, and typographic characters.

Two known failing spots and their fixes (apply exactly):

1. About section, first paragraph — currently ends inward ("…how powerful a single frame can be."). Replace the paragraph text with:

> I&rsquo;m Raymond &mdash; a photographer based in San Jose, California. My love for photography began when I saw my friends&rsquo; faces light up at the images I&rsquo;d made for them &mdash; the same feeling I want you to have every time you open your gallery.

2. About section, second paragraph — currently "Most of all, I want you to look and feel your absolute best…" already pays off with "you"; keep, but tighten the opening clause to pair: replace "I don&rsquo;t have one singular style &mdash; I adapt from light and airy to editorial while keeping the moment authentic." with:

> I don&rsquo;t have one singular style &mdash; I adapt from light and airy to editorial, so the photos look like you, not like my formula.

Anything else that fails the rule: rewrite in the same spirit. Anything that passes: leave byte-identical. Do not touch the fixed-copy constants or anything rendered from content modules.

- [ ] **Step 2: Verify**

Run: `npm test` — Expected: PASS (pinned constants untouched).
Run: `npm run build` — Expected: success.
Self-check: list each changed sentence in the commit body or report; for each, name the I-setup and the you-payoff.

- [ ] **Step 3: Commit**

```bash
git add "src/app/(site)/page.tsx"
git commit -m "Voice pass: homepage copy pairs I-setup with you-payoff"
```

---

### Task 5: Voice pass — experience, weddings, work

**Files:**
- Modify: `src/app/(site)/experience/page.tsx`, `src/app/(site)/weddings/page.tsx`, `src/app/(site)/work/page.tsx` (JSX copy only)

**Interfaces:** none.

- [ ] **Step 1: Audit and rewrite each page**

Same method as Task 4: headlines lean "you"; body sentences with "I" pair to a "you" payoff in the same or adjacent sentence; passing copy stays byte-identical; fixed constants and content-module copy (`QUALIFIERS`, `PROCESS`) untouched.

Known reference points on these pages (already passing — leave them): experience "You don&rsquo;t have to be good in photos. You just need someone who knows how to get you there."; experience What-to-Expect "I direct when you need it, and disappear when you don&rsquo;t."

Watch for on these pages: statement/manifesto blocks that describe the work without addressing the reader, and gallery intro paragraphs that run pure-"I". Metadata `description` strings are in scope where a minimal rewrite adds the pairing without dropping SEO anchors (`CITY`, "wedding photography").

- [ ] **Step 2: Verify**

Run: `npm test` then `npm run build` — Expected: both pass.
Report each changed sentence with its I-setup → you-payoff, per page.

- [ ] **Step 3: Commit**

```bash
git add "src/app/(site)/experience/page.tsx" "src/app/(site)/weddings/page.tsx" "src/app/(site)/work/page.tsx"
git commit -m "Voice pass: experience, weddings, work pages"
```

---

### Task 6: Voice pass — about, investment, free-session, inquire

**Files:**
- Modify: `src/app/(site)/about/page.tsx`, `src/app/(site)/investment/page.tsx`, `src/app/(site)/free-session/page.tsx`, `src/app/(site)/inquire/page.tsx` (JSX copy only; for free-session also `src/components/lei/FreeSessionForm.tsx` if it carries visible copy)

**Interfaces:** none.

- [ ] **Step 1: Audit and rewrite each page**

Same method, with one calibration difference: **the About page may run ~60/40 "I"** — it's where visitors want to hear about Raymond. Long "I" passages are fine there as long as sections still land on what it means for the reader. Investment page: tier copy comes from `src/content/pricing.ts` and is fixed; only the hero lede, section headers, and closing CTA copy are auditable (the closing "Every collection can be tailored — tell me about your day." already pairs; leave it). Form pages (free-session, inquire): microcopy, labels, and confirmation text are in scope; keep labels short — the rule applies to sentences, not single-word labels.

- [ ] **Step 2: Verify**

Run: `npm test` then `npm run build` — Expected: both pass.
Report each changed sentence with its I-setup → you-payoff, per page.

- [ ] **Step 3: Commit**

```bash
git add "src/app/(site)/about/page.tsx" "src/app/(site)/investment/page.tsx" "src/app/(site)/free-session/page.tsx" "src/app/(site)/inquire/page.tsx" src/components/lei/FreeSessionForm.tsx
git commit -m "Voice pass: about, investment, free-session, inquire pages"
```

(If `FreeSessionForm.tsx` needed no changes, drop it from the `git add`.)

---

### Task 7: Final verification

**Files:** none (verification only).

- [ ] **Step 1: Full suite and build**

Run: `npm test` — Expected: all files green (including the two new wedding-portfolio tests).
Run: `npm run build` — Expected: success.

- [ ] **Step 2: Layout check at four widths**

In the dev server (or via the static-analysis method if no browser is reachable), check the homepage at 375/768/1440/1920:
- gallery `full` rows span the content width without horizontal scroll;
- `pair` rows collapse to one column at phone width (the `lx-grid-2col` rule);
- the marina band fills 90vh without clipping or horizontal scroll;
- `document.documentElement.scrollWidth <= clientWidth` on every page.

- [ ] **Step 3: CTA hierarchy and links**

On `/`: gold pills only in hero, mobile hero, Who I photograph, Investment, Inquire; soft links each once — experience link (qualifiers), "View the full portfolio" (gallery → `/work`), "See the collections" (Investment → `/investment`), free-session links. `/work` loads and shows the five-category horizontal Collection.

- [ ] **Step 4: Voice-rule walkthrough**

For each of the 8 pages: read every headline aloud for "you"-lean; confirm every body paragraph containing "I" has a "you" payoff in the same or adjacent sentence. Confirm the fixed constants are byte-identical (`git diff main -- src/content/pricing.ts src/content/experience.ts` shows no changes; `POSITIONING`/CTA constants unchanged in `src/content/homepage.ts`).

- [ ] **Step 5: Spec walkthrough and handoff**

Re-read the spec top to bottom; confirm each requirement implemented or explicitly deferred with user agreement. Then use the superpowers:finishing-a-development-branch skill for the `portfolio-refocus` branch.
