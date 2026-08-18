import type { Metadata } from "next";
import LeiPage from "@/components/lei/LeiPage";
import Chrome from "@/components/lei/Chrome";
import CategoryHeader from "@/components/lei/CategoryHeader";
import CategoryGallery, { GallerySet } from "@/components/lei/CategoryGallery";
import GalleryCta from "@/components/lei/GalleryCta";
import { SoftLink } from "@/components/lei/Cta";
import { SERIF, kicker } from "@/components/lei/tokens";
import { CollageTile } from "@/components/lei/Collage";
import { frame } from "@/components/lei/frame";
import { GALLERY_FEATURE, WEDDINGS_BLURB } from "@/content/gallery";
import { TESTIMONIALS } from "@/content/homepage";

export const metadata: Metadata = {
  title: "Wedding Galleries",
  description:
    "Full Bay Area wedding days, start to finish. Getting ready, the vows, the last song, and everything in between.",
};

/* Every src below is a literal string so the visual editor can swap it. */
export default function WeddingsGalleryPage() {
  return (
    <LeiPage style={{ background: "#0E0D0B", color: "#F7F5F2" }}>
      <Chrome />

      <CategoryHeader label="Weddings" />
      <CategoryGallery blurb={WEDDINGS_BLURB}>
        <GallerySet id="sargon-odelya" name="Sargon & Odelya" first columns={4}>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/sargon-odelya-select/so-select-reedit2-01.jpg"
              alt="Bridal details flat lay: pearl-strapped Jimmy Choo heels, Chanel perfume, jewelry and the invitation"
              loading="lazy"
              style={frame("1.779")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/sargon-odelya-select/so-select-158.jpg"
              alt="Bride holding the open ring box in both hands against her beaded gown"
              loading="lazy"
              style={frame("0.6668")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/sargon-odelya-select/so-select-042.jpg"
              alt="Hands fastening the bride's pearl-studded heel while the second shoe waits on the rug, sepia"
              loading="lazy"
              style={frame("0.6668")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/sargon-odelya-select/so-select-046.jpg"
              alt="Bride's mother kneeling in navy lace to fasten her shoe while the bride laughs on the bed"
              loading="lazy"
              style={frame("1.4996")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/sargon-odelya-select/so-select-062.jpg"
              alt="Bride and her mother holding hands before the ceremony, black and white"
              loading="lazy"
              style={frame("0.6663")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/sargon-odelya-select/so-select-reedit2-08.jpg"
              alt="Bride and her bridesmaids in matching robes, backs to the camera, arms around each other"
              loading="lazy"
              style={frame("1.4996")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/sargon-odelya-select/so-select-112.jpg"
              alt="Bride and three bridesmaids in sage dresses laughing over a champagne toast"
              loading="lazy"
              style={frame("1.4996")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/sargon-odelya-select/so-select-reedit2-02.jpg"
              alt="Bride sitting at the end of the bed in her gown and veil, champagne chilling on the side table"
              loading="lazy"
              style={frame("1.4996")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/sargon-odelya-select/so-select-225.jpg"
              alt="Bride seated with her cascading white bouquet in a vintage living room"
              loading="lazy"
              style={frame("0.6668")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/sargon-odelya-select/so-select-300.jpg"
              alt="Bride lifting her cathedral veil overhead in soft window light"
              loading="lazy"
              style={frame("0.6668")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/sargon-odelya-select/so-select-204.jpg"
              alt="Bride in profile beneath her lace veil beside the beaded ceremonial fan and scepter"
              loading="lazy"
              style={frame("0.6668")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/sargon-odelya-select/so-select-248.jpg"
              alt="Groom laughing while a groomsman fastens his cufflink before the ceremony"
              loading="lazy"
              style={frame("1.4996")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/sargon-odelya-select/so-select-167.jpg"
              alt="Groom climbing the staircase carrying the pearl ceremonial scepter, guests waiting below"
              loading="lazy"
              style={frame("0.6668")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/sargon-odelya-select/so-select-177.jpg"
              alt="Guests raising pearl ornaments and cheering as the couple enters, seen from above"
              loading="lazy"
              style={frame("1.4996")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/sargon-odelya-select/so-select-presargon-14.jpg"
              alt="The wedding party lined up in the garden at golden hour, bridesmaids in sage and groomsmen in grey"
              loading="lazy"
              style={frame("1.5008")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/sargon-odelya-select/so-select-presargon-07.jpg"
              alt="Bride and groom walking hand in hand across the lawn beneath the olive trees"
              loading="lazy"
              style={frame("1.4996")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/sargon-odelya-select/so-select-reedit2-14.jpg"
              alt="Groom spraying champagne over the bride under the redwoods, her veil trailing behind her"
              loading="lazy"
              style={frame("0.6668")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/sargon-odelya-select/so-select-retouch-02.jpg"
              alt="Groom's arms wrapped around the bride's beaded gown, both wedding bands showing"
              loading="lazy"
              style={frame("0.6668")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/sargon-odelya-select/so-select-540.jpg"
              alt="Head table set in front of the reception fireplace, banked with white roses and eucalyptus"
              loading="lazy"
              style={frame("1.4996")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/sargon-odelya-select/so-select-569.jpg"
              alt="Bride and groom moving through a crowd of guests with phones and flowers raised"
              loading="lazy"
              style={frame("1.4996")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/sargon-odelya-select/so-select-580.jpg"
              alt="Groom lifted on his friends' shoulders holding the pearl scepter beneath the string lights"
              loading="lazy"
              style={frame("0.6668")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/sargon-odelya-select/so-select-presargon-12.jpg"
              alt="First dance in low fog beneath string lights, guests watching from the fireplace"
              loading="lazy"
              style={frame("1.4996")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/sargon-odelya-select/so-select-639.jpg"
              alt="Bride and groom reaching for each other across the fog at the start of their first dance"
              loading="lazy"
              style={frame("0.6668")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/sargon-odelya-select/so-select-reedit2-03.jpg"
              alt="Groom lifting the bride off the floor during their first dance in low fog"
              loading="lazy"
              style={frame("0.6668")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/sargon-odelya-select/so-select-641.jpg"
              alt="First dance in black and white, the couple close together on a floor of low fog"
              loading="lazy"
              style={frame("0.6668")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/sargon-odelya-select/so-select-686.jpg"
              alt="The money dance, guests pressing in with bills raised, black and white"
              loading="lazy"
              style={frame("1.4996")}
            />
          </CollageTile>
        </GallerySet>
        <GallerySet id="miranda-danny" name="Miranda & Danny" columns={4}>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/miranda-danny/miranda-danny-01.jpg"
              alt="Bride holding her white bouquet as her veil sweeps across the frame, the harbour behind her"
              loading="lazy"
              style={frame("1.3324")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/miranda-danny/miranda-danny-05.jpg"
              alt="Bride resting against the groom on the dock, sailboat masts and still water behind them"
              loading="lazy"
              style={frame("0.6668")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/miranda-danny/miranda-danny-12.jpg"
              alt="Bride and groom holding each other on the boardwalk at sunset, her train spread across the boards"
              loading="lazy"
              style={frame("1.3324")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/miranda-danny/miranda-danny-02.jpg"
              alt="Bride and groom leaning into each other with her white bouquet between them, sun flaring off the marina"
              loading="lazy"
              style={frame("1.4996")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/miranda-danny/miranda-danny-07.jpg"
              alt="Bride and groom kissing on the marina boardwalk as the sun breaks between them"
              loading="lazy"
              style={frame("0.6668")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/miranda-danny/miranda-danny-08.jpg"
              alt="Bride and groom forehead to forehead in sepia, the sun flaring behind her veil"
              loading="lazy"
              style={frame("0.7505")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/miranda-danny/miranda-danny-03.jpg"
              alt="Bride and groom small on the marina boardwalk, sailboat masts and the low sun filling the frame"
              loading="lazy"
              style={frame("1.3324")}
            />
          </CollageTile>
        </GallerySet>
        <GallerySet id="trang" name="Trang" columns={4}>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/trang/trang-01.jpg"
              alt="The wedding bands and earrings resting on a red invitation illustrated with the couple"
              loading="lazy"
              style={frame("0.7505")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/trang/trang-11.jpg"
              alt="Paddle fans for the bride's side and the groom's side laid out with heart sunglasses on a red reception table"
              loading="lazy"
              style={frame("1.3324")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/trang/trang-03.jpg"
              alt="Bride and groom at the altar seen from the back of the church, petals scattered down the aisle, black and white"
              loading="lazy"
              style={frame("0.7505")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/trang/trang-04.jpg"
              alt="Bride and groom kneeling together during the ceremony, family and wedding party in the pews behind them"
              loading="lazy"
              style={frame("0.7505")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/trang/trang-05.jpg"
              alt="The couple's hands resting together over the bouquet, both wedding bands on"
              loading="lazy"
              style={frame("0.7505")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/trang/trang-10.jpg"
              alt="Bride and groom walking out through a shower of petals with champagne in hand, black and white"
              loading="lazy"
              style={frame("0.7505")}
            />
          </CollageTile>
          <CollageTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/weddings/trang/trang-07.jpg"
              alt="Groom kissing the bride's cheek outside the church, her peach and white bouquet in hand"
              loading="lazy"
              style={frame("0.7511")}
            />
          </CollageTile>
        </GallerySet>
      </CategoryGallery>

      {/* ══ Full-bleed feature ══ */}
      <section style={{ position: "relative", height: "120vh" }}>
        <div
          style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            data-feature=""
            src="/images/portfolio/weddings/miranda-danny/miranda-danny-14.jpg"
            alt="Groom cupping the bride's face at sunset, her bouquet held between them at the marina railing"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: "scale(1.18)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(14,13,11,.55), rgba(14,13,11,0) 45%)",
            }}
          />
          <div style={{ position: "absolute", left: 38, bottom: 38 }}>
            <div style={kicker({ marginBottom: 12 })}>{GALLERY_FEATURE.kicker}</div>
            <div
              style={{
                fontFamily: SERIF,
                fontStyle: "italic",
                fontSize: "clamp(22px,2.6vw,36px)",
              }}
            >
              {GALLERY_FEATURE.line}
            </div>
          </div>
        </div>
      </section>

      {/* ══ Proof + price anchor ══ */}
      <section
        style={{
          position: "relative",
          background: "#0E0D0B",
          padding: "16vh 6vw",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <blockquote
            data-fadeup=""
            style={{
              margin: 0,
              fontFamily: SERIF,
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(22px,2.6vw,34px)",
              lineHeight: 1.4,
              textWrap: "pretty",
            }}
          >
            &ldquo;{TESTIMONIALS[0].pull}&rdquo;
          </blockquote>
          <div data-fadeup="" style={kicker({ marginTop: 26 }, 10, ".3em")}>
            {TESTIMONIALS[0].names}
          </div>
          <div data-fadeup="" style={{ marginTop: 34 }}>
            <SoftLink dark href="/investment" label="Collections from $2,600" />
          </div>
        </div>
      </section>

      <GalleryCta />
    </LeiPage>
  );
}
