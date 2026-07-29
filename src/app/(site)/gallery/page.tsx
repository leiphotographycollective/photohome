import type { Metadata } from "next";
import LeiPage from "@/components/lei/LeiPage";
import Chrome from "@/components/lei/Chrome";
import CategoryCards from "@/components/lei/CategoryCards";
import GalleryCta from "@/components/lei/GalleryCta";
import { ScrollHint } from "@/components/lei/blocks";
import { SERIF, cream, kicker } from "@/components/lei/tokens";
import { img } from "@/content/portfolio";
import { GALLERY_HERO } from "@/content/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Bay Area wedding, engagement and event photography. Full wedding days, proposals, and the galas and mixers in between.",
};

/* The gallery hub. Three cards, one per category, each onto its own page:
   /gallery/weddings, /gallery/engagements, /gallery/events. The grids that
   used to live here moved onto those pages on 2026-07-28, along with the
   full-bleed feature and the testimonial (now on /gallery/weddings). */
export default function GalleryPage() {
  return (
    <LeiPage style={{ background: "#0E0D0B", color: "#F7F5F2" }}>
      <Chrome />

      {/* ══ Title ══ */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          overflow: "hidden",
          padding: "0 6vw",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img(GALLERY_HERO.path, 2400)}
          alt={GALLERY_HERO.a}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(14,13,11,.86) 0%, rgba(14,13,11,.58) 55%, rgba(14,13,11,.74) 100%)",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            transform: "translateY(-50%)",
            display: "flex",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <span
            data-ghost="hero"
            style={{
              fontFamily: SERIF,
              fontWeight: 700,
              fontSize: "22vw",
              lineHeight: 1,
              color: cream(0.05),
              letterSpacing: "-.02em",
              whiteSpace: "nowrap",
            }}
          >
            GALLERY
          </span>
        </div>
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div data-fadeup="" style={kicker({ marginBottom: 24 }, 10, ".3em")}>
            The Gallery
          </div>
          <h1
            style={{
              margin: 0,
              fontFamily: SERIF,
              fontWeight: 600,
              lineHeight: 0.92,
              letterSpacing: ".01em",
            }}
          >
            <div data-title-line="" style={{ fontSize: "clamp(40px,9vw,140px)" }}>
              PRESENT FOR
            </div>
            <div data-title-line="" style={{ fontSize: "clamp(40px,9vw,140px)" }}>
              <em style={{ fontWeight: 400 }}>ALL OF IT.</em>
            </div>
          </h1>
          <p
            data-fadeup=""
            style={{
              maxWidth: 620,
              margin: "36px 0 0",
              fontSize: 16,
              lineHeight: 1.75,
              color: cream(0.72),
            }}
          >
            You two stay in the day; I&rsquo;ll make sure you get it back. The
            planning happens before the camera ever comes out.
          </p>
        </div>
        <div
          data-fadeup=""
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 42,
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          <ScrollHint color={cream(0.5)} />
        </div>
      </section>

      {/* ══ The three cards. Order and copy come from src/content/gallery.ts ══ */}
      <CategoryCards />

      <GalleryCta />
    </LeiPage>
  );
}
