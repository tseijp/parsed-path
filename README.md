# parsed-path
A node module to make path manipulation without stress. 🤳🏻

### Installation
- `npm install -S parsed-path`

### Docs
See the documentation for more information about using `parsed-path`

- [Getting started](
    https://github.com/tseijp/parsed-path/packages/parsed-path/docs/get.md)
- [API Reference](
    https://github.com/tseijp/parsed-path/packages/parsed-path/docs/api.md)

### Example
```js
import parsed from 'parsed-path';

const path = parsed`src``utils``
    root: /;
`;
console.log(`
  ${ path.mount`test` } to equal test\\src\\utils
  ${ path.from`src`   } to equal utils
  ${ path.to`src`     } to equal ..
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
