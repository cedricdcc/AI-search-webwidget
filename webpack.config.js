const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "qa-widget.js",
    path: path.resolve(__dirname, "dist"),
    library: "QAWidget",
    libraryTarget: "umd",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  mode: "production",
};
