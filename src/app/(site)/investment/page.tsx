import type { Metadata } from "next";
import LeiPage from "@/components/lei/LeiPage";
import Chrome from "@/components/lei/Chrome";
import LeiFooter from "@/components/lei/LeiFooter";
import { ProcessSteps } from "@/components/lei/blocks";
import { GOLD, MUTED, SERIF, cream, ink, kicker } from "@/components/lei/tokens";
import { CtaLink, SoftLink } from "@/components/lei/Cta";
import { CITY, POSITIONING, TESTIMONIALS } from "@/content/homepage";
import { PROCESS } from "@/content/experience";
import { ADD_ONS, INCLUDED_EVERYWHERE, TIERS } from "@/content/pricing";
import { img, PHOTOS, type Photo } from "@/content/portfolio";

export const metadata: Metadata = {
  title: "Wedding Photography Investment: Collections from $2,400",
  description: `${POSITIONING} Three wedding collections from $2,400 (The Full Story, The Signature and The Intimate) for couples in the ${CITY} & beyond.`,
};

/* One photo per collection, rendered beside its block (sides alternate). */
const TIER_PHOTOS: Photo[] = [
  PHOTOS.shoulderDance, // The Full Story: the full party
  PHOTOS.marinaKiss, // The Signature: golden hour couple
  PHOTOS.ringsEmbrace, // The Intimate: quiet and close
];

/* Hour/photographer summary pulled from each tier's first facts. */
const TIER_KICKERS = [
  "10 hours · 2 photographers",
  "8 hours · 1 photographer",
  "6 hours · 1 photographer",
];

const FAQS = [
  {
    q: "Can we split the cost into payments?",
    a: "Yes. Every collection can be split into monthly payments, so you can lock your date without paying everything up front.",
  },
  {
    q: "How many photos do we get, and how fast?",
    a: "Every image you receive is fully edited: 700+ with The Full Story, 500+ with The Signature and 350+ with The Intimate. The Full Story and The Signature include a sneak peek gallery within 48 hours, and your full gallery arrives in a designed online gallery with printing rights.",
  },
  {
    q: "What if none of these fits our day exactly?",
    a: "No two weddings are alike. Tell me about your day and I'll design a proposal around your priorities, whether that means more hours, a second photographer or an engagement session.",
  },
];

