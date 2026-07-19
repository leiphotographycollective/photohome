# Nav + Footer Unification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give every page one identical header (visible desktop nav + mobile burger) and one identical footer, driven by a single nav config, so Investment and other key pages are reachable everywhere.

**Architecture:** Introduce `src/content/nav.ts` as the single source of truth for nav links. The footer (`LeiFooter`) and a new client `HeaderNav` read from it; `Chrome` renders `HeaderNav` (desktop) beside the existing `MobileMenu` burger (mobile); `MobileMenu` flattens to the shared list. Show/hide is CSS media queries at the existing 860px breakpoint.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, inline styles + `globals.css` utility classes, Vitest (node env, data tests only).

## Global Constraints

- Next.js 16 App Router conventions — read `node_modules/next/dist/docs/` before using an unfamiliar API.
- Portfolio links point to `/work` (the `/work`→`/portfolio` rename is Sub-project B; a later one-line change in `nav.ts`).
- Responsive breakpoint is `max-width: 860px` (existing convention). Header height is `--lx-header-h` = 64px.
- GOLD (`#B8905A`) is reserved for CTAs and the active-page state.
- No em dashes in any user-facing copy.
- Tests run in `node` env (`vitest run`) — no React render tests; component correctness is verified via `next build` + live preview.

---

### Task 1: Shared nav config

**Files:**
- Create: `src/content/nav.ts`
- Test: `tests/nav.test.ts`

**Interfaces:**
- Produces:
  - `interface NavItem { href: string; label: string }`
  - `INQUIRE: NavItem`
  - `HEADER_NAV: NavItem[]` (desktop bar, excludes Inquire)
  - `MENU_NAV: NavItem[]` (mobile burger, excludes Inquire)
  - `FOOTER_EXPLORE: NavItem[]`
  - `FOOTER_CONNECT: NavItem[]` (internal: About, Inquire)
  - `SOCIALS: NavItem[]` (external: Instagram, Pinterest, Email)

- [ ] **Step 1: Write the failing test**

Create `tests/nav.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import {
  HEADER_NAV,
  MENU_NAV,
  FOOTER_EXPLORE,
  FOOTER_CONNECT,
  SOCIALS,
  INQUIRE,
} from "@/content/nav";

const hrefs = (items: { href: string }[]) => items.map((i) => i.href);

describe("nav config", () => {
  it("desktop bar is the four priority pages, Inquire kept separate", () => {
    expect(hrefs(HEADER_NAV)).toEqual([
      "/work",
      "/weddings",
      "/investment",
      "/about",
    ]);
    expect(INQUIRE).toEqual({ href: "/inquire", label: "Inquire" });
  });

  it("Investment is reachable from header and footer", () => {
    expect(hrefs(HEADER_NAV)).toContain("/investment");
    expect(hrefs(FOOTER_EXPLORE)).toContain("/investment");
  });

  it("mobile menu carries the fuller list including Free Session + Experience", () => {
    expect(hrefs(MENU_NAV)).toContain("/free-session");
    expect(hrefs(MENU_NAV)).toContain("/experience");
  });

  it("Portfolio always points to the hub (/work), never /weddings", () => {
    for (const list of [HEADER_NAV, MENU_NAV, FOOTER_EXPLORE]) {
      const portfolio = list.find((i) => i.label === "Portfolio");
      expect(portfolio?.href).toBe("/work");
    }
  });

  it("footer explore includes Second Weddings; connect has About + Inquire", () => {
    expect(hrefs(FOOTER_EXPLORE)).toContain("/second-weddings");
    expect(hrefs(FOOTER_CONNECT)).toEqual(["/about", "/inquire"]);
  });

  it("socials are external Instagram / Pinterest / Email", () => {
    expect(SOCIALS.map((s) => s.label)).toEqual([
      "Instagram",
      "Pinterest",
      "Email",
    ]);
    expect(SOCIALS[2].href).toMatch(/^mailto:/);
  });

  it("every internal nav href is root-relative", () => {
    for (const list of [HEADER_NAV, MENU_NAV, FOOTER_EXPLORE, FOOTER_CONNECT]) {
      for (const item of list) expect(item.href.startsWith("/")).toBe(true);
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/nav.test.ts`
Expected: FAIL — cannot resolve `@/content/nav`.

