process.env.NODE_ENV = 'production'
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {
  DEFAULT,
  PATH,
  makeCssRules,
  makeBabelRules,
} = require('./webpack.common')

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
      makeCssRules(cssLoaders),
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
