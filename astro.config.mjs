import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";


import preact from "@astrojs/preact";


// https://astro.build/config
export default defineConfig({
  integrations: [tailwind({
    applyBaseStyles: false,
  }), react(), preact()],
  site: 'https://cphlive.vatsim-scandinavia.org/',
});