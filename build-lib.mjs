import { build } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { merge } from "lodash-es";
import { minify } from "terser";
import packageJson from "./package.json" with { type: "json" };

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
          // Vite 的 vite:terser 插件在 lib 模式下会显式跳过 es 格式：
          //   if (config.build.lib && outputOptions.format === "es") return null;
          // 导致 lwa.mjs / lwa.full.es.js / lwa.slim.es.js 都是未压缩的。
          // 这里用同样的 terser 配置补上，让 ESM 产物也走压缩。
          // 必须用 order: "post"：否则会先被压缩、再被 vite:esbuild-transpile
          // 重新打印（体积反而涨到 ~25 kB）。
          name: "minify-es-lib",
          renderChunk: {
            order: "post",
            async handler(code, _chunk, outputOptions) {
              if (outputOptions.format !== "es") {
                return null;
              }
              const result = await minify(code, {
                safari10: true,
                module: true,
                compress: { passes: 2 },
                mangle: true,
                sourceMap: !!outputOptions.sourcemap,
              });
              return { code: result.code, map: result.map || null };
            },
          },
        },
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
        formats: ["es", "cjs"],
        fileName: (format) => {
          return `${name}.${format === "es" ? "mjs" : "cjs"}`;
        },
      },
    },
  }),
);

await build(
  merge({}, sharedOptions, {
    build: {
      lib: {
        entry: path.resolve(__dirname, "src/lib/index.full.ts"),
        formats: ["es", "umd"],
        fileName: (format) => {
          return `${name}.full.${format}.js`;
        },
      },
    },
  }),
);

await build(
  merge({}, sharedOptions, {
    build: {
      lib: {
        entry: path.resolve(__dirname, "src/lib/index.slim.ts"),
        formats: ["es", "umd"],
        fileName: (format) => {
          return `${name}.slim.${format}.js`;
        },
      },
    },
  }),
);
