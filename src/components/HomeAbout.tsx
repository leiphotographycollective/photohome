import Link from "next/link";

export default function HomeAbout() {
  return (
    <section className="py-24 md:py-32 bg-[var(--bg-white)]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Photo placeholder — swap for <Image> */}
          <div
            className="bg-neutral-200 rounded-[var(--radius-lg)] aspect-[4/5] flex items-center justify-center"
            data-reveal="left"
          >
            <p className="text-neutral-400 text-xs tracking-widest uppercase">
              Portrait placeholder
            </p>
          </div>

          {/* Text */}
          <div data-reveal>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--accent)] mb-4">
              About
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-[var(--ink)] mb-6 leading-snug">
              Hi, I&apos;m Raymond
            </h2>
            <p className="text-[var(--ink-muted)] leading-relaxed mb-4">
              Placeholder bio — Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              I&apos;m a photographer and videographer based in [City], specializing in
              weddings, portraits, and events.
            </p>
            <p className="text-[var(--ink-muted)] leading-relaxed mb-8">
              Placeholder second paragraph — what makes your style unique, your approach,
              and what clients can expect when working with you.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--ink)] border border-[var(--border)] px-6 py-3 rounded-full hover:border-[var(--ink)] transition-colors duration-200"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
