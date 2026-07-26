<script lang="ts">
  import { page } from '$app/stores';

  const links = [
    { href: '/about', label: 'About' },
    { href: '/work', label: 'Work' },
    { href: '/contact', label: 'Contact' }
  ];
</script>

<nav>
  <a class="logo mono" href="/">LT/</a>
  <ul>
    {#each links as link}
      <li>
        <a href={link.href} class:active={$page.url.pathname === link.href}>{link.label}</a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9995;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.75rem var(--pad);
    mix-blend-mode: difference;
  }
  .logo {
    font-size: var(--text-sm);
    letter-spacing: 0.05em;
  }
  ul {
    list-style: none;
    display: flex;
    gap: 2.25rem;
  }
  a {
    font-size: var(--text-sm);
    font-family: 'JetBrains Mono', monospace;
    color: var(--text-primary);
    opacity: 0.7;
    transition: opacity 0.3s;
  }
  a:hover,
  a.active {
    opacity: 1;
  }
  @media (max-width: 640px) {
    ul {
      gap: 1.25rem;
    }
  }
</style>
