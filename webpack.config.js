import { join } from 'path';
import { readJSONSync } from 'fs-extra';

const babelConfig = readJSONSync(join(process.cwd(), '.babelrc'));

export const entry = {
	cpred: './src/cpred.ts',
};
export const output = {
	path: join(process.cwd(), 'dist'),
	publicPath: '/',
	filename: '[name].js',
	library: 'cpred',
	libraryTarget: 'window',
};
export const module = {
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
};
export const plugins = [];
export const resolve = {
	extensions: ['.js', '.ts', '.json'],
	modules: ['node_modules'],
};
