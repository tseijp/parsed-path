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

`parsed-path` utilies make path manipulation without stress.
This example creates two simple pathname,
a Root and a File, with some parsed attachment to it:

```js
const Root = parsed`src/utils`;

const File = Root`..``index.ts`;

const Wrap = File`
  ext: ${props => props.ext};
  name: ${props => props.file};
`;

console.log`
  ${  Root.to`src`  } to equal ..
  ${  Root.from`src`  } to equal utils
  ${  Root.mount`test`  } to equal test/src/utils

  ${  File.dir`utils`  } to equal ~/src/utils
  ${  File.move`test`  } to equal ~/test/index.ts
  ${  File.name`.tsx`  } to equal index.tsx
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
