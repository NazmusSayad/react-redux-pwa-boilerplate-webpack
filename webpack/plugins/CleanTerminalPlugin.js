class CleanTerminalPlugin {
  apply(compiler) {
    let hook = compiler.hooks.beforeCompile

    hook.tap('CleanTerminalPlugin', () => {
      this.clearConsole()
    })
  }

  clearConsole() {
    process.stdout.write(
      process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H'
    )
  }
}

module.exports = CleanTerminalPlugin
