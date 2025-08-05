import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Extend the Window interface to include __lenis
declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function initLenisWithGSAP(): Lenis | undefined {
  if (typeof window === 'undefined') return;

  if (window.__lenis) return window.__lenis;

  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({
    lerp: 0.1,
    gestureOrientation: 'vertical',
    smoothWheel: true,
    touchMultiplier: 1,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000); // GSAP uses seconds, Lenis uses ms
  });

  gsap.ticker.lagSmoothing(0);

  window.__lenis = lenis;
  return lenis;
}