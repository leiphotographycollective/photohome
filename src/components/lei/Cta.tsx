import type { CSSProperties } from "react";
import Link from "next/link";
import { GOLD, SERIF, pill } from "./tokens";
import { CTA_HREF, CTA_LABEL, TESTIMONIALS } from "@/content/homepage";

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
