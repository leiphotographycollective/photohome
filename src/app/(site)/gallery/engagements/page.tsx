import type { Metadata } from "next";
import LeiPage from "@/components/lei/LeiPage";
import Chrome from "@/components/lei/Chrome";
import CategoryHeader from "@/components/lei/CategoryHeader";
import CategoryGallery, { GalleryGrid } from "@/components/lei/CategoryGallery";
import GalleryCta from "@/components/lei/GalleryCta";
import { CollageTile } from "@/components/lei/Collage";
import { frame } from "@/components/lei/frame";
import { ENGAGEMENTS_BLURB } from "@/content/gallery";

export const metadata: Metadata = {
  title: "Engagement Galleries",
  description:
    "Bay Area engagement and proposal photography. The nerves before, the question, and the yes.",
};

/* Every src below is a literal string so the visual editor can swap it. */
export default function EngagementsGalleryPage() {
  return (
    <LeiPage style={{ background: "#0E0D0B", color: "#F7F5F2" }}>
      <Chrome />

      <CategoryHeader label="Engagements" />
      <CategoryGallery blurb={ENGAGEMENTS_BLURB} cap={560}>
        <GalleryGrid columns={1}>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.squarespace-cdn.com/content/v1/697c1d6344a3b1154bcbc39e/fd9815f2-39b8-476e-9b16-bbf4d9b863ea/Lei.Photography.Co-JakeProposalReEdit-09.jpg?format=1200w"
              alt="The proposal, the moment of yes"
              loading="lazy"
              style={frame("1.5")}
            />
          </CollageTile>
        </GalleryGrid>
      </CategoryGallery>
      <GalleryCta />
    </LeiPage>
  );
}
