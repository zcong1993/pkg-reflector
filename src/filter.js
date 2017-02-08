import {getDepsExisted} from './utils'

const NodeCorePkgs = ['child_process', 'cluster', 'console', 'crypto', 'dns', 'domain', 'events', 'fs', 'http', 'https', 'net', 'os', 'path', 'punycode', 'querystring', 'readline', 'repl', 'stream', 'string_decoder', 'tls', 'tty', 'dgram', 'url', 'util', 'v8', 'vm', 'zlib']
const DepsExisted = getDepsExisted()
// const IgnorePkglist = NodeCorePkgs.concat(DepsExisted)

export function filterNodeCorePkgs (pkg) {
  return !NodeCorePkgs.includes(pkg)
}

export function filterDepsExisted (pkg) {
  return !DepsExisted.includes(pkg)
}
