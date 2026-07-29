import Link from "next/link";
import LeiFooter from "@/components/lei/LeiFooter";
import { Marquee } from "@/components/lei/blocks";
import { SERIF, pill } from "@/components/lei/tokens";

/**
 * The closing block on every gallery page: marquee, booking headline, Inquire
 * pill, footer. One component because all four pages close identically, and
 * four copies of it would be four places to forget when the booking years
 * change.
 */
export default function GalleryCta() {
  return (
    <section
      style={{
        position: "relative",
        background: "#0E0D0B",
        color: "#F7F5F2",
        padding: "0 6vw",
      }}
    >
      <div style={{ margin: "0 -6vw" }}>
        <Marquee phrase="Your day, felt forever" margin="0" />
      </div>
      <div style={{ textAlign: "center", padding: "12vh 0 14vh" }}>
        <h2
          data-fadeup=""
          style={{
            margin: "0 auto",
            fontFamily: SERIF,
            fontWeight: 500,
            fontSize: "clamp(36px,5vw,64px)",
            lineHeight: 1.12,
            maxWidth: 800,
            textWrap: "pretty",
          }}
        >
          Now booking 2026 &amp; 2027 <em>weddings</em>.
        </h2>
        <Link
          data-fadeup=""
          data-mag=""
          data-hover=""
          href="/inquire"
          style={{ ...pill("#F7F5F2", "#0E0D0B"), marginTop: 44 }}
        >
          Inquire
        </Link>
      </div>

      <LeiFooter />
    </section>
  );
}
