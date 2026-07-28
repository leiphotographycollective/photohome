import type { Metadata } from "next";
import Link from "next/link";
import LeiPage from "@/components/lei/LeiPage";
import Chrome from "@/components/lei/Chrome";
import LeiFooter from "@/components/lei/LeiFooter";
import { Marquee, PhotoBand, ProcessSteps, ScrollHint } from "@/components/lei/blocks";
import { GOLD, MUTED, SERIF, cream, kicker, pill } from "@/components/lei/tokens";
import { aspect, img, type Photo } from "@/content/portfolio";
import { GALLERY, GALLERY_FEATURE, GALLERY_HERO } from "@/content/gallery";
import { HOME_PROCESS } from "@/content/experience";
import { TESTIMONIALS } from "@/content/homepage";
import { SoftLink } from "@/components/lei/Cta";
import { Collage, CollageTile } from "@/components/lei/Collage";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Bay Area wedding photography: full wedding days, couples sessions, and engagements. The whole arc of your day, from getting ready to the last song.",
};

/** The masonry drops columns as a category thins out, so a one-photo section
 *  reads as a single deliberate plate instead of an orphan quarter-column. */
function columnsFor(n: number): 1 | 2 | 3 | 4 {
  if (n >= 7) return 4;
  if (n >= 4) return 3;
  if (n >= 2) return 2;
  return 1;
}

/** Paired with columnsFor: a narrow grid is centred rather than stretched. */
function capFor(n: number): number | undefined {
  if (n >= 7) return undefined;
  if (n >= 2) return 1180;
  return 560;
}

/** One masonry of frames. Shared by a plain category and by each wedding set
 *  inside Weddings, so both render identically. */
function PhotoGrid({ photos }: { photos: Photo[] }) {
  return (
    <Collage columns={columnsFor(photos.length)}>
      {photos.map((p) => (
        <CollageTile key={p.path}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img(p.path, 1200)}
            alt={p.a}
            loading="lazy"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              // `auto` keeps the file's real ratio once it decodes; the value
              // only reserves height before that, so a stale preset can never
              // squash a photo.
              aspectRatio: `auto ${aspect(p)}`,
            }}
          />
        </CollageTile>
      ))}
    </Collage>
  );
}

