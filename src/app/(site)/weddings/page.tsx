import type { Metadata } from "next";
import Link from "next/link";
import LeiPage from "@/components/lei/LeiPage";
import Chrome from "@/components/lei/Chrome";
import LeiFooter from "@/components/lei/LeiFooter";
import { Marquee, ParallaxGallery, ProcessSteps, ScrollHint } from "@/components/lei/blocks";
import { GOLD, SERIF, cream, kicker, pill } from "@/components/lei/tokens";
import { img, PHOTOS } from "@/content/portfolio";

export const metadata: Metadata = {
  title: "Weddings — Documented Gracefully",
  description:
    "Bay Area wedding photography with artistry, intention and presence. The full arc of your day — the quiet preparation, the vows, the first dance.",
};

const PROCESS = [
  { n: "01", title: "Inquire", body: "Tell me a little about what you're envisioning. This is where your story begins." },
  { n: "02", title: "Connect", body: "A personal conversation about your story, your vision, and the feelings you want to keep." },
  { n: "03", title: "Customize", body: "No two milestones are alike — your proposal is designed around your priorities." },
  { n: "04", title: "Reserve", body: "With your date held, move forward knowing the day will be documented with artistry and intention." },
];

export default function WeddingsPage() {
  return (
    <LeiPage style={{ background: "#0E0D0B", color: "#F7F5F2" }}>
      <Chrome active="weddings" />

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
          src={img(PHOTOS.brideMother.path, 2400)}
          alt={PHOTOS.brideMother.a}
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
            WEDDINGS
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
            Chapter 01 — Weddings
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
              DOCUMENTED
            </div>
            <div data-title-line="" style={{ fontSize: "clamp(40px,9vw,140px)" }}>
              <em style={{ fontWeight: 400 }}>GRACEFULLY.</em>
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
            I create space for you to slow down and experience your day as it
            unfolds — thoughtful guidance and intentional planning, before the
            camera ever comes out.
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

      {/* ══ Full-bleed feature ══ */}
      <section style={{ position: "relative", height: "120vh" }}>
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            data-feature=""
            src={img(PHOTOS.firstDance04.path, 2500)}
            alt={PHOTOS.firstDance04.a}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: "scale(1.18)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(14,13,11,.55), rgba(14,13,11,0) 45%)",
            }}
          />
          <div style={{ position: "absolute", left: 38, bottom: 38 }}>
            <div style={kicker({ marginBottom: 12 })}>Sargon &amp; Odelya</div>
            <div
              style={{
                fontFamily: SERIF,
                fontStyle: "italic",
                fontSize: "clamp(22px,2.6vw,36px)",
              }}
            >
              The first dance, kept forever.
            </div>
          </div>
        </div>
      </section>

      {/* ══ Parallax gallery ══ */}
      <section
        style={{ position: "relative", background: "#0E0D0B", padding: "14vh 0 0" }}
      >
        <div style={{ padding: "0 4vw 10vh" }}>
          <ParallaxGallery
            columns={[
              {
                speed: -60,
                marginTop: "10vh",
                images: [
                  { src: img(PHOTOS.sargon046.path, 1000), alt: "Bride getting ready, shoe moment", ratio: "4 / 5", cursor: "Getting ready" },
                  { src: img(PHOTOS.detailsFlat.path, 1000), alt: "Wedding details flat lay", ratio: "1 / 1", cursor: "Details" },
                  { src: img(PHOTOS.bridal.path, 1000), alt: "Bride holding her veil in soft light", ratio: "3 / 4", cursor: "Portraits" },
                ],
              },
              {
                speed: 60,
                images: [
                  { src: img(PHOTOS.sargon225.path, 1200), alt: PHOTOS.sargon225.a, ratio: "4 / 5", cursor: "Portraits" },
                  { src: img(PHOTOS.firstDance03.path, 1200), alt: "First dance under string lights", ratio: "3 / 2", cursor: "Reception" },
                  { src: img(PHOTOS.sargonPrep.path, 1200), alt: PHOTOS.sargonPrep.a, ratio: "4 / 5", cursor: "First dance" },
                ],
              },
              {
                speed: -90,
                marginTop: "18vh",
                images: [
                  { src: img(PHOTOS.bridesmaidsToast.path, 1000), alt: PHOTOS.bridesmaidsToast.a, ratio: "4 / 5", cursor: "Toasts" },
                  { src: img(PHOTOS.weddingParty.path, 1000), alt: "Wedding party candid", ratio: "4 / 5", cursor: "Wedding party" },
                  { src: img(PHOTOS.proposal.path, 1000), alt: "Proposal moment", ratio: "3 / 4", cursor: "Proposals" },
                ],
              },
            ]}
          />
        </div>
      </section>

      {/* ══ Pull quote ══ */}
      <section
        style={{
          position: "relative",
          background: "#F7F5F2",
          color: "#0E0D0B",
          padding: "22vh 6vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 52,
        }}
      >
        <p
          data-manifesto=""
          style={{
            maxWidth: 1000,
            margin: 0,
            textAlign: "center",
            fontFamily: SERIF,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(28px,4.2vw,58px)",
            lineHeight: 1.3,
            textWrap: "pretty",
          }}
        >
          Your milestones deserve to be documented gracefully — with artistry,
          intention, and presence.
        </p>
        <Link
          data-fadeup=""
          data-mag=""
          data-hover=""
          href="/experience"
          style={pill("#0E0D0B", "#F7F5F2")}
        >
          See how
        </Link>
      </section>

      {/* ══ Process ══ */}
      <section
        style={{ position: "relative", background: "#0E0D0B", color: "#F7F5F2" }}
      >
        <ProcessSteps steps={PROCESS} />
      </section>

      {/* ══ CTA + footer ══ */}
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
            Currently booking 2026 <em>weddings</em>.
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
    </LeiPage>
  );
}
