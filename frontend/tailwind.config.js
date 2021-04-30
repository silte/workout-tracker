const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  mode: "jit",
  purge: ["./src/**/*.{js,ts,jsx,tsx}", './public/**/*.html',],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      gridTemplateColumns: {
        "workout-item": "100px minmax(200px, 250px) repeat(2, 125px)"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/ui"), require("@tailwindcss/forms")],
}
