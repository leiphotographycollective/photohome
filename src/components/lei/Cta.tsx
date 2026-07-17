import type { CSSProperties } from "react";
import Link from "next/link";
import { GOLD, pill, cream, ink } from "./tokens";
import { CTA_HREF, CTA_LABEL } from "@/content/homepage";

/* The one conversion CTA — a solid gold pill. Gold is reserved for
   conversion actions site-wide so the eye learns "gold = inquire". */

export function CtaLink({
  label = CTA_LABEL,
  style,
}: {
  label?: string;
  style?: CSSProperties;
}) {
  return (
    <Link
      data-mag=""
      data-hover=""
      href={CTA_HREF}
      style={{ ...pill(GOLD, "#0E0D0B"), ...style }}
    >
      {label}
    </Link>
  );
}

/** Generic quiet underlined link — the subordinate treatment for non-primary
 *  destinations (free session, experience, investment). Gold appears only in
 *  the underline, so the gold pill stays the page's one conversion action. */
export function SoftLink({
  href,
  label,
  dark = false,
  style,
}: {
  href: string;
  label: string;
  dark?: boolean;
  style?: CSSProperties;
}) {
  return (
    <Link
      data-hover=""
      href={href}
      className="lx-cta2"
      style={{
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: ".12em",
        textTransform: "uppercase",
        color: dark ? cream(0.72) : ink(0.62),
        textDecoration: "underline",
        textUnderlineOffset: 5,
        textDecorationColor: "rgba(184,144,90,.55)",
        ...style,
      }}
    >
      {label} &rarr;
    </Link>
  );
}
