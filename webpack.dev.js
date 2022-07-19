const { CONFIG, PATH } = require("./webpack.common")

CONFIG.mode = "development"
CONFIG.stats = "errors-warnings"
CONFIG.devtool = "eval"

CONFIG.module.rules[0].use.unshift("style-loader")

CONFIG.devServer = {
  watchFiles: ["src/*"],

  client: {
    logging: "none",
  },

  static: {
    directory: PATH.output,
  },

  port: 80,
  hot: true,
  compress: false,
}

module.exports = CONFIG