- [ ] **Step 3: Create the config**

Create `src/content/nav.ts`:

```ts
// Single source of truth for site navigation. Header, mobile menu, and footer
// all read from here, so links stay consistent on every page and a destination
// changes in exactly one place.
//
// NOTE: "Portfolio" points to /work until Sub-project B renames the hub to
// /portfolio; at that point, change the three "/work" entries below.

export interface NavItem {
  href: string;
  label: string;
}

/** Primary CTA, rendered separately from the nav lists. */
export const INQUIRE: NavItem = { href: "/inquire", label: "Inquire" };

/** Visible desktop header bar (tight, priority pages only). */
export const HEADER_NAV: NavItem[] = [
  { href: "/work", label: "Portfolio" },
  { href: "/weddings", label: "Weddings" },
  { href: "/investment", label: "Investment" },
  { href: "/about", label: "About" },
];

/** Mobile burger menu (fuller list). */
export const MENU_NAV: NavItem[] = [
  { href: "/work", label: "Portfolio" },
  { href: "/weddings", label: "Weddings" },
  { href: "/experience", label: "Experience" },
  { href: "/investment", label: "Investment" },
  { href: "/about", label: "About" },
  { href: "/free-session", label: "Free Session" },
];

/** Footer "Explore" column. */
export const FOOTER_EXPLORE: NavItem[] = [
  { href: "/work", label: "Portfolio" },
  { href: "/weddings", label: "Weddings" },
  { href: "/second-weddings", label: "Second Weddings" },
  { href: "/free-session", label: "Free Session" },
  { href: "/experience", label: "Experience" },
  { href: "/investment", label: "Investment" },
];

/** Footer "Connect" column — internal links. */
export const FOOTER_CONNECT: NavItem[] = [
  { href: "/about", label: "About" },
  { href: "/inquire", label: "Inquire" },
];

/** Footer socials — external. */
export const SOCIALS: NavItem[] = [
  { href: "http://instagram.com/lei.photography.co", label: "Instagram" },
  { href: "https://www.pinterest.com/LeiPhotographyCo/", label: "Pinterest" },
  { href: "mailto:leiphotography57@gmail.com", label: "Email" },
];
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/nav.test.ts`
Expected: PASS (7 tests).

- [ ] **Step 5: Commit**

```bash
git add src/content/nav.ts tests/nav.test.ts
git commit -m "Add shared nav config as single source of truth"
```

---

### Task 2: Footer reads from shared config

**Files:**
- Modify: `src/components/lei/LeiFooter.tsx` (full rewrite of the body; drop `links` prop)
- Modify call sites (remove `links` prop): `src/app/(site)/page.tsx:971`, `src/app/(site)/investment/page.tsx:588`, `src/app/(site)/experience/page.tsx:534`, `src/app/(site)/about/page.tsx:279`

**Interfaces:**
- Consumes: `FOOTER_EXPLORE`, `FOOTER_CONNECT`, `SOCIALS` from Task 1.
- Produces: `LeiFooter` with props `{ brand?: "collective" | "raymond"; border?: boolean; padding?: string }` (no `links`).

- [ ] **Step 1: Rewrite `LeiFooter.tsx`**

Replace the entire file with:

