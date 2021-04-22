import { path, PathSet } from './path'
import { ParsedPath } from '../models'
import { is } from '../utils'

export type Attrs=
    | object
    | ((props: object) => object)

export interface Options {
    pure?: boolean
    isWin?: boolean
    attrs: Attr[]
}

export interface Construction {
    toString (...args: any):  string
    mount (...args: any):  ParsedPath
    from (...args: any):  ParsedPath
    to (...args: any):  ParsedPath
    withAttrs (args: any, options?: Options): Construction
    withConfig (args: any, options?: Options): Construction
}

export function construction (
    constructor: (...args: any) => ParsedPath,
    tags: PathSet,
    options?: object
): Construction

export function construction (constructor: any, tags: any, options: any={}) {
    const templateFunction = (props: any={}, ...args: any) => is.obj(props)
        ? constructor(path(...tags), options)(props, ...args)
        : constructor(path(...tags), options, path(props, ...args))

    templateFunction.toString = (...args: any) => templateFunction(...args)

    templateFunction.mount = (...args: any) =>
        constructor(path(...args), options, path(...tags))

    templateFunction.from = (...args: any) =>
        constructor([path(...args), path(...tags)], options)

    templateFunction.to = (...args: any) =>
        constructor([path(...tags), path(...args)], options)

    templateFunction.withAttrs = (next: any, pre: any={}) =>
        construction(constructor, path(...tags), {...options, ...pre, attrs:
            Array.prototype.concat(options.attrs, pre.attrs, next).filter(Boolean),
        })

    templateFunction.withConfig = (next: any, pre: any={}) =>
        construction(constructor, path(...tags), {...options, ...pre, ...next})

    return templateFunction as Construction
}
