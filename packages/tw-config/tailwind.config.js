/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['../../packages/ui/**/*.{ts,tsx,js,jsx}', './src/**/*.{ts,tsx,js,jsx}'],
	daisyui: {
		themes: [
			{
				app: {
					primary: '#d32880',
					secondary: '#099652',
					accent: '#a49fe0',
					neutral: '#1C161D',
					'base-100': '#FAF9FB',
					info: '#4CB9EB',
					success: '#12A178',
					warning: '#EBB40F',
					error: '#E4252B',
				},
			},
		],
	},

	plugins: [require('daisyui'), require('flowbite/plugin')],
};
