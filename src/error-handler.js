const chalk = require('chalk')
const logSymbols = require('log-symbols')

module.exports = err => {
  if (err.name === 'PkgError') {
    console.log(`\n${logSymbols.error}`, chalk.red(` ${err.message} \n`))
    process.exit(1) // eslint-disable-line unicorn/no-process-exit
  } else {
    console.log(chalk.red(err.message))
  }
  process.exit(1) // eslint-disable-line unicorn/no-process-exit
}
