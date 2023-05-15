const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    bundleName: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
}