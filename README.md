# pkg-reflector [![Build Status](https://img.shields.io/circleci/project/zcong1993/pkg-reflector/master.svg?style=flat)](https://circleci.com/gh/zcong1993/pkg-reflector) [![npm version](https://badge.fury.io/js/pkg-reflector.svg)](https://badge.fury.io/js/pkg-reflector) [![npm](https://img.shields.io/npm/dm/pkg-reflector.svg)](https://www.npmjs.com/package/pkg-reflector)

> install the pkgs your js files


---

## New

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
- automatic ignore node core modules
- ignore local file, such as `./index.js`
- correct parse `foo/bar` pkgs
- can only install es5 modules, es6 modules or all of them

## Usage
```sh
$ pkg-reflector <js file[s]> [options]
```

### simple
```sh
$ pkg-reflector <file>
```


will install the pkgs and save `dependence`.

### multi files

```sh
$ pkg-reflector file1 file2 ...
```

or use `patterns` all [sindresorhus/globby](https://github.com/sindresorhus/globby) support

```sh
$ pkg-reflector ./* 
```
