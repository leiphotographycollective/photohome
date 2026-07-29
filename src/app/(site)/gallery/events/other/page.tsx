import type { Metadata } from "next";
import LeiPage from "@/components/lei/LeiPage";
import Chrome from "@/components/lei/Chrome";
import CategoryHeader from "@/components/lei/CategoryHeader";
import CategoryGallery, { GalleryGrid } from "@/components/lei/CategoryGallery";
import GalleryCta from "@/components/lei/GalleryCta";
import Lightbox from "@/components/lei/Lightbox";
import { CollageTile } from "@/components/lei/Collage";
import { frame } from "@/components/lei/frame";
import { EVENTS } from "@/content/events";

export const metadata: Metadata = {
  title: "Other Events Gallery",
  description:
    "Two smaller nights that did not need a section of their own: a mansion evening and an Assyrian Advisors panel.",
};

const event = EVENTS.find((e) => e.id === "other")!;

/* Every src below is a literal string so the visual editor can swap it. */
export default function OtherEventsPage() {
  return (
    <LeiPage style={{ background: "#0E0D0B", color: "#F7F5F2" }}>
      <Chrome />

      <CategoryHeader label="Other" backHref="/gallery/events" backLabel="Events" />
      <CategoryGallery blurb={event.blurb}>
        <Lightbox>
          <GalleryGrid columns={4}>
            <CollageTile>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/events/other/other-01.jpg"
                alt="A woman in a flowing blush top and skirt raises both arms overhead while posing against a carved wooden doorway with a staircase behind her"
                loading="lazy"
                style={frame("0.6668")}
              />
            </CollageTile>
            <CollageTile>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/events/other/other-02.jpg"
                alt="A speaker in a navy dress addresses a seated audience in a red walled mansion ballroom beside a projection screen showing a statue of Gilgamesh"
                loading="lazy"
                style={frame("1.4996")}
              />
            </CollageTile>
            <CollageTile>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/events/other/other-03.jpg"
                alt="A couple in a beaded blue gown and black tuxedo hold glasses of red wine on a garden terrace overlooking wooded hills at dusk"
                loading="lazy"
                style={frame("1.4996")}
              />
            </CollageTile>
            <CollageTile>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/events/other/other-04.jpg"
                alt="A man in a beige blazer gestures mid conversation with a woman in a white crochet top on an outdoor patio in front of a Tudor style building"
                loading="lazy"
                style={frame("1.4996")}
              />
            </CollageTile>
            <CollageTile>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/events/other/other-05.jpg"
                alt="Two women share a laugh with a host holding out a microphone in front of an Assyrian Advisors backdrop in a glass walled office"
                loading="lazy"
                style={frame("1.3333")}
              />
            </CollageTile>
            <CollageTile>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/events/other/other-06.jpg"
                alt="Three colleagues wearing name badges pose together in an office lobby with floor to ceiling windows behind them"
                loading="lazy"
                style={frame("1.3333")}
              />
            </CollageTile>
            <CollageTile>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/events/other/other-07.jpg"
                alt="Three panelists sit on stools in front of an Assyrian Advisors backdrop as one speaks into a microphone overlooking the city skyline"
                loading="lazy"
                style={frame("1.3333")}
              />
            </CollageTile>
          </GalleryGrid>
        </Lightbox>
      </CategoryGallery>
      <GalleryCta />
    </LeiPage>
  );
}
