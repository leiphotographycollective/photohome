import type { CSSProperties } from "react";

/* Shared style vocabulary for the Lei experience pages — mirrors the
   Claude Design prototypes' inline values exactly. */

export const SERIF = "var(--font-bodoni), 'Bodoni Moda', serif";
export const CREAM = "#F7F5F2";
export const INK = "#0E0D0B";
export const GOLD = "#B8905A";
export const MUTED = "#605C56";
export const DIM = "#9C9490";

export const cream = (a: number) => `rgba(247,245,242,${a})`;
export const ink = (a: number) => `rgba(14,13,11,${a})`;

/** Small uppercase tracking label (the gold kickers). */
export function kicker(
  overrides: CSSProperties = {},
  size = 10,
  ls = ".28em"
): CSSProperties {
  return {
    fontSize: size,
    fontWeight: 700,
    letterSpacing: ls,
    textTransform: "uppercase",
    color: GOLD,
    ...overrides,
  };
}

/** Header / footer nav link. */
export function navLink(color = "#fff"): CSSProperties {
  return {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: ".22em",
    textTransform: "uppercase",
    color,
    textDecoration: "none",
  };
}

/** Rounded pill CTA. */
export function pill(bg: string, color: string, pad = "16px 34px"): CSSProperties {
  return {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
    boxSizing: "border-box",
    fontSize: 12,
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: ".18em",
    textTransform: "uppercase",
    color,
    background: bg,
    textDecoration: "none",
    padding: pad,
    borderRadius: 999,
    border: "1px solid rgba(14,13,11,.14)",
    boxShadow: "0 10px 28px rgba(14,13,11,.16)",
    transition: "filter var(--transition), box-shadow var(--transition)",
    textAlign: "center",
  };
}
