"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GOLD, INK, cream, navLink, pill } from "./tokens";
import { PRIMARY_NAV, INQUIRE, isGroup, type NavItem } from "@/content/nav";

/* Visible desktop navigation in the fixed header. Hidden ≤860px (the burger
   takes over there). "Weddings" is a hover/focus dropdown whose parent is not a
   link. Active page is gold. */

export default function HeaderNav() {
  const pathname = usePathname();
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  const isActive = (href: string) =>
    pathname === href || (href === "/portfolio" && pathname.startsWith("/portfolio"));

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
                if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpenGroup(null);
              }}
            >
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={open}
                data-hover=""
                style={{
                  ...navLink(active || open ? GOLD : INK),
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: "none",
                  border: "none",
                  padding: 0,
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
                  style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .25s ease" }}
                >
                  <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div
                role="menu"
                style={{
                  position: "absolute",
                  top: "calc(100% + 14px)",
                  left: "50%",
                  minWidth: 210,
                  background: "#0E0D0B",
                  padding: "14px 0",
                  borderRadius: 4,
                  boxShadow: "0 20px 50px rgba(14,13,11,.28)",
                  display: "flex",
                  flexDirection: "column",
                  opacity: open ? 1 : 0,
                  visibility: open ? "visible" : "hidden",
                  transform: open
                    ? "translateX(-50%) translateY(0)"
                    : "translateX(-50%) translateY(-6px)",
                  transition: "opacity .22s ease, transform .22s ease, visibility .22s",
                }}
              >
                {item.children.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    role="menuitem"
                    data-hover=""
                    className="lx-dd-item"
                    aria-current={pathname === c.href ? "page" : undefined}
                    style={{
                      ...navLink(pathname === c.href ? GOLD : cream(0.8)),
                      padding: "10px 22px",
                      whiteSpace: "nowrap",
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
            aria-current={isActive(item.href) ? "page" : undefined}
            style={navLink(isActive(item.href) ? GOLD : INK)}
          >
            {item.label}
          </Link>
        );
      })}
      <Link href={INQUIRE.href} data-mag="" data-hover="" style={pill(GOLD, INK, "12px 26px")}>
        {INQUIRE.label}
      </Link>
    </div>
  );
}
