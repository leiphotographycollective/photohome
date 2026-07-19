import { describe, expect, it } from "vitest";
import { HOME_PROCESS, PROCESS, QUALIFIERS } from "@/content/experience";

describe("qualifiers", () => {
  it("has the four approved self-selection lines", () => {
    expect(QUALIFIERS).toHaveLength(4);
    expect(QUALIFIERS[0]).toContain("editorial eye");
    expect(QUALIFIERS[1]).toContain("not really photo people");
    expect(QUALIFIERS[2]).toContain("cinematic portraits");
    expect(QUALIFIERS[3]).toContain("calm, organized");
    expect(QUALIFIERS[3]).toContain("trust with it");
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
