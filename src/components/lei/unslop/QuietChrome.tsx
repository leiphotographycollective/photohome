"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileMenu from "@/components/lei/MobileMenu";
import { DIM, GOLD, INK, cream } from "@/components/lei/tokens";
import {
  PRIMARY_NAV,
  INQUIRE,
  isActiveHref,
  isGroup,
  type NavItem,
} from "@/content/nav";
import { quietPrimary } from "./quiet";

/** Preview-only chrome: sentence-case nav, quiet inquire, brand-forward wordmark.
 *  Used only on /unslop so the live site stays unchanged. */

const linkStyle = (active: boolean): CSSProperties => ({
  fontSize: 13,
  fontWeight: 500,
  letterSpacing: "0.01em",
  textTransform: "none",
  color: active ? GOLD : INK,
  textDecoration: "none",
  background: "none",
  border: "none",
  padding: 0,
  cursor: "pointer",
});

function QuietNav() {
  const pathname = usePathname();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const isActive = (href: string) => isActiveHref(href, pathname);
  const groupActive = (children: NavItem[]) =>
    children.some((c) => pathname === c.href);

  return (
    <div className="lx-desknav" style={{ alignItems: "center", gap: 28 }}>
      {PRIMARY_NAV.map((item) => {
        if (isGroup(item)) {
          const open = openGroup === item.label;
          const active = groupActive(item.children);
          return (
            <div
              key={item.label}
              style={{ position: "relative" }}
              onMouseEnter={() => setOpenGroup(item.label)}
              onMouseLeave={() => setOpenGroup(null)}
              onFocus={() => setOpenGroup(item.label)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node))
                  setOpenGroup(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Escape") setOpenGroup(null);
              }}
            >
              <button
                type="button"
                aria-expanded={open}
                data-hover=""
                style={{
                  ...linkStyle(active || open),
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  cursor: "default",
                }}
              >
                {item.label}
                <svg
                  width="9"
                  height="6"
                  viewBox="0 0 14 9"
                  fill="none"
                  aria-hidden="true"
                  style={{
                    transform: open ? "rotate(180deg)" : "none",
                    transition: "transform .25s ease",
                  }}
                >
                  <path
                    d="M1 1L7 7L13 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 14px)",
                  left: "50%",
                  minWidth: 210,
                  background: "#0E0D0B",
                  padding: "14px 0",
                  borderRadius: 8,
                  boxShadow: "0 12px 32px rgba(14,13,11,.2)",
                  display: "flex",
                  flexDirection: "column",
                  opacity: open ? 1 : 0,
                  visibility: open ? "visible" : "hidden",
                  transform: open
                    ? "translateX(-50%) translateY(0)"
                    : "translateX(-50%) translateY(-6px)",
                  transition:
                    "opacity .22s ease, transform .22s ease, visibility .22s",
                }}
              >
                {item.children.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    data-hover=""
                    className="lx-dd-item"
                    aria-current={pathname === c.href ? "page" : undefined}
                    style={{
                      ...linkStyle(pathname === c.href),
                      color: pathname === c.href ? GOLD : cream(0.85),
                      padding: "10px 22px",
                      whiteSpace: "nowrap",
                      display: "block",
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
            data-hover=""
            aria-current={pathname === item.href ? "page" : undefined}
            style={linkStyle(isActive(item.href))}
          >
            {item.label}
          </Link>
        );
      })}
      <Link
        href={INQUIRE.href}
        data-mag=""
        data-hover=""
        style={quietPrimary(GOLD, INK, "10px 20px")}
      >
        {INQUIRE.label}
      </Link>
    </div>
  );
}

export default function QuietChrome() {
  return (
    <>
      <div
        data-cursor-dot=""
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: GOLD,
          zIndex: 200,
          pointerEvents: "none",
          transform: "translate(-100px,-100px)",
        }}
      />
      <div
        data-cursor-ring=""
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 44,
          height: 44,
          borderRadius: "50%",
          border: "1px solid rgba(184,144,90,.55)",
          zIndex: 200,
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: "translate(-100px,-100px)",
        }}
      >
        <span
          data-cursor-label=""
          style={{
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.02em",
            color: GOLD,
            opacity: 0,
            whiteSpace: "nowrap",
          }}
        />
      </div>

      <header
        className="lx-header"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 80,
          height: "var(--lx-header-h)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 30px",
          background: "#F7F5F2",
          borderBottom: "1px solid rgba(14,13,11,.08)",
          color: "#0E0D0B",
        }}
      >
        <Link
          href="/unslop"
          data-hover=""
          className="lx-logo"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            whiteSpace: "nowrap",
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: "0.01em",
            textTransform: "none",
            color: "#0E0D0B",
            textDecoration: "none",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/brand/rl-mark.png"
            alt=""
            aria-hidden="true"
            style={{ width: 32, height: 32, display: "block" }}
          />
          Lei Photography{" "}
          <span style={{ fontWeight: 400, color: DIM }}>Collective</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <QuietNav />
          <MobileMenu />
        </div>
      </header>

      {/* Preview banner — not part of the design, just so Raymond knows this isn’t live */}
      <div
        style={{
          position: "fixed",
          bottom: 16,
          left: 16,
          zIndex: 90,
          background: INK,
          color: "#F7F5F2",
          fontSize: 12,
          fontWeight: 500,
          padding: "8px 12px",
          borderRadius: 8,
          maxWidth: 280,
          lineHeight: 1.4,
          boxShadow: "0 8px 24px rgba(14,13,11,.2)",
        }}
      >
        Unslop preview — live site unchanged.{" "}
        <Link href="/" style={{ color: GOLD, textDecoration: "underline" }}>
          Back to live
        </Link>
      </div>
    </>
  );
}
