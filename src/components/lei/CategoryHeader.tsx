import Link from "next/link";
import { SERIF, cream, kicker } from "@/components/lei/tokens";

/**
 * The compact title band at the top of a category page. Deliberately not a
 * second full-screen photo hero: a visitor arriving here has already clicked
 * a card and wants the photos, not another cover.
 *
 * The category blurb is not rendered here. CategoryGallery prints it above the
 * grid, and printing it in both places would show it twice.
 */
export default function CategoryHeader({ label }: { label: string }) {
  return (
    <section
      style={{
        position: "relative",
        background: "#0E0D0B",
        color: "#F7F5F2",
        padding: "calc(var(--lx-header-h) + 12vh) 6vw 10vh",
      }}
    >
      <Link
        data-fadeup=""
        data-hover=""
        href="/gallery"
        style={{
          ...kicker({ display: "inline-block", marginBottom: 24 }, 10, ".3em"),
          textDecoration: "none",
        }}
      >
        Gallery
      </Link>
      <h1
        style={{
          margin: 0,
          fontFamily: SERIF,
          fontWeight: 600,
          fontSize: "clamp(40px,8vw,110px)",
          lineHeight: 0.96,
          letterSpacing: ".01em",
        }}
      >
        <span data-title-line="">{label}</span>
      </h1>
      <hr
        data-fadeup=""
        style={{
          border: 0,
          borderTop: `1px solid ${cream(0.18)}`,
          margin: "8vh 0 0",
        }}
      />
    </section>
  );
}
