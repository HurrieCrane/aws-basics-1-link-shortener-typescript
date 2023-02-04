import { resolve } from "path";
import { Configuration } from "webpack";
import CompressionPlugin from "compression-webpack-plugin";

/* eslint-disable */
const { compilerOptions } = require("./tsconfig.json");
/* eslint-enable */

/** Webpack Config Variables */
const conf = {
  prodMode: process.env.NODE_ENV === "production",
};

/**
 * Parsing tsconfig.json paths to resolve aliases
 */
const tsPaths = Object.keys(compilerOptions.paths).reduce(
  (paths, path) => Object.assign(paths, { [`${path}`]: resolve(__dirname, compilerOptions.paths[path][0]) }),
  {},
);

/**
 * Webpack Config
 */
const webpackConfig: Configuration = {
  entry: {
    main: "./src/handler.ts",
  },
  target: "node",
  mode: conf.prodMode ? "production" : "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
    alias: tsPaths,
  },
  output: {
    path: resolve(__dirname, "dist"),
    filename: "[name].js",
    libraryTarget: "commonjs2",
    devtoolModuleFilenameTemplate: "[absolute-resource-path]",
  },
  devtool: "cheap-source-map",
  plugins: [
    new CompressionPlugin()
  ],
  externals: ['pino-pretty', 'parseurl'],
};

export default webpackConfig;