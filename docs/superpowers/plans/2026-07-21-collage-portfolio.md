# Collage Portfolio Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the homepage "The Portfolio" section and the top of /weddings as an editorial collage grid, with a scrollable strip of placeholder wedding project cards that click through to blank project pages.

**Architecture:** A pure-CSS `Collage`/`CollageTile` server component (CSS grid, tiles declare their own aspect ratio) plus a `ProjectStrip` server component (native overflow-x scroll with snap). A new `weddings` category in `src/content/portfolio.ts` holds five placeholder projects with `cover: null`; route params switch from `CAT_ORDER` to `Object.keys(CATEGORIES)` so those pages build while staying off the /portfolio hub and sitemap.

**Tech Stack:** Next.js (App Router, server components, inline-style convention), vitest for content tests, Ship Studio preview for visual checks.

Spec: `docs/superpowers/specs/2026-07-21-collage-portfolio-design.md`

## Global Constraints

- **Orientation rule (hard requirement):** portrait natives (`ratio < 1`, or `r` of `p`/`t`) only in `tall` tiles; landscape natives only in `small`/`wide` tiles. Never cross-crop.
- `<img>` tags in page files are written out one by one with literal `src` strings (visual-editor swap convention). Never `.map` over photo arrays in page files.
- No em dashes in any written copy or alt text you author.
- No photo may appear twice on the same page. Homepage additionally forbids reusing a photo across its own sections; the new collage uses only the images already in the dark "The Portfolio" section, so this holds.
- `CAT_ORDER` and `sitemap.ts` are NOT modified: weddings stays off the /portfolio hub, cross-category fallbacks, and the sitemap.
- Follow existing code style: inline `style` objects, tokens from `@/components/lei/tokens`, `lx-` class + `globals.css` for anything responsive, `/* eslint-disable-next-line @next/next/no-img-element */` before every `<img>`.
- Verification commands: `npm test` (vitest), `npm run build`. Visual checks via the Ship Studio preview tools.

---

### Task 1: Weddings category data + cover nullability

**Files:**
- Modify: `src/content/portfolio.ts` (Project interface ~line 225, CATEGORIES ~line 240)
- Test: `tests/portfolio.test.ts`

**Interfaces:**
- Consumes: existing `Photo`, `Category`, `CATEGORIES`, `CAT_ORDER`.
- Produces: `Project.cover: Photo | null`; `CATEGORIES.weddings` with projects `wedding-01` through `wedding-05`, each `{ cover: null, photos: [] }`. Later tasks rely on exactly these ids and on `CATEGORIES.weddings.projects`.

- [ ] **Step 1: Update the failing test**

`tests/portfolio.test.ts` currently asserts the weddings category does NOT exist (`expect(CATEGORIES.weddings).toBeUndefined()`), from the 2026-07 removal of the routed sargon-odelya project. The approved spec reintroduces the category as unrouted placeholders, so that assertion is superseded. Replace the second `it` block of the first describe, and add a new describe:

```ts
  // The routed sargon-odelya project page was removed; the curated array is
  // retained for reuse but no project routes to it. The weddings category
  // returned 2026-07-21 as coming-soon placeholders (see the collage spec),
  // still outside CAT_ORDER.
  it("is not routed as a project in any category", () => {
    for (const cat of Object.keys(CATEGORIES)) {
      const projectIds = CATEGORIES[cat].projects.map((p) => p.id);
      expect(projectIds).not.toContain("sargon-odelya");
    }
  });
```

```ts
describe("weddings category (coming-soon placeholders)", () => {
  it("holds five blank project shells", () => {
    expect(CATEGORIES.weddings).toBeDefined();
    expect(CATEGORIES.weddings.projects.map((p) => p.id)).toEqual([
      "wedding-01",
      "wedding-02",
      "wedding-03",
      "wedding-04",
      "wedding-05",
    ]);
    for (const p of CATEGORIES.weddings.projects) {
      expect(p.cover).toBeNull();
      expect(p.photos).toHaveLength(0);
    }
  });

  it("is hidden from the /portfolio hub and sitemap (not in CAT_ORDER)", () => {
    expect(CAT_ORDER).not.toContain("weddings");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- tests/portfolio.test.ts`
Expected: FAIL. `CATEGORIES.weddings` is undefined, so `toBeDefined()` fails.

- [ ] **Step 3: Implement the data change**

In `src/content/portfolio.ts`, change the `Project` interface:

