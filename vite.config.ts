import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // Assure que les fichiers sont bien chargés sur Zeabur
  root: "./",
  build: {
    outDir: "dist",
    emptyOutDir: true, // Supprime le contenu existant avant chaque build
    rollupOptions: {
      input: "index.html",
    },
  },
  server: {
    open: true,
  },
});
