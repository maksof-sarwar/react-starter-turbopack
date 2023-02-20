/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['../../packages/ui/**/*.{ts,tsx,js,jsx}', './src/**/*.{ts,tsx,js,jsx}'],
	daisyui: {
		themes: [
			{
				app: {
					primary: '#2dbc64',
					secondary: '#f9c2cf',
					accent: '#f4cd7f',
					neutral: '#ffcccc',
					'base-100': '#EEEAF5',
					info: '#93A2E6',
					success: '#14763D',
					warning: '#E8A221',
					error: '#F02464',
				},
			},
		],
	},

	plugins: [require('daisyui'), require('flowbite/plugin')],
};
