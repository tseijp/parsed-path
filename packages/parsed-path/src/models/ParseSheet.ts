import { RuleSet } from '../utils'

export type pathObject = {
    root?: RuleSet
    dir?: RuleSet
    base?: RuleSet
    ext?: RuleSet
    name?: RuleSet
}

export class ParseSheet {
    private pathObject: pathObject = {}

    constructor () {

    }

    // "foo:bar;" => {foo: "bar"}
    parse () {}

    // {foo: "bar"} => "foo:bar;"
    format () {}

    get root (): RuleSet {return this.pathObject.root || ""}
    get dir  (): RuleSet {return this.pathObject.dir  || ""}
    get base (): RuleSet {return this.pathObject.base || ""}
    get ext  (): RuleSet {return this.pathObject.ext  || ""}
    get name (): RuleSet {return this.pathObject.name || ""}
}
