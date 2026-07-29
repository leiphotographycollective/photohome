// The photo library for Lei Photography Collective. This file is now purely a
// catalogue of frames: the category/project structure it used to carry went
// away when the site narrowed to weddings only. Which photos appear on
// /gallery is decided in the four gallery page files under
// src/app/(site)/gallery/.
//
// Real imagery from leiphotography.co (Squarespace CDN) plus local exports.

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

/** Look a frame up by filename rather than by array index, so reordering or
 *  inserting entries in the arrays below can never silently swap one photo for
 *  another at a call site. Throws at build time if the frame goes missing. */
export function pick(photos: Photo[], file: string): Photo {
  const found = photos.find((p) => p.path.endsWith(`/${file}`));
  if (!found) throw new Error(`portfolio.ts: no frame named ${file}`);
  return found;
}

export const PHOTOS = {
  marinaKiss: { path: "/images/bay-area-wedding-marina-golden-hour-kiss-lei-photography-collective.jpg", a: "Bride and groom kissing at golden hour, sailboat masts behind them at the marina", r: "p" },
  receptionEntrance: { path: "/images/bay-area-wedding-reception-entrance-fog-string-lights-lei-photography-collective.jpg", a: "Bride and groom walking onto a fog-covered dance floor beneath a canopy of string lights", r: "l" },
  shoulderDance: { path: "/images/bay-area-wedding-reception-groom-shoulder-dance-celebration-lei-photography-collective.jpg", a: "Groom lifted on shoulders during reception dancing, guests clapping around him", r: "p" },
  ringsEmbrace: { path: "/images/bay-area-wedding-rings-embrace-detail-lei-photography-collective.jpg", a: "Close-up of the couple's hands and rings as the groom embraces the bride in her beaded gown", r: "p" },
  firstDanceClouds: { path: "/images/bay-area-wedding-first-dance-clouds-lei-photography-collective.jpg", a: "First dance on a cloud of fog beneath string lights", r: "p" },
  marinaBoardwalk: { path: "/images/bay-area-wedding-marina-boardwalk-golden-hour-lei-photography-collective.jpg", a: "Bride and groom on the marina boardwalk at golden hour, sailboat masts behind them", r: "l" },
  marinaSunsetWalk: { path: "/images/bay-area-wedding-couple-marina-sunset-walk-lei-photography-collective.jpg", a: "Bride and groom walking hand in hand along the marina at sunset, sailboat masts behind them", r: "t" },
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
  coastal: { path: "4db9fa99-eb9a-4934-a0c8-434507f6c49d/bay-area-coastal-couples-portrait-natural-light-lei-photography-collective", a: "Couple embracing on the coast", r: "p", ratio: 0.6667 },
  proposal: { path: "fd9815f2-39b8-476e-9b16-bbf4d9b863ea/Lei.Photography.Co-JakeProposalReEdit-09.jpg", a: "The proposal, the moment of yes", r: "l", ratio: 1.5 },
  // Used outside the portfolio structure (about / experience pages)
  headshot: { path: "0fb5bd5d-f798-4ff4-a39a-665358854c87/Lei.Photogrpahy.co-Ray+Headshot-2.jpg", a: "Raymond Lei holding a camera outdoors beside yellow flowers", r: "p" },
  archEditorial: { path: "277ae67a-f224-4a1f-b0c1-393118b86947/bay-area-fashion-editorial-portrait-architectural-natural-light-lei-photography-collective", a: "Editorial portrait in an arched architectural walkway", r: "p" },
  bwEditorial: { path: "a135507e-bcbd-491f-8289-04335c1a17bf/bay-area-fashion-editorial-portrait-black-and-white-lei-photography-collective", a: "Black and white editorial portrait outdoors", r: "p" },
  gownEditorial: { path: "a4dc9303-abdb-418f-b9df-d2f910a25833/bay-area-fashion-editorial-portrait-evening-gown-lei-photography-collective", a: "Editorial portrait in a flowing evening gown, natural light", r: "p" },
  danceLift: { path: "a1619465-2e25-4145-bb00-b9b588e0d38b/bay-area-wedding-first-dance-lift-cinematic-natural-light-lei-photography-collective", a: "Groom lifting bride during their first dance, cinematic natural light", r: "p" },
  firstDanceBW: { path: "74b02691-e4f6-4e3b-856e-91b2ffedd398/bay-area-wedding-first-dance-black-and-white-lei-photography-collective", a: "First dance in black and white", r: "t" },
  coastalCandid: { path: "86c4e14a-bd49-4b5b-8bbe-b7ae2881bdb5/san-francisco-coastal-couples-portrait-candid-natural-light-lei-photography-collective", a: "Couple embracing by the ocean, candid natural light", r: "l", ratio: 1.5 },
  groomPrep: { path: "bfb2b2c5-62c2-447d-ac15-c7b4ac7b80b2/bay-area-wedding-groom-getting-ready-candid-lei-photography-collective", a: "Groom laughing with a groomsman while getting ready", r: "p" },
  brideMother: { path: "477b873d-0c83-4d5e-8856-d0275ab31300/bay-area-wedding-bride-mother-getting-ready-black-and-white-lei-photography-collective", a: "Bride sharing an emotional moment with her mother, black and white", r: "t" },
  coastKiss: { path: "8664ce35-1a25-42be-8c14-9f85890ee554/Couple+sharing+an+intimate+kiss+during+a+black+and+white+engagement+session+along+the+San+Francisco+coast%2C+photographed+by+Lei+Photography+Collective.", a: "Couple sharing a kiss on the San Francisco coast, black and white", r: "p", ratio: 0.6667 },
  // Local images — 2025 fall shoots, not yet migrated to the CDN
  gradCapToss: { path: "/images/portfolio/graduation/grad-akp-toss.jpg", a: "AKP graduates tossing their caps on campus", r: "p" },
  eventPwc: { path: "/images/portfolio/events/event-pwc.jpg", a: "Colleagues smiling together at a corporate networking event", r: "l" },
  eventAssyrian: { path: "/images/portfolio/events/event-assyrian-5.jpg", a: "Couple in evening attire at a gala, garden view behind them", r: "l" },
  eventEmmys: { path: "/images/portfolio/events/event-emmys.jpg", a: "Emmy award statues in gold light", r: "l" },
  confettiToast: { path: "/images/bay-area-wedding-reception-confetti-toast-black-and-white-lei-photography-collective.jpg", a: "Bride and groom toasting through a shower of heart confetti at their reception, black and white", r: "t" },
  firstDanceFog: { path: "/images/bay-area-wedding-first-dance-fog-string-lights-black-and-white-lei-photography-collective.jpg", a: "Bride and groom sharing their first dance on a fog-covered floor beneath string lights, black and white", r: "p", ratio: 0.6667 },
  marinaSunsetKiss: { path: "/images/bay-area-wedding-marina-sunset-kiss-lei-photography-collective.jpg", a: "Bride and groom kissing at sunset on the marina railing, sailboat masts glowing behind them", r: "t" },
  firstDanceLights: { path: "/images/bay-area-wedding-first-dance-fog-string-lights-lei-photography-collective.jpg", a: "Bride and groom holding hands during their first dance on a fog-covered floor beneath a canopy of string lights", r: "p" },
  gettingReadyToast: { path: "/images/bay-area-wedding-bride-bridesmaids-champagne-toast-getting-ready-lei-photography-collective.jpg", a: "Bride toasting champagne with her bridesmaids in sage green dresses while getting ready", r: "l" },
} satisfies Record<string, Photo>;

