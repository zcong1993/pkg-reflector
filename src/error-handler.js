import chalk from 'chalk'

export default function errorHandler (err) {
  if (err.name === 'PkgError') {
    console.log(chalk.red(`\n ! ${err.message} \n`))
  } else {
    console.log(chalk.red(err.stack))
  }
  process.exit(1)
}
