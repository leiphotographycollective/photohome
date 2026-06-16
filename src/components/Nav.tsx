"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[var(--glass)] backdrop-blur-md border-b border-[var(--glass-border)]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-[var(--ink)] font-semibold tracking-[0.15em] text-xs uppercase"
          onClick={() => setOpen(false)}
        >
          Lei Photography
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-7">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm transition-colors duration-200 ${
                pathname === href
                  ? "text-[var(--ink)] font-medium"
                  : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="text-sm px-5 py-2 bg-[var(--ink)] text-white rounded-full hover:bg-[var(--accent)] transition-colors duration-200"
          >
            Book Now
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 -mr-2 text-[var(--ink)]"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <span
            className={`block w-5 h-px bg-current transition-all duration-200 ${
              open ? "rotate-45 translate-y-[5px]" : "mb-[5px]"
            }`}
          />
          <span
            className={`block w-5 h-px bg-current transition-all duration-200 ${
              open ? "opacity-0" : "mb-[5px]"
            }`}
          />
          <span
            className={`block w-5 h-px bg-current transition-all duration-200 ${
              open ? "-rotate-45 -translate-y-[5px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--bg-white)] px-6 pb-6 pt-2">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="block py-3 text-sm text-[var(--ink-muted)] hover:text-[var(--ink)] border-b border-[var(--border)] last:border-0 transition-colors"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-4 block text-center text-sm px-5 py-2.5 bg-[var(--ink)] text-white rounded-full"
            onClick={() => setOpen(false)}
          >
            Book Now
          </Link>
        </div>
      )}
    </header>
  );
}
