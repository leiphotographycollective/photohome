"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CTA_HREF, CTA_LABEL } from "@/content/homepage";
import { CARD_FRAMES, TUNNEL_FRAMES } from "./frames";

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS = [
  {
    kicker: "Scroll to fly the gallery",
    title: "Your wedding, shot like the cover story it is.",
    body: "A 3D photo tunnel scrubbed with GSAP ScrollTrigger — pin, scrub, translateZ.",
  },
  {
    kicker: "Editorial · Documentary",
    title: "Directed when it matters.",
    body: "Clear direction for the portraits. Space to live the night when it should unfold.",
  },
  {
    kicker: "Bay Area & beyond",
    title: "Fog floors. Marina gold. String lights.",
    body: "Real frames from real days — the camera flies the gallery as you scroll.",
  },
  {
    kicker: "Keep going",
    title: "Then the cards turn in 3D.",
    body: "Pinned horizontal runway — rotateY / rotateX tied to scroll.",
  },
] as const;

const DEPTH = 920; // px between planes in the CSS 3D tunnel

/**
 * Creative /unslop preview: CSS 3D photo tunnel + GSAP ScrollTrigger pins/scrubs,
 * then a 3D card runway. Live homepage is untouched.
 */
export default function UnslopScrollExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const chapterRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const cardsPinRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const world = worldRef.current;
    const chapterEl = chapterRef.current;
    const progressEl = progressRef.current;
    const cardsPin = cardsPinRef.current;
    const track = trackRef.current;
    if (!root || !stage || !world || !chapterEl || !progressEl || !cardsPin || !track) {
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const setChapter = (index: number, shown: number) => {
      const ch = CHAPTERS[index] ?? CHAPTERS[0];
      const kicker = chapterEl.querySelector("[data-kicker]");
      const title = chapterEl.querySelector("[data-title]");
      const body = chapterEl.querySelector("[data-body]");
      if (kicker) kicker.textContent = ch.kicker;
      if (title) title.textContent = ch.title;
      if (body) body.textContent = ch.body;
      gsap.set(chapterEl, {
        autoAlpha: shown,
        y: (1 - shown) * 28,
        filter: `blur(${(1 - shown) * 6}px)`,
      });
    };

    const ctx = gsap.context(() => {
      setChapter(0, 1);

      const travel = (TUNNEL_FRAMES.length - 1) * DEPTH;

      // Fly the world toward the camera (planes come at you)
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
            end: "+=480%",
            pin: true,
            scrub: reduced ? false : 1,
            anticipatePin: 1,
            onUpdate: (self) => {
              gsap.set(progressEl, { scaleX: self.progress * 0.55 });

              const windows = [
                [0, 0.2],
                [0.22, 0.44],
                [0.48, 0.68],
                [0.72, 0.94],
              ] as const;
              let best = 0;
              let bestShown = 0;
              windows.forEach(([a, b], i) => {
                const mid = (a + b) / 2;
                const half = (b - a) / 2;
                const local =
                  1 -
                  Math.min(
                    1,
                    Math.abs(self.progress - mid) / Math.max(half, 0.001)
                  );
                const shown =
                  self.progress >= a && self.progress <= b ? local : 0;
                if (shown > bestShown) {
                  bestShown = shown;
                  best = i;
                }
              });
              setChapter(
                best,
                Math.max(bestShown, self.progress < 0.03 ? 1 : 0)
              );

              // Fade planes by distance from camera plane (z≈0 in view space)
              const planes = world.querySelectorAll<HTMLElement>("[data-plane]");
              planes.forEach((plane, i) => {
                const planeZ = -i * DEPTH + self.progress * travel;
                // in view when near 0 (in front of camera after world moves)
                const dist = Math.abs(planeZ);
                const opacity = dist < 1400 ? 1 - dist / 1400 : 0;
                const scale = 0.85 + Math.max(0, 1 - dist / 1800) * 0.2;
                gsap.set(plane, {
                  opacity: Math.max(0.05, opacity),
                  filter: `brightness(${0.55 + opacity * 0.45})`,
                });
                // keep base transform from data attributes via CSS; scale on wrapper child
                const img = plane.querySelector("img");
                if (img) gsap.set(img, { scale });
              });
            },
          },
        }
      );

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
            gsap.set(progressEl, { scaleX: 0.55 + self.progress * 0.45 });
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
        { autoAlpha: 0, y: 56 },
        {
          autoAlpha: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-finale]",
            start: "top 85%",
            end: "top 48%",
            scrub: reduced ? false : 0.5,
          },
        }
      );
    }, root);

    // overflow on ancestors kills pin — force refresh after layout
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 50);
    root.dataset.unslopReady = "1";

    return () => {
      window.clearTimeout(t);
      ctx.revert();
      delete root.dataset.unslopReady;
    };
  }, []);

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
            "linear-gradient(180deg, rgba(14,13,11,.75), rgba(14,13,11,0))",
        }}
      >
        <Link
          href="/unslop"
          style={{
            pointerEvents: "auto",
            color: "#F7F5F2",
            textDecoration: "none",
            fontFamily: "var(--font-bodoni), serif",
            fontSize: 18,
            fontWeight: 500,
          }}
        >
          Lei Photography <span style={{ opacity: 0.55 }}>Collective</span>
        </Link>
        <Link
          href="/"
          style={{
            pointerEvents: "auto",
            color: "#B8905A",
            textDecoration: "none",
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          Exit preview → live site
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

      {/* ══ CSS 3D tunnel, pinned + scrubbed ══ */}
      <section
        ref={stageRef}
        style={{
          position: "relative",
          zIndex: 2,
          height: "100vh",
          overflow: "hidden",
          perspective: 1400,
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
            const w = frame.portrait ? "min(38vw, 340px)" : "min(52vw, 520px)";
            return (
              <div
                key={frame.src}
                data-plane=""
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: w,
                  transform: `translate(-50%, -50%) translateX(${side * 22}vw) translateY(${(i % 3) * 4 - 4}vh) translateZ(${-i * DEPTH}px) rotateY(${side * 18}deg)`,
                  transformStyle: "preserve-3d",
                  borderRadius: 10,
                  overflow: "hidden",
                  boxShadow: "0 30px 80px rgba(0,0,0,.55)",
                  border: "1px solid rgba(247,245,242,.08)",
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
            width: "min(720px, 88vw)",
            margin: "0 auto",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            pointerEvents: "none",
            textShadow: "0 8px 40px rgba(0,0,0,.65)",
          }}
        >
          <p
            data-kicker=""
            style={{
              margin: "0 0 18px",
              color: "#B8905A",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.04em",
            }}
          >
            {CHAPTERS[0].kicker}
          </p>
          <h1
            data-title=""
            style={{
              margin: "0 0 18px",
              fontFamily: "var(--font-bodoni), serif",
              fontWeight: 500,
              fontSize: "clamp(34px, 5.2vw, 64px)",
              lineHeight: 1.1,
              textWrap: "balance",
            }}
          >
            {CHAPTERS[0].title}
          </h1>
          <p
            data-body=""
            style={{
              margin: 0,
              maxWidth: 480,
              fontSize: 16,
              lineHeight: 1.65,
              color: "rgba(247,245,242,.78)",
              textWrap: "pretty",
            }}
          >
            {CHAPTERS[0].body}
          </p>
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
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(247,245,242,.45)",
          }}
        >
          Scroll
        </p>
      </section>

      <div aria-hidden="true" style={{ height: "10vh" }} />

      {/* ══ 3D card runway ══ */}
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
        <div style={{ padding: "0 6vw 28px", maxWidth: 720 }}>
          <p
            style={{
              margin: "0 0 10px",
              color: "#B8905A",
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            Horizontal pin · 3D transforms
          </p>
          <h2
            style={{
              margin: 0,
              fontFamily: "var(--font-bodoni), serif",
              fontWeight: 500,
              fontSize: "clamp(32px, 4.5vw, 56px)",
              lineHeight: 1.1,
            }}
          >
            Frames that turn as you move.
          </h2>
        </div>

        <div style={{ perspective: 1600, perspectiveOrigin: "50% 45%" }}>
          <div
            ref={trackRef}
            style={{
              display: "flex",
              gap: 28,
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
                  width: "min(340px, 70vw)",
                  flex: "0 0 auto",
                  transformStyle: "preserve-3d",
                  borderRadius: 12,
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
                <div
                  style={{
                    padding: "14px 16px 16px",
                    fontSize: 13,
                    color: "rgba(247,245,242,.7)",
                    lineHeight: 1.4,
                  }}
                >
                  {frame.alt}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        data-finale=""
        style={{
          position: "relative",
          zIndex: 3,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "12vh 6vw",
          textAlign: "center",
          background: "#0E0D0B",
        }}
      >
        <div style={{ maxWidth: 640 }}>
          <p style={{ margin: "0 0 16px", color: "#B8905A", fontSize: 13 }}>
            Unslop creative preview
          </p>
          <h2
            style={{
              margin: "0 0 20px",
              fontFamily: "var(--font-bodoni), serif",
              fontWeight: 500,
              fontSize: "clamp(36px, 5vw, 64px)",
              lineHeight: 1.08,
            }}
          >
            Present for your day. Directed when it counts.
          </h2>
          <p
            style={{
              margin: "0 0 36px",
              fontSize: 16,
              lineHeight: 1.7,
              color: "rgba(247,245,242,.65)",
            }}
          >
            Playground only — GSAP ScrollTrigger + CSS 3D. Live site unchanged.
            Want this energy on the real homepage? Say the word.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 14,
              justifyContent: "center",
            }}
          >
            <Link
              href={CTA_HREF}
              style={{
                display: "inline-flex",
                alignItems: "center",
                minHeight: 48,
                padding: "14px 26px",
                borderRadius: 10,
                background: "#B8905A",
                color: "#0E0D0B",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              {CTA_LABEL}
            </Link>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                minHeight: 48,
                padding: "14px 26px",
                borderRadius: 10,
                border: "1px solid rgba(247,245,242,.28)",
                color: "#F7F5F2",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Back to live homepage
            </Link>
          </div>
          <p
            style={{
              marginTop: 48,
              fontSize: 12,
              color: "rgba(247,245,242,.35)",
            }}
          >
            Motion craft inspired by unslop · Damir Sokolovsky (@heydamir) · CC
            BY 4.0
          </p>
        </div>
      </section>
    </div>
  );
}
