/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
 theme: {
    screens: {
      xs:'476px',
      sm: '476px', // Adjust breakpoint values here
      md: '476px',
      // ... other breakpoints
    }
  },
  plugins: [],
}
