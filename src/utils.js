const fs = require('fs')
const path = require('path')
const pkgUp = require('pkg-up')

exports.getDepsExisted = () => {
  const pkgPath = pkgUp.sync()
  if (!pkgPath) {
    return []
  }
  const { dependencies, devDependencies } = require(pkgPath)
  const depsExists = [].concat(Object.keys(dependencies || {}), Object.keys(devDependencies || {}))
  return depsExists
}

exports.readFile = file => {
  return fs.readFileSync(file, 'utf8')
}

exports.cwd = (...args) => {
  return path.resolve(process.cwd(), ...args)
}

exports.isFile = file => {
  return fs.statSync(file).isFile()
}

exports.hasPkgJsonHere = () => {
  return fs.existsSync(path.resolve(process.cwd(), 'package.json'))
}
