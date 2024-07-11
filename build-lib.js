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
      // entry,
      name,
      fileName: (format, entryName) => {
        if (entryName === "main") {
          return `${name}.js`;
        }
        return `${name}.${format}.js`;
      },
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
        entry: path.resolve(__dirname, "src/lib/index.ts"),
        formats: ["es", "umd"],
      },
    },
  })
);

await build(
  merge({}, sharedOptions, {
    build: {
      lib: {
        entry: path.resolve(__dirname, "src/lib/main.ts"),
        formats: ["es"],
      },
    },
  })
);
