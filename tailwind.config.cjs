const { rose, emerald, amber, slate } = require("tailwindcss/colors");

const hexopacity = (number) => {
	return Math.round(255 * number).toString(16);
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
			strokeWidth: {
				'3': '3px',
				'4': '4px',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--gradient-color-stops))',
			},
			fontSize: {
				"buttonSize": ".933rem",
			},
			gridTemplateColumns: {
				'20': 'repeat(20, minmax(0, 1fr))',
			},
			opacity: {
				15: "0.15",
			},
			spacing: {
				"tabs": "3.5rem",
			},
			minHeight: {
				"tabs": "3.5rem",
				"screen": "var(--full-vh, 100vh)",
				"screenMinusTabs": "calc(var(--full-vh, 100vh) - 3.5rem)",
			},
			maxHeight: {
				"tabs": "3.5rem",
				"screenMinusTabs": "calc(var(--full-vh, 100vh) - 3.5rem)",
				"screen": "var(--full-vh, 100vh)",
			},
			height: {
				"tabs": "3.5rem",
				"screenMinusTabs": "calc(var(--full-vh, 100vh) - 3.5rem)",
				"screen": "var(--full-vh, 100vh)",
			},
			boxShadow: {
				"inset-sm": "inset 0 1px 2px 0 rgb(0 0 0 / 0.05)",
				"inset": "inset 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
				"inset-md": "inset 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
				"inset-lg": "inset 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
				"inset-xl": "inset 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
				"inset-2xl": "inset 0 25px 50px -12px rgb(0 0 0 / 0.25)",
			},
			dropShadow: {
				"intensive": [
					"0 1px 2px rgb(0 0 0 / 0.15)",
					"0 1px 1px rgb(0 0 0 / 0.12)"
				],
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
					DEFAULT: "#ffffff",
					hover: slate[100],
					pressed: slate[200],
					secondary: "#ffffff" + hexopacity(0.75),
					disabled: "#ffffff" + hexopacity(0.55),
				},

				black: {
					DEFAULT: slate[900],
					hover: "#080C15",
					pressed: "#000000",
					secondary: slate[900] + hexopacity(0.75),
					disabled: slate[900] + hexopacity(0.55),
					pure: "#000000",
				},

				divider: slate[500] + hexopacity(0.15),

				// Add more shades to slate palette
				slate: {
					710: "#313F52",
					720: "#2F3C50",
					730: "#2D3A4D",
					740: "#2B374B",
					750: "#293548",
					760: "#263345",
					770: "#243043",
					780: "#222E40",
					790: "#202B3E",
					810: "#1D2739",
					820: "#1B2538",
					830: "#1A2436",
					840: "#182234",
					850: "#172033",
					860: "#151E31",
					870: "#141C2F",
					880: "#121B2D",
					890: "#11192C",
				},

				// CSS-variable based dynamic primary color
				primary: {
					DEFAULT: "var(--color-primary-600)",
					hover: "var(--color-primary-700)",
					pressed: "var(--color-primary-800)",
					outline: "var(--color-primary-200)",

					50: "var(--color-primary-50)",
					100: "var(--color-primary-100)",
					200: "var(--color-primary-200)",
					300: "var(--color-primary-300)",
					400: "var(--color-primary-400)",
					500: "var(--color-primary-500)",
					600: "var(--color-primary-600)",
					700: "var(--color-primary-700)",
					800: "var(--color-primary-800)",
					900: "var(--color-primary-900)",
				},

				// Utility colors
				success: {
					...emerald,
					DEFAULT: emerald[600],
					hover: emerald[700],
					pressed: emerald[800],
					outline: emerald[200],
				},
				warning: {
					...amber,
					DEFAULT: amber[600],
					hover: amber[700],
					pressed: amber[800],
					outline: amber[200],
				},
				danger: {
					...rose,
					DEFAULT: rose[600],
					hover: rose[700],
					pressed: rose[800],
					outline: rose[200],
				},

				// CSS-variable based dynamic primary offset color main variant
				"off-primary": {
					DEFAULT: "var(--color-off-primary-600)",
					hover: "var(--color-off-primary-700)",
					pressed: "var(--color-off-primary-800)",
					outline: "var(--color-off-primary-200)",

					50: "var(--color-off-primary-50)",
					100: "var(--color-off-primary-100)",
					200: "var(--color-off-primary-200)",
					300: "var(--color-off-primary-300)",
					400: "var(--color-off-primary-400)",
					500: "var(--color-off-primary-500)",
					600: "var(--color-off-primary-600)",
					700: "var(--color-off-primary-700)",
					800: "var(--color-off-primary-800)",
					900: "var(--color-off-primary-900)",
				},

				// CSS-variable based dynamic primary offset color alternative variant
				"off-primary-alt": {
					DEFAULT: "var(--color-off-primary-alt-600)",
					hover: "var(--color-off-primary-alt-700)",
					pressed: "var(--color-off-primary-alt-800)",
					outline: "var(--color-off-primary-alt-200)",

					50: "var(--color-off-primary-alt-50)",
					100: "var(--color-off-primary-alt-100)",
					200: "var(--color-off-primary-alt-200)",
					300: "var(--color-off-primary-alt-300)",
					400: "var(--color-off-primary-alt-400)",
					500: "var(--color-off-primary-alt-500)",
					600: "var(--color-off-primary-alt-600)",
					700: "var(--color-off-primary-alt-700)",
					800: "var(--color-off-primary-alt-800)",
					900: "var(--color-off-primary-alt-900)",
				},
			}
		},
	},
	plugins: [require('@tailwindcss/typography')],
};
