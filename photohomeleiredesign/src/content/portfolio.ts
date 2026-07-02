// Portfolio data for Lei Photography Collective.
// Real imagery from leiphotography.co (Squarespace CDN).

const BASE =
  "https://images.squarespace-cdn.com/content/v1/697c1d6344a3b1154bcbc39e/";

export function img(path: string, w = 1200): string {
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
}

export const PHOTOS = {
  firstDance04: { path: "128f88b3-0b33-486f-a168-7d3b3f98bd13/bay-area-wedding-photography-portfolio-first-dance-lei-photography-collective-04.jpg", a: "First dance beneath string lights, fog across the floor", r: "l" },
  firstDance03: { path: "24bb3601-4fd9-49bf-9fa1-8b2ecd9a4057/bay-area-wedding-photography-portfolio-first-dance-lei-photography-collective03.jpg", a: "First dance under warm string lights", r: "l" },
  firstDanceCine: { path: "13b436d7-c955-46a1-bc5c-e4faf35bb78c/bay-area-wedding-first-dance-cinematic-natural-light-lei-photography-collective", a: "Cinematic first dance in low light", r: "p" },
  sargonPrep: { path: "652fef9d-196e-4248-92d2-83d8abebf683/Lei.Photography.Co-PreSargon+lReEdit-12.jpg", a: "Quiet preparation moment before the ceremony", r: "p" },
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
  danceLift: { path: "a1619465-2e25-4145-bb00-b9b588e0d38b/bay-area-wedding-first-dance-lift-cinematic-natural-light-lei-photography-collective", a: "Groom lifting bride during their first dance, cinematic natural light", r: "l" },
  firstDanceBW: { path: "74b02691-e4f6-4e3b-856e-91b2ffedd398/bay-area-wedding-first-dance-black-and-white-lei-photography-collective", a: "First dance in black and white", r: "t" },
  coastalCandid: { path: "86c4e14a-bd49-4b5b-8bbe-b7ae2881bdb5/san-francisco-coastal-couples-portrait-candid-natural-light-lei-photography-collective", a: "Couple embracing by the ocean, candid natural light", r: "p" },
  groomPrep: { path: "bfb2b2c5-62c2-447d-ac15-c7b4ac7b80b2/bay-area-wedding-groom-getting-ready-candid-lei-photography-collective", a: "Groom laughing with a groomsman while getting ready", r: "p" },
  brideMother: { path: "477b873d-0c83-4d5e-8856-d0275ab31300/bay-area-wedding-bride-mother-getting-ready-black-and-white-lei-photography-collective", a: "Bride sharing an emotional moment with her mother, black and white", r: "t" },
  coastKiss: { path: "8664ce35-1a25-42be-8c14-9f85890ee554/Couple+sharing+an+intimate+kiss+during+a+black+and+white+engagement+session+along+the+San+Francisco+coast%2C+photographed+by+Lei+Photography+Collective.", a: "Couple sharing a kiss on the San Francisco coast, black and white", r: "p" },
} satisfies Record<string, Photo>;

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
      { id: "sargon-odelya", title: "Sargon & Odelya", place: "Bay Area, CA", year: "2025", cover: P.firstDance04, photos: [P.sargonPrep, P.sargon046, P.detailsFlat, P.sargon225, P.bridesmaidsToast, P.weddingParty, P.firstDance04, P.firstDance03] },
      { id: "first-dance-film", title: "The First Dance", place: "Bay Area, CA", year: "2025", cover: P.firstDanceCine, photos: [P.firstDanceCine, P.firstDance04, P.firstDance03] },
    ],
  },
  graduations: {
    label: "Graduations",
    tagline: "The chapter that closes one and opens another",
    intro:
      "Candid, natural-light sessions that celebrate the milestone — and the person who earned it.",
    projects: [
      { id: "naomi-fall-25", title: "Naomi · Fall '25", place: "Berkeley, CA", year: "2025", cover: P.naomi, photos: [P.naomi, P.gradLaughing] },
      { id: "lauren-fall-25", title: "Lauren · Fall '25", place: "San Jose, CA", year: "2025", cover: P.lauren, photos: [P.lauren, P.gradPortrait] },
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
  "graduations",
  "portraits",
  "events",
  "engagements",
] as const;
