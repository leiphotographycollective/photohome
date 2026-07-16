import type { Metadata } from "next";
import Link from "next/link";
import LeiPage from "@/components/lei/LeiPage";
import Chrome from "@/components/lei/Chrome";
import LeiFooter from "@/components/lei/LeiFooter";
import { ProcessSteps, ScrollHint } from "@/components/lei/blocks";
import { GOLD, MUTED, SERIF, cream, kicker, pill } from "@/components/lei/tokens";
import { img, PHOTOS } from "@/content/portfolio";
import { PROCESS, QUALIFIERS } from "@/content/experience";

export const metadata: Metadata = {
  title: "The Experience",
  description:
    "What it's like to work with me — how I make the day feel easy and the photos feel like you, before, during and after the shutter clicks.",
};

export default function ExperiencePage() {
  return (
    <LeiPage>
      <Chrome />

      {/* ══ Hero ══ */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 38px 9vh",
          background: "#0E0D0B",
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img(PHOTOS.coastal.path, 2400)}
          alt={PHOTOS.coastal.a}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 30%",
            display: "block",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(14,13,11,.86) 0%, rgba(14,13,11,.22) 52%, rgba(14,13,11,.42) 100%)",
          }}
        />
        <div style={{ position: "relative", zIndex: 2, color: "#F7F5F2" }}>
          <div data-fadeup="" style={kicker({ marginBottom: "3vh" }, 11, ".34em")}>
            What it&rsquo;s like to work with me
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
            <div data-title-line="" style={{ fontSize: "clamp(40px,8vw,120px)" }}>
              THE
            </div>
            <div data-title-line="" style={{ fontSize: "clamp(40px,8vw,120px)" }}>
              <em style={{ fontWeight: 400 }}>EXPERIENCE</em>
            </div>
          </h1>
          <div
            className="lx-hero-row"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginTop: "5vh",
              gap: 32,
              flexWrap: "wrap",
            }}
          >
            <p
              data-fadeup=""
              style={{
                maxWidth: 460,
                margin: 0,
                fontSize: 16,
                lineHeight: 1.8,
                color: cream(0.8),
              }}
            >
              Here&rsquo;s how I make the day feel easy — and the photos feel
              like you.
            </p>
            <div data-fadeup="">
              <ScrollHint color={cream(0.55)} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ You're here because ══ */}
      <section
        style={{
          position: "relative",
          background: "#0E0D0B",
          color: "#F7F5F2",
          padding: "18vh 6vw",
          overflow: "hidden",
        }}
      >
        <div
          className="lx-grid-2col"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.1fr .9fr",
            gap: "6vw",
            alignItems: "center",
          }}
        >
          <div>
            <div data-fadeup="" style={kicker({ marginBottom: 30 }, 10, ".3em")}>
              You&rsquo;re here because…
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
              {QUALIFIERS.map((text) => (
                <div
                  key={text}
                  data-step=""
                  style={{
                    display: "flex",
                    gap: 20,
                    alignItems: "baseline",
                    borderTop: `1px solid ${cream(0.14)}`,
                    paddingTop: 26,
                  }}
                >
                  <span style={{ color: GOLD, fontSize: 20, lineHeight: 1 }}>•</span>
                  <span
                    style={{
                      fontFamily: SERIF,
                      fontSize: "clamp(20px,2.1vw,30px)",
                      fontWeight: 500,
                      lineHeight: 1.3,
                    }}
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>
            <div
              data-fadeup=""
              style={{
                marginTop: 44,
                fontFamily: SERIF,
                fontStyle: "italic",
                fontSize: "clamp(26px,3vw,44px)",
                color: GOLD,
              }}
            >
              That&rsquo;s when I come through for you.
            </div>
          </div>
          <div data-reveal="" style={{ overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img(PHOTOS.gownEditorial.path, 1000)}
              alt={PHOTOS.gownEditorial.a}
              style={{
                width: "100%",
                aspectRatio: "4 / 5",
                objectFit: "cover",
                display: "block",
                transform: "scale(1.14)",
              }}
            />
          </div>
        </div>
      </section>

      {/* ══ Statement ══ */}
      <section
        style={{
          position: "relative",
          background: "#F7F5F2",
          color: "#0E0D0B",
          padding: "22vh 6vw",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
        }}
      >
        <h2
          data-manifesto=""
          style={{
            maxWidth: 1200,
            margin: 0,
            fontFamily: SERIF,
            fontWeight: 500,
            fontSize: "clamp(28px,4vw,58px)",
            lineHeight: 1.18,
            textWrap: "pretty",
          }}
        >
          Wedding, graduation, or something only you two would think up&hellip;
        </h2>
        <p
          data-fadeup=""
          style={{
            maxWidth: 640,
            margin: 0,
            fontSize: 17,
            lineHeight: 1.8,
            color: MUTED,
          }}
        >
          I show up calm, prepared, and genuinely excited. You bring the day;
          I&rsquo;ll take care of how it&rsquo;s remembered.
        </p>
      </section>

      {/* ══ Full-bleed band ══ */}
      <section style={{ position: "relative", height: "96vh", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          data-band=""
          src={img(PHOTOS.danceLift.path, 2000)}
          alt={PHOTOS.danceLift.a}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: "scale(1.16)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top,rgba(14,13,11,.5),rgba(14,13,11,0) 55%)",
          }}
        />
      </section>

      {/* ══ My Approach ══ */}
      <section
        style={{
          position: "relative",
          background: "#0E0D0B",
          color: "#F7F5F2",
          padding: "18vh 6vw",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2
            data-fadeup=""
            style={{
              margin: "0 0 8vh",
              fontFamily: SERIF,
              fontWeight: 500,
              fontSize: "clamp(38px,5.5vw,86px)",
              lineHeight: 1,
            }}
          >
            The Approach
          </h2>
          <div
            className="lx-grid-2col"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "6vw",
              alignItems: "start",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 24,
                maxWidth: 520,
              }}
            >
              <p
                data-fadeup=""
                style={{
                  margin: 0,
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontSize: "clamp(22px,2.4vw,32px)",
                  lineHeight: 1.4,
                  color: "#F7F5F2",
                }}
              >
                A wedding gallery should do two things: look like an editorial,
                and feel like the day. Most photographers pick one.
              </p>
              <p
                data-fadeup=""
                style={{
                  margin: 0,
                  fontSize: 16,
                  lineHeight: 1.85,
                  color: cream(0.72),
                }}
              >
                The editorial half is training — composition, light, and framing
                carried over from fashion work. The feeling half is direction:
                quiet prompts, calm pacing, never &ldquo;now look at each other
                and giggle.&rdquo; You don&rsquo;t have to be good in photos. You
                just need someone who knows how to get you there.
              </p>
              <p
                data-fadeup=""
                style={{
                  margin: 0,
                  fontSize: 16,
                  lineHeight: 1.85,
                  color: cream(0.72),
                }}
              >
                And when the weather turns or the timeline slips — that&rsquo;s
                not your problem on the day. I plan for it before the camera ever
                comes out.
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "2.4vw",
                alignItems: "start",
              }}
            >
              <div
                data-col=""
                data-colspeed="-50"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2.4vw",
                  marginTop: "8vh",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  data-gimg=""
                  data-cursor="Weddings"
                  src={img(PHOTOS.firstDanceBW.path, 1000)}
                  alt={PHOTOS.firstDanceBW.a}
                  style={{ width: "100%", aspectRatio: "3 / 4", objectFit: "cover", display: "block" }}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  data-gimg=""
                  data-cursor="Coastal"
                  src={img(PHOTOS.coastalCandid.path, 1000)}
                  alt={PHOTOS.coastalCandid.a}
                  style={{ width: "100%", aspectRatio: "4 / 5", objectFit: "cover", display: "block" }}
                />
              </div>
              <div
                data-col=""
                data-colspeed="55"
                style={{ display: "flex", flexDirection: "column", gap: "2.4vw" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  data-gimg=""
                  data-cursor="Candid"
                  src={img(PHOTOS.groomPrep.path, 1000)}
                  alt={PHOTOS.groomPrep.a}
                  style={{ width: "100%", aspectRatio: "4 / 5", objectFit: "cover", display: "block" }}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  data-gimg=""
                  data-cursor="Family"
                  src={img(PHOTOS.brideMother.path, 1000)}
                  alt={PHOTOS.brideMother.a}
                  style={{ width: "100%", aspectRatio: "3 / 4", objectFit: "cover", display: "block" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ What To Expect ══ */}
      <section
        style={{
          position: "relative",
          background: "#F7F5F2",
          color: "#0E0D0B",
          padding: "18vh 6vw",
        }}
      >
        <div
          className="lx-grid-2col"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "minmax(300px,520px) 1fr",
            gap: "6vw",
            alignItems: "center",
          }}
        >
          <div data-reveal2="" style={{ overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img(PHOTOS.coastKiss.path, 1200)}
              alt={PHOTOS.coastKiss.a}
              style={{
                width: "100%",
                aspectRatio: "4 / 5",
                objectFit: "cover",
                display: "block",
                transform: "scale(1.14)",
              }}
            />
          </div>
          <div style={{ maxWidth: 560 }}>
            <h2
              data-fadeup=""
              style={{
                margin: "0 0 40px",
                fontFamily: SERIF,
                fontWeight: 500,
                fontSize: "clamp(34px,4.6vw,64px)",
                lineHeight: 1.05,
              }}
            >
              What to <em>Expect</em>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <p
                data-fadeup=""
                style={{ margin: 0, fontSize: 16, lineHeight: 1.85, color: MUTED }}
              >
                <strong style={{ color: "#0E0D0B", fontWeight: 600 }}>Before.</strong>{" "}
                Clear communication from the first email, and a real timeline
                built with you — so the day itself runs without you managing it.
              </p>
              <p
                data-fadeup=""
                style={{ margin: 0, fontSize: 16, lineHeight: 1.85, color: MUTED }}
              >
                <strong style={{ color: "#0E0D0B", fontWeight: 600 }}>During.</strong>{" "}
                I direct when you need it, and disappear when you don&rsquo;t.
              </p>
              <p
                data-fadeup=""
                style={{ margin: 0, fontSize: 16, lineHeight: 1.85, color: MUTED }}
              >
                <strong style={{ color: "#0E0D0B", fontWeight: 600 }}>After.</strong>{" "}
                Your gallery is curated, not dumped — delivered in a designed
                online gallery with options to print and keep. It should feel like
                the day, every time you open it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ The Process ══ */}
      <section
        style={{ position: "relative", background: "#0E0D0B", color: "#F7F5F2" }}
      >
        <ProcessSteps steps={PROCESS} />
      </section>

      {/* ══ Inquiry CTA ══ */}
      <section
        style={{
          position: "relative",
          background: "#F7F5F2",
          color: "#0E0D0B",
          padding: "20vh 6vw 16vh",
          textAlign: "center",
        }}
      >
        <div data-fadeup="" style={kicker({ marginBottom: 22 }, 10, ".3em")}>
          Ready when you are
        </div>
        <h2
          data-fadeup=""
          style={{
            margin: "0 auto",
            fontFamily: SERIF,
            fontWeight: 500,
            fontSize: "clamp(34px,5vw,64px)",
            lineHeight: 1.12,
            maxWidth: 820,
            textWrap: "pretty",
          }}
        >
          Let&rsquo;s talk about <em>your day</em>.
        </h2>
        <Link
          data-fadeup=""
          data-mag=""
          data-hover=""
          href="/inquire"
          style={{ ...pill("#0E0D0B", "#F7F5F2"), marginTop: 40 }}
        >
          Inquire
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