```ts
export interface Project {
  id: string;
  title: string;
  place: string;
  year: string;
  /** null = coming-soon placeholder: render a tone block wherever a cover
   * would show (project strip, category grid, related cards). */
  cover: Photo | null;
  photos: Photo[];
}
```

Add to `CATEGORIES` (after `engagements`):

```ts
  // Coming-soon shells for the "A closer look" project strip (2026-07-21
  // collage spec). Intentionally absent from CAT_ORDER until real weddings
  // land, so the hub and sitemap do not advertise empty pages.
  weddings: {
    label: "Weddings",
    tagline: "Full days, kept the way they felt",
    intro: "Complete wedding stories, from getting ready to the last song.",
    projects: [
      { id: "wedding-01", title: "Coming Soon", place: "Bay Area, CA", year: "2026", cover: null, photos: [] },
      { id: "wedding-02", title: "Coming Soon", place: "Bay Area, CA", year: "2026", cover: null, photos: [] },
      { id: "wedding-03", title: "Coming Soon", place: "Bay Area, CA", year: "2026", cover: null, photos: [] },
      { id: "wedding-04", title: "Coming Soon", place: "Bay Area, CA", year: "2026", cover: null, photos: [] },
      { id: "wedding-05", title: "Coming Soon", place: "Bay Area, CA", year: "2026", cover: null, photos: [] },
    ],
  },
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- tests/portfolio.test.ts`
Expected: PASS (all tests in the file).

- [ ] **Step 5: Commit**

```bash
git add src/content/portfolio.ts tests/portfolio.test.ts
git commit -m "Add coming-soon weddings category; allow null project covers"
```

---

### Task 2: Route plumbing + null-cover guards

**Files:**
- Modify: `src/app/(site)/portfolio/[cat]/page.tsx:10-12` (params) and `:174-180` (cover render)
- Modify: `src/app/(site)/portfolio/[cat]/[id]/page.tsx:10-14` (params), `:43-72` (related list), `:204-222` (related cover render)

**Interfaces:**
- Consumes: `CATEGORIES`, `Project.cover: Photo | null` from Task 1.
- Produces: `/portfolio/weddings` and `/portfolio/weddings/wedding-01..05` build and render; every cover render site tolerates `null`.

- [ ] **Step 1: Switch static params to the full category map**

`[cat]/page.tsx`:

```ts
export function generateStaticParams() {
  // Object.keys, not CAT_ORDER: the weddings category must build even
  // though the hub does not list it.
  return Object.keys(CATEGORIES).map((cat) => ({ cat }));
}
```

`[cat]/[id]/page.tsx`:

```ts
export function generateStaticParams() {
  // Object.keys, not CAT_ORDER: weddings placeholder pages must build.
  return Object.keys(CATEGORIES).flatMap((cat) =>
    CATEGORIES[cat].projects.map((p) => ({ cat, id: p.id }))
  );
}
```

- [ ] **Step 2: Guard the category grid cover**

In `[cat]/page.tsx`, the project card currently does `aspect(p.cover)` and `p.cover.path` unconditionally. Replace the `lx-imgwrap` block:

```tsx
<div
  className="lx-imgwrap"
  style={{ aspectRatio: p.cover ? aspect(p.cover) : "4 / 5" }}
>
  {p.cover ? (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img src={img(p.cover.path, 1200)} alt={p.cover.a} />
  ) : (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#ECE7E1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 22, color: DIM }}
      >
        Coming soon
      </span>
    </div>
  )}
</div>
```

- [ ] **Step 3: Guard the related cards on project pages**

In `[cat]/[id]/page.tsx`, the `related` array's `cover`/`alt` fields become nullable and both push sites guard:

```ts
const related: Array<{
  href: string;
  cover: string | null;
  alt: string;
  kicker: string;
  title: string;
}> = [];
c.projects
  .filter((p) => p.id !== proj.id)
  .forEach((p) => {
    related.push({
      href: `/portfolio/${cat}/${p.id}`,
      cover: p.cover ? img(p.cover.path, 900) : null,
      alt: p.cover ? p.cover.a : "",
      kicker: c.label,
      title: p.title,
    });
  });
CAT_ORDER.filter((k) => k !== cat).forEach((k) => {
  if (related.length >= 3) return;
  const oc = CATEGORIES[k];
  const op = oc.projects[0];
  related.push({
    href: `/portfolio/${k}/${op.id}`,
    cover: op.cover ? img(op.cover.path, 900) : null,
    alt: op.cover ? op.cover.a : "",
    kicker: oc.label,
    title: op.title,
  });
});
```

