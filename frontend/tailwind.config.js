/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'growly': '#1F7F7D',
        'growly-light': '#2a9d8f',
        'growly-dark': '#166564',
      },
    },
  },
  plugins: [],
}