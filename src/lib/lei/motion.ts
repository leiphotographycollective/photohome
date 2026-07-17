// Shared motion engine for the Lei experience pages.
// A faithful port of the Claude Design prototypes' logic classes:
// Lenis smooth scroll, custom gold cursor + magnetic buttons, letter-split
// title entrances, pinned horizontal collection, parallax columns/floats,
// manifesto word reveals and all scroll reveals — each keyed off the same
// data-* attributes as the prototypes. The home hero is static (no load-in
// or scroll animation) and the header bar carries no motion behavior.

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

type Cleanup = () => void;

export function initLeiMotion(root: HTMLElement): Cleanup {
  gsap.registerPlugin(ScrollTrigger);

  const q = <T extends HTMLElement = HTMLElement>(sel: string): T[] =>
    Array.from(root.querySelectorAll<T>(sel));
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduced) {
    return () => {};
  }

  const cleanups: Cleanup[] = [];
  const ac = new AbortController();
  const { signal } = ac;
  cleanups.push(() => ac.abort());

  // ── Lenis smooth scroll ────────────────────────────────────────────────
  const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
  lenis.on("scroll", () => ScrollTrigger.update());
  const tick = (t: number) => lenis.raf(t * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  cleanups.push(() => {
    gsap.ticker.remove(tick);
    lenis.destroy();
  });

  // ── Custom cursor + magnetic buttons ───────────────────────────────────
  cleanups.push(initCursor(root, q, signal));

  // ── GSAP animations (scoped so cleanup reverts everything) ─────────────
  const ctx = gsap.context(() => {
    // ── Letter-split title entrance (interior pages) ──
    const titleLetters = splitLines(q("[data-title-line]"));
    if (titleLetters.length) {
      gsap.from(titleLetters, {
        yPercent: 120,
        opacity: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.035,
        delay: 0.2,
      });
    }

    // ── Floating parallax images ──
    q("[data-float]").forEach((el) => {
      const sp = parseFloat(el.getAttribute("data-speed") || "") || 60;
      gsap.fromTo(
        el,
        { y: sp },
        {
          y: -sp,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
        }
      );
    });

    // ── Manifesto word reveals ──
    q("[data-manifesto]").forEach((manifesto) => {
      const words = (manifesto.textContent || "").split(" ");
      manifesto.textContent = "";
      const mWords: HTMLElement[] = [];
      words.forEach((w, i) => {
        const s = document.createElement("span");
        s.textContent = w;
        s.style.cssText = "display:inline-block;opacity:.14;will-change:opacity";
        manifesto.appendChild(s);
        mWords.push(s);
        // Keep the space as a real text node between the inline-block spans so the
        // line can soft-wrap. A trailing space inside an inline-block gets trimmed,
        // which is why the manifesto was overflowing on one line.
        if (i < words.length - 1) manifesto.appendChild(document.createTextNode(" "));
      });
      gsap.to(mWords, {
        opacity: 1,
        stagger: 0.06,
        ease: "none",
        scrollTrigger: { trigger: manifesto, start: "top 78%", end: "top 30%", scrub: true },
      });
    });

    // ── Pinned horizontal collection ──
    const hwrap = root.querySelector<HTMLElement>("[data-hwrap]");
    const htrack = root.querySelector<HTMLElement>("[data-htrack]");
    if (hwrap && htrack) {
      const dist = () => htrack.scrollWidth - window.innerWidth + 76;
      gsap.to(htrack, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: hwrap,
          start: "top top",
          end: () => "+=" + dist(),
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
      q<HTMLImageElement>("[data-hpimg]").forEach((img) => {
        const wrap = img.parentElement;
        if (!wrap) return;
        wrap.addEventListener(
          "mouseenter",
          () => gsap.to(img, { scale: 1.06, duration: 0.8, ease: "power3.out" }),
          { signal }
        );
        wrap.addEventListener(
          "mouseleave",
          () => gsap.to(img, { scale: 1.12, duration: 0.8, ease: "power3.out" }),
          { signal }
        );
      });
    }

    // ── Ghost type scrubs ──
    q("[data-ghost]").forEach((ghost) => {
      const variant = ghost.getAttribute("data-ghost");
      if (variant === "hero") {
        // Weddings title: scales while the section scrolls away
        gsap.fromTo(
          ghost,
          { scale: 0.94 },
          {
            scale: 1.08,
            ease: "none",
            scrollTrigger: {
              trigger: ghost.parentElement,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      } else if (variant === "cat") {
        // Category hero
        gsap.fromTo(
          ghost,
          { scale: 0.94, opacity: 0.5 },
          {
            scale: 1.06,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ghost.closest("section"),
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      } else {
        gsap.fromTo(
          ghost,
          { scale: 0.92, opacity: 0.4 },
          {
            scale: 1.08,
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: ghost, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      }
    });

    // ── Sticky feature / full-bleed band zoom-outs ──
    q("[data-feature],[data-band]").forEach((el) => {
      gsap.to(el, {
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: el.closest("section"),
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    });

    // ── Parallax columns ──
    q("[data-col]").forEach((col) => {
      const sp = parseFloat(col.getAttribute("data-colspeed") || "") || 0;
      gsap.fromTo(
        col,
        { y: -sp },
        {
          y: sp,
          ease: "none",
          scrollTrigger: {
            trigger: col.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        }
      );
    });

    // ── Gallery image reveals ──
    q("[data-gimg]").forEach((img) => {
      gsap.fromTo(
        img,
        { clipPath: "inset(12% 6% 12% 6%)", scale: 1.12 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: img, start: "top 88%" },
        }
      );
    });

    // ── Project-page gallery items ──
    q("[data-gitem]").forEach((el) => {
      const img = el.querySelector("img");
      gsap.fromTo(
        el,
        { clipPath: "inset(10% 0 10% 0)" },
        {
          clipPath: "inset(0% 0 0% 0)",
          duration: 1.3,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        }
      );
      if (img) {
        gsap.fromTo(
          img,
          { scale: 1.12 },
          {
            scale: 1,
            duration: 1.4,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
          }
        );
      }
    });

    // ── Card entrances (category projects / related) ──
    q("[data-proj]").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        }
      );
    });
    q("[data-rel]").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 92%" },
        }
      );
    });

    // ── Generic fade-up + steps + clip reveals ──
    q("[data-fadeup]").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 44 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 92%" },
        }
      );
    });
    q("[data-step]").forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        }
      );
    });
    q("[data-reveal],[data-reveal2]").forEach((rev) => {
      gsap.fromTo(
        rev,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.5,
          ease: "expo.inOut",
          scrollTrigger: { trigger: rev, start: "top 82%" },
        }
      );
      const im = rev.querySelector("img");
      if (im) {
        gsap.to(im, {
          scale: 1,
          duration: 2,
          ease: "expo.out",
          scrollTrigger: { trigger: rev, start: "top 82%" },
        });
      }
    });
  }, root);
  cleanups.push(() => ctx.revert());

  // ── Resize + late refresh ──────────────────────────────────────────────
  const onResize = () => {
    ScrollTrigger.refresh();
  };
  window.addEventListener("resize", onResize, { signal });
  const lateRefresh = window.setTimeout(() => {
    ScrollTrigger.refresh();
  }, 800);
  cleanups.push(() => window.clearTimeout(lateRefresh));

  return () => {
    cleanups.reverse().forEach((fn) => fn());
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────

/** Split each line's text into per-letter spans (keeps <em> chunks whole).
 *  Letters are grouped inside nowrap word wrappers so lines can only break
 *  between words, never mid-word. */
function splitLines(lines: HTMLElement[]): HTMLElement[] {
  const letters: HTMLElement[] = [];
  lines.forEach((line) => {
    const frag = document.createDocumentFragment();
    let word: HTMLElement | null = null;
    Array.from(line.childNodes).forEach((node) => {
      if (node.nodeType === 3) {
        (node.textContent || "").split("").forEach((ch) => {
          if (ch === " ") {
            frag.appendChild(document.createTextNode(" "));
            word = null;
            return;
          }
          if (!word) {
            word = document.createElement("span");
            word.style.cssText = "display:inline-block;white-space:nowrap";
            frag.appendChild(word);
          }
          const s = document.createElement("span");
          s.textContent = ch;
          s.style.cssText = "display:inline-block;will-change:transform,opacity";
          word.appendChild(s);
          letters.push(s);
        });
      } else {
        word = null;
        frag.appendChild(node.cloneNode(true));
        const em = frag.lastChild as HTMLElement;
        em.style.display = "inline-block";
        letters.push(em);
      }
    });
    line.textContent = "";
    line.appendChild(frag);
  });
  return letters;
}

function initCursor(
  root: HTMLElement,
  q: (sel: string) => HTMLElement[],
  signal: AbortSignal
): Cleanup {
  if (!window.matchMedia("(pointer:fine)").matches) return () => {};
  document.body.classList.add("lx-cursor");
  const dot = root.querySelector<HTMLElement>("[data-cursor-dot]");
  const ring = root.querySelector<HTMLElement>("[data-cursor-ring]");
  const label = root.querySelector<HTMLElement>("[data-cursor-label]");
  if (!dot || !ring || !label) {
    document.body.classList.remove("lx-cursor");
    return () => {};
  }

  const pos = { x: -100, y: -100 };
  const ringP = { x: -100, y: -100 };
  let ringScale = 1;
  window.addEventListener(
    "mousemove",
    (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
    },
    { signal }
  );
  const cursorTick = () => {
    ringP.x += (pos.x - ringP.x) * 0.14;
    ringP.y += (pos.y - ringP.y) * 0.14;
    dot.style.transform = `translate(${pos.x - 3}px,${pos.y - 3}px)`;
    ring.style.transform = `translate(${ringP.x - 22}px,${ringP.y - 22}px) scale(${ringScale})`;
  };
  gsap.ticker.add(cursorTick);

  const grow = (txt: string | null) => {
    ringScale = txt ? 2.2 : 1.5;
    ring.style.background = txt ? "rgba(184,144,90,.92)" : "transparent";
    label.textContent = txt || "";
    label.style.color = "#fff";
    gsap.to(label, { opacity: txt ? 1 : 0, duration: 0.25 });
  };
  const shrink = () => {
    ringScale = 1;
    ring.style.background = "transparent";
    gsap.to(label, { opacity: 0, duration: 0.2 });
  };

  // Delegated so dynamically revealed content is covered too
  root.addEventListener(
    "mouseover",
    (e) => {
      const target = e.target as HTMLElement;
      const t = target.closest("[data-cursor]");
      if (t) grow(t.getAttribute("data-cursor"));
      else if (target.closest("[data-hover],a,button")) grow(null);
    },
    { signal }
  );
  root.addEventListener(
    "mouseout",
    (e) => {
      if ((e.target as HTMLElement).closest("[data-cursor],[data-hover],a,button"))
        shrink();
    },
    { signal }
  );

  // Magnetic buttons
  q("[data-mag]").forEach((el) => {
    el.addEventListener(
      "mousemove",
      (e) => {
        const r = el.getBoundingClientRect();
        gsap.to(el, {
          x: (e.clientX - r.left - r.width / 2) * 0.28,
          y: (e.clientY - r.top - r.height / 2) * 0.28,
          duration: 0.4,
          ease: "power3.out",
        });
      },
      { signal }
    );
    el.addEventListener(
      "mouseleave",
      () => gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1,0.4)" }),
      { signal }
    );
  });

  return () => {
    gsap.ticker.remove(cursorTick);
    document.body.classList.remove("lx-cursor");
  };
}

