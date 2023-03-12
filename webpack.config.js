const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require("vue-loader");
const { DefinePlugin } = require('webpack');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  // profile: true, // 开启stats.json
  entry: "./src/main.ts",
  mode: isDev ? 'development' : 'production',
  output: {
    clean: true,
    filename: "[name]-[hash:5].js",
    path: path.join(__dirname, "./dist"),
    assetModuleFilename: 'images/[name]-[hash:5][ext]', // 图片资源
  },
  devtool: false,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.vue'],
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
      // {
      //   test: /\.(png|jpg|gif)$/i,
      //   type: 'asset/resource' // file-loader
      // },
      {
        test: /\.(png|jpg|gif)$/i,
        type: 'asset', // url-loader
        parser: {
          dataUrlCondition: {
            maxSize: 1024 * 2 // 2k base64内联
          }
        }
      },
      {
        test: /\.svg$/i,
        type: "asset/source" // raw-loader
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:5].css',
      chunkFilename: '[name].[contenthash:5].css',
      ignoreOrder: true
    }),
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
