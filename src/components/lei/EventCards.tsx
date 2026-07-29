import type { ReactNode } from "react";
import Link from "next/link";
import { SERIF, cream } from "@/components/lei/tokens";

/**
 * The four cards on /gallery/events: Flora.AI, Airaea, SJSU PD Emmys, Other.
 * Each is one link onto that event's own page.
 *
 * Written out one by one rather than mapped over content: the visual editor
 * can only swap an image whose src is a literal string in the page source, so
 * each card's <img> has to appear as its own tag. tests/gallery.test.ts pins
 * these srcs to stay literal.
 *
 * The slow photo zoom on hover comes from .lx-gitem in globals.css, which
 * already transitions and scales its img. No new CSS.
 */

const CARD_IMG = {
  width: "100%",
  height: "auto",
  aspectRatio: "4 / 5",
  objectFit: "cover" as const,
  display: "block",
};

function Card({
  href,
  label,
  blurb,
  children,
}: {
  href: string;
  label: string;
  blurb: string;
  children: ReactNode;
}) {
  return (
    <Link
      data-fadeup=""
      data-hover=""
      href={href}
      style={{
        position: "relative",
        display: "block",
        textDecoration: "none",
        color: "#F7F5F2",
        overflow: "hidden",
      }}
    >
      <div className="lx-gitem" style={{ margin: 0 }}>
        {children}
      </div>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(14,13,11,.82) 0%, rgba(14,13,11,.24) 42%, rgba(14,13,11,0) 68%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 26,
          right: 26,
          bottom: 26,
          pointerEvents: "none",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontFamily: SERIF,
            fontWeight: 600,
            fontSize: "clamp(24px,2.4vw,36px)",
            lineHeight: 1.06,
            letterSpacing: ".01em",
          }}
        >
          {label}
        </h2>
        <div
          style={{
            marginTop: 10,
            fontSize: 13,
            lineHeight: 1.6,
            color: cream(0.74),
          }}
        >
          {blurb}
        </div>
      </div>
    </Link>
  );
}

export default function EventCards() {
  return (
    <section
      style={{
        position: "relative",
        background: "#0E0D0B",
        color: "#F7F5F2",
        padding: "14vh 6vw",
      }}
    >
      <div
        style={{
          display: "grid",
          // auto-fit collapses this to one column on a phone without a media
          // query, which inline styles cannot express.
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "clamp(16px,2.4vw,34px)",
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        <Card
          href="/gallery/events/flora-ai"
          label="Flora.AI"
          blurb="A long table, a wine cellar, one evening."
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/portfolio/events/flora-ai/flora-ai-01.jpg"
            // Decorative here: the label and blurb below already say where
            // this link goes, so a described photo would make a screen
            // reader announce the scene, the label and the blurb as one
            // run-on link name.
            alt=""
            loading="lazy"
            style={CARD_IMG}
          />
        </Card>
        <Card
          href="/gallery/events/airaea"
          label="Airaea"
          blurb="A room learning something, and the person teaching it."
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/portfolio/events/airaea/airaea-05.jpg"
            alt=""
            loading="lazy"
            style={CARD_IMG}
          />
        </Card>
        <Card
          href="/gallery/events/sjsu-pd-emmys"
          label="SJSU PD Emmys"
          blurb="Statuettes, speeches, and the people holding them."
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/portfolio/events/sjsu-pd-emmys/sjsu-pd-emmys-01.jpg"
            alt=""
            loading="lazy"
            style={CARD_IMG}
          />
        </Card>
        <Card
          href="/gallery/events/other"
          label="Other"
          blurb="Galas, panels, and the nights that need no label."
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/portfolio/events/other/other-01.jpg"
            alt=""
            loading="lazy"
            style={CARD_IMG}
          />
        </Card>
      </div>
    </section>
  );
}
