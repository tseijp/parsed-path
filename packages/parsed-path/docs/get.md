# Getting Started

`parsed-path` tagged location to parse your pathname
This example creates two simple pathname,
a Root and a File, with some parsed attachment to it:

```js
const Root = parsed`/`;

const File = Root`home``user``dir``
  name: file;
  ext: .txt;
`;

render(
  <>
    <Root/>
    <File/>
  </>
);
```

### Utilities

```js
console.log`
  ${  parsed`foo``bar``baz`.mount`foo``bar`  } to equal 'foo/bar/foo/bar/baz'
  ${  parsed`foo``bar``baz`.from`foo``bar`  } to equal 'baz'
  ${  parsed`foo``bar``baz`.to`foo``bar`  } to equal '..'
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
