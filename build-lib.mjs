import { build } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { merge } from "lodash-es";
import packageJson from "./package.json" assert { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { name, version, license, homepage } = packageJson;

const sharedOptions = {
  build: {
    target: "es2015",
    lib: {
      name,
      // entry,
      // fileName,
      // formats,
    },
    minify: "terser",
    outDir: "dist",
    rollupOptions: {
      plugins: [
        {
          name: "banner",
          generateBundle(options, bundle) {
            Object.keys(bundle).forEach((key) => {
              bundle[key].code =
                `/* ${name} ${version} | ${license} license | ${homepage} */\n` +
                bundle[key].code;
            });
          },
        },
      ],
    },
    emptyOutDir: false,
    copyPublicDir: false,
  },
};

await build(
  merge({}, sharedOptions, {
    build: {
      lib: {
        entry: path.resolve(__dirname, "src/lib/main.ts"),
        formats: ["es", "cjs"],
        fileName: (format) => {
          return `${name}.${format === "es" ? "mjs" : "cjs"}`;
        },
      },
    },
  })
);

await build(
  merge({}, sharedOptions, {
    build: {
      lib: {
        entry: path.resolve(__dirname, "src/lib/index.ts"),
        formats: ["es", "umd"],
        fileName: (format) => {
          return `${name}.full.${format}.js`;
        },
      },
    },
  })
);

await build(
  merge({}, sharedOptions, {
    build: {
      lib: {
        entry: path.resolve(__dirname, "src/lib/index.slim.ts"),
        formats: ["es"],
        fileName: (format) => {
          return `${name}.slim.js`;
        },
      },
    },
  })
);