```tsx
import Link from "next/link";
import { GOLD, SERIF, cream, kicker, navLink } from "./tokens";
import { FOOTER_EXPLORE, FOOTER_CONNECT, SOCIALS } from "@/content/nav";

/* Site footer, identical on every page. `brand` switches between the Collective
   lockup (default) and the personal Raymond Lei lockup (about / experience).
   Links come from the shared nav config so no page can drift or orphan a page. */

interface LeiFooterProps {
  brand?: "collective" | "raymond";
  /** Top hairline above the footer. */
  border?: boolean;
  /** Padding shorthand override (e.g. project page uses "0 0 40px"). */
  padding?: string;
}

export default function LeiFooter({
  brand = "collective",
  border = true,
  padding = "56px 0 40px",
}: LeiFooterProps) {
  const blurb =
    brand === "raymond"
      ? "Raymond Lei photographs editorial, fashion-influenced weddings, engagements, and portraits for fun, stylish couples in the San Francisco Bay Area."
      : "Editorial wedding photography for fun, stylish couples in the San Francisco Bay Area & beyond: weddings, couples, engagements, and events.";

  const col = (title: string, items: typeof FOOTER_EXPLORE) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={kicker({}, 10, ".24em")}>{title}</div>
      {items.map((i) => (
        <Link key={i.href} href={i.href} data-hover="" style={navLink(cream(0.75))}>
          {i.label}
        </Link>
      ))}
    </div>
  );

  return (
    <footer
      style={{
        borderTop: border ? `1px solid ${cream(0.12)}` : undefined,
        padding,
        display: "flex",
        flexDirection: "column",
        gap: 36,
        textAlign: "left",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 40,
        }}
      >
        <div style={{ maxWidth: 340, display: "flex", flexDirection: "column", gap: 14 }}>
          <span style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 20, color: "#F7F5F2" }}>
            {brand === "raymond" ? (
              <>
                Raymond <em style={{ fontWeight: 400 }}>Lei</em>
              </>
            ) : (
              <>
                Lei Photography <em style={{ fontWeight: 400 }}>Collective</em>
              </>
            )}
          </span>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: cream(0.55) }}>
            {blurb}
          </p>
          <span
            style={{
              marginTop: 6,
              fontSize: 11,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: GOLD,
            }}
          >
            Now booking 2026 &amp; 2027 weddings
          </span>
        </div>

        <div style={{ display: "flex", gap: "clamp(40px,7vw,96px)", flexWrap: "wrap" }}>
          {col("Explore", FOOTER_EXPLORE)}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={kicker({}, 10, ".24em")}>Connect</div>
            {FOOTER_CONNECT.map((i) => (
              <Link key={i.href} href={i.href} data-hover="" style={navLink(cream(0.75))}>
                {i.label}
              </Link>
            ))}
            {SOCIALS.map((s) => (
              <a key={s.href} href={s.href} data-hover="" style={navLink(GOLD)}>
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
          borderTop: `1px solid ${cream(0.08)}`,
          paddingTop: 24,
        }}
      >
        <span
          style={{
            fontSize: 11,
            letterSpacing: ".14em",
            textTransform: "uppercase",
            color: cream(0.4),
          }}
        >
          © 2026 Lei Photography Collective
        </span>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Remove the `links` prop from the four call sites**

In `src/app/(site)/page.tsx` change `<LeiFooter links={["work", "weddings", "investment", "about", "inquire"]} />` to `<LeiFooter />`.

In `src/app/(site)/investment/page.tsx` change `<LeiFooter links={["home", "work", "about", "inquire"]} />` to `<LeiFooter />`.

In `src/app/(site)/experience/page.tsx` change
```tsx
        <LeiFooter
          brand="raymond"
          links={["home", "work", "about", "inquire"]}
          border={false}
        />
```
to
```tsx
        <LeiFooter brand="raymond" border={false} />
