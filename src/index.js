import Listr from 'listr'
import getDeps from './get-deps'
import co from 'co'
import filterPkgs from './filter'
import exec from './exec'

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
        ctx.deps = ctx.deps.filter((pkg) => filterPkgs(pkg))
      }
    },
    {
      title: 'Install pkgs via yarn',
      skip: (ctx) => {
        if (ctx.deps.length === 0) {
          return 'deps already exists'
        }
      },
      task: (ctx) => exec('yarn', ['add'].concat(ctx.deps, ctx.opts))
    }
  ])

  const opts = []
  if (flags.d) {
    opts.push('--dev')
  }
  const deps = yield getDeps(input)
  return tasks.run({deps, opts})
})
