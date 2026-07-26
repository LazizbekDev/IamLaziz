<script lang="ts">
  import { onMount } from 'svelte';
  import { getGsap, prefersReducedMotion } from '$lib/gsap';

  let line1El: HTMLSpanElement;
  let line2El: HTMLSpanElement;
  let subtitleEl: HTMLParagraphElement;
  let locationEl: HTMLParagraphElement;
  let ctaEl: HTMLDivElement;

  function splitLine(el: HTMLElement, text: string) {
    el.innerHTML = '';
    [...text].forEach((ch) => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = ch;
      el.appendChild(span);
    });
    return el.querySelectorAll('.char');
  }

  function showStatic() {
    line1El.textContent = 'LAZIZ';
    line2El.textContent = 'TOJIBOYEV';
    subtitleEl.style.opacity = '1';
    subtitleEl.style.transform = 'none';
    locationEl.style.opacity = '1';
    locationEl.style.transform = 'none';
    ctaEl.style.opacity = '1';
    ctaEl.style.transform = 'none';
  }

  onMount(() => {
    if (prefersReducedMotion()) {
      showStatic();
      return;
    }

    const { gsap } = getGsap();
    const chars1 = splitLine(line1El, 'LAZIZ');
    const chars2 = splitLine(line2El, 'TOJIBOYEV');

    const tl = gsap.timeline({ delay: 0.2 });
    tl.from(chars1, { opacity: 0, x: -40, duration: 0.6, stagger: 0.045, ease: 'power3.out' })
      .from(chars2, { opacity: 0, x: 40, duration: 0.6, stagger: 0.04, ease: 'power3.out' }, '-=0.5')
      .to(subtitleEl, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
      .to(locationEl, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
      .to(ctaEl, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.35');
  });
</script>

<section class="hero">
  <div class="hero-lines">
    <h1 aria-label="Laziz"><span bind:this={line1El}></span></h1>
  </div>
  <div class="hero-lines">
    <h1 aria-label="Tojiboyev"><span bind:this={line2El}></span></h1>
  </div>

  <p class="subtitle" bind:this={subtitleEl}>Full-Stack Developer</p>
  <p class="location mono" bind:this={locationEl}>Uzbekistan · Open to work</p>

  <div class="cta-row" bind:this={ctaEl}>
    <a href="/work" class="btn primary">View work →</a>
    <a
      href="/laziz-tojiboyev-cv.pdf"
      class="btn ghost"
      download="Laziz-Tojiboyev-CV.pdf"
      data-sveltekit-reload
    >Download CV</a>
  </div>

</section>

<style>
  .hero {
    min-height: 100svh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 var(--pad);
  }
  .hero-lines {
    overflow: hidden;
  }
  h1 {
    font-family: 'Cabinet Grotesk', sans-serif;
    font-weight: 800;
    font-size: var(--text-hero);
    line-height: 0.92;
    letter-spacing: -0.02em;
  }
  :global(.hero h1 .char) {
    display: inline-block;
  }
  .subtitle {
    margin-top: 2.25rem;
    font-size: var(--text-lg);
    color: var(--text-muted);
    font-weight: 500;
    opacity: 0;
    transform: translateY(16px);
  }
  .location {
    margin-top: 0.5rem;
    font-size: var(--text-sm);
    color: var(--text-muted);
    opacity: 0;
    transform: translateY(16px);
  }
  .cta-row {
    margin-top: 2.75rem;  
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    opacity: 0;
    transform: translateY(16px);
  }
</style>
