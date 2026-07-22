import type { CSSProperties, ReactNode } from "react";

/* Editorial collage grid (2026-07-21 spec): 4 equal columns on desktop, 2
   below 860px (globals.css). Every tile declares its own aspect ratio so
   rows auto-size consistently at any column count.

   The ratios are coupled to the 2px grid gap: a 2/3 tall must equal two
   stacked smalls plus one seam, so smalls are 4/3 (2 x 3/4 = 3/2 height)
   and the 2-column wide is 8/3 (height of one small row). Changing one
   ratio or the gap means re-deriving the others, or seams reopen.

   ORIENTATION RULE: portrait natives only in "tall" tiles, landscape
   natives only in "small"/"wide" tiles. Never cross-crop.

   Pages write <img> tags out one by one inside CollageTile so each src is
   a literal string the visual editor can swap. */

export type TileSize = "tall" | "small" | "wide";

const TILE: Record<TileSize, CSSProperties> = {
  tall: { gridRow: "span 2", aspectRatio: "2 / 3" },
  small: { aspectRatio: "4 / 3" },
  wide: { gridColumn: "span 2", aspectRatio: "8 / 3" },
};

export function Collage({ children }: { children: ReactNode }) {
  return <div className="lx-collage">{children}</div>;
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
