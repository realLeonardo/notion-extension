const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ExtensionReloader = require("webpack-extension-reloader");

module.exports = (env, argv) => {
  const mode = argv.mode || "production";

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
  ];

  const extraConfig = {};
  if (mode === "development") {
    console.info("Dev");
    plugins.push(
      new ExtensionReloader({
        manifest: path.resolve(__dirname, "src", "assets", "manifest.json"),
      })
    );

    // do nth with extraConfig
  } else {
    console.info("Prod");
    plugins.push(new CleanWebpackPlugin());

    extraConfig.optimization = {
      minimize: true,
      minimizer: [],
    };
  }

  return {
    mode,
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
    ...extraConfig,
  };
};
