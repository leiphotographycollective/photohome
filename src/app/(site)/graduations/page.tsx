import type { Metadata } from "next";
import LeiPage from "@/components/lei/LeiPage";
import Chrome from "@/components/lei/Chrome";
import LeiFooter from "@/components/lei/LeiFooter";
import { PhotoBand } from "@/components/lei/blocks";
import { GOLD, MUTED, SERIF, cream, ink, kicker } from "@/components/lei/tokens";
import { CtaLink, SoftLink } from "@/components/lei/Cta";
import {
  META,
  HERO,
  TERESA_SPREAD,
  AKS_TRIO_SPREAD,
  HERO_STRIP,
  BAND_1,
  BAND_1_ALT,
  BAND_2,
  BAND_2_ALT,
  INTRO,
  TIERS,
  GROUPS,
  GROUP_TIERS,
  GROUP_FOOTNOTE,
  FINAL_CTA,
} from "@/content/graduations";

export const metadata: Metadata = {
  title: META.title,
  description: META.description,
};

export default function GraduationsPage() {
  return (
    <LeiPage>
      <Chrome />

      {/* ══ Hero — headline first, full-bleed photo beneath ══ */}
      <style>{`
        .grad-hero-img { aspect-ratio: 3 / 2; }
        @media (max-width: 860px) {
          .grad-tier-photo { order: 2 !important; }
        }
      `}</style>
      <section
        style={{
          position: "relative",
          background: "#F7F5F2",
          color: "#0E0D0B",
          padding: "calc(var(--lx-header-h) + 9vh) 6vw 7vh",
          textAlign: "center",
        }}
      >
        <div data-fadeup="" style={kicker({ marginBottom: 14 }, 11, ".3em")}>
          {HERO.kicker}
        </div>
        <h1
          data-title-line=""
          style={{
            margin: "0 auto",
            maxWidth: 900,
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
            maxWidth: 560,
            margin: "3% auto 0",
            fontFamily: SERIF,
            fontStyle: "italic",
            fontSize: "clamp(15px,2.4vw,19px)",
            lineHeight: 1.6,
            color: MUTED,
          }}
        >
          {HERO.subheadline}
        </p>
      </section>
      <section
        className="grad-hero-img"
        style={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          background: "#171411",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO.image}
          alt={HERO.alt}
          fetchPriority="high"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "50% 50%",
          }}
        />
      </section>

      {/* ══ Teresa & Uyen — its own spread, kept up near the hero ══ */}
      <section style={{ background: "#F7F5F2", padding: "6vh 6vw 0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={TERESA_SPREAD.image}
            alt={TERESA_SPREAD.alt}
            loading="lazy"
            style={{
              display: "block",
              width: "100%",
              aspectRatio: TERESA_SPREAD.aspect,
              objectFit: "cover",
            }}
          />
        </div>
      </section>

      {/* ══ Hero strip — four supporting shots, symmetrical 2x2 grid ══ */}
      <style>{`
        .grad-hero-strip { display: grid; grid-template-columns: repeat(2, 1fr); gap: 3vw; max-width: 900px; margin: 0 auto; }
      `}</style>
      <section
        className="grad-hero-strip"
        style={{ background: "#F7F5F2", padding: "6vh 6vw" }}
      >
        {HERO_STRIP.map((photo) => (
          <div key={photo.src} style={{ position: "relative", overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              style={{
                display: "block",
                width: "100%",
                aspectRatio: "3 / 4",
                objectFit: "cover",
              }}
            />
          </div>
        ))}
      </section>

      {/* ══ AKS trio — its own spread, right under the vertical frames ══ */}
      <section style={{ background: "#F7F5F2", padding: "0 6vw 6vh" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={AKS_TRIO_SPREAD.image}
            alt={AKS_TRIO_SPREAD.alt}
            loading="lazy"
            style={{
              display: "block",
              width: "100%",
              aspectRatio: AKS_TRIO_SPREAD.aspect,
              objectFit: "cover",
            }}
          />
        </div>
      </section>

      {/* ══ Intro note ══ */}
      <section
        style={{
          position: "relative",
          background: "#F7F5F2",
          color: "#0E0D0B",
          padding: "12vh 6vw 6vh",
          textAlign: "center",
        }}
      >
        <p
          data-fadeup=""
          style={{
            maxWidth: 640,
            margin: "0 auto",
            fontSize: 16,
            lineHeight: 1.85,
            color: MUTED,
          }}
        >
          {INTRO}
        </p>
      </section>

      {/* ══ Spacer band — intro note into the experiences ══ */}
      <PhotoBand src={BAND_1} alt={BAND_1_ALT} />

      {/* ══ The experiences — alternating photo/text blocks ══ */}
      <section
        style={{
          position: "relative",
          background: "#F7F5F2",
          color: "#0E0D0B",
          padding: "6vh 6vw 10vh",
          overflow: "hidden",
        }}
      >
        <h2
          data-fadeup=""
          style={{
            margin: "0 0 4vh",
            textAlign: "center",
            fontFamily: SERIF,
            fontWeight: 500,
            fontSize: "clamp(34px,5vw,72px)",
            letterSpacing: ".04em",
            color: ink(0.45),
          }}
        >
          GRADUATION EXPERIENCES
        </h2>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "12vh",
          }}
        >
          {TIERS.map((t, i) => (
            <div
              key={t.name}
              className="lx-grid-2col"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "6vw",
                alignItems: "center",
              }}
            >
              <div
                data-reveal=""
                className="grad-tier-photo"
                style={{
                  position: "relative",
                  overflow: "hidden",
                  order: i % 2 === 0 ? 2 : 0,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.image}
                  alt={t.alt}
                  loading="lazy"
                  style={{
                    display: "block",
                    width: "100%",
                    aspectRatio: t.aspect ?? "4 / 5",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div>
                <div
                  data-fadeup=""
                  style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 16 }}
                >
                  <span style={kicker({}, 10, ".3em")}>{t.kicker}</span>
                  {t.popular && (
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: ".18em",
                        textTransform: "uppercase",
                        color: "#0E0D0B",
                        background: GOLD,
                        padding: "4px 10px",
                        borderRadius: 999,
                        whiteSpace: "nowrap",
                      }}
                    >
                      ★ Most popular
                    </span>
                  )}
                </div>
                <h3
                  data-fadeup=""
                  style={{
                    margin: "0 0 6px",
                    fontFamily: SERIF,
                    fontWeight: 500,
                    fontSize: "clamp(28px,3.2vw,46px)",
                    lineHeight: 1.05,
                    letterSpacing: ".02em",
                  }}
                >
                  {t.name}
                </h3>
                {t.subtitle && (
                  <div
                    data-fadeup=""
                    style={{
                      margin: "0 0 18px",
                      fontFamily: SERIF,
                      fontStyle: "italic",
                      fontSize: 16,
                      color: MUTED,
                    }}
                  >
                    {t.subtitle}
                  </div>
                )}
                <p
                  data-fadeup=""
                  style={{
                    margin: t.subtitle ? "0 0 22px" : "18px 0 22px",
                    fontSize: 15.5,
                    lineHeight: 1.85,
                    color: MUTED,
                  }}
                >
                  {t.blurb}
                </p>
                <ul
                  style={{
                    listStyle: "none",
                    margin: "0 0 26px",
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 9,
                  }}
                >
                  {t.facts.map((f) => (
                    <li
                      key={f}
                      data-fadeup=""
                      style={{ display: "flex", gap: 12, alignItems: "baseline" }}
                    >
                      <span style={{ color: GOLD, fontSize: 10, flexShrink: 0 }}>★</span>
                      <span style={{ fontSize: 14, lineHeight: 1.6, color: MUTED }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <div
                  data-fadeup=""
                  style={{
                    fontFamily: SERIF,
                    fontStyle: "italic",
                    fontSize: 24,
                    color: "#0E0D0B",
                    marginBottom: 22,
                  }}
                >
                  {t.price}
                </div>
                <div data-fadeup="">
                  <SoftLink href="/inquire#form" label="Reserve this experience" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ Spacer band — experiences into group sessions ══ */}
      <PhotoBand src={BAND_2} alt={BAND_2_ALT} />

      {/* ══ Group Sessions ══ */}
      <section
        style={{
          position: "relative",
          background: "#0E0D0B",
          color: "#F7F5F2",
          padding: "14vh 6vw",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "8vh" }}>
            <div
              data-fadeup=""
              style={{ ...kicker({}, 10, ".3em"), display: "block", marginBottom: 16 }}
            >
              {GROUPS.kicker}
            </div>
            <h2
              data-fadeup=""
              style={{
                margin: "0 auto 4vh",
                maxWidth: 780,
                fontFamily: SERIF,
                fontWeight: 500,
                fontSize: "clamp(30px,4.4vw,54px)",
                lineHeight: 1.15,
                textWrap: "pretty",
              }}
            >
              {GROUPS.heading}
            </h2>
            <p
              data-fadeup=""
              style={{
                maxWidth: 560,
                margin: "0 auto",
                fontSize: 16,
                lineHeight: 1.8,
                color: cream(0.75),
              }}
            >
              {GROUPS.intro}
            </p>
            <p
              data-fadeup=""
              style={{
                margin: "18px 0 0",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                color: GOLD,
              }}
            >
              ★ {GROUPS.note}
            </p>
            <p
              data-fadeup=""
              style={{
                maxWidth: 560,
                margin: "22px auto 0",
                fontSize: 13.5,
                lineHeight: 1.7,
                color: cream(0.55),
                textDecoration: "underline",
                textDecorationColor: cream(0.25),
                textUnderlineOffset: 4,
              }}
            >
              {GROUPS.shared}
            </p>
            <p
              data-fadeup=""
              style={{
                margin: "10px 0 0",
                fontSize: 13.5,
                fontStyle: "italic",
                lineHeight: 1.7,
                color: cream(0.55),
              }}
            >
              {GROUPS.addon}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10vh",
            }}
          >
            {GROUP_TIERS.map((g, i) => (
              <div
                key={g.name}
                className="lx-grid-2col"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "6vw",
                  alignItems: "center",
                }}
              >
                <div
                  data-reveal=""
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    order: i % 2 === 0 ? 2 : 0,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={g.image}
                    alt={g.alt}
                    loading="lazy"
                    style={{
                      display: "block",
                      width: "100%",
                      aspectRatio: g.aspect ?? "4 / 5",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div>
                  <h3
                    data-fadeup=""
                    style={{
                      margin: "0 0 20px",
                      fontFamily: SERIF,
                      fontWeight: 500,
                      fontSize: "clamp(28px,3vw,42px)",
                      letterSpacing: ".02em",
                    }}
                  >
                    {g.name}
                  </h3>
                  <ul
                    style={{
                      listStyle: "none",
                      margin: "0 0 22px",
                      padding: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: 9,
                    }}
                  >
                    {g.facts.map((f) => (
                      <li
                        key={f}
                        data-fadeup=""
                        style={{ display: "flex", gap: 12, alignItems: "baseline" }}
                      >
                        <span style={{ color: GOLD, fontSize: 10, flexShrink: 0 }}>★</span>
                        <span style={{ fontSize: 14, lineHeight: 1.6, color: cream(0.7) }}>
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div
                    data-fadeup=""
                    style={{
                      fontFamily: SERIF,
                      fontStyle: "italic",
                      fontSize: 20,
                      color: GOLD,
                      marginBottom: g.closing ? 22 : 0,
                    }}
                  >
                    {g.price}
                  </div>
                  {g.closing && (
                    <>
                      <p
                        data-fadeup=""
                        style={{
                          margin: "0 0 22px",
                          fontSize: 14,
                          fontStyle: "italic",
                          lineHeight: 1.7,
                          color: cream(0.6),
                        }}
                      >
                        {GROUP_FOOTNOTE}
                      </p>
                      <div data-fadeup="">
                        <SoftLink href="/inquire#form" label="Reserve this experience" dark />
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Closing CTA band + footer ══ */}
      <section
        style={{
          position: "relative",
          background: "#0E0D0B",
          color: "#F7F5F2",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "relative",
              padding: "20vh 6vw",
              textAlign: "center",
            }}
          >
            <div data-fadeup="" style={kicker({ marginBottom: 22 }, 10, ".3em")}>
              Tailored to you
            </div>
            <h2
              data-fadeup=""
              style={{
                margin: "0 auto",
                fontFamily: SERIF,
                fontWeight: 500,
                fontSize: "clamp(34px,5vw,64px)",
                lineHeight: 1.12,
                maxWidth: 820,
                textWrap: "pretty",
              }}
            >
              {FINAL_CTA.heading}
            </h2>
            <div
              data-fadeup=""
              style={{
                marginTop: 40,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
              }}
            >
              <CtaLink label={FINAL_CTA.ctaLabel} />
            </div>
          </div>
        </div>
        <div style={{ padding: "0 38px" }}>
          <LeiFooter />
        </div>
      </section>
    </LeiPage>
  );
}
