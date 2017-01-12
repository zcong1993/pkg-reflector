import path from 'path'
import readline from 'readline'
import fs from 'fs'

export default function getDeps (file) {
  const deps = []
  const reg = /require\(\W+([\w-.]+)[\/\w]*[\W]+\)/i // eslint-disable-line no-useless-escape

  const rl = readline.createInterface({
    input: fs.createReadStream(file)
  })

  rl.on('line', (line) => {
    const matches = line.match(reg)
    if (matches) {
      deps.push(matches[1])
    }
  }).on('close', () => {
    return deps
  })
}

getDeps(path.resolve(process.cwd(), 'gulpfile.babel.js'))
