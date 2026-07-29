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
  title: "Airaea Event Gallery",
  description:
    "A leadership workshop for Airaea: a speaker at the front and a room taking notes.",
};

const event = EVENTS.find((e) => e.id === "airaea")!;

/* Every src below is a literal string so the visual editor can swap it. */
export default function AiraeaEventPage() {
  return (
    <LeiPage style={{ background: "#0E0D0B", color: "#F7F5F2" }}>
      <Chrome />

      <CategoryHeader label="Airaea" backHref="/gallery/events" backLabel="Events" />
      <CategoryGallery blurb={event.blurb}>
        <Lightbox>
          <GalleryGrid columns={4}>
            <CollageTile>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/events/airaea/airaea-01.jpg"
                alt="A workshop attendee presses his fingers to his temple while the guest beside him takes notes at the conference table, a presentation screen glowing behind them"
                loading="lazy"
                style={frame("1.3324")}
              />
            </CollageTile>
            <CollageTile>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/events/airaea/airaea-02.jpg"
                alt="A guest in a pink sleeve fills out a workshop worksheet by hand, a pen and water glass resting on the table beside her"
                loading="lazy"
                style={frame("1.3324")}
              />
            </CollageTile>
            <CollageTile>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/events/airaea/airaea-03.jpg"
                alt="A guest in a red striped shirt and name tag jots notes on a worksheet at the table, a seltzer can and glass of water beside her"
                loading="lazy"
                style={frame("1.3324")}
              />
            </CollageTile>
            <CollageTile>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/events/airaea/airaea-04.jpg"
                alt="A speaker gestures with a microphone beside a screen reading Leaders take responsibility for impact, not defend intent, as guests take notes at the long tables below a disco ball"
                loading="lazy"
                style={frame("1.3324")}
              />
            </CollageTile>
            <CollageTile>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/events/airaea/airaea-05.jpg"
                alt="A speaker in a blue suit gestures with an open hand while holding a microphone, the workshop slide glowing behind him and guests seated at the table in front"
                loading="lazy"
                style={frame("0.7505")}
              />
            </CollageTile>
            <CollageTile>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/events/airaea/airaea-06.jpg"
                alt="A speaker gestures mid-sentence with a microphone in hand, a laptop on a stand beside him and the slide Leaders take responsibility for impact, not defend intent lit up on the screen behind"
                loading="lazy"
                style={frame("1.3324")}
              />
            </CollageTile>
            <CollageTile>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/events/airaea/airaea-07.jpg"
                alt="A speaker addresses the room with a microphone, the workshop screen glowing behind him as two guests at the table look on"
                loading="lazy"
                style={frame("0.7505")}
              />
            </CollageTile>
            <CollageTile>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/events/airaea/airaea-08.jpg"
                alt="A speaker gestures with an open hand beside a screen reading Leaders create safety in ambiguity, guests seated at the table with wine and water glasses in front of him"
                loading="lazy"
                style={frame("1.3324")}
              />
            </CollageTile>
            <CollageTile>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/events/airaea/airaea-09.jpg"
                alt="Guests fill out worksheets around an L-shaped table beneath an abstract green painting"
                loading="lazy"
                style={frame("1.3324")}
              />
            </CollageTile>
            <CollageTile>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/events/airaea/airaea-10.jpg"
                alt="A guest in a leopard print blouse writes on a worksheet at the table, a green seltzer can and striped ceramic bowl in front of her"
                loading="lazy"
                style={frame("1.3324")}
              />
            </CollageTile>
            <CollageTile>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/events/airaea/airaea-11.jpg"
                alt="A speaker points out across the room with a microphone in hand, the slide filling the wall behind him reading Leaders take responsibility for impact, not defend intent"
                loading="lazy"
                style={frame("1.3324")}
              />
            </CollageTile>
            <CollageTile>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/events/airaea/airaea-12.jpg"
                alt="A speaker in a blue blazer reaches out with an open hand while holding a microphone, a dark stage curtain behind him"
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
