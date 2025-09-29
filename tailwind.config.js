// In tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // This tells Tailwind to scan all your Vue components and Markdown files
    "./.vitepress/theme/**/*.vue",
    "./**/*.md",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}