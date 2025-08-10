import typescript from "rollup-plugin-typescript2";

export default {
  input: "./src/lib/index.ts",

  plugins: [
    typescript({
      tsconfig: "tsconfig.lib.json",
    }),
  ],
};