And in the related-card JSX, replace the bare `<img>` inside the 4/5 wrapper:

```tsx
{r.cover ? (
  /* eslint-disable-next-line @next/next/no-img-element */
  <img
    src={r.cover}
    alt={r.alt}
    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
  />
) : (
  <div
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <span
      style={{
        fontFamily: SERIF,
        fontStyle: "italic",
        fontSize: 20,
        color: cream(0.5),
      }}
    >
      Coming soon
    </span>
  </div>
)}
```

(The wrapper already has `background: "#171411"`, which is the dark tone block.)

- [ ] **Step 4: Verify build and routes**

Run: `npm run build`
Expected: succeeds; the route listing includes `/portfolio/weddings` and `/portfolio/weddings/wedding-01` through `/portfolio/weddings/wedding-05`. A project page with `photos: []` renders the title shell with an empty gallery (no crash).

Run: `npm test`
Expected: PASS (all suites).

- [ ] **Step 5: Commit**

```bash
git add "src/app/(site)/portfolio/[cat]/page.tsx" "src/app/(site)/portfolio/[cat]/[id]/page.tsx"
git commit -m "Build weddings placeholder routes; guard null covers"
```

---

### Task 3: Collage component + CSS

**Files:**
- Create: `src/components/lei/Collage.tsx`
- Modify: `src/app/globals.css` (new rules after the `.lx-gallery` block ~line 170; one rule inside the existing `@media (max-width: 860px)` block ~line 206)

**Interfaces:**
- Consumes: `lx-gitem` hover/zoom CSS already in `globals.css`.
- Produces: `Collage({ children })` and `CollageTile({ size, children })` with `size: "tall" | "small" | "wide"`. Tasks 5 and 6 import both, place literal `<img>` tags (no style attribute needed; CSS sizes them) inside `CollageTile`.

- [ ] **Step 1: Create the component**

`src/components/lei/Collage.tsx`:

```tsx
import type { CSSProperties, ReactNode } from "react";

/* Editorial collage grid (2026-07-21 spec): 4 equal columns on desktop, 2
   below 860px (globals.css). Every tile declares its own aspect ratio so
   rows auto-size consistently at any column count; sub-percent mismatches
   between a half-tall and a small are absorbed by object-fit: cover.

   ORIENTATION RULE: portrait natives only in "tall" tiles, landscape
   natives only in "small"/"wide" tiles. Never cross-crop.

   Pages write <img> tags out one by one inside CollageTile so each src is
   a literal string the visual editor can swap. */

export type TileSize = "tall" | "small" | "wide";

const TILE: Record<TileSize, CSSProperties> = {
  tall: { gridRow: "span 2", aspectRatio: "2 / 3" },
  small: { aspectRatio: "3 / 2" },
  wide: { gridColumn: "span 2", aspectRatio: "3 / 1" },
};

export function Collage({ children }: { children: ReactNode }) {
  return <div className="lx-collage">{children}</div>;
}

export function CollageTile({
  size,
  children,
}: {
  size: TileSize;
  children: ReactNode;
}) {
  return (
    <div data-fadeup="" className="lx-gitem" style={{ ...TILE[size], marginBottom: 0 }}>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Add the CSS**

In `globals.css`, after the `.lx-gallery .lx-gitem.wide` rule:

```css
/* Editorial collage (homepage portfolio + /weddings): tiles declare their
   own aspect-ratio; tall spans 2 rows, wide spans 2 columns. Reuses
   .lx-gitem for the frame background and hover zoom. */
.lx-collage {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.4vw;
}
.lx-collage .lx-gitem img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

Inside the existing `@media (max-width: 860px)` block, next to the `.lx-gallery` override:

```css
  .lx-collage {
    grid-template-columns: 1fr 1fr !important;
  }
```

- [ ] **Step 3: Verify it compiles**

Run: `npm run build`
Expected: succeeds (component is not yet imported anywhere; this catches TS/CSS syntax errors only).

- [ ] **Step 4: Commit**

```bash
git add src/components/lei/Collage.tsx src/app/globals.css
git commit -m "Add Collage/CollageTile editorial grid component"
```

---

### Task 4: ProjectStrip component + CSS

**Files:**
- Create: `src/components/lei/ProjectStrip.tsx`
- Modify: `src/app/globals.css` (one rule group after the `.lx-collage` rules from Task 3)

