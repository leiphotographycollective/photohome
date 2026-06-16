import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Lei Photography Collective to book your session.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-24">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--accent)] mb-3">
            Reach Out
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-[var(--ink)] mb-4">
            Let&apos;s Talk
          </h1>
          <p className="text-[var(--ink-muted)] max-w-md leading-relaxed">
            Placeholder — I&apos;d love to hear about your project. Fill out the form
            below or reach out directly.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-12">
          {/* Contact details */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-[var(--ink-dim)] mb-1">
                Email
              </p>
              <a
                href="mailto:hello@leiphoto.com"
                className="text-sm text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
              >
                hello@leiphoto.com
              </a>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-[var(--ink-dim)] mb-1">
                Instagram
              </p>
              <a
                href="https://instagram.com/leiphoto"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
              >
                @leiphoto
              </a>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-[var(--ink-dim)] mb-2">
                Booking
              </p>
              <p className="text-sm text-[var(--ink-muted)]">
                Inquiries are managed through HoneyBook.
              </p>
              {/* TODO: Replace href with actual HoneyBook link */}
              <a
                href="#"
                className="mt-2 inline-block text-sm font-medium text-[var(--ink)] underline underline-offset-4 hover:text-[var(--accent)] transition-colors"
              >
                Open Booking Form →
              </a>
            </div>
          </div>

          {/* Form — placeholder; wire to HoneyBook embed or API route later */}
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
