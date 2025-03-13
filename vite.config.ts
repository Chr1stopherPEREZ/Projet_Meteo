import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  base: "/Projet_Meteo/",
  build: {
    assetsDir: "", // Empêche Vite de renommer les fichiers avec un hash
    rollupOptions: {
      input: "index.html",
    },
  },
});
