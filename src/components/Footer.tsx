import Link from "next/link";

const navLinks = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { href: "https://instagram.com/leiphoto", label: "Instagram" },
  { href: "https://tiktok.com/@leiphoto", label: "TikTok" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-white)]">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-xs font-semibold tracking-[0.15em] uppercase text-[var(--ink)]"
            >
              Lei Photography Collective
            </Link>
            <p className="mt-2 text-sm text-[var(--ink-muted)] max-w-xs">
              Wedding, portrait, and event photography — placeholder tagline.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-[var(--ink-dim)] mb-3">
                Pages
              </p>
              <ul className="space-y-2">
                {navLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-[var(--ink-dim)] mb-3">
                Follow
              </p>
              <ul className="space-y-2">
                {socialLinks.map(({ href, label }) => (
                  <li key={href}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-[var(--ink-dim)]">
          <p>© {year} Lei Photography Collective. All rights reserved.</p>
          <p>Built with Next.js &amp; Supabase</p>
        </div>
      </div>
    </footer>
  );
}
