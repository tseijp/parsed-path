<div align="center">
  <h1>parsed-path</h1>
</div>

<br />

<div align="center">

**Use the best bits of ES6 to make path manipulation without stress 🤳🏻**

<br />

[![parsed-path latest minified+gzip size](
  https://badgen.net/bundlephobia/minzip/parsed-path)](
  https://bundlephobia.com/result?p=parsed-path)

[![module formats: umd, cjs, esm](
  https://img.shields.io/badge/module%20formats-umd%2C%20cjs%2C%20esm-green.svg)
  ](#alternative-installation-methods)

[![Code Coverag](
  https://codecov.io/gh/parsed-path/parsed-path/coverage.svg?branch=master)](
  https://codecov.io/gh/parsed-path/parsed-path)

</div>

### Installation

- `npm install parsed-path`

### Documentation

See the documentation for more information about using `parsed-path`

- [Getting started](
    https://github.com/tseijp/parsed-path/packages/parsed-path/docs/get.md)
- [API Reference](
    https://github.com/tseijp/parsed-path/packages/parsed-path/docs/api.md)

### Basic Usage

Utilising tagged template literals (a recent addition to JavaScript),
parsed-path allows you to write pathname.
It also removes the mapping between pathname and parsing
– using path as a low-level parsing construct could not be easier!

```js
const Root = parsed`/`;
```



```js
const Path = Root`home``user``dir`
```



```js
const File = Path`
  name: file;
  ext: .txt;
`;
```
to equal `/home/user/dir/file.txt`



```js
const Wrap = File(props => props.back && "..")`
  name: ${props => props.name}
  ext: ${props => props.ext || "tsx"};
`;
```
to equal `./src/index.tsx`
