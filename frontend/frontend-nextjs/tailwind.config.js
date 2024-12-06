/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        eva: {
          c0: "#FFFFFF",
          c1: "#9E21E8",
          c2: "#8BA5F8",
          c3: "#691220",
          c4: "#EC6735",
          c5: "#F1A73D",
          c6: "#3118E8",
        }
      },
      fontFamily: {
        eva: ["WritingObjects"],
        
      },
    },
  },
  plugins: [],
};
