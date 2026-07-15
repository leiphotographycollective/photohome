import type { CSSProperties } from "react";
import Link from "next/link";
import { GOLD, SERIF, pill } from "./tokens";
import {
  CTA_HREF,
  CTA_LABEL,
  SECONDARY_CTA_HREF,
  SECONDARY_CTA_LABEL,
  TESTIMONIALS,
} from "@/content/homepage";

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

/** Track B soft CTA — a quiet text link that sits directly beneath a gold
 *  pill. Deliberately subordinate: gold stays reserved for the primary
 *  conversion action, so this carries gold only in its underline. */
export function SecondaryCta({
  dark = false,
  style,
}: {
  dark?: boolean;
  style?: CSSProperties;
}) {
  return (
    <Link
      data-hover=""
      href={SECONDARY_CTA_HREF}
      className="lx-cta2"
      style={{
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: ".12em",
        textTransform: "uppercase",
        color: dark ? "rgba(247,245,242,.72)" : "rgba(14,13,11,.62)",
        textDecoration: "underline",
        textUnderlineOffset: 5,
        textDecorationColor: "rgba(184,144,90,.55)",
        ...style,
      }}
    >
      {SECONDARY_CTA_LABEL} &rarr;
    </Link>
  );
}

/** A testimonial beside a CTA. Renders nothing until real quotes exist —
 *  never placeholder text (spec's empty-state rule). */
export function TestimonialSlot({
  index,
  dark = false,
}: {
  index: number;
  dark?: boolean;
}) {
  const t = TESTIMONIALS[index];
  if (!t) return null;
  return (
    <figure data-fadeup="" style={{ margin: "30px 0 0", maxWidth: 460 }}>
      <blockquote
        style={{
          margin: 0,
          fontFamily: SERIF,
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: 20,
          lineHeight: 1.5,
          color: dark ? "#F7F5F2" : "#0E0D0B",
        }}
      >
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption
        style={{
          marginTop: 12,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: ".22em",
          textTransform: "uppercase",
          color: GOLD,
        }}
      >
        {t.names}
        {t.context ? ` · ${t.context}` : ""}
      </figcaption>
    </figure>
  );
}
