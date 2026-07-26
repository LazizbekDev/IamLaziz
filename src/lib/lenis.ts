import { browser } from '$app/environment';
import Lenis from 'lenis';

let lenis: Lenis | null = null;
let rafId = 0;

export function initLenis(onScroll?: () => void) {
  if (!browser) return null;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return null;
  if (lenis) return lenis;

  lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
  });

  function raf(time: number) {
    lenis?.raf(time);
    rafId = requestAnimationFrame(raf);
  }
  rafId = requestAnimationFrame(raf);

  if (onScroll) {
    lenis.on('scroll', onScroll);
  }

  return lenis;
}

export function destroyLenis() {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = 0;
  lenis?.destroy();
  lenis = null;
}

export function scrollToTop(immediate = false) {
  if (lenis) {
    lenis.scrollTo(0, { immediate });
  } else if (browser) {
    window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' });
  }
}

export function stopLenis() {
  lenis?.stop();
}

export function startLenis() {
  lenis?.start();
}
