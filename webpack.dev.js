const { CONFIG, PATH } = require("./webpack.common")

CONFIG.mode = "development"
CONFIG.devtool = "source-map"
CONFIG.devServer = {
  static: {
    directory: PATH.output,
  },
  port: 80,
  open: true,
  hot: true,
  compress: false,
}

module.exports = CONFIG
