import type { Metadata } from "next";
import Link from "next/link";
import LeiPage from "@/components/lei/LeiPage";
import Chrome from "@/components/lei/Chrome";
import LeiFooter from "@/components/lei/LeiFooter";
import { Marquee, ProcessSteps } from "@/components/lei/blocks";
import { GOLD, MUTED, SERIF, cream, kicker, pill } from "@/components/lei/tokens";
import { img, PHOTOS } from "@/content/portfolio";
import { CtaLink, SoftLink } from "@/components/lei/Cta";
import { CITY, POSITIONING } from "@/content/homepage";
import HeroSlideshow from "@/components/lei/HeroSlideshow";
import { HOME_PROCESS } from "@/content/experience";
import TestimonialFeature from "@/components/lei/TestimonialFeature";
import { Collage, CollageTile } from "@/components/lei/Collage";
import ProjectStrip from "@/components/lei/ProjectStrip";

export const metadata: Metadata = {
  title: "Editorial Wedding Photography in the San Francisco Bay Area",
  description:
    `${POSITIONING} Editorial wedding photography for couples who want to be present in their wedding, not stress about it. ${CITY} & beyond, by Raymond Lei.`,
};

/** Portfolio rows are written out one by one (no .map over WEDDING_PORTFOLIO)
 * so each image src is a literal string the visual editor can swap. No photo
 * here may appear anywhere else on the homepage (hero, manifesto, etc). */
const PORTFOLIO_FULL: React.CSSProperties = {
  width: "100%",
  aspectRatio: "16 / 10",
  objectFit: "cover",
  display: "block",
};
const PORTFOLIO_PAIR: React.CSSProperties = {
  width: "100%",
  aspectRatio: "4 / 5",
  objectFit: "cover",
  display: "block",
};
const PAIR_ROW: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "2.4vw",
};

/** "WHAT TO EXPECT" row: how the day works with me. Cards are written out
 * one by one (no .map) so each image src is a literal the editor can swap. */
