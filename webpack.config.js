const path = require("path")

module.exports = {
  entry: "./src/script/app.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
  },
  mode: "development",
  // mode: "production",
  // optimization: {
  //   minimize: false,
  // },
  devtool: false,
}
