import type { CSSProperties } from "react";
import { GOLD, INK, MUTED } from "@/components/lei/tokens";

/** Quiet section label — sentence case, no wide tracking. */
export function quietLabel(
  overrides: CSSProperties = {},
  size = 12
): CSSProperties {
  return {
    fontSize: size,
    fontWeight: 500,
    letterSpacing: "0.02em",
    textTransform: "none",
    color: GOLD,
    ...overrides,
  };
}

/** Primary action — rounded control, not a tracked pill. */
export function quietPrimary(
  bg: string,
  color: string,
  pad = "14px 24px"
): CSSProperties {
  return {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
    boxSizing: "border-box",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.2,
    letterSpacing: "0.01em",
    textTransform: "none",
    color,
    background: bg,
    textDecoration: "none",
    padding: pad,
    borderRadius: 10,
    border: "1px solid transparent",
    boxShadow: "none",
    transition: "background-color .2s ease, color .2s ease, border-color .2s ease",
    textAlign: "center",
  };
}

/** Secondary action — hairline, same radius as primary. */
export function quietSecondary(pad = "14px 24px"): CSSProperties {
  return {
    ...quietPrimary("transparent", INK, pad),
    border: "1px solid rgba(14,13,11,.18)",
  };
}

/** Thin gold rule — the signature detail for this preview. */
export function ruleStyle(overrides: CSSProperties = {}): CSSProperties {
  return {
    width: 40,
    height: 1,
    background: GOLD,
    border: "none",
    margin: "0 0 20px",
    ...overrides,
  };
}

export const bulletMark: CSSProperties = {
  color: MUTED,
  fontSize: 12,
  flexShrink: 0,
  lineHeight: 1.7,
};
