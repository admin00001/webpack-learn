const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require("vue-loader");
const { DefinePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: "./src/main.ts",
  mode: isDev ? 'development' : 'production',
  output: {
    clean: true,
    filename: "[name].js",
    path: path.join(__dirname, "./dist"),
    assetModuleFilename: 'images/[name]-[hash:5][ext]', // 图片资源
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
          isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
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
          isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
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
      },
      {
        test: /\.(png|jpg|gif)$/i,
        type: 'asset/resource' // file-loader
      },
      //url-loader ---> type: asset/inline
      {
        test: /\.svg$/i,
        type: "asset/source" // raw-loader
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    }),
    new MiniCssExtractPlugin(),
    new VueLoaderPlugin(),
    new DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__ : false
    })
  ],
  devServer: {
    open: true,
    hot: true,
  }
}
