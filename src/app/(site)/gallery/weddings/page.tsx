import type { Metadata } from "next";
import LeiPage from "@/components/lei/LeiPage";
import Chrome from "@/components/lei/Chrome";
import CategoryHeader from "@/components/lei/CategoryHeader";
import CategoryGallery from "@/components/lei/CategoryGallery";
import GalleryCta from "@/components/lei/GalleryCta";
import { SoftLink } from "@/components/lei/Cta";
import { SERIF, kicker } from "@/components/lei/tokens";
import { img } from "@/content/portfolio";
import { GALLERY, GALLERY_FEATURE } from "@/content/gallery";
import { TESTIMONIALS } from "@/content/homepage";

export const metadata: Metadata = {
  title: "Wedding Galleries",
  description:
    "Full Bay Area wedding days, start to finish. Getting ready, the vows, the last song, and everything in between.",
};

// Safe: tests/gallery.test.ts asserts this id, so a rename fails the suite
// before it can strand this page.
const CATEGORY = GALLERY.find((c) => c.id === "weddings")!;

export default function WeddingsGalleryPage() {
  return (
    <LeiPage style={{ background: "#0E0D0B", color: "#F7F5F2" }}>
      <Chrome />

      <CategoryHeader label={CATEGORY.label} />
      <CategoryGallery category={CATEGORY} />

      {/* ══ Full-bleed feature ══ */}
      <section style={{ position: "relative", height: "120vh" }}>
        <div
          style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            data-feature=""
            src={img(GALLERY_FEATURE.photo.path, 2500)}
            alt={GALLERY_FEATURE.photo.a}
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
            <SoftLink dark href="/investment" label="Collections from $2,400" />
          </div>
        </div>
      </section>

      <GalleryCta />
    </LeiPage>
  );
}
