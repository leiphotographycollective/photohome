import { Collage, CollageTile } from "@/components/lei/Collage";
import { GOLD, MUTED, SERIF } from "@/components/lei/tokens";
import { aspect, img, type Photo } from "@/content/portfolio";
import type { GalleryCategory } from "@/content/gallery";

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

/** One masonry of frames. Shared by a plain category and by each set inside a
 *  category that has them, so both render identically. */
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

/**
 * One category's photos: a single masonry, or one labelled masonry per set
 * when the category has them (Weddings, Events). Owns the heading, the blurb,
 * and the width the whole section is capped to.
 */
export default function CategoryGallery({
  category,
}: {
  category: GalleryCategory;
}) {
  // A category with sets is as wide as its widest set, not as wide as every
  // frame it holds put together.
  const n = category.sets
    ? Math.max(...category.sets.map((s) => s.photos.length))
    : category.photos.length;

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
          maxWidth: capFor(n),
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
            {category.blurb}
          </p>
        </div>
        <div>
          {category.sets ? (
            category.sets.map((set, j) => (
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
                    {set.name}
                  </h2>
                  <span
                    aria-hidden="true"
                    style={{ flex: 1, height: 1, background: "rgba(14,13,11,.15)" }}
                  />
                </div>
                <PhotoGrid photos={set.photos} />
              </div>
            ))
          ) : (
            <PhotoGrid photos={category.photos} />
          )}
        </div>
      </div>
    </section>
  );
}
