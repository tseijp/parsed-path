<div align="center">
  <h1>parsed-path</h1>
</div>

<br />

<div align="center">

**Use the best bits of ES6 to parse your path without stress 🤳🏻**

<br />

[![Version](
  https://img.shields.io/npm/v/parsed-path)](
  https://npmjs.com/package/parsed-path)
[![Downloads](
  https://img.shields.io/npm/dt/parsed-path.svg)](
  https://npmjs.com/package/parsed-path)
[![parsed-path latest minizipped size](
  https://badgen.net/bundlephobia/minzip/parsed-path)](
  https://bundlephobia.com/result?p=parsed-path)
[![Code Coverag](
  https://codecov.io/gh/parsed-path/parsed-path/coverage.svg?branch=master)](
  https://codecov.io/gh/parsed-path/parsed-path)
[![module formats: umd, cjs, esm](
  https://img.shields.io/badge/module%20formats-umd%2C%20cjs%2C%20esm-green.svg)
  ](#alternative-installation-methods)

</div>

### Installation

- `npm install parsed-path`

### Documentation

See the documentation for more information about `parsed-path`

- [Getting started](
  https://github.com/tseijp/parsed-path/blob/master/packages/parsed-path/docs/get.md)
- [API Reference](
  https://github.com/tseijp/parsed-path/blob/master/packages/parsed-path/docs/api.md)

### What does it look like?

Utilising tagged template literals (a recent addition to JavaScript),
parsed-path allows you to write pathname.
This two example creates simple pathname.
a Root and a File, with some parsed attachment to it:

```js
import parsed from 'parsed-path';

const Root = parsed`/`;

const Path = Root`home``user``dir`;
```

`Parsed path` tagged location to parse your pathname.
It also removes the mapping between pathname and parsing
– using path as a low-level parsing construct could not be easier!

```js
const File = Path`
  root: ./;
  name: file;
  ext: .txt;
`;
```

You can pass a function to a parsed path's template literal to adapt it based on its props.
When setting the back prop to true, we are moving its file directory.

```js
const Back = Path(props => props.back && "..")`
  root: ./;
  name: file;
  ext: ${props => props.ext || ".tsx"};
`;
```

> `Back({back: true})` to equal ./src/index.ts  
> `Back({name: "xx"})` to equal ./src/utils/xx.tsx  
> `Back({ext: "jsx"})` to equal ./src/utils/index.jsx  


This is a [live editor](https://codesandbox.io/s/parsed-path-x66qy),
so play around with the code to get a feel for
what it's like to work with `parsed-path`!

`Parsed path` uses [node/path.js](
  https://github.com/nodejs/node/blob/master/lib/path.js)
module for parsing the path rules.
For additional information about the supported prefixes visit their [node.js docs](
  https://nodejs.org/docs/latest/api/path.html#path_path_parse_path).

```js
/*    ┌──────────────────────┬────────────┐
 *    │           dir        │    base    │
 *    ├──────┬               ├──────┬─────┤
 *    │ root │               │ name │ ext │    */
parsed`    /``home``user``dir``file``.txt `
parsed` C:\\``      path``dir``file``.txt `
/*    └──────┴───────────────┴──────┴─────┘    */
```
