# Getting Started

parsed-path utilies tagged location to parse your pathname

It removes the mapping between path and parse.

This means that when you're defining your styles,
you're actually creating a normal React component,
that has your styles attached to it.

This example creates two simple path,
a wrapper and a title, with some styles attached to it:

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

This is a [live editor](),
so play around with the code to get a feel for
what it's like to work with parsed-path!

`Parsed path` uses [node path.js]() module for parsing the path rules.
For additional information about the supported prefixes visit their [nodejs web page](
  https://nodejs.org/docs/latest/api/path.html#path_path_parse_path).
(and currently does work in haul) but appears to have been removed at some point.


```js
const posix = parsed`/``home``user``dir``file.txt`;
const win32 = parsed`C:``path``dir``file.txt`;

┌─────────────────────┬────────────┐
│          dir        │    base    │
├──────┬              ├──────┬─────┤
│ root │              │ name │ ext │
"    /  home/user/dir / file  .txt "
" C:\\      path\\dir\\ file  .txt "
└──────┴──────────────┴──────┴─────┘
```

### Utilities

```js
const Root = parsed`src/utils`;

const File = Root`..``
  name: index;
  ext: .ts;
`;

console.log`
  ${  Root.to`src`  } to equal ..
  ${  Root.from`src`  } to equal utils
  ${  Root.mount`test`  } to equal test/src/utils

  ${  File.dir`utils`  } to equal ~/src/utils
  ${  File.move`test`  } to equal ~/test/index.ts
  ${  File.name`.tsx`  } to equal index.tsx

  ${  Wrap({ext: "jsx"})  } to equal ./src/utils/index.tsx
  ${  Wrap({name: "xx"})  } to equal ./src/utils/xx.ts
  ${  Wrap({back: true})  } to equal ./src/index.ts
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
