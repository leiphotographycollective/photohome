import type { Metadata } from "next";
import Link from "next/link";
import LeiPage from "@/components/lei/LeiPage";
import Chrome from "@/components/lei/Chrome";
import LeiFooter from "@/components/lei/LeiFooter";
import HorizontalCollection from "@/components/lei/HorizontalCollection";
import { ParallaxGallery, ScrollHint } from "@/components/lei/blocks";
import { DIM, GOLD, MUTED, SERIF, cream, kicker, pill } from "@/components/lei/tokens";
import { img, PHOTOS } from "@/content/portfolio";

export const metadata: Metadata = {
  title: "The Work",
  description:
    "Weddings, graduations, portraits & editorials, headshots & events, engagements & proposals — photographed with intention across the Bay Area.",
};

export default function WorkPage() {
  return (
    <LeiPage>
      <Chrome active="work" />

      {/* ══ Title ══ */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 38px 8vh",
          background: "#0E0D0B",
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img(PHOTOS.danceLift.path, 2400)}
          alt={PHOTOS.danceLift.a}
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
              "linear-gradient(to top, rgba(14,13,11,.88) 0%, rgba(14,13,11,.32) 52%, rgba(14,13,11,.5) 100%)",
          }}
        />
        <div style={{ position: "relative", zIndex: 2, color: "#F7F5F2" }}>
          <div
            data-fadeup=""
            style={kicker({ marginBottom: "3vh" }, 11, ".34em")}
          >
            Step into a collection of
          </div>
          <h1
            style={{
              margin: 0,
              fontFamily: SERIF,
              fontWeight: 600,
              lineHeight: 0.88,
              letterSpacing: ".01em",
            }}
          >
            <div data-title-line="" style={{ fontSize: "clamp(52px,10vw,148px)" }}>
              ARTISTRY BORN
            </div>
            <div data-title-line="" style={{ fontSize: "clamp(52px,10vw,148px)" }}>
              FROM <em style={{ fontWeight: 400 }}>PRESENCE</em>
            </div>
          </h1>
          <div
            className="lx-hero-row"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: 32,
              marginTop: "5vh",
              flexWrap: "wrap",
            }}
          >
            <p
              data-fadeup=""
              style={{
                maxWidth: 420,
                margin: 0,
                fontSize: 15,
                lineHeight: 1.75,
                color: cream(0.8),
              }}
            >
              Weddings, graduations, portraits &amp; editorials, headshots &amp;
              events, engagements &amp; proposals — photographed with intention
              across the Bay Area.
            </p>
            <div data-fadeup="">
              <ScrollHint color={cream(0.55)} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ Horizontal collection ══ */}
      <HorizontalCollection />

      {/* ══ A closer look ══ */}
      <section
        style={{ position: "relative", background: "#F7F5F2", padding: "16vh 4vw" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 16,
            padding: "0 1vw",
            marginBottom: "8vh",
          }}
        >
          <span style={kicker({})}>A closer look</span>
          <span style={kicker({ color: DIM })}>Recent frames</span>
        </div>
        <ParallaxGallery
          columns={[
            {
              speed: -60,
              marginTop: "8vh",
              images: [
                { src: img(PHOTOS.gradLaughing.path, 1000), alt: PHOTOS.gradLaughing.a, ratio: "4 / 5", cursor: "Graduations" },
                { src: img(PHOTOS.bridal.path, 1000), alt: "Bride holding her veil", ratio: "3 / 4", cursor: "Weddings" },
              ],
            },
            {
              speed: 60,
              images: [
                { src: img(PHOTOS.coastal.path, 1200), alt: PHOTOS.coastal.a, ratio: "4 / 5", cursor: "Couples" },
                { src: img(PHOTOS.sargonPrep.path, 1200), alt: PHOTOS.sargonPrep.a, ratio: "3 / 2", cursor: "Weddings" },
              ],
            },
            {
              speed: -90,
              marginTop: "14vh",
              images: [
                { src: img(PHOTOS.lauren.path, 1000), alt: "Graduation session portrait", ratio: "4 / 5", cursor: "Graduations" },
                { src: img(PHOTOS.editorial.path, 1000), alt: "Moody editorial portrait", ratio: "3 / 4", cursor: "Editorial" },
              ],
            },
          ]}
        />
      </section>

      {/* ══ CTA + footer ══ */}
      <section
        style={{
          position: "relative",
          background: "#0E0D0B",
          color: "#F7F5F2",
          padding: "18vh 6vw 0",
          textAlign: "center",
        }}
      >
        <h2
          data-fadeup=""
          style={{
            margin: "0 auto",
            fontFamily: SERIF,
            fontWeight: 500,
            fontSize: "clamp(36px,5vw,64px)",
            lineHeight: 1.12,
            maxWidth: 900,
            textWrap: "pretty",
          }}
        >
          A curated record of the genuine — something deep, meaningful &amp;{" "}
          <em>real</em>.
        </h2>
        <Link
          data-fadeup=""
          data-mag=""
          data-hover=""
          href="/inquire"
          style={{ ...pill("#F7F5F2", "#0E0D0B"), margin: "44px 0 14vh" }}
        >
          Inquire
        </Link>

        <LeiFooter />
      </section>
    </LeiPage>
  );
}
