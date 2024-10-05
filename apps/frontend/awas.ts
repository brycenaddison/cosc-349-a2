import { defineConfig } from "vite";

import autoprefixer from "autoprefixer";
import tailwind from "tailwindcss";
import tailwindConfig from "./tailwind.config.js";

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(tailwindConfig), autoprefixer],
    },
  },
});
