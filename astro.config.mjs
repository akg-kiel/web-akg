import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import { defineConfig } from 'astro/config';
import { readdir, rm } from 'node:fs/promises';
import { withheldPhotoNames } from './src/lib/photos.mjs';

export default defineConfig({
  adapter: cloudflare(),
  integrations: [
    react(),
    {
      name: 'withhold-unapproved-photos',
      hooks: {
        'astro:build:done': async ({ dir }) => {
          // Hiding markup alone leaves public/ files reachable by their direct URLs.
          const images = new URL('images/', dir);
          for (const file of await readdir(images)) {
            if (withheldPhotoNames.some((name) => file.startsWith(`${name}-`)))
              await rm(new URL(file, images));
          }
        }
      }
    }
  ],
  build: { client: '.' },
  session: false,
  trailingSlash: 'never'
});
