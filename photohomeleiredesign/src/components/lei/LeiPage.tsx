"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { initLeiMotion } from "@/lib/lei/motion";

interface LeiPageProps {
  /** Enables the home-only preloader, hero bloom and WebGL ripple. */
  home?: boolean;
  style?: CSSProperties;
  children: ReactNode;
}

/**
 * Client shell for every Lei experience page. Renders the page root and, on
 * mount, wires the shared motion engine (Lenis, cursor, GSAP reveals, …) to
 * the data-* attributes in its server-rendered children.
 */
export default function LeiPage({ home = false, style, children }: LeiPageProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    // Play the signature preloader once per browser session.
    let preloader = false;
    if (home) {
      try {
        preloader = !sessionStorage.getItem("lei-preloader");
        if (preloader) sessionStorage.setItem("lei-preloader", "1");
      } catch {
        preloader = true;
      }
    }
    return initLeiMotion(root, { home, preloader });
  }, [home]);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        background: "#F7F5F2",
        color: "#0E0D0B",
        fontFamily: "var(--font-dm-sans), sans-serif",
        overflow: "clip",
        minHeight: "100vh",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
