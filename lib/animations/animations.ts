import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { mustGet } from "@/lib/utils/utils";

gsap.registerPlugin(ScrollTrigger);

type CardInfo = {
  el: SVGGElement;
  cx: number;
  cy: number;
  dAt: number;       // distance along path where the card “lives”
  locked: boolean;   // true once fully revealed (forward pass), until fully hidden on reverse pass
};

export const useHeroAnimation = () => {
  const root = useRef<HTMLDivElement>(null);     // Pinned section container
  const svgRef = useRef<SVGSVGElement>(null);    // The timeline SVG
  const circleRef = useRef<SVGCircleElement>(null); // Moving ball

  useGSAP(
    () => {
      // === 1) Query & setup ==================================================
      const guide = mustGet<SVGPathElement>(svgRef.current, "#orangeTrail");
      const overlay = mustGet<SVGPathElement>(svgRef.current, "#lavenderTrail");
      const ball = circleRef.current!;
      const cardEls = ([
        "#welcomeCard",
        "#watchDemoCard",
        "#cultureCard",
        "#teamMeetingCard",
      ] as const).map((sel) => mustGet<SVGGElement>(svgRef.current, sel));

      // Lavender path draws-in via stroke dashing (not opacity)
      const overlayLen = overlay.getTotalLength();
      overlay.style.strokeDasharray = `${overlayLen}`;
      overlay.style.strokeDashoffset = `${overlayLen}`;
      overlay.style.opacity = "1";

      // Hide all cards initially
      gsap.set(cardEls, {
        autoAlpha: 0,
        y: 20,
        scale: 0.95,
        filter: "blur(4px)",
        transformOrigin: "50% 50%",
      });

      // === 2) Geometry helpers ==============================================
      const guideLen = guide.getTotalLength();
      const clampLen = (d: number) => Math.max(0, Math.min(guideLen, d));
      const getPoint = (d: number) => guide.getPointAtLength(clampLen(d));

      // Given a point, find the length "d" along the path where it’s closest
      // (coarse sampling is totally fine here and very fast)
      const findNearestLengthOnPath = (x: number, y: number): number => {
        const step = 3; // smaller = more precise, more CPU
        let bestD = 0;
        let bestDist = Infinity;
        for (let d = 0; d <= guideLen; d += step) {
          const pt = getPoint(d);
          const dist = Math.hypot(pt.x - x, pt.y - y);
          if (dist < bestDist) {
            bestDist = dist;
            bestD = d;
          }
        }
        return bestD;
      };

      // === 3) Card metadata (center + projected length on path) =============
      const cards: CardInfo[] = cardEls.map((el) => {
        const bb = el.getBBox();
        const cx = bb.x + bb.width / 2;
        const cy = bb.y + bb.height / 2;
        const dAt = findNearestLengthOnPath(cx, cy);
        return { el, cx, cy, dAt, locked: false };
      });


      // === 4) Interaction tuning ============================================
      const NEAR_RADIUS = 150;   // start blending in as we enter this radius
      const CLOSE_RADIUS = 40;   // “close” zone used for reverse fade-out
      const PASS_HYSTERESIS = 10; // small buffer so “pass” feels decisive

      const clamp01 = gsap.utils.clamp(0, 1);

      // === 5) Scroll-driven animation =======================================
      const state = { d: 0 };

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=300%",
          scrub: true,
          pin: true,
        },
      });

      // Keep a handle to the ScrollTrigger to read direction
      const st = tl.scrollTrigger!;

      tl.to(state, {
        d: guideLen,
        onUpdate() {
          const p = getPoint(state.d);

          // -- Move ball --
          gsap.set(ball, { attr: { cx: p.x, cy: p.y } });

          // -- Draw lavender trail (0→1 progress) --
          const t = state.d / guideLen;
          overlay.style.strokeDashoffset = `${overlayLen * (1 - t)}`;

          // -- Cards logic: forward (dir=1) vs reverse (dir=-1) --
          const dir = st.direction; // 1 = forward, -1 = backward

          cards.forEach((info) => {
            const { el, cx, cy, dAt } = info;

            // Distance from ball to card center
            const dist = Math.hypot(p.x - cx, p.y - cy);

            if (dir === 1) {
              // ----- FORWARD SCROLL -----
              // 1) Blend IN proportionally as we enter NEAR_RADIUS
              if (!info.locked) {
                const alpha = clamp01(1 - dist / NEAR_RADIUS); // 0 far → 1 near
                // Tie position/scale/blur to alpha for a nice “float in”
                gsap.to(el, {
                  autoAlpha: alpha,
                  y: 20 * (1 - alpha),
                  scale: 0.95 + 0.05 * alpha,
                  filter: `blur(${4 * (1 - alpha)}px)`,
                  duration: 0.2,
                  ease: "linear",
                });
              }

              // 2) Once the ball has passed the card, lock to fully revealed
              if (!info.locked && state.d >= dAt + PASS_HYSTERESIS) {
                info.locked = true;
                gsap.to(el, {
                  autoAlpha: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                  duration: 0.5,
                  ease: "power2.out",
                });
              }
            } else {
              // ----- REVERSE SCROLL -----
              // If we’re still “past” the card (i.e., further than its dAt),
              // keep it fully shown and do not fade out yet.
              if (state.d > dAt + PASS_HYSTERESIS) return;

              // As we approach the card from the far side, start fading only when
              // we’re very close (CLOSE_RADIUS). This gives a “late” fade on reverse.
              const nearBackAlpha = clamp01(1 - dist / CLOSE_RADIUS);

              // Blend DOWN near the card, but only once we’re on its near side.
              // (Use a small duration so it feels responsive while scrubbing.)
              gsap.to(el, {
                autoAlpha: nearBackAlpha,
                y: 20 * (1 - nearBackAlpha),
                scale: 0.95 + 0.05 * nearBackAlpha,
                filter: `blur(${4 * (1 - nearBackAlpha)}px)`,
                duration: 0.2,
                ease: "linear",
              });

              // Once we’ve moved “before” the card (past it in reverse),
              // fully hide and unlock so it can re-reveal next time.
              if (state.d <= dAt - PASS_HYSTERESIS) {
                info.locked = false;
                gsap.to(el, {
                  autoAlpha: 0,
                  y: 20,
                  scale: 0.95,
                  filter: "blur(4px)",
                  duration: 0.4,
                  ease: "power2.inOut",
                });
              }
            }
          });
        },
      });
    },
    { scope: root }
  );

  return { root, svgRef, circleRef };
};
