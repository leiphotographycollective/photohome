import type { Metadata } from "next";
import LeiPage from "@/components/lei/LeiPage";
import Chrome from "@/components/lei/Chrome";
import LeiFooter from "@/components/lei/LeiFooter";
import { GOLD, MUTED, SERIF, cream, ink, kicker } from "@/components/lei/tokens";
import { CtaLink, SecondaryCta } from "@/components/lei/Cta";
import { CITY, POSITIONING } from "@/content/homepage";
import { ADD_ONS, INCLUDED_EVERYWHERE, TIERS } from "@/content/pricing";

export const metadata: Metadata = {
  title: "Wedding Photography Investment — Collections from $2,400",
  description: `${POSITIONING} Three wedding collections from $2,400 — The Collection, The Signature and The Intimate — for couples in the ${CITY} & beyond.`,
};

export default function InvestmentPage() {
  return (
    <LeiPage>
      <Chrome />

      {/* ══ Compact hero ══ */}
      <section
        style={{
          position: "relative",
          background: "#F7F5F2",
          color: "#0E0D0B",
          padding: "26vh 6vw 12vh",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div data-fadeup="" style={kicker({ marginBottom: "3vh" }, 11, ".34em")}>
            Investment · {CITY}
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
            <div data-fadeup="" style={{ fontSize: "clamp(40px,8vw,120px)" }}>
              THE
            </div>
            <div data-fadeup="" style={{ fontSize: "clamp(40px,8vw,120px)" }}>
              <em style={{ fontWeight: 400 }}>INVESTMENT</em>
            </div>
          </h1>
          <p
            data-fadeup=""
            style={{
              maxWidth: 560,
              margin: "5vh 0 0",
              fontSize: 16,
              lineHeight: 1.8,
              color: MUTED,
            }}
          >
            Collections from $2,400 — each one built around how you two
            actually want the day to go.
          </p>
        </div>
      </section>

      {/* ══ The three collections ══ */}
      <section
        style={{
          position: "relative",
          background: "#0E0D0B",
          color: "#F7F5F2",
          padding: "14vh 6vw",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div data-fadeup="" style={kicker({ marginBottom: 10 }, 10, ".3em")}>
            The Collections
          </div>
          {TIERS.map((t) => (
            <div
              key={t.name}
              data-step=""
              className="lx-grid-2col"
              style={{
                display: "grid",
                gridTemplateColumns: "90px 1fr 1.4fr",
                gap: 24,
                alignItems: "baseline",
                padding: "44px 0",
                borderTop: `1px solid ${cream(0.14)}`,
              }}
            >
              <div
                style={{
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontSize: 22,
                  color: GOLD,
                }}
              >
                {t.price}
              </div>
              <div
                style={{
                  fontFamily: SERIF,
                  fontWeight: 500,
                  fontSize: "clamp(26px,2.6vw,38px)",
                  lineHeight: 1.1,
                }}
              >
                {t.name}
              </div>
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 16,
                    lineHeight: 1.85,
                    color: cream(0.72),
                  }}
                >
                  {t.blurb}
                </p>
                <ul
                  style={{
                    listStyle: "none",
                    margin: "22px 0 0",
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  {t.facts.map((f) => (
                    <li
                      key={f}
                      style={{ display: "flex", gap: 12, alignItems: "baseline" }}
                    >
                      <span style={{ color: GOLD, fontSize: 10, flexShrink: 0 }}>
                        ★
                      </span>
                      <span
                        style={{ fontSize: 14, lineHeight: 1.65, color: cream(0.6) }}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ Every collection includes + Add-ons ══ */}
      <section
        style={{
          position: "relative",
          background: "#F7F5F2",
          color: "#0E0D0B",
          padding: "14vh 6vw",
        }}
      >
        <div
          className="lx-grid-2col"
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "6vw",
            alignItems: "start",
          }}
        >
          <div>
            <div data-fadeup="" style={kicker({ marginBottom: 24 }, 10, ".3em")}>
              Every collection includes
            </div>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: 18,
              }}
            >
              {INCLUDED_EVERYWHERE.map((line) => (
                <li
                  key={line}
                  data-fadeup=""
                  style={{
                    display: "flex",
                    gap: 14,
                    alignItems: "baseline",
                    borderTop: `1px solid ${ink(0.12)}`,
                    paddingTop: 18,
                  }}
                >
                  <span style={{ color: GOLD, fontSize: 11, flexShrink: 0 }}>★</span>
                  <span style={{ fontSize: 15, lineHeight: 1.7, color: MUTED }}>
                    {line}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div data-fadeup="" style={kicker({ marginBottom: 24 }, 10, ".3em")}>
              Add-ons
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {ADD_ONS.map((a) => (
                <div
                  key={a.name}
                  data-fadeup=""
                  style={{ borderTop: `1px solid ${ink(0.12)}`, paddingTop: 18 }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      gap: 16,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: SERIF,
                        fontWeight: 500,
                        fontSize: "clamp(20px,1.8vw,26px)",
                      }}
                    >
                      {a.name}
                    </span>
                    <span
                      style={{
                        fontFamily: SERIF,
                        fontStyle: "italic",
                        fontSize: 20,
                        color: GOLD,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {a.price}
                    </span>
                  </div>
                  <div
                    style={{
                      marginTop: 8,
                      fontSize: 13,
                      lineHeight: 1.6,
                      color: MUTED,
                    }}
                  >
                    {a.note}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ Closing CTA + footer ══ */}
      <section
        style={{
          position: "relative",
          background: "#0E0D0B",
          color: "#F7F5F2",
          padding: "18vh 6vw 0",
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
          Every collection can be tailored — <em>tell me about your day.</em>
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
          <CtaLink />
          <SecondaryCta dark />
        </div>
        <div style={{ padding: "14vh 38px 0", textAlign: "left" }}>
          <LeiFooter links={["home", "work", "about", "inquire"]} />
        </div>
      </section>
    </LeiPage>
  );
}
