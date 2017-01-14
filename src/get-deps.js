import readline from 'readline'
import fs from 'fs'
import PkgError from './pkg-error'

export default function getDeps (file, flags) {
  const isES = flags.es
  const isAll = flags.all
  const deps = []
  // require\(\W+([\w-.]+)[\/\w]*[\W]+\)
  const reg = /require\(['"]+([a-zA-z][\w-.]+)[\/\w]*['"]+\)/i // eslint-disable-line no-useless-escape
  const regES = /import[^."]+['"]+([a-zA-z][\w-.]+)[\/\w]*['"]+/i // eslint-disable-line no-useless-escape

  const rl = readline.createInterface({
    input: fs.createReadStream(file)
  })

  return new Promise((resolve, reject) => {
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
      if (deps.length === 0) {
        return reject(new PkgError('this file has no pkgs to install'))
      }
      return resolve(deps)
    })
  })
}
