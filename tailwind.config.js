/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#07090e',
          pure: '#040508',
          surface: '#0b0e17',
          subtle: '#101522',
          border: 'rgba(255, 255, 255, 0.07)',
          borderStrong: 'rgba(255, 255, 255, 0.15)',
        },
        brand: {
          cyan: '#38bdf8',
          blue: '#3b82f6',
          indigo: '#6366f1',
          emerald: '#10b981',
          amber: '#f59e0b',
        }
      },
      fontFamily: {
        display: ['Outfit', '-apple-system', 'sans-serif'],
        sans: ['Space Grotesk', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'noise-pattern': "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.02) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
}