```

In `src/app/(site)/about/page.tsx` make the identical change (drop the `links` line).

- [ ] **Step 3: Typecheck + build**

Run: `npx next build`
Expected: Compiles successfully; no TypeScript error about an unknown `links` prop (that prop no longer exists, so any missed call site would fail here — fix it if so).

- [ ] **Step 4: Visual verification**

Start from the live preview. Navigate to `/`, `/investment`, and `/about`; scroll to the footer on each. Expected on every page: two columns "Explore" (Portfolio, Weddings, Second Weddings, Free Session, Experience, Investment) and "Connect" (About, Inquire, Instagram, Pinterest, Email), the "Now booking 2026 & 2027 weddings" gold line, and the © line. `/about` shows the "Raymond Lei" lockup; `/` shows "Lei Photography Collective".

- [ ] **Step 5: Commit**

```bash
git add src/components/lei/LeiFooter.tsx "src/app/(site)/page.tsx" "src/app/(site)/investment/page.tsx" "src/app/(site)/experience/page.tsx" "src/app/(site)/about/page.tsx"
git commit -m "Unify footer from shared nav config; drop per-page links prop"
```

---

### Task 3: Desktop header nav

**Files:**
- Create: `src/components/lei/HeaderNav.tsx`
- Modify: `src/components/lei/Chrome.tsx` (header layout + render HeaderNav)
- Modify: `src/app/globals.css` (responsive show/hide)

**Interfaces:**
- Consumes: `HEADER_NAV`, `INQUIRE` from Task 1.
- Produces: default-exported `HeaderNav` client component (renders the desktop links + Inquire pill, hidden ≤860px via `className="lx-desknav"`).

- [ ] **Step 1: Create `HeaderNav.tsx`**

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GOLD, INK, navLink, pill } from "./tokens";
import { HEADER_NAV, INQUIRE } from "@/content/nav";

/* Visible desktop navigation in the fixed header. Hidden ≤860px (the burger
   takes over there). Active page is gold. */

export default function HeaderNav() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || (href === "/work" && pathname.startsWith("/portfolio"));

  return (
    <div className="lx-desknav" style={{ alignItems: "center", gap: 28 }}>
      {HEADER_NAV.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          data-hover=""
          style={navLink(isActive(item.href) ? GOLD : INK)}
        >
          {item.label}
        </Link>
      ))}
      <Link href={INQUIRE.href} data-mag="" data-hover="" style={pill(GOLD, INK, "12px 26px")}>
        {INQUIRE.label}
      </Link>
    </div>
  );
}
```

- [ ] **Step 2: Update `Chrome.tsx` header**

Add the import at the top (below the `MobileMenu` import):

```tsx
import HeaderNav from "./HeaderNav";
```

Replace the `<header>…</header>` block (everything from `<header className="lx-header"` through its closing `</header>`) with:

```tsx
      {/* ══ Fixed header — wordmark left; desktop nav or burger on the right ══ */}
      <header
        className="lx-header"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 80,
          height: "var(--lx-header-h)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 30px",
          background: "#F7F5F2",
          borderBottom: "1px solid rgba(14,13,11,.08)",
          color: "#0E0D0B",
        }}
      >
        <Link
          href="/"
          data-hover=""
          className="lx-logo"
          style={{
            whiteSpace: "nowrap",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: ".16em",
            textTransform: "uppercase",
            color: "#0E0D0B",
            textDecoration: "none",
          }}
        >
          Lei Photography{" "}
          <span style={{ fontWeight: 400, color: DIM }}>Collective</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <HeaderNav />
          <MobileMenu />
        </div>
      </header>
```

- [ ] **Step 3: Add responsive show/hide to `globals.css`**

Find the base rules near line 183:

```css
.lx-burger {
  display: flex;
}
```

Replace that rule with:

```css
.lx-desknav {
  display: flex;
}
.lx-burger {
  display: none;
}
```

Then inside the existing `@media (max-width: 860px) {` block, add:

```css
  .lx-desknav {
    display: none !important;
  }
  .lx-burger {
    display: flex !important;
  }
```

- [ ] **Step 4: Build**

Run: `npx next build`
Expected: Compiles successfully.

- [ ] **Step 5: Visual verification (desktop + mobile)**

In the live preview: at desktop width, the header shows the wordmark left and `Portfolio · Weddings · Investment · About · [Inquire]` on the right, no burger; the current page's link is gold. Set the viewport to mobile (≤860px) and hard-reload (dev CSS can go stale after a `globals.css` edit): the desktop links disappear and the burger returns. Confirm on `/` and `/investment`.

- [ ] **Step 6: Commit**

```bash
git add src/components/lei/HeaderNav.tsx src/components/lei/Chrome.tsx src/app/globals.css
git commit -m "Add visible desktop header nav; burger stays on mobile"
```

---

### Task 4: Flatten mobile menu to the shared config

**Files:**
- Modify: `src/components/lei/MobileMenu.tsx`

