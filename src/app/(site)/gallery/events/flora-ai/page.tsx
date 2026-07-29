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
  title: "Flora.AI Event Gallery",
  description:
    "A private company dinner in the wine cellar at Lazy Bear, shot around one long table.",
};

const event = EVENTS.find((e) => e.id === "flora-ai")!;

/* Every src below is a literal string so the visual editor can swap it. */
export default function FloraAiEventPage() {
  return (
    <LeiPage style={{ background: "#0E0D0B", color: "#F7F5F2" }}>
      <Chrome />

      <CategoryHeader label="Flora.AI" backHref="/gallery/events" backLabel="Events" />
      <CategoryGallery blurb={event.blurb}>
        <Lightbox>
          <GalleryGrid columns={4}>
            <CollageTile>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/events/flora-ai/flora-ai-01.jpg"
                alt="A host in a grey blazer pours wine over the shoulder of seated guests while two women laugh at a long dinner table, a lit wine cellar glowing behind them"
                loading="lazy"
                style={frame("0.7505")}
              />
            </CollageTile>
            <CollageTile>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/events/flora-ai/flora-ai-02.jpg"
                alt="Two guests laugh at the table, one holding a glass of red wine, a place setting card reading Lazy Bear in the foreground"
                loading="lazy"
                style={frame("0.7505")}
              />
            </CollageTile>
            <CollageTile>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/events/flora-ai/flora-ai-03.jpg"
                alt="Guests lean across a long table to clink wine glasses together, candlelight and a striped woven wall hanging behind them"
                loading="lazy"
                style={frame("1.3324")}
              />
            </CollageTile>
            <CollageTile>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/events/flora-ai/flora-ai-04.jpg"
                alt="Four wine glasses clink together over a candlelit table as guests offer a toast"
                loading="lazy"
                style={frame("1.3321")}
              />
            </CollageTile>
            <CollageTile>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/events/flora-ai/flora-ai-05.jpg"
                alt="A wine glass, a lit candle and a place setting card reading Lazy Bear arranged on the dinner table"
                loading="lazy"
                style={frame("0.7505")}
              />
            </CollageTile>
            <CollageTile>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/events/flora-ai/flora-ai-06.jpg"
                alt="A guest laughs at the head of a long dinner table set with bowls and wine glasses, sculptural pendant lights glowing overhead"
                loading="lazy"
                style={frame("0.7505")}
              />
            </CollageTile>
            <CollageTile>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/events/flora-ai/flora-ai-07.jpg"
                alt="Two guests talk over dinner in a wine cellar, seated at a table set with wine glasses and small flowers among floor to ceiling wine racks"
                loading="lazy"
                style={frame("1.3324")}
              />
            </CollageTile>
            <CollageTile>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/events/flora-ai/flora-ai-08.jpg"
                alt="A guest in glasses smiles in profile with her chin resting on her hand, wine glasses blurred on the table before her"
                loading="lazy"
                style={frame("0.7505")}
              />
            </CollageTile>
            <CollageTile>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/events/flora-ai/flora-ai-09.jpg"
                alt="A guest in glasses smiles across the table at another guest, lit wine cellar shelves glowing behind her"
                loading="lazy"
                style={frame("1.3324")}
              />
            </CollageTile>
            <CollageTile>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/events/flora-ai/flora-ai-10.jpg"
                alt="A man and woman laugh while clasping hands over the table, a lit city skyline visible through the window behind them"
                loading="lazy"
                style={frame("0.7505")}
              />
            </CollageTile>
            <CollageTile>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/events/flora-ai/flora-ai-11.jpg"
                alt="Two hand-labelled wine bottles stand beside a lit candle and a small bronze deer figurine, a coaster reading SF Lazy Bear in front"
                loading="lazy"
                style={frame("0.7505")}
              />
            </CollageTile>
            <CollageTile>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/events/flora-ai/flora-ai-12.jpg"
                alt="Small glass bowls of soup, each garnished with a single mint leaf, arranged across the table"
                loading="lazy"
                style={frame("1.3324")}
              />
            </CollageTile>
            <CollageTile>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/events/flora-ai/flora-ai-13.jpg"
                alt="A savoury pastry with butter, a rosemary-garnished cocktail and a bowl of soup arranged on the candlelit table"
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
