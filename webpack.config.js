const path = require("path");
const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = {
	mode: "production",
	entry: {
		app: {
			import: [
				"./js/App"
			]
			, filename: "[name].js"
		},
		libs: {
			import: [
				"./js/libs/ArcballControls",
				"./js/libs/OBJLoader",
				"./js/libs/OrbitControls",
				"./js/libs/PointerLockControls",
				"./js/libs/three.module",
				"./js/libs/tiny_tween"
			]
			, filename: "[name].js"
		}
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "dist/js")
	},
	optimization: {
		usedExports: false,
		minimizer: [
			new TerserWebpackPlugin({})
		]
	}
};