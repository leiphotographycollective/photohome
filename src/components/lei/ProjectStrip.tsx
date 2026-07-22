import Link from "next/link";
import { CATEGORIES, img } from "@/content/portfolio";
import { GOLD, SERIF, cream, kicker } from "./tokens";

/* "A closer look": native horizontally scrollable, snap-scrolling strip of
   wedding project cards linking to /portfolio/weddings/<id>. Placeholder
   projects (cover: null) render a "Coming soon" tone block; when a project
   gains a real cover Photo the same card shows it, no code change. */

export default function ProjectStrip({ dark = true }: { dark?: boolean }) {
  const projects = CATEGORIES.weddings.projects;
  const text = dark ? "#F7F5F2" : "#0E0D0B";
  const dim = dark ? cream(0.45) : "#8A837B";
  const block = dark ? "#171411" : "#ECE7E1";
  return (
    <div>
      <div data-fadeup="" style={kicker({ marginBottom: 26 }, 10, ".3em")}>
        A closer look
      </div>
      <div className="lx-strip">
        {projects.map((p) => (
          <Link
            key={p.id}
            href={`/portfolio/weddings/${p.id}`}
            data-hover=""
            style={{
              flex: "0 0 auto",
              width: "min(70vw,320px)",
              scrollSnapAlign: "start",
              color: text,
              textDecoration: "none",
            }}
          >
            <div
              style={{
                overflow: "hidden",
                background: block,
                aspectRatio: "4 / 5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {p.cover ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={img(p.cover.path, 900)}
                  alt={p.cover.a}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              ) : (
                <span
                  style={{
                    fontFamily: SERIF,
                    fontStyle: "italic",
                    fontSize: 20,
                    color: dim,
                  }}
                >
                  Coming soon
                </span>
              )}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginTop: 16,
              }}
            >
              <span
                style={{
                  fontFamily: SERIF,
                  fontSize: "clamp(20px,2vw,26px)",
                  fontWeight: 600,
                }}
              >
                {p.title}
              </span>
              <span style={{ fontFamily: SERIF, fontSize: 18, color: GOLD }}>→</span>
            </div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: ".2em",
                textTransform: "uppercase",
                color: dim,
                marginTop: 6,
              }}
            >
              {p.place} · {p.year}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
