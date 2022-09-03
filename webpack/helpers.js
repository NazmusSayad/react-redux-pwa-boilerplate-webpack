const config = require('./config')

exports.makeCssRule = (loaders = []) => {
  const cssLoaders = {
    test: config.cssRegex,
    use: [...loaders, 'sass-loader'],
  }

  cssLoaders.use[cssLoaders.use.indexOf('css-loader')] = {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName:
          process.env.NODE_ENV === 'development'
            ? '[local]([name])[hash:base64:5]'
            : '[hash:base64]',
        auto: config.cssModuleRegex || true,
      },
    },
  }

  return cssLoaders
}

exports.makeBabelRule = ({ presets = [], plugins = [] }) => {
  return {
    test: /\.(js|mjs|jsx)$/i,
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
