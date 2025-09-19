import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  integrations: [react()],
  site: 'https://cphlive.vatsim-scandinavia.org/',
  vite: {
    plugins: [tailwindcss()],
  },
});