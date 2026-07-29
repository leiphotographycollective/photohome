import type { CSSProperties } from "react";

/**
 * The inline style every gallery frame uses.
 *
 * `auto` keeps the file's real ratio once it decodes; the value only reserves
 * height before that. That matters here more than it used to: photos are
 * swapped by dropping a new file over an old one, so the ratio written in the
 * page will often be stale. Stale costs a small reflow, never a squashed photo.
 */
export function frame(aspect: string): CSSProperties {
  return {
    width: "100%",
    height: "auto",
    display: "block",
    aspectRatio: `auto ${aspect}`,
  };
}
