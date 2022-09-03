process.env.NODE_ENV = 'production'
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { GenerateSW } = require('workbox-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const config = require('./config')
const DEFAULT = require('./webpack.common')
const { makeCssRule, makeBabelRule } = require('./helpers')

const cssLoaders = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: ['postcss-preset-env'],
      },
    },
  },
]

module.exports = {
  ...DEFAULT.root,

  output: {
    ...DEFAULT.output,
    clean: true,
  },

  module: {
    rules: [
      ...DEFAULT.loaders,
      makeCssRule(cssLoaders),
      makeBabelRule({ presets: ['@babel/preset-env'] }),
    ],
  },

  plugins: [
    ...DEFAULT.plugins,

    new MiniCssExtractPlugin({
      filename: config.assestPath + '/[name].css',
    }),

    new CopyWebpackPlugin({
      patterns: [{ from: config.publicDir }],
    }),

    new GenerateSW({
      skipWaiting: true,
      clientsClaim: true,
      swDest:`sw.js`,
      exclude: [/\.map$/, /asset-manifest\.json$/, /LICENSE/],
      maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
    }),
  ],
}
