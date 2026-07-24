import type { Metadata } from "next";
import Script from "next/script";
import LeiPage from "@/components/lei/LeiPage";
import LeiFooter from "@/components/lei/LeiFooter";
import FreeSessionForm from "@/components/lei/FreeSessionForm";
import TestimonialFeature from "@/components/lei/TestimonialFeature";
import { ParallaxGallery, ProcessSteps } from "@/components/lei/blocks";
import { GOLD, MUTED, SERIF, cream, kicker, pill } from "@/components/lei/tokens";

/* ─────────────────────────────────────────────────────────────────────────
   FREE-SESSION LANDING — VARIANT B ("Ignite")

   Same offer and brand as /free-session, restructured on a single-narrative
   conversion spine: no site nav (no click leaks), a "why me / prep-as-a-service"
   differentiator, real testimonials placed right before the close, and one
   repeated CTA. Runs as the B page against A (/free-session); point one Ignite
   ad set here. Form entries carry source="ignite-b" so they're distinguishable.
   ───────────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "Your Free Engagement Session",
  description:
    "A free engagement session for newly engaged Bay Area couples. Raymond reads every entry personally and hand-picks four couples each month based on their story.",
  // Ad-only variant — keep it out of search so it never competes with the
  // primary /free-session page for the same terms.
  robots: { index: false, follow: false },
};

/* ── META PIXEL ────────────────────────────────────────────────────────
   TO ACTIVATE: replace PIXEL_ID below with your Pixel ID from Meta Events
   Manager. Loads only on this page and fires a "Lead" event when the form
   submits. Leave as "REPLACE_ME_PIXEL_ID" and this block simply won't render. */
const PIXEL_ID = "REPLACE_ME_PIXEL_ID";

/* The three reasons it's a real session, not a teaser — kept from A; they
   answer the "what's the catch?" objection an ad-clicker arrives with. */
const BENEFITS = [
  {
    title: "A full session, zero cost",
    body: "This isn't a five-minute mini-shoot. We plan a real engagement session (location, light, gentle direction) and I edit your photos with the same care I give my weddings.",
  },
  {
    title: "No obligation to book your wedding",
    body: "There's no contract hiding behind the word free. If my work feels right for your day, wonderful, we'll talk. If not, the photos are still yours to keep.",
  },
  {
    title: "Experience my style before you commit",
    body: "Your photographer is beside you more than almost any other vendor on your wedding day. Know how it feels to be photographed by me, before you decide anything.",
  },
];

const STEPS = [
  { n: "01", title: "Tell me your story", body: "Fill out the form below and tell me your story: how you met, how the proposal happened, what makes you, you." },
  { n: "02", title: "I read every entry", body: "I personally read every entry, in full, every single month, including yours." },
  { n: "03", title: "I hand-pick four couples", body: "I choose the four couples whose story stands out to me the most. It could easily be you." },
  { n: "04", title: "We plan, then shoot", body: "If it's you, I email you within a few days, and we start planning the session, on me." },
];

const GALLERY = [
  { src: "/images/free-session/engagement-1.jpg", alt: "Newly engaged couple laughing together at golden hour", cursor: "Engagement" },
  { src: "/images/free-session/engagement-2.jpg", alt: "Couple embracing on the San Francisco coast", cursor: "Engagement" },
  { src: "/images/free-session/engagement-3.jpg", alt: "Close-up of the engagement ring during a session", cursor: "Engagement" },
  { src: "/images/free-session/engagement-4.jpg", alt: "Candid moment between partners during their shoot", cursor: "Engagement" },
  { src: "/images/free-session/wedding-5.jpg", alt: "First dance beneath string lights", cursor: "Wedding" },
  { src: "/images/free-session/wedding-6.jpg", alt: "Bride and groom portrait in soft natural light", cursor: "Wedding" },
];

