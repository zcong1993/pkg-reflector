const spawn = require('cross-spawn')

module.exports = ({
  saveDev = false,
  deps = [],
  flags
} = {}) => {
  if (flags.customCmds) {
    const cmds = flags.customCmds.split(' ')
    return [...cmds, ...deps]
  }

  const cmds = {
    npm: ['npm', 'install', ...deps],
    yarn: ['yarn', 'add', ...deps]
  }

  if (saveDev) {
    cmds.npm.push('-D')
    cmds.yarn.push('--dev')
  } else {
    cmds.npm.push('--save')
  }

  if (flags.yarn && checkYarnInstalled()) {
    return cmds.yarn
  }

  if (flags.npm) {
    return cmds.npm
  }

  return checkYarnInstalled() ? cmds.yarn : cmds.npm
}

let hasYarn

function checkYarnInstalled() {
  if (hasYarn !== undefined) {
    return hasYarn
  }
  const command = spawn.sync('yarn', ['--version'])
  const installed = command.stdout && command.stdout.toString().trim()
  hasYarn = installed
  return installed
}
