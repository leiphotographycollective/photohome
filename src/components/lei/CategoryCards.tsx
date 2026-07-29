import Link from "next/link";
import { GALLERY } from "@/content/gallery";
import { img } from "@/content/portfolio";
import { SERIF, cream } from "@/components/lei/tokens";

/**
 * The three cards on /gallery: Weddings, Engagements, Events. Each is one link
 * onto that category's own page.
 *
 * Reads GALLERY directly rather than taking a prop. There is exactly one hub,
 * and the card order is the category order by definition.
 *
 * The slow photo zoom on hover comes from .lx-gitem in globals.css, which
 * already transitions and scales its img. No new CSS.
 */
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
        {GALLERY.map((cat) => (
          <Link
            key={cat.id}
            data-fadeup=""
            data-hover=""
            href={cat.href}
            style={{
              position: "relative",
              display: "block",
              textDecoration: "none",
              color: "#F7F5F2",
              overflow: "hidden",
            }}
          >
            <div className="lx-gitem" style={{ margin: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img(cat.cover.path, 1000)}
                // Decorative here: the label and blurb below already say where
                // this link goes, so a described photo would make a screen
                // reader announce the scene, the label and the blurb as one
                // run-on link name.
                alt=""
                loading="lazy"
                style={{
                  width: "100%",
                  height: "auto",
                  aspectRatio: "4 / 5",
                  objectFit: "cover",
                  display: "block",
                }}
              />
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
                {cat.label}
              </h2>
              <div
                style={{
                  marginTop: 10,
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: cream(0.74),
                }}
              >
                {cat.cardBlurb}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
