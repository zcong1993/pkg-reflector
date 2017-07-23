const chalk = require('chalk')

module.exports = err => {
  if (err.name === 'PkgError') {
    console.log(chalk.red(`\n ! ${err.message} \n`))
    process.exit(1) // eslint-disable-line unicorn/no-process-exit
  } else {
    console.log(chalk.red(err.stack))
  }
  process.exit(1) // eslint-disable-line unicorn/no-process-exit
}
