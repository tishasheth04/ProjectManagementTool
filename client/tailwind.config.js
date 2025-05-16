// inside client/tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ only ./src because you're already inside /client
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
