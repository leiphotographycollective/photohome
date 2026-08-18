import type { Metadata } from "next";
import LeiPage from "@/components/lei/LeiPage";
import Chrome from "@/components/lei/Chrome";
import CategoryHeader from "@/components/lei/CategoryHeader";
import CategoryGallery, {
  GallerySet,
} from "@/components/lei/CategoryGallery";
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
      <CategoryGallery blurb={ENGAGEMENTS_BLURB}>
        <GallerySet id="jake-priscilla" name="Jake & Priscilla" first columns={4}>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.squarespace-cdn.com/content/v1/697c1d6344a3b1154bcbc39e/fd9815f2-39b8-476e-9b16-bbf4d9b863ea/Lei.Photography.Co-JakeProposalReEdit-09.jpg?format=1200w"
              alt="The proposal, the moment of yes"
              loading="lazy"
              style={frame("1.5")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/engagements/jake-priscilla/jake-priscilla-01.jpg"
              alt="Black-and-white shot of him on one knee holding out the ring box as she covers her mouth in surprise, the twin sea stacks behind them"
              loading="lazy"
              style={frame("1.5004")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/engagements/jake-priscilla/jake-priscilla-02.jpg"
              alt="Close-up of their clasped hands as they kiss, her new ring catching the light between his fingers"
              loading="lazy"
              style={frame("0.6665")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/engagements/jake-priscilla/jake-priscilla-03.jpg"
              alt="They kiss as she holds her ring hand out to the camera, her hair blown across her face, the bluff-top building soft behind them"
              loading="lazy"
              style={frame("1.5004")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/engagements/jake-priscilla/jake-priscilla-04.jpg"
              alt="She laughs with her hand on his shoulder, her new ring and gold bracelet on display, the ocean and sea stacks behind them"
              loading="lazy"
              style={frame("0.6665")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/engagements/jake-priscilla/jake-priscilla-05.jpg"
              alt="Portrait of the newly engaged couple smiling at the camera, her ring hand resting on his chest, the rocky coastline behind them"
              loading="lazy"
              style={frame("0.6665")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/engagements/jake-priscilla/jake-priscilla-06.jpg"
              alt="Couple standing close together at the edge of the old bath ruins, the cliffside building perched on the bluff behind them"
              loading="lazy"
              style={frame("0.6665")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/engagements/jake-priscilla/jake-priscilla-07.jpg"
              alt="Wide shot of the couple embracing on the seawall, the twin sea stacks and crashing surf filling the frame behind them"
              loading="lazy"
              style={frame("1.5004")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/engagements/jake-priscilla/jake-priscilla-08.jpg"
              alt="Wide shot of the couple standing hand in hand at the edge of the ruins, their reflection in the still water below, sea stacks in the distance"
              loading="lazy"
              style={frame("0.6665")}
            />
          </CollageTile>
        </GallerySet>
        <GallerySet id="lisa-ricky" name="Lisa & Ricky" columns={4}>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/engagements/lisa-ricky/lisa-ricky-01.jpg"
              alt="Man and woman standing face to face on a coastal bluff, a plaid picnic blanket and champagne laid out at their feet, waves breaking below"
              loading="lazy"
              style={frame("0.6665")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/engagements/lisa-ricky/lisa-ricky-02.jpg"
              alt="Man kneeling on one knee on the picnic blanket, holding the woman's hand mid-proposal above the shoreline"
              loading="lazy"
              style={frame("0.6665")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/engagements/lisa-ricky/lisa-ricky-03.jpg"
              alt="The newly engaged couple kissing on the bluff, her taupe wrap around her shoulders, the tide rolling in behind them"
              loading="lazy"
              style={frame("0.6665")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/engagements/lisa-ricky/lisa-ricky-04.jpg"
              alt="Couple embracing face to face on the cliffside path, a concrete piling and the fogged-in ocean behind them"
              loading="lazy"
              style={frame("0.6665")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/engagements/lisa-ricky/lisa-ricky-05.jpg"
              alt="Couple seated on the picnic blanket toasting with champagne flutes, she's laughing, the rocky shoreline spread out behind them"
              loading="lazy"
              style={frame("0.6665")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/engagements/lisa-ricky/lisa-ricky-06.jpg"
              alt="Couple seated back to camera on the blanket, raising champagne glasses in a toast over the fog-covered coast"
              loading="lazy"
              style={frame("0.6665")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/engagements/lisa-ricky/lisa-ricky-07.jpg"
              alt="Wide view of the couple seated cross-legged on the picnic blanket, glasses raised, dwarfed by the cliffs and open water"
              loading="lazy"
              style={frame("1.5004")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/engagements/lisa-ricky/lisa-ricky-08.jpg"
              alt="Couple kissing seated on the blanket, backs to camera, a concrete piling rising from the water behind them"
              loading="lazy"
              style={frame("0.6665")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/engagements/lisa-ricky/lisa-ricky-09.jpg"
              alt="Couple seated close on the blanket, champagne bottle and wildflowers beside them, sea cliffs rising in the distance"
              loading="lazy"
              style={frame("0.7505")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/engagements/lisa-ricky/lisa-ricky-10.jpg"
              alt="Couple kissing on the blanket, the champagne bottle resting in the grass beside them, a sea stack framed over her shoulder"
              loading="lazy"
              style={frame("0.7505")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/engagements/lisa-ricky/lisa-ricky-11.jpg"
              alt="Close portrait of the couple cheek to cheek, she holds two champagne flutes and smiles past the camera"
              loading="lazy"
              style={frame("0.7505")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/engagements/lisa-ricky/lisa-ricky-12.jpg"
              alt="Close portrait of the couple forehead to forehead, her new engagement ring catching the light on her champagne glass"
              loading="lazy"
              style={frame("0.7505")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/engagements/lisa-ricky/lisa-ricky-13.jpg"
              alt="He kisses her cheek as she laughs, her new ring bright against the stem of her champagne flute"
              loading="lazy"
              style={frame("0.6665")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/engagements/lisa-ricky/lisa-ricky-14.jpg"
              alt="The couple cheek to cheek, her eyes closed and laughing, her ring hand resting on his chest"
              loading="lazy"
              style={frame("0.7505")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/engagements/lisa-ricky/lisa-ricky-15.jpg"
              alt="Macro detail of the new engagement ring on her hand, resting against his checked shirt"
              loading="lazy"
              style={frame("0.6665")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/engagements/lisa-ricky/lisa-ricky-16.jpg"
              alt="Couple seated on the blanket embracing, her arm around his neck and her ring catching the light at his collar"
              loading="lazy"
              style={frame("1.4993")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/engagements/lisa-ricky/lisa-ricky-17.jpg"
              alt="Couple laughing together on the blanket, her arms around his neck, the tide pools spread out below"
              loading="lazy"
              style={frame("0.7505")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/engagements/lisa-ricky/lisa-ricky-18.jpg"
              alt="Close portrait of the couple foreheads touching, both laughing, her hair loose in the wind"
              loading="lazy"
              style={frame("0.7505")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/engagements/lisa-ricky/lisa-ricky-19.jpg"
              alt="Macro shot of champagne being poured into her flute, her engagement ring caught in the foreground"
              loading="lazy"
              style={frame("0.7505")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/engagements/lisa-ricky/lisa-ricky-20.jpg"
              alt="Couple seated close together, her ring hand resting on his chest as they laugh, sea stacks offshore behind them"
              loading="lazy"
              style={frame("0.6665")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/engagements/lisa-ricky/lisa-ricky-21.jpg"
              alt="Couple embracing from behind on the concrete overlook, her ring hand on his shoulder, sea stacks out past the point"
              loading="lazy"
              style={frame("0.7505")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/engagements/lisa-ricky/lisa-ricky-22.jpg"
              alt="Couple standing together on the ruined seawall, arms wrapped around each other, the open ocean behind them"
              loading="lazy"
              style={frame("0.7505")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/engagements/lisa-ricky/lisa-ricky-23.jpg"
              alt="Couple kissing at the edge of the seawall, champagne glasses in hand, the graffitied ruins below"
              loading="lazy"
              style={frame("0.7505")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/engagements/lisa-ricky/lisa-ricky-24.jpg"
              alt="Couple laughing together at the edge of the seawall, holding champagne, the coastline curving away behind them"
              loading="lazy"
              style={frame("0.7505")}
            />
          </CollageTile>
        </GallerySet>
      </CategoryGallery>
      <GalleryCta />
    </LeiPage>
  );
}
