const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATH = {
  mainJS: __dirname + '/src/index.js',
  template: __dirname + '/src/index.html',
  build: __dirname + '/build',
  assest: 'static',
}

const DEFAULT = {
  root: {
    entry: {
      index: PATH.mainJS,
    },

    output: {
      path: PATH.build,
      filename: PATH.assest + '/[name].js',
      assetModuleFilename: PATH.assest + '/[name]-[id][ext]',
    },

    resolve: {
      extensions: ['.js', '.mjs', '.jsx', '.json', '.wasm'],
    },
  },

  loaders: [
    {
      test: /\.html$/i,
      loader: 'html-loader',
    },
  ],

  plugins: [
    new HtmlWebpackPlugin({
      template: PATH.template,
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
