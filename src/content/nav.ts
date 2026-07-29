// Single source of truth for site navigation. Header, mobile menu, and footer
// all read from here, so links stay consistent on every page and a destination
// changes in exactly one place.
//
// "Gallery" points to /gallery, the hub for the three category pages
// (/gallery/weddings, /gallery/engagements, /gallery/events). The old
// /portfolio hub and /weddings page both redirect to /gallery.

export interface NavItem {
  href: string;
  label: string;
}

/** A non-clickable nav parent that reveals child links (Weddings). It has a
 *  label but no href of its own. */
export interface NavGroup {
  label: string;
  children: NavItem[];
}

export type NavEntry = NavItem | NavGroup;

export const isGroup = (e: NavEntry): e is NavGroup => "children" in e;

/** Primary CTA, rendered separately from the nav lists. */
export const INQUIRE: NavItem = { href: "/inquire", label: "Inquire" };

/** Items under the "Weddings" nav group. The "Weddings" parent itself is NOT a
 *  link: on desktop it is a hover dropdown, on mobile a tap-to-expand section.
 *
 *  Events is deliberately absent. The only slot for it here is under a
 *  "Weddings" parent, which would be plainly wrong for event work. /gallery is
 *  the index for all three categories. */
export const WEDDINGS_MENU: NavItem[] = [
  { href: "/gallery/engagements", label: "Engagements" },
  { href: "/experience", label: "Experience" },
  { href: "/second-weddings", label: "Second Weddings" },
  { href: "/free-session", label: "Free Session" },
];

/** Primary navigation, shared by the desktop header bar and the mobile burger
 *  menu. Weddings is a group (not clickable); the rest are direct links. */
export const PRIMARY_NAV: NavEntry[] = [
  { href: "/gallery", label: "Gallery" },
  { label: "Weddings", children: WEDDINGS_MENU },
  { href: "/investment", label: "Investment" },
  { href: "/about", label: "About" },
];

/** Footer "Explore" column. Footers stay flat, so the nav group is expanded
 *  into plain links here. */
export const FOOTER_EXPLORE: NavItem[] = [
  { href: "/gallery", label: "Gallery" },
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
