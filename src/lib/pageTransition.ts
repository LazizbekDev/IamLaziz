import { getGsap } from '$lib/gsap';
import { scrollToTop, stopLenis, startLenis } from '$lib/lenis';

type Killable = { kill: () => void };

let activeTl: Killable | null = null;
/** Unblocks SvelteKit if a transition is aborted mid-cover */
let pendingResolve: (() => void) | null = null;
let busy = false;

function finishPending() {
  if (pendingResolve) {
    const resolve = pendingResolve;
    pendingResolve = null;
    resolve();
  }
}

function cleanup(revealerEl?: HTMLElement | null, pageEl?: HTMLElement | null) {
  const { gsap } = getGsap();
  const revealer = revealerEl ?? document.getElementById('revealer');
  const page = pageEl ?? document.getElementById('page');

  if (revealer) {
    gsap.killTweensOf(revealer);
    gsap.set(revealer, { xPercent: -100, autoAlpha: 0 });
  }
  if (page) page.style.visibility = '';
  document.documentElement.classList.remove('is-transitioning');
  startLenis();
  busy = false;
  activeTl = null;
}

export function killPageTransition() {
  activeTl?.kill();
  activeTl = null;
  // Critical: never leave SvelteKit waiting on a dead Promise
  finishPending();
  cleanup();
}

/**
 * Horizontal wipe. GSAP alone owns transform.
 * Returned Promise resolves after cover (SK swaps DOM), reveal runs after.
 */
export function runPageTransition(opts: {
  revealerEl: HTMLElement;
  pageEl: HTMLElement;
  navigationComplete: Promise<void>;
}): Promise<void> {
  const { gsap, ScrollTrigger } = getGsap();
  const { revealerEl, pageEl, navigationComplete } = opts;

  // Abort any in-flight transition cleanly
  activeTl?.kill();
  finishPending();
  gsap.killTweensOf(revealerEl);

  busy = true;
  stopLenis();
  scrollToTop(true);
  document.documentElement.classList.add('is-transitioning');

  return new Promise<void>((resolve) => {
    let settled = false;

    const unlock = () => {
      if (settled) return;
      settled = true;
      pendingResolve = null;
      resolve();
    };

    pendingResolve = unlock;

    // Failsafe: never hang navigation forever
    const failsafe = window.setTimeout(() => {
      unlock();
      cleanup(revealerEl, pageEl);
    }, 2500);

    const coverTl = gsap.timeline({
      onComplete: async () => {
        pageEl.style.visibility = 'hidden';
        unlock();

        try {
          await navigationComplete;
          scrollToTop(true);
          pageEl.style.visibility = '';

          await new Promise<void>((r) =>
            requestAnimationFrame(() => requestAnimationFrame(() => r()))
          );

          if (!busy) {
            window.clearTimeout(failsafe);
            return;
          }

          const revealTl = gsap.timeline({
            onComplete: () => {
              window.clearTimeout(failsafe);
              gsap.set(revealerEl, { xPercent: -100, autoAlpha: 0 });
              document.documentElement.classList.remove('is-transitioning');
              startLenis();
              ScrollTrigger.refresh();
              busy = false;
              activeTl = null;
            }
          });

          activeTl = revealTl;

          revealTl.fromTo(
            revealerEl,
            { xPercent: 0, autoAlpha: 1 },
            { xPercent: 100, duration: 0.65, ease: 'power3.inOut', force3D: true }
          );
        } catch {
          window.clearTimeout(failsafe);
          cleanup(revealerEl, pageEl);
        }
      }
    });

    activeTl = coverTl;

    coverTl.fromTo(
      revealerEl,
      { xPercent: -100, autoAlpha: 1 },
      { xPercent: 0, duration: 0.65, ease: 'power3.inOut', force3D: true }
    );
  });
}

export function isTransitionBusy() {
  return busy;
}
