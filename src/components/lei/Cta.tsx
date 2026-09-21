import type { CSSProperties } from "react";
import Link from "next/link";
import { CREAM, GOLD, INK, pill } from "./tokens";
import { CTA_HREF, CTA_LABEL } from "@/content/homepage";

/* The one conversion CTA — a solid gold pill. Gold is reserved for
   conversion actions site-wide so the eye learns "gold = inquire". */

export function CtaLink({
  label = CTA_LABEL,
  href = CTA_HREF,
  style,
}: {
  label?: string;
  href?: string;
  style?: CSSProperties;
}) {
  return (
    <Link
      data-mag=""
      data-hover=""
      href={href}
      style={{ ...pill(GOLD, "#0E0D0B"), ...style }}
    >
      {label}
    </Link>
  );
}

/** Secondary CTA — still a clear rounded button, with lower visual priority
 *  than the primary gold conversion action. */
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
      data-mag=""
      data-hover=""
      href={href}
      className="lx-cta2"
      style={{
        ...pill(dark ? GOLD : INK, dark ? INK : CREAM, "14px 26px"),
        borderColor: dark ? GOLD : INK,
        ...style,
      }}
    >
      {label} &rarr;
    </Link>
  );
}
