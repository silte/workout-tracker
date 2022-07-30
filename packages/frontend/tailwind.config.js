const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./public/**/*.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      gridTemplateColumns: {
        "workout-item": "100px minmax(200px, 250px) repeat(2, 125px)",
      },
      colors: {
        "blue-financer": "#0E6AC7",
        "white-off": "#FAFAFA",
        "gray-25": "#fdfdfd",
        "black-off": "#1E253A",
        "gray-financer": "#838690",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
