# pkg-reflector [![Build Status](https://img.shields.io/circleci/project/zcong1993/pkg-reflector/master.svg?style=flat)](https://circleci.com/gh/zcong1993/pkg-reflector) [![npm version](https://badge.fury.io/js/pkg-reflector.svg)](https://badge.fury.io/js/pkg-reflector) [![npm](https://img.shields.io/npm/dm/pkg-reflector.svg)](https://www.npmjs.com/package/pkg-reflector)

install the pkgs your js file used by yarn

> Sorry, only support yarn

---

## New

- using [egoist/konan](https://github.com/egoist/konan) find modules, and always install es5 es6 modules

- support `here` mode, install pkgs in cwd folder, more details see `Usage` below

- support alias `prf` for `pkg-reflector`

- now support multi files, can be used like `pkg-reflector src/* libs/* *.js`, resolve files using [globby](https://github.com/sindresorhus/globby) and always ignore `**/node_modules/**`

## Install

```sh
$ npm install -g pkg-reflector
# using yarn
$ yarn global add pkg-reflector
```

## Feature

Sometimes, you copy some js file from other folder or project, such as `rollup.config.js`,you only want to use it in your current project.

If the js file depends some pkgs, you should install the pkgs first by your self, like this:

```sh
$ yarn add pkg1 pkg2 pkg3...
```

you always get some error when add pkgs cause wrong spelling of the long pkg name, so use `pkg-reflector`, you can do it like this:

```sh
$ pkg-reflector foo.js
# then have a coffee
```

easy way, isn't it ?

- automatic ignore the pkgs your `package.json` exist
- automatic ignore node core pkgs
- ignore local file, such as `./index.js`
- correct parse `foo/bar` pkgs
- find the closest `package.json` by `pkg-up`
- always install all the es5 modules and es6 modules

## Usage

    $ pkg-reflector <js file[s]> [options]

### simple

    $ pkg-reflector <file>


will install the pkgs of the file depended, only install the `es5` modules which key word is `require`, and save `dependence` to `closest` package.json.

### save as devDependences `--dev, -d`

    $ pkg-reflector <file> --dev

### install in cwd folder `--here`

    $ pkg-reflector <file> --here

will install pkgs in the cwd folder, and create a new package.json here, default working folder is the root directory of your npm package project, for details see [sindresorhus/pkg-dir](https://github.com/sindresorhus/pkg-dir)
