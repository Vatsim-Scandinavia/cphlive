/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			backgroundImage: {
				'banner': "url('/1704964023517.png')",
			  }
		},
		colors: {
			vatscaprimary: '#43c6e7',
			vatscasecondary: '#1a475f',
			vatscaTertiary: '#011328',
			vatscaGrey: '#484b4c',
			vatscaSnow: '#dfebeb'
		  }
	},
	plugins: [require("daisyui")],
}
