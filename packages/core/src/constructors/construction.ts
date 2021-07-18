import { path, RuleSet } from './path'
import { ParsedPath } from '../models'
import { is } from '../utils'

export type Attrs=
    | object
    | ((props: object) => object)

export interface Config {
    as?: (props: any) => null | JSX.Element
    key?: string,
    pure?: boolean
    isWin?: boolean
    attrs?: Attr[]
}

export interface Construction {
    toString (...args: any):  string
    mount (...args: any):  ParsedPath
    from (...args: any):  ParsedPath
    to (...args: any):  ParsedPath
    withAttrs (next: any, prev?: Config): Construction
    withConfig (next: any, prev?: Config): Construction
}

export function construction (
    constructor: (...args: any[]) => ParsedPath,
    config: Config,
    ...tags: RuleSet
): Construction

export function construction (constructor: any, config: any, ...tags: any) {
    const templateFunction = (arg: any={}, ...args: any) => is.obj(arg)
        ? constructor(path(...tags), config)(arg, ...args)
        : constructor(path(...tags), config, path(arg, ...args))

    templateFunction.toString = (...args: any) => templateFunction(...args)

    templateFunction.mount = (...args: any) =>
        constructor(path(...args), {...config, mount: path(...tags)})

    templateFunction.from = (...args: any) =>
        constructor(path(...args), {...config, from: path(...tags)})

    templateFunction.to = (...args: any) =>
        constructor(path(...args), {...config, to: path(...tags)})

    templateFunction.withConfig = (next: any, prev: any={}) =>
        construction(constructor, {...prev, ...config, ...next}, ...tags)

    templateFunction.withAttrs = (next: any, prev: any={}) =>
        construction(constructor, {...prev, ...config, attrs:
            Array.prototype.concat(config.attrs, prev.attrs, next).filter(Boolean),
        }, ...tags)

    return templateFunction as Construction
}
