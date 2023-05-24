const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MineCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
<<<<<<< HEAD
=======
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
>>>>>>> 8cd73e549cec435cc20e9bde1ce2e74164378618

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    login: './src/login.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].js'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MineCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          }
        },
        generator: {
          filename: 'images/[name].[hash:6][ext]' // 配置hash防止重名
        }
      },
      // {
      //   test: /\.ejs/,
      //   loader: 'ejs-loader',
      //   options: {
      //     esModule: false,
      //   },
      // },
    ]
  },
  optimization: {
    minimize: true, // 插件压缩
    minimizer: [ // 覆盖默认压缩工具
      new UglifyJsPlugin({ sourceMap: true }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      minSize: 30 * 1024, // 包容量大于30kb时进行分割
      chunks: 'all', // 将依赖和源码文件进行打包分割
      name: 'common', // 重命名
      cacheGroups: { // 主动分离第三方包
        jquery: {
          name: 'jquery',
          test: /jquery\.js/,
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // 打包后模板的名称
      template: './src/index.html',  // 模板地址
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      filename: 'login.html',
      template: './src/login.html',
      chunks: ['login'],
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, './src/img'),
        to: path.resolve(__dirname, './dist/img'),
      }]
    }),
    new MineCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].chunk.css',
    }),
    new CleanWebpackPlugin(),
  ]
}