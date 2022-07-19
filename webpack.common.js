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
    index: PATH.mainJS,
  },

  output: {
    path: PATH.output,
    filename: "[name].js",
    assetModuleFilename: "[name]-[id][ext]",
    sourcePrefix: "",
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: PATH.template,
      favicon: "./src/assests/icon.svg",
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/i,
        use: ["css-loader", "sass-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
}

module.exports = { CONFIG, PATH }