// Full "Sargon & Odelya" wedding gallery — local images at native aspect
// ratio (see `ratio` on each Photo), not the 4 RATIO_CSS presets above.
const SO_DIR = "/images/portfolio/weddings/sargon-odelya";
export const SARGON_ODELYA_PHOTOS: Photo[] = [
  { path: `${SO_DIR}/sargon-odelya-01.jpg`, a: "Bride's hands holding the wedding ring box", r: "p", ratio: 0.6667 },
  { path: `${SO_DIR}/sargon-odelya-02.jpg`, a: "Bridal details flat lay: pearl-strapped Jimmy Choo heels, Chanel perfume, pearl jewelry and the invitation", r: "l", ratio: 1.7778 },
  { path: `${SO_DIR}/sargon-odelya-03.jpg`, a: "Bride sharing an emotional moment with her mother, black and white", r: "p", ratio: 0.6667 },
  { path: `${SO_DIR}/sargon-odelya-04.jpg`, a: "Bride and bridesmaids toasting champagne while getting ready", r: "l", ratio: 1.5 },
  { path: `${SO_DIR}/sargon-odelya-05.jpg`, a: "Bridesmaids toasting champagne with the bride, alternate angle", r: "l", ratio: 1.5 },
  { path: `${SO_DIR}/sargon-odelya-06.jpg`, a: "Groom descending the stairs carrying a pearl-beaded scepter", r: "p", ratio: 0.6667 },
  { path: `${SO_DIR}/sargon-odelya-07.jpg`, a: "Guests cheering as the couple descends the staircase", r: "l", ratio: 1.5 },
  // Same frame as sargon-odelya-23.jpg below (index 22). Kept so the indices
  // above stay stable, but never render it: use index 22 instead.
  { path: `${SO_DIR}/sargon-odelya-08.jpg`, a: "Groom spraying champagne over the bride under a redwood tree, duplicate of sargon-odelya-23.jpg", r: "p", ratio: 0.6667 },
  { path: `${SO_DIR}/sargon-odelya-09.jpg`, a: "Bride in her lace veil reaching for the pearl ceremonial scepters against a sunlit garden wall", r: "p", ratio: 0.6667 },
  { path: `${SO_DIR}/sargon-odelya-10.jpg`, a: "Bride's veil lifted and moving in the breeze", r: "p", ratio: 0.6667 },
  { path: `${SO_DIR}/sargon-odelya-11.jpg`, a: "Close-up of the bride's engagement ring beneath her veil", r: "p", ratio: 0.6667 },
  { path: `${SO_DIR}/sargon-odelya-12.jpg`, a: "Bride beneath her veil, black and white portrait", r: "p", ratio: 0.6667 },
  { path: `${SO_DIR}/sargon-odelya-13.jpg`, a: "Bridesmaids toasting the bride on a garden balcony at golden hour", r: "l", ratio: 1.4999 },
  { path: `${SO_DIR}/sargon-odelya-14.jpg`, a: "Close detail of the bride's beaded gown, her engagement ring and her white cascading bouquet", r: "l", ratio: 1.5004 },
  { path: `${SO_DIR}/sargon-odelya-15.jpg`, a: "Bride and her three bridesmaids clinking champagne flutes on a garden balcony at golden hour", r: "l", ratio: 1.5 },
  { path: `${SO_DIR}/sargon-odelya-16.jpg`, a: "Bride's veil blowing across her face in soft light", r: "p", ratio: 0.6667 },
  { path: `${SO_DIR}/sargon-odelya-17.jpg`, a: "Bride lifting her cathedral veil overhead, laughing", r: "p", ratio: 0.6667 },
  { path: `${SO_DIR}/sargon-odelya-18.jpg`, a: "Bride's veil trailing in the wind, black and white", r: "p", ratio: 0.6667 },
  { path: `${SO_DIR}/sargon-odelya-19.jpg`, a: "Bride looking back over her shoulder, veil catching the sunset", r: "p", ratio: 0.6667 },
  { path: `${SO_DIR}/sargon-odelya-20.jpg`, a: "Bride and groom walking hand in hand across the lawn", r: "l", ratio: 1.5 },
  { path: `${SO_DIR}/sargon-odelya-21.jpg`, a: "Bride and groom walking together, alternate edit", r: "l", ratio: 1.5004 },
  { path: `${SO_DIR}/sargon-odelya-22.jpg`, a: "Bride and groom walking the garden path at golden hour, bouquet in hand", r: "l", ratio: 1.5001 },
  { path: `${SO_DIR}/sargon-odelya-23.jpg`, a: "Champagne spray celebration, alternate edit", r: "p", ratio: 0.6667 },
  { path: `${SO_DIR}/sargon-odelya-24.jpg`, a: "First dance beneath string lights, fog across the floor, black and white", r: "p", ratio: 0.6667 },
  { path: `${SO_DIR}/sargon-odelya-25.jpg`, a: "Head table set in front of the reception fireplace, banked with white roses and eucalyptus", r: "l", ratio: 1.5 },
  { path: `${SO_DIR}/sargon-odelya-26.jpg`, a: "Bride and groom moving through a crowd of cheering guests holding pearl ornaments aloft", r: "l", ratio: 1.4999 },
  { path: `${SO_DIR}/sargon-odelya-27.jpg`, a: "Groom lifted on guests' shoulders during the reception", r: "l", ratio: 1.5 },
  { path: `${SO_DIR}/sargon-odelya-28.jpg`, a: "Groom lifted on his friends' shoulders holding the pearl scepter, guests clapping beneath the string lights", r: "p", ratio: 0.6667 },
  { path: `${SO_DIR}/sargon-odelya-29.jpg`, a: "Bride and groom laughing mid-twirl on the dance floor", r: "p", ratio: 0.6667 },
  { path: `${SO_DIR}/sargon-odelya-30.jpg`, a: "Bride and groom embracing on the dance floor, reception lights above", r: "l", ratio: 1.5 },
  { path: `${SO_DIR}/sargon-odelya-31.jpg`, a: "Traditional money dance with the newlyweds, black and white", r: "l", ratio: 1.5 },
  { path: `${SO_DIR}/sargon-odelya-32.jpg`, a: "Groomsmen sharing a laugh while getting ready", r: "l", ratio: 1.4999 },
  { path: `${SO_DIR}/sargon-odelya-33.jpg`, a: "Groom laughing while a groomsman fastens his cufflink before the ceremony", r: "l", ratio: 1.5 },
  { path: `${SO_DIR}/sargon-odelya-34.jpg`, a: "Bride and groom walking hand in hand across the lawn, smiling at each other", r: "l", ratio: 1.5004 },
  { path: `${SO_DIR}/sargon-odelya-35.jpg`, a: "Bride and three bridesmaids in sage dresses toasting champagne while getting ready", r: "l", ratio: 1.7778 },
  { path: `${SO_DIR}/sargon-odelya-36.jpg`, a: "Bride laughing with her three bridesmaids as they clink champagne flutes while getting ready", r: "l", ratio: 1.5004 },
  { path: `${SO_DIR}/sargon-odelya-37.jpg`, a: "Groom lifting the bride during their first dance amid low fog beneath string lights", r: "p", ratio: 0.6665 },
];

