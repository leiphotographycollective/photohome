"use client";

export default function ContactForm() {
  return (
    <form className="md:col-span-3 space-y-5" onSubmit={(e) => e.preventDefault()}>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold tracking-widest uppercase text-[var(--ink-dim)] mb-2">
            Name
          </label>
          <input
            type="text"
            placeholder="Your name"
            className="w-full px-4 py-3 rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--bg-white)] text-[var(--ink)] text-sm placeholder:text-[var(--ink-dim)] focus:outline-none focus:border-[var(--ink)] transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold tracking-widest uppercase text-[var(--ink-dim)] mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="you@email.com"
            className="w-full px-4 py-3 rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--bg-white)] text-[var(--ink)] text-sm placeholder:text-[var(--ink-dim)] focus:outline-none focus:border-[var(--ink)] transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold tracking-widest uppercase text-[var(--ink-dim)] mb-2">
          Service
        </label>
        <select className="w-full px-4 py-3 rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--bg-white)] text-[var(--ink)] text-sm focus:outline-none focus:border-[var(--ink)] transition-colors">
          <option value="">Select a service…</option>
          <option>Wedding</option>
          <option>Graduation / Portrait</option>
          <option>Event</option>
          <option>Real Estate</option>
          <option>Social Media</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold tracking-widest uppercase text-[var(--ink-dim)] mb-2">
          Message
        </label>
        <textarea
          rows={5}
          placeholder="Tell me about your project, date, and any details…"
          className="w-full px-4 py-3 rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--bg-white)] text-[var(--ink)] text-sm placeholder:text-[var(--ink-dim)] focus:outline-none focus:border-[var(--ink)] transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto px-8 py-3.5 bg-[var(--ink)] text-white text-sm font-medium rounded-full hover:bg-[var(--accent)] transition-colors duration-200"
      >
        Send Message
      </button>
    </form>
  );
}
