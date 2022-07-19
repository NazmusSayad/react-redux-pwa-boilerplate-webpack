const { CONFIG } = require("./webpack.common")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

CONFIG.mode = "production"
CONFIG.devtool = false
CONFIG.output.clean = true

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

CONFIG.plugins.push(
  new MiniCssExtractPlugin({
    filename: "[name].css",
  })
)
CONFIG.module.rules[0].use.unshift(MiniCssExtractPlugin.loader)

CONFIG.module.rules[0].use.push({
  loader: "postcss-loader",
  options: {
    postcssOptions: {
      plugins: ["postcss-preset-env"],
    },
  },
})

module.exports = CONFIG
