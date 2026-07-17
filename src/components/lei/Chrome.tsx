import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { DIM, GOLD } from "./tokens";

/* Fixed chrome shared by every Lei page: the custom cursor elements and a
   solid header bar — centered wordmark, burger menu on the right at every
   width. Cursor wiring happens in the motion engine via data-* attributes. */

export default function Chrome() {
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

      {/* ══ Fixed header — centered wordmark, burger right ══ */}
      <header
        className="lx-header"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 80,
          height: "var(--lx-header-h)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 38px",
          background: "#F7F5F2",
          borderBottom: "1px solid rgba(14,13,11,.08)",
          color: "#0E0D0B",
        }}
      >
        <Link
          href="/"
          data-hover=""
          className="lx-logo"
          style={{
            whiteSpace: "nowrap",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: ".16em",
            textTransform: "uppercase",
            color: "#0E0D0B",
            textDecoration: "none",
          }}
        >
          Lei Photography{" "}
          <span style={{ fontWeight: 400, color: DIM }}>Collective</span>
        </Link>
        <div
          style={{
            position: "absolute",
            right: 30,
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <MobileMenu />
        </div>
      </header>
    </>
  );
}
