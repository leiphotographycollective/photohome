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

describe("event sets", () => {
  it("holds three events in order", () => {
    expect(EVENT_SETS.map((s) => s.id)).toEqual([
      "event-one",
      "event-two",
      "event-three",
    ]);
  });

  it("gives every event a name and six frames", () => {
    for (const set of EVENT_SETS) {
      expect(set.name.length, set.id).toBeGreaterThan(0);
      expect(set.photos.length, set.id).toBe(6);
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

  // 19 hand-written paths: a typo in one of them is a broken image in
  // production that nothing else here would catch.
  it("resolves every frame and the card cover to a real file", () => {
    const paths = [
      ...EVENT_SETS.flatMap((s) => s.photos.map((p) => p.path)),
      EVENTS_CARD_COVER.path,
    ];
    expect(paths.length).toBe(19); // walker sanity check
    for (const path of paths) {
      expect(existsSync(join(PUBLIC, path)), `missing ${path}`).toBe(true);
    }
  });

  it("has copy for the card and the category page", () => {
    expect(EVENTS_BLURB.length).toBeGreaterThan(0);
    expect(EVENTS_CARD_BLURB.length).toBeGreaterThan(0);
  });
});