**Interfaces:**
- Consumes: `CATEGORIES.weddings.projects` (Task 1), `img` from `@/content/portfolio`, tokens.
- Produces: `ProjectStrip({ dark })`, default export, `dark` defaults to `true`. Tasks 5 and 6 render `<ProjectStrip />` on dark sections.

- [ ] **Step 1: Create the component**

`src/components/lei/ProjectStrip.tsx`:

```tsx
import Link from "next/link";
import { CATEGORIES, img } from "@/content/portfolio";
import { GOLD, SERIF, cream, kicker } from "./tokens";

/* "A closer look": native horizontally scrollable, snap-scrolling strip of
   wedding project cards linking to /portfolio/weddings/<id>. Placeholder
   projects (cover: null) render a "Coming soon" tone block; when a project
   gains a real cover Photo the same card shows it, no code change. */

export default function ProjectStrip({ dark = true }: { dark?: boolean }) {
  const projects = CATEGORIES.weddings.projects;
  const text = dark ? "#F7F5F2" : "#0E0D0B";
  const dim = dark ? cream(0.45) : "#8A837B";
  const block = dark ? "#171411" : "#ECE7E1";
  return (
    <div>
      <div data-fadeup="" style={kicker({ marginBottom: 26 }, 10, ".3em")}>
        A closer look
      </div>
      <div className="lx-strip">
        {projects.map((p) => (
          <Link
            key={p.id}
            href={`/portfolio/weddings/${p.id}`}
            data-hover=""
            style={{
              flex: "0 0 auto",
              width: "min(70vw,320px)",
              scrollSnapAlign: "start",
              color: text,
              textDecoration: "none",
            }}
          >
            <div
              style={{
                overflow: "hidden",
                background: block,
                aspectRatio: "4 / 5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {p.cover ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={img(p.cover.path, 900)}
                  alt={p.cover.a}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              ) : (
                <span
                  style={{
                    fontFamily: SERIF,
                    fontStyle: "italic",
                    fontSize: 20,
                    color: dim,
                  }}
                >
                  Coming soon
                </span>
              )}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginTop: 16,
              }}
            >
              <span
                style={{
                  fontFamily: SERIF,
                  fontSize: "clamp(20px,2vw,26px)",
                  fontWeight: 600,
                }}
              >
                {p.title}
              </span>
              <span style={{ fontFamily: SERIF, fontSize: 18, color: GOLD }}>→</span>
            </div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: ".2em",
                textTransform: "uppercase",
                color: dim,
                marginTop: 6,
              }}
            >
              {p.place} · {p.year}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

(Mapping over projects here is fine: the literal-src convention applies to photo `<img>`s in page files, and placeholder cards have no photos. When real covers land they come from `portfolio.ts`, which the editor also understands.)

- [ ] **Step 2: Add the CSS**

In `globals.css`, after the `.lx-collage` rules:

```css
/* "A closer look" project strip: native horizontal scroll, snap, no
   visible scrollbar. */
.lx-strip {
  display: flex;
  gap: 2.4vw;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding-bottom: 6px;
}
.lx-strip::-webkit-scrollbar {
  display: none;
}
```

- [ ] **Step 3: Verify it compiles**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/lei/ProjectStrip.tsx src/app/globals.css
git commit -m "Add A-closer-look wedding project strip"
```

---

### Task 5: Homepage portfolio section becomes the collage

**Files:**
- Modify: `src/app/(site)/page.tsx` (the dark "The Wedding Portfolio" section, lines ~552-739; imports at top)

**Interfaces:**
- Consumes: `Collage`, `CollageTile` (Task 3), `ProjectStrip` (Task 4).
- Produces: nothing new; visual change only.

- [ ] **Step 1: Swap the section body**

Add imports:

```tsx
import { Collage, CollageTile } from "@/components/lei/Collage";
import ProjectStrip from "@/components/lei/ProjectStrip";
```

Keep the section wrapper, kicker ("The Portfolio"), `h2`, and the closing "View the full portfolio" `SoftLink` exactly as they are. Replace ONLY the `<div style={{ display: "flex", flexDirection: "column", gap: "2.4vw" }}>...</div>` stack (the 17 images) with the collage below. Same 17 images, reassigned to tiles by native orientation (portraits 2:3 in `tall`, landscapes in `small`/`wide`). Order: screenshot-style mixed block, portrait row, wide band row, portrait row.

