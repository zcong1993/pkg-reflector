const path = require('path')
const spawn = require('cross-spawn')

const testRoot = __dirname
const testDir = path.resolve(__dirname, 'test')
const testJson = path.resolve(testDir, 'package.json')

const prf = path.resolve(__dirname, '../', 'bin', 'pkg-reflector')

beforeEach(() => {
  spawn.sync('cp', ['-a', './fixture', './test'], { cwd: testRoot })
})

afterEach(() => {
  spawn.sync('rm', ['-rf', './test'], { cwd: testRoot })
})

test('default usage', () => {
  spawn.sync(prf, ['./*'], { cwd: testDir })
  const pkg = require.resolve(testJson)
  expect(pkg.dependencies).toMatchSnapshot()
})
