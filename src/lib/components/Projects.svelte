<script lang="ts">
  import { onMount } from 'svelte';
  import { getGsap, prefersReducedMotion } from '$lib/gsap';

  interface Project {
    num: string;
    name: string;
    tags: string;
    link?: string;
    linkLabel?: string;
    status?: string;
  }

  const projects: Project[] = [
    {
      num: '01',
      name: 'Chinora Academy',
      tags: 'Online learning platform · Built in 2 months · SvelteKit · TypeScript · SSR · Tailwind',
      link: 'https://chinoraacademy.uz',
      linkLabel: 'chinoraacademy.uz ↗'
    },
    {
      num: '02',
      name: 'Flash Note',
      tags: 'Chrome extension · Quick note-taking · Vanilla JS · Chrome Storage API',
      link: '#',
      linkLabel: 'Chrome Web Store ↗'
    },
    {
      num: '03',
      name: 'TMDB Bot',
      tags: 'Telegram bot · Movie & TV search · Python · TMDB API',
      link: 'https://t.me/tmdb_listbot',
      linkLabel: 't.me/tmdb_listbot ↗'
    },
    {
      num: '04',
      name: 'Attendance System',
      tags: 'Internal tool · Automated attendance tracking · React · Node.js',
      status: 'In progress'
    }
  ];

  let sectionEl: HTMLElement;
  let itemEls: HTMLDivElement[] = [];

  onMount(() => {
    if (prefersReducedMotion()) return;

    const { gsap } = getGsap();
    itemEls.forEach((el) => {
      gsap.set(el, { opacity: 0, y: 50 });
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' }
      });
    });
  });
</script>

<section class="projects wrap" bind:this={sectionEl}>
  <span class="eyebrow">Selected work</span>

  {#each projects as project, i}
    <div class="project" bind:this={itemEls[i]}>
      <div class="num mono"><span>{project.num}</span> / 04</div>
      <div>
        <h3>{project.name}</h3>
        <div class="tags mono">{project.tags}</div>
        {#if project.status}
          <div class="status mono">{project.status}</div>
        {/if}
      </div>
      {#if project.link}
        <a class="link mono" href={project.link} target="_blank" rel="noopener">{project.linkLabel}</a>
      {:else}
        <span class="link mono">—</span>
      {/if}
    </div>
  {/each}
</section>

<style>
  .projects {
    padding-top: 7rem;
  }
  .project {
    padding: 3.5rem 0;
    border-top: 1px solid var(--border);
    display: grid;
    grid-template-columns: 100px 1fr auto;
    gap: 2rem;
    align-items: baseline;
  }
  .project:last-child {
    border-bottom: 1px solid var(--border);
  }
  @media (max-width: 720px) {
    .project {
      grid-template-columns: 1fr;
      gap: 0.75rem;
    }
  }
  .num {
    color: var(--text-muted);
    font-size: var(--text-sm);
  }
  .num span {
    color: var(--accent);
  }
  h3 {
    font-family: 'Cabinet Grotesk', sans-serif;
    font-weight: 700;
    font-size: clamp(1.6rem, 3.4vw, 2.6rem);
    margin-bottom: 0.9rem;
    transition: color 0.3s;
  }
  .tags {
    font-size: var(--text-xs);
    color: var(--text-muted);
    letter-spacing: 0.03em;
  }
  .status {
    font-size: var(--text-xs);
    color: #080808;
    background: var(--accent);
    padding: 0.25rem 0.6rem;
    border-radius: 2px;
    width: fit-content;
    margin-top: 0.75rem;
  }
  .link {
    font-size: var(--text-sm);
    color: var(--text-muted);
    white-space: nowrap;
    transition: color 0.3s;
  }
  .project:hover .link,
  .project:hover h3 {
    color: var(--accent);
  }
</style>
