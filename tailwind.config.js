/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        studio: {
          black: "#030303",
          ink: "#070707",
          panel: "#131313",
          panelSoft: "#191919",
          line: "rgba(255,255,255,0.1)",
          muted: "#9c9c9c",
          chrome: "#f4f4f4",
          silver: "#c8c8c8"
        }
      },
      fontFamily: {
        display: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        studio: "0 30px 90px rgba(0,0,0,0.64)",
        chrome: "0 0 0 1px rgba(255,255,255,0.08), 0 30px 90px rgba(0,0,0,0.65)",
        glow: "0 0 90px rgba(255,255,255,0.08)"
      }
    }
  },
  plugins: []
};
