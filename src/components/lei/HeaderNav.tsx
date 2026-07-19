"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GOLD, INK, navLink, pill } from "./tokens";
import { HEADER_NAV, INQUIRE } from "@/content/nav";

/* Visible desktop navigation in the fixed header. Hidden ≤860px (the burger
   takes over there). Active page is gold. */

export default function HeaderNav() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || (href === "/portfolio" && pathname.startsWith("/portfolio"));

  return (
    <div className="lx-desknav" style={{ alignItems: "center", gap: 28 }}>
      {HEADER_NAV.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          data-hover=""
          aria-current={isActive(item.href) ? "page" : undefined}
          style={navLink(isActive(item.href) ? GOLD : INK)}
        >
          {item.label}
        </Link>
      ))}
      <Link href={INQUIRE.href} data-mag="" data-hover="" style={pill(GOLD, INK, "12px 26px")}>
        {INQUIRE.label}
      </Link>
    </div>
  );
}
