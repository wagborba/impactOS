/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#4F46E5", light: "#EEF2FF", foreground: "#FFFFFF" },
        success: "#10B981",
        danger: "#EF4444",
        warning: "#F59E0B",
        background: "#F8FAFC",
        "sidebar-bg": "#FFFFFF",
        "card-bg": "#FFFFFF",
        "text-primary": "#0F172A",
        "text-muted": "#64748B",
        border: "#E2E8F0",
      },
      fontFamily: { sans: ["Inter", "sans-serif"] },
    },
  },
  plugins: [],
}
