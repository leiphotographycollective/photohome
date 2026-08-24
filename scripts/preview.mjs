// Screenshot the site so a page can be looked at instead of guessed at.
//
// The dev server is reused when something is already listening on PORT,
// otherwise one is started here and stopped on the way out. Shots land in
// .preview/ (gitignored) as <route>-<device>.jpg.
//
// A full-page shot of a long page runs to tens of thousands of pixels tall.
// That single image is unwieldy: PNG at that size lands in the tens of
// megabytes, and anything that displays or uploads it tends to reject the
// aspect ratio outright. So shots are JPEG, and a page taller than
// SLICE_HEIGHT is cut into numbered top-to-bottom sections
// (home-desktop-01.jpg, -02.jpg, ...). Each section is clipped out of the
// full-page render, so a sticky header appears once rather than in every
// section. Pass --tall for one uncut image and --png for lossless.
//
//   npm run preview                     every route, desktop + mobile
//   npm run preview -- /gallery         one route
//   npm run preview -- /gallery --mobile
//
// Set CHROMIUM_PATH to point at an existing Chrome/Chromium build instead of
// letting Playwright manage one (`npx playwright install chromium` otherwise).
//
// Console errors and failed requests are collected per page: a broken image
// or a client component that threw shows up here rather than in a shot that
// merely looks a bit empty.

import { spawn } from "node:child_process";
import { mkdir, rm } from "node:fs/promises";
import { createConnection } from "node:net";
import { createRequire } from "node:module";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, ".preview");
const PORT = Number(process.env.PORT ?? 3000);
const BASE = `http://localhost:${PORT}`;

// Every page under src/app/(site). Keep in step when a route is added.
const ALL_ROUTES = [
  "/",
  "/about",
  "/experience",
  "/investment",
  "/gallery",
  "/gallery/weddings",
  "/gallery/engagements",
  "/gallery/events",
  "/gallery/events/airaea",
  "/gallery/events/flora-ai",
  "/gallery/events/sjsu-pd-emmys",
  "/gallery/events/other",
  "/second-weddings",
  "/wedding-timeline-guide",
  "/free-session",
  "/inquire",
  "/links",
];

// Tall enough to hold a section of a page in one look, short enough that the
// image stays a normal-looking picture.
const SLICE_HEIGHT = 2400;

const DEVICES = {
  desktop: { width: 1440, height: 900, deviceScaleFactor: 1, isMobile: false },
  mobile: {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  },
};

function parseArgs(argv) {
  const flags = new Set(argv.filter((a) => a.startsWith("--")));
  const routes = argv.filter((a) => !a.startsWith("--")).map((r) => (r.startsWith("/") ? r : `/${r}`));
  const devices = flags.has("--mobile")
    ? ["mobile"]
    : flags.has("--desktop")
      ? ["desktop"]
      : ["desktop", "mobile"];
  return {
    routes: routes.length ? routes : ALL_ROUTES,
    devices,
    fullPage: !flags.has("--fold"), // --fold shoots the viewport only
    png: flags.has("--png"),
    slice: !flags.has("--tall"),
  };
}

// playwright ships with the CLI in some environments and as a devDependency in
// others; take whichever resolves.
function loadChromium() {
  const require = createRequire(import.meta.url);
  const candidates = [
    "playwright",
    "playwright-core",
    "/opt/node22/lib/node_modules/playwright",
  ];
  for (const id of candidates) {
    try {
      return require(id).chromium;
    } catch {}
  }
  throw new Error(
    "playwright not found. Run: npm i -D playwright && npx playwright install chromium",
  );
}

function isPortOpen(port) {
  return new Promise((resolve) => {
    const socket = createConnection({ port, host: "127.0.0.1" });
    socket.once("connect", () => (socket.destroy(), resolve(true)));
    socket.once("error", () => resolve(false));
    socket.setTimeout(1000, () => (socket.destroy(), resolve(false)));
  });
}

async function waitForServer(port, timeoutMs = 90_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (await isPortOpen(port)) return true;
    await new Promise((r) => setTimeout(r, 400));
  }
  return false;
}

async function startDevServer() {
  if (await isPortOpen(PORT)) {
    console.log(`• reusing the dev server already on ${BASE}`);
    return null;
  }
  console.log(`• starting next dev on ${BASE}`);
  const child = spawn("npm", ["run", "dev"], {
    cwd: ROOT,
    stdio: "ignore",
    env: { ...process.env, PORT: String(PORT) },
    detached: true,
  });
  if (!(await waitForServer(PORT))) {
    try { process.kill(-child.pid); } catch {}
    throw new Error(`dev server never came up on ${BASE}`);
  }
  return child;
}

