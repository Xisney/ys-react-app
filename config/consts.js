const path = require('path')

const isDev = process.env.NODE_ENV === 'development'
const distDir = path.resolve(__dirname, '../dist')
const entryName = path.resolve(__dirname, '../src/index.tsx')

module.exports = {
  isDev,
  distDir,
  entryName,
}
