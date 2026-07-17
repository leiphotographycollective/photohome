import Link from "next/link";
import { img, PHOTOS } from "@/content/portfolio";
import { GOLD, SERIF, cream } from "./tokens";

/* The pinned, horizontally-scrubbed "The Collection" section — identical on
   the home page and the Work page (the motion engine pins [data-hwrap] and
   translates [data-htrack] by scroll). */

// Every card is the same width; combined with the shared 4/5 crop below this
// gives all five images an identical size and fit, aligned on one baseline.
const CARD_WIDTH = "min(38vw,460px)";

const CARDS = [
  { label: "Weddings", n: "01", href: "/weddings", photo: PHOTOS.firstDanceCine },
  { label: "Graduations", n: "02", href: "/portfolio/graduations", photo: PHOTOS.gradPortrait },
  { label: "Portraits & Editorials", n: "03", href: "/portfolio/portraits", photo: PHOTOS.editorial },
  { label: "Headshots & Events", n: "04", href: "/portfolio/events", photo: PHOTOS.naomi, alt: "Portrait session, natural light" },
  { label: "Engagements & Proposals", n: "05", href: "/portfolio/engagements", photo: PHOTOS.proposal, alt: "Proposal moment" },
];

export default function HorizontalCollection() {
  return (
    <section
      data-hwrap=""
      style={{ position: "relative", background: "#0E0D0B", color: "#F7F5F2" }}
    >
      <div
        style={{
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 16,
            padding: "0 38px",
            marginBottom: "5vh",
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: ".28em",
              textTransform: "uppercase",
              color: GOLD,
            }}
          >
            The Collection
          </span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: ".28em",
              textTransform: "uppercase",
              color: cream(0.4),
            }}
          >
            Scroll through five chapters
          </span>
        </div>
        <div
          data-htrack=""
          style={{
            display: "flex",
            gap: "6vw",
            padding: "0 38px",
            width: "max-content",
            // Top-align so all images sit on one line even when a longer
            // label (e.g. "Engagements & Proposals") wraps to two lines.
            alignItems: "flex-start",
          }}
        >
          {CARDS.map((c) => (
            <Link
              key={c.n}
              href={c.href}
              data-hover=""
              style={{
                flex: "0 0 auto",
                width: CARD_WIDTH,
                color: "#F7F5F2",
                textDecoration: "none",
                display: "block",
              }}
            >
              <div style={{ overflow: "hidden", background: "#171411" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  data-hpimg=""
                  src={img(c.photo.path, 1000)}
                  alt={c.alt ?? c.photo.a}
                  style={{
                    width: "100%",
                    aspectRatio: "4 / 5",
                    objectFit: "cover",
                    display: "block",
                    transform: "scale(1.12)",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginTop: 18,
                }}
              >
                <span
                  style={{
                    fontFamily: SERIF,
                    fontSize: "clamp(26px,2.6vw,40px)",
                    fontWeight: 600,
                  }}
                >
                  {c.label}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: ".2em",
                    color: cream(0.45),
                  }}
                >
                  {c.n}
                </span>
              </div>
            </Link>
          ))}
          <div style={{ flex: "0 0 auto", width: "20vw" }} />
        </div>
      </div>
    </section>
  );
}
