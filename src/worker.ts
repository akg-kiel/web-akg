import { handle } from '@astrojs/cloudflare/handler';

// Worker-first routing also applies these headers to prerendered pages and assets.
export default {
  async fetch(request: Request, env: Env, context: ExecutionContext) {
    let response: Response;
    try {
      const url = new URL(request.url);
      // Astro's static-asset shortcut otherwise bypasses trailingSlash redirects.
      if (url.pathname !== '/' && url.pathname.endsWith('/')) {
        url.pathname = url.pathname.replace(/\/+$/, '');
        response = Response.redirect(url, 308);
      } else {
        response = await handle(request, env, context);
      }
    } catch {
      console.error('request_failed');
      response = new Response('Die Seite ist vorübergehend nicht erreichbar.', { status: 500 });
    }

    const secured = new Response(response.body, response);
    secured.headers.set('X-Robots-Tag', 'noindex, nofollow');
    secured.headers.set('X-Content-Type-Options', 'nosniff');
    secured.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    secured.headers.set('X-Frame-Options', 'DENY');
    secured.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    secured.headers.set(
      'Content-Security-Policy',
      "base-uri 'self'; frame-ancestors 'none'; object-src 'none'"
    );
    return secured;
  }
} satisfies ExportedHandler<Env>;
