import type { Metadata } from "next";
import LeiPage from "@/components/lei/LeiPage";
import Chrome from "@/components/lei/Chrome";
import CategoryHeader from "@/components/lei/CategoryHeader";
import CategoryGallery from "@/components/lei/CategoryGallery";
import GalleryCta from "@/components/lei/GalleryCta";
import { GALLERY } from "@/content/gallery";

export const metadata: Metadata = {
  title: "Engagement Galleries",
  description:
    "Bay Area engagement and proposal photography. The nerves before, the question, and the yes.",
};

// Safe: tests/gallery.test.ts asserts this id, so a rename fails the suite
// before it can strand this page.
const CATEGORY = GALLERY.find((c) => c.id === "engagements")!;

export default function EngagementsGalleryPage() {
  return (
    <LeiPage style={{ background: "#0E0D0B", color: "#F7F5F2" }}>
      <Chrome />

      <CategoryHeader label={CATEGORY.label} />
      <CategoryGallery category={CATEGORY} />
      <GalleryCta />
    </LeiPage>
  );
}