export default function GalleryPage() {
  return (
    <LeiPage style={{ background: "#0E0D0B", color: "#F7F5F2" }}>
      <Chrome />

      {/* ══ Title ══ */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          overflow: "hidden",
          padding: "0 6vw",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img(GALLERY_HERO.path, 2400)}
          alt={GALLERY_HERO.a}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(14,13,11,.86) 0%, rgba(14,13,11,.58) 55%, rgba(14,13,11,.74) 100%)",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            transform: "translateY(-50%)",
            display: "flex",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <span
            data-ghost="hero"
            style={{
              fontFamily: SERIF,
              fontWeight: 700,
              fontSize: "22vw",
              lineHeight: 1,
              color: cream(0.05),
              letterSpacing: "-.02em",
              whiteSpace: "nowrap",
            }}
          >
            GALLERY
          </span>
        </div>
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div data-fadeup="" style={kicker({ marginBottom: 24 }, 10, ".3em")}>
            The Gallery
          </div>
          <h1
            style={{
              margin: 0,
              fontFamily: SERIF,
              fontWeight: 600,
              lineHeight: 0.92,
              letterSpacing: ".01em",
            }}
          >
            <div data-title-line="" style={{ fontSize: "clamp(40px,9vw,140px)" }}>
              PRESENT FOR
            </div>
            <div data-title-line="" style={{ fontSize: "clamp(40px,9vw,140px)" }}>
              <em style={{ fontWeight: 400 }}>ALL OF IT.</em>
            </div>
          </h1>
          <p
            data-fadeup=""
            style={{
              maxWidth: 620,
              margin: "36px 0 0",
              fontSize: 16,
              lineHeight: 1.75,
              color: cream(0.72),
            }}
          >
            You two stay in the day; I&rsquo;ll make sure you get it back. The
            planning happens before the camera ever comes out.
          </p>
        </div>
        <div
          data-fadeup=""
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 42,
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          <ScrollHint color={cream(0.5)} />
        </div>
      </section>

      {/* ══ The three category grids. Photos come from src/content/gallery.ts;
          swap or add frames there, not here. ══ */}
      <section
        style={{
          position: "relative",
          background: "#F7F5F2",
          color: "#0E0D0B",
          padding: "14vh 4vw 12vh",
        }}
      >
        {GALLERY.map((cat, i) => {
          // A category with sets is as wide as its widest set, not as wide as
          // every frame it holds put together.
          const n = cat.sets
            ? Math.max(...cat.sets.map((s) => s.photos.length))
            : cat.photos.length;
          return (
            <section
              key={cat.id}
              id={cat.id}
              style={{
                scrollMarginTop: "calc(var(--lx-header-h) + 24px)",
                marginTop: i === 0 ? 0 : "12vh",
                // Cap the whole section, not just the grid, so a sparse
                // category's heading stays aligned to its own left edge
                // instead of drifting out to the page margin.
                maxWidth: capFor(n),
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <div
                data-fadeup=""
                style={{ maxWidth: 720, marginBottom: "5vh" }}
              >
                <hr
                  style={{
                    border: 0,
                    borderTop: `1px solid ${GOLD}`,
                    width: 64,
                    margin: "0 0 26px",
                  }}
                />
                <h2
                  style={{
                    margin: 0,
                    fontFamily: SERIF,
                    fontWeight: 600,
                    fontSize: "clamp(30px,4.4vw,64px)",
                    lineHeight: 1.02,
                    letterSpacing: ".01em",
                  }}
                >
                  {cat.label}
                </h2>
                <p
                  style={{
                    margin: "18px 0 0",
                    maxWidth: 560,
                    fontSize: 15,
                    lineHeight: 1.75,
                    color: MUTED,
                  }}
                >
                  {cat.blurb}
                </p>
              </div>
              <div>
                {cat.sets ? (
                  cat.sets.map((set, j) => (
                    <div
                      key={set.id}
                      id={set.id}
                      style={{
                        scrollMarginTop: "calc(var(--lx-header-h) + 24px)",
                        marginTop: j === 0 ? 0 : "9vh",
                      }}
                    >
                      <div
                        data-fadeup=""
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 22,
                          marginBottom: "3.5vh",
                        }}
                      >
                        <h3
                          style={{
                            margin: 0,
                            fontFamily: SERIF,
                            fontStyle: "italic",
                            fontWeight: 400,
                            fontSize: "clamp(21px,2.5vw,32px)",
                            lineHeight: 1.1,
                            letterSpacing: ".01em",
                          }}
                        >
                          {set.name}
                        </h3>
                        <span
                          aria-hidden="true"
                          style={{
                            flex: 1,
                            height: 1,
                            background: "rgba(14,13,11,.15)",
                          }}
                        />
                      </div>
                      <PhotoGrid photos={set.photos} />
                    </div>
                  ))
                ) : (
                  <PhotoGrid photos={cat.photos} />
                )}
              </div>
            </section>
          );
        })}
      </section>

      {/* ══ Full-bleed feature ══ */}
      <section style={{ position: "relative", height: "120vh" }}>
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            data-feature=""
            src={img(GALLERY_FEATURE.photo.path, 2500)}
            alt={GALLERY_FEATURE.photo.a}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: "scale(1.18)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(14,13,11,.55), rgba(14,13,11,0) 45%)",
            }}
          />
          <div style={{ position: "absolute", left: 38, bottom: 38 }}>
            <div style={kicker({ marginBottom: 12 })}>
              {GALLERY_FEATURE.kicker}
            </div>
            <div
              style={{
                fontFamily: SERIF,
                fontStyle: "italic",
                fontSize: "clamp(22px,2.6vw,36px)",
              }}
            >
              {GALLERY_FEATURE.line}
            </div>
          </div>
        </div>
      </section>

      {/* ══ Proof + price anchor ══ */}
      <section
        style={{
          position: "relative",
          background: "#0E0D0B",
          padding: "16vh 6vw",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <blockquote
            data-fadeup=""
            style={{
              margin: 0,
              fontFamily: SERIF,
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(22px,2.6vw,34px)",
              lineHeight: 1.4,
              textWrap: "pretty",
            }}
          >
            &ldquo;{TESTIMONIALS[0].pull}&rdquo;
          </blockquote>
          <div data-fadeup="" style={kicker({ marginTop: 26 }, 10, ".3em")}>
            {TESTIMONIALS[0].names}
          </div>
          <div data-fadeup="" style={{ marginTop: 34 }}>
            <SoftLink dark href="/investment" label="Collections from $2,400" />
          </div>
        </div>
      </section>

      {/* ══ Spacer band — price anchor into the pull quote ══ */}
      <PhotoBand src="/images/placeholders/band.svg" />

      {/* ══ Pull quote ══ */}
      <section
        style={{
          position: "relative",
          background: "#F7F5F2",
          color: "#0E0D0B",
          padding: "22vh 6vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 52,
        }}
      >
        <p
          data-manifesto=""
          style={{
            maxWidth: 1000,
            margin: 0,
            textAlign: "center",
            fontFamily: SERIF,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(28px,4.2vw,58px)",
            lineHeight: 1.3,
            textWrap: "pretty",
          }}
        >
          The moments you&rsquo;ll want back, kept the way they felt.
        </p>
        <Link
          data-fadeup=""
          data-mag=""
          data-hover=""
          href="/experience"
          style={pill("#0E0D0B", "#F7F5F2")}
        >
          See how
        </Link>
      </section>

      {/* ══ Process ══ */}
      <section
        style={{ position: "relative", background: "#0E0D0B", color: "#F7F5F2" }}
      >
        <ProcessSteps steps={HOME_PROCESS} />
      </section>

      {/* ══ CTA + footer ══ */}
      <section
        style={{
          position: "relative",
          background: "#0E0D0B",
          color: "#F7F5F2",
          padding: "0 6vw",
        }}
      >
        <div style={{ margin: "0 -6vw" }}>
          <Marquee phrase="Your day, felt forever" margin="0" />
        </div>
        <div style={{ textAlign: "center", padding: "12vh 0 14vh" }}>
          <h2
            data-fadeup=""
            style={{
              margin: "0 auto",
              fontFamily: SERIF,
              fontWeight: 500,
              fontSize: "clamp(36px,5vw,64px)",
              lineHeight: 1.12,
              maxWidth: 800,
              textWrap: "pretty",
            }}
          >
            Now booking 2026 &amp; 2027 <em>weddings</em>.
          </h2>
          <Link
            data-fadeup=""
            data-mag=""
            data-hover=""
            href="/inquire"
            style={{ ...pill("#F7F5F2", "#0E0D0B"), marginTop: 44 }}
          >
            Inquire
          </Link>
        </div>

        <LeiFooter />
      </section>
    </LeiPage>
  );
}
