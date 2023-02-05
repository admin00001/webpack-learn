const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require("vue-loader");

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: "./src/main.ts",
  mode: isDev ? 'development' : 'production',
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "./dist"),
  },
  devtool: false,
  resolve: {
    extensions: ['.js', '.ts'],
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
      {
        test: /\.css$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require("autoprefixer")],
              }
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require("autoprefixer")],
              }
            }
          },
          'less-loader',
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    }),
    new MiniCssExtractPlugin(),
    new VueLoaderPlugin()
  ]
}
