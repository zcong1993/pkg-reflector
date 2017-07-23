const { getDepsExisted } = require('./utils')

const NodeCorePkgs = ['child_process', 'cluster', 'console', 'crypto', 'dns', 'domain', 'events', 'fs', 'http', 'https', 'net', 'os', 'path', 'punycode', 'querystring', 'readline', 'repl', 'stream', 'string_decoder', 'tls', 'tty', 'dgram', 'url', 'util', 'v8', 'vm', 'zlib']
const DepsExisted = getDepsExisted()

exports.filterNodeCorePkgs = pkg => {
  return !NodeCorePkgs.includes(pkg)
}

exports.filterDepsExisted = pkg => {
  return !DepsExisted.includes(pkg)
}
