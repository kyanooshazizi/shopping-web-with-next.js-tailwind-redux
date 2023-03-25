/** @type {import('tailwindcss').Config} */
 module.exports = {
  darkMode: 'class',
  content: ["./app/**/*.{js,ts,jsx,tsx}",
  "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",

  // Or if using `src` directory:
  "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      // default breakpoints but with 40px removed
      screens: {
        sm: '400px',
        md: '528px',
        lg: '784px',
        xl: '1040px',
        '2xl': '1296px',
      },
    },
  },
  plugins: [],
}
