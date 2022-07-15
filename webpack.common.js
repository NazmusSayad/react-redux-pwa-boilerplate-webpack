const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const PATH = {
  mainJS: "src/index.js",
  template: "src/index.html",
  output: "dist",
}

for (let key in PATH) {
  PATH[key] = path.resolve(__dirname, PATH[key])
}

const CONFIG = {
  entry: {
    script: PATH.mainJS,
  },

  output: {
    path: PATH.output,
    filename: "script.js",
    assetModuleFilename: "[name]-[id][ext]",
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.(scss|sass|css)$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
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

module.exports = { CONFIG, PATH }