export default function FreeSessionVariantB() {
  return (
    <LeiPage>
      {PIXEL_ID !== "REPLACE_ME_PIXEL_ID" && (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      )}

      {/* ══ Custom cursor (kept from Chrome; the site nav is intentionally
             omitted on this single-purpose ad page). ══ */}
      <div
        data-cursor-dot=""
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: GOLD,
          zIndex: 200,
          pointerEvents: "none",
          transform: "translate(-100px,-100px)",
        }}
      />
      <div
        data-cursor-ring=""
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 44,
          height: 44,
          borderRadius: "50%",
          border: "1px solid rgba(184,144,90,.9)",
          zIndex: 200,
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: "translate(-100px,-100px)",
        }}
      >
        <span
          data-cursor-label=""
          style={{
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: ".18em",
            textTransform: "uppercase",
            color: GOLD,
            opacity: 0,
            whiteSpace: "nowrap",
          }}
        />
      </div>

      {/* ══ Hero ══ */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 6vw 9vh",
          overflow: "hidden",
        }}
      >
        {/* Wordmark only — no nav, no links, nothing to click away with. */}
        <div
          style={{
            position: "absolute",
            top: 30,
            left: 0,
            right: 0,
            zIndex: 3,
            textAlign: "center",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: ".16em",
            textTransform: "uppercase",
            color: "#F7F5F2",
          }}
        >
          Lei Photography{" "}
          <span style={{ fontWeight: 400, color: cream(0.6) }}>Collective</span>
        </div>

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "#171411 url('/images/free-session/hero.jpg') center / cover no-repeat",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(14,13,11,.86) 0%, rgba(14,13,11,.4) 55%, rgba(14,13,11,.5) 100%)",
          }}
        />
        <div style={{ position: "relative", zIndex: 2, color: "#F7F5F2" }}>
          <div data-fadeup="" style={kicker({ marginBottom: "3vh" }, 11, ".34em")}>
            Just engaged · San José &amp; the Bay Area
          </div>
          <h1
            style={{
              margin: 0,
              fontFamily: SERIF,
              fontWeight: 600,
              lineHeight: 0.94,
              letterSpacing: ".01em",
            }}
          >
            <div data-title-line="" style={{ fontSize: "clamp(48px,10vw,140px)" }}>
              YOUR ENGAGEMENT
            </div>
            <div data-title-line="" style={{ fontSize: "clamp(48px,10vw,140px)" }}>
              SESSION, <em style={{ fontWeight: 400 }}>ON ME.</em>
            </div>
          </h1>
          <p
            data-fadeup=""
            style={{
              maxWidth: 560,
              margin: "4vh 0 0",
              fontSize: 16,
              lineHeight: 1.8,
              color: cream(0.85),
            }}
          >
            Every month I hand-pick four newly engaged couples for a completely
            free engagement session: no random drawing, just me reading real
            stories, maybe yours, and choosing the ones that pull me in.
          </p>
          <div data-fadeup="" style={{ marginTop: "4vh" }}>
            <a href="#claim" data-mag="" data-hover="" style={pill("#F7F5F2", "#0E0D0B")}>
              Tell me your story
            </a>
          </div>
          <div
            data-fadeup=""
            style={{
              marginTop: 22,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: ".16em",
              textTransform: "uppercase",
              color: cream(0.65),
            }}
          >
            Free to enter &nbsp;·&nbsp; No obligation &nbsp;·&nbsp; Four couples hand-picked every month
          </div>
        </div>
      </section>

      {/* ══ Gallery ══ */}
      <section style={{ position: "relative", background: "#F7F5F2", padding: "16vh 4vw" }}>
        <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 8vh" }}>
          <div data-fadeup="" style={{ ...kicker({}, 10, ".28em"), display: "block", marginBottom: 16 }}>
            The work
          </div>
          <h2
            data-fadeup=""
            style={{
              margin: 0,
              fontFamily: SERIF,
              fontWeight: 500,
              fontSize: "clamp(30px,6vw,52px)",
              lineHeight: 1.1,
            }}
          >
            Moments that <em>move</em> people.
          </h2>
        </div>
        <ParallaxGallery
          columns={[
            {
              speed: -50,
              marginTop: "6vh",
              images: [GALLERY[0], GALLERY[3]].map((g) => ({ ...g, ratio: "4 / 5" })),
            },
            {
              speed: 50,
              images: [GALLERY[1], GALLERY[4]].map((g) => ({ ...g, ratio: "4 / 5" })),
            },
            {
              speed: -70,
              marginTop: "10vh",
              images: [GALLERY[2], GALLERY[5]].map((g) => ({ ...g, ratio: "4 / 5" })),
            },
          ]}
        />
      </section>

      {/* ══ Why me — prep-as-a-service (the differentiator A doesn't state) ══ */}
      <section
        style={{
          position: "relative",
          background: "#0E0D0B",
          color: "#F7F5F2",
          padding: "18vh 6vw",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 660, margin: "0 auto 8vh" }}>
            <div data-fadeup="" style={{ ...kicker({}, 10, ".3em"), display: "block", marginBottom: 16 }}>
              Why it's me you want beside you
            </div>
            <h2
              data-fadeup=""
              style={{
                margin: 0,
                fontFamily: SERIF,
                fontWeight: 500,
                fontSize: "clamp(30px,6vw,52px)",
                lineHeight: 1.1,
              }}
            >
              The photos are the <em>easy</em> part.
            </h2>
            <p
              data-fadeup=""
              style={{ marginTop: 18, fontSize: 16, lineHeight: 1.8, color: cream(0.72) }}
            >
              Most couples meet their photographer once and hope for the best.
              I&rsquo;d rather show you. We plan the look, scout the light, and
              shoot a real session together, so long before your wedding day the
              hard part is already done. You show up, stay present, and I handle
              the rest. This free session is where that starts.
            </p>
          </div>

          <div
            className="lx-cols-3"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "3.5vw" }}
          >
            {BENEFITS.map((b) => (
              <div
                key={b.title}
                data-step=""
                style={{
                  borderTop: `1px solid ${cream(0.14)}`,
                  paddingTop: 26,
                  display: "flex",
                  gap: 16,
                }}
              >
                <span style={{ color: GOLD, fontSize: 20, lineHeight: 1 }}>•</span>
                <div>
                  <h3
                    style={{
                      margin: "0 0 10px",
                      fontFamily: SERIF,
                      fontWeight: 600,
                      fontSize: 22,
                      lineHeight: 1.25,
                    }}
                  >
                    {b.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: 15, lineHeight: 1.75, color: cream(0.65) }}>
                    {b.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div data-fadeup="" style={{ textAlign: "center", marginTop: "8vh" }}>
            <a href="#claim" data-mag="" data-hover="" style={pill("#F7F5F2", "#0E0D0B")}>
              Tell me your story
            </a>
          </div>
        </div>
      </section>

      {/* ══ Scarcity statement (honest capacity — four a month) ══ */}
      <section
        style={{
          position: "relative",
          background: "#F7F5F2",
          padding: "20vh 6vw",
          textAlign: "center",
        }}
      >
        <p
          data-manifesto=""
          style={{
            maxWidth: 780,
            margin: "0 auto",
            textAlign: "center",
            fontFamily: SERIF,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(26px,4vw,44px)",
            lineHeight: 1.35,
            color: "#0E0D0B",
            textWrap: "pretty",
          }}
        >
          I give away <em style={{ color: GOLD }}>four</em> free engagement
          sessions every month, hand-picked from every couple who applies, so
          every winner, maybe you, gets the same full experience as my paid
          wedding clients: real time, real coverage, real photos to keep.
        </p>
        <div
          data-fadeup=""
          style={{
            marginTop: 16,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: ".24em",
            textTransform: "uppercase",
            textAlign: "center",
            color: "#9C9490",
          }}
        >
          Entries are read at the end of every month; make yours count
        </div>
      </section>

      {/* ══ How it works ══ */}
      <section style={{ position: "relative", background: "#0E0D0B", color: "#F7F5F2" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 6vw" }}>
          <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto", paddingTop: "16vh" }}>
            <div data-fadeup="" style={{ ...kicker({}, 10, ".3em"), display: "block", marginBottom: 16 }}>
              How it works
            </div>
            <h2
              data-fadeup=""
              style={{ margin: 0, fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(30px,5vw,48px)" }}
            >
              Four simple steps.
            </h2>
          </div>
        </div>
        <ProcessSteps steps={STEPS} />
      </section>

      {/* ══ Proof — real couple, right before the close (renders nothing until
             a real testimonial exists; never a placeholder). ══ */}
      <TestimonialFeature />

      {/* ══ Emotional close + final CTA ══ */}
      <section
        style={{
          position: "relative",
          background: "#0E0D0B",
          color: "#F7F5F2",
          padding: "20vh 6vw",
          textAlign: "center",
        }}
      >
        <p
          data-manifesto=""
          style={{
            maxWidth: 760,
            margin: "0 auto",
            fontFamily: SERIF,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(28px,4.4vw,48px)",
            lineHeight: 1.3,
            textWrap: "pretty",
          }}
        >
          The flowers wilt. The playlist ends. The guests head home. These are
          what&rsquo;s <em style={{ color: GOLD }}>left.</em>
        </p>
        <p
          data-fadeup=""
          style={{ margin: "3vh auto 0", fontSize: 16, lineHeight: 1.8, color: cream(0.72) }}
        >
          Four couples a month. Yours could be one of them.
        </p>
        <div data-fadeup="" style={{ marginTop: "5vh" }}>
          <a href="#claim" data-mag="" data-hover="" style={pill("#F7F5F2", "#0E0D0B")}>
            Tell me your story
          </a>
        </div>
      </section>

      {/* ══ Entry form ══ */}
      <section
        id="claim"
        style={{
          position: "relative",
          background: "#F7F5F2",
          color: "#0E0D0B",
          padding: "16vh 6vw",
        }}
      >
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "8vh" }}>
            <div data-fadeup="" style={{ ...kicker({}, 10, ".3em"), display: "block", marginBottom: 20 }}>
              The entry form
            </div>
            <h2
              data-fadeup=""
              style={{
                margin: 0,
                fontFamily: SERIF,
                fontWeight: 500,
                fontSize: "clamp(30px,4vw,54px)",
                lineHeight: 1.12,
              }}
            >
              Tell me your <em>story</em>
            </h2>
            <p
              data-fadeup=""
              style={{
                maxWidth: 480,
                margin: "24px auto 0",
                fontSize: 15,
                lineHeight: 1.75,
                color: MUTED,
              }}
            >
              Tell me about you two. The couples I pick are the ones whose story
              I can&rsquo;t stop thinking about.
            </p>
          </div>
          <div data-fadeup="">
            <FreeSessionForm source="ignite-b" />
          </div>
        </div>
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
        <LeiFooter border={false} minimal />
      </section>
    </LeiPage>
  );
}
