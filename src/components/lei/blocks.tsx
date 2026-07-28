import type { CSSProperties } from "react";
import { GOLD, SERIF, cream } from "./tokens";

/* Reusable page blocks shared by several Lei pages. */

/** The animated "Scroll" hint line. */
export function ScrollHint({
  color = "#9C9490",
  style,
}: {
  color?: string;
  style?: CSSProperties;
}) {
  return (
    <div style={{ textAlign: "center", ...style }}>
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: ".28em",
          textTransform: "uppercase",
          color,
        }}
      >
        Scroll
      </div>
      <div
        style={{
          margin: "12px auto 0",
          width: 1,
          height: 42,
          background: color,
          animation: "lxScroll 1.9s ease-in-out infinite",
        }}
      />
    </div>
  );
}

/** Bordered marquee band ("You live it. I’ll keep it. · Inquire ·"). */
export function Marquee({
  phrase,
  margin = "0 0 12vh",
}: {
  phrase: string;
  margin?: string;
}) {
  const chunk = (
    <>
      {phrase} <em style={{ color: GOLD }}>·</em> Inquire{" "}
      <em style={{ color: GOLD }}>·</em> {phrase}{" "}
      <em style={{ color: GOLD }}>·</em> Inquire <em style={{ color: GOLD }}>·</em>
      &nbsp;
    </>
  );
  const span: CSSProperties = {
    fontFamily: SERIF,
    fontSize: "clamp(28px,3.6vw,52px)",
    fontWeight: 500,
    paddingRight: "3vw",
  };
  return (
    <div
      aria-hidden="true"
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        borderTop: `1px solid ${cream(0.12)}`,
        borderBottom: `1px solid ${cream(0.12)}`,
        padding: "18px 0",
        margin,
      }}
    >
      <div
        style={{
          display: "inline-flex",
          gap: 0,
          animation: "lxMarquee 26s linear infinite",
          willChange: "transform",
        }}
      >
        <span style={span}>{chunk}</span>
        <span style={span}>{chunk}</span>
      </div>
    </div>
  );
}

/** Full-bleed photo spacer — a short, cropped strip that gives the page a
 *  breath between sections. The img carries `data-band`, so motion.ts gives
 *  it the same slow zoom-out as the taller bands on /experience and /gallery.
 *  Every call site passes `src` as a literal string so the visual editor can
 *  swap each band's photo independently. Each band ships pointing at its own
 *  blank placeholder, /images/placeholders/band-<page>-<n>.svg, numbered in
 *  scroll order down the page. They are deliberately not shared: dropping a
 *  photo onto one file would otherwise change every band at once. When adding
 *  a band, give it a new placeholder rather than reusing an existing one.
 *
 *  Adjusting the crop. The band is far wider than it is tall, so `cover`
 *  fills the width and trims the top and bottom off the photo. Three levers,
 *  in the order you usually want them:
 *
 *  - `objectPosition` — which slice survives the trim. "50% 25%" holds the
 *    upper part of the frame, "50% 75%" the lower. The first number pans
 *    horizontally and only bites on photos taller than the band.
 *  - `height` — a taller band trims less off the photo.
 *  - `zoom` — how far in the shot starts before motion.ts eases it back to
 *    1 on scroll. Lower it toward 1 to see more of the frame.
 *
 *  All three are desktop-only levers. Under 860px the `.lx-band` rules in
 *  globals.css drop the fixed height and show the whole photo uncropped, so
 *  there is no crop left to aim. */
export function PhotoBand({
  src,
  alt = "",
  height = "clamp(240px,40vh,460px)",
  background = "#E8E4DE",
  objectPosition = "50% 50%",
  zoom = 1.16,
}: {
  src: string;
  alt?: string;
  height?: string;
  background?: string;
  /** CSS object-position, e.g. "50% 30%" to favour the top of the photo. */
  objectPosition?: string;
  /** Starting scale; motion.ts eases it to 1 as the band scrolls through. */
  zoom?: number;
}) {
  return (
    <section
      className="lx-band"
      style={{ position: "relative", height, overflow: "hidden", background }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        data-band=""
        src={src}
        alt={alt}
        aria-hidden={alt ? undefined : "true"}
        loading="lazy"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition,
          transform: `scale(${zoom})`,
        }}
      />
    </section>
  );
}

/** Numbered process rows (Inquire / Connect / Customize / Reserve). */
export function ProcessSteps({
  steps,
}: {
  steps: Array<{ n: string; title: string; body: string }>;
}) {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "16vh 6vw 14vh" }}>
      <div
        data-fadeup=""
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: ".3em",
          textTransform: "uppercase",
          color: GOLD,
          marginBottom: 10,
        }}
      >
        The Process
      </div>
      {steps.map((s, i) => (
        <div
          key={s.n}
          data-step=""
          className="lx-grid-2col"
          style={{
            display: "grid",
            gridTemplateColumns: "90px 1fr 1.4fr",
            gap: 24,
            alignItems: "baseline",
            padding: "34px 0",
            borderTop: `1px solid ${cream(0.14)}`,
            borderBottom:
              i === steps.length - 1 ? `1px solid ${cream(0.14)}` : undefined,
          }}
        >
          <span
            style={{
              fontFamily: SERIF,
              fontStyle: "italic",
              fontSize: 22,
              color: GOLD,
            }}
          >
            {s.n}
          </span>
          <span
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(22px,2.4vw,34px)",
              fontWeight: 500,
            }}
          >
            {s.title}
          </span>
          <p
            style={{
              margin: 0,
              fontSize: 15,
              lineHeight: 1.7,
              color: cream(0.65),
            }}
          >
            {s.body}
          </p>
        </div>
      ))}
    </div>
  );
}

export interface GalleryImage {
  src: string;
  alt: string;
  /** CSS aspect-ratio, e.g. "4 / 5" */
  ratio: string;
  /** Cursor ring label on hover */
  cursor: string;
}

export interface GalleryColumn {
  speed: number;
  marginTop?: string;
  images: GalleryImage[];
}

/** Three parallax columns of clip-revealed gallery images. */
export function ParallaxGallery({ columns }: { columns: GalleryColumn[] }) {
  return (
    <div
      className="lx-cols-3"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1.3fr 1fr",
        gap: "2.4vw",
        alignItems: "start",
      }}
    >
      {columns.map((col, i) => (
        <div
          key={i}
          data-col=""
          data-colspeed={col.speed}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2.4vw",
            marginTop: col.marginTop,
          }}
        >
          {col.images.map((im) => (
            <div key={im.src} style={{ background: "#EDE9E3", aspectRatio: im.ratio }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                data-gimg=""
                data-cursor={im.cursor}
                src={im.src}
                alt={im.alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
