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
  title: "SJSU PD Emmys Gallery",
  description:
    "An Emmy awards night for the San Jose State University Police Department: the statuettes, the speeches and the room in between.",
};

const event = EVENTS.find((e) => e.id === "sjsu-pd-emmys")!;

/* Every src below is a literal string so the visual editor can swap it. */
export default function SjsuPdEmmysEventPage() {
  return (
    <LeiPage style={{ background: "#0E0D0B", color: "#F7F5F2" }}>
      <Chrome />

      <CategoryHeader label="SJSU PD Emmys" backHref="/gallery/events" backLabel="Events" />
      <CategoryGallery blurb={event.blurb}>
        <Lightbox>
          <GalleryGrid columns={4}>
            <CollageTile>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/events/sjsu-pd-emmys/sjsu-pd-emmys-01.jpg"
                alt="An award recipient in a suit and mint tie laughs while cradling his Emmy statuette at the podium, a gold curtain behind him"
                loading="lazy"
                style={frame("0.7505")}
              />
            </CollageTile>
            <CollageTile>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/events/sjsu-pd-emmys/sjsu-pd-emmys-02.jpg"
                alt="An award recipient speaks into the microphone at the podium, his Emmy statuette resting on the lectern in front of a lit blue curtain and a California State University Police badge backdrop"
                loading="lazy"
                style={frame("0.6668")}
              />
            </CollageTile>
            <CollageTile>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/events/sjsu-pd-emmys/sjsu-pd-emmys-03.jpg"
                alt="A row of seated guests laugh together during the ceremony, one holding up her phone to capture the moment"
                loading="lazy"
                style={frame("1.4996")}
              />
            </CollageTile>
            <CollageTile>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/events/sjsu-pd-emmys/sjsu-pd-emmys-04.jpg"
                alt="Two men share a laugh on stage, one gesturing out to the crowd, in front of an SJSU San Jose State University police badge backdrop"
                loading="lazy"
                style={frame("1.3324")}
              />
            </CollageTile>
            <CollageTile>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/events/sjsu-pd-emmys/sjsu-pd-emmys-05.jpg"
                alt="Ten award recipients and officers pose in a row on stage holding their Emmy statuettes, flanked by the American and California flags in front of a California State University Police backdrop"
                loading="lazy"
                style={frame("1.4996")}
              />
            </CollageTile>
            <CollageTile>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/events/sjsu-pd-emmys/sjsu-pd-emmys-06.jpg"
                alt="An officer chats with a guest in a denim jacket backstage, a table lined with Emmy statuettes blurred in the foreground"
                loading="lazy"
                style={frame("1.3324")}
              />
            </CollageTile>
            <CollageTile>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/events/sjsu-pd-emmys/sjsu-pd-emmys-07.jpg"
                alt="Two Emmy statuettes stand on a table, the nearest engraved Tim Banks Citizen Award, with a police badge backdrop blurred behind them"
                loading="lazy"
                style={frame("0.6663")}
              />
            </CollageTile>
            <CollageTile>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/events/sjsu-pd-emmys/sjsu-pd-emmys-08.jpg"
                alt="A seated guest in a California State University Police uniform holds an Emmy statuette in her lap during the ceremony"
                loading="lazy"
                style={frame("1.3324")}
              />
            </CollageTile>
            <CollageTile>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/events/sjsu-pd-emmys/sjsu-pd-emmys-09.jpg"
                alt="Two men pose together on stage smiling, one in a tuxedo bow tie and the other holding an Emmy statuette, in front of the SJSU backdrop"
                loading="lazy"
                style={frame("1.3324")}
              />
            </CollageTile>
          </GalleryGrid>
        </Lightbox>
      </CategoryGallery>
      <GalleryCta />
    </LeiPage>
  );
}
