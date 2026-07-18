// Experience-page narrative content, shared with the homepage (which
// transplants the qualifiers and process sections for conversion).

/** The four "You're here because…" self-selection lines. */
export const QUALIFIERS = [
  "You care about fashion, design, and how the whole day feels. You want photos with an editorial eye, not a cookie-cutter shot list.",
  "You've told every photographer “we're not really photo people.” You want to feel at ease and like yourselves, never stiff or over-posed.",
  "You want striking, cinematic portraits without spending the day posing, so you stay present for the moments that matter.",
  "You want a photographer who is calm, organized, and a few steps ahead when the day shifts: someone you can actually trust with it.",
];

export interface ProcessStep {
  n: string;
  title: string;
  body: string;
}

/** Inquire → Connect → Customize → Reserve, as rendered by ProcessSteps.
 *  One copy for home, /experience and /weddings. */
export const PROCESS: ProcessStep[] = [
  { n: "01", title: "Inquire", body: "Start by telling me a bit about what you're envisioning via the inquiry form. This is where your story begins." },
  { n: "02", title: "Connect", body: "We'll get on a call: your venue, your vision, what you're nervous about, and what actually matters to you in the photos." },
  { n: "03", title: "Customize", body: "No two weddings are alike. I'll design a proposal that reflects your priorities, so the experience fits you." },
  { n: "04", title: "Reserve", body: "Date locked, plan started. From here, the photography is handled." },
];

/** Alias kept so existing imports stay valid — the copy is now identical. */
export const HOME_PROCESS = PROCESS;
