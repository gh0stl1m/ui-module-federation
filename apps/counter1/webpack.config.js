'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const dependencies = require('./package.json').dependencies;

module.exports = {
	entry: './src/index.js',
	mode: 'development',
	devServer: {
		port: 3001,
		open: true
	},
	resolve: {
		extensions: ['ts', 'tsx', 'js'],
	},
	module: {
		rules: [
			{
				test: /\.(js|ts|tsx)$/,
				loader: 'ts-loader',
				exclude: /node_modules/
			}
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html'
		}),
		new ModuleFederationPlugin({
			name: 'counter1',
			filename: 'remoteEntry.js',
			'./CounterAppOne': './src/components/CounterAppOne',
			shared: {
				...dependencies,
				react: { singleton: true, eager: true, requiredVersion: dependencies.react },
				"react-dom": { singleton: true, eager: true, requiredVersion: dependencies['react-dom'] }
			}

		})
	]
}