import globby from 'globby'
import konan from 'konan'
import {cwd, isFile, readFile} from './utils'
import PkgError from './pkg-error'

export default function getDeps (input) {
  const files = globby.sync([...input, '!**/node_modules/**']).filter((file) => /\.jsx?$/.test(file))
  const allDeps = []
  files.forEach((file) => {
    if (isFile(cwd(file))) {
      allDeps.push(getFileDeps(cwd(file)))
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

function getFileDeps (file) {
  const regex = new RegExp(/^[a-zA-Z][^/]+/)
  const content = readFile(file)
  let deps = konan(content).filter((pkg) => pkg.match(regex))
  deps = deps.map((pkg) => pkg.match(regex)[0])
  return Promise.resolve(deps)
}
