# parsed-path
A node module to make path manipulation without stress. 🤳🏻

### Installation
- `npm install -S parsed-path`

### Docs
See the documentation for more information about using `parsed-path`

- [Getting started]("./parsed-path/docs/get.md")
- [API Reference]("./packages/parsed-path/docs/api.md")

### Example
```js
import parsed from 'parsed-path';

const path = parsed('src/utils')`
    root: /;
`;
console.log(`
  ${ path.mount`test` } toBe test/src/utils
  ${ path.from`src`   } toBe utils/index.ts
  ${ path.to`src`     } toBe ..
`);

const file = path`index${ ({ext=".ts"}) => ext }`;
console.log(`
  ${ file({exc: ".js"}) } toBe /src/utils/index.js
  ${ file.dirname`test` } toBe /src/utils/test
  ${ file.move`../test` } toBe /src/test/index.ts
  ${ file.basename`.js` } toBe index.js
`);
```

### Pathname Formatting

```js
parsed('/ignored')`
  dir: /home/user/dir;
  base: file.txt;
`
// Returns: '/home/user/dir/file.txt'

parsed('.ignored')`
  root: /;
  base: file.txt;
  ext: ignored;
`
// Returns: '/file.txt'
```

### React Recipies

```js
import React from 'React'
import ReactDOM from 'ReactDOM'
import parsed from 'parsed-path'

const API_VERSION = 2.1
const API = parsed()`api``v${API_VERSION}``user``${({user}) => user}`

ReactDOM.render(<API user={10}/>, document.getElementById('root'))
```
