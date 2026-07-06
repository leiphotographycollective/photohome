import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import LeiPage from "@/components/lei/LeiPage";
import Chrome from "@/components/lei/Chrome";
import LeiFooter from "@/components/lei/LeiFooter";
import { DIM, GOLD, MUTED, SERIF, cream, kicker, ink } from "@/components/lei/tokens";
import { CATEGORIES, CAT_ORDER, aspect, img } from "@/content/portfolio";

export function generateStaticParams() {
  return CAT_ORDER.map((cat) => ({ cat }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cat: string }>;
}): Promise<Metadata> {
  const { cat } = await params;
  const c = CATEGORIES[cat];
  if (!c) return {};
  return { title: c.label, description: c.intro };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ cat: string }>;
}) {
  const { cat } = await params;
  const c = CATEGORIES[cat];
  if (!c) notFound();

  const n = c.projects.length;
  const countLabel =
    String(n).padStart(2, "0") + (n === 1 ? " Project" : " Projects");
  const others = CAT_ORDER.filter((k) => k !== cat);

  return (
    <LeiPage>
      <Chrome />

      {/* ══ Category hero ══ */}
      <section
        style={{
          position: "relative",
          minHeight: "78vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 38px 7vh",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "44%",
            left: 0,
            right: 0,
            transform: "translateY(-50%)",
            display: "flex",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <span
            data-ghost="cat"
            style={{
              fontFamily: SERIF,
              fontWeight: 700,
              fontSize: "20vw",
              lineHeight: 1,
              color: ink(0.05),
              letterSpacing: "-.02em",
              whiteSpace: "nowrap",
            }}
          >
            {c.label}
          </span>
        </div>
        <div style={{ position: "relative", zIndex: 2 }}>
          <Link
            href="/work"
            data-hover=""
            data-fadeup=""
            style={{
              display: "inline-block",
              ...kicker({ textDecoration: "none", marginBottom: "3vh" }, 11),
            }}
          >
            ← The Work
          </Link>
          <h1
            data-fadeup=""
            style={{
              margin: 0,
              fontFamily: SERIF,
              fontWeight: 600,
              fontSize: "clamp(48px,9vw,150px)",
              lineHeight: 0.9,
              letterSpacing: ".01em",
            }}
          >
            {c.label}
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: 32,
              flexWrap: "wrap",
              marginTop: "4vh",
            }}
          >
            <p
              data-fadeup=""
              style={{
                maxWidth: 520,
                margin: 0,
                fontFamily: SERIF,
                fontStyle: "italic",
                fontSize: "clamp(20px,2.4vw,32px)",
                lineHeight: 1.3,
                color: "#0E0D0B",
              }}
            >
              {c.tagline}.
            </p>
            <span
              data-fadeup=""
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: ".2em",
                textTransform: "uppercase",
                color: DIM,
              }}
            >
              {countLabel}
            </span>
          </div>
          <p
            data-fadeup=""
            style={{
              maxWidth: 560,
              margin: "26px 0 0",
              fontSize: 15,
              lineHeight: 1.75,
              color: MUTED,
            }}
          >
            {c.intro}
          </p>
        </div>
      </section>

      {/* ══ Project grid ══ */}
      <section style={{ position: "relative", padding: "6vh 38px 16vh" }}>
        <div
          className="lx-masonry"
          style={{ columnCount: 2, columnGap: "2.4vw" }}
        >
          {c.projects.map((p) => (
            <Link
              key={p.id}
              className="lx-proj"
              href={`/portfolio/${cat}/${p.id}`}
              data-cursor="Open"
              data-proj=""
            >
              <div
                className="lx-imgwrap"
                style={{ aspectRatio: aspect(p.cover) }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img(p.cover.path, 1200)} alt={p.cover.a} />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginTop: 16,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: SERIF,
                      fontSize: "clamp(24px,2.4vw,36px)",
                      fontWeight: 600,
                    }}
                  >
                    {p.title}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: ".18em",
                      textTransform: "uppercase",
                      color: DIM,
                      marginTop: 8,
                    }}
                  >
                    {p.place} — {p.year}
                  </div>
                </div>
                <span
                  className="lx-arrow"
                  style={{ fontFamily: SERIF, fontSize: 22, color: GOLD }}
                >
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══ Explore other collections + footer ══ */}
      <section
        style={{
          position: "relative",
          background: "#0E0D0B",
          color: "#F7F5F2",
          padding: "14vh 38px 0",
        }}
      >
        <div style={kicker({ marginBottom: 34 }, 10, ".3em")}>
          Explore other collections
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            borderTop: `1px solid ${cream(0.14)}`,
          }}
        >
          {others.map((k) => (
            <Link
              key={k}
              href={`/portfolio/${k}`}
              data-cursor="View"
              className="lx-explore"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 24,
                padding: "30px 0",
                borderBottom: `1px solid ${cream(0.14)}`,
                textDecoration: "none",
                color: "#F7F5F2",
              }}
            >
              <span
                style={{
                  fontFamily: SERIF,
                  fontSize: "clamp(26px,3.4vw,52px)",
                  fontWeight: 500,
                }}
              >
                {CATEGORIES[k].label}
              </span>
              <span style={{ fontFamily: SERIF, fontSize: 22, color: GOLD }}>→</span>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: "8vh" }}>
          <LeiFooter border={false} />
        </div>
      </section>
    </LeiPage>
  );
}
