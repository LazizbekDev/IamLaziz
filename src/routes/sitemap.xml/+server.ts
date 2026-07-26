import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async () => {
  const pages = [
    { loc: 'https://iamlaziz.me', priority: '1.0' },
    { loc: 'https://iamlaziz.me/about', priority: '0.8' },
    { loc: 'https://iamlaziz.me/work', priority: '0.9' },
    { loc: 'https://iamlaziz.me/contact', priority: '0.7' }
  ];

  const urls = pages
    .map(
      (p) => `  <url>
    <loc>${p.loc}</loc>
    <changefreq>monthly</changefreq>
    <priority>${p.priority}</priority>
  </url>`
    )
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml' }
  });
};
