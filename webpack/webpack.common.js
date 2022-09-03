const HtmlWebpackPlugin = require('html-webpack-plugin')
const InterpolateHtmlPlugin = require('./plugins/InterpolateHtmlPlugin')
const config = require('./config')

module.exports = {
  root: {
    mode: process.env.NODE_ENV,

    entry: {
      index: config.mainJS,
    },

    resolve: {
      extensions: ['.js', '.mjs', '.jsx', '.json', '.wasm'],
    },
  },

  output: {
    path: config.build,
    publicPath: config.publicPath,
    filename: config.assestPath + '/[name].js',
    assetModuleFilename: config.assestModulePath + '/[name]-[id][ext]',
  },

  loaders: [
    {
      test: /\.(htm|html)$/i,
      loader: 'html-loader',
    },
    {
      type: 'asset/resource',
      resourceQuery: /file/i,
    },
    {
      type: 'asset/source',
      resourceQuery: /raw/i,
    },
    {
      type: 'asset/inline',
      resourceQuery: /url/i,
    },
    {
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/i,
      use: ['@svgr/webpack'],
    },
  ],

  plugins: [
    new HtmlWebpackPlugin({
      template: config.template,
    }),

    new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
      PUBLIC_URL: config.publicPath,
    }),
  ],
}
