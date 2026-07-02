import type { Metadata } from "next";
import Link from "next/link";
import LeiPage from "@/components/lei/LeiPage";
import Chrome from "@/components/lei/Chrome";
import LeiFooter from "@/components/lei/LeiFooter";
import HorizontalCollection from "@/components/lei/HorizontalCollection";
import { Marquee } from "@/components/lei/blocks";
import { GOLD, MUTED, SERIF, cream, kicker, pill } from "@/components/lei/tokens";
import { img, PHOTOS } from "@/content/portfolio";

export const metadata: Metadata = {
  title: "Presence, Story & Feeling — Bay Area Photographer",
  description:
    "Photographed with intention — so your moments aren't just seen, they're felt. Weddings, graduations and portraits across the San Francisco Bay Area by Raymond Lei.",
};

export default function HomePage() {
  return (
    <LeiPage home>
      <noscript>
        <style>{`[data-preloader]{display:none!important}`}</style>
      </noscript>
      <Chrome />

      {/* ══ Preloader ══ */}
      <div
        data-preloader=""
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 120,
          background: "#0E0D0B",
          color: "#F7F5F2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            data-pl-name=""
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(28px,4.4vw,58px)",
              fontWeight: 500,
              letterSpacing: ".02em",
              lineHeight: 1.1,
            }}
          >
            Lei Photography Collective
          </div>
          <div
            data-pl-sub=""
            style={{
              marginTop: 14,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: ".32em",
              textTransform: "uppercase",
              color: cream(0.45),
            }}
          >
            Presence · Story · Feeling
          </div>
        </div>
        <div
          data-pl-counter=""
          style={{
            position: "absolute",
            right: 38,
            bottom: 30,
            fontFamily: SERIF,
            fontSize: "clamp(48px,7vw,96px)",
            fontWeight: 400,
            fontStyle: "italic",
            color: cream(0.85),
            fontVariantNumeric: "tabular-nums",
          }}
        >
          000
        </div>
        <div
          style={{
            position: "absolute",
            left: 38,
            bottom: 44,
            width: 180,
            height: 1,
            background: cream(0.18),
          }}
        >
          <div
            data-pl-bar=""
            style={{
              height: "100%",
              width: "100%",
              background: GOLD,
              transform: "scaleX(0)",
              transformOrigin: "left",
            }}
          />
        </div>
      </div>

      {/* ══ Hero — typographic, image blooms out of the O in STORY ══ */}
      <section
        id="top"
        data-hero=""
        style={{ position: "relative", height: "300vh", background: "#F7F5F2" }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
          }}
        >
          {/* media layer: img fallback + WebGL canvas, revealed by scroll */}
          <div
            data-hero-media=""
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
              clipPath: "circle(0px at 50% 46%)",
              background: "#0E0D0B",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              data-hero-img=""
              src={img(PHOTOS.firstDance04.path, 1500)}
              alt={PHOTOS.firstDance04.a}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            <div data-gl-mount="" style={{ position: "absolute", inset: 0 }} />
            <div
              data-hero-shade=""
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(14,13,11,.18)",
              }}
            />
          </div>

          {/* typographic lockup */}
          <div
            data-hero-lockup=""
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              color: "#0E0D0B",
              pointerEvents: "none",
            }}
          >
            <div
              data-hero-kicker=""
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: ".34em",
                textTransform: "uppercase",
                color: "currentColor",
                opacity: 0.85,
                marginBottom: "3vh",
              }}
            >
              Bay Area · Weddings · Graduations · Portraits
            </div>
            <h1
              style={{
                margin: 0,
                fontFamily: SERIF,
                fontWeight: 600,
                lineHeight: 0.86,
                letterSpacing: ".01em",
              }}
            >
              <div data-hero-line="" style={{ fontSize: "clamp(64px,13vw,190px)" }}>
                PRESENCE,
              </div>
              <div data-hero-line="" style={{ fontSize: "clamp(64px,13vw,190px)" }}>
                STORY <em style={{ fontWeight: 400 }}>&</em>
              </div>
              <div data-hero-line="" style={{ fontSize: "clamp(64px,13vw,190px)" }}>
                <em style={{ fontWeight: 500 }}>FEELING.</em>
              </div>
            </h1>
            <div
              data-hero-sub=""
              style={{
                marginTop: "4vh",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: ".2em",
                textTransform: "uppercase",
                opacity: 0.8,
              }}
            >
              Photographed with intention — by Raymond Lei
            </div>
          </div>

          <div
            data-hero-hint=""
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 42,
              zIndex: 4,
              textAlign: "center",
              pointerEvents: "none",
              color: "#0E0D0B",
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: ".28em",
                textTransform: "uppercase",
                opacity: 0.6,
              }}
            >
              Scroll
            </div>
            <div
              style={{
                margin: "12px auto 0",
                width: 1,
                height: 42,
                background: "currentColor",
                opacity: 0.6,
                animation: "lxScroll 1.9s ease-in-out infinite",
              }}
            />
          </div>
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
          src={img(PHOTOS.gradLaughing.path, 750)}
          alt={PHOTOS.gradLaughing.a}
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
          Photographed with intention — so your moments aren&rsquo;t just seen,
          they&rsquo;re felt.
        </p>
      </section>

      {/* ══ Horizontal collection (identical to Work) ══ */}
      <HorizontalCollection />

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
            I&rsquo;m Raymond — a photographer based in San Jose, California. My
            love for photography began when I saw my friends&rsquo; faces light up
            at the images I&rsquo;d made for them, and I realized how powerful a
            single frame can be.
          </p>
          <p
            data-fadeup=""
            style={{ margin: "0 0 34px", fontSize: 16, lineHeight: 1.8, color: MUTED }}
          >
            I don&rsquo;t have one singular style — I adapt from light and airy to
            editorial while keeping the moment authentic. Most of all, I want you
            to look and feel your absolute best, with the whole experience
            tailored personally to you.
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
        <Marquee phrase="A curated record of the genuine" />

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
              your day — I&rsquo;ll take care of the rest.
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
              style={{
                marginTop: 48,
                width: 200,
                aspectRatio: "3 / 4",
                objectFit: "cover",
                boxShadow: "0 30px 60px rgba(0,0,0,.4)",
              }}
            />
          </div>

          {/* ▼▼▼ HONEYBOOK EMBED SLOT (home) — replace this whole div's inner
              content with your HoneyBook placement div, and load HoneyBook's
              placement-loader script (see the inquire page for the full
              instructions). Prefer a button? It already is one. ▼▼▼ */}
          <div
            data-fadeup=""
            id="honeybook-embed-home"
            style={{
              minHeight: 520,
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
                width: 54,
                height: 54,
                borderRadius: "50%",
                border: `1px solid ${GOLD}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: SERIF,
                fontStyle: "italic",
                fontSize: 22,
                color: GOLD,
              }}
            >
              hb
            </div>
            <div
              style={{
                fontFamily: SERIF,
                fontSize: 26,
                fontWeight: 500,
                color: "#0E0D0B",
              }}
            >
              Ready when you are
            </div>
            <p
              style={{
                maxWidth: 340,
                margin: 0,
                fontSize: 15,
                lineHeight: 1.7,
                color: MUTED,
              }}
            >
              Head to the inquiry page to share your day — or drop your HoneyBook
              form right here.
            </p>
            <Link
              data-mag=""
              data-hover=""
              href="/inquire"
              style={pill("#0E0D0B", "#F7F5F2")}
            >
              Start your inquiry
            </Link>
          </div>
          {/* ▲▲▲ END HOME HONEYBOOK SLOT ▲▲▲ */}
        </div>

        <div style={{ padding: "0 38px" }}>
          <LeiFooter links={["work", "weddings", "about", "inquire"]} />
        </div>
      </section>
    </LeiPage>
  );
}
