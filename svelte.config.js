import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      runtime: 'nodejs20.x'
    }),
    prerender: {
      handleHttpError: ({ path, message }) => {
        if (path.startsWith('http')) return;
        throw new Error(message);
      }
    }
  }
};

export default config;
