import { describe, expect, it } from "vitest";
import * as pricing from "@/content/pricing";
import * as homepage from "@/content/homepage";
import * as experience from "@/content/experience";
import * as secondWeddings from "@/content/second-weddings";
import * as site from "@/content/site";

// Photo alt text ("a") and asset paths are out of scope for the no-em-dash
// rule (see the 2026-07-19 copy-edit spec). A Photo is identified by shape
// (string "path" + string "a") so FAQ items like { q, a } are NOT exempt.
function isPhoto(value: Record<string, unknown>): boolean {
  return typeof value.path === "string" && typeof value.a === "string";
}

function collectStrings(
  value: unknown,
  out: string[],
  seen = new Set<object>()
): void {
  if (typeof value === "string") {
    out.push(value);
    return;
  }
  if (typeof value !== "object" || value === null) return;
  if (seen.has(value)) return;
  seen.add(value);
  if (Array.isArray(value)) {
    for (const v of value) collectStrings(v, out, seen);
    return;
  }
  const photo = isPhoto(value as Record<string, unknown>);
  for (const [k, v] of Object.entries(value)) {
    if (photo && (k === "a" || k === "path")) continue;
    collectStrings(v, out, seen);
  }
}

describe("content files contain no em dashes in rendered copy", () => {
  const modules: Record<string, object> = {
    pricing,
    homepage,
    experience,
    "second-weddings": secondWeddings,
    site,
  };
  for (const [name, mod] of Object.entries(modules)) {
    it(`${name} strings are em-dash free`, () => {
      const strings: string[] = [];
      collectStrings({ ...mod }, strings);
      expect(strings.length).toBeGreaterThan(0); // walker sanity check
      for (const s of strings) {
        expect(s, `em dash found in ${name}: "${s}"`).not.toContain("—");
      }
    });
  }
});
