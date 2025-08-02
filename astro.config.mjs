import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import preact from "@astrojs/preact";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  integrations: [react(), preact()],
  site: 'https://cphlive.vatsim-scandinavia.org/',
  vite: {
    plugins: [tailwindcss()],
  },
});