# API References

### Parsed

This is the default export.
We use to create the parsed.tag helper method.

Return a function that accepts a tagged template literal and turns it into a pathname.

```js
const Api = parsed.https`
  root: tsei.jp;
  base: api/v${({version}) => version};
`;

render(
  <>
    <Api version={1}/>
    <Api version={1}/>
  </>
);
```

### Adapting based on props

You can pass a function to a parsed path's template literal to adapt it based on its props.

This path has a api version.
When setting the primary prop to true, we are swapping out its background and text color.

```js
const Path = parsed.https`localhost:3000/api/v${
  props => props.version
}`;

render(
  <>
    <Path version={1}/>
    <Path version={2}/>
  </>
);

const Post = Path`${props =>
  version === 1
    ? "post/is/undefined"
    : "post"
}`

render(
  <div>
    <Post version={1}/>
    <Post version={2}/>
  </div>
);
```

### Extending parses
Quite frequently you might want to use a component,
but change it slightly for a single case.
Now, you could pass in an interpolated function and change them based on some props,
but that's quite a lot of effort for overriding the styles once.

To easily make a new component that inherits the styling of another,
just wrap it in the parsed() constructor.
Here we use the button from the last section and create a special one,
extending it with some color-related styling:

```js
const Api = parsed.https`tsei.jp``api`;

const Dev = parsed(Api)`
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

We can see that the new TomatoButton still resembles Button, while we have only added two new rules.

In some cases you might want to change which tag or component a parsed component renders.
This is common when building a navigation bar for example,
where there are a mix of anchor links and buttons but they should be parsed identically.

For this situation, we have an escape hatch.
You can use the "as" polymorphic prop to dynamically swap out the element that receives the styles you wrote:

```js
const Api = parsed.https`tsei.jp``api`;

const Dev = parsed(Api)`
  root: localhost;
  port: 3000;
`;

render(
  <>
    <Api/>
    <Dev port={3000}/>
    <Dev port={8000}/>
  </>
);
```

### Parsing any pathname

The parsed method works perfectly on all of your own or any third-party component,
as long as they attach the passed className prop to a DOM element.

```js
const Url = new URL("https://localhost:3000/");
const Api = parsed(Url)`
  port: 3001;
  path: api/v1;
`;

render(
  <>
    <Api/>
    <Api port="8000"/>
  </>
);
```

### Attaching additional props

To avoid unnecessary wrappers that just pass on some props to the rendered component,
or element, you can use the .attrs constructor.
It allows you to attach additional props (or "attributes") to a component.

This way you can for example attach static props to an element,
or pass a third-party prop like activeClassName to React Router's Link component.
Furthermore you can also attach more dynamic props to a component.
The .attrs object also takes functions,
that receive the props that the component receives.
The return value will be merged into the resulting props as well.

Here we render an Input component and attach some dynamic and static attributes to it:

```js
const Api = parsed.https.attrs(props => ({
  dev: false,
  port: props.dev && 3000,
  root: props.dev? "localhost": "tsei.jp"
}))`
  port: ${props => props.port}
  root: ${props => props.root}
`;

render(
  <>
    <Api/>
    <Api dev/>
  </>
);
```

As you can see, we get access to our newly created props in the interpolations,
and the type attribute is passed down to the element.

###### Overriding .attrs

Notice that when wrapping parsed components,
.attrs are applied from the innermost parsed component to the outermost parsed component.

This allows each wrapper to override nested uses of .attrs,
similarly to how css properties defined later in a stylesheet override previous declarations.

Input's .attrs are applied first, and then PasswordInput's .attrs:

```js
const Api = parsed.attrs(props => ({
  dev: false,
  port: props.dev && 3000,
  root: props.dev? "localhost": "tsei.jp"
}))`api``v1``
  port: ${props => props.port}
  root: ${props => props.root}
`;

const Dev = parsed(Root).attrs(props => ({dev: false});
const Pro = parsed(Root).attrs(props => ({dev: true}));

render(
  <>
    <Api/>
    <Dev/>
    <Pro/>
  </>
);
```