export default function InvestmentPage() {
  return (
    <LeiPage>
      <Chrome />

      {/* ══ Hero — full-bleed photo with an overlapping panel ══ */}
      <section
        style={{
          position: "relative",
          background: "#F7F5F2",
          color: "#0E0D0B",
          marginTop: "var(--lx-header-h)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img(PHOTOS.receptionEntrance.path, 1800)}
          alt={PHOTOS.receptionEntrance.a}
          fetchPriority="high"
          style={{
            display: "block",
            width: "100%",
            maxHeight: "68vh",
            objectFit: "cover",
          }}
        />
        <div
          data-fadeup=""
          style={{
            position: "relative",
            maxWidth: 620,
            margin: "-90px auto 0",
            padding: "56px 40px 60px",
            background: "#0E0D0B",
            color: "#F7F5F2",
            textAlign: "center",
          }}
        >
          <div style={kicker({ marginBottom: 22 }, 10, ".34em")}>
            Investment · {CITY}
          </div>
          <h1
            style={{
              margin: 0,
              fontFamily: SERIF,
              fontWeight: 500,
              fontSize: "clamp(40px,6vw,76px)",
              lineHeight: 1.02,
              letterSpacing: ".02em",
            }}
          >
            THE <em style={{ fontWeight: 400 }}>INVESTMENT</em>
          </h1>
          <p
            style={{
              margin: "24px auto 0",
              maxWidth: 400,
              fontFamily: SERIF,
              fontStyle: "italic",
              fontSize: 19,
              lineHeight: 1.55,
              color: cream(0.85),
            }}
          >
            Collections from $2,400, each one built around how you two
            actually want the day to go.
          </p>
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
          Every collection below can be tailored, and every one can be
          split into monthly payments. Tell me about your day and I&rsquo;ll
          send the full breakdown.
        </p>
      </section>

      {/* ══ The collections — alternating photo/text blocks ══ */}
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
            color: ink(0.16),
          }}
        >
          WEDDING COLLECTIONS
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
                style={{
                  position: "relative",
                  overflow: "hidden",
                  order: i % 2 === 0 ? 2 : 0,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img(TIER_PHOTOS[i].path, 1100)}
                  alt={TIER_PHOTOS[i].a}
                  loading="lazy"
                  style={{
                    display: "block",
                    width: "100%",
                    aspectRatio: "4 / 5",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div>
                <div data-fadeup="" style={kicker({ marginBottom: 16 }, 10, ".3em")}>
                  {TIER_KICKERS[i]}
                </div>
                <h3
                  data-fadeup=""
                  style={{
                    margin: "0 0 22px",
                    fontFamily: SERIF,
                    fontWeight: 500,
                    fontSize: "clamp(30px,3.4vw,50px)",
                    lineHeight: 1.05,
                    letterSpacing: ".02em",
                    textTransform: "uppercase",
                  }}
                >
                  {t.name}
                </h3>
                <p
                  data-fadeup=""
                  style={{
                    margin: "0 0 22px",
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
                      <span style={{ fontSize: 14, lineHeight: 1.6, color: MUTED }}>
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
                    fontSize: 24,
                    color: "#0E0D0B",
                    marginBottom: 22,
                  }}
                >
                  {t.price}
                </div>
                <div data-fadeup="">
                  <SoftLink href="/inquire#form" label="Check my date" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Proof, right after the prices: send the price-curious to a real day. */}
        <div data-fadeup="" style={{ marginTop: "8vh", textAlign: "center" }}>
          <SoftLink href="/weddings" label="See what a full day looks like" />
        </div>
      </section>

      {/* ══ Every collection includes + Add-ons ══ */}
      <section
        style={{
          position: "relative",
          background: "#0E0D0B",
          color: "#F7F5F2",
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
                    borderTop: `1px solid ${cream(0.16)}`,
                    paddingTop: 18,
                  }}
                >
                  <span style={{ color: GOLD, fontSize: 11, flexShrink: 0 }}>★</span>
                  <span style={{ fontSize: 15, lineHeight: 1.7, color: cream(0.75) }}>
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
                  style={{ borderTop: `1px solid ${cream(0.16)}`, paddingTop: 18 }}
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
                      color: cream(0.6),
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

      {/* ══ What my couples are saying ══ */}
      <section
        style={{
          position: "relative",
          background: "#F7F5F2",
          color: "#0E0D0B",
          padding: "16vh 6vw",
          textAlign: "center",
        }}
      >
        <div data-fadeup="" style={kicker({ marginBottom: 26 }, 10, ".3em")}>
          What my couples are saying
        </div>
        <blockquote
          data-fadeup=""
          style={{
            maxWidth: 860,
            margin: "0 auto",
            fontFamily: SERIF,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(26px,3.6vw,46px)",
            lineHeight: 1.3,
            textWrap: "pretty",
          }}
        >
          &ldquo;{TESTIMONIALS[0].pull}&rdquo;
        </blockquote>
        <div
          data-fadeup=""
          style={{
            marginTop: 28,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: ".18em",
            textTransform: "uppercase",
            color: MUTED,
          }}
        >
          {TESTIMONIALS[0].names}
          {TESTIMONIALS[0].context ? ` · ${TESTIMONIALS[0].context}` : ""}
        </div>
      </section>

      {/* ══ The process ══ */}
      <section
        style={{ position: "relative", background: "#0E0D0B", color: "#F7F5F2" }}
      >
        <ProcessSteps steps={PROCESS} />
      </section>

      {/* ══ FAQ ══ */}
      <section
        style={{
          position: "relative",
          background: "#F7F5F2",
          color: "#0E0D0B",
          padding: "14vh 6vw",
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div
            data-fadeup=""
            style={{ ...kicker({ marginBottom: 18 }, 10, ".3em"), textAlign: "center" }}
          >
            Frequently asked questions
          </div>
          <h2
            data-fadeup=""
            style={{
              margin: "0 0 6vh",
              textAlign: "center",
              fontFamily: SERIF,
              fontWeight: 500,
              fontSize: "clamp(30px,4vw,54px)",
              lineHeight: 1.1,
            }}
          >
            Wondering how it all works?
          </h2>
          {FAQS.map((f, i) => (
            <details
              key={f.q}
              data-fadeup=""
              style={{ borderTop: `1px solid ${ink(0.14)}` }}
            >
              <summary
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 18,
                  padding: "22px 0",
                  cursor: "pointer",
                  listStyle: "none",
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: ".18em",
                    color: GOLD,
                  }}
                >
                  0{i + 1}
                </span>
                <span
                  style={{
                    fontFamily: SERIF,
                    fontWeight: 500,
                    fontSize: "clamp(18px,1.8vw,24px)",
                  }}
                >
                  {f.q}
                </span>
              </summary>
              <p
                style={{
                  margin: "0 0 26px",
                  paddingLeft: 40,
                  fontSize: 15,
                  lineHeight: 1.8,
                  color: MUTED,
                }}
              >
                {f.a}
              </p>
            </details>
          ))}
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img(PHOTOS.marinaBoardwalk.path, 1800)}
            alt={PHOTOS.marinaBoardwalk.a}
            loading="lazy"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.45,
            }}
          />
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
              Every collection can be tailored: <em>tell me about your day.</em>
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
