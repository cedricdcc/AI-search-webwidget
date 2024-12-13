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
    extensions: [".ts", ".js", ".tsx"],
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
        test: /\.(js|tsx?)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
  mode: "development",
  stats: {
    errorDetails: true,
  },
};
