const globby = require('globby')
const konan = require('konan')
const { stat, readFile } = require('./utils')

function getDeps(input) {
  const files = globby.sync([...input, '!./**/node_modules/**'])

  const pms = []
  files.forEach(file => {
    pms.push(handlerFile(file))
  })

  return Promise.all(pms)
    .then(allDeps => {
      const pkgs = new Set(allDeps.reduce((a, b) => a.concat(b), []))
      return [...pkgs]
    })
}

function getFileDeps(file) {
  return readFile(file, 'utf8')
    .then(code => {
      const { strings } = konan(code)

      return strings
        .filter(module => {
          return !/^\./.test(module)
        })
        .map(module => {
          return module.split('/')[0]
        })
    })
}

function handlerFile(file) {
  return stat(file)
    .then(stat => stat.isFile())
    .then(isFile => {
      if (isFile) {
        return getFileDeps(file)
      }
      return Promise.resolve([])
    })
}

module.exports = getDeps
