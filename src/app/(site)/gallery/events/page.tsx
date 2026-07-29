import type { Metadata } from "next";
import LeiPage from "@/components/lei/LeiPage";
import Chrome from "@/components/lei/Chrome";
import CategoryHeader from "@/components/lei/CategoryHeader";
import CategoryGallery from "@/components/lei/CategoryGallery";
import GalleryCta from "@/components/lei/GalleryCta";
import { GALLERY } from "@/content/gallery";

export const metadata: Metadata = {
  title: "Event Galleries",
  description:
    "Bay Area event photography: galas, mixers, panels and award nights, shot so the room still looks like itself.",
};

// Safe: tests/gallery.test.ts asserts this id, so a rename fails the suite
// before it can strand this page.
const CATEGORY = GALLERY.find((c) => c.id === "events")!;

export default function EventsGalleryPage() {
  return (
    <LeiPage style={{ background: "#0E0D0B", color: "#F7F5F2" }}>
      <Chrome />

      <CategoryHeader label={CATEGORY.label} />
      <CategoryGallery category={CATEGORY} />
      <GalleryCta />
    </LeiPage>
  );
}
