const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const {
  DEFAULT,
  PATH,
  makeCssRules,
  makeBabelRules,
} = require('./webpack.common')

DEFAULT.root.output.clean = true

const cssRules = [
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

  mode: 'production',

  module: {
    rules: [
      ...DEFAULT.loaders,
      ...makeCssRules(cssRules),
      makeBabelRules({ presets: ['@babel/preset-env'] }),
    ],
  },

  plugins: [
    ...DEFAULT.plugins,

    new MiniCssExtractPlugin({
      filename: PATH.assest + '/[name].css',
    }),

    new CopyWebpackPlugin({
      patterns: [{ from: 'public' }],
    }),
  ],
}
