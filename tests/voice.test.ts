import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/** Formal-register phrases the voice spec retired (2026-07-16 design).
 *  Scoped to exact retired phrases so legitimate words don't false-positive. */
const BANNED: RegExp[] = [
  /curated record/i,
  /gracefully/i,
  /artistry/i,
  /photographed with intention/i,
  /uniquely yours/i,
  /life.s milestones/i,
  /milestones are alike/i,
  /celebrating a milestone/i,
];

const ROOTS = ["src/app", "src/content", "src/components"];

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return walk(p);
    return /\.(ts|tsx)$/.test(name) ? [p] : [];
  });
}

describe("voice rule", () => {
  it("no source file uses the retired formal register", () => {
    const offenders: string[] = [];
    for (const root of ROOTS) {
      for (const file of walk(root)) {
        const text = readFileSync(file, "utf8");
        for (const re of BANNED) {
          if (re.test(text)) offenders.push(`${file} → ${re}`);
        }
      }
    }
    expect(offenders).toEqual([]);
  });
});
