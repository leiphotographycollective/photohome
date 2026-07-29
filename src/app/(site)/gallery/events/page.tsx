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

/* Four events, newest work first, with "Other" last as the catch-all for
   shoots too small to carry a section of their own.

   Every src is a literal string so the visual editor can swap it. You can also
   drop a replacement over the file of the same name in
   public/images/portfolio/events/ and it appears here with no code change;
   then update that tag's alt text, and its ratio if the new photo is a
   different shape. */
export default function EventsGalleryPage() {
  return (
    <LeiPage style={{ background: "#0E0D0B", color: "#F7F5F2" }}>
      <Chrome />

      <CategoryHeader label="Events" />
      <CategoryGallery blurb={EVENTS_BLURB}>
        <GallerySet id="flora-ai" name="Flora.AI" first columns={4}>
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
        </GallerySet>
        <GallerySet id="airaea" name="Airaea" columns={4}>
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
        </GallerySet>
        <GallerySet id="sjsu-pd-emmys" name="SJSU PD Emmys" columns={4}>
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
        </GallerySet>
        <GallerySet id="other" name="Other" columns={4}>
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
        </GallerySet>
      </CategoryGallery>
      <GalleryCta />
    </LeiPage>
  );
}
