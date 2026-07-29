import type { Metadata } from "next";
import LeiPage from "@/components/lei/LeiPage";
import Chrome from "@/components/lei/Chrome";
import CategoryHeader from "@/components/lei/CategoryHeader";
import CategoryGallery, { GallerySet } from "@/components/lei/CategoryGallery";
import GalleryCta from "@/components/lei/GalleryCta";
import { CollageTile } from "@/components/lei/Collage";
import { frame } from "@/components/lei/frame";
import { EVENTS_BLURB } from "@/content/events";

export const metadata: Metadata = {
  title: "Event Galleries",
  description:
    "Bay Area event photography: galas, mixers, panels and award nights, shot so the room still looks like itself.",
};

/* Every frame below is a placeholder, and every src is a literal string so the
   visual editor can swap it. Drop a real photo over the file of the same name
   in public/images/portfolio/events/ and it appears here with no code change;
   then update that tag's alt text, and its ratio if the new photo is a
   different shape. */
export default function EventsGalleryPage() {
  return (
    <LeiPage style={{ background: "#0E0D0B", color: "#F7F5F2" }}>
      <Chrome />

      <CategoryHeader label="Events" />
      <CategoryGallery blurb={EVENTS_BLURB} cap={1180}>
        <GallerySet id="event-one" name="Event One" first columns={3}>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/events/event-one/event-one-1.jpg"
              alt="Placeholder frame 1 for Event One"
              loading="lazy"
              style={frame("1.5")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/events/event-one/event-one-2.jpg"
              alt="Placeholder frame 2 for Event One"
              loading="lazy"
              style={frame("0.6667")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/events/event-one/event-one-3.jpg"
              alt="Placeholder frame 3 for Event One"
              loading="lazy"
              style={frame("0.6667")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/events/event-one/event-one-4.jpg"
              alt="Placeholder frame 4 for Event One"
              loading="lazy"
              style={frame("1.5")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/events/event-one/event-one-5.jpg"
              alt="Placeholder frame 5 for Event One"
              loading="lazy"
              style={frame("0.6667")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/events/event-one/event-one-6.jpg"
              alt="Placeholder frame 6 for Event One"
              loading="lazy"
              style={frame("1.5")}
            />
          </CollageTile>
        </GallerySet>
        <GallerySet id="event-two" name="Event Two" columns={3}>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/events/event-two/event-two-1.jpg"
              alt="Placeholder frame 1 for Event Two"
              loading="lazy"
              style={frame("1.5")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/events/event-two/event-two-2.jpg"
              alt="Placeholder frame 2 for Event Two"
              loading="lazy"
              style={frame("0.6667")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/events/event-two/event-two-3.jpg"
              alt="Placeholder frame 3 for Event Two"
              loading="lazy"
              style={frame("0.6667")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/events/event-two/event-two-4.jpg"
              alt="Placeholder frame 4 for Event Two"
              loading="lazy"
              style={frame("1.5")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/events/event-two/event-two-5.jpg"
              alt="Placeholder frame 5 for Event Two"
              loading="lazy"
              style={frame("0.6667")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/events/event-two/event-two-6.jpg"
              alt="Placeholder frame 6 for Event Two"
              loading="lazy"
              style={frame("1.5")}
            />
          </CollageTile>
        </GallerySet>
        <GallerySet id="event-three" name="Event Three" columns={3}>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/events/event-three/event-three-1.jpg"
              alt="Placeholder frame 1 for Event Three"
              loading="lazy"
              style={frame("1.5")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/events/event-three/event-three-2.jpg"
              alt="Placeholder frame 2 for Event Three"
              loading="lazy"
              style={frame("0.6667")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/events/event-three/event-three-3.jpg"
              alt="Placeholder frame 3 for Event Three"
              loading="lazy"
              style={frame("0.6667")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/events/event-three/event-three-4.jpg"
              alt="Placeholder frame 4 for Event Three"
              loading="lazy"
              style={frame("1.5")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/events/event-three/event-three-5.jpg"
              alt="Placeholder frame 5 for Event Three"
              loading="lazy"
              style={frame("0.6667")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/events/event-three/event-three-6.jpg"
              alt="Placeholder frame 6 for Event Three"
              loading="lazy"
              style={frame("1.5")}
            />
          </CollageTile>
        </GallerySet>
      </CategoryGallery>
      <GalleryCta />
    </LeiPage>
  );
}
