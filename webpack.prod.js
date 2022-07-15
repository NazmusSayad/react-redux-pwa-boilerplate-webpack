const { CONFIG } = require("./webpack.common")

CONFIG.mode = "production"
CONFIG.devtool = false
CONFIG.module.rules.push({
  test: /\.m?js$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-env"],
    },
  },
})

module.exports = CONFIG
