/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#070814',
        surface: '#0d1024',
        panel: 'rgba(255, 255, 255, 0.075)',
        panelHover: 'rgba(255, 255, 255, 0.12)',
        borderLight: 'rgba(255, 255, 255, 0.24)',
        brandBlue: '#8A5BF4',
        brandPurple: '#8A5BF4',
        frost: '#f7f3e8',
        violet: {
          400: '#8A5BF4',
          500: '#8A5BF4',
          600: '#8A5BF4',
        },
        cyan: {
          400: '#62e6ff',
        },
        emerald: {
          500: '#10b981',
        },
        amber: {
          500: '#f59e0b',
        },
        rose: {
          500: '#f43f5e',
        },
        textMain: '#f7f8ff',
        textMuted: '#aab0d3',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Space Grotesk', 'Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 24px 90px rgba(138, 91, 244, 0.28)',
        glass: 'inset 0 1px 0 rgba(255,255,255,0.22), 0 20px 80px rgba(0,0,0,0.34)',
      },
      animation: {
        'slow-float': 'slowFloat 9s ease-in-out infinite',
        shimmer: 'shimmer 4s linear infinite',
      },
      keyframes: {
        slowFloat: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
      },
    },
  },
  plugins: [],
}
