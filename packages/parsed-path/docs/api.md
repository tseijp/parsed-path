# API References

### parsed

This is the default export.
We use to create the parsed.target helper method.

Return a function that accepts a tagged template literal and turns it into a pathname.

```js
import parsed from from 'parsed-path'

const Api = parsed('api')`
    root: http://localhost:3000/;
    base: v${({ver}) => ver};
`
```
