/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        noche: '#0C0609',
        vino: '#3B0A2A',
        granate: '#8E1E4F',
        rosa: '#E36A8B',
        piel: '#F3D9C6',
        marfil: '#F7F1EC',
      },
      fontFamily: {
        display: ['Bodoni Moda', 'serif'],
        sans: ['Jost', 'sans-serif'],
      },
      keyframes: {
        respira: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(2%, -3%, 0) scale(1.14)' },
        },
      },
      animation: {
        respira: 'respira 18s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
