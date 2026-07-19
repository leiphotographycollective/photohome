import type { Metadata } from "next";
import LeiPage from "@/components/lei/LeiPage";
import Chrome from "@/components/lei/Chrome";
import LeiFooter from "@/components/lei/LeiFooter";
import { GOLD, INK, MUTED, SERIF, kicker } from "@/components/lei/tokens";

/*
  FUNNEL LANDING PAGE — /wedding-timeline-guide  (Sub-project E, SCAFFOLD)

  Intentionally NOT added to the header/footer nav: this is a destination for
  Instagram / Pinterest traffic, not a browsing page.

  TWO THINGS STILL NEED YOU:
  1. COPY — everything below is on-brand DRAFT copy. Replace it with the real
     wording from your Timeline_Guide_SEO_and_Funnel_Plan doc when you have it.
  2. EMAIL CAPTURE — the form near the bottom is a PLACEHOLDER slot. It does not
     send anywhere yet. Wire it to your tool of choice (a HoneyBook lead form
     like /inquire and /free-session use, or an email service) before this page
     goes live. Search for "EMAIL-CAPTURE PLACEHOLDER" below.
*/

export const metadata: Metadata = {
  title: "Free Wedding Timeline Guide",
  description:
    "A free, photographer-built wedding day timeline guide: how to plan a day that stays relaxed, keeps golden hour, and never rushes the photos. San Francisco Bay Area.",
};

const INSIDE = [
  {
    label: "A sample day, hour by hour",
    body: "A real wedding-day timeline you can start from, from getting ready to the last dance.",
  },
  {
    label: "Where to protect the light",
    body: "How to place your ceremony and portraits so golden hour works for you, not against you.",
  },
  {
    label: "Buffers that save the day",
    body: "The small pockets of time that keep the whole day calm when something inevitably runs long.",
  },
  {
    label: "Getting-ready timing",
    body: "How much runway to leave so the morning feels unhurried and the details get their moment.",
  },
];

export default function WeddingTimelineGuidePage() {
  return (
    <LeiPage>
      <Chrome />

      {/* ══ Hero + capture ══ */}
      <section
        style={{
          position: "relative",
          background: "#F7F5F2",
          color: "#0E0D0B",
          padding: "calc(var(--lx-header-h) + 14vh) 6vw 14vh",
        }}
      >
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <div
            data-fadeup=""
            style={{ ...kicker({ marginBottom: 22 }, 11, ".34em"), textAlign: "center" }}
          >
            Free guide
          </div>
          <h1
            data-fadeup=""
            style={{
              margin: 0,
              fontFamily: SERIF,
              fontWeight: 500,
              fontSize: "clamp(38px,6vw,76px)",
              lineHeight: 1.04,
              textWrap: "pretty",
            }}
          >
            Build a wedding day that never rushes the photos.
          </h1>
          <p
            data-fadeup=""
            style={{
              maxWidth: 540,
              margin: "4vh auto 0",
              fontSize: 17,
              lineHeight: 1.8,
              color: MUTED,
            }}
          >
            I put together the timeline guide I wish every couple had: how to shape
            your day so it stays relaxed, keeps golden hour, and still leaves room
            to actually be in it. Tell me where to send it.
          </p>

          {/* ══ EMAIL-CAPTURE PLACEHOLDER ══
              Not wired to anything yet. Replace with your real lead form
              (HoneyBook placement like /free-session, or an email service). */}
          <div
            data-fadeup=""
            role="group"
            aria-label="Get the wedding timeline guide"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 12,
              maxWidth: 480,
              margin: "6vh auto 0",
            }}
          >
            <input
              type="email"
              placeholder="Your email"
              aria-label="Your email"
              style={{
                flex: "1 1 240px",
                minWidth: 0,
                padding: "16px 20px",
                fontSize: 15,
                fontFamily: "inherit",
                color: INK,
                background: "#FFFFFF",
                border: "1px solid rgba(14,13,11,.14)",
                borderRadius: 999,
              }}
            />
            <button
              type="button"
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: ".22em",
                textTransform: "uppercase",
                color: INK,
                background: GOLD,
                border: "none",
                padding: "16px 30px",
                borderRadius: 999,
                cursor: "pointer",
              }}
            >
              Send me the guide
            </button>
          </div>
          <p
            data-fadeup=""
            style={{ margin: "18px 0 0", fontSize: 12, color: MUTED }}
          >
            No spam, just the guide. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* ══ What's inside ══ */}
      <section
        style={{
          position: "relative",
          background: "#0E0D0B",
          color: "#F7F5F2",
          padding: "16vh 6vw",
        }}
      >
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div
            data-fadeup=""
            style={{ ...kicker({ marginBottom: "5vh" }, 10, ".3em"), textAlign: "center" }}
          >
            What&rsquo;s inside
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))",
              gap: "3vw",
            }}
          >
            {INSIDE.map((item) => (
              <div key={item.label} data-fadeup="">
                <div
                  style={{
                    fontFamily: SERIF,
                    fontSize: "clamp(20px,2vw,26px)",
                    fontWeight: 500,
                    marginBottom: 12,
                  }}
                >
                  {item.label}
                </div>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.7, color: "rgba(247,245,242,.62)" }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Footer ══ */}
      <section
        style={{
          position: "relative",
          background: "#0E0D0B",
          color: "#F7F5F2",
          padding: "0 6vw",
        }}
      >
        <LeiFooter border={false} />
      </section>
    </LeiPage>
  );
}
