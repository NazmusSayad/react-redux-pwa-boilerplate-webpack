const { DEFAULT, makeCssRules, makeBabelRules } = require('./webpack.common')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const cssRules = ['style-loader', 'css-loader']

module.exports = {
  ...DEFAULT.root,

  mode: 'development',
  stats: 'errors-warnings',
  devtool: 'eval-source-map',

  module: {
    rules: [
      ...DEFAULT.loaders,
      ...makeCssRules(cssRules),
      makeBabelRules({ plugins: ['react-refresh/babel'] }),
    ],
  },

  plugins: [...DEFAULT.plugins, new ReactRefreshWebpackPlugin()],

  devServer: {
    // watchFiles: ['src/*', 'public/*'],

    client: {
      logging: 'none',
      overlay: false,
      progress: false,
    },

    hot: true,
    compress: false,
    host: 'localhost',
    port: 80,
  },
}
