import type { ReactNode } from "react";

/* Editorial collage: masonry via CSS columns (globals.css), 4 columns on
   desktop, 2 below 860px. Every image renders at its native aspect
   ratio, never cropped, and stacks tightly down its column like a
   Squarespace portfolio grid. Tiles flow column-major, so source order
   reads down each column, not across rows.

   The `size` prop is kept so existing pages compile, but it no longer
   changes layout.

   Most pages write <img> tags out one by one inside CollageTile so each src
   is a literal string the visual editor can swap. /gallery is the exception:
   its three grids are data-driven, so their swap surface is
   src/content/gallery.ts.

   `columns` lets a sparse grid drop below the default 4 so a category with
   one or two photos doesn't leave empty columns beside it. */

export type TileSize = "tall" | "small" | "wide";

export function Collage({
  columns,
  children,
}: {
  columns?: 1 | 2 | 3 | 4;
  children: ReactNode;
}) {
  const cls =
    columns && columns < 4 ? `lx-collage lx-collage-${columns}` : "lx-collage";
  return <div className={cls}>{children}</div>;
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
