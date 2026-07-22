// Single source of truth for the /links page (the QR-code landing page on
// the business card). Order matters: it is the order the buttons render in.

import { BUSINESS } from "@/content/site";

export interface PageLink {
  href: string;
  label: string;
  /** External links open in a new tab. Internal links stay in-app. */
  external?: boolean;
}

export const LINKS: PageLink[] = [
  { href: BUSINESS.instagram, label: "Instagram", external: true },
  // Facebook: uncomment and drop the page URL in when it's ready.
  // { href: "https://facebook.com/REPLACE_ME", label: "Facebook", external: true },
  { href: "/", label: "Website" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/free-session", label: "Win a Free Session" },
  { href: "/inquire", label: "Inquire" },
];
