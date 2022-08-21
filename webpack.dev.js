process.env.NODE_ENV = 'development'
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const { DEFAULT, makeCssRules, makeBabelRules } = require('./webpack.common')

module.exports = {
  ...DEFAULT.root,

  stats: 'errors-warnings',
  devtool: 'eval-source-map',
  output: DEFAULT.output,

  module: {
    rules: [
      ...DEFAULT.loaders,
      makeCssRules(['style-loader', 'css-loader']),
      makeBabelRules({ plugins: ['react-refresh/babel'] }),
    ],
  },

  plugins: [...DEFAULT.plugins, new ReactRefreshWebpackPlugin()],

  devServer: {
    host: 'localhost',
    port: 80,
    hot: true,
    compress: false,
    historyApiFallback: true,

    client: {
      logging: 'none',
      overlay: false,
      progress: false,
    },
  },
}
