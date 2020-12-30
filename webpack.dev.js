const webpackConfig = require('./webpack.config');

module.exports = {
	mode: 'development',
	devtool: 'source-map',
	...webpackConfig,
};
