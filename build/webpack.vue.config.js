const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MineCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const config = {
  mode: 'development',
  entry: {
    index: path.resolve(__dirname, '../src/main.js')
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, '../dist'),
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
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ]
  },
  optimization: {
    minimize: true, // 插件压缩
    minimizer: [ // 覆盖默认压缩工具
      new UglifyJsPlugin(),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      minSize: 30 * 1024, // 包容量大于30kb时进行分割
      chunks: 'all', // 将依赖和源码文件进行打包分割
      name: 'common', // 重命名
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // 打包后模板的名称
      template: path.resolve(__dirname, '../public/index.html'),  // 模板地址
      chunks: ['index'],
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, '../src/img'),
        to: path.resolve(__dirname, '../dist/img'),
      }]
    }),
    new MineCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].chunk.css',
    }),
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
  ],
}

module.exports = config;