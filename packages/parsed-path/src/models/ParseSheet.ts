import { Rule } from '../utils'

export type pathObject = {
    root?: Rule
    dir?: Rule
    base?: Rule
    ext?: Rule
    name?: Rule
}

export class ParseSheet {
    private pathObject: pathObject = {}

    constructor () {

    }

    // "foo:bar;" => {foo: "bar"}
    parse () {}

    // {foo: "bar"} => "foo:bar;"
    format () {}

    get root (): Rule {return this.pathObject.root || ""}
    get dir  (): Rule {return this.pathObject.dir  || ""}
    get base (): Rule {return this.pathObject.base || ""}
    get ext  (): Rule {return this.pathObject.ext  || ""}
    get name (): Rule {return this.pathObject.name || ""}
}
