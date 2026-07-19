import Link from "next/link";
import { GOLD, SERIF, cream, kicker, navLink } from "./tokens";
import { FOOTER_EXPLORE, FOOTER_CONNECT, SOCIALS } from "@/content/nav";

/* Site footer, identical on every page. `brand` switches between the Collective
   lockup (default) and the personal Raymond Lei lockup (about / experience).
   Links come from the shared nav config so no page can drift or orphan a page. */

interface LeiFooterProps {
  brand?: "collective" | "raymond";
  /** Top hairline above the footer. */
  border?: boolean;
  /** Padding shorthand override (e.g. project page uses "0 0 40px"). */
  padding?: string;
}

export default function LeiFooter({
  brand = "collective",
  border = true,
  padding = "56px 0 40px",
}: LeiFooterProps) {
  const blurb =
    brand === "raymond"
      ? "Raymond Lei photographs editorial, fashion-influenced weddings, engagements, and portraits for fun, stylish couples in the San Francisco Bay Area."
      : "Editorial wedding photography for fun, stylish couples in the San Francisco Bay Area & beyond: weddings, couples, engagements, and events.";

  const col = (title: string, items: typeof FOOTER_EXPLORE) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={kicker({}, 10, ".24em")}>{title}</div>
      {items.map((i) => (
        <Link key={i.href} href={i.href} data-hover="" style={navLink(cream(0.75))}>
          {i.label}
        </Link>
      ))}
    </div>
  );

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
          gap: 40,
        }}
      >
        <div style={{ maxWidth: 340, display: "flex", flexDirection: "column", gap: 14 }}>
          <span style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 20, color: "#F7F5F2" }}>
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
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: cream(0.55) }}>
            {blurb}
          </p>
          <span
            style={{
              marginTop: 6,
              fontSize: 11,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: GOLD,
            }}
          >
            Now booking 2026 &amp; 2027 weddings
          </span>
        </div>

        <div style={{ display: "flex", gap: "clamp(40px,7vw,96px)", flexWrap: "wrap" }}>
          {col("Explore", FOOTER_EXPLORE)}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={kicker({}, 10, ".24em")}>Connect</div>
            {FOOTER_CONNECT.map((i) => (
              <Link key={i.href} href={i.href} data-hover="" style={navLink(cream(0.75))}>
                {i.label}
              </Link>
            ))}
            {SOCIALS.map((s) => (
              <a key={s.href} href={s.href} data-hover="" style={navLink(GOLD)}>
                {s.label}
              </a>
            ))}
          </div>
        </div>
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
      </div>
    </footer>
  );
}
