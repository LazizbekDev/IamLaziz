import { browser } from '$app/environment';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

let registered = false;

export function getGsap() {
  if (browser && !registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

export function prefersReducedMotion() {
  if (!browser) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
