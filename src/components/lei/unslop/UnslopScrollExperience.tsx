"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CTA_HREF, CTA_LABEL, POSITIONING } from "@/content/homepage";
import { CARD_FRAMES, TUNNEL_FRAMES } from "./frames";

gsap.registerPlugin(ScrollTrigger);

/**
 * Homepage copy only — exact lines from src/app/(site)/page.tsx.
 * Beats alternate with photo stretches so type never sits on the frames.
 */
const CHAPTERS = [
  {
    kicker: "Hi, I’m Raymond, A Bay Area Wedding Photographer.",
    title: "ICONIC, INTENTIONAL\nand unmistakably YOU",
    body: "",
  },
  {
    kicker: "",
    title:
      "Editorial when the moment calls for direction. Documentary when it deserves to unfold.",
    body: "",
  },
  {
    kicker: "For couples who love being iconic",
    title: "Main character energy.\nwithout missing the moment.",
    body: "Your wedding should feel like the best night of your life, not a day spent performing for the camera. I’ll step in with confident direction when it matters, then give you space to celebrate, cry, laugh, dance, and be completely present with the people you love.",
  },
] as const;

/** Photo-only ranges vs text-only ranges along the tunnel scrub (0–1). */
const PHOTO_WINDOWS: Array<[number, number]> = [
  [0.0, 0.2],
  [0.36, 0.52],
  [0.68, 0.82],
];
const TEXT_WINDOWS: Array<[number, number]> = [
  [0.24, 0.34],
  [0.56, 0.66],
  [0.86, 0.97],
];

const DEPTH = 980;

/** Trapezoid visibility: full in the middle, soft edges.
 *  Windows that start at 0 are fully on from the first frame. */
function windowShown(progress: number, a: number, b: number) {
  if (progress < a || progress > b) return 0;
  const span = Math.max(b - a, 0.001);
  const fade = Math.min(0.045, span * 0.28);
  if (a > 0 && progress < a + fade) return (progress - a) / fade;
  if (progress > b - fade) return (b - progress) / fade;
  return 1;
}

/**
 * Intro scroll → live homepage. Photos and homepage copy take turns;
 * finale opens the full site (gallery, about, inquire).
 */
