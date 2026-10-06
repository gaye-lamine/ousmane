/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        night: {
          950: "#070D18",
          900: "#0A1322",
          800: "#121E34",
          700: "#1E2D4A",
          600: "#2D3F60",
          500: "#4A5F82",
          400: "#8295B5",
        },
        sand: {
          50: "#FAF9F5",
          100: "#F4F2EB",
          200: "#E9E5D8",
          300: "#D8D2C0",
          400: "#BFB8A1",
        },
        action: {
          orange: "#C8480C",
          "orange-hover": "#B23D08",
          whatsapp: "#15803D",
          "whatsapp-hover": "#116832",
        },
        // Compatibilité de transition
        brand: {
          blue: "#0A1322",
          dark: "#070D18",
          orange: "#C8480C",
          light: "#F4F2EB",
        }
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
        display: ["Oswald", "sans-serif"],
      },
      fontSize: {
        "display-2xl": ["clamp(2.75rem, 8vw, 4.75rem)", { lineHeight: "0.96", letterSpacing: "-0.02em" }],
        "display-xl": ["clamp(2.125rem, 5.5vw, 3.25rem)", { lineHeight: "1.02", letterSpacing: "-0.01em" }],
        "display-lg": ["clamp(1.5rem, 3.5vw, 2.25rem)", { lineHeight: "1.1" }],
        "display-md": ["clamp(1.25rem, 2.5vw, 1.625rem)", { lineHeight: "1.15" }],
        "body-lg": ["clamp(1.0625rem, 1.8vw, 1.25rem)", { lineHeight: "1.55" }],
        "body-base": ["1rem", { lineHeight: "1.5" }],
        "body-sm": ["0.875rem", { lineHeight: "1.45" }],
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "6px",
        md: "6px",
        lg: "8px",
        xl: "12px",
      },
      boxShadow: {
        subtle: "0 1px 2px 0 rgba(10, 19, 34, 0.05)",
        card: "0 4px 12px 0 rgba(10, 19, 34, 0.08)",
      },
    },
  },
  plugins: [],
}
