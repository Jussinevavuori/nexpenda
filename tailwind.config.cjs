/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require("tailwindcss/plugin");
const { rose, emerald, amber, slate } = require("tailwindcss/colors");

const withOpacity = (color, opacity) => {
	return color + Math.round(255 * opacity).toString(16).padStart(2, "0")
}

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class",
	safelist: [],
	theme: {
		fontFamily: {
			"sans": "Poppins, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\"",
			"mono": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;"
		},
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
			},
			opacity: {
				15: "0.15",
				85: "0.85",
			},
			spacing: {
				"tabs": "3.5rem",
			},
			minHeight: {
				"button": "2.25rem",
				"tabs": "3.5rem",
				"screen": "var(--full-vh, 100vh)",
				"screenMinusTabs": "calc(var(--full-vh, 100vh) - 3.5rem)",
			},
			maxHeight: {
				"button": "2.25rem",
				"tabs": "3.5rem",
				"screenMinusTabs": "calc(var(--full-vh, 100vh) - 3.5rem)",
				"screen": "var(--full-vh, 100vh)",
			},
			height: {
				"button": "2.25rem",
				"tabs": "3.5rem",
				"screenMinusTabs": "calc(var(--full-vh, 100vh) - 3.5rem)",
				"screen": "var(--full-vh, 100vh)",
			},
			screens: {
				// Mobile and alias "m" for mobile
				mobile: { max: "900px" },
				m: { max: "900px" },

				// Desktop and alias "d" for desktop
				desktop: { min: "900px" },
				d: { min: "900px" },
			},
			colors: {

				white: {
					DEFAULT: "rgb(255 255 255 / <alpha-value>)",
					hover: "rgb(241 245 249 / <alpha-value>)", // slate 100
					pressed: "rgb(225 231 239 / <alpha-value>)", // slate 200

					1: withOpacity("#ffffff", 1.0),
					2: withOpacity("#ffffff", 1.0 - 1 * 0.15),
					3: withOpacity("#ffffff", 1.0 - 2 * 0.15),
					4: withOpacity("#ffffff", 1.0 - 3 * 0.15),
					5: withOpacity("#ffffff", 1.0 - 4 * 0.15),

					bg: {
						DEFAULT: "rgb(255 255 255 / <alpha-value>)",
						1: "rgb(255 255 255 / <alpha-value>)",
						2: "rgb(248 249 251 / <alpha-value>)",
						3: "rgb(241 244 248 / <alpha-value>)",
						4: "rgb(233 238 244 / <alpha-value>)",
						5: "rgb(226 232 240 / <alpha-value>)",
					}
				},

				black: {
					DEFAULT: "rgb(15 23 42 / <alpha-value>)",  // Slate 900
					hover: "rgb(8 12 21 / <alpha-value>)",  // Half-way slate 900 and black
					pure: "rgb(0 0 0 / <alpha-value>)",  // Pure black
					pressed: "rgb(0 0 0 / <alpha-value>)",  // Pure black

					1: withOpacity(slate[900], 1.0),
					2: withOpacity(slate[900], 1.0 - 1 * 0.15),
					3: withOpacity(slate[900], 1.0 - 2 * 0.15),
					4: withOpacity(slate[900], 1.0 - 3 * 0.15),
					5: withOpacity(slate[900], 1.0 - 4 * 0.15),

					bg: {
						DEFAULT: "rgb(21 30 49 / <alpha-value>)",
						1: "rgb(21 30 49 / <alpha-value>)", // Slate 860
						2: "rgb(26 36 54 / <alpha-value>)", // Slate 830
						3: "rgb(30 41 59 / <alpha-value>)", // Slate 800
						4: "rgb(36 48 67 / <alpha-value>)", // Slate 770
						5: "rgb(43 55 75 / <alpha-value>)", // Slate 740
					}
				},

				hover: {
					overlay: withOpacity(slate[500], 0.08),
				},

				active: {
					overlay: withOpacity(slate[500], 0.15),
				},

				divider: {
					DEFAULT: withOpacity(slate[500], 0.08),
					strong: withOpacity(slate[500], 0.24),
				},

				// Success colors
				success: {
					...emerald,
					DEFAULT: emerald[600],
					hover: emerald[700],
					pressed: emerald[800],
					outline: emerald[200],
				},

				// Warning colors
				warning: {
					...amber,
					DEFAULT: amber[600],
					hover: amber[700],
					pressed: amber[800],
					outline: amber[200],
				},

				// Danger colors
				danger: {
					...rose,
					DEFAULT: rose[600],
					hover: rose[700],
					pressed: rose[800],
					outline: rose[200],
				},

				// Dynamic primary color with alpha value
				"primary": {
					DEFAULT: "rgba(var(--color-primary-600) / <alpha-value>)",
					hover: "rgba(var(--color-primary-700) / <alpha-value>)",
					pressed: "rgba(var(--color-primary-800) / <alpha-value>)",
					outline: "rgba(var(--color-primary-200) / <alpha-value>)",
					50: "rgba(var(--color-primary-50) / <alpha-value>)",
					100: "rgba(var(--color-primary-100) / <alpha-value>)",
					200: "rgba(var(--color-primary-200) / <alpha-value>)",
					300: "rgba(var(--color-primary-300) / <alpha-value>)",
					400: "rgba(var(--color-primary-400) / <alpha-value>)",
					500: "rgba(var(--color-primary-500) / <alpha-value>)",
					600: "rgba(var(--color-primary-600) / <alpha-value>)",
					700: "rgba(var(--color-primary-700) / <alpha-value>)",
					800: "rgba(var(--color-primary-800) / <alpha-value>)",
					900: "rgba(var(--color-primary-900) / <alpha-value>)",
				},

				// Dynamic off-primary color with alpha value
				"off-primary": {
					DEFAULT: "rgba(var(--color-off-primary-600) / <alpha-value>)",
					hover: "rgba(var(--color-off-primary-700) / <alpha-value>)",
					pressed: "rgba(var(--color-off-primary-800) / <alpha-value>)",
					outline: "rgba(var(--color-off-primary-200) / <alpha-value>)",
					50: "rgba(var(--color-off-primary-50) / <alpha-value>)",
					100: "rgba(var(--color-off-primary-100) / <alpha-value>)",
					200: "rgba(var(--color-off-primary-200) / <alpha-value>)",
					300: "rgba(var(--color-off-primary-300) / <alpha-value>)",
					400: "rgba(var(--color-off-primary-400) / <alpha-value>)",
					500: "rgba(var(--color-off-primary-500) / <alpha-value>)",
					600: "rgba(var(--color-off-primary-600) / <alpha-value>)",
					700: "rgba(var(--color-off-primary-700) / <alpha-value>)",
					800: "rgba(var(--color-off-primary-800) / <alpha-value>)",
					900: "rgba(var(--color-off-primary-900) / <alpha-value>)",
				},

				// Dynamic off-primary alt color with alpha value
				"off-primary-alt": {
					DEFAULT: "rgba(var(--color-off-primary-alt-600) / <alpha-value>)",
					hover: "rgba(var(--color-off-primary-alt-700) / <alpha-value>)",
					pressed: "rgba(var(--color-off-primary-alt-800) / <alpha-value>)",
					outline: "rgba(var(--color-off-primary-alt-200) / <alpha-value>)",
					50: "rgba(var(--color-off-primary-alt-50) / <alpha-value>)",
					100: "rgba(var(--color-off-primary-alt-100) / <alpha-value>)",
					200: "rgba(var(--color-off-primary-alt-200) / <alpha-value>)",
					300: "rgba(var(--color-off-primary-alt-300) / <alpha-value>)",
					400: "rgba(var(--color-off-primary-alt-400) / <alpha-value>)",
					500: "rgba(var(--color-off-primary-alt-500) / <alpha-value>)",
					600: "rgba(var(--color-off-primary-alt-600) / <alpha-value>)",
					700: "rgba(var(--color-off-primary-alt-700) / <alpha-value>)",
					800: "rgba(var(--color-off-primary-alt-800) / <alpha-value>)",
					900: "rgba(var(--color-off-primary-alt-900) / <alpha-value>)",
				},
			}
		},
	},
	plugins: [
		require('@headlessui/tailwindcss'),
		require('@tailwindcss/typography'),
		plugin(({ addVariant }) => {
			addVariant(`d-inc`, `&[data-sign=inc]`);
			addVariant(`d-exp`, `&[data-sign=exp]`);

			const dataAttributes = ["active"]

			dataAttributes.map((attribute) => {
				addVariant(`d-${attribute}`, `&[data-${attribute}=true]`);
				addVariant(`!d-${attribute}`, `&[data-${attribute}=false]`);
			})
		}),
	],
};
