"use strict";

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const ForkTypescriptChecker = require("fork-ts-checker-webpack-plugin");
const { webpack } = require("webpack");
require("dotenv").config({ path: "./.env" });

const dependencies = require("./package.json").dependencies;

const buildDate = new Date().toLocaleDateString();
module.exports = (env, argv) => {
  // const isProduction = argv.mode === 'production';

  return {
    entry: "./src/index.ts",
    mode: process.env.NODE_ENV || "development",
    devServer: {
      port: 3000,
      open: true,
      headers: {
        "Allow-Control-Access-Origin": "*",
      },
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|tsx|ts)$/,
          loader: "babel-loader",
          exclude: /node_modules/,
          options: {
            cacheDirectory: true,
            babelrc: false,
            presets: [
              [
                "@babel/preset-env",
                { targets: { browsers: "last 2 versions" } },
              ],
              "@babel/preset-typescript",
              "@babel/preset-react",
            ],
            plugins: [
              "react-hot-loader/babel",
              ["@babel/plugin-proposal-class-properties", { loose: true }],
            ],
          },
        },
      ],
    },
    plugins: [
      // new webpack.EnvironmentPlugin({ BUILD_DATE: buildDate }),
      // new webpack.DefinePlugin({
      //   "process.env": JSON.stringify(process.env),
      // }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
      new ModuleFederationPlugin({
        name: "shell",
        remotes: {
          counter1: "counterOne@http://localhost:3001/remoteEntry.js",
          footer: "footer@http://localhost:3002/remoteEntry.js",
        },
        shared: {
          ...dependencies,
          react: {
            singleton: true,
            eager: true,
            requiredVersion: dependencies.react,
          },
          "react-dom": {
            singleton: true,
            eager: true,
            requiredVersion: dependencies["react-dom"],
          },
        },
      }),
    ],
  };
};
