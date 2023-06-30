/** @type {import('tailwindcss').Config} */
sidebarWidth = "300px";
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "ui-sans-serif"],
        inter: ["Inter", "ui-sans-serif"],
        gotham: ["Gotham", "ui-sans-serif"],
      },
      colors: {
        text: "#f1e9f0",
        background: "#130c12",
        "primary-button": "#b88e9c",
        "secondary-button": "#090606",
        accent: "#8a5f56",
        spotify: "#1DB954",
      },
      spacing: {
        sidebar: `${sidebarWidth}`,
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
