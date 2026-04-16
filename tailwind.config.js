/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#1A3A6B",
          orange: "#F97316",
          dark: "#0D1B2A",
          light: "#F4F6FA",
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Outfit", "sans-serif"],
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'float-delayed': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(37, 211, 102, 0.4), 0 0 40px rgba(37, 211, 102, 0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(37, 211, 102, 0.7), 0 0 60px rgba(37, 211, 102, 0.3)' },
        },
        'ring-pulse': {
          '0%': { transform: 'scale(1)', opacity: '0.6' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 5s ease-in-out infinite',
        'float-delayed': 'float-delayed 6s ease-in-out infinite 1s',
        'glow-pulse': 'glow-pulse 2.5s ease-in-out infinite',
        'ring-pulse': 'ring-pulse 2s ease-out infinite',
        'shimmer': 'shimmer 4s linear infinite',
      },
      boxShadow: {
        'glow-blue': '0 0 40px rgba(26, 58, 107, 0.25)',
        'glow-orange': '0 0 40px rgba(249, 115, 22, 0.3)',
        'glow-green': '0 0 40px rgba(37, 211, 102, 0.4)',
      }
    },
  },
  plugins: [],
}