**Interfaces:**
- Consumes: `MENU_NAV`, `INQUIRE` from Task 1.

- [ ] **Step 1: Replace the link data and nav markup**

Delete the `LINKS` and `WEDDINGS_SUB` arrays (lines ~13–22) and add the import at the top (below the tokens import):

```tsx
import { MENU_NAV, INQUIRE } from "@/content/nav";
```

Replace the entire `<nav>…</nav>` block (the numbered "Work" link, the "Weddings" expander `<div>`, and the `LINKS.map(...)`) with a single flat numbered list:

```tsx
      <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {MENU_NAV.map((l, i) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            style={{
              display: "flex", alignItems: "baseline", gap: 14,
              fontFamily: SERIF, fontSize: 34, fontWeight: 500, lineHeight: 1.35,
              color: pathname === l.href ? GOLD : "#F7F5F2", textDecoration: "none",
            }}
          >
            {l.label}
            <span style={{ fontSize: 12, letterSpacing: ".18em", color: "rgba(247,245,242,.4)" }}>
              {String(i + 1).padStart(2, "0")}
            </span>
          </Link>
        ))}
      </nav>
```

Then replace the hard-coded Inquire `<Link href="/inquire" …>Inquire</Link>` label/href with the config value: keep the same styling but use `href={INQUIRE.href}` and `{INQUIRE.label}` as the text.

- [ ] **Step 2: Remove now-unused state**

Delete the `weddingsOpen` state and its `setWeddingsOpen(false)` reset (the expander is gone). Leave `open` and `mounted` untouched.

- [ ] **Step 3: Build**

Run: `npx next build`
Expected: Compiles successfully with no "unused variable" error for `weddingsOpen` / `WEDDINGS_SUB` / `LINKS` (delete any that remain if the build flags them).

- [ ] **Step 4: Visual verification**

In the live preview at mobile width, open the burger: the menu lists Portfolio · Weddings · Experience · Investment · About · Free Session (numbered 01–06) plus the Inquire pill. Tapping "Portfolio" goes to `/work` (not `/weddings`). The current page is gold.

- [ ] **Step 5: Commit**

```bash
git add src/components/lei/MobileMenu.tsx
git commit -m "Flatten mobile menu to shared nav config; fix Portfolio link"
```

---

### Task 5: Full cross-page verification

**Files:** none (verification only).

- [ ] **Step 1: Full test + build**

Run: `npx vitest run` then `npx next build`
Expected: all tests pass; build succeeds.

- [ ] **Step 2: Cross-page header/footer parity**

In the live preview, visit `/`, `/weddings`, `/investment`, `/about`, `/experience`, `/portfolio/couples`. On every page confirm: identical header (desktop nav with Investment visible, active state correct), identical footer (Explore + Connect columns, "Now booking" line), and that Investment is reachable from both header and footer. Note any page whose footer still differs and fix its call site.

- [ ] **Step 3: Orphan check**

Confirm Investment, Experience, Second Weddings, and Free Session each have at least one nav/footer inbound link that appears on every page (they do, via the unified footer). Record the result in the task notes.

## Self-Review

**Spec coverage:**
- Shared nav config → Task 1. ✅
- Visible desktop header nav + burger on mobile → Task 3. ✅
- Footer identical on every page, Investment always present → Task 2. ✅
- Mobile menu fix (Portfolio→/work quirk) → Task 4. ✅
- "Now booking 2026 & 2027 weddings" + collective/raymond lockup → Task 2. ✅
- Verification (build, tests, cross-page parity) → Tasks 2–5. ✅
- Scope boundary (Portfolio → /work) → encoded in `nav.ts` comment, Task 1. ✅

**Placeholder scan:** No TBD/TODO; all steps carry concrete code or exact commands.

**Type consistency:** `NavItem` shape and the exported array names (`HEADER_NAV`, `MENU_NAV`, `FOOTER_EXPLORE`, `FOOTER_CONNECT`, `SOCIALS`, `INQUIRE`) are used identically across Tasks 1–4. `LeiFooter` prop set (`brand`, `border`, `padding`) matches the updated call sites.
