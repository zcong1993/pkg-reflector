import pkgUp from 'pkg-up'
import PkgError from './pkg-error'
import fs from 'fs'
import path from 'path'

export function getDepsExisted () {
  const pkgPath = pkgUp.sync()
  if (!pkgPath) {
    throw new PkgError('package.json not exists, please create first !')
  }
  const {dependencies, devDependencies} = require(pkgPath)
  // const depsExists = Object.keys(dependencies).concat(Object.keys(devDependencies))
  const depsExists = [].concat(Object.keys(dependencies || {}), Object.keys(devDependencies || {}))
  return depsExists
}

export function readFile (file) {
  return fs.readFileSync(file, 'utf8')
}

export function cwd (...args) {
  return path.resolve(process.cwd(), ...args)
}
