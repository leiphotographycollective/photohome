import { describe, expect, it } from "vitest";
import { ADD_ONS, INCLUDED_EVERYWHERE, TIERS } from "@/content/pricing";

describe("investment tiers", () => {
  it("lists the three collections flagship-first with approved prices", () => {
    expect(TIERS.map((t) => t.name)).toEqual([
      "The Collection",
      "The Signature",
      "The Intimate",
    ]);
    expect(TIERS.map((t) => t.price)).toEqual(["$3,800", "$2,900", "$2,400"]);
  });

  it("keeps shared inclusions out of per-tier facts (rendered once in the strip)", () => {
    for (const t of TIERS) {
      for (const fact of t.facts) {
        expect(fact).not.toMatch(/Pic-Time|printing rights|per hour of coverage/);
      }
    }
    expect(INCLUDED_EVERYWHERE).toHaveLength(3);
  });

  it("sneak peek is a fact on Collection and Signature only", () => {
    const sneak = (t: { facts: string[] }) =>
      t.facts.some((f) => f.includes("Sneak peek"));
    expect(TIERS.map(sneak)).toEqual([true, true, false]);
  });

  it("has the two approved add-ons", () => {
    expect(ADD_ONS.map((a) => a.name)).toEqual([
      "Engagement session",
      "Second photographer",
    ]);
    expect(ADD_ONS.map((a) => a.price)).toEqual(["+$250", "+$600"]);
  });
});
