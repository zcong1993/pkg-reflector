# pkg-reflector 

[![Build Status](https://img.shields.io/circleci/project/zcong1993/pkg-reflector/master.svg?style=flat)](https://circleci.com/gh/zcong1993/pkg-reflector) [![NPM version](https://img.shields.io/npm/v/pkg-reflector.svg?style=flat-square)](https://npmjs.com/package/pkg-reflector) [![npm](https://img.shields.io/npm/dm/pkg-reflector.svg)](https://www.npmjs.com/package/pkg-reflector)

> Find and install the npm modules your js files used

---

## New

- use flag `--npm` or `--yarn` choose installing tool (default: prefer `yarn` if available)

- support alias `prf` for `pkg-reflector`

- now support multi files, can be used like `pkg-reflector src/* libs/* *.js`, resolve files using [globby](https://github.com/sindresorhus/globby) and always ignore `**/node_modules/**`

## Install

```sh
$ npm install -g pkg-reflector
# using yarn
$ yarn global add pkg-reflector
```

## Feature

Sometimes, we copy some js file from other folder or project, such as `rollup.config.js`,you only want to use it in your current project.

If the js file depends some npm modules, you should install these first by yourself, like this:

```sh
$ yarn add module1 module2 module3...
```

we may get some error when add modules cause wrong spelling of the long module name, so use `pkg-reflector`, you can do it like this:

```sh
$ prf foo.js
# then all done
```

easy way, isn't it ?

## Usage
```sh
$ prf <js file[s]> [options]
# use 'prf -h' for more help
```

### simple
```sh
$ prf <file>
```


will install the pkgs and save `dependence`.

### multi files

```sh
$ prf file1 file2 ...
```

or use `patterns` all [sindresorhus/globby](https://github.com/sindresorhus/globby) support

```sh
$ prf "./**/*.js" 
```
*Note:* you should pass args as string `"./**/*.js"`, not `./**/*.js`(this will be executed by terminal, if it contains `node_modules` folder maybe cause error `zsh: argument list too long`)