// New 2025 sets imported from local exports. Exported so /gallery can seed
// from them; alt text here is what the gallery renders, so keep it accurate.
export const SARGON_ODELYA_MORE: Photo[] = [
  { path: "/images/portfolio/weddings/sargon-odelya-more/sargon-odelya-more-08.jpg", a: "Bride sitting at the end of the bed in her gown and veil, champagne chilling on the side table", r: "l", ratio: 1.5 },
  { path: "/images/portfolio/weddings/sargon-odelya-more/sargon-odelya-more-32.jpg", a: "Bride and groom reaching for each other across a floor of low fog, string lights overhead", r: "p", ratio: 0.6667 },
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
  SARGON_ODELYA_PHOTOS[33], // bridal details flat lay — heels, perfume, jewelry
  SARGON_ODELYA_PHOTOS[34], // bride & bridesmaids toast while getting ready
  SARGON_ODELYA_PHOTOS[35], // bride laughing with bridesmaids, champagne toast
  SARGON_ODELYA_PHOTOS[36], // first dance lift in low fog
];

// ── The three wedding sets behind /gallery ──────────────────────────────────
// Web-sized from Raymond's originals (1900px long edge, ~9MB for all 42). Each
// filename keeps the frame number from the original export, so any photo here
// traces straight back to the file it came from. `ratio` is the real decoded
// ratio, measured at export, not a guess: the masonry uses it to reserve the
// right height before the file loads. Arrays are in story order, getting ready
// through to the last dance, which is the order the grids render in.

