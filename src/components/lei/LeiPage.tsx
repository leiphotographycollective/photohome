"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { initLeiMotion } from "@/lib/lei/motion";

interface LeiPageProps {
  style?: CSSProperties;
  children: ReactNode;
}

/**
 * Client shell for every Lei experience page. Renders the page root and, on
 * mount, wires the shared motion engine (Lenis, cursor, GSAP reveals, …) to
 * the data-* attributes in its server-rendered children.
 */
export default function LeiPage({ style, children }: LeiPageProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    return initLeiMotion(root);
  }, []);

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
