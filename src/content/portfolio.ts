// Portfolio data for Lei Photography Collective.
// Real imagery from leiphotography.co (Squarespace CDN).

const BASE =
  "https://images.squarespace-cdn.com/content/v1/697c1d6344a3b1154bcbc39e/";

export function img(path: string, w = 1200): string {
  // Local images (public/images/...) are already sized for the web — serve as-is.
  if (path.startsWith("/")) return path;
  return `${BASE}${path}?format=${w}w`;
}

/** aspect: 'p' portrait 4/5, 't' tall 3/4, 'l' landscape 3/2, 's' square */
export type Ratio = "p" | "t" | "l" | "s";

export const RATIO_CSS: Record<Ratio, string> = {
  p: "4 / 5",
  t: "3 / 4",
  l: "3 / 2",
  s: "1 / 1",
};

export interface Photo {
  path: string;
  a: string;
  r: Ratio;
  /** Exact width/height for galleries that should render native aspect
   * ratios instead of snapping to one of the four RATIO_CSS presets. */
  ratio?: number;
}

export function aspect(photo: Photo): string {
  return photo.ratio ? String(photo.ratio) : RATIO_CSS[photo.r];
}

export const PHOTOS = {
  marinaKiss: { path: "/images/bay-area-wedding-marina-golden-hour-kiss-lei-photography-collective.jpg", a: "Bride and groom kissing at golden hour, sailboat masts behind them at the marina", r: "p" },
  receptionEntrance: { path: "/images/bay-area-wedding-reception-entrance-fog-string-lights-lei-photography-collective.jpg", a: "Bride and groom walking onto a fog-covered dance floor beneath a canopy of string lights", r: "l" },
  shoulderDance: { path: "/images/bay-area-wedding-reception-groom-shoulder-dance-celebration-lei-photography-collective.jpg", a: "Groom lifted on shoulders during reception dancing, guests clapping around him", r: "p" },
  ringsEmbrace: { path: "/images/bay-area-wedding-rings-embrace-detail-lei-photography-collective.jpg", a: "Close-up of the couple's hands and rings as the groom embraces the bride in her beaded gown", r: "p" },
  firstDanceClouds: { path: "/images/bay-area-wedding-first-dance-clouds-lei-photography-collective.jpg", a: "First dance on a cloud of fog beneath string lights", r: "p" },
  marinaBoardwalk: { path: "/images/bay-area-wedding-marina-boardwalk-golden-hour-lei-photography-collective.jpg", a: "Bride and groom on the marina boardwalk at golden hour, sailboat masts behind them", r: "l" },
  firstDance04: { path: "128f88b3-0b33-486f-a168-7d3b3f98bd13/bay-area-wedding-photography-portfolio-first-dance-lei-photography-collective-04.jpg", a: "First dance beneath string lights, fog across the floor", r: "p" },
  firstDance03: { path: "24bb3601-4fd9-49bf-9fa1-8b2ecd9a4057/bay-area-wedding-photography-portfolio-first-dance-lei-photography-collective03.jpg", a: "First dance under warm string lights", r: "l" },
  firstDanceCine: { path: "13b436d7-c955-46a1-bc5c-e4faf35bb78c/bay-area-wedding-first-dance-cinematic-natural-light-lei-photography-collective", a: "Cinematic first dance in low light", r: "p" },
  sargonPrep: { path: "652fef9d-196e-4248-92d2-83d8abebf683/Lei.Photography.Co-PreSargon+lReEdit-12.jpg", a: "First dance in low fog beneath string lights, guests watching by the fireplace", r: "l" },
  sargon046: { path: "cdced7af-418e-4b56-a31b-fde12cfa3e02/Sargon+%26+Odelya-046.jpg", a: "Getting ready — the shoe moment", r: "p" },
  sargon225: { path: "dd09e3e4-c49d-4d8c-814c-82279c3dc384/Sargon+%26+Odelya-225.jpg", a: "Bride with bouquet in a vintage living room", r: "p" },
  detailsFlat: { path: "a8cacf12-ca27-4443-b9ec-03d98fd0a52f/bay-area-wedding-details-flat-lay-shoes-perfume-lei-photography-collective", a: "Wedding details flat lay — shoes and perfume", r: "s" },
  bridesmaidsToast: { path: "e743af3c-ce97-45ec-8642-b33b317fd3eb/bay-area-wedding-getting-ready-bride-bridesmaids-toast-lei-photography-collective", a: "Bride and bridesmaids toast", r: "p" },
  weddingParty: { path: "b6e2cb90-7b22-4961-96c2-94557c5f81e0/bay-area-wedding-party-candid-natural-light-lei-photography-collective", a: "Wedding party candid in natural light", r: "p" },
  bridal: { path: "de750220-8bf1-44c7-8ef7-7dedd2b69ef3/bay-area-bridal-portrait-soft-natural-light-lei-photography-collective", a: "Bridal portrait in soft natural light", r: "t" },
  gradLaughing: { path: "10af5478-33d4-451a-89f5-615c2e55fe1f/bay-area-graduation-portrait-candid-natural-light-lei-photography-collective", a: "Graduate laughing among flowers", r: "p" },
  gradPortrait: { path: "388dc50d-bfe0-40fa-8282-010e1f8892dd/bay-area-graduation-portrait-natural-light-candid-lei-photography-collective", a: "Graduation portrait in natural light", r: "p" },
  naomi: { path: "ed7320b3-281a-4572-b32e-366fd44a63e1/Lei.Photography.Co-Naomi+Grad+Shoot+FA25-1.jpg", a: "Naomi — fall graduation session", r: "p" },
  lauren: { path: "2738f481-52a5-4ea3-bb7a-5a637e7a3ff9/Lei.Photography.Co-Lauren+Grad+Shoot+FA25-8.jpg", a: "Lauren — fall graduation session", r: "p" },
  editorial: { path: "8deaaf49-efac-4491-8299-d815c581bf3b/bay-area-fashion-editorial-portrait-moody-light-lei-photography-collective", a: "Moody editorial portrait in shadow", r: "t" },
  coastal: { path: "4db9fa99-eb9a-4934-a0c8-434507f6c49d/bay-area-coastal-couples-portrait-natural-light-lei-photography-collective", a: "Couple embracing on the coast", r: "p" },
  proposal: { path: "fd9815f2-39b8-476e-9b16-bbf4d9b863ea/Lei.Photography.Co-JakeProposalReEdit-09.jpg", a: "The proposal — the moment of yes", r: "p" },
  // Used outside the portfolio structure (about / experience pages)
  headshot: { path: "0fb5bd5d-f798-4ff4-a39a-665358854c87/Lei.Photogrpahy.co-Ray+Headshot-2.jpg", a: "Raymond Lei holding a camera outdoors beside yellow flowers", r: "p" },
  archEditorial: { path: "277ae67a-f224-4a1f-b0c1-393118b86947/bay-area-fashion-editorial-portrait-architectural-natural-light-lei-photography-collective", a: "Editorial portrait in an arched architectural walkway", r: "p" },
  bwEditorial: { path: "a135507e-bcbd-491f-8289-04335c1a17bf/bay-area-fashion-editorial-portrait-black-and-white-lei-photography-collective", a: "Black and white editorial portrait outdoors", r: "p" },
  gownEditorial: { path: "a4dc9303-abdb-418f-b9df-d2f910a25833/bay-area-fashion-editorial-portrait-evening-gown-lei-photography-collective", a: "Editorial portrait in a flowing evening gown, natural light", r: "p" },
  danceLift: { path: "a1619465-2e25-4145-bb00-b9b588e0d38b/bay-area-wedding-first-dance-lift-cinematic-natural-light-lei-photography-collective", a: "Groom lifting bride during their first dance, cinematic natural light", r: "p" },
  firstDanceBW: { path: "74b02691-e4f6-4e3b-856e-91b2ffedd398/bay-area-wedding-first-dance-black-and-white-lei-photography-collective", a: "First dance in black and white", r: "t" },
  coastalCandid: { path: "86c4e14a-bd49-4b5b-8bbe-b7ae2881bdb5/san-francisco-coastal-couples-portrait-candid-natural-light-lei-photography-collective", a: "Couple embracing by the ocean, candid natural light", r: "p" },
  groomPrep: { path: "bfb2b2c5-62c2-447d-ac15-c7b4ac7b80b2/bay-area-wedding-groom-getting-ready-candid-lei-photography-collective", a: "Groom laughing with a groomsman while getting ready", r: "p" },
  brideMother: { path: "477b873d-0c83-4d5e-8856-d0275ab31300/bay-area-wedding-bride-mother-getting-ready-black-and-white-lei-photography-collective", a: "Bride sharing an emotional moment with her mother, black and white", r: "t" },
  coastKiss: { path: "8664ce35-1a25-42be-8c14-9f85890ee554/Couple+sharing+an+intimate+kiss+during+a+black+and+white+engagement+session+along+the+San+Francisco+coast%2C+photographed+by+Lei+Photography+Collective.", a: "Couple sharing a kiss on the San Francisco coast, black and white", r: "p" },
  // Local images — 2025 fall shoots, not yet migrated to the CDN
  gradCapToss: { path: "/images/portfolio/graduation/grad-akp-toss.jpg", a: "AKP graduates tossing their caps on campus", r: "p" },
  eventPwc: { path: "/images/portfolio/events/event-pwc.jpg", a: "Colleagues smiling together at a corporate networking event", r: "l" },
  eventAssyrian: { path: "/images/portfolio/events/event-assyrian-5.jpg", a: "Couple in evening attire at a gala, garden view behind them", r: "l" },
  eventEmmys: { path: "/images/portfolio/events/event-emmys.jpg", a: "Emmy award statues in gold light", r: "l" },
} satisfies Record<string, Photo>;

