'use strict';

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const dependencies = require("./package.json").dependencies;

module.exports = {
	entry: "./src/index.ts",
	mode: "development",
	devServer: {
		port: 3001,
		open: false,
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js"],
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx|tsx|ts)$/,
				loader: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./public/index.html",
		}),
		new ModuleFederationPlugin({
			name: "counterOne",
			filename: "remoteEntry.js",
			exposes: {
				"./CounterOne": "./src/components/CounterOne",
			},
			shared: {
				...dependencies,
				react: { singleton: true, eager: true, requiredVersion: dependencies.react },
				"react-dom": {
					singleton: true,
					eager: true,
					requiredVersion: dependencies["react-dom"],
				},
			},
		}),
	],
};