import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
// https://vitejs.dev/config/
export default defineConfig({
   base: '/todolist/', // Coloque o nome do seu repositório aqui
    build: {
      outDir: 'dist', // Certifique-se de que a pasta de saída seja "dist"
    },
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  server: {
    host: "0.0.0.0",
  },
});
