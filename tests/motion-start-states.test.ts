import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/** Guards the fix for the reveal flicker: the motion engine initializes in an
 *  effect, so if the hidden `from` states are not already in the server-
 *  rendered CSS the content paints visible and GSAP yanks it hidden after
 *  first paint. These tests fail if the CSS start states or the .lx-motion
 *  bootstrap go missing, or if a `from` value in motion.ts drifts out of sync
 *  with its CSS counterpart. */

const read = (...p: string[]) =>
  readFileSync(join(process.cwd(), ...p), "utf8");

const css = read("src", "app", "globals.css");
const layout = read("src", "app", "layout.tsx");
const motion = read("src", "lib", "lei", "motion.ts");

describe("motion start states", () => {
  it("layout adds .lx-motion before paint and only without reduced motion", () => {
    expect(layout).toContain("classList.add('lx-motion')");
    expect(layout).toContain("prefers-reduced-motion: reduce");
    // Failsafe so a missing motion bundle cannot leave the page blank.
    expect(layout).toContain("classList.remove('lx-motion')");
  });

  it("every animated attribute has a CSS start state scoped to .lx-motion", () => {
    for (const attr of [
      "data-fadeup",
      "data-step",
      "data-proj",
      "data-rel",
      "data-reveal",
      "data-reveal2",
      "data-gitem",
      "data-gimg",
    ]) {
      expect(css).toContain(`.lx-motion [${attr}]`);
    }
  });

  it("CSS offsets match the `from` values in motion.ts", () => {
    // e.g. motion.ts `{ opacity: 0, y: 44 }` ⇄ css `translateY(44px)`
    const pairs: Array<[string, string]> = [
      ["data-fadeup", "44"],
      ["data-step", "36"],
      ["data-proj", "60"],
      ["data-rel", "50"],
    ];
    for (const [attr, offset] of pairs) {
      expect(motion, `${attr} y offset in motion.ts`).toContain(`y: ${offset}`);
      expect(css, `${attr} start state in globals.css`).toContain(
        `translateY(${offset}px)`
      );
    }
  });

  it("reveal and gallery clip start states match motion.ts", () => {
    expect(motion).toContain('clipPath: "inset(0 0 100% 0)"');
    expect(css).toContain("clip-path: inset(0 0 100% 0)");

    expect(motion).toContain('clipPath: "inset(10% 0 10% 0)"');
    expect(css).toContain("clip-path: inset(10% 0 10% 0)");

    expect(motion).toContain('clipPath: "inset(12% 6% 12% 6%)"');
    expect(css).toContain("clip-path: inset(12% 6% 12% 6%)");
  });
});
