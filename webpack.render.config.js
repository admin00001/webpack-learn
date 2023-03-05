const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require("vue-loader");
const path = require("path");

const isDev = process.env.NODE_ENV === 'development';

// 入口文件列表
const entries = {
  home: path.join(__dirname, "./src/pages/home.ts"),
};

// 为每一个入口创建 HTMLWebpackPlugin 实例
const htmlPlugins = Object.keys(entries).map(
  (k) =>
    new HtmlWebpackPlugin({
      title: `[${k}] | Electron App`,
      filename: `${k}.html`,
      chunks: [k],
      cache: false
    })
);

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: entries,
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "./dist"),
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  target: "electron-renderer",
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
    ...htmlPlugins,
    new MiniCssExtractPlugin(),
    new VueLoaderPlugin()
  ],
};
