var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

module.exports = {
	context: __dirname,
	devtool: debug ? "inline-sourcemap" : null,
	entry: "./react/index.js",
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules!bower_components)/,
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015', 'stage-0'],
					plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
				}
			}
		]
	},
	output: {
		path: __dirname + "/assets/js/",
		filename: "index.min.js"
	}
};