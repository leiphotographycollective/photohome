const services = [
  {
    title: "Weddings",
    description:
      "Full-day coverage of your ceremony and reception — placeholder description.",
    placeholder: "bg-stone-200",
  },
  {
    title: "Graduation & Portraits",
    description:
      "Milestone portraits for graduates and individuals — placeholder description.",
    placeholder: "bg-neutral-200",
  },
  {
    title: "Events",
    description:
      "Corporate events, galas, and celebrations — placeholder description.",
    placeholder: "bg-zinc-200",
  },
  {
    title: "Real Estate",
    description:
      "Clean, well-lit property photography that sells — placeholder description.",
    placeholder: "bg-slate-200",
  },
  {
    title: "Social Media",
    description:
      "Photo and video content built for Instagram, TikTok, and beyond.",
    placeholder: "bg-warm-200",
  },
];

export default function HomeServices() {
  return (
    <section className="py-24 md:py-32 bg-[var(--bg-white)]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14" data-reveal>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--accent)] mb-3">
            What I Shoot
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-[var(--ink)]">
            Services
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ title, description, placeholder }, i) => (
            <div
              key={title}
              className="group rounded-[var(--radius-md)] overflow-hidden border border-[var(--border)] hover:shadow-[var(--shadow-lg)] transition-shadow duration-300"
              data-reveal
              data-delay={String(i + 1)}
            >
              {/* Placeholder image — swap for <Image> */}
              <div className={`${placeholder} aspect-[4/3] w-full flex items-center justify-center`}>
                <p className="text-neutral-400 text-xs tracking-widest uppercase">
                  Photo placeholder
                </p>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-[var(--ink)] mb-1">{title}</h3>
                <p className="text-sm text-[var(--ink-muted)] leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
