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
}

const cssLoaders = ["style-loader", "css-loader"]

CONFIG.module = {
  rules: [
    {
      test: /\.css$/i,
      use: cssLoaders,
    },
    {
      test: /\.(scss|sass)$/i,
      use: [...cssLoaders, "sass-loader"],
    },
    {
      test: /\.html$/i,
      loader: "html-loader",
    },
  ],
}

CONFIG.plugins = [
  new HtmlWebpackPlugin({
    filename: "index.html",
    template: PATH.template,
    favicon: "./src/assests/icon.svg",
  }),
]

module.exports = { CONFIG, PATH }
