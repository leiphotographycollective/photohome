import type { CSSProperties, ReactNode } from "react";

/* Editorial collage grid: 4 equal columns on desktop, 2 below 860px
   (globals.css). Every image renders at its native aspect ratio, never
   cropped, so row bottoms are intentionally uneven; tiles top-align.

   The `size` prop is kept so existing pages compile, but it no longer
   changes layout — each tile is one cell.

   Pages write <img> tags out one by one inside CollageTile so each src is
   a literal string the visual editor can swap. */

export type TileSize = "tall" | "small" | "wide";

export function Collage({ children }: { children: ReactNode }) {
  return <div className="lx-collage">{children}</div>;
}

export function CollageTile({
  children,
}: {
  size?: TileSize;
  children: ReactNode;
}) {
  return (
    <div data-fadeup="" className="lx-gitem" style={{ marginBottom: 0 }}>
      {children}
    </div>
  );
}
