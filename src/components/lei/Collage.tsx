import type { CSSProperties, ReactNode } from "react";

/* Editorial collage grid (2026-07-21 spec): 4 equal columns on desktop, 2
   below 860px (globals.css). Row height comes from the grid itself
   (grid-auto-rows in cqw units against the .lx-collage-wrap container),
   not from per-tile aspect ratios, so every seam stays exactly the grid
   gap no matter the gap value or column count. Tiles just span rows and
   columns and stretch to fill; images cover.

   ORIENTATION RULE: portrait natives only in "tall" tiles, landscape
   natives only in "small"/"wide" tiles. Never cross-crop.

   Pages write <img> tags out one by one inside CollageTile so each src is
   a literal string the visual editor can swap. */

export type TileSize = "tall" | "small" | "wide";

const TILE: Record<TileSize, CSSProperties> = {
  tall: { gridRow: "span 2" },
  small: {},
  wide: { gridColumn: "span 2" },
};

export function Collage({ children }: { children: ReactNode }) {
  return (
    <div className="lx-collage-wrap">
      <div className="lx-collage">{children}</div>
    </div>
  );
}

export function CollageTile({
  size,
  children,
}: {
  size: TileSize;
  children: ReactNode;
}) {
  return (
    <div data-fadeup="" className="lx-gitem" style={{ ...TILE[size], marginBottom: 0 }}>
      {children}
    </div>
  );
}