const MD_DIR = "/images/portfolio/weddings/miranda-danny";
export const MIRANDA_DANNY_PHOTOS: Photo[] = [
  { path: `${MD_DIR}/miranda-danny-01.jpg`, a: "Bride holding her white bouquet as her veil sweeps across the frame, the harbour behind her", r: "l", ratio: 1.3324 },
  { path: `${MD_DIR}/miranda-danny-05.jpg`, a: "Bride resting against the groom on the dock, sailboat masts and still water behind them", r: "p", ratio: 0.6668 },
  { path: `${MD_DIR}/miranda-danny-12.jpg`, a: "Bride and groom holding each other on the boardwalk at sunset, her train spread across the boards", r: "l", ratio: 1.3324 },
  { path: `${MD_DIR}/miranda-danny-14.jpg`, a: "Groom cupping the bride's face at sunset, her bouquet held between them at the marina railing", r: "l", ratio: 1.3324 },
  { path: `${MD_DIR}/miranda-danny-02.jpg`, a: "Bride and groom leaning into each other with her white bouquet between them, sun flaring off the marina", r: "l", ratio: 1.4996 },
  { path: `${MD_DIR}/miranda-danny-07.jpg`, a: "Bride and groom kissing on the marina boardwalk as the sun breaks between them", r: "p", ratio: 0.6668 },
  { path: `${MD_DIR}/miranda-danny-08.jpg`, a: "Bride and groom forehead to forehead in sepia, the sun flaring behind her veil", r: "t", ratio: 0.7505 },
  { path: `${MD_DIR}/miranda-danny-03.jpg`, a: "Bride and groom small on the marina boardwalk, sailboat masts and the low sun filling the frame", r: "l", ratio: 1.3324 },
];

