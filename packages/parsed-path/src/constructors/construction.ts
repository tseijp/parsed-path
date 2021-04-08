import { path, PathSet } from './path'
import { ParsedPath } from '../models'
import { is, relative } from '../utils'

export interface Construction {
    toString: (...args: any) => string
    mount: (...args: any) => ParsedPath
    pure: (...args: any) => ParsedPath
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

    templateFunction.mount = (...mount: any) =>
        constructor(path(...mount), options, path(...tags))

    templateFunction.pure = (...args: any) =>
        constructor(path(...tags), {...options, pure: true}, path(...args))

    templateFunction.from = (...from: any) =>
        constructor(relative(path(...from), path(...tags)), options)

    templateFunction.to = (...to: any) =>
        constructor(relative(path(...tags), path(...to)), options)

    templateFunction.withAttrs = (...attrs: any) =>
        construction(constructor, path(...tags), {...options, attrs:
            Array.prototype.concat(options.attrs, ...attrs).filter(Boolean),
        })

    templateFunction.withConfig = (config: any) =>
        construction(constructor, path(...tags), {...options, ...config})

    return templateFunction as Construction
}
