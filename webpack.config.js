const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const ExtensionReloader = require("webpack-extension-reloader");

module.exports = () => {
  const entry = {
    content: path.join(__dirname, "src", "content.ts"),
    background: path.join(__dirname, "src", "background.ts"),
    popup: path.join(__dirname, "src", "popup.tsx"),
  };

  const rules = [
    {
      test: /\.tsx?$/,
      exclude: /(node_modules)/,
      use: "ts-loader",
    },
    {
      test: /\.less$/,
      use: [
        {
          loader: "style-loader",
        },
        {
          loader: "css-loader",
        },
        {
          loader: "less-loader",
          options: {
            sourceMap: true,
          },
        },
      ],
    },
  ];

  const plugins = [
    new CopyPlugin({
      patterns: [
        {
          from: "src/assets",
          to: "",
        },
      ],
    }),

    // DEV
    // new ExtensionReloader({
    //   manifest: path.resolve(__dirname, "src", "manifest.json"),
    // }),
  ];

  return {
    mode: "development",
    // watch: true,
    entry,
    module: {
      rules,
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    plugins,
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
  };
};
