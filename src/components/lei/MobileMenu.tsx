"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GOLD, SERIF } from "./tokens";

/* Mobile-only navigation: a burger button in the fixed header that opens a
   full-screen editorial menu. Hidden on desktop via .lx-burger / .lx-overlay
   rules in globals.css. The overlay is portaled to <body> because the fixed
   header uses mix-blend-difference, which would bleed into any child. */

const LINKS = [
  { href: "/about", label: "About", n: "03" },
];

const WEDDINGS_SUB = [
  { href: "/portfolio/weddings", label: "The Portfolio" },
  { href: "/experience", label: "Experience" },
  { href: "/investment", label: "Investment" },
  { href: "/free-session", label: "Free Session" },
];

const bar = (open: boolean, top: boolean) =>
  ({
    display: "block",
    width: 22,
    height: 1.5,
    background: "#fff",
    transition: "transform .3s ease",
    transform: open
      ? `translateY(${top ? 3.25 : -3.25}px) rotate(${top ? 45 : -45}deg)`
      : "none",
  }) as const;

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [weddingsOpen, setWeddingsOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => setMounted(true), []);
  useEffect(() => { setOpen(false); setWeddingsOpen(false); }, [pathname]);

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
        {/* Work — the portfolio index page */}
        <Link
          href="/work"
          onClick={() => setOpen(false)}
          style={{
            display: "flex", alignItems: "baseline", gap: 14,
            fontFamily: SERIF, fontSize: 38, fontWeight: 500, lineHeight: 1.35,
            color: pathname === "/work" ? GOLD : "#F7F5F2", textDecoration: "none",
          }}
        >
          Work
          <span style={{ fontSize: 12, letterSpacing: ".18em", color: "rgba(247,245,242,.4)" }}>01</span>
        </Link>

        {/* Weddings — hover (or tap on touch) to expand sub-items */}
        <div
          onMouseEnter={() => setWeddingsOpen(true)}
          onMouseLeave={() => setWeddingsOpen(false)}
        >
          <button
            onClick={() => setWeddingsOpen((v) => !v)}
            style={{
              display: "flex", alignItems: "center", gap: 14,
              fontFamily: SERIF, fontSize: 38, fontWeight: 500, lineHeight: 1.35,
              color: pathname.startsWith("/weddings") || pathname === "/experience" || pathname === "/free-session" ? GOLD : "#F7F5F2",
              background: "none", border: "none", padding: 0, cursor: "pointer", width: "100%", textAlign: "left",
            }}
          >
            Weddings
            <span style={{ fontSize: 12, letterSpacing: ".18em", color: "rgba(247,245,242,.4)", alignSelf: "baseline" }}>02</span>
            {/* Dropdown indicator — gold chevron */}
            <svg
              width="14" height="9" viewBox="0 0 14 9" fill="none"
              style={{
                marginLeft: 6,
                flexShrink: 0,
                transform: weddingsOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform .35s cubic-bezier(0.4,0,0.2,1)",
              }}
            >
              <path d="M1 1L7 7L13 1" stroke="#B8905A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {/* Animated sub-menu */}
          <div
            style={{
              overflow: "hidden",
              maxHeight: weddingsOpen ? 220 : 0,
              opacity: weddingsOpen ? 1 : 0,
              transition: "max-height .4s cubic-bezier(0.4,0,0.2,1), opacity .3s ease",
            }}
          >
            {WEDDINGS_SUB.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                onClick={() => setOpen(false)}
                style={{
                  display: "block", paddingLeft: 24, paddingTop: 6, paddingBottom: 2,
                  fontFamily: SERIF, fontSize: 24, fontWeight: 400,
                  color: pathname === s.href ? GOLD : "rgba(247,245,242,.7)", textDecoration: "none",
                  letterSpacing: ".01em",
                }}
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Remaining top-level links */}
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            style={{
              display: "flex", alignItems: "baseline", gap: 14,
              fontFamily: SERIF, fontSize: 38, fontWeight: 500, lineHeight: 1.35,
              color: pathname === l.href ? GOLD : "#F7F5F2", textDecoration: "none",
            }}
          >
            {l.label}
            <span style={{ fontSize: 12, letterSpacing: ".18em", color: "rgba(247,245,242,.4)" }}>{l.n}</span>
          </Link>
        ))}
      </nav>
      <Link
        href="/inquire"
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
        Inquire
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
