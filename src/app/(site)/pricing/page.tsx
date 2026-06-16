import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Transparent pricing for wedding, portrait, event, and real estate photography.",
  alternates: { canonical: "/pricing" },
};

const packages = [
  {
    service: "Weddings",
    tiers: [
      { name: "Essential", price: "$—", description: "Placeholder — X hours, digital gallery" },
      { name: "Standard", price: "$—", description: "Placeholder — X hours, two photographers" },
      { name: "Premium", price: "$—", description: "Placeholder — full day, engagement session included" },
    ],
  },
  {
    service: "Portraits & Graduation",
    tiers: [
      { name: "Mini Session", price: "$—", description: "Placeholder — 30 min, X edited photos" },
      { name: "Standard Session", price: "$—", description: "Placeholder — 1 hour, X edited photos" },
      { name: "Extended Session", price: "$—", description: "Placeholder — 2 hours, multiple locations" },
    ],
  },
  {
    service: "Events & Real Estate",
    tiers: [
      { name: "Half Day", price: "$—", description: "Placeholder — up to 4 hours" },
      { name: "Full Day", price: "$—", description: "Placeholder — up to 8 hours" },
      { name: "Custom", price: "Contact", description: "Placeholder — multi-day or large projects" },
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--accent)] mb-3">
          Investment
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold text-[var(--ink)] mb-4">
          Pricing
        </h1>
        <p className="text-[var(--ink-muted)] max-w-lg mx-auto leading-relaxed">
          Transparent packages — placeholder intro copy. All packages include
          a private online gallery delivered via Pic-Time.
        </p>
      </div>

      {/* Packages */}
      <div className="max-w-6xl mx-auto px-6 pb-24 space-y-16">
        {packages.map(({ service, tiers }) => (
          <div key={service}>
            <h2 className="text-xl font-semibold text-[var(--ink)] mb-6 pb-4 border-b border-[var(--border)]">
              {service}
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {tiers.map(({ name, price, description }) => (
                <div
                  key={name}
                  className="bg-[var(--bg-white)] rounded-[var(--radius-md)] p-7 border border-[var(--border)] hover:shadow-[var(--shadow)] transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-[var(--ink)]">{name}</h3>
                    <p className="text-xl font-semibold text-[var(--accent)]">{price}</p>
                  </div>
                  <p className="text-sm text-[var(--ink-muted)] leading-relaxed">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* CTA */}
        <div className="text-center pt-4">
          <p className="text-[var(--ink-muted)] mb-6 text-sm">
            Not sure which package fits? Reach out and we&apos;ll figure it out together.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--ink)] text-white text-sm font-medium rounded-full hover:bg-[var(--accent)] transition-colors duration-200"
          >
            Get a Custom Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
