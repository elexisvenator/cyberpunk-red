const webpackConfig = require('./webpack.config');

process.env.NODE_ENV = 'production';

module.exports = {
	mode: 'production',
	devtool: 'source-map',
	...webpackConfig,
};
