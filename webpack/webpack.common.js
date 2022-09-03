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
    filename: config.assestPath + '/[name].js',
    assetModuleFilename: config.assestPath + '/assest/[name]-[id][ext]',
    publicPath: config.publicPath,
  },

  loaders: [
    {
      test: /\.(htm|html)$/i,
      loader: 'html-loader',
    },

    {
      test: /\.(png|jpg|jpeg|gif|webp|webm|mp3|mp4)$/i,
      type: 'asset/resource',
    },

    {
      test: /\.(svg|txt)$/i,
      type: 'asset/source',
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
