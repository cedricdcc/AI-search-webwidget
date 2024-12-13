const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "qa-widget.js",
    path: path.resolve(__dirname, "dist"),
    library: "QAWidgetGlobal", // Expose the QAWidgetGlobal object
    libraryTarget: "umd", // Universal Module Definition
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "@huggingface/transformers": path.resolve(
        __dirname,
        "node_modules/@huggingface/transformers"
      ),
      sharp$: false,
      "onnxruntime-node$": false,
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  mode: "development",
  stats: {
    errorDetails: true,
  },
};
