import keepPreset from "keep-react/preset";
/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "node_modules/keep-react/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        banner: "url('/1704964023517.png')",
      },
      colors: {
        'snow': '#dfebeb',
        'vat1': '#43c6e7',
        'vat2': '#1a475f',
        'vat3': '#011328'
      },
    },
  },
  darkMode: "class",
  presets: [keepPreset],
  plugins: [nextui()]
};
