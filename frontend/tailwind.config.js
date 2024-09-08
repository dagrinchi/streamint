/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      'helveticaneue': ['var(--font-helveticaneue)'],
      'blinkmacsystemfont-black': ['var(--font-blinkmacsystemfont-black)'],
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      aspectRatio: {
        '9/16': '9 / 16'
      },
    },
  },
  plugins: [],
};
