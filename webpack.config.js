const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { DefinePlugin } = require('webpack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const WebpackBar = require('webpackbar')

const isDev = process.env.NODE_ENV === 'development'

const config = {
	// profile: true, // 开启stats.json
	entry: './src/main.ts',
	mode: isDev ? 'development' : 'production',
	output: {
		clean: true,
		filename: isDev ? '[name].js' : '[name]-[contenthash:5].js',
		path: path.join(__dirname, './dist'),
		assetModuleFilename: isDev ? '[name][ext][query]' : 'assets/[name]-[contenthash:5][ext]', // 静态资源
	},
	devtool: false,
	resolve: {
		extensions: ['.js', '.ts', '.jsx', '.tsx'],
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [{
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					}
				}]
			},
			{
				test: /\.jsx$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							plugins: ['@vue/babel-plugin-jsx']
						}
					},
          '@ant-design-vue/vue-jsx-hot-loader',
				]
			},
			{
				test: /\.ts$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							appendTsSuffixTo: [/\.vue$/],
							transpileOnly: true,
						}
					}
				]
			},
			{
				test: /\.tsx$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							plugins: ['@vue/babel-plugin-jsx']
						}
					},
          '@ant-design-vue/vue-jsx-hot-loader',
					{
						loader: 'ts-loader',
						options: {
							transpileOnly: true,
							appendTsxSuffixTo: [/\.vue$/]
						}
					}
				]
			},
			{
				test: /\.vue$/,
				use: ['vue-loader'],
			},
			{
				test: /\.css$/,
				use: [
					isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [require('autoprefixer')],
							}
						}
					}
				]
			},
			{
				test: /\.less$/,
				use: [
					isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [require('autoprefixer')],
							}
						}
					},
					{
						loader: 'less-loader',
						options: {
							lessOptions: {
								javascriptEnabled: true
							}
						}
					}
				]
			},
			{
				test: /\.(png|jpg|gif)$/i,
				type: 'asset', // 相当于调用url-loader
				parser: {
					dataUrlCondition: {
						maxSize: 1024 * 2 // 2k内大小的图片会以base64形式内联
					}
				}
			},
			{
				test: /\.svg$/i,
				type: 'asset/source' // 相当于调用raw-loader
			},
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'public/index.html'
		}),
		new VueLoaderPlugin(),
		new DefinePlugin({
			__VUE_OPTIONS_API__: true,
			__VUE_PROD_DEVTOOLS__: false
		}),
		// 进度条
		new WebpackBar({
			color: 'green',
			basic: false
		})
	]
}

if (isDev) {
	config.devServer = {
		open: true,
		hot: true,
		// proxy: {
		//   '/api': {
		//     target: 'http://xx.xx.xx.xx:xxx',
		//     changeOrigin: true
		//   }
		// }
	}
	config.plugins.push(
		new ForkTsCheckerWebpackPlugin() // fork 出子进程，专门用于执行类型检查
	)
} else {
	// 生产环境开启压缩
	config.plugins.push(
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash:5].css',
			chunkFilename: '[name].[contenthash:5].css',
			ignoreOrder: true
		})
	)
	config.optimization = {
		usedExports: true, // 标记导出导入模块列表给tree-shaking用
		runtimeChunk: { name: 'runtime' }, // 记录运行时代码的信息，用于contenthash变化后不影响其他chunk对它的引用
		splitChunks: {
			chunks: 'all', // 对所有chunk: Initial|Async 都进行优化分割，因为默认只对Async chunk生效
		},
		minimize: true, // 开启压缩，配合 minimizer数组
		minimizer: [
			new TerserPlugin({
				parallel: true, // 并行压缩
				exclude: /node_module/,
				terserOptions: {
					toplevel: true, // 在模块的最顶层的作用域，删除没有用到的代码，也就是实现了tree-shaking
					compress: {
						arguments: false,
						dead_code: true,
						reduce_vars: true,
						pure_funcs: ['console.log'] // 删除console.log
					}
				}
			}),
			new CssMinimizerPlugin() // css压缩
		]
	}
}

module.exports = config
