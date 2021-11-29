const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { isDev, distDir, entryName } = require('./consts')

module.exports = {
  entry: entryName,
  output: {
    filename: `[name]${isDev ? '' : '_[contenthash:6]'}.bundle.js`,
    path: distDir,
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: /\.less$/i,
                localIdentName: '[local]_[hash:4]',
              },
              importLoaders: 1,
            },
          },
          'less-loader',
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        type: 'asset',
        generator: {
          filename: 'assets/font/[name][hash:6][ext]',
        },
      },
      {
        test: /\.svg$/i,
        type: 'asset',
        generator: {
          filename: 'assets/svg/[name][hash:6][ext]',
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset',
        generator: {
          filename: 'assets/image/[name][hash:6][ext]',
        },
      },
      {
        test: /\.(jsx|tsx?)$/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-react', { runtime: 'automatic' }],
            '@babel/preset-typescript',
          ],
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `assets/[name]${isDev ? '' : '_[contenthash:6]'}.css`,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      favicon: path.resolve(__dirname, '../public/favicon.png'),
    }),
  ],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, '../src'),
    },
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
}
