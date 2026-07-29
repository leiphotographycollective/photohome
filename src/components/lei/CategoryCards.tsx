import type { ReactNode } from "react";
import Link from "next/link";
import { SERIF, cream } from "@/components/lei/tokens";

/**
 * The three cards on /gallery: Weddings, Engagements, Events. Each is one link
 * onto that category's own page.
 *
 * Written out one by one rather than mapped over content: the visual editor
 * can only swap an image whose src is a literal string in the page source, so
 * each card's <img> has to appear as its own tag. The labels and blurbs move
 * in here too, as the one deliberate exception to "copy stays in
 * src/content/": splitting three short strings across two files to satisfy a
 * lint rule would make them harder to edit, not easier, when the whole point
 * of this file is that each card is a self-contained swap surface.
 * tests/gallery.test.ts pins these strings to GALLERY so they cannot drift.
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

export default function CategoryCards() {
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
          href="/gallery/weddings"
          label="Weddings"
          blurb="The whole day, start to finish."
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/portfolio/weddings/sargon-odelya-select/so-select-300.jpg"
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
          href="/gallery/engagements"
          label="Engagements"
          blurb="The nerves, the question, the yes."
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.squarespace-cdn.com/content/v1/697c1d6344a3b1154bcbc39e/fd9815f2-39b8-476e-9b16-bbf4d9b863ea/Lei.Photography.Co-JakeProposalReEdit-09.jpg?format=1200w"
            alt=""
            loading="lazy"
            style={CARD_IMG}
          />
        </Card>
        <Card
          href="/gallery/events"
          label="Events"
          blurb="Galas, panels, and the parties after."
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/portfolio/events/events-card-cover.jpg"
            alt=""
            loading="lazy"
            style={CARD_IMG}
          />
        </Card>
      </div>
    </section>
  );
}
