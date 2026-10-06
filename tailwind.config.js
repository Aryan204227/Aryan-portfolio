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
          DEFAULT: '#07080c',
          pure: '#040507',
          surface: '#0d0f17',
          elevated: '#0a0c14',
          subtle: '#121622',
          border: 'rgba(255, 255, 255, 0.07)',
          borderStrong: 'rgba(255, 255, 255, 0.16)',
        },
        brand: {
          cyan: '#38bdf8',
          blue: '#3b82f6',
          indigo: '#6366f1',
          emerald: '#10b981',
          amber: '#f59e0b',
          rose: '#f43f5e',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Space Grotesk', '-apple-system', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Outfit', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      fontSize: {
        'hero': 'clamp(64px, 13vw, 160px)',
        'display-xl': 'clamp(48px, 8vw, 96px)',
        'display-lg': 'clamp(36px, 5vw, 64px)',
      },
      keyframes: {
        'navbar-border-spin': {
          '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
          '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'navbar-border-spin': 'navbar-border-spin 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'fade-up': 'fade-up 0.6s ease forwards',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-cyan': '0 0 40px -10px rgba(56, 189, 248, 0.35)',
        'glow-indigo': '0 0 40px -10px rgba(99, 102, 241, 0.35)',
      }
    },
  },
  plugins: [],
}
