import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  EVENTS_BLURB,
  EVENTS_CARD_BLURB,
  EVENTS_CARD_COVER,
  EVENT_SETS,
} from "@/content/events";

const PUBLIC = join(process.cwd(), "public");

// These assertions check structure, not today's literal values. The set
// names, ids, and per-set photo counts are all expected to change the moment
// Raymond swaps in real photos and renames "Event One" etc. to what the event
// actually was, so pinning those exact values here would turn the suite red
// for doing the documented, expected thing.
describe("event sets", () => {
  it("holds three events", () => {
    expect(EVENT_SETS.length).toBe(3);
  });

  it("gives every event a non-empty id, name, and at least one photo", () => {
    for (const set of EVENT_SETS) {
      expect(set.id.length, "empty id").toBeGreaterThan(0);
      expect(set.name.length, set.id).toBeGreaterThan(0);
      expect(set.photos.length, set.id).toBeGreaterThanOrEqual(1);
    }
  });

  it("gives every frame a path and real alt text", () => {
    for (const set of EVENT_SETS) {
      for (const p of set.photos) {
        expect(p.path.length, `${set.id}: empty path`).toBeGreaterThan(0);
        expect(p.a.length, `${set.id}: ${p.path} has no alt`).toBeGreaterThan(0);
      }
    }
  });

  it("never repeats a frame across events", () => {
    const paths = EVENT_SETS.flatMap((s) => s.photos.map((p) => p.path));
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("resolves every frame and the card cover to a real file", () => {
    const paths = [
      ...EVENT_SETS.flatMap((s) => s.photos.map((p) => p.path)),
      EVENTS_CARD_COVER.path,
    ];
    // Non-empty, not a fixed count: the walker is still guarded without
    // pinning today's frame count.
    expect(paths.length).toBeGreaterThan(0);
    for (const path of paths) {
      expect(existsSync(join(PUBLIC, path)), `missing ${path}`).toBe(true);
    }
  });

  it("has copy for the card and the category page", () => {
    expect(EVENTS_BLURB.length).toBeGreaterThan(0);
    expect(EVENTS_CARD_BLURB.length).toBeGreaterThan(0);
  });
});
