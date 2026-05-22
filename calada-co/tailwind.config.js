/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        pink: {
          DEFAULT: '#D4537E',
          light: '#FBEAF0',
          mid: '#ED93B1',
          dark: '#993556',
        },
        navy: {
          DEFAULT: '#1a2744',
          mid: '#2d3f6b',
          light: '#e8ecf5',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
