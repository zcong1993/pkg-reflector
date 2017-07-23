require('any-observable/register/rxjs-all') // eslint-disable-line import/no-unassigned-import
const Observable = require('any-observable')
const streamToObservable = require('stream-to-observable')
const split = require('split')
const execa = require('execa')

// forked from https://github.com/sindresorhus/np/blob/master/index.js
function exec(cmd, args) {
  const cp = execa(cmd, args)

  return Observable.merge(
    streamToObservable(cp.stdout.pipe(split()), { await: cp }),
    streamToObservable(cp.stderr.pipe(split()), { await: cp })
  ).filter(Boolean)
}

module.exports = exec
