import { handle } from '@astrojs/cloudflare/handler';

// Worker-first routing also applies these headers to prerendered pages and assets.
export default {
  async fetch(request: Request, env: Env, context: ExecutionContext) {
    let response: Response;
    let stage: 'routing' | 'handler' = 'routing';
    try {
      const url = new URL(request.url);
      // Astro's static-asset shortcut otherwise bypasses trailingSlash redirects.
      if (url.pathname !== '/' && url.pathname.endsWith('/')) {
        url.pathname = url.pathname.replace(/\/+$/, '');
        response = Response.redirect(url, 308);
      } else {
        stage = 'handler';
        response = await handle(request, env, context);
      }
    } catch (error) {
      // Classify by built-in type only; thrown properties and request data may contain secrets.
      let errorType = 'unknown';
      try {
        errorType =
          [
            TypeError,
            RangeError,
            SyntaxError,
            ReferenceError,
            URIError,
            EvalError,
            AggregateError,
            Error
          ].find((type) => error instanceof type)?.name ?? 'unknown';
      } catch {
        // Even instanceof can throw for an opaque Proxy; diagnostics must not break the 500.
      }
      console.error('request_failed', { stage, errorType });
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
