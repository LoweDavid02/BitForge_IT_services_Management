/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#000000',
        'bg-surface': '#0D1117',
        'bg-card': '#161B22',
        'accent-blue': '#0066FF',
        'accent-blue-deep': '#1A3AFF',
        'accent-blue-glow': '#3D8BFF',
        'text-primary': '#FFFFFF',
        'text-muted': '#A0AEC0',
        'border-color': '#1C2333',
        'white-contrast': '#F0F4FF',
      },
      fontFamily: {
        'syne': ['Syne', 'sans-serif'],
        'dm-sans': ['DM Sans', 'sans-serif'],
        'jetbrains': ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'blue-glow': '0 0 20px rgba(0, 102, 255, 0.3)',
        'card': '0 4px 6px rgba(0, 102, 255, 0.08)',
      },
    },
  },
  plugins: [],
}
