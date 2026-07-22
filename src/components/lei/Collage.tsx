import type { ReactNode } from "react";

/* Editorial collage: masonry via CSS columns (globals.css), 4 columns on
   desktop, 2 below 860px. Every image renders at its native aspect
   ratio, never cropped, and stacks tightly down its column like a
   Squarespace portfolio grid. Tiles flow column-major, so source order
   reads down each column, not across rows.

   The `size` prop is kept so existing pages compile, but it no longer
   changes layout.

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
    <div data-fadeup="" className="lx-gitem">
      {children}
    </div>
  );
}
