import type { Metadata } from "next";
import Link from "next/link";
import LeiPage from "@/components/lei/LeiPage";
import Chrome from "@/components/lei/Chrome";
import LeiFooter from "@/components/lei/LeiFooter";
import { Marquee, ProcessSteps } from "@/components/lei/blocks";
import { GOLD, MUTED, SERIF, cream, ink, kicker, pill } from "@/components/lei/tokens";
import { img, PHOTOS } from "@/content/portfolio";
import { CtaLink, SoftLink } from "@/components/lei/Cta";
import { CITY, POSITIONING, WEDDING_PORTFOLIO } from "@/content/homepage";
import HeroSlideshow from "@/components/lei/HeroSlideshow";
import { HOME_PROCESS, QUALIFIERS } from "@/content/experience";
import TestimonialFeature from "@/components/lei/TestimonialFeature";

export const metadata: Metadata = {
  title: "Editorial Wedding Photography in the San Francisco Bay Area",
  description:
    `${POSITIONING} Editorial wedding photography for couples who want to be present in their wedding, not stress about it. ${CITY} & beyond, by Raymond Lei.`,
};

export default function HomePage() {
  return (
    <LeiPage>
      <Chrome />

      {/* ══ Hero — split: rotating photo left, introduction right. The photo
          cross-fades through HERO_PHOTOS (~4s each); the first frame is the
          LCP image and the rotation is a motion-respecting enhancement. ══ */}
      <section
        id="top"
        className="lx-hero"
        style={{
          position: "relative",
          background: "#F7F5F2",
          color: "#0E0D0B",
        }}
      >
        <HeroSlideshow />
        <div
          className="lx-hero-copy"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "10vh 6vw",
          }}
        >
          <p
            style={{
              margin: "0 0 44px",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: ".18em",
              textTransform: "uppercase",
            }}
          >
            <span style={{ color: GOLD }}>Hi, I&rsquo;m Raymond,</span>{" "}
            <span style={{ color: MUTED }}>A Bay Area Wedding Photographer.</span>
          </p>
          <h1
            style={{
              margin: 0,
              fontFamily: SERIF,
              fontWeight: 500,
              fontSize: "clamp(30px,3.2vw,52px)",
              lineHeight: 1.24,
              letterSpacing: ".01em",
              textWrap: "pretty",
            }}
          >
            UPBEAT, INTENTIONAL
            <br />
            and unmistakably YOU
          </h1>
        </div>
      </section>

      {/* ══ Manifesto ══ */}
      <section
        style={{
          position: "relative",
          background: "#F7F5F2",
          padding: "26vh 6vw",
          display: "flex",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          data-float=""
          data-speed="70"
          className="lx-float"
          src={img(PHOTOS.bridal.path, 750)}
          alt="Bride holding her veil in soft light"
          loading="lazy"
          style={{
            position: "absolute",
            left: "4vw",
            top: "8%",
            width: "13vw",
            minWidth: 130,
            aspectRatio: "3 / 4",
            objectFit: "cover",
            boxShadow: "0 30px 60px rgba(14,13,11,.22)",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          data-float=""
          data-speed="110"
          className="lx-float"
          src={img(PHOTOS.shoulderDance.path, 750)}
          alt={PHOTOS.shoulderDance.a}
          loading="lazy"
          style={{
            position: "absolute",
            right: "5vw",
            bottom: "6%",
            width: "12vw",
            minWidth: 120,
            aspectRatio: "4 / 5",
            objectFit: "cover",
            boxShadow: "0 30px 60px rgba(14,13,11,.22)",
          }}
        />
        <p
          data-manifesto=""
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 1100,
            margin: 0,
            textAlign: "center",
            fontFamily: SERIF,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(30px,4.6vw,64px)",
            lineHeight: 1.25,
            color: "#0E0D0B",
            textWrap: "pretty",
          }}
        >
          You two, at your absolute best: the style, the party, and every real moment in between.
        </p>
      </section>

      {/* ══ Who I photograph ══ */}
      <section
        className="lx-grid-2col"
        style={{
          position: "relative",
          background: "#F7F5F2",
          color: "#0E0D0B",
          padding: "0 6vw 22vh",
          display: "grid",
          gridTemplateColumns: "minmax(300px,560px) minmax(280px,440px)",
          gap: "7vw",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "100%",
        }}
      >
        <div>
          <div data-fadeup="" style={kicker({ marginBottom: 20 }, 10, ".3em")}>
            For couples like you
          </div>
          <h2
            data-fadeup=""
            style={{
              margin: "0 0 26px",
              fontFamily: SERIF,
              fontWeight: 500,
              fontSize: "clamp(36px,4.4vw,58px)",
              lineHeight: 1.08,
              textWrap: "pretty",
            }}
          >
            You two are <em>the story.</em> I just know where to point the camera.
          </h2>
          <p
            data-fadeup=""
            style={{ margin: "0 0 26px", fontSize: 16, lineHeight: 1.8, color: MUTED }}
          >
            Hi! I’m Raymond. I shoot weddings the way magazines shoot cover stories, except the story is real, it’s yours, and nobody has to hold a pose through it. If you’re bringing the style and the party, I am SO in.
          </p>
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {[
              `Weddings, from the quiet getting-ready hours to the last song. I'll work the room all night so you two can just be in it.`,
              `Engagements and couples sessions that feel like a good date, not a photoshoot.`,
              `Ever said “I'm awkward in front of a camera”? Perfect, you're in good company; most of my favorite people have.`,
            ].map((line) => (
              <li
                key={line}
                data-fadeup=""
                style={{ display: "flex", gap: 14, alignItems: "baseline" }}
              >
                <span style={{ color: GOLD, fontSize: 11, flexShrink: 0 }}>★</span>
                <span style={{ fontSize: 15, lineHeight: 1.7, color: MUTED }}>
                  {line}
                </span>
              </li>
            ))}
          </ul>
          <div
            data-fadeup=""
            style={{
              marginTop: 34,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 16,
            }}
          >
            <CtaLink />          </div>
        </div>

        <div style={{ position: "relative", margin: "0 0 12%" }}>
          <div data-reveal="" style={{ overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img(PHOTOS.firstDanceClouds.path, 1000)}
              alt={PHOTOS.firstDanceClouds.a}
              loading="lazy"
              style={{
                width: "100%",
                aspectRatio: "4 / 5",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            data-fadeup=""
            src={img(PHOTOS.ringsEmbrace.path, 750)}
            alt={PHOTOS.ringsEmbrace.a}
            loading="lazy"
            style={{
              position: "absolute",
              left: "-6%",
              bottom: "-12%",
              width: "48%",
              aspectRatio: "3 / 4",
              objectFit: "cover",
              border: "6px solid #F7F5F2",
              boxShadow: "0 30px 60px rgba(14,13,11,.22)",
            }}
          />
        </div>
      </section>

      {/* ══ Marina band — the full frame, uncropped (no cover/zoom: the
          photo renders at its native aspect ratio edge to edge) ══ */}
      <section style={{ position: "relative", background: "#F7F5F2" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img(PHOTOS.marinaBoardwalk.path, 2000)}
          alt={PHOTOS.marinaBoardwalk.a}
          loading="lazy"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </section>

      {/* ══ You're here because… — transplanted from /experience, cream-inverted ══ */}
      <section
        style={{
          position: "relative",
          background: "#F7F5F2",
          color: "#0E0D0B",
          padding: "16vh 6vw 20vh",
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
              You&rsquo;re here because&hellip;
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
                    borderTop: `1px solid ${ink(0.14)}`,
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
            <div data-fadeup="" style={{ marginTop: 28 }}>
              <SoftLink href="/experience" label="Read about the full experience" />
            </div>
          </div>
          <div data-reveal="" style={{ overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img(PHOTOS.marinaKiss.path, 1000)}
              alt={PHOTOS.marinaKiss.a}
              loading="lazy"
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

      {/* ══ The Wedding Portfolio — the proof, inline ══ */}
      <section
        style={{
          position: "relative",
          background: "#0E0D0B",
          color: "#F7F5F2",
          padding: "16vh 6vw",
        }}
      >
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <div data-fadeup="" style={kicker({ marginBottom: 18 }, 10, ".3em")}>
            The Portfolio
          </div>
          <h2
            data-fadeup=""
            style={{
              margin: "0 0 7vh",
              fontFamily: SERIF,
              fontWeight: 500,
              fontSize: "clamp(34px,4.4vw,58px)",
              lineHeight: 1.08,
              textWrap: "pretty",
            }}
          >
            Your day, the way it actually <em>felt.</em>
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "2.4vw" }}>
            {WEDDING_PORTFOLIO.map((row, i) =>
              row.layout === "full" ? (
                <div
                  key={row.photos[0].path}
                  data-reveal=""
                  style={{ overflow: "hidden" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img(row.photos[0].path, 1500)}
                    alt={row.photos[0].a}
                    loading={i === 0 ? undefined : "lazy"}
                    style={{
                      width: "100%",
                      aspectRatio: "16 / 10",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              ) : (
                <div
                  key={row.photos[0].path}
                  className="lx-grid-2col"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "2.4vw",
                  }}
                >
                  {row.photos.map((p) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={p.path}
                      data-fadeup=""
                      src={img(p.path, 750)}
                      alt={p.a}
                      loading="lazy"
                      style={{
                        width: "100%",
                        aspectRatio: "4 / 5",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  ))}
                </div>
              )
            )}
          </div>
          <div
            data-fadeup=""
            style={{ marginTop: "7vh", display: "flex", justifyContent: "center" }}
          >
            <SoftLink href="/weddings" label="View the full portfolio" dark />
          </div>
        </div>
      </section>

      {/* ══ From the couple above — Sargon & Odelya, on working with me ══ */}
      <TestimonialFeature />

      {/* ══ About ══ */}
      <section
        id="about"
        className="lx-grid-2col"
        style={{
          position: "relative",
          background: "#F7F5F2",
          color: "#0E0D0B",
          padding: "18vh 6vw",
          display: "grid",
          gridTemplateColumns: "minmax(280px,480px) 1fr",
          gap: "6vw",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "100%",
        }}
      >
        <div data-reveal="" style={{ overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            data-about-img=""
            src={img(PHOTOS.headshot.path, 1000)}
            alt={PHOTOS.headshot.a}
            loading="lazy"
            style={{
              width: "100%",
              aspectRatio: "4 / 5",
              objectFit: "cover",
              display: "block",
              transform: "scale(1.15)",
            }}
          />
        </div>
        <div style={{ maxWidth: 560 }}>
          <div data-fadeup="" style={kicker({ marginBottom: 20 }, 10, ".3em")}>
            Showcasing the real you
          </div>
          <h2
            data-fadeup=""
            style={{
              margin: "0 0 10px",
              fontFamily: SERIF,
              fontWeight: 500,
              fontSize: "clamp(38px,4.6vw,64px)",
              lineHeight: 1.05,
            }}
          >
            Hi there, nice to <em>meet you.</em>
          </h2>
          <div
            data-fadeup=""
            style={{
              color: GOLD,
              letterSpacing: ".4em",
              fontSize: 12,
              margin: "18px 0 26px",
            }}
          >
            ★ ★ ★
          </div>
          <p
            data-fadeup=""
            style={{ margin: "0 0 18px", fontSize: 16, lineHeight: 1.8, color: MUTED }}
          >
            I&rsquo;m Raymond, a photographer based in San Jose, California.
            My love for photography began when I saw my friends&rsquo; faces light
            up at the images I&rsquo;d made for them; the same feeling I want
            you to have every time you open your gallery.
          </p>
          <p
            data-fadeup=""
            style={{ margin: "0 0 34px", fontSize: 16, lineHeight: 1.8, color: MUTED }}
          >
            I don&rsquo;t have one singular style: I adapt from light and
            airy to editorial, so the photos look like you, not like my formula.
            Most of all, I want you to look and feel your absolute best, with the
            whole experience tailored personally to you.
          </p>
          <Link
            data-fadeup=""
            data-mag=""
            data-hover=""
            href="/about"
            style={pill("#0E0D0B", "#F7F5F2", "16px 32px")}
          >
            More about me
          </Link>
        </div>
      </section>

      {/* ══ Pricing ══ */}
      <section
        style={{
          position: "relative",
          background: "#F7F5F2",
          color: "#0E0D0B",
          padding: "0 6vw 18vh",
          textAlign: "center",
        }}
      >
        <div data-fadeup="" style={kicker({ marginBottom: 18 }, 10, ".3em")}>
          Investment
        </div>
        <h2
          data-fadeup=""
          style={{
            margin: 0,
            fontFamily: SERIF,
            fontWeight: 500,
            fontSize: "clamp(34px,4.6vw,60px)",
            lineHeight: 1.1,
          }}
        >
          Collections from <em>$2,400</em>
        </h2>
        <p
          data-fadeup=""
          style={{
            maxWidth: 520,
            margin: "22px auto 0",
            fontSize: 15,
            lineHeight: 1.75,
            color: MUTED,
          }}
        >
          Full days, intimate ceremonies, and everything in between. Every
          collection is built around how you two actually want the day to go.
          Tell me about yours and I&rsquo;ll send the full breakdown.
        </p>
        <div data-fadeup="" style={{ marginTop: 26 }}>
          <SoftLink href="/investment" label="See the collections" />
        </div>
        <div
          data-fadeup=""
          style={{
            marginTop: 30,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <CtaLink />        </div>
      </section>

      {/* ══ The Process — transplanted from /experience: price above, ask below ══ */}
      <section style={{ position: "relative", background: "#0E0D0B", color: "#F7F5F2" }}>
        <ProcessSteps steps={HOME_PROCESS} />
      </section>

      {/* ══ Inquire ══ */}
      <section
        id="inquire"
        style={{
          position: "relative",
          background: "#0E0D0B",
          color: "#F7F5F2",
          padding: "14vh 0 0",
          overflow: "hidden",
        }}
      >
        <Marquee phrase="You live it. I’ll keep it." />

        <div
          className="lx-grid-2col"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 6vw 14vh",
            display: "grid",
            gridTemplateColumns: "1fr 1.1fr",
            gap: "6vw",
            alignItems: "start",
          }}
        >
          <div>
            <h2
              data-fadeup=""
              style={{
                margin: 0,
                fontFamily: SERIF,
                fontWeight: 500,
                fontSize: "clamp(36px,4.6vw,62px)",
                lineHeight: 1.1,
                textWrap: "pretty",
              }}
            >
              Let&rsquo;s make something <em>felt</em>.
            </h2>
            <p
              data-fadeup=""
              style={{
                maxWidth: 420,
                margin: "26px 0 0",
                fontSize: 16,
                lineHeight: 1.8,
                color: cream(0.7),
              }}
            >
              Serving San Francisco, Berkeley, San Jose and beyond. Tell me about
              your day. I&rsquo;ll take care of the rest.
            </p>
            <div
              data-fadeup=""
              style={{
                marginTop: 40,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <a
                href="mailto:leiphotography57@gmail.com"
                data-hover=""
                style={{
                  color: "#F7F5F2",
                  textDecoration: "none",
                  fontSize: 14,
                  letterSpacing: ".06em",
                }}
              >
                leiphotography57@gmail.com
              </a>
              <a
                href="http://instagram.com/lei.photography.co"
                data-hover=""
                style={{
                  color: cream(0.6),
                  textDecoration: "none",
                  fontSize: 14,
                  letterSpacing: ".06em",
                }}
              >
                @lei.photography.co
              </a>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              data-float=""
              data-speed="40"
              className="lx-float"
              src={img(PHOTOS.editorial.path, 750)}
              alt={PHOTOS.editorial.a}
              loading="lazy"
              style={{
                marginTop: 48,
                width: 200,
                aspectRatio: "3 / 4",
                objectFit: "cover",
                boxShadow: "0 30px 60px rgba(0,0,0,.4)",
              }}
            />
          </div>

          <div
            data-fadeup=""
            style={{
              minHeight: 420,
              background: "#F7F5F2",
              borderRadius: "var(--radius-lg)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 22,
              padding: "56px 32px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: SERIF,
                fontSize: "clamp(26px,2.4vw,34px)",
                fontWeight: 500,
                color: "#0E0D0B",
                lineHeight: 1.15,
              }}
            >
              Now booking 2026 &amp; 2027 weddings
            </div>
            <p
              style={{
                maxWidth: 360,
                margin: 0,
                fontSize: 15,
                lineHeight: 1.7,
                color: MUTED,
              }}
            >
              Tell me everything. You&rsquo;ll hear back from me personally
              within 48 hours. (I genuinely can&rsquo;t wait to read it.)
            </p>
            <CtaLink />          </div>
        </div>

        <div style={{ padding: "0 38px" }}>
          <LeiFooter links={["work", "weddings", "investment", "about", "inquire"]} />
        </div>
      </section>
    </LeiPage>
  );
}
