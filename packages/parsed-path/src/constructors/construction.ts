import { path, PathSet } from './path'
import { is, relative } from '../utils'
import { ParsedPath } from '../models'

export interface Construction {
    toString: (...args: any) => string
    mount: (...args: any) => ParsedPath
    from: (...args: any) => ParsedPath
    to: (...args: any) => ParsedPath
    withAttrs: (args: any) => Construction
    withConfig: (args: any) => Construction
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
        constructor(relative(path(...args), path(...tags)), options)

    templateFunction.to = (...args: any) =>
        constructor(relative(path(...tags), path(...args)), options)

    templateFunction.withAttrs = (attrs: any, next: any={}) =>
        construction(constructor, path(...tags), {...options, ...next, attrs:
            Array.prototype.concat(options.attrs, next.attrs, attrs).filter(Boolean),
        })

    templateFunction.withConfig = (config: any, next: any={}) =>
        construction(constructor, path(...tags), {...options, ...next, ...config})

    return templateFunction as Construction
}
