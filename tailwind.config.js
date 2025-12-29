/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Together Platform Brand Colors
        brand: {
          indigo: '#0C1B54',      // Dark Indigo - primary buttons, headers
          blue: '#00AEEF',        // Vivid Blue - links, accents, hover
          yellow: '#FFA440',      // Bold Yellow - secondary buttons, CTAs
          'yellow-soft': '#FFDFB0', // Soft Yellow - backgrounds, callouts
          green: '#398081',       // Bold Green - success states
          orange: '#F44225',      // Bold Orange - warnings, alerts
          'orange-soft': '#FF8C71', // Soft Orange - subtle accents
          cream: '#F2F0ED',       // White Space - page backgrounds
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
