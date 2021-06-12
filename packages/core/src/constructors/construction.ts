import { path, RuleSet } from './path'
import { ParsedPath } from '../models'
import { is } from '../utils'

export type Attrs=
    | object
    | ((props: object) => object)

export interface Options {
    pure?: boolean
    isWin?: boolean
    attrs?: Attr[]
}

export interface Construction {
    toString (...args: any):  string
    mount (...args: any):  ParsedPath
    from (...args: any):  ParsedPath
    to (...args: any):  ParsedPath
    withAttrs (next: any, prev?: Options): Construction
    withConfig (next: any, prev?: Options): Construction
}

export function construction (
    constructor: (...args: any[]) => ParsedPath,
    options: Options,
    ...tags: RuleSet
): Construction

export function construction (constructor: any, options: any, ...tags: any) {
    const templateFunction = (props: any={}, ...args: any) => is.obj(props)
        ? constructor(path(...tags), options)(props, ...args)
        : constructor(path(...tags), options, path(props, ...args))

    templateFunction.toString = (...args: any) => templateFunction(...args)

    templateFunction.mount = (...args: any) =>
        constructor(path(...args), {...options, mount: path(...tags)})

    templateFunction.from = (...args: any) =>
        constructor(path(...args), {...options, from: path(...tags)})

    templateFunction.to = (...args: any) =>
        constructor(path(...args), {...options, to: path(...tags)})

    templateFunction.withConfig = (next: any, prev: any={}) =>
        construction(constructor, {...prev, ...options, ...next}, ...tags)

    templateFunction.withAttrs = (next: any, prev: any={}) =>
        construction(constructor, {...prev, ...options, attrs:
            Array.prototype.concat(options.attrs, prev.attrs, next).filter(Boolean),
        }, ...tags)


    return templateFunction as Construction
}
