This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Previewing a change

`npm run dev` and open http://localhost:3000 as usual. To capture what the site
actually looks like — for a design review, or to hand an agent something to look
at instead of guess at:

```bash
npm run preview                      # every route, desktop + mobile
npm run preview -- /gallery          # one route
npm run preview -- / /investment --mobile
npm run preview -- /about --fold     # above the fold only
```

Shots land in `.preview/` (gitignored). The script reuses a dev server if one is
already running and starts one otherwise. Pages taller than 2400px are cut into
numbered top-to-bottom sections, so `/` becomes `home-desktop-01.jpg` through
`home-desktop-07.jpg` rather than one 13000px strip.

It also reports console errors, page errors, and failed requests per route, so a
broken image or a client component that threw shows up as text rather than as a
shot that merely looks a bit empty.

Flags: `--desktop` / `--mobile` to pick one viewport, `--fold` for the viewport
only, `--tall` for one uncut image, `--png` for lossless. `PORT` picks the dev
server port; `CHROMIUM_PATH` points at an existing Chrome build instead of the
one Playwright manages (`npx playwright install chromium` otherwise).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
