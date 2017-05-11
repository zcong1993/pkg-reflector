import Listr from 'listr'
import co from 'co'
import pkgDir from 'pkg-dir'
import {hasYarn} from 'yarn-or-npm'
import getDeps from './get-deps'
import {filterNodeCorePkgs, filterDepsExisted} from './filter'
import exec from './exec'
import {hasPkgJsonHere} from './utils'

export const tasks = co.wrap(function * (input, flags) {
  const tasks = new Listr([
    {
      title: 'Anylise the dependent pkgs',
      task: () => Promise.resolve('done')
    },
    {
      title: 'Filter the pkgs',
      skip: (ctx) => ctx.deps.length === 0,
      task: (ctx) => {
        ctx.deps = ctx.deps.filter((pkg) => filterNodeCorePkgs(pkg))
        if (!ctx.opts.here || hasPkgJsonHere()) {
          ctx.deps = ctx.deps.filter((pkg) => filterDepsExisted(pkg))
        }
      }
    },
    {
      title: 'Install pkgs',
      skip: (ctx) => {
        if (ctx.deps.length === 0) {
          return 'deps already exists'
        }
      },
      task: (ctx) => {
        exec(ctx.opts.manager, [ctx.opts.action].concat(ctx.deps, ctx.opts.cmds))
      }
    }
  ])

  const isYarn = hasYarn()
  const opts = {
    manager: isYarn ? 'yarn' : 'npm',
    action: isYarn ? 'add' : 'install',
    cmds: [],
    here: ''
  }
  const deps = yield getDeps(input, flags)
  const projectRootPath = yield pkgDir()

  if (flags.d) {
    opts.cmds.push(isYarn ? '--dev' : '-D')
  }
  if (!isYarn && !flags.d) {
    opts.cmds.push('--save')
  }
  if (flags.here) {
    opts.here = true
  } else {
    process.chdir(projectRootPath)
  }

  return tasks.run({deps, opts})
})