// Full "Sargon & Odelya" wedding gallery — local images at native aspect
// ratio (see `ratio` on each Photo), not the 4 RATIO_CSS presets above.
const SO_DIR = "/images/portfolio/weddings/sargon-odelya";
export const SARGON_ODELYA_PHOTOS: Photo[] = [
  { path: `${SO_DIR}/sargon-odelya-01.jpg`, a: "Bride's hands holding the wedding ring box", r: "p", ratio: 0.6667 },
  { path: `${SO_DIR}/sargon-odelya-02.jpg`, a: "Bridal shoes, perfume and jewelry flat lay", r: "l", ratio: 1.7778 },
  { path: `${SO_DIR}/sargon-odelya-03.jpg`, a: "Bride sharing an emotional moment with her mother, black and white", r: "p", ratio: 0.6667 },
  { path: `${SO_DIR}/sargon-odelya-04.jpg`, a: "Bride and bridesmaids toasting champagne while getting ready", r: "l", ratio: 1.5 },
  { path: `${SO_DIR}/sargon-odelya-05.jpg`, a: "Bridesmaids toasting champagne with the bride, alternate angle", r: "l", ratio: 1.5 },
  { path: `${SO_DIR}/sargon-odelya-06.jpg`, a: "Groom descending the stairs carrying a pearl-beaded scepter", r: "p", ratio: 0.6667 },
  { path: `${SO_DIR}/sargon-odelya-07.jpg`, a: "Guests cheering as the couple descends the staircase", r: "l", ratio: 1.5 },
  { path: `${SO_DIR}/sargon-odelya-08.jpg`, a: "Family and friends celebrating on the staircase, aerial view", r: "p", ratio: 0.6667 },
  { path: `${SO_DIR}/sargon-odelya-09.jpg`, a: "Bride's veil catching the light in warm golden hour sun", r: "p", ratio: 0.6667 },
  { path: `${SO_DIR}/sargon-odelya-10.jpg`, a: "Bride's veil lifted and moving in the breeze", r: "p", ratio: 0.6667 },
  { path: `${SO_DIR}/sargon-odelya-11.jpg`, a: "Close-up of the bride's engagement ring beneath her veil", r: "p", ratio: 0.6667 },
  { path: `${SO_DIR}/sargon-odelya-12.jpg`, a: "Bride beneath her veil, black and white portrait", r: "p", ratio: 0.6667 },
  { path: `${SO_DIR}/sargon-odelya-13.jpg`, a: "Bridesmaids toasting the bride on a garden balcony at golden hour", r: "l", ratio: 1.4999 },
  { path: `${SO_DIR}/sargon-odelya-14.jpg`, a: "Bride touching the groom's face at golden hour", r: "l", ratio: 1.5004 },
  { path: `${SO_DIR}/sargon-odelya-15.jpg`, a: "Bride and groom smiling together on a garden balcony", r: "l", ratio: 1.5 },
  { path: `${SO_DIR}/sargon-odelya-16.jpg`, a: "Bride's veil blowing across her face in soft light", r: "p", ratio: 0.6667 },
  { path: `${SO_DIR}/sargon-odelya-17.jpg`, a: "Bride lifting her cathedral veil overhead, laughing", r: "p", ratio: 0.6667 },
  { path: `${SO_DIR}/sargon-odelya-18.jpg`, a: "Bride's veil trailing in the wind, black and white", r: "p", ratio: 0.6667 },
  { path: `${SO_DIR}/sargon-odelya-19.jpg`, a: "Bride looking back over her shoulder, veil catching the sunset", r: "p", ratio: 0.6667 },
  { path: `${SO_DIR}/sargon-odelya-20.jpg`, a: "Bride and groom walking hand in hand across the lawn", r: "l", ratio: 1.5 },
  { path: `${SO_DIR}/sargon-odelya-21.jpg`, a: "Bride and groom walking together, alternate edit", r: "l", ratio: 1.5004 },
  { path: `${SO_DIR}/sargon-odelya-22.jpg`, a: "Groom spraying champagne over the bride under a redwood tree", r: "l", ratio: 1.5001 },
  { path: `${SO_DIR}/sargon-odelya-23.jpg`, a: "Champagne spray celebration, alternate edit", r: "p", ratio: 0.6667 },
  { path: `${SO_DIR}/sargon-odelya-24.jpg`, a: "First dance beneath string lights, fog across the floor, black and white", r: "p", ratio: 0.6667 },
  { path: `${SO_DIR}/sargon-odelya-25.jpg`, a: "Reception fireplace mantle dressed in white florals and candlelight", r: "l", ratio: 1.5 },
  { path: `${SO_DIR}/sargon-odelya-26.jpg`, a: "Groom carrying the bride through a cheering crowd", r: "l", ratio: 1.4999 },
  { path: `${SO_DIR}/sargon-odelya-27.jpg`, a: "Groom lifted on guests' shoulders during the reception", r: "l", ratio: 1.5 },
  { path: `${SO_DIR}/sargon-odelya-28.jpg`, a: "Groom dipping the bride for a kiss by the reception fireplace", r: "p", ratio: 0.6667 },
  { path: `${SO_DIR}/sargon-odelya-29.jpg`, a: "Bride and groom laughing mid-twirl on the dance floor", r: "p", ratio: 0.6667 },
  { path: `${SO_DIR}/sargon-odelya-30.jpg`, a: "Bride and groom embracing on the dance floor, reception lights above", r: "l", ratio: 1.5 },
  { path: `${SO_DIR}/sargon-odelya-31.jpg`, a: "Traditional money dance with the newlyweds, black and white", r: "l", ratio: 1.5 },
  { path: `${SO_DIR}/sargon-odelya-32.jpg`, a: "Groomsmen sharing a laugh while getting ready", r: "l", ratio: 1.4999 },
  { path: `${SO_DIR}/sargon-odelya-33.jpg`, a: "Groomsmen laughing together while adjusting cufflinks", r: "l", ratio: 1.5 },
];

