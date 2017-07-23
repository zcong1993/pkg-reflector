const path = require('path')
const spawn = require('cross-spawn')

const testRoot = __dirname

const prf = path.resolve(__dirname, '../', 'bin', 'pkg-reflector')

test('default usage', () => {
  const testDir = path.resolve(__dirname, 'test1')
  const testJson = path.resolve(testDir, 'package.json')
  spawn.sync('cp', ['-a', './fixture', './test1'], { cwd: testRoot })
  spawn.sync(prf, ['./*'], { cwd: testDir })
  const pkg = require(testJson)
  expect(pkg).toMatchSnapshot()
  spawn.sync('rm', ['-rf', './test1'], { cwd: testRoot })
})

test('save dev', () => {
  const testDir = path.resolve(__dirname, 'test2')
  const testJson = path.resolve(testDir, 'package.json')
  spawn.sync('cp', ['-a', './fixture', './test2'], { cwd: testRoot })
  spawn.sync(prf, ['./*', '-d'], { cwd: testDir })
  const pkg = require(testJson)
  expect(pkg).toMatchSnapshot()
  spawn.sync('rm', ['-rf', './test2'], { cwd: testRoot })
})
