/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        "100":"30rem",
        "150":"50rem"
      },
      colors: {
        blk: "#252525",
        gryNav: "#292929",
        gry: "#2b2b2b",
        blkv: "#333333",
        whitesmoke: "#ebebeb",
        grybor: "#e6e6e6",
        newWhite:"#eaebef",
        gry2:"#3B3B3B"
      },
    },
  },
  plugins: [],
};
