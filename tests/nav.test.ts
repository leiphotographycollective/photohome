import { describe, expect, it } from "vitest";
import {
  PRIMARY_NAV,
  WEDDINGS_MENU,
  FOOTER_EXPLORE,
  FOOTER_CONNECT,
  SOCIALS,
  INQUIRE,
  isGroup,
  type NavItem,
} from "@/content/nav";

const hrefs = (items: NavItem[]) => items.map((i) => i.href);
/** Flatten primary nav to its leaf links (groups expand to their children). */
const leaves = (): NavItem[] =>
  PRIMARY_NAV.flatMap((e) => (isGroup(e) ? e.children : [e]));

describe("nav config", () => {
  it("primary nav is Gallery, Weddings (group), Graduations, Investment, About", () => {
    expect(PRIMARY_NAV.map((e) => e.label)).toEqual([
      "Gallery",
      "Weddings",
      "Graduations",
      "Investment",
      "About",
    ]);
    expect(INQUIRE).toEqual({ href: "/inquire", label: "Inquire" });
  });

  it("Weddings is a non-clickable group with no href of its own", () => {
    const weddings = PRIMARY_NAV[1];
    expect(isGroup(weddings)).toBe(true);
    expect((weddings as { href?: string }).href).toBeUndefined();
  });

  it("Weddings group holds Engagements, Experience, Free Session", () => {
    expect(hrefs(WEDDINGS_MENU)).toEqual([
      "/gallery/engagements",
      "/experience",
      "/free-session",
    ]);
  });

  it("Investment is reachable from the header nav and the footer", () => {
    expect(hrefs(leaves())).toContain("/investment");
    expect(hrefs(FOOTER_EXPLORE)).toContain("/investment");
  });

  it("Graduations is reachable from the header nav and the footer", () => {
    expect(hrefs(leaves())).toContain("/graduations");
    expect(hrefs(FOOTER_EXPLORE)).toContain("/graduations");
  });

  it("Gallery always points to /gallery", () => {
    for (const list of [leaves(), FOOTER_EXPLORE]) {
      const gallery = list.find((i) => i.label === "Gallery");
      expect(gallery?.href).toBe("/gallery");
    }
  });

  // The weddings-only rebuild deleted /portfolio and /weddings; both now 308 to
  // /gallery. Linking to a redirect from our own nav would be a wasted hop, so
  // guard against one creeping back in. /second-weddings is archived (noindex,
  // unlinked) rather than deleted, so it belongs in this guard too.
  it("never links to a retired route", () => {
    for (const list of [leaves(), FOOTER_EXPLORE, FOOTER_CONNECT]) {
      for (const item of list) {
        expect(item.href.startsWith("/portfolio")).toBe(false);
        expect(item.href).not.toBe("/weddings");
        expect(item.href).not.toBe("/second-weddings");
      }
    }
  });

  it("footer explore has no Second Weddings; connect has About + Inquire", () => {
    expect(hrefs(FOOTER_EXPLORE)).not.toContain("/second-weddings");
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
    for (const list of [leaves(), FOOTER_EXPLORE, FOOTER_CONNECT]) {
      for (const item of list) expect(item.href.startsWith("/")).toBe(true);
    }
  });
});
