const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ["./src/**/*.{js,ts,jsx,tsx}", './public/**/*.html',],
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
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
    }

  },
  plugins: [require("@tailwindcss/ui"), require("@tailwindcss/forms")],
};
