# Getting Started

parsed-path utilies tagged location to parse your pathname

It removes the mapping between path and styles.
This means that when you're defining your styles,
you're actually creating a normal React component,
that has your styles attached to it.

This example creates two simple path,
a wrapper and a title, with some styles attached to it:

```js
const File = parsed()`
  root: /;
  name: file;
  ext: .txt;
`;

const Mount = File.mount`dir`;

render(
  <>
    <File/>
    <Mount/>
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
For additional information about the supported prefixes in [path.js]() visit their web page.
fault (and currently does work in haul) but appears to have been removed at some point.