// New 2025 sets imported from local exports
const SARGON_ODELYA_MORE: Photo[] = [
  { path: "/images/portfolio/weddings/sargon-odelya-more/sargon-odelya-more-08.jpg", a: "Sargon & Odelya — couple's portrait at golden hour", r: "l", ratio: 1.5 },
  { path: "/images/portfolio/weddings/sargon-odelya-more/sargon-odelya-more-32.jpg", a: "Sargon & Odelya — a moment from the wedding day", r: "p", ratio: 0.6667 },
];

// Curated 13-frame selection shown on the project page and homepage —
// the spec caps displayed wedding galleries at 10-15 photos. The full
// arrays above are retained (no-deletions rule) but not rendered.
export const SARGON_ODELYA_CURATED: Photo[] = [
  SARGON_ODELYA_PHOTOS[0], // ring box
  SARGON_ODELYA_PHOTOS[2], // bride & mother, black and white
  SARGON_ODELYA_PHOTOS[3], // bridesmaids toast
  SARGON_ODELYA_PHOTOS[5], // groom descending the stairs
  SARGON_ODELYA_PHOTOS[8], // veil at golden hour
  SARGON_ODELYA_PHOTOS[11], // veil portrait, black and white
  SARGON_ODELYA_PHOTOS[13], // touching the groom's face at golden hour
  SARGON_ODELYA_PHOTOS[19], // walking hand in hand
  SARGON_ODELYA_PHOTOS[21], // champagne spray under the redwood
  SARGON_ODELYA_PHOTOS[23], // first dance, black and white
  SARGON_ODELYA_PHOTOS[25], // carried through the cheering crowd
  SARGON_ODELYA_PHOTOS[27], // dip kiss by the fireplace
  SARGON_ODELYA_PHOTOS[28], // mid-twirl on the dance floor
];
const DYLAN_GRAD: Photo[] = [
  { path: "/images/portfolio/graduation/dylan/dylan-01.jpg", a: "Dylan — fall graduation session", r: "p", ratio: 0.6667 },
  { path: "/images/portfolio/graduation/dylan/dylan-02.jpg", a: "Dylan — fall graduation session", r: "p", ratio: 0.6667 },
  { path: "/images/portfolio/graduation/dylan/dylan-03.jpg", a: "Dylan — fall graduation session", r: "p", ratio: 0.6667 },
  { path: "/images/portfolio/graduation/dylan/dylan-04.jpg", a: "Dylan — fall graduation session", r: "p", ratio: 0.6667 },
  { path: "/images/portfolio/graduation/dylan/dylan-05.jpg", a: "Dylan — fall graduation session", r: "p", ratio: 0.6667 },
  { path: "/images/portfolio/graduation/dylan/dylan-06.jpg", a: "Dylan — fall graduation session", r: "p", ratio: 0.6667 },
  { path: "/images/portfolio/graduation/dylan/dylan-07.jpg", a: "Dylan — fall graduation session", r: "p", ratio: 0.6667 },
  { path: "/images/portfolio/graduation/dylan/dylan-08.jpg", a: "Dylan — fall graduation session", r: "p", ratio: 0.6667 },
];
const NAOMI_GRAD: Photo[] = [
  { path: "/images/portfolio/graduation/naomi/naomi-01.jpg", a: "Naomi — fall graduation session", r: "p", ratio: 0.6667 },
  { path: "/images/portfolio/graduation/naomi/naomi-02.jpg", a: "Naomi — fall graduation session", r: "p", ratio: 0.6667 },
  { path: "/images/portfolio/graduation/naomi/naomi-03.jpg", a: "Naomi — fall graduation session", r: "p", ratio: 0.6667 },
  { path: "/images/portfolio/graduation/naomi/naomi-04.jpg", a: "Naomi — fall graduation session", r: "p", ratio: 0.6667 },
  { path: "/images/portfolio/graduation/naomi/naomi-05.jpg", a: "Naomi — fall graduation session", r: "p", ratio: 0.6667 },
];
const LAUREN_GRAD: Photo[] = [
  { path: "/images/portfolio/graduation/lauren/lauren-01.jpg", a: "Lauren — fall graduation session", r: "p", ratio: 0.6667 },
  { path: "/images/portfolio/graduation/lauren/lauren-02.jpg", a: "Lauren — fall graduation session", r: "p", ratio: 0.6667 },
  { path: "/images/portfolio/graduation/lauren/lauren-03.jpg", a: "Lauren — fall graduation session", r: "p", ratio: 0.6667 },
  { path: "/images/portfolio/graduation/lauren/lauren-04.jpg", a: "Lauren — fall graduation session", r: "p", ratio: 0.6667 },
  { path: "/images/portfolio/graduation/lauren/lauren-05.jpg", a: "Lauren — fall graduation session", r: "p", ratio: 0.6667 },
  { path: "/images/portfolio/graduation/lauren/lauren-06.jpg", a: "Lauren — fall graduation session", r: "p", ratio: 0.6667 },
  { path: "/images/portfolio/graduation/lauren/lauren-07.jpg", a: "Lauren — fall graduation session", r: "p", ratio: 0.6667 },
  { path: "/images/portfolio/graduation/lauren/lauren-08.jpg", a: "Lauren — fall graduation session", r: "p", ratio: 0.6667 },
  { path: "/images/portfolio/graduation/lauren/lauren-09.jpg", a: "Lauren — fall graduation session", r: "p", ratio: 0.6667 },
];
const REI_GRAD: Photo[] = [
  { path: "/images/portfolio/graduation/rei/rei-01.jpg", a: "Rei — fall graduation session", r: "p", ratio: 0.6667 },
  { path: "/images/portfolio/graduation/rei/rei-02.jpg", a: "Rei — fall graduation session", r: "p", ratio: 0.6667 },
  { path: "/images/portfolio/graduation/rei/rei-03.jpg", a: "Rei — fall graduation session", r: "p", ratio: 0.6667 },
  { path: "/images/portfolio/graduation/rei/rei-04.jpg", a: "Rei — fall graduation session", r: "p", ratio: 0.6667 },
  { path: "/images/portfolio/graduation/rei/rei-05.jpg", a: "Rei — fall graduation session", r: "p", ratio: 0.6667 },
];
const ASSYRIAN_EVENT: Photo[] = [
  { path: "/images/portfolio/events/assyrian/assyrian-01.jpg", a: "The Assyrian gala — guests and celebration", r: "p", ratio: 0.6667 },
  { path: "/images/portfolio/events/assyrian/assyrian-02.jpg", a: "The Assyrian gala — guests and celebration", r: "l", ratio: 1.5 },
  { path: "/images/portfolio/events/assyrian/assyrian-03.jpg", a: "The Assyrian gala — guests and celebration", r: "p", ratio: 0.6667 },
  { path: "/images/portfolio/events/assyrian/assyrian-04.jpg", a: "The Assyrian gala — guests and celebration", r: "p", ratio: 0.6667 },
  { path: "/images/portfolio/events/assyrian/assyrian-06.jpg", a: "The Assyrian gala — guests and celebration", r: "p", ratio: 0.6667 },
  { path: "/images/portfolio/events/assyrian/assyrian-07.jpg", a: "The Assyrian gala — guests and celebration", r: "p", ratio: 0.6667 },
  { path: "/images/portfolio/events/assyrian/assyrian-08.jpg", a: "The Assyrian gala — guests and celebration", r: "t", ratio: 0.75 },
  { path: "/images/portfolio/events/assyrian/assyrian-09.jpg", a: "The Assyrian gala — guests and celebration", r: "l", ratio: 1.3333 },
  { path: "/images/portfolio/events/assyrian/assyrian-10.jpg", a: "The Assyrian gala — guests and celebration", r: "l", ratio: 1.3333 },
  { path: "/images/portfolio/events/assyrian/assyrian-11.jpg", a: "The Assyrian gala — guests and celebration", r: "l", ratio: 1.3333 },
  { path: "/images/portfolio/events/assyrian/assyrian-12.jpg", a: "The Assyrian gala — guests and celebration", r: "l", ratio: 1.3333 },
  { path: "/images/portfolio/events/assyrian/assyrian-13.jpg", a: "The Assyrian gala — guests and celebration", r: "l", ratio: 1.3333 },
];
const CORPORATE_EVENT: Photo[] = [
  { path: "/images/portfolio/events/corporate/corporate-01.jpg", a: "AKP fall banquet — highlight of the evening", r: "l", ratio: 1.5 },
  { path: "/images/portfolio/events/corporate/corporate-02.jpg", a: "Corporate event coverage", r: "l", ratio: 1.5 },
  { path: "/images/portfolio/events/corporate/corporate-04.jpg", a: "SJSU University Police — team portrait", r: "l", ratio: 1.3321 },
  { path: "/images/portfolio/events/corporate/corporate-06.jpg", a: "PwC networking reception", r: "l", ratio: 1.3333 },
];

