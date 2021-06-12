---
sidebar_position: 3
---

# API References

### Parsed

This is the default export. We use to create the parsed.tag helper method.
Return a function that accepts a tagged template literal and turns it into a pathname.

```js
const Api = parsed.https`tsei.jp``api``v${props => props.version}`;

render(
  <>
    <Api version={1}/>
    <Api version={2}/>
  </>
);
```

### Adapting based on props

You can pass a function to a parsed path's template literal to adapt it based on its props.
When setting the next prop to true, we are switching its version number.

```js
const Api = parsed`api``v${props => props.next? 2: 1}`;
const Get = Api`${props =>
  props.version === 1
    ? "get/is/undefined"
    : "get"
}`

render(
  <>
    <Api/>
    <Get/>
    <Api next/>
    <Get next/>
  </>
);
```

### Extending parses

To easily make a new pathname that inherits from another paths.
Here we use the api url from the last section and create a special one.


```js
const Api = parsed.http`tsei.jp``api`;

const Dev = Api`
  root: localhost;
  port: 3000;
`;

render(
  <>
    <Api/>
    <Dev/>
  </>
);
```

### Parsing any pathname

The parsed method works perfectly on all of your own or any third-party pathname.

```js
const Url = new URL("https://localhost:3000/");
const Api = parsed(Url)`
  port: 3001;
  root: http;
`;

render(
  <>
    <Api/>
    <Api port="8000"/>
  </>
);
```

### Attaching additional props

To avoid unnecessary wrappers that just pass on some props to the path,
you can use the .withAttrs constructor.
It allows you to attach additional props to a path.

Furthermore you can also attach more dynamic props to a component.
The .withAttrs object also takes functions,
that receive the props that the path receives.
The return value will be merged into the resulting props as well.

Here we render an root path and attach some dynamic and static attributes to it:

```js
const Root = parsed`
  port: ${props => props.port}
  root: ${props => props.root}
`;

const Api = Root`api``v1`.withAttrs(props => ({
  dev: false,
  port: props.dev? 3000: undefined,
  root: props.dev? "localhost": "tsei.jp"
}));
```

This allows each wrapper to override nested uses of .withAttrs.
Root's .attrs are applied first, and then Api's .attrs:

```js
const Dev = Api.withAttrs(props => ({dev: false});
const Pro = Api.withAttrs(props => ({dev: true}));

render(
  <>
    <Api/>
    <Dev/>
    <Pro/>
  </>
);
```
