/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brandBlue: "#0B4F8A",
        skyBlue: "#4FA3D9",
        mintGreen: "#2BAF7F",
        deepGreen: "#0E7A58",
        softWhite: "#F5FBFF"
      },
      fontFamily: {
        heading: ["Sora", "sans-serif"],
        body: ["Manrope", "sans-serif"]
      },
      boxShadow: {
        service: "0 20px 45px rgba(11, 79, 138, 0.15)"
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        rise: "rise 600ms ease-out"
      }
    }
  },
  plugins: []
};
