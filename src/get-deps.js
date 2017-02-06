import readline from 'readline'
import fs from 'fs'
import globby from 'globby'
import {cwd, isFile} from './utils'
import PkgError from './pkg-error'

export default function getDeps (input, flags) {
  const files = globby.sync([...input, '!**/node_modules/**'])
  const allDeps = []
  files.forEach((file) => {
    if (isFile(cwd(file))) {
      allDeps.push(getFileDeps(cwd(file), flags))
    }
  })
  return Promise.all(allDeps)
    .then((results) => {
      const pkgs = new Set(results.reduce((a, b) => a.concat(b), []))
      if ([...pkgs].length === 0) {
        return Promise.reject(new PkgError('no pkgs to install'))
      }
      return [...pkgs]
    })
}

function getFileDeps (file, flags) {
  const isES = flags.es
  const isAll = flags.all
  const deps = []
  // require\(\W+([\w-.]+)[\/\w]*[\W]+\)
  const reg = /require\(['"]+([a-zA-z][\w-.]+)[\/\w]*['"]+\)/i // eslint-disable-line no-useless-escape
  const regES = /import[^."]+['"]+([a-zA-z][\w-.]+)[\/\w]*['"]+/i // eslint-disable-line no-useless-escape

  const rl = readline.createInterface({
    input: fs.createReadStream(file)
  })

  return new Promise((resolve) => {
    rl.on('line', (line) => {
      if (!isES || isAll) {
        const matches = line.match(reg)
        if (matches) {
          deps.push(matches[1])
        }
      }
      if (isES || isAll) {
        const matchesES = line.match(regES)
        if (matchesES) {
          deps.push(matchesES[1])
        }
      }
    }).on('close', () => {
      return resolve(deps)
    })
  })
}
