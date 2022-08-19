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
  build: __dirname + '/build',
  assest: 'static',
  public: '/',
}

const DEFAULT = {
  root: {
    entry: {
      index: PATH.mainJS,
    },

    output: {
      path: PATH.build,
      filename: PATH.assest + '/[name].js',
      assetModuleFilename: PATH.assest + '/assest/[name]-[id][ext]',
      publicPath: PATH.public,
    },

    resolve: {
      extensions: ['.js', '.mjs', '.jsx', '.json', '.wasm'],
    },
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

  const normalCss = {
    test: cssRegex,
    exclude: moduleRegex,
    use: [...loaders, 'sass-loader'],
  }

  const moduleCss = {
    test: cssRegex,
    include: moduleRegex,
    use: [...loaders, 'sass-loader'],
  }

  moduleCss.use[moduleCss.use.indexOf('css-loader')] = {
    loader: 'css-loader',
    options: {
      importLoaders: 1,
      modules: true,
    },
  }

  return [normalCss, moduleCss]
}

const makeBabelRules = (extraPresets = []) => {
  return {
    test: /\.(js|mjs|jsx)$/,
    exclude: /node_modules/,
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
          ...extraPresets,
        ],
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
