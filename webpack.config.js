const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const IN_DEV_MODE = true
const PATH = {
  mainJS: "src/index.js",
  template: "src/index.html",
  output: "dist",
}

for (let key in PATH) {
  PATH[key] = path.resolve(__dirname, PATH[key])
}

module.exports = {
  mode: IN_DEV_MODE ? "development" : "production",
  devtool: IN_DEV_MODE ? "source-map" : false,

  entry: {
    script: PATH.mainJS,
  },
  output: {
    path: PATH.output,
    filename: "[name].js",
    assetModuleFilename: "[name][ext]",
  },

  devServer: {
    static: {
      directory: PATH.output,
    },
    port: 80,
    open: true,
    hot: true,
    compress: !IN_DEV_MODE,
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass|css)$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: PATH.template,
    }),
  ],
}
