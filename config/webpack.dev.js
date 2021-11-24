const baseConfig = require('./webpack.common')
const path = require('path')
const { distDir } = require('./consts')

module.exports = {
  ...baseConfig,
  mode: 'development',
  devServer: {
    static: {
      directory: distDir,
    },
    port: 3000,
    open: true,
    compress: true,
  },
  devtool: 'eval-source-map',
}
