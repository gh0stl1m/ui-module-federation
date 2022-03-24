const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const dependencies = require("./package.json").dependencies;

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devServer: {
    port: 3002,
    open: false,
    hot: true,
  },
  resolve: {
    extensions: ["*", ".mjs", ".ts", ".js", ".svelte"],
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.svelte$/,
        exclude: /node_modules/,
        loader: "svelte-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
      name: "footer",
      filename: "remoteEntry.js",
      exposes: {
        "./FooterModule": "./src/components/Footer",
      },
      shared: {
        ...dependencies,
        svelte: {
          singleton: true,
          eager: true,
          requiredVersion: dependencies.svelte,
        },
      },
    }),
  ],
};
