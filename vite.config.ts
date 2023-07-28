import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          bootstrap: ["bootstrap/dist/css/bootstrap.min.css", "bootstrap/dist/js/bootstrap.bundle.js"],
          firebase: ["firebase/storage", "firebase/auth", "firebase/firestore", "firebase/app"],
          dashboard: ["./src/layout/DashboardLayout.tsx"],
          "landing-page": ["./src/layout/LandingPageLayout.tsx"],
          "main-app-router": ["./src/App.tsx"],
          react: ["react", "react-dom/client"],
        },
      },
    },
  },
  plugins: [react()],
});
