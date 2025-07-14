import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				'ig-navy': '#25395B',
				'ig-green': '#33CC99',
				'ig-sand': '#FFFFFF',
				'ig-cream': '#FFFFFF',
				'ig-grey-hover': '#F7F7F7',
				border: 'var(--ig-navy)',
				card: 'var(--ig-cream)',
				background: 'var(--ig-sand)',
				primary: {
					DEFAULT: '#25395B',
					foreground: '#FFFFFF',
				},
				accent: {
					DEFAULT: '#33CC99',
					foreground: '#FFFFFF',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				// Game-specific colors
				brand: {
					green: '#33cc99',
					navy: '#2b3b5d',
				},
				cash: '#fbbf24',
				health: '#ef4444',
				education: '#3b82f6',
				'poverty-line': '#14b8a6',
				'top-percent': '#a78bfa',
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				'brand-lg': '40px',
				'brand-md': '35%',
				lg: '0.5rem',
				md: '0.375rem',
				sm: '0.25rem',
				none: '0px',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			},
			fontFamily: {
				heading: [
					'Brandon Grotesque',
					'Inter',
					'ui-sans-serif',
					'system-ui',
					'sans-serif',
				],
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
