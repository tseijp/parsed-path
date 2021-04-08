import { PathSet } from '../constructors'

export type pathObject = {
    root?: PathSet
    dir?: PathSet
    base?: PathSet
    ext?: PathSet
    name?: PathSet
}

export class ParseSheet {
    private pathObject: pathObject = {}

    constructor () {

    }

    // "foo:bar;" => {foo: "bar"}
    parse () {}

    // {foo: "bar"} => "foo:bar;"
    format () {}

    get root (): PathSet {return this.pathObject.root || []}
    get dir  (): PathSet {return this.pathObject.dir  || []}
    get base (): PathSet {return this.pathObject.base || []}
    get ext  (): PathSet {return this.pathObject.ext  || []}
    get name (): PathSet {return this.pathObject.name || []}
}
