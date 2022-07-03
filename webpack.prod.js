const { CONFIG } = require("./webpack.common")

CONFIG.mode = "production"
CONFIG.devtool = false

module.exports = CONFIG
