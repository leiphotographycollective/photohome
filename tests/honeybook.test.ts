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
