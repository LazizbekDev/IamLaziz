<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { onNavigate } from '$app/navigation';
  import Cursor from '$lib/components/Cursor.svelte';
  import Nav from '$lib/components/Nav.svelte';
  import { initLenis, destroyLenis, scrollToTop } from '$lib/lenis';
  import { getGsap, prefersReducedMotion } from '$lib/gsap';
  import { killPageTransition, runPageTransition } from '$lib/pageTransition';

  onMount(() => {
    document.documentElement.classList.remove('is-transitioning');
    killPageTransition();

    const { ScrollTrigger } = getGsap();
    initLenis(() => ScrollTrigger.update());

    return () => {
      killPageTransition();
      destroyLenis();
    };
  });

  onNavigate((navigation) => {
    if (!navigation.to || !navigation.from) return;
    if (navigation.from.url.pathname === navigation.to.url.pathname) return;

    if (prefersReducedMotion()) {
      killPageTransition();
      return navigation.complete.then(() => {
        scrollToTop(true);
        getGsap().ScrollTrigger.refresh();
      });
    }

    const revealerEl = document.getElementById('revealer');
    const pageEl = document.getElementById('page');
    if (!revealerEl || !pageEl) return;

    return runPageTransition({
      revealerEl,
      pageEl,
      navigationComplete: navigation.complete
    });
  });
</script>

<Cursor />
<Nav />

<div id="revealer" aria-hidden="true">
  <span class="revealer-edge"></span>
</div>

<div id="page">
  <div class="page-content">
    <slot />
  </div>

  <footer>
    <span class="mono">© 2026 Laziz Tojiboyev</span>
    <span class="mono">iamlaziz.me</span>
  </footer>
</div>

<style>
  #revealer {
    position: fixed;
    inset: 0;
    z-index: 9990;
    background: #111111;
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
    will-change: transform;
  }

  .revealer-edge {
    position: absolute;
    top: 0;
    right: 0;
    width: 2px;
    height: 100%;
    background: var(--accent);
    box-shadow: 0 0 28px color-mix(in srgb, var(--accent) 50%, transparent);
  }

  #page {
    min-height: 100svh;
    display: flex;
    flex-direction: column;
  }

  .page-content {
    flex: 1;
  }

  footer {
    padding: 2rem var(--pad);
    border-top: 1px solid var(--border);
    display: flex;
    justify-content: space-between;
    font-size: var(--text-xs);
    color: var(--text-muted);
  }
</style>
