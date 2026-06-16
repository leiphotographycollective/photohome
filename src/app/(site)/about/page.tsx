import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Raymond Lei and Lei Photography Collective.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Hero */}
      <div className="bg-[var(--bg-white)] border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-16 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Portrait placeholder */}
          <div className="bg-neutral-200 rounded-[var(--radius-lg)] aspect-[3/4] flex items-center justify-center order-1 md:order-none">
            <p className="text-neutral-400 text-xs tracking-widest uppercase">
              Portrait placeholder
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--accent)] mb-4">
              About Me
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold text-[var(--ink)] mb-6 leading-tight">
              Hi, I&apos;m Raymond Lei
            </h1>
            <div className="space-y-4 text-[var(--ink-muted)] leading-relaxed">
              <p>
                Placeholder bio paragraph one — your background, how you got into
                photography, and what drives your work.
              </p>
              <p>
                Placeholder bio paragraph two — your style, approach, and what makes
                working with you a unique experience.
              </p>
              <p>
                Placeholder bio paragraph three — gear, credentials, or anything else
                clients should know.
              </p>
            </div>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 px-7 py-3 bg-[var(--ink)] text-white text-sm font-medium rounded-full hover:bg-[var(--accent)] transition-colors duration-200"
            >
              Work With Me
            </Link>
          </div>
        </div>
      </div>

      {/* Stats / facts strip */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "—", label: "Weddings Shot" },
            { value: "—", label: "Years Experience" },
            { value: "—", label: "Happy Clients" },
            { value: "—", label: "Cities Covered" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-4xl font-semibold text-[var(--ink)] mb-1">{value}</p>
              <p className="text-sm text-[var(--ink-muted)]">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
