<script lang="ts">
  import { onMount } from 'svelte';
  import { getGsap, prefersReducedMotion } from '$lib/gsap';

  let leftEl: HTMLDivElement;
  let rightEl: HTMLDivElement;
  let sectionEl: HTMLElement;

  onMount(() => {
    if (prefersReducedMotion()) return;

    const { gsap } = getGsap();

    gsap.set(leftEl, { opacity: 0, x: -60 });
    gsap.set(rightEl, { opacity: 0, x: 60 });

    gsap.to(leftEl, {
      opacity: 1,
      x: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: sectionEl, start: 'top 75%' }
    });
    gsap.to(rightEl, {
      opacity: 1,
      x: 0,
      duration: 0.9,
      ease: 'power3.out',
      delay: 0.1,
      scrollTrigger: { trigger: sectionEl, start: 'top 75%' }
    });
  });
</script>

<section class="about wrap" bind:this={sectionEl}>
  <div class="about-grid">
    <div class="col-left" bind:this={leftEl}>
      <span class="eyebrow">About</span>
      <h2>I write code that changes real lives.</h2>
      <p class="quote">
        "I build things that solve real problems — not the kind that wins hackathons, the kind
        that helps my mom register for a government exam in 15 seconds while thousands fail."
      </p>
      <p>
        I'm a full-stack developer from Uzbekistan with 3+ years of experience shipping products
        end to end — from a Chrome extension used by thousands, to a Telegram bot with hundreds
        of daily users, to full learning platforms built from scratch.
      </p>
      <p>
        I care less about the stack being trendy and more about whether the thing actually works
        when someone depends on it.
      </p>
    </div>

    <div class="col-right" bind:this={rightEl}>
      <span class="stack-label mono">Stack</span>
      <ul class="stack-list">
        <li class="mono">React</li>
        <li class="mono">SvelteKit</li>
        <li class="mono">Node.js · FastAPI</li>
        <li class="mono">Flutter</li>
        <li class="mono">TypeScript</li>
      </ul>
    </div>
  </div>
</section>

<style>
  .about {
    padding-top: 7rem;
    padding-bottom: var(--section-gap);
  }
  .about-grid {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: clamp(2rem, 6vw, 6rem);
    align-items: start;
  }
  @media (max-width: 860px) {
    .about-grid {
      grid-template-columns: 1fr;
    }
  }
  h2 {
    font-family: 'Cabinet Grotesk', sans-serif;
    font-weight: 700;
    font-size: var(--text-xl);
    line-height: 1.1;
    margin-bottom: 2rem;
  }
  p {
    font-size: var(--text-base);
    color: var(--text-muted);
    line-height: 1.75;
    max-width: 46ch;
    margin-bottom: 1.25rem;
  }
  .quote {
    color: var(--text-primary);
    font-size: var(--text-lg);
    line-height: 1.6;
    font-weight: 500;
    max-width: 34ch;
    border-left: 1px solid var(--accent);
    padding-left: 1.5rem;
    margin-bottom: 2.5rem;
  }
  .stack-label {
    font-size: var(--text-xs);
    color: var(--text-muted);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 1rem;
    display: block;
  }
  .stack-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }
  .stack-list li {
    font-size: var(--text-base);
    padding-bottom: 0.6rem;
    border-bottom: 1px solid var(--border);
  }
</style>
