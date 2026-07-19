"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GOLD, SERIF } from "./tokens";
import { PRIMARY_NAV, INQUIRE, isGroup } from "@/content/nav";

/* Site navigation on mobile: a burger button in the fixed header that opens a
   full-screen editorial menu. The overlay is portaled to <body> so it always
   sits above the page. Links come from the shared nav config (src/content/nav.ts)
   so the menu stays in sync with the header and footer. "Weddings" is a
   tap-to-expand group (not a link), mirroring the desktop hover dropdown.
   Hidden on desktop, where HeaderNav takes over. */

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
  const [groupOpen, setGroupOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => setMounted(true), []);
  useEffect(() => { setOpen(false); setGroupOpen(false); }, [pathname]);

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
        {PRIMARY_NAV.map((item, i) => {
          const n = String(i + 1).padStart(2, "0");
          if (isGroup(item)) {
            const active = item.children.some((c) => pathname === c.href);
            return (
              <div key={item.label}>
                <button
                  onClick={() => setGroupOpen((v) => !v)}
                  aria-expanded={groupOpen}
                  style={{
                    display: "flex", alignItems: "center", gap: 14, width: "100%", textAlign: "left",
                    fontFamily: SERIF, fontSize: 34, fontWeight: 500, lineHeight: 1.35,
                    color: active ? GOLD : "#F7F5F2",
                    background: "none", border: "none", padding: 0, cursor: "pointer",
                  }}
                >
                  {item.label}
                  <span style={{ fontSize: 12, letterSpacing: ".18em", color: "rgba(247,245,242,.4)", alignSelf: "baseline" }}>{n}</span>
                  <svg
                    width="14" height="9" viewBox="0 0 14 9" fill="none"
                    style={{
                      marginLeft: 6, flexShrink: 0,
                      transform: groupOpen ? "rotate(180deg)" : "none",
                      transition: "transform .35s cubic-bezier(0.4,0,0.2,1)",
                    }}
                  >
                    <path d="M1 1L7 7L13 1" stroke="#B8905A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div
                  style={{
                    overflow: "hidden",
                    maxHeight: groupOpen ? 240 : 0,
                    opacity: groupOpen ? 1 : 0,
                    transition: "max-height .4s cubic-bezier(0.4,0,0.2,1), opacity .3s ease",
                  }}
                >
                  {item.children.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      onClick={() => setOpen(false)}
                      aria-current={pathname === c.href ? "page" : undefined}
                      style={{
                        display: "block", paddingLeft: 24, paddingTop: 6, paddingBottom: 2,
                        fontFamily: SERIF, fontSize: 22, fontWeight: 400,
                        color: pathname === c.href ? GOLD : "rgba(247,245,242,.7)",
                        textDecoration: "none", letterSpacing: ".01em",
                      }}
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            );
          }
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={pathname === item.href ? "page" : undefined}
              style={{
                display: "flex", alignItems: "baseline", gap: 14,
                fontFamily: SERIF, fontSize: 34, fontWeight: 500, lineHeight: 1.35,
                color: pathname === item.href ? GOLD : "#F7F5F2", textDecoration: "none",
              }}
            >
              {item.label}
              <span style={{ fontSize: 12, letterSpacing: ".18em", color: "rgba(247,245,242,.4)" }}>{n}</span>
            </Link>
          );
        })}
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
