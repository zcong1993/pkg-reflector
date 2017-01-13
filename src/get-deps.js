import readline from 'readline'
import fs from 'fs'
import PkgError from './pkg-error'

export default function getDeps (file) {
  const deps = []
  // require\(\W+([\w-.]+)[\/\w]*[\W]+\)
  const reg = /require\(['"]+([a-zA-z][\w-.]+)[\/\w]*['"]+\)/i // eslint-disable-line no-useless-escape

  const rl = readline.createInterface({
    input: fs.createReadStream(file)
  })

  return new Promise((resolve, reject) => {
    rl.on('line', (line) => {
      const matches = line.match(reg)
      if (matches) {
        deps.push(matches[1])
      }
    }).on('close', () => {
      if (deps.length === 0) {
        return reject(new PkgError('this file has no pkgs to install'))
      }
      return resolve(deps)
    })
  })
}
