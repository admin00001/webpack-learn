const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require("vue-loader");

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  mode: isDev ? 'development' : 'production',
  output: {
    filename: "[name].[contenthash].js",
    path: path.join(__dirname, "./dist"),
  },
  devtool: false,
  resolve: {
    extensions: ['.js', '.ts', '.vue'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/]
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        use: ["vue-loader"],
      },

    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    }),
    new VueLoaderPlugin()
  ]
}
