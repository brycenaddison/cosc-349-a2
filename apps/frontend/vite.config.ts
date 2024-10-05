import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import tailwindConfig from "./tailwind.config.js";
import autoprefixer from "autoprefixer";
import tailwind from "tailwindcss";

export default defineConfig({
  plugins: [react(), svgr()],
  css: {
    postcss: {
      plugins: [tailwind(tailwindConfig), autoprefixer],
    },
  },
});