const TR_DIR = "/images/portfolio/weddings/trang";
export const TRANG_PHOTOS: Photo[] = [
  { path: `${TR_DIR}/trang-01.jpg`, a: "The wedding bands and earrings resting on a red invitation illustrated with the couple", r: "t", ratio: 0.7505 },
  { path: `${TR_DIR}/trang-11.jpg`, a: "Paddle fans for the bride's side and the groom's side laid out with heart sunglasses on a red reception table", r: "l", ratio: 1.3324 },
  // Same frame as trang-03 below, in colour rather than black and white. The
  // homepage renders this one; the gallery grid renders the black and white,
  // so the pair never lands side by side (see the filter in gallery.ts).
  { path: `${TR_DIR}/trang-02.jpg`, a: "Bride and groom at the altar seen from the back of the church, petals scattered down the aisle", r: "t", ratio: 0.7505 },
  { path: `${TR_DIR}/trang-03.jpg`, a: "Bride and groom at the altar seen from the back of the church, petals scattered down the aisle, black and white", r: "t", ratio: 0.7505 },
  { path: `${TR_DIR}/trang-04.jpg`, a: "Bride and groom kneeling together during the ceremony, family and wedding party in the pews behind them", r: "t", ratio: 0.7505 },
  { path: `${TR_DIR}/trang-05.jpg`, a: "The couple's hands resting together over the bouquet, both wedding bands on", r: "t", ratio: 0.7505 },
  { path: `${TR_DIR}/trang-10.jpg`, a: "Bride and groom walking out through a shower of petals with champagne in hand, black and white", r: "t", ratio: 0.7505 },
  { path: `${TR_DIR}/trang-07.jpg`, a: "Groom kissing the bride's cheek outside the church, her peach and white bouquet in hand", r: "t", ratio: 0.7511 },
];

