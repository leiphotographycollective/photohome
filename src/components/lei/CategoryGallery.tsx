import type { ReactNode } from "react";
import { Collage } from "@/components/lei/Collage";
import { GOLD, MUTED, SERIF } from "@/components/lei/tokens";

/**
 * Layout shell for a category page's photos.
 *
 * This component deliberately does NOT render the <img> tags. The Ship Studio
 * visual editor can only swap an image whose src is a literal string it can
 * find in the page source, so every gallery photo is written out by hand in
 * the page file. What lives here is only the chrome around them, so the four
 * pages cannot drift apart visually.
 *
 * `cap` is the max width of the whole section, passed in because the component
 * can no longer count the frames: undefined for a dense grid (7+ frames in the
 * widest set), 1180 for 2 to 6, 560 for a single plate.
 */
export default function CategoryGallery({
  blurb,
  cap,
  children,
}: {
  blurb: string;
  cap?: number;
  children: ReactNode;
}) {
  return (
    <section
      style={{
        position: "relative",
        background: "#F7F5F2",
        color: "#0E0D0B",
        padding: "12vh 4vw",
      }}
    >
      <div
        style={{
          // Cap the whole section, not just the grid, so a sparse category's
          // blurb stays aligned to its own left edge instead of drifting out
          // to the page margin.
          maxWidth: cap,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div data-fadeup="" style={{ maxWidth: 720, marginBottom: "5vh" }}>
          <hr
            style={{
              border: 0,
              borderTop: `1px solid ${GOLD}`,
              width: 64,
              margin: "0 0 26px",
            }}
          />
          <p
            style={{
              margin: 0,
              maxWidth: 560,
              fontSize: 15,
              lineHeight: 1.75,
              color: MUTED,
            }}
          >
            {blurb}
          </p>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

/** One labelled set inside a category: its heading, then its masonry.
 *  `first` drops the top margin on the opening set. */
export function GallerySet({
  id,
  name,
  first,
  columns,
  children,
}: {
  id: string;
  name: string;
  first?: boolean;
  columns?: 1 | 2 | 3 | 4;
  children: ReactNode;
}) {
  return (
    <div
      id={id}
      style={{
        scrollMarginTop: "calc(var(--lx-header-h) + 24px)",
        marginTop: first ? 0 : "9vh",
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
        <h2
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
          {name}
        </h2>
        <span
          aria-hidden="true"
          style={{ flex: 1, height: 1, background: "rgba(14,13,11,.15)" }}
        />
      </div>
      <GalleryGrid columns={columns}>{children}</GalleryGrid>
    </div>
  );
}

/** A masonry with no set heading, for a category that has only one grid. */
export function GalleryGrid({
  columns,
  children,
}: {
  columns?: 1 | 2 | 3 | 4;
  children: ReactNode;
}) {
  return <Collage columns={columns}>{children}</Collage>;
}
