"use client";

import UnslopScrollExperience from "@/components/lei/unslop/UnslopScrollExperience";

/** Client-only mount for the GSAP + Three preview (keeps Three out of the RSC tree). */
export default function UnslopClient() {
  return <UnslopScrollExperience />;
}
