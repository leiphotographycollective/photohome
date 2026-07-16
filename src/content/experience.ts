// Experience-page narrative content, shared with the homepage (which
// transplants the qualifiers and process sections for conversion).

/** The four "You're here because…" self-selection lines. */
export const QUALIFIERS = [
  "You want a photographer you can trust with the day — someone calm, prepared, and impossible to rattle.",
  "You've said “we're not photo people” on every photographer call. You want to feel at ease, not posed.",
  "You want the day back the way it felt — not a performance of it.",
  "You care about how things look. You want a photographer who does too — and who's already planned for it.",
];

export interface ProcessStep {
  n: string;
  title: string;
  body: string;
}

/** Inquire → Connect → Customize → Reserve, as rendered by ProcessSteps. */
export const PROCESS: ProcessStep[] = [
  { n: "01", title: "Inquire", body: "Start by telling me a bit about what you're envisioning via the inquiry form. This is where your story begins." },
  { n: "02", title: "Connect", body: "We'll get on a call — your venue, your vision, what you're nervous about, and what actually matters to you in the photos." },
  { n: "03", title: "Customize", body: "No two milestones are alike. I'll design a proposal that reflects your priorities, so the experience fits you." },
  { n: "04", title: "Reserve", body: "Date locked, plan started. From here, the photography is handled." },
];

/** Homepage variant — identical except step 03 speaks weddings, not milestones. */
export const HOME_PROCESS: ProcessStep[] = PROCESS.map((s) =>
  s.n === "03"
    ? {
        ...s,
        body: "No two weddings are alike. I'll design a proposal that reflects your priorities, so the experience fits you.",
      }
    : s
);
