<script lang="ts">
  import { onMount } from 'svelte';
  import { getGsap, prefersReducedMotion } from '$lib/gsap';

  interface Stat {
    target: number;
    suffix: string;
    decimals?: number;
    label: string;
  }

  const stats: Stat[] = [
    { target: 840, suffix: '+', label: 'Bot users' },
    { target: 5.0, suffix: '★', decimals: 1, label: 'Chrome rating' },
    { target: 2, suffix: ' mo', label: 'Platform built' },
    { target: 3, suffix: '+ yrs', label: 'Experience' }
  ];

  let numEls: HTMLDivElement[] = [];

  onMount(() => {
    if (prefersReducedMotion()) {
      numEls.forEach((el, i) => {
        const stat = stats[i];
        el.textContent = stat.target.toFixed(stat.decimals ?? 0) + stat.suffix;
      });
      return;
    }

    const { gsap, ScrollTrigger } = getGsap();

    numEls.forEach((el, i) => {
      const stat = stats[i];
      const obj = { val: 0 };
      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: stat.target,
            duration: 1.4,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = obj.val.toFixed(stat.decimals ?? 0) + stat.suffix;
            }
          });
        }
      });
    });
  });
</script>

<section class="stats wrap">
  <div class="stats-grid">
    {#each stats as stat, i}
      <div class="stat">
        <div class="num" bind:this={numEls[i]}>0</div>
        <div class="label mono">{stat.label}</div>
      </div>
    {/each}
  </div>
</section>

<style>
  .stats {
    margin-top: var(--section-gap);
    padding-bottom: var(--section-gap);
  }
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border: 1px solid var(--border);
  }
  @media (max-width: 720px) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  .stat {
    padding: 3rem 1.5rem;
    text-align: center;
    border-right: 1px solid var(--border);
  }
  .stat:last-child {
    border-right: none;
  }
  @media (max-width: 720px) {
    .stat:nth-child(2n) {
      border-right: none;
    }
    .stat:nth-child(n + 3) {
      border-top: 1px solid var(--border);
    }
  }
  .num {
    font-family: 'Cabinet Grotesk', sans-serif;
    font-weight: 800;
    font-size: clamp(2rem, 4vw, 3rem);
    color: var(--accent);
  }
  .label {
    margin-top: 0.5rem;
    font-size: var(--text-xs);
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
</style>