```tsx
<Collage>
  {/* Block: two tall portraits beside a 2x2 cluster of landscapes */}
  <CollageTile size="tall">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-10.jpg"
      alt="Bride's veil lifted and moving in the breeze"
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  </CollageTile>
  <CollageTile size="tall">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-28.jpg"
      alt="Groom dipping the bride for a kiss by the reception fireplace"
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  </CollageTile>
  <CollageTile size="small">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-34.jpg"
      alt="Bridal details flat lay with pearl-embellished heels, Chanel perfume, pearl jewelry and the wedding invitation"
      loading="lazy"
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  </CollageTile>
  <CollageTile size="small">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-14.jpg"
      alt="Bride touching the groom's face at golden hour"
      loading="lazy"
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  </CollageTile>
  <CollageTile size="small">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-26.jpg"
      alt="Groom carrying the bride through a cheering crowd"
      loading="lazy"
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  </CollageTile>
  <CollageTile size="small">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-35.jpg"
      alt="Bride and three bridesmaids in sage dresses toasting champagne while getting ready"
      loading="lazy"
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  </CollageTile>

  {/* Row: four tall portraits */}
  <CollageTile size="tall">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-03.jpg"
      alt="Bride sharing an emotional moment with her mother, black and white"
      loading="lazy"
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  </CollageTile>
  <CollageTile size="tall">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-01.jpg"
      alt="Bride's hands holding the wedding ring box"
      loading="lazy"
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  </CollageTile>
  <CollageTile size="tall">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-29.jpg"
      alt="Bride and groom laughing mid-twirl on the dance floor"
      loading="lazy"
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  </CollageTile>
  <CollageTile size="tall">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-23.jpg"
      alt="Champagne spray celebration, alternate edit"
      loading="lazy"
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  </CollageTile>

  {/* Row: wide band plus two landscapes */}
  <CollageTile size="wide">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src="https://images.squarespace-cdn.com/content/v1/697c1d6344a3b1154bcbc39e/652fef9d-196e-4248-92d2-83d8abebf683/Lei.Photography.Co-PreSargon+lReEdit-12.jpg?format=1500w"
      alt="First dance in low fog beneath string lights, guests watching by the fireplace"
      loading="lazy"
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  </CollageTile>
  <CollageTile size="small">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-30.jpg"
      alt="Bride and groom embracing on the dance floor, reception lights above"
      loading="lazy"
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  </CollageTile>
  <CollageTile size="small">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-36.jpg"
      alt="Bride laughing with her three bridesmaids as they clink champagne flutes while getting ready"
      loading="lazy"
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  </CollageTile>

  {/* Row: four tall portraits */}
  <CollageTile size="tall">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-19.jpg"
      alt="Bride looking back over her shoulder, veil catching the sunset"
      loading="lazy"
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  </CollageTile>
  <CollageTile size="tall">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-08.jpg"
      alt="Family and friends celebrating on the staircase, aerial view"
      loading="lazy"
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  </CollageTile>
  <CollageTile size="tall">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-37.jpg"
      alt="Groom lifting the bride during their first dance amid low fog beneath string lights"
      loading="lazy"
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  </CollageTile>
  <CollageTile size="tall">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-12.jpg"
      alt="Bride beneath her veil, black and white portrait"
      loading="lazy"
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  </CollageTile>
</Collage>
```

