import Link from "next/link";

export default function HomeCTA() {
  return (
    <section className="relative py-28 md:py-36 bg-[var(--ink)] overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-neutral-950 opacity-60" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <p
          className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--accent)] mb-4"
          data-reveal
        >
          Let&apos;s Work Together
        </p>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-6 leading-snug"
          data-reveal
          data-delay="1"
        >
          Ready to Book Your Session?
        </h2>
        <p
          className="text-white/60 text-base md:text-lg mb-10 max-w-lg mx-auto leading-relaxed"
          data-reveal
          data-delay="2"
        >
          Placeholder CTA copy — reach out and let&apos;s talk about what you have in mind.
        </p>
        <div data-reveal data-delay="3" className="flex flex-wrap justify-center gap-3">
          <Link
            href="/contact"
            className="px-8 py-3.5 bg-white text-[var(--ink)] text-sm font-semibold rounded-full hover:bg-[var(--accent)] hover:text-white transition-colors duration-200"
          >
            Get in Touch
          </Link>
          <Link
            href="/pricing"
            className="px-8 py-3.5 border border-white/30 text-white text-sm font-semibold rounded-full hover:border-white transition-colors duration-200"
          >
            View Pricing
          </Link>
        </div>
      </div>
    </section>
  );
}
