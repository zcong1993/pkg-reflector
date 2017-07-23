const spawn = require('cross-spawn')

module.exports = ({
  saveDev = false,
  deps = []
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

  return shouldUseNpm() ? cmds.npm : cmds.yarn
}

function checkYarnInstalled() {
  const command = spawn.sync('yarn', ['--version'])
  const installed = command.stdout && command.stdout.toString().trim()
  return installed
}

function isNpm5() {
  const command = spawn.sync('npm', ['--version'])
  const majorVersion = command.stdout.toString().trim().split('.')[0]
  const isNpm5 = majorVersion >= 5
  return isNpm5
}

function shouldUseNpm() {
  if (isNpm5()) {
    return true
  }
  if (!checkYarnInstalled()) {
    return true
  }
  return false
}
