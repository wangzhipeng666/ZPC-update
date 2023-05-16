const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    bundle: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
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
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // 打包后模板的名称
      template: './src/index.html'  // 模板地址
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    })
  ]
}