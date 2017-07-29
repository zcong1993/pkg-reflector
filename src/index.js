const Listr = require('listr')
const createInstall = require('./create-install')
const getDeps = require('./get-deps')
const { filterNodeCorePkgs, filterDepsExisted } = require('./filter')
const exec = require('./exec')
const { hasPkgJsonHere } = require('./utils')
const PkgError = require('./pkg-error')

exports.tasks = (input, flags) => {
  const tasks = new Listr([
    {
      title: 'Ensure if package.json exists',
      task: () => {
        if (!hasPkgJsonHere()) {
          throw new PkgError('package.json not exists, please create first !')
        }
      }
    },
    {
      title: 'Anylise the dependent pkgs',
      task: () => Promise.resolve('done')
    },
    {
      title: 'Filter the pkgs',
      skip: ctx => ctx.deps.length === 0,
      task: ctx => {
        ctx.deps = ctx.deps.filter(filterNodeCorePkgs).filter(filterDepsExisted)
      }
    },
    {
      title: 'Install pkgs',
      skip: ctx => {
        if (ctx.deps.length === 0) {
          return 'deps already exists'
        }
        if (flags.dry) {
          return 'dry run'
        }
      },
      task: ctx => {
        const [cmd, ...rest] = createInstall({
          saveDev: ctx.opts.dev,
          deps: ctx.deps,
          flags
        })
        return exec(cmd, rest)
      }
    }
  ])

  const opts = {
    dev: false
  }

  return getDeps(input)
    .then(deps => {
      if (flags.d) {
        opts.dev = true
      }
      return tasks.run({ deps, opts })
    })
}
