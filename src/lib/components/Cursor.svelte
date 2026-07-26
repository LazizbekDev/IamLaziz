<script lang="ts">
  import { onMount } from 'svelte';
  import { prefersReducedMotion } from '$lib/gsap';

  let cursorEl: HTMLDivElement;
  let active = false;
  let hovering = false;
  let clicking = false;

  onMount(() => {
    const isDesktop = window.matchMedia('(min-width: 861px)').matches;
    if (!isDesktop || prefersReducedMotion() || !cursorEl) return;

    document.body.classList.add('custom-cursor');

    let mx = 0, my = 0, cx = 0, cy = 0;
    let raf = 0;

    function onMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
      if (!active) {
        cx = mx;
        cy = my;
        active = true;
      }
    }

    function loop() {
      cx += (mx - cx) * 0.18;
      cy += (my - cy) * 0.18;
      cursorEl.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    }

    window.addEventListener('mousemove', onMove);
    loop();

    function onEnter() { hovering = true; }
    function onLeave() { hovering = false; }

    function addHoverListeners() {
      document.querySelectorAll('a, button, .btn').forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    }
    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    function onDown() { clicking = true; }
    function onUp() { clicking = false; }
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    return () => {
      document.body.classList.remove('custom-cursor');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  });
</script>

<div
  id="cursor"
  bind:this={cursorEl}
  class:active
  class:hovering
  class:clicking
  aria-hidden="true"
></div>

<style>
  #cursor {
    position: fixed;
    top: 0;
    left: 0;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--accent);
    pointer-events: none;
    z-index: 9999;
    opacity: 0;
    will-change: transform;
    transition: width 0.25s ease, height 0.25s ease, background 0.25s ease, border 0.25s ease, opacity 0.2s ease;
  }
  #cursor.active {
    opacity: 1;
  }
  #cursor.hovering {
    width: 44px;
    height: 44px;
    background: transparent;
    border: 1.5px solid var(--accent);
  }
  #cursor.clicking {
    width: 9px;
    height: 9px;
  }
</style>
