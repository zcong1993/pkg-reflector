const spawn = require('cross-spawn')

module.exports = ({
  saveDev = false,
  deps = [],
  flags
} = {}) => {
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

  if (flags.npm) {
    return cmds.npm
  }

  if (flags.yarn) {
    return cmds.yarn
  }

  return shouldUseNpm() ? cmds.npm : cmds.yarn
}

function checkYarnInstalled() {
  const command = spawn.sync('yarn', ['--version'])
  const installed = command.stdout && command.stdout.toString().trim()
  return installed
}

function shouldUseNpm() {
  return !checkYarnInstalled()
}
