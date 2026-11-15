/** Unslop creative preview — GSAP ScrollTrigger + Three.js tunnel.
 *  Live `/` is unchanged. Credit: unslop by Damir Sokolovsky (@heydamir), CC BY 4.0.
 */

import type { Metadata } from "next";
import UnslopClient from "./UnslopClient";

export const metadata: Metadata = {
  title: { absolute: "Unslop 3D scroll preview — Lei Photography Collective" },
  description:
    "Creative preview: WebGL photo tunnel scrubbed with GSAP ScrollTrigger. Not the live site.",
  robots: { index: false, follow: false },
};

export default function UnslopPreviewPage() {
  return <UnslopClient />;
}