(The `<img>` style attribute duplicates what `.lx-collage .lx-gitem img` provides; include it anyway so each image is self-describing for the visual editor, matching how the rest of the page styles images inline. First tile keeps eager loading, the rest `loading="lazy"`; the section is far below the fold, but the first tile matches the current first image's behavior.)

Then insert the strip between the collage and the existing "View the full portfolio" wrapper div:

```tsx
<div style={{ marginTop: "9vh" }}>
  <ProjectStrip />
</div>
```

If `PORTFOLIO_FULL` or `PORTFOLIO_PAIR`/`PAIR_ROW` become unused after the swap, leave them if the cream editorial-collage section higher on the page still uses them (it does); remove only whatever the compiler flags as genuinely unused.

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: succeeds.

Visual check in the Ship Studio preview: homepage dark portfolio section shows the collage (two talls beside a 2x2 cluster, then a portrait row, a wide band row, a portrait row), every portrait image renders vertically, strip scrolls horizontally with five "Coming soon" cards, cards click through to `/portfolio/weddings/wedding-01`. Check at desktop and ~390px width (2-column collapse, no gaps).

- [ ] **Step 3: Commit**

```bash
git add "src/app/(site)/page.tsx"
git commit -m "Rebuild homepage portfolio section as editorial collage with project strip"
```

---

### Task 6: /weddings collage section after the hero

**Files:**
- Modify: `src/app/(site)/weddings/page.tsx` (insert a section between the hero, ending ~line 142, and the sticky full-bleed feature starting ~line 145; imports at top)

**Interfaces:**
- Consumes: `Collage`, `CollageTile`, `ProjectStrip`.
- Produces: nothing new; visual change only.

- [ ] **Step 1: Insert the new section**

Add imports:

```tsx
import { Collage, CollageTile } from "@/components/lei/Collage";
import ProjectStrip from "@/components/lei/ProjectStrip";
```

Insert between the hero section and the full-bleed feature section. Every photo below is absent from the rest of /weddings (hero, feature, parallax use other frames). Portraits in `tall`, landscapes in `small`, per the orientation rule.

```tsx
{/* ══ Collage — the day at a glance, then the closer-look strip ══ */}
<section style={{ position: "relative", background: "#0E0D0B", padding: "14vh 4vw 12vh" }}>
  <Collage>
    <CollageTile size="tall">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/bay-area-wedding-first-dance-fog-string-lights-black-and-white-lei-photography-collective.jpg"
        alt="Bride and groom sharing their first dance on a fog-covered floor beneath string lights, black and white"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </CollageTile>
    <CollageTile size="tall">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/bay-area-wedding-marina-sunset-kiss-lei-photography-collective.jpg"
        alt="Bride and groom kissing at sunset on the marina railing, sailboat masts glowing behind them"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </CollageTile>
    <CollageTile size="small">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/bay-area-wedding-bride-bridesmaids-champagne-toast-getting-ready-lei-photography-collective.jpg"
        alt="Bride toasting champagne with her bridesmaids in sage green dresses while getting ready"
        loading="lazy"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </CollageTile>
    <CollageTile size="small">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-04.jpg"
        alt="Bride and bridesmaids toasting champagne while getting ready"
        loading="lazy"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </CollageTile>
    <CollageTile size="small">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-15.jpg"
        alt="Bride and groom smiling together on a garden balcony"
        loading="lazy"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </CollageTile>
    <CollageTile size="small">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-22.jpg"
        alt="Groom spraying champagne over the bride under a redwood tree"
        loading="lazy"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </CollageTile>

    {/* Mirrored block: 2x2 landscapes left, two tall portraits right */}
    <CollageTile size="small">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-07.jpg"
        alt="Guests cheering as the couple descends the staircase"
        loading="lazy"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </CollageTile>
    <CollageTile size="small">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-20.jpg"
        alt="Bride and groom walking hand in hand across the lawn"
        loading="lazy"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </CollageTile>
    <CollageTile size="tall">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/bay-area-wedding-first-dance-fog-string-lights-lei-photography-collective.jpg"
        alt="Bride and groom holding hands during their first dance on a fog-covered floor beneath a canopy of string lights"
        loading="lazy"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </CollageTile>
    <CollageTile size="tall">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-06.jpg"
        alt="Groom descending the stairs carrying a pearl-beaded scepter"
        loading="lazy"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </CollageTile>
    <CollageTile size="small">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-25.jpg"
        alt="Reception fireplace mantle dressed in white florals and candlelight"
        loading="lazy"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </CollageTile>
    <CollageTile size="small">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/portfolio/weddings/sargon-odelya-more/sargon-odelya-more-08.jpg"
        alt="Sargon and Odelya, a golden hour portrait together"
        loading="lazy"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </CollageTile>
  </Collage>

  <div style={{ marginTop: "9vh" }}>
    <ProjectStrip />
  </div>
</section>
```

- [ ] **Step 2: Verify everything**

Run: `npm test`
Expected: PASS (all suites).

Run: `npm run build`
Expected: succeeds.

Visual check in the Ship Studio preview on /weddings: hero unchanged, collage appears right below it (block, then mirrored block), every portrait renders vertically, strip scrolls and clicks through, and the sticky feature + parallax gallery below are untouched. Check desktop and ~390px.

- [ ] **Step 3: Commit**

```bash
git add "src/app/(site)/weddings/page.tsx"
git commit -m "Add collage and project strip to /weddings below the hero"
```
