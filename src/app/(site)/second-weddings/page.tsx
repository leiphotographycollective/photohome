import type { Metadata } from "next";
import LeiPage from "@/components/lei/LeiPage";
import Chrome from "@/components/lei/Chrome";
import LeiFooter from "@/components/lei/LeiFooter";
import HoneyBookEmbed from "@/components/lei/HoneyBookEmbed";
import { ProcessSteps } from "@/components/lei/blocks";
import { SoftLink } from "@/components/lei/Cta";
import { GOLD, MUTED, SERIF, cream, ink, kicker, pill } from "@/components/lei/tokens";
import { img } from "@/content/portfolio";
import {
  META,
  HERO,
  OPENING,
  VALUE_PROPS,
  PACKAGES,
  SOCIAL_PROOF,
  STEPS,
  FAQ,
  FINAL_CTA,
} from "@/content/second-weddings";

export const metadata: Metadata = {
  title: META.title,
  description: META.description,
};

export default function SecondWeddingsPage() {
  return (
    <LeiPage>
      <Chrome />

      {/* ══ Hero, full-bleed warm candid + dark gradient ══ */}
      <section
        style={{
          position: "relative",
          minHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 6vw 9vh",
          overflow: "hidden",
          background: "#171411",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img(HERO.image.path, 2000)}
          alt={HERO.image.a}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(14,13,11,.86) 0%, rgba(14,13,11,.35) 55%, rgba(14,13,11,.5) 100%)",
          }}
        />
        <div style={{ position: "relative", zIndex: 2, color: "#F7F5F2", maxWidth: 780 }}>
          <div data-fadeup="" style={kicker({ marginBottom: "3vh" }, 11, ".34em")}>
            {HERO.kicker}
          </div>
          <h1
            data-title-line=""
            style={{
              margin: 0,
              fontFamily: SERIF,
              fontWeight: 500,
              fontSize: "clamp(38px,7vw,92px)",
              lineHeight: 1.02,
              letterSpacing: ".01em",
              textWrap: "pretty",
            }}
          >
            {HERO.headline}
          </h1>
          <p
            data-fadeup=""
            style={{
              maxWidth: 620,
              margin: "4vh 0 0",
              fontSize: 16,
              lineHeight: 1.8,
              color: cream(0.85),
            }}
          >
            {HERO.subheadline}
          </p>
          <div data-fadeup="" style={{ marginTop: "4vh" }}>
            <a href="#inquire" data-mag="" data-hover="" style={pill(GOLD, "#0E0D0B")}>
              {HERO.ctaLabel}
            </a>
          </div>
        </div>
      </section>

      {/* ══ Opening "you" block ══ */}
      <section style={{ position: "relative", background: "#F7F5F2", color: "#0E0D0B", padding: "18vh 6vw" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div data-fadeup="" style={{ ...kicker({}, 10, ".3em"), display: "block", marginBottom: 26 }}>
            {OPENING.kicker}
          </div>
          {OPENING.paragraphs.map((p, i) => (
            <p
              key={i}
              data-fadeup=""
              style={{
                margin: i === 0 ? "0 0 22px" : "0 0 22px",
                fontFamily: i === 0 ? SERIF : undefined,
                fontSize: i === 0 ? "clamp(22px,2.6vw,32px)" : 17,
                fontWeight: i === 0 ? 500 : undefined,
                lineHeight: i === 0 ? 1.35 : 1.85,
                color: i === 0 ? "#0E0D0B" : MUTED,
                textWrap: "pretty",
              }}
            >
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* ══ Why couples choose this, value props ══ */}
      <section style={{ position: "relative", background: "#0E0D0B", color: "#F7F5F2", padding: "16vh 6vw" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2
            data-fadeup=""
            style={{
              margin: "0 0 8vh",
              textAlign: "center",
              fontFamily: SERIF,
              fontWeight: 500,
              fontSize: "clamp(30px,4.4vw,52px)",
            }}
          >
            {VALUE_PROPS.heading}
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "3vw",
            }}
          >
            {VALUE_PROPS.items.map((v) => (
              <div
                key={v.title}
                data-step=""
                style={{ borderTop: `1px solid ${cream(0.14)}`, paddingTop: 26 }}
              >
                <h3 style={{ margin: "0 0 12px", fontFamily: SERIF, fontWeight: 600, fontSize: 22, lineHeight: 1.25 }}>
                  {v.title}
                </h3>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.75, color: cream(0.65) }}>
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Packages ══ */}
      <section style={{ position: "relative", background: "#F7F5F2", color: "#0E0D0B", padding: "16vh 6vw" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "7vh" }}>
            <div data-fadeup="" style={{ ...kicker({}, 10, ".3em"), display: "block", marginBottom: 16 }}>
              {PACKAGES.kicker}
            </div>
            <h2
              data-fadeup=""
              style={{ margin: 0, fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(30px,4.6vw,56px)" }}
            >
              {PACKAGES.heading}
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "2vw",
              alignItems: "start",
            }}
          >
            {PACKAGES.items.map((p) => (
              <div
                key={p.name}
                data-fadeup=""
                style={{
                  position: "relative",
                  background: "#FFFFFF",
                  border: p.popular ? `1px solid ${GOLD}` : "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "40px 30px",
                }}
              >
                {p.popular && (
                  <div
                    style={{
                      position: "absolute",
                      top: -12,
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: GOLD,
                      color: "#0E0D0B",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: ".2em",
                      textTransform: "uppercase",
                      padding: "6px 14px",
                      borderRadius: 999,
                      whiteSpace: "nowrap",
                    }}
                  >
                    Most popular
                  </div>
                )}
                <h3 style={{ margin: "0 0 6px", fontFamily: SERIF, fontWeight: 600, fontSize: 26 }}>
                  {p.name}
                </h3>
                <div style={{ fontFamily: SERIF, fontSize: 34, color: GOLD, marginBottom: 20 }}>
                  {p.price}
                </div>
                <ul style={{ listStyle: "none", margin: "0 0 20px", padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {[p.hours, p.photographers, p.photos].map((line) => (
                    <li key={line} style={{ fontSize: 14, fontWeight: 600, letterSpacing: ".04em", color: "#0E0D0B" }}>
                      {line}
                    </li>
                  ))}
                </ul>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: MUTED }}>{p.blurb}</p>
              </div>
            ))}
          </div>

          {/* what every package includes */}
          <div style={{ maxWidth: 760, margin: "7vh auto 0" }}>
            <h3
              data-fadeup=""
              style={{ margin: "0 0 20px", fontFamily: SERIF, fontWeight: 600, fontSize: 22, textAlign: "center" }}
            >
              {PACKAGES.includesHeading}
            </h3>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {PACKAGES.includes.map((line) => (
                <li key={line} data-fadeup="" style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
                  <span style={{ color: GOLD, fontSize: 12, flexShrink: 0 }}>★</span>
                  <span style={{ fontSize: 15, lineHeight: 1.7, color: MUTED }}>{line}</span>
                </li>
              ))}
            </ul>
            <p data-fadeup="" style={{ margin: "26px 0 0", fontSize: 14, lineHeight: 1.7, color: MUTED, textAlign: "center" }}>
              {PACKAGES.addons}
            </p>
            <p
              data-fadeup=""
              style={{
                margin: "18px 0 0",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                textAlign: "center",
                color: GOLD,
              }}
            >
              {PACKAGES.foundingRate}
            </p>
          </div>
        </div>
      </section>

      {/* ══ Social proof, candid strip ══ */}
      <section style={{ position: "relative", background: "#F7F5F2", padding: "0 6vw 16vh" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "1.4vw",
            }}
          >
            {SOCIAL_PROOF.images.map((p) => (
              <div key={p.path} data-fadeup="" style={{ overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img(p.path, 600)}
                  alt={p.a}
                  loading="lazy"
                  style={{ width: "100%", aspectRatio: "4 / 5", objectFit: "cover", display: "block" }}
                />
              </div>
            ))}
          </div>
          <div data-fadeup="" style={{ marginTop: "5vh", textAlign: "center" }}>
            <SoftLink href={SOCIAL_PROOF.href} label={SOCIAL_PROOF.caption} />
          </div>
        </div>
      </section>

      {/* ══ How it works ══ */}
      <section style={{ position: "relative", background: "#0E0D0B", color: "#F7F5F2" }}>
        <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto", paddingTop: "16vh" }}>
          <h2 data-fadeup="" style={{ margin: 0, fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(30px,5vw,48px)" }}>
            {STEPS.heading}
          </h2>
        </div>
        <ProcessSteps steps={STEPS.items} />
      </section>

      {/* ══ FAQ ══ */}
      <section style={{ position: "relative", background: "#F7F5F2", color: "#0E0D0B", padding: "16vh 6vw" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <h2
            data-fadeup=""
            style={{ margin: "0 0 6vh", fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(30px,4.4vw,52px)", textAlign: "center" }}
          >
            {FAQ.heading}
          </h2>
          <div>
            {FAQ.items.map((f) => (
              <details
                key={f.q}
                data-fadeup=""
                style={{ borderTop: `1px solid ${ink(0.14)}`, padding: "24px 0" }}
              >
                <summary
                  style={{
                    cursor: "pointer",
                    listStyle: "none",
                    fontFamily: SERIF,
                    fontWeight: 500,
                    fontSize: "clamp(19px,2.2vw,26px)",
                    lineHeight: 1.3,
                  }}
                >
                  {f.q}
                </summary>
                <p style={{ margin: "16px 0 0", fontSize: 16, lineHeight: 1.8, color: MUTED }}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Ready when you are, final CTA + HoneyBook slot ══ */}
      <section
        id="inquire"
        style={{ position: "relative", background: "#0E0D0B", color: "#F7F5F2", padding: "16vh 6vw 12vh" }}
      >
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <h2 data-fadeup="" style={{ margin: 0, fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(34px,5vw,62px)" }}>
            {FINAL_CTA.heading}
          </h2>
          <p data-fadeup="" style={{ maxWidth: 480, margin: "22px auto 6vh", fontSize: 16, lineHeight: 1.8, color: cream(0.72) }}>
            {FINAL_CTA.body}
          </p>
          <div data-fadeup="">
            <HoneyBookEmbed />
          </div>
          <div data-fadeup="" style={{ marginTop: "5vh" }}>
            <SoftLink href={FINAL_CTA.secondaryHref} label={FINAL_CTA.secondaryLabel} dark />
          </div>
        </div>
      </section>

      {/* ══ Footer ══ */}
      <section style={{ position: "relative", background: "#0E0D0B", color: "#F7F5F2", padding: "0 38px" }}>
        <LeiFooter border={false} />
      </section>
    </LeiPage>
  );
}
