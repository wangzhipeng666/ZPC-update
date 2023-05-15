const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    bundle: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[hash].js'
  },
}