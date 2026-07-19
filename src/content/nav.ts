// Single source of truth for site navigation. Header, mobile menu, and footer
// all read from here, so links stay consistent on every page and a destination
// changes in exactly one place.
//
// NOTE: "Portfolio" points to /work until Sub-project B renames the hub to
// /portfolio; at that point, change the three "/work" entries below.

export interface NavItem {
  href: string;
  label: string;
}

/** Primary CTA, rendered separately from the nav lists. */
export const INQUIRE: NavItem = { href: "/inquire", label: "Inquire" };

/** Visible desktop header bar (tight, priority pages only). */
export const HEADER_NAV: NavItem[] = [
  { href: "/work", label: "Portfolio" },
  { href: "/weddings", label: "Weddings" },
  { href: "/investment", label: "Investment" },
  { href: "/about", label: "About" },
];

/** Mobile burger menu (fuller list). */
export const MENU_NAV: NavItem[] = [
  { href: "/work", label: "Portfolio" },
  { href: "/weddings", label: "Weddings" },
  { href: "/experience", label: "Experience" },
  { href: "/investment", label: "Investment" },
  { href: "/about", label: "About" },
  { href: "/free-session", label: "Free Session" },
];

/** Footer "Explore" column. */
export const FOOTER_EXPLORE: NavItem[] = [
  { href: "/work", label: "Portfolio" },
  { href: "/weddings", label: "Weddings" },
  { href: "/second-weddings", label: "Second Weddings" },
  { href: "/free-session", label: "Free Session" },
  { href: "/experience", label: "Experience" },
  { href: "/investment", label: "Investment" },
];

/** Footer "Connect" column, internal links. */
export const FOOTER_CONNECT: NavItem[] = [
  { href: "/about", label: "About" },
  { href: "/inquire", label: "Inquire" },
];

/** Footer socials, external. */
export const SOCIALS: NavItem[] = [
  { href: "http://instagram.com/lei.photography.co", label: "Instagram" },
  { href: "https://www.pinterest.com/LeiPhotographyCo/", label: "Pinterest" },
  { href: "mailto:leiphotography57@gmail.com", label: "Email" },
];
