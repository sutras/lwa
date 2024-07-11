import typescript from "rollup-plugin-typescript2";

export default {
  input: "./src/lib/main.ts",

  plugins: [
    typescript({
      tsconfig: "tsconfig.lib.json",
    }),
  ],
};
