"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { getLenis } from "@/lib/lei/motion";
import { cream } from "@/components/lei/tokens";

interface Frame {
  src: string;
  alt: string;
}

/** The live <img> tags currently rendered in the wrapped subtree, read fresh
 *  every time rather than cached anywhere. */
function liveImages(root: HTMLElement): HTMLImageElement[] {
  return Array.from(root.querySelectorAll("img"));
}

/**
 * Click (or keyboard-activate) any photo in the wrapped grid to see it full
 * screen.
 *
 * This deliberately takes no photo list. Every gallery src is a literal string
 * in the page source so the visual editor can swap it, and accepting an array
 * here would put those paths back into data and undo that. Instead it reads
 * the <img> tags it just rendered out of its own subtree, so the markup stays
 * the one source of truth.
 *
 * That read happens live, at the moment of each interaction, rather than once
 * into a snapshot: the visual editor swaps a photo's src on an existing <img>
 * element in place, without remounting this component, so a `frames` array
 * captured once on mount would keep pointing at whatever photo used to be
 * there. Reading `querySelectorAll("img")` fresh on every open and every
 * Prev/Next step means there is nothing here that can go stale.
 */
export default function Lightbox({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const [index, setIndex] = useState<number | null>(null);
  const [frame, setFrame] = useState<Frame | null>(null);

  const openAt = useCallback((i: number, img: HTMLImageElement) => {
    openerRef.current = img;
    setIndex(i);
    setFrame({ src: img.src, alt: img.alt });
  }, []);

  const close = useCallback(() => {
    setIndex(null);
    setFrame(null);
  }, []);

  const step = useCallback(
    (delta: number) => {
      const root = ref.current;
      if (!root || index === null) return;
      const imgs = liveImages(root);
      if (imgs.length === 0) return;
      const next = (index + delta + imgs.length) % imgs.length;
      const img = imgs[next];
      setIndex(next);
      setFrame({ src: img.src, alt: img.alt });
    },
    [index]
  );

  // One click listener and one keydown listener on the wrapper, delegated
  // down to whichever <img> the event actually targets, instead of one pair
  // bound per photo. Delegation is what lets this survive the editor
  // replacing/re-rendering children without this effect re-running: the
  // listener doesn't care which <img> elements exist, only whether the event
  // target is one.
  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const imgs = liveImages(root);
    imgs.forEach((img) => {
      // Focusable and operable, not just clickable: a keyboard-only visitor
      // tabs through the grid and needs a stop, a role announcing what it
      // does, and a label, since an <img> carries none of those by default.
      img.tabIndex = 0;
      img.setAttribute("role", "button");
      img.setAttribute("aria-label", "View photo full screen");
      // This site draws its own gold-ring cursor and sets `cursor: none` on
      // desktop (globals.css) to hide the native one everywhere else. Setting
      // img.style.cursor here would fight that ring, so instead mark the
      // photo with data-hover, this site's existing convention for
      // "interactive": the motion engine (src/lib/lei/motion.ts) grows the
      // ring for any element carrying it.
      img.setAttribute("data-hover", "");
    });

    const ac = new AbortController();
    const onClick = (e: MouseEvent) => {
      const img = (e.target as HTMLElement).closest("img");
      if (!img) return;
      const list = liveImages(root);
      const i = list.indexOf(img as HTMLImageElement);
      if (i !== -1) openAt(i, img as HTMLImageElement);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const img = (e.target as HTMLElement).closest("img");
      if (!img) return;
      // Space's default action scrolls the page; that's only correct when
      // the focused element isn't the thing being activated.
      if (e.key === " ") e.preventDefault();
      const list = liveImages(root);
      const i = list.indexOf(img as HTMLImageElement);
      if (i !== -1) openAt(i, img as HTMLImageElement);
    };
    root.addEventListener("click", onClick, { signal: ac.signal });
    root.addEventListener("keydown", onKeyDown, { signal: ac.signal });
    return () => ac.abort();
  }, [openAt]);

  // Lenis keeps driving the page under the overlay unless it is stopped, and
  // the document needs its own overflow lock for the native scrollbar.
  // Keyed on open/closed rather than on `index`, so stepping between photos
  // does not release and re-apply the lock on every arrow press. Doing that
  // restarts Lenis and un-hides the scrollbar for a frame each time, which
  // shows up as a flicker at the edge of the overlay.
  const open = frame !== null;
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

  // Focus management for the dialog: move focus in on open, restore it to
  // the photo that opened the viewer on close. Also keyed on open/closed
  // rather than `index`, for the same reason as above (stepping shouldn't
  // re-trigger this).
  useEffect(() => {
    if (!open) return;
    closeBtnRef.current?.focus();
    return () => {
      openerRef.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key === "ArrowRight") {
        step(1);
        return;
      }
      if (e.key === "ArrowLeft") {
        step(-1);
        return;
      }
      if (e.key === "Tab") {
        // Trap Tab/Shift+Tab within the dialog's own focusable elements
        // (Close, and Prev/Next when shown) so a keyboard visitor can't tab
        // out into the hidden page behind aria-modal.
        const dialog = dialogRef.current;
        if (!dialog) return;
        const focusables = Array.from(
          dialog.querySelectorAll<HTMLElement>("button")
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;
        if (e.shiftKey) {
          if (active === first || !dialog.contains(active)) {
            e.preventDefault();
            last.focus();
          }
        } else if (active === last || !dialog.contains(active)) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, step]);

  // Read live rather than kept in state, same reasoning as everywhere else
  // in this file: whether there is more than one photo to page through can
  // change as the editor adds or removes frames, and this is cheap enough to
  // just ask the DOM every render.
  const multiple = (ref.current ? liveImages(ref.current).length : 0) > 1;

  return (
    <>
      <div ref={ref}>{children}</div>

      {frame && (
        <div
          ref={dialogRef}
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
            ref={closeBtnRef}
            type="button"
            onClick={close}
            aria-label="Close photo viewer"
            style={btn({ top: 18, right: 22 })}
          >
            Close
          </button>
          {multiple && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                aria-label="Previous photo"
                style={btn({
                  top: "50%",
                  left: 22,
                  transform: "translateY(-50%)",
                })}
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
                style={btn({
                  top: "50%",
                  right: 22,
                  transform: "translateY(-50%)",
                })}
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
