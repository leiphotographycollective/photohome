"use client";

import { useState } from "react";
import { GOLD, MUTED, SERIF, ink, kicker } from "./tokens";
import { img } from "@/content/portfolio";
import { TESTIMONIALS } from "@/content/homepage";

/** Featured client testimonial — portrait beside an italic pull-quote with
 *  the full quote as body text (reference layout). Renders nothing while
 *  TESTIMONIALS is empty; prev/next arrows appear only once a second
 *  testimonial exists (no-placeholder rule). */
export default function TestimonialFeature() {
  const [index, setIndex] = useState(0);
  const t = TESTIMONIALS[index];
  if (!t) return null;
  const many = TESTIMONIALS.length > 1;
  const step = (d: number) =>
    setIndex((v) => (v + d + TESTIMONIALS.length) % TESTIMONIALS.length);

  const arrow = {
    background: "none",
    border: `1px solid ${ink(0.25)}`,
    borderRadius: 999,
    width: 44,
    height: 44,
    fontSize: 16,
    color: "#0E0D0B",
    cursor: "pointer",
  } as const;

  return (
    <section
      style={{
        position: "relative",
        background: "#F7F5F2",
        color: "#0E0D0B",
        padding: "16vh 6vw",
      }}
    >
      <div
        className="lx-grid-2col"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(280px,440px) 1fr",
          gap: "6vw",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div data-reveal="" style={{ overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img(t.photo.path, 1000)}
            alt={t.photo.a}
            loading="lazy"
            style={{
              width: "100%",
              aspectRatio: "3 / 4",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
        <div style={{ maxWidth: 560 }}>
          {/* Assumes the featured couple is the gallery couple above — revisit when a second testimonial arrives. */}
          <div data-fadeup="" style={kicker({ marginBottom: 26 }, 10, ".3em")}>
            From the couple above
          </div>
          <blockquote
            data-fadeup=""
            style={{
              margin: 0,
              borderTop: `1px solid ${ink(0.14)}`,
              paddingTop: 30,
              fontFamily: SERIF,
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(22px,2.6vw,32px)",
              lineHeight: 1.4,
              textWrap: "pretty",
            }}
          >
            &ldquo;{t.pull}&rdquo;
          </blockquote>
          <p
            data-fadeup=""
            style={{ margin: "26px 0 0", fontSize: 15, lineHeight: 1.8, color: MUTED }}
          >
            {t.quote}
          </p>
          <div
            data-fadeup=""
            style={{
              marginTop: 30,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: ".22em",
              textTransform: "uppercase",
              color: GOLD,
            }}
          >
            — {t.names}
            {t.context ? ` · ${t.context}` : ""}
          </div>
          {many && (
            <div style={{ marginTop: 28, display: "flex", gap: 14 }}>
              <button
                aria-label="Previous testimonial"
                data-hover=""
                onClick={() => step(-1)}
                style={arrow}
              >
                &larr;
              </button>
              <button
                aria-label="Next testimonial"
                data-hover=""
                onClick={() => step(1)}
                style={arrow}
              >
                &rarr;
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
