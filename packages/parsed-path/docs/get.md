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

const File = File`home``user``dir``
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

### NOTE

The path rules are automatically vendor prefixed,
parsed-path takes care of that for you!

`Parsed path` uses [path.js]() package for parsing the path rules.
For additional information about the supported prefixes in [path.js](https://nodejs.org) visit their web page.
fault (and currently does work in haul) but appears to have been removed at some point.


```js
const posix = parsed`/``home``user``dir``file.txt`;
const win32 = parsed`C:``path``dir``file.txt`;

┌─────────────────────┬────────────┐
│          dir        │    base    │
├──────┬              ├──────┬─────┤
│ root │              │ name │ ext │
"   /   home/user/dir / file  .txt "
" C:\\      path\\dir\\ file  .txt "
└──────┴──────────────┴──────┴─────┘
```
[nodejs parse path](https://nodejs.org/docs/latest/api/path.html#path_path_parse_path)
