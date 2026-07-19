"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GOLD, SERIF } from "./tokens";
import { MENU_NAV, INQUIRE } from "@/content/nav";

/* Site navigation on mobile: a burger button in the fixed header that opens a
   full-screen editorial menu. The overlay is portaled to <body> so it always
   sits above the page, independent of the header. Links come from the shared
   nav config (src/content/nav.ts) so the menu stays in sync with the header
   and footer. Hidden on desktop, where HeaderNav takes over. */

const bar = (open: boolean, top: boolean) =>
  ({
    display: "block",
    width: 22,
    height: 1.5,
    background: "#0E0D0B",
    transition: "transform .3s ease",
    transform: open
      ? `translateY(${top ? 3.25 : -3.25}px) rotate(${top ? 45 : -45}deg)`
      : "none",
  }) as const;

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  useEffect(() => setMounted(true), []);
  useEffect(() => { setOpen(false); }, [pathname]);

  const overlay = (
    <div
      className="lx-overlay"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 120,
        background: "#0E0D0B",
        color: "#F7F5F2",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 28px",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
        transition: "opacity .35s ease",
      }}
    >
      <button
        aria-label="Close menu"
        onClick={() => setOpen(false)}
        style={{
          position: "absolute",
          top: 16,
          right: 20,
          background: "none",
          border: "none",
          padding: 12,
          cursor: "pointer",
          fontSize: 26,
          lineHeight: 1,
          color: "#F7F5F2",
          fontFamily: SERIF,
        }}
      >
        ×
      </button>
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: ".3em",
          textTransform: "uppercase",
          color: GOLD,
          marginBottom: 28,
        }}
      >
        Menu
      </div>
      <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {MENU_NAV.map((l, i) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            aria-current={pathname === l.href ? "page" : undefined}
            style={{
              display: "flex", alignItems: "baseline", gap: 14,
              fontFamily: SERIF, fontSize: 34, fontWeight: 500, lineHeight: 1.35,
              color: pathname === l.href ? GOLD : "#F7F5F2", textDecoration: "none",
            }}
          >
            {l.label}
            <span style={{ fontSize: 12, letterSpacing: ".18em", color: "rgba(247,245,242,.4)" }}>
              {String(i + 1).padStart(2, "0")}
            </span>
          </Link>
        ))}
      </nav>
      <Link
        href={INQUIRE.href}
        onClick={() => setOpen(false)}
        style={{
          marginTop: 40,
          alignSelf: "flex-start",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: ".22em",
          textTransform: "uppercase",
          color: "#0E0D0B",
          background: "#F7F5F2",
          padding: "16px 30px",
          borderRadius: 999,
          textDecoration: "none",
        }}
      >
        {INQUIRE.label}
      </Link>
    </div>
  );

  return (
    <>
      <button
        className="lx-burger"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        style={{
          pointerEvents: "auto",
          background: "none",
          border: "none",
          padding: 10,
          margin: -10,
          cursor: "pointer",
          flexDirection: "column",
          gap: 5,
        }}
      >
        <span style={bar(false, true)} />
        <span style={bar(false, false)} />
      </button>
      {mounted && createPortal(overlay, document.body)}
    </>
  );
}
