"use client";

import { useEffect, useState } from "react";
import { img, type Photo } from "@/content/portfolio";
import { HERO_PHOTOS } from "@/content/homepage";

const HOLD_MS = 4000; // each frame is held ~4s before it cross-fades to the next
const FADE_MS = 1200; // cross-fade duration

/** The hero photo, fading and rotating through HERO_PHOTOS. Frame 0 is the LCP
 *  image and the only frame rendered at first paint; the rest mount after mount
 *  and only animate when the visitor allows motion. All frames stack in the
 *  same box (object-fit: cover), so mixed aspect ratios cross-fade cleanly. */
export default function HeroSlideshow() {
  const photos: Photo[] = HERO_PHOTOS;
  const [active, setActive] = useState(0);
  // Extra frames mount only after first paint so the LCP frame owns the
  // initial load; the rotation itself is pure progressive enhancement.
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    if (photos.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setEnhanced(true);

    // Self-rescheduling timeout: background tabs throttle it (so no catch-up
    // burst), a visible tab advances every HOLD_MS.
    let timer: number;
    const schedule = () => {
      timer = window.setTimeout(() => {
        setActive((i) => (i + 1) % photos.length);
        schedule();
      }, HOLD_MS);
    };
    schedule();
    return () => window.clearTimeout(timer);
  }, [photos.length]);

  return (
    <div className="lx-hero-photo">
      {photos.map((p, i) => {
        if (i > 0 && !enhanced) return null;
        const on = i === active;
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={p.path}
            src={img(p.path, 1600)}
            alt={p.a}
            aria-hidden={on ? undefined : true}
            fetchPriority={i === 0 ? "high" : undefined}
            loading={i === 0 ? undefined : "lazy"}
            decoding="async"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: on ? 1 : 0,
              zIndex: on ? 1 : 0,
              transition: `opacity ${FADE_MS}ms ease-in-out`,
            }}
          />
        );
      })}
    </div>
  );
}
