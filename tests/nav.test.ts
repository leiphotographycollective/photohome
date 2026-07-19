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
