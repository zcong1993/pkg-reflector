const fs = require('fs')
const util = require('util')
const path = require('path')

exports.getDepsExisted = () => {
  const pkg = path.resolve(process.cwd(), 'package.json')
  if (!fs.existsSync(pkg)) {
    return []
  }
  const { dependencies, devDependencies } = require(pkg)
  const depsExists = [].concat(Object.keys(dependencies || {}), Object.keys(devDependencies || {}))
  return depsExists
}

exports.readFile = util.promisify(fs.readFile)

exports.stat = util.promisify(fs.stat)

exports.hasPkgJsonHere = () => {
  return fs.existsSync(path.resolve(process.cwd(), 'package.json'))
}
