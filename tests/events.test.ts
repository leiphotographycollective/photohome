import { describe, expect, it } from "vitest";
import { EVENTS_BLURB, EVENTS_CARD_BLURB } from "@/content/events";

// The 18 placeholder frames this file used to describe moved to the four
// event sub-pages under src/app/(site)/gallery/events/*/page.tsx as literal
// <img> tags; /gallery/events itself is now a card index with no photos of
// its own. Those sub-pages are covered by the two tests in
// tests/gallery.test.ts's
// describe("gallery images stay swappable"): "never computes an img src on a
// gallery page" and "resolves every literal image src to a real file". What
// is left here is the copy.
describe("events copy", () => {
  it("has copy for the card and the category page", () => {
    expect(EVENTS_BLURB.length).toBeGreaterThan(0);
    expect(EVENTS_CARD_BLURB.length).toBeGreaterThan(0);
  });
});
