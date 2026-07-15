import Link from "next/link";
import { GOLD, SERIF, cream, navLink } from "./tokens";

/* Site footer, as designed on the dark sections of every prototype page.
   `brand` switches between the Collective lockup (home / work / weddings /
   inquire / galleries) and the personal Raymond Lei lockup (about /
   experience). `links` picks which nav items appear. */

const NAV: Record<string, { href: string; label: string }> = {
  home: { href: "/", label: "Home" },
  work: { href: "/work", label: "Work" },
  weddings: { href: "/weddings", label: "Weddings" },
  about: { href: "/about", label: "About" },
  inquire: { href: "/inquire", label: "Inquire" },
};

interface LeiFooterProps {
  brand?: "collective" | "raymond";
  links?: Array<keyof typeof NAV>;
  /** Top hairline above the footer (home / work / weddings). */
  border?: boolean;
  /** Padding shorthand override (e.g. project page uses "0 0 40px"). */
  padding?: string;
}

export default function LeiFooter({
  brand = "collective",
  links = ["home", "work", "weddings", "inquire"],
  border = true,
  padding = "56px 0 40px",
}: LeiFooterProps) {
  const blurb =
    brand === "raymond"
      ? "Raymond Lei photographs editorial, fashion-influenced weddings, engagements, and portraits for fun, stylish couples in the San Francisco Bay Area."
      : "Editorial wedding photography for fun, stylish couples in the San Francisco Bay Area & beyond — weddings, couples, engagements, and events.";
  return (
    <footer
      style={{
        borderTop: border ? `1px solid ${cream(0.12)}` : undefined,
        padding,
        display: "flex",
        flexDirection: "column",
        gap: 36,
        textAlign: "left",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 28,
        }}
      >
        <div
          style={{
            maxWidth: 360,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <span
            style={{
              fontFamily: SERIF,
              fontWeight: 600,
              fontSize: 20,
              color: "#F7F5F2",
            }}
          >
            {brand === "raymond" ? (
              <>
                Raymond <em style={{ fontWeight: 400 }}>Lei</em>
              </>
            ) : (
              <>
                Lei Photography <em style={{ fontWeight: 400 }}>Collective</em>
              </>
            )}
          </span>
          <p
            style={{
              margin: 0,
              fontSize: 13,
              lineHeight: 1.7,
              color: cream(0.55),
            }}
          >
            {blurb}
          </p>
        </div>
        <nav style={{ display: "flex", gap: 26, alignItems: "center" }}>
          {links.map((k) => (
            <Link
              key={k}
              href={NAV[k].href}
              data-hover=""
              style={navLink(cream(0.75))}
            >
              {NAV[k].label}
            </Link>
          ))}
        </nav>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
          borderTop: `1px solid ${cream(0.08)}`,
          paddingTop: 24,
        }}
      >
        <span
          style={{
            fontSize: 11,
            letterSpacing: ".14em",
            textTransform: "uppercase",
            color: cream(0.4),
          }}
        >
          © 2026 Lei Photography Collective
        </span>
        <div style={{ display: "flex", gap: 22, alignItems: "center" }}>
          <a
            href="http://instagram.com/lei.photography.co"
            data-hover=""
            style={{
              fontSize: 11,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: GOLD,
              textDecoration: "none",
            }}
          >
            Instagram
          </a>
          <a
            href="https://www.pinterest.com/LeiPhotographyCo/"
            data-hover=""
            style={{
              fontSize: 11,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: GOLD,
              textDecoration: "none",
            }}
          >
            Pinterest
          </a>
          <a
            href="mailto:leiphotography57@gmail.com"
            data-hover=""
            style={{
              fontSize: 11,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: GOLD,
              textDecoration: "none",
            }}
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
