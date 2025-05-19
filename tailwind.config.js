/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}", // 使っていれば追加
  ],
  theme: {
    extend: {
      colors: {
        "simpro-blue": "#0a0affff",
      },
    },
  },
  plugins: [],
};
