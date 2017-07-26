const fs = require('fs')
const util = require('util')
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

exports.readFile = util.promisify(fs.readFile)

exports.stat = util.promisify(fs.stat)

exports.hasPkgJsonHere = () => {
  return fs.existsSync(path.resolve(process.cwd(), 'package.json'))
}
