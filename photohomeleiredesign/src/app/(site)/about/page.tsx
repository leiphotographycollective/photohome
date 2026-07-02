import type { Metadata } from "next";
import Link from "next/link";
import LeiPage from "@/components/lei/LeiPage";
import Chrome from "@/components/lei/Chrome";
import LeiFooter from "@/components/lei/LeiFooter";
import { ParallaxGallery } from "@/components/lei/blocks";
import { DIM, MUTED, SERIF, cream, kicker, pill } from "@/components/lei/tokens";
import { img, PHOTOS } from "@/content/portfolio";

export const metadata: Metadata = {
  title: "About Raymond Lei",
  description:
    "Raymond Lei is a photographer based in San Jose, California — moving fluidly between light, airy frames and editorial, atmospheric work, always in service of the authenticity of the moment.",
};

export default function AboutPage() {
  return (
    <LeiPage>
      <Chrome active="about" />

      {/* ══ Intro ══ */}
      <section
        className="lx-grid-2col"
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 0,
          alignItems: "stretch",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "18vh 5vw 12vh 38px",
          }}
        >
          <div data-fadeup="" style={kicker({ marginBottom: "3vh" }, 11, ".34em")}>
            Showcasing the real you
          </div>
          <h1
            style={{
              margin: "0 0 5vh",
              fontFamily: SERIF,
              fontWeight: 600,
              lineHeight: 0.94,
              letterSpacing: ".01em",
            }}
          >
            <div data-title-line="" style={{ fontSize: "clamp(40px,5.6vw,88px)" }}>
              Hi there,
            </div>
            <div data-title-line="" style={{ fontSize: "clamp(40px,5.6vw,88px)" }}>
              nice to <em style={{ fontWeight: 400 }}>meet you.</em>
            </div>
          </h1>
          <p
            data-fadeup=""
            style={{
              maxWidth: 520,
              margin: "0 0 20px",
              fontSize: 16,
              lineHeight: 1.85,
              color: MUTED,
            }}
          >
            Welcome — I&rsquo;m genuinely glad you&rsquo;re here, and that
            you&rsquo;re considering trusting me with your moments.
          </p>
          <p
            data-fadeup=""
            style={{
              maxWidth: 520,
              margin: "0 0 20px",
              fontSize: 16,
              lineHeight: 1.85,
              color: MUTED,
            }}
          >
            I&rsquo;m a photographer based in San Jose, California. My work began
            with a simple realization — watching friends&rsquo; faces light up at
            the images I&rsquo;d made for them, I understood how much a single
            frame can hold: how it translates emotion, and preserves not just how
            a moment looked, but how it truly felt.
          </p>
          <p
            data-fadeup=""
            style={{
              maxWidth: 520,
              margin: 0,
              fontSize: 16,
              lineHeight: 1.85,
              color: MUTED,
            }}
          >
            I&rsquo;ve never confined myself to a single style. I move fluidly
            between light, airy frames and more editorial, atmospheric work —
            always in service of the authenticity of the moment rather than a
            formula. On set, I build a space that&rsquo;s calm, easy, and
            genuinely fun, because the finest images come from people who feel at
            ease. Above all, my intention is that you look and feel your absolute
            best, with the entire experience shaped around you.
          </p>
        </div>
        <div
          data-reveal=""
          style={{
            position: "relative",
            overflow: "hidden",
            background: "#0E0D0B",
            minHeight: "70vh",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img(PHOTOS.headshot.path, 1500)}
            alt={PHOTOS.headshot.a}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: "scale(1.14)",
            }}
          />
        </div>
      </section>

      {/* ══ Gallery ══ */}
      <section
        style={{ position: "relative", background: "#0E0D0B", padding: "16vh 4vw" }}
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
          <span style={kicker({})}>Selected frames</span>
          <span style={kicker({ color: cream(0.4) })}>A range, kept authentic</span>
        </div>
        <ParallaxGallery
          columns={[
            {
              speed: -60,
              marginTop: "8vh",
              images: [
                { src: img(PHOTOS.gradLaughing.path, 1000), alt: "Candid graduation portrait among flowers", ratio: "4 / 5", cursor: "Graduations" },
                { src: img(PHOTOS.editorial.path, 1000), alt: PHOTOS.editorial.a, ratio: "3 / 4", cursor: "Editorial" },
              ],
            },
            {
              speed: 60,
              images: [
                { src: img(PHOTOS.archEditorial.path, 1200), alt: PHOTOS.archEditorial.a, ratio: "4 / 5", cursor: "Editorial" },
                { src: img(PHOTOS.coastal.path, 1200), alt: PHOTOS.coastal.a, ratio: "3 / 2", cursor: "Couples" },
              ],
            },
            {
              speed: -90,
              marginTop: "14vh",
              images: [
                { src: img(PHOTOS.bridal.path, 1000), alt: "Soft natural-light bridal portrait", ratio: "3 / 4", cursor: "Weddings" },
                { src: img(PHOTOS.bwEditorial.path, 1000), alt: PHOTOS.bwEditorial.a, ratio: "4 / 5", cursor: "Editorial" },
              ],
            },
          ]}
        />
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
          gap: 44,
          textAlign: "center",
        }}
      >
        <p
          data-manifesto=""
          style={{
            maxWidth: 1000,
            margin: 0,
            fontFamily: SERIF,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(28px,4.2vw,58px)",
            lineHeight: 1.3,
            textWrap: "pretty",
          }}
        >
          A curated record of the genuine — something deep, meaningful &amp; real.
        </p>
        <Link
          data-fadeup=""
          data-mag=""
          data-hover=""
          href="/experience"
          style={pill("#0E0D0B", "#F7F5F2")}
        >
          Experience it yourself
        </Link>
      </section>

      {/* ══ Inquiry ══ */}
      <section
        style={{
          position: "relative",
          background: "#0E0D0B",
          color: "#F7F5F2",
          padding: "20vh 6vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 26,
          textAlign: "center",
        }}
      >
        <div data-fadeup="" style={kicker({}, 10, ".3em")}>
          Inquiry
        </div>
        <h2
          data-fadeup=""
          style={{
            margin: 0,
            fontFamily: SERIF,
            fontWeight: 500,
            fontSize: "clamp(32px,4.4vw,58px)",
            lineHeight: 1.12,
            maxWidth: 820,
            textWrap: "pretty",
          }}
        >
          Have questions, or ready to <em>begin</em>?
        </h2>
        <p
          data-fadeup=""
          style={{
            maxWidth: 500,
            margin: 0,
            fontSize: 16,
            lineHeight: 1.8,
            color: cream(0.7),
          }}
        >
          I read every message personally. Tell me a little about what
          you&rsquo;re envisioning, and I&rsquo;ll be in touch to start the
          conversation.
        </p>
        <Link
          data-fadeup=""
          data-mag=""
          data-hover=""
          href="/inquire"
          style={{ ...pill("#F7F5F2", "#0E0D0B"), marginTop: 8 }}
        >
          Get in touch
        </Link>
      </section>

      {/* ══ Footer ══ */}
      <section
        style={{
          position: "relative",
          background: "#0E0D0B",
          color: "#F7F5F2",
          padding: "0 38px",
        }}
      >
        <LeiFooter
          brand="raymond"
          links={["home", "work", "about", "inquire"]}
          border={false}
        />
      </section>
    </LeiPage>
  );
}
