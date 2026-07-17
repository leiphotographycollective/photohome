"use client";

import { useEffect, useState, type CSSProperties, type FormEvent } from "react";
import { GOLD, MUTED, SERIF, cream, pill } from "./tokens";

/* Lead-capture form for the free-engagement-session ad funnel. Submits to
   Formspree via fetch (no page reload) and swaps to a success card.
   ── TO CONNECT: replace FORMSPREE_ENDPOINT below with your own form's
   endpoint from formspree.io (Tools → New form → copy the "action" URL). */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/REPLACE_ME";

const inputStyle: CSSProperties = {
  width: "100%",
  padding: "15px 16px",
  fontFamily: "var(--font-dm-sans), sans-serif",
  fontSize: 16,
  color: "#0E0D0B",
  background: "#F7F5F2",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-sm)",
  minHeight: 52,
};

const labelStyle: CSSProperties = {
  display: "block",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: ".2em",
  textTransform: "uppercase",
  color: "#0E0D0B",
  marginBottom: 9,
};

const textareaStyle: CSSProperties = {
  ...inputStyle,
  minHeight: 160,
  padding: "16px",
  lineHeight: 1.6,
  resize: "vertical",
};

/* UTM params from the Meta ad click are carried into the form as hidden
   fields so the notification email shows which ad drove the entry. */
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

export default function FreeSessionForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [noDateYet, setNoDateYet] = useState(false);
  const [utm, setUtm] = useState<Record<string, string>>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const found: Record<string, string> = {};
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) found[key] = value;
    }
    setUtm(found);
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(e.currentTarget),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("Formspree returned an error");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        data-fadeup=""
        style={{
          maxWidth: 560,
          margin: "0 auto",
          textAlign: "center",
          padding: "56px 28px",
          background: "#FFFFFF",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
        }}
      >
        <div style={{ color: GOLD, letterSpacing: ".4em", fontSize: 12, marginBottom: 18 }}>
          ★ ★ ★
        </div>
        <h3
          style={{
            margin: 0,
            fontFamily: SERIF,
            fontWeight: 500,
            fontSize: "clamp(26px,5vw,34px)",
          }}
        >
          You&rsquo;re entered!
        </h3>
        <p style={{ maxWidth: 400, margin: "12px auto 0", color: MUTED, lineHeight: 1.7 }}>
          I read every story myself. If yours is one of the 4 I pick this
          month, I&rsquo;ll email you within a few days to schedule your
          session. Congratulations on your engagement!
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: 560, margin: "0 auto" }}>
      <div
        className="lx-grid-2col"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, marginBottom: 22 }}
      >
        <div>
          <label htmlFor="fs-name1" style={labelStyle}>
            Your first name
          </label>
          <input id="fs-name1" name="Your first name" type="text" autoComplete="given-name" required style={inputStyle} />
        </div>
        <div>
          <label htmlFor="fs-name2" style={labelStyle}>
            Partner&rsquo;s first name
          </label>
          <input id="fs-name2" name="Partner's first name" type="text" required style={inputStyle} />
        </div>
      </div>

      <div style={{ marginBottom: 22 }}>
        <label htmlFor="fs-email" style={labelStyle}>
          Email
        </label>
        <input id="fs-email" name="email" type="email" autoComplete="email" required style={inputStyle} />
      </div>

      <div style={{ marginBottom: 22 }}>
        <label htmlFor="fs-phone" style={labelStyle}>
          Phone
        </label>
        <input id="fs-phone" name="Phone" type="tel" autoComplete="tel" required style={inputStyle} />
      </div>

      <div style={{ marginBottom: 22 }}>
        <label htmlFor="fs-date" style={labelStyle}>
          Wedding date
        </label>
        <input
          id="fs-date"
          name="Wedding date"
          type="date"
          disabled={noDateYet}
          style={inputStyle}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10 }}>
          <input
            id="fs-nodate"
            name="No date yet"
            type="checkbox"
            value="We haven't set a date yet"
            checked={noDateYet}
            onChange={(e) => setNoDateYet(e.target.checked)}
            style={{ width: 20, height: 20, accentColor: GOLD }}
          />
          <label htmlFor="fs-nodate" style={{ fontSize: 14, color: MUTED, margin: 0 }}>
            We haven&rsquo;t set a date yet
          </label>
        </div>
      </div>

      <div style={{ marginBottom: 30 }}>
        <label htmlFor="fs-location" style={labelStyle}>
          Wedding or engagement location
        </label>
        <input
          id="fs-location"
          name="Location"
          type="text"
          placeholder="e.g. San José, Half Moon Bay, venue TBD…"
          required
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: 30 }}>
        <label htmlFor="fs-story" style={labelStyle}>
          Tell us your story
        </label>
        <textarea
          id="fs-story"
          name="Your story"
          placeholder="How'd you two meet? How did the proposal happen? What makes your relationship, your relationship? (A few sentences is plenty.)"
          required
          style={textareaStyle}
        />
      </div>

      {/* honeypot spam trap */}
      <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
      <input type="hidden" name="_subject" value="New Free Engagement Session Giveaway Entry" />
      {UTM_KEYS.map((key) =>
        utm[key] ? <input key={key} type="hidden" name={key} value={utm[key]} /> : null
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        data-hover=""
        style={{
          ...pill("#0E0D0B", "#F7F5F2", "21px 34px"),
          width: "100%",
          border: "none",
          fontSize: 13,
          cursor: status === "sending" ? "wait" : "pointer",
          opacity: status === "sending" ? 0.7 : 1,
        }}
      >
        {status === "sending" ? "Sending…" : "Submit My Entry"}
      </button>

      {status === "error" && (
        <p style={{ marginTop: 18, textAlign: "center", fontSize: 15, color: "#A33A2A" }}>
          Something went wrong sending your message. Please try again, or email me
          directly at{" "}
          <a href="mailto:leiphotography57@gmail.com" style={{ color: "#A33A2A" }}>
            leiphotography57@gmail.com
          </a>
          .
        </p>
      )}

      <p style={{ textAlign: "center", fontSize: 13, color: "#9C9490", marginTop: 16 }}>
        Your details go only to me. Never sold, never spammed.
      </p>
    </form>
  );
}
