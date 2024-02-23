/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			backgroundImage: {
				'banner': "url('/1704964023517.png')",
			  }
		},
	},
	darkMode: "class",
	plugins: [require("daisyui")],
}
