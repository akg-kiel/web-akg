import type { APIRoute } from 'astro';

export const prerender = true;

// Crawlers must be able to read the noindex headers/meta, including on linked URLs.
export const GET: APIRoute = () =>
  new Response('User-agent: *\nDisallow:\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
