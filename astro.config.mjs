import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";

const baseURL = 'https://cleannetwork.co.uk/'

export default defineConfig({
  site: baseURL,
  integrations: [sitemap({
    filter: (page) => !page.startsWith(baseURL + 'blog/'),
  })],
});
