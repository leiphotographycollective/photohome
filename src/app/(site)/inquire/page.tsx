import type { Metadata } from "next";
import Script from "next/script";
import LeiPage from "@/components/lei/LeiPage";
import Chrome from "@/components/lei/Chrome";
import LeiFooter from "@/components/lei/LeiFooter";
import { DIM, GOLD, MUTED, SERIF, kicker } from "@/components/lei/tokens";
import { img, PHOTOS } from "@/content/portfolio";

export const metadata: Metadata = {
  title: "Inquire — Let's Make Something Felt",
  description:
    "Tell me about your day — weddings, graduations, portraits and events across the San Francisco Bay Area. Every inquiry is read personally, with a response within 48 hours.",
};

/*
  HoneyBook contact form is embedded below (placement id
  6916a511bece1a003537f355). The loader script is injected with
  next/script; HoneyBook renders and styles the form inside the
  .hb-p-…-1 div. To swap forms, replace the placement id in both
  the div className and the Script content.
*/

const DETAILS: Array<{ label: string; value: string; href?: string }> = [
  { label: "Email", value: "leiphotography57@gmail.com", href: "mailto:leiphotography57@gmail.com" },
  { label: "Instagram", value: "@lei.photography.co", href: "http://instagram.com/lei.photography.co" },
  { label: "Based in", value: "San Francisco Bay Area" },
  { label: "Response time", value: "Within 48 hours" },
];

export default function InquirePage() {
  return (
    <LeiPage>
      <Chrome />

      {/* ══ Hero ══ */}
      <section
        className="lx-grid-2col"
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: 0,
          alignItems: "stretch",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "0 5vw 12vh 38px",
          }}
        >
          <div data-fadeup="" style={kicker({ marginBottom: "3vh" }, 11, ".34em")}>
            Inquire
          </div>
          <h1
            style={{
              margin: 0,
              fontFamily: SERIF,
              fontWeight: 600,
              lineHeight: 0.9,
              letterSpacing: ".01em",
            }}
          >
            <div data-title-line="" style={{ fontSize: "clamp(52px,8vw,128px)" }}>
              LET&rsquo;S MAKE
            </div>
            <div data-title-line="" style={{ fontSize: "clamp(52px,8vw,128px)" }}>
              SOMETHING <em style={{ fontWeight: 400 }}>FELT.</em>
            </div>
          </h1>
          <p
            data-fadeup=""
            style={{
              maxWidth: 480,
              margin: "5vh 0 0",
              fontSize: 16,
              lineHeight: 1.8,
              color: MUTED,
            }}
          >
            Thank you for being here. Tell me a little about what you&rsquo;re
            envisioning — the moments, the milestone, the feeling you want to
            keep. Every story begins with a simple hello, and I read each inquiry
            personally.
          </p>
        </div>
        <div
          data-reveal=""
          style={{
            position: "relative",
            overflow: "hidden",
            background: "#0E0D0B",
            minHeight: "60vh",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img(PHOTOS.sargon225.path, 1500)}
            alt={PHOTOS.sargon225.a}
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

      {/* ══ Details ══ */}
      <section
        style={{
          position: "relative",
          background: "#0E0D0B",
          color: "#F7F5F2",
          padding: "14vh 38px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "3vw",
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          {DETAILS.map((d) => (
            <div key={d.label} data-fadeup="">
              <div style={kicker({ marginBottom: 14 }, 10, ".24em")}>{d.label}</div>
              {d.href ? (
                <a
                  href={d.href}
                  data-hover=""
                  style={{
                    fontFamily: SERIF,
                    fontSize: "clamp(18px,1.8vw,24px)",
                    color: "#F7F5F2",
                    textDecoration: "none",
                  }}
                >
                  {d.value}
                </a>
              ) : (
                <div
                  style={{ fontFamily: SERIF, fontSize: "clamp(18px,1.8vw,24px)" }}
                >
                  {d.value}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ══ HoneyBook embed ══ */}
      <section
        id="form"
        style={{
          position: "relative",
          background: "#F7F5F2",
          color: "#0E0D0B",
          padding: "16vh 38px",
        }}
      >
        <div
          style={{
            maxWidth: 920,
            margin: "0 auto",
            textAlign: "center",
            marginBottom: "8vh",
          }}
        >
          <div data-fadeup="" style={kicker({ marginBottom: 20 }, 10, ".3em")}>
            The inquiry form
          </div>
          <h2
            data-fadeup=""
            style={{
              margin: 0,
              fontFamily: SERIF,
              fontWeight: 500,
              fontSize: "clamp(30px,4vw,54px)",
              lineHeight: 1.12,
              textWrap: "pretty",
            }}
          >
            Share your story below
          </h2>
          <p
            data-fadeup=""
            style={{
              maxWidth: 560,
              margin: "24px auto 0",
              fontSize: 15,
              lineHeight: 1.75,
              color: MUTED,
            }}
          >
            A few details is all it takes to begin. Once you submit, you&rsquo;ll
            hear back from me personally to set up a call.
          </p>
        </div>

        {/* ══ HoneyBook placement (pid 6916a511bece1a003537f355) ══ */}
        <div
          data-fadeup=""
          style={{ maxWidth: 920, margin: "0 auto", minHeight: 640 }}
        >
          <div className="hb-p-6916a511bece1a003537f355-1" />
        </div>
        <Script id="honeybook-loader" strategy="afterInteractive">
          {`(function(h,b,s,n,i){h._HB_=h._HB_||{};h._HB_.pid=i;var t=b.createElement(s);t.type="text/javascript";t.async=true;t.src=n;var e=b.getElementsByTagName(s)[0];e.parentNode.insertBefore(t,e);})(window,document,"script","https://widget.honeybook.com/assets_users_production/websiteplacements/placement-controller.min.js","6916a511bece1a003537f355");`}
        </Script>
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
