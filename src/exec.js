import 'any-observable/register/rxjs-all'
import Observable from 'any-observable'
import streamToObservable from 'stream-to-observable'
import split from 'split'
import execa from 'execa'

// forked from https://github.com/sindresorhus/np/blob/master/index.js
export default function exec (cmd, args) {
  const cp = execa(cmd, args)

  return Observable.merge(
    streamToObservable(cp.stdout.pipe(split()), {await: cp}),
    streamToObservable(cp.stderr.pipe(split()), {await: cp})
    ).filter(Boolean)
}