async function launchBrowser(chromium) {
  const executablePath = process.env.CHROMIUM_PATH || undefined;
  try {
    return await chromium.launch({ executablePath });
  } catch (err) {
    if (!executablePath && /Executable doesn't exist/.test(err.message)) {
      throw new Error(
        "No Chromium for Playwright. Run `npx playwright install chromium`, " +
          "or set CHROMIUM_PATH to a Chrome binary you already have.",
      );
    }
    throw err;
  }
}

const slug = (route) => (route === "/" ? "home" : route.slice(1).replace(/\//g, "-"));

async function shoot(browser, route, device, { fullPage, png, slice }) {
  const context = await browser.newContext({
    viewport: { width: DEVICES[device].width, height: DEVICES[device].height },
    deviceScaleFactor: DEVICES[device].deviceScaleFactor,
    isMobile: DEVICES[device].isMobile,
    hasTouch: DEVICES[device].hasTouch ?? false,
  });
  const problems = [];
  const page = await context.newPage();
  page.on("console", (msg) => {
    if (msg.type() === "error") problems.push(`console: ${msg.text()}`);
  });
  page.on("pageerror", (err) => problems.push(`pageerror: ${err.message}`));
  page.on("requestfailed", (req) =>
    problems.push(`request failed: ${req.url()} (${req.failure()?.errorText})`),
  );
  page.on("response", (res) => {
    if (res.status() >= 400) problems.push(`http ${res.status()}: ${res.url()}`);
  });

  const ext = png ? "png" : "jpg";
  const encode = png ? {} : { type: "jpeg", quality: 72 };
  const files = [];
  try {
    const res = await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 60_000 });
    if (res && res.status() >= 400) problems.push(`page returned http ${res.status()}`);
    // Scroll the page so anything revealed on scroll has fired before the shot.
    if (fullPage) {
      await page.evaluate(async () => {
        const step = window.innerHeight;
        for (let y = 0; y < document.body.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 120));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(600);
    }
    const width = DEVICES[device].width;
    const height = fullPage
      ? await page.evaluate(() => document.documentElement.scrollHeight)
      : DEVICES[device].height;

    if (fullPage && slice && height > SLICE_HEIGHT) {
      const count = Math.ceil(height / SLICE_HEIGHT);
      for (let i = 0; i < count; i++) {
        const y = i * SLICE_HEIGHT;
        const file = path.join(
          OUT,
          `${slug(route)}-${device}-${String(i + 1).padStart(2, "0")}.${ext}`,
        );
        await page.screenshot({
          ...encode,
          path: file,
          fullPage: true,
          clip: { x: 0, y, width, height: Math.min(SLICE_HEIGHT, height - y) },
        });
        files.push(file);
      }
    } else {
      const file = path.join(OUT, `${slug(route)}-${device}.${ext}`);
      await page.screenshot({ ...encode, path: file, fullPage });
      files.push(file);
    }
  } catch (err) {
    problems.push(`screenshot failed: ${err.message}`);
  } finally {
    await context.close();
  }
  return { route, device, files, problems };
}

const options = parseArgs(process.argv.slice(2));
const { routes, devices } = options;
const chromium = loadChromium();

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

const server = await startDevServer();
const browser = await launchBrowser(chromium);
const results = [];
try {
  for (const route of routes) {
    for (const device of devices) {
      const result = await shoot(browser, route, device, options);
      results.push(result);
      const mark = result.problems.length ? "!" : "✓";
      const names = result.files.map((f) => path.basename(f)).join(", ");
      console.log(`${mark} ${route} (${device}) -> ${names || "nothing"}`);
    }
  }
} finally {
  await browser.close();
  if (server) { try { process.kill(-server.pid); } catch {} }
}

const noisy = results.filter((r) => r.problems.length);
if (noisy.length) {
  console.log("\nProblems:");
  for (const r of noisy) {
    console.log(`  ${r.route} (${r.device})`);
    for (const p of [...new Set(r.problems)]) console.log(`    - ${p}`);
  }
}
const shotCount = results.reduce((n, r) => n + r.files.length, 0);
console.log(`\n${shotCount} shot(s) across ${results.length} page render(s) in .preview/`);
