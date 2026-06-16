import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Browse wedding, portrait, event, and real estate photography by Lei Photography Collective.",
  alternates: { canonical: "/portfolio" },
};

const categories = ["All", "Weddings", "Portraits", "Events", "Real Estate", "Social"];

const placeholders = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  shade: ["bg-neutral-200", "bg-stone-200", "bg-zinc-200", "bg-slate-200"][i % 4],
}));

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--accent)] mb-3">
          Work
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold text-[var(--ink)]">Portfolio</h1>
      </div>

      {/* Category filter */}
      <div className="max-w-6xl mx-auto px-6 mb-10">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                cat === "All"
                  ? "bg-[var(--ink)] text-white border-[var(--ink)]"
                  : "border-[var(--border)] text-[var(--ink-muted)] hover:border-[var(--ink)] hover:text-[var(--ink)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {placeholders.map(({ id, shade }) => (
            <div
              key={id}
              className={`${shade} rounded-[var(--radius-sm)] aspect-square flex items-center justify-center`}
            >
              <p className="text-neutral-400 text-xs tracking-widest uppercase">
                Photo {id + 1}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
