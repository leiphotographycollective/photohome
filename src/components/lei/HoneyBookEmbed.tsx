"use client";

import Script from "next/script";
import { SERIF, MUTED, GOLD } from "./tokens";
import { HONEYBOOK_PLACEMENT_ID, isConfigured } from "./honeybook";

/* Renders the HoneyBook inquiry form once a placement id is configured in
   honeybook.ts. Until then it renders a neutral placeholder card so the
   "Ready when you are" section always looks intentional. If HoneyBook gives
   you a snippet whose markup differs from the div + controller script below,
   paste its exact <div class="hb-p-…"> and <script src="…"> here instead. */
export default function HoneyBookEmbed() {
  if (!isConfigured(HONEYBOOK_PLACEMENT_ID)) {
    return (
      <div
        style={{
          maxWidth: 560,
          margin: "0 auto",
          textAlign: "center",
          padding: "56px 28px",
          background: "#FFFFFF",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
        }}
      >
        <div style={{ color: GOLD, letterSpacing: ".4em", fontSize: 12, marginBottom: 18 }}>
          ★ ★ ★
        </div>
        <h3
          style={{
            margin: 0,
            fontFamily: SERIF,
            fontWeight: 500,
            fontSize: "clamp(24px,4vw,32px)",
          }}
        >
          Let&rsquo;s check your date
        </h3>
        <p style={{ maxWidth: 400, margin: "12px auto 20px", color: MUTED, lineHeight: 1.7 }}>
          Email me your date, location, and a line about what you&rsquo;re
          planning, and I&rsquo;ll reply within a day.
        </p>
        <a
          href="mailto:leiphotography57@gmail.com?subject=Second%20wedding%20date%20check"
          data-hover=""
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: ".16em",
            textTransform: "uppercase",
            color: "#0E0D0B",
            textDecoration: "underline",
            textUnderlineOffset: 5,
            textDecorationColor: "rgba(184,144,90,.55)",
          }}
        >
          leiphotography57@gmail.com
        </a>
      </div>
    );
  }

  return (
    <>
      <Script id="hb-config" strategy="afterInteractive">
        {`window._HB_ = window._HB_ || {}; window._HB_.pid = "${HONEYBOOK_PLACEMENT_ID}";`}
      </Script>
      <Script
        id="hb-controller"
        strategy="afterInteractive"
        src="https://widget.honeybook.com/assets_users_production/websiteplacements/placement-controller.min.js"
      />
      <div className={`hb-p-${HONEYBOOK_PLACEMENT_ID}-2`} />
    </>
  );
}
