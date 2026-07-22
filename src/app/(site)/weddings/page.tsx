import type { Metadata } from "next";
import Link from "next/link";
import LeiPage from "@/components/lei/LeiPage";
import Chrome from "@/components/lei/Chrome";
import LeiFooter from "@/components/lei/LeiFooter";
import { Marquee, ParallaxGallery, ProcessSteps, ScrollHint } from "@/components/lei/blocks";
import { GOLD, SERIF, cream, kicker, pill } from "@/components/lei/tokens";
import { img, PHOTOS } from "@/content/portfolio";
import { HOME_PROCESS } from "@/content/experience";
import { TESTIMONIALS } from "@/content/homepage";
import { SoftLink } from "@/components/lei/Cta";
import { Collage, CollageTile } from "@/components/lei/Collage";
import ProjectStrip from "@/components/lei/ProjectStrip";

export const metadata: Metadata = {
  title: "Weddings: Present for All of It",
  description:
    "Bay Area wedding photography for couples who want to be present in their wedding, not stressed about it. The full arc of your day, from getting ready to the last song.",
};

export default function WeddingsPage() {
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
            Weddings
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

      {/* ══ Collage — the day at a glance, then the closer-look strip ══ */}
      <section style={{ position: "relative", background: "#0E0D0B", padding: "14vh 4vw 12vh" }}>
        <Collage>
          <CollageTile size="tall">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/bay-area-wedding-first-dance-fog-string-lights-black-and-white-lei-photography-collective.jpg"
              alt="Bride and groom sharing their first dance on a fog-covered floor beneath string lights, black and white"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </CollageTile>
          <CollageTile size="tall">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/bay-area-wedding-marina-sunset-kiss-lei-photography-collective.jpg"
              alt="Bride and groom kissing at sunset on the marina railing, sailboat masts glowing behind them"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </CollageTile>
          <CollageTile size="small">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-33.jpg"
              alt="Groom laughing as his groomsman helps with his cufflinks while getting ready"
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </CollageTile>
          <CollageTile size="small">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-26.jpg"
              alt="Bride and groom moving through a crowd of cheering guests"
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </CollageTile>
          <CollageTile size="small">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-15.jpg"
              alt="Bride and her bridesmaids toasting champagne outdoors at golden hour"
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </CollageTile>
          <CollageTile size="small">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-22.jpg"
              alt="Bride and groom walking the garden grounds together, bouquet in hand"
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </CollageTile>

          {/* Mirrored block: 2x2 landscapes left, two tall portraits right */}
          <CollageTile size="small">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-07.jpg"
              alt="Guests gathered around the staircase for the procession, seen from above"
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </CollageTile>
          <CollageTile size="small">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-31.jpg"
              alt="Guests dancing at the reception as money flies through the air, black and white"
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </CollageTile>
          <CollageTile size="tall">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-09.jpg"
              alt="Bride beneath her lace veil holding a pearl-beaded wedding ornament beside the roses"
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </CollageTile>
          <CollageTile size="tall">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-06.jpg"
              alt="Groom descending the stairs carrying a pearl-beaded scepter"
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </CollageTile>
          <CollageTile size="small">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-25.jpg"
              alt="Reception fireplace mantle dressed in black and white florals"
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </CollageTile>
          <CollageTile size="small">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/sargon-odelya-more/sargon-odelya-more-08.jpg"
              alt="Bride at ease on the bed in her gown, champagne chilling beside her"
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </CollageTile>
        </Collage>

        <div style={{ marginTop: "9vh" }}>
          <ProjectStrip />
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
                  // Not PHOTOS.firstDance03: that CDN file is byte-identical to
                  // the full-bleed feature image above (PHOTOS.firstDance04).
                  { src: "/images/portfolio/weddings/sargon-odelya/sargon-odelya-30.jpg", alt: "First dance in low fog, her dress catching the light", ratio: "3 / 2", cursor: "Reception" },
                  { src: img(PHOTOS.sargonPrep.path, 1200), alt: "Wedding preparation moment", ratio: "4 / 5", cursor: "Getting ready" },
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

      {/* ══ Proof + price anchor ══ */}
      <section
        style={{
          position: "relative",
          background: "#0E0D0B",
          padding: "16vh 6vw",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <blockquote
            data-fadeup=""
            style={{
              margin: 0,
              fontFamily: SERIF,
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(22px,2.6vw,34px)",
              lineHeight: 1.4,
              textWrap: "pretty",
            }}
          >
            &ldquo;{TESTIMONIALS[0].pull}&rdquo;
          </blockquote>
          <div data-fadeup="" style={kicker({ marginTop: 26 }, 10, ".3em")}>
            {TESTIMONIALS[0].names}
          </div>
          <div data-fadeup="" style={{ marginTop: 34 }}>
            <SoftLink dark href="/investment" label="Collections from $2,400" />
          </div>
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
          The moments you&rsquo;ll want back, kept the way they felt.
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
        <ProcessSteps steps={HOME_PROCESS} />
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
    </LeiPage>
  );
}
