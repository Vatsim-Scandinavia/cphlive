// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap()],
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Roboto",
      cssVariable: "--font-roboto",
      weights: ["100 900"],
      styles: ["normal", "italic"],
    },
  ],
  site: "https://cphlive.vatsim-scandinavia.org",
});
