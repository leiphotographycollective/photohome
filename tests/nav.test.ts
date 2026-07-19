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
  it("primary nav is Portfolio, Weddings (group), Investment, About", () => {
    expect(PRIMARY_NAV.map((e) => e.label)).toEqual([
      "Portfolio",
      "Weddings",
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

  it("Weddings group holds Wedding Photography, Engagements, Experience, Free Session", () => {
    expect(hrefs(WEDDINGS_MENU)).toEqual([
      "/weddings",
      "/portfolio/engagements",
      "/experience",
      "/free-session",
    ]);
  });

  it("Investment is reachable from the header nav and the footer", () => {
    expect(hrefs(leaves())).toContain("/investment");
    expect(hrefs(FOOTER_EXPLORE)).toContain("/investment");
  });

  it("Portfolio always points to the hub (/portfolio), never /weddings", () => {
    for (const list of [leaves(), FOOTER_EXPLORE]) {
      const portfolio = list.find((i) => i.label === "Portfolio");
      expect(portfolio?.href).toBe("/portfolio");
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
    for (const list of [leaves(), FOOTER_EXPLORE, FOOTER_CONNECT]) {
      for (const item of list) expect(item.href.startsWith("/")).toBe(true);
    }
  });
});