export default function UnslopScrollExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const chapterRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const cardsPinRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsTitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const world = worldRef.current;
    const chapterEl = chapterRef.current;
    const progressEl = progressRef.current;
    const cardsPin = cardsPinRef.current;
    const track = trackRef.current;
    const cardsTitle = cardsTitleRef.current;
    if (
      !root ||
      !stage ||
      !world ||
      !chapterEl ||
      !progressEl ||
      !cardsPin ||
      !track ||
      !cardsTitle
    ) {
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const setChapter = (index: number, shown: number) => {
      const ch = CHAPTERS[index] ?? CHAPTERS[0];
      const kicker = chapterEl.querySelector<HTMLElement>("[data-kicker]");
      const title = chapterEl.querySelector<HTMLElement>("[data-title]");
      const body = chapterEl.querySelector<HTMLElement>("[data-body]");
      if (kicker) {
        kicker.textContent = ch.kicker;
        kicker.style.display = ch.kicker ? "block" : "none";
      }
      if (title) {
        title.textContent = ch.title;
        // Manifesto on the homepage is italic Bodoni
        title.style.fontStyle = index === 1 ? "italic" : "normal";
      }
      if (body) {
        body.textContent = ch.body;
        body.style.display = ch.body ? "block" : "none";
      }
      gsap.set(chapterEl, {
        autoAlpha: shown,
        y: (1 - shown) * 20,
      });
    };

    const ctx = gsap.context(() => {
      const travel = (TUNNEL_FRAMES.length - 1) * DEPTH;

      const applyTunnelProgress = (p: number) => {
        gsap.set(progressEl, { scaleX: p * 0.5 });

        let photoVis = 0;
        PHOTO_WINDOWS.forEach(([a, b]) => {
          photoVis = Math.max(photoVis, windowShown(p, a, b));
        });
        gsap.set(world, {
          autoAlpha: photoVis,
          filter: `brightness(${0.7 + photoVis * 0.3})`,
        });

        let best = 0;
        let bestShown = 0;
        TEXT_WINDOWS.forEach(([a, b], i) => {
          const shown = windowShown(p, a, b);
          if (shown > bestShown) {
            bestShown = shown;
            best = i;
          }
        });
        const textShown = photoVis > 0.15 ? 0 : bestShown;
        setChapter(best, textShown);

        const planes = world.querySelectorAll<HTMLElement>("[data-plane]");
        planes.forEach((plane, i) => {
          const planeZ = -i * DEPTH + p * travel;
          const dist = Math.abs(planeZ);
          const opacity = dist < 1600 ? 1 - dist / 1600 : 0;
          const scale = 0.9 + Math.max(0, 1 - dist / 2000) * 0.15;
          gsap.set(plane, { opacity: Math.max(0, opacity) });
          const img = plane.querySelector("img");
          if (img) gsap.set(img, { scale });
        });
      };

      // First paint: photos on, copy off
      applyTunnelProgress(0);

      gsap.fromTo(
        world,
        { z: 0 },
        {
          z: travel,
          ease: "none",
          scrollTrigger: {
            id: "unslop-tunnel",
            trigger: stage,
            start: "top top",
            end: "+=520%",
            pin: true,
            scrub: reduced ? false : 1,
            anticipatePin: 1,
            onUpdate: (self) => applyTunnelProgress(self.progress),
            onRefresh: (self) => applyTunnelProgress(self.progress),
          },
        }
      );

      // Cards: homepage portfolio line, then photos only (no captions)
      gsap.set(cardsTitle, { autoAlpha: 1 });
      const cards = gsap.utils.toArray<HTMLElement>("[data-card]");
      const getTravel = () =>
        Math.max(0, track.scrollWidth - window.innerWidth + 96);

      gsap.set(cards, {
        rotateY: (i) => (i % 2 === 0 ? -26 : 26),
        rotateX: 10,
        z: -220,
        transformPerspective: 1600,
        transformOrigin: "50% 50%",
      });

      const cardTl = gsap.timeline({
        scrollTrigger: {
          id: "unslop-cards",
          trigger: cardsPin,
          start: "top top",
          end: () =>
            `+=${Math.max(getTravel() * 1.25, window.innerHeight * 2.4)}`,
          pin: true,
          scrub: reduced ? false : 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            gsap.set(progressEl, { scaleX: 0.5 + self.progress * 0.35 });
            // Title first, then fade it so cards own the frame
            const titleOut = Math.min(1, self.progress / 0.18);
            gsap.set(cardsTitle, {
              autoAlpha: 1 - titleOut,
              y: titleOut * -24,
            });
          },
        },
      });

      cardTl.to(track, { x: () => -getTravel(), ease: "none" }, 0);

      cards.forEach((card, i) => {
        cardTl.fromTo(
          card,
          { rotateY: i % 2 === 0 ? -26 : 26, rotateX: 10, z: -220 },
          { rotateY: 0, rotateX: 0, z: 60, ease: "none" },
          i * 0.05
        );
        cardTl.to(
          card,
          {
            rotateY: i % 2 === 0 ? 30 : -30,
            rotateX: -6,
            z: -240,
            ease: "none",
          },
          0.52 + i * 0.05
        );
      });

      gsap.fromTo(
        "[data-finale]",
        { autoAlpha: 0, y: 48 },
        {
          autoAlpha: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-finale]",
            start: "top 85%",
            end: "top 50%",
            scrub: reduced ? false : 0.5,
            onUpdate: (self) => {
              gsap.set(progressEl, { scaleX: 0.85 + self.progress * 0.15 });
            },
          },
        }
      );
    }, root);

    const t = window.setTimeout(() => ScrollTrigger.refresh(), 50);
    root.dataset.unslopReady = "1";

    return () => {
      window.clearTimeout(t);
      ctx.revert();
      delete root.dataset.unslopReady;
    };
  }, []);

  const goldBtn: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
    padding: "14px 28px",
    borderRadius: 999,
    background: "#B8905A",
    color: "#0E0D0B",
    textDecoration: "none",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
  };

  const ghostBtn: CSSProperties = {
    ...goldBtn,
    background: "transparent",
    color: "#F7F5F2",
    border: "1px solid rgba(247,245,242,.28)",
  };

  const quietLink: CSSProperties = {
    color: "rgba(247,245,242,.72)",
    textDecoration: "none",
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: "0.04em",
  };

  return (
    <div
      ref={rootRef}
      style={{
        background: "#0E0D0B",
        color: "#F7F5F2",
        fontFamily: "var(--font-dm-sans), sans-serif",
      }}
    >
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 28px",
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, rgba(14,13,11,.8), rgba(14,13,11,0))",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-bodoni), serif",
            fontSize: 18,
            fontWeight: 500,
          }}
        >
          Lei Photography <span style={{ opacity: 0.5 }}>Collective</span>
        </span>
        <Link
          href="/"
          style={{
            pointerEvents: "auto",
            color: "#B8905A",
            textDecoration: "none",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          Enter the site
        </Link>
      </header>

      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          zIndex: 50,
          background: "rgba(247,245,242,.12)",
        }}
      >
        <div
          ref={progressRef}
          style={{
            height: "100%",
            width: "100%",
            background: "#B8905A",
            transform: "scaleX(0)",
            transformOrigin: "left center",
          }}
        />
      </div>

      {/* ══ Tunnel: photos and homepage copy take turns ══ */}
      <section
        ref={stageRef}
        style={{
          position: "relative",
          zIndex: 2,
          height: "100vh",
          overflow: "hidden",
          perspective: 1500,
          perspectiveOrigin: "50% 48%",
          background: "#0E0D0B",
        }}
      >
        <div
          ref={worldRef}
          style={{
            position: "absolute",
            inset: 0,
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          {TUNNEL_FRAMES.map((frame, i) => {
            const side = i % 2 === 0 ? -1 : 1;
            const w = frame.portrait ? "min(46vw, 420px)" : "min(62vw, 640px)";
            return (
              <div
                key={frame.src}
                data-plane=""
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: w,
                  transform: `translate(-50%, -50%) translateX(${side * 14}vw) translateY(${(i % 3) * 3 - 3}vh) translateZ(${-i * DEPTH}px) rotateY(${side * 14}deg)`,
                  transformStyle: "preserve-3d",
                  borderRadius: 4,
                  overflow: "hidden",
                  boxShadow: "0 36px 90px rgba(0,0,0,.6)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={frame.src}
                  alt={frame.alt}
                  draggable={false}
                  style={{
                    display: "block",
                    width: "100%",
                    aspectRatio: frame.portrait ? "4 / 5" : "3 / 2",
                    objectFit: "cover",
                    transformOrigin: "center center",
                  }}
                />
              </div>
            );
          })}
        </div>

        <div
          ref={chapterRef}
          style={{
            position: "relative",
            zIndex: 5,
            width: "min(780px, 88vw)",
            margin: "0 auto",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            pointerEvents: "none",
            opacity: 0,
          }}
        >
          <p
            data-kicker=""
            style={{
              margin: "0 0 28px",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#B8905A",
              maxWidth: 520,
              lineHeight: 1.6,
            }}
          />
          <h1
            data-title=""
            style={{
              margin: 0,
              fontFamily: "var(--font-bodoni), serif",
              fontWeight: 500,
              fontSize: "clamp(32px, 4.8vw, 58px)",
              lineHeight: 1.18,
              letterSpacing: "0.01em",
              textWrap: "balance",
              whiteSpace: "pre-line",
              color: "#F7F5F2",
              textShadow: "0 2px 24px rgba(0,0,0,.35)",
            }}
          />
          <p
            data-body=""
            style={{
              margin: "28px 0 0",
              maxWidth: 520,
              fontSize: 16,
              lineHeight: 1.8,
              color: "rgba(247,245,242,.78)",
              textWrap: "pretty",
              display: "none",
            }}
          />
        </div>

        <p
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 36,
            left: 0,
            right: 0,
            zIndex: 6,
            textAlign: "center",
            fontSize: 10,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            fontWeight: 700,
            color: "rgba(247,245,242,.4)",
          }}
        >
          Scroll
        </p>
      </section>

      <div aria-hidden="true" style={{ height: "8vh" }} />

      {/* ══ Portfolio cards — title first, then photos alone ══ */}
      <section
        ref={cardsPinRef}
        style={{
          position: "relative",
          zIndex: 3,
          height: "100vh",
          background: "#0E0D0B",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          ref={cardsTitleRef}
          style={{
            position: "absolute",
            left: "6vw",
            top: "18vh",
            maxWidth: 640,
            zIndex: 4,
            pointerEvents: "none",
          }}
        >
          <p
            style={{
              margin: "0 0 16px",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#B8905A",
            }}
          >
            The Portfolio
          </p>
          <h2
            style={{
              margin: 0,
              fontFamily: "var(--font-bodoni), serif",
              fontWeight: 500,
              fontSize: "clamp(34px, 4.4vw, 56px)",
              lineHeight: 1.1,
            }}
          >
            Your day, the way it actually{" "}
            <em style={{ fontStyle: "italic", fontWeight: 400 }}>felt.</em>
          </h2>
        </div>

        <div style={{ perspective: 1600, perspectiveOrigin: "50% 45%" }}>
          <div
            ref={trackRef}
            style={{
              display: "flex",
              gap: 24,
              padding: "24px 8vw 48px",
              width: "max-content",
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
          >
            {CARD_FRAMES.map((frame) => (
              <article
                key={frame.src}
                data-card=""
                style={{
                  width: "min(360px, 72vw)",
                  flex: "0 0 auto",
                  transformStyle: "preserve-3d",
                  borderRadius: 4,
                  overflow: "hidden",
                  background: "#1a1814",
                  boxShadow: "0 28px 70px rgba(0,0,0,.5)",
                  willChange: "transform",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={frame.src}
                  alt={frame.alt}
                  draggable={false}
                  style={{
                    display: "block",
                    width: "100%",
                    aspectRatio: "4 / 5",
                    objectFit: "cover",
                  }}
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Gateway into the full site ══ */}
      <section
        data-finale=""
        style={{
          position: "relative",
          zIndex: 3,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "14vh 6vw 10vh",
          textAlign: "center",
          background: "#0E0D0B",
        }}
      >
        <div style={{ maxWidth: 720 }}>
          <p
            style={{
              margin: "0 0 18px",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#B8905A",
            }}
          >
            Lei Photography Collective
          </p>
          <h2
            style={{
              margin: "0 0 22px",
              fontFamily: "var(--font-bodoni), serif",
              fontWeight: 500,
              fontSize: "clamp(34px, 4.8vw, 58px)",
              lineHeight: 1.12,
              textWrap: "balance",
            }}
          >
            {POSITIONING}
          </h2>
          <p
            style={{
              margin: "0 0 40px",
              fontSize: 16,
              lineHeight: 1.8,
              color: "rgba(247,245,242,.65)",
              maxWidth: 520,
              marginInline: "auto",
            }}
          >
            That was the intro. Step into the full site — galleries, the story
            behind the work, collections, and a direct line to inquire.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 14,
              justifyContent: "center",
              marginBottom: 36,
            }}
          >
            <Link href="/" style={goldBtn}>
              Enter the homepage
            </Link>
            <Link href="/gallery" style={ghostBtn}>
              See more in the gallery
            </Link>
            <Link href={CTA_HREF} style={ghostBtn}>
              {CTA_LABEL}
            </Link>
          </div>

          <nav
            aria-label="Continue into the site"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "18px 28px",
              justifyContent: "center",
              marginBottom: 48,
            }}
          >
            <Link href="/about" style={quietLink}>
              About me
            </Link>
            <Link href="/inquire" style={quietLink}>
              Inquire
            </Link>
            <Link href="/investment" style={quietLink}>
              Investment
            </Link>
            <Link href="/experience" style={quietLink}>
              Experience
            </Link>
            <Link href="/graduations" style={quietLink}>
              Graduations
            </Link>
          </nav>

          <p
            style={{
              margin: 0,
              fontSize: 12,
              color: "rgba(247,245,242,.35)",
            }}
          >
            Intro → homepage → about · galleries whenever you&rsquo;re ready
          </p>
        </div>
      </section>
    </div>
  );
}
