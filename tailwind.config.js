/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#007AFF', // Apple Blue
        secondary: '#5856D6', // Apple Purple
        accent: '#FF9500', // Apple Orange
        neutral: {
          DEFAULT: '#F2F2F7',
          light: '#FFFFFF',
          dark: '#1C1C1E',
          text: '#333333',
          textLight: '#8A8A8E'
        },
      },
      fontFamily: {
        sans: ['Noto Sans KR', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
