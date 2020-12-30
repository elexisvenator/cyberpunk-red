const path = require('path');
const fs = require('fs-extra');

const babelConfig = fs.readJSONSync(path.join(process.cwd(), '.babelrc'));

module.exports = {
	entry: {
		cpred: './src/cpred.ts',
	},
	output: {
		path: path.join(process.cwd(), 'dist'),
		publicPath: '/',
		filename: '[name].js',
		library: 'cpred',
		libraryTarget: 'window',
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							...babelConfig,
						},
					},
					{
						loader: 'ts-loader',
						options: {
							appendTsSuffixTo: [/\.vue$/],
						},
					},
				],
			},
		],
	},
	plugins: [],
	resolve: {
		extensions: ['.js', '.ts', '.json'],
		modules: ['node_modules'],
	},
};
