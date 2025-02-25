/** @type {import('tailwindcss').Config} */
export default {  
  content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],  
  theme: {
    extend: {},
  },
  plugins: [],

    // Importante: esto permite que MUI y Tailwind coexistan
    corePlugins: {
    preflight: false,
  },
}

