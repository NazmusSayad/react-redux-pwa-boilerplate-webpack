class CleanTerminalPlugin {
  apply(compiler) {
    compiler.hooks.beforeCompile.tap('CleanTerminalPlugin', () => {
      console.clear()
    })
  }
}

module.exports = CleanTerminalPlugin
