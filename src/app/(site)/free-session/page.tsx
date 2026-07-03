import type { Metadata } from "next";
import Script from "next/script";
import LeiPage from "@/components/lei/LeiPage";
import Chrome from "@/components/lei/Chrome";
import LeiFooter from "@/components/lei/LeiFooter";
import FreeSessionForm from "@/components/lei/FreeSessionForm";
import { ParallaxGallery, ProcessSteps } from "@/components/lei/blocks";
import { GOLD, MUTED, SERIF, cream, kicker, pill } from "@/components/lei/tokens";

export const metadata: Metadata = {
  title: "Your Free Engagement Session",
  description:
    "A completely free engagement session for newly engaged Bay Area couples. Experience Lei Photography Collective's style before you choose your wedding photographer. Only five spots each month.",
};

/* ── META PIXEL ────────────────────────────────────────────────────────
   TO ACTIVATE: replace PIXEL_ID below with your Pixel ID from Meta Events
   Manager. Loads only on this page (not sitewide) and fires a "Lead" event
   when the form above submits successfully — see FreeSessionForm.tsx.
   Leave as "REPLACE_ME_PIXEL_ID" and this block simply won't render. */
const PIXEL_ID = "REPLACE_ME_PIXEL_ID";

const BENEFITS = [
  {
    title: "A full session, zero cost",
    body: "This isn't a five-minute mini-shoot. We plan a real engagement session — location, light, gentle direction — and I edit your photos with the same care I give my weddings.",
  },
  {
    title: "No obligation to book your wedding",
    body: "There's no contract hiding behind the word free. If my work feels right for your day, wonderful — we'll talk. If not, the photos are still yours to keep.",
  },
  {
    title: "Experience my style before you commit",
    body: "Your photographer is beside you more than almost any other vendor on your wedding day. Know how it feels to be photographed by me — before you decide anything.",
  },
];

const STEPS = [
  { n: "01", title: "Say hello", body: "Fill out the short form below. I read every message myself and reply within 24 hours." },
  { n: "02", title: "We plan your session", body: "Together we'll pick a spot that means something to you, the right golden-hour light, and what to wear." },
  { n: "03", title: "Enjoy your shoot", body: "A relaxed hour in front of the camera — then a gallery of finished photos lands in your inbox." },
];

/* Gallery photos — drop files at these exact paths under public/images/
   free-session/ and they appear automatically. Until then each frame shows
   the site's standard neutral placeholder tone. */
const GALLERY = [
  { src: "/images/free-session/engagement-1.jpg", alt: "Newly engaged couple laughing together at golden hour", cursor: "Engagement" },
  { src: "/images/free-session/engagement-2.jpg", alt: "Couple embracing on the San Francisco coast", cursor: "Engagement" },
  { src: "/images/free-session/engagement-3.jpg", alt: "Close-up of the engagement ring during a session", cursor: "Engagement" },
  { src: "/images/free-session/engagement-4.jpg", alt: "Candid moment between partners during their shoot", cursor: "Engagement" },
  { src: "/images/free-session/wedding-5.jpg", alt: "First dance beneath string lights", cursor: "Wedding" },
  { src: "/images/free-session/wedding-6.jpg", alt: "Bride and groom portrait in soft natural light", cursor: "Wedding" },
];

export default function FreeSessionPage() {
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

      <Chrome />

      {/* ══ Hero ══ */}
      <section
        style={{
          position: "relative",
          minHeight: "94vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 6vw 9vh",
          overflow: "hidden",
        }}
      >
        {/* ▼▼▼ HERO PHOTO — drop a file at public/images/free-session/hero.jpg
             (a wide, slightly dark photo reads best under the text). ▼▼▼ */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "#171411 url('/images/free-session/hero.jpg') center / cover no-repeat",
          }}
        />
        {/* ▲▲▲ END HERO PHOTO ▲▲▲ */}
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
            A completely free engagement shoot for newly engaged couples — feel
            what it&rsquo;s like on the other side of my camera before you choose
            your wedding photographer.
          </p>
          <div data-fadeup="" style={{ marginTop: "4vh" }}>
            <a
              href="#claim"
              data-mag=""
              data-hover=""
              style={pill("#F7F5F2", "#0E0D0B")}
            >
              Book Your Free Session
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
            No cost &nbsp;·&nbsp; No obligation &nbsp;·&nbsp; A real, full session
          </div>
        </div>
      </section>

      {/* ══ Gallery ══ */}
      <section
        style={{ position: "relative", background: "#F7F5F2", padding: "16vh 4vw" }}
      >
        <div
          style={{
            textAlign: "center",
            maxWidth: 620,
            margin: "0 auto 8vh",
          }}
        >
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

      {/* ══ The offer ══ */}
      <section
        style={{
          position: "relative",
          background: "#0E0D0B",
          color: "#F7F5F2",
          padding: "18vh 6vw",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 8vh" }}>
            <div data-fadeup="" style={{ ...kicker({}, 10, ".3em"), display: "block", marginBottom: 16 }}>
              The offer
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
              A real session. <em>Actually</em> free.
            </h2>
            <p
              data-fadeup=""
              style={{ marginTop: 18, fontSize: 16, lineHeight: 1.8, color: cream(0.72) }}
            >
              Choosing a wedding photographer usually means guessing from a
              portfolio. I&rsquo;d rather you know.
            </p>
          </div>

          <div
            className="lx-cols-3"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "3.5vw",
            }}
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
              Book Your Free Session
            </a>
          </div>
        </div>
      </section>

      {/* ══ Scarcity statement ══ */}
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
            fontFamily: SERIF,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(26px,4vw,44px)",
            lineHeight: 1.35,
            color: "#0E0D0B",
            textWrap: "pretty",
          }}
        >
          I photograph only <em style={{ color: GOLD }}>five</em> free sessions
          each month — so every couple gets my full attention.
        </p>
        <div
          data-fadeup=""
          style={{
            marginTop: 16,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: ".24em",
            textTransform: "uppercase",
            color: "#9C9490",
          }}
        >
          When the month is booked, it&rsquo;s booked
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
              style={{
                margin: 0,
                fontFamily: SERIF,
                fontWeight: 500,
                fontSize: "clamp(30px,5vw,48px)",
              }}
            >
              Three easy steps.
            </h2>
          </div>
        </div>
        <ProcessSteps steps={STEPS} />
      </section>

      {/* ══ Booking form ══ */}
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
              The booking form
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
              Claim your <em>free</em> session.
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
              Tell me a little about you two. I&rsquo;ll be in touch within 24
              hours.
            </p>
          </div>
          <div data-fadeup="">
            <FreeSessionForm />
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
        <LeiFooter border={false} />
      </section>
    </LeiPage>
  );
}