export interface Project {
  id: string;
  title: string;
  place: string;
  year: string;
  cover: Photo;
  photos: Photo[];
}

export interface Category {
  label: string;
  tagline: string;
  intro: string;
  projects: Project[];
}

const P = PHOTOS;

export const CATEGORIES: Record<string, Category> = {
  weddings: {
    label: "Weddings",
    tagline: "Documented gracefully",
    intro:
      "The full arc of a day — the quiet preparation, the vows, the first dance. A curated record of the genuine.",
    projects: [
      { id: "sargon-odelya", title: "Sargon & Odelya", place: "Bay Area, CA", year: "2025", cover: SARGON_ODELYA_PHOTOS[12], photos: SARGON_ODELYA_CURATED },
      { id: "first-dance-film", title: "The First Dance", place: "Bay Area, CA", year: "2025", cover: P.firstDanceCine, photos: [P.firstDanceCine, P.firstDance04, P.firstDance03] },
    ],
  },
  couples: {
    label: "Couples",
    tagline: "The two of you, as you really are",
    intro:
      "Unposed sessions for couples — coastal walks, golden hour, the everyday closeness worth keeping.",
    projects: [
      { id: "along-the-coast", title: "Along the Coast", place: "San Francisco, CA", year: "2025", cover: P.coastalCandid, photos: [P.coastalCandid, P.coastal, P.coastKiss] },
    ],
  },
  graduations: {
    label: "Graduations",
    tagline: "The chapter that closes one and opens another",
    intro:
      "Candid, natural-light sessions that celebrate the milestone — and the person who earned it.",
    projects: [
      { id: "naomi-fall-25", title: "Naomi · Fall '25", place: "Berkeley, CA", year: "2025", cover: NAOMI_GRAD[0], photos: NAOMI_GRAD },
      { id: "lauren-fall-25", title: "Lauren · Fall '25", place: "San Jose, CA", year: "2025", cover: LAUREN_GRAD[0], photos: LAUREN_GRAD },
      { id: "dylan-fall-25", title: "Dylan · Fall '25", place: "San Jose, CA", year: "2025", cover: DYLAN_GRAD[0], photos: DYLAN_GRAD },
      { id: "rei-fall-25", title: "Rei · Fall '25", place: "San Jose, CA", year: "2025", cover: REI_GRAD[0], photos: REI_GRAD },
      { id: "akp-class-of-25", title: "AKP · Class of 2025", place: "San Jose, CA", year: "2025", cover: P.gradCapToss, photos: [P.gradCapToss] },
    ],
  },
  portraits: {
    label: "Portraits & Editorials",
    tagline: "Honest moments, shaped by light",
    intro:
      "Natural yet cinematic — imagery built from thoughtful direction and atmosphere.",
    projects: [
      { id: "in-shadow", title: "In Shadow", place: "Studio, SF", year: "2025", cover: P.editorial, photos: [P.editorial, P.bridal] },
      { id: "natural-light", title: "Natural Light", place: "Bay Area, CA", year: "2025", cover: P.bridal, photos: [P.bridal, P.coastal] },
    ],
  },
  events: {
    label: "Headshots & Events",
    tagline: "The room, as it really felt",
    intro:
      "Candid coverage that keeps the energy of the room without ever interrupting it.",
    projects: [
      { id: "on-the-floor", title: "On the Floor", place: "Bay Area, CA", year: "2025", cover: P.weddingParty, photos: [P.bridesmaidsToast, P.weddingParty, P.detailsFlat] },
      { id: "galas-and-gatherings", title: "Galas & Gatherings", place: "Bay Area, CA", year: "2025", cover: P.eventEmmys, photos: [P.eventEmmys, P.eventPwc, P.eventAssyrian] },
      { id: "assyrian-gala", title: "The Assyrian Gala", place: "San Jose, CA", year: "2025", cover: ASSYRIAN_EVENT[0], photos: ASSYRIAN_EVENT },
      { id: "corporate-community", title: "Corporate & Community", place: "Bay Area, CA", year: "2025", cover: CORPORATE_EVENT[0], photos: CORPORATE_EVENT },
    ],
  },
  engagements: {
    label: "Engagements & Proposals",
    tagline: "The moment before everything changes",
    intro:
      "The nerves, the question, the yes — and the golden-hour portraits that follow.",
    projects: [
      { id: "jake-proposal", title: "Jake · The Proposal", place: "Bay Area, CA", year: "2025", cover: P.proposal, photos: [P.proposal, P.coastal] },
    ],
  },
};

export const CAT_ORDER = [
  "weddings",
  "couples",
  "graduations",
  "portraits",
  "events",
  "engagements",
] as const;
