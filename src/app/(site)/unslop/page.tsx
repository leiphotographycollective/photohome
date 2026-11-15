/** Unslop creative preview of the homepage. Live `/` is unchanged.
 *  Direction inspired by unslop (Damir Sokolovsky / @heydamir, CC BY 4.0).
 */
import type { Metadata } from "next";
import Link from "next/link";
import LeiPage from "@/components/lei/LeiPage";
import QuietChrome from "@/components/lei/unslop/QuietChrome";
import LeiFooter from "@/components/lei/LeiFooter";
import { Marquee, PhotoBand, ProcessSteps } from "@/components/lei/blocks";
import { GOLD, MUTED, SERIF, cream } from "@/components/lei/tokens";
import { img, PHOTOS } from "@/content/portfolio";
import { CITY, POSITIONING, CTA_HREF, CTA_LABEL } from "@/content/homepage";
import HeroSlideshow from "@/components/lei/HeroSlideshow";
import { HOME_PROCESS } from "@/content/experience";
import TestimonialFeature from "@/components/lei/TestimonialFeature";
import { Collage, CollageTile } from "@/components/lei/Collage";
import {
  quietLabel,
  quietPrimary,
  quietSecondary,
  ruleStyle,
  bulletMark,
} from "@/components/lei/unslop/quiet";

export const metadata: Metadata = {
  title: { absolute: "Unslop preview — Lei Photography Collective" },
  description:
    `Creative preview of a quieter homepage. Not the live site. ${POSITIONING} ${CITY} & beyond, by Raymond Lei.`,
  robots: { index: false, follow: false },
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
  gap: 10,
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
  fontSize: 15,
  fontWeight: 500,
  letterSpacing: "0.01em",
  textTransform: "none",
  marginBottom: 12,
  color: "#0E0D0B",
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
      <span style={bulletMark} aria-hidden="true">—</span>
      <span style={{ fontSize: 13, lineHeight: 1.55, color: MUTED }}>{children}</span>
    </li>
  );
}

function QuietCta({
  label = CTA_LABEL,
  href = CTA_HREF,
}: {
  label?: string;
  href?: string;
}) {
  return (
    <Link data-mag="" data-hover="" href={href} style={quietPrimary(GOLD, "#0E0D0B")}>
      {label}
    </Link>
  );
}

function QuietSoft({ href, label }: { href: string; label: string }) {
  return (
    <Link data-mag="" data-hover="" href={href} style={quietSecondary()}>
      {label}
    </Link>
  );
}