const SOS_DIR = "/images/portfolio/weddings/sargon-odelya-select";
export const SARGON_ODELYA_SELECT: Photo[] = [
  { path: `${SOS_DIR}/so-select-reedit2-01.jpg`, a: "Bridal details flat lay: pearl-strapped Jimmy Choo heels, Chanel perfume, jewelry and the invitation", r: "l", ratio: 1.779 },
  { path: `${SOS_DIR}/so-select-158.jpg`, a: "Bride holding the open ring box in both hands against her beaded gown", r: "p", ratio: 0.6668 },
  { path: `${SOS_DIR}/so-select-042.jpg`, a: "Hands fastening the bride's pearl-studded heel while the second shoe waits on the rug, sepia", r: "p", ratio: 0.6668 },
  { path: `${SOS_DIR}/so-select-046.jpg`, a: "Bride's mother kneeling in navy lace to fasten her shoe while the bride laughs on the bed", r: "l", ratio: 1.4996 },
  { path: `${SOS_DIR}/so-select-062.jpg`, a: "Bride and her mother holding hands before the ceremony, black and white", r: "p", ratio: 0.6663 },
  { path: `${SOS_DIR}/so-select-reedit2-08.jpg`, a: "Bride and her bridesmaids in matching robes, backs to the camera, arms around each other", r: "l", ratio: 1.4996 },
  { path: `${SOS_DIR}/so-select-112.jpg`, a: "Bride and three bridesmaids in sage dresses laughing over a champagne toast", r: "l", ratio: 1.4996 },
  { path: `${SOS_DIR}/so-select-reedit2-02.jpg`, a: "Bride sitting at the end of the bed in her gown and veil, champagne chilling on the side table", r: "l", ratio: 1.4996 },
  { path: `${SOS_DIR}/so-select-225.jpg`, a: "Bride seated with her cascading white bouquet in a vintage living room", r: "p", ratio: 0.6668 },
  { path: `${SOS_DIR}/so-select-300.jpg`, a: "Bride lifting her cathedral veil overhead in soft window light", r: "p", ratio: 0.6668 },
  { path: `${SOS_DIR}/so-select-204.jpg`, a: "Bride in profile beneath her lace veil beside the beaded ceremonial fan and scepter", r: "p", ratio: 0.6668 },
  { path: `${SOS_DIR}/so-select-248.jpg`, a: "Groom laughing while a groomsman fastens his cufflink before the ceremony", r: "l", ratio: 1.4996 },
  { path: `${SOS_DIR}/so-select-167.jpg`, a: "Groom climbing the staircase carrying the pearl ceremonial scepter, guests waiting below", r: "p", ratio: 0.6668 },
  { path: `${SOS_DIR}/so-select-177.jpg`, a: "Guests raising pearl ornaments and cheering as the couple enters, seen from above", r: "l", ratio: 1.4996 },
  { path: `${SOS_DIR}/so-select-presargon-14.jpg`, a: "The wedding party lined up in the garden at golden hour, bridesmaids in sage and groomsmen in grey", r: "l", ratio: 1.5008 },
  { path: `${SOS_DIR}/so-select-presargon-07.jpg`, a: "Bride and groom walking hand in hand across the lawn beneath the olive trees", r: "l", ratio: 1.4996 },
  { path: `${SOS_DIR}/so-select-reedit2-14.jpg`, a: "Groom spraying champagne over the bride under the redwoods, her veil trailing behind her", r: "p", ratio: 0.6668 },
  { path: `${SOS_DIR}/so-select-retouch-02.jpg`, a: "Groom's arms wrapped around the bride's beaded gown, both wedding bands showing", r: "p", ratio: 0.6668 },
  { path: `${SOS_DIR}/so-select-540.jpg`, a: "Head table set in front of the reception fireplace, banked with white roses and eucalyptus", r: "l", ratio: 1.4996 },
  { path: `${SOS_DIR}/so-select-569.jpg`, a: "Bride and groom moving through a crowd of guests with phones and flowers raised", r: "l", ratio: 1.4996 },
  { path: `${SOS_DIR}/so-select-580.jpg`, a: "Groom lifted on his friends' shoulders holding the pearl scepter beneath the string lights", r: "p", ratio: 0.6668 },
  { path: `${SOS_DIR}/so-select-presargon-12.jpg`, a: "First dance in low fog beneath string lights, guests watching from the fireplace", r: "l", ratio: 1.4996 },
  { path: `${SOS_DIR}/so-select-636.jpg`, a: "Bride and groom on the fog-covered dance floor beneath a canopy of string lights, seen from behind", r: "l", ratio: 1.4996 },
  { path: `${SOS_DIR}/so-select-639.jpg`, a: "Bride and groom reaching for each other across the fog at the start of their first dance", r: "p", ratio: 0.6668 },
  { path: `${SOS_DIR}/so-select-reedit2-03.jpg`, a: "Groom lifting the bride off the floor during their first dance in low fog", r: "p", ratio: 0.6668 },
  { path: `${SOS_DIR}/so-select-641.jpg`, a: "First dance in black and white, the couple close together on a floor of low fog", r: "p", ratio: 0.6668 },
  { path: `${SOS_DIR}/so-select-686.jpg`, a: "The money dance, guests pressing in with bills raised, black and white", r: "l", ratio: 1.4996 },
];
