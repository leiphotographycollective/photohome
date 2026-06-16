import Link from "next/link";

const placeholderShades = [
  "bg-neutral-300",
  "bg-stone-300",
  "bg-zinc-300",
  "bg-neutral-200",
  "bg-stone-200",
  "bg-slate-300",
];

export default function HomeFeaturedWork() {
  return (
    <section className="py-24 md:py-32 bg-[var(--bg)]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-14" data-reveal>
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--accent)] mb-3">
              Portfolio
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-[var(--ink)]">
              Featured Work
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="hidden sm:block text-sm text-[var(--ink-muted)] hover:text-[var(--ink)] underline underline-offset-4 transition-colors"
          >
            View all →
          </Link>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {placeholderShades.map((shade, i) => (
            <div
              key={i}
              className={`${shade} rounded-[var(--radius-sm)] overflow-hidden flex items-center justify-center ${
                i === 0 ? "row-span-2 aspect-[3/4]" : "aspect-square"
              }`}
              data-reveal
              data-delay={String((i % 3) + 1)}
            >
              <p className="text-neutral-400 text-xs tracking-widest uppercase">
                Photo {i + 1}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center sm:hidden">
          <Link
            href="/portfolio"
            className="text-sm text-[var(--ink-muted)] underline underline-offset-4"
          >
            View full portfolio →
          </Link>
        </div>
      </div>
    </section>
  );
}
