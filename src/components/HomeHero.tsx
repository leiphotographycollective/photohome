import Link from "next/link";

export default function HomeHero() {
  return (
    <section className="relative min-h-[100svh] flex items-end bg-neutral-900 overflow-hidden">
      {/* ── Placeholder: swap this div for <Image fill … /> ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-950 flex items-center justify-center">
        <p className="text-neutral-600 text-sm tracking-widest uppercase">
          Hero image placeholder
        </p>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-20 md:pb-28 w-full">
        <p
          className="text-xs font-semibold tracking-[0.2em] uppercase text-white/60 mb-4"
          style={{ animation: "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both" }}
        >
          Lei Photography Collective
        </p>
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white leading-[1.1] max-w-2xl mb-6"
          style={{ animation: "fadeUp 0.7s 0.1s cubic-bezier(0.22,1,0.36,1) both" }}
        >
          Wedding, Portrait &amp; Event Photography
        </h1>
        <p
          className="text-base md:text-lg text-white/70 max-w-md mb-10"
          style={{ animation: "fadeUp 0.7s 0.2s cubic-bezier(0.22,1,0.36,1) both" }}
        >
          Placeholder tagline — cinematic, natural imagery for life&apos;s most important moments.
        </p>
        <div
          className="flex flex-wrap gap-3"
          style={{ animation: "fadeUp 0.7s 0.3s cubic-bezier(0.22,1,0.36,1) both" }}
        >
          <Link
            href="/portfolio"
            className="px-7 py-3 bg-white text-[var(--ink)] text-sm font-medium rounded-full hover:bg-[var(--accent)] hover:text-white transition-colors duration-200"
          >
            View Portfolio
          </Link>
          <Link
            href="/contact"
            className="px-7 py-3 border border-white/40 text-white text-sm font-medium rounded-full hover:border-white hover:bg-white/10 transition-colors duration-200"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}
