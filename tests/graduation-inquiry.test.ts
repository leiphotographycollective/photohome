import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { GRADUATION_INQUIRY_HREF } from "@/content/graduations";

const GRADUATIONS_PAGE = readFileSync(
  "src/app/(site)/graduations/page.tsx",
  "utf8"
);
const INQUIRY_PAGE = readFileSync(
  "src/app/(site)/graduations/inquire/page.tsx",
  "utf8"
);

describe("graduation inquiry funnel", () => {
  it("sends graduation CTAs to the dedicated form", () => {
    expect(GRADUATION_INQUIRY_HREF).toBe("/graduations/inquire#form");
    expect(GRADUATIONS_PAGE).toContain("GRADUATION_INQUIRY_HREF");
    expect(GRADUATIONS_PAGE).not.toContain('href="/inquire#form"');
  });

  it("uses the graduation HoneyBook placement and tracking pixel", () => {
    expect(INQUIRY_PAGE).toContain("6916a511bece1a003537f355");
    expect(INQUIRY_PAGE).toContain("HONEYBOOK_PLACEMENT_ID}-2");
    expect(INQUIRY_PAGE).toContain("https://www.honeybook.com/p.png?pid=");
    expect(INQUIRY_PAGE).toContain(
      "https://widget.honeybook.com/assets_users_production/websiteplacements/placement-controller.min.js"
    );
  });
});
