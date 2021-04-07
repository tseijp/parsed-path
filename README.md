<div align="center">
  <h1>parsed-path</h1>
</div>

<br />

<div align="center">

**Use the best bits of ES6 to make path manipulation without stress 🤳🏻**

<br />

[![parsed-path latest minified+gzip size](
  https://badgen.net/bundlephobia/minzip/styled-components)](
  https://bundlephobia.com/result?p=parsed-path)
[![module formats: umd, cjs, esm](
  https://img.shields.io/badge/module%20formats-umd%2C%20cjs%2C%20esm-green.svg)
  ](#alternative-installation-methods)
[![Code Coverag](
  https://codecov.io/gh/styled-components/styled-components/coverage.svg?branch=master)](
  https://codecov.io/gh/styled-components/styled-components)

</div>

### Installation

- `npm install parsed-path`

### Documentation

See the documentation for more information about using `parsed-path`

- [Getting started](
    https://github.com/tseijp/parsed-path/packages/parsed-path/docs/get.md)
- [API Reference](
    https://github.com/tseijp/parsed-path/packages/parsed-path/docs/api.md)

### Basic Usages

Utilising tagged template literals (a recent addition to JavaScript),
parsed-path allows you to write pathname.
It also removes the mapping between pathname and parsing
– using path as a low-level parsing construct could not be easier!

```js
const path = parsed`
  dir: src/utils
  root: ./
`;
// to equal ./src/utils
```



```js
const file = path`..``index.js``
  ext: .ts
  root: ~/
`;
// to equal ~/src/index.ts
```



```js
const wrap = path(file.base)`
  ext: ${props => props.ext || "tsx"}
  name: ${props => props.name}
`(props => props.back? "..": ".");
// to equal ./src/utils/index.tsx
```



```js
console.log`
  ${  path.to`src`  } to equal ..
  ${  path.from`src`  } to equal utils
  ${  path.mount`test`  } to equal test/src/utils

  ${  parsed(file).dir`utils`  } to equal ~/src/utils
  ${  parsed(file).move`test`  } to equal ~/test/index.ts
  ${  parsed(file).name`.tsx`  } to equal index.tsx

  ${  wrap({ext: "jsx"})  } to equal ./src/utils/index.tsx
  ${  wrap({name: "xx"})  } to equal ./src/utils/xx.ts
  ${  wrap({back: true})  } to equal ./src/index.ts
`
```

### React Recipies

```js
import {render} from 'ReactDOM';
import parsed from 'parsed-path';

const VER = 2.1;
const API = parsed`api``v${VER}``user``${props => props.user}`;

render(<API user={10}/>, document.getElementById('root'));
```
