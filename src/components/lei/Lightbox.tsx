"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { getLenis } from "@/lib/lei/motion";
import { cream } from "@/components/lei/tokens";

interface Frame {
  src: string;
  alt: string;
}

/**
 * Click any photo in the wrapped grid to see it full screen.
 *
 * This deliberately takes no photo list. Every gallery src is a literal string
 * in the page source so the visual editor can swap it, and accepting an array
 * here would put those paths back into data and undo that. Instead it reads the
 * <img> tags it just rendered out of its own subtree, so the markup stays the
 * one source of truth.
 */
export default function Lightbox({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [frames, setFrames] = useState<Frame[]>([]);
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const imgs = Array.from(root.querySelectorAll("img"));
    setFrames(imgs.map((img) => ({ src: img.src, alt: img.alt })));

    const ac = new AbortController();
    imgs.forEach((img, i) => {
      img.style.cursor = "zoom-in";
      img.addEventListener("click", () => setIndex(i), { signal: ac.signal });
    });
    return () => ac.abort();
  }, []);

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (delta: number) =>
      setIndex((i) =>
        i === null ? i : (i + delta + frames.length) % frames.length
      ),
    [frames.length]
  );

  // Lenis keeps driving the page under the overlay unless it is stopped, and
  // the document needs its own overflow lock for the native scrollbar.
  // Keyed on open/closed rather than on `index`, so stepping between photos
  // does not release and re-apply the lock on every arrow press. Doing that
  // restarts Lenis and un-hides the scrollbar for a frame each time, which
  // shows up as a flicker at the edge of the overlay.
  const open = index !== null;
  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    const { overflow } = document.documentElement.style;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = overflow;
      lenis?.start();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, step]);

  const frame = index === null ? null : frames[index];

  return (
    <>
      <div ref={ref}>{children}</div>

      {frame && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={close}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 300,
            background: "rgba(14,13,11,.94)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "6vh 6vw",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={frame.src}
            alt={frame.alt}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              display: "block",
            }}
          />

          <button
            type="button"
            onClick={close}
            aria-label="Close photo viewer"
            style={btn({ top: 18, right: 22 })}
          >
            Close
          </button>
          {frames.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                aria-label="Previous photo"
                style={btn({ top: "50%", left: 22 })}
              >
                Prev
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                aria-label="Next photo"
                style={btn({ top: "50%", right: 22 })}
              >
                Next
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}

/** The overlay's three controls share one look. */
function btn(position: Record<string, string | number>) {
  return {
    position: "absolute" as const,
    ...position,
    background: "none",
    border: 0,
    color: cream(0.72),
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: ".22em",
    textTransform: "uppercase" as const,
    cursor: "pointer",
    padding: 12,
  };
}
