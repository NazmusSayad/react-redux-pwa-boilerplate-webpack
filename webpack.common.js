const HtmlWebpackPlugin = require('html-webpack-plugin')

class InterpolateHtmlPlugin {
  constructor(htmlWebpackPlugin, replacements) {
    this.htmlWebpackPlugin = htmlWebpackPlugin
    this.replacements = replacements
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('InterpolateHtmlPlugin', compilation => {
      this.htmlWebpackPlugin
        .getHooks(compilation)
        .afterTemplateExecution.tap('InterpolateHtmlPlugin', data => {
          Object.keys(this.replacements).forEach(key => {
            const value = this.replacements[key]
            data.html = data.html.replace(new RegExp(`%${key}%/`, 'g'), value)
          })
        })
    })
  }
}

const PATH = {
  mainJS: __dirname + '/src/index.js',
  template: __dirname + '/src/index.html',
  build: __dirname + '/dist',
  assest: 'static',
  public: '/',
}

const DEFAULT = {
  root: {
    mode: process.env.NODE_ENV,

    entry: {
      index: PATH.mainJS,
    },

    resolve: {
      extensions: ['.js', '.mjs', '.jsx', '.json', '.wasm'],
    },
  },

  output: {
    path: PATH.build,
    filename: PATH.assest + '/[name].js',
    assetModuleFilename: PATH.assest + '/assest/[name]-[id][ext]',
    publicPath: PATH.public,
  },

  loaders: [
    {
      test: /\.(htm|html)$/i,
      loader: 'html-loader',
    },

    {
      test: /\.(png|jpe?g|gif|webp|webm|mp3|mp4)$/i,
      type: 'asset/resource',
    },

    {
      test: /\.(svg|txt)$/i,
      type: 'asset/source',
    },
  ],

  plugins: [
    new HtmlWebpackPlugin({
      template: PATH.template,
    }),
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
      PUBLIC_URL: PATH.public,
    }),
  ],
}

const makeCssRules = (loaders = []) => {
  const cssRegex = /\.(css|scss|sass)$/i
  const moduleRegex = /\.module\.(css|scss|sass)$/i

  const cssLoaders = {
    test: cssRegex,
    use: [...loaders, 'sass-loader'],
  }

  cssLoaders.use[cssLoaders.use.indexOf('css-loader')] = {
    loader: 'css-loader',
    options: {
      modules: {
        auto: moduleRegex,
        localIdentName: '[path][name]__[local]--[hash:base64:5]',
      },
    },
  }

  return cssLoaders
}

const makeBabelRules = ({ presets = [], plugins = [] }) => {
  return {
    test: /\.(js|mjs|jsx)$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          [
            '@babel/preset-react',
            {
              runtime: 'automatic',
            },
          ],
          ...presets,
        ],
        plugins: [...plugins],
      },
    },
  }
}

module.exports = {
  DEFAULT,
  PATH,
  makeCssRules,
  makeBabelRules,
}
