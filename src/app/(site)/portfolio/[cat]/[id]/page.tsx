import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import LeiPage from "@/components/lei/LeiPage";
import Chrome from "@/components/lei/Chrome";
import LeiFooter from "@/components/lei/LeiFooter";
import { DIM, GOLD, SERIF, cream, kicker, pill } from "@/components/lei/tokens";
import { CATEGORIES, CAT_ORDER, aspect, img } from "@/content/portfolio";

export function generateStaticParams() {
  return CAT_ORDER.flatMap((cat) =>
    CATEGORIES[cat].projects.map((p) => ({ cat, id: p.id }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cat: string; id: string }>;
}): Promise<Metadata> {
  const { cat, id } = await params;
  const c = CATEGORIES[cat];
  const proj = c?.projects.find((p) => p.id === id);
  if (!c || !proj) return {};
  return {
    title: `${proj.title} — ${c.label}`,
    description: `${proj.title} · ${proj.place} · ${proj.year}, from the ${c.label} collection by Lei Photography Collective.`,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ cat: string; id: string }>;
}) {
  const { cat, id } = await params;
  const c = CATEGORIES[cat];
  const proj = c?.projects.find((p) => p.id === id);
  if (!c || !proj) notFound();

  // Related: other projects in this category, then fall back to other
  // categories' first project (max 3) — as in the prototype.
  const related: Array<{
    href: string;
    cover: string;
    alt: string;
    kicker: string;
    title: string;
  }> = [];
  c.projects
    .filter((p) => p.id !== proj.id)
    .forEach((p) => {
      related.push({
        href: `/portfolio/${cat}/${p.id}`,
        cover: img(p.cover.path, 900),
        alt: p.cover.a,
        kicker: c.label,
        title: p.title,
      });
    });
  CAT_ORDER.filter((k) => k !== cat).forEach((k) => {
    if (related.length >= 3) return;
    const oc = CATEGORIES[k];
    const op = oc.projects[0];
    related.push({
      href: `/portfolio/${k}/${op.id}`,
      cover: img(op.cover.path, 900),
      alt: op.cover.a,
      kicker: oc.label,
      title: op.title,
    });
  });

  return (
    <LeiPage>
      <Chrome />

      {/* ══ Project title ══ */}
      <section style={{ position: "relative", padding: "22vh 38px 6vh" }}>
        <Link
          href={`/portfolio/${cat}`}
          data-hover=""
          data-fadeup=""
          style={{
            display: "inline-block",
            ...kicker({ textDecoration: "none", marginBottom: "3vh" }, 11),
          }}
        >
          ← {c.label}
        </Link>
        <h1
          data-fadeup=""
          style={{
            margin: 0,
            fontFamily: SERIF,
            fontWeight: 600,
            fontSize: "clamp(44px,8vw,130px)",
            lineHeight: 0.92,
            letterSpacing: ".01em",
            textWrap: "pretty",
          }}
        >
          {proj.title}
        </h1>
        <div
          data-fadeup=""
          style={{
            display: "flex",
            gap: 40,
            flexWrap: "wrap",
            marginTop: "5vh",
            borderTop: "1px solid #E3DED8",
            paddingTop: 26,
            maxWidth: 720,
          }}
        >
          {(
            [
              ["Location", proj.place],
              ["Year", proj.year],
              ["Collection", c.label],
            ] as const
          ).map(([label, value]) => (
            <div key={label}>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  color: DIM,
                  marginBottom: 8,
                }}
              >
                {label}
              </div>
              <div style={{ fontFamily: SERIF, fontSize: 20 }}>{value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ Gallery ══ */}
      <section style={{ position: "relative", padding: "2vh 38px 14vh" }}>
        <div className="lx-gallery">
          {proj.photos.map((ph, i) => (
            <div
              key={`${ph.path}-${i}`}
              className={ph.r === "l" ? "lx-gitem wide" : "lx-gitem"}
              data-gitem=""
              style={{ aspectRatio: aspect(ph) }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img(ph.path, ph.r === "l" ? 2000 : 1400)} alt={ph.a} />
            </div>
          ))}
        </div>
      </section>

      {/* ══ Keep exploring ══ */}
      <section
        style={{
          position: "relative",
          background: "#0E0D0B",
          color: "#F7F5F2",
          padding: "16vh 38px 0",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "10vh" }}>
          <div data-fadeup="" style={kicker({ marginBottom: 20 }, 10, ".3em")}>
            Keep exploring
          </div>
          <h2
            data-fadeup=""
            style={{
              margin: 0,
              fontFamily: SERIF,
              fontWeight: 500,
              fontSize: "clamp(30px,4vw,56px)",
              lineHeight: 1.1,
            }}
          >
            More from the {c.label} collection
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: "2.4vw",
            marginBottom: "14vh",
          }}
        >
          {related.slice(0, 3).map((r) => (
            <Link
              key={r.href}
              className="lx-rel"
              href={r.href}
              data-cursor="Open"
              data-rel=""
              style={{ textDecoration: "none", color: "#F7F5F2", display: "block" }}
            >
              <div
                style={{
                  overflow: "hidden",
                  background: "#171411",
                  aspectRatio: "4 / 5",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={r.cover}
                  alt={r.alt}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
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
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: ".24em",
                      textTransform: "uppercase",
                      color: GOLD,
                      marginBottom: 8,
                    }}
                  >
                    {r.kicker}
                  </div>
                  <div
                    style={{
                      fontFamily: SERIF,
                      fontSize: "clamp(22px,2vw,30px)",
                      fontWeight: 600,
                    }}
                  >
                    {r.title}
                  </div>
                </div>
                <span style={{ fontFamily: SERIF, fontSize: 20, color: GOLD }}>
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 20,
            borderTop: `1px solid ${cream(0.14)}`,
            borderBottom: `1px solid ${cream(0.14)}`,
            padding: "36px 0",
            marginBottom: "12vh",
          }}
        >
          <span
            style={{
              fontFamily: SERIF,
              fontStyle: "italic",
              fontSize: "clamp(22px,2.6vw,36px)",
            }}
          >
            Have a day worth documenting?
          </span>
          <Link
            data-mag=""
            data-hover=""
            href="/inquire"
            style={pill("#F7F5F2", "#0E0D0B")}
          >
            Inquire
          </Link>
        </div>

        <LeiFooter border={false} padding="0 0 40px" />
      </section>
    </LeiPage>
  );
}
