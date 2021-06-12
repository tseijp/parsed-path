<h3 align="center"><ruby>
<h3 align="right"><ruby>
<h3 align="left"><ruby>

```ruby
< 👋 >
parsed
path
```

</ruby></h3>
</ruby></h3>
</ruby></h3>

<strong align="center">
<samp>

Use the best bits of ES6 to parse your path without stress 👋

[![ version ](
    https://img.shields.io/npm/v/parsed-path)](
    https://npmjs.com/package/parsed-path)
[![ Downloads ](
    https://img.shields.io/npm/dm/parsed-path.svg)](
    https://npmjs.com/package/parsed-path)
[![ jsDelivr ](
    https://badgen.net/jsdelivr/hits/npm/parsed-path)](
    https://www.jsdelivr.com/package/npm/parsed-path)
[![ minified size ](
    https://badgen.net/bundlephobia/minzip/parsed-path)](
    https://bundlephobia.com/result?p=parsed-path@latest)
[![ types includes ](
    https://badgen.net/npm/types/parsed-path)](
    https://www.npmjs.com/package/parsed-path)
[![ license ](
    https://badgen.net/npm/license/parsed-path)](
    https://www.npmjs.com/package/parsed-path)
[![ module formats ](
    https://img.shields.io/badge/module%20formats-cjs%20esm-green.svg)](
    #alternative-installation-methods)
[![ codecov ](
    https://codecov.io/gh/tseijp/parsed-path/coverage.svg?branch=master)](
    https://codecov.io/gh/tseijp/parsed-path)
[![ style: styled-components ](
    https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](
    https://github.com/styled-components/styled-components)

<hr/>
</samp>
</strong>

### Installation

<h4 align="center">

```ruby
npm install parsed-path or yarn add parsed-path
```

</h4>

### Documentation

See the documentation for more information about `parsed-path`.

<h6>

- <kbd>**[Getting started][get.md]**</kbd>
- <kbd>**[API Reference][api.md]**</kbd>

</h6>
<hr/>

### What does it look like?

Utilising tagged template literals (a recent addition to JavaScript),
parsed-path allows you to write pathname.
This two example creates simple pathname.
a Root and a File, with some parsed form to it:

```js
import parsed from 'parsed-path';

const Root = parsed`/`;

const Path = Root`home``user``dir`;
```

You can pass a function to a template literal to adapt it based on its props.
When setting the back prop to true, we are moving to its parent dir.

```js
const Back = Path`
  ${(props: any) => props.back && '..'}
`;
```

`Parsed-path` tagged pathform to parse your pathname.
It also removes the mapping between pathname and pathform
– using path as a low-level parsing construct could not be easier!

```js
const File = Back`ignore.ts``
  name: file;
  ext: ${(props: any) => props.xml && '.tsx'};
`;
```

<h6 align="center">
<ruby align="left">
<blockquote vlign="center">

```jsx
<File back /> to equal /home/user/file.ts
<File xml /> to equal /home/user/dir/file.tsx
```

</blockquote>
</ruby>
</h6>

`Parsed-path` uses <kbd>**[node][node]**</kbd> module for parsing the path rules.
For additional information about the supported prefixes visit their <kbd>**[docs][docs]**</kbd>.

<h6 align="center">
<ruby align="right">
<blockquote vlign="center">

```js
┌──────────────────────┬────────────┐
│           dir        │    base    │
├──────┬               ├──────┬─────┤
│ root │               │ name │ ext │
parsed`    /``home``user``dir``file``.tsx `
parsed` C:\\``      path``dir``file``.tsx `
└──────┴───────────────┴──────┴─────┘
```

</blockquote>
</ruby>
</h6>

This is a <kbd>**[live editor][live]**</kbd>,
so play around with the code to get a feel for
what it's like to work with `parsed-path`!

[get.md]: https://github.com/tseijp/parsed-path/blob/master/packages/core/docs/get.md
[api.md]: https://github.com/tseijp/parsed-path/blob/master/packages/core/docs/api.md
[live]: https://codesandbox.io/s/parsed-path-x66qy
[node]: https://github.com/nodejs/node/blob/master/lib/path.js
[docs]: https://nodejs.org/docs/latest/api/path.html#path_path_parse_path
