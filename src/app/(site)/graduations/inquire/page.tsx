import type { Metadata } from "next";
import Script from "next/script";
import LeiPage from "@/components/lei/LeiPage";
import Chrome from "@/components/lei/Chrome";
import LeiFooter from "@/components/lei/LeiFooter";
import { MUTED, SERIF, kicker } from "@/components/lei/tokens";
import { HERO } from "@/content/graduations";

export const metadata: Metadata = {
  title: "Graduation Photography Inquiry",
  description:
    "Tell Raymond about your graduation, campus, preferred session date, and the people you want in the photographs.",
  robots: {
    index: false,
    follow: true,
  },
};

const HONEYBOOK_PLACEMENT_ID = "6916a511bece1a003537f355";

export default function GraduationInquiryPage() {
  return (
    <LeiPage>
      <Chrome />

      <section
        className="lx-grid-2col"
        style={{
          position: "relative",
          minHeight: "72svh",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          background: "#F7F5F2",
          color: "#0E0D0B",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "calc(var(--lx-header-h) + 7vh) 6vw 9vh",
          }}
        >
          <div data-fadeup="" style={kicker({ marginBottom: 22 }, 11, ".3em")}>
            Graduation inquiry
          </div>
          <h1
            data-title-line=""
            style={{
              maxWidth: 680,
              margin: 0,
              fontFamily: SERIF,
              fontWeight: 500,
              fontSize: "clamp(42px,6vw,78px)",
              lineHeight: 1.03,
              textWrap: "pretty",
            }}
          >
            Let&rsquo;s document your graduation.
          </h1>
          <p
            data-fadeup=""
            style={{
              maxWidth: 560,
              margin: "28px 0 0",
              fontSize: 16,
              lineHeight: 1.8,
              color: MUTED,
            }}
          >
            Share your school, graduation date, ideal locations, and who will
            be joining you. I&rsquo;ll follow up personally within 48 hours
            with availability and next steps.
          </p>
        </div>

        <div
          data-reveal=""
          style={{
            position: "relative",
            minHeight: "52vh",
            overflow: "hidden",
            background: "#0E0D0B",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO.image}
            alt={HERO.alt}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </section>

      <section
        id="form"
        style={{
          position: "relative",
          background: "#F7F5F2",
          color: "#0E0D0B",
          padding: "14vh 38px 16vh",
          scrollMarginTop: "calc(var(--lx-header-h) + 24px)",
        }}
      >
        <div
          style={{
            maxWidth: 760,
            margin: "0 auto 7vh",
            textAlign: "center",
          }}
        >
          <div data-fadeup="" style={kicker({ marginBottom: 18 }, 10, ".3em")}>
            Reserve your session
          </div>
          <h2
            data-fadeup=""
            style={{
              margin: 0,
              fontFamily: SERIF,
              fontWeight: 500,
              fontSize: "clamp(32px,4.5vw,58px)",
              lineHeight: 1.1,
              textWrap: "pretty",
            }}
          >
            Tell me about your graduation
          </h2>
          <p
            data-fadeup=""
            style={{
              maxWidth: 560,
              margin: "22px auto 0",
              fontSize: 15,
              lineHeight: 1.75,
              color: MUTED,
            }}
          >
            Complete the form below and I&rsquo;ll confirm availability,
            answer your questions, and help you choose the right experience.
          </p>
        </div>

        <div
          data-fadeup=""
          style={{ maxWidth: 920, minHeight: 640, margin: "0 auto" }}
        >
          <div className={`hb-p-${HONEYBOOK_PLACEMENT_ID}-2`} />
          {/* HoneyBook's one-pixel placement tracker, supplied with this form. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.honeybook.com/p.png?pid=${HONEYBOOK_PLACEMENT_ID}`}
            alt=""
          />
        </div>

        <Script id="graduation-honeybook-loader" strategy="afterInteractive">
          {`(function(h,b,s,n,i,p,e,t){h._HB_=h._HB_||{};h._HB_.pid=i;t=b.createElement(s);t.type="text/javascript";t.async=true;t.src=n;e=b.getElementsByTagName(s)[0];e.parentNode.insertBefore(t,e);})(window,document,"script","https://widget.honeybook.com/assets_users_production/websiteplacements/placement-controller.min.js","${HONEYBOOK_PLACEMENT_ID}");`}
        </Script>
      </section>

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
