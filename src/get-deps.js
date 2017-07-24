const globby = require('globby')
const konan = require('konan')
const { cwd, isFile, readFile } = require('./utils')

function getDeps(input) {
  const files = globby.sync([...input, '!./**/node_modules/**'])
  const allDeps = []
  files.forEach(file => {
    if (isFile(cwd(file))) {
      allDeps.push(getFileDeps(cwd(file)))
    }
  })
  const pkgs = new Set(allDeps.reduce((a, b) => a.concat(b), []))
  return [...pkgs]
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
