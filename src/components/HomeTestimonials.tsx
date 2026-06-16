const testimonials = [
  {
    quote:
      "Placeholder testimonial — Raymond made us feel so comfortable and the photos came out better than we ever imagined.",
    name: "Client Name",
    service: "Wedding",
  },
  {
    quote:
      "Placeholder testimonial — My graduation portraits were stunning. He knew exactly how to pose me and the lighting was perfect.",
    name: "Client Name",
    service: "Graduation",
  },
  {
    quote:
      "Placeholder testimonial — Hired for our company event and the photos were delivered quickly and looked so professional.",
    name: "Client Name",
    service: "Event",
  },
];

export default function HomeTestimonials() {
  return (
    <section className="py-24 md:py-32 bg-[var(--bg)]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14 text-center" data-reveal>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--accent)] mb-3">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-[var(--ink)]">
            What Clients Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map(({ quote, name, service }, i) => (
            <div
              key={i}
              className="bg-[var(--bg-white)] rounded-[var(--radius-md)] p-7 border border-[var(--border)] flex flex-col gap-4"
              data-reveal
              data-delay={String(i + 1)}
            >
              <p className="text-[var(--ink-muted)] leading-relaxed text-sm italic flex-1">
                &ldquo;{quote}&rdquo;
              </p>
              <div className="pt-4 border-t border-[var(--border)]">
                <p className="text-sm font-semibold text-[var(--ink)]">{name}</p>
                <p className="text-xs text-[var(--ink-dim)] mt-0.5">{service}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
