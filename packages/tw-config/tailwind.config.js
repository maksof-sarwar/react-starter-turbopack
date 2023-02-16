/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['../../packages/ui/**/*.{ts,tsx,js,jsx}', './src/**/*.{ts,tsx,js,jsx}'],
	theme: {
		extend: {},
	},
	plugins: [require('daisyui'), require('flowbite/plugin')],
};
