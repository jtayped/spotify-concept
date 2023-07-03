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
        text: "#ffffff",
        background: "#041320",
        "primary-button": "#e53495",
        "secondary-button": "#000000",
        accent: "#609e15",
        spotify: "#1DB954",
      },
      spacing: {
        sidebar: `${sidebarWidth}`,
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
