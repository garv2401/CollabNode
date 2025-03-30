import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Include all files in the src directory
    "./pages/**/*.{js,ts,jsx,tsx}", // Include all files in the pages directory
    "./components/**/*.{js,ts,jsx,tsx}", // Include all files in the components directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
