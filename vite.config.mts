import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import Markdown from "unplugin-vue-markdown/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({ include: [/\.vue$/, /\.md$/] }), Markdown({})],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "/lwa-docs/",
  build: {
    outDir: "docs",
  },
});
