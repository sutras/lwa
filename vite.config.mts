import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import Markdown from "unplugin-vue-markdown/vite";
import MarkdownItPrism from "markdown-it-prism";
import {
  groupIconMdPlugin,
  groupIconVitePlugin,
} from "vitepress-plugin-group-icons";
import { containerPlugin } from "./node/markdown/plugins/containers";
import { preWrapperPlugin } from "./node/markdown/plugins/preWrapper";
import tailwindcss from "@tailwindcss/vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    vue({ include: [/\.vue$/, /\.md$/] }),
    Markdown({
      markdownItSetup(md) {
        md.use(MarkdownItPrism);
        md.use(groupIconMdPlugin);
        containerPlugin(md);
        preWrapperPlugin(md, {
          codeCopyButtonTitle: "复制",
        });
      },
    }),
    tailwindcss(),
    groupIconVitePlugin(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(__dirname, "./src/assets/icons")],
      svgoOptions: command === "build",
      symbolId: "icon-[dir]-[name]",
    }),
  ],
  optimizeDeps: {
    exclude: ["lwa"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      lwa: path.resolve(__dirname, "./src/lib/index.full.ts"),
    },
  },
  base: "/lwa-docs/",
  build: {
    outDir: "docs",
  },
}));
