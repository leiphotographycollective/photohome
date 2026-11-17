/** Local frames for the /unslop 3D scroll preview — keep CDN out of WebGL. */

export interface UnslopFrame {
  src: string;
  alt: string;
  /** Portrait vs landscape plane proportions in the tunnel. */
  portrait?: boolean;
}

export const TUNNEL_FRAMES: UnslopFrame[] = [
  {
    src: "/images/hero-mobile.jpg",
    alt: "Bride's veil at golden hour",
    portrait: true,
  },
  {
    src: "/images/bay-area-wedding-first-dance-clouds-lei-photography-collective.jpg",
    alt: "First dance in low fog under string lights",
  },
  {
    src: "/images/portfolio/weddings/sargon-odelya-select/so-select-204.jpg",
    alt: "Bride in profile beneath her lace veil",
    portrait: true,
  },
  {
    src: "/images/bay-area-wedding-marina-boardwalk-golden-hour-lei-photography-collective.jpg",
    alt: "Marina boardwalk at golden hour",
  },
  {
    src: "/images/bay-area-wedding-reception-groom-shoulder-dance-celebration-lei-photography-collective.jpg",
    alt: "Groom lifted on friends' shoulders",
    portrait: true,
  },
  {
    src: "/images/bay-area-wedding-marina-sunset-kiss-lei-photography-collective.jpg",
    alt: "Marina sunset kiss",
  },
  {
    src: "/images/portfolio/weddings/sargon-odelya-select/so-select-580.jpg",
    alt: "Celebration under string lights",
    portrait: true,
  },
  {
    src: "/images/bay-area-wedding-first-dance-fog-string-lights-black-and-white-lei-photography-collective.jpg",
    alt: "First dance in fog, black and white",
  },
  {
    src: "/images/portfolio/weddings/miranda-danny/miranda-danny-05.jpg",
    alt: "Couple on the dock",
    portrait: true,
  },
  {
    src: "/images/bay-area-wedding-reception-confetti-toast-black-and-white-lei-photography-collective.jpg",
    alt: "Confetti toast, black and white",
  },
  {
    src: "/images/portfolio/weddings/trang/trang-04.jpg",
    alt: "Ceremony at the altar",
    portrait: true,
  },
  {
    src: "/images/bay-area-wedding-rings-embrace-detail-lei-photography-collective.jpg",
    alt: "Rings during an embrace",
    portrait: true,
  },
];

export const CARD_FRAMES: UnslopFrame[] = [
  {
    src: "/images/portfolio/weddings/sargon-odelya-select/so-select-177.jpg",
    alt: "Guests cheering the entrance",
  },
  {
    src: "/images/portfolio/weddings/sargon-odelya-select/so-select-112.jpg",
    alt: "Bridesmaids champagne toast",
  },
  {
    src: "/images/bay-area-wedding-couple-marina-sunset-walk-lei-photography-collective.jpg",
    alt: "Marina sunset walk",
  },
  {
    src: "/images/portfolio/weddings/trang/trang-02.jpg",
    alt: "Church aisle with petals",
  },
  {
    src: "/images/bay-area-wedding-details-flat-lay-jimmy-choo-heels-chanel-perfume-lei-photography-collective.jpg",
    alt: "Bridal details flat lay",
  },
  {
    src: "/images/portfolio/weddings/miranda-danny/miranda-danny-07.jpg",
    alt: "Kiss on the marina boardwalk",
  },
];
