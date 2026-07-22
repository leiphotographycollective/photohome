import type { Metadata } from "next";
import Link from "next/link";
import LeiPage from "@/components/lei/LeiPage";
import { GOLD, SERIF, MUTED, DIM, ink, kicker } from "@/components/lei/tokens";
import { img, PHOTOS } from "@/content/portfolio";
import { BUSINESS } from "@/content/site";
import { LINKS } from "@/content/links";

// QR-code landing page for the business card: one column, every link in one
// place. Deliberately chromeless (no header nav, no full footer) so a phone
// scan lands on the links and nothing else. Not in the sitemap; noindex keeps
// this utility page out of search results.
export const metadata: Metadata = {
  title: "Links",
  description:
    "Every Lei Photography Collective link in one place: Instagram, portfolio, the free session giveaway, and how to inquire.",
  robots: { index: false, follow: true },
};

export default function LinksPage() {
  return (
    <LeiPage>
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "10vh 24px 8vh",
        }}
      >
        <div style={{ width: "100%", maxWidth: 430, textAlign: "center" }}>
          {/* ── Identity ── */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            data-fadeup=""
            src={img(PHOTOS.headshot.path, 400)}
            alt={`${BUSINESS.founder}, ${BUSINESS.name}`}
            style={{
              width: 96,
              height: 96,
              borderRadius: "50%",
              objectFit: "cover",
              display: "block",
              margin: "0 auto 26px",
              border: `1px solid ${ink(0.14)}`,
            }}
          />
          <div data-fadeup="" style={kicker({ marginBottom: 16 }, 10, ".3em")}>
            Bay Area Wedding Photography
          </div>
          <h1
            data-fadeup=""
            style={{
              margin: 0,
              fontFamily: SERIF,
              fontWeight: 600,
              fontSize: "clamp(28px,7vw,38px)",
              lineHeight: 1.1,
              letterSpacing: ".01em",
            }}
          >
            Lei Photography{" "}
            <em style={{ fontWeight: 400 }}>Collective</em>
          </h1>
          <p
            data-fadeup=""
            style={{
              margin: "18px 0 0",
              fontSize: 14,
              lineHeight: 1.7,
              color: MUTED,
            }}
          >
            Editorial wedding photography for fun, stylish couples in the San
            Francisco Bay Area &amp; beyond.
          </p>

          {/* ── The links ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              margin: "44px 0 0",
            }}
          >
            {LINKS.map((l) =>
              l.external ? (
                <a
                  key={l.href}
                  className="lx-linkrow"
                  data-fadeup=""
                  data-hover=""
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.href}
                  className="lx-linkrow"
                  data-fadeup=""
                  data-hover=""
                  href={l.href}
                >
                  {l.label}
                </Link>
              )
            )}
          </div>

          {/* ── Footer line ── */}
          <p data-fadeup="" style={{ margin: "40px 0 0", fontSize: 12, color: DIM }}>
            <a
              data-hover=""
              href={`mailto:${BUSINESS.email}`}
              style={{ color: GOLD, textDecoration: "none" }}
            >
              {BUSINESS.email}
            </a>
          </p>
        </div>
      </main>
    </LeiPage>
  );
}