const EXPECT_IMG: React.CSSProperties = {
  width: "100%",
  aspectRatio: "4 / 5",
  objectFit: "cover",
  display: "block",
};
const EXPECT_TITLE: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: ".16em",
  textTransform: "uppercase",
  marginBottom: 12,
};
const EXPECT_LIST: React.CSSProperties = {
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

function ExpectPoint({ children }: { children: React.ReactNode }) {
  return (
    <li style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
      <span style={{ color: GOLD, fontSize: 10, flexShrink: 0 }}>★</span>
      <span style={{ fontSize: 13, lineHeight: 1.55, color: MUTED }}>{children}</span>
    </li>
  );
}

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
            ICONIC, INTENTIONAL<br />and unmistakably YOU
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
          Editorial when the moment calls for direction. Documentary when it deserves to unfold.
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
            For couples who love being iconic
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
            Main character energy.
            <br />
            without missing the moment.
          </h2>
          <p
            data-fadeup=""
            style={{ margin: "0 0 26px", fontSize: 16, lineHeight: 1.8, color: MUTED }}
          >
            Your wedding should feel like the best night of your life, not a day spent performing for the camera. I’ll step in with confident direction when it matters, then give you space to celebrate, cry, laugh, dance, and be completely present with the people you love.
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
              `Editorial portraits that feel iconic, never stiff or overproduced.`,
              `Real moments preserved from the quiet morning hours to the final song.`,
              `Ever said “I'm awkward in front of a camera”? Perfect, you're in good company; most of my favorite couples have.`,
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

      {/* ══ Editorial collage — portfolio-style gallery (two pairs + one
          full-width) with the "quiet luxury" positioning line. Images are
          written out one by one so each src is a literal the editor can
          swap. Sits above STYLE. ══ */}
      <section
        style={{
          position: "relative",
          background: "#F7F5F2",
          color: "#0E0D0B",
          padding: "16vh 6vw 6vh",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2.4vw" }}>
            <div className="lx-grid-2col" style={PAIR_ROW}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                data-fadeup=""
                src="/Lei%20Photography%20Collective%20-%20Trang%20Wedding-2.jpg"
                alt="Bride and groom walking hand in hand along the marina at sunset, sailboat masts behind them"
                loading="lazy"
                style={PORTFOLIO_PAIR}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                data-fadeup=""
                src="/images/bay-area-wedding-reception-confetti-toast-black-and-white-lei-photography-collective.jpg"
                alt="Bride and groom toasting through a shower of heart confetti at their reception, black and white"
                loading="lazy"
                style={PORTFOLIO_PAIR}
              />
            </div>
            <div className="lx-grid-2col" style={PAIR_ROW}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                data-fadeup=""
                src="/images/bay-area-wedding-first-dance-fog-string-lights-black-and-white-lei-photography-collective.jpg"
                alt="Bride and groom sharing their first dance on a fog-covered floor beneath string lights, black and white"
                loading="lazy"
                style={PORTFOLIO_PAIR}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                data-fadeup=""
                src="/images/bay-area-wedding-marina-sunset-kiss-lei-photography-collective.jpg"
                alt="Bride and groom kissing at sunset on the marina railing, sailboat masts glowing behind them"
                loading="lazy"
                style={PORTFOLIO_PAIR}
              />
            </div>
            <div data-reveal="" style={{ overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/bay-area-wedding-first-dance-fog-string-lights-lei-photography-collective.jpg"
                alt="Bride and groom holding hands during their first dance on a fog-covered floor beneath a canopy of string lights"
                loading="lazy"
                style={PORTFOLIO_FULL}
              />
            </div>
          </div>

          <p
            data-fadeup=""
            style={{
              maxWidth: 620,
              margin: "5vh auto 0",
              textAlign: "center",
              fontSize: "clamp(13px,1.3vw,17px)",
              fontWeight: 400,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              lineHeight: 1.7,
              color: "#0E0D0B",
              textWrap: "balance",
            }}
          >
            For couples who crave <strong style={{ fontWeight: 700 }}>drama</strong>,{" "}
            <strong style={{ fontWeight: 700 }}>emotional</strong> moments and a{" "}
            <strong style={{ fontWeight: 700 }}>quiet luxury</strong> feel
          </p>
        </div>
      </section>

      {/* ══ Feature image + quote — one large placeholder slot with a
          swap-in-later testimonial line ══ */}
      <section style={{ position: "relative", background: "#F7F5F2", padding: "6vh 6vw 8vh" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <div data-reveal="" style={{ overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img(PHOTOS.gettingReadyToast.path, 1600)}
              alt={PHOTOS.gettingReadyToast.a}
              style={{
                width: "100%",
                aspectRatio: "3 / 2",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
          <p
            data-fadeup=""
            style={{
              margin: "5vh 0 0",
              fontFamily: SERIF,
              fontStyle: "italic",
              fontSize: "clamp(16px,1.6vw,22px)",
              lineHeight: 1.7,
              color: "#0E0D0B",
              textAlign: "center",
              textWrap: "pretty",
            }}
          >
            Your favorite couple&rsquo;s words about the day will live here, ready
            to swap in whenever you are.
          </p>
          <div
            data-fadeup=""
            style={{
              marginTop: 16,
              textAlign: "center",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: ".2em",
              textTransform: "uppercase",
              color: GOLD,
            }}
          >
            &mdash; Add attribution
          </div>
        </div>
      </section>

      {/* ══ WHAT TO EXPECT — four-up "how the day works" row, placeholder slots ══ */}
      <section
        style={{
          position: "relative",
          background: "#F7F5F2",
          color: "#0E0D0B",
          padding: "8vh 6vw 20vh",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            data-fadeup=""
            style={{ ...kicker({ marginBottom: "6vh" }, 11, ".34em"), textAlign: "center" }}
          >
            What to expect
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
              gap: "2vw",
            }}
          >
            <div data-fadeup="">
              <div data-reveal="" style={{ overflow: "hidden", marginBottom: 20 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/Lei%20Photography%20Collective%20-%20Trang%20Wedding-1.jpg"
                  alt="Safe Space - drop your photo here"
                  style={EXPECT_IMG}
                />
              </div>
              <div style={EXPECT_TITLE}>Safe Space</div>
              <ul style={EXPECT_LIST}>
                <ExpectPoint>Warm, low-pressure direction from the first hello.</ExpectPoint>
                <ExpectPoint>
                  You look iconic and timeless while feeling completely like yourselves.
                </ExpectPoint>
              </ul>
            </div>
            <div data-fadeup="">
              <div data-reveal="" style={{ overflow: "hidden", marginBottom: 20 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/Lei%20Photography%20Collective%20-%20Trang%20Wedding-5.jpg"
                  alt="Inspiration - drop your photo here"
                  style={EXPECT_IMG}
                />
              </div>
              <div style={EXPECT_TITLE}>Inspiration</div>
              <ul style={EXPECT_LIST}>
                <ExpectPoint>A look and mood we build together before the day.</ExpectPoint>
                <ExpectPoint>References and palettes that actually matter to you.</ExpectPoint>
              </ul>
            </div>
            <div data-fadeup="">
              <div data-reveal="" style={{ overflow: "hidden", marginBottom: 20 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/Sargon%20%26%20Odelya-158.jpg"
                  alt="Perfect Fit - drop your photo here"
                  style={EXPECT_IMG}
                />
              </div>
              <div style={EXPECT_TITLE}>Perfect Fit</div>
              <ul style={EXPECT_LIST}>
                <ExpectPoint>A plan shaped around your venue and priorities.</ExpectPoint>
                <ExpectPoint>Coverage that fits your day, not a rigid shot list.</ExpectPoint>
              </ul>
            </div>
            <div data-fadeup="">
              <div data-reveal="" style={{ overflow: "hidden", marginBottom: 20 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/Lei.Photography.Co-Sargon%20ReEdit2-1.jpg"
                  alt="Detail Oriented Approach - drop your photo here"
                  style={EXPECT_IMG}
                />
              </div>
              <div style={EXPECT_TITLE}>Detail Oriented Approach</div>
              <ul style={EXPECT_LIST}>
                <ExpectPoint>Every detail noticed, from the rings to the room.</ExpectPoint>
                <ExpectPoint>Calm, prepared, and a few steps ahead all day.</ExpectPoint>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══ The Wedding Portfolio — the proof, inline ══ */}
      <section
        style={{
          position: "relative",
          background: "#F7F5F2",
          color: "#0E0D0B",
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
          <Collage>
            {/* Block: two tall portraits beside a 2x2 cluster of landscapes */}
            <CollageTile size="tall">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-10.jpg"
                alt="Bride's veil lifted and moving in the breeze"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </CollageTile>
            <CollageTile size="tall">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-28.jpg"
                alt="Groom dipping the bride for a kiss by the reception fireplace"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </CollageTile>
            <CollageTile size="small">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-34.jpg"
                alt="Bridal details flat lay with pearl-embellished heels, Chanel perfume, pearl jewelry and the wedding invitation"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </CollageTile>
            <CollageTile size="small">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-14.jpg"
                alt="Bride touching the groom's face at golden hour"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </CollageTile>
            <CollageTile size="small">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-26.jpg"
                alt="Groom carrying the bride through a cheering crowd"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </CollageTile>
            <CollageTile size="small">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-35.jpg"
                alt="Bride and three bridesmaids in sage dresses toasting champagne while getting ready"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </CollageTile>

            {/* Row: four tall portraits */}
            <CollageTile size="tall">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-03.jpg"
                alt="Bride sharing an emotional moment with her mother, black and white"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </CollageTile>
            <CollageTile size="tall">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-01.jpg"
                alt="Bride's hands holding the wedding ring box"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </CollageTile>
            <CollageTile size="tall">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-29.jpg"
                alt="Bride and groom laughing mid-twirl on the dance floor"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </CollageTile>
            <CollageTile size="tall">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-23.jpg"
                alt="Champagne spray celebration, alternate edit"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </CollageTile>

            {/* Row: wide band plus two landscapes */}
            <CollageTile size="wide">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.squarespace-cdn.com/content/v1/697c1d6344a3b1154bcbc39e/652fef9d-196e-4248-92d2-83d8abebf683/Lei.Photography.Co-PreSargon+lReEdit-12.jpg?format=1500w"
                alt="First dance in low fog beneath string lights, guests watching by the fireplace"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </CollageTile>
            <CollageTile size="small">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-30.jpg"
                alt="Bride and groom embracing on the dance floor, reception lights above"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </CollageTile>
            <CollageTile size="small">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-36.jpg"
                alt="Bride laughing with her three bridesmaids as they clink champagne flutes while getting ready"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </CollageTile>

            {/* Row: four tall portraits */}
            <CollageTile size="tall">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-19.jpg"
                alt="Bride looking back over her shoulder, veil catching the sunset"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </CollageTile>
            <CollageTile size="tall">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-08.jpg"
                alt="Family and friends celebrating on the staircase, aerial view"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </CollageTile>
            <CollageTile size="tall">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-37.jpg"
                alt="Groom lifting the bride during their first dance amid low fog beneath string lights"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </CollageTile>
            <CollageTile size="tall">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-12.jpg"
                alt="Bride beneath her veil, black and white portrait"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </CollageTile>
          </Collage>
          <div style={{ marginTop: "9vh" }}>
            <ProjectStrip dark={false} />
          </div>
          <div
            data-fadeup=""
            style={{ marginTop: "7vh", display: "flex", justifyContent: "center" }}
          >
            <SoftLink href="/weddings" label="View the full portfolio" />
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
            You two are the story.
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
            The editorial eye is constant: the feeling is yours. I shape the
            light, the pacing, and the direction around who you two actually
            are, so the photos look like you at your absolute best, never like
            a formula. The whole experience is tailored personally to you.
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
              within 48 hours. (I can&rsquo;t wait to read it.)
            </p>
            <CtaLink />          </div>
        </div>

        <div style={{ padding: "0 38px" }}>
          <LeiFooter />
        </div>
      </section>
    </LeiPage>
  );
}
