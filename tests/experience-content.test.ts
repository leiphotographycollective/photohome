import { describe, expect, it } from "vitest";
import { HOME_PROCESS, PROCESS, QUALIFIERS } from "@/content/experience";

describe("qualifiers", () => {
  it("has the four approved self-selection lines", () => {
    expect(QUALIFIERS).toHaveLength(4);
    expect(QUALIFIERS[0]).toContain("trust with the day");
    expect(QUALIFIERS[3]).toContain("already planned for it");
    // typographic characters are load-bearing copy — regression-guard them
    expect(QUALIFIERS[1]).toContain("“we're not photo people”");
    expect(QUALIFIERS[3]).toContain("does too — and who's already planned for it");
  });
});

describe("process", () => {
  it("has four numbered steps in the approved order", () => {
    expect(PROCESS.map((s) => s.n)).toEqual(["01", "02", "03", "04"]);
    expect(PROCESS.map((s) => s.title)).toEqual([
      "Inquire",
      "Connect",
      "Customize",
      "Reserve",
    ]);
  });

  it("speaks weddings everywhere — home and experience share one copy", () => {
    expect(PROCESS[2].body).toContain("No two weddings are alike");
    expect(HOME_PROCESS).toBe(PROCESS);
  });
});
