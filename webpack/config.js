module.exports = {
  build: __dirname + '/../build',
  publicDir: __dirname + '/../public',
  mainJS: __dirname + '/../src/index.js',
  template: __dirname + '/../src/index.html',

  publicPath: '/',
  assestPath: 'static',
  assestModulePath: 'static/assest',

  cssRegex: /\.(c|sc|sa)ss$/i,
  // cssModuleRegex: /\.module\.\w+$/i,
}
