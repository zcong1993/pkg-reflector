const globby = require('globby')
const konan = require('konan')
const { cwd, isFile, readFile } = require('./utils')
const PkgError = require('./pkg-error')

function getDeps(input, flags) {
  const files = globby.sync([...input, '!./**/node_modules/**'])
  const allDeps = []
  files.forEach(file => {
    if (isFile(cwd(file))) {
      allDeps.push(getFileDeps(cwd(file), flags))
    }
  })
  return Promise.all(allDeps)
    .then(results => {
      const pkgs = new Set(results.reduce((a, b) => a.concat(b), []))
      if ([...pkgs].length === 0) {
        return Promise.reject(new PkgError('no pkgs to install'))
      }
      return [...pkgs]
    })
}

function getFileDeps(file) {
  const code = readFile(file)
  const { strings } = konan(code)
  return strings
    .filter(module => {
      return !/^\./.test(module)
    })
    .map(module => {
      return module.split('/')[0]
    })
}

module.exports = getDeps
