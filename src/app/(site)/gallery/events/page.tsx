import type { Metadata } from "next";
import LeiPage from "@/components/lei/LeiPage";
import Chrome from "@/components/lei/Chrome";
import CategoryHeader from "@/components/lei/CategoryHeader";
import EventCards from "@/components/lei/EventCards";
import GalleryCta from "@/components/lei/GalleryCta";
import { GOLD, cream } from "@/components/lei/tokens";
import { EVENTS_BLURB } from "@/content/events";

export const metadata: Metadata = {
  title: "Event Galleries",
  description:
    "Bay Area event photography: galas, mixers, panels and award nights, shot so the room still looks like itself.",
};

/* Four events, newest work first, with "Other" last as the catch-all for
   shoots too small to carry a section of their own. Each card links out to
   that event's own gallery page; the frames themselves live there, not here. */
export default function EventsGalleryPage() {
  return (
    <LeiPage style={{ background: "#0E0D0B", color: "#F7F5F2" }}>
      <Chrome />

      <CategoryHeader label="Events" />
      <div
        data-fadeup=""
        style={{ maxWidth: 720, padding: "0 6vw", marginTop: "-4vh" }}
      >
        <hr
          style={{
            border: 0,
            borderTop: `1px solid ${GOLD}`,
            width: 64,
            margin: "0 0 26px",
          }}
        />
        <p
          style={{
            margin: "0 0 6vh",
            maxWidth: 560,
            fontSize: 15,
            lineHeight: 1.75,
            color: cream(0.74),
          }}
        >
          {EVENTS_BLURB}
        </p>
      </div>
      <EventCards />
      <GalleryCta />
    </LeiPage>
  );
}