export default function HomePage() {
  return (
    <LeiPage>
      <QuietChrome />

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
          <div data-land-fade="" style={ruleStyle({ margin: "0 auto 28px" })} />
          <p
            data-land-fade=""
            style={{
              ...quietLabel({ margin: "0 0 28px", textAlign: "center" }),
              color: MUTED,
            }}
          >
            Bay Area wedding photography by Raymond Lei
          </p>
          <h1
            style={{
              margin: 0,
              fontFamily: SERIF,
              fontWeight: 500,
              fontSize: "clamp(30px,3.2vw,48px)",
              lineHeight: 1.24,
              letterSpacing: "0",
              textWrap: "pretty",
            }}
          >
            <div data-title-line="">Present for your day.</div>
            <div data-title-line="">Directed when it counts.</div>
          </h1>
        </div>
      </section>

      {/* ══ Manifesto ══ */}
      <section
        style={{
          position: "relative",
          background: "#F7F5F2",
          padding: "22vh 6vw",
          display: "flex",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img(PHOTOS.bridal.path, 750)}
          alt="Bride holding her veil in soft light"
          loading="lazy"
          style={{
            position: "absolute",
            left: "4vw",
            top: "12%",
            width: "13vw",
            minWidth: 130,
            aspectRatio: "3 / 4",
            objectFit: "cover",
            boxShadow: "0 12px 28px rgba(14,13,11,.12)",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img(PHOTOS.shoulderDance.path, 750)}
          alt={PHOTOS.shoulderDance.a}
          loading="lazy"
          style={{
            position: "absolute",
            right: "5vw",
            bottom: "10%",
            width: "12vw",
            minWidth: 120,
            aspectRatio: "4 / 5",
            objectFit: "cover",
            boxShadow: "0 12px 28px rgba(14,13,11,.12)",
          }}
        />
        <p
          data-manifesto=""
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 980,
            margin: 0,
            textAlign: "center",
            fontFamily: SERIF,
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "clamp(28px,4.2vw,56px)",
            lineHeight: 1.28,
            color: "#0E0D0B",
            textWrap: "pretty",
          }}
        >
          Editorial when the moment needs direction. Documentary when it should unfold on its own.
        </p>
      </section>

      {/* ══ Spacer band — manifesto into who I photograph ══ */}
      <PhotoBand src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-31.jpg" />

      {/* ══ Who I photograph ══ */}
      <section
        className="lx-grid-2col"
        style={{
          position: "relative",
          background: "#F7F5F2",
          color: "#0E0D0B",
          /* Top padding added with the band above: this section used to run
             straight on from the manifesto's bottom padding, so at 0 the
             kicker butted against the band's hard edge. */
          padding: "14vh 6vw 22vh",
          display: "grid",
          gridTemplateColumns: "minmax(300px,560px) minmax(280px,440px)",
          gap: "7vw",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "100%",
        }}
      >
        <div>
          <div data-fadeup="" style={ruleStyle()} />
          <div data-fadeup="" style={quietLabel({ marginBottom: 20 })}>
            For couples who want to look like themselves, at their best
          </div>
          <h2
            data-fadeup=""
            style={{
              margin: "0 0 26px",
              fontFamily: SERIF,
              fontWeight: 500,
              fontSize: "clamp(34px,4.2vw,54px)",
              lineHeight: 1.1,
              textWrap: "pretty",
            }}
          >
            Cover-story portraits.
            <br />
            Room to live the night.
          </h2>
          <p
            data-fadeup=""
            style={{ margin: "0 0 26px", fontSize: 16, lineHeight: 1.8, color: MUTED }}
          >
            Your wedding should feel like the best night of your life, not a day spent performing for the camera. I step in with clear direction when it matters, then give you space to celebrate, cry, laugh, dance, and stay with the people you love.
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
              `Editorial portraits with structure — never stiff, never overproduced.`,
              `Real moments kept from the quiet morning hours to the last song.`,
              `If you're awkward in front of a camera, you're in good company. Most of my favorite couples are.`,
            ].map((line) => (
              <li
                key={line}
                data-fadeup=""
                style={{ display: "flex", gap: 14, alignItems: "baseline" }}
              >
                <span style={bulletMark} aria-hidden="true">—</span>
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
            <QuietCta />
          </div>
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
              boxShadow: "0 12px 28px rgba(14,13,11,.12)",
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
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div className="lx-grid-2col" style={PAIR_ROW}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                data-fadeup=""
                src="/images/portfolio/weddings/trang/trang-02.jpg"
                alt="Bride and groom at the altar seen from the back of the church, petals scattered down the aisle"
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
                src="/images/portfolio/weddings/sargon-odelya/sargon-odelya-13.jpg"
                alt="Bride and groom laughing with their wedding party in the garden, bridesmaids in sage satin and groomsmen in gray"
                loading="lazy"
                style={PORTFOLIO_FULL}
              />
            </div>
          </div>

          <div data-fadeup="" style={{ ...ruleStyle({ margin: "5vh auto 20px" }) }} />
          <p
            data-fadeup=""
            style={{
              maxWidth: 520,
              margin: "0 auto",
              textAlign: "center",
              fontSize: "clamp(15px,1.4vw,18px)",
              fontWeight: 400,
              letterSpacing: "0",
              textTransform: "none",
              lineHeight: 1.6,
              color: MUTED,
              textWrap: "balance",
            }}
          >
            For couples who want drama in the frame, ease in the day, and photos that still feel like them
          </p>
        </div>
      </section>

      {/* ══ Feature image — one large placeholder slot ══ */}
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
          <div data-fadeup="" style={{ ...ruleStyle({ margin: "0 auto 16px" }) }} />
          <div
            data-fadeup=""
            style={{ ...quietLabel({ marginBottom: "6vh", textAlign: "center", width: "100%" }) }}
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
                  src="/images/portfolio/weddings/trang/trang-01.jpg"
                  alt="The wedding bands and earrings resting on a red invitation illustrated with the couple"
                  style={EXPECT_IMG}
                />
              </div>
              <div style={EXPECT_TITLE}>Calm from the start</div>
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
                  src="/images/portfolio/weddings/trang/trang-05.jpg"
                  alt="The couple's hands resting together over the bouquet, both wedding bands on"
                  style={EXPECT_IMG}
                />
              </div>
              <div style={EXPECT_TITLE}>A shared look</div>
              <ul style={EXPECT_LIST}>
                <ExpectPoint>A look and mood we build together before the day.</ExpectPoint>
                <ExpectPoint>References and palettes that actually matter to you.</ExpectPoint>
              </ul>
            </div>
            <div data-fadeup="">
              <div data-reveal="" style={{ overflow: "hidden", marginBottom: 20 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/portfolio/weddings/sargon-odelya-select/so-select-158.jpg"
                  alt="Bride holding the open ring box in both hands against her beaded gown"
                  style={EXPECT_IMG}
                />
              </div>
              <div style={EXPECT_TITLE}>Built around your day</div>
              <ul style={EXPECT_LIST}>
                <ExpectPoint>A plan shaped around your venue and priorities.</ExpectPoint>
                <ExpectPoint>Coverage that fits your day, not a rigid shot list.</ExpectPoint>
              </ul>
            </div>
            <div data-fadeup="">
              <div data-reveal="" style={{ overflow: "hidden", marginBottom: 20 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/bay-area-wedding-details-flat-lay-jimmy-choo-heels-chanel-perfume-lei-photography-collective.jpg"
                  alt="Bridal details flat lay with pearl Jimmy Choo heels, Chanel perfume, jewelry and the wedding invitation"
                  style={EXPECT_IMG}
                />
              </div>
              <div style={EXPECT_TITLE}>Details, noticed</div>
              <ul style={EXPECT_LIST}>
                <ExpectPoint>Every detail noticed, from the rings to the room.</ExpectPoint>
                <ExpectPoint>Calm, prepared, and a few steps ahead all day.</ExpectPoint>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══ Spacer band — a breath before the portfolio collage ══ */}
      <PhotoBand src="/images/portfolio/weddings/trang/trang-11.jpg" />

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
          <div data-fadeup="" style={ruleStyle()} />
          <div data-fadeup="" style={quietLabel({ marginBottom: 18 })}>
            Portfolio
          </div>
          <h2
            data-fadeup=""
            style={{
              margin: "0 0 7vh",
              fontFamily: SERIF,
              fontWeight: 500,
              fontSize: "clamp(34px,4.2vw,54px)",
              lineHeight: 1.1,
              textWrap: "pretty",
            }}
          >
            Your day, the way it actually felt
          </h2>
          <Collage>
            {/* Block: two tall portraits beside a 2x2 cluster of landscapes.
                Three weddings are interleaved through the whole collage, so the
                section reads as a body of work rather than one long day. */}
            <CollageTile size="tall">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/weddings/sargon-odelya-select/so-select-204.jpg"
                alt="Bride in profile beneath her lace veil beside the beaded ceremonial fan and scepter"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </CollageTile>
            <CollageTile size="tall">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/weddings/miranda-danny/miranda-danny-05.jpg"
                alt="Bride resting against the groom on the dock, sailboat masts and still water behind them"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </CollageTile>
            <CollageTile size="small">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/weddings/sargon-odelya-select/so-select-686.jpg"
                alt="The money dance, guests pressing in with bills raised, black and white"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </CollageTile>
            <CollageTile size="small">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/weddings/trang/trang-11.jpg"
                alt="Paddle fans for the bride's side and the groom's side laid out with heart sunglasses on a red reception table"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </CollageTile>
            <CollageTile size="small">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/weddings/sargon-odelya-select/so-select-177.jpg"
                alt="Guests raising pearl ornaments and cheering as the couple enters, seen from above"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </CollageTile>
            <CollageTile size="small">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/weddings/sargon-odelya-select/so-select-112.jpg"
                alt="Bride and three bridesmaids in sage dresses laughing over a champagne toast"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </CollageTile>

            {/* Row: four tall portraits */}
            <CollageTile size="tall">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/weddings/trang/trang-04.jpg"
                alt="Bride and groom kneeling together during the ceremony, family and wedding party in the pews behind them"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </CollageTile>
            <CollageTile size="tall">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/weddings/sargon-odelya-select/so-select-167.jpg"
                alt="Groom climbing the staircase carrying the pearl ceremonial scepter, guests waiting below"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </CollageTile>
            <CollageTile size="tall">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/weddings/miranda-danny/miranda-danny-07.jpg"
                alt="Bride and groom kissing on the marina boardwalk as the sun breaks between them"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </CollageTile>
            <CollageTile size="tall">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/weddings/sargon-odelya-select/so-select-reedit2-14.jpg"
                alt="Groom spraying champagne over the bride under the redwoods, her veil trailing behind her"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </CollageTile>

            {/* Row: wide band plus two landscapes */}
            <CollageTile size="wide">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/weddings/sargon-odelya-select/so-select-presargon-12.jpg"
                alt="First dance in low fog beneath string lights, guests watching from the fireplace"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </CollageTile>
            <CollageTile size="small">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/weddings/miranda-danny/miranda-danny-12.jpg"
                alt="Bride and groom holding each other on the boardwalk at sunset, her train spread across the boards"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </CollageTile>
            <CollageTile size="small">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/weddings/sargon-odelya-select/so-select-046.jpg"
                alt="Bride's mother kneeling in navy lace to fasten her shoe while the bride laughs on the bed"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </CollageTile>

            {/* Row: four tall portraits */}
            <CollageTile size="tall">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/weddings/trang/trang-10.jpg"
                alt="Bride and groom walking out through a shower of petals with champagne in hand, black and white"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </CollageTile>
            <CollageTile size="tall">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/weddings/sargon-odelya-select/so-select-580.jpg"
                alt="Groom lifted on his friends' shoulders holding the pearl scepter beneath the string lights"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </CollageTile>
            <CollageTile size="tall">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/weddings/sargon-odelya-select/so-select-300.jpg"
                alt="Bride lifting her cathedral veil overhead in soft window light"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </CollageTile>
            <CollageTile size="tall">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.squarespace-cdn.com/content/v1/697c1d6344a3b1154bcbc39e/a4dc9303-abdb-418f-b9df-d2f910a25833/bay-area-fashion-editorial-portrait-evening-gown-lei-photography-collective?format=1000w"
                alt="Editorial portrait in a flowing evening gown, natural light"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </CollageTile>
          </Collage>
          <div
            data-fadeup=""
            style={{ marginTop: "9vh", display: "flex", justifyContent: "center" }}
          >
            <QuietSoft href="/gallery" label="View the full gallery" />
          </div>
        </div>
      </section>

      {/* ══ From the couple above — Sargon & Odelya, on working with me ══ */}
      <TestimonialFeature />

      {/* ══ Spacer band — testimonial into the About story ══ */}
      <PhotoBand src="/images/placeholders/band-home-3.svg" />

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
          <div data-fadeup="" style={ruleStyle()} />
          <div data-fadeup="" style={quietLabel({ marginBottom: 20 })}>
            You two are the story
          </div>
          <h2
            data-fadeup=""
            style={{
              margin: "0 0 26px",
              fontFamily: SERIF,
              fontWeight: 500,
              fontSize: "clamp(36px,4.4vw,58px)",
              lineHeight: 1.08,
            }}
          >
            Raymond Lei, San Jose
          </h2>
          <p
            data-fadeup=""
            style={{ margin: "0 0 18px", fontSize: 16, lineHeight: 1.8, color: MUTED }}
          >
            I&rsquo;m Raymond, a photographer based in San Jose, California.
            My love for photography began when I saw my friends&rsquo; faces light
            up at the images I&rsquo;d made for them — the same feeling I want
            you to have every time you open your gallery.
          </p>
          <p
            data-fadeup=""
            style={{ margin: "0 0 34px", fontSize: 16, lineHeight: 1.8, color: MUTED }}
          >
            The editorial eye stays constant; the feeling is yours. I shape the
            light, the pacing, and the direction around who you two actually
            are, so the photos look like you at your best — never like a formula.
          </p>
          <Link
            data-fadeup=""
            data-mag=""
            data-hover=""
            href="/about"
            style={quietPrimary("#0E0D0B", "#F7F5F2", "14px 24px")}
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
        <div data-fadeup="" style={{ ...ruleStyle({ margin: "0 auto 18px" }) }} />
        <div data-fadeup="" style={quietLabel({ marginBottom: 18 })}>
          Investment
        </div>
        <h2
          data-fadeup=""
          style={{
            margin: 0,
            fontFamily: SERIF,
            fontWeight: 500,
            fontSize: "clamp(34px,4.4vw,56px)",
            lineHeight: 1.1,
          }}
        >
          Collections from $2,600
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
          <QuietSoft href="/investment" label="See the collections" />
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
          <QuietCta />        </div>
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
              Let&rsquo;s make something felt
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
                href="https://www.instagram.com/leiphotography.co/"
                data-hover=""
                style={{
                  color: cream(0.6),
                  textDecoration: "none",
                  fontSize: 14,
                  letterSpacing: ".06em",
                }}
              >
                @leiphotography.co
              </a>
            </div>
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
            <QuietCta />          </div>
        </div>

        <div style={{ padding: "0 38px" }}>
          <LeiFooter />
        </div>
      </section>
    </LeiPage>
  );
}
