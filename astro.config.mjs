import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";


import react from '@astrojs/react';


// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  site: 'https://cphlive.vatsim-scandinavia.org/',
  vite: {
    plugins: [tailwindcss()],
  },
});