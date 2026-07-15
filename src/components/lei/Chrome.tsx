import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { GOLD, SERIF, cream, navLink } from "./tokens";

/* Fixed chrome shared by every Lei page: the custom cursor elements, the
   mix-blend-difference header, and the Weddings hover dropdown. All wiring
   (cursor follow, magnetic Inquire pill, dropdown reveal) happens in the
   motion engine via the data-* attributes. */

type Active = "work" | "weddings" | "about" | undefined;

const activeStyle = {
  borderBottom: "1px solid rgba(255,255,255,.6)",
  paddingBottom: 3,
} as const;

export default function Chrome({ active }: { active?: Active }) {
  return (
    <>
      {/* ══ Custom cursor ══ */}
      <div
        data-cursor-dot=""
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: GOLD,
          zIndex: 200,
          pointerEvents: "none",
          transform: "translate(-100px,-100px)",
        }}
      />
      <div
        data-cursor-ring=""
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 44,
          height: 44,
          borderRadius: "50%",
          border: "1px solid rgba(184,144,90,.9)",
          zIndex: 200,
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: "translate(-100px,-100px)",
        }}
      >
        <span
          data-cursor-label=""
          style={{
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: ".18em",
            textTransform: "uppercase",
            color: GOLD,
            opacity: 0,
            whiteSpace: "nowrap",
          }}
        />
      </div>

      {/* ══ Fixed header ══ */}
      <header
        className="lx-header"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 80,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "26px 38px",
          pointerEvents: "none",
          mixBlendMode: "difference",
          color: "#fff",
        }}
      >
        <Link
          href="/"
          data-hover=""
          className="lx-logo"
          style={{
            pointerEvents: "auto",
            whiteSpace: "nowrap",
            fontFamily: SERIF,
            fontWeight: 600,
            fontSize: 17,
            color: "#fff",
            textDecoration: "none",
          }}
        >
          Lei Photography <em style={{ fontWeight: 400 }}>Collective</em>
        </Link>
        <nav
          className="lx-nav"
          style={{
            display: "flex",
            gap: 28,
            alignItems: "center",
            pointerEvents: "auto",
          }}
        >
          <Link
            href="/work"
            data-hover=""
            style={{ ...navLink(), ...(active === "work" ? activeStyle : null) }}
          >
            Work
          </Link>
          <Link
            href="/weddings"
            data-dd-trigger=""
            data-hover=""
            style={{ ...navLink(), ...(active === "weddings" ? activeStyle : null) }}
          >
            Weddings
          </Link>
          <Link
            href="/about"
            data-hover=""
            style={{ ...navLink(), ...(active === "about" ? activeStyle : null) }}
          >
            About
          </Link>
          <Link
            href="/inquire"
            data-mag=""
            data-hover=""
            style={{
              ...navLink("#0E0D0B"),
              background: "#fff",
              padding: "11px 22px",
              borderRadius: 999,
              display: "inline-block",
            }}
          >
            Inquire
          </Link>
        </nav>
        <MobileMenu />
      </header>

      {/* ══ Weddings dropdown ══ */}
      <div
        data-dd-panel=""
        style={{
          position: "fixed",
          top: 72,
          left: 0,
          zIndex: 81,
          opacity: 0,
          pointerEvents: "none",
          transform: "translateY(10px)",
          background: "#0E0D0B",
          border: `1px solid ${cream(0.16)}`,
          boxShadow: "0 24px 60px rgba(0,0,0,.4)",
          padding: 12,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          minWidth: 240,
        }}
      >
        <span
          style={{
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: ".28em",
            textTransform: "uppercase",
            color: GOLD,
            padding: "8px 14px 10px",
          }}
        >
          Weddings
        </span>
        <Link
          href="/portfolio/weddings"
          data-hover=""
          className="lx-dd-item"
          style={{
            fontFamily: SERIF,
            fontSize: 18,
            fontWeight: 500,
            color: "#F7F5F2",
            textDecoration: "none",
            padding: "12px 14px",
          }}
        >
          The Portfolio
        </Link>
        <Link
          href="/experience"
          data-hover=""
          className="lx-dd-item"
          style={{
            fontFamily: SERIF,
            fontSize: 18,
            fontWeight: 500,
            color: "#F7F5F2",
            textDecoration: "none",
            padding: "12px 14px",
          }}
        >
          Experience
        </Link>
        <Link
          href="/investment"
          data-hover=""
          className="lx-dd-item"
          style={{
            fontFamily: SERIF,
            fontSize: 18,
            fontWeight: 500,
            color: "#F7F5F2",
            textDecoration: "none",
            padding: "12px 14px",
          }}
        >
          Investment
        </Link>
        <Link
          href="/free-session"
          data-hover=""
          className="lx-dd-item"
          style={{
            fontFamily: SERIF,
            fontSize: 18,
            fontWeight: 500,
            color: "#F7F5F2",
            textDecoration: "none",
            padding: "12px 14px",
          }}
        >
          Free Session
        </Link>
      </div>
    </>
  );
}
