import Listr from 'listr'
import co from 'co'
import pkgDir from 'pkg-dir'
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
      title: 'Install pkgs via yarn',
      skip: (ctx) => {
        if (ctx.deps.length === 0) {
          return 'deps already exists'
        }
      },
      task: (ctx) => exec('yarn', ['add'].concat(ctx.deps, ctx.opts.yarn))
    }
  ])

  const opts = {
    yarn: [],
    here: ''
  }
  const deps = yield getDeps(input, flags)
  const projectRootPath = yield pkgDir()

  if (flags.d) {
    opts.yarn.push('--dev')
  }
  if (flags.here) {
    opts.here = true
  } else {
    process.chdir(projectRootPath)
  }

  return tasks.run({deps, opts})
})
