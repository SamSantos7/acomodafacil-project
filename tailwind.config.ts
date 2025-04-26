import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        gold: {
          50: "#FBF8E6",
          100: "#F7F1CD",
          200: "#F0E49B",
          300: "#E8D669",
          400: "#E1C937",
          500: "#D4AF37", // Base gold
          600: "#AA8C2C",
          700: "#7F6921",
          800: "#554616",
          900: "#2A230B",
        },
        teal: {
          50: "#E6F7F7",
          100: "#CCEFEF",
          200: "#99DFDF",
          300: "#66CFCF",
          400: "#33BFBF",
          500: "#0F766E", // Base teal
          600: "#0C5F58",
          700: "#094742",
          800: "#06302C",
          900: "#031816",
        },
        sand: {
          50: "#FDFCF8",
          100: "#FBF9F1",
          200: "#F7F3E3",
          300: "#F3EDD5",
          400: "#EFE7C7",
          500: "#F5F5DC", // Base sand
          600: "#C4C4B0",
          700: "#939384",
          800: "#626258",
          900: "#31312C",
        },
        terracotta: {
          50: "#FCF2EF",
          100: "#F9E5DF",
          200: "#F3CBBF",
          300: "#EDB19F",
          400: "#E7977F",
          500: "#E07A5F", // Base terracotta
          600: "#B3624C",
          700: "#864939",
          800: "#5A3126",
          900: "#2D1813",
        },
        graphite: {
          50: "#E6E6E6",
          100: "#CCCCCC",
          200: "#999999",
          300: "#666666",
          400: "#333333", // Base graphite
          500: "#262626",
          600: "#1F1F1F",
          700: "#171717",
          800: "#0F0F0F",
          900: "#080808",
        },
        premium: {
          white: '#FFFFFF',
          graphite: '#2C2C2C',
          beige: '#F5F1EA',
          gold: '#D4B98C',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { transform: "translateY(20px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeIn: "fadeIn 0.5s ease-out",
        slideUp: "slideUp 0.5s ease-out",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
        inter: ['var(--font-inter)'],
        playfair: ['var(--font-playfair)'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
