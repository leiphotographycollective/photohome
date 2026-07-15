// Shared motion engine for the Lei experience pages.
// A faithful port of the Claude Design prototypes' logic classes:
// Lenis smooth scroll, custom gold cursor + magnetic buttons, the Weddings
// header dropdown, letter-split title entrances, the home preloader + "O in
// COVER" hero bloom (with WebGL ripple), pinned horizontal collection,
// parallax columns/floats, manifesto word reveals and all scroll reveals —
// each keyed off the same data-* attributes as the prototypes.

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export interface LeiMotionOptions {
  /** Enables home-only behaviors: preloader, hero bloom, WebGL ripple. */
  home?: boolean;
  /** Play the counter/logo preloader before the hero entrance. */
  preloader?: boolean;
}

type Cleanup = () => void;

export function initLeiMotion(
  root: HTMLElement,
  opts: LeiMotionOptions = {}
): Cleanup {
  gsap.registerPlugin(ScrollTrigger);

  const q = <T extends HTMLElement = HTMLElement>(sel: string): T[] =>
    Array.from(root.querySelectorAll<T>(sel));
  const pre = root.querySelector<HTMLElement>("[data-preloader]");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Desktop-only cinematics: the preloader, 300vh hero bloom and WebGL
  // ripple are skipped on small screens — mobile ships a static hero for
  // instant first paint (evaluated once per init; the breakpoint matches
  // the responsive fallbacks in globals.css).
  const mobile = window.matchMedia("(max-width: 860px)").matches;
  const home = !!opts.home && !mobile;
  const preloader = !!opts.preloader && !mobile;
  if (pre && mobile) pre.style.display = "none";

  if (reduced) {
    if (pre) pre.style.display = "none";
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

  // ── Weddings header dropdown ───────────────────────────────────────────
  initDropdown(root, signal);

  // ── GSAP animations (scoped so cleanup reverts everything) ─────────────
  let computeO: (() => void) | undefined;

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

    // ── Home hero: split, preloader, bloom from the O in COVER (second lockup line) ──
    if (home) {
      const heroLetters = splitLines(q("[data-hero-line]"));
      gsap.set(heroLetters, { yPercent: 120, opacity: 0 });
      gsap.set(q("[data-hero-kicker],[data-hero-sub],[data-hero-hint]"), {
        opacity: 0,
        y: 20,
      });
      const line2 = q("[data-hero-line]")[1];
      const oSpan = line2
        ? Array.from(line2.querySelectorAll("span")).find(
            (s) => s.textContent === "O"
          )
        : null;

      const heroIn = gsap
        .timeline({ paused: true })
        .to(heroLetters, {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.035,
        })
        .to(
          "[data-hero-kicker]",
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.7"
        )
        .to(
          "[data-hero-sub],[data-hero-hint]",
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1 },
          "-=0.6"
        );

      if (preloader && pre) {
        const counter = pre.querySelector<HTMLElement>("[data-pl-counter]");
        const num = { v: 0 };
        gsap
          .timeline()
          .from(pre.querySelector("[data-pl-name]"), {
            opacity: 0,
            y: 30,
            duration: 0.9,
            ease: "power3.out",
          })
          .from(pre.querySelector("[data-pl-sub]"), { opacity: 0, duration: 0.6 }, "-=0.4")
          .to(
            num,
            {
              v: 100,
              duration: 1.9,
              ease: "power2.inOut",
              onUpdate: () => {
                if (counter)
                  counter.textContent = String(Math.round(num.v)).padStart(3, "0");
              },
            },
            0
          )
          .to(
            pre.querySelector("[data-pl-bar]"),
            { scaleX: 1, duration: 1.9, ease: "power2.inOut" },
            0
          )
          .to(pre, { yPercent: -100, duration: 1.1, ease: "expo.inOut", delay: 0.15 })
          .set(pre, { display: "none" })
          .add(() => {
            heroIn.play();
          }, "-=1.4");
      } else {
        if (pre) pre.style.display = "none";
        heroIn.play();
      }

      // Hero scroll cinematics — image blooms out of the O in COVER
      const heroSec = root.querySelector<HTMLElement>("[data-hero]");
      const media = root.querySelector<HTMLElement>("[data-hero-media]");
      if (heroSec && media) {
        let oPos = { x: window.innerWidth / 2, y: window.innerHeight * 0.46 };
        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroSec,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        computeO = () => {
          if (heroTl.scrollTrigger && heroTl.scrollTrigger.progress > 0.01) return;
          if (!oSpan || !media.parentElement) return;
          const hr = media.parentElement.getBoundingClientRect();
          const r = oSpan.getBoundingClientRect();
          if (!r.width) return;
          oPos = { x: r.left - hr.left + r.width / 2, y: r.top - hr.top + r.height / 2 };
          if (heroTl.scrollTrigger && heroTl.scrollTrigger.progress === 0) {
            gsap.set(media, { clipPath: `circle(0px at ${oPos.x}px ${oPos.y}px)` });
          }
        };
        const maxR = () => {
          const w = window.innerWidth;
          const h = window.innerHeight;
          return Math.ceil(
            Math.hypot(Math.max(oPos.x, w - oPos.x), Math.max(oPos.y, h - oPos.y))
          );
        };
        heroTl
          .fromTo(
            media,
            { clipPath: () => `circle(0px at ${oPos.x}px ${oPos.y}px)` },
            {
              clipPath: () => `circle(${maxR()}px at ${oPos.x}px ${oPos.y}px)`,
              ease: "power1.in",
              duration: 0.6,
            },
            0.05
          )
          .to(
            "[data-hero-lockup]",
            { opacity: 0, yPercent: -16, scale: 0.94, ease: "none", duration: 0.38 },
            0.18
          )
          .to("[data-hero-hint]", { opacity: 0, ease: "none", duration: 0.12 }, 0);
        heroIn.eventCallback("onComplete", () => computeO && computeO());
      }
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
        s.textContent = w + (i < words.length - 1 ? " " : "");
        s.style.cssText = "display:inline-block;opacity:.14;will-change:opacity";
        manifesto.appendChild(s);
        mWords.push(s);
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

  // ── WebGL hero ripple (home only, loaded lazily) ───────────────────────
  let glMouse: ((e: MouseEvent) => void) | null = null;
  if (home) {
    cleanups.push(
      initHeroGL(root, (fn) => {
        glMouse = fn;
      })
    );
    window.addEventListener("mousemove", (e) => glMouse && glMouse(e), { signal });
  }

  // ── Resize + late refresh ──────────────────────────────────────────────
  const onResize = () => {
    ScrollTrigger.refresh();
    if (computeO) computeO();
  };
  window.addEventListener("resize", onResize, { signal });
  const lateRefresh = window.setTimeout(() => {
    ScrollTrigger.refresh();
    if (computeO) computeO();
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

function initDropdown(root: HTMLElement, signal: AbortSignal): void {
  const trig = root.querySelector<HTMLElement>("[data-dd-trigger]");
  const panel = root.querySelector<HTMLElement>("[data-dd-panel]");
  if (!trig || !panel) return;
  let hideT: number | undefined;
  const place = () => {
    const r = trig.getBoundingClientRect();
    panel.style.left =
      Math.min(r.left - 20, window.innerWidth - panel.offsetWidth - 16) + "px";
    panel.style.top = r.bottom + 18 + "px";
  };
  const show = () => {
    window.clearTimeout(hideT);
    place();
    panel.style.pointerEvents = "auto";
    gsap.to(panel, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" });
  };
  const hide = () => {
    hideT = window.setTimeout(() => {
      panel.style.pointerEvents = "none";
      gsap.to(panel, { opacity: 0, y: 10, duration: 0.3, ease: "power2.in" });
    }, 180);
  };
  trig.addEventListener("mouseenter", show, { signal });
  trig.addEventListener("mouseleave", hide, { signal });
  panel.addEventListener("mouseenter", () => window.clearTimeout(hideT), { signal });
  panel.addEventListener("mouseleave", hide, { signal });
}

/** Three.js mouse-ripple distortion over the hero image (home page). */
function initHeroGL(
  root: HTMLElement,
  registerMouse: (fn: (e: MouseEvent) => void) => void
): Cleanup {
  let dead = false;
  let raf = 0;
  let renderer: { dispose(): void; domElement: HTMLCanvasElement } | null = null;
  let sizeFn: (() => void) | null = null;

  const mount = root.querySelector<HTMLElement>("[data-gl-mount]");
  const imgEl = root.querySelector<HTMLImageElement>("[data-hero-img]");
  if (!mount || !imgEl) return () => {};

  import("three")
    .then((THREE) => {
      if (dead) return;
      const loader = new THREE.TextureLoader();
      loader.setCrossOrigin("anonymous");
      loader.load(
        imgEl.src,
        (tex) => {
          if (dead) return;
          tex.minFilter = THREE.LinearFilter;
          const r = new THREE.WebGLRenderer({ antialias: true, alpha: true });
          renderer = r;
          r.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          const scene = new THREE.Scene();
          const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
          const image = tex.image as { width: number; height: number };
          const uniforms = {
            uTex: { value: tex },
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2(0.5, 0.5) },
            uVel: { value: 0 },
            uRes: { value: new THREE.Vector2(1, 1) },
            uImg: { value: new THREE.Vector2(image.width, image.height) },
          };
          const mat = new THREE.ShaderMaterial({
            uniforms,
            vertexShader:
              "varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position,1.0); }",
            fragmentShader: `
              varying vec2 vUv; uniform sampler2D uTex; uniform float uTime; uniform vec2 uMouse; uniform float uVel; uniform vec2 uRes; uniform vec2 uImg;
              void main(){
                vec2 ratio = vec2(min((uRes.x/uRes.y)/(uImg.x/uImg.y),1.0), min((uRes.y/uRes.x)/(uImg.y/uImg.x),1.0));
                vec2 uv = vec2(vUv.x*ratio.x+(1.0-ratio.x)*0.5, vUv.y*ratio.y+(1.0-ratio.y)*0.5);
                float d = distance(vUv*vec2(uRes.x/uRes.y,1.0), uMouse*vec2(uRes.x/uRes.y,1.0));
                float ripple = smoothstep(0.35,0.0,d) * uVel;
                uv += (vUv-uMouse) * ripple * 0.35;
                uv.y += sin(uv.x*6.0+uTime*0.4)*0.0035;
                vec4 c = texture2D(uTex,uv);
                float ca = ripple*0.02;
                c.r = texture2D(uTex,uv+vec2(ca,0.0)).r;
                c.b = texture2D(uTex,uv-vec2(ca,0.0)).b;
                gl_FragColor = c;
              }`,
          });
          scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat));
          mount.appendChild(r.domElement);
          r.domElement.style.cssText =
            "position:absolute;inset:0;width:100%;height:100%";
          const size = () => {
            const rect = mount.getBoundingClientRect();
            r.setSize(rect.width, rect.height, false);
            uniforms.uRes.value.set(rect.width, rect.height);
          };
          size();
          sizeFn = size;
          window.addEventListener("resize", size);

          let tx = 0.5,
            ty = 0.5,
            vel = 0,
            lx = 0.5,
            ly = 0.5;
          registerMouse((e: MouseEvent) => {
            const rect = mount.getBoundingClientRect();
            if (rect.bottom < 0 || rect.top > window.innerHeight) return;
            tx = (e.clientX - rect.left) / rect.width;
            ty = 1 - (e.clientY - rect.top) / rect.height;
          });
          const clock = new THREE.Clock();
          const loop = () => {
            if (dead) return;
            raf = requestAnimationFrame(loop);
            const m = uniforms.uMouse.value;
            m.x += (tx - m.x) * 0.08;
            m.y += (ty - m.y) * 0.08;
            vel = Math.min(1, Math.hypot(tx - lx, ty - ly) * 14);
            lx += (tx - lx) * 0.08;
            ly += (ty - ly) * 0.08;
            uniforms.uVel.value += (vel - uniforms.uVel.value) * 0.06;
            uniforms.uTime.value = clock.getElapsedTime();
            r.render(scene, cam);
          };
          loop();
        },
        undefined,
        () => {
          /* CORS or load failure — the <img> fallback stays visible */
        }
      );
    })
    .catch(() => {
      /* three failed to load — fallback img remains */
    });

  return () => {
    dead = true;
    if (raf) cancelAnimationFrame(raf);
    if (sizeFn) window.removeEventListener("resize", sizeFn);
    if (renderer) {
      renderer.domElement.remove();
      renderer.dispose();
    }
  };
}
